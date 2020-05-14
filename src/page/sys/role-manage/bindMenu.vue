<template>
  <el-dialog
    title="绑定菜单"
    :visible.sync="visible"
    @close="closeDialog"
    @open="openDialog"
    :close-on-click-modal="false"
    width="35%"
    top="30px"
  >
    <div>
      <el-tree
        :data="menuData"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="menuTree"
        highlight-current
        :props="defaultProps"
        :check-strictly="true"
        @check="currentChange"
      ></el-tree>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="bindMenu()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      menuData: [],
      defaultProps: {
        children: "children",
        label: "title"
      },
      roleId: ""
    };
  },
  methods: {
    showModal(roleId) {
      this.visible = true;
      this.roleId = roleId;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      //this.$refs["addRoleForm"].resetFields();
    },
    //获取菜单
    getMenu() {
      let _this = this;
      this.$store.dispatch("getTreePermission").then(
        res => {
          console.log("获取菜单", res);
          _this.menuData = res.data;
          _this.getRoleBindMenu();
        },
        err => {
          console.log(err);
        }
      );
    },
    currentChange(node, checkNode) {
      let select = checkNode.checkedKeys.includes(node.id);
      this.childNodesChange(node, select);
      this.parentNodesChange(node, select);
    },
    childNodesChange(node, select) {
      let len = node.children ? node.children.length : 0;
      for (let i = 0; i < len; i++) {
        this.$refs.menuTree.setChecked(node.children[i].id, select);
        this.childNodesChange(node.children[i], select);
      }
    },
    parentNodesChange(node, select) {
      console.log("node", node);
      if (node.parentId) {
        let getCheckedNodes = this.$refs.menuTree.getCheckedNodes();
        console.log("getCheckedNodes", getCheckedNodes);
        for (let i = 0; i < getCheckedNodes.length; i++) {
          if (getCheckedNodes[i].parentId == node.parentId) {
            select = true;
            break;
          }
        }
        this.$refs.menuTree.setChecked(node.parentId, select);
        let currentParentNode = this.$refs.menuTree.getNode(node.parentId).data;
        console.log("parent node", this.$refs.menuTree.getNode(node.parentId));
        this.parentNodesChange(currentParentNode, select);
      }
    },

    //查询角色下绑定的菜单权限
    getRoleBindMenu() {
      let _this = this;
      this.$store.dispatch("getRoleBindMenu", this.roleId).then(
        res => {
          console.log("角色下绑定的菜单权限", res);
          let permissionIds = [];
          res.data.forEach(item => {
            permissionIds.push(item.permissionId);
          });
          _this.$refs.menuTree.setCheckedKeys(permissionIds);
        },
        err => {
          console.log(err);
        }
      );
    },
    //绑定菜单
    bindMenu() {
      console.log(this.$refs.menuTree.getCheckedKeys());
      console.log(this.$refs.menuTree.getHalfCheckedKeys());
      console.log([
        ...this.$refs.menuTree.getCheckedKeys(),
        ...this.$refs.menuTree.getHalfCheckedKeys()
      ]);
      let data = {
        roleId: this.roleId,
        permissionIds: [
          ...this.$refs.menuTree.getCheckedKeys(),
          ...this.$refs.menuTree.getHalfCheckedKeys()
        ],
        halfCheckedKeys: this.$refs.menuTree.getHalfCheckedKeys()
      };
      let _this = this;
      this.$store.dispatch("roleBindMenu", data).then(
        res => {
          console.log("绑定", res);
          _this.visible = false;
          _this.$message({
            type: "success",
            message: "绑定成功"
          });
        },
        err => {
          console.log(err);
        }
      );
    },
    openDialog() {
      this.getMenu();
    }
  },
  created() {}
};
</script>
