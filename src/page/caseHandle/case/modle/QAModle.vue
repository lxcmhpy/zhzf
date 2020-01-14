<template>
  <el-dialog class='dialog_select' :title="dialogTitle" :visible.sync="visible" @close="closeDialog" :close-on-click-modal="false" width="35%">

    <el-form :model="addBannerForm" ref="addBannerForm" label-width="50px" class="demo-dynamic">
      <el-form-item label="问：">
        你是否申请回避问题？
      </el-form-item>
      <el-form-item label="答：">
        <el-select v-model="region" placeholder="请选择">
          <el-option label="不认识执法人员，不需要回避" value="no"></el-option>
          <el-option label="认识执法人员，需要回避" value="yes"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择问答模板" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-select v-model="region" placeholder="请选择">
              <el-option label="不使用" value="no"></el-option>
              <el-option label="标准模板" value="yes"></el-option>
              <el-option label="通用模板" value="yes"></el-option>
              <el-option label="自定义模板" value="yes"></el-option>
            </el-select>
          </el-col>
          <el-col :span="16">
            <el-select v-model="region" placeholder="请选择">
              <el-option label="不使用" value="no"></el-option>
              <el-option label="标准模板" value="yes"></el-option>
              <el-option label="通用模板" value="yes"></el-option>
              <el-option label="自定义模板" value="yes"></el-option>
            </el-select>
          </el-col>
        </el-row>

      </el-form-item>
      <el-form-item label="问1：">
        <el-select v-model="region" filterable allow-create>
          <el-option label="不认识执法人员，不需要回避" value="no"></el-option>
          <el-option label="认识执法人员，需要回避" value="yes"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="答1：">
        <el-input type="textarea" :autosize="{ minRows: 2,}" placeholder="请输入内容" v-model="textarea"></el-input>
      </el-form-item>
      <span v-for="(domain, index) in addBannerForm.domains" :key="domain.key">
        <el-form-item :label="'问' + (index +2)" :prop="'domains.' + (index +2)+ '.value'">
          <el-select v-model="region" filterable allow-create>
            <el-option label="不认识执法人员，不需要回避" value="no"></el-option>
            <el-option label="认识执法人员，需要回避" value="yes"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="'答' + (index +2)" :prop="'domains.' + (index +2) + '.value'" :rules="{
      required: true, message: '域名不能为空', trigger: 'blur'}">
          <el-row :gutter="10">
            <el-col :span="21">
              <el-input type="textarea" :autosize="{ minRows: 2,}" v-model="domain.value"></el-input>
            </el-col>
            <el-col :span="1">
              <el-button @click.prevent="removeDomain(domain)" size="medium">删除</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </span>

      <!-- <el-input type="textarea" :autosize="{ minRows: 2,}" placeholder="请输入内容" v-model="textarea">
      </el-input> -->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="addDomain">新增</el-button>
      <el-button type="primary" @click="submitForm('addBannerForm')">提交</el-button>

      <el-button type="primary" @click="overFloeEdit()">取消</el-button>
    </span>
  </el-dialog>

</template>
<script>
export default {
  data() {
    return {
      visible: false,
      textarea: '',
      addBannerForm: '',
      dialogTitle: "填写问答",
      region: "no",
      addBannerForm: {
        domains: [{
          value: ''
        }],
        email: ''
      }
    }
  },
  inject: ["reload"],
  methods: {
    showModal(type, data) {
      console.log(type, data);
      this.visible = true;
      this.dialogTitle = "多行编辑"
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.$refs["addBannerForm"].resetFields();
      //this.errorOrganName = false;
    },
    //确定
    overFloeEdit() {
      //将当前内容传到父组件
      this.$emit("overFloeEditInfo", this.textarea);
      this.visible = false;
      //   this.reload();
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain(item) {
      var index = this.addBannerForm.domains.indexOf(item)
      if (index !== -1) {
        this.addBannerForm.domains.splice(index, 1)
      }
    },
    addDomain() {
      this.addBannerForm.domains.push({
        value: '',
        key: Date.now()
      });
    }
  }
}
</script>
<style scoped>
.el-select {
  width: 100%;
}
</style>
