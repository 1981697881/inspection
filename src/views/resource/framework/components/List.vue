<template>
  <div>
    <list
      class="list-main box-shadow"
      :columns="columns"
      :loading="loading"
      :list="list"
      index
      type
      @handle-size="handleSize"
      @handle-current="handleCurrent"
      @dblclick="dblclick"
      @row-click="rowClick"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { getDepartmentList } from "@/api/basic/index"
import List from "@/components/List"

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
      visible: false,
      list: {},
      fid: null,
      type: null,
      checkDate:null,
      columns: [
        { text: "编码", name: "deptCode" },
        { text: "名称", name: "deptName" },
        { text: "上级组织", name: "deptParentName" },
        { text: "组织属性", name: "orgAttr" },
        { text: "状态", name: "disableDesc" },
      ]
    };
  },

  methods: {
    handlerForm() {},
    // 监听每页显示几条
    handleSize(val) {
      this.list.size = val
      this.fetchData()
    },
    // 监听当前页
    handleCurrent(val) {
      this.list.current = val
      this.fetchData()
    },
    dblclick(obj) {
      this.$emit('showDialog', obj.row)
    },
    // 监听单击某一行
    rowClick(obj) {
      this.checkDate = obj
      this.$emit('showTree', obj)
      this.$store.dispatch("list/setClickData", obj.row)
    },
    fetchData(fid, type) {
      this.loading = true;
      const data = {
        pageNum: this.list.current || 1,
        pageSize: this.list.size || 50
      }
      getDepartmentList(data).then(res => {
        this.loading = false
        this.list = res.data
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.list-main {
  height: calc(100vh - 250px);
}
</style>
