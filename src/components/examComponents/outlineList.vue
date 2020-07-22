<template>
  <div>
    <div class="searchDepartBox">
      <el-input placeholder="输入大纲名称" v-model="filterText">
        <el-button slot="append" size="mini" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <el-tree
      ref="outlineTree"
      :data="treeData"
      :node-key="nodeKey"
      :props="treeProps"
      :default-expanded-keys="defaultExpandedKeys"
      :default-checked-keys="defaultCheckedKeys"
      :filter-node-method="filterNode"
      :current-node-key="selectId"
      :check-strictly='true'
      @node-click="clickNode"
      class="outline-tree exam-page-tree">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span class="tree-label">
          <span v-if="node.level === 1" class="node-title">
            {{ data[treeProps.label] ? data[treeProps.label].substr(0, 1) : '' }}
          </span>
        </span>
        <span class="tree-text" :class="`level-${node.level}`">
          {{ data[treeProps.label] ? data[treeProps.label] : '' }}
        </span>
      </span>
    </el-tree>
  </div>
</template>
<script>

export default {
  props: {
    treeData: {
      type: Array,
      default: () => [],
      required: true
    },
    treeProps: {
      type: Object,
      default: () => { return { children: '', label: '' } },
      required: true
    },
    nodeKey: {
      type: String,
      default: 'id'
    },
    defaultExpandedKeys: {
      type: Array,
      default: () => []
    }
  },
  data(){
    return {
      selectId: '',
      filterText: '',
      defaultCheckedKeys: []
    }
  },
  created(){
    if(this.treeData && this.treeData.length){
      this.treeData.forEach(node => {
        node.topLevel = node.parentId;
        this.setNodeTopLevel(node.children, node.parentId);
      })
    }
  },
  watch: {
    filterText(val) {
      this.$refs.outlineTree.filter(val);
    }
  },
  methods:{
    // 递归处理绑定顶级节点
    setNodeTopLevel(tree, top){
      if(tree && tree.length){
        tree.forEach(item => {
          item.topLevel = top;
          if(item.children && item.children.length){
            this.setNodeTopLevel(item.children, top);
          }
        });
      }
    },
    // 过滤树节点
     filterNode(value, data) {
      if (!value) return true;
      return data[this.treeProps.label].indexOf(value) !== -1;
    },
    clickNode(data) {
      if(data[this.nodeKey] !== this.selectId){
        this.selectId = data[this.nodeKey];
        this.$emit('clickTreeNode', data);
        this.$refs.outlineTree.setCheckedKeys([]);
        this.$refs.outlineTree.setCheckedKeys([ this.selectId ]);
      }
    },
    // 选中节点
    checkedNode(nodeId){
      this.selectId = nodeId;
      this.$refs.outlineTree.setCheckedKeys([]);
      this.$refs.outlineTree.setCheckedKeys([ nodeId ]);
    }
  }
}
</script>
<style lang="scss" scoped>
.searchDepartBox{
  height: 52px;
}
.outline-tree{
  &.el-tree{
    background: transparent;
  }
  .node-title{
    display: inline-block;
    width:32px;
    height:32px;
    text-align: center;
    line-height: 32px;
    border-radius: 50%;
    margin: 0 8px 0 10px;
    background:rgba(69,115,208,1);
    color: #fff;
    font-size:16px;
  }
  .tree-text{
    font-family: PingFangSC-Medium,PingFang SC;
    color:rgba(123,123,123,1);
    &.level-1{
      font-size: 16px;
      font-weight: 550;
      color:rgba(32,35,43,1);
    }
    &.level-2{
      font-size: 15px;
      font-weight: 550;
      color:rgba(32,35,43,1);
    }
    &.level-3{
      font-size: 14px;
    }
  }
  &.exam-page-tree.el-tree{
    >>>.el-tree-node__content {
      line-height: 40px;
      height: 40px;
      flex-direction: row-reverse;
      justify-content: space-between;
      position: relative;
      padding: 0 20px;
      .custom-tree-node{
        display: flex;
        align-items: center;
      }
      .el-tree-node__expand-icon{
        font-size: 18px;
        color: #20232B;
        &.is-leaf {
          color: transparent;
          cursor: default;
        }
      }
    }
    >>>.el-tree-node__children{
      &:first-child{
        padding-left: 32px;
      }
    }
  }
}
</style>
<style lang="scss">
.outline-tree.exam-page-tree{
  >.el-tree-node>.el-tree-node__children{
    padding-left: 32px;
  }
  .el-icon-caret-right:before {
    content: "\E6DF";
  }
  .el-tree-node__expand-icon.expanded {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }
  .el-tree-node.is-checked
  {
    >.el-tree-node__content{
      .tree-text{
        font-weight: 600;
        color: rgba(69,115,208,1);
      }
    }
  }
}
</style>
