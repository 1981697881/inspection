<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item :label="'所属公司'">
            <el-select v-model="search.deptId" filterable class="width-full" placeholder="所属公司" @change="selectDeptId">
              <el-option :label="t.deptName" :value="t.deptId" v-for="(t,i) in rArray"  :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label-width="'100px'" :label="'项目编码/名称'">
            <el-input v-model="search.keyword" placeholder="项目编码/名称"/>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查找</el-button>
        </el-col>
        <el-button-group style="float:right">
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="handlerAdd">新增</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-edit" @click="handlerAlter">修改</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-delete" @click="Delivery">删除</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh"    @click="upload">刷新</el-button>
        </el-button-group>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { departmentList } from "@/api/basic/index";
export default {
  components: {},
  computed: {
    ...mapGetters(["node","clickData","selections"])
  },
  data() {
    return {
      rArray: [],
      search: {
        keyword: null,
        deptId: null,
      }
    };
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    // 下拉选择之后刷新页面
    selectDeptId(val) {
      this.search.deptId = val
      this.$emit('uploadList')
    },
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.search.deptId != null && this.search.deptId != '' ? obj.deptId = this.search.deptId : null
      this.search.keyword != null && this.search.keyword != '' ? obj.keyword = this.search.keyword : null
      return obj
    },
    // 关键字查询
    // 关键字查询
    query() {
      this.$emit('queryBtn', this.qFilter())
    },
    Delivery() {
      if (this.clickData.proId) {
        this.$confirm('是否删除(' + this.clickData.proName + ')，删除后将无法恢复?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('delList', this.clickData.proId)
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
    // 获取下拉
    fetchData() {
      departmentList().then(res => {
        if(res.flag){
          this.rArray = res.data
        }
      });
    },
    upload() {
      this.search.deptId = null
      this.search.keyword = null
      this.$emit('uploadList')
    },
    handlerAlter() {
      if (this.clickData.proId) {
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
</style>
