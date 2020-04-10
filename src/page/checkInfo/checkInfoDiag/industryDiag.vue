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
                    <td class="tg-y93n" style="width:150px">经营业户名称</td>
                    <td class="tg-cly1" colspan="3" style="width:650px;">{{jyyhForm.OwnerName}}</td>  
                </tr>
                <tr>
                    <td class="tg-y93n" style="width:160px">省份名称</td>
                    <td class="tg-cly1" style="width:200px">{{jyyhForm.ProvinceCode}}</td>
                    <td class="tg-y93n" style="width:250px">经营业户所在地行政区划代码</td>
                    <td class="tg-cly1" style="width:200px">{{jyyhForm.NativeAreaCode}}</td>
                </tr>
                <tr>
                    <td class="tg-y93n">经营许可证字</td>
                    <td class="tg-cly1" >{{jyyhForm.LicenseWord}} </td>
                    <td class="tg-y93n">经营许可证号</td>
                    <td class="tg-cly1" >{{jyyhForm.LicenseCode}}</td>
                </tr>
                 <tr>
                    <td class="tg-y93n">经营范围</td>
                    <td class="tg-cly1" colspan="3">{{jyyhForm.BusinessScopeCode}}</td>
                </tr>
                 <tr>
                    <td class="tg-y93n">有效期起</td>
                    <td class="tg-cly1">{{jyyhForm.ValidBeginDate}}</td>
                    <td class="tg-y93n">有效期止</td>
                    <td class="tg-cly1">{{jyyhForm.ExpireDate}}</td>
                </tr>
                 <tr>
                    <td class="tg-y93n">经营类型</td>
                    <td class="tg-cly1">{{jyyhForm.EconType}} </td>
                    <td class="tg-y93n">经营状态</td>
                    <td class="tg-cly1">{{jyyhForm.OperatingStatus}}</td>
                </tr>
                <tr>
                    <td class="tg-y93n">发证机关</td>
                    <td class="tg-cly1">{{jyyhForm.LicenseIssueOrgan}} </td>
                    <td class="tg-y93n">核发日期</td>
                    <td class="tg-cly1">{{jyyhForm.LicenseIssueDate}}</td>
                </tr>
                 <tr>
                    <td class="tg-y93n">企业组织机构代码</td>
                    <td class="tg-cly1">{{jyyhForm.OrganizationCode}}</td>
                    <td class="tg-y93n">经营业户负责人姓名</td>
                    <td class="tg-cly1">{{jyyhForm.PrincipalName}}</td>
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
.tg .tg-title{background:gray;text-align:center;vertical-align:center;height: 30px;}
.tg .tg-cly1{text-align:center;vertical-align:middle;height: 25px;}
.tg .tg-y93n{background-color:#c0c0c0;text-align:center;vertical-align:middle;height: 25px;}
</style>
