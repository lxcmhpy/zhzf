<template>
  <el-dialog
    title="违法记录信息"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="50%"
  >
    <el-table
      :data="illegalData"
      stripe
      resizable
      border
      :span-method="objectSpanMethod" 
      style="width: 100%; height: 300px"
    >
      <el-table-column
        prop="caseCauseName"
        label="违法行为及次数"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.caseCauseName + "（" + scope.row.total + "）" }}
        </template>
      </el-table-column>
      <el-table-column
        prop="caseNumber"
        label="案号"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="partyName"
        label="当事人"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="acceptTime"
        label="受案时间"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="caseStatus"
        label="案件状态"
        align="center"
      ></el-table-column>
    </el-table>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      illegalData: "",
    };
  },
  methods: {
    showModal(data) {
      this.visible = true;
      this.illegalData = data.caseList;
      let illegalDataNumberArr = data.caseCount;
      let startIndex = 0;
      illegalDataNumberArr.forEach((item) => {
        this.illegalData[startIndex].total = item.count;
        startIndex += item.count;
      });
      console.log("this.illegalData", this.illegalData);
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    //合并单元格
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (row.total) {
          return {
            rowspan: row.total,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },
  },
};
</script>

