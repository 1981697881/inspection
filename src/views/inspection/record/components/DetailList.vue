<template>
  <div>
    <list
      class="list-main box-shadow"
      :columns="columns"
      :loading="loading"
      :list="list"
      index
      @handle-size="handleSize"
      @handle-current="handleCurrent"
      @dblclick="dblclick"
      @row-click="rowClick"
    />

  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import { getPollingRecordList, delSupplier} from "@/api/inspection/index";
  import List from "@/components/List";
  export default {
    components: {
      List
    },
    computed: {
      ...mapGetters(["node"])
    },
    data() {
      return {
        loading: false,
        list: {},
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
      dblclick(obj) {
        this.$emit('showDialog', obj.row)
      },
      Delivery(val) {
        delSupplier(val).then(res => {
          if(res.flag){
            this.$store.dispatch("list/setClickData", '');
            this.fetchData();
          }
        });
      },
      uploadPr(val) {
        this.fetchData(val, {
          pageNum: 1,
          pageSize: this.list.size || 50
        })
      },
      //监听单击某一行
      rowClick(obj) {
        this.$store.dispatch("list/setClickData", obj.row);
      },
      uploadPr(val) {
        this.fetchData(val,{
          pageNum: 1,
          pageSize: this.list.size || 50
        })
      },
      fetchData(val, data = {
        pageNum: this.list.current || 1,
        pageSize: this.list.size || 50
      }) {
         this.loading = true;
           getPollingRecordList(data, val).then(res => {
           this.loading = false;
           this.list = res.data;
         });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .list-main {
    height: calc(100vh /2.2);
  }
</style>
