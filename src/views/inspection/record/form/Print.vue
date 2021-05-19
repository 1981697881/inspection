<template>
  <div>
    <el-form :size="'mini'" :label-width="'80px'">
      <el-row :gutter="20" id="all">
        <div class="block text-center" style="margin-top:15px;">
          <span class="demonstration">{{print.deptName}}安全生产巡查记录表</span>
        </div>
        <table class="order_table"  border="1px" cellspacing="0" cellpadding="0">
          <tr>
            <th class="order_title">被检公司</th>
            <th>{{print.deptName}}</th>
            <th class="order_title">被检项目</th>
            <th>{{print.proName}}</th>
            <th class="order_title">项目类别</th>
            <th>{{print.typeName}}</th>
          </tr>
          <tr>
            <th class="order_title">检查地址</th>
            <th colspan="5">{{print.clockLocation}}</th>
          </tr>
          <tr>
            <th class="order_title">检查人员</th>
            <th colspan="3">{{print.inspector}}</th>
            <th class="order_title">检查时间</th>
            <th>{{print.clockTime}}</th>
          </tr>
          <tr>
            <th class="order_title">被检人员</th>
            <th colspan="3">{{print.checkStaff}}</th>
            <th class="order_title">检查单号</th>
            <th>{{print.checkNo}}</th>
          </tr>
          <tr>
            <th class="order_title">序号</th>
            <th class="order_title">是否检查（检查完成打√，如发现问题打△）</th>
            <th colspan="4">检查项目</th>
          </tr>
          <tr v-for="(t,i) in print.recordCheckList" :key="i">
            <td class="order_title">{{i+1}}</td>
            <td class="order_title">√</td>
            <td colspan="4">{{t.checkName}}</td>
          </tr>
        </table>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center;padding-top: 10px">
      <el-button type="primary" @click="downPdf">导出</el-button>
    </div>
  </div>
</template>
<script>
  import html2canvas from 'html2canvas';
  import jspdf from 'jspdf';
  export default {
    props: {
      listInfo: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        print:{
          checkNo: null,
          checkStaffName: null,
          checkTime: null,
        },
      };
    },
    created() {
      console.log(this.listInfo)
      if (this.listInfo) {
        this.print = this.listInfo
        console.log(this.print)
      }
    },
    methods: {
      downPdf() {
        window.scrollTo(0, 0) //注意这里必须设置为顶部不然会出现图片不全
        let that = this;
        html2canvas(document.querySelector('#all'), {//对应的dom元素id
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
          pdf.save('巡查记录表.pdf');
        })
      },
    }
  };
</script>

<style scoped>
  .demonstration{
    font-size: 25px;
  }
  .order_title{
    width: 10%;
  }
  .order_table{
    width: 99%;
  }
  .order_table tr th, .order_table tr td{
    height: 30px;
    text-align: center;
    line-height: 30px;
  }
</style>
