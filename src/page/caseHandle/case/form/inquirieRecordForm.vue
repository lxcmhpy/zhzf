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
          询问笔录
        </div>
        <div class="border_blue"></div>
        <el-form ref="docForm" :model="docData" label-width="135px">
          <div class="content_form">
            <div class="row">
              <div class="col">
                <el-form-item label="案发时间">
                  <el-input ref="afsj" clearable class="w-120" v-model="docData.afsj" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="第">
                  <el-input ref="inquireNum" clearable class="w-120 ask_number" v-model="docData.inquireNum" size="small" placeholder="请输入">
                    <template slot="append">次问询</template>
                  </el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="地点">
                  <el-input ref="inquireAdress" clearable class="w-120" v-model="docData.inquireAdress" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="询问人">
                  <el-input ref="inquireMan" clearable class="w-120" v-model="docData.inquireMan" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="记录人">
                  <el-input ref="inquireRecordMan" clearable class="w-120" v-model="docData.inquireRecordMan" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="被询问人">
                  <el-input ref="inquireAskMan" clearable class="w-120" v-model="docData.inquireAskMan" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="与案件关系">
                  <el-input ref="inquireRelation" clearable class="w-120" v-model="docData.inquireRelation" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="性别">
                  <el-input ref="inquireSex" clearable class="w-120" v-model="docData.inquireSex" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="年龄">
                  <el-input ref="inquireAge" clearable class="w-120" v-model="docData.inquireAge" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="身份证号">
                  <el-input ref="inquireManNum" clearable class="w-120" v-model="docData.inquireManNum" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="联系电话">
                  <el-input ref="inquireManPhone" clearable class="w-120" v-model="docData.inquireManPhone" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="工作单位">
                  <el-input ref="inquireManWorkName" clearable class="w-120" v-model="docData.inquireManWorkName" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="职务">
                  <el-input ref="inquireManPosition" clearable class="w-120" v-model="docData.inquireManPosition" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="联系地址">
                  <el-input ref="inquireManAdress" clearable class="w-120" v-model="docData.inquireManAdress" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="执法人员1">
                  <el-input ref="inquirePoliceName1" clearable class="w-120" v-model="docData.inquirePoliceName1" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="证件号">
                  <el-input ref="inquirePoliceNum1" clearable class="w-120" v-model="docData.inquirePoliceNum1" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="执法人员2">
                  <el-input ref="inquirePoliceName2" clearable class="w-120" v-model="docData.inquirePoliceName2" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="证件号">
                  <el-input ref="inquirePoliceNum2" clearable class="w-120" v-model="docData.inquirePoliceNum2" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>

          <div class="border_blue"></div>
          <div class="content_form bottom_form ">
            <div class="row">
              <div class="col">
                <el-form-item label="被询问人是否申请回避？" v-model="docData.inquireAviod" label-width="200px">
                  <el-radio v-model="radio" label="1">否</el-radio>
                  <el-radio v-model="radio" label="2">是</el-radio>
                </el-form-item>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <el-form-item label="问题1">
                  <el-row :gutter="10">
                    <el-col :span="22">
                      <el-input ref="caseNumber" clearable class="w-120" v-model="docData.caseNumber" size="small" placeholder="请输入"></el-input>
                    </el-col>
                  </el-row>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="回答">
                  <el-row :gutter="10">
                    <el-col :span="22">
                      <el-input type="textarea" class="height106" v-model="docData.caseNumber" size="small" placeholder="请输入"></el-input>
                    </el-col>
                  </el-row>
                </el-form-item>
              </div>
            </div>

            <span class="QAs" v-for="(domain, index) in dynamicValidateForm.domains" :key="domain.key">
              <div class="row">
                <div class="col">
                  <el-form-item :label="'问题' + (index+2)">
                    <el-row :gutter="10">
                      <el-col :span="22">
                        <el-input ref="caseNumber" clearable class="w-120" v-model="domain.question" size="small" placeholder="请输入"></el-input>
                      </el-col>
                      <el-col :span="1">
                        <i class="el-icon-delete-solid colorC0C5CA" @click="removeDomain"></i>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <el-form-item label="回答">
                    <el-row :gutter="10">
                      <el-col :span="22">
                        <el-input type="textarea" class="height106" v-model="domain.answer" size="small" placeholder="请输入"></el-input>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </div>
              </div>
            </span>
            <div class="row">
              <div class="col">
                <center class="add_text" @click="addQAs">
                  <i class="el-icon-circle-plus-outline"></i>
                  添加问题
                </center>
              </div>
            </div>
          </div>
        </el-form>
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

  </div>
</template>
<script>
export default {
  data() {
    return {
      // 问答数据
      dynamicValidateForm: {
        domains: [{
          question: '',
          answer: '',
        }],
      },
      //提交方式   0 暂存   1 提交
      handleType:"",
      docData: {
        afsj: '',
        inquireNum: '',
        inquireAdress: '',
        inquireMan: '',
        inquireRecordMan: '',
        inquireAskMan: '',
        inquireRelation: '',
        inquireSex: '',
        inquireAge: '',
        inquireManNum: '',
        inquireManPhone: '',
        inquireManWorkName: '',
        inquireManPosition: '',
        inquireManAdress: '',
        inquirePoliceNum1: '',
        inquirePoliceName1: '',
        inquirePoliceName2: '',
        inquirePoliceNum2: '',
        inquireAviod: '1',
        inquireQA: [],
      },
      CaseDocDataForm: {
        caseBasicinfoId: "2c902ae66ae2acc4016ae376f6f1007f",
        caseDoctypeId: "123",
        //文书数据
        docData: "",
        status: "",
      },
      radio: '1',
      rules: {
        caseNumber: [
          { required: true, message: '案号必须填写', trigger: 'blur' }
        ],
        caseName: [
          { required: true, message: '案由必须填写', trigger: 'blur' }
        ],
        partyType: [
          { required: true, message: '当事人类型必须填写', trigger: 'blur' }
        ],
        closeResult: [
          { required: true, message: '处理结果必须填写', trigger: 'blur' }
        ],
        closeSituation: [
          { required: true, message: '执行情况必须填写', trigger: 'blur' }
        ],
      },
      tableDatas: [{
        name: '立案',
        isApproval: '是',
        backName: '立案',
        isAutoPdf: '是',
        pdfType: '立案登记表',
        pdfType: '立案登记表',
        order: '1',
        adress: '../../jdfhu',
        discripe: '描述',
        workId: '11'
      }, {
        name: '调查类文书',
        isApproval: '否',
        backName: '调查',
        isAutoPdf: '否',
        pdfType: '',
        order: '2',
        adress: './kdsj',
        discripe: '描述',
        workId: '21',
      }],
    }
  },
  methods: {
    // 获取带入信息
    getCaseBasicInfo() {
      let data = {
        id: "2c902ae66ae2acc4016ae376f6f1007f"
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
      this.docData.inquireQA = this.dynamicValidateForm.domains;
      console.log('dynamicValidateForm', this.docData.inquireQA)
      console.log(this.CaseDocDataForm);
      this.$refs["docForm"].validate(valid => {
        if (valid) {
          this.$store.dispatch("addDocData", this.CaseDocDataForm).then(
            res => {
              console.log("保存文书", res);
              // this.$emit("getAllOrgan2", this.addDepartmentForm.oid);
              this.$message({
                type: "success",
                message: "保存成功",                
              });
              //修改文书状态
              this.updateDocStatus();
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
      // console.log(this.CaseDocDataForm.docData);

    },
    // 添加问题组合
    addQAs() {
      console.log('add')
      this.dynamicValidateForm.domains.push({
        question: '',
        answer: '',
        key: Date.now()
      });
    },
    // 删除问题组合
    removeDomain(item) {
      console.log('remove')
      var index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== 1) {
        this.dynamicValidateForm.domains.splice(index, 3)
      }
    },
    //修改文书状态
    updateDocStatus(){
      let data = {
        linkDocId : this.$route.params.id,
        casebasicInfoId : this.$route.params.id,
      };
      console.log(data);
      this.$store.dispatch("saveOrUpdateLink", data).then(
            res => {
              console.log("修改文书状态", res);
              this.$message({
                type: "success",
                message: "保存成功",
                //修改文书状态
              });
            },
            err => {
              console.log(err);
            }
          );
    }
  },
  mounted() {
    this.getCaseBasicInfo();
  },

}
</script>

<style lang="less" scoped>
@import "../../../../css/documentForm.less";
</style>
