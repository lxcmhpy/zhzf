<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="60%"
    hight="30%">
    <div>
      <el-form
        :inline="true"
        :model="certificateDetailForm"
        label-position="right"
        label-width="100px"
        ref="certificateDetailFormRef"
        style="margin-left:20px;"
        class="certificate-form">
        <el-row style="height:36px;">
          <el-col :span="12" class="form_class">
            <el-form-item label="姓名：" prop="personName">
                {{certificateDetailForm.personName}}
            </el-form-item>
          </el-col>
          <el-col :span="12" class="form_class">
            <el-form-item label="执法证号：">
                {{certificateDetailForm.certNo}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="height:36px;" >
          <el-col :span="12" class="form_class">
            <el-form-item label="发证机构：" prop="oname" >
                {{certificateDetailForm.oname}}
            </el-form-item>
          </el-col>
          <el-col :span="12" class="form_class">
            <el-form-item label="发证日期：" prop="issueDate">
                {{certificateDetailForm.issueDate}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="height:36px;">
          <el-col :span="12" class="form_class">
            <el-form-item label="证件状态：" prop="certStatue">
                {{certificateDetailForm.certStatusName}}
            </el-form-item>
          </el-col>
          <el-col :span="12" class="form_class">
            <el-form-item label="有效日期：" prop="periodBegin">
                {{certificateDetailForm.periodBegin}}&nbsp;&nbsp;至&nbsp;&nbsp;{{certificateDetailForm.periodEnd}}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div>
      <el-table
        style="margin-left:25px;width:97%;margin-bottom:35px;"
        :data="tableData"  resizable  stripe>
        <el-table-column prop="personName"  label="姓名" align="center">{{certificateDetailForm.personName}}</el-table-column>
        <el-table-column prop="afterStatusName"  label="证件状态" align="center"></el-table-column>
        <el-table-column prop="createName"  label="操作用户" align="center"></el-table-column>
        <el-table-column prop="createTime"  label="操作日期" align="center"></el-table-column>
        <el-table-column prop="modifyReason"  label="变化原因" align="center"></el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>
<script>

export default {
  props: {
    params: {
      type: Object,
      default: () => {
        return { type: 'add', id: '' }
      },
      required: true
    }
  },
  data(){
    return{
      tableData: [], 
      visible: false,
      certificateDetailForm: {
        periodBegin:"",//有效日期起
        periodEnd:"",//有效日期止
        certStatue:"",//证件状态
        certStatusName:"",//证件状态名称
        ministerialNo:"",//执法证号
        personName:"",//人员姓名
        physicalNo:"",//卡物理编号
        certId:"",
        attributionName:"",//实卡归属名称
        issueDate:"",
        afterStatusName:"",
        params:"",
        oname: "",
        certNo: ""
      },
      dialogTitle: "", //弹出框title
      errorName: false, //添加name时的验证
      type:"",
    }
  },
  methods:{
    getCertificateListInfo(){
      if(this.certificateDetailForm.type=='0'){
        if(this.params.type=='edit'){//
          if(!this.certificateDetailForm.certId==''){
            console.info(this.certificateDetailForm.certId=='');
            this.$store.dispatch("getCertHistoryPageList", this.certificateDetailForm.certId).then(
            res => {
                this.tableData = res.data;
            });
          }
        }
      }else{
        this.$store.dispatch("getCertHistoryPageList", this.certificateDetailForm.certId).then(
          res => {
            this.tableData = res.data;
          }, err => {
            this.$message({type: 'error', message: err.msg || ''})
          });
      }
    },
    showModal(row,type) {
      this.visible = true;
      this.dialogTitle = "证件管理信息-查看";
      this.certificateDetailForm.personName=row.personName;
      this.certificateDetailForm.periodBegin=row.periodBegin;
      this.certificateDetailForm.periodEnd=row.periodEnd;
      this.certificateDetailForm.ministerialNo=row.ministerialNo;
      this.certificateDetailForm.issueDate=row.issueDate;
      this.certificateDetailForm.issueName=row.issueName;
      this.certificateDetailForm.physicalNo=row.physicalNo;
      this.certificateDetailForm.attributionName=row.attributionName;
      this.certificateDetailForm.certStatusName=row.certStatusName;
      this.certificateDetailForm.certId=row.certId;
      this.certificateDetailForm.oname=row.oname;
      this.certificateDetailForm.certNo=row.certNo;
      this.type=type;
      this.getCertificateListInfo();
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.$refs["certificateDetailFormRef"].resetFields();
      this.visible = false;
      this.errorName = false;
    }
  }
}
</script>
<style lang="scss">
@import "@/assets/css/personManage.scss";
</style>
<style lang="scss" scoped>
.certificate-form{
  >>>.el-form-item{
    margin-bottom: 10px;
  }
}
</style>

