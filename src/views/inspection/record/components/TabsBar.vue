<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-row :gutter="10">
       <!-- <el-col :span="4">
          <el-form-item :label="'关键字'">
            <el-input v-model="search.loPrName" placeholder="名称"/>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
        </el-col>-->
        <el-button-group style="float:right">
         <!-- <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="handlerAdd">新增</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-edit" @click="handlerAlter">修改</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-delete" @click="Delivery">删除</el-button>-->
         <!-- <el-button :size="'mini'" type="primary" icon="el-icon-edit" @click="handlerAdd">检查登记</el-button>-->


          <el-button :size="'mini'" type="primary" icon="el-icon-download" @click="exportData">导出</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh"   @click="upload">刷新</el-button>
        </el-button-group>
      </el-row>

    </el-form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  components: {},
  computed: {
    ...mapGetters(["node","clickData","selections"])
  },
  data() {
    return {
      search: {
        loPrName: null
      }
    };
  },

  methods: {
    // 导出
    exportData() {
      this.$emit('exportData')
      let qFilter = this.qFilter()
    },
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.search.loPrName != null && this.search.loPrName != '' ? obj.loPrName = this.search.loPrName : null
      obj.auditStatus = 1
      return obj
    },
    // 关键字查询
    // 关键字查询
    query() {
      this.$emit('queryBtn', this.qFilter())
    },
    Delivery() {
      if (this.clickData.loPrId) {
        this.$confirm('是否删除(' + this.clickData.loPrName + ')，删除后将无法恢复?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('delList', this.clickData.loPrId)
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
    handlerAdd() {
      this.$emit('showDialog')
    },
    handlerInfo() {
      this.$emit('showInfo')
    },
    upload() {
      this.$emit('uploadList')
    },
    handlerAlter() {
      if (this.clickData.loPrId) {
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

<style scoped>
  .order_title{
    width: 10%;
  }
  .order_table{
    width: 99%;
  }
  .order_table tr th{
    height: 30px;
    line-height: 30px;
  }
</style>
