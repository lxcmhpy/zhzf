<template>
  <el-select
    :value="valueTitle"
    :disabled="disabled"
    :filterable="filterable"
    :clearable="clearable"
    :filter-method="filterMethod"
    @clear="clearHandle"
    @blur="selectBlur"
  >
    <el-option :value="valueTitle" :label="valueTitle">
      <el-tree
        id="tree-option"
        ref="selectTree"
        :accordion="accordion"
        :data="options"
        :props="props"
        :node-key="props.value"
        :default-expanded-keys="defaultExpandedKey"
        :filter-node-method="filterNode"
        @node-click="handleNodeClick"
      ></el-tree>
    </el-option>
  </el-select>
</template>
<script>
export default {
  name: "el-tree-select",
  props: {
    /* 配置项 */
    props: {
      type: Object,
      default: () => {
        return {
          value: "id", // ID字段名
          label: "title", // 显示名称
          children: "children", // 子级字段名
        };
      },
    },
    /* 选项列表数据(树形结构的对象数组) */
    options: {
      type: Array,
      default: () => {
        return [];
      },
    },
    /* 初始值 */
    value: {
      type: String,
      default: () => {
        return null;
      },
    },
    /* 可清空选项 */
    clearable: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    disabled: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    /* 自动收起 */
    accordion: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    /* 是否开启搜索 */
    filterable: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  data() {
    return {
      valueId: this.value, // 初始值
      valueTitle: "",
      defaultExpandedKey: [],
    };
  },
  mounted() {
    this.initHandle();
  },
  methods: {
    // 初始化值
    initHandle() {
      if (this.valueId) {
        this.valueTitle =
          this.$refs.selectTree.getNode(this.valueId) == null
            ? ""
            : this.$refs.selectTree.getNode(this.valueId).data[
                this.props.label
              ]; // 初始化显示
        this.$refs.selectTree.setCurrentKey(this.valueId); // 设置默认选中
        this.defaultExpandedKey = [this.valueId]; // 设置默认展开
      } else {
        this.valueTitle = "";
      }
      this.$nextTick(() => {
        let scrollWrap = document.querySelectorAll(
          ".el-scrollbar .el-select-dropdown__wrap"
        )[0];
        let scrollBar = document.querySelectorAll(
          ".el-scrollbar .el-scrollbar__bar"
        );
        if (scrollWrap) {
          scrollWrap.style.cssText =
            "margin: 0px; max-height: none; overflow: hidden;";
          scrollBar.forEach((ele) => (ele.style.width = 0));
        }
      });
    },
    // 切换选项
    handleNodeClick(node) {
      this.valueTitle = node[this.props.label];
      this.valueId = node[this.props.value];
      this.$emit("getValue", this.valueId);
      this.$emit("getName", this.valueTitle);
      this.defaultExpandedKey = [];
    },
    // 失去焦点触发搜索
    selectBlur(){
      this.$refs.selectTree.filter('');
    },
    // 清除选中
    clearHandle() {
      this.valueTitle = "";
      // this.valueId = this.value;
      this.valueId = '';
      this.defaultExpandedKey = [];
      this.clearSelected();
      this.$emit("getValue", null);
      this.$emit("getName", null);
      this.initHandle();
    },
    // 可搜索下，输入值发生变化时
    filterMethod(val) {
      this.$refs.selectTree.filter(val);
    },
    // 过滤树节点
    filterNode(value, data) {
      if (!value) return true;
      return data[this.props.label].indexOf(value) !== -1;
    },
    /* 清空选中样式 */
    clearSelected() {
      let allNode = document.querySelectorAll("#tree-option .el-tree-node");
      allNode.forEach((element) => element.classList.remove("is-current"));
    },
  },
  watch: {
    value(val) {
      this.valueId = this.value;
      this.initHandle();
    },
  },
};
</script>

<style scoped>
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: auto;
  max-height: 274px;
  padding: 0;
  overflow: hidden;
  overflow-y: auto;
}
.el-select-dropdown__item.selected {
  font-weight: normal;
}
ul li >>> .el-tree .el-tree-node__content {
  height: auto;
  padding: 0 20px;
}
.el-tree-node__label {
  font-weight: normal;
}
.el-tree >>> .is-current .el-tree-node__label {
  color: #409eff;
  font-weight: 700;
}
.el-tree >>> .is-current .el-tree-node__children .el-tree-node__label {
  color: #606266;
  font-weight: normal;
}
</style>
