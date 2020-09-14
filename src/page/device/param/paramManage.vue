<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox">
      <div class="handlePart">
        <div class="search">
          <el-form :inline="true" :model="paramForm" ref="paramFormRef">
            <el-form-item label="参数名称" prop="paramName">
              <el-input v-model="paramForm.paramName"></el-input>
            </el-form-item>
            <el-form-item label="参数值" prop="paramValue">
              <el-input v-model="paramForm.paramValue"></el-input>
            </el-form-item>
            <el-form-item label="参数说明" prop="paramComment">
              <el-input v-model="paramForm.paramComment"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="info" icon="el-icon-search" size="medium" @click="currentPage = 1;getParamList();">查询</el-button>
              <el-button type="primary" size="medium" @click="resetLog">重置</el-button>
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
          <el-table-column prop="paramName" label="参数名称" align="center"></el-table-column>
          <el-table-column prop="paramValue" label="参数值" align="center"></el-table-column>
          <el-table-column prop="paramComment" label="参数说明" align="center"></el-table-column>
          <el-table-column prop="opt" label="操作项" align="center">
            <template slot-scope="scope">
              <el-button v-if="scope.row.paramName!='APPROVE_ORGAN'" @click="paramInfo(scope.row)" type="text">修改</el-button>
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
    <updateParamPage @getParamPage="getParamList" ref="updateParamPageRef"></updateParamPage>
  </div>
</template>
    
<script>
import updateParamPage from "./updateParam";
import { getParamList } from "@/api/device/param.js";
export default {
  data() {
    return {
      paramForm: {
        id: "",
        paramName: "",
        paramValue: "",
        paramComment: ""
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
    updateParamPage
  },
  methods: {
    paramInfo(row) {
      //新增
      let _this = this;
      _this.$refs.updateParamPageRef.showModal(row, type);
    },
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
      this.getParamList();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getParamList();
    },
    resetLog() {
      this.$refs["paramFormRef"].resetFields();
      this.currentPage = 1;
      this.getParamList();
    },
    paramInfo(row) {
      //新增
      let _this = this;
      _this.$refs.updateParamPageRef.showModal(row);
    },
    getParamList() {
      //获取查询列表
      let _this = this;
      let data = {
        paramName: _this.paramForm.paramName,
        paramValue: _this.paramForm.paramValue,
        paramComment: _this.paramForm.paramComment,
        current: _this.currentPage,
        size: _this.pageSize
      };
      getParamList(data).then(res => {
        _this.tableData = res.data.records;
        _this.totalPage = res.data.total;
      });
      err => {
        console.log(err);
      };
    }
  },
  created() {
    //初始数据
    let _this = this;
    _this.getParamList();
  }
};
</script>

<style scoped>
</style>