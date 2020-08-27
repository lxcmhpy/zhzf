<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox searchAndpageBox2">
      <div class="handlePart caseHandleSearchPart">
        <el-form
          :model="searchForm"
          ref="searchForm"
          class="caseSearchForm"
          label-width="80px"
          size="small"
        >
          <el-row>
            <el-col :span="5">
              <el-form-item label="车牌号" prop="vehicleNumber">
                <el-input v-model="searchForm.vehicleNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="使用单位" prop="useUnit">
                <el-input style="display:none" v-model="searchForm.useUnit"></el-input>
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
              <el-form-item label="使用证号" prop="usePermitNumber">
                <el-input v-model="searchForm.usePermitNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="证件状态" prop="state">
                <el-select v-model="searchForm.state" placeholder="请选择" clearable>
                  <el-option
                    v-for="(item,index) in status"
                    :key="index"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label-width="10px">
                <el-button size="medium" icon="el-icon-search" @click="searchEmit"></el-button>
                <el-button size="medium" icon="el-icon-refresh-left" @click="reset"></el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="tablePart">
        <el-table :data="tableData" stripe style="width: 100%" height="100%" highlight-current-row>
          <el-table-column type="index" width="55"></el-table-column>
          <el-table-column prop="vehicleNumber" label="车牌号" align="center"></el-table-column>
          <el-table-column prop="useUnitName" label="使用单位" align="center"></el-table-column>
          <el-table-column prop="vehicleType" label="车辆类型" align="center"></el-table-column>
          <el-table-column prop="usePermitNumber" label="使用证号" align="center"></el-table-column>
          <el-table-column prop="lssueTime" label="发证时间" align="center"></el-table-column>
          <el-table-column label="使用期限" align="center">
            <template slot-scope="scope">{{scope.row.beginDate}}~{{scope.row.endDate}}</template>
          </el-table-column>
          <el-table-column prop="state" label="证件状态" align="center">
            <template slot-scope="scope">
              <span :style="{'color': statusColor[scope.row.state]}">{{scope.row.state}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="op" label="操作" align="center" width="100">
            <template slot-scope="scope">
              <!-- v-if="scope.row.state=='待颁发' || scope.row.state=='挂失' || scope.row.state=='已年审'" -->
              <el-button
                v-if="scope.row.state=='待颁发' || scope.row.state=='挂失' || scope.row.state=='已年审'"
                type="text"
                size="mini"
                @click="openIssueDialog(scope.row)"
              >颁发</el-button>
              <el-button
                v-if="scope.row.state!='待颁发'"
                type="text"
                size="mini"
                @click="openViewDialog(scope.row)"
              >查看</el-button>
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

    <el-dialog
      title="证件颁发"
      :visible.sync="issueVisible"
      @close="issueVisible = false"
      :close-on-click-modal="false"
      width="60%"
    >
      <div>
        <el-form ref="handleForm" :model="deviceUsePer" :rules="rules" label-width="120px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="车牌号">
                <el-input v-model="deviceUsePer.vehicleNumber" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="使用单位">
                <el-input v-model="deviceUsePer.useUnitName" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="车辆类型">
                <el-input v-model="deviceUsePer.vehicleType" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="厂牌型号">
                <el-input v-model="deviceUsePer.brandModel" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="发动机号">
                <el-input v-model="deviceUsePer.engineNumber" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="车架号码">
                <el-input v-model="deviceUsePer.axleNumber" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="使用证号">
                <el-input v-model="deviceUsePer.usePermitNumber" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="使用期限" prop="daterange">
                <el-date-picker
                  v-model="deviceUsePer.daterange"
                  type="daterange"
                  range-separator="~"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  size="medium"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="发证机关">
                <el-input v-model="deviceUsePer.issueOrgan" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="发证时间" prop="lssueTime">
                <el-date-picker
                  v-model="deviceUsePer.lssueTime"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  style="width:100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="签发人" prop="signer">
                <el-input v-model="deviceUsePer.signer"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="签发时间" prop="signDate">
                <el-date-picker
                  v-model="deviceUsePer.signDate"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  style="width:100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="经办人" prop="manager">
                <el-input v-model="deviceUsePer.manager"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="经办时间" prop="handlingDate">
                <el-date-picker
                  v-model="deviceUsePer.handlingDate"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期"
                  style="width:100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitData()">确认颁发</el-button>
      </span>
    </el-dialog>

    <!-- 查看证件详情 -->
    <CertificateDetail ref="certificateDetailRef" />
  </div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import {
  queryCertificateList,
  saveOrUpdateCertificate,
  findCertificateById,
} from "@/api/device/deviceCertificate.js";
import CertificateDetail from "@/page/device/components/equipmentDetail/certificateDetail";
import elSelectTree from "@/components/elSelectTree/elSelectTree";

export default {
  components: { CertificateDetail, elSelectTree },
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
      status: ["待颁发", "正常", "挂失", "注销", "已年审"],
      tableData: [],
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      total: 0, //总页数
      issueVisible: false,
      handleForm: {},
      deviceUsePer: {
        daterange: "",
      },
      activeName: "first",
      rules: {
        daterange: [
          { required: true, message: "请输入使用期限 ", trigger: "blur" },
        ],
        lssueTime: [
          { required: true, message: "请输入发证时间", trigger: "blur" },
        ],
        signer: [
          { required: true, message: "请输入签发人", trigger: "change" },
        ],
        signDate: [
          { required: true, message: "请输入签发时间", trigger: "blur" },
        ],
        manager: [{ required: true, message: "请输入经办人", trigger: "blur" }],
        handlingDate: [
          { required: true, message: "请输入经办时间", trigger: "blur" },
        ],
      },
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
  methods: {
    // 获取机构树
    async getOidTreeData() {
      let res = await this.$store.dispatch("findOrganTreeByCurrUser");
      this.tableDataTree = res.data;
    },
    // 所属机构切换
    hindleChanged(val) {
      this.searchForm.useUnit = val;
      this.$refs.elSelectTreeObj.$children[0].handleClose();
    },
    //获取已归档的数据
    getDataList(searchData) {
      let data = searchData;
      data.current = this.currentPage;
      data.size = this.pageSize;
      let _this = this;
      queryCertificateList(data).then(
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
    async openIssueDialog(row) {
      this.deviceUsePer = row;
      debugger;
      this.$set;
      this.$set(this.deviceUsePer, "daterange", ["", ""]);
      //   this.deviceUsePer.daterange = ["", ""];
      if (row.beginDate) this.deviceUsePer.daterange[0] = row.beginDate;
      if (row.endDate) this.deviceUsePer.daterange[1] = row.endDate;
      await this.getOidTreeData();
      this.issueVisible = true;
    },
    openViewDialog(row) {
      this.$refs.certificateDetailRef.showModal(row.id);
    },
    submitData() {
      let _this = this;
      this.$refs["handleForm"].validate((valid) => {
        if (valid) {
          debugger;
          _this.deviceUsePer.beginDate = _this.deviceUsePer.daterange[0];
          _this.deviceUsePer.endDate = _this.deviceUsePer.daterange[1];
          _this.deviceUsePer.state = "正常";
          saveOrUpdateCertificate(_this.deviceUsePer).then(
            (res) => {
              _this.$message({ type: "success", message: "操作成功!" });
              _this.issueVisible = false;
            },
            (err) => {
              console.log(err);
            }
          );
        }
      });
    },
  },
  created() {
    this.getDataList({});
  },
};
</script>

