<template>
  <div class="app-list">
    <!--<Tree class="list-tree" @handler-node="handlerNode" />-->
    <el-container class="list-containerOther">
      <el-header style="padding: 0;height: auto">
        <tabs-bar ref="tabs" @showDialog="handlerDialog" @exportData="exportData" @showInfo="handlerInfo" @delList="delivery" @uploadList="upload" @queryBtn="query"/>
      </el-header>
      <el-main style="padding: 0;flex: 0.1">
        <list ref="list" @handlerClick="clickT" @uploadList="upload"   @showDialog="handlerDialog"/>
      </el-main>
      <el-footer style="padding: 0">
        <tabs-detail @showDialog="handlerDialog" @uploadList="uploadDlist" @showDetail="handlerDetail" @showPrint="handlerPrint" @showPrintF="handlerPrintF" @showInfo="handlerInfo" @delList="delivery" @queryBtn="query"/>
        <d-list ref="dlist" @uploadList="uploadDlist"  @showDialog="showList"/>
      </el-footer>
    </el-container>
    <el-dialog
      :visible.sync="visible"
      title="检查登记"
      v-if="visible"
      :width="'70%'"
      destroy-on-close
      :close-on-click-modal="false"
    >
      <info  @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></info>
    </el-dialog>
    <el-dialog
      :visible.sync="visible2"
      title="整改反馈"
      v-if="visible2"
      :width="'70%'"
      destroy-on-close
      :close-on-click-modal="false"
    >
      <info-o @hideDialog="hideWindowO" @uploadList="upload" :listInfo="listInfo"></info-o>
    </el-dialog>
    <el-dialog
      :visible.sync="visible3"
      title="完成反馈"
      v-if="visible3"
      :width="'70%'"
      destroy-on-close
      :close-on-click-modal="false"
    >
      <info-t @hideDialog="hideWindowT" @uploadList="upload" :listInfo="listInfo"></info-t>
    </el-dialog>
    <el-dialog
      :visible.sync="visible4"
      title="检查记录"
      v-if="visible4"
      :width="'80%'"
      destroy-on-close
      :close-on-click-modal="false"
    >
      <info-th @hideDialog="hideWindowTh" @uploadList="upload" :listInfo="listInfo"></info-th>
    </el-dialog>
    <el-dialog
      :visible.sync="visible5"
      title="记录"
      v-if="visible5"
      :width="'80%'"
      destroy-on-close
      :close-on-click-modal="false"
    >
      <print @hideDialog="hidePrint" :listInfo="listInfo"></print>
    </el-dialog>
    <el-dialog
      :visible.sync="visible6"
      title="记录"
      v-if="visible6"
      :width="'80%'"
      destroy-on-close
      :close-on-click-modal="false"
    >
      <info-f @hideDialog="hidePrintF" :listInfo="listInfo"></info-f>
    </el-dialog>
  </div>
</template>

<script>
import { TabsBar, List, DList,TabsDetail } from "./components";
import { Info, InfoO, InfoT, InfoTh, Print,InfoF } from "./form";

export default {
  components: {
    TabsBar,
    List,
    DList,
    Info,
    TabsDetail,
    InfoO,
    InfoT,
    Print,
    InfoF,
    InfoTh,
  },
  data() {
    return {
      visible: null,
      visible2: null,
      visible3: null,
      visible4: null,
      visible5: null,
      visible6: null,
      oid: null,
      listInfo: null,
      treeId: null, // null
      planId: null,
      floorId: null
    };
  },
  mounted() {
    this.$refs.list.fetchData(this.$refs.tabs.qFilter())
  },
  methods: {
    exportData() {
      this.$refs.list.ExportData()
    },
    clickT(val){
      this.planId = val.planId
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
    hideWindowO(val) {
      this.visible2 = val
    },
    hideWindowT(val) {
      this.visible3 = val
    },
    hideWindowTh(val) {
      this.visible4 = val
    }, hidePrint(val) {
      this.visible5 = val
    },
    hidePrintF(val) {
      this.visible6 = val
    },
    handlerDialog(obj) {
      this.listInfo = null
      if(obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visible = true
    },handlerPrint(obj) {
      this.listInfo = null
      if(obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visible5 = true
    },handlerPrintF(obj) {
      this.listInfo = null
      if(obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visible6 = true
    },
    handlerInfo(obj) {
      this.listInfo = null
      if(obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visible2 = true
    },
    handlerDetail(obj) {
      this.listInfo = null
      if(obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visible3 = true
    },
    showList(obj) {
      this.listInfo = null
      if(obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visible4 = true
    },
    // 查询
    query(val) {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    },
    // 更新列表
    upload() {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    },// 更新列表
    uploadDlist() {
      this.$refs.dlist.fetchData({planId: this.planId})
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
