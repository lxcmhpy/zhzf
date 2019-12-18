<template>
  <el-dialog
    title="绑定机构"
    :visible.sync="visible"
    @close="closeDialog"
    @open="openDialog"
    :close-on-click-modal="false"
    width="35%"
    top="30px"
  >
    <div>
      <el-tree
        :data="organData"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="organTree"
        highlight-current
        :props="defaultProps"
      ></el-tree>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="bindOrganSure()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      organData: [],
      defaultProps: {
        children: "children",
        label: "label"
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
    //获取机构
    getOrgan() {
      this.$store.dispatch("getAllOrgan").then(
        res => {
          this.organData = res.data;
          this.getRoleBindOrgan();
        },
        err => {
          console.log(err);
        }
      );
    },
    //查询角色下绑定的机构
    getRoleBindOrgan() {
      this.$store.dispatch("getRoleBindOrgan", this.roleId).then(
        res => {
          console.log("角色下绑定的菜单权限", res);
          let organIds = [];
          res.data.forEach(item => {
            organIds.push(item.organId);
          });
          this.$refs.organTree.setCheckedKeys(organIds);
        },
        err => {
          console.log(err);
        }
      );
    },
    //绑定机构
    bindOrganSure() {
      console.log(this.$refs.organTree.getCheckedKeys());
      let data = {
        roleId: this.roleId,
        organIds: this.$refs.organTree.getCheckedKeys()
      };
      this.$store.dispatch("roleBindOrgan", data).then(
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
    openDialog() {
      this.getOrgan();
    }
  },
  created() {}
};
</script>