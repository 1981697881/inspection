<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-row :gutter="10">
        <el-button-group style="float:right">
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="handlerRegister">反馈登记</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="handlerFeedback">完成反馈</el-button>
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

      };
    },
    methods: {
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

<style>
</style>
