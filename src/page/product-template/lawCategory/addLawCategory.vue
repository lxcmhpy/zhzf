<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="35%"
  >
    <el-form
      :model="addLawCategoryForm"
      :rules="rules"
      ref="addLawCategoryForm"
      class="errorTipForm"
      label-width="110px"
    >
      <div class="item">
        <el-form-item label="业务领域名称" prop="name">
          <el-input v-model="addLawCategoryForm.name"></el-input>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="排序" prop="sort">
          <el-input v-model="addLawCategoryForm.sort" disabled></el-input>
        </el-form-item>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="addOrEditLawCategory('addLawCategoryForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { addOrEditLawCategoryApi, } from "@/api/caseDeploy";

export default {
  data() {
    return {
      visible: false,
      addLawCategoryForm: {
        name:"",
        sort:""
      },
      rules: {
        name: [{ required: true, message: "请输入业务领域名称", trigger: "blur" }]
      },
      dialogTitle: "", //弹出框title
      handelType: 0, //添加 0  修改2
      editLawCategoryId: '',
    };
  },
  components: {
    
  },
  inject: ["reload"],
  methods: {
    showModal(type, data) {
      console.log("123",data);
      this.visible = true;
      this.handelType = type; 
      if (type == 0) {
        this.dialogTitle = "新增业务领域";
        this.addLawCategoryForm.sort = data.leng + 1;
      } else if (type == 2) {       
        this.dialogTitle = "修改业务领域";
        this.addLawCategoryForm = data;
        this.editLawCategoryId = data.id;
      }
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    //   this.$refs["addRoleForm"].resetFields();
      //this.errorOrganName = false;
    },
    addOrEditLawCategory(formName){
      let _this = this;
      this.$refs[formName].validate(valid => {
        if (_this.handelType) {
          //修改
          _this.addLawCategoryForm.id = _this.editLawCategoryId;
          addOrEditLawCategoryApi(_this.addLawCategoryForm).then(
            res => {
              console.log("业务领域", res);
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
          addOrEditLawCategoryApi(_this.addLawCategoryForm).then(
            res => {
              console.log("业务领域", res);
              _this.$message({
                type: "success",
                message: "添加成功!"
              });
              _this.visible = false;
              _this.reload();
            },
            err => {
              console.log(err);
            }
          );
        }
      });
    },
  },
  created() {
    // this.getAllOrgan("root");
  }
};
</script>
