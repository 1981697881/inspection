<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
     <!-- <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'计划单号'" >
            <el-input v-model="form.planNo" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>-->
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'项目类别'" prop="typeId">
            <el-select v-model="form.typeId" filterable placeholder="项目类别" >
              <el-option
                v-for="(t,i) in cArray"
                :key="i"
                :label="t.proName"
                :value="t.typeId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'检查项目'" prop="checkId">
            <el-select v-model="form.checkId" filterable placeholder="检查项目" @change="changeCheck">
              <el-option
                v-for="(t,i) in bArray"
                :key="i"
                :label="t.checkName"
                :value="t.checkId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'被检公司'" prop="proId">
           <!-- <el-select v-model="form.deptId" filterable placeholder="公司" >
              <el-option
                v-for="(t,i) in aArray"
                :key="i"
                :label="t.FName"
                :value="t.FItemID">
              </el-option>
            </el-select>-->
            <el-input v-model="form.proId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'检查地址'" >
            <el-input v-model="form.address"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'检查人员'" prop="uid">
            <el-select v-model="form.uid" filterable placeholder="检查人员" >
              <el-option
                v-for="(t,i) in dArray"
                :key="i"
                :label="t.username"
                :value="t.uid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'检查日期'" prop="planTime">
            <div class="block" >
              <el-date-picker
                v-model="form.planTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center">
        <el-button type="primary" @click="saveData('form')">保存</el-button>
      </div>
  </div>
</template>

<script>
import { dProjectTypeFormat, projectCheckFormat} from "@/api/basic/index";
import { userFormat } from "@/api/system/index";
import { updatePollingPlan, addPollingPlan } from "@/api/inspection/index";

export default {
  props: {
    listInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      form: {
        address: null,
        deptId: null,
        proId: null,
        typeId: null,
        checkId: null,
        planTime: null,
        uid: null,
      },
      pidS:[],
      aArray:[],
      bArray:[],
      cArray:[],
      dArray:[],
      rules: {
        proId: [
          {required: true, message: '请选择', trigger: 'blur'},
        ],  typeId: [
          {required: true, message: '请选择', trigger: 'change'},
        ],
        checkId: [
          {required: true, message: '请选择', trigger: 'change'},
        ], planTime: [
          {required: true, message: '请选择', trigger: 'change'},
        ],uid: [
          {required: true, message: '请选择', trigger: 'change'},
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
    changeCheck(val){
      console.log(val)
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          if (typeof (this.form.loPrId) != undefined && this.form.loPrId != null) {
            updatePollingPlan(this.form).then(res => {
              this.$emit('hideDialog', false)
              this.$emit('uploadList')
            });
          }else{
            addPollingPlan(this.form).then(res => {
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
      userFormat().then(res => {
        if(res.flag){
          this.dArray = res.data
        }
      });
      dProjectTypeFormat().then(res => {
        if(res.flag){
          this.cArray = res.data
        }
      });
      projectCheckFormat().then(res => {
        if(res.flag){
          this.bArray = res.data
        }
      });
    },
  }
};
</script>

<style>
</style>
