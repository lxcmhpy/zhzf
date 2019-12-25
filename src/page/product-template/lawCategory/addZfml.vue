<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="30%"
  >
    <el-form :model="addZfml" :rules="rules" ref="addZfmlForm" label-width="80px">
      <div class="item">
        <el-form-item label="名称" prop="name">
          <el-input v-model="addZfmlForm.name"></el-input>
        </el-form-item>
        <!-- <span class="errorInput" v-if="errorOrganName">该机构名称已存在</span> -->
      </div>
      <div class="item">
        <el-form-item label="父节点" prop="description">
          <el-input v-model="addZfmlForm.description"></el-input>
        </el-form-item>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="addZfml('addZfmlForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialogTitle: "", //弹出框title
      errorOrganName: false, //添加organname时的验证
      handelType: 0, //添加 0  修改2
      editRoleId: "",
      rules: {
        // name: [{ required: true, message: "请输入角色名称", trigger: "blur" }]
      },
      addZfmlForm: {
        // name: "",
        // description: ""
      },
    };
  },
  inject: ["reload"],
  methods: {
    showModal(type, data) {
      this.visible = true;
      this.handelType = type;
      console.log(type);
      if (type == 0) {
        this.dialogTitle = "新增执法门类";

        // this.parentNode = data;
        // this.addOrganForm.pidName = data.parentNodeName;
        // this.isDisabled = false;
      } else if (type == 2) {
        console.log(data);
        this.dialogTitle = "修改执法门类";
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
      this.$refs["addZfmlForm"].resetFields();
      //this.errorOrganName = false;
    },
    //新增角色 修改角色
    addZfml(formName) {

    }
  }
};
</script>