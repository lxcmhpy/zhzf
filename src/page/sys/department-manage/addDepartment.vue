<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="35%"
  >
    <el-form :model="addDepartmentForm" :rules="rules" ref="addDepartmentForm" label-width="80px">
      <div class="item">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="addDepartmentForm.name"></el-input>
        </el-form-item>
        <!-- <span class="errorInput" v-if="errorOrganName">该机构名称已存在</span> -->
      </div>
      <div class="item">
        <el-form-item label="所属机构" prop="pidName">
          <el-input v-model="addDepartmentForm.pidName"></el-input>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="序号" prop="sortOrder">
          <el-input v-model="addDepartmentForm.sortOrder"></el-input>
        </el-form-item>
        <!-- <span class="errorInput" v-if="errorOrganName">该机构名称已存在</span> -->
      </div>
      <div class="item">
        <el-form-item label="状态" prop="status">
          <el-switch
            v-model="addDepartmentForm.status"
            active-color="#4573D0"
          ></el-switch>
        </el-form-item>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="addOrEditDepartment('addDepartmentForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      addDepartmentForm: {
        sortOrder: "",
        name: "",
        pidName: "" ,
        status:true,
      },
      rules: {
        name: [{ required: true, message: "请输入角色名称", trigger: "blur" }]
      },
      dialogTitle: "", //弹出框title
      errorOrganName: false, //添加organname时的验证
      handelType: 0, //添加 0  修改2
      parentNode: "", //新增部门时的上级机构
      departmentId: "", //部门id
    };
  },
  inject: ["reload"],
  methods: {
    showModal(type, data) {
      this.visible = true;
      this.handelType = type;
      if (type == 0) {
        console.log(data);
        this.dialogTitle = "新增部门";
        this.parentNode = data;
        this.addDepartmentForm.pidName = data.parentNodeName;
        this.addDepartmentForm.sortOrder = data.departmentLength + 1;
        // this.isDisabled = false;
      } else if (type == 2) {
        console.log(data);
        this.dialogTitle = "修改部门";
        this.parentNode = data.parentNode;
        this.departmentId = data.row.id;
        this.addDepartmentForm.name = data.row.name;
        this.addDepartmentForm.status = data.row.status == 0 ? true : false;
        this.addDepartmentForm.sortOrder = data.row.sortOrder;
        this.addDepartmentForm.pidName = data.parentNode.parentNodeName;
      }
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.$refs["addDepartmentForm"].resetFields();
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
    addOrEditDepartment(formName) {
      this.$refs[formName].validate(valid => {
        if (valid && !this.errorOrganName) {
          this.addDepartmentForm.oid = this.parentNode.parentNodeId;
          this.addDepartmentForm.id = this.handelType == 0 ? "" : this.departmentId;
          // console.log("数据", this.addOrganForm);
          console.log(this.addDepartmentForm)
            this.$store.dispatch("addDepartment", this.addDepartmentForm).then(
              res => {
                console.log("部门", res);
                this.$emit("getAllOrgan2",this.addDepartmentForm.oid);
                this.$message({
                  type: "success",
                  message: this.handelType == 0 ? "添加成功!" : "修改成功"

                });
                this.visible = false;
              },
              err => {
                console.log(err);
              }
            );
        }
      });
    },
    //获取机构详情
    getOrganDetail(id) {}
  }
};
</script>