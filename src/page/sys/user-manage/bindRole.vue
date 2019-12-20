<template>
  <el-dialog
    title="角色绑定"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="35%"
  >
    <el-checkbox-group v-model="selectRoleList">
      <el-checkbox v-for="(item,index) in roleList" :key="index" :label="item.id">{{item.name}}</el-checkbox>
    </el-checkbox-group>

    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="bindRoleSure()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      roleList: [],
      selectRoleList: [], //选中的角色名列表
      userId: ""
    };
  },
  inject: ["reload"],
  methods: {
    showModal(id) {
      this.visible = true;
      //   this.dictId = row.id;
      //   this.dictName = row.name;
      this.userId = id;
      this.getRoleList();
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    //获取字典值
    getRoleList() {
      this.$store.dispatch("getRoles").then(
        res => {
          console.log(res.data);
          this.roleList = res.data;
          this.findBindRole();
        },
        err => {
          console.log(err);
        }
      );
    },

    //绑定角色
    bindRoleSure() {
      let data = {
        userId: this.userId,
        roleIds: this.selectRoleList.join(",")
      };

      this.$store.dispatch("userBindRole", data).then(
        res => {
          console.log(res);
          this.$message({
            showClose: true,
            message: "绑定成功",
            type: "success"
          });
          this.visible = false;
          this.reload();
        },
        err => {
          console.log(err);
        }
      );
    },
    //查询绑定的角色
    findBindRole(id) {
      this.$store.dispatch("queryUserBindRole", this.userId).then(
        res => {
          console.log(res);
          res.data.forEach(item => {
            this.selectRoleList.push(item.roleId);
          });
        },
        err => {
          console.log(err);
        }
      );
    }
  }
};
</script>
<style lang="less">
@import "../../../css/systemManage.less";
</style>