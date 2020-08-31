<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="inVisible"
    :close-on-click-modal="false"
    @close="closeDialog"
    width="35%"
    append-to-body
  >
    <div>
      <el-form
        :model="addRequest"
        :rules="rules"
        ref="addRequest"
        class="errorTipForm"
        label-width="70px"
      >
        <div>
          <div class="item">
            <el-form-item label="问题" prop="request">
              <el-input
                type="textarea"
                :autosize="{ minRows: 1, maxRows: 4}"
                placeholder="请输入问题"
                v-model="addRequest.request">
              </el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="回答" prop="answer">
              <el-input
                type="textarea"
                :autosize="{ minRows: 1, maxRows: 4}"
                placeholder="请输入回答"
                v-model="addRequest.answer">
              </el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="排序" prop="sort">
              <el-input
                type="textarea"
                :autosize="{ minRows: 1, maxRows: 4}"
                placeholder=""
                v-model.number="addRequest.sort">
              </el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="addRequestValid('addRequest')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { saveOrUpdateRequestApi } from "@/api/caseHandle";
export default {
  data() {
    var validateNum = (rule, value, callback) => {
      if(value && typeof(value) != 'number'){
        callback(new Error('必须为数字!'));
      }else {
        callback();
      }
    }
    return {
      inVisible: false,
      addRequest: {
        id: "",
        modelId: "",
        request: "",
        answer: "",
        sort: ""
      },
      rules: {
        request: [
          { required: true, message: "问题不能为空", trigger: "blur" },
          { max: 85, message: "最多输入85个字符", trigger: "blur" }
        ],
        sort: [
          { required: true, message: "排序不能为空", trigger: "blur" },
          { validator: validateNum, trigger: "blur"}
        ]
      },
      dialogTitle: "", //弹出框title
      handelType: 0 //添加 0  修改2
    };
  },
  inject: ["reload"],
  methods: {
    showModal(type, data) {
      this.inVisible = true;
      this.handelType = type;
      if (type == 0) {
        this.dialogTitle = "新增问题";
        this.addRequest = {
          modelId: data.modelId
        };
      } else if (type == 2) {
        this.dialogTitle = "修改问题";
        this.handelType = type;
        this.addRequest.id = data.id;
        this.addRequest.modelId = data.modelId;
        this.addRequest.request = data.request;
        this.addRequest.answer = data.answer;
        this.addRequest.sort = data.sort;
      }
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.inVisible = false;
      this.$refs["addRequest"].resetFields();
    },
    addRequestValid(formName) {
      let _this = this;
      this.$refs[formName].validate((valid, noPass) => {
        if (valid) {
          _this.addOrEdit();
        } else {
          let a = Object.values(noPass)[0];
          this.$message({
            showClose: true,
            message: a[0].message,
            type: "error",
            offset: 100,
            customClass: "validateErrorTip"
          });
          return false;
        }
      });
    },
    //新增 修改
    addOrEdit() {
      // debugger
      let _this = this;
      if (_this.handelType == "0") {
        saveOrUpdateRequestApi(_this.addRequest).then(
          res => {
            if (res.data == true) {
              _this.$message({
                type: "success",
                message: "添加成功"
              });
              _this.inVisible = false;
              _this.$emit("resetRequest", _this.addRequest.modelId);
            } else {
              _this.$message({
                type: "error",
                message: "问题重复,请修改"
              });
            }
          },
          err => {
            console.log(err);
          }
        );
      } else {
        saveOrUpdateRequestApi(_this.addRequest).then(
          res => {
            if (res.data == true) {
              _this.$message({
                type: "success",
                message: "修改成功"
              });
              _this.inVisible = false;
              _this.$emit("resetRequest", _this.addRequest.modelId);
            } else {
              _this.$message({
                type: "error",
                message: "问题重复,请修改"
              });
            }
          },
          err => {
            console.log(err);
          }
        );
      }
    }
  }
};
</script>
<style lang="scss" src="@/assets/css/systemManage.scss">
/* @import "@/assets/css/systemManage.scss"; */
</style>
