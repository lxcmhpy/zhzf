<template>
  <div class="fullBox departBox">
    <div class="departOrUserTree">
      <p>机构列表</p>
      <div class="searchDepartBox">
        <el-input placeholder="输入机构名" v-model="filterText">
          <el-button slot="append" size="mini" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <el-tree
        class="filter-tree"
        :data="organData"
        :props="defaultProps"
        node-key="id"
        :filter-node-method="filterNode"
        :default-expanded-keys="defaultExpandedKeys"
        @node-expand="nodeExpand"
        ref="tree"
        @node-click="handleNodeClick"
      >
        <span class="custom-tree-node" slot-scope="{ node,data }">
          <span>
            <i :class="data.children ? 'iconfont law-icon_shou_bag' : ''"></i>
            {{ node.label }}
          </span>
        </span>
      </el-tree>
    </div>
    <div class="departTable">
      <p>{{selectCurrentTreeName}}</p>
      <div class="handelBtn">
        <div>子机构</div>
        <div>
          <el-dropdown split-button type="primary" size="medium" @click="addOrgan">
            <i class="iconfont law-icon_weihu"></i>新增机构
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>批量添加</el-dropdown-item>
              <el-dropdown-item>批量导入</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div class="handelBtnDel">
            <el-button size="medium" type="info" icon="iconfont law-icon_weihu">维护机构</el-button>
            <el-button size="medium" icon="iconfont law-icon_del">删除机构</el-button>
          </div>
        </div>
      </div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="code" label="机构编码" align="center"></el-table-column>
        <el-table-column prop="name" label="机构名称" align="center"></el-table-column>
        <el-table-column prop="jb" label="机构级别" align="center"></el-table-column>
        <el-table-column prop="type" label="机构类型" align="center"></el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <span slot-scope="scope">
            <span>{{scope.row.status == 0 ? '正常': '注销'}}</span>
          </span>
        </el-table-column>
      </el-table>
      <div class="paginationBox">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          background
          :page-sizes="[10, 20, 30, 40]"
          layout="prev, pager, next,sizes,jumper"
          :total="totalPage"
        ></el-pagination>
      </div>
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
      selectCurrentTreeName: "一级机构",
      organData: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      tableData: [], //表格数据
      departLevel: 0, //级别
      defaultExpandedKeys: [], //默认展开的key 
      currentPage:1,  //当前页
      pageSize:10,   //pagesize
      totalPage:0, //总页数
      currentOrganId:'',  //当前organ的id
    };
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    //给table添加数据 判断是否有子节点 循环放入数组中
    // setDepartTable(data) {
    //   data.forEach(item => {
    //     this.tableData.push({
    //       code: item.code,
    //       name: item.name,
    //       jb: this.$util.transformNumberToJi(item.jb),
    //       status: item.status
    //     });
    //     if (item.children && item.children.length) {
    //       this.departLevel++;
    //       this.setDepartTable(item.children);
    //     }
    //   });
    // },
    //点击树事件
    handleNodeClick(data) {
      console.log(data);
      this.selectCurrentTreeName = data.label;
      this.tableData = [];
      this.currentOrganId = data.id
      this.getSelectOrgan(this.currentOrganId);
    },
    nodeExpand(data, node, jq) {
      console.log(data);
      console.log(node);
      console.log(jq);
    },

    //获取机构
    getAllOrgan() {
      this.$store.dispatch("getAllOrgan").then(
        res => {
          console.log("机构", res);

          this.defaultExpandedKeys.push(res.data[0].id);
          if (res.data[0].children && res.data[0].children.length > 0) {
            res.data[0].children.forEach(item => {
              this.defaultExpandedKeys.push(item.id);
            });
          }
          this.organData = res.data;
          console.log(this.defaultExpandedKeys);
          console.log(this.organData);
          this.currentOrganId = res.data[0].id;
          this.getSelectOrgan(this.currentOrganId);
        },
        err => {
          console.log(err);
        }
      );
    },
    //获取选中的机构下的机构
    getSelectOrgan(id) {
      console.log("organId", id);
      let data = { 
        id: id,
        page: this.currentPage,
        size: this.pageSize 
      };
      console.log(data);
      this.$store.dispatch("getSelectOrgan", data).then(
        res => {
          console.log("选中的机构", res);
          this.tableData = res.data.records;
          this.totalPage = res.data.pages;
        },
        err => {
          console.log(err);
        }
      );
    },
    //更改每页显示的条数
    handleSizeChange(val){
      console.log('每页显示的条数',val);
       this.pageSize = val;
    },
    //更换页码
    handleCurrentChange(val){
      console.log('当前页',val);
      this.currentPage = val;
      this.getSelectOrgan(this.currentOrganId);
    },
    //新增机构
    addOrgan(){

    }
  },
  mounted() {
    // this.setDepartTable(this.data)
  },
  created() {
    this.getAllOrgan();
  }
};
</script>

<style lang="less">
@import "../../../css/systemManage.less";
</style>