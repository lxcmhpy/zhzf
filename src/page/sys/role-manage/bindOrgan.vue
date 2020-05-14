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
        :check-strictly="true"
        @check="currentChange"
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
      let _this = this
      this.$store.dispatch("getAllOrgan").then(
        res => {
          
          _this.organData = res.data;
          console.log('organData',_this.organData)
          _this.getRoleBindOrgan();
        },
        err => {
          console.log(err);
        }
      );
    },
    //查询角色下绑定的机构
    getRoleBindOrgan() {
      let _this = this
      this.$store.dispatch("getRoleBindOrgan", this.roleId).then(
        res => {
          console.log("角色下绑定的菜单权限", res);
          let organIds = [];
          res.data.forEach(item => {
            organIds.push(item.organId);
          });
          _this.$refs.organTree.setCheckedKeys(organIds);
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
      let _this = this
      this.$store.dispatch("roleBindOrgan", data).then(
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
      this.getOrgan();
    },
    currentChange(node, checkNode) {
      let select = checkNode.checkedKeys.includes(node.id);
      this.childNodesChange(node, select);
      this.parentNodesChange(node, select);
    },
    // 更改子节点状态
    childNodesChange(node, select) {
      let len = node.children ? node.children.length : 0;
      for (let i = 0; i < len; i++) {
        this.$refs.organTree.setChecked(node.children[i].id, select);
        this.childNodesChange(node.children[i], select);
      }
    },
    // 更改父节点状态
    parentNodesChange(node, select) {
      if (this.$refs.organTree.getNode(node.pid) && node.pid) {
        let getCheckedNodes = this.$refs.organTree.getCheckedNodes();
        for (let i = 0; i < getCheckedNodes.length; i++) {
          if (getCheckedNodes[i].pid == node.pid) {
            select = true;
            break;
          }
        }
        this.$refs.organTree.setChecked(node.pid, select);
        let currentParentNode = this.$refs.organTree.getNode(node.pid).data;
        this.parentNodesChange(currentParentNode, select);
      }
    },

  },
  created() {}
};
</script>
