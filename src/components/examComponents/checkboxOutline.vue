<template>
  <div class="checkbox-outline" v-loading="treeLoading" element-loading-spinner="car-loading">
    <p class="box-title">选择大纲</p>
    <div>
      <el-input placeholder="输入大纲名称" v-model="filterText">
        <el-button slot="append" size="mini" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div class="treeBox">
      <div
        class="tree-select"
        v-for="(tree, index) in treeData"
        :key="tree.outlineId"
      >
        <div class="top-node">
          <el-row class="node-row">
            <el-col :span="18">
              <span class="node-title">
                {{ tree[treeProps.label] ? tree[treeProps.label].substr(0, 1) : '' }}
              </span>
              <span class="node-text">{{ tree[treeProps.label] }}</span>
            </el-col>
            <el-col :span="4">
              <el-checkbox v-model="checkAllNode[index].checked" @change="handleCheckAllChange($event, tree, index)">全选</el-checkbox>
            </el-col>
            <el-col :span="2">
              <i
                class="show-icon el-icon-arrow-down"
                :class="{'expend': checkAllNode[index].expend}"
                @click="checkAllNode[index].expend = !checkAllNode[index].expend"></i>
            </el-col>
          </el-row>
        </div>
        <el-tree
          v-show="checkAllNode[index].expend"
          ref="outlineTree"
          class="filter-tree"
          :data="tree.children"
          :props="treeProps"
          :filter-node-method="filterNode"
          node-key="outlineId"
          show-checkbox
          @check="handleCheck"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span :class="data.children && data.children.length ? 'hasChild' : ''">{{ node.label }}</span>
          </span>
        </el-tree>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      filterText: "",
      treeData: [],
      checkAll: true,
      treeProps: { children: 'children', label: 'outlineName' },
      topLevelOutline: {},
      checkAllNode: [],
      checkedNode: {},
      treeLoading: false
    };
  },
  created() {
    this.getAllOutline();
  },
  watch: {
    filterText(val) {
      const outlineTree = this.$refs.outlineTree;
      if(outlineTree && outlineTree.length){
        outlineTree.forEach(tree => { tree.filter(val) })
      }
    }
  },
  methods: {
    //获取大纲
    getAllOutline() {
      this.treeLoading = true;
      this.$store.dispatch("examOutlineTreeAllInfo").then(
        res => {
          this.treeData = res.data;
          this.getAllNodeId();
          this.treeLoading = false;
        },
        err => {
          this.treeLoading = false;
          console.log(err);
        }
      );
    },
    // 将所有树节点outlineId缓存,顶级节点全选使用
    getAllNodeId(){
      if(this.treeData && this.treeData.length){
        this.treeData.forEach(node => {
          this.topLevelOutline[node.parentId] = this.setParentId(node.children, []);
          // 设置顶级节点选中状态
          this.checkAllNode.push({ checked: false, expend: true });
          // 存储选中节点
          this.checkedNode[node.parentId] = '';
        });
      }
    },
    // 递归将顶级节点outlineId绑定给子节点
    setParentId(child, wrap){
      if(child && child.length){
        child.forEach(node => {
          this.setParentId(node.children, wrap);
          wrap.push(node.outlineId)
        })
      }
      return wrap;
    },
    // 过滤树节点
    filterNode(value, data) {
      if (!value) return true;
      return data[this.treeProps.label].indexOf(value) !== -1;
    },
    // 全选
    handleCheckAllChange(event, node, index){
      this.checkedNode[node.parentId] = '';
      if(event){
        this.$refs.outlineTree[index].setCheckedKeys(this.topLevelOutline[node.parentId])
        this.checkedNode[node.parentId] = this.topLevelOutline[node.parentId].join(',');
      }else{
        this.$refs.outlineTree[index].setCheckedKeys([])
      }
    },
    // 树节点选中状态切换
    handleCheck(node, checked){
      for(const key in this.topLevelOutline){
        const i = this.treeData.findIndex(item => item.parentId === key);
        if(this.topLevelOutline[key].indexOf(node.outlineId) > -1){
          this.checkAllNode[i].checked = false;
          this.checkedNode[key] = checked.checkedKeys.join(',');
          if(checked.checkedKeys.length === this.topLevelOutline[key].length){
            this.checkAllNode[i].checked = true;
          }
        }
      }
    },
    // 清空选中数据
    resetChecked(){
      this.checkAllNode.push({ checked: false, expend: true });
      let i = 0;
      for(const key in this.checkedNode){
        this.checkedNode[key] = '';
        if(this.checkAllNode[i]){
          this.checkAllNode[i].checked = false;
          this.checkAllNode[i].expend = true;
        }
        this.$refs.outlineTree[i].setCheckedKeys([])
        i++
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.checkbox-outline{
  min-height: 260px;
  .box-title{
    font-size: 16px;
    font-weight:600;
    color:rgba(159,163,175,1);
    margin-bottom: 20px;
  }
  .tree-select{
    margin: 20px 0;
    .top-node{
      display: flex;
      align-items: center;
      .node-row{
        width: 100%;
        display: flex;
        align-items: center;
      }
      .node-text{
        font-size:18px;
        font-weight:560;
        color:rgba(32,35,43,1);
      }
      .show-icon{
        font-size: 18px;
        vertical-align: middle;
        cursor: pointer;
        &.expend{
          transform: rotate(180deg);
        }
      }
      >>>.el-checkbox{
        color: #20232B;
      }
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
    .filter-tree{
      padding-left: 30px;
      margin: 20px 0;
      .custom-tree-node{
        .hasChild{
          font-size: 15px;
          font-weight: 600;
          color: #20232B;
        }
      }
      >>>.el-tree-node__content{
        height: 32px;
        .el-tree-node__expand-icon{
          font-size: 16px;
          padding: 0 8px;
        }
      }
    }
  }
}
</style>
