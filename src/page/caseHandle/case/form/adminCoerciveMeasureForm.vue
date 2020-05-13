<!-------长软------->
<template>
  <div class="print_box printNumbers_box" id="adminCoerciveMeasure-print" style="width:790px; margin:0 auto;">
    <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="formData">
      <!-- <div class="printNumbers_box">
      <div id="adminCoerciveMeasure-print" style="height:auto;padding:0px;"> -->
      <div class="print_info">
        <div class="doc_topic">行政强制措施决定书</div>
        <div class="doc_number">案号：{{formData.caseNumber}}</div>
        <table class="print_table" border="1" bordercolor="black" width="100%" cellspacing="0">
          <tr>
            <td rowspan="6">
              当
              <br>事
              <br>人
            </td>
            <td rowspan="2">个人</td>
            <td>姓名</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="party" :rules="fieldRules('party',propertyFeatures['party'],'',isParty)">
                <el-input
                  type="textarea"
                  v-model="formData.party"
                  v-bind:class="{ over_flow:formData.party.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="nameLength"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['party'])"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
            <td>身份证件号</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyIdNo" :rules="fieldRules('partyIdNo',propertyFeatures['partyIdNo'],validateIDNumber,isParty)">
                <el-input
                  type="textarea"
                  v-model="formData.partyIdNo"
                  v-bind:class="{ over_flow:formData.partyIdNo.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 2}"
                  maxlength="18"
                  placeholder="\"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['partyIdNo'])"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>住址</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyAddress" :rules="fieldRules('partyAddress',propertyFeatures['partyAddress'],'',isParty)">
                <el-input
                  type="textarea"
                  v-model="formData.partyAddress"
                  v-bind:class="{ over_flow:formData.partyAddress.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="adressLength"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['partyAddress'])"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
            <td>联系电话</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyTel" :rules="fieldRules('partyTel',propertyFeatures['partyTel'],validatePhone,isParty)">
                <el-input
                  v-model="formData.partyTel"
                  :maxLength="maxLength"
                  :disabled="!isParty || fieldDisabled(propertyFeatures['partyTel'])"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td rowspan="4">单位</td>
            <td>名称</td>
            <td colspan="5" class="color_DBE4EF">
              <el-form-item prop="partyName" :rules="fieldRules('partyName',propertyFeatures['partyName'],'',!isParty)">
                <el-input
                  v-model="formData.partyName"
                  :maxLength="maxLength"
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyName'])"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>地址</td>
            <td colspan="4" class="color_DBE4EF">
              <el-form-item prop="partyUnitAddress" :rules="fieldRules('partyUnitAddress',propertyFeatures['partyUnitAddress'],'',!isParty)">
                <el-input
                  v-model="formData.partyUnitAddress"
                  :maxLength="maxLength"
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyUnitAddress'])"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>联系电话</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyUnitTel" :rules="fieldRules('partyUnitTel',propertyFeatures['partyUnitTel'],validatePhone,!isParty)">
                <el-input
                  v-model="formData.partyUnitTel"
                  minlength="11"
                  :maxLength="maxLength"
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyUnitTel'])"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
            <td>法定代表人</td>
            <td class="color_DBE4EF">
              <el-form-item prop="partyManager" :rules="fieldRules('partyManager',propertyFeatures['partyManager'],'',!isParty)">
                <el-input
                  v-model="formData.partyManager"
                  :maxLength="maxLength"
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyManager'])"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="2">统一社会信用代码</td>
            <td colspan="3" class="color_DBE4EF">
              <el-form-item prop="socialCreditCode" :rules="fieldRules('socialCreditCode',propertyFeatures['socialCreditCode'],'',!isParty)">
                <el-input
                  v-model="formData.socialCreditCode"
                  :maxLength="maxLength"
                  :disabled="isParty || fieldDisabled(propertyFeatures['socialCreditCode'])"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
        <p>
          <el-form-item prop="afsj" :rules="fieldRules('afsj',propertyFeatures['afsj'])" class="pdf_datapick" style="width: 150px">
            <el-date-picker :disabled="fieldDisabled(propertyFeatures['afsj'])" v-model="formData.afsj" type="date"
                            format="yyyy年MM月dd日" placeholder="  年  月  日"  value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          ，你（单位）
          <el-form-item rows='2' prop="caseCauseName" :rules="fieldRules('caseCauseName',propertyFeatures['caseCauseName'])" style="width: 300px">
            <el-input :disabled="fieldDisabled(propertyFeatures['caseCauseName'])" v-model="formData.caseCauseName"
                      type='textarea' v-bind:class="{ over_flow:formData.caseCauseName.length>14?true:false }"
                      :autosize="{ minRows: 1, maxRows: 3}" :maxLength='90'></el-input>
          </el-form-item>
          。依据
          <span>
                  <el-form-item prop="punishLaw" :rules="fieldRules('punishLaw',propertyFeatures['punishLaw'])" style="width: 320px">
                    <el-select v-model="formData.punishLaw" :maxLength='maxLength' style="width: 320px" :disabled="fieldDisabled(propertyFeatures['punishLaw'])">
                      <el-option v-for="item in laWOptions" :key="item.value" :label="item.label" :value="item.label">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </span>的规定，本机关决定对你（单位）的
          <span>
                  <el-form-item prop="detainGoods" :rules="fieldRules('detainGoods',propertyFeatures['detainGoods'])" style="width: 330px">
                    <el-input type='textarea' v-model="formData.detainGoods"
                              v-bind:class="{ over_flow:formData.caseCauseName.length>14?true:false }"
                              :autosize="{ minRows: 1, maxRows: 3}" :maxLength='50'
                              :disabled="fieldDisabled(propertyFeatures['detainGoods'])"></el-input>
                  </el-form-item>
                </span>（财物、设施或场所的名称及数量）实施
          <span>
                  <el-form-item prop="enforceMeasure" :rules="fieldRules('enforceMeasure',propertyFeatures['enforceMeasure'])" style="width: 280px">
                    <el-select v-model="formData.enforceMeasure" style="width: 280px" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['enforceMeasure'])">
                      <el-option v-for="item in measurOptions" :key="item.value" :label="item.label"
                                 :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </span>的行政强制措施，期限为
          <span>
                  <el-form-item prop="measureStartDate" :rules="fieldRules('measureStartDate',propertyFeatures['measureStartDate'])" style="width: 150px" class="pdf_datapick">
                    <el-date-picker v-model="formData.measureStartDate" style="width: 220px" @change="startTime"
                                    type="date" format="yyyy年MM月dd日" value-format="yyyy-MM-dd" placeholder="  年  月  日" :disabled="fieldDisabled(propertyFeatures['measureStartDate'])">
                    </el-date-picker>
                  </el-form-item>
                </span>至
          <span>
                  <el-form-item prop="measureEndDate" :rules="fieldRules('measureEndDate',propertyFeatures['measureEndDate'])" style="width: 150px" class="pdf_datapick">
                    <el-date-picker v-model="formData.measureEndDate" type="date" format="yyyy年MM月dd日"
                                    value-format="yyyy-MM-dd" placeholder="  年  月  日" :disabled="fieldDisabled(propertyFeatures['measureEndDate'])">
                    </el-date-picker>
                  </el-form-item>
                </span>。
        </p>

        <p>
          如果不服本决定，可以依法在六十日内向
          <span>
                  <el-form-item prop="reconsiderationOrgan" :rules="fieldRules('reconsiderationOrgan',propertyFeatures['reconsiderationOrgan'])" style="width: 230px">
                    <el-select v-model="formData.reconsiderationOrgan" style="width: 230px" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['reconsiderationOrgan'])">
                      <el-option v-for="item in reconsiderationOptions" :key="item.value" :label="item.label"
                                 :value="item.label">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </span>申请行政复议，或者在六个月内依法向
          <span>
                  <el-form-item prop="lawsuitOrgan" :rules="fieldRules('lawsuitOrgan',propertyFeatures['lawsuitOrgan'])" style="width: 230px">
                    <el-select v-model="formData.lawsuitOrgan" style="width: 230px" :maxLength='maxLength' :disabled="fieldDisabled(propertyFeatures['lawsuitOrgan'])">
                      <el-option v-for="item in enforcementOptions" :key="item.value" :label="item.label"
                                 :value="item.label">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </span>人民法院提起行政诉讼，但本决定不停止执行，法律另有规定的除外。
        </p>

        <div class="pdf_seal">
          <span @click='makeSeal'>交通运输执法部门(印章)</span><br>
          <el-form-item prop="makeDate" class="pdf_datapick">
            <el-date-picker v-model="formData.makeDate" type="date" format="yyyy年MM月dd日" placeholder="  年  月  日"  value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </div>
      </div>

      <div class="print_info">
        <span>查封、扣押场所、设施、财物清单如下: </span><br/><br/>
        <table class="evidencetable" border="1" bordercolor="black" width="100%" cellspacing="0">
          <tr>
            <td width="10%">序号</td>
            <td width="30%">查封、扣押场所、设施、财物名称</td>
            <td width="15%">规格</td>
            <td width="15%">数量</td>
            <td width="30%">备注</td>
          </tr>
          <tr v-if="formData.resList.length==0"  @click="handleAdd">
            <td></td>
            <td ></td>
            <td></td>
            <td></td>
            <td ></td>
          </tr>
          <tr v-for="(item,index) in formData.resList" :key="index"  @click="handleAdd">
            <td>{{item.resNo}}</td>
            <td>{{item.resName}}</td>
            <td>{{item.spec}}</td>
            <td>{{item.amount}}</td>
            <td>
              <div style="">{{item.resNote}}</div>
            </td>
          </tr>
        </table>
        <el-form-item prop="resLength" style="visibility:hidden">
          <el-input v-model="formData.resLength"></el-input>
        </el-form-item>
        <br>
        <p>
          其他说明：
          <span>
                <el-form-item prop="caseName" rows="2">
                  <el-input type='textarea' v-model="formData.caseName"
                            v-bind:class="{ over_flow:formData.party.length>14?true:false }"
                            :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength'></el-input>
                </el-form-item>
              </span>
        </p>
        <br><br><br>
        <div class="notice clear">
          <span>(本文书一式两份：一份存根，一份交当事人或其代理人。)</span>
        </div>
      </div>
    </el-form>

    <!-- 添加弹出框 -->
    <el-dialog title="查封、扣押场所、设施、财物清单" append-to-body :visible.sync="addVisible" width="60%" v-loading="addLoading">
      <div>
        <div  class="fullscreen">
          <el-form ref="addResFormRef">
            <el-table :data="tableDatas" stripe border style="width: 100%">
              <el-table-column prop="resNo" label="序号" align="center">
              </el-table-column>
              <el-table-column label="查封、扣押场所、设施、财物名称" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.resName"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="spec" label="规格" align="center">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.spec" placeholder="">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="amount" label="数量" align="center">
                <template slot-scope="scope">
                  <el-input-number size="mini" v-model="scope.row.amount" :min="1" label="描述文字"></el-input-number>
                </template>
              </el-table-column>

              <el-table-column label="备注" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.resNote"></el-input>
                </template>
              </el-table-column>
              <el-table-column width="52%">
                <template slot-scope="scope">
                  <el-button size="mini" icon="el-icon-circle-close" circle @click="deleteRes(scope.row)"></el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button icon="el-icon-circle-plus-outline" circle type="info" @click="addTableData"
                   class="evdence-form"     style="margin-left: 50%;margin-top: 10px"></el-button>
          </el-form>
        </div>
        <div style="margin-left: 45%;margin-top: 10px">
          <el-button size="medium" type="primary" @click="addResSure('addResFormRef')">确 定</el-button>
          <el-button size="medium" @click="addVisible=false">取  消</el-button>
        </div>
      </div>
    </el-dialog>
    <casePageFloatBtns :pageDomId="'adminCoerciveMeasure-print'" :formOrDocData="formOrDocData" @submitData="submitData"
                       @saveData="saveData" @backHuanjie="submitData"></casePageFloatBtns>
  </div>
</template>
<script>
  import overflowInput from "@/page/caseHandle/case/modle/overflowInput.vue";
  import {mixinGetCaseApiList} from "@/common/js/mixins";
  import {getOrganDetailApi, getOrganIdApi} from "@/api/system";
  import {mapGetters} from "vuex";
  import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
  import mySignture from "@/common/js/mySignture";
  import {validateIDNumber, validatePhone, validateZIP} from '@/common/js/validator'
import {
  testApi
} from "@/api/caseHandle";
  export default {
    components: {
      casePageFloatBtns
    },
    mixins: [mixinGetCaseApiList],
    computed: {...mapGetters(['caseId'])},
    data() {
      //当事人类型为公司时验证
      var validateIfCom = (rule, value, callback) => {
        if (!this.isParty && !value) {
          return callback(new Error("法人、地址、联系电话、信用代码不能为空"));
        }
        callback();
      };
      var validateEvidencLength = (rule, value, callback) => {
        if (this.formData.resList.length == 0) {
          return callback(new Error("至少填写一个物品"));
        }
        callback();
      };
      //起止期限日期验证
      var validateIfDate = (rule, value, callback) => {
        var diff = new Date(value).getTime() - new Date(this.formData.measureStartDate).getTime();
        var days = diff / 24 / 60 / 60 / 1000;
        console.log("差几天", days)
        if (days > 30) {
          return callback("措施起止期限不得超过30日");
        }
        if (days <= 0) {
          return callback("措施起止期限不得为同一天");
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
          resList: [],
          resLength: 0,
        },
        handleType: 0, //0  暂存     1 提交
        caseLinkDataForm: {
          id: "", //修改的时候用
          caseBasicinfoId: '', //案件id--从流程进入删掉，先写死测试用
          caseLinktypeId: "2c90293b6c178b55016c17c7ae92000e", //表单类型IDer
          //表单数据
          formData: "",
          status: ""
        },
        isPdf: "",
        originalData: "",
        isParty: true,
        huanjieAndDocId: "4028e4ef63683cd00163684359a10001",  //行政强制措施决定书ID
        rules: {
          party: [
            { required: true, message: "当事人姓名不能为空", trigger: "blur" }
          ],
          partyIdNo: [
            {required: true, message: "身份证号不能为空", trigger: "blur"},
            {validator: validateIDNumber, trigger: "blur"}
          ],
          partyTel: [
            {required: true, message: "联系电话不能为空", trigger: "blur"},
            {validator: validatePhone, trigger: "blur"}
          ],
          partyAddress: [
            { required: true, message: "住址不能为空", trigger: "blur" }
          ],
          partyName: [
            { required: true, message: '单位名称不能为空', trigger: 'blur' },
          ],
          partyManager: [
            { required: true, message: '法人不能为空', trigger: 'blur' },
          ],
          partyUnitAddress: [
            { required: true, message: '单位地址不能为空', trigger: 'blur' }, 
          ],
          partyUnitTel: [
            { required: true, message: '单位联系电话不能为空', trigger: 'blur' },
            {validator: validatePhone, trigger: "blur"}
          ],
          socialCreditCode: [
            { required: true, message: '社会信用代码不能为空', trigger: 'blur' },
          ],
          afsj: [
            {required: true, message: '案发时间不能为空', trigger: 'blur'},
          ],
          caseCauseName: [
            {required: true, message: '违法事实不能为空', trigger: 'blur'},
          ],
          punishLaw: [
            {required: true, message: '法律条款不能为空', trigger: 'blur'},
          ],
          detainGoods: [
            {required: true, message: '财务名称不能为空', trigger: 'blur'},
          ],
          enforceMeasure: [
            {required: true, message: '采用的强制措施不能为空', trigger: 'blur'},
          ],
          measureStartDate: [
            {required: true, message: '强制措施开始时间不能为空', trigger: 'blur'},
          ],
          measureEndDate: [
            {required: true, message: '强制措施结束时间不能为空', trigger: 'blur'},
            {validator: validateIfDate, trigger: "blur"},
          ],
          reconsiderationOrgan: [
            {required: true, message: '复议机构不能为空', trigger: 'blur'},
          ],
          lawsuitOrgan: [
            {required: true, message: '诉讼机构不能为空', trigger: 'blur'},
          ],
          resLength: [
            {validator: validateEvidencLength, trigger: "blur"}
          ],
        },
        nameLength: 23,
        adressLength: 23,
        maxLength: 23,
        formOrDocData: {
          showBtn: [false, true, true, false, false, false, false, false, false], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节
          pageDomId: 'adminCoerciveMeasure-print',
        },
        addVisible: false,
        addLoading: false,
        tableDatas: [],
        laWOptions: [
          {
            value: '1',
            label: '《中华人民共和国强制法》第二十四条'
          }
        ],
        options: [
          {
            value: '1',
            label: ' '
          },
          // {
          //   value: '1',
          //   label: '(空)'
          // },
          {
            value: '2',
            label: '份'
          },
          {
            value: '3',
            label: '套'
          },
          {
            value: '4',
            label: '个'
          },
          {
            value: '5',
            label: '件'
          }
        ],
        measurOptions: [
          {
            value: '查封',
            label: '查封'
          },
          {
            value: '扣押',
            label: '扣押'
          }
        ],
        reconsiderationOptions: [],
        enforcementOptions: [],
        needDealData:true,
        propertyFeatures:'', //字段属性配置

      }
    },

    methods: {
      //加载表单信息
      setData() {
        this.caseLinkDataForm.caseBasicinfoId = this.caseId;
        this.com_getFormDataByCaseIdAndFormId(
          this.caseLinkDataForm.caseBasicinfoId,
          this.caseLinkDataForm.caseLinktypeId,
          false
        );
      },
      // 盖章
      makeSeal() {
        console.log('盖章!');
      },
      // 打印
      print() {
        console.log('打印!');
      },
      // 多行编辑
      // overFlowEdit() {
      //   this.$refs.overflowInputRef.showModal(0, '', this.maxLengthOverLine);
      // },
      // 获取多行编辑内容
      // getOverFloeEditInfo(edit) {
      //   this.formData.illegalFactsEvidence = edit;
      // },
      //提交
      submitData(handleType) {
        this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
        this.$router.push({
          name: this.$route.params.url
        });
      },
      //保存文书信息
      saveData(handleType) {
       console.log(this.formData.measureStartDate) ;
        this.com_submitCaseForm(handleType, "docForm", true);
      },
      //是否是完成状态
      isOverStatus() {
        if (this.$route.params.docStatus == '1') {
          this.formOrDocData.showBtn = [false, false, false, false, false, false, false, false, false, true]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
        }
      },
      handleAdd(resNo, row) {
        this.tableDatas = JSON.parse(JSON.stringify(this.formData.resList));
        this.addVisible = true;
      },
      //添加一行数据
      addTableData() {
        console.log(this.tableDatas)
        let length = this.tableDatas.length;
        if (length == 5) {
          this.$message({
            message: '最多输入五行！',
            type: 'warning'
          });
          return;
        }
        if (length == 0) {
          this.tableDatas.push({'resNo': 1, 'amount': 1});
        } else {
          this.tableDatas.push({
            'resNo': Number(this.tableDatas[length - 1].resNo) + 1,
            'amount': 1,
            'resNote': this.tableDatas[0].resNote
          });
        }
      },
      //删除一行证据
      deleteRes(row) {
        for (let i = 0; i < this.tableDatas.length; i++) {
          if (this.tableDatas[i].resNo > row.resNo) {
            this.tableDatas[i].resNo = this.tableDatas[i].resNo - 1;
          }
        }
        this.tableDatas.splice(row.resNo - 1, 1)
        console.log('newLing', this.tableDatas);
      },
      //确定添加
      addResSure(formName) {
        let canAdd = true;
        console.log("添加数据", this.tableDatas.length)
        if (this.tableDatas.length == 0) {
          this.$message({
            message: '数据至少有一行不为空！',
            type: 'warning'
          });
          canAdd = false;
        } else {
          for (let i = 0; i < this.tableDatas.length; i++) {
            if (!this.tableDatas[i].resName || !this.tableDatas[i].spec) {
              this.$message({
                message: '财务名称或规格不能为空！',
                type: 'warning'
              });
              canAdd = false;
              break;
            }
          }
        }
        if (canAdd) {
          this.formData.resList = this.tableDatas;
          this.addVisible = false;
        }
      },

      startTime() {
        if (this.formData.measureStartDate) {
          this.$set(this.formData, 'measureEndDate', new Date(new Date(this.formData.measureStartDate).getTime() + 30 * 24 * 3600 * 1000).format("yyyy-MM-dd"));
        }
      },
      //根据用户的组织机构ID获取复议机构和诉讼机构
      getOrganDetailOptions() {
        let orgId = JSON.parse(window.localStorage.userInfo).id;
        console.log('orgId=' + orgId);
        let data = {
          id: orgId
        };
        let _this = this
        getOrganIdApi(data).then(
          res => {
            let orgData = {
              id: res.data.organId
            };

            getOrganDetailApi(orgData).then(
              orgRes => {
                _this.reconsiderationOptions = [
                  {
                    value: 'reconsiderationOrgan1',
                    label: orgRes.data.reconsiderationOrgan1
                  },
                  {
                    value: 'reconsiderationOrgan2',
                    label: orgRes.data.reconsiderationOrgan2
                  }
                ]
                select : 'reconsiderationOrgan1';
                _this.enforcementOptions = [
                  {
                    value: 'enforcementOrgan1',
                    label: orgRes.data.enforcementOrgan1
                  },
                  {
                    value: 'enforcementOrgan2',
                    label: orgRes.data.enforcementOrgan2
                  }
                ];
                // _this.formData.reconsiderationOrgan = 'reconsiderationOrgan1';
                // _this.formData.lawsuitOrgan = 'enforcementOrgan1';
                _this.formData.reconsiderationOrgan = '复议机构1';
                _this.formData.lawsuitOrgan = '诉讼机构1';
              });
          });

      },
      // test(){
      //   testApi().then(res=>{console.log(res)})
      // }
      getDataAfter(){
        // this.$set(this.formData, 'measureStartDate', new Date());
        this.formData.measureStartDate = new Date().format('yyyy-MM-dd');
        this.startTime();
      }
      

    },
    mounted() {
      // this.$set(this.formData, 'measureStartDate', new Date());
      // console.log('this.formData.measureStartDate',this.formData.measureStartDate)
      // this.startTime();
    },
    created() {
      this.isOverStatus();
      this.getOrganDetailOptions();
      this.setData();
    }
  }
</script>
<style lang="scss">
  @import "@/assets/css/caseHandle/caseDocModle.scss";

  .print_box .print_info .evidencetable tr td {
    white-space: inherit;
    text-align-last: center;
  }
  .evdence-form {
  .el-icon-circle-close {
    color: #7b7b7b !important;
  }
}
</style>
