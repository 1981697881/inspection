<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'检查项目'" prop="checkId">
            <el-select v-model="form.checkId" filterable placeholder="检查项目">
              <el-option
                v-for="(t,i) in pArray"
                :key="i"
                :label="t.checkName"
                :value="t.checkId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'隐患问题'" prop="concerns">
            <el-input v-model="form.concerns"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'对应整改意见'" prop="opinion">
            <el-input v-model="form.opinion"></el-input>
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
import { updateConcerns, getProjectCheckList } from "@/api/basic/index";

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
        opinion: null,
        checkId: null,
        concerns: null,
        remark: null,
      },
      pidS:[],
      pArray:[],
      rules: {
        checkId: [
          {required: true, message: '请选择', trigger: 'change'},
        ],
        concerns: [
          {required: true, message: '请输入', trigger: 'blur'},
        ],opinion: [
          {required: true, message: '请输入', trigger: 'blur'},
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
          updateConcerns(this.form).then(res => {
            this.$emit('hideDialog', false)
            this.$emit('uploadList')
          });
        }else {
          return false;
        }
      })
    },
    fetchFormat() {
      getProjectCheckList({
        pageNum: 1,
        pageSize:  1000
      }).then(res => {
        if(res.flag){
          this.pArray = res.data.records
        }
      });
    },
  }
};
</script>

<style>
</style>
