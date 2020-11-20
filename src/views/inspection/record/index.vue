<template>
  <div class="app-list">
    <!--<Tree class="list-tree" @handler-node="handlerNode" />-->
    <el-container class="list-containerOther">
      <el-header style="padding: 0;height: auto">
        <tabs-bar ref="tabs" @showDialog="handlerDialog" @showInfo="handlerInfo" @delList="delivery" @uploadList="upload" @queryBtn="query"/>
      </el-header>
      <el-main style="padding: 0;flex: 0.1">
        <list ref="list" @handlerClick="clickT" @uploadList="upload"  @showDialog="handlerDialog"/>
      </el-main>
      <el-footer style="padding: 0">
        <tabs-detail @showDialog="handlerDialog" @showInfo="handlerInfo" @delList="delivery" @uploadList="upload" @queryBtn="query"/>
        <d-list ref="dlist" @uploadList="upload"  @showDialog="handlerDialog"/>
      </el-footer>
    </el-container>
    <el-dialog
      :visible.sync="visible"
      title="检查登记"
      v-if="visible"
      v-dialogDrag
      :width="'70%'"
      destroy-on-close
    >
      <info @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></info>
    </el-dialog>
    <el-dialog
      :visible.sync="visible2"
      title="整改反馈"
      v-if="visible2"
      v-dialogDrag
      :width="'70%'"
      destroy-on-close
    >
      <info-o @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></info-o>
    </el-dialog>
  </div>
</template>

<script>
import { TabsBar, List, DList,TabsDetail } from "./components";
import { Info, InfoO, InfoT } from "./form";

export default {
  components: {
    TabsBar,
    List,
    DList,
    Info,
    TabsDetail,
    InfoO,
    InfoT,
  },
  data() {
    return {
      visible: null,
      visible2: null,
      oid: null,
      listInfo: null,
      treeId: null, // null
      floorId: null
    };
  },
  mounted() {
    this.$refs.list.fetchData(this.$refs.tabs.qFilter())
  },
  methods: {
    clickT(val){
      this.$refs.dlist.fetchData({planId: val.planId})
    },
    delivery(obj) {
      if(obj) {
        this.$refs.list.Delivery(obj)
      }
    },
    hideWindow(val) {
      this.visible = val
    },
    hideWindowT(val) {
      this.visible2 = val
    },
    handlerDialog(obj) {
      this.listInfo = null
      if(obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visible = true
    },
    handlerInfo(obj) {
      this.listInfo = null
      if(obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visible2 = true
    },
    // 查询
    query(val) {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    },
    // 更新列表
    upload() {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
