<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'项目编码'" prop="proCode">
            <el-input v-model="form.proCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'项目名称'" prop="proName">
            <el-input v-model="form.proName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'所属公司'" prop="deptId">
            <el-select v-model="form.deptId" filterable placeholder="所属公司">
              <el-option
                v-for="(t,i) in pArray"
                :key="i"
                :label="t.deptName"
                :value="t.deptId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'负责人'" prop="principal">
            <el-input v-model="form.principal"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'联系电话'" >
            <el-input v-model="form.tel"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'联系邮箱'" >
            <el-input v-model="form.email"></el-input>
          </el-form-item>
        </el-col>
      </el-row> <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item :label="'风险等级'" prop="riskLevel">
          <el-select v-model="form.riskLevel" filterable placeholder="风险等级">
            <el-option
              v-for="(t,i) in options"
              :key="i"
              :label="t.text"
              :value="t.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
        <el-col :span="12">
          <el-form-item :label="'详细地址'" >
            <el-input v-model="form.address"></el-input>
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
import { updateProject, departmentList, getProjectList } from "@/api/basic/index";

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
        proCode: null,
        proName: null, // 名称
        deptId: null,
        principal: null,
        riskLevel: null,
        email: null,
        tel: null,
        remark: null,
        address: null
      },
      pidS:[],
      pArray:[],
      options:[{
        text: '蓝色',
        value: '0'
      },{
        text: '黄色',
        value: '1'
      },{
        text: '橙色',
        value: '2'
      },{
        text: '红色',
        value: '3'
      }],
      rules: {
        proCode: [
          {required: true, message: '请输入编码', trigger: 'blur'},
        ],
        proName: [
          {required: true, message: '请输入名稱', trigger: 'blur'},
        ], deptId: [
          {required: true, message: '请选择', trigger: 'change'},
        ],riskLevel: [
          {required: true, message: '请选择', trigger: 'change'},
        ], principal: [
          {required: true, message: '请输入', trigger: 'blur'},
        ],
      },
    };
  },
  mounted() {
    this.fetchFormat();
    if (this.listInfo) {
      this.form = this.listInfo
    }else{
      getProjectList({
        pageNum: 1,
        pageSize: 1
      }).then(res => {
        this.form.proCode = res.data.total+1;
      });
    }
  },

  methods: {
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
            updateProject(this.form).then(res => {
              this.$emit('hideDialog', false)
              this.$emit('uploadList')
            });
        }else {
          return false;
        }
      })
    },
    fetchFormat() {
      departmentList().then(res => {
        if(res.flag){
          this.pArray = res.data
        }
      });
    },
  }
};
</script>

<style>
</style>
