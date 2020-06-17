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
            <el-form-item prop="party" class="width220"
                          :rules="fieldRules('party',propertyFeatures['party'],'',isParty)">
              <el-input v-model="docData.party" :maxLength='maxLength'
                        :disabled="!isParty || fieldDisabled(propertyFeatures['party'])"></el-input>
            </el-form-item>
          </span>:
        </p>
        <p>
          <span>
            <el-form-item prop="serviceTime" class="pdf_datapick listen_data width151"
                          :rules="fieldRules('serviceTime',propertyFeatures['serviceTime'])">
              <el-date-picker v-model="docData.serviceTime" :disabled="fieldDisabled(propertyFeatures['serviceTime'])"
                              type="date" format="yyyy年MM月dd日" placeholder="    年  月  日" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </span> ，本机关对你（单位）送达了
          <span>
            <el-form-item prop="caseNumber" style="width:165px"
                          :rules="fieldRules('caseNumber',propertyFeatures['caseNumber'])">
              <el-input v-model="docData.caseNumber" :maxLength='maxLength'
                        :disabled="fieldDisabled(propertyFeatures['caseNumber'])"></el-input>
            </el-form-item>
          </span>（案号）《行政处罚决定书》，作出了对你（单位）罚款
          <span>
            <el-form-item prop="fine" :rules="fieldRules('fine',propertyFeatures['fine'])">
              <el-input v-model="docData.fine" :maxLength='maxLength'
                        @input="checkChinese1()"
                        :disabled="fieldDisabled(propertyFeatures['fine'])"></el-input>
            </el-form-item>
          </span>（大写）的行政处罚决定，根据你（单位）的申请，本机关依据《中华人民共和国行政处罚法》第五十二条的规定，现决定：
        </p>
        <p>
          <input type="checkbox" name="measure" value="1" v-model="checknames" @change="click">同意你（单位）延期缴纳罚款。延长至
          <span>
            <el-form-item :prop="disabledOne?'placeholder':'delayDate'" class="pdf_datapick width151">
              <el-date-picker v-model="docData.delayDate" v-bind:disabled="disabledOne" type="date" format="yyyy年MM月dd日"
                              placeholder="    年  月  日" value-format="yyyy-MM-dd">
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
                              format="yyyy年MM月dd日" placeholder="    年  月  日" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </span>前，缴纳罚款
          <span>
            <el-form-item :prop="disabledTwo?'placeholder':'payFine'">
              <el-input v-model="docData.payFine" v-bind:disabled="disabledTwo" :maxLength='maxLength'
              @input="checkChinese2()"></el-input>
            </el-form-item>
          </span>元（大写）（每期均应当单独开具本文书）。此外，尚有未缴纳的罚款
          <span>
            <el-form-item :prop="disabledTwo?'placeholder':'debtFine'">
              <el-input v-model="docData.debtFine" v-bind:disabled="disabledTwo" :maxLength='maxLength'
                        @input="checkChinese3()"></el-input>
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
        <!-- <p>
          代收机构以本通知书为据，办理收款手续。
        </p> -->

        <div class="pdf_seal" style="margin-top:60px">
          <span >交通运输执法部门(印章)</span><br>
          <el-form-item prop="stampTime" class="pdf_datapick">
            <el-date-picker v-model="docData.stampTime" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日"
                            value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </div>
        <div class="notice clear">
          <span>(本文书一式两份：一份存根，一份交当事人或其代理人。)</span>
        </div>
      </el-form>
    </div>
    <!-- 悬浮按钮 -->
    <casePageFloatBtns :pageDomId="'payStageDoc_print'" :formOrDocData="formOrDocData" @submitData="submitData"
                       @saveData="saveData" @backHuanjie="submitData"></casePageFloatBtns>

  </div>
</template>
<script>
  import {mixinGetCaseApiList} from "@/common/js/mixins";
  import {mapGetters} from "vuex";
  import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
  import iLocalStroage from "@/common/js/localStroage";

  export default {
    components: {
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
          checknames: []
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
          linkTypeId: this.$route.params.caseLinkTypeId //环节ID
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
        isChange: false,
        propertyFeatures: '',
        isparty: true,
      }
    },

    methods: {
      // 控制大写只能输入中文
      checkChinese1(val){
        this.docData.fine=this.docData.fine.replace(/[^\u4e00-\u9fa5]/g,'')
      },
      checkChinese2(val){
        console.log(val)
        // val=val.replace(/[^\u4e00-\u9fa5]/g,'')
        this.docData.payFine=this.docData.payFine.replace(/[^\u4e00-\u9fa5]/g,'')
      },
      checkChinese3(val){
        this.docData.debtFine=this.docData.debtFine.replace(/[^\u4e00-\u9fa5]/g,'')
      },
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
      // 打印
      print() {
//        console.log('打印!');
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
        console.log('shuju',this.docData,this.docData.debtFine,this.docData.payFine)
        this.docData.checknames = JSON.parse(JSON.stringify(this.checknames))
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

      },

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
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss">
  /* @import "@/assets/css/caseHandle/caseDocModle.scss"; */
</style>
