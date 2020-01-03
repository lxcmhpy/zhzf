<template>
  <div class="box">
    <div class="header">
      <div class="header_left">
        <div class="triangle"></div>
        <div class="header_left_text">
          返回
        </div>
      </div>
    </div>
    <div class="content_box">
      <div class="content">
        <div class="content_title">
          勘验笔录
        </div>
        <el-form ref="docForm" :model="docData" label-width="135px" :rules="rules">
          <div class="border_blue"></div>
          <div class="content_form">
            <div class="row">
              <div class="col">
                <el-form-item prop="caseName" label="案由：">
                  <el-input type="textarea" ref="caseName" clearable class="height66" v-model="docData.caseName" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="勘验时间：">
                  <el-date-picker type="datetime"
                    format="yyyy-MM-dd HH:mm"
                    value-format="yyyy-MM-dd HH:mm" ref="inquestStartTime" clearable class="w-120" v-model="docData.inquestStartTime" size="small" placeholder="请输入"></el-date-picker>
                    至
                    <el-time-picker ref="inquestEndTime" clearable class="w-120" v-model="docData.inquestEndTime" size="small" placeholder="请输入"></el-time-picker>
                  </el-form-item>
              </div>
            </div>
            <div class="rows">
              <div class="col">
                <el-form-item prop="inquestAddress" label="勘验场所：">
                  <el-input ref="inquestAddress" clearable class="w-120" v-model="docData.inquestAddress" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="天气情况：">
                  <el-select v-model="docData.weather" placeholder="请选择">
                    <el-option></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="勘验人员1：">
                  <el-input ref="staff1" clearable class="w-120" v-model="docData.staff1" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="单位及职务：">
                  <el-input ref="staffUnitAndPosition1" clearable class="w-120" v-model="docData.staffUnitAndPosition1" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="执法证号：">
                  <el-input ref="certificateId1" clearable class="w-120" v-model="docData.certificateId1" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="勘验人员2：">
                  <el-input ref="staff2" clearable class="w-120" v-model="docData.staff2" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="单位及职务：">
                  <el-input ref="staffUnitAndPosition2" clearable class="w-120" v-model="docData.staffUnitAndPosition2" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="执法证号：">
                  <el-input ref="certificateId2" clearable class="w-120" v-model="docData.certificateId2" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>

          </div>
          <div class="border_blue"></div>
          <div class="content_form bottom_form">
            <el-row >
              <el-col :span="24">
                <div>
                  现场人员基本情况：
                </div>
              </el-col>
            </el-row>
            <div class="rows">
              <div class="col">
                <el-form-item prop="party" label="当事人（代理人）姓名：" class="line-height13">
                  <el-input ref="party" clearable class="w-120" v-model="docData.party" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="身份证件号：">
                  <el-input ref="partyIdNo" clearable class="w-120" v-model="docData.partyIdNo" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="性别：">
                  <el-select v-model="docData.partySex">
                    <el-option label="男"></el-option>
                    <el-option label="女"></el-option>
                  </el-select>
                  <!-- <el-input ref="partySex" clearable class="w-120" v-model="docData.partySex" size="small" placeholder="请输入"></el-input> -->
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="年龄：">
                  <el-input ref="partyAge" clearable class="w-120" v-model="docData.partyAge" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="单位及职务：">
                  <el-input ref="partyUnitAndPosition" clearable class="w-120" v-model="docData.partyUnitAndPosition" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="rows">
              <div class="col">
                <el-form-item label="住址：">
                  <el-input ref="partyAddress" clearable class="w-120" v-model="docData.partyAddress" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="联系电话：">
                  <el-input ref="partyTel" clearable class="w-120" v-model="docData.partyTel" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="border_blue"></div>
          <div class="content_form">
            <div class="rows">
              <div class="col">
                <el-form-item label="被邀请人：">
                  <el-input ref="invited" clearable class="w-120" v-model="docData.invited" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="单位及职务：">
                  <el-input ref="invitedUnitAndPosition" clearable class="w-120" v-model="docData.invitedUnitAndPosition" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div> 
            <div class="rows">
              <div class="col">
                <el-form-item prop ="recorder" label="记录人：">
                  <el-input ref="recorder" clearable class="w-120" v-model="docData.recorder" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="单位及职务：">
                  <el-input ref="recorderUnitAndPosition" clearable class="w-120" v-model="docData.recorderUnitAndPosition" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop = "inquestResult" label="勘验情况及结果：" class="line-height13">
                  <el-input type="textarea" ref="inquestResult" clearable class="height106" v-model="docData.inquestResult" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
          <!-- <div class="border_blue"></div> -->
        </el-form>
      </div>
    </div>
      <!-- 悬浮按钮 -->
      <div class="float-btns">
        <el-button type="primary" @click="addDocData(1)">
          <svg t="1577414377979" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1726" width="16" height="16">
            <path d="M414.273133 1024a19.76097 19.76097 0 0 1-19.741211-20.488101l8.762126-237.513979a19.749115 19.749115 0 0 1 4.202738-11.471084l503.439415-641.372015-822.359463 475.187017 249.409882 129.274208c9.688823 5.021748 13.47267 16.947289 8.450922 26.635125-5.023724 9.687835-16.946301 13.471682-26.635125 8.449934L38.362218 606.82539a19.758006 19.758006 0 1 1-0.793324-34.650361l932.344942-538.738859a19.759982 19.759982 0 0 1 29.505118 19.454706l-109.172395 912.697585a19.758994 19.758994 0 0 1-28.848132 15.124522L609.347756 847.568976l-181.518965 171.052626a19.754055 19.754055 0 0 1-13.555658 5.378398z m28.276109-250.126145l-6.748685 182.935685 156.731307-147.692555a19.76097 19.76097 0 0 1 22.780144-3.091294l239.112482 126.310359L950.834551 126.32913 442.549242 773.873855z" p-id="1727" fill="#FFFFFF"></path>
          </svg><br>
          提交</el-button>
        <el-button type="success" @click="addDocData(0)">
          <svg t="1577415780823" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2584" width="16" height="16">
            <path d="M98 124.1V902c0 14.3 11.6 25.9 25.9 25.9h777.9c14.3 0 25.9-11.6 25.9-25.9V124.1c0-14.3-11.6-25.9-25.9-25.9H123.9c-14.3 0-25.9 11.6-25.9 25.9z m207.4 37.6h414.9v191.7H305.4V161.7z m558.8 702.7H162.6V161.7h104v230.6h492.7V161.7h105v702.7z" p-id="2585" fill="#FFFFFF"></path>
            <path d="M605.1 191.9h70v128h-70z" p-id="2586" fill="#FFFFFF"></path>
          </svg>
          <br>
          暂存</el-button>
      </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      docData: {
      },
      caseDocDataForm: {
        id:"",   //修改的时候用
        caseBasicinfoId: "aa0f2161e5c1ae0d2619203eb63eb78d",   //案件ID
        caseDoctypeId: "2c9029ab655639600165564481f70001",    //文书类型ID
        //文书数据
        docData: "",
        status: "",   //提交状态
      },
      handleType:"",  // 0 暂存  1  提交
      rules: {
        inquestAddress: [
          { required: true, message: '勘验场所必须填写', trigger: 'blur' }
        ],
        caseName: [
          { required: true, message: '案由必须填写', trigger: 'blur' }
        ],
        party: [
          { required: true, message: '当事人必须填写', trigger: 'blur' }
        ],
        recorder: [
          { required: true, message: '记录人必须填写', trigger: 'blur' }
        ],
        inquestResult: [
          { required: true, message: '勘验情况及结果必须填写', trigger: 'blur' }
        ],
      },
    }
  },
  methods: {
    // 获取带入信息
    getCaseBasicInfo() {
      let data = {
        id: "aa0f2161e5c1ae0d2619203eb63eb78d"
      };
      this.$store.dispatch("getCaseBasicInfo", data).then(
        res => {
          this.docData = res.data;
        },
        err => {
          console.log(err);
        }
      );
    },

    // 提交表单
    addDocData(handleType) {
      this.caseDocDataForm.docData = JSON.stringify(this.docData);
      this.caseDocDataForm.status = handleType;
      console.log(this.caseDocDataForm);
      this.$refs["docForm"].validate(valid => {
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
        } else {
          console.log('error submit!!');
          return false;
        }

      });
      
    },  
    //根据案件ID和文书Id获取数据
    getDocDataByCaseIdAndDocId() {
      let data = {
        caseId: "aa0f2161e5c1ae0d2619203eb63eb78d",
        docId: "2c9029ab655639600165564481f70001"
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
            this.docData = JSON.parse(res.data[0].docData);
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  },
  mounted() {
    this.getDocDataByCaseIdAndDocId();
  },

}
</script>

<style lang="less" scoped>
@import "../../../css/documentForm.less";
</style>
