<template>
<div class="com_searchAndpageBoxPadding">
  <div class="fullBox departBox">
    <div class="departOrUserTree">
      <!-- <div class="treeBoxTitle"> -->
        <p>机构列表</p>
        <div class="searchDepartBox">
          <el-input placeholder="输入机构名" v-model="filterText">
            <el-button slot="append" size="mini" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      <!-- </div> -->

      <div class="treeBox deep-color max-height-conflict">
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
              <i
                :class="data.children && data.children.length>0 ? 'iconfont law-icon_shou_bag' : ''"
              ></i>
              <span :class="data.children ? '' : 'hasMarginLeft'">{{ node.label }}</span>
            </span>
          </span>
        </el-tree>
      </div>
    </div>
    <div class="departTable">
      <div class="departTable-title">
        {{selectCurrentTreeName}}
        <!-- <span class="editSelectNode" @click="editSelectNode">
          <i class="iconfont law-btn_bianji"></i>
        </span> -->
        <div class="departTable-title-update">
          <el-button size="mini" type="primary" @click="handleUpdata">编辑</el-button>
        </div>
      </div>
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
      <!-- <div class="tableBox"> -->

      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        @row-click="showOrganDetail"
        height="70%"
      >
        <el-table-column prop="code" label="机构编码" align="center"></el-table-column>
        <el-table-column prop="name" label="机构名称" align="center"></el-table-column>
        <el-table-column prop="type" label="机构类型" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click.stop @click="updateOrgan(scope.row.id)" type="text">修改</el-button>
            <el-button type="text" @click.stop @click="deleteOrgan(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- </div> -->
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

    <addOrgan ref="addOrganRef" @getAllOrgan2="getAllOrgan('root')"></addOrgan>
    <updateOrgan ref="updateOrganRef" @getAllOrgan2="getAllOrgan('root')"></updateOrgan>
  </div>
</div>
</template>
<script>
import addOrgan from "./addOrgan";
import updateOrgan from "./updateOrgan";
export default {
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  provide() {
    return {
      page: this
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
      theClickId: "", // 当前被点击树的id
      nodeData: {
        id: '',
        text: 'parent',
        data: {}
      }, // 当前被点击节点对应的 Node
    };
  },
  components: {
    addOrgan, updateOrgan
  },
  inject: ["reload"],
  methods: {
    /**
     * 点击编辑按钮
     */
    handleUpdata() {
      let parentNode = {}
      // 如果没有点击任何节点，默认修改根节点
      if(this.nodeData.text === 'parent') {
        let data = {
          id: this.nodeData.id,
          parentNode: {
            parentNodeId: "null",
            parentNodeName: "null"
          }
        };
        this.$refs.updateOrganRef.showModal(2, data);
      }
      // 判断当前是否根节点，是则parentNode属性为null
      if(this.nodeData.parent.parent) {
        parentNode = {
          parentNodeId: this.nodeData.parent.data.id,
          parentNodeName: this.nodeData.parent.data.label
        }
      } else {
        parentNode = {
          parentNodeId: "null",
          parentNodeName: "null"
        }
      }
      let data = {
        id: this.theClickId,
        parentNode: parentNode
      };
      this.$refs.updateOrganRef.showModal(2, data);
    },

    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    //点击树事件
    handleNodeClick(data,node,item) {
      this.nodeData = node
      console.log(this.nodeData)
      this.theClickId = data.id
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
    getAllOrgan(organId) {
      let _this = this
      this.$store.dispatch("getAllOrgan").then(
        res => {
          this.nodeData.id = res.data[0].id
          this.nodeData.data = res.data[0]
          _this.defaultExpandedKeys.push(res.data[0].id);
          _this.selectCurrentTreeName = _this.selectCurrentTreeName
            ? _this.selectCurrentTreeName
            : res.data[0].label;
          if (res.data[0].children && res.data[0].children.length > 0) {
            res.data[0].children.forEach(item => {
              _this.defaultExpandedKeys.push(item.id);
            });
          }
          _this.organData = res.data;
          this.allTreeData = res.data
          if (organId == "root") {
            _this.currentOrganId = res.data[0].id;
          } else {
            _this.currentOrganId = organId;
          }
          _this.getSelectOrgan();
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
      let _this = this
      this.$store.dispatch("getSelectOrgan", data).then(
        res => {
          console.log(res);
          _this.tableData = res.data.records;
          _this.totalPage = res.data.total;
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
      let parentNode = {
        parentNodeId: this.currentOrganId,
        parentNodeName: this.selectCurrentTreeName
      };
      this.$refs.addOrganRef.showModal(0, parentNode);
    },
    //机构详情
    showOrganDetail(row, column, event) {
      this.$refs.updateOrganRef.showModal(1, row.id);
    },
    //修改机构
    updateOrgan(id) {
      let data = {
        id: id,
        parentNode: {
          parentNodeId: this.currentOrganId,
          parentNodeName: this.selectCurrentTreeName
        }
      };
      this.$refs.updateOrganRef.showModal(2, data);
    },
    //修改根节点机构
    editSelectNode(nodeData) {
      let data = {
        id: nodeData.id,
        parentNode: {
          parentNodeId: this.currentOrganId,
          parentNodeName: this.selectCurrentTreeName
        }
      };
      console.log(data)
      this.$refs.addOrganRef.showModal(2, data);
    },
    //删除机构
    deleteOrgan(id) {
        let _this = this
      this.$confirm("删除机构将清空机构下所有用户,确认删除该机构吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _this.$store.dispatch("deleteOrgan", id).then(
            res => {
              _this.getAllOrgan(this.currentOrganId);
              _this.$message({
                type: "success",
                message: "删除成功!"
              });
            },
            err => {
              console.log(err);
            }
          );
        })
        .catch(() => {});
    }
  },
  mounted() {
    // this.setDepartTable(this.data)
  },
  created() {
    this.getAllOrgan("root");
  }
};
</script>

<style lang="scss" src="@/assets/css/systemManage.scss">
/* @import "@/assets/css/systemManage.scss"; */
</style>
