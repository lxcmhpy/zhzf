<template>
  <div class="box">
    <el-form ref="caseDocForm" :model="formData" :rules="rules" label-width="130px">
      <div class="content_box">
        <div class="content">
          <div class="content_title">
            解除（延长）行政强制措施
          </div>
          <div class="border_blue"></div>
          <div class="content_form">
            <div class="row">
              <div class="col">
                <el-form-item prop="caseNumber" label="案号" :rules="fieldRules('caseNumber',propertyFeatures['caseNumber'])">
                  <el-input ref="caseNumber" clearable class="w-120" v-model="formData.caseNumber" size="small" :disabled="fieldDisabled(propertyFeatures['caseNumber'])"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="caseCauseName" label="案由" :rules="fieldRules('caseCauseName',propertyFeatures['caseCauseName'])">
                  <el-input ref="caseCauseName" clearable class="w-120" v-model="formData.caseCauseName" size="small" :disabled="fieldDisabled(propertyFeatures['caseCauseName'])"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row" v-if="isParty">
              <div class="col">
                <el-form-item label="个人姓名" prop="party" :rules="fieldRules('party',propertyFeatures['party'],'',isParty)">
                  <el-input ref="party" clearable class="w-120" v-model="formData.party" size="small" placeholder="请输入" :disabled="!isParty || fieldDisabled(propertyFeatures['party'])"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="身份证号" prop="partyIdNo" :rules="fieldRules('partyIdNo',propertyFeatures['partyIdNo'],validateIDNumber,isParty)">
                  <el-input clearable class="w-120" v-model="formData.partyIdNo" size="small" placeholder="请输入" :disabled="!isParty || fieldDisabled(propertyFeatures['partyIdNo'])"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row" v-if="isParty">
              <div class="col">
                <el-form-item label="联系电话" prop="partyTel" :rules="fieldRules('partyTel',propertyFeatures['partyTel'],validatePhone,isParty)">
                  <el-input ref="partyTel" clearable class="w-120" v-model="formData.partyTel" size="small" placeholder="请输入" :disabled="!isParty || fieldDisabled(propertyFeatures['partyTel'])"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row" v-if="isParty">
              <div class="col">
                <el-form-item label="联系地址" prop="partyAddress" :rules="fieldRules('partyAddress',propertyFeatures['partyAddress'],'',isParty)">
                  <el-input ref="partyAddress" clearable class="w-120" v-model="formData.partyAddress" size="small" placeholder="请输入" :disabled="!isParty || fieldDisabled(propertyFeatures['partyAddress'])"></el-input>
                </el-form-item>
              </div>
            </div>

            <!-- 单位 -->
            <div class="row" v-if="!isParty">
              <div class="col">
                <el-form-item label="单位" prop="partyName" :rules="fieldRules('partyName',propertyFeatures['partyName'],'',!isParty)">
                  <el-input ref="partyName" clearable class="w-120" v-model="formData.partyName" size="small" placeholder="请输入" :disabled="isParty || fieldDisabled(propertyFeatures['partyName'])"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="地址" prop="partyUnitAddress" :rules="fieldRules('partyUnitAddress',propertyFeatures['partyUnitAddress'],'',!isParty)">
                  <el-input ref="partyUnitAddress" clearable class="w-120" v-model="formData.partyUnitAddress" size="small" placeholder="请输入" :disabled="isParty || fieldDisabled(propertyFeatures['partyUnitAddress'])"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row" v-if="!isParty">
              <div class="col">
                <el-form-item label="法定代表人" prop="partyManager" :rules="fieldRules('partyManager',propertyFeatures['partyManager'],'',!isParty)">
                  <el-input ref="partyManager" clearable class="w-120" v-model="formData.partyManager" size="small" placeholder="请输入" :disabled="isParty || fieldDisabled(propertyFeatures['partyManager'])"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="联系电话" prop="partyUnitTel" :rules="fieldRules('partyUnitTel',propertyFeatures['partyUnitTel'],validatePhone,!isParty)">
                  <el-input ref="partyUnitTel" clearable class="w-120" v-model="formData.partyUnitTel" size="small" placeholder="请输入" :disabled="isParty || fieldDisabled(propertyFeatures['partyUnitTel'])"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row"  v-if="!isParty">
              <div class="col">
                <el-form-item label="统一社会信用代码" prop="socialCreditCode" class="line-height13" :rules="fieldRules('socialCreditCode',propertyFeatures['socialCreditCode'],'',!isParty)">
                  <el-input ref="socialCreditCode" clearable class="w-120" v-model="formData.socialCreditCode" size="small" placeholder="请输入" :disabled="isParty || fieldDisabled(propertyFeatures['socialCreditCode'])"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="案发日期" prop="afsj" :rules="fieldRules('afsj',propertyFeatures['afsj'])">
                  <el-date-picker :disabled="fieldDisabled(propertyFeatures['afsj'])" style="width: 40%" v-model="formData.afsj" type="date" format="yyyy-MM-dd" placeholder=" -- ">
                  </el-date-picker>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="违法事实" prop="illegalBasis" :rules="fieldRules('illegalBasis',propertyFeatures['illegalBasis'])">
                  <el-input :disabled="fieldDisabled(propertyFeatures['illegalBasis'])" ref="illegalBasis" clearable class="w-120" v-model="formData.caseCauseName" size="small" placeholder="请输入" ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div style="display:inline-block;width: 40%">
                <el-form-item  prop="measureStartDate" label="措施起止期限" :rules="fieldRules('measureStartDate',propertyFeatures['measureStartDate'])">
                    <el-date-picker :disabled="fieldDisabled(propertyFeatures['measureStartDate'])"  v-model="formData.measureStartDate" @change="startTime" type="date" format="yyyy-MM-dd" placeholder=" -- ">
                    </el-date-picker>
                </el-form-item>
              </div>
              <div style="display:inline-block;width: 5%;padding-top: 12px;text-align: center;">至</div>
              <div style="display:inline-block;width: 30%">
                <el-form-item  prop="measureEndDate" label-width="0px" :rules="fieldRules('measureEndDate',propertyFeatures['measureEndDate'])">
                  <el-date-picker :disabled="fieldDisabled(propertyFeatures['measureEndDate'])"  v-model="formData.measureEndDate" type="date" format="yyyy-MM-dd" placeholder=" -- ">
                    </el-date-picker>
                </el-form-item>
              </div>
              <!-- <div class="col">
                <el-form-item style="width: 100%" prop="measureStartDate" label="措施起止期限" :rules="fieldRules('measureStartDate',propertyFeatures['measureStartDate'])">
                  <el-date-picker disabled style="width: 40%" v-model="formData.measureStartDate" @change="startTime" type="date" format="yyyy-MM-dd" placeholder=" -- ">
                  </el-date-picker>
                  至
                  <el-date-picker disabled style="width: 40%" v-model="formData.measureEndDate" type="date" format="yyyy-MM-dd" placeholder=" -- ">
                  </el-date-picker>
                </el-form-item>
              </div> -->
            </div>
          </div>
        </div>
      </div>
      <div class="content_box">
        <div class="content">
          <div class="table_form">
            <el-table :data="docTableDatas" stripe border style="width: 100%">
              <el-table-column type="index" label="序号" align="center" width="50">
              </el-table-column>
              <el-table-column prop="name" label="材料名称" align="center">
              </el-table-column>
              <el-table-column prop="status" label="状态" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.status == '1' || item.status == '2'">
                    完成
                  </span>
                  <span v-if="scope.row.status == '0'">
                    暂存
                  </span>
                  <span v-if="scope.row.status != '1' && scope.row.status != '0'  && scope.row.status != '2'">
                    -
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <!-- 已完成 -->
                    <span v-if="scope.row.status == '1' || item.status == '2'" class="tableHandelcase" @click="viewDocPdf(scope.row)">查看</span>
                    <!-- 未完成 暂存 -->
                    <span v-if="scope.row.status == '0'" class="tableHandelcase">
                      <span @click="viewDoc(scope.row)">编辑</span>  
                      <span @click="delDocDataByDocId(scope.row)">清空</span>  
                    </span>
                    <!-- 无状态 -->
                    <span  v-if="scope.row.status != '1' && scope.row.status != '0' && scope.row.status != '2'" class="tableHandelcase" @click="viewDoc(scope.row)">添加</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!-- 悬浮按钮 -->
        <div class="float-btns btn-height63">
          <el-button type="primary" @click="continueHandle" v-if="!this.$route.params.isComplete">
            <svg t="1577515608465" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2285" width="24" height="24">
              <path d="M79.398558 436.464938c-25.231035 12.766337-56.032441 2.671394-68.800584-22.557835-12.775368-25.222004-2.682231-56.025216 22.548804-68.798778 244.424411-123.749296 539.711873-85.083624 744.047314 97.423694 33.059177-37.018403 66.118353-74.034999 99.179336-111.042564 26.072732-29.199292 74.302319-15.865804 81.689744 22.574091 20.740782 107.953934 41.486982 215.915094 62.229569 323.867222 5.884653 30.620785-18.981527 58.454577-50.071928 56.06134-109.610235-8.480185-219.211438-16.95134-328.812642-25.422494-39.021496-3.010963-57.692354-49.437946-31.610591-78.633625 33.060983-37.007565 66.116547-74.025968 99.175724-111.03534-172.88741-154.431492-422.746726-187.152906-629.574746-82.435711z" fill="#FFFFFF" p-id="2286"></path>
            </svg>
            <br>
            提交
          </el-button>

          <el-button type="primary" @click="submitCaseDoc(1)" v-if="!this.$route.params.isComplete">
            <i class="iconfont law-save"></i>
            <br>
            保存
          </el-button>
          <el-button type="primary" @click="backBtn" v-if="this.$route.params.isComplete">
            <i class="iconfont law-back"></i>
            <br />返回
          </el-button>
        </div>
      </div>
    </el-form>
    <checkDocAllFinish ref="checkDocAllFinishRef"  @getDocListByCaseIdAndFormIdEmit="getDocListByCaseIdAndFormId" @submitCoerciveMeasuer = "submitCoerciveMeasuer"></checkDocAllFinish>
    <saveFormDia ref="saveFormDiaRef"></saveFormDia>
    <resetDocDia ref="resetDocDiaRef" @getDocListByCaseIdAndFormIdEmit="getDocListByCaseIdAndFormId"></resetDocDia>
    <!--快速入口 -->
    <caseSlideMenu :activeIndex="''" ></caseSlideMenu>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import checkDocAllFinish from './checkDocAllFinish';
import caseSlideMenu from '@/page/caseHandle/components/caseSlideMenu';
import {
  submitRelieveApi,getDocDataByCaseIdAndDocIdApi
} from "@/api/caseHandle";
import { validateIDNumber, validatePhone, validateZIP } from '@/common/js/validator';
import resetDocDia from '@/page/caseHandle/components/resetDocDia';
import saveFormDia from "./saveFormDia";
export default {
  components: {
    checkDocAllFinish,
    caseSlideMenu,
    resetDocDia,
    saveFormDia
  },
  data() {

    //当事人类型为公司时验证
    var validateIfCom = (rule, value, callback) => {
      if (!this.isParty && !value) {
        return callback(new Error("请输入"));
      }
      callback();
    };
    return {
      validatePhone:validatePhone,
      validateIDNumber:validateIDNumber,
      formData: {
        caseNumber: '',
        party: '',
        partyIdNo: '',
        partyAddress: '',
        partyTel: '',
        partyName: '',
        partyUnitAddress: '',
        partyUnitTel: '',
        partyManager: '',
        socialCreditCode: '',
        afsj: '',
        caseCauseName: '',
        punishLaw: '',
        detainGoods: '',
        enforceMeasure: '',
        measureStartDate: '',
        measureEndDate: '',
        reconsiderationOrgan: '',
        lawsuitOrgan: '',
        makeDate: '2019',
        illegalBasis:'',
      },
      caseLinkDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: '', //案件ID
        caseLinktypeId: "2c9029ee6cac9281016cacaa28760005", //表单类型ID
        //表单数据
        formData: "",
        status: ""
      },
      saveOrSub: true,
      handleType: 0,
      docTableDatas: [],
      rules: {
        caseNumber: [
          { required: true, message: '案号不能为空', trigger: 'blur' },
        ],
        caseCauseName: [
          { required: true, message: '案由不能为空', trigger: 'blur' },
        ],
        party: [
          { required: true, message: '姓名不能为空', trigger: 'blur' },
        ],
        partyIdNo: [
          { required: true, message: '身份证号不能为空', trigger: 'blur' },
          { validator: validateIDNumber, trigger: "blur" }
        ],
        partyAddress: [
          { required: true, message: '联系地址不能为空', trigger: 'blur' },
        ],
        partyTel: [
          { required: true, message: '联系电话不能为空', trigger: 'blur' },
          { validator: validatePhone, trigger: "blur" }
        ],
        partyName: [
          { required: true, message: "单位名称不能为空", trigger: "blur" },
        ],
        partyManager: [
          { required: true, message: "法定代表人不能为空", trigger: "blur" },
        ],
        partyUnitAddress: [
          { required: true, message: "地址不能为空", trigger: "blur" },
        ],
        partyUnitTel: [
          { required: true, message: "联系电话不能为空", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ],
        socialCreditCode: [
          { required: true, message: "统一社会信用代码", trigger: "blur" },
        ],
        afsj: [
          { required: true, message: '案发时间不能为空', trigger: 'blur' },
        ],
        measureStartDate: [
          { required: true, message: '开始时间不能为空', trigger: 'blur' },
        ],
        measureEndDate: [
          { required: true, message: '结束时间不能为空', trigger: 'blur' },
        ],
        illegalBasis: [
          { required: true, message: '违法事实不能为空', trigger: 'blur' },
        ],
        
      },
      // nextBtnDisab: true
      isParty: true,  //当事人类型为个人
      originalData: "",
      propertyFeatures:'', //字段属性配置

    }
  },
  computed: {
    ...mapGetters(['caseId'])
  },
  mixins: [mixinGetCaseApiList],
  inject: ['reload'],
  methods: {
    startTime(){
      if (this.formData.measureStartDate){
        this.$set(this.formData, 'measureEndDate', new Date(this.formData.measureStartDate.getTime() + 29 * 24 * 3600 * 1000));
      }
    },
    //加载表单信息
    setFormData() {
      this.caseLinkDataForm.caseBasicinfoId = this.caseId;
      this.com_getFormDataByCaseIdAndFormId(this.caseLinkDataForm.caseBasicinfoId, this.caseLinkDataForm.caseLinktypeId, false);
    },
    //保存表单数据
    submitCaseDoc(handleType) {
      this.com_submitCaseForm(handleType, 'caseDocForm', false);
    },
    //提交
    continueHandle() {
      if(this.isSaveLink){
        let caseData = {
          caseBasicinfoId: this.caseLinkDataForm.caseBasicinfoId,
          caseLinktypeId: this.caseLinkDataForm.caseLinktypeId,
        }
        let canGotoNext = true; //是否进入下一环节  isRequired(0必填 1非必填)
        let allFinish = true;
        console.log("canGotoNext",this.docTableDatas)
        for (let i = 0; i < this.docTableDatas.length; i++) {
          if (this.docTableDatas[i].isRequired === 0 && (this.docTableDatas[i].status != 1 || this.docTableDatas[i].status != "1")) {
            canGotoNext = false
            break;
          }
          if (this.docTableDatas[i].isRequired !== 0 && this.docTableDatas[i].status === 0) {
            allFinish = false
            break;
          }
        }
        console.log("canGotoNext",canGotoNext)
        console.log("allFinish",allFinish)
        if (canGotoNext) {
          if(allFinish){
            this.$refs.checkDocAllFinishRef.showModal(this.docTableDatas, caseData,1);
          }
          else{
            this.$refs.checkDocAllFinishRef.showModal(this.docTableDatas, caseData,2);
          }
        } else {
          this.$refs.checkDocAllFinishRef.showModal(this.docTableDatas, caseData,3);
        }
      }else{
        this.$refs.saveFormDiaRef.showModal();
      }

    },
    //提交
    submitCoerciveMeasuer(){
      let params = {
        caseId:this.caseId,
        caseLinktypeId:'2c9029ee6cac9281016cacaa28760005'
      }
        submitRelieveApi(params).then(res=>{
          console.log('提交解除或延长表单',res);
          this.$store.dispatch("deleteTabs", this.$route.name);
          this.$router.push({ 
            name: 'case_handle_flowChart'
          });
        },err=>{
          console.log(err);
        })
    },
    // 进入文书
    enterDoc(row) {
      this.$store.dispatch("deleteTabs", this.$route.name);//关闭当前页签
      console.log('row', row)
      this.$router.push({
        name: row.path,
        params: {
          id: row.id,
          //案件ID
          caseBasicinfoId: this.caseBasicinfoId,
          docId: row.docId,
          url: this.$route.name,
        }
      });
    },
    //查看文书
    viewDoc(row) {
      if(this.isSaveLink){
        this.com_viewDoc(row)
      }else{
        this.$refs.saveFormDiaRef.showModal(this.saveOrSub);
      }
    },
    //预览pdf
    viewDocPdf(row) {
      let routerData = {
        hasApprovalBtn: false,
        docId: row.docId,
        approvalOver: false,
        hasBack: true,
        status:row.status,  //status状态 0 暂存 1保存未提交  2 保存并提交 
      }
      this.$store.dispatch("deleteTabs", this.$route.name);
      this.$router.push({ name: 'case_handle_myPDF', params: routerData })
    },
    //清空文书
    delDocDataByDocId(data){
      console.log("清空文书",data);
      this.$refs.resetDocDiaRef.showModal(data);
    },
    //通过案件id和表单类型Id查询已绑定文书
    getDocListByCaseIdAndFormId() {
      let data = {
        linkTypeId: "2c9029ee6cac9281016cacaa28760005"     //环节ID
      };
      this.com_getDocListByCaseIdAndFormId(data);
    },
    //返回到流程图
    backBtn() {
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      this.$router.go(-1);
    },
    // isComplete(){
    //   if(this.docTableDatas[i].name=='延长行政强制措施期限通知书【2016】'){
    //     if(this.docTableDatas[i].status=='1'){
    //       //通过案件ID和文书ID查找延长延长行政强制措施期限通知书
    //       let data = {
    //         caseBasicinfoId : this.caseId,
    //         caseDoctypeId : "2c902934699a6ef801699a7426750001"
    //       }
    //       getDocDataByCaseIdAndDocIdApi(data).then();
    //     }
    //   }
    // }
      
  },
  created() {
    this.setFormData();
    //通过案件id和表单类型Id查询已绑定文书
    this.getDocListByCaseIdAndFormId();
    //判断延长行政强制措施期限通知书
    // this.isComplete();
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/documentForm.scss";
</style>
