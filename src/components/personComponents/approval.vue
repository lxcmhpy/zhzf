<template>
  <div>
    <div style="margin-top:50px;margin-bottom:50px;">
      <font style="font-size:42px;">审批信息</font> &nbsp;&nbsp;&nbsp;&nbsp;
      <el-button type="primary" round style="font-size:22px;">审批历史</el-button>
    </div>
    <div class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition">
      <div class="el-table__body-wrapper is-scrolling-none">
        <table class="el-table__body" style="width:1500px;border: 1px solid #e4e7ed">
          <tr class="el-table__row" style = "border: 1px solid #e4e7ed">
            <td class="el-table_column_center" style="width:30%;border: 1px solid #e4e7ed"><p>审批流</p></td>
            <td class="el-table_column_center" style="width:70%;border: 1px solid #e4e7ed"><p>无审批单位</p></td>
          </tr>
          <tr class="el-table__row">
            <td class="el-table_column_center" style="width:30%;border: 1px solid #e4e7ed"><p>审批单位</p></td>
            <td class="el-table_column_center" style="width:70%;border: 1px solid #e4e7ed"><p>无</p></td>
          </tr>
        </table>
      </div>
      <div>
        <el-table
          :data="tableData"
          resizable
          align="center" >
          <el-table-column prop="oid" label="审批单位"></el-table-column>
          <el-table-column prop="approveStatus" label="审批状态"></el-table-column>
          <el-table-column prop="userId" label="审批人"></el-table-column>
          <el-table-column prop="approveInfo" label="审批信息"></el-table-column>
          <el-table-column prop="operationDate" label="操作审批时间"></el-table-column>
        </el-table>
    </div>
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

