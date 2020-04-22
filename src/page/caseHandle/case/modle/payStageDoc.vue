<!-------长软------->
<template>
  <div class="print_box">
    <div class="print_info" id="payStageDoc_print">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData">
        <div class="doc_topic"> 分期（延期）缴纳罚款通知书</div>
        <div class="doc_number">案号：{{docData.caseNumber}}</div>
        <p class="p_begin">
          当事人（个人姓名或单位名称）
          <span>
            <el-form-item prop="casepartyName" class="width220">
              <el-input v-model="docData.party" :maxLength='maxLength'></el-input>
            </el-form-item>
          </span>:
        </p>
        <p>
          <span>
            <el-form-item prop="serviceTime" class="pdf_datapick listen_data width151">
              <el-date-picker v-model="docData.serviceTime" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日">
              </el-date-picker>
            </el-form-item>
          </span> ，本机关对你（单位）送达了
          <span>
            <el-form-item prop="caseNumber" style="width:165px">
              <el-input v-model="docData.caseNumber" :maxLength='maxLength' disabled></el-input>
            </el-form-item>
          </span>（案号）《行政处罚决定书》，作出了对你（单位）罚款
          <span>
            <el-form-item prop="fine">
              <el-input v-model="docData.fine" :maxLength='maxLength'
                        onkeyup="this.value=this.value.replace(/[^\u4e00-\u9fa5]/g,'')"></el-input>
            </el-form-item>
          </span>（大写）的行政处罚决定，根据你（单位）的申请，本机关依据《中华人民共和国行政处罚法》第五十二条的规定，现决定：
        </p>
        <p>
          <input type="checkbox" name="measure" value="1" v-model="checknames" @change="click">同意你（单位）延期缴纳罚款。延长至
          <span>
            <el-form-item :prop="disabledOne?'placeholder':'delayDate'" class="pdf_datapick width151">
              <el-date-picker v-model="docData.delayDate" v-bind:disabled="disabledOne" type="date" format="yyyy年MM月dd日"
                              placeholder="    年  月  日">
              </el-date-picker>
            </el-form-item>
          </span>。
        </p>
        <p>
          <input type="checkbox" name="measure" value="2" v-model="checknames" @change="click">同意你（单位）分期缴纳罚款。第
          <span>
            <el-form-item :prop="disabledTwo?'':'instalmentNum'" style="width:46px">
              <!-- <el-input v-model="docData.instalmentNum"></el-input> -->
              <el-select v-model="docData.instalmentNum" v-bind:disabled="disabledTwo" :maxLength='maxLength'
                         placeholder=" ">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
                <el-option label="3" value="3"></el-option>
                <el-option label="4" value="4"></el-option>
                <el-option label="5" value="5"></el-option>
              </el-select>
            </el-form-item>

          </span>期至
          <span>
            <el-form-item :prop="disabledTwo?'placeholder':'instalmentDate'" class="pdf_datapick width151">
              <el-date-picker v-model="docData.instalmentDate" v-bind:disabled="disabledTwo" type="date"
                              format="yyyy年MM月dd日" placeholder="    年  月  日">
              </el-date-picker>
            </el-form-item>
          </span>前，缴纳罚款
          <span>
            <el-form-item :prop="disabledTwo?'placeholder':'payFine'">
              <el-input v-model="docData.payFine" v-bind:disabled="disabledTwo" :maxLength='maxLength'
                        onkeyup="this.value=this.value.replace(/[^\u4e00-\u9fa5]/g,'')"></el-input>
            </el-form-item>
          </span>元（大写）（每期均应当单独开具本文书）。此外，尚有未缴纳的罚款
          <span>
            <el-form-item :prop="disabledTwo?'placeholder':'debtFine'">
              <el-input v-model="docData.debtFine" v-bind:disabled="disabledTwo" :maxLength='maxLength'
                        onkeyup="this.value=this.value.replace(/[^\u4e00-\u9fa5]/g,'')"></el-input>
            </el-form-item>
          </span>元（大写）。
        </p>
        <p>
          <input type="checkbox" name="measure" value="3" v-model="checknames" @change="click">由于
          <span>
            <el-form-item :prop="disabledThree?'placeholder':'reason'" style="width:500px">
              <el-input v-model="docData.reason" v-bind:disabled="disabledThree" :maxLength='maxLength'></el-input>
            </el-form-item>
          </span>，因此，本机关认为你的申请不符合《中华人民共和国行政处罚法》第五十二条的规定，不同意你（单位）分期（延期）缴纳罚款。
        </p>
        <p>
          代收机构以本通知书为据，办理收款手续。
        </p>

        <div class="pdf_seal" style="margin-top:60px">
          <span @click='makeSeal'>交通运输执法部门(印章)</span><br>
          <el-form-item prop="stampTime" class="pdf_datapick">
            <el-date-picker v-model="docData.stampTime" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日">
            </el-date-picker>
          </el-form-item>
        </div>
        <div class="notice clear">
          <span>(本文书一式两份：一份存根，一份交当事人或其代理人。)</span>
        </div>
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
    <!-- 悬浮按钮 -->
    <casePageFloatBtns :pageDomId="'payStageDoc_print'" :formOrDocData="formOrDocData" @submitData="submitData"
                       @saveData="saveData" @backHuanjie="submitData"></casePageFloatBtns>

    <overflowInput ref="overflowInputRef" @overFloeEditInfo="getOverFloeEditInfo"></overflowInput>
  </div>
</template>
<script>
  import overflowInput from "./overflowInput";
  import {mixinGetCaseApiList} from "@/common/js/mixins";
  import {mapGetters} from "vuex";
  import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
  // import signture from "../../../../js/signture";
  import mySignture from "@/common/js/mySignture";
  import iLocalStroage from "@/common/js/localStroage";

  export default {
    components: {
      overflowInput,
      casePageFloatBtns
    },
    mixins: [mixinGetCaseApiList],
    computed: {...mapGetters(['caseId'])},
    data() {
      return {
        docData: {
          caseNumber: '',
          party: '',
          serviceTime: '',
          fine: '',
          delayDate: '',
          instalmentNum: '',
          instalmentDate: '',
          payFine: '',
          debtFine: '',
          reason: '',
          stampTime: '',
        },
        handleType: 0, //0  暂存     1 提交
        caseDocDataForm: {
          id: "",   //修改的时候用
          caseBasicinfoId: '',   //案件ID
          caseDoctypeId: this.$route.params.docId,    //文书类型ID
          //文书数据
          docData: "",
          status: "",   //提交状态
          docDataId: "", //多份文书的id
          linkTypeId: "2c9029e16c753a19016c755fe1340001" //环节ID
        },
        name: '',
        inputInfo: '',
        inputInfos: '',
        illegalFactsEvidence: '',
        value1: '',
        rules: {
          serviceTime: [
            {required: true, message: '请输入送达日期', trigger: 'blur'},
          ],
          caseNumber: [
            {required: true, message: '请输入案号', trigger: 'blur'},
          ],
          fine: [
            {required: true, message: '请输入罚款', trigger: 'blur'},
          ],
          delayDate: [
            {required: true, message: '请输入延长缴纳日期', trigger: 'blur'},
          ],
          instalmentNum: [
            {required: true, message: '请输入当前分期数', trigger: 'blur'},
          ],
          payFine: [
            {required: true, message: '请输入本期缴纳金额  ', trigger: 'blur'},
          ],
          debtFine: [
            {required: true, message: '请输入未缴纳的罚款', trigger: 'blur'},
          ],
          instalmentDate: [
            {required: true, message: '请输入本期缴纳时间', trigger: 'blur'},
          ],
          reason: [
            {required: true, message: '请输入拒绝原因', trigger: 'blur'},
          ],

        },
        nameLength: 23,
        adressLength: 23,
        maxLength: 23,
        maxLengthOverLine: 122,
        formOrDocData: {
          showBtn: [false, true, true, false, false, false, false, false, false], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节
          pageDomId: 'payStageDoc_print',
        },
        checknames: [],
        disabledOne: true,
        disabledTwo: true,
        disabledThree: true,
        isChange: false
      }
    },

    methods: {
      //根据案件ID和文书Id获取数据
      getDocDataByCaseIdAndDocId() {
        this.caseDocDataForm.caseBasicinfoId = this.caseId;
//        console.log("this.caseId,this.caseId", this.caseId)
//        console.log("this.caseId,this.caseId", this.caseDocDataForm.caseBasicinfoId)
        let data = {
          caseId: this.caseId,
          docId: this.$route.params.docId
        };
        this.com_getDocDataByCaseIdAndDocId(data)

        //有多份询问笔录时，如果点击添加获取案件信息，如果点击的时查看，则根据id获取文书详情
        let addMoreData = JSON.parse(this.$route.params.addMoreData);

        if (addMoreData.handelType == 'isAddMore' && !iLocalStroage.get("currentDocDataId")) {
          //设置询问笔录名称
//          console.log('添加')
          this.caseDocDataForm.note = "询问笔录（" + addMoreData.askData.peopleType + ")(第" + addMoreData.askData.askNum + "次)";
          this.com_getCaseBasicInfo(data.caseId, data.docId);
        } else {
//          console.log('修改')
          let currentDocDataId = iLocalStroage.get("currentDocDataId");
          if (currentDocDataId) {
            this.getDocDetailById(currentDocDataId)
          } else {
            this.getDocDetailById(this.$route.params.docDataId)
          }
        }

      },
      //保存文书信息
      addDocData(handleType) {
        this.com_addDocData(handleType, 'docForm');
      },
      // 盖章
      makeSeal() {
//        console.log('盖章!');
        mySignture.openURL('oeder');
      },
      // 打印
      print() {
//        console.log('打印!');
      },
      // 多行编辑
      overFlowEdit() {
        this.$refs.overflowInputRef.showModal(0, '', this.maxLengthOverLine);
      },
      // 获取多行编辑内容
      getOverFloeEditInfo(edit) {
        this.docData.illegalFactsEvidence = edit;
      },
      //提交
      submitData(handleType) {
        this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
        this.$router.push({
          name: this.$route.params.url
        });
      },
      //保存文书信息
      saveData(handleType) {
//        console.log('caseBasicinfoId', this.caseDocDataForm.caseBasicinfoId)
        if (this.disabledOne && this.disabledTwo && this.disabledThree) {
          this.$message("请选择分期延期决定");
          return
        }
        this.com_addDocData(handleType, "docForm");
      },
      //是否是完成状态
      isOverStatus() {
        if (this.$route.params.docStatus == '1') {
          this.formOrDocData.showBtn = [false, false, false, false, false, false, false, false, false, true]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
        }
      },
      //人民币转大写
      convertCurrency(money) {
        //汉字的数字
        var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
        //基本单位
        var cnIntRadice = new Array('', '拾', '佰', '仟');
        //对应整数部分扩展单位
        var cnIntUnits = new Array('', '万', '亿', '兆');
        //对应小数部分单位
        var cnDecUnits = new Array('角', '分', '毫', '厘');
        //整数金额时后面跟的字符
        var cnInteger = '整';
        //整型完以后的单位
        var cnIntLast = '元';
        //最大处理的数字
        var maxNum = 999999999999999.9999;
        //金额整数部分
        var integerNum;
        //金额小数部分
        var decimalNum;
        //输出的中文金额字符串
        var chineseStr = '';
        //分离金额后用的数组，预定义
        var parts;
        if (money == '') {
          return '';
        }
        money = parseFloat(money);
        if (money >= maxNum) {
          //超出最大处理数字
          return '';
        }
        if (money == 0) {
          chineseStr = cnNums[0] + cnIntLast + cnInteger;
          return chineseStr;
        }
        //转换为字符串
        money = money.toString();
        if (money.indexOf('.') == -1) {
          integerNum = money;
          decimalNum = '';
        } else {
          parts = money.split('.');
          integerNum = parts[0];
          decimalNum = parts[1].substr(0, 4);
        }
        //获取整型部分转换
        if (parseInt(integerNum, 10) > 0) {
          var zeroCount = 0;
          var IntLen = integerNum.length;
          for (var i = 0; i < IntLen; i++) {
            var n = integerNum.substr(i, 1);
            var p = IntLen - i - 1;
            var q = p / 4;
            var m = p % 4;
            if (n == '0') {
              zeroCount++;
            } else {
              if (zeroCount > 0) {
                chineseStr += cnNums[0];
              }
              //归零
              zeroCount = 0;
              chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
            }
            if (m == 0 && zeroCount < 4) {
              chineseStr += cnIntUnits[q];
            }
          }
          chineseStr += cnIntLast;
        }
        //小数部分
        if (decimalNum != '') {
          var decLen = decimalNum.length;
          for (var i = 0; i < decLen; i++) {
            var n = decimalNum.substr(i, 1);
            if (n != '0') {
              chineseStr += cnNums[Number(n)] + cnDecUnits[i];
            }
          }
        }
        if (chineseStr == '') {
          chineseStr += cnNums[0] + cnIntLast + cnInteger;
        } else if (decimalNum == '') {
          chineseStr += cnInteger;
        }
        console.log('chineseStr=' + chineseStr)
        return chineseStr;
      },
      click() {
        this.clearData()
//        console.log('this.checknames', this.checknames)
        if (this.checknames.length > 1) {
          this.checknames.shift();
        }
        if (this.checknames == '1') {
          this.disabledOne = false;
          this.disabledTwo = true;
          this.disabledThree = true;
        } else if (this.checknames == '2') {
          this.disabledOne = true;
          this.disabledTwo = false;
          this.disabledThree = true;
          this.docData.instalmentNum = '1'
        } else if (this.checknames == '3') {
          this.disabledOne = true;
          this.disabledTwo = true;
          this.disabledThree = false;
        } else {
          this.disabledOne = true;
          this.disabledTwo = true;
          this.disabledThree = true;
        }
      },
      clearData() {
        this.docData.delayDate = '';
        this.docData.instalmentNum = '';
        this.docData.instalmentDate = '';
        this.docData.payFine = '';
        this.docData.debtFine = '';
        this.docData.reason = '';

      }
    },
    mounted() {
      // this.getDocDataByCaseIdAndDocId();
      // console.log('parm', this.$route.params.approvalForm)
      // console.log("this.caseId,this.caseId", this.caseId)
      this.caseDocDataForm.caseBasicinfoId = this.caseId;
      let data = {
        caseId: this.caseId,
        docId: this.$route.params.docId
      };
      //有多份文书时，如果点击添加获取案件信息，如果点击的时查看，则根据id获取文书详情
      if (this.$route.params.handelType === 'isAddMore') {
//        console.log('多份文书', this.$route.params.handelType)
        this.com_getCaseBasicInfo(data.caseId, data.docId)
      } else {
        this.getDocDetailById(this.$route.params.docDataId)
      }

//      console.log('this.$route.params.approvalForm', this.$route.params.approvalForm.executeHandle)
      if (this.$route.params.approvalForm.executeHandle === '0') {
        // 拒绝
//        console.log('拒绝')
        this.checknames.push("3")
        this.caseDocDataForm.note = "分期（延期）缴纳罚款通知书（拒绝）";
      }
      else {
        if (this.$route.params.approvalForm.executeType === 1) {
          // 分期
          this.checknames.push("2")
          this.caseDocDataForm.note = "分期（延期）缴纳罚款通知书（分期）";

        }
        if (this.$route.params.approvalForm.executeType === 0) {
          // 延期
          this.checknames.push("1")
          this.caseDocDataForm.note = "分期（延期）缴纳罚款通知书（延期）";

        }
      }
      this.click()
    },
    created() {
      this.isOverStatus();
    },
    watch: {
      'docData.fine'(val) {
        if (val && !this.isChange) {
          this.docData.fine = this.convertCurrency(this.docData.fine);
          this.isChange = true
          console.log(this.docData.fine);
        }
      }
    }
  }
</script>
<style lang="scss">
  @import "@/assets/css/caseHandle/caseDocModle.scss";
</style>
