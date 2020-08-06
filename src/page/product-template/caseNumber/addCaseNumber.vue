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
      <div class="item" style="display:none">
        <el-form-item  prop="organId">
            <el-input v-model="addCaseNumberForm.organId"  style = "width:100%"></el-input>
          </el-form-item>
      </div>
      <div class="item" style="display:none">
        <el-form-item  prop="id">
            <el-input v-model="addCaseNumberForm.id"  style = "width:100%"></el-input>
          </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="执法机构" prop="organId">
          <el-select filterable :disabled="!isAdd" v-model="addCaseNumberForm.organId"  style = "width:100%" placeholder="请选择执法机构" @change="getDepartment">
            <el-option
              v-for="item in getOrganList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="案件类型" prop="caseTypeId">
            <el-select v-model="addCaseNumberForm.caseTypeId"  style = "width:100%" placeholder="请选择执法机构">
              <el-option
                v-for="item in caseTypeList"
                :key="item.id"
                :label="item.typeName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="案件字" prop="caseWord"  class="is-required">
            <el-input v-model="addCaseNumberForm.caseWord"></el-input>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="大队码" prop="digit">
          <el-input v-model="addCaseNumberForm.teamCode" ></el-input>
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
import {getOrganNotInCaseNumberApi,addCaseNumberApi,getCaseNumberByIdApi} from "@/api/system";
import {getQueryCaseTypeByOrganIdApi} from "@/api/caseHandle";
export default {
  data() {
    return {
      visible: false,
      addCaseNumberForm: {
        id:"",
        organId: "",
        caseTypeId: "",
        teamCode: "",
        organName: "",
        caseWord: "",
        digit:"",
        onlineNumberStart: ""
      },
      caseTypeList: [],//机构绑定的案件类型
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
    showModal(type, data) {
      this.visible = true;
      this.handelType = type;
      if (type == 0) {
        this.isAdd = true;
        this.dialogTitle = "新增";
      } else if (type == 2) {
        this.dictData = data.row;
        this.isAdd = false;
        this.dialogTitle = "修改";
        this.getCaseNumberByid(this.dictData.id);
      }
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.$refs["addCaseNumberForm"].resetFields();
      this.visible = false;
    },
    getCaseNumberByid(id){
      let _this = this;
      getCaseNumberByIdApi(id).then(
        res => {
          _this.addCaseNumberForm = res.data;
          _this.addCaseNumberForm.organName = _this.dictData.organName;
          _this.getCaseTypeList();
        },
        error => {
          console.log(error)
        }
      );
    },
    getCaseTypeList(){
      let organId = this.addCaseNumberForm.organId;
      let _this = this;
      getQueryCaseTypeByOrganIdApi(organId).then(
        res => {
          _this.caseTypeList = res.data;
        },
        error => {
          console.log(error)
        }
      );
    },
    //获取选中的机构下的案件类型
    getDepartment() {
      let _this = this
      getOrganNotInCaseNumberApi().then(
        res => {
         _this.getOrganList = res;
         _this.getCaseTypeList();
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
      addCaseNumberApi(this.addCaseNumberForm).then(
          res => {
          if (res.code == 200) {
            this.$message({
              message: "操作成功！",
              type: "success"
            });
            this.$refs["addCaseNumberForm"].resetFields();
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
<style lang="scss" src="@/assets/css/systemManage.scss">
/* @import "@/assets/css/systemManage.scss"; */
</style>
