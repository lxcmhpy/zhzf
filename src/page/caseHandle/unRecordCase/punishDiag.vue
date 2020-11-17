<template>
  <el-dialog
    :title="punishTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="40%"
    append-to-body
  >
    <div>
      <p>
        违法行为:
        <span>{{caseCauseName}}</span>
      </p>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        class="table_style"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection"></el-table-column>
        <!-- <el-table-column prop="drawerName" label="类型"></el-table-column> -->
        <el-table-column prop="illageClause" :label="illageClauseLabel">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" placement="top-start">
              <div slot="content" style="max-width:200px">{{scope.row.bnsLawNoteCog}}</div>
              <span>{{scope.row.illageClause}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="punishClause" :label="punishClauseLabel">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" placement="top-start">
              <div slot="content" style="max-width:200px">{{scope.row.bnsLawNotePun}}</div>
              <span>{{scope.row.punishClause}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="backInfor()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      tableData: [],
      // caseCauseId: "",
      caseCauseName: "",
      selectData: [],
      punishTitle: "",
      illageClauseLabel: "违法条款",
      punishClauseLabel: "处罚依据",
    };
  },
  inject: ["reload"],
  methods: {
    showModal(data) {
      this.visible = true;
      // this.caseCauseId = data.caseCauseId;
      this.caseCauseName = data.caseCauseName;
      this.punishTitle = data.titleType;
      this.illageClauseLabel = data.illageClauseLabel;
      this.punishClauseLabel = data.punishClauseLabel;

      this.findLawRegulationsByCauseId(data.punishList);
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    //获取违法条款及处罚条款
    findLawRegulationsByCauseId(arr) {
      let data = arr;
      if (data && data.length > 0) {
        data.forEach((item) => {
          let xiang1 = item.iitemCog ? "第" + item.iitemCog + "项" : "";
          let xiang2 = item.iitemPun ? "第" + item.iitemPun + "项" : "";
          // let clause = {
          //   // drawerName: item.drawerName,
          //   illageClause:
          //     "《" + item.bnslawNameCog + "》第" + item.itemCog + "条" + xiang1,
          //   punishClause:
          //     "《" + item.bnslawNamePun + "》第" + item.itemPun + "条" + xiang2,
          //   // bnsLawNoteCog: item.bnsLawNoteCog,
          //   // bnsLawNotePun: item.bnsLawNoteCog,
          // };
          // item.bnsLawNotePun = item.bnsLawNoteCog;
          item.illageClause =
            "《" + item.bnslawNameCog + "》第" + item.itemCog + "条" + xiang1;
          item.punishClause =
            "《" + item.bnslawNamePun + "》第" + item.itemPun + "条" + xiang2;
        });
        this.tableData = data;
      }
    },
    handleSelectionChange(val) {
      this.selectData = val;
    },
    backInfor() {
      this.visible = false;
      this.$emit("setIllegalLawAndPunishLaw", this.selectData);
    },
  },
  mounted() {},
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/index.scss">
/* @import "@/assets/css/caseHandle/index.scss"; */
</style>
<style scoped>
.table_style {
  width: 100%;
  height: 400px;
  overflow: auto;
}
</style>
