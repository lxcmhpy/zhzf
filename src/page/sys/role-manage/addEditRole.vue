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
        <el-form-item label="角色组" prop="roleGroup">
          <el-select v-model="addRoleForm.roleGroup" >
            <el-option value="普通用户" label="普通用户"></el-option>
            <el-option value="管理员" label="管理员"></el-option>
            <el-option value="超级管理员" label="超级管理员"></el-option>
            <el-option value="执法人员" label="执法人员"></el-option>
          </el-select>
        </el-form-item>
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
        roleGroup:"",
        description: ""
      },
      rules: {
        name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
        roleGroup : [{ required: true, message: "请选择角色组", trigger: "blur" }],
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
        this.$nextTick(()=>{
          this.$refs["addRoleForm"].resetFields();
          console.log('sadsdsf',this.$refs["addRoleForm"].resetFields())
        })
        // this.parentNode = data;
        // this.addOrganForm.pidName = data.parentNodeName;
        // this.isDisabled = false;
      } else if (type == 2) {
        console.log(data);
        this.dialogTitle = "修改角色";
        this.addRoleForm.name = data.name;
        this.addRoleForm.description = data.description;
        this.addRoleForm.roleGroup = data.roleGroup;
        this.editRoleId = data.id;
        // this.organId = data.id;
        // this.parentNode = data.parentNode;
        // this.getOrganDetail(data.id);
        // this.isDisabled = false;
      }
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
    
      this.$refs["addRoleForm"].resetFields();
      console.log('111',this.$refs["addRoleForm"].resetFields());
      this.visible = false;
      //this.errorOrganName = false;
    },
    //聚焦清除错误信息
    focusOrganName() {
      this.errorOrganName = false;
    },
    //失去焦点请求 名称是否重复
    blurOrganName() {
      if (this.addOrganForm.name) {
        let _this = this
        this.$store.dispatch("hasOrganName", this.addOrganForm.name).then(
          res => {
            console.log(res);
            if (res.data.id) {
              _this.errorOrganName = true;
            } else {
              _this.errorOrganName = false;
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
      let _this = this
      this.$refs[formName].validate(valid => {
        if (valid && !_this.errorOrganName) {
          // this.addOrganForm.pid = this.parentNode.parentNodeId;
          // this.addOrganForm.id = this.handelType == 0 ? "" : this.organId;
          // console.log("数据", this.addOrganForm);
          if (_this.handelType) {
            //修改
            _this.addRoleForm.id= this.editRoleId;
            console.log("要修改的角色",_this.addRoleForm);
            _this.$store.dispatch("editRole", _this.addRoleForm).then(
              res => {
                console.log("修改后的角色", res);
                _this.$message({
                  type: "success",
                  message: "修改成功"
                });
                _this.visible = false;
                _this.reload();
              },
              err => {
                console.log(err);
              }
            );
          } else {
            _this.$store.dispatch("addRole", _this.addRoleForm).then(
              res => {
                console.log("角色", res);
                _this.$message({
                  type: "success",
                  message:"添加成功!"
                });
                _this.visible = false;
                _this.reload();
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
  },
  mounted(){
    this.$nextTick(()=>{
          this.$refs["addRoleForm"].resetFields();
          console.log('sadsdsfthis.$refs["addRoleForm"]',this.$refs["addRoleForm"])
          console.log('sadsdsf',this.$refs["addRoleForm"].resetFields())
      })
  }
};
</script>
