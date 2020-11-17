<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-row :gutter="10">
        <el-button-group style="float:right">
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="handlerRegister">整改登记</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="handlerFeedback">整改反馈</el-button>
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
        this.$emit('showDialog')
      },
      handlerFeedback() {
        this.$emit('showInfo')
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
