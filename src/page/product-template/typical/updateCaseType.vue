<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="40%"
  >
    <el-form :model="updateCaseTypeForm" :rules="rules" ref="updateCaseTypeForm" label-width="120px">
      <div class="item">
        <el-form-item label="案件编号" prop="caseNumber">
          <el-input v-model="updateCaseTypeForm.caseNumber" disabled></el-input>
        </el-form-item>
        <el-form-item
          label="业务领域"
          prop="zfml">
          <el-select
            v-model="updateCaseTypeForm.zfml"
            placeholder="请选择"
            disabled
            clearable> 
            <el-option
                v-for="value in branchInfo" :key="value" :label="value" :value="value">
            </el-option>        
          </el-select>
        </el-form-item>
        <el-form-item label="案件类型">
          <el-select
            disabled
            v-model="updateCaseTypeForm.caseType"
            placeholder="请选择">
            <el-option
            v-for="item in caseTypeList"
            :key="item.id"
            :label="item.typeName"
            :value="item.typeName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="受案机构">
          <el-select
            disabled
            v-model="updateCaseTypeForm.organName"
            placeholder="请选择">
            <el-option
            v-for="item in organList"
            :key="item.id"
            :label="item.label"
            :value="item.id"
            ></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="案由" prop="caseName">
          <el-input v-model="updateCaseTypeForm.caseName" disabled></el-input>
        </el-form-item>
        <el-form-item label="案件点评" prop="reviews">
          <el-input v-model="updateCaseTypeForm.reviews" class="text-area" type="textarea" maxlength="100" clearable rows="4"/>
        </el-form-item>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="addOrUpdateCaseType('updateCaseTypeForm')">保 存</el-button>
    </span>
  </el-dialog>
</template>
<script>
import {
  getAllFlowApi,
} from "@/api/system";
import { getQueryCaseTypeListApi,saveOrUpdateTypicalCase } from "@/api/caseHandle";
import iLocalStroage from "@/common/js/localStroage";
export default {
  data() {
    return {
      visible: false,
      updateCaseTypeForm: {
        caseNumber: "",
        reviews:"",
        caseType: "",
        organName:"",
        caseName:"",
        zfml:"",
        caseId:"",
        id:''
      },
      organList:[],
      selectLoading: false,
      branchInfo:['公路路政','道路运政','水路运政','航道运政','港口行政','航道行政','海事行政','工程质量安全监督','其他'],
      caseTypeList:[],
      rules: {
        reviews: [{ required: true, message: "请输入案件点评", trigger: "blur" }],
      },
      dialogTitle: "", //弹出框title
      processList:[] //流程列表
    };
  },
  inject: ["reload"],
  methods: {
    showModal(data) {
      console.log(data)
      this.visible = true;
      this.dialogTitle = "修改案件点评";
      this.updateCaseTypeForm.caseNumber = data.caseNumber;
      this.updateCaseTypeForm.reviews = data.reviews;
      this.updateCaseTypeForm.caseType = data.caseType;
      this.updateCaseTypeForm.organName = data.organName;
      this.updateCaseTypeForm.caseName = data.caseName;
      this.updateCaseTypeForm.zfml = data.zfml;
      this.updateCaseTypeForm.caseId = data.caseId;
      this.updateCaseTypeForm.id = data.id;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    //修改案件
    addOrUpdateCaseType(formName) {
      let _this = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          saveOrUpdateTypicalCase(_this.updateCaseTypeForm).then(
            res=>{
              if(res.code==200){
                _this.$message({
                    type: "success",
                    message: "修改成功"
                  });
                  _this.visible = false;
                  _this.reload();
              }else{
                this.$message.error(res.msg);
              }
            }
          )
        }
      })
    },
    //查询所有案件类型
    getQueryCaseTypeList() {
      getQueryCaseTypeListApi().then(
        res => {
          this.caseTypeList = res.data;
        },
        error => {
          console.log(error)
        }
      );
    },
    //获取机构
    getAllOrgan(organId) {
      let _this = this
      this.$store.dispatch("getAllOrgan").then(
        res => {
          _this.organList = res.data;
        },
        err => {
        }
      );
    },
  },
  mounted(){
    this.getAllOrgan();
    this.getQueryCaseTypeList();
  }
};
</script>
