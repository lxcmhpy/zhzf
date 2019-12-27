<template>
  <div class="box">
    <div class="content_box">
      <div class="content">
        <div class="content_title">违法行为通知书</div>
        <el-form :inline="true" ref="illegalActForm" :model="illegalActForm" label-width="135px" :rules="rules">
          <div class="border_blue"></div>
          <div class="content_form">
            <!-- <div class="row">
              <div class="col">
                <el-form-item label>
                  <el-input
                    ref="id"
                    clearable
                    class="w-120"
                    v-model="illegalActForm.id"
                    size="small"
                    placeholder="请输入"
                    hidden
                  ></el-input>
                </el-form-item>
              </div>
            </div>-->
            <div class="row">
              <div class="col">
                <el-form-item label="案号：">
                  <el-input
                    ref="caseNumber"
                    clearable
                    class="w-120"
                    v-model="illegalActForm.caseNumber"
                    size="small"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="party" label="当事人姓名：">
                  <el-input
                    id="width600px"
                    ref="party"
                    clearable
                    class="w-120"
                    v-model="illegalActForm.party"
                    size="small"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="违法行为：">
                  <el-input
                    id="width600px"
                    ref="caseCauseNameCopy"
                    clearable
                    class="w-120"
                    v-model="illegalActForm.caseCauseNameCopy"
                    size="small"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="违法依据：">
                  <el-input
                    id="width600px"
                    ref="illegalBasis"
                    clearable
                    class="w-120"
                    v-model="illegalActForm.illegalBasis"
                    size="small"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="处罚依据：">
                  <el-input
                    id="width600px"
                    ref="punishLaw"
                    clearable
                    class="w-120"
                    v-model="illegalActForm.punishLaw"
                    size="small"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="拟处罚决定：">
                  <el-input
                    id="width600px"
                    ref="punishDecision"
                    clearable
                    class="w-120"
                    v-model="illegalActForm.punishDecision"
                    size="small"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="border_blue"></div>
          <div class="content_form bottom_form">
            <div>
              <div class="row">
                <el-form-item label="当事人权利：">
                  <el-checkbox></el-checkbox>陈述申辩权利
                </el-form-item>
              </div>
              <div class="row">
                <el-form-item label>
                  &#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;
                  <el-checkbox></el-checkbox>举行听证权利
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="border_blue"></div>
          <div class="content_form bottom_form">
            <div class="row">
              <div class="col">
                <el-form-item label="联系地址：">
                  <el-input
                    id="width200px"
                    ref="partyAddress"
                    clearable
                    class="w-120"
                    v-model="illegalActForm.partyAddress"
                    size="small"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="邮编：">
                  <el-input
                    id="width200px"
                    ref="partyZipCode"
                    clearable
                    class="w-120"
                    v-model="illegalActForm.partyZipCode"
                    size="small"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="联系人：">
                  <el-input
                    id="width200px"
                    ref="party"
                    clearable
                    class="w-120"
                    v-model="illegalActForm.party"
                    size="small"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="联系电话 ：">
                  <el-input
                    id="width200px"
                    ref="partyTel"
                    clearable
                    class="w-120"
                    v-model="illegalActForm.partyTel"
                    size="small"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
        </el-form>
      </div>
      <div class="float-btns">
        <el-button type="primary" @click="addIllegalAction">
          <svg
            t="1577414377979"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1726"
            width="16"
            height="16"
          >
            <path
              d="M414.273133 1024a19.76097 19.76097 0 0 1-19.741211-20.488101l8.762126-237.513979a19.749115 19.749115 0 0 1 4.202738-11.471084l503.439415-641.372015-822.359463 475.187017 249.409882 129.274208c9.688823 5.021748 13.47267 16.947289 8.450922 26.635125-5.023724 9.687835-16.946301 13.471682-26.635125 8.449934L38.362218 606.82539a19.758006 19.758006 0 1 1-0.793324-34.650361l932.344942-538.738859a19.759982 19.759982 0 0 1 29.505118 19.454706l-109.172395 912.697585a19.758994 19.758994 0 0 1-28.848132 15.124522L609.347756 847.568976l-181.518965 171.052626a19.754055 19.754055 0 0 1-13.555658 5.378398z m28.276109-250.126145l-6.748685 182.935685 156.731307-147.692555a19.76097 19.76097 0 0 1 22.780144-3.091294l239.112482 126.310359L950.834551 126.32913 442.549242 773.873855z"
              p-id="1727"
              fill="#FFFFFF"
            />
          </svg>
          <br />提交
        </el-button>
        <el-button type="success">
          <svg
            t="1577415780823"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2584"
            width="16"
            height="16"
          >
            <path
              d="M98 124.1V902c0 14.3 11.6 25.9 25.9 25.9h777.9c14.3 0 25.9-11.6 25.9-25.9V124.1c0-14.3-11.6-25.9-25.9-25.9H123.9c-14.3 0-25.9 11.6-25.9 25.9z m207.4 37.6h414.9v191.7H305.4V161.7z m558.8 702.7H162.6V161.7h104v230.6h492.7V161.7h105v702.7z"
              p-id="2585"
              fill="#FFFFFF"
            />
            <path d="M605.1 191.9h70v128h-70z" p-id="2586" fill="#FFFFFF" />
          </svg>
          <br />暂存
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      illegalActForm: {
        caseNumber: "",
        party: "",
        caseCauseNameCopy: "",
        illegalBasis: "",
        punishLaw: "",
        punishDecision: "",
        partyAddress: "",
        partyZipCode: "",
        // contactPerson:"",
        partyTel: ""
      },
      rules: {
        party: [
          { required: true, message: "当事人姓名必须填写", trigger: "blur" }
        ]
      },
      CaseDocDataForm: {
        caseBasicinfoId: "2c902ae66ae2acc4016ae376f6f1007f",
        caseDoctypeId: "123",
        //文书数据
        docData:"",
        status:"",        

      }
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
          this.illegalActForm = res.data;
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
    //提交结案表单
    addIllegalAction() {
      console.log(this.CaseDocDataForm);
      // this.$refs[docForm].validate(valid => {
      //   if (valid && !this.errorName) {
      //     this.formName.status = "保存";
      //     // this.formName.status = "保存";
      //     this.$store.dispatch("addIllegalAction", this.docForm).then(
      //       res => {
      //         console.log("保存文书", res);
      //         // this.$emit("getAllOrgan2", this.addDepartmentForm.oid);
      //         this.$message({
      //           type: "success",
      //           // message: this.handelType == 0 ? "添加成功!" : "修改成功"
      //         });
      //         this.visible = false;
      //       },
      //       err => {
      //         console.log(err);
      //       }
      //     );
      //   }
      // });
      // console.log(this.CaseDocDataForm.docData);
      // this.CaseDocDataForm.docData=JSON.stringify(this.illegalActForm);
      this.$store.dispatch("addDocData", this.CaseDocDataForm).then(
            res => {
              console.log("保存文书", res);
              // this.$emit("getAllOrgan2", this.addDepartmentForm.oid);
              this.$message({
                type: "success",
                message:"保存成功"
                
              });
              // this.illegalActForm = res.data.docData;
            },
            err => {
              console.log(err);
            }
          );
    }
  },
  created() {
    this.getCaseBasicInfo();
  }
};
</script>
<style lang="less" scoped>
@import "../../../css/caseHandle/caseDocument.less";
@import "../../../css/documentForm.less";
</style>
