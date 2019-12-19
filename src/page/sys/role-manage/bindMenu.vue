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
      this.$store.dispatch("getTreePermission").then(
        res => {
          console.log("获取菜单", res);
          this.menuData = res.data;
          this.getRoleBindMenu();
        },
        err => {
          console.log(err);
        }
      );
    },
    //查询角色下绑定的菜单权限
    getRoleBindMenu(){
      this.$store.dispatch("getRoleBindMenu",this.roleId).then(
        res => {
          console.log('角色下绑定的菜单权限',res);
          let permissionIds=[];
          res.data.forEach(item => {
            permissionIds.push(item.permissionId);
          });
          this.$refs.menuTree.setCheckedKeys(permissionIds);
        },
        err => {
          console.log(err);
        }
      );
    },
    //绑定菜单
    bindMenu() {
      console.log(this.$refs.menuTree.getCheckedKeys());
      let data = {
          roleId:this.roleId,
          permissionIds:this.$refs.menuTree.getCheckedKeys()
      }
      this.$store.dispatch("roleBindMenu", data).then(
        res => {
          console.log("绑定", res);
          this.visible = false;
          this.$message({
            type: "success",
            message: "绑定成功"
          });
        },
        err => {
          console.log(err);
        }
      );
    },
    openDialog(){
      this.getMenu();
    }
  },
  created() {
  }
};
</script>