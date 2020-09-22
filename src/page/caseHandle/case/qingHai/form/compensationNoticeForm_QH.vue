<template>
  <div class="box" style="background:#eaedf4">
    <el-form ref="caseDocForm" :model="formData" :rules="rules" label-width="140px">
      <div class="content_box" style="background:#fff;margin-bottom:22px">
        <div class="content">
          <div class="content_title">赔补偿通知</div>
          <div class="border_blue"></div>
          <!-- 当事人基本情况 -->
          <div class="content_form">
            <div class="row">
              <div class="col">
                <el-form-item prop="caseNumber" label="案件编号" :rules="fieldRules('caseNumber',propertyFeatures['caseNumber'])">
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
            <div class="row">
              <div class="col">
                <el-form-item label="当事人姓名" prop="party" :rules="fieldRules('party',propertyFeatures['party'])">
                  <el-input ref="party" clearable class="w-120" v-model="formData.party" size="small" placeholder="请输入" :disabled="fieldDisabled(propertyFeatures['party'])"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="地址" prop="partyAddress" :rules="fieldRules('partyAddress',propertyFeatures['partyAddress'])">
                  <el-input ref="partyAddress" clearable class="w-120" v-model="formData.partyAddress" size="small" placeholder="请输入" :disabled="fieldDisabled(propertyFeatures['partyAddress'])"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="单位名称" prop="partyName" :rules="fieldRules('partyName',propertyFeatures['partyName'])">
                  <el-input ref="partyName" clearable class="w-120" v-model="formData.partyName" size="small" placeholder="请输入" :disabled="fieldDisabled(propertyFeatures['partyName'])"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="单位法定代表人" prop="partyManager" :rules="fieldRules('partyManager',propertyFeatures['partyManager'])">
                  <el-input ref="partyManager" clearable class="w-120" v-model="formData.partyManager" size="small" placeholder="请输入" :disabled="fieldDisabled(propertyFeatures['partyManager'])"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="车型" prop="vehicleShipType" :rules="fieldRules('vehicleShipType',propertyFeatures['vehicleShipType'])">
                  <!-- <el-input ref="vehicleShipType" clearable class="w-120" v-model="formData.vehicleShipType" size="small" placeholder="请输入" :disabled="originalData.vehicleShipType ? true : false"></el-input> -->
                  <el-select v-model="formData.vehicleShipType" :disabled="fieldDisabled(propertyFeatures['vehicleShipType'])">
                    <!-- <el-option
                      v-for="item in allVehicleShipType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option> -->
                    <el-option v-for="item in allVehicleShipType" :key="item.id" :label="item.name" :value="item.name"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="车牌号" prop="vehicleShipId" :rules="fieldRules('vehicleShipId',propertyFeatures['vehicleShipId'])">
                  <el-input ref="vehicleShipId" clearable class="w-120" v-model="formData.vehicleShipId" size="small" placeholder="请输入" :disabled="fieldDisabled(propertyFeatures['vehicleShipId'])"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="border_blue"></div>
          <!-- 事实认定 -->
          <div class="content_form">
            <div class="row">
              <div class="col">
                <el-form-item label="案件发生时间" prop="afsj" :rules="fieldRules('afsj',propertyFeatures['afsj'])">
                  <el-date-picker :disabled="fieldDisabled(propertyFeatures['afsj'])" size="small" style="width:240px" v-model="formData.afsj" type="date" format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="afdd" label="案发地点" :rules="fieldRules('afdd',propertyFeatures['afdd'])">
                  <el-input v-model="formData.afdd" :disabled="fieldDisabled(propertyFeatures['afdd'])"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="afddparty" label="路政执法单位" :rules="fieldRules('afddparty',propertyFeatures['afddparty'])">
                  <el-input v-model="formData.afddparty" :disabled="fieldDisabled(propertyFeatures['afddparty'])"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="illegalFact" label="事实认定" :rules="fieldRules('illegalFact',propertyFeatures['illegalFact'])">
                  <el-input :disabled="fieldDisabled(propertyFeatures['illegalFact'])" type="textarea" clearable class="w-120" v-model="formData.illegalFact" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="illegalLaw" label="法律法规依据" :rules="fieldRules('illegalLaw',propertyFeatures['illegalLaw'])">
                  <el-input :disabled="fieldDisabled(propertyFeatures['illegalLaw'])" type="textarea" clearable class="w-120" v-model="formData.illegalLaw" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="punishDecision" label="赔补偿决定" :rules="fieldRules('punishDecision',propertyFeatures['punishDecision'])">
                  <el-input :disabled="fieldDisabled(propertyFeatures['punishDecision'])" type="textarea" clearable class="w-120" v-model="formData.punishDecision" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content_box" style="background:#fff">
        <div class="content">
          <div class="table_form">
            <el-table :data="docTableDatas" stripe border style="width: 100%" :row-class-name="getRowClass">
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
                    <template v-else>已完成</template>
                  </span>
                  <span v-if="scope.row.status == '0'">未完成</span>
                  <span v-if="scope.row.status == ''">-</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
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
        <!-- 悬浮按钮 -->
        <div class="float-btns btn-height63">
          <el-button type="primary" @click="continueHandle" :disabled="!canGoNextLink" v-if="!this.$route.params.isComplete && !IsLawEnforcementSupervision">
            <svg t="1577515608465" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2285" width="24" height="24">
              <path d="M79.398558 436.464938c-25.231035 12.766337-56.032441 2.671394-68.800584-22.557835-12.775368-25.222004-2.682231-56.025216 22.548804-68.798778 244.424411-123.749296 539.711873-85.083624 744.047314 97.423694 33.059177-37.018403 66.118353-74.034999 99.179336-111.042564 26.072732-29.199292 74.302319-15.865804 81.689744 22.574091 20.740782 107.953934 41.486982 215.915094 62.229569 323.867222 5.884653 30.620785-18.981527 58.454577-50.071928 56.06134-109.610235-8.480185-219.211438-16.95134-328.812642-25.422494-39.021496-3.010963-57.692354-49.437946-31.610591-78.633625 33.060983-37.007565 66.116547-74.025968 99.175724-111.03534-172.88741-154.431492-422.746726-187.152906-629.574746-82.435711z" fill="#FFFFFF" p-id="2286" />
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
import checkDocFinish from "@/page/caseHandle/components/checkDocFinish.vue";
import chooseAskPeopleDia from "@/page/caseHandle/components/chooseAskPeopleDia";
import resetDocDia from '@/page/caseHandle/components/resetDocDia'
import iLocalStroage from "@/common/js/localStroage";
import caseSlideMenu from '@/page/caseHandle/components/caseSlideMenu'
import {
  getDictListDetailByNameApi
} from "@/api/system";
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
      validatePhone: validatePhone,
      validateIDNumber: validateIDNumber,
      formData: {
        caseNumber: "",
        caseCauseName: "",
        afsj: "",
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
        vehicleShipType: "",
        relationWithCase: "",
        partyUnitPosition: "",
        occupation: "",
        afdd:"",
        afddparty:"",
        illegalFact:"",
        punishDecision:"",
        illegalLaw:''
      },
      caseLinkDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件ID
        caseLinktypeId: this.BASIC_DATA_SYS.compensationNote_caseDoctypeId, //表单类型ID
        // caseLinktypeId:'', ////表单类型ID
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
      allVehicleShipType: [],
      allRelationWithCase: [],
      docTableDatasCopy: [],
      allAskDocList: [], //询问笔录
      askDocListNum: 0,  //询问笔录次数
      askDocListFinishNum: 0,//已完成询问笔录次数
      needDealData: true,
      propertyFeatures: '', //字段属性配置

    };
  },
  computed: {
    ...mapGetters(["caseId", 'IsLawEnforcementSupervision'])
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
          this.docTableDatas[i].isRequired === 0 && (Number(this.docTableDatas[i].status) == 0)
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
      row.url = this.$route.name;
      row.caseBasicinfoId = this.caseBasicinfoId
      this.$store.commit("setCurrentFileData", row);//保存文书信息
      console.log("查看");
      this.com_viewDoc(row, this.caseLinkDataForm.caseLinktypeId);
    },
    addMoreDoc(row) {
      console.log("添加", row);
      iLocalStroage.removeItem("currentDocDataId");
      this.$refs.chooseAskPeopleDiaRef.showModal(row, this.caseLinkDataForm.caseLinktypeId, this.isSaveLink);
    },
    //清空文书
    delDocDataByDocId(data) {
      console.log("清空文书", data);
      this.$refs.resetDocDiaRef.showModal(data);
    },
    //预览pdf
    viewDocPdf(row) {
      console.log('row', row)
      row.url = this.$route.name;
      row.caseBasicinfoId = this.caseBasicinfoId
      this.$store.commit("setCurrentFileData", row);//保存文书信息
      let routerData = {
        hasApprovalBtn: false,
        docId: row.docId,
        approvalOver: false,
        hasBack: true,
        status: row.status,  //status状态 0 暂存 1保存未提交  2 保存并提交
        docDataId: row.docDataId
      };
      this.$store.dispatch("deleteTabs", this.$route.name);
      this.$router.push({ name: "case_handle_myPDF", params: routerData });
    },
    //通过案件id和表单类型Id查询已绑定文书
    getDocListByCaseIdAndFormId() {
      let data = {
        linkTypeId: this.caseLinkDataForm.caseLinktypeId
      };
      console.log('hahhhsh')
      this.com_getDocListByCaseIdAndFormId(data);
    },
    //返回到流程图
    backBtn() {
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      this.$router.go(-1);
    },
    getRowClass: function (row, index) {
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
          if (item.status === 0 || item.status === 1 || item.status === 2)
            this.allAskDocList.push(item);

          if (item.status === 1 || item.status === 2) askDocListFinishNum++
        }
      });
      if (this.allAskDocList.length > 0) {
        let askDocAllNumAndFinishTitle = '询问笔录' + '（' + askDocListFinishNum + '/' + this.allAskDocList.length + ')';
        this.docTableDatas[0].name = askDocAllNumAndFinishTitle;
      }


      console.log("this.docTableDatas", this.docTableDatas);
      console.log("this.allAskDocList", this.allAskDocList);
    },
    getDataAfter() {
      console.log("111111", this.formData)
      if (`${this.formData.partyUnitPosition}` == '' && `${this.formData.occupation}` == '') {
        this.formData.partyUnitPositionAndCom = "无";
      } else {
        this.formData.partyUnitPositionAndCom = `${this.formData.partyUnitPosition} ${this.formData.occupation}`;
      }
      console.log(this.formData.illegalLaw)
      debugger
      // 需要在系统中绑定-目前绑定报错
      this.formData.illegalLaw='根据'+this.formData.illegalLaw+'规定，当事人应当赔（补）偿如下：当事人'+this.formData.party+'应缴纳公路路产赔补偿人民币：'
      +this.combined(this.formData.payTotal)
    },
    //将金额转换为大写(小写)
    combined(val) {
      this.formData.payTotal = Number(val).toFixed(2);
      if(this.formData.payTotal == "NaN"){
        this.$message.warning("请输入正确数字");
        return;
      }
      let buffer = val;
      if (buffer == "0" || buffer == "" || buffer == null) {
        this.formData.payTotal = "零(0.00)";
      } else {
        let unit = "仟佰拾亿仟佰拾万仟佰拾元角分";
        let str = "";
        buffer += "00";
        const p = buffer.indexOf(".");
        if (p >= 0) {
          buffer = buffer.substring(0, p) + buffer.substr(p + 1, 2);
        }
        unit = unit.substr(unit.length - buffer.length);
        for (let i = 0; i < buffer.length; i++) {
          str +=
            "零壹贰叁肆伍陆柒捌玖".charAt(buffer.charAt(i)) + unit.charAt(i);
        }
        return str
            .replace(/零(仟|佰|拾|角)/g, "零")
            .replace(/(零)+/g, "零")
            .replace(/零(万|亿|元)/g, "$1")
            .replace(/(亿)万|壹(壹拾)/g, "$1$2")
            .replace(/^元零?|零分/g, "")
            .replace(/元$/g, "元"+ "整") +
          "（" +"￥:"+this.formData.payTotal+
          "）";
      }
    },
    async initDraw() {
      let data1 = await getDictListDetailByNameApi('与案件关系');
      this.allRelationWithCase = data1.data;
      //车辆类型
      let data2 = await getDictListDetailByNameApi('车辆类型');
      this.allVehicleShipType = data2.data;
    },
    async initData() {
      await this.initDraw();
      await this.queryFlowBycaseId();
      
      this.setFormData();
      //通过案件id和表单类型Id查询已绑定文书
      this.getDocListByCaseIdAndFormId();
    }
  },
  //   activated() {
  //     this.initData()
  //   }
  created() {
    this.initData()
  }
};
</script>

<style lang="scss" src="@/assets/css/documentForm.scss" scoped>
</style>
