<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="45%"
    class="record-case-model"
  >
    <el-table
      ref="recordCaseTableRef"
      :data="tableData"
      resizable
      stripe
      class="recordCase-table"
      v-loading="tableLoading"
      @row-click="caseRowClick"
      element-loading-spinner="car-loading"
      element-loading-text="加载中..."
      style="width: 100%;height:100%;"
    >
      <el-table-column prop="tempNo" label="案号" align="left" width="160px"></el-table-column>
      <el-table-column prop="caseType" label="案件类型" align="center" min-width="140px"></el-table-column>
      <el-table-column prop="caseCauseName" label="违法行为" align="left" width="280px"></el-table-column>
      <el-table-column prop="afdd" label="案发地点" align="center" min-width="160px"></el-table-column>
    </el-table>
  </el-dialog>
</template>
<script>
import { mapGetters } from "vuex";
import { getRecordCaseByRecordIdApi } from "@/api/supervision";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import iLocalStroage from "@/common/js/localStroage";

export default {
  props: {},
  data() {
    return {
      dialogTitle: "案件列表",
      visible: false,
      tableData: [],
      tableLoading: false
    };
  },
  mixins: [mixinGetCaseApiList],
  computed: {
    ...mapGetters(["openTab"]),
    UserInfo() {
      return iLocalStroage.gets("userInfo");
    },
  },
  created() {},
  methods: {
    showModal(recordId) {
      this.visible = true;
      getRecordCaseByRecordIdApi(recordId).then(
        res => {
          this.tableData = res.data;
        },
        err => console.error(err)
      );
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.tableData = [];
    },
    async caseRowClick(row) {
      // this.$store.commit("setCaseId", row.id);
      // iLocalStroage.set("stageCaseId",row.id);
      // await this.queryFlowBycaseId();
      // this.$router.replace({
      //   name: this.caseFlowData.basicInfoPage,
      // });
      // return;
      this.$store.commit("setCaseId", row.id);
      this.$store.commit("setIsLawEnforcementSupervision", false);
      this.$store.commit("setLawEnforcementSupervisionType", '');
      //防止出现多个案件tab
      let newOpenTab = this.openTab.filter(item => {return item.isCase == false })
      this.$store.commit("reset_ALLTABS", newOpenTab);
      //设置案件状态不为审批中
      this.$store.commit("setCaseApproval", false);
      console.log(this.$store.state.caseId);
      this.$router.push({
        name: "case_handle_caseInfo",
        params: {
          caseInfo: row
        }
      });
      let setCaseNumber = row.caseNumber != '' ? row.caseNumber : row.tempNo;
      this.$store.commit("setCaseNumber", setCaseNumber);
      }
  },
};
</script>
<style lang="scss" scoped>
</style>
