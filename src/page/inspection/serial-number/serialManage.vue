<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox">
      <div class="handlePart">
        <div class="search">
          <el-form :inline="true" :model="stationForm" ref="stationFormRef">
            <el-form-item label="岗位名称" prop="name">
              <el-input v-model="stationForm.name"></el-input>
            </el-form-item>
            <el-form-item label="是否执法" prop="isLce">
              <el-select v-model="stationForm.isLce" placeholder="是否执法">
                <el-option label="能执法" value="0"></el-option>
                <el-option label="不能执法" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="info" icon="el-icon-search" size="medium" @click="currentPage = 1; getStationList();">查询</el-button>
              <el-button type="primary" size="medium" @click="resetLog">重置</el-button>
              <el-button
                type="primary"
                icon="el-icon-plus"
                size="medium"
                @click="stationInfo('',0)"
              >新增</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="tablePart">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%;height:100%;"
          @selection-change="selectRow"
        >
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column prop="id" v-if="false" label></el-table-column>
          <el-table-column prop="name" label="岗位名称" align="center"></el-table-column>
          <el-table-column prop="isLce" label="是否执法" align="center" :formatter="isLceInfo"></el-table-column>
          <el-table-column prop="opt" label="操作项" align="center">
            <template slot-scope="scope">
              <el-button @click="stationInfo(scope.row,1)" type="text">修改</el-button>
              <el-button type="text" @click="stationInfo(scope.row,2)">删除</el-button>
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
          :page-sizes="[10, 20, 30, 40, 50]"
          layout="prev, pager, next,sizes,jumper"
          :total="totalPage"
        ></el-pagination>
      </div>
    </div>
    <!-- 新增页面 -->
    <addStationPage @getAddStationPage="getStationList" ref="addStationPageRef"></addStationPage>
  </div>
</template>
    
<script>
import addStationPage from "./addNumber";
export default {
  data() {
    return {
      stationForm: {
        name: "",
        isLce: ""
      },
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      tableData: [],
      selectRowList: []
    };
  },
  components: {
    //组件
    addStationPage
  },
  methods: {
    //获取选中的user
    selectRow(val) {
      let _this = this;
      _this.selectRowList = [];
      val.forEach((item, index) => {
        _this.selectRowList.push(item.personId);
      });
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getStationList();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getStationList();
    },
    resetLog() {
      this.$refs["stationFormRef"].resetFields();
      this.currentPage = 1;
      this.getStationList();
    },
    stationInfo(row, type) {
      //新增
      let _this = this;
      if (type == 2) {
        //删除
        let _this = this;
        this.$confirm("确定要删除吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          iconClass: "el-icon-question",
          customClass: "custom-confirm"
        })
          .then(() => {
            _this.$store.dispatch("getStationDeleteById", row.id).then(
              res => {
                _this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                //重新加载页面数据
                _this.getStationList();
              },
              err => {
                console.log(err);
              }
            );
          })
          .catch(() => {});
      } else {
        _this.$refs.addStationPageRef.showModal(row, type);
      }
    },
    getStationList() {
      //获取查询列表
      let _this = this;
      let data = {
        name: _this.stationForm.name,
        isLce: _this.stationForm.isLce,
        current: _this.currentPage,
        size: _this.pageSize
      };
      _this.$store.dispatch("getStationList", data).then(res => {
        _this.tableData = res.data.records;
        _this.totalPage = res.data.total;
      });
      err => {
        console.log(err);
      };
    },
    isLceInfo(row) {
      if (row.isLce == "0") {
        return "能执法";
      }
      if (row.isLce == "1") {
        return "不能执法";
      }
    }
  },
  created() {
    //初始数据
    let _this = this;
    _this.getStationList();
  }
};
</script>

<style scoped>
</style>