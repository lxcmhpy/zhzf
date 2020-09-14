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
      userIds: ""
    };
  },
  inject: ["reload"],
  methods: {
    showModal(data) {
      this.visible = true;
      //   this.dictId = row.id;
      //   this.dictName = row.name;
      let organId = data.organId;
      this.userIds = data.userIdList;
      //this.userId = id;
      this.getRoleList(organId);
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.selectRoleList= [];
    },
    //根据机构获取角色列表
    getRoleList(organId) {
      console.log("organId",organId);
      let _this = this
      this.$store.dispatch("getOrganBindRole",organId).then(
        res => {
          console.log(res.data);
          _this.roleList = res.data;
          if(_this.userIds.length==1){
            this.findBindRole(_this.userIds[0]);
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    //绑定角色
    bindRoleSure() {
      let data = {
        userIds: this.userIds.join(','),
        roleIds: this.selectRoleList.join(",")
      };
      let _this = this
      this.$store.dispatch("userBindRole", data).then(
        res => {
          console.log(res);
          _this.$message({
            showClose: true,
            message: "绑定成功",
            type: "success"
          });
          _this.visible = false;
          _this.reload();
        },
        err => {
          console.log(err);
        }
      );
    },
    //查询绑定的角色
    findBindRole(id) {
      let _this = this
      this.$store.dispatch("queryUserBindRole", id).then(
        res => {
          console.log(res);
          res.data.forEach(item => {
            _this.selectRoleList.push(item.roleId);
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
<style lang="scss" src="@/assets/css/systemManage.scss">
/* @import "@/assets/css/systemManage.scss"; */
</style>
