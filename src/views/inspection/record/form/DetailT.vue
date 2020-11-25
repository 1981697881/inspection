<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="90px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'完成时间'">
            <div class="block" >
              <el-date-picker
                v-model="form.reportDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'整改跟踪人'">
            <el-select v-model="form.loPrName" filterable placeholder="请选择" style="width: 100%" >
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
      <el-row :gutter="20">
        <el-col :span="24" style="text-align: center">
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
        </el-col>
      </el-row>
    </el-form>
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
        images: [],
        hideUpload: false,
        dialogImageUrl: '',
        dialogVisible: false,
        fileList: [],
        limitCount: 5,
        nowImg: [],
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
      console.log(this.listInfo)
      this.fetchFormat();
      if (this.listInfo) {
        this.form = this.listInfo
      }
    },
    methods: {
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
