<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="35%"
  >
    <el-form :model="addRoleForm" :rules="rules" ref="addRoleForm" label-width="80px">
      <div class="item">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="addRoleForm.name"></el-input>
        </el-form-item>
        <!-- <span class="errorInput" v-if="errorOrganName">该机构名称已存在</span> -->
      </div>
      <div class="item">
        <el-form-item label="角色介绍" prop="description">
          <el-input v-model="addRoleForm.description"></el-input>
        </el-form-item>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="addOrEditRole('addRoleForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      addRoleForm: {
        name: "",
        description: ""
      },
      rules: {
        name: [{ required: true, message: "请输入角色名称", trigger: "blur" }]
      },
      dialogTitle: "", //弹出框title
      errorOrganName: false, //添加organname时的验证
      handelType: 0, //添加 0  修改2
      editRoleId:'',
    };
  },
  inject: ["reload"],
  methods: {
    showModal(type, data) {
      this.visible = true;
      this.handelType = type;
      if (type == 0) {
        this.dialogTitle = "新增角色";

        // this.parentNode = data;
        // this.addOrganForm.pidName = data.parentNodeName;
        // this.isDisabled = false;
      } else if (type == 2) {
        console.log(data);
        this.dialogTitle = "修改角色";
        this.addRoleForm.name = data.name;
        this.addRoleForm.description = data.description;
        this.editRoleId = data.id;
        // this.organId = data.id;
        // this.parentNode = data.parentNode;
        // this.getOrganDetail(data.id);
        // this.isDisabled = false;
      }
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.$refs["addRoleForm"].resetFields();
      //this.errorOrganName = false;
    },
    //聚焦清除错误信息
    focusOrganName() {
      this.errorOrganName = false;
    },
    //失去焦点请求 名称是否重复
    blurOrganName() {
      if (this.addOrganForm.name) {
        this.$store.dispatch("hasOrganName", this.addOrganForm.name).then(
          res => {
            console.log(res);
            if (res.data.id) {
              this.errorOrganName = true;
            } else {
              this.errorOrganName = false;
            }
          },
          err => {
            console.log(err);
          }
        );
      }
    },
    //新增角色 修改角色
    addOrEditRole(formName) {
      this.$refs[formName].validate(valid => {
        if (valid && !this.errorOrganName) {
          // this.addOrganForm.pid = this.parentNode.parentNodeId;
          // this.addOrganForm.id = this.handelType == 0 ? "" : this.organId;
          // console.log("数据", this.addOrganForm);
          if (this.handelType) {
            //修改
            this.addRoleForm.id= this.editRoleId;
            this.$store.dispatch("editRole", this.addRoleForm).then(
              res => {
                console.log("角色", res);
                this.$message({
                  type: "success",
                  message: "修改成功"
                });
                this.visible = false;
                this.reload();
              },
              err => {
                console.log(err);
              }
            );
          } else {
            this.$store.dispatch("addRole", this.addRoleForm).then(
              res => {
                console.log("角色", res);
                this.$message({
                  type: "success",
                  message:"添加成功!" 
                });
                this.visible = false;
                this.reload();
              },
              err => {
                console.log(err);
              }
            );
          }
        }
      });
    },
    //获取机构详情
    getOrganDetail(id) {}
  }
};
</script>