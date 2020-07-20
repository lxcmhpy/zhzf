<template>
  <div class="print_box" id="btnB">
    <div class="print_info" id="forceCorrect-print">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="formData" :class="isPdf">
        <div class="doc_topic">责令改正违法行为通知书</div>
        <!-- <div class="doc_number">案号：{{formData.caseNumber}}</div> -->
        <p class="partyBox">
          当事人（个人姓名或单位名称）
          <span class="width_file">
            <el-form-item prop="party" :rules="fieldRules('party',propertyFeatures['party'],'',isParty)">
              <el-input :disabled="!isParty || fieldDisabled(propertyFeatures['party'])" v-model="formData.party" :autosize="{ minRows: 1, maxRows: 3}" :maxLength="maxLength"></el-input>
            </el-form-item> ：
          </span>
        </p>
        <!-- 多行样式 -->
        <p>经调查，你（单位）存在下列违法事实：</p>
        <div class="overflow_lins_style">
          <div class="overflow_lins">
            <el-form-item prop="caseName" :rules="fieldRules('caseName',propertyFeatures['caseName'])">
              <el-input :disabled="fieldDisabled(propertyFeatures['caseName'])" class="overflow_lins_textarea" type="textarea" v-model="formData.caseName" rows="3" maxlength="75"></el-input>
              <span class="span_bg span_bg_top" @click="overFlowEdit">&nbsp;</span>
              <span v-for="item in overFlowEditList" :key="item.id" class="span_bg" @click="overFlowEdit">&nbsp;</span>
            </el-form-item>
          </div>
        </div>

        <p>
          根据
          <span contenteditable="true">
            <el-form-item prop="punishLaw" style="width:300px" :rules="fieldRules('punishLaw',propertyFeatures['punishLaw'])">
              <el-input type="textarea" v-model="formData.punishLaw" :autosize="{ minRows: 1, maxRows: 3}" :maxLength="maxLength" :disabled="fieldDisabled(propertyFeatures['punishLaw'])"></el-input>
            </el-form-item>
          </span>的规定，现责令你（单位）
        </p>
        <el-form-item prop="correctWay" :rules="fieldRules('correctWay',propertyFeatures['correctWay'])">
          <el-radio-group v-model="formData.correctWay" @change="changeCorrectWay">
            <p>
              <el-radio label="1">立即予以改正。</el-radio>
            </p>
            <p>
              <el-radio label="2">
                <span>在</span>
                <span class="p_datapick">
                  <el-form-item v-if="!lineStyleFlag" :prop="formData.correctWay == 2 ?'correctTime' : 'placeholder'" style="margin-top:-6px">
                    <el-date-picker v-model="formData.correctTime" type="date" :disabled=" formData.correctWay == 1 ?true : false" format="yyyy年MM月dd日" placeholder="    年  月  日" value-format="yyyy-MM-dd"></el-date-picker>
                  </el-form-item>
                </span>
                <span>前改正或者整改完毕。</span>
              </el-radio>
            </p>
          </el-radio-group>
        </el-form-item>
        <p>
          如不服本决定，可以在六十日内依法向
          <span>
            <el-form-item prop="reconsiderationOrgan" >
              <!-- <el-input v-model="formData.reconsiderationOrgan" :maxLength='maxLength' ></el-input> -->
              <el-select v-model="formData.reconsiderationOrgan" @change="changeType">
                <el-option v-for="(item,index) in reconsiderationOptions" :key="index" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </span>申请行政复议，或者在六个月内依法向
          <span>
            <el-form-item prop="litigationOrgan">
              <!-- <el-input v-model="formData.litigationOrgan" :maxLength='maxLength' ></el-input> -->
              <el-select v-model="formData.litigationOrgan">
                <el-option v-for="(item,index) in enforcementOptions" :key="index" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </span>人民法院提起行政诉讼。
        </p>
        <br />
        <br />
        <el-row :gutter="20">
          <el-col :span="12">
            当事人或其代理人签名：
            <span class="write_line width250"></span>
          </el-col>
          <el-col :span="12">
            执法人员签名：
            <span class="write_line width250"></span>
          </el-col>
        </el-row>
        <br />
        <br />
        <div class="pdf_seal">
          <span>交通运输执法部门(印章)</span>
          <br />
          <el-form-item prop="makeDate" class="pdf_datapick">
            <el-date-picker class="big_error" v-model="formData.makeDate" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
        </div>
        <div class="notice clear">
          <span>(本文书一式两份：一份存根，一份交当事人或其代理人。)</span>
        </div>
      </el-form>
    </div>
    <el-button type="primary" style="    width: 70px;    height: 40px;position: fixed;    top: 115px;left: 240px;" @click="backList">返回</el-button>
    <xzjcDocFloatBtns :pageDomId="'forceCorrect-print'" :formOrDocData="formOrDocData" @saveData="saveData" @saveDataStatus='saveDataStatus'></xzjcDocFloatBtns>
    <!-- <el-alert title="错误提示的文案" type="error"  show-icon>
    </el-alert>-->
  </div>
</template>
<script>
import { saveOrUpdateDocument, getDocumentById, findMyRecordByIdApi, changeFileStatus } from "@/api/Record";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import xzjcDocFloatBtns from "../writeRecordCompoments/xzjcDocFloatBtns.vue";
import { getOrganDetailApi, getOrganIdApi } from "@/api/system";
import iLocalStroage from "@/common/js/localStroage";
import { approvalPdfApi } from "@/api/caseHandle";
import recordListVue from '../recordList.vue';
export default {
  components: {
    xzjcDocFloatBtns
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(["inspectionOrderId", "inspectionFileId"]) },
  data() {
    var validateBycorrectWay = (rule, value, callback) => {
      console.log('数值', this.formData.correctWay)
      if (this.formData.correctWay == '2' && !value) {
        return callback(new Error("责令改正日期不能为空"));
      }
      callback();
    };
    return {
      overFlowEditList: [{}],
      isOverflow: false,
      isOverLine: false,
      docData: '',
      formData: {
        party: "",
        // partyIdNo: "",
        // partyAddress: "",
        // partyTel: "",
        partyName: "",
        // partyUnitAddress: "",
        // partyUnitTel: "",
        // partyManager: "",
        punishLaw: "",
        illegalLaw: "",
        illegalFact: "",//必须保留此字段
        // tempPunishAmount: "",
        // socialCreditCode: "",
        // illegalFactsEvidence: "",
        // reconsiderationOrgan: "",
        // test: "",
        correctWay: '',
        correctTime: "",
        // correctWay1:"",
        // correctWay2:"",
        litigationOrgan: "",
        makeDate: "",
        caseName: '',
      },
      reconsiderationOptions: [], //行政复议机构
      enforcementOptions: [], //行政诉讼机构
      handleType: 0, //0  暂存     1 提交
      caseLinkDataForm: {
        id: "", //修改的时候用
        // caseBasicinfoId: '297708bcd8e80872febb61577329194f', //案件id--从流程进入删掉，先写死测试用
        caseBasicinfoId: "",
        caseLinktypeId: this.BASIC_DATA_SYS.forceCorrect_caseLinktypeId, //表单类型ID
        //表单数据
        formData: "",
        status: ""
      },
      name: "",
      rules: {
        // party: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        // caseName: [
        //   { required: true, message: '违法事实不能为空', trigger: 'blur' },
        // ],
        // punishLaw: [
        //   { required: true, message: "法律条款不能为空", trigger: "blur" }
        // ],
        // reconsiderationOrgan: [
        //   { required: true, message: "复议机构不能为空", trigger: "blur" }
        // ],
        // litigationOrgan: [
        //   { required: true, message: "诉讼机构不能为空", trigger: "blur" }
        // ],
        // correctWay: [
        //   { required: true, message: "责令改正方式不能为空", trigger: "change" }
        // ],
        // correctTime: [
        //   { validator: validateBycorrectWay, trigger: "blur" }
        // ]
      },
      nameLength: 23,
      adressLength: 23,
      maxLengthOverLine: 122,
      maxLength: 23,
      lineStyleFlag: false,
      formOrDocData: {
        showBtn: [true, false, false, true, false, false], //提交、保存、撤销、暂存、删除、签章
        pageDomId: "forceCorrect-print"
      },
      isPdf: "",
      huanjieAndDocId: this.BASIC_DATA_SYS.forceCorrect_huanjieAndDocId, //责令改正违法行为通知书的文书id
      isParty: true, //当事人类型为个人
      propertyFeatures: '', //字段属性配置
      isNeedDealSubmitData: false
    };
  },
  methods: {
    // 多行编辑
    overFlowEdit() {
      this.$refs.overflowInputRef.showModal(0, "", this.maxLengthOverLine);
    },
    setData() {
      if (this.inspectionFileId) {
        getDocumentById(this.inspectionFileId).then(
          res => {
            if (res.code == 200) {
              this.docData = res.data
              if (this.docData.docContent) {
                this.formData = JSON.parse(this.docData.docContent)
                if (!this.formData.docContent.party) {
                  this.formData.party = this.docData.party || ''
                  console.log('this.formData.party', this.formData.party)
                  console.log('this.docData.party', this.docData.party)

                }
              }

              console.log('this.formData', this.formData)
            } else {
              this.$message.error(res.msg);
            }
          },
          error => {

          })

      }
    },
    // 提交表单
    saveData(handleType) {
      //参数  提交类型 、
      // this.printContent();
      this.$set(this.docData, 'docContent', JSON.stringify(this.formData))
      // this.docData.docContent = JSON.stringify(this.formData)
      console.log("参数", this.docData)
      if (handleType == 1) {
        this.docData.status = '未完成'

      } else {
        this.docData.status = '暂存'
      }
      // this.docData.createTime=''
      // this.docData.updateTime=''
      // debugger
      saveOrUpdateDocument(this.docData).then(
        res => {
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: '操作成功'
            });
            // this.$emit("getAddModle", 'sucess');
            // 保存到pdf服务器
            // debugger
            // res.data.storagePath='http://124.192.215.10:9332/14,209459bcf86c'
            if (handleType == 1) {
              this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
              this.$router.push({
                name: "inspection_myPDF",
                params: { docId: this.inspectionFileId, storagePath: res.data.storagePath }
              });
              this.storagePath = res.data.storagePath
              // 隐藏保存、签章按钮，显示撤销、删除按钮
              this.$set(this.formOrDocData.showBtn, 5, false)
              this.$set(this.formOrDocData.showBtn, 1, false)
              this.$set(this.formOrDocData.showBtn, 2, true)
              this.$set(this.formOrDocData.showBtn, 4, true)
            } else {
              // 暂存
              this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
              this.$router.push({
                name: 'inspection_inspectionFiles',
                params: { id: this.inspectionOrderId }
                // query: { id: this.formOrDocData.pageDomId || this.$route.params.id }
              });
            }
          } else {
            this.$message.error(res.msg);
          }
        },
        error => {

        })
    },
    saveDataStatus(handleType) {
      console.log(this.$route.params)
      // debugger
      // 保存-修改状态
      changeFileStatus(this.inspectionFileId).then(
        res => {
          if (res.code == 200) {
            if (handleType == 1) {
              this.storagePath = res.data.storagePath
              // 隐藏保存、签章按钮，显示撤销、删除按钮
              this.$set(this.formOrDocData.showBtn, 5, false)
              this.$set(this.formOrDocData.showBtn, 1, false)
              this.$set(this.formOrDocData.showBtn, 2, true)
              this.$set(this.formOrDocData.showBtn, 4, true)

            }
          } else {
            this.$message.error(res.msg);
          }
        },
        error => {

        })
    },
    // 打印
    print() {
      console.log("打印!");
    },
    //是否是完成状态
    isOverStatus() {
      if (this.$route.params.docStatus == "1") {
        this.formOrDocData.showBtn = [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          true
        ]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
      }
    },
    //根据用户的组织机构ID获取复议机构和诉讼机构
    getOrganDetailOptions() {
      //获取机构详情
      let params = { id: iLocalStroage.gets("userInfo").organId };
      let _this = this
      this.$store.dispatch("getOrganDetail", params).then(
        res => {
          console.log("机构", res);
          let organData = res.data;
          //复议机构
          if (organData.reconsiderationOrgan1) {
            _this.reconsiderationOptions.push(organData.reconsiderationOrgan1)
          }
          if (organData.reconsiderationOrgan2) {
            _this.reconsiderationOptions.push(organData.reconsiderationOrgan2)
          }
          //诉说机构
          if (organData.enforcementOrgan1) {
            _this.enforcementOptions.push(organData.enforcementOrgan1)
          }
          if (organData.enforcementOrgan2) {
            _this.enforcementOptions.push(organData.enforcementOrgan2)
          }
          debugger
          //默认显示
          _this.formData.reconsiderationOrgan =_this.formData.reconsiderationOrgan?_this.formData.reconsiderationOrgan:_this.reconsiderationOptions[0];
          _this.formData.litigationOrgan =_this.formData.litigationOrgan?_this.formData.litigationOrgan:_this.enforcementOptions[0];

        },
        err => {
          console.log(err);
        }
      );

    },
    changeCorrectWay(val) {
      if (val == '1') {
        this.formData.correctTime = '';
      }
    },
    backList() {
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      this.$router.push({
        name: 'inspection_inspectionFiles',
        params: { id: this.inspectionOrderId }
        // query: { id: this.formOrDocData.pageDomId || this.$route.params.id }
      });
    },
    changeType(){
      this.$forceUpdate()
    }
  },

  mounted() {
    this.setData();
    this.getOrganDetailOptions();
  },
  created() {
    this.isOverStatus();
  }
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss"></style>
<style lang="scss">
/* @import "@/assets/css/caseHandle/caseDocModle.scss"; */
#forceCorrect-print {
  .partyBox {
    text-indent: 0;
  }
  label.el-radio {
    margin-left: 2em;
  }
  .el-radio__label {
    font-size: 16px;
    color: #000;
  }
  .is-error .el-radio-group {
    background: #f7c9cb;
  }
  .overflow_lins_style .overflow_lins span.overflow_lins_textarea {
    text-indent: 0;
  }
}
</style>
