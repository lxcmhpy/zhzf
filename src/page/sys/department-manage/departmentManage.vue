<template>
<div class="com_searchAndpageBoxPadding">
  <div class="fullBox departBox">
    <div class="departOrUserTree">
      <p>机构列表</p>
      <div class="searchDepartBox">
        <el-input placeholder="输入机构名" v-model="filterText">
          <el-button slot="append" size="mini" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div class="treeBox">
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
      <p>{{selectCurrentTreeName}}</p>
      <div class="handelBtn">
        <div>部门列表</div>
        <div>
          <el-dropdown split-button type="primary" size="medium" @click="addDepartment">
            <i class="iconfont law-icon_weihu"></i>新增部门
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
        height="70%"
      >
        <!-- <el-table-column prop="code" label="部门编码" align="center"></el-table-column> -->
        <el-table-column prop="name" label="部门名称" align="center"></el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <span slot-scope="scope">
            <span>{{scope.row.status == 0 ? '正常': '注销'}}</span>
          </span>
        </el-table-column>
        <!-- <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column> -->
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button  @click="editDepartment(scope.row)" type="text">修改</el-button>
            <el-button type="text"  @click="deleteDepartment(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- </div> -->
      <div class="paginationBox" v-if="tableData.length > 0">
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

    <addDepartment ref="addDepartmentRef" @getAllOrgan2="getAllOrgan"></addDepartment>
  </div>
</div>
</template>
<script>
import addDepartment from "./addDepartment";
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
      departmentLength:0, //部门个数
    };
  },
  components: {
     addDepartment
  },
  inject: ["reload"],
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
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
    getAllOrgan(organId) {
      let _this = this
      this.$store.dispatch("getAllOrgan").then(
        res => {
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
          console.log(_this.defaultExpandedKeys);
          console.log(_this.organData);
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
    //获取选中的机构下的部门
    getSelectOrgan() {
      let data = {
        oid: this.currentOrganId,
        current: this.currentPage,
        size: this.pageSize
      };
      let _this = this
      this.$store.dispatch("getDepartments", data).then(
        res => {
          console.log('部门数据',res);
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
    //新增部门
    addDepartment() {
      let parentNode = {
        parentNodeId: this.currentOrganId,
        parentNodeName: this.selectCurrentTreeName,
        departmentLength:this.totalPage
      };
      this.$refs.addDepartmentRef.showModal(0, parentNode);
    },
    //修改部门
    editDepartment(row) {
      let data = {
        row: row,
        parentNode: {
          parentNodeId: this.currentOrganId,
          parentNodeName: this.selectCurrentTreeName
        }
      };
      this.$refs.addDepartmentRef.showModal(2, data);
    },

    //删除部门
    deleteDepartment(id) {
        let _this = this
      this.$confirm("确认删除该部门?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("deleteDepartment", id).then(
            res => {
              _this.getAllOrgan(_this.currentOrganId);
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
