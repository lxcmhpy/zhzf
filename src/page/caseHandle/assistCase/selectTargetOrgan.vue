<!-- 新增装备 -->
<template>
  <el-dialog
    class="fullscreen"
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="32%"
    append-to-body
  >
    <el-card class="box-card" shadow="never">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>

      <el-tree
        ref="organTreeRef"
        class="filter-tree"
        :data="treeData"
        :props="defaultProps"
        node-key="id"
        default-expand-all
        show-checkbox
        :check-strictly="true"
        :filter-node-method="filterNode"
        @check-change="handleCheckChange"
      ></el-tree>
    </el-card>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    dialogTitle: {
      type: String,
      default: "选择机构",
    },
    currentCheckedNode: {
      type: String,
      default: "",
    },
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  data() {
    return {
      visible: false,
      filterText: "",
      defaultProps: {
        children: "children",
        label: "label",
      },
      treeData: [],
      selectData: {},
    };
  },
  created() {
    this.getOrganData();
  },
  methods: {
    // 打开弹窗
    showModal() {
      this.visible = true;
    },
    // 获取当前用户下所有机构
    getOrganData() {
      this.$store.dispatch("findOrganTreeByCurrUser").then(
        (res) => {
          this.treeData = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    // 过滤树节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 选中节点
    handleCheckChange(data, checked) {
      if (checked) {
        this.$refs.organTreeRef.setCheckedKeys([]);
        this.selectData = data;
        this.$refs.organTreeRef.setCheckedKeys([data.id]);
      }
    },
    //提交
    submit() {
      if (JSON.stringify(this.selectData) === "{}") {
        this.$message({ type: "info", message: "请选择一个目标机构" });
      } else {
        this.$emit("setTargetorgan", this.selectData);
      }
      this.visible = false;
    },
    // 关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.add-device-from {
  >>> .el-select,
  >>> .el-date-editor {
    display: block;
  }
  >>> .el-date-editor.el-input,
  >>> .el-date-editor.el-input__inner {
    width: 100%;
  }
}
</style>
