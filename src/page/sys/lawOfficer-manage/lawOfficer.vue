<template>
<div class="com_searchAndpageBoxPadding">
  <div class="searchAndpageBox" id="dictBox">
    <div class="handlePart">
      <div class="search">
        <el-form :inline="true" :model="searchForm" >
          <el-form-item label="用户名">
            <el-input v-model="searchForm.userName" clearable placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="执法人姓名">
            <el-input v-model="searchForm.lawOfficerName" clearable placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="执法证号">
            <el-input v-model="searchForm.lawOfficerCards" clearable placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" icon="el-icon-search" @click="getDocTypeListSearch">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" icon="el-icon-refresh-left" @click="resetSearch">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="tablePart">
      <el-table :data="tableData" stripe style="width: 100%" height="100%">
        <el-table-column type="index" :index="showIndex" label="序号" width="60" align="center"></el-table-column>
        <el-table-column prop="lawOfficerName" label="执法人姓名" align="center"></el-table-column>
        <el-table-column prop="lawOfficerCards" label="执法证号" align="center"></el-table-column>
        <el-table-column prop="organName" label="所属机构" align="center"></el-table-column>
        <el-table-column prop="userName" label="用户名" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="saveUser(scope.row)" >绑定</el-button>
            <el-button type="text" @click="deleteUser(scope.row.id)">解绑</el-button>
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
    <userList ref="userListRef"></userList>
  </div>
</div>
</template>
<script>
 import userList from "./userList";
import { queryLawOfficerListByorganIds} from "@/api/system";
import iLocalStroage from '@/common/js/localStroage';
export default {
  data() {
    return {
      tableData: [], //表格数据
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      searchForm:{
        userName:'',
        lawOfficerName:'',
        lawOfficerCards:''
      }
    };
  },
  components: {
    userList
  },
  inject:['reload'],
  methods: {
    getLawOfficerList() {
      console.log("page",this.currentPage)
      let data = {
        current: this.currentPage,
        size: this.pageSize,
        userName:this.searchForm.userName,
        lawOfficerName:this.searchForm.lawOfficerName,
        lawOfficerCards:this.searchForm.lawOfficerCards
      };
      let _this = this
      //查询所有文书类型
      console.log("zh人员",data)
      queryLawOfficerListByorganIds(data).then(
        res => {
          console.log("zhi执法人员",res)
          _this.tableData = res.data.records;
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
    //编辑
    saveUser(row){
      this.$refs.userListRef.showModal(row);
    },
    //重置
    resetSearch(){
      this.searchForm={};
      this.getLawOfficerList();
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getLawOfficerList();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getLawOfficerList();
    },
    // 查询
    getDocTypeListSearch() {
      this.currentPage = 1;
      this.getLawOfficerList()
    },
    showIndex(index){
      return (this.currentPage-1)*this.pageSize+index+1;
    }
  },
  mounted() {
  },
  created() {
    this.getLawOfficerList()
  }
};
</script>

<style lang="scss" src="@/assets/css/systemManage.scss">
/* @import "@/assets/css/systemManage.scss"; */
</style>
