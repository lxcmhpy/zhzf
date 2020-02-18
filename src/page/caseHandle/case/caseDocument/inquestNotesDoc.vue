<template>
  <div class="print_box">
    <div class="print_info indent_style" id="inquestNote_print">
      <el-form ref="docForm" :inline-message="true" :inline="true" :model="docData" :rules="rules" >
        <div class="doc_topic">勘验笔录</div>
        <div class="doc_number">案号：{{docData.caseNumber}}</div>
        <!-- <el-button @click="onSubmit('docForm')">formName</el-button> -->
        <p>案由：
          <el-form-item v-if="!lineStyleFlag" prop="caseName" style="width:500px">
            <el-input type='textarea' v-model="docData.caseName" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength' placeholder="\"></el-input>
          </el-form-item>
          <u v-if="lineStyleFlag">{{docData.caseName}}</u>
        </p>
        <p>
          勘验时间：<el-form-item prop="inquestStartTime" class="pdf_datapick" style="width:212px">
            <el-date-picker v-model="docData.inquestStartTime" format="yyyy年MM月dd日HH时mm分" placeholder="    年  月  日  时  分" clear-icon='el-icon-circle-close'>
            </el-date-picker>
          </el-form-item>
          至
          <el-form-item prop="inquestEndTime" class="pdf_datapick" style="width:212px">
            <el-date-picker v-model="docData.inquestEndTime" format="dd日HH时mm分" placeholder="    日  时  分" clear-icon='el-icon-circle-close'>
            </el-date-picker>
          </el-form-item>
        </p>
        <el-row>
          <el-col :span="14">
            <p>勘验场所：<el-form-item v-if="!lineStyleFlag" prop="inquestAddress" style="width:240px">
                <el-input type='textarea' v-model="docData.inquestAddress" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength' placeholder="\"></el-input>
              </el-form-item>
              <u v-if="lineStyleFlag">{{docData.inquestAddress}}</u></p>
          </el-col>
          <el-col :span="10">
            <p>天气状况：<el-form-item prop="weather" style="width:140px">
                <el-select v-model="docData.weather" :maxLength='maxLength' placeholder="\">
                  <el-option v-for="item in options" :key="item.name" :label="item.label" :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </p>
          </el-col>
        </el-row>
        <p>
          勘验人：<el-form-item prop="staff1" style="width:80px">
            <el-input v-model="docData.staff1" :maxLength='maxLength' placeholder="\"></el-input>
          </el-form-item>
          单位及职务：<el-form-item prop="staffUnitAndPosition1" style="width:140px">
            <el-input v-model="docData.staffUnitAndPosition1" :maxLength='maxLength' placeholder="\"></el-input>
          </el-form-item>
          执法证号：<el-form-item prop="certificateId1" style="width:80px">
            <el-input v-model="docData.certificateId1" :maxLength='maxLength' placeholder="\"></el-input>
          </el-form-item>
        </p>
        <p>
          勘验人：<el-form-item prop="staff2" style="width:80px">
            <el-input v-model="docData.staff2" :maxLength='maxLength' placeholder="\"></el-input>
          </el-form-item>
          单位及职务：<el-form-item prop="staffUnitAndPosition2" style="width:140px">
            <el-input v-model="docData.staffUnitAndPosition2" :maxLength='maxLength' placeholder="\"></el-input>
          </el-form-item>
          执法证号：<el-form-item prop="certificateId2" style="width:80px">
            <el-input v-model="docData.certificateId2" :maxLength='maxLength' placeholder="\"></el-input>
          </el-form-item>
        </p>
        <p>
          当事人（当事人代理人）姓名：<el-form-item prop="party" style="width:80px">
            <el-input v-model="docData.party" :maxLength='maxLength' placeholder="\"></el-input>
          </el-form-item>
          性别：<el-form-item prop="partySex" style="width:70px">
            <el-input v-model="docData.partySex" :maxLength='maxLength' placeholder="\"></el-input>
          </el-form-item>
          年龄：<el-form-item prop="partyAge" style="width:60px">
            <el-input v-model="docData.partyAge" :maxLength='maxLength' placeholder="\"></el-input>
          </el-form-item>
        </p>
        <!-- <el-row>
            <el-col :span="12">
              <p>身份证号：<el-form-item v-if="!lineStyleFlag" prop="partyIdNo" style="width:285px">
                  <el-input type='textarea' v-model="docData.partyIdNo" v-bind:class="{ over_flow:docData.partyIdNo.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength' placeholder="\"></el-input>
                </el-form-item>
                <u v-if="lineStyleFlag">{{docData.partyIdNo}}</u></p>
            </el-col>
            <el-col :span="12">
              <p>单位及职务：<el-form-item v-if="!lineStyleFlag" prop="partyUnitAndPosition" style="width:285px">
                  <el-input type='textarea' v-model="docData.partyUnitAndPosition" v-bind:class="{ over_flow:docData.partyUnitAndPosition.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength' placeholder="\"></el-input>
                </el-form-item>
                <u v-if="lineStyleFlag">{{docData.partyUnitAndPosition}}</u>
              </p>
            </el-col>
          </el-row> -->
        <p>
          身份证号：<el-form-item prop="partyIdNo" style="width:180px">
            <el-input v-model="docData.partyIdNo" :maxLength='maxLength' placeholder="\"></el-input>
          </el-form-item>
          单位及职务：<el-form-item prop="partyUnitAndPosition" style="width180">
            <el-input v-model="docData.partyUnitAndPosition" :maxLength='maxLength' placeholder="\"></el-input>
          </el-form-item>
        </p>
        <p>
          住址：<el-form-item prop="partyAddress" style="width:200px">
            <el-input v-model="docData.partyAddress" :maxLength='maxLength' placeholder="\"></el-input>
          </el-form-item>
          联系电话：<el-form-item prop="partyTel" style="width:200px">
            <el-input v-model="docData.partyTel" :maxLength='maxLength' placeholder="\"></el-input>
          </el-form-item>
        </p>
        <p>
          被邀请人：<el-form-item prop="invited" style="width:180px">
            <el-input v-model="docData.invited" :maxLength='maxLength' placeholder="\"></el-input>
          </el-form-item>
          单位及职务：<el-form-item prop="invitedUnitAndPosition" style="width:180px">
            <el-input v-model="docData.invitedUnitAndPosition" :maxLength='maxLength' placeholder="\"></el-input>
          </el-form-item>
        </p>
        <p>
          记录人：<el-form-item prop="recorder">
            <el-autocomplete v-model="docData.recorder" :maxLength='maxLength' placeholder="\" :fetch-suggestions="queryStaff"  @select="handleSelect"></el-autocomplete>
          </el-form-item>
          单位及职务：<el-form-item prop="recorderUnitAndPosition">
            <el-input v-model="docData.recorderUnitAndPosition" :maxLength='maxLength' placeholder="\"></el-input>
          </el-form-item>
        </p>
        <!-- <p class="side_right_indent">
          <span class="side_right" @click="overFlowEdit">
            <el-form-item prop="inquestResult">
              <span class="over_topic">勘验情况及结果：</span>
              {{docData.inquestResult}}
            </el-form-item>
          </span>
          <span class="span_bg" @click="overFlowEdit">&nbsp;</span>
          <span class="span_bg" @click="overFlowEdit">&nbsp;</span>
          <span class="span_bg" @click="overFlowEdit">&nbsp;</span>
        </p>
        <p v-if="lineStyleFlag">
          勘验情况及结果：<u>{{docData.inquestResult}}</u>
        </p> -->
        <!-- 多行样式 -->
        <div class="overflow_lins_style">
          <div class="overflow_lins">
            <el-form-item prop="inquestResult">
              <el-input class='text_indent10 overflow_lins_textarea' type='textarea' v-model="docData.inquestResult" rows="3" maxLength='90' placeholder="\"></el-input>
              <span class="overflow_describe">勘验情况及结果：</span>
              <span  class="span_bg span_bg_top" @click="overFlowEdit">&nbsp;</span>
              <span v-for="item in overFlowEditList" :key="item.id" class="span_bg" @click="overFlowEdit">&nbsp;</span>
            </el-form-item>
          </div>

        </div>
        <el-row :gutter="20">
          <el-col :span="12">
            当事人或其代理人签名：
            <span class="write_line width250"></span>
          </el-col>
          <el-col :span="12">
            勘验人签名：
            <span class="write_line width250"></span>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            被邀请人签名：
            <span class="write_line width250"></span>
          </el-col>
        </el-row>
        <!-- <div class="pdf_seal">
          <span @click='makeSeal'>交通运输执法部门(印章)</span><br>
          <el-form-item prop="makeDate" class="pdf_datapick">
            <el-date-picker v-model="docData.makeDate" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日">
            </el-date-picker>
          </el-form-item>
        </div>
        <div class="notice clear">
          <span>(本文书一式两份：一份存根，一份交当事人或其代理人。)</span>
        </div> -->
      </el-form>
    </div>
    <!-- 悬浮按钮 -->
    <!-- <div class="float-btns">
      <el-button type="success" @click="print">
        <svg t="1577706357599" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2136" width="16" height="16">
          <path d="M153.6 0h716.8v102.4H153.6zM0 153.6v614.4h153.6v256h716.8v-256h153.6V153.6z m768 768H256v-307.2h512z m153.6-563.2h-153.6V256h153.6z" p-id="2137" fill="#FFFFFF"></path>
        </svg>
        <br>
        打印
      </el-button>
      <el-button type="success">
        <svg t="1577706400265" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3033" width="16" height="16">
          <path d="M946.176 896a34.304 34.304 0 0 1 0 68.608H77.824a34.304 34.304 0 0 1 0-68.608h868.352z m0-622.08L401.92 818.176 189.44 839.68l21.504-211.968 473.088-473.088 71.168-71.168c31.744-31.744 87.552-31.744 119.296 0l71.168 71.168c15.872 15.872 24.576 37.376 24.576 59.904 0.512 22.016-8.192 43.52-24.064 59.392zM266.24 762.88l103.936-10.752 431.616-431.616-93.696-93.696L276.48 658.432 266.24 762.88zM815.104 127.488c-4.096 0-8.192 1.536-11.264 4.608l-46.592 46.592 93.696 93.696 46.592-46.592c6.144-6.144 6.144-16.384 0-22.528l-71.168-71.168c-3.072-3.072-7.168-4.608-11.264-4.608z" p-id="3034" fill="#FFFFFF"></path>
        </svg>
        <br>
        编辑
      </el-button>
      <el-button type="success" @click="makeSeal">
        <svg t="1577706320726" class="icon" viewBox="0 0 1052 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1274" width="16" height="16">
          <path d="M615.822222 597.674667c-20.48-18.744889-33.194667-48.981333-33.194666-77.539556 0-27.107556 11.52-51.683556 30.208-70.115555a1.905778 1.905778 0 0 1 0.483555-0.227556c6.314667-6.229333 13.454222-11.776 21.248-16.412444a162.872889 162.872889 0 0 0 54.812445-121.571556c0-91.079111-75.121778-164.892444-167.822223-164.892444-92.728889 0-167.879111 73.813333-167.879111 164.892444 0 48.184889 21.219556 91.477333 54.840889 121.571556 7.822222 4.636444 14.904889 10.183111 21.276445 16.412444a0.995556 0.995556 0 0 1 0.341333 0.170667c18.830222 18.488889 30.293333 43.064889 30.293333 70.172444 0 28.558222-12.714667 58.794667-33.166222 77.539556h-246.613333c-13.368889 0-24.206222 10.609778-24.206223 23.665777v152.092445h730.168889v-152.092445a23.893333 23.893333 0 0 0-24.177777-23.665777h-246.613334z m-407.210666 227.271111H834.56v52.138666H208.611556v-52.138666z" fill="#FFFFFF" p-id="1275"></path>
        </svg>
        <br>
        签章
      </el-button>
      <el-button type="primary" @click="addDocData(1)">
        <svg t="1577414377979" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1726" width="16" height="16">
          <path d="M414.273133 1024a19.76097 19.76097 0 0 1-19.741211-20.488101l8.762126-237.513979a19.749115 19.749115 0 0 1 4.202738-11.471084l503.439415-641.372015-822.359463 475.187017 249.409882 129.274208c9.688823 5.021748 13.47267 16.947289 8.450922 26.635125-5.023724 9.687835-16.946301 13.471682-26.635125 8.449934L38.362218 606.82539a19.758006 19.758006 0 1 1-0.793324-34.650361l932.344942-538.738859a19.759982 19.759982 0 0 1 29.505118 19.454706l-109.172395 912.697585a19.758994 19.758994 0 0 1-28.848132 15.124522L609.347756 847.568976l-181.518965 171.052626a19.754055 19.754055 0 0 1-13.555658 5.378398z m28.276109-250.126145l-6.748685 182.935685 156.731307-147.692555a19.76097 19.76097 0 0 1 22.780144-3.091294l239.112482 126.310359L950.834551 126.32913 442.549242 773.873855z" p-id="1727" fill="#FFFFFF"></path>
        </svg><br>
        提交
      </el-button>
    </div> -->
    <casePageFloatBtns :pageDomId="'inquestNote_print'" :formOrDocData="formOrDocData" @submitData="submitData" @saveData="saveData" @backHuanjie="submitData"></casePageFloatBtns>
    <overflowInput ref="overflowInputRef" @overFloeEditInfo="getOverFloeEditInfo"></overflowInput>
  </div>
</template>
<script>
import overflowInput from "../pdf/overflowInput";
import { mixinGetCaseApiList } from "@/js/mixins";
import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
// 验证规则
import { validatePhone, validateIDNumber } from "@/js/validator";

export default {

  data() {
    var  validatePhone = (rule, value, callback) => {
      var reg = /^1(3|4|5|6|7|8)\d{9}$/;
      if (!reg.test(value) && value) {
        // this.$alert('手机号格式错误')
        // this.$message('手机号格式错误')
         this.$notify.error({
          title: '错误',
          message: '手机号格式错误'
        });
        // callback(new Error('手机号格式错误'));
      }
      callback();
    };
    return {
      // inquestResult:'',
      restaurants: [],
      overFlowEditList:[{},{}],
      docData: {
        // caseBasicinfoId:this.caseId,
        caseNumber: "",
        caseName: "",
        inquestStartTime: "",
        inquestEndTime: "",
        inquestAddress: "",
        weather: "",
        staff1: "",
        staffUnitAndPosition1: "",
        certificateId1: "",
        staff2: "",
        staffUnitAndPosition2: "",
        certificateId2: "",
        party: "",
        partySex: "",
        partyAge: "",
        partyIdNo: "",
        partyUnitAndPosition: "",
        partyAddress: "",
        partyTel: "",
        invited: "",
        invitedUnitAndPosition: "",
        recorder: "",
        recorderUnitAndPosition: "",
        inquestResult: "",
        partySign: "",
        inquestedSign: "",
        invitedSign: "",
        recorderSign: "",
        overWidthFlag: false,
        inquestResult: '',//多行编辑内容
      },
      rules: {
        party:[{ required: true, message: "请输入", trigger: "blur" }],
        partyTel:[{ validator:validatePhone , trigger: "blur" }],
        partyIdNo:[{ validator:validateIDNumber , trigger: "blur"}],
        inquestAddress:[{ required: true, message: "请输入", trigger: "blur" }],
        staff1:[{ required: true, message: "请输入", trigger: "blur" }],
        staffUnitAndPosition1:[{ required: true, message: "请输入", trigger: "blur" }],
        certificateId1:[{ required: true, message: "请输入", trigger: "blur" }],
        staff2:[{ required: true, message: "请输入", trigger: "blur" }],
        staffUnitAndPosition2:[{ required: true, message: "请输入", trigger: "blur" }],
        certificateId2:[{ required: true, message: "请输入", trigger: "blur" }],
        recorder:[{ required: true, message: "请输入", trigger: "blur" }],
        inquestResult:[{ required: true, message: "请输入", trigger: "blur" }],
      },
      caseDocDataForm: {
        id: "",   //修改的时候用
        caseBasicinfoId: '',   //案件ID
        caseDoctypeId: this.$route.params.docId,    //文书类型ID
        //文书数据
        docData: "",
        status: "",   //提交状态
      },
      handleType: "",  // 0 暂存  1  提交
      dictId: "2dc1e0a3a8ce225c292259da39294847",
      options: [],
      lineStyleFlag: false,
      maxLength: '23',
      length: "",
      formOrDocData: {
        showBtn: [false, true, true, false, false, false, false, false, false, false], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
        pageDomId: 'inquestNote_print',
      }
    }

  },
  inject: ["reload"],
  components: {
    overflowInput,
    casePageFloatBtns
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(['caseId']) },
  methods: {
    checkHeights() {
      console.log('this.inputInfos')
      if (this.docData.inquestResult.length > 10) {
        this.overWidthFlag = true;
      }
      else
        this.overWidthFlag = false;
    },
    // // 多行编辑
    // overFlowEdit() {
    //   this.$refs.overflowInputRef.showModal(0, '');
    // },
    // // 获取多行编辑内容
    // getOverFloeEditInfo(edit) {
    //   this.docData.inquestResult = edit;
    // },

     // 多行编辑
    overFlowEdit() {
      this.$refs.overflowInputRef.showModal(0, '', this.maxLengthOverLine);
    },
    // 获取多行编辑内容
    getOverFloeEditInfo(edit) {
      console.log('回显', edit)
      this.docData.inquestResult = edit;
    },
    // 盖章
    makeSeal() {
      signature.openURL('oeder');
    },
    //   打印方法
    // printContent(e) {
    //   let subOutputRankPrint = document.getElementById('subOutputRank-print');
    //   console.log(subOutputRankPrint.innerHTML);
    //   let newContent = subOutputRankPrint.innerHTML;
    //   let oldContent = document.body.innerHTML;
    //   document.body.innerHTML = newContent;
    //   window.print();
    //   window.location.reload();
    //   document.body.innerHTML = oldContent;
    //   return false;
    // },
    //根据案件ID和文书Id获取数据
    getDocDataByCaseIdAndDocId() {
      this.caseDocDataForm.caseBasicinfoId = this.caseId;
      let data = {
        caseId: this.caseId,
        docId: this.$route.params.docId
      };
      console.log(data);
      this.com_getDocDataByCaseIdAndDocId(data);
    },
    //保存文书信息
    saveData(handleType) {
      this.com_addDocData(handleType, "docForm");
    },
    submitData(handleType) {
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      this.$router.push({
        name: this.$route.params.url
      });
    },
    //是否是完成状态
    isOverStatus() {
      if (this.$route.params.docStatus == '1') {
        this.formOrDocData.showBtn = [false, false, false, false, false, false, false, false, false, true]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
      }
    },
    //获取天气字典值
    getDictKeyList() {
      this.$store.dispatch("getDictListDetail", this.dictId).then(
        res => {
          console.log("字典值列表", res);
          this.options = res.data;
        },
        err => {
          console.log(err);
        }
      );
    },
    // 盖章
    makeSeal() {
      signature.openURL('oeder');
    },
    // 打印
    print() {
      console.log('打印!');
    },
    //记录人，查找本机构下人员
    queryStaff(queryString, cb) {
        debugger;
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
    },
    createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
    },
    handleSelect(item) {
        console.log(item);
    },
    loadAll(){
      return[
          // { "value": "张三" },
          // { "value": "李四" },
          // { "value": "王五"  },
          // { "value": "赵六"},
          // { "value": "胖胖" },
          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
          { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
          { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
          { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
          { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
      ],
      console.log("111");
    }
  },
  created() {
    this.getDocDataByCaseIdAndDocId();
    this.isOverStatus();

    //加载天气抽屉表
    this.getDictKeyList();
    //加载记录人
    this.restaurants = this.loadAll();
  },
}
</script>
<style lang="less">
@import "../../../../css/caseHandle/caseDocModle.less";
</style>
