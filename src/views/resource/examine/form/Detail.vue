<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'项目编码'" prop="loPrCode">
            <el-input v-model="form.loPrCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'项目名称'" prop="loPrName">
            <el-input v-model="form.loPrName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'项目类别'">
            <el-select v-model="form.loPrName" filterable placeholder="所属公司" style="width: 100%" @change="changeItem">
              <el-option
                v-for="(t,i) in pArray"
                :key="i"
                :label="t.FName"
                :value="t.FItemID">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'说明'" >
            <el-input v-model="form.addr"></el-input>
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
import { updateProject } from "@/api/basic/index";

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
    },
  }
};
</script>

<style>
</style>
