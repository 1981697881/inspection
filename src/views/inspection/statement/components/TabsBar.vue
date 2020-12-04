<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-row :gutter="10">
        <el-col :span="6" style="display: inline-block">
          <el-form-item :label="'日期'">
            <el-date-picker
              v-model="value"
              type="daterange"
              style="width: auto"
              align="right"
              class="input-class"
              unlink-panels
              range-separator="至"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="'所属公司'">
            <el-select v-model="search.plId" class="width-full" placeholder="所属公司" @change="selectDeptId">
              <el-option :label="t.deptName" :value="t.deptId" v-for="(t,i) in pArray"  :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col><el-col :span="4">
          <el-form-item :label="'项目名称'">
            <el-input v-model="search.proName" placeholder="项目名称"/>
          </el-form-item>
        </el-col><el-col :span="4">
          <el-form-item :label="'项目类别'">
            <el-select v-model="search.typeId" class="width-full" placeholder="项目类别" @change="selectTypeId">
              <el-option :label="t.typeName" :value="t.typeId" v-for="(t,i) in rArray"  :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
        </el-col>
        <el-button-group style="float:right">
          <el-button :size="'mini'" type="primary" icon="el-icon-download" @click="exportData">导出</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-printer" @click="handlerAlter" >打印</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="upload">刷新</el-button>
        </el-button-group>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { dProjectTypeFormat, departmentList } from "@/api/basic/index";
export default {
  components: {},
  computed: {
    ...mapGetters(["node","clickData","selections"])
  },
  data() {
    return {
      value: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      rArray: [],
      pArray: [],
      search: {
        deptId: null,
        proName: null,
        typeId: null
      }
    };
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    // 导出
    exportData() {
      this.$emit('exportData')
    },
    // 下拉选择之后刷新页面
    selectDeptId(val) {
      this.search.deptId = val
      this.$emit('uploadList')
    },
    // 下拉选择之后刷新页面
    selectTypeId(val) {
      this.search.typeId = val
      this.$emit('uploadList')
    },
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.search.deptId != null && this.search.deptId != '' ? obj.deptId = this.search.deptId : null
      this.search.proName != null && this.search.proName != '' ? obj.proName = this.search.proName : null
      this.search.typeId != null && this.search.typeId != '' ? obj.typeId = this.search.typeId : null
      this.value != null && this.value != undefined ? obj.endDate = this.value[1] : null
      this.value != null && this.value != undefined ? obj.startDate = this.value[0] : null
      return obj
    },
    // 关键字查询
    // 关键字查询
    query() {
      this.$emit('queryBtn', this.qFilter())
    },
    handlerAdd() {
      this.$emit('showDialog')
    },
    upload() {
      this.search.deptId = null
      this.search.proName = null
      this.search.typeId = null
      this.value = []
      this.$emit('uploadList')
    },
    // 获取下拉
    fetchData() {
      dProjectTypeFormat().then(res => {
        if(res.flag){
          this.rArray = res.data
        }
      });
      departmentList().then(res => {
        if(res.flag){
          this.pArray = res.data
        }
      });
    },
    handlerAlter() {
      if (this.clickData.orderNo) {
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
