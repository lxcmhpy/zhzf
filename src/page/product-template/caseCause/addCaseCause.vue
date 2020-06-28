<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="30%"
    append-to-body
  >
    <el-form
      :model="addCaseCauseForm"
      ref="addCaseCauseForm"
      class="errorTipForm"
      label-width="110px"
      prop="addCaseCauseForm"
    >
      <div class="item">
        <el-form-item label="业 务 领 域" prop="categoryId" v-if="isAdd" class="is-required">
          <el-select
            v-model="addCaseCauseForm.categoryId"
            style="width:100%"
            placeholder="请选择业务领域"
            @change="getHylbByLaw"
          >
            <el-option
              v-for="item in lawCateList"
              :key="item.cateId"
              :label="item.cateName"
              :value="item.cateId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务领域" v-else>
          <el-input
            v-model="addCaseCauseForm.category"
            style="width:100%"
            placeholder="请选择执法机构"
            disabled
          ></el-input>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="行 业 类 别" prop="hyType">
          <el-select v-model="addCaseCauseForm.hyTypeId" style="width:100%" placeholder="请选择行业类别">
            <el-option
              v-for="item in hyTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="行业类别" v-else>
          <el-input
            v-model="addCaseCauseForm.hyType"
            style="width:100%"
            placeholder="请选择行业类别"
            disabled
          ></el-input>
        </el-form-item> -->
      </div>
      <div class="item">
        <el-form-item label="违法行为编码" prop="strNumber" class="is-required">
          <el-input v-model="addCaseCauseForm.strNumber"></el-input>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="违法行为内容" prop="strContent" class="is-required">
          <el-input v-model="addCaseCauseForm.strContent" type="textarea"></el-input>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="说  明 " prop="strRemark" class="is-required">
          <el-input v-model="addCaseCauseForm.strRemark"></el-input>
        </el-form-item>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="addOrEditCaseCause('addCaseCauseForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getLawCategoryApi, addCaseCauseApi } from "@/api/system";
export default {
  data() {
    return {
      visible: false,
      addCaseCauseForm: {
        id: "",
        categoryId: "",
        strNumber: "",
        strContent: "",
        category: "",
        hyType: "",
        categoryId: "",
        disId: "",
        hyTypeId: "",
        hyTypeCode: "",
        strRemark: ""
      },
      lawCateList: [],
      hyTypeList: [],
      dialogTitle: "", //弹出框title
      errorName: false, //添加name时的验证
      handelType: 0, //添加 0  修改2
      isAdd: true
    };
  },
  inject: ["reload"],
  created() {
    this.getEnforceLawType();
  },
  methods: {
    showModal(type, data) {
      this.visible = true;
      this.handelType = type;
      // this.dictData = data.row;
      // this.formType = formType;
      if (type == 0) {
        console.log(data);
        this.isAdd = true;
        this.dialogTitle = "新增";
        // this.addCaseCauseForm = {};
      } else if (type == 2) {
        console.log("111",data);
        this.isAdd = false;
        this.dialogTitle = "修改";
        this.addCaseCauseForm = data;
        this.getHylbByLaw(data.categoryId);
      }
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.$refs["addCaseCauseForm"].resetFields();
      this.visible = false;
    },
    //聚焦清除错误信息
    focusName() {
      this.errorName = false;
    },
    //获取行业类别
    getHylbByLaw(val) {
      let data = {
        pid: val
      };
      let _this = this;
      _this.addCaseCauseForm.hyType = "";
      getLawCategoryApi(data).then(res => {
        console.log("res", res);
        _this.hyTypeList = res.data;
      });
      err => {
        console.log(err);
      };
    },
    //获取业务领域
    getEnforceLawType() {
      let _this = this;
      this.$store.dispatch("getEnforceLawType", "1").then(
        res => {
          _this.lawCateList = res.data;
        },
        err => {
          console.log(err);
        }
      );
    },
    //新增修改
    addOrEditCaseCause(formName) {
      let _this = this;
      this.$refs[formName].validate(valid => {
        if (valid && !_this.errorName) {
          _this.addOrEditCaseCauseSure();
        }
      });
    },
    //新增 修改
    addOrEditCaseCauseSure() {
        console.log("data222", this.addCaseCauseForm);
        // debugger
        this.addCaseCauseForm.category = this.selectGet(this.addCaseCauseForm.categoryId);
        if(this.addCaseCauseForm.hyTypeId != "" && this.addCaseCauseForm.hyTypeId != null){
            this.addCaseCauseForm.hyTypeCode = this.addCaseCauseForm.hyTypeId;
            this.addCaseCauseForm.hyType = this.selectGetHyType(this.addCaseCauseForm.hyTypeId);
        }
      console.log("data", this.addCaseCauseForm);
      addCaseCauseApi(this.addCaseCauseForm).then(res => {
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
      });
    },
    // 通过下拉框的id获取执法门类内容
    selectGet(vId){ 
        let obj = {};
        obj = this.lawCateList.find((item)=>{ 
            return item.cateId === vId;
        });
        return obj.cateName;
        },
    selectGetHyType(vId){ 
        let obj = {};
        obj = this.hyTypeList.find((item)=>{ 
            return item.id === vId;
        });
        console.log("111",obj);
        return obj.name;
        },
     }
};
</script>
<style lang="scss" src="@/assets/css/systemManage.scss">
/* @import "@/assets/css/systemManage.scss"; */
</style>
