<template>
  <div class="box">
    <div class="content_box">
    <div class="content">
      <div class="content_title">勘验笔录</div>
      <div class="border_blue"></div>
      <div class="content_form">
        <el-form :inline="true" :model="inquestNotesForm" :rules="rules">
          <div class="row">
            <el-form-item prop="caseName" label="案由：" label-width="100px">
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
            <div class="col">
            <el-form-item label="勘验时间：" prop="inquestStartTime" label-width="135px">
              <el-date-picker v-model="inquestNotesForm.inquestStartTime" ref="inquestStartTime"></el-date-picker>
            </el-form-item>
            <el-form-item label="至" label-width="100px">
              <el-time-picker v-model="inquestNotesForm.inquestEndTime" ref="inquestEndTime"></el-time-picker>
            </el-form-item>
            </div>
          </div>
          <div class="row">
            <div class="col">
            <el-form-item label="勘验场所：" prop="inquestAddress" label-width="135px">
              <el-input
                id="inquestAddress"
                v-model="inquestNotesForm.inquestAddress"
                ref="inquestAddress"
              ></el-input>
            </el-form-item>
            </div>
            <div class="col">
            <el-form-item label="天气情况：" prop="weather" label-width="135px">
              <el-select v-model="inquestNotesForm.weather" ref="weather"></el-select>
            </el-form-item>
            </div>
          </div>
          <div class="row">
            <el-form-item label="勘验人员1：" label-width="135px">
              <el-input id="inquestStaff" v-model="inquestNotesForm.inquestStaff1"></el-input>
            </el-form-item>
            <el-form-item label="单位及职务：" label-width="135px">
              <el-input id="staffUnitAndPosition" v-model="inquestNotesForm.staffUnitAndPosition1"></el-input>
            </el-form-item>
            <el-form-item label="执法证号：" label-width="135px">
              <el-input id="staffCerti_No" v-model="inquestNotesForm.staffCerti_No1"></el-input>
            </el-form-item>
          </div>
          <div class="row">
            <el-form-item label="勘验人员2：" label-width="135px">
              <el-select class="w-120" id="inquestStaff" v-model="inquestNotesForm.inquestStaff2"></el-select>
            </el-form-item>
            <el-form-item label="单位及职务：" label-width="135px">
              <el-input id="staffUnitAndPosition" v-model="inquestNotesForm.staffUnitAndPosition2"></el-input>
            </el-form-item>
            <el-form-item label="执法证号：" label-width="135px">
              <el-input id="staffCerti_No" v-model="inquestNotesForm.staffCerti_No2"></el-input>
            </el-form-item>
          </div>
          <div class="row">
             <el-form-item label="现场人员基本情况：" label-width="160px"></el-form-item>
          </div>
          <div class="row">
            <el-form-item label="当事人（代理人）姓名：" label-width="170px">
              <el-input></el-input>
            </el-form-item>&#8195;&#8195;
            <el-form-item label="身份证号：" label-width="135px">
              <el-input id="partyIdentify" v-model="inquestNotesForm.partyIdentify"></el-input>
            </el-form-item>
          </div>
          <div class="row">
            <el-form-item label="性别：" label-width="100px">
              <el-select id="sex" v-model="inquestNotesForm.sex">
                <!-- <el-option>男</el-option>
                <el-option>女</el-option> -->
              </el-select>
            </el-form-item>
            <el-form-item label="年龄：" label-width="100px">
              <el-input id="age" v-model="inquestNotesForm.age"></el-input>
            </el-form-item>&#8195;&#8195;
            <el-form-item label="单位及职务：" label-width="135px">
              <el-input id="unitAndPosition" v-model="inquestNotesForm.unitAndPosition"></el-input>
            </el-form-item>
          </div>
          <div class="row">
            <el-form-item label="住址：" label-width="100px">
              <el-input v-model="inquestNotesForm.address" id="address"></el-input>
            </el-form-item>
            <el-form-item label="联系电话：" label-width="135px">
              <el-input v-model="inquestNotesForm.telphone" id="telphone"></el-input>
            </el-form-item>
          </div>
          <div class="row">
            <el-form-item label="被邀请人：" label-width="135px">
              <el-input v-model="inquestNotesForm.invited" id="invited"></el-input>
            </el-form-item>
            <el-form-item label="单位及职务：" label-width="135px">
              <el-input
                v-model="inquestNotesForm.invitedUnitAndPosition"
                id="invitedUnitAndPosition"
              ></el-input>
            </el-form-item>
          </div>
          <div class="row">
            <el-form-item label="记录人：" label-width="120px">
              <el-input v-model="inquestNotesForm.recorder" id="recorder"></el-input>
            </el-form-item>
            <el-form-item label="单位及职务：" label-width="135px">
              <el-input
                v-model="inquestNotesForm.recorderUnitAndPosition"
                id="recorderUnitAndPosition"
              ></el-input>
            </el-form-item>
          </div>
          <div class="row">
            <el-form-item label="勘验情况及结果：" label-width="135px">
              <textarea v-model="inquestNotesForm.inquestResult" id="inquestResult"></textarea>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="border_blue"></div>
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
        caseName: [{ required: true, message: "案由必须填写" ,trigger:blur}]
      }
    };
  }
};
</script>
<style lang="less">
@import "../../../css/caseHandle/caseDocument.less";
</style>
