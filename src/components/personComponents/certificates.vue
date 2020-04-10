<template>
  <div>
    <div style="margin-top:35px;margin-bottom:25px;margin-left:25px;">
          <font style="font-size:25px;"><span class="titleflag"></span>证件信息</font> &nbsp;&nbsp;&nbsp;&nbsp;
    </div>
    <el-table
      style="margin-left:25px;width:97%;margin-bottom:35px;"
      :data="tableData"
      resizable 
      stripe>
      <el-table-column prop="personId"  label="姓名"></el-table-column>
      <el-table-column prop="certStatus"  label="证件状态"></el-table-column>
      <el-table-column prop="modifyId" label="操作用户"></el-table-column>
      <el-table-column prop="modifyTime" label="操作日期"></el-table-column>
      <el-table-column prop="modifyReason" label="变化原因"></el-table-column>
    </el-table>
  </div>
</template>

<script>
    export default {
        name: "certificates",//人员证件信息组件
        data(){
          return {
            tableData: [],
            currentPage: 1, //当前页
            pageSize: 20,   //pagesize
          }
        },
        methods:{
          getCertificatesInfo(){
            let paramsData={
              current: this.currentPage,
              size: this.pageSize,
              personId: this.$route.params.personInfo.personId,
            }
            let _this = this
            this.$store.dispatch("getPerCertListMoudle",paramsData).then(res=>{
                  _this.tableData = res.data.records;
            });
            error=>{
              console.info(error);
            };
          }
        },
        created(){
          this.getCertificatesInfo();
        }
    }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/personManage.scss";
</style>
