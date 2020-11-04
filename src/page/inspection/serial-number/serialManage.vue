<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox">
      <div class="handlePart">
        <div class="search">
          <el-form :inline="true" :model="stationForm" ref="stationFormRef">
            <el-form-item label="业务类型编号" prop="codeInfo">
              <el-input v-model="stationForm.codeInfo"></el-input>
            </el-form-item>
            <!-- <el-form-item label="" prop="sufName">
              <el-select v-model="stationForm.">
                <el-option label="能执法" value="0"></el-option>
                <el-option label="不能执法" value="1"></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item>
              <el-button
                type="info"
                icon="el-icon-search"
                size="medium"
                @click="
                  currentPage = 1;
                  getStationList();
                "
                >查询</el-button
              >
              <el-button type="primary" size="medium" @click="resetLog"
                >重置</el-button
              >
              <el-button
                type="primary"
                icon="el-icon-plus"
                size="medium"
                @click="stationInfo('', 0)"
                >新增</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="tablePart">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%; height: 100%"
          @selection-change="selectRow"
        >
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column prop="id" v-if="false" label></el-table-column>
          <el-table-column
            prop="codeInfo"
            label="业务类型编码"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="preName"
            label="前缀"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="dateFormat"
            label="日期格式"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="numLength"
            label="长度"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="sufName"
            label="后缀"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="currNo"
            label="当前使用账号"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="organName"
            label="机构名称"
            align="center"
          ></el-table-column>
          <!-- <el-table-column prop="isLce" label="是否执法" align="center" :formatter="isLceInfo"></el-table-column> -->
          <el-table-column prop="opt" label="操作项" align="center">
            <template slot-scope="scope">
              <el-button @click="stationInfo(scope.row, 1)" type="text"
                >修改</el-button
              >
              <el-button type="text" @click="stationInfo(scope.row, 2)"
                >删除</el-button
              >
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
    <addStationPage
      @getAddStationPage="getStationList"
      ref="addStationPageRef"
    ></addStationPage>
  </div>
</template>
  
<script>
import {
  getCheParameterInfoPageListApi,
  deleteCheParameterInfoApi,
} from "@/api/supervision";
import addStationPage from "./addNumber";
export default {
  data() {
    return {
      stationForm: {
        preName: "", //前缀
        sufName: "", //后缀
        numLength: "", //几位数字
        codeInfo: "", //不同业务用于生成指定的流水号:case_code
        currNo: "", //当前使用账号
        organId: "", //机构Id
        organName: "", //机构名称
        dateFormat: "", //日期格式
      },
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      tableData: [],
      selectRowList: [],
    };
  },
  components: {
    //组件
    addStationPage,
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
          customClass: "custom-confirm",
        })
          .then(() => {
            deleteCheParameterInfoApi(row.id).then(
              (res) => {
                if (res.code == "200") {
                  this.$message({ type: "success", message: "删除成功" });
                  this.getStationList();
                }
              },
              (err) => {
                this.$message({ type: "error", message: err.msg || "" });
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
        codeInfo: _this.stationForm.codeInfo,
        current: _this.currentPage,
        size: _this.pageSize,
      };
      getCheParameterInfoPageListApi(data).then(
        (res) => {
          if (res.code == "200") {
            this.tableData = res.data.records;
          }
        },
        (err) => {
          this.$message({ type: "error", message: err.msg || "" });
        }
      );
    },
    isLceInfo(row) {
      if (row.isLce == "0") {
        return "能执法";
      }
      if (row.isLce == "1") {
        return "不能执法";
      }
    },
  },
  created() {
    //初始数据
    let _this = this;
    _this.getStationList();
  },
};
</script>

<style scoped>
</style>