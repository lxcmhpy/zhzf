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
                <el-form-item label="车牌号" prop="vehicleNumber">
                  <el-input v-model="searchForm.vehicleNumber"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="使用单位" prop="name">
                  <el-input style="display:none" v-model="searchForm.name"></el-input>
                  <elSelectTree
                    ref="elSelectTreeObj"
                    :options="tableDataTree"
                    :accordion="true"
                    :props="{label: 'label', value: 'id'}"
                    @getValue="hindleChanged"
                  ></elSelectTree>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="车辆类别" prop="vehicleCategory">
                  <el-select v-model="searchForm.vehicleCategory" placeholder="请选择" clearable>
                    <el-option
                      v-for="(item,index) in categorys"
                      :key="index"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="使用情况" prop="useCondition">
                  <el-select v-model="searchForm.useCondition" placeholder="请选择" clearable>
                    <el-option
                      v-for="(item,index) in conditions"
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
                <el-form-item label="使用证号" prop="usePermitNo">
                  <el-input v-model="searchForm.usePermitNo"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="证件状态" prop="usePermitState">
                  <el-select v-model="searchForm.usePermitState" placeholder="请选择" clearable>
                    <el-option
                      v-for="(item,index) in status"
                      :key="index"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item>
                  <el-button size="medium" icon="el-icon-search" @click="searchEmit"></el-button>
                  <el-button size="medium" icon="el-icon-refresh-left" @click="reset"></el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <el-row>
        <router-link :to="{ name: 'equipmentDetail', params: { id: 'add' }}">
          <el-button type="primary" size="medium" icon="el-icon-plus">新增</el-button>
        </router-link>
        <el-button type="success" size="medium" icon="el-icon-delete" @click="deleteBatch">删除</el-button>
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
          <el-table-column prop="name" label="使用单位" align="center"></el-table-column>
          <el-table-column prop="vehicleCategory" label="车辆类别" align="center"></el-table-column>
          <el-table-column prop="useCondition" label="使用状况" align="center">
            <template slot-scope="scope">
              <span
                :style="{'color': statusColor[scope.row.useCondition]}"
              >{{scope.row.useCondition}}</span>
            </template>
          </el-table-column>
          <el-table-column label="使用证号" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.deviceUsePerVo">{{scope.row.deviceUsePerVo.usePermitNumber}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="state" label="证件状态" align="center">
            <template slot-scope="scope">
              <span :style="{'color': statusColor[scope.row.state]}">{{scope.row.state}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="op" label="操作" align="center" width="100">
            <template slot-scope="scope">
              <router-link :to="{ name: 'equipmentDetail', params: { id: scope.row.id }}">
                <el-button type="text" style="font-size:14px">查看</el-button>
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
import {
  queryDeviceVehicle,
  deleteVehicles,
} from "@/api/device/deviceVehicle.js";
import elSelectTree from "@/components/elSelectTree/elSelectTree";

export default {
  components: { elSelectTree },
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
      conditions: ["正常", "维修", "报废"],
      categorys: ["轿车", "越野车", "轻型货车"],
      status: ["未申请", "申请中", "待颁发", "正常", "挂失", "注销", "已年审"],
      multipleSelection: [],
      caseIds: [],
      propertyIds: [],
      tableDataTree: [],
      statusColor: {
        待颁发: "#0074F5",
        正常: "#05C051",
        挂失: "#FF8000",
        已年审: "#0BA5BF",
        注销: "#999999",
        报废: "#999999",
      },
    };
  },
  mixins: [mixinGetCaseApiList],
  methods: {
    // 获取机构树
    getOidTreeData() {
      let _this = this;
      _this.$store.dispatch("findOrganTreeByCurrUser").then(
        (res) => {
          _this.tableDataTree = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    // 所属机构切换
    hindleChanged(val) {
      this.searchForm.useUnit = val;
      this.$refs.elSelectTreeObj.$children[0].handleClose();
    },
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    deleteBatch() {
      if (this.multipleSelection.length < 1) {
        this.$message({ type: "warning", message: "请选择一条记录操作!" });
        return;
      }
      let ids = [];
      this.multipleSelection.forEach((item) => {
        ids.push(item.id);
      });
      let _this = this;
      deleteVehicles(ids).then(
        (res) => {
          _this.$message({ type: "success", message: "删除成功!" });
          _this.getDataList({});
        },
        (error) => {
          console.log(error);
        }
      );
    },

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
    this.getOidTreeData();
  },
};
</script>
<style>
.el-button--success {
  color: #fff;
  background-color: #1aa08e;
  border-color: #1aa08e;
}
.el-button--success:focus,
.el-button--success:hover {
  background: #30b8a5;
  border-color: #30b8a5;
  color: #fff;
}
</style>

