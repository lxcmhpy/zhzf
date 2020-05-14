<template>
<div class="com_searchAndpageBoxPadding">
  <div class="searchAndpageBox" id="dictBox">
    <div class="handlePart">
      <div class="search">
        <el-form :inline="true" ref="searchForm" :model="searchForm" >
          <el-form-item label="问答模板名称" prop="name">
            <el-input v-model="searchForm.name" clearable placeholder="问答模板名称"></el-input>
          </el-form-item>
          <el-form-item label="执法机构" prop="modelTypeId">
            <el-select v-model="searchForm.modelTypeId" clearable placeholder="请选择执法机构">
              <el-option
                v-for="item in getOrganList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" icon="el-icon-search" @click="getRequestModelList">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" icon="el-icon-close" @click="reset">重置</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" icon="el-icon-plus" @click="addRequestModel">新增模板</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="tablePart">
      <el-table :data="tableData" highlight-current-row @current-change="chexkCase" style="width: 100%" height="100%">
        <el-table-column type="index" width="60" align="center">
          <template slot="header">序号</template>
        </el-table-column>
        <el-table-column prop="modelName" label="模板名称" align="center"></el-table-column>
        <el-table-column prop="createName" label="创建人" align="center"></el-table-column>
        <el-table-column prop="createTime" :formatter="dateFormat" label="创建时间" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="queryRequestList(scope.row.id)" >详情</el-button>
            <el-button type="text" @click="editRequestModel(scope.row)" >修改</el-button>
            <el-button type="text" @click="deleteRequestModel(scope.row.id)">删除</el-button>
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
    <addRequestModel ref="addRequestModelRef"></addRequestModel>
    <requestList ref="requestListRef"></requestList>
  </div>
</div>
</template>
<script>
import addRequestModel from "./addRequestModel";
import requestList from "./requestList";
import iLocalStroage from "@/common/js/localStroage";
import { getRequestModelListApi,deleteRequestModelApi} from "@/api/caseHandle";
export default {
  data() {
    return {
      tableData: [], //表格数据
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      getOrganList: [],
      searchName:'', //查询名称
      searchForm:{
        name:'',
        modelTypeId:''
      }
    };
  },
  components: {
    addRequestModel,
    requestList
  },
  inject:['reload'],
  methods: {
    getRequestModelList() {
      let data = {
        current: this.currentPage,
        size: this.pageSize,
        modelName:this.searchForm.name,
        modelTypeId:this.searchForm.modelTypeId
      };
      let _this = this
      //查询所有文书类型
      getRequestModelListApi(data).then(
        res => {
          _this.tableData = res.data.records;
          _this.totalPage = res.data.total;
        },
        error => {
          console.log(error)
        }
      );
    },
    //根据模版id查询问题
    queryRequestList(id){
      this.$refs.requestListRef.showModal(id);
    },
    //删除
    deleteRequestModel(id){
      let _this = this
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          deleteRequestModelApi(id).then(
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
    addRequestModel(){
      let data={
            userInfo :  iLocalStroage.gets("userInfo")
        };
      let orgList = this.getOrganList;
      this.$refs.addRequestModelRef.showModal(0,data,orgList);
    },
    //编辑
    editRequestModel(row){
      let data = row;
      let orgList = this.getOrganList;
      this.$refs.addRequestModelRef.showModal(2, data, orgList);
    },
    chexkCase(val){},
    //时间格式化
    dateFormat(row, column, cellValue, index){
      let date = ""
      if(cellValue != null && cellValue != ""){
        date = new Date(cellValue).format("yyyy-MM-dd")
      }
      return date;
    },
    reset(){
      this.$refs.searchForm.resetFields();
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getRequestModelList();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getRequestModelList();
    },
    //获取当前机构及其子机构
    getCurrentOrganAndChild() {
      let organId =  iLocalStroage.gets("userInfo").organId;
      let _this = this
      this.$store.dispatch("getCurrentAndNextOrgan",organId).then(
        res => {
          _this.getOrganList = res.data;
        },
        err => {
          console.log(err);
        }
      );
    },
  },
  created() {
    this.getRequestModelList();
    this.getCurrentOrganAndChild();
  }
};
</script>
<style lang="scss">
@import "@/assets/css/systemManage.scss";
</style>