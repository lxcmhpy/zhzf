<template>
   <div class="searchAndpageBox" id="dictBox">
      <div class="handlePart">
          <div class="search">
              <el-form :inline="true" :model="lawCategorySearchForm" >
                 <el-form-item>
                 <el-button type="primary" size="medium" icon="el-icon-plus" @click="addLawCategory">添加</el-button>
                 </el-form-item>
              </el-form>             
          </div>
      </div>
     <div class="tablePart">
      <el-table :data="tableData" stripe style="width: 100%" height="100%">
        <el-table-column prop="organName" label="机构名称" align="center"></el-table-column>
        <el-table-column prop="cateName" label="执法门类" align="center"></el-table-column>
        <el-table-column prop="organTypeName" label="案件类型" align="center"></el-table-column>
      </el-table>
     </div>
     <div class="paginationBox">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          background
          :page-sizes="[10, 20, 30, 40]"
          layout="prev, pager, next,sizes,jumper"
          :total="totalPage"
        ></el-pagination>
    </div>

    <addLawCategory ref="addLawCategoryRef"></addLawCategory>
   </div>
</template>
<script>
import addLawCategory from "./addLawCategory";

export default {
    data() {
    return {
      tableData: [], //表格数据
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      searchName:'', //查询名称
      lawCategorySearchForm:{
        name:''
      }
    };
    },
    components: {
        addLawCategory
    },
    inject:['reload'],
    methods: { 
        //获取列表
        getLawCategoryList() {
            let data = {
                current: this.currentPage,
                size: this.pageSize,
                // name:this.lawCategorySearchForm.name
            };
            this.$store.dispatch("getLawCategoryList",data).then(
                res => {
                console.log("字典列表", res);
                this.tableData = res.data.records;
                this.totalPage = res.data.total;
                },
                err => {
                console.log(err);
                }
            );
        },
        //添加
        addLawCategory(){
            let data={
                    id:'',
                    pid:'',
                    leng:this.tableData.length
            }
            this.$refs.addLawCategoryRef.showModal(0, data);
        },
        //更改每页显示的条数
        handleSizeChange(val) {
            this.pageSize = val;
            this.currentPage = 1;
            this.getSelectOrgan();
        },
        //更换页码
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getSelectOrgan();
        },
    },
    created() {
    this.getLawCategoryList();
  }
}
</script>
<style lang="less">
@import "../../../css/systemManage.less";
</style>