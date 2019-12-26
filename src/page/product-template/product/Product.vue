<template>
  <div class="box">
    <div class="content">
      <div class="content_title">勘验笔录</div>
      <div class="content_form">
        <el-form :inline="true" :model="inquestNotesForm" :rules="rules">
          <div class="row">
            <el-form-item prop="caseName" label="案由：">
              &#8195;
              <textarea
                ref="caseName"
                id="caseName"
                v-model="inquestNotesForm.caseName"
                required
              ></textarea>
            </el-form-item>
          </div>
          <div class="row">
            <el-form-item label="勘验时间：" prop="inquestStartTime">
              <el-date-picker v-model="inquestNotesForm.inquestStartTime" ref="inquestStartTime"></el-date-picker>
            </el-form-item>
            <el-form-item label="至">
              <el-time-picker v-model="inquestNotesForm.inquestEndTime" ref="inquestEndTime"></el-time-picker>
            </el-form-item>
          </div>
          <div class="row">
            <el-form-item label="勘验场所：" prop="inquestAddress">
              <el-input
                id="inquestAddress"
                v-model="inquestNotesForm.inquestAddress"
                ref="inquestAddress"
              ></el-input>
            </el-form-item>
            <el-form-item label="天气情况：" prop="weather">
              <el-select v-model="inquestNotesForm.weather" ref="weather"></el-select>
            </el-form-item>
          </div>
          <div class="row">
            <el-form-item label="勘验人员1：">
              <el-input id="inquestStaff" v-model="inquestNotesForm.inquestStaff1"></el-input>
            </el-form-item>
            <el-form-item label="单位及职务：">
              <el-input id="staffUnitAndPosition" v-model="inquestNotesForm.staffUnitAndPosition1"></el-input>
            </el-form-item>
            <el-form-item label="执法证号：">
              <el-input id="staffCerti_No" v-model="inquestNotesForm.staffCerti_No1"></el-input>
            </el-form-item>
          </div>
          <div class="row">
            <el-form-item label="勘验人员2：">
              <el-select class="w-120" id="inquestStaff" v-model="inquestNotesForm.inquestStaff2"></el-select>
            </el-form-item>
            <el-form-item label="单位及职务：">
              <el-input id="staffUnitAndPosition" v-model="inquestNotesForm.staffUnitAndPosition2"></el-input>
            </el-form-item>
            <el-form-item label="执法证号：">
              <el-input id="staffCerti_No" v-model="inquestNotesForm.staffCerti_No2"></el-input>
            </el-form-item>
          </div>
          <div class="row">
            <el-form-item label="现场人员基本情况："></el-form-item>
          </div>
          <div class="row">
            <el-form-item label="当事人（代理人）姓名：">
              <el-input></el-input>
            </el-form-item>&#8195;&#8195;
            <el-form-item label="身份证号：">
              <el-input id="partyIdentify" v-model="inquestNotesForm.partyIdentify"></el-input>
            </el-form-item>
          </div>
          <div class="row">
            <el-form-item label="性别：">
              <el-select id="sex" v-model="inquestNotesForm.sex">
                <el-option>男</el-option>
                <el-option>女</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="年龄：">
              <el-input id="age" v-model="inquestNotesForm.age"></el-input>
            </el-form-item>&#8195;&#8195;
            <el-form-item label="单位及职务：">
              <el-input id="unitAndPosition" v-model="inquestNotesForm.unitAndPosition"></el-input>
            </el-form-item>
          </div>
          <div class="row">
            <el-form-item label="住址：">
              <el-input v-model="inquestNotesForm.address" id="address"></el-input>
            </el-form-item>
            <el-form-item label="联系电话：">
              <el-input v-model="inquestNotesForm.telphone" id="telphone"></el-input>
            </el-form-item>
          </div>
          <div class="row">
            <el-form-item label="被邀请人：">
              <el-input v-model="inquestNotesForm.invited" id="invited"></el-input>
            </el-form-item>
            <el-form-item label="单位及职务：">
              <el-input
                v-model="inquestNotesForm.invitedUnitAndPosition"
                id="invitedUnitAndPosition"
              ></el-input>
            </el-form-item>
          </div>
          <div class="row">
            <el-form-item label="记录人：">
              <el-input v-model="inquestNotesForm.recorder" id="recorder"></el-input>
            </el-form-item>
            <el-form-item label="单位及职务：">
              <el-input
                v-model="inquestNotesForm.recorderUnitAndPosition"
                id="recorderUnitAndPosition"
              ></el-input>
            </el-form-item>
          </div>
          <div class="row">
            <el-form-item label="勘验情况及结果：">
              <textarea v-model="inquestNotesForm.inquestResult" id="inquestResult"></textarea>
            </el-form-item>
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
      inquestNotesForm: {
        caseName: "",
        inquestStartTime: "",
        inquestEndTime: "",
        inquestAddress: "",
        weather: "",
        inquestStaff1:"",
        staffUnitAndPosition1:"",
        staffCerti_No1:"",
        inquestStaff2:"",
        staffUnitAndPosition2:"",
        staffCerti_No2:"",
        partyIdentify:"",
        sex:"",
        age:"",
        address:"",
        telphone:"",
        invited:"",
        invitedUnitAndPosition:"",
        recorder:"",
        recorderUnitAndPosition:"",
        inquestResult:""
      },
      rules: {
        caseName: [{ required: true, message: "案由必须填写" }]
      }
    };
  }
};
</script>
<style lang="less">
@import "../../../css/caseHandle/caseDocument.less";
</style>
