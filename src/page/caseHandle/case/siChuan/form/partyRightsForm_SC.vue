<template>
  <div class="box" id="partyRightsFormSC">
    <el-form ref="caseLinkDataForm">
      <el-input ref="id" type="hidden"></el-input>
    </el-form>
    <el-form ref="docForm" :rules="rules" :model="formData" label-width="120px" >

      <!-- <div class="header-case">
        <div class="header_left">
          <div class="triangle"></div>
          <div class="header_left_text">
            返回
          </div>
        </div>
      </div> -->
      <div class="content_box">
        <div class="content">
          <div class="content_title">
            当事人权利
          </div>
          <div class="border_blue"></div>

          <div class="content_form">
            <div class="row">
              <div class="col">
                <el-form-item prop="caseNumber" label="案号" :rules="fieldRules('caseNumber',propertyFeatures['caseNumber'])">
                  <el-input ref="caseNumber" :disabled="fieldDisabled(propertyFeatures['caseNumber'])" clearable class="w-120" v-model="formData.caseNumber"
                            size="small"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="caseCauseName" label="案由" :rules="fieldRules('caseCauseName',propertyFeatures['caseCauseName'])">
                  <el-input :disabled="fieldDisabled(propertyFeatures['caseCauseName'])" clearable class="w-120" v-model="formData.caseCauseName"
                            size="small"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="illegalFact" label="违法事实" :rules="fieldRules('illegalFact',propertyFeatures['illegalFact'])">
                  <el-input type="textarea" ref="illegalFact" clearable  v-model="formData.illegalFact"
                            size="small" placeholder="请输入" :disabled="fieldDisabled(propertyFeatures['illegalFact'])"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="illegalLaw" label="违法条款" :rules="fieldRules('illegalLaw',propertyFeatures['illegalLaw'])">
                  <el-input ref="illegalLaw" clearable class="w-120" v-model="formData.illegalLaw" size="small"
                            placeholder="请输入" :disabled="fieldDisabled(propertyFeatures['illegalLaw'])"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="punishLaw" label="处罚条款" :rules="fieldRules('punishLaw',propertyFeatures['punishLaw'])">
                  <el-input ref="punishLaw" clearable class="w-120" v-model="formData.punishLaw" size="small"
                            placeholder="请输入" :disabled="fieldDisabled(propertyFeatures['punishLaw'])"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="tempPunishAmount" label="拟处罚决定" :rules="fieldRules('tempPunishAmount',propertyFeatures['tempPunishAmount'])">
                  <el-input ref="tempPunishAmount" :disabled="fieldDisabled(propertyFeatures['tempPunishAmount'])" clearable class="w-120"
                            v-model="formData.tempPunishAmount" size="small"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="border_blue"></div>
          <div class="content_form bottom_form">
            <!-- <div class="row">
              <div class="col">
                <el-form-item label="是否重大案件">
                  <el-row>
                    <el-col :span="4">
                      <el-checkbox label="是否重大案件" v-model="formData.isImportant"
                                   @change="changeImportant"></el-checkbox>
                    </el-col>
                  </el-row>
                </el-form-item>
              </div>
             
            </div> -->
            <div class="row">
              <div class="col">
                 <el-form-item label="" prop="partyStateView" label-width="0">
                  <el-checkbox label="当事人陈述、申辩" v-model="formData.partyStateView" @change="changePartyStateView"></el-checkbox>
                 </el-form-item>
              </div>
            </div>
            <div class="row" v-if="formData.partyStateView">
              <div class="col">
                <el-form-item prop="stateViewContent" label="陈述、申辩内容" :rules="fieldRules('stateViewContent',propertyFeatures['stateViewContent'])" class="longLabel">
                  <el-input type="textarea" :row="5" ref="stateViewContent" :disabled="fieldDisabled(propertyFeatures['stateViewContent'])" clearable class="w-120"
                            v-model="formData.stateViewContent" ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row" v-if="formData.partyStateView">
              <div class="col">
                <el-form-item prop="lawDepartmentDecisions" label="执法部门处理意见" :rules="fieldRules('lawDepartmentDecisions',propertyFeatures['lawDepartmentDecisions'])" class="longLabel">
                  <el-input type="textarea" :row="5" ref="lawDepartmentDecisions" :disabled="fieldDisabled(propertyFeatures['lawDepartmentDecisions'])" clearable class="w-120"
                            v-model="formData.lawDepartmentDecisions"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                 <el-form-item label="" prop="partyStateView" label-width="0">
                  <el-checkbox label="当事人要求举行听证" v-model="formData.partyRequiredHear" @change="changePartyRequiredHear"></el-checkbox>
                 </el-form-item>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content_box">
        <div class="content">
          <el-row :gutter="20">
            <el-col :span="16">
              <div class="second_title">
                执法文书
              </div>
            </el-col>
          </el-row>
          <div class="table_form">
            <el-table :data="docTableDatas" stripe border style="width: 100%">
              <el-table-column type="index" label="序号" align="center" width="100px">
              </el-table-column>
              <el-table-column prop="name" label="材料名称" align="center">
                <template slot-scope="scope">
                  <span v-show="scope.row.isRequired ===0"><span style="color:red">*</span> {{scope.row.name}}</span>
                  <span v-show="scope.row.isRequired !==0">{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="status" label="状态" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.status == '1' || scope.row.status == '2'">
                    已完成
                  </span>
                  <span v-if="scope.row.status == '0'">
                    未完成
                  </span>
                  <span v-if="scope.row.status == ''">
                    -
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.status == '1' || scope.row.status == '2'" class="tableHandelcase">
                    <!-- 已完成 -->
                    <i class="iconfont law-eye" @click="viewDocPdf(scope.row)"></i>
                    <!-- <i class="iconfont law-print"></i> -->
                  </span>
                  <span v-if="scope.row.status == '0'" class="tableHandelcase">
                    <!-- 未完成 -->
                    <i class="iconfont law-edit" @click="viewDoc(scope.row)"></i>
                    <i class="iconfont law-delete" @click="deleteDocByIdApi(scope.row)"></i>
                  </span>
                  <span v-if="scope.row.status === ''" class="tableHandelcase">
                    <!-- 无状态 -->
                    <i class="iconfont law-add" @click="viewDoc(scope.row)"></i>
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="content_box">
        <div class="content">
          <el-row :gutter="20">
            <el-col :span="16">
              <div class="second_title">
                当事人提交的证据材料
              </div>
            </el-col>
            <el-col :span="8">
              <div class="second_title_btns">
                <el-button type="primary" size="small" @click="showUploadEvi">上传附件</el-button>
              </div>
            </el-col>
          </el-row>
          <div class="table_form">
            <el-table :data="evidenceTableDatas" stripe border style="width: 100%" height="100%"
                      @cell-click="handleEviNameChange">
              <el-table-column type="index" label="序号" align="center">
              </el-table-column>
              <el-table-column prop="evName" label="证据名称" align="center">
              </el-table-column>
              <el-table-column prop="createTime" label="时间" align="center">
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <i type="primary" class="el-icon-view cell-icon" @click="showEvidence(scope)"></i>
                </template>
              </el-table-column>
            </el-table>
            <div class="paginationBox">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                background
                :page-sizes="[10, 20, 30, 40]"
                layout="prev, pager, next,sizes,jumper"
                :total="total"
              ></el-pagination>
            </div>
          </div>
        </div>

        
      </div>
    </el-form>
    <!-- 悬浮按钮 -->
        <div class="float-btns ">

          <el-button type="primary" @click="continueHandle" :disabled="!canGoNextLink" v-if="!this.$route.params.isComplete && !IsLawEnforcementSupervision">
            <svg t="1577515608465" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="2285" width="24" height="24">
              <path
                d="M79.398558 436.464938c-25.231035 12.766337-56.032441 2.671394-68.800584-22.557835-12.775368-25.222004-2.682231-56.025216 22.548804-68.798778 244.424411-123.749296 539.711873-85.083624 744.047314 97.423694 33.059177-37.018403 66.118353-74.034999 99.179336-111.042564 26.072732-29.199292 74.302319-15.865804 81.689744 22.574091 20.740782 107.953934 41.486982 215.915094 62.229569 323.867222 5.884653 30.620785-18.981527 58.454577-50.071928 56.06134-109.610235-8.480185-219.211438-16.95134-328.812642-25.422494-39.021496-3.010963-57.692354-49.437946-31.610591-78.633625 33.060983-37.007565 66.116547-74.025968 99.175724-111.03534-172.88741-154.431492-422.746726-187.152906-629.574746-82.435711z"
                fill="#FFFFFF" p-id="2286"></path>
            </svg>
            <br>
            下一<br>环节
          </el-button>
          <el-button type="primary" @click="submitCaseDoc(1)" :disabled="canGoNextLink" v-if="!this.$route.params.isComplete && !IsLawEnforcementSupervision">
            <i class="iconfont law-save"></i>
            <br>
            保存
          </el-button>
          <el-button type="success" @click="submitCaseDoc(0)" :disabled="canGoNextLink" v-if="!this.$route.params.isComplete && !IsLawEnforcementSupervision">
            <i class="iconfont law-save"></i>
            <br>
            暂存
          </el-button>
          <el-button type="primary" @click="backBtn" v-if="this.$route.params.isComplete || IsLawEnforcementSupervision">
            <i class="iconfont law-back"></i>
            <br/>返回
          </el-button>
        </div>
    <checkDocFinish ref="checkDocFinishRef"></checkDocFinish>
    <partyRightsEvidence ref="partyRightsEvidenceRef" @findEvidenceEmit="findEvidence"></partyRightsEvidence>
    <editEvidenceName ref="editEvidenceNameRef" @findEvidenceEmit="findEvidence"></editEvidenceName>
    <showEvidenDia ref="showEvidenDiaRef"></showEvidenDia>
    <resetDocDia ref="resetDocDiaRef" @getDocListByCaseIdAndFormIdEmit="getDocListByCaseIdAndFormId"></resetDocDia>
  </div>
</template>
<script>
  import {mixinGetCaseApiList} from "@/common/js/mixins";
  import {mapGetters} from "vuex";
  import checkDocFinish from '@/page/caseHandle/components/checkDocFinish'
  import partyRightsEvidence from '@/page/caseHandle/components/partyRightsEvidence'
  import editEvidenceName from '@/page/caseHandle/components/editEvidenceName'
  import showEvidenDia from '@/page/caseHandle/components/showEvidenDia'
  import resetDocDia from '@/page/caseHandle/components/resetDocDia'
  import {
    findByCondition, deleteDocByIdApi,
  } from "@/api/caseHandle";

  export default {
    components: {
      checkDocFinish,
      partyRightsEvidence,
      editEvidenceName,
      showEvidenDia,
      resetDocDia
    },
    data() {
      return {
        formData: {
          caseNumber: "",
          caseCauseName: "",
          illegalFact: "",
          illegalLaw: "",
          punishLaw: "",
          tempPunishAmount: "",
          checkList: "",
          // isImportant: true
          partyStateView:false,
          partyRequiredHear:false,
          lawDepartmentDecisions:'',
          stateViewContent:'',
        },
        //提交方式
        handleType: 0, //0  暂存     1 提交
        caseLinkDataForm: {
          id: "", //修改的时候用
          caseBasicinfoId: '', //案件id
          caseLinktypeId: this.BASIC_DATA_SC.partyRights_SC_caseLinktypeId, //表单类型IDer
          //表单数据
          formData: "",
          status: ""
        },
        docTableDatas: [],
        docTableDatasCopy: [], //最初的文书列表
        evidenceTableDatas: [],
        currentPage: 1, //当前页
        pageSize: 10, //pagesize
        total: 0, //总数
        rules: {},
        needDealData: true,
        propertyFeatures:'', //字段属性配置
        needFilterDocTableDatas:true,
        rules: {
          caseNumber: [
            { required: true, message: "案号不能为空", trigger: "blur" }
          ],
          caseCauseName: [
            { required: true, message: "案由不能为空", trigger: "blur" }
          ],
          illegalFact: [
            { required: true, message: "违法事实不能为空", trigger: "blur" }
          ],
          illegalLaw: [
            { required: true, message: "违法条款不能为空", trigger: "blur" }
          ],
          punishLaw: [
            { required: true, message: "处罚条款不能为空", trigger: "blur" }
          ],
          tempPunishAmount: [
            { required: true, message: "拟处罚决定不能为空", trigger: "blur" }
          ],
        }
      }
    },
    mixins: [mixinGetCaseApiList],
    computed: {...mapGetters(['caseId','IsLawEnforcementSupervision'])},
    inject: ['reload'],
    methods: {
      //加载表单信息
      setFormData() {
        this.caseLinkDataForm.caseBasicinfoId = this.caseId;
        this.com_getFormDataByCaseIdAndFormId(this.caseLinkDataForm.caseBasicinfoId, this.caseLinkDataForm.caseLinktypeId, false);
      },
      submitCaseDoc(handleType) {
        //参数  提交类型 、formRef、有无下一环节按
        this.com_submitCaseForm(handleType, 'docForm', false);
      },
      //下一环节
      continueHandle() {
        let caseData = {
          caseBasicinfoId: this.caseLinkDataForm.caseBasicinfoId,
          caseLinktypeId: this.caseLinkDataForm.caseLinktypeId,
        }

        let canGotoNext = true; //是否进入下一环节
        for (let i = 0; i < this.docTableDatas.length; i++) {
          if (this.docTableDatas[i].isRequired === 0 && (Number(this.docTableDatas[i].status) == 0 )) {
            canGotoNext = false
            break;
          }
        }
        if (canGotoNext) {
          this.com_goToNextLinkTu(this.caseId, this.caseLinkDataForm.caseLinktypeId);
        } else {
          this.$refs.checkDocFinishRef.showModal(this.docTableDatas, caseData);
        }
      },
      // 证据材料- 操作
      evidenceOption(data) {

      },
      //查看文书
      viewDoc(row) {
        row.url=this.$route.name;
        row.caseBasicinfoId= this.caseBasicinfoId
        this.$store.commit("setCurrentFileData", row);//保存文书信息
        this.com_viewDoc(row,this.caseLinkDataForm.caseLinktypeId);
      },
      
      //预览pdf
      viewDocPdf(row) {
        row.url=this.$route.name;
        row.caseBasicinfoId= this.caseBasicinfoId
        this.$store.commit("setCurrentFileData", row);//保存文书信息
        let routerData = {
          hasApprovalBtn: false,
          docId: row.docId,
          approvalOver: false,
          hasBack: true,
          status:row.status,  //status状态 0 暂存 1保存未提交  2 保存并提交
          docDataId:row.docDataId
        }
        this.$store.dispatch("deleteTabs", this.$route.name);
        this.$router.push({name: 'case_handle_myPDF', params: routerData})
      },
      //通过案件id和表单类型Id查询已绑定文书
      getDocListByCaseIdAndFormId() {
        let data = {
          linkTypeId: this.BASIC_DATA_SC.partyRights_SC_caseLinktypeId
        }
        this.com_getDocListByCaseIdAndFormId(data)
      },
      //清空文书
      // deleteDocByIdApi(data) {
      // //      console.log("清空文书",data);
      //   this.$refs.resetDocDiaRef.showModal(data);
      // },
      //删除
      deleteDocByIdApi(data) {
      console.log(" -> data", data)
        
        this.$store.dispatch("deleteDocByIdApi", data.docDataId).then(
          res => {
            console.log('删除', res)
            // this.docTableDatas = res.data;
            this.getDocListByCaseIdAndFormId();
          },
          err => {
            console.log(err);
          }
        );
      },
      //上传证据弹窗
      showUploadEvi() {
        this.$refs.partyRightsEvidenceRef.showModal(this.BASIC_DATA_SC.partyRights_SC_caseLinktypeId);
      },
      //查询证据材料列表
      findEvidence() {
        let data = {
          objectId: this.BASIC_DATA_SC.partyRights_SC_caseLinktypeId,
          caseId: this.caseId,
        };
        let _this = this
        findByCondition(data).then(
          res => {
//              console.log('证据',res);
            _this.evidenceTableDatas = res.data.records;
            _this.currentPage = res.data.current;
            _this.total = res.data.total;
          },
          error => {
            console.log(error);
          }
        );
      },
      //更改证据每页显示的条数
      handleSizeChange(val) {
//      console.log("每页显示的条数", val);
        this.pageSize = val;
        this.findEvidence();
      },
      //更换证据页码
      handleCurrentChange(val) {
//      console.log("当前页", val);
        this.currentPage = val;
        this.findEvidence();
      },
      //修改证据名称
      handleEviNameChange(row, column) {
//      console.log(row,column);
        if (column.property == "evName") {
          this.$refs.editEvidenceNameRef.showModal(row);
        }
      },
      showEvidence(data) {
        this.$refs.showEvidenDiaRef.showModal(data.row);
      },
      //更改 是否是重大案件
      changeImportant(val) {
//      console.log(val);
        let docId = '2c9029ca5b716296015b716568050001';
        if (!val) {  //非重大案件
          this.docTableDatas = this.docTableDatasCopy.filter(item => item.docId !== docId);
          let docDataId = '';
          this.docTableDatasCopy.forEach(item => {
            if (item.docId === docId)
              docDataId = item.docDataId;
          })
          if (docDataId) {   //重大案件文书状态为已完成时
            deleteDocByIdApi(docDataId).then(res => {
//            console.log('删除文书',res);
            }, error => {
              console.log(error);
            })
          }

        } else {
          let importdoc = '';
          this.docTableDatasCopy.forEach(item => {
            if (item.docId === docId) {
              importdoc = item;
            }
          })
          this.docTableDatas.push(importdoc);
        }
      },
      getDataAfter() {
        // this.formData.isImportant = true;
        //通过案件id和表单类型Id查询已绑定文书
        this.getDocListByCaseIdAndFormId();
        

        // if(this.formData.partyRequiredHear === undefined) this.formData.partyRequiredHear = false;
        // this.changePartyRequiredHear(this.formData.partyRequiredHear );
        
      },
      //返回到流程图
      backBtn() {
        this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
        this.$router.go(-1);
      },
      //当事人陈述、申辩
      changePartyStateView(val){
      },
      //当事人要求举行听证
      changePartyRequiredHear(val){
        let case_handle_hearingRecordePdfItem =  this.docTableDatasCopy.find(item=> item.path == "case_handle_hearingRecordePdf")
        let case_handle_hearingNoticePdfItem =  this.docTableDatasCopy.find(item=> item.path == "case_handle_hearingNoticePdf")
        if(val){
          let index1  = this.docTableDatas.findIndex(item=>item.path == "case_handle_hearingRecordePdf");
          if(index1 ==-1) this.docTableDatas.push(case_handle_hearingRecordePdfItem);
          let index2  = this.docTableDatas.findIndex(item=>item.path == "case_handle_hearingNoticePdf");
          if(index2 ==-1) this.docTableDatas.push(case_handle_hearingNoticePdfItem)
        }else{ 
          let index1  = this.docTableDatas.findIndex(item=>item.path == "case_handle_hearingRecordePdf");                             
          if(index1 !=-1) this.docTableDatas.splice(index1,1)
          let index2  = this.docTableDatas.findIndex(item=>item.path == "case_handle_hearingNoticePdf");
          if(index2 !=-1) this.docTableDatas.splice(index2,1)
        }
      },
      filterDocTableDatas(){
         this.changePartyRequiredHear(this.formData.partyRequiredHear);
      }

    },
    mounted() {
      // this.setFormData();
    },
    created() {
      console.log('this.$route.params',this.$route.params);
      this.setFormData();
      
      // 查询证据材料列表
      this.findEvidence();
    },
    watch:{
      // 'formData.partyRequiredHear': function(val) {
      //   this.changePartyRequiredHear(val); 
      // }
    }
  }
</script>

<style lang="scss" src="@/assets/css/documentForm.scss"></style>
<style lang="scss">
#partyRightsFormSC{
  .el-form .longLabel{
    label{
      line-height: 20px;
    }
  } 
}
</style>
