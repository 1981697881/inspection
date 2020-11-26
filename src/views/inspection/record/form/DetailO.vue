<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="80px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item :label="'打卡人'">
            <el-select v-model="form.clockUid" filterable placeholder="请选择" style="width: 100%" >
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
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="检查情况">
            <el-input type="textarea" v-model="form.checkContent"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" justify="center">
        <el-upload
          action="web/file/imgUpload"
          list-type="picture-card"
          accept="image/jpeg,image/jpg,image/png,image/gif"
          :headers="headers"
          :data="imgData"
          :limit="3"
          name="imgS"
          :auto-upload="false"
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
      <el-row :gutter="20" style="padding-top: 10px">
        <el-col :span="8">
          <el-form-item :label="'延期期限'">
            <el-input-number v-model="form.delayTimeLimit"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'申请人'">
            <el-input v-model="form.proposer"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'申请日期'" >
            <div class="block">
              <el-date-picker
                v-model="form.applicationDate"
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
          <el-form-item :label="'批准人'">
            <el-input v-model="form.ratify"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'批准日期'">
            <div class="block">
              <el-date-picker
                v-model="form.approvalTime"
                type="date"
                style="width:auto"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'完成时间'">
            <div class="block">
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
          <el-form-item :label="'延期原因'">
            <el-input type="textarea" v-model="form.delayReason"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import {recordRectifyAdd} from "@/api/inspection/index";
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
          'authorization': getToken('insrx')
        },
        imgData: {},
        fileList: [],
        images: [],
        dialogImageUrl: '',
        dialogVisible: false,
        hideUpload: false,
        limitCount: 3,
        form: {
          clockUid: null,
          clockLocation: null,
          clockTime: null,
          escort: null,
          checkTime: null,
          delayTimeLimit: 0,
          proposer: null,
          applicationDate: null,
          ratify: null,
          approvalTime: null,
          delayReason: null,
          rectifyPlanDate: null,
          checkStaff: null,
          checkContent: null,
        },
        pidS: [],
        pArray: [],
        plArray: [],
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
        delete this.form.recordCheckList
      }
      this.fileList = []
      if (this.img != '' && this.img != null) {
        let imgArray = this.img.split(',');
        //判断当前行是否有img
        if (imgArray.length > 0) {
          //到图片数量大于5或等于5时添加按钮隐藏
          if (imgArray.length >= 5) {
            this.hideUpload = true;
          } else {
            this.hideUpload = false;
          }
          this.fileList = []
          //从table获取img展示到窗口
          for (let i in imgArray) {
            //添加已有图片到数组
            this.images.push(imgArray[i].split('/returnOrder/img/')[1])
            //展示已有图片到窗口
            this.fileList.push({
              url: 'http://120.78.168.141:8090/web' + imgArray[i],
              name: imgArray[i].split('/web/returnOrder/img/')[1]
            })
          }
        } else {
          this.fileList = [];
        }
      }
    },
    methods: {
      uploadFile(file) {
        console.log(file)
        this.formDate.append('imgS', file.file);
      },
      //批量上传图片
      submitUpload(val) {
        this.formDate = new FormData();
        console.log(this.formDate)
        this.$refs.upload.submit();
        /*let config = {
          headers: {
            'authorization': getToken('insrx'),
            'Content-Type': 'multipart/form-data'
          }
        }
        axios.post("/file/imgUpload", this.formDate, config).then(res => {
          if (res.flag) {
            this.$message({
              message: res.msg,
              type: "success"
            });
            this.$emit('hideDialog', false)
            this.$emit('uploadList')
          }
        }).catch(res => {
          console.log(res)
        })*/
      },
      handleChange(file, fileList) {
        this.hideUpload = fileList.length >= this.limitCount;

      },
      //上传失败事件
      uploadError(res) {
        this.$message({
          message: res.msg,
          type: "warning"
        });
        this.$emit('uploadList')
      },
      // 上传成功事件
      uploadSuccess(res, file, fileList) {
        if(res.flag){
          file.name = res.data;
          this.images.push(res.data)
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.$emit('uploadList')
          this.$emit('hideDialog')
        }
      },
      // 删除图片
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
      saveData(form) {
        this.$refs[form].validate((valid) => {
          // 判断必填项
          if (valid) {
            recordRectifyAdd(this.form).then(res => {
              if(res.flag){
                this.submitUpload()
              }
              });
          } else {
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
