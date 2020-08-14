<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="35%"
    append-to-body
  >
    <el-form
      :model="addHylbForm"
      :rules="rules"
      ref="addHylbForm"
      class="errorTipForm"
      label-width="110px"
    >
      <div class="item" style="display:none">
        <el-form-item  prop="id">
            <el-input v-model="addHylbForm.id"  style = "width:100%"></el-input>
          </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="行业类别名称" prop="name">
          <el-input v-model="addHylbForm.name"></el-input>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="排序" prop="sort">
          <el-input v-model="addHylbForm.sort"></el-input>
        </el-form-item>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="addOrEditHylb('addHylbForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { addOrEditLawCategoryApi, } from "@/api/caseDeploy";

export default {
  data() {
    return {
      visible: false,
      addHylbForm: {
        id: "",
        name:"",
        sort:""
      },
      rules: {
        name: [{ required: true, message: "请输入业务领域名称", trigger: "blur" }]
      },
      dialogTitle: "", //弹出框title
      handelType: 0, //添加 0  修改2
      editLawCategoryId: '',
      pid: ""
    };
  },
  components: {
    
  },
  inject: ["reload"],
  methods: {
    showModal(type, data) {
      this.visible = true;
      this.handelType = type; 
      this.pid = data.pid;
      if (type == 0) {
        this.dialogTitle = "新增行业类别";
        this.addHylbForm = {};
        this.addHylbForm.pid = data.pid;
      } else if (type == 2) {       
        this.dialogTitle = "修改行业类别";
        this.addHylbForm = data.item;
        this.editLawCategoryId = data.item.id;
         this.addHylbForm.sort = data.item.sort;
        this.addHylbForm.pid = data.pid;
      }
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    addOrEditHylb(formName){
      let _this = this;
      this.$refs[formName].validate(valid => {
        if (_this.handelType) {
          //修改
          _this.addHylbForm.id = _this.editLawCategoryId;
        //   _this.addHylbForm.pid = this.pid;
          addOrEditLawCategoryApi(_this.addHylbForm).then(
            res => {
              console.log("业务领域", res);
              _this.$message({
                type: "success",
                message: "修改成功"
              });
              _this.visible = false;
              _this.$emit("getDetail",this.pid);
            },
            err => {
              console.log(err);
            }
          );
        } else {
        //   _this.addHylbForm.pid = this.pid;
          addOrEditLawCategoryApi(_this.addHylbForm).then(
            res => {
              console.log("业务领域", res);
              _this.$message({
                type: "success",
                message: "添加成功!"
              });
              _this.visible = false;
              _this.$emit("getDetail",this.pid);
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
