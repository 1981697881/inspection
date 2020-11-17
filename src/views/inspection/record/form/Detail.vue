<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="80px" :size="'mini'">
      <el-button type="primary" size="small" @click.native="registration">检查登记</el-button>
      <el-row  style="overflow: auto;border: 1px solid #EBEEF5;">
        <el-table el-table :height="'calc(100vh/2)'" :data="list" border size="mini" :highlight-current-row="true">
          <el-table-column
            v-for="(t,i) in columns"
            :key="i"
            align="center"
            :prop="t.name"
            :label="t.text"
            v-if="t.default!=undefined?t.default:true"
            :width="t.width?t.width:''"
          >
            <template slot-scope="scope">
                <span v-if="scope.row.isSet">
                   <div class="block"  v-if="t.name == 'orderNo'">
                  <el-date-picker
                    v-model="sel2[t.name]"
                    type="date"
                    size="mini"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
                  <el-input size="mini" v-else-if="t.name == 'processName'" placeholder="请输入内容" v-model="sel2[t.name]">
                  </el-input>
                  <el-select size="mini" v-else-if="t.name == 'planNum'" v-model="sel2[t.name]" placeholder="请选择" @change="changeProcessId($event, sel2)">
                    <el-option
                      v-for="(t,i) in plArray"
                      :key="i"
                      :label="t.FName"
                      :value="t.FName">
                    </el-option>
                  </el-select>
                   <span v-else>{{sel2[t.name]}}</span>
                </span>
              <span v-else>{{scope.row[t.name]}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="230" align="center">
            <template slot-scope="scope">
                  <span class="el-tag el-tag--info el-tag--mini" style="cursor: pointer;" @click="pwdChange2(scope.row,scope.$index,true)">
                    {{scope.row.isSet?'确定':"修改"}}
                  </span>
              <span v-if="!scope.row.isSet" class="el-tag el-tag--danger el-tag--mini" @click="deleteRow2(scope.row,scope.$index,list2)" style="cursor: pointer;">
                    删除
                  </span>
              <span v-else class="el-tag  el-tag--mini" style="cursor: pointer;" @click="pwdChange2(scope.row,scope.$index,false)">
                    取消
                  </span>
              <span class="el-tag el-tag--warning el-tag--mini" style="cursor: pointer;" @click="opinion(scope.row,scope.$index,false)">
                    整改意见
                  </span>
              <span class="el-tag el-tag--success el-tag--mini" style="cursor: pointer;" @click="feedback(scope.row,scope.$index,false)">
                    整改反馈
                  </span>
            </template>
          </el-table-column>
        </el-table>
        <el-col :span="24">
          <div class="el-table-add-row" style="width: 99.2%;" @click="addMaster2()"><span>+ 添加</span></div>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center">
        <el-button type="primary" @click="saveData('form')">保存</el-button>
      </div>
  </div>
</template>

<script>
import { alterSupplier, addSupplier } from "@/api/basic/index";
import {
  getToken
} from '@/utils/auth'
export default {
  props: {
    listInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      headers: {
        'authorization': getToken('clrx'),
      },
      list: [],
      columns: [
        { text: "通知单号", name: "" },
        { text: "登记日期", name: "orderNo" },
        { text: "隐患问题", name: "planNum" },
        { text: "整改内容", name: "planNum" },
        { text: "隐患图片", name: "" },
        { text: "要求整改完成日期", name: "orderNo" },
        { text: "整改情况", name: "" },
        { text: "整改完成图片", name: "" },
        { text: "整改跟踪人", name: "" },
        { text: "完成时间", name: "" },
      ],
      visible: null,
      form: {
        loPrId: null,
        loPrName: null, // 名称
        loPrCode: null,
        contact: null,
        addr: null,
        tel: null,
        description: null,
      },
      pidS:[],
      pArray:[],
      plArray:[],
      rules: {
        loPrName: [
          {required: true, message: '请输入名稱', trigger: 'blur'},
        ],
        loPrCode: [
          {required: true, message: '请输入名稱', trigger: 'blur'},
        ],
      },
    };
  },
  mounted() {
    this.fetchFormat();
    if (this.listInfo) {
      this.form = this.listInfo
    }
  },
  methods: {
    //添加
    addMaster2() {
      for (let i of this.list2) {
        if (i.isSet) return this.$message.warning("请先保存当前编辑项");
      }
      this.cIndex += 10
      let j = {isSet: true, orderNo: this.cIndex, orderNo: '', planNum: ''};
      this.list2.push(j);
      this.sel2 = JSON.parse(JSON.stringify(j));
    },
    //删除带确认区 单行删除
    deleteRow2(row, index, rows) {
      this.result.forEach((item, index2) =>{
        if(row.processRouteDetailId == item){
          this.result.splice(index2,1);
        }
      })
      rows.splice(index, 1);
    },
    //修改
    pwdChange2(row, index, cg) {
      //点击修改 判断是否已经保存所有操作
      for (let i of this.list2) {
        if (i.isSet && i.userId != row.userId) {
          this.$message.warning("请先保存当前编辑项");
          return false;
        }
      }
      //是否是取消操作
      if (!cg) {
        if (!this.sel2.processId) this.list2.splice(index, 1);
        return row.isSet = !row.isSet;
      }
      //提交数据
      if (row.isSet) {
        const sel = this.sel2
        if((sel.processId == null || sel.processId === '') || (sel.orderNo == null || sel.orderNo === '') || (sel.planNum == null || sel.planNum === '')){
          return this.$message({
            type: 'error',
            message: "请输入必填项!"
          });
        }else {
          let data = JSON.parse(JSON.stringify(this.sel2));
          for (let k in data) row[k] = data[k]
          this.$message({
            type: 'success',
            message: "添加成功!"
          });
          //然后这边重新读取表格数据
          this.readMasterUser();
          row.isSet = false;
        }
      } else {
        this.sel2 = JSON.parse(JSON.stringify(row));
        row.isSet = true;
      }
    },
    opinion(row, index, cg) {
      this.visible = true
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          if (typeof (this.form.loPrId) != undefined && this.form.loPrId != null) {
            alterSupplier(this.form).then(res => {
              this.$emit('hideDialog', false)
              this.$emit('uploadList')
            });
          }else{
            addSupplier(this.form).then(res => {
              this.$emit('hideDialog', false)
              this.$emit('uploadList')
            });
          }
        }else {
          return false;
        }
      })
    },
    fetchFormat() {
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
