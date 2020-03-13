<template>
  <div>
    <div style="margin-top:35px;margin-bottom:25px;margin-left:25px;">
      <font style="font-size:25px;"><span class="titleflag"></span>审批信息</font> &nbsp;&nbsp;&nbsp;&nbsp;
      <el-button type="text" round style="margin-right:25px;float:right;" icon="el-icon-time" size="medium">审批历史</el-button>
    </div>
    <div >
      <div style="margin-top:35px;margin-bottom:25px;margin-left:25px;">
        
        <el-steps :active="3" style="width:65%">
           <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; margin: 0px 5px; background:#228B22 none repeat scroll 0% 0%;margin-top:4px;"></span>
           审批流 
          <el-step style="margin-left:85px;"></el-step>&nbsp;&nbsp;&nbsp;&nbsp;
          <el-step></el-step>
          <el-step></el-step>
        </el-steps>
      </div>
      <div style="margin-top:20px;margin-bottom:30px;margin-left:25px;">
       <el-steps :active="1">
         <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; margin: 0px 5px; background:#228B22  none repeat scroll 0% 0%;margin-top:4px;"></span>
         当前审批单位
        <el-step  style="margin-left:35px;"></el-step>&nbsp;&nbsp;&nbsp;&nbsp;紧急医学救援队
      </el-steps>
      </div>
    </div>
    <div>
      <el-table
        style="margin-left:25px;width:97%;margin-bottom:35px;"
        :data="tableData"
        resizable
        align="center" 
        stripe>
        <el-table-column prop="oid" label="审批单位"></el-table-column>
        <el-table-column prop="approveStatus" label="审批状态"></el-table-column>
        <el-table-column prop="userId" label="审批人"></el-table-column>
        <el-table-column prop="approveInfo" label="审批信息"></el-table-column>
        <el-table-column prop="operationDate" label="操作审批时间"></el-table-column>
      </el-table>
  </div>
  </div>
</template>
<script>
    export default {
        name: "approval",//审批记录组件
        data(){
          return {
            tableData: [],
            currentPage: 1, //当前页
            pageSize: 20,   //pagesize
          }
        },
        methods:{
          getApprovalRecordInfo(){
            let paramsData={
              current: this.currentPage,
              size: this.pageSize,
              personId: this.$route.params.personInfo.personId,
            }
            let _this = this
            this.$store.dispatch("getApproveListMoudle",paramsData).then(res=>{
                  _this.tableData = res.data.records;
            });
            error=>{
              console.info(error);
            };
          }
        },
        created(){
          this.getApprovalRecordInfo();
        }
    }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/personManage.scss";

</style>

