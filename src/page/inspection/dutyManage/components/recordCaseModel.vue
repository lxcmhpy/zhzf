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
import { getRecordCaseByRecordIdApi } from "@/api/supervision"

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
  computed: {
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
  },
};
</script>
<style lang="scss" scoped>
</style>
