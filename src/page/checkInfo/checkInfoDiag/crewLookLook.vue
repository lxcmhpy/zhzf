<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="50%"
    append-to-body
  >
    <el-form :model="crewCertificatesForm" :rules="rules" ref="crewCertificatesForm" class="errorTipForm">
        <div align="center">
            <table class="tg" style="width:900px;">
              <tr>
                <td class="tg-y93n" style="width:225px;">姓名</td>
                <td class="tg-cly1" style="width:225px;">{{crewCertificatesForm.ANAME}}</td>
                <td class="tg-y93n" style="width:225px;">性别</td>
                <td class="tg-cly1" style="width:225px;"></td>
              </tr>
              <tr>
                <td class="tg-y93n">身份证件号码</td>
                <td class="tg-cly1">{{crewCertificatesForm.ID_CARD_NO}}</td>
                <td class="tg-y93n">年龄</td>
                <td class="tg-cly1"></td>
              </tr>
              <tr>
                <td class="tg-y93n">船员证号码</td>
                <td class="tg-cly1">{{crewCertificatesForm.CERT_NO}}</td>
                <td class="tg-y93n">证书状态</td>
                <td class="tg-cly1">{{crewCertificatesForm.CERT_STATUS}}</td>
              </tr>
              <tr>
                <td class="tg-y93n">证书有效期开始日期</td>
                <td class="tg-cly1"></td>
                <td class="tg-y93n">证书有效期截止日期</td>
                <td class="tg-cly1">{{crewCertificatesForm.EXPIRY_DATE}}</td>
              </tr>
              <tr>
                <td class="tg-y93n">签发机关</td>
                <td class="tg-cly1">{{crewCertificatesForm.ISSU_ORG_CODE}}</td>
                <td class="tg-y93n">证书签发日期</td>
                <td class="tg-cly1">{{crewCertificatesForm.ISSU_DATE}}</td>
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
      crewCertificatesForm: {
      },
      dialogTitle: "",
    };
  },
  methods: {
    crewLookLook(data) {
      this.visible = true;
      this.dialogTitle = "船员适任证详情";
      this.crewCertificatesForm =data;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.$refs["crewCertificatesForm"].resetFields();
    },
  }
};
</script>
<style lang="scss">
@import "@/assets/css/systemManage.scss";
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg .tg-cly1{text-align:center;vertical-align:middle;height: 25px;}
.tg .tg-y93n{background-color:#c0c0c0;text-align:center;vertical-align:middle;height: 25px;}
</style>
