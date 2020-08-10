<template>
  <div class="com_searchAndpageBoxPadding">
    <div :class="hideSomeSearch ? 'searchAndpageBox' : 'searchAndpageBox searchAndpageBox2'">
      <div class="handlePart caseHandleSearchPart">
        <div>
          <router-link :to="{ name: 'case_handle_addProperty', params: { id: 'add' }}">
            <el-button type="primary" size="medium" icon="el-icon-plus">财物登记</el-button>
          </router-link>
        </div>
        <div>
          <el-form :model="searchForm" ref="searchForm" class="caseSearchForm" label-width="80px">
            <div>
              <div class="item">
                <el-form-item label="财物编号">
                  <el-input v-model="searchForm.propertyNo"></el-input>
                </el-form-item>
              </div>

              <div class="item">
                <el-form-item label="财物名称">
                  <el-input v-model="searchForm.propertyName"></el-input>
                </el-form-item>
              </div>
              <div class="item">
                <el-form-item label="关联案件案号" label-width="110px">
                  <el-input v-model="searchForm.csaseNo"></el-input>
                </el-form-item>
              </div>

              <div class="item">
                &nbsp;
                <el-button type="primary" size="medium" icon="el-icon-search" @click="searchEmit"></el-button>
                <el-button
                  type
                  size="medium"
                  :icon="hideSomeSearch ? 'el-icon-arrow-down':'el-icon-arrow-up'"
                  @click="showSomeSearch"
                ></el-button>
              </div>
            </div>
            <div :class="{hideSomeSearchClass:hideSomeSearch}">
              <div class="item">
                <el-form-item label="处理方式">
                  <el-select v-model="searchForm.disposeWay" placeholder="请选择" clearable>
                    <el-option
                      v-for="(item,index) in handleWayList"
                      :key="index"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="item">
                <el-form-item label="保管单位">
                  <el-input v-model="searchForm.saveUnit"></el-input>
                </el-form-item>
              </div>
              <div class="item">
                <el-form-item label="财物归属人/单位" label-width="130px">
                  <el-input v-model="searchForm.propertyBelonger"></el-input>
                </el-form-item>
              </div>
              <div class="item">
                <el-form-item label="保管方式">
                  <el-input v-model="searchForm.saveWay"></el-input>
                </el-form-item>
              </div>

              <div class="item">
                <el-form-item label="剩余期限">
                  <el-select v-model="searchForm.period" placeholder="请选择" clearable>
                    <el-option
                      v-for="(item,index) in syqxList"
                      :key="index"
                      :label="item == '永久'?item:item + '天'"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <el-row>
        <el-button type="primary" size="medium" @click="handleDialog('case')">案件关联/解绑</el-button>
        <el-button type="primary" size="medium" @click="handleDialog('property')">财物处理</el-button>
      </el-row>
      <div class="tablePart">
        <el-table
          ref="singleTable"
          :data="tableData"
          style="width: 100%"
          height="100%"
          highlight-current-row
          @row-click="handleCurrentChange"
        >
          <!-- <el-table-column type="selection" width="30"></el-table-column> -->
          <el-table-column prop="propertyNo" label="财物编号" align="center" width="150">
            <template slot-scope="scope">
              <router-link :to="{ name: 'case_handle_viewProperty', params: { id: scope.row.id }}">
                <el-button type="text">{{scope.row.propertyNo}}</el-button>
              </router-link>
            </template>
          </el-table-column>
          <el-table-column prop="propertyName" label="财物名称" align="center"></el-table-column>
          <el-table-column prop="propertyNum" label="财物数量/单位" align="center">
            <template slot-scope="scope">{{scope.row.propertyNum + scope.row.propertyNumUnit}}</template>
          </el-table-column>
          <el-table-column prop="caseNumber" label="关联案件案号" align="center" width="180">
            <template slot-scope="scope">
              <el-popover
                v-if=" scope.row.caseID.length > 0 "
                placement="left"
                width="210"
                trigger="hover"
              >
                <el-row
                  v-for="(item,index) in scope.row.caseNumber"
                  :key="index"
                  style="padding:5px;"
                >{{(index+1) + " : " +item}}</el-row>
                <el-button type="text" slot="reference">{{scope.row.caseNumber[0]}}...</el-button>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="propertyBelonger" label="财物归属人/单位" align="center"></el-table-column>
          <el-table-column prop="saveUnit" label="保管单位" align="center"></el-table-column>
          <el-table-column prop="saveWay" label="保管方式" align="center"></el-table-column>
          <el-table-column prop="storagePeriod" label="剩余期限" align="center"></el-table-column>
          <el-table-column prop="disposeWay" label="处理方式" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.propertyDispose">{{scope.row.propertyDispose.disposeWay}}</span>
              <span v-else>无</span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="op" label="操作" align="center" width="100">
          <template slot-scope="scope">
            <router-link :to="{ name: 'case_handle_addProperty', params: { id: scope.row.id }}">
              <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
            </router-link>
          </template>
          </el-table-column>-->
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

    <propertyDialog
      ref="dialog"
      @handle-case-data="handleCaseData"
      @handle-way-data="handleWayData"
    ></propertyDialog>
  </div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import caseListSearch from "@/components/caseListSearch/caseListSearch";
import propertyDialog from "./propertyDialog.vue";
import {
  queryProperty,
  deletePropertyById,
  dispose,
  addCase,
} from "@/api/propertyManage";

export default {
  components: {
    propertyDialog,
  },
  data() {
    return {
      searchForm: {
        propertyNo: "",
        propertyName: "",
        caseNumber: "",
        handleWay: "",
        propertyBelonger: "",
        saveUnit: "",
        saveWay: "",
        storagePeriod: "",
      },
      tableData: [],
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      total: 0, //总页数
      hideSomeSearch: true,
      handleWayList: ["封存", "扣押", "退回当事人", "移交法院", "销毁", "其他"],
      syqxList: [30, 90, 180, 360, "永久"],
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
    // handleSelectionChange(val) {
    //   //多选
    //   if (val.length > 1) {
    //     this.moreColum = true;
    //     this.$message({ type: "warning", message: "请选择一条记录操作!" });
    //     return;
    //   }
    //   this.moreColum = false;
    //   this.multipleSelection = val;
    // },
    //单选
    handleCurrentChange(row) {
      debugger;
      if (this.multipleSelection.length > 0) {
        if (this.multipleSelection[0].id == row.id) {
          this.$refs.singleTable.setCurrentRow();
          this.multipleSelection = [];
        } else {
          this.$refs.singleTable.setCurrentRow(row);
          this.multipleSelection = [row];
        }
      } else {
        this.$refs.singleTable.setCurrentRow(row);
        this.multipleSelection = [row];
      }
    },
    //获取已归档的数据
    getDataList(searchData) {
      let data = searchData;
      data.current = this.currentPage;
      data.size = this.pageSize;
      let _this = this;
      queryProperty(data).then(
        (res) => {
          _this.total = res.data.total;
          debugger;
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
  },
  created() {
    this.getDataList({});
  },
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/index.scss">
</style>

