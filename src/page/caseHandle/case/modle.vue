<template>
  <div class="print_box">
    <div class="print_info">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <div class="doc_topic">代履行决定书</div>
        <div class="doc_number">案号：隆阳字[2017]第543939号</div>
        <table border="1" bordercolor="black" width="100%" cellspacing="0">
          <tr align="center">
            <td rowspan="6">
              当<br>
              事<br>
              人
            </td>
            <td > 个人 </td>
            <td colspan="2"> \</td>
            <td> 身份证件号 </td>
            <td> \ </td>
          </tr>
          <tr align="center">
            <td> 住址 </td>
            <td colspan="2"> \ </td>
            <td> 联系电话 </td>
            <td> \ </td>
          </tr>
          <tr align="center">
            <td> 单位 </td>
            <td> 名称</td>
            <td colspan="4"> \ </td>
          </tr>
          <tr align="center">
            <td> 地址</td>
            <td colspan="4"> \ </td>
          </tr>
          <tr align="center">
            <td> 联系电话</td>
            <td colspan="2"> \ </td>
            <td> 法定代表人 </td>
            <td> \ </td>
          </tr>
          <tr align="center">
            <td colspan="2">
              统一社会信用代码
            </td>
            <td colspan="3"> \ </td>
          </tr>
        </table>
      </el-form>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    }
  }
}
</script>
<style lang="less"  scoped>
@import "../../../css/caseHandle/caseDocModle.less";
</style>