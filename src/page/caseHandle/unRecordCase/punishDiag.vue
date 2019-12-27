<template>
  <el-dialog
    title="选泽违法条款及处罚依据"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="40%"
    append-to-body
  >
    <div>
      <p>违法行为:213213982493273953753573</p>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column prop="name2" label="违法条款" show-overflow-tooltip></el-table-column>
        <el-table-column prop="name" label="处罚依据" show-overflow-tooltip></el-table-column>
      </el-table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="addUserToForm()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      tableData: [
        {
          type: 1,
          name: "asasadjksadsdsdjsbsdbfsdbfds",
          name2: "qksadnsadjkwwndsadnsadnsa"
        },
        {
          type: 1,
          name: "asasadjksadsdsdjsbsdbfsdbfds",
          name2: "qksadnsadjkwwndsadnsadnsa"
        }
      ]
    };
  },
  inject: ["reload"],
  methods: {
    showModal() {
      this.visible = true;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    handleSelectionChange(){
        
    }
  },
  mounted() {}
};
</script>
<style lang="less">
@import "../../../css/caseHandle/index.less";
</style>
