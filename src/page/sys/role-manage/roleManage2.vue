<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="departOrUserTree">
        <p>机构列表</p>
        <el-input placeholder="输入机构名" v-model="filterText">
          <el-button slot="append" size="mini" icon="el-icon-search"></el-button>
        </el-input>
        <div class="treeBox">
          <el-tree
            class="filter-tree"
            :data="organData"
            :props="defaultProps"
            node-key="id"
            default-expand-all
            :expand-on-click-node='false'
            :filter-node-method="filterNode"
            ref="tree"
            @node-click="handleNodeClick"
          >
          <span class="custom-tree-node" slot-scope="{ node,data }">
            <span>
              <i :class="data.children ? 'iconfont law-icon_zhan_bag' : ''"></i>
              {{ node.label }}
            </span>
          </span>
          </el-tree>
        </div>
      </div>
    <div class="departTable" id="roleBox">
      <div class="handlePart">
        <div class="search">
          <el-form :inline="true" :model="dicSearchForm" ref="roleForm">
            <el-form-item label="角色名称" prop="name">
              <el-input v-model="dicSearchForm.name" placeholder="输入角色名称"></el-input>
            </el-form-item> 
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search" @click="getOrganBindRole">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-refresh-right" @click="reset">重置</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-plus" @click="addRole">添加角色</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="tablePart">
        <el-table :data="tableData" stripe style="width: 100%" height="100%">
          <el-table-column prop="name" label="角色名称" align="center"></el-table-column>
          <el-table-column prop="roleGroup" label="角色组" align="center"></el-table-column>
          <el-table-column prop="description" label="角色介绍" align="center"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
          <el-table-column fixed="right" label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="bindMenu(scope.row.id)">菜单权限</el-button>
              <!-- <el-button type="text" @click="bindOrgan(scope.row.id)">绑定机构</el-button> -->
              <el-button @click="editRole(scope.row)" type="text">编辑</el-button>
              <el-button type="text" @click="deleteRole(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
      <addEditRole ref="addEditRoleRef"></addEditRole>
      <bindMenu ref="bindMenuRef"></bindMenu>
      <!-- <bindOrgan ref="bindOrganRef"></bindOrgan> -->
    </div>
  </div>
</template>
<script>
import addEditRole from "./addEditRole";
import bindMenu from "./bindMenu";
// import bindOrgan from "./bindOrgan";
import {getOrganRoleByRoleNameApi} from "@/api/system";

export default {
  data() {
    return {
      tableData: [], //表格数据
      dicSearchForm: {
        name: ""
      },
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      info: "",
      menuList: [],
      organList: [],
        organData: [],
      defaultProps: {
          children: "children",
          label: "label"
        },
        filterText: "",
        defaultExpandedKeys: [], //默认展开的key


    };
  },
  components: {
    addEditRole,
    bindMenu,
    // bindOrgan
  },
  inject: ["reload"],
  methods: {
    filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
    //编辑角色
    editRole(row) {
      this.$refs.addEditRoleRef.showModal(2, row);
    },
    //删除角色
    deleteRole(id) {
      this.getRoleBindMenu(id);
      this.getRoleBindOrgan(id);
      // let _this = this;
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      // this.getRoles();
      this.getOrganBindRole()
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      // this.getRoles();
      this.getOrganBindRole()

    },
    //重置
    reset() {
      this.$refs["roleForm"].resetFields();
      // this.getRoles();
      this.getOrganBindRole()

    },
    //获取角色
    // getRoles() {
    //   let data = {
    //     current: this.currentPage,
    //     size: this.pageSize,
    //     name: this.dicSearchForm.name
    //   };
    //   let _this = this;
    //   this.$store.dispatch("getRoles", data).then(
    //     res => {
    //       console.log("角色列表", res);
    //       _this.tableData = res.data.records;
    //       _this.totalPage = res.data.total;
    //     },
    //     err => {
    //       console.log(err);
    //     }
    //   );
    // },
    //添加角色
    addRole() {
      this.$refs.addEditRoleRef.showModal(0, "");
    },
    //绑定菜单权限
    bindMenu(roleId) {
      this.$refs.bindMenuRef.showModal(roleId);
    },
    //角色绑定机构
    // bindOrgan(roleId) {
    //   this.$refs.bindOrganRef.showModal(roleId);
    // },
    //查询角色下绑定的菜单权限
    getRoleBindMenu(id) {
      // let _this = this;
      this.$store.dispatch("getRoleBindMenu", id).then(
        res => {
          console.log("角色下绑定的菜单权限", res);
          this.menuList = res.data;
        },
        err => {
          console.log(err);
        }
      );
    },
    //查询角色下绑定的机构
    getRoleBindOrgan(id) {
      this.$store.dispatch("getRoleBindOrgan", id).then(
        res => {
          console.log("角色下绑定的机构", res);
          this.organList = res.data;
          if (this.menuList.length != 0 || this.organList.length != 0) {
            this.info = "此角色已关联权限或绑定机构，确认要删除吗？";
          } else {
            this.info = "确定删除吗？";
          }
          this.$confirm(this.info, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
              this.$store.dispatch("deleteRole", id).then(
                res => {
                  this.$message({
                    type: "success",
                    message: "删除成功!"
                  });
                  this.reload();
                },
                err => {
                  console.log(err);
                }
              );
            })
            .catch(() => {});
        },
        err => {
          console.log(err);
        }
      );
    },
    handleNodeClick(data) {
        console.log(data);
        this.selectCurrentTreeName = data.label;
        this.tableData = [];
        this.currentOrganId = data.id;
        console.log(this.currentOrganId);
        // this.getUserList(1);
        // this.getDepartment();
        this.getOrganBindRole(1)
      },
      //获取机构
      getAllOrgan() {
        let _this = this
        this.$store.dispatch("getAllOrgan").then(
          res => {
            console.log("机构", res);

            _this.defaultExpandedKeys.push(res.data[0].id);
            if (res.data[0].children && res.data[0].children.length > 0) {
              res.data[0].children.forEach(item => {
                _this.defaultExpandedKeys.push(item.id);
              });
            }
            _this.organData = res.data;
            console.log(_this.defaultExpandedKeys);
            console.log(_this.organData);
            _this.currentOrganId = res.data[0].id;
            _this.selectCurrentTreeName = res.data[0].label;
            // _this.getUserList(1);
            this.getOrganBindRole(1)
            //this.getDepartment();
          },
          err => {
            console.log(err);
          }
        );
      },
      //根据机构获取角色
      getOrganBindRole(val){
        this.currentPage = val
          let data = {
            name:this.dicSearchForm.name,
            organId: this.currentOrganId,
            current: this.currentPage,
            size: this.pageSize,
          };
        getOrganRoleByRoleNameApi(data).then(res=>{
          console.log('角色',res)
          this.tableData = res.data.records;
          this.totalPage = res.data.total;
        }).catch(err=>{console.log(err)})
      }

  },
  created() {
    // this.getRoles();
      this.getAllOrgan();
  },
  watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
};
</script>

<style lang="scss" src="@/assets/css/systemManage.scss">
/* @import "@/assets/css/systemManage.scss"; */
</style>
