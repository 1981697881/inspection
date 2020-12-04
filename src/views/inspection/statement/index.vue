<template>
  <div class="app-list">
    <div class="list-containerOther">
      <div>
        <tabs-bar ref="tabs" @showDialog="handlerDialog" @exportData="exportData"  @uploadList="upload" @queryBtn="query"/>
      </div>
      <list ref="list"  @uploadList="uploadPage" @showDialog="handlerDialog"/>
    </div>
    <el-dialog
      :visible.sync="visible"
      title="打印"
      v-if="visible"
      :width="'80%'"
      destroy-on-close
    >
      <print  @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></print>
    </el-dialog>
  </div>
</template>

<script>
import { TabsBar, List } from "./components";
import { Print } from "./form";
export default {
  components: {
    TabsBar,
    List,
    Print
  },
  data() {
    return {
      visible: null,
      listInfo: null,
    };
  },
  mounted() {
    this.$refs.list.fetchData(this.$refs.tabs.qFilter())
  },
  methods: {
    exportData() {
      console.log(123)
      this.$refs.list.ExportData()
    },
    hideWindow(val) {
      this.visible = val
    },
    handlerDialog(obj) {
      this.listInfo = null
      if(obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visible = true
    },
    // 更新列表
    upload() {
      this.$refs.list.uploadPr(this.$refs.tabs.qFilter())
    },
    uploadPage(val) {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    },
    // 查询
    query() {
      this.$refs.list.uploadPr(this.$refs.tabs.qFilter())
    },
  }
};
</script>

<style lang="scss" scoped>
</style>
