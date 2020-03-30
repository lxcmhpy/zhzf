<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="50%"
    append-to-body
  >
    <el-form :model="jyyhForm" ref="jyyhForm" class="errorTipForm">
        <div align="center">
            <table class="tg">
                <tr>
                    <td class="tg-title" style="width:150px">经营业户名称</td>
                    <td class="tg-0pky" colspan="3" style="width:650px;">
                       <el-input type="text" v-model="jyyhForm.OwnerName" readonly="readonly"></el-input>
                    </td>
                    
                </tr>
                <tr>
                    <td class="tg-title" style="width:160px">省份名称</td>
                    <td class="tg-0pky" style="width:200px">
                      <el-input type="text" v-model="jyyhForm.ProvinceCode" readonly="readonly"></el-input>
                    </td>
                    <td class="tg-title" style="width:250px">经营业户所在地行政区划代码</td>
                    <td class="tg-0pky" style="width:200px">
                      <el-input type="text" v-model="jyyhForm.NativeAreaCode" readonly="readonly"></el-input>
                    </td>
                </tr>
                <tr>
                    <td class="tg-title">经营许可证字</td>
                    <td class="tg-0pky" >
                      <el-input type="text" v-model="jyyhForm.LicenseWord" readonly="readonly"></el-input>
                    </td>
                    <td class="tg-title">经营许可证号</td>
                    <td class="tg-0pky" >
                      <el-input type="text" v-model="jyyhForm.LicenseCode" readonly="readonly"></el-input>
                    </td>
                </tr>
                 <tr>
                    <td class="tg-title">经营范围</td>
                    <td class="tg-0pky" colspan="3">
                      <el-input type="text" v-model="jyyhForm.BusinessScopeCode" readonly="readonly"></el-input>
                    </td>
                </tr>
                 <tr>
                    <td class="tg-title">有效期起</td>
                    <td class="tg-0pky">
                      <el-input type="text" v-model="jyyhForm.ValidBeginDate" readonly="readonly"></el-input>
                    </td>
                    <td class="tg-title">有效期止</td>
                    <td class="tg-0pky">
                      <el-input type="text" v-model="jyyhForm.ExpireDate" readonly="readonly"></el-input>
                    </td>
                </tr>
                 <tr>
                    <td class="tg-title">经营类型</td>
                    <td class="tg-0pky">
                      <el-input type="text" v-model="jyyhForm.EconType" readonly="readonly"></el-input>
                    </td>
                    <td class="tg-title">经营状态</td>
                    <td class="tg-0pky">
                      <el-input type="text" v-model="jyyhForm.OperatingStatus" readonly="readonly"></el-input>
                    </td>
                </tr>
                <tr>
                    <td class="tg-title">发证机关</td>
                    <td class="tg-0pky">
                      <el-input type="text" v-model="jyyhForm.LicenseIssueOrgan" readonly="readonly"></el-input>
                    </td>
                    <td class="tg-title">核发日期</td>
                    <td class="tg-0pky">
                      <el-input type="text" v-model="jyyhForm.LicenseIssueDate" readonly="readonly"></el-input>
                    </td>
                </tr>
                 <tr>
                    <td class="tg-title">企业组织机构代码</td>
                    <td class="tg-0pky">
                      <el-input type="text" v-model="jyyhForm.OrganizationCode" readonly="readonly"></el-input>
                    </td>
                    <td class="tg-title">经营业户负责人姓名</td>
                    <td class="tg-0pky">
                      <el-input type="text" v-model="jyyhForm.PrincipalName" readonly="readonly"></el-input>
                    </td>
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
      jyyhForm: {
        OwnerName:"",
        ProvinceCode:"",
        NativeAreaCode:"",
        LicenseWord:"",
        LicenseCode:"",
        BusinessScopeCode:"",
        ValidBeginDate:"",
        ExpireDate:"",
        EconType:"",
        OperatingStatus:"",
        LicenseIssueOrgan:"",
        LicenseIssueDate:"",
        OrganizationCode:"",
        PrincipalName:""
      },
      dialogTitle: "",
    };
  },
  methods: {
    industrySee(data) {
      this.visible = true;
      this.dialogTitle = "业户详情";
      this.jyyhForm = data;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.$refs["jyyhForm"].resetFields();
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
<<<<<<< HEAD
.tg .el-input input{border:none;}
=======
>>>>>>> ff83d3f8147d38df0d877582e443b6d28643179d
</style>
