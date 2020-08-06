<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox searchAndpageBox2">
      <div class="handlePart caseHandleSearchPart">
        <div>
          <el-form
            :model="searchForm"
            ref="searchForm"
            class="caseSearchForm"
            label-width="80px"
            size="small"
          >
            <el-row>
              <el-col :span="6">
                <el-form-item label="车牌号">
                  <el-input v-model="searchForm.vehicleNumber"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="使用单位">
                  <el-input v-model="searchForm.useUnit"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="车辆类别">
                  <el-input v-model="searchForm.vehicleCategory"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="使用情况">
                  <el-select v-model="searchForm.useCondition" placeholder="请选择" clearable>
                    <el-option
                      v-for="(item,index) in handleWayList"
                      :key="index"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="使用证号">
                  <el-input v-model="searchForm.usePermitNo"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="证件状态">
                  <el-input v-model="searchForm.usePermitState"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item>
                  <el-button type="primary" size="medium" icon="el-icon-search" @click="searchEmit"></el-button>
                  <el-button
                    type="primary"
                    size="medium"
                    icon="el-icon-refresh-left"
                    @click="reset"
                  ></el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <el-row>
        <router-link :to="{ name: 'deviceVehicle', params: { id: 'add' }}">
          <el-button type="primary" size="medium" icon="el-icon-plus">新增</el-button>
        </router-link>
        <el-button type="primary" size="medium" icon="el-icon-delete">删除</el-button>
      </el-row>
      <div class="tablePart">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%"
          height="100%"
          highlight-current-row
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="vehicleNumber" label="车牌号" align="center"></el-table-column>
          <el-table-column prop="useUnit" label="使用单位" align="center"></el-table-column>
          <el-table-column prop="vehicleCategory" label="车辆类别" align="center"></el-table-column>
          <el-table-column prop="useCondition" label="使用状况" align="center"></el-table-column>
          <el-table-column prop="usePermitNo" label="使用证号" align="center"></el-table-column>
          <el-table-column prop="usePermitState" label="证件状态" align="center"></el-table-column>
          <el-table-column prop="op" label="操作" align="center" width="100">
            <template slot-scope="scope">
              <router-link :to="{ name: 'equipmentDetail', params: { id: scope.row.id }}">
                <el-button type="text" size="mini">查看</el-button>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="paginationBox" v-if="tableData.length > 0">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handlePageSizeChange"
          :current-page="currentPage"
          background
          :page-sizes="[10, 20, 30, 40]"
          layout="prev, pager, next,sizes,jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { queryDeviceVehicle } from "@/api/device/deviceVehicle.js";

export default {
  data() {
    return {
      searchForm: {
        vehicleNumber: "",
        useUnit: "",
        vehicleCategory: "",
        useCondition: "",
        usePermitNo: "",
        usePermitState: "",
      },
      tableData: [],
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      total: 0, //总页数
      handleWayList: ["封存", "扣押", "退回当事人", "移交法院", "销毁", "其他"],
      syqxList: [30, 90, 180, 360],
      multipleSelection: [],
      caseIds: [],
      propertyIds: [],
    };
  },
  mixins: [mixinGetCaseApiList],
  methods: {
    newAdd() {
      this.$router.push({
        name: "case_handle_addProperty",
      });
    },
    handleDialog(type) {
      if (this.multipleSelection.length < 1) {
        this.$message({ type: "warning", message: "请选择涉案财物记录" });
        return;
      }
      this.$refs.dialog.showModal(type, this.multipleSelection);
    },
    async handleCaseData(data) {
      debugger;
      this.caseIds = [];
      this.propertyIds = [];
      let that = this;
      data.forEach((item) => {
        that.caseIds.push(item.id);
      });
      this.multipleSelection.forEach((item) => {
        that.propertyIds.push(item.id);
      });
      let param = {
        caseId: that.caseIds.join(),
        propertyId: that.propertyIds.join(),
      };
      let res = await addCase(param);
      this.$message({ type: "success", message: "操作成功!" });
      this.getDataList({});
    },
    async handleWayData(data) {
      debugger;
      this.propertyIds = [];
      let that = this;
      this.multipleSelection.forEach((item) => {
        that.propertyIds.push(item.id);
      });
      data.ids = that.propertyIds.join();
      data.disposePersonId = iLocalStroage.gets("userInfo").id;
      data.disposePersonName = iLocalStroage.gets("userInfo").nickName;

      let res = await dispose(data);
      this.$message({ type: "success", message: "操作成功!" });
      this.getDataList({});
    },
    handleSelectionChange(val) {
      //多选
      if (val.length > 1) {
        this.moreColum = true;
        this.$message({ type: "warning", message: "请选择一条记录操作!" });
        return;
      }
      this.moreColum = false;
      this.multipleSelection = val;
    },
    //单选
    /* handleCurrentChange(val) {
      debugger;
      let data = [];
      data.push(val);
      this.multipleSelection = data;
    }, */
    //获取已归档的数据
    getDataList(searchData) {
      let data = searchData;
      data.current = this.currentPage;
      data.size = this.pageSize;
      let _this = this;
      queryDeviceVehicle(data).then(
        (res) => {
          _this.total = res.data.total;
          _this.tableData = res.data.records;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getDataList(this.searchForm);
    },
    //更换页码
    handlePageSizeChange(val) {
      this.currentPage = val;
      this.getDataList(this.searchForm);
    },
    //展开
    showSomeSearch() {
      this.hideSomeSearch = !this.hideSomeSearch;
    },
    searchEmit() {
      this.getDataList(this.searchForm);
    },
    reset() {
      this.$refs["searchForm"].resetFields();
    },
  },
  created() {
    this.getDataList({});
  },
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/index.scss">
</style>

