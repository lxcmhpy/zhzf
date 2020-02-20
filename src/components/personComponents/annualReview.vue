<template>
  <div>
    <div>
        <el-table
          :data="tableData"
          border
          style="width: 100%;height:610px">
          <el-table-column prop="reviewYear" label="年审年份"></el-table-column>
          <el-table-column prop="reviewDate" label="年审日期"></el-table-column>
          <el-table-column prop="reviewScore" label="年审成绩"></el-table-column>
          <el-table-column prop="note" label="备注"></el-table-column>
        </el-table>
    </div>
  </div>
</template>

<script>
    export default {
        name: "annualReview",//年审记录
       data(){
        return {
            tableData: [],
            currentPage: 1, //当前页
            pageSize: 20,   //pagesize
          }
        },
        methods:{
          getAnnualReviewInfo(){
            let paramsData={
              current: this.currentPage,
              size: this.pageSize,
              personId: this.$route.params.personInfo.personId,
            }
            this.$store.dispatch("getAnnualReviewMoudled",paramsData).then(res=>{
                  this.tableData = res.data.records;
            });
            error=>{
              console.info(error);
            };
          }
        },
        created(){
          this.getAnnualReviewInfo();
        }
    }
</script>

<style scoped>
  @import "./../../css/personManage.less";
</style>
