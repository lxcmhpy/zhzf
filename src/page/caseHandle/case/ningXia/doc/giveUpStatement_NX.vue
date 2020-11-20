
<template>
  <div class="print_box"> 
    <div class="print_info" id="giveUpStatement-print">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData">
        <div class="doc_topic">放弃陈述申辩及听证权利的说明</div>
        <p class="p_begin">
          <span style="font-size:20px;font-weight: 600;">
            <el-form-item prop="organName" style="width: 240px;" :rules="fieldRules('organName',propertyFeatures['organName'])">
              <el-input v-model="docData.organName" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['organName'])"></el-input>
            </el-form-item>：
          </span>
        </p>
        <p>
          我（单位）
          <span>
            <el-form-item prop="vehicleShipId" style="width: 270px;" :rules="fieldRules('vehicleShipId',propertyFeatures['vehicleShipId'])">
              <el-input :disabled="fieldDisabled(propertyFeatures['vehicleShipId'])" ref="vehicleShipId" clearable class="w-120" v-model="docData.vehicleShipId" size="small"></el-input>
            </el-form-item>
          </span>
          于
          <span>
            <el-form-item prop="afsj" class="pdf_datapick" :rules="fieldRules('afsj',propertyFeatures['afsj'])">
              <el-date-picker @blur="starttime" v-model="docData.afsj" :disabled="fieldDisabled(propertyFeatures['afsj'])" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日"  value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </span>
          在
          <span>
            <el-form-item prop="roadTravel" style="width: 405px;" :rules="fieldRules('roadTravel',propertyFeatures['roadTravel'])">
              <el-input v-model="docData.roadTravel" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['roadTravel'])"></el-input>
            </el-form-item>
          </span>
          过程中，经交通运输行政执法人员检查发现存在
          <span>
            <el-form-item prop="caseCauseName" style="width: 405px;" :rules="fieldRules('caseCauseName',propertyFeatures['caseCauseName'])">
              <el-input v-model="docData.caseCauseName" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['caseCauseName'])"></el-input>
            </el-form-item>
          </span>
          的行为，违反了
          <span>
            <el-form-item prop="illegalLaw" style="width: 405px;" :rules="fieldRules('illegalLaw',propertyFeatures['illegalLaw'])">
              <el-input v-model="docData.illegalLaw" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['illegalLaw'])"></el-input>
            </el-form-item>
          </span>
           的相关规定。我（单位）于
          <span>
            <el-form-item prop="reformTime" class="pdf_datapick" :rules="fieldRules('reformTime',propertyFeatures['reformTime'])">
              <el-date-picker  v-model="docData.reformTime" :disabled="fieldDisabled(propertyFeatures['reformTime'])" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日"  value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </span>
          接到
          <span>
            <el-form-item prop="organNameCopy" style="width: 200px;" :rules="fieldRules('organNameCopy',propertyFeatures['organNameCopy'])">
              <el-input v-model="docData.organNameCopy" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['organNameCopy'])"></el-input>
            </el-form-item>
          </span>
          送达的交通违法行为通知书（编号
          <span>
            <el-form-item prop="caseNumberCopy" style="width: 210px;" :rules="fieldRules('caseNumberCopy',propertyFeatures['caseNumberCopy'])">
              <el-input v-model="docData.caseNumberCopy" :disabled="fieldDisabled(propertyFeatures['caseNumberCopy'])"></el-input>
            </el-form-item>
          </span>
          ），我（单位）对违法事实及认定无任何异议，愿接受行政处罚，放弃陈述、申辩及要求举行听证的权利。
        </p>
        <div class="pdf_seal">
          <span>当事人或代理人签字：</span>
          <br />
          <el-form-item prop="makeDate" class="pdf_datapick">
            <el-date-picker
              v-model="docData.makeDate"
              type="date"
              format="yyyy年MM月dd日"
              placeholder="    年  月  日"
              value-format="yyyy-MM-dd"
              @blur="starttime"
            ></el-date-picker>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <casePageFloatBtns :pageDomId="'caseInvest-print'" :formOrDocData="formOrDocData" @saveData="saveData"></casePageFloatBtns>


  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
import iLocalStroage from "@/common/js/localStroage";
// 验证规则
  import {validatePhone, validateIDNumber} from "@/common/js/validator";
export default {
  components: {
    casePageFloatBtns
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(['caseId']) },
  data() {
    return {
      validatePhone:validatePhone,
      validateIDNumber:validateIDNumber,
      docData: {
        lasj:'',
        organName:'',
        illegalLaw: '',
        caseCauseName:'',
        vehicleShipId:'',
        roadTravel:'',
        caseNumberCopy:'',
        organNameCopy:'',
        afsj:'',
        reformTime:'',
        makeDate:''
      },
      handleType: 0, //0  暂存     1 提交
      caseDocDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件ID
        caseDoctypeId: this.$route.params.docId, //文书类型ID
        docData: "",
        status: "", //提交状态
        linkTypeId: this.$route.params.caseLinkTypeId //所属环节的id
      },
      rules: {
        vehicleShipId: [
          { required: true, message: '车牌号必须填写', trigger: 'blur' },
        ],
        roadTravel: [
          { required: true, message: '违法过程必须填写', trigger: 'blur' },
        ],
        illegalLaw: [
          { required: true, message: '违法条款必须填写', trigger: 'blur' },
        ],
        caseCauseName: [
          { required: true, message: '违法行为必须填写', trigger: 'blur' },
        ],
        organName: [
          { required: true, message: '执法机构名称必须填写 ', trigger: 'blur' },
        ],
        organNameCopy: [
          { required: true, message: '执法机构名称必须填写 ', trigger: 'blur' },
        ],
        caseNumberCopy: [
          { required: true, message: '违法行为通知书编号必须填写', trigger: 'blur' },
        ],
        afsj: [
          { required: true, message: '案发时间必须填写', trigger: 'blur' },
        ],
        reformTime: [
          { required: true, message: '违法行为通知书通知时间必须填写', trigger: 'blur' },
        ],
      },
      nameLength: 23,
      adressLength: 23,
      maxLengthOverLine: 122,
      maxLength: 23,
      isParty: true,
      formOrDocData: {
        showBtn: [
          false,
          true,
          true,
          false,
          false,
          false,
          false,
          false,
          false,
          false
        ], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
        pageDomId: "giveUpStatement-print"
      },
      needDealData: true,
      propertyFeatures:''
    }
  },

  methods: {
    starttime(){
      console.log('案发时间=='+this.docData.lasj)
      if (Date.parse(this.docData.makeDate) < Date.parse(this.docData.lasj.substr(0,10))) {
        this.$message({
          message: '当前时间不得小于立案时间',
          type: 'warning'
        });
        this.docData.makeDate = '';
      }
      if (Date.parse(this.docData.reformTime) < Date.parse(this.docData.lasj.substr(0,10))) {
        this.$message({
          message: '当前时间不得小于立案时间',
          type: 'warning'
        });
        this.docData.reformTime = '';
      }
    },
    //根据案件ID和文书Id获取数据
    getDocDataByCaseIdAndDocId() {
      this.caseDocDataForm.caseBasicinfoId = this.caseId;
      let data = {
        caseId: this.caseId,
        docId: this.$route.params.docId
      };
      this.com_getDocDataByCaseIdAndDocId(data);
    },
    //保存文书信息
    saveData(handleType) {
      this.com_addDocData(handleType, "docForm");
    },
    getDataAfter(){
      if(!this.docData.organName){
        this.docData.organName = iLocalStroage.gets("userInfo").organName;
        this.docData.organNameCopy = iLocalStroage.gets("userInfo").organName;
      }

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
  },
  created() {
    this.getDocDataByCaseIdAndDocId();
    this.isOverStatus();
  },
}
</script>
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss"></style>
<style lang="scss">
#giveUpStatement-print{
   height:1220px;
  .dataTimeReplaceBox{
    position: relative;
    height: 35px;
    .el-form-item__content .el-date-editor--datetime{
      opacity:0;
      position: absolute;
      z-index: 2;
    }
    .replaceTime{
      position:absolute;
      top:0;
      left:10px;
    }
  }
}
</style>
