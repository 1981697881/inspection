<template>
  <div class="app-list">
    <!--<Tree ref="tree" class="list-tree" />-->
    <div class="list-containerOther">
      <div>
        <tabs-bar ref="tabs" @showDialog="handlerDialog" @showClockIn="handlerClockIn" @delList="delList" @delGroup="delGroup" @uploadAll="uploadAll" @queryBtn="query" @showGroupDialog="groupDialog"  />
      </div>
      <list ref="list" @showDialog="handlerDialog"  />
    </div>
    <el-dialog
      :visible.sync="visible"
      title="用户信息"
      v-if="visible"
      :width="'40%'"
      destroy-on-close
      :close-on-click-modal="false"
    >
      <info @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></info>

    </el-dialog>
    <el-dialog
      :visible.sync="visible2"
      title="用户组信息"
      v-if="visible2"
      :width="'40%'"
      destroy-on-close
      :close-on-click-modal="false"
    >
      <group @hideGroupDialog="hideGroupWindow" @uploadGroup="uploadGroup" :gpInfo="gpInfo"></group>
    </el-dialog>
    <el-dialog
      :visible.sync="visible3"
      title="打卡信息"
      v-if="visible3"
      :width="'50%'"
      destroy-on-close
      :close-on-click-modal="false"
    >
      <detail-t @hideGroupDialog="hideGroupWindow" @uploadGroup="uploadGroup" :listInfo="listInfo"></detail-t>
    </el-dialog>
  </div>
</template>

<script>
import { Tree, TabsBar, List } from "./components";
import { Info, Group, DetailT } from "./form";
export default {
  components: {
    Tree,
    TabsBar,
    List,
    Group,
    DetailT,
    Info
  },
  data() {
    return {
      visible: null,
      gpInfo: null,
      listInfo: null,
      visible2: null,
      visible3: null,
      floorId: null
    }
  },
  mounted() {
    this.$refs.list.fetchData()
  },
  methods: {
    hideWindow(val) {
      this.visible = val
    },
    hideGroupWindow(val) {
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
    handlerClockIn(obj) {
      this.listInfo = null
      if(obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visible3 = true
    },
    groupDialog(obj) {
      this.gpInfo = null
      if(obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.gpInfo = info
      }
      this.visible2 = true
    },
    // 更新列表
    upload() {
      this.$refs.list.uploadPr()
    },
    // 更新列表
    uploadAll() {
      this.$refs.list.uploadPr()
      this.$refs.tree.fetchData()
    },
    // 更新列表
    uploadGroup() {
      this.$refs.tree.fetchData()
    },
    delList(val) {
      if(val) {
        this.$refs.list.Delivery(val)
      }
    },// 查询
    query() {
      this.$refs.list.uploadPr(this.$refs.tabs.qFilter())
    },
    delGroup(val) {
      if(val) {
        this.$refs.tree.Delivery(val)
      }
    }

  }
}
</script>

<style lang="scss" scoped>
</style>
