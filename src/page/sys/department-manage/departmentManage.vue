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
            <i :class="data.children && data.children.length>0 ? 'iconfont law-icon_shou_bag' : ''"></i>
            <span :class="data.children ? '' : 'hasMarginLeft'">{{ node.label }}</span>
          </span>
        </span>
      </el-tree>
    </div>
    <div class="departTable">
      <p>{{selectCurrentTreeName}}</p>
      <div class="handelBtn">
        <div>子机构列表</div>
        <div>
          <el-dropdown split-button type="primary" size="medium" @click="addOrgan">
            <i class="iconfont law-icon_weihu"></i>新增机构
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>批量添加</el-dropdown-item>
              <el-dropdown-item>批量导入</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
      >
        <el-table-column prop="code" label="机构编码" align="center"></el-table-column>
        <el-table-column prop="name" label="机构名称" align="center"></el-table-column>
        <el-table-column prop="type" label="机构类型" align="center"></el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <span slot-scope="scope">
            <span>{{scope.row.status == 0 ? '正常': '注销'}}</span>
          </span>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text">维护</el-button>
            <el-button type="text" >删除</el-button>
          </template>
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

    <addOrgan ref="addOrganRef"></addOrgan>
  </div>

</template>
<script>
import addOrgan from "./addOrgan";     
export default {
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  data() {
    return {
      filterText: "",
      selectCurrentTreeName: "",
      organData: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      tableData: [], //表格数据
      departLevel: 0, //级别
      defaultExpandedKeys: [], //默认展开的key
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      currentOrganId: "", //当前organ的id
      showAddDialog: false,
    };
  },
  components: {
    addOrgan
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
      this.currentOrganId = data.id;
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
          this.defaultExpandedKeys.push(res.data[0].id);
          this.selectCurrentTreeName = res.data[0].label;
          if (res.data[0].children && res.data[0].children.length > 0) {
            res.data[0].children.forEach(item => {
              this.defaultExpandedKeys.push(item.id);
            });
          }
          this.organData = res.data;
          console.log(this.defaultExpandedKeys);
          console.log(this.organData);
          this.currentOrganId = res.data[0].id;
          this.getSelectOrgan();
        },
        err => {
          console.log(err);
        }
      );
    },
    //获取选中的机构下的机构
    getSelectOrgan() {
      let data = {
        id: this.currentOrganId,
        current: this.currentPage,
        size: this.pageSize
      };
      console.log(data);
      this.$store.dispatch("getSelectOrgan", data).then(
        res => {
          this.tableData = res.data.records;
          this.totalPage = res.data.pages;
        },
        err => {
          console.log(err);
        }
      );
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getSelectOrgan();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getSelectOrgan();
    },
    //新增机构
    addOrgan() {
      this.$refs.addOrganRef.showModal()
    },
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