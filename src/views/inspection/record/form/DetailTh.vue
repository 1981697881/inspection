<template>
  <div>
    <el-form :model="form" ref="form" label-width="90px" :size="'mini'">
      <list
        class="list-main box-shadow"
        :columns="columns"
        :loading="loading"
        :list="list"
        index
      />
    </el-form>
  </div>
</template>

<script>
  import { recordRectifyFindList } from "@/api/inspection/index";
  import List from "@/components/List";
  export default {
    components: {
      List
    },
    props: {
      listInfo: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        loading: false,
        list: {},
        form: {},
        columns: [
          { text: "打卡人", name: "clockUid" },
          { text: "位置信息", name: "clockLocation" },
          { text: "检查人员", name: "checkStaff" },
          { text: "打卡时间", name: "clockTime" },
          { text: "通知单号", name: "orderNo" },
          { text: "登记日期", name: "recordDate" },
          { text: "隐患问题", name: "concerns" },
          { text: "整改内容", name: "opinion" },
          { text: "隐患图片", name: "concernsImg" },
          { text: "要求整改完成日期", name: "orderNo" },
          { text: "整改情况", name: "" },
          { text: "整改完成图片", name: "rectifyImg" },
          { text: "整改跟踪人", name: "rectifyUid" },
          { text: "完成时间", name: "" },
        ]
      };
    },
    mounted() {
      if (this.listInfo) {
        this.fetchFormat({recordId: this.listInfo.recordId})
      }
    },
    methods: {
      //监听每页显示几条
      handleSize(val) {
        this.list.size = val
        this.$emit('uploadList')
      },
      //监听当前页
      handleCurrent(val) {
        this.list.current = val
        this.$emit('uploadList')
      },
      fetchFormat(val) {
        this.loading = true;
        recordRectifyFindList(val).then(res => {
          this.loading = false;
          this.list = {records: res.data}
        });
      },
    }
  };
</script>

<style>
  .el-table-add-row {
    margin-top: 10px;
    width: 100%;
    height: 34px;
    border: 1px dashed #c1c1cd;
    border-radius: 3px;
    cursor: pointer;
    justify-content: center;
    display: flex;
    line-height: 34px;
  }
</style>
<style lang="scss" scoped>
  .list-main {
    height: calc(100vh/3);
  }
</style>
