<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="80px" :size="'mini'">
      <el-button type="primary" size="small" @click.native="registration">检查登记</el-button>
      <el-row  style="overflow: auto;border: 1px solid #EBEEF5;">
            <el-table el-table :height="'calc(100vh/2)'" :data="list2" border size="mini" :highlight-current-row="true">
              <el-table-column
                v-for="(t,i) in columns2"
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
                    v-model="sel2[t.name]"
                    type="date"
                    size="mini"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
                  <el-input size="mini" v-else-if="t.name == 'processName'" placeholder="请输入内容" v-model="sel2[t.name]">
                  </el-input>
                  <el-select size="mini" v-else-if="t.name == 'planNum'" v-model="sel2[t.name]" placeholder="请选择" @change="changeProcessId($event, sel2)">
                    <el-option
                      v-for="(t,i) in plArray"
                      :key="i"
                      :label="t.FName"
                      :value="t.FName">
                    </el-option>
                  </el-select>
                   <span v-else>{{sel2[t.name]}}</span>
                </span>
                  <span v-else>{{scope.row[t.name]}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="230" align="center">
                <template slot-scope="scope">
                  <span class="el-tag el-tag--info el-tag--mini" style="cursor: pointer;" @click="pwdChange2(scope.row,scope.$index,true)">
                    {{scope.row.isSet?'确定':"修改"}}
                  </span>
                  <span v-if="!scope.row.isSet" class="el-tag el-tag--danger el-tag--mini" @click="deleteRow2(scope.row,scope.$index,list2)" style="cursor: pointer;">
                    删除
                  </span>
                  <span v-else class="el-tag  el-tag--mini" style="cursor: pointer;" @click="pwdChange2(scope.row,scope.$index,false)">
                    取消
                  </span>
                  <span class="el-tag el-tag--warning el-tag--mini" style="cursor: pointer;" @click="opinion(scope.row,scope.$index,false)">
                    整改意见
                  </span>
                  <span class="el-tag el-tag--success el-tag--mini" style="cursor: pointer;" @click="feedback(scope.row,scope.$index,false)">
                    整改反馈
                  </span>
                </template>
              </el-table-column>
            </el-table>
            <el-col :span="24">
              <div class="el-table-add-row" style="width: 99.2%;" @click="addMaster2()"><span>+ 添加</span></div>
            </el-col>
          </el-row>
    </el-form>
    <el-dialog
      :visible.sync="visible"
      title="整改信息-整改意见"
      v-if="visible"
      :width="'60%'"
      destroy-on-close
      append-to-body
    >
      <el-form label-width="100px" :size="'mini'">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item :label="'通知单号'">
              <el-input v-model="form.reason"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'登记日期'">
              <div class="block" >
                <el-date-picker
                  v-model="form.reportDate"
                  type="date"
                  style="width:auto"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="130px" :label="'要求整改完成日期'">
              <div class="block" >
                <el-date-picker
                  v-model="form.reportDate"
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
          <el-col :span="12">
            <el-form-item :label="'隐患问题'">
              <el-select v-model="form.loPrName" filterable placeholder="隐患问题" style="width: 100%" >
                <el-option
                  v-for="(t,i) in pArray"
                  :key="i"
                  :label="t.FName"
                  :value="t.FItemID">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'整改内容'">
              <el-select v-model="form.loPrName" filterable placeholder="整改内容" style="width: 100%" >
                <el-option
                  v-for="(t,i) in pArray"
                  :key="i"
                  :label="t.FName"
                  :value="t.FItemID">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" justify="center">
          <el-upload
            action="web/file/returnOrder/imgUpload"
            list-type="picture-card"
            accept="image/jpeg,image/jpg,image/png,image/gif"
            :headers="headers"
            :data="imgData"
            :limit="5"
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
        </el-row>
        <el-dialog
          :visible.sync="visible2"
          title="延期信息-延期申请"
          v-if="visible2"
          :width="'60%'"
          destroy-on-close
          append-to-body
        >
          <el-form label-width="100px" :size="'mini'">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item :label="'延期原因'" prop="loPrCode">
                  <el-input v-model="form.loPrCode"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item :label="'延期期限'" >
                  <el-input-number v-model="form.contact"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="'申请人'" >
                  <el-input v-model="form.contact"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="'申请日期'" prop="loPrName">
                  <div class="block" >
                    <el-date-picker
                      v-model="form.reportDate"
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
              <el-col :span="8">
                <el-form-item :label="'批准人'" >
                  <el-input v-model="form.contact"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="'批准日期'" prop="loPrName">
                  <div class="block" >
                    <el-date-picker
                      v-model="form.reportDate"
                      type="date"
                      style="width:auto"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期">
                    </el-date-picker>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="'整改完成时间'" prop="loPrName">
                  <div class="block" >
                    <el-date-picker
                      v-model="form.reportDate"
                      type="date"
                      style="width:auto"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期">
                    </el-date-picker>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" style="text-align:center">
            <el-button type="primary" @click.native="saveNum">确定</el-button>
          </div>
        </el-dialog>
      </el-form>
      <div slot="footer" style="text-align:center">
        <el-button type="primary" @click.native="saveNum">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="visible3"
      title="检查登记"
      v-if="visible3"
      :width="'60%'"
      destroy-on-close
      append-to-body
    >
      <el-form label-width="100px" :size="'mini'">
        <el-row  style="overflow: auto;border: 1px solid #EBEEF5;">
          <el-table el-table :height="'calc(100vh/2)'" :data="list" border size="mini" :highlight-current-row="true">
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
                    style="width:auto"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
                  <el-input size="mini"v-else-if="t.name == 'processName'" placeholder="请输入内容" v-model="sel[t.name]">
                  </el-input>
                  <el-select size="mini"v-else-if="t.name == 'orderNo'" v-model="sel[t.name]" placeholder="请选择" @change="changeProcessId($event, sel)">
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
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                  <span class="el-tag el-tag--info el-tag--mini" style="cursor: pointer;" @click="pwdChange(scope.row,scope.$index,true)">
                    {{scope.row.isSet?'确定':"修改"}}
                  </span>
                <span v-if="!scope.row.isSet" class="el-tag el-tag--danger el-tag--mini" @click="deleteRow(scope.row,scope.$index,list)" style="cursor: pointer;">
                    删除
                  </span>
                <span v-else class="el-tag  el-tag--mini" style="cursor: pointer;" @click="pwdChange(scope.row,scope.$index,false)">
                    取消
                  </span>
              </template>
            </el-table-column>
          </el-table>
          <el-col :span="24">
            <div class="el-table-add-row" style="width: 99.2%;" @click="addMaster()"><span>+ 添加</span></div>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" style="text-align:center">
        <el-button type="primary" @click.native="saveNum">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="visible4"
      title="整改信息-整改反馈"
      v-if="visible4"
      :width="'60%'"
      destroy-on-close
      append-to-body
    >
      <el-form label-width="100px" :size="'mini'">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'通知单号'">
              <el-input v-model="form.reason"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'整改情况'">
              <el-input v-model="form.reason"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'完成日期'">
              <div class="block" >
                <el-date-picker
                  v-model="form.reportDate"
                  type="date"
                  style="width:auto"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'整改跟踪人'">
              <el-select v-model="form.loPrName" filterable placeholder="整改内容" style="width: 100%" @change="changeItem">
                <el-option
                  v-for="(t,i) in pArray"
                  :key="i"
                  :label="t.FName"
                  :value="t.FItemID">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" justify="center">
          <el-upload
            action="web/file/returnOrder/imgUpload"
            list-type="picture-card"
            accept="image/jpeg,image/jpg,image/png,image/gif"
            :headers="headers"
            :data="imgData"
            :limit="5"
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
        </el-row>
      </el-form>
      <div slot="footer" style="text-align:center">
        <el-button type="primary" @click.native="saveNum">确定</el-button>
      </div>
    </el-dialog>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>
  import { alterSupplier, addSupplier } from "@/api/basic/index";
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
          'authorization': getToken('clrx'),
        },
        imgData: {
        },
        visible: null,
        visible2: null,
        visible3: null,
        visible4: null,
        fileList: [],
        dialogImageUrl: '',
        dialogVisible: false,
        hideUpload: true,
        sel: null, // 选中行
        sel2: null, // 选中行
        activeName: 'first',
        form: {
          loPrId: null,
          loPrName: null, // 名称
          loPrCode: null,
          contact: null,
          addr: null,
          tel: null,
          description: null,
        },
        list: [],
        list2: [],
        columns: [
          { text: "检查日期", name: "orderNo" },
          { text: "检查情况", name: "processName" },
          { text: "检查项目", name: "planNum" },
        ],
        columns2: [
          { text: "通知单号", name: "" },
          { text: "登记日期", name: "orderNo" },
          { text: "隐患问题", name: "planNum" },
          { text: "整改内容", name: "planNum" },
          { text: "隐患图片", name: "" },
          { text: "要求整改完成日期", name: "orderNo" },
          { text: "整改情况", name: "" },
          { text: "整改完成图片", name: "" },
          { text: "整改跟踪人", name: "" },
          { text: "完成时间", name: "" },
        ],
        pidS:[],
        pArray:[],
        plArray:[],
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
      this.fetchFormat();
      if (this.listInfo) {
        this.form = this.listInfo
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
      // 上传成功事件
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
      // 删除图片
      handleRemove(file, fileList) {
        console.log(file)
        console.log(this.images)
        let array = this.images;
        for (let i in array) {
          if (file.name == array[i]) {
            array.splice(i, 1);
          }

        }
      },
      opinion(row, index, cg) {
        this.visible = true
      },
      feedback(row, index, cg) {
        this.visible2 = true
      },
      registration(row, index, cg) {
        this.visible3 = true
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      // 读取表格数据
      readMasterUser() {
        //根据实际情况，自己改下啊
        this.list.map(i => {
          i.isSet = false; // 给后台返回数据添加`isSet`标识
          return i;
        });
      },
      // 添加
      addMaster() {
        for (let i of this.list) {
          if (i.isSet) return this.$message.warning("请先保存当前编辑项");
        }
        this.cIndex += 10
        let j = {isSet: true, orderNo: this.cIndex, orderNo: '', planNum: ''};
        this.list.push(j);
        this.sel = JSON.parse(JSON.stringify(j));
      }, //添加
      addMaster2() {
        for (let i of this.list2) {
          if (i.isSet) return this.$message.warning("请先保存当前编辑项");
        }
        this.cIndex += 10
        let j = {isSet: true, orderNo: this.cIndex, orderNo: '', planNum: ''};
        this.list2.push(j);
        this.sel2 = JSON.parse(JSON.stringify(j));
      },
      //修改
      pwdChange(row, index, cg) {
        //点击修改 判断是否已经保存所有操作
        for (let i of this.list) {
          if (i.isSet && i.userId != row.userId) {
            this.$message.warning("请先保存当前编辑项");
            return false;
          }
        }
        //是否是取消操作
        if (!cg) {
          if (!this.sel.processId) this.list.splice(index, 1);
          return row.isSet = !row.isSet;
        }
        console.log(row.isSet)
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
      },//修改
      pwdChange2(row, index, cg) {
        //点击修改 判断是否已经保存所有操作
        for (let i of this.list2) {
          if (i.isSet && i.userId != row.userId) {
            this.$message.warning("请先保存当前编辑项");
            return false;
          }
        }
        //是否是取消操作
        if (!cg) {
          if (!this.sel2.processId) this.list2.splice(index, 1);
          return row.isSet = !row.isSet;
        }
        //提交数据
        if (row.isSet) {
          const sel = this.sel2
          if((sel.processId == null || sel.processId === '') || (sel.orderNo == null || sel.orderNo === '') || (sel.planNum == null || sel.planNum === '')){
            return this.$message({
              type: 'error',
              message: "请输入必填项!"
            });
          }else {
            let data = JSON.parse(JSON.stringify(this.sel2));
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
          this.sel2 = JSON.parse(JSON.stringify(row));
          row.isSet = true;
        }
      },
      //删除带确认区 单行删除
      deleteRow(row, index, rows) {
        this.result.forEach((item, index2) =>{
          if(row.processRouteDetailId == item){
            this.result.splice(index2,1);
          }
        })
        rows.splice(index, 1);
      },
      //删除带确认区 单行删除
      deleteRow2(row, index, rows) {
        this.result.forEach((item, index2) =>{
          if(row.processRouteDetailId == item){
            this.result.splice(index2,1);
          }
        })
        rows.splice(index, 1);
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
