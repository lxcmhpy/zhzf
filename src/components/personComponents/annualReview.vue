<template>
  <div>
    <div>
        <div style="margin-top:50px;margin-bottom:50px;">
            <font style="font-size:42px;">年审信息</font> 
        </div>
        <el-table
          :data="tableData"
          resizable >
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
            let _this = this
            this.$store.dispatch("getAnnualreviewListMoudle",paramsData).then(res=>{
                  _this.tableData = res.data.records;
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

<style lang="scss" scoped>
  @import "@/assets/css/personManage.scss";
</style>
