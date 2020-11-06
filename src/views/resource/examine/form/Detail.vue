<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'项目编码'" prop="checkCode">
            <el-input v-model="form.checkCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'项目名称'" prop="checkName">
            <el-input v-model="form.checkName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'项目类别'" prop="typeId">
            <el-select v-model="form.typeId" filterable placeholder="请选择" >
              <el-option
                v-for="(t,i) in pArray"
                :key="i"
                :label="t.proName"
                :value="t.typeId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'说明'" >
            <el-input v-model="form.remark"></el-input>
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
import { updateProjectCheck, dProjectTypeFormat } from "@/api/basic/index";

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
        checkCode: null,
        checkName: null, // 名称
        typeId: null,
        remark: null,
      },
      pidS:[],
      pArray:[],
      rules: {
        checkCode: [
          {required: true, message: '请输入编码', trigger: 'blur'},
        ],
        checkName: [
          {required: true, message: '请输入名稱', trigger: 'blur'},
        ],
        typeId: [
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
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          updateProjectCheck(this.form).then(res => {
            this.$emit('hideDialog', false)
            this.$emit('uploadList')
          });
        }else {
          return false;
        }
      })
    },
    fetchFormat() {
      dProjectTypeFormat().then(res => {
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
