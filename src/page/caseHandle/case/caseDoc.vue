<template>
  <div class="box">
    <el-form ref="caseDocForm" :model="formData" :rules="rules" label-width="115px">
      <div class="content_box">
        <div class="content">
          <div class="content_title">调查类文书</div>
          <div class="border_blue"></div>
          <div class="content_form">
            <div class="row">
              <div class="col">
                <el-form-item prop="caseNumber" label="案号" :rules="propertyFeatures['caseNumber'] && propertyFeatures['caseNumber'].required ? rules.caseNumber : [{ required: false, trigger: 'blur' }]">
                  <el-input
                    ref="caseNumber"
                    clearable
                    class="w-120"
                    v-model="formData.caseNumber"
                    size="small"
                    :disabled="propertyFeatures['caseNumber'] && propertyFeatures['caseNumber'].editable==false"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="caseCauseName" label="案由" :rules="propertyFeatures['caseCauseName'] && propertyFeatures['caseCauseName'].required ? rules.caseCauseName : [{ required: false, trigger: 'blur' }]">
                  <el-input
                    ref="caseCauseName"
                    clearable
                    class="w-120"
                    v-model="formData.caseCauseName"
                    size="small"
                    :disabled="propertyFeatures['caseCauseName'] && propertyFeatures['caseCauseName'].editable==false"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row" v-if="isParty">
              <div class="col">
                <el-form-item label="姓名" :rules="propertyFeatures['party'] && propertyFeatures['party'].required ? rules.party : [{ required: false, trigger: 'blur' }]">
                  <el-input
                    ref="party"
                    clearable
                    class="w-120"
                    v-model="formData.party"
                    size="small"
                    placeholder="请输入"
                    :disabled="propertyFeatures['party'] && propertyFeatures['party'].editable==false"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="性别" prop="partySex" :rules="propertyFeatures['partySex'] && propertyFeatures['partySex'].required ? rules.partySex : [{ required: false, trigger: 'blur' }]">
                  <el-select
                    placeholder="请选择"
                    v-model="formData.partySex"
                    :disabled="propertyFeatures['partySex'] && propertyFeatures['partySex'].editable==false"
                  >
                    <el-option value="0" label="男"></el-option>
                    <el-option value="1" label="女"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="row" v-if="isParty">
              <div class="col">
                <el-form-item label="身份证件号" prop="partyIdNo" :rules="propertyFeatures['partyIdNo'] && propertyFeatures['partyIdNo'].required ? rules.partyIdNo : [{ required: false, trigger: 'blur' }]">
                  <el-input
                    clearable
                    class="w-120"
                    v-model="formData.partyIdNo"
                    size="small"
                    placeholder="请输入"
                    :disabled="propertyFeatures['partyIdNo'] && propertyFeatures['partyIdNo'].editable==false"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <!-- <el-form-item label="年龄" prop="partyAge">
                  <el-input ref="partyAge" clearable class="w-120" type="number" v-model="formData.partyAge" size="small" placeholder="请输入" :disabled="originalData.partyAge ? true : false"></el-input>
                </el-form-item> -->
                <el-form-item label="与案件关系" prop="relationWithCase" :rules="propertyFeatures['relationWithCase'] && propertyFeatures['relationWithCase'].required ? rules.relationWithCase : [{ required: false, trigger: 'change' }]">
                    <el-select ref="relationWithCase" v-model="formData.relationWithCase" :disabled="propertyFeatures['relationWithCase'] && propertyFeatures['relationWithCase'].editable==false">
                      <el-option v-for="item in allRelationWithCase" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                 </el-form-item>
              </div>
            </div>
            <div class="row" v-if="isParty">
              <div class="col">
                <el-form-item label="联系电话" prop="partyTel" :rules="propertyFeatures['partyTel'] && propertyFeatures['partyTel'].required ? rules.partyTel : [{ required: false, trigger: 'blur' }]">
                  <el-input
                    ref="partyTel"
                    clearable
                    class="w-120"
                    v-model="formData.partyTel"
                    size="small"
                    placeholder="请输入"
                    :disabled="propertyFeatures['partyTel'] && propertyFeatures['partyTel'].editable==false"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <!-- <el-form-item label="所在单位">
                  <el-input ref="partyUnitPosition" clearable class="w-120" v-model="formData.partyUnitPosition" size="small" placeholder="请输入" :disabled="originalData.partyUnitPosition ? true : false"></el-input>
                </el-form-item> -->
                <el-form-item label="单位及职务" prop="partyUnitPositionAndCom" :rules="propertyFeatures['partyUnitPositionAndCom'] && propertyFeatures['partyUnitPositionAndCom'].required ? rules.partyUnitPositionAndCom : [{ required: false, trigger: 'blur' }]">
                     <el-input ref="partyUnitPositionAndCom" clearable class="w-120" v-model="formData.partyUnitPositionAndCom" size="small" placeholder="请输入" 
                     :disabled="propertyFeatures['partyUnitPositionAndCom'] && propertyFeatures['partyUnitPositionAndCom'].editable==false"></el-input>
                 </el-form-item>
              </div>
            </div>
            <div class="row" v-if="isParty">
              <div class="col">
                <el-form-item label="联系地址" prop="partyAddress" :rules="propertyFeatures['partyAddress'] && propertyFeatures['partyAddress'].required ? rules.partyAddress : [{ required: false, trigger: 'blur' }]">
                  <el-input
                    ref="partyAddress"
                    clearable
                    class="w-120"
                    v-model="formData.partyAddress"
                    size="small"
                    placeholder="请输入"
                    :disabled="propertyFeatures['partyAddress'] && propertyFeatures['partyAddress'].editable==false"
                  ></el-input>
                </el-form-item>
              </div>
              <!-- <div class="col">
                <el-form-item label="邮编" prop="partyZipCode">
                  <el-input ref="partyZipCode" clearable class="w-120" v-model="formData.partyZipCode" size="small" placeholder="请输入" :disabled="originalData.partyZipCode ? true : false"></el-input>
                </el-form-item>
              </div> -->
            </div>

            <div class="row" v-if="!isParty">
              <div class="col">
                <el-form-item label="单位" prop="partyName" :rules="propertyFeatures['partyName'] && propertyFeatures['partyName'].required ? rules.partyName : [{ required: false, trigger: 'blur' }]">
                  <el-input
                    ref="partyName"
                    clearable
                    class="w-120"
                    v-model="formData.partyName"
                    size="small"
                    placeholder="请输入"
                    :disabled="propertyFeatures['partyName'] && propertyFeatures['partyName'].editable==false"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="地址" prop="partyUnitAddress" :rules="propertyFeatures['partyUnitAddress'] && propertyFeatures['partyUnitAddress'].required ? rules.partyUnitAddress : [{ required: false, trigger: 'blur' }]">
                  <el-input
                    ref="partyUnitAddress"
                    clearable
                    class="w-120"
                    v-model="formData.partyUnitAddress"
                    size="small"
                    placeholder="请输入"
                    :disabled="propertyFeatures['partyUnitAddress'] && propertyFeatures['partyUnitAddress'].editable==false"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row" v-if="!isParty">
              <div class="col">
                <el-form-item label="法定代表人" prop="partyManager" :rules="propertyFeatures['partyManager'] && propertyFeatures['partyManager'].required ? rules.partyManager : [{ required: false, trigger: 'blur' }]">    
                  <el-input
                    ref="partyManager"
                    clearable
                    class="w-120"
                    v-model="formData.partyManager"
                    size="small"
                    placeholder="请输入"
                    :disabled="propertyFeatures['partyManager'] && propertyFeatures['partyManager'].editable==false"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="联系电话" prop="partyUnitTel" :rules="propertyFeatures['partyUnitTel'] && propertyFeatures['partyUnitTel'].required ? rules.partyUnitTel : [{ required: false, trigger: 'blur' }]">    
                  <el-input
                    ref="partyUnitTel"
                    clearable
                    class="w-120"
                    v-model="formData.partyUnitTel"
                    size="small"
                    placeholder="请输入"
                    :disabled="propertyFeatures['partyUnitTel'] && propertyFeatures['partyUnitTel'].editable==false"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row" v-if="!isParty">
              <div class="col">
                <el-form-item label="统一社会信用代码" class="line-height13" prop="socialCreditCode" :rules="propertyFeatures['socialCreditCode'] && propertyFeatures['socialCreditCode'].required ? rules.socialCreditCode : [{ required: false, trigger: 'blur' }]">    
                  <el-input
                    ref="socialCreditCode"
                    clearable
                    class="w-120"
                    v-model="formData.socialCreditCode"
                    size="small"
                    placeholder="请输入"
                    :disabled="propertyFeatures['socialCreditCode'] && propertyFeatures['socialCreditCode'].editable==false"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="车牌号码" prop="vehicleShipId" :rules="propertyFeatures['vehicleShipId'] && propertyFeatures['vehicleShipId'].required ? rules.vehicleShipId : [{ required: false, trigger: 'blur' }]">    
                  <el-input
                    ref="vehicleShipId"
                    clearable
                    class="w-120"
                    v-model="formData.vehicleShipId"
                    size="small"
                    placeholder="请输入"
                    :disabled="propertyFeatures['vehicleShipId'] && propertyFeatures['vehicleShipId'].editable==false"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="车辆类型" prop="vehicleShipType" :rules="propertyFeatures['vehicleShipType'] && propertyFeatures['vehicleShipType'].required ? rules.vehicleShipType : [{ required: false, trigger: 'change' }]">    
                  <!-- <el-input ref="vehicleShipType" clearable class="w-120" v-model="formData.vehicleShipType" size="small" placeholder="请输入" :disabled="originalData.vehicleShipType ? true : false"></el-input> -->
                  <el-select v-model="formData.vehicleShipType"  :disabled="propertyFeatures['vehicleShipType'] && propertyFeatures['vehicleShipType'].editable==false">
                    <el-option
                      v-for="item in allVehicleShipType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content_box">
        <div class="content">
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
                        <span v-if="item.status == '1'">已完成</span>
                        <span v-if="item.status == '0'">未完成</span>
                      </div>
                      <div>
                        <span v-if="item.status == '1'" class="tableHandelcase">
                          <!-- 已完成 -->
                          <i class="iconfont law-eye" @click="viewDocPdf(item)"></i>
                          <i class="iconfont law-print"></i>
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
                  <span v-if="scope.row.status == '1'">已完成</span>
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
                    <span v-if="scope.row.status == '1'" class="tableHandelcase" @click="viewDocPdf(scope.row)">查看</span>
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
        <!-- 悬浮按钮 -->
        <div class="float-btns btn-height63">
          <el-button type="primary" @click="continueHandle" :disabled="!canGoNextLink" v-if="!this.$route.params.isComplete">
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

          <el-button type="primary" @click="submitCaseDoc(1)" :disabled="canGoNextLink" v-if="!this.$route.params.isComplete">
            <i class="iconfont law-save"></i>
            <br />保存
          </el-button>
          <el-button type="primary" @click="backBtn" v-if="this.$route.params.isComplete">
            <i class="iconfont law-back"></i>
            <br />返回
          </el-button>
        </div>
      </div>
    </el-form>
    <checkDocFinish ref="checkDocFinishRef"></checkDocFinish>
    <chooseAskPeopleDia ref="chooseAskPeopleDiaRef"></chooseAskPeopleDia>
    <resetDocDia ref="resetDocDiaRef" @getDocListByCaseIdAndFormIdEmit="getDocListByCaseIdAndFormId"></resetDocDia>
    <caseSlideMenu :activeIndex="''"></caseSlideMenu>
  </div> 
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import checkDocFinish from "../components/checkDocFinish";
import chooseAskPeopleDia from "@/page/caseHandle/components/chooseAskPeopleDia";
import resetDocDia from '@/page/caseHandle/components/resetDocDia'
import iLocalStroage from "@/common/js/localStroage";
import caseSlideMenu from '@/page/caseHandle/components/caseSlideMenu'

import {
  validateIDNumber,
  validatePhone,
  validateZIP
} from "@/common/js/validator";
export default {
  components: {
    checkDocFinish,
    chooseAskPeopleDia,
    resetDocDia,
    caseSlideMenu
  },
  data() {
    return {
      formData: {
        caseNumber: "",
        caseCauseName: "",
        party: "",
        partySex: "",
        partyIdNo: "",
        partyAge: "",
        partyTel: "",
        partyUnitPositionAndCom: "",
        partyAddress: "",
        partyZipCode: "",
        partyName: "",
        partyUnitAddress: "",
        partyManager: "",
        partyUnitTel: "",
        socialCreditCode: "",
        vehicleShipId: "",
        vehicleShipType: ""
      },
      caseLinkDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件ID
        caseLinktypeId: "2c90293b6c178b55016c17c93326000f", //表单类型ID
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

      },
      // nextBtnDisab: true
      isParty: true, //当事人类型为个人
      originalData: "",
      allVehicleShipType: [
        { value: "1", label: "中小客车" },
        { value: "2", label: "大客车" },
        { value: "3", label: "小型货车" },
        { value: "4", label: "中型货车" },
        { value: "5", label: "大型货车" },
        { value: "6", label: "特大型货车" },
        { value: "7", label: "集装箱车" },
        { value: "8", label: "摩托车" },
        { value: "9", label: "拖拉机" }
      ],
      allRelationWithCase: [
        //与案件关系下拉框
        { value: "0", label: "当事人" },
        { value: "1", label: "驾驶人" },
        { value: "2", label: "实际所有者" },
        { value: "3", label: "证人" },
        { value: "4", label: "承运人" },
        { value: "5", label: "代理人" }
      ],
      docTableDatasCopy: [],
      allAskDocList: [], //询问笔录
      askDocListNum:0,  //询问笔录次数
      askDocListFinishNum:0,//已完成询问笔录次数
      needDealData:true,
      propertyFeatures:'', //字段属性配置
      
    };
  },
  computed: {
    ...mapGetters(["caseId"])
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
      for (let i = 0; i < this.docTableDatas.length; i++) {
        if (
          this.docTableDatas[i].isRequired === 0 &&
          (this.docTableDatas[i].status != 1 ||
            this.docTableDatas[i].status != "1")
        ) {
          canGotoNext = false;
          break;
        }
      }
      if (canGotoNext) {
        this.com_goToNextLinkTu(
          this.caseId,
          this.caseLinkDataForm.caseLinktypeId
        );
      } else {
        this.$refs.checkDocFinishRef.showModal(this.docTableDatas, caseData);
      }

      // this.com_goToNextLinkTu(this.caseLinkDataForm.caseLinktypeId);
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
      //为询问笔录时弹出选择框
      // if (row.docId == "2c9029ca5b71686d015b71a86ead0032") {
      //   this.$refs.chooseAskPeopleDiaRef.showModal(row, this.isSaveLink);
      // } else {
      //   this.com_viewDoc(row);
      // }
      console.log("查看");
      this.com_viewDoc(row);
    },
    addMoreDoc(row) {
      console.log("添加",row);
      iLocalStroage.removeItem("currentDocDataId");
      this.$refs.chooseAskPeopleDiaRef.showModal(row, this.isSaveLink);
    },
    //清空文书
    delDocDataByDocId(data){
      console.log("清空文书",data);
      this.$refs.resetDocDiaRef.showModal(data);
    },
    //预览pdf
    viewDocPdf(row) {
      console.log('row',row)
      let routerData = {
        hasApprovalBtn: false,
        docId: row.docId,
        approvalOver: false,
        hasBack: true,
        docDataId:row.docDataId
      };
      this.$store.dispatch("deleteTabs", this.$route.name);
      this.$router.push({ name: "case_handle_myPDF", params: routerData }); 
    },
    //通过案件id和表单类型Id查询已绑定文书
    getDocListByCaseIdAndFormId() {
      let data = {
        linkTypeId: "2c90293b6c178b55016c17c93326000f" //环节ID
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

      this.docTableDatas.push({
        name: "询问笔录",
        status: "询问",
        openRow: true,
        // url: "case_handle_othermodle",
        path: "case_handle_othermodle",
        docId: "2c9029ca5b71686d015b71a86ead0032"
      });
      let askDocListFinishNum = 0;
      this.docTableDatasCopy.forEach(item => {
        if (item.name != "询问笔录") {
          this.docTableDatas.push(item);
        } else {
          if(item.status === 0 || item.status === 1)
          this.allAskDocList.push(item);

          if(item.status === 1) askDocListFinishNum++
        }
      });
      if(this.allAskDocList.length>0){
        let askDocAllNumAndFinishTitle = '询问笔录'+'（'+ askDocListFinishNum +'/'+this.allAskDocList.length+')';
        this.docTableDatas[0].name = askDocAllNumAndFinishTitle;
      }


      console.log("this.docTableDatas", this.docTableDatas);
      console.log("this.allAskDocList", this.allAskDocList);
    },
    getDataAfter(){
      this.formData.partyUnitPositionAndCom = `${this.formData.partyUnitPosition} ${this.formData.occupation}`;
    }
  },
  created() {
    this.setFormData();
    //通过案件id和表单类型Id查询已绑定文书
    this.getDocListByCaseIdAndFormId();
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/documentForm.scss";
</style>
