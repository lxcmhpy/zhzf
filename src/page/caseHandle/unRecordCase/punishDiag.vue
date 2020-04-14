<template>
  <el-dialog title="选择违法条款及处罚依据" :visible.sync="visible" @close="closeDialog" :close-on-click-modal="false" width="40%" append-to-body>
    <div>
      <p>违法行为:<span>{{caseCauseName}}</span></p>
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" class="table_style" @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="drawerName" label="类型"></el-table-column>
        <el-table-column prop="illageClause" label="违法条款"></el-table-column>
        <el-table-column prop="punishClause" label="处罚依据"></el-table-column>
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
      caseCauseId: "",
      caseCauseName: "",
      selectData: [],
    };
  },
  inject: ["reload"],
  methods: {
    showModal(data) {
      this.visible = true;
      this.caseCauseId = data.caseCauseId;
      this.caseCauseName = data.caseCauseName;
      this.findLawRegulationsByCauseId();
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    //获取违法条款及处罚条款
    findLawRegulationsByCauseId() {
      this.tableData = [];
      let _this = this
      this.$store.dispatch("findLawRegulationsByCauseId", this.caseCauseId).then(
        res => {
          debugger
//          console.log(res);
          let data = res.data;
          if(data && data.length>0){
            data.forEach(item => {
              let xiang1 = item.iitemCog ? "第" + item.iitemCog + "项" : "";
              let xiang2 = item.iitemPun ? "第" + item.iitemPun + "项" : "";

              let clause = {
                drawerName: item.drawerName,
                illageClause: "《" + item.bnslawNameCog + "》第" + item.itemCog + "条" + xiang1,
                punishClause: "《" + item.bnslawNamePun + "》第" + item.itemPun + "条" + xiang2
              }
              _this.tableData.push(clause);

            })
          }
          
        },
        err => {
          console.log(err);
        }
      );
    },
    handleSelectionChange(val) {
//      console.log(val);
      this.selectData = val;
    },
    backInfor() {
      this.visible = false;
      this.$emit('setIllegalLawAndPunishLaw', this.selectData);
    }
  },
  mounted() { }
};
</script>
<style lang="scss">
@import "@/assets/css/caseHandle/index.scss";
</style>
<style scoped>
.table_style {
  width: 100%;
  height: 400px;
  overflow: auto;
}
</style>
