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
            <elSelectTree
              v-if="showSelectTree"
              ref="elSelectTreeObj"
              :options="getOrganList"
              :accordion="true"
              :props="props"
              @getValue="handleChanged">
            </elSelectTree>
            <el-input style="display:none" v-model="searchForm.zfjg"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" icon="el-icon-search" @click="getRequestModelListSearch">查询</el-button>
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
      <el-table :data="tableData" stripe style="width: 100%" height="100%">
        <el-table-column type="index" :index="showIndex" label="序号" width="60" align="center">
        </el-table-column>
        <el-table-column prop="modelName" label="模板名称" align="center"></el-table-column>
        <el-table-column prop="modelTypeId" label="模板类型" align="center">
           <template slot-scope="scope">
             <span v-if="scope.row.modelTypeId==='11'">标准模板</span>
             <span v-if="scope.row.modelTypeId==='22'">通用模板</span>
             <span v-if="scope.row.modelTypeId==='33'">自定义模板</span>
          </template>
        </el-table-column>
        <el-table-column prop="organName" label="执法机构" align="center"></el-table-column>
        <el-table-column prop="zfml" label="业务领域" align="center"></el-table-column>
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
import elSelectTree from '@/components/elSelectTree/elSelectTree';
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
        modelTypeId:'',
        zfjg:'',
        zfml:''
      },
      showSelectTree: true,
      props: {
          label: "label",
          value: "id"
      },
    };
  },
  components: {
    addRequestModel,
    requestList,
    elSelectTree
  },
  inject:['reload'],
  methods: {
    getRequestModelList() {
      let data = {
        current: this.currentPage,
        size: this.pageSize,
        modelName:this.searchForm.name,
        modelTypeId:this.searchForm.modelTypeId,
        zfjg:this.searchForm.zfjg,
        zfml:this.searchForm.zfml
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
    //时间格式化
    dateFormat(row, column, cellValue, index){
      let date = ""
      if(cellValue != null && cellValue != ""){
        date = new Date(cellValue).format("yyyy-MM-dd")
      }
      return date;
    },
    reset(){
      this.searchForm={};
      this.$refs.elSelectTreeObj.valueTitle = '';
      this.getRequestModelList();
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
    //查询
    getRequestModelListSearch(){
      this.currentPage = 1;
      this.getRequestModelList();
    },
    //获取当前机构及其子机构
    getCurrentOrganAndChild() {
      let _this = this
      this.$store.dispatch("getAllOrgan").then(
        res => {
          _this.getOrganList = res.data;
          console.log("列表",_this.getOrganList)
        },
        err => {
          console.log(err);
        }
      );
    },
    showIndex(index){
      return (this.currentPage-1)*this.pageSize+index+1;
    },
    handleChanged(val){
        this.$refs.elSelectTreeObj.$children[0].handleClose();
        this.searchForm.zfjg = val
    },
  },
  created() {
    this.getRequestModelList();
    this.getCurrentOrganAndChild();
  }
};
</script>
<style lang="scss" src="@/assets/css/systemManage.scss">
/* @import "@/assets/css/systemManage.scss"; */
</style>
