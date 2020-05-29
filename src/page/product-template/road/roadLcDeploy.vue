<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox" id="roleBox">
      <div class="handlePart">
        <div class="search">
          <el-form :inline="true" :model="dicSearchForm" class>
            <el-form-item label="所属标准：">
              <el-select v-model="dicSearchForm.roadLcBz" @change="initRoadLcType">
                <el-option value="高等级公路标准" label="高等级公路标准"></el-option>
               <el-option value="普通公路标准" label="普通公路标准"></el-option>
             </el-select>
            </el-form-item>
            <el-form-item label="类型：">
              <el-select v-model="dicSearchForm.roadLcType" @click.native="isChoseBz" placeholder="请选择">
                <el-option v-for="item in typeList" :key="item.name" :label="item.name" :value="item.name"></el-option>
             </el-select>
            </el-form-item>
            <el-form-item label="路产名称：">
              <el-input v-model="dicSearchForm.roadLcName" placeholder="输入路产名称"></el-input>
           </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search" @click="getRoadLcDeploy">查询</el-button>
           </el-form-item>
           <el-form-item>
             <el-button type="primary" size="medium" icon="el-icon-plus" @click="addOrUpdateRoadLcDeploy">添加</el-button>
           </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="tablePart">
        <el-table :data="tableData" stripe style="width: 100%" height="100%">
          <el-table-column type="index" align="center">
            <template slot="header">序号</template>
          </el-table-column>
          <el-table-column prop="roadLcName" label="路产名称" align="center"></el-table-column>
          <el-table-column prop="roadLcType" label="类型" align="center"></el-table-column>
          <el-table-column prop="roadLcPrice" label="单价(元)" align="center"></el-table-column>
          <el-table-column prop="roadLcUnit" label="单位" align="center"></el-table-column>
          <el-table-column prop="roadLcBz" label="所属标准" align="center"></el-table-column>
          <el-table-column prop="roadLcNote" :show-overflow-tooltip="true" label="备注" align="center"></el-table-column>
          <el-table-column fixed="right" label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="editRoadLcDeploy(scope.row)" type="text">编辑</el-button>
              <el-button type="text" @click="deleteRoadLcDeploy(scope.row.id)">删除</el-button>
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
      <addOrUpdateRoadLcDeploy ref="addOrUpdateRoadLcDeployRef"></addOrUpdateRoadLcDeploy>
    </div>
  </div>
</template>
<script>
import addOrUpdateRoadLcDeploy from "./addOrUpdateRoadLcDeploy";
import {
  getDictListDetailApi,
} from "@/api/system";
export default {
  data() {
    return {
      tableData: [], //表格数据
      dicSearchForm: {
        roadLcBz: "",
        roadLcType: "",
        roadLcName: "",
        roadLcNote: "",
      },
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      typeList: [],
    };
  },
  components: {
    addOrUpdateRoadLcDeploy
  },
  inject: ["reload"],
  methods: {
    //编辑案件类型
    editRoadLcDeploy(row) {
      this.$refs.addOrUpdateRoadLcDeployRef.showModal(2, row);
    },
    //删除案件类型
    deleteRoadLcDeploy(id) {
      this.$confirm("确认删除该案件类型?", "提示",{
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
              this.$store.dispatch("deleteRoadLcDeploy", id).then(
                res => {
                  this.$message({
                    type: "success",
                    message: "删除成功!"
                  });
                  this.reload();
                },
                err => {
                  console.log(err);
                }
              );
            })
            .catch(() => {});
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getRoadLcDeploy();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getRoadLcDeploy();
    },

    isChoseBz(){
      if(this.dicSearchForm.roadLcBz == null || this.dicSearchForm.roadLcBz == ""){
        this.$message({message: "请先选择所属标准",type:'warning'});
      }
    },
    //选中所属标准，加载类型
    initRoadLcType(){
      let _this = this;
      let bzId = null;
      if(this.dicSearchForm.roadLcBz == '高等级公路标准'){
        bzId = '9fba0079cdcf93994a9dc317f3c8ee0d';
      }else{
        bzId = '0c340250837a8cb58e7ce330266ab5c6';
      }
      getDictListDetailApi(bzId).then(res=>{
        console.log(res)
         _this.typeList = res.data;
         _this.dicSearchForm.roadLcType = "";
      })
    },

    //获取角色
    getRoadLcDeploy() {
      let data = {
        current: this.currentPage,
        size: this.pageSize,
        roadLcName: this.dicSearchForm.roadLcName,
        roadLcType: this.dicSearchForm.roadLcType,
        roadLcBz: this.dicSearchForm.roadLcBz,
        roadLcNote: this.dicSearchForm.roadLcNote,
      };
      let _this = this;
      this.$store.dispatch("getRoadLcDeploy", data).then(
        res => {
          console.log("路产配置列表", res);
          _this.tableData = res.data.records;
          _this.totalPage = res.data.total;
        },
        err => {
          console.log(err);
        }
      );
    },
    //添加或修改案件类型
    addOrUpdateRoadLcDeploy() {
      this.$refs.addOrUpdateRoadLcDeployRef.showModal(0, "");
    },
  },
  created() {
    this.getRoadLcDeploy();
  }
};
</script>

// <style lang="scss">
// @import "@/assets/css/systemManage.scss";
// </style>
