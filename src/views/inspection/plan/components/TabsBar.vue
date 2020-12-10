<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'50px'">
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
        <el-col :span="3">
          <el-form-item :label="'单号'">
            <el-input v-model="search.planNo" placeholder="单号"/>
          </el-form-item>
        </el-col>
       <!-- <el-col :span="3">
          <el-form-item :label="'单位'">
            <el-select v-model="search.loPrName" filterable style="width: 100%" @change="changeItem">
              <el-option
                v-for="(t,i) in pArray"
                :key="i"
                :label="t.FName"
                :value="t.FItemID">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="'项目'">
            <el-select v-model="search.loPrName" filterable style="width: 100%" @change="changeItem">
              <el-option
                v-for="(t,i) in pArray"
                :key="i"
                :label="t.FName"
                :value="t.FItemID">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>-->
        <el-col :span="3">
          <el-form-item :label="'类别'">
            <el-select v-model="search.typeId" filterable style="width: 100%" @change="changeType">
              <el-option
                v-for="(t,i) in pArray"
                :key="i"
                :label="t.typeName"
                :value="t.typeId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="'人员'">
            <el-select v-model="search.uid" filterable style="width: 100%" @change="changeUser">
              <el-option
                v-for="(t,i) in rArray"
                :key="i"
                :label="t.username"
                :value="t.uid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col><el-col :span="3">
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
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
        </el-col>
        <el-button-group style="float:right">
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="handlerAdd">新增</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-edit" @click="handlerAlter">修改</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-delete" @click="Delivery">删除</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-news" @click="">停用</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-sort-up" @click="audit">审核</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-sort-down" @click="unAudit">反审核</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh"    @click="upload">刷新</el-button>
        </el-button-group>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { dProjectTypeFormat} from "@/api/basic/index";
import { userFormat } from "@/api/system/index";
import { pollingPlanAgainstAudit, pollingPlanAudit} from "@/api/inspection/index"
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
      pArray: [],
      rArray: [],
      option: [
        {value: 0, label:'未审核'},
        {value: 1, label:'已审核'}],
      search: {
        planNo: null,
        typeId: null,
        uid: null,
        auditStatus: 0,
      }
    };
  },
  mounted() {
  this.fetchFormat()
  },
  methods: {
    changeItem(val){
      this.search.auditStatus = val
      this.$emit('uploadList')
    }, changeType(val){
      this.search.typeId = val
      this.$emit('uploadList')
    }, changeUser(val){
      this.search.uid = val
      this.$emit('uploadList')
    },
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.search.uid != null && this.search.uid != '' ? obj.uid = this.search.uid : null
      this.search.typeId != null && this.search.typeId != '' ? obj.typeId = this.search.typeId : null
      this.search.planNo != null && this.search.planNo != '' ? obj.planNo = this.search.planNo : null
      obj.auditStatus = this.search.auditStatus
      this.value != null && this.value != undefined ? obj.endDate = this.value[1] : null
      this.value != null && this.value != undefined ? obj.startDate = this.value[0] : null
      return obj
    },
    // 关键字查询
    // 关键字查询
    query() {
      this.$emit('queryBtn', this.qFilter())
    },
    Delivery() {
      if (this.clickData.planId) {
        this.$confirm('是否删除(' + this.clickData.planNo + ')，删除后将无法恢复?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('delList', this.clickData.planId)
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
    audit() {
      if (this.clickData.planId) {
        pollingPlanAudit(this.clickData.planId).then(res => {
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
      if (this.clickData.planId) {
        pollingPlanAgainstAudit(this.clickData.planId).then(res => {
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
      this.search.uid = null
      this.search.typeId = null
      this.search.planNo = null
      this.search.auditStatus = 0
      this.value = []
      this.$emit('uploadList')
    },
    handlerAlter() {
      if (this.clickData.planId) {
        this.$emit('showDialog', this.clickData)
      } else {
        this.$message({
          message: "无选中行",
          type: "warning"
        });
      }
    },
    fetchFormat() {
      userFormat().then(res => {
        if(res.flag){
          this.rArray = res.data
        }
      });
      dProjectTypeFormat().then(res => {
        if(res.flag){
          this.pArray = res.data
        }
      });
    },
  }
};
</script>

<style>
</style>
