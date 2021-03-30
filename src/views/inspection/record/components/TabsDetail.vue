<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-row :gutter="10">
        <el-button-group style="float:right">
          <el-button :size="'mini'" type="primary" icon="el-icon-picture" @click="downPdf">巡查记录表</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-picture" @click="handlePrint">检查记录表</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="handlerRegister">反馈登记</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="handlerFeedback">完成反馈</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-delete" @click="handlerDel">删除</el-button>
        </el-button-group>
      </el-row>

    </el-form>
  </div>
</template>
<script>
  import { mapGetters } from "vuex";
  import { delPollingrecord } from "@/api/inspection/index";
  export default {
    components: {},
    computed: {
      ...mapGetters(["node","clickData","selections"])
    },
    data() {
      return {
        print:{
          checkNo: null,
          checkStaffName: null,
          checkTime: null,
        },
        search:{}
      };
    },
    methods: {
      downPdf() {
        if (this.clickData.recordId) {
          this.$emit('showPrint', this.clickData)
        } else {
          this.$message({
            message: "无选中行",
            type: "warning"
          });
        }
      }, handlePrint() {
        if (this.clickData.recordId) {
          this.$emit('showPrintF', this.clickData)
        } else {
          this.$message({
            message: "无选中行",
            type: "warning"
          });
        }
      },
      handlerRegister() {
        if (this.clickData.recordId) {
         this.$emit('showInfo', this.clickData)
       } else {
         this.$message({
           message: "无选中行",
           type: "warning"
         });
       }
      },
      handlerDel() {
        if (this.clickData.recordId) {
          delPollingrecord(this.clickData.recordId).then(res => {
            if(res.flag){
              this.$store.dispatch("list/setClickData", '');
              this.$emit('uploadList')
            }
          });
       } else {
         this.$message({
           message: "无选中行",
           type: "warning"
         });
       }
      },
      handlerFeedback() {
        if (this.clickData.recordId) {
          this.$emit('showDetail', this.clickData)
        } else {
          this.$message({
            message: "无选中行",
            type: "warning"
          });
        }
        /*if (this.clickData.loPrId) {
          this.$emit('showDialog', this.clickData)
        } else {
          this.$message({
            message: "无选中行",
            type: "warning"
          });
        }*/
      },
    }
  };
</script>
<style scoped>
  .demonstration{
    font-size: 25px;
  }
  .order_title{
    width: 10%;
  }
  .order_table{
    width: 99.9%;
  }
  .order_table tr th{
    height: 30px;
    line-height: 30px;
  }
</style>
