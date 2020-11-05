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
            <el-input v-model="search.loPrName" placeholder="单号"/>
          </el-form-item>
        </el-col> <el-col :span="3">
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
        </el-col> <el-col :span="3">
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
        </el-col> <el-col :span="3">
          <el-form-item :label="'类别'">
            <el-select v-model="search.loPrName" filterable style="width: 100%" @change="changeItem">
              <el-option
                v-for="(t,i) in pArray"
                :key="i"
                :label="t.FName"
                :value="t.FItemID">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col> <el-col :span="3">
          <el-form-item :label="'人员'">
            <el-select v-model="search.loPrName" filterable style="width: 100%" @change="changeItem">
              <el-option
                v-for="(t,i) in pArray"
                :key="i"
                :label="t.FName"
                :value="t.FItemID">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col><el-col :span="3">
          <el-form-item :label="'状态'">
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
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
        </el-col>
        <el-button-group style="float:right">
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="handlerAdd">新增</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-edit" @click="handlerAlter">修改</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-delete" @click="Delivery">删除</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-news" @click="Delivery">停用</el-button>
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
      search: {
        loPrName: null
      }
    };
  },

  methods: {
    changeItem(){

    },
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
    audit() {
      if (this.clickData.processRouteId) {
        processAudit(this.clickData.processRouteId).then(res => {
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
      if (this.clickData.processRouteId) {
        processAgainstAudit(this.clickData.processRouteId).then(res => {
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

<style>
</style>
