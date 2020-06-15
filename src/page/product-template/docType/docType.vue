<template>
<div class="com_searchAndpageBoxPadding">
  <div class="searchAndpageBox" id="dictBox">
    <div class="handlePart">
      <div class="search">
        <el-form :inline="true" :model="searchForm" >
          <el-form-item label="名称">
            <el-input v-model="searchForm.name" clearable placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="文书说明">
            <el-input v-model="searchForm.remark" clearable placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" icon="el-icon-search" @click="getDocTypeListSearch">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" icon="el-icon-refresh-left" @click="resetSearch">重置</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" icon="el-icon-plus" @click="addDocType">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="tablePart">
      <el-table :data="tableData" stripe style="width: 100%" height="100%">
        <el-table-column type="index" :index="showIndex" label="序号" width="60" align="center"></el-table-column>
        <el-table-column prop="name" label="名称" align="center"></el-table-column>
        <el-table-column prop="path" label="路径" align="center"></el-table-column>
        <el-table-column prop="linkName" label="环节名称" align="center"></el-table-column>
        <el-table-column prop="templateName" label="模板名称" align="center"></el-table-column>
        <el-table-column prop="remark" label="文书说明" align="center"></el-table-column>
        <el-table-column prop="sort" label="排序" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="editDocType(scope.row)" >编辑</el-button>
            <el-button type="text" @click="deleteDocType(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
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
    <addEditDocType ref="addEditDocRef"></addEditDocType>
    <!-- <showDictKey ref="showDictKeyRef"></showDictKey> -->
  </div>
</div>
</template>
<script>
 import addEditDocType from "./addEditDocType";
import { getAllPdfListApi,deleteDocTypeApi} from "@/api/caseHandle";
export default {
  data() {
    return {
      tableData: [], //表格数据
      caseTypeList: [],
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      total: 0,
      searchName:'', //查询名称
      searchForm:{
        name:'',
        remark:''
      }
    };
  },
  components: {
    addEditDocType
  },
  inject:['reload'],
  methods: {
    getDocTypeList() {
      let data = {
        current: this.currentPage,
        size: this.pageSize,
        name:this.searchForm.name,
        remark:this.searchForm.remark
      };
      let _this = this
      //查询所有文书类型
      getAllPdfListApi(data).then(
        res => {
          console.log("error",res)
          _this.tableData = res.data.records;
          _this.total = res.data.total;
          _this.totalPage = res.data.total;
        },
        error => {
          console.log(error)
        }
      );
    },
    //删除
    deleteDocType(id){
      let _this = this
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          deleteDocTypeApi(id).then(
            res => {
              _this.reload();
              _this.$message({
                type: "success",
                message: "删除成功!"
              });
            },
            err => {
              console.log(err);
            }
          );
        })
        .catch(() => {});
    },
    //添加
    addDocType(){
      let data={
            leng:this.total
        }
      this.$refs.addEditDocRef.showModal(0,data);
    },
    //编辑
    editDocType(row){
      let data = row;
      console.log(data);
      this.$refs.addEditDocRef.showModal(2, data);
    },
    //重置
    resetSearch(){
      this.searchForm={};
      this.getDocTypeList();
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getDocTypeList();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getDocTypeList();
    },
    // 查询
    getDocTypeListSearch() {
      this.currentPage = 1;
      this.getDocTypeList()
    },
    //查询案件类型列表
    getCaseType(){
      this.$store.dispatch("getCaseTypeList", 0).then(
        //查询案件类型列表(启用)
        res => {
          if (res.code === 200) {
            this.caseTypeList = res.data;
          } else {
            console.info("没有查询到数据");
          }
        }
      );
    },
    showIndex(index){
      return (this.currentPage-1)*this.pageSize+index+1;
    }
  },
  mounted() {
    this.getCaseType();
  },
  created() {
    this.getDocTypeList();
  }
};
</script>

<style lang="scss" src="@/assets/css/systemManage.scss">
/* @import "@/assets/css/systemManage.scss"; */
</style>
