<template>
  <div class="box">
    <div class="header">
      <div class="header_left">
        <div class="triangle"></div>
        <div class="header_left_text">返回</div>
      </div>
    </div>
    <div class="content_box">
      <div class="content">
        <div class="content_title">责令改正违法行为通知书</div>
        
        <el-form :inline="true" :model="formData" :rules="rules" label-width="135px">
        <div class="border_blue"></div>
        <div class="content_form">
          
            <div class="row">
              <el-form-item label="当事人姓名：">
                <el-input style="width:600px;" v-model="formData.party"></el-input>
              </el-form-item>
            </div>
            <div class="row">
              <el-form-item label="违法行为：">
                <el-input style="width:600px;" v-model="formData.caseCauseNameCopy"></el-input>
              </el-form-item>
            </div>
            <div class="row">
              <el-form-item label="处罚依据：">
                <el-input style="width:600px;" v-model="formData.punishLaw"></el-input>
              </el-form-item>
            </div>
        </div>
        <div class="border_blue"></div>
        <div class="content_form">    
              <div class="row">
              <div class="col">
                <el-form-item  label="责令要求：" >
                  <el-radio-group v-model="formData.radioList1">
                    <el-row>
                      <el-col :span="10">
                        <el-radio label="立即予以改正"></el-radio>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="10">
                        <el-radio label="限期改正或整改完毕"></el-radio>
                      </el-col>
                      <el-col :span="10">
                        <el-date-picker
                          v-model="formData.correctTime"
                          type="datetime"
                          format="yyyy-MM-dd HH:mm"
                          value-format="yyyy-MM-dd HH:mm"
                        ></el-date-picker>
                      </el-col>
                    </el-row>                   
                  </el-radio-group>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item  label="行政复议机构：" >
                  <el-checkbox-group v-model="formData.checkList1">
                    <el-row>
                      <el-col :span="10">
                        <el-checkbox label="复议机构名称1"></el-checkbox>
                      </el-col>
                      <el-col :span="13">
                        <el-input v-model="formData.name1"></el-input>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="10">
                        <el-checkbox label="复议机构名称2"></el-checkbox>
                      </el-col>
                      <el-col :span="13">
                        <el-input v-model="formData.name2"></el-input>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="10">
                        <el-checkbox label="复议机构名称3"></el-checkbox>
                      </el-col>
                      <el-col :span="13">
                        <el-input v-model="formData.name3"></el-input>
                      </el-col>
                    </el-row>                    
                   
                  </el-checkbox-group>
                </el-form-item>
              </div>
            </div>            
            <div class="row">
              <div class="col">
                <el-form-item  label="行政诉讼：" >
                  <el-checkbox-group v-model="formData.checkList2">
                    <el-row>
                      <el-col :span="10">
                        <el-checkbox label="诉讼机构名称1"></el-checkbox>
                      </el-col>
                      <el-col :span="13">
                        <el-input v-model="formData.name4"></el-input>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="10">
                        <el-checkbox label="诉讼机构名称2"></el-checkbox>
                      </el-col>
                      <el-col :span="13">
                        <el-input v-model="formData.name5"></el-input>
                      </el-col>
                    </el-row>                   
                  </el-checkbox-group>
                </el-form-item>
              </div>
            </div>
          
        </div>
        </el-form>
        <!-- <div class="border_blue"></div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        radioList:"",
        correctTime:"",
        checkList1:"",
        checkList2:"",
        name1:"",
        name2:"",
        name3:"",
        name4:"",
        name5:"",
      },
      rules: {
        caseName: [
          { required: true, message: "当事人姓名必须填写", trigger: blur }
        ]
      }
    };
  }
};
</script>
<style lang="less">
// @import "../../../css/caseHandle/caseDocument.less";
@import "../../../../css/documentForm.less";
</style>
