<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-row :gutter="10">
        <!--<el-col :span="4">
          <el-form-item :label="'关键字'">
            <el-input v-model="search.loPrName" placeholder="名称"/>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
        </el-col>-->
        <el-button-group style="float:right">
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="handlerAdd">新增</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-edit" @click="handlerAlter">修改</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-delete" @click="Delivery">删除</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh"   @click="upload">刷新</el-button>
          <el-upload
            name="file"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            accept="xlsx,xls"
            ref="upload"
            :headers="headers"
            :show-file-list="false"
            :action="fileUrl"
            class="upload-demo"
            multiple
            :auto-upload="false"
            :on-change="handleUpload"
            :limit="1"
          >
            <el-button  size="mini" type="primary" icon="el-icon-upload2" >导入</el-button>
            <el-button style="margin-left: 10px;display: none" size="mini" type="success" @click="submitUpload">上传到服务器</el-button>
          </el-upload>
        </el-button-group>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import {getToken} from '@/utils/auth'
export default {
  components: {},
  computed: {
    ...mapGetters(["node","clickData","selections"])
  },
  data() {
    return {
      headers: {
        'authorization': getToken('insrx'),
      },
      fileUrl: '',
      search: {
        loPrName: null
      }
    };
  },
  mounted() {
    this.fileUrl  = `${window.location.origin}/web/excel/import/goodsExcel`
  },
  methods: {
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.search.loPrName != null && this.search.loPrName != '' ? obj.loPrName = this.search.loPrName : null
      return obj
    },
    // 关键字查询
    // 关键字查询
    query() {
      this.$emit('queryBtn', this.qFilter())
    },
    Delivery() {
      if (this.clickData.checkId) {
        this.$confirm('是否删除(' + this.clickData.checkName + ')，删除后将无法恢复?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('delList', this.clickData.checkId)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      } else {
        this.$message({
          message: "无选中行",
          type: "warning"
        })
      }
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    uploadError(res) {
      this.$message({
        message: res.msg,
        type: 'warning'
      });
      this.$emit('uploadList')
    },
    uploadSuccess(res) {
      if(res.flag){
        this.$message({
          message: res.msg,
          type: 'success'
        });
        this.$emit('uploadList')
      }else{
        this.$message({
          message: res.msg,
          type: 'warning'
        });
      }
    },
    handleUpload(file, fileList){
      if(file.status=='ready'){
        this.submitUpload()
      }

    },
    handlerAdd() {
      this.$emit('showDialog')
    },
    upload() {
      this.$emit('uploadList')
    },
    handlerAlter() {
      if (this.clickData.checkId) {
        this.$emit('showDialog', this.clickData)
      } else {
        this.$message({
          message: "无选中行",
          type: "warning"
        });
      }
    },
  }
};
</script>


<style>
  .upload-demo{
    float: right;
  }
</style>

