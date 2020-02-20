<template>
  <div>
    <div>
        <el-table
          :data="tableData"
          align="center"
          style="width: 100%;height:610px">
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
            this.$store.dispatch("getApproveMoudled",paramsData).then(res=>{
                  this.tableData = res.data.records;
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

<style scoped>
  @import "./../../css/personManage.less";
</style>
