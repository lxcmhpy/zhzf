<!--
    案件绑定解绑
    作者：程方元
-->
<!-- 视图  -->
<template>
  <section class="c-gh-flow-zjhz-hzmx">
    <el-card class="box-card u-my-card" shadow="naver">
      <div slot="header" class="clearfix">
        <span>{{title}}</span>
        <el-button
          v-if="!isDetail"
          type="primary"
          size="mini"
          @click="handleDialog"
          style="float:right;"
        >关联案件</el-button>
      </div>
      <el-table :data="caseData" stripe style="width: 100%" height="100%">
        <el-table-column type="index" width="55"></el-table-column>
        <el-table-column prop="caseNumber" label="案号" align="center" width="200"></el-table-column>
        <el-table-column prop="party" label="当事人/单位" align="center" width="150"></el-table-column>
        <el-table-column prop="caseCauseName" label="违法行为" align="center">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" placement="top-start">
              <div slot="content" style="max-width:200px">{{scope.row.caseCauseName}}</div>
              <span>{{scope.row.caseCauseName}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="op" label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button type="text" @click="onDetail(scope.row)">详情</el-button>&nbsp;
            <el-button type="text" @click="onDelete(scope.row,scope.$index)">解绑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <propertyDialog ref="dialog" @handle-case-data="handleCaseData"></propertyDialog>
  </section>
</template>
<script>
import propertyDialog from "./propertyDialog.vue";
import { relieve } from "@/api/propertyManage";

export default {
  components: {
    propertyDialog,
  },
  props: {
    title: {
      required: true,
    },
    datas: {
      type: Array,
      default: function () {
        return [];
      },
    },
    isDetail: {
      type: Boolean,
      default: false,
    },
  },
  data: function () {
    return {
      caseData: [],
    };
  },
  computed: {},
  watch: {
    datas(val) {
      this.caseData = this.datas;
    },
  },
  mounted: function () {},
  methods: {
    handleDialog() {
      let data = {};
      let caseid = [];
      let caseNumber = [];
      this.caseData.forEach((item) => {
        caseid.push(item.id);
        caseNumber.push(item.caseNumber);
      });
      data.caseID = caseid;
      data.caseNumber = caseNumber;
      data.id = this.$route.params.id;
      this.$refs.dialog.showModal("case", [data]);
    },
    handleCaseData(data) {
      debugger;
      console.log("绑定案件信息:" + data);
      this.caseData = data;
    },
    //跳转案件详情
    onDetail(row) {
      if (row.caseStatus === "已移送") {
        let message = "该案件正在移送中，移送完成后才可与继续办理";
        this.$refs.tansferAtentionDialogRef.showModal(message, "移送中");
      } else {
        this.$store.commit("setCaseId", row.id);
        //设置案件状态不为审批中
        this.$store.commit("setCaseApproval", false);
        this.$router.push({
          name: "case_handle_caseInfo",
          params: {
            caseInfo: row,
          },
        });
        let setCaseNumber = row.caseNumber != "" ? row.caseNumber : row.tempNo;
        this.$store.commit("setCaseNumber", setCaseNumber);
      }
    },

    async onDelete(row, i) {
      if (row.propertyid) {
        let param = { caseId: row.id, propertyId: row.propertyid };
        let res = await relieve(param);
        this.$message({ type: "success", message: "解绑成功!" });
      }
      this.caseData.splice(i, 1);
    },

    getCaseData() {
      let cases = JSON.parse(JSON.stringify(this.caseData));
      return cases;
    },
  },
};
</script>