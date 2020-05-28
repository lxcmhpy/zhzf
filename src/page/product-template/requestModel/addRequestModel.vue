<template>
  <el-dialog
      :title="dialogTitle"
      :visible.sync="visible"
      :close-on-click-modal="false"
      @close="closeDialog"
      width="35%"
    >
      <el-form
        :model="addRequest"
        :rules="rules"
        ref="addRequest"
        class="errorTipForm"
        label-width="100px"
      >
        <div class="item">
          <el-form-item label="模版名称" prop="modelName">
            <el-input v-model="addRequest.modelName"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="执法机构" prop="modelTypeId">
            <el-select v-model="addRequest.modelTypeId" clearable placeholder="请选择执法机构">
              <el-option
                v-for="item in getOrganList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="addRequestModel('addRequest')">确 定</el-button>
      </span>
    </el-dialog>
</template>
<script>
import { saveOrUpdateRequestModelApi } from "@/api/caseHandle";
export default {
  data() {
    return {
      visible: false,
      addRequest: {
        id: "",
        modelName: "",
        createTime:"",
        modelTypeId: ""
      },
      rules: {
         modelName: [{ required: true, message: "模板名称不能为空", trigger: "blur" }],
         modelTypeId: [{ required: true, message: "执法机构不能为空", trigger: "blur" }]
      },
      dialogTitle: "", //弹出框title
      errorName: false, //添加name时的验证
      handelType: 0, //添加 0  修改2
      getOrganList: []
    };
  },
  inject: ["reload"],
  methods: {
    showModal(type, data ,orgList) {
      this.visible = true;
      this.handelType = type;
      this.getOrganList = orgList;
      if (type == 0) {
        this.dialogTitle = "新增";
        this.addRequest = {
          id: "",modelName: "",
          createTime:new Date().format('yyyy-MM-dd'),
          modelTypeId: ""
        };
      } else if (type == 2) {
        this.dialogTitle = "修改";
        this.handelType = type;
        this.addRequest.id = data.id;
        this.addRequest.modelName = data.modelName;
        this.addRequest.createTime = new Date().format('yyyy-MM-dd');
        this.addRequest.modelTypeId = data.modelTypeId;
      }
      console.log("addRequest",this.addRequest)
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.$refs.addRequest.resetFields();
    },
    //新增验证
    addRequestModel(formName) {
      let _this = this
      this.$refs[formName].validate((valid, noPass) => {
        if (valid) {
            _this.addOrEdit();
        }else {
          let a = Object.values(noPass)[0];
          console.log('不通过',a);
          this.$message({
            showClose: true,
            message: a[0].message,
            type: 'error',
            offset: 100,
            customClass: 'validateErrorTip'
          });
          return false;
        }
      });
    },
    //新增 修改
    addOrEdit() {
      let _this = this;
      _this.addRequest.url = _this.addRequest.path;
      if(_this.handelType=="0"){
          saveOrUpdateRequestModelApi(_this.addRequest).then(
              res => {
                if(res.data == true){
                  _this.$message({
                    type: "success",
                    message: "添加成功"
                  });
                  _this.reload();
                }else{
                  _this.$message({
                      type: "error",
                      message: "模板名称重复,请修改"
                  });
                }
              },
              err => {
                console.log(err);
              }
        );
      }else{
        saveOrUpdateRequestModelApi(_this.addRequest).then(
              res => {
                if(res.data == true){
                  _this.$message({
                    type: "success",
                    message: "修改成功"
                  });
                  _this.reload();
                }else{
                  _this.$message({
                      type: "error",
                      message: "模板名称重复,请修改"
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
