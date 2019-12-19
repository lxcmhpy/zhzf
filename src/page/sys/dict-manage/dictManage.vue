<template>
  <div class="fullBox" id="dictBox">
    <div class="handlePart">
      <div class="search">
        <el-form :inline="true" :model="dicSearchForm" class="">
            <el-form-item label="名称">
              <el-input v-model="dicSearchForm.name" placeholder="输入名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search" @click="getDictList">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-plus" @click="addDict">添加</el-button>
            </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="tablePart">
      <el-table :data="tableData" stripe style="width: 100%" height="100%">
        <el-table-column prop="name" label="名称" align="center"></el-table-column>
        <el-table-column prop="description" label="描述" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="editDict(scope.row)">编辑</el-button>
            <el-button type="text" @click="getDictVal(scope.row)">字典值</el-button>
            <el-button type="text" @click="deleteDict(scope.row.id)">删除</el-button>
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
    <addEditDict ref="addEditDictRef"></addEditDict>
    <showDictKey ref="showDictKeyRef"></showDictKey>
  </div>
</template>
<script>
import addEditDict from "./addEditDict";
import showDictKey from "./showDictKey";

export default {
  data() {
    return {
      tableData: [], //表格数据
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      searchName:'', //查询名称
      dicSearchForm:{
        name:''
      }
    };
  },
  components: {
    addEditDict,
    showDictKey
  },
  inject:['reload'],
  methods: {
    //获取字典列表
    getDictList() {
      let data = {
        current: this.currentPage,
        size: this.pageSize,
        name:this.dicSearchForm.name
      };
      this.$store.dispatch("getDictList",data).then(
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
    
    //获取字典值
    getDictVal(row){
      this.$refs.showDictKeyRef.showModal(row);
    },
    //删除字典
    deleteDict(id){
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("deleteDict", id).then(
            res => {
              this.reload();
              this.$message({
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
    //添加字典
    addDict(){
      let data={
            id:'',
            pid:'',
            leng:this.tableData.length
      }
      this.$refs.addEditDictRef.showModal(0, data);
    },
    //编辑字典
    editDict(row){
      let data = {
            row:row,
            pid:'',
      }
      this.$refs.addEditDictRef.showModal(2, data);
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
    this.getDictList();
  }
};
</script>

<style lang="less">
@import "../../../css/systemManage.less";
</style>