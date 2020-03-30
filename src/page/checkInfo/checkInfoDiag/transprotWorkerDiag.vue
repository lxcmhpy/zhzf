<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="50%"
    append-to-body
  >
    <el-form :model="dlyscyryForm" ref="dlyscyryForm" class="errorTipForm">
        <div align="center">
            <table class="tg">
                <tr>
                    <td class="tg-y93n" style="width:120px;">姓名</td>
                    <td class="tg-0pky" style="width:130px;">{{dlyscyryForm.staffName}}</td>
                    <td class="tg-y93n" style="width:50px;">性别</td>
                    <td class="tg-0pky" style="width:120px;"></td>
                    <td class="tg-y93n" style="width:100px;">出生日期</td>
                    <td class="tg-0pky" style="width:150px;"></td>
                </tr>
                <tr>
                    <td class="tg-y93n">地址</td>
                    <td class="tg-0pky" colspan="5"></td>
                </tr>
                <tr>
                    <td class="tg-y93n">从业资格证号</td>
                    <td class="tg-0pky" colspan="2">{{dlyscyryForm.CertificateCode}}</td>
                    <td class="tg-y93n">资格证初领时间</td>
                    <td class="tg-0pky" colspan="2"></td>
                </tr>
                 <tr>
                    <td class="tg-y93n">发证机关</td>
                    <td class="tg-0pky" colspan="2">{{dlyscyryForm.LicenseIssueOrganCode}}</td>
                    <td class="tg-y93n">资格证发证日期</td>
                    <td class="tg-0pky" colspan="2"></td>
                </tr>
                 <tr>
                    <td class="tg-y93n">证照状态</td>
                    <td class="tg-0pky" colspan="2"> </td>
                    <td class="tg-y93n">有效期止</td>
                    <td class="tg-0pky" colspan="2"></td>
                </tr>
                 <tr>
                    <td class="tg-y93n">户籍地行政区划</td>
                    <td class="tg-0pky" colspan="2"></td>
                    <td class="tg-y93n">从业资格证类别</td>
                    <td class="tg-cly1" colspan="2">{{dlyscyryForm.cyzgzlb}}</td>
                </tr>
            </table>
        </div>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      dlyscyryForm: {
      },
      dialogTitle: "",
    };
  },
  methods: {
    transportWorkerSee(data) {
      this.visible = true;
      this.dialogTitle = "道路运输从业人员";
      this.dlyscyryForm = data;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.$refs["dlyscyryForm"].resetFields();
    },
  }
};
</script>
<style lang="scss">
@import "@/assets/css/systemManage.scss";
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{font-family:Arial, sans-serif;font-size:16px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg .tg-0pky{border-color:inherit;text-align:center;vertical-align:center;height: 25px;}
.tg .tg-0lax{background:green;border-color:inherit;font-size:20px;text-align:left;vertical-align:center;height: 30px;}
.tg .tg-title{background:gray;text-align:center;vertical-align:center;height: 30px;}
.tg .tg-cly1{text-align:center;vertical-align:middle;height: 25px;}
.tg .tg-y93n{background-color:#c0c0c0;text-align:center;vertical-align:middle;height: 25px;}
</style>
