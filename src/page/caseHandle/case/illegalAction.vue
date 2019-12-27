<template>
  <div class="box">
    <div class="content_box">
      <div class="content">
        <div class="content_title">违法行为通知书</div>
        <el-form :inline="true" :model="illegalActForm" label-width="135px" :rules="rules">
          <div class="border_blue"></div>
          <div class="content_form">
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
              <el-form-item label="行政复议机构：" >
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
                    ref="contactPerson"
                    clearable
                    class="w-120"
                    v-model="illegalActForm.contactPerson"
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
        illegalBasis:"",
        punishLaw:"",
        punishDecision:"",
        partyAddress:"",
        partyZipCode:"",
        contactPerson:"",
        partyTel:""
      },
      rules: {
        partyName: [
          { required: true, message: "当事人姓名必须填写", trigger: "blur" }
        ]
      },
      personnelList: [1, 2, 3]
    };
  },
  methods: {
    getCaseBasicInfo(){
      let data = {
        id:"2c902ae66ae2acc4016ae376f6f1007f",
      };
      this.$store.dispatch("getCaseBasicInfo",data).then(
        res => {
          console.log("获取案件详情", res);
          // this.tableData = res.data.records;
          // this.totalPage = res.data.total;
          this.illegalActForm=res.data;
        },
        err => {
          console.log(err);
        }
      );
    },
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
