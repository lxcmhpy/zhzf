<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="35%"
  >
    <el-form :model="addOrUpdateCaseTypeForm" :rules="rules" ref="addOrUpdateCaseTypeForm" label-width="120px">
      <div class="item">
        <el-form-item label="案件类型名称" prop="typeName">
          <el-input v-model="addOrUpdateCaseTypeForm.typeName"></el-input>
        </el-form-item>
        <el-form-item label="所属流程名称" prop="bindProcessName">
           <el-select v-model="addOrUpdateCaseTypeForm.bindProcessName" placeholder="请选择">
              <el-option v-for="item in processList" :key="item.id" :label="item.flowName" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="程序类型" prop="programType">
          <el-select v-model="addOrUpdateCaseTypeForm.programType" >
            <el-option value="0" label="一般程序"></el-option>
            <el-option value="1" label="简易程序"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
           <el-select v-model="addOrUpdateCaseTypeForm.status" >
            <el-option value="0" label="启用"></el-option>
            <el-option value="1" label="禁用"></el-option>
          </el-select>
        </el-form-item>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="addOrUpdateCaseType('addOrUpdateCaseTypeForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import {
  getAllFlowApi,
} from "@/api/system";
export default {
  data() {
    return {
      visible: false,
      addOrUpdateCaseTypeForm: {
        typeName: "",
        bindProcessName:"",
        programType: "",
        status: ""
      },
      rules: {
        typeName: [{ required: true, message: "请输入案件类型名称", trigger: "blur" }],
        programType : [{ required: true, message: "请选择程序类型", trigger: "blur" }],
        status : [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
      dialogTitle: "", //弹出框title
      handelType: 0, //添加 0  修改2
      editCaseTypeId:'',
      processList:[] //流程列表
    };
  },
  inject: ["reload"],
  methods: {
    showModal(type, data) {
      this.visible = true;
      let _this = this;
      getAllFlowApi({flowStatus: 0}).then(res=>{
        console.log(res)
         _this.processList = res.data.records;
      })
      // this.$store.dispatch("getAllFlow",{flowStatus: 0}).then(
      //   res => {
      //     _this.processList = res.data;
      //   },
      //   err => {
      //     console.log(err);
      //   }
      // );
      this.handelType = type;
      if (type == 0) {
        this.dialogTitle = "添加案件类型";
        this.$nextTick(()=>{
          this.$refs["addOrUpdateCaseTypeForm"].resetFields();
          console.log('sadsdsf',this.$refs["addOrUpdateCaseTypeForm"].resetFields())
        })
      } else if (type == 2) {
        console.log(data);
        this.dialogTitle = "修改案件类型";
        this.addOrUpdateCaseTypeForm.typeName = data.typeName;
        this.addOrUpdateCaseTypeForm.bindProcessName = data.bindProcessName;
        this.addOrUpdateCaseTypeForm.programType = data.programType;
        this.addOrUpdateCaseTypeForm.status = data.status;
        this.editCaseTypeId = data.id;
        this.bindProcess = data.bindProcess;
      }
    },
    //关闭弹窗的时候清除数据
    closeDialog() {

      this.$refs["addOrUpdateCaseTypeForm"].resetFields();
      console.log('111',this.$refs["addOrUpdateCaseTypeForm"].resetFields());
      this.visible = false;
      //this.errorOrganName = false;
    },
    //新增案件类型 修改案件类型
    addOrUpdateCaseType(formName) {
      let _this = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (_this.handelType) {
            //修改
            _this.addOrUpdateCaseTypeForm.id= _this.editCaseTypeId;
            _this.addOrUpdateCaseTypeForm.bindProcess= _this.addOrUpdateCaseTypeForm.bindProcessName;
            console.log("要修改的案件类型",_this.addOrUpdateCaseTypeForm);
            _this.$store.dispatch("addOrUpdateCaseType", _this.addOrUpdateCaseTypeForm).then(
              res => {
                console.log("修改后的案件类型", res);
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
            _this.addOrUpdateCaseTypeForm.bindProcess= _this.addOrUpdateCaseTypeForm.bindProcessName;
            _this.$store.dispatch("addOrUpdateCaseType", _this.addOrUpdateCaseTypeForm).then(
              res => {
                console.log("案件类型", res);
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
  },
  mounted(){
    this.$nextTick(()=>{
          this.$refs["addOrUpdateCaseTypeForm"].resetFields();
          console.log('sadsdsfthis.$refs["addOrUpdateCaseTypeForm"]',this.$refs["addOrUpdateCaseTypeForm"])
          console.log('sadsdsf',this.$refs["addOrUpdateCaseTypeForm"].resetFields())
      })
  }
};
</script>
