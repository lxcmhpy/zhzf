<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox">

      写记录-标题{{formData.title}}
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item v-for="(item,index) in formData.formList" :key="index" :label="item.label" :prop="'formList[+'+index+'].value'" :rules="{
      required: true, message: '域名不能为空', trigger: 'blur'}">

          prop:{{'item.' + index + '.value'}}
          value:{{item.value}}

          <el-input v-model="item.value"></el-input>
        </el-form-item>

        <template v-for="(person,index) in Form.List">
          <el-form-item :prop="'List.'+index + '.code'" :key="person.key" :rules="rules">
            <el-input v-model="person.code"></el-input>
          </el-form-item>
        </template>

      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        value1: '',
        value2: '',
      },
      formData: {
        title: '5月21日检查记录',
        formList: [{
          formTitle: '',
          type: 'input',
          label: '姓名',
          prop: 'name',
          value: '1'
        }, {
          formTitle: '',
          type: 'input',
          label: '电话',
          prop: 'name',
          value: '2'
        },]

      },
      rules: {}

    }
  },
  methods: {

  }
}
</script>