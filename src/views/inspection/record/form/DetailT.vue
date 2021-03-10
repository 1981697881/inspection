<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'完成时间'" prop="rectifyFinishDate">
            <div class="block" >
              <el-date-picker
                v-model="form.rectifyFinishDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'整改跟踪人'" prop="rectifyUid">
            <el-select v-model="form.rectifyUid" filterable placeholder="请选择" style="width: 100%" >
              <el-option
                v-for="(t,i) in pArray"
                :key="i"
                :label="t.username"
                :value="t.uid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20"  type="flex" justify="center">
        <el-upload
          :action="fileUrl"
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
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'签名'" >
            <div class="demo-image__preview">
              <el-image
                style="width: 100px; height: 100px"
                :src="url"
                :preview-src-list="srcList">
              </el-image>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center;padding-top: 10px">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>
  import { completeRectify } from "@/api/inspection/index";
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
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        srcList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        ],
        imgData: {
        },
        form: {
          rectifyFinishDate: null,
          rectifyUid: null,
        },
        fileUrl:'',
        images: [],
        count: 0,
        hideUpload: false,
        dialogImageUrl: '',
        dialogVisible: false,
        fileList: [],
        limitCount: 3,
        nowImg: [],
        pArray:[],
        rules: {
          rectifyFinishDate: [
            {required: true, message: '请选择', trigger: 'change'},
          ],
          rectifyUid: [
            {required: true, message: '请选择', trigger: 'change'},
          ],
        },
      };
    },
    mounted() {
      this.fileUrl  = `${window.location.origin}/web/file/imgUpload`
      this.fetchFormat();
      if (this.listInfo) {
        this.form.recordId = this.listInfo.recordId
       /* let imgArray = res.data.concernsImg.split(',');
        const path = require('path')
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
        }*/
      }
    },
    methods: {
      //批量上传图片
      submitUpload(val) {
        this.formDate = new FormData();
        this.$refs.upload.submit();
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
        let me = this
        if(res.flag){
          me.count ++
          file.name = res.data;
          this.images.push(res.data)
          if(me.count == fileList.length){
            me.$refs['form'].validate((valid) => {
              // 判断必填项
              if (valid) {
                me.form.rectifyImg = me.images.toString()
                completeRectify(me.form).then(res => {
                  if(res.flag){
                    me.$message({
                      message: res.msg,
                      type: "success"
                    });
                    me.$emit('uploadList')
                    me.$emit('hideDialog')
                  }
                });
              } else {
                return false;
              }
            })
          }
        }
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
        this.count = 0
        this.submitUpload()
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
