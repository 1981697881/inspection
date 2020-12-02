<template>
  <div>
      <list
        class="list-main box-shadow"
        :columns="columns"
        :loading="loading"
        :list="list"
        @dblclick="dblclick"
        index
      />
      <el-dialog
        :visible.sync="visible"
        title="详情"
        v-if="visible"
        :width="'60%'"
        destroy-on-close
        append-to-body
      >
        <el-form :model="form" label-width="100px" :size="'mini'">
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item :label="'延期原因'" >
                <el-input v-model="form.delayReason"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item :label="'延期期限'">
                <div class="block">
                  <el-date-picker
                    v-model="form.delayTimeLimit"
                    type="date"
                    style="width:auto"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="'申请人'">
                <el-input v-model="form.proposer"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="'申请日期'" >
                <div class="block">
                  <el-date-picker
                    v-model="form.applicationDate"
                    type="date"
                    style="width:auto"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item :label="'批准人'">
                <el-input v-model="form.ratify"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="'批准日期'">
                <div class="block">
                  <el-date-picker
                    v-model="form.approvalTime"
                    type="date"
                    style="width:auto"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="'整改完成时间'">
                <div class="block">
                  <el-date-picker
                    v-model="form.rectifyFinishDate"
                    type="date"
                    style="width:auto"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item :label="'隐患问题'" >
                <el-input type="textarea" v-model="form.concerns"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item :label="'整改内容'" >
                <el-input type="textarea" v-model="form.opinion"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24" style="text-align: center">
              <el-form-item :label="'图片'" >
                <el-upload
                  action="#"
                  list-type="picture-card"
                  accept="image/jpeg,image/jpg,image/png,image/gif"
                  :data="imgData"
                  :limit="3"
                  name="imgS"
                  :class="{hide:hideUpload}"
                  :file-list="fileList"
                  ref="upload"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible" append-to-body size="tiny">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
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
        imgData: {
        },
        images: [],
        hideUpload: false,
        dialogImageUrl: '',
        dialogVisible: false,
        fileList: [],
        limitCount: 3,
        nowImg: [],
        loading: false,
        visible: false,
        list: {},
        form: {
          clockName: null,
          clockLocation: null,
          checkStaff: null,
          clockTime: null,
          orderNo: null,
          recordDate: null,
          concerns: null,
          opinion: null,
          concernsImg: null,
          rectifyPlanDate: null,
          rectifyName: null,
        },
        columns: [
          { text: "打卡人", name: "clockName" },
          { text: "位置信息", name: "clockLocation" },
          { text: "检查人员", name: "checkStaff" },
          { text: "打卡时间", name: "clockTime" },
          { text: "通知单号", name: "orderNo" },
          { text: "登记日期", name: "recordDate" },
          { text: "隐患问题", name: "concerns" },
          { text: "整改内容", name: "opinion" },
          { text: "隐患图片", name: "concernsImg" },
          { text: "要求整改完成日期", name: "rectifyPlanDate" },
          { text: "整改情况", name: "" },
         /* { text: "整改完成图片", name: "rectifyImg" },*/
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
      dblclick(obj) {
        this.visible = true
        this.form = obj.row
        let imgArray = obj.row.rectifyImg.split(',');
        if (this.img != '') {
          if (imgArray.length > 0) {
            //到图片数量大于3或等于3时添加按钮隐藏
            if (imgArray.length >= 3) {
              this.hideUpload = true;
            } else {
              this.hideUpload = false;
            }
            this.fileList = []
            for (let i in imgArray) {
              this.fileList.push({
                url: this.$store.state.user.url+'/uploadFiles/image/' + imgArray[i]
              })
            }
          } else {
            this.fileList = [];
          }
        }
      },
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
                    .hide .el-upload--picture-card {
                      display: none;
                    }
</style>
