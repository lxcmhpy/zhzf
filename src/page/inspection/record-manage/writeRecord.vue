<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox">

      标题{{formData.title}}

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        name:'',
      },
      formData: {
        title: '5月21日检查记录',
        formList: [{
          formTitle: '',
          type: 'input',
          label: '',
          prop: 'name',

        }]

      },
      

    }
  },
  methods: {

  }
}
</script>