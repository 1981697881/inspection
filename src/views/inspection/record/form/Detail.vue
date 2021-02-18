<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="80px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item :label="'打卡人'">
            <el-select v-model="form.clockUid" filterable placeholder="打卡人" style="width: 100%">
              <el-option
                v-for="(t,i) in pArray"
                :key="i"
                :label="t.username"
                :value="t.uid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'位置信息'">
            <el-input v-model="form.clockLocation"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item :label="'打卡时间'">
          <div class="block">
            <el-date-picker
              v-model="form.clockTime"
              type="datetime"
              style="width:auto"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item :label="'被检人员'">
            <el-input v-model="form.checkStaff"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'陪同人员'">
            <el-input v-model="form.escort"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item :label="'检查日期'">
          <div class="block">
            <el-date-picker
              v-model="form.checkTime"
              type="date"
              style="width:auto"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-form-item>
        </el-col>
      </el-row>
      <el-row  style="overflow: auto;border: 1px solid #EBEEF5;">
        <el-table el-table :height="'calc(100vh/4)'" :data="list" border size="mini" :highlight-current-row="true">
          <el-table-column prop="date"  label="序号" fixed type="index" align="center"></el-table-column>
          <el-table-column
            v-for="(t,i) in columns"
            :key="i"
            align="center"
            :prop="t.name"
            :label="t.text"
            v-if="t.default!=undefined?t.default:true"
            :width="t.width?t.width:''"
          >
            <template slot-scope="scope">
                <span v-if="scope.row.isSet">
                   <div class="block"  v-if="t.name == 'orderNo'">
                  <el-date-picker
                    v-model="sel[t.name]"
                    type="date"
                    size="mini"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
                  <el-input size="mini" v-else-if="t.name == 'processName'" placeholder="请输入内容" v-model="sel[t.name]">
                  </el-input>
                  <el-select size="mini" v-else-if="t.name == 'planNum'" v-model="sel[t.name]" placeholder="请选择" @change="changeProcessId($event, sel)">
                    <el-option
                      v-for="(t,i) in plArray"
                      :key="i"
                      :label="t.FName"
                      :value="t.FName">
                    </el-option>
                  </el-select>
                   <span v-else>{{sel[t.name]}}</span>
                </span>
              <span v-else>{{scope.row[t.name]}}</span>
            </template>
          </el-table-column>
          <!--<el-table-column label="操作" width="230" align="center">
            <template slot-scope="scope">
                  <span class="el-tag el-tag&#45;&#45;info el-tag&#45;&#45;mini" style="cursor: pointer;" @click="pwdChange(scope.row,scope.$index,true)">
                    {{scope.row.isSet?'确定':"修改"}}
                  </span>
              <span v-if="!scope.row.isSet" class="el-tag el-tag&#45;&#45;danger el-tag&#45;&#45;mini" @click="deleteRow(scope.row,scope.$index,list2)" style="cursor: pointer;">
                    删除
                  </span>
              <span v-else class="el-tag  el-tag&#45;&#45;mini" style="cursor: pointer;" @click="pwdChange(scope.row,scope.$index,false)">
                    取消
                  </span>
              <span class="el-tag el-tag&#45;&#45;warning el-tag&#45;&#45;mini" style="cursor: pointer;" @click="opinion(scope.row,scope.$index,false)">
                    整改意见
                  </span>
              <span class="el-tag el-tag&#45;&#45;success el-tag&#45;&#45;mini" style="cursor: pointer;" @click="feedback(scope.row,scope.$index,false)">
                    整改反馈
                  </span>
            </template>
          </el-table-column>-->
        </el-table>
       <!-- <el-col :span="24">
          <div class="el-table-add-row" style="width: 99.2%;" @click="addMaster()"><span>+ 添加</span></div>
        </el-col>-->
      </el-row>
      <el-row :gutter="20" style="padding-top: 20px">
        <span style="font-size: 20px;">整改信息-整改意见</span>
      </el-row>
      <el-row :gutter="20" style="padding-top: 20px">
        <el-col :span="8">
          <el-form-item :label="'通知单号'" >
            <el-input v-model="form.orderNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'登记日期'">
            <div class="block" >
              <el-date-picker
                v-model="form.recordDate"
                type="date"
                style="width:auto"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label-width="125px" :label="'要求整改完成日期'">
            <div class="block" >
              <el-date-picker
                v-model="form.rectifyPlanDate"
                type="date"
                style="width:auto"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'隐患问题'" >
            <el-input type="textarea" v-model="form.concerns"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'整改内容'" >
            <el-input type="textarea" v-model="form.opinion"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24" style="text-align: center">
          <el-form-item :label="'隐患图片'" >
            <el-upload
              :action="fileUrl"
              list-type="picture-card"
              accept="image/jpeg,image/jpg,image/png,image/gif"
              :headers="headers"
              :data="imgData"
              :limit="3"
              name="imgS"
              :on-success="uploadSuccess"
              :on-error="uploadError"
              :class="{hide:hideUpload}"
              :on-preview="handlePictureCardPreview"
              :on-change="handleChange"
              :file-list="fileList"
              ref="upload"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" append-to-body size="tiny">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!--<div slot="footer" style="text-align:center">
        <el-button type="primary" @click="saveData('form')">保存</el-button>
      </div>-->
  </div>
</template>

<script>
import { pollingRecordByPlanId } from "@/api/inspection/index";
import { userFormat } from "@/api/system/index";
import {
  getToken
} from '@/utils/auth'
export default {
  props: {
    listInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      headers: {
        'authorization': getToken('insrx'),
      },
      list: [],
      fileUrl: '',
      sel: null,
      columns: [
        { text: "检查情况", name: "" },
        { text: "检查项目", name: "checkName" },
      ],
      imgData: {
      },
      images: [],
      hideUpload: false,
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      limitCount: 3,
      nowImg: [],
      form: {
        clockUid: null,
        orderNo: null,
        clockLocation: null,
        clockTime: null,
        checkStaff: null,
        escort: null,
        checkTime: null,
        recordDate: null,
        rectifyPlanDate: null,
        concerns: null,
        opinion: null,
        concernsImg1: null,
        concernsImg2: null,
        concernsImg3: null,
      },
      pArray:[],
      rules: {
        loPrName: [
          {required: true, message: '请输入名稱', trigger: 'blur'},
        ],
        loPrCode: [
          {required: true, message: '请输入名稱', trigger: 'blur'},
        ],
      },
    };
  },
  mounted() {
    this.fileUrl  = `${window.location.origin}/web/file/returnOrder/imgUpload`
    this.fetchFormat();
    console.log(this.listInfo)
    if (this.listInfo) {
      this.fetchData(this.listInfo.planId);
    }
  },
  methods: {
    handleChange(file, fileList) {
      this.hideUpload = fileList.length >= this.limitCount;
    },
    //上传失败事件
    uploadError(res) {
      console.log(res)
      this.$message({
        message: res.msg,
        type: "warning"
      });
      this.$emit('uploadList')
    },
    //上传成功事件
    uploadSuccess(res, file, fileList) {
      file.name = res.data;
      this.images.push(res.data)
      this.$message({
        message: res.msg,
        type: "success"
      });
      console.log(this.images)
      this.$emit('uploadList')
    },
    //删除图片
    handleRemove(file, fileList) {
      let array = this.images;
      for (let i in array) {
        if (file.name == array[i]) {
          array.splice(i, 1);
        }

      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleChange(file, fileList) {
      this.hideUpload = fileList.length >= this.limitCount;
    },
    //添加
    addMaster() {
      for (let i of this.list) {
        if (i.isSet) return this.$message.warning("请先保存当前编辑项");
      }
      this.cIndex += 1
      let j = {isSet: true, orderNo: '', planNum: ''};
      this.list.push(j);
      this.sel = JSON.parse(JSON.stringify(j));
    },
    //删除带确认区 单行删除
    deleteRow(row, index, rows) {
      if(rows[index].processRouteDetailId != null && rows[index].processRouteDetailId != undefined){
        delProcessRouteDetail(rows[index].processRouteDetailId).then(res => {
          if(res.success){
            rows.splice(index, 1);
            this.$emit('uploadList')
          }
        });
      }else {
        rows.splice(index, 1);
      }
    },
    //修改
    pwdChange(row, index, cg) {
      //点击修改 判断是否已经保存所有操作
      for (let i of this.list2) {
        if (i.isSet && i.userId != row.userId) {
          this.$message.warning("请先保存当前编辑项");
          return false;
        }
      }
      //是否是取消操作
      if (!cg) {
        if (!this.sel.processId) this.list2.splice(index, 1);
        return row.isSet = !row.isSet;
      }
      //提交数据
      if (row.isSet) {
        const sel = this.sel
        if((sel.processId == null || sel.processId === '') || (sel.orderNo == null || sel.orderNo === '') || (sel.planNum == null || sel.planNum === '')){
          return this.$message({
            type: 'error',
            message: "请输入必填项!"
          });
        }else {
          let data = JSON.parse(JSON.stringify(this.sel));
          for (let k in data) row[k] = data[k]
          this.$message({
            type: 'success',
            message: "添加成功!"
          });
          //然后这边重新读取表格数据
          this.readMasterUser();
          row.isSet = false;
        }
      } else {
        this.sel = JSON.parse(JSON.stringify(row));
        row.isSet = true;
      }
    },
    opinion(row, index, cg) {
      this.visible = true
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          if (typeof (this.form.loPrId) != undefined && this.form.loPrId != null) {
            alterSupplier(this.form).then(res => {
              this.$emit('hideDialog', false)
              this.$emit('uploadList')
            });
          }else{
            addSupplier(this.form).then(res => {
              this.$emit('hideDialog', false)
              this.$emit('uploadList')
            });
          }
        }else {
          return false;
        }
      })
    },
    fetchFormat() {
      userFormat().then(res => {
        if(res.flag){
          this.pArray = res.data
        }
      });
    },fetchData(val) {
      console.log()
      pollingRecordByPlanId(val).then(res => {
        console.log(res)
        if(res.flag){
          this.form = res.data
          this.form.clockUid = res.data.clockUid.toString()
          this.list = res.data.recordCheckList
          let imgArray = res.data.concernsImg.split(',');
          imgArray = imgArray.filter(function (s) {
            return s && s.trim();
          });
          const path = require('path')
          console.log(path)
          if (this.img != '') {
            if (imgArray.length > 0) {
              //到图片数量大于3或等于3时添加按钮隐藏
              if (imgArray.length >= 3) {
                this.hideUpload = true;
              } else {
                this.hideUpload = false;
              }
              this.fileList = []
              for (let i in imgArray) {
                this.fileList.push({
                  url: this.$store.state.user.url+'/uploadFiles/image/' + imgArray[i]
                })
              }
            } else {
              this.fileList = [];
            }
          }
        }
      });
    },
  }
};
</script>

<style>
  .el-table-add-row {
    margin-top: 10px;
    width: 100%;
    height: 34px;
    border: 1px dashed #c1c1cd;
    border-radius: 3px;
    cursor: pointer;
    justify-content: center;
    display: flex;
    line-height: 34px;
  }

</style>
<style lang="scss">
  .hide .el-upload--picture-card {
    display: none;
  }
</style>
