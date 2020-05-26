<template>
  <el-dialog
      :title="dialogTitle"
      :visible.sync="visible"
      :close-on-click-modal="false"
      @close="closeDialog"
      width="35%"
    >
      <el-form
        :model="addDocType"
        :rules="rules"
        ref="addDocType"
        class="errorTipForm"
        label-width="100px"
      >
        <div class="item">
          <el-form-item label="文书名称" prop="name">
            <el-input ref="name" v-model="addDocType.name"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="所属环节名称" prop="linkName">
            <el-input ref="linkName" v-model="addDocType.linkName"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="文书地址" prop="path">
            <el-input v-model="addDocType.path"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="模板名称" prop="templateName">
            <el-input v-model="addDocType.templateName"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="排序" prop="sort">
            <el-input v-model="addDocType.sort" disabled></el-input>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="addDocTypeValid('addDocType')">确 定</el-button>
      </span>
    </el-dialog>
</template>
<script>
import { saveOrUpdateDocTypeApi } from "@/api/caseHandle";
export default {
  data() {
    return {
      visible: false,
      addDocType: {
        id: "",
        name: "",
        linkName: "",
        templateName:"",
        path:"",
        sort:0,
      },
      rules: {
         name: [{ required: true, message: "文书类型名称不能为空", trigger: "blur" }],
         path: [{ required: true, message: "文书类型地址不能为空", trigger: "blur" }]
      },
      dialogTitle: "", //弹出框title
      errorName: false, //添加name时的验证
      handelType: 0, //添加 0  修改2
    };
  },
  inject: ["reload"],
  methods: {
    showModal(type, data) {
      this.visible = true;
      this.handelType = type;
      if (type == 0) {
        console.log(data);
        this.dialogTitle = "新增";
        this.addDocType = {
          id: "",
          name: "",
          linkName: "",
          templateName:"",
          path:"",
          sort:data.leng + 1
        };
        console.log("sds",this.addDocType.sort)
      } else if (type == 2) {
        this.dialogTitle = "修改";
        this.handelType = type;
        this.addDocType.id = data.id;
        this.addDocType.name = data.name;
        this.addDocType.linkName = data.linkName;
        this.addDocType.templateName = data.templateName;
        this.addDocType.path = data.path;
        this.addDocType.sort = data.sort;
        console.log("修改数据",this.addDocType);
      }
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.$refs.addDocType.resetFields();
    },
    //聚焦清除错误信息
    focusName() {
      this.errorName = false;
    },
    //新增
    addDocTypeValid(formName) {
      let _this = this
      this.$refs[formName].validate((valid,noPass) => {
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
      if(_this.handelType==="0"){
          saveOrUpdateDocTypeApi(_this.addDocType).then(
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
                      message: "文书名称重复,请修改"
                  });
                }
              },
              err => {
                console.log(err);
              }
        );
      }else{
        saveOrUpdateDocTypeApi(_this.addDocType).then(
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
                      message: "文书名称重复,请修改"
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
