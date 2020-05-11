<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="30%"
    append-to-body
  >
    <el-form :model="addCaseNumberForm" :rules="rules" ref="addCaseNumberForm" class="errorTipForm" label-width="80px" prop="addCaseNumberForm">
      <div class="item">
        <el-form-item label="执法机构" prop="organId" v-if="isAdd">
            <el-select v-model="addCaseNumberForm.organId"  style = "width:100%" placeholder="请选择执法机构" @change="getDepartment">
              <el-option
                v-for="item in getOrganList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            
          </el-form-item>
          <el-form-item label="执法机构" v-else>
            <el-input v-model="addCaseNumberForm.organName"  style = "width:100%" placeholder="请选择执法机构" disabled>
            </el-input>
            
          </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="案件字" prop="caseWord"  class="is-required">
            <el-input v-model="addCaseNumberForm.caseWord"></el-input>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="案件数序号位数" prop="digit"  class="is-required">
          <el-input v-model="addCaseNumberForm.digit" ></el-input>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="案件起始号" prop="onlineNumberStart"  class="is-required">
          <el-input v-model="addCaseNumberForm.onlineNumberStart" ></el-input>
        </el-form-item>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="addOrEditCaseNumber('addCaseNumberForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import {getOrganNotInCaseNumberApi,addCaseNumberApi} from "@/api/system";
export default {
  data() {
    return {
      visible: false,
      addCaseNumberForm: {
        id:"",
        organId: "",
        organName: "",
        caseWord: "",
        digit:"",
        onlineNumberStart: ""
      },
      getOrganList: [], //获取机构级下级机构
      rules: {
        organId: [{ required: true, message: "请输入名称", trigger: "blur" }]
      },
      dialogTitle: "", //弹出框title
      errorName: false, //添加name时的验证
      handelType: 0, //添加 0  修改2
      isAdd:true
    };
  },
  inject: ["reload"],
  created() {
    this.getDepartment();
  },
  methods: {
    showModal(type, data,formType) {
      this.visible = true;
      this.handelType = type;
      this.dictData = data.row;
      this.formType = formType;
      if (type == 0) {
        console.log(data);
        this.isAdd = true;
        this.dialogTitle = "新增";
      } else if (type == 2) {
        console.log(data);
        this.isAdd = false;
        this.dialogTitle = "修改";
        this.addCaseNumberForm.id = this.dictData.id;
        this.addCaseNumberForm.organId = this.dictData.organId;
        this.addCaseNumberForm.organName = this.dictData.organName;
        this.addCaseNumberForm.caseWord = this.dictData.caseWord;
        this.addCaseNumberForm.digit = this.dictData.digit;
        this.addCaseNumberForm.onlineNumberStart = this.dictData.onlineNumberStart;
      }
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.$refs["addCaseNumberForm"].resetFields();
      this.visible = false;
      // this.$nextTick(() => {
      //   this.$refs["addCaseNumberForm"].resetFields();
      // });
    },
    //聚焦清除错误信息
    focusName() {
      this.errorName = false;
    },
    //获取选中的机构下的部门
    getDepartment() {
      let _this = this
      getOrganNotInCaseNumberApi().then(
        res => {
         _this.getOrganList = res.data;
        },
        err => {
          console.log(err);
        }
      );
    },
    //新增修改
    addOrEditCaseNumber(formName) {
      let _this = this
      this.$refs[formName].validate(valid => {
        if (valid && !_this.errorName) {
            _this.addOrEditCaseNumberSure();
        }
      });
    },
    //新增 修改
    addOrEditCaseNumberSure(){
      console.log("data",this.addCaseNumberForm);
      addCaseNumberApi(this.addCaseNumberForm).then(
          res => {
          if (res.code == 200) {
            this.$message({
              message: "操作成功！",
              type: "success"
            });
            this.visible = false;
            this.currentPage = 1;
            this.reload();
          } else {
            this.$message.error("出现异常，添加失败！");
          }
        }
      )
        
    }
    
  }
};
</script>
<style lang="scss">
@import "@/assets/css/systemManage.scss";
</style>
