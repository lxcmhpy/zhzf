<template>
  <div class="box">
    <div class="content_box">
      <div class="content">
        <div class="content_title">责令改正违法行为通知书</div>
        <el-form ref="caseDocDataForm">
          <el-input ref="id" type="hidden"></el-input>
        </el-form>
        <el-form :inline="true" ref="formData" :model="formData" label-width="135px" :rules="rules">
          <div class="border_blue"></div>
          <div class="content_form">
            <el-form-item label="当事人姓名：" prop="caseNumber">
              <el-input ref="caseNumber" clearable class="w-120" v-model="formData.caseNumber" size="small" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item prop="party" label="违法事实：">
              <el-input id="width600px" ref="party" clearable class="w-120" v-model="formData.party" size="small" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item label="处罚依据：">
              <el-input id="width600px" ref="punishLaw" clearable class="w-120" v-model="formData.punishLaw" size="small" placeholder="请输入"></el-input>
            </el-form-item>

          </div>
          <div class="border_blue"></div>
          <div class="content_form bottom_form">
            <el-form-item label="责令要求：">
              <el-input id="width600px" ref="punishDecision" clearable class="w-120" v-model="formData.punishDecision" size="small" placeholder="请输入"></el-input>
            </el-form-item>
          </div>
          <div class="border_blue"></div>
          <div class="content_form">
            <el-form-item label="行政复议机构：">
              <el-input id="width600px" ref="punishDecision" clearable class="w-120" v-model="formData.punishDecision" size="small" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item label="行政诉讼机构：">
              <el-input id="width600px" ref="punishDecision" clearable class="w-120" v-model="formData.punishDecision" size="small" placeholder="请输入"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="float-btns">
        <el-button type="success" @click="addIllegalAction(0)">
           <i class="iconfont law-icon_zancun1"></i>
          <br />暂存
        </el-button>
        <el-button type="primary" @click="addIllegalAction(1)">
           <i class="iconfont law-icon_baocun1"></i>
          <br />保存
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        caseNumber: "",
        party: "",
        caseCauseNameCopy: "",
        illegalBasis: "",
        punishLaw: "",
        punishDecision: "",
        partyAddress: "",
        partyZipCode: "",
        // contactPerson:"",
        partyTel: "",
        checkBoxList: ""
      },
      rules: {
        party: [
          { required: true, message: "当事人姓名必须填写", trigger: "blur" }
        ]
      },
      caseDocDataForm: {
        id: "",
        caseBasicinfoId: "",
        caseDoctypeId: "",
        //文书数据
        docData: "",
        status: ""
      },
      handelType: 0 //0 提交  1 暂存  2  修改
    };
  },
  methods: {
    //获取案件信息
    getCaseBasicInfo() {
      let data = {
        id: "2c902ae66ae2acc4016ae376f6f1007f"
      };
      this.$store.dispatch("getCaseBasicInfo", data).then(
        res => {
          console.log("获取案件详情", res);
          this.formData = res.data;
        },
        err => {
          console.log(err);
        }
      );
    },
    //聚焦清除错误信息
    focusName() {
      this.errorName = false;
    },
    //保存违法行为通知书(提交生成pdf之后不可以修改，暂存之后可以修改)
    addIllegalAction(handelType) {
      this.caseDocDataForm.caseBasicinfoId = "12345666666666";
      this.caseDocDataForm.caseDoctypeId = "1234";
      this.caseDocDataForm.docData = JSON.stringify(this.formData);
      if (handelType == 0) {
        this.caseDocDataForm.status = 0;
      } else {
        this.caseDocDataForm.status = 1;
      }
      this.$refs["formData"].validate(valid => {
        if (valid) {
          this.$store.dispatch("addDocData", this.caseDocDataForm).then(
            res => {
              console.log("保存文书", res);
              // this.$emit("getAllOrgan2", this.addDepartmentForm.oid);
              this.$message({
                type: "success",
                message: "保存成功"
              });
            },
            err => {
              console.log(err);
            }
          );
        }
      });
    },
    getDocDataByCaseIdAndDocId() {
      let data = {
        caseId: "12345666666666",
        docId: "1234"
      };
      this.$store.dispatch("getDocDataByCaseIdAndDocId", data).then(
        res => {
          console.log("获取文书详情", res);
          //如果为空，则加载案件信息
          if (res.data.length == 0) {
            this.getCaseBasicInfo();
          } else {
            console.log(res.data[0]);
            this.caseDocDataForm.id = res.data[0].id;
            this.formData = JSON.parse(res.data[0].docData);
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  },
  created() {
    //加载文书信息
    // this.getDocDataByCaseIdAndDocId();
  }
};
</script>
<style lang="scss" src="@/assets/css/documentForm.scss"></style>
