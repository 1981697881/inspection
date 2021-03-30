<template>
  <div>
    <el-form :size="'mini'">
      <list
        class="list-main box-shadow"
        :columns="columns"
        :loading="loading"
        :list="list"
        @dblclick="dblclick"
        @row-click="rowClick"
        index
      />
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item>
           <!-- <el-button :size="'mini'" type="primary" icon="el-icon-picture" @click="handlePrintO">检查记录表
            </el-button>-->
            <el-button :size="'mini'" type="primary" icon="el-icon-picture" @click="handlePrintT">检查反馈记录表
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog
      :visible.sync="visible"
      title="详情"
      v-if="visible"
      :width="'60%'"
      destroy-on-close
      :close-on-click-modal="false"
      append-to-body
    >
      <el-form :model="form" label-width="100px" :size="'mini'">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item :label="'延期原因'">
              <el-input v-model="form.delayReason" readOnly></el-input>
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
                  readOnly
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'申请人'">
              <el-input v-model="form.proposer" readOnly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'申请日期'">
              <div class="block">
                <el-date-picker
                  v-model="form.applicationDate"
                  type="date"
                  readOnly
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
              <el-input v-model="form.ratify" readOnly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'批准日期'">
              <div class="block">
                <el-date-picker
                  v-model="form.approvalTime"
                  type="date"
                  readOnly
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
                  readOnly
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
            <el-form-item :label="'隐患问题'">
              <el-input type="textarea" readOnly v-model="form.concerns"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item :label="'整改内容'">
              <el-input type="textarea" readOnly v-model="form.opinion"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24" style="text-align: center">
            <el-form-item :label="'图片'">
              <el-upload
                :action="fileUrl"
                list-type="picture-card"
                accept="image/jpeg,image/jpg,image/png,image/gif"
                :headers="headers"
                :data="imgData"
                :limit="3"
                name="imgS"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                :class="{hide:hideUpload}"
                :on-preview="handlePictureCardPreview"
                :on-change="handleChange"
                :file-list="fileList"
                ref="upload"
                :on-remove="handleRemove">
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
    <el-dialog
      :visible.sync="visible2"
      title="记录"
      v-if="visible2"
      :width="'70%'"
      destroy-on-close
      :close-on-click-modal="false"
      append-to-body
    >
      <el-form :size="'mini'" :label-width="'80px'">
        <el-row :gutter="20" v-if="isPrint1" id="all1">
          <div class="block text-center" style="margin-top:15px;">
            <span class="demonstration">{{printData.deptName}}安全生产检查记录表</span>
          </div>
          <table class="order_table" border="1px" cellspacing="0" cellpadding="0">
            <tr>
              <th class="order_title">被检公司</th>
              <th>{{printData.deptName}}</th>
              <th class="order_title">被检项目</th>
              <th>{{printData.proName}}</th>
              <th class="order_title">项目类别</th>
              <th>{{printData.typeName}}</th>
            </tr>
            <tr>
              <th class="order_title">检查人员</th>
              <th colspan="3">{{printData.inspector}}</th>
              <th class="order_title">检查时间</th>
              <th>{{printData.checkTime}}</th>
            </tr>
            <tr>
              <th class="order_title">被检人员</th>
              <th colspan="3">{{printData.checkStaff}}</th>
              <th class="order_title">检查单号</th>
              <th>{{printData.checkNo}}</th>
            </tr>
            <tr>
              <th class="order_title">存在隐患</th>
              <th colspan="5">
                <p style="margin: 0;text-align: left;" v-for="(t,i) in printData.concerns" :key="i">
                  {{i+1}}:{{t}}
                </p>
              </th>
            </tr>
            <tr>
              <th class="order_title">隐患图片</th>
              <th colspan="5">
                <el-image
                  v-for="(t,i) in printData.concernsImg" :key="i"
                  style="width: 100px; height: 100px"
                  :src="imageUrl+t"
                  fit="fit">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </th>
            </tr>
            <tr>
              <th class="order_title">整改意见</th>
              <th colspan="5">
                <p style="margin: 0;text-align: left;" v-for="(t,i) in printData.opinion" :key="i">
                  {{t}}
                </p>
              </th>
            </tr>
            <tr>
              <th class="order_title">备注</th>
              <th colspan="3"></th>
              <th class="order_title">整改期限</th>
              <th>{{printData.rectifyPlanDate}}</th>
            </tr>
            <tr>
              <th class="order_title">被检公司代表签名</th>
              <th colspan="5">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="imageUrl+printData.signature"
                  fit="fit">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </th>
            </tr>
            <tr>
              <th colspan="6">隐患整改反馈</th>
            </tr>
            <tr>
              <th class="order_title">整改内容</th>
              <th colspan="5">{{printData.checkContent}}</th>
            </tr>
            <tr>
              <th class="order_title">整改图片</th>
              <th colspan="5">
                <el-image
                  v-for="(t,i) in printData.rectifyImg" :key="i"
                  style="width: 100px; height: 100px"
                  :src="imageUrl+t"
                  fit="fit">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </th>
            </tr>
            <tr>
              <th class="order_title">整改情况</th>
              <th>{{printData.rectifyContent}}</th>
              <th class="order_title">整改跟踪人</th>
              <th>{{printData.rectifyName}}</th>
              <th class="order_title">完成时间</th>
              <th>{{printData.rectifyFinishDate}}</th>
            </tr>
            <tr>
              <th colspan="6">整改延期反馈</th>
            </tr>
            <tr>
              <th class="order_title">延期原因</th>
              <th colspan="5">{{printData.delayReason}}</th>
            </tr>
            <tr>
              <th class="order_title">整改完成情况</th>
              <th colspan="5">{{printData.rectifyContent}}</th>
            </tr>
            <tr>
              <th class="order_title">延期期限</th>
              <th colspan="3">{{printData.delayTimeLimit}}</th>
              <th class="order_title">申请人</th>
              <th>{{printData.proposer}}</th>
            </tr>
          </table>
        </el-row>
        <el-row :gutter="20" v-if="isPrint2" id="all2">
          <div class="block text-center" style="margin-top:15px;">
            <span class="demonstration">{{printData.deptName}}安全生产检查反馈记录表</span>
          </div>
          <table class="order_table" border="1px" cellspacing="0" cellpadding="0">
            <tr>
              <th class="order_title">被检公司</th>
              <th>{{printData.deptName}}</th>
              <th class="order_title">被检项目</th>
              <th>{{printData.proName}}</th>
              <th class="order_title">项目类别</th>
              <th>{{printData.typeName}}</th>
            </tr>
            <tr>
              <th class="order_title">检查地址</th>
              <th colspan="5">{{printData.typeName}}</th>
            </tr>
            <tr>
              <th class="order_title">检查人员</th>
              <th colspan="3">{{printData.inspector}}</th>
              <th class="order_title">检查时间</th>
              <th>{{printData.checkTime}}</th>
            </tr>
            <tr>
              <th class="order_title">被检人员</th>
              <th colspan="3">{{printData.checkStaff}}</th>
              <th class="order_title">检查单号</th>
              <th>{{printData.checkNo}}</th>
            </tr>
            <tr>
              <th class="order_title">存在隐患</th>
              <th colspan="5">
                <p style="margin: 0;text-align: left;" v-for="(t,i) in printData.concerns" :key="i">
                  {{i+1}}:{{t}}
                </p>
              </th>
            </tr>
            <tr>
              <th class="order_title">隐患图片</th>
              <th colspan="5">
                <el-image
                  v-for="(t,i) in printData.concernsImg" :key="i"
                  style="width: 100px; height: 100px"
                  :src="imageUrl+t"
                  fit="fit">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </th>
            </tr>
            <tr>
              <th class="order_title">整改意见</th>
              <th colspan="5"><p style="margin: 0;text-align: left;" v-for="(t,i) in printData.opinion" :key="i">
                {{t}}
              </p></th>
            </tr>
            <tr>
              <th class="order_title">备注</th>
              <th colspan="3"></th>
              <th class="order_title">整改期限</th>
              <th>{{printData.rectifyPlanDate}}</th>
            </tr>
            <tr>
              <th colspan="6">隐患整改反馈</th>
            </tr>
            <tr>
              <th class="order_title">整改内容</th>
              <th colspan="5">{{printData.checkContent}}</th>
            </tr>
            <tr>
              <th class="order_title">整改图片</th>
              <th colspan="5">
                <el-image
                  v-for="(t,i) in printData.rectifyImg" :key="i"
                  style="width: 100px; height: 100px"
                  :src="imageUrl+t"
                  fit="fit">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </th>
            </tr>
            <tr>
              <th class="order_title">被检公司代表签名</th>
              <th colspan="5">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="imageUrl+printData.signature"
                  fit="fit">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </th>
            </tr>
            <tr>
              <th class="order_title">整改情况</th>
              <th>{{printData.rectifyContent}}</th>
              <th class="order_title">整改跟踪人</th>
              <th>{{printData.rectifyName}}</th>
              <th class="order_title">完成时间</th>
              <th>{{printData.rectifyFinishDate}}</th>
            </tr>
          </table>
        </el-row>
      </el-form>
      <div slot="footer" style="text-align:center;padding-top: 10px">
        <el-button type="primary" @click="downPdf">导出</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {recordRectifyFindList, printRecordRectify, printFindAll, delRectifyImg} from "@/api/inspection/index";
  import List from "@/components/List";
  import html2canvas from 'html2canvas';
  import jspdf from 'jspdf';
  import {
    getToken
  } from '@/utils/auth'

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
        fileUrl: '',
        imgData: {
          rectifyId: null
        },
        images: [],
        headers: {
          'authorization': getToken('insrx'),
        },
        imageUrl: this.$store.state.user.url + '/uploadFiles/image/',
        hideUpload: false,
        isPrint2: false,
        isPrint1: false,
        dialogImageUrl: '',
        dialogVisible: false,
        fileList: [],
        limitCount: 3,
        nowImg: [],
        loading: false,
        visible: false,
        visible2: false,
        printName: '',
        printId: '',
        row: null,
        list: {},
        printData: {},
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
          {text: "打卡人", name: "clockName"},
          {text: "位置信息", name: "clockLocation"},
          {text: "检查人员", name: "inspector"},
          {text: "被检人员", name: "checkStaff"},
          {text: "打卡时间", name: "clockTime"},
          {text: "通知单号", name: "orderNo"},
          {text: "登记日期", name: "recordDate"},
          {text: "隐患问题", name: "concerns"},
          {text: "整改内容", name: "opinion"},
          {text: "隐患图片", name: "concernsImg"},
          {text: "要求整改完成日期", name: "rectifyPlanDate"},
          /*  {text: "整改情况", name: ""},*/
          /* { text: "整改完成图片", name: "rectifyImg" },*/
          {text: "整改跟踪人", name: "rectifyName"},
          /* {text: "完成时间", name: ""},*/
        ]
      };
    },
    mounted() {
      this.fileUrl = `${window.location.origin}/web/record-rectify/imgUpload`
      if (this.listInfo) {
        this.fetchFormat({recordId: this.listInfo.recordId})
      }
    },
    methods: {
      //上传失败事件
      uploadError(res) {
        console.log(res)
        this.$message({
          message: res.msg,
          type: "warning"
        });
        this.$emit('uploadList')
      },
      //上传成功事件
      uploadSuccess(res, file, fileList) {
        file.name = res.data;
        this.fileList.push({
          url: this.$store.state.user.url + '/uploadFiles/image/' + res.data
        })
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.$emit('uploadList')
      },
      //删除图片
      handleRemove(file, fileList) {
        let array = this.fileList;
        let img = file.url.split(this.$store.state.user.url + '/uploadFiles/image/')[1]
        delRectifyImg({img: img, rectifyId: this.imgData.rectifyId}).then(res => {
          if (res.flag) {
            array.forEach((item, index) => {
              if (item.url.split(this.$store.state.user.url + '/uploadFiles/image/')[1] == img) {
                array.splice(index, 1);
              }
            })
            this.hideUpload = false;
            this.$emit('uploadList')
          }
        });
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleChange(file, fileList) {
        this.hideUpload = fileList.length >= this.limitCount;
      },
      //监听单击某一行
      rowClick(obj) {
        this.row = obj.row
      },
      downPdf() {
        window.scrollTo(0, 0) //注意这里必须设置为顶部不然会出现图片不全
        let that = this;
        html2canvas(document.querySelector(that.printId), {//对应的dom元素id
          allowTaint: true
        }).then(function (canvas) {
          var contentWidth = canvas.width;
          var contentHeight = canvas.height;

          //一页pdf显示html页面生成的canvas高度;
          var pageHeight = contentWidth / 595.28 * 841.89;
          //未生成pdf的html页面高度
          var leftHeight = contentHeight;
          //pdf页面偏移
          var position = 0;
          //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
          var imgWidth = 555.28;
          var imgHeight = 555.28 / contentWidth * contentHeight;

          var pageData = canvas.toDataURL('image/jpeg', 1.0);

          var pdf = new jspdf('', 'pt', 'a4');
          //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
          //当内容未超过pdf一页显示的范围，无需分页
          if (leftHeight < pageHeight) {
            pdf.addImage(pageData, 'JPEG', 20, 0, imgWidth, imgHeight);
          } else {
            while (leftHeight > 0) {
              pdf.addImage(pageData, 'JPEG', 20, position, imgWidth, imgHeight)
              leftHeight -= pageHeight;
              position -= 841.89;
              //避免添加空白页
              if (leftHeight > 0) {
                pdf.addPage();
              }
            }
          }
          pdf.save(that.printName + '.pdf');
        })
      },
      handlePrintO(val) {
        this.printName = ''
        this.fetchData({recordId: this.listInfo.recordId})
        this.isPrint1 = true
        this.isPrint2 = false
        this.printId = '#all1'
        this.printName = '检查记录表'
        this.visible2 = true
      },
      handlePrintT(val) {
        if (this.row) {
          this.printName = ''
          this.fetchDataT(this.row.rectifyId)
          this.isPrint1 = false
          this.isPrint2 = true
          this.printId = '#all2'
          this.printName = '检查反馈记录表'
          this.visible2 = true
        } else {
          this.$message({
            message: "无选中行",
            type: "warning"
          });
        }
      },
      dblclick(obj) {
        this.visible = true
        this.form = obj.row
        this.imgData.rectifyId = obj.row.rectifyId
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
                url: this.$store.state.user.url + '/uploadFiles/image/' + imgArray[i]
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
      fetchData(val) {
        printFindAll(val).then(res => {
          this.printData = res.data
          this.printData.concerns = res.data.concerns.split(',')
          this.printData.concernsImg = res.data.concernsImg.split(',')
          this.printData.opinion = res.data.opinion.split('。')
          this.printData.rectifyImg = res.data.rectifyImg.split(',')
        });
      },
      fetchDataT(val) {
        printRecordRectify(val).then(res => {
          this.printData = res.data
          this.printData.concerns = res.data.concerns.split(',')
          this.printData.concernsImg = res.data.concernsImg.split(',')
          this.printData.opinion = res.data.opinion.split('。')
          this.printData.rectifyImg = res.data.rectifyImg.split(',')
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

  .hide .el-upload--picture-card {
    display: none;
  }
</style>
<style lang="scss" scoped>
  .list-main {
    height: calc(100vh / 3);
  }

  .demonstration {
    font-size: 25px;
  }

  .order_title {
    width: 10%;
  }

  .order_table {
    width: 99%;
    height: 1250px;
  }

  .order_table tr th {
    height: 30px;
    line-height: 30px;
  }
</style>
