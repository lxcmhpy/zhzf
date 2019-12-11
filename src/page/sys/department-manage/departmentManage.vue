<template>
  <div class="fullBox departBox">
    <div class="departOrUserTree">
      <p>机构列表</p>
      <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
      <el-tree
        class="filter-tree"
        :data="organData"
        :props="defaultProps"
        :filter-node-method="filterNode"
        ref="tree"
        @node-click="handleNodeClick"
      >
        <span class="custom-tree-node" slot-scope="{ node,data }">
            <span>
             
                <i :class="data.children ? 'iconfont law-icon_zhan_bag' : ''"></i>{{ node.label }}
            </span>  
        </span>
      </el-tree>
    </div>
    <div class="departTable">
      <p>{{selectCurrentTreeName}}</p>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="code" label="机构编码" width="180"></el-table-column>
        <el-table-column prop="name" label="机构名称" width="180"></el-table-column>
        <el-table-column prop="pid" label="机构级别"></el-table-column>
        <el-table-column prop="type" label="机构类型"></el-table-column>
        <el-table-column prop="state" label="状态"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  data() {
    return {
      filterText: "",
      selectCurrentTreeName:'一级机构',
      organData:[],
      defaultProps: {
        children: "children",
        label: "label"
      },
      tableData: [],   //表格数据
      departLevel:0,   //级别
      defaultExpandedKeys:[], //默认展开的key
    };
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    //给table添加数据 判断是否有子节点 循环放入数组中
    setDepartTable(data){
        data.forEach(item=>{
            this.tableData.push({name:item.label,pid:item.pid});
            if(item.children && item.children.length){
              this.departLevel++;
              this.setDepartTable(item.children);
            }
        })
    },
    //点击树事件
    handleNodeClick(data){
      console.log(data);
      this.selectCurrentTreeName = data.label;
      this.tableData = [];
      if(data.children && data.children.length){
        this.setDepartTable(data.children)
      }
      
    },
    //获取机构
    getAllOrgan(){
       this.$store.dispatch("getAllOrgan").then(
         res=>{
          console.log('机构',res);
          this.organData = res.data;
          this.setDepartTable(this.organData)
         },
         err=>{
           console.log(err)
         }
       )
    },
  },
  mounted () {
   // this.setDepartTable(this.data)
  },
  created(){
    this.getAllOrgan();
  }
};
</script>

<style lang="less">
@import "../../../css/page.less";
</style>