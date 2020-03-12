<template>
  <div>
    <div>
        <div style="margin-top:35px;margin-bottom:25px;margin-left:25px;">
            <font style="font-size:25px;"><span class="titleflag"></span>审批记录</font> &nbsp;&nbsp;&nbsp;&nbsp;
        </div>
        <el-table
          style="margin-left:25px;width:97%;margin-bottom:35px;"
          :data="tableData"
          resizable
          align="center" >
          stripe
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
      name: "approvalRecord",//审批记录
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
