<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'50px'">
      <el-row :gutter="10">
        <el-col :span="3">
          <el-form-item :label="'状态'">
            <el-select v-model="search.auditStatus" filterable style="width: 100%" @change="changeItem">
              <el-option
                v-for="(t,i) in option"
                :key="i"
                :label="t.label"
                :value="t.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-button-group style="float:right">
          <el-button :size="'mini'" type="primary" icon="el-icon-sort-up" @click="audit">审核</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-sort-down" @click="unAudit">反审核</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-download" @click="exportData">导出</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh"    @click="upload">刷新</el-button>
        </el-button-group>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { recordRectifyAgainstAudit, recordRectifyAudit} from "@/api/inspection/index"
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
      option: [
        {value: 0, label:'未审核'},
        {value: 1, label:'已审核'}],
      pArray: [],
      search: {
        auditStatus: 0
      }
    };
  },

  methods: {
    // 导出
    exportData() {
      this.$emit('exportData')
      let qFilter = this.qFilter()
    },
    changeItem(val){
      this.search.auditStatus = val
      this.$emit('uploadList')
    },
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.search.auditStatus != null ? obj.auditStatus = this.search.auditStatus : null
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
    audit() {
      if (this.clickData.rectifyId) {
        recordRectifyAudit(this.clickData.rectifyId).then(res => {
          this.$emit('uploadList')
        });
      } else {
        this.$message({
          message: "无选中行",
          type: "warning"
        })
      }
    },
    unAudit() {
      if (this.clickData.rectifyId) {
        recordRectifyAgainstAudit(this.clickData.rectifyId).then(res => {
          this.$emit('uploadList')
        });
      } else {
        this.$message({
          message: "无选中行",
          type: "warning"
        })
      }
    },
    upload() {
      this.search.auditStatus = 0
      this.$emit('uploadList')
    },
    handlerAlter() {
      if (this.clickData.rectifyId) {
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
