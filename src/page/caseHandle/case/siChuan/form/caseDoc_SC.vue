<template>
  <div class="box">
    <el-form ref="caseDocForm" :model="formData" :rules="rules" label-width="115px" :disabled="canGoNextLink">
      <div class="content_box">
        <div class="content">
          <div class="content_title">调查取证</div>
          <div class="border_blue"></div>
          <div class="content_form">
            <div class="row">
              <div class="col">
                <el-form-item prop="caseNumber" label="案号" :rules="fieldRules('caseNumber',propertyFeatures['caseNumber'])">
                  <el-input
                    ref="caseNumber"
                    clearable
                    class="w-120"
                    v-model="formData.caseNumber"
                    size="small"
                    :disabled="fieldDisabled(propertyFeatures['caseNumber'])"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="caseCauseName" label="案由" :rules="fieldRules('caseCauseName',propertyFeatures['caseCauseName'])">
                  <el-input
                    ref="caseCauseName"
                    clearable
                    class="w-120"
                    v-model="formData.caseCauseName"
                    size="small"
                    :disabled="fieldDisabled(propertyFeatures['caseCauseName'])"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row" v-if="isParty">
              <div class="col">
                <el-form-item label="姓名" prop="party" :rules="fieldRules('party',propertyFeatures['party'],'',isParty)">
                  <el-input
                    ref="party"
                    clearable
                    class="w-120"
                    v-model="formData.party"
                    size="small"
                    placeholder="请输入"
                    :disabled="!isParty || fieldDisabled(propertyFeatures['party'])"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="性别" prop="partySex" :rules="fieldRules('partySex',propertyFeatures['partySex'],'',isParty)">
                  <el-select
                    placeholder="请选择"
                    v-model="formData.partySex"
                    :disabled="!isParty || fieldDisabled(propertyFeatures['partySex'])"
                  >
                    <el-option value="0" label="男"></el-option>
                    <el-option value="1" label="女"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="row" v-if="isParty">
              <div class="col">
                <el-form-item label="身份证件号" prop="partyIdNo" :rules="fieldRules('partyIdNo',propertyFeatures['partyIdNo'],validateIDNumber,isParty)">
                  <el-input
                    clearable
                    class="w-120"
                    v-model="formData.partyIdNo"
                    size="small"
                    placeholder="请输入"
                    :disabled="!isParty || fieldDisabled(propertyFeatures['partyIdNo'])"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="年龄" prop="partyAge" :rules="fieldRules('partyAge',propertyFeatures['partyAge'],'',isParty)">
                  <el-input ref="partyAge" :disabled="!isParty || fieldDisabled(propertyFeatures['partyAge'])" clearable class="w-120" type="number" v-model="formData.partyAge" size="small" placeholder="请输入"></el-input>
                </el-form-item>
                <!-- <el-form-item label="与案件关系" prop="relationWithCase" :rules="fieldRules('relationWithCase',propertyFeatures['relationWithCase'],'',isParty)">
                    <el-select ref="relationWithCase" v-model="formData.relationWithCase" :disabled="!isParty || fieldDisabled(propertyFeatures['relationWithCase'])">
                      <el-option v-for="item in allRelationWithCase" :key="item.value" :label="item.label" :value="item.label"></el-option>
                    </el-select>
                 </el-form-item> -->
              </div>
            </div>
            <div class="row" v-if="isParty">
              <div class="col">
                <el-form-item label="联系电话" prop="partyTel" :rules="fieldRules('partyTel',propertyFeatures['partyTel'],validatePhone,isParty)">
                  <el-input
                    ref="partyTel"
                    clearable
                    class="w-120"
                    v-model="formData.partyTel"
                    size="small"
                    placeholder="请输入"
                    :disabled="!isParty || fieldDisabled(propertyFeatures['partyTel'])"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="所在单位" prop="partyUnitPosition" :rules="fieldRules('partyUnitPosition',propertyFeatures['partyUnitPosition'],'',isParty)">
                  <el-input ref="partyUnitPosition" :disabled="!isParty || fieldDisabled(propertyFeatures['partyUnitPosition'])" clearable class="w-120" v-model="formData.partyUnitPosition" size="small" placeholder="请输入" ></el-input>
                </el-form-item>
                <!-- <el-form-item label="单位及职务" prop="partyUnitPositionAndCom" :rules="fieldRules('partyUnitPositionAndCom',propertyFeatures['partyUnitPositionAndCom'],'',isParty)">
                     <el-input ref="partyUnitPositionAndCom" clearable class="w-120" v-model="formData.partyUnitPositionAndCom" size="small" placeholder="请输入"
                     :disabled="!isParty || fieldDisabled(propertyFeatures['partyUnitPositionAndCom'])"></el-input>
                 </el-form-item> -->
              </div>
            </div>
            <div class="row" v-if="isParty">
              <div class="col">
                <el-form-item label="联系地址" prop="partyAddress" :rules="fieldRules('partyAddress',propertyFeatures['partyAddress'],'',isParty)">
                  <el-input
                    ref="partyAddress"
                    clearable
                    class="w-120"
                    v-model="formData.partyAddress"
                    size="small"
                    placeholder="请输入"
                    :disabled="!isParty || fieldDisabled(propertyFeatures['partyAddress'])"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="邮编" prop="partyZipCode" :rules="fieldRules('partyZipCode',propertyFeatures['partyZipCode'],'',isParty)">
                  <el-input ref="partyZipCode" :disabled="!isParty || fieldDisabled(propertyFeatures['partyZipCode'])" clearable class="w-120" v-model="formData.partyZipCode" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>

            <div class="row" v-if="!isParty">
              <div class="col">
                <el-form-item label="单位" prop="partyName" :rules="fieldRules('partyName',propertyFeatures['partyName'],'',!isParty)">
                  <el-input
                    ref="partyName"
                    clearable
                    class="w-120"
                    v-model="formData.partyName"
                    size="small"
                    placeholder="请输入"
                    :disabled="isParty || fieldDisabled(propertyFeatures['partyName'])"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="地址" prop="partyUnitAddress" :rules="fieldRules('partyUnitAddress',propertyFeatures['partyUnitAddress'],'',!isParty)">
                  <el-input
                    ref="partyUnitAddress"
                    clearable
                    class="w-120"
                    v-model="formData.partyUnitAddress"
                    size="small"
                    placeholder="请输入"
                    :disabled="isParty || fieldDisabled(propertyFeatures['partyUnitAddress'])"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row" v-if="!isParty">
              <div class="col">
                <el-form-item label="法定代表人" prop="partyManager" :rules="fieldRules('partyManager',propertyFeatures['partyManager'],'',!isParty)">
                  <el-input
                    ref="partyManager"
                    clearable
                    class="w-120"
                    v-model="formData.partyManager"
                    size="small"
                    placeholder="请输入"
                    :disabled="isParty || fieldDisabled(propertyFeatures['partyManager'])"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="联系电话" prop="partyUnitTel" :rules="fieldRules('partyUnitTel',propertyFeatures['partyUnitTel'],validatePhone,!isParty)">
                  <el-input
                    ref="partyUnitTel"
                    clearable
                    class="w-120"
                    v-model="formData.partyUnitTel"
                    size="small"
                    placeholder="请输入"
                    :disabled="isParty || fieldDisabled(propertyFeatures['partyUnitTel'])"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row" v-if="!isParty">
              <div class="col">
                <el-form-item label="统一社会信用代码" class="line-height13" prop="socialCreditCode" :rules="fieldRules('socialCreditCode',propertyFeatures['socialCreditCode'],'',!isParty)">
                  <el-input
                    ref="socialCreditCode"
                    clearable
                    class="w-120"
                    v-model="formData.socialCreditCode"
                    size="small"
                    placeholder="请输入"
                    :disabled="isParty || fieldDisabled(propertyFeatures['socialCreditCode'])"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="案件基本情况" class="line-height13" prop="caseSituation" :rules="fieldRules('caseSituation',propertyFeatures['caseSituation'])">
                  <el-input
                    type="textarea"
                    class="height106"
                    ref="caseSituation"
                    clearable
                    v-model="formData.caseSituation"
                    size="small"
                    placeholder="请输入"
                    :disabled="fieldDisabled(propertyFeatures['caseSituation'])"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <!-- <div class="row">
              <div class="col">
                <el-form-item label="车牌号码" prop="vehicleShipId" :rules="fieldRules('vehicleShipId',propertyFeatures['vehicleShipId'])">
                  <el-input
                    ref="vehicleShipId"
                    clearable
                    class="w-120"
                    v-model="formData.vehicleShipId"
                    size="small"
                    placeholder="请输入"
                    :disabled="fieldDisabled(propertyFeatures['vehicleShipId'])"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="车辆类型" prop="vehicleShipType" :rules="fieldRules('vehicleShipType',propertyFeatures['vehicleShipType'])">
                  <el-select v-model="formData.vehicleShipType" :disabled="fieldDisabled(propertyFeatures['vehicleShipType'])">
                    <el-option
                      v-for="item in allVehicleShipType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div> -->
          </div>
        </div>
      </div>
      <div class="content_box">
        
        <div class="content">
          <div class="row">

            <el-form-item prop="isImport" style="display:inline-block;margin-top:9px;margin-right:20px" label-width="0">
              <el-checkbox
                v-model="formData.isImport"
              ></el-checkbox>
            属于重大行政处罚
            </el-form-item>
         
         
        <el-checkbox-group v-model="formData.dynamicSelectDocArr" @change="changeFilterDoc" style="margin-top:20px">
          <!-- <el-checkbox label="1">属于重大行政处罚</el-checkbox> -->
          <el-checkbox label="2">采取抽样取证</el-checkbox>
          <el-checkbox label="3">采取证据登记保存</el-checkbox>
          <el-checkbox label="4">解除证据登记保存</el-checkbox>
          <el-checkbox label="5">重大案件讨论</el-checkbox>
        </el-checkbox-group>
         
        </div>
          <el-row :gutter="20">
            <el-col :span="16">
              <div class="second_title">
                文书列表
              </div>
            </el-col>
          </el-row>
          <div class="table_form">
            <el-table
              :data="docTableDatas"
              stripe
              border
              style="width: 100%"
              :row-class-name="getRowClass"
            >
              <el-table-column type="expand" expand-change>
                <template>
                  <ul class="moreDocList">
                    <li v-for="(item,index) in allAskDocList" :key="index">
                      <div>{{item.note}}</div>
                      <div>
                        <span v-if="item.status == '1' || item.status == '2'">已完成</span>
                        <span v-if="item.status == '0'">未完成</span>
                      </div>
                      <div>
                        <span v-if="item.status == '1' || item.status == '2'" class="tableHandelcase">
                          <!-- 已完成 -->
                          <i class="iconfont law-eye" @click="viewDocPdf(item)"></i>
                          <!-- <i class="iconfont law-print"></i> -->
                        </span>
                        <span v-if="item.status == '0'" class="tableHandelcase">
                          <!-- 未完成 -->
                          <i class="iconfont law-edit" @click="viewDoc(item)"></i>
                          <i class="iconfont law-delete" @click="delDocDataByDocId(item)"></i>
                        </span>
                      </div>
                    </li>
                  </ul>
                </template>
              </el-table-column>

              <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
              <el-table-column prop="name" label="材料名称" align="center">
                <template slot-scope="scope">
                  <span v-show="scope.row.isRequired ===0"><span style="color:red">*</span> {{scope.row.name}}</span>
                  <span v-show="scope.row.isRequired !==0">{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="status" label="状态" align="center">
                <template slot-scope="scope" v-show="scope.row.name != '询问笔录'">
                  <span v-if="scope.row.status == '1' || scope.row.status == '2'">
                    <template v-if="scope.row.docProcessStatus=='待审批'">待审批</template>
                    <template v-if="scope.row.docProcessStatus=='审批中'">审批中</template>
                    <template v-if="scope.row.docProcessStatus=='已驳回'">已驳回</template>
                    <template v-if="scope.row.docProcessStatus==''|| scope.row.docProcessStatus=='已完成'">已完成</template>
                  </span>
                  <!-- <span v-if="scope.row.status == '1' || scope.row.status == '2'">已完成</span> -->
                  <span v-if="scope.row.status == '0'">未完成</span>
                  <span v-if="scope.row.status == ''">-</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" >
                <template slot-scope="scope" class="docListHandleClass">
                  <div v-if="scope.row.openRow">
                    <span @click="addMoreDoc(scope.row)" class="tableHandelcase">添加</span>
                  </div>
                  <div v-if="!scope.row.openRow">
                    <!-- 已完成 -->
                    <span v-if="scope.row.status == '1' || scope.row.status == '2'" class="tableHandelcase" @click="viewDocPdf(scope.row)">查看</span>
                    <!-- 未完成 暂存 -->
                    <span v-if="scope.row.status == '0'" class="tableHandelcase">
                      <span @click="viewDoc(scope.row)">编辑</span>
                      <span @click="delDocDataByDocId(scope.row)">清空</span>
                    </span>
                    <!-- 无状态 -->
                    <span v-if="scope.row.status === ''" class="tableHandelcase" @click="viewDoc(scope.row)">添加</span>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        
      </div>
    </el-form>
    <!-- 悬浮按钮 -->
        <div class="float-btns btn-height63">
          <el-button type="primary" @click="continueHandle" :disabled="!canGoNextLink" v-if="!this.$route.params.isComplete && !IsLawEnforcementSupervision">
            <svg
              t="1577515608465"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2285"
              width="24"
              height="24"
            >
              <path
                d="M79.398558 436.464938c-25.231035 12.766337-56.032441 2.671394-68.800584-22.557835-12.775368-25.222004-2.682231-56.025216 22.548804-68.798778 244.424411-123.749296 539.711873-85.083624 744.047314 97.423694 33.059177-37.018403 66.118353-74.034999 99.179336-111.042564 26.072732-29.199292 74.302319-15.865804 81.689744 22.574091 20.740782 107.953934 41.486982 215.915094 62.229569 323.867222 5.884653 30.620785-18.981527 58.454577-50.071928 56.06134-109.610235-8.480185-219.211438-16.95134-328.812642-25.422494-39.021496-3.010963-57.692354-49.437946-31.610591-78.633625 33.060983-37.007565 66.116547-74.025968 99.175724-111.03534-172.88741-154.431492-422.746726-187.152906-629.574746-82.435711z"
                fill="#FFFFFF"
                p-id="2286"
              />
            </svg>
            <br />下一
            <br />环节
          </el-button>

          <el-button type="primary" @click="submitCaseDoc(1)" :disabled="canGoNextLink" v-if="!this.$route.params.isComplete && !IsLawEnforcementSupervision">
            <i class="iconfont law-save"></i>
            <br />保存
          </el-button>
          <el-button type="primary" @click="backBtn" v-if="this.$route.params.isComplete || IsLawEnforcementSupervision">
            <i class="iconfont law-back"></i>
            <br />返回
          </el-button>
        </div>
    <checkDocFinish ref="checkDocFinishRef"></checkDocFinish>
    <chooseAskPeopleDia ref="chooseAskPeopleDiaRef"></chooseAskPeopleDia>
    <resetDocDia ref="resetDocDiaRef" @getDocListByCaseIdAndFormIdEmit="getDocListByCaseIdAndFormId"></resetDocDia>
    <caseSlideMenu :activeIndex="''"></caseSlideMenu>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import checkDocFinish from "@/page/caseHandle/components/checkDocFinish.vue";
import chooseAskPeopleDia from "@/page/caseHandle/components/chooseAskPeopleDia";
import resetDocDia from '@/page/caseHandle/components/resetDocDia'
import iLocalStroage from "@/common/js/localStroage";
import caseSlideMenu from '@/page/caseHandle/components/caseSlideMenu'
import {BASIC_DATA_JX} from '@/common/js/BASIC_DATA_JX.js';
import {
  validateIDNumber,
  validatePhone,
  validateZIP
} from "@/common/js/validator";
import {
  getCaseBasicInfoApi,
} from "@/api/caseHandle";
export default {
  components: {
    checkDocFinish,
    chooseAskPeopleDia,
    resetDocDia,
    caseSlideMenu
  },
  data() {
    return {
      validatePhone:validatePhone,
      validateIDNumber:validateIDNumber,
      formData: {
        caseNumber: "",
        caseCauseName: "",
        party: "",
        partySex: "",
        partyIdNo: "",
        partyAge: "",
        partyTel: "",
        partyUnitPosition:"",
        partyUnitPositionAndCom: "",
        partyAddress: "",
        partyZipCode: "",
        partyName: "",
        partyUnitAddress: "",
        partyManager: "",
        partyUnitTel: "",
        socialCreditCode: "",
        caseSituation: "",
        vehicleShipId: "",
        vehicleShipType: "",
        relationWithCase:"",
        partyUnitPosition: "",
        occupation: "",
        dynamicSelectDocArr:[],
        isImport:false,
      },
      caseLinkDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件ID
        // caseLinktypeId: this.BASIC_DATA_SYS.caseDoc_caseLinktypeId, //表单类型ID
        caseLinktypeId: this.BASIC_DATA_SC.caseDoc_SC_caseLinktypeId, ////表单类型ID
        //表单数据
        formData: "",
        status: ""
      },
      handleType: 0,
      docTableDatas: [],
      rules: {
        caseNumber: [
          { required: true, message: "案号不能为空", trigger: "blur" }
        ],
        caseName: [
          { required: true, message: "案由不能为空", trigger: "blur" }
        ],
        party: [
          { required: true, message: "姓名不能为空", trigger: "blur" }
        ],
        partySex: [
          { required: true, message: "性别不能为空", trigger: "change" }
        ],
        partyIdNo: [
          { required: true, message: "身份证号不能为空", trigger: "blur" },
          { validator: validateIDNumber, trigger: "blur" }
        ],
        relationWithCase: [
          { required: true, message: "与案件关系不能为空", trigger: "change" }
        ],
        partyTel: [
          { required: true, message: "联系电话不能为空", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ],
        partyUnitPositionAndCom: [
          { required: true, message: "单位及职务不能为空", trigger: "blur" }
        ],
        partyAddress: [
          { required: true, message: "联系地址不能为空", trigger: "blur" }
        ],
        vehicleShipId: [
          { required: true, message: "车牌号码不能为空", trigger: "blur" }
        ],
        vehicleShipType: [
          { required: true, message: "车辆类型不能为空", trigger: "change" }
        ],
        partyName: [
          { required: true, message: "单位不能为空", trigger: "blur" }
        ],
        partyUnitAddress: [
          { required: true, message: "地址不能为空", trigger: "blur" }
        ],
        partyManager: [
          { required: true, message: "法定代表人不能为空", trigger: "blur" }
        ],
        partyUnitTel: [
          { required: true, message: "联系电话不能为空", trigger: "blur" }
        ],
        socialCreditCode: [
          { required: true, message: "统一社会信用代码不能为空", trigger: "blur" }
        ],
        caseSituation: [
          { required: true, message: "案件基本情况不能为空", trigger: "blur" }
        ],

      },
      // nextBtnDisab: true
      isParty: true, //当事人类型为个人
      originalData: "",
      docTableDatasCopy: [],
      allAskDocList: [], //询问笔录
      askDocListNum:0,  //询问笔录次数
      askDocListFinishNum:0,//已完成询问笔录次数
      needDealData:true,
      propertyFeatures:'', //字段属性配置

    };
  },
  computed: {
    ...mapGetters(["caseId",'IsLawEnforcementSupervision'])
  },
  mixins: [mixinGetCaseApiList],
  inject: ["reload"],
  methods: {
    //加载表单信息
    setFormData() {
      this.caseLinkDataForm.caseBasicinfoId = this.caseId;
      this.com_getFormDataByCaseIdAndFormId(
        this.caseLinkDataForm.caseBasicinfoId,
        this.caseLinkDataForm.caseLinktypeId,
        false
      );
    },
    //保存表单数据
    submitCaseDoc(handleType) {
      this.com_submitCaseForm(handleType, "caseDocForm", false);
    },
    //下一环节
    continueHandle() {
      console.log(this.docTableDatas)
      let caseData = {
        caseBasicinfoId: this.caseLinkDataForm.caseBasicinfoId,
        caseLinktypeId: this.caseLinkDataForm.caseLinktypeId
      };
      let canGotoNext = true; //是否进入下一环节  isRequired(0必填 1非必填)
      let approvalPass = true;  //文书审批都通过了
      for (let i = 0; i < this.docTableDatas.length; i++) {
        if (
          this.docTableDatas[i].isRequired === 0 && (Number(this.docTableDatas[i].status) == 0)
        ) {
          canGotoNext = false;
          break;
        }else if(this.docTableDatas[i].docProcessStatus == '审批中'){
            //有审批中的环节
            approvalPass = false;
            break;
        }
      }
      if (canGotoNext && approvalPass) {
        this.com_goToNextLinkTu(
          this.caseId,
          this.caseLinkDataForm.caseLinktypeId
        );
      } else if(!canGotoNext){
        this.$refs.checkDocFinishRef.showModal(this.docTableDatas, caseData);
      }else if(!approvalPass){
        this.$message('有文书正在审批中！')
      }
    },
    // 进入文书
    enterDoc(row) {
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      console.log("row", row);
      this.$router.push({
        name: row.path,
        params: {
          id: row.id,
          //案件ID
          caseBasicinfoId: this.caseBasicinfoId,
          docId: row.docId,
          url: this.$route.name
        }
      });
    },
    //查看文书
    viewDoc(row) {
      this.com_viewDoc(row,this.caseLinkDataForm.caseLinktypeId);
    },
    addMoreDoc(row) {
      console.log("添加",row);
      iLocalStroage.removeItem("currentDocDataId");
      this.$refs.chooseAskPeopleDiaRef.showModal(row,this.caseLinkDataForm.caseLinktypeId, this.isSaveLink);
    },
    //清空文书
    delDocDataByDocId(data){
      console.log("清空文书",data);
      this.$refs.resetDocDiaRef.showModal(data);
    },
    //预览pdf
    viewDocPdf(row) {
      this.com_viewDocPdf(row,this.BASIC_DATA_JX.caseDoc_JX_caseLinktypeId,1)
    },
    //通过案件id和表单类型Id查询已绑定文书
    getDocListByCaseIdAndFormId() {
      let data = {
        linkTypeId: this.caseLinkDataForm.caseLinktypeId
      };
      this.com_getDocListByCaseIdAndFormId(data);
    },
    //返回到流程图
    backBtn() {
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      this.$router.go(-1);
    },
    getRowClass: function(row, index) {
      if (row.row.openRow) {
        return "";
      } else {
        return "myhide-expand";
      }
    },
    setMoreDocTableTitle() {
      this.docTableDatas = [];
      this.allAskDocList = [];
      // askDocListNum:0,
      // askDocListFinishNum:0,
      console.log('docTableDatasCopy',this.docTableDatasCopy)
      //获取询问笔录的文书类型id
      let xunwenDocTypeId = '';
      for(let i=0;i<this.docTableDatasCopy.length;i++){
        if (this.docTableDatasCopy[i].path == "case_handle_othermodle") {
          xunwenDocTypeId = this.docTableDatasCopy[i].docId;
          break;
        }
      }
      if(xunwenDocTypeId){
        this.docTableDatas.push({
          name: "询问笔录",
          status: "询问",
          openRow: true,
          // url: "case_handle_othermodle",
          path: "case_handle_othermodle",
          docId: xunwenDocTypeId
        });
        let askDocListFinishNum = 0;
        this.docTableDatasCopy.forEach(item => {
          // if (item.path != "case_handle_othermodle") {
          //   this.docTableDatas.push(item);
          // } else {
          //   if(item.status === 0 || item.status === 1 || item.status === 2)
          //   this.allAskDocList.push(item);

          //   if(item.status === 1 || item.status === 2) askDocListFinishNum++
          // }
          if (item.path == "case_handle_othermodle"){
            if(item.status === 0 || item.status === 1 || item.status === 2)
            this.allAskDocList.push(item);
            if(item.status === 1 || item.status === 2) askDocListFinishNum++
          }

        });
        if(this.allAskDocList.length>0){
          let askDocAllNumAndFinishTitle = '询问笔录'+'（'+ askDocListFinishNum +'/'+this.allAskDocList.length+')';
          this.docTableDatas[0].name = askDocAllNumAndFinishTitle;
        }
        console.log("this.docTableDatas", this.docTableDatas);
        console.log("this.allAskDocList", this.allAskDocList);
      }
      console.log('this.formData.dynamicSelectDocArr',this.formData.dynamicSelectDocArr)
      // this.changeFilterDoc(this.formData.dynamicSelectDocArr)


      let index1  = this.docTableDatas.findIndex(item=>item.path == "case_handle_inquestNotesDoc");
      if(index1 ==-1)  this.docTableDatas.push(this.docTableDatasCopy.find(item=> item.path == "case_handle_inquestNotesDoc"))
      let index2  = this.docTableDatas.findIndex(item=>item.path == "case_handle_sceneNotesDoc");
      if(index2 ==-1)  this.docTableDatas.push(this.docTableDatasCopy.find(item=> item.path == "case_handle_sceneNotesDoc"))
      let index3  = this.docTableDatas.findIndex(item=>item.path == "case_handle_caseInvestigReport_SC");
      if(index3 ==-1)  this.docTableDatas.push(this.docTableDatasCopy.find(item=> item.path == "case_handle_caseInvestigReport_SC"))
      let index4  = this.docTableDatas.findIndex(item=>item.path == "case_handle_deliveryConfirmDoc_SC");
      if(index4 ==-1)  this.docTableDatas.push(this.docTableDatasCopy.find(item=> item.path == "case_handle_deliveryConfirmDoc_SC"))

      let obtaineEvidenceFormItem =  this.docTableDatasCopy.find(item=> item.path == "case_handle_obtaineEvidenceForm")
      if(this.formData.dynamicSelectDocArr.includes("2")){ //抽样取证
        let index1  = this.docTableDatas.findIndex(item=>item.path == "case_handle_obtaineEvidenceForm");
        if(index1 ==-1 && obtaineEvidenceFormItem)
        this.docTableDatas.push(obtaineEvidenceFormItem)
      }else{
        let index1  = this.docTableDatas.findIndex(item=>item.path == "case_handle_obtaineEvidenceForm");
        if(index1 !=-1)
        this.docTableDatas.splice(index1,1);
      }
      console.log('this.docTableDatas', this.docTableDatas)
      let evidenceListDocItem =  this.docTableDatasCopy.find(item=> item.path == "case_handle_evidenceListDoc")
      let evidenceRegApprovalItem =  this.docTableDatasCopy.find(item=> item.path == "case_handle_evidenceRegApprovalForm_SC")
      // 还有一个审批表
      if(this.formData.dynamicSelectDocArr.includes("3")){ //证据登记
        let index1  = this.docTableDatas.findIndex(item=>item.path == "case_handle_evidenceListDoc");
        if(index1 ==-1 && evidenceListDocItem)
        this.docTableDatas.push(evidenceListDocItem)
        let index2  = this.docTableDatas.findIndex(item=>item.path == "case_handle_evidenceRegApprovalForm_SC");
        if(index2 ==-1 && evidenceRegApprovalItem)
        this.docTableDatas.push(evidenceRegApprovalItem)
      }else{
        let index1  = this.docTableDatas.findIndex(item=>item.path == "case_handle_evidenceListDoc");
        if(index1 !=-1)
        this.docTableDatas.splice(index1,1);
        let index2  = this.docTableDatas.findIndex(item=>item.path == "case_handle_evidenceRegApprovalForm_SC");
        if(index2 !=-1)
        this.docTableDatas.splice(index2,1);
      }
      let deleteEvidenceItem =  this.docTableDatasCopy.find(item=> item.path == "case_handle_deleteEvidence")
      if(this.formData.dynamicSelectDocArr.includes("4")){ //抽样取证
        let index1  = this.docTableDatas.findIndex(item=>item.path == "case_handle_deleteEvidence");
        if(index1 ==-1 && deleteEvidenceItem)
        this.docTableDatas.push(deleteEvidenceItem)
      }else{
        let index1  = this.docTableDatas.findIndex(item=>item.path == "case_handle_deleteEvidence");
        if(index1 !=-1)
        this.docTableDatas.splice(index1,1);
      }
      let importantCaseTeamDissDocItem =  this.docTableDatasCopy.find(item=> item.path == "case_handle_importantCaseTeamDissDoc_SC")
      let importantCaseCheckOpinionItem =  this.docTableDatasCopy.find(item=> item.path == "case_handle_importantCaseCheckOpinion_SC")
      
      if(this.formData.dynamicSelectDocArr.includes("5")){ //重大案件
        let index1  = this.docTableDatas.findIndex(item=>item.path == "case_handle_importantCaseTeamDissDoc_SC");
        let index2  = this.docTableDatas.findIndex(item=>item.path == "case_handle_importantCaseCheckOpinion_SC");
        if(index1 ==-1 && importantCaseTeamDissDocItem)
        this.docTableDatas.push(importantCaseTeamDissDocItem);
        if(index2 ==-1 && importantCaseCheckOpinionItem)
        this.docTableDatas.push(importantCaseCheckOpinionItem);
      }else{
        let index1  = this.docTableDatas.findIndex(item=>item.path == "case_handle_importantCaseTeamDissDoc_SC");
        let index2  = this.docTableDatas.findIndex(item=>item.path == "case_handle_importantCaseCheckOpinion_SC");
        if(index1 !=-1)
        this.docTableDatas.splice(index1,1);
        if(index2 !=-1)
        this.docTableDatas.splice(index2,1);
      }

      
    },
    
    changeFilterDoc(){
      this.setMoreDocTableTitle()
    },
    getDataAfter(){
      this.getDocListByCaseIdAndFormId();
      if(`${this.formData.partyUnitPosition}`=='' &&`${this.formData.occupation}` ==''){
          this.formData.partyUnitPositionAndCom = "无";
      }else{
          this.formData.partyUnitPositionAndCom = `${this.formData.partyUnitPosition} ${this.formData.occupation}`;
      }
    },
    
  },
  created() {
    this.setFormData();
    
  }
};
</script>

<style lang="scss" src="@/assets/css/documentForm.scss" scoped>
</style>
