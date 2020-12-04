<template>
  <div>
    <list
      class="list-main box-shadow"
      :columns="columns"
      :loading="loading"
      :list="list"
      index
    />
  </div>
</template>

<script>
  import {clockList} from "@/api/basic/index";
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
        columns: [
          {text: "打卡人", name: "clockName"},
          {text: "打卡时间", name: "clockTime"},
          {text: "地址", name: "clockLocation"},
        ]
      };
    },
    mounted() {
      if (this.listInfo) {
        console.log(this.listInfo.uid)
        this.fetchFormat(this.listInfo.uid)
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
        console.log(val)
        clockList(val).then(res => {
          console.log(clockList)
          this.loading = false;
          this.list = {records: res.data}
        });
      },
    }
  };
</script>


<style lang="scss" scoped>
  .list-main {
    height: calc(100vh / 3);
  }
</style>
