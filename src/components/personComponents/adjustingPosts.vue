<template>
  <div>
    <div>
      <el-table
        :data="tableData"
        border
        style="width: 100%;height:610px">
        <el-table-column prop="date" label="转出单位"></el-table-column>
        <el-table-column prop="name" label="转出时间"></el-table-column>
        <el-table-column prop="address" label="转出执法门类"></el-table-column>
        <el-table-column prop="address" label="执法证号"></el-table-column>
        <el-table-column prop="address" label="转入单位"></el-table-column>
        <el-table-column prop="address" label="转入时间"></el-table-column>
        <el-table-column prop="address" label="转入执法门类"></el-table-column>
        <el-table-column prop="address" label="调岗状态"></el-table-column>
        <el-table-column prop="address" label="操作人"></el-table-column>
        <el-table-column prop="address" label="操作时间"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
    export default {
        name: "adjustingPosts",//调岗组件
        data(){
          return {
            tableData: [],
            currentPage: 1, //当前页
            pageSize: 20,   //pagesize
          }
        },
        methods:{
          getAdjustingPostsInfo(){
            let paramsData={
              current: this.currentPage,
              size: this.pageSize,
              personId: this.$route.params.personInfo.personId,
            }
            this.$store.dispatch("getTransferListMoudle",paramsData).then(res=>{
                  this.tableData = res.data.records;
            });
            error=>{
              console.info(error);
            };
          }
        },
        created(){
          this.getAdjustingPostsInfo();
        }
    }
</script>

<style scoped>
  @import "./../../css/personManage.less";
</style>
