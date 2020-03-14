<!-------长软------->
<template>
  <div class="print_box">
      <div class="print_info"  id="adminCoerciveMeasure-print">
        <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="formData">
          <div class="doc_topic">行政强制措施决定书</div>
          <div class="doc_number">案号：{{formData.caseNumber}}</div>
          <table class="print_table" border="1" bordercolor="black" width="100%" cellspacing="0">
          <tr>
            <td rowspan="6">
              当
              <br />事
              <br />人
            </td>
            <td rowspan="2">个人</td>
            <td>姓名</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="party">
                <el-input
                  type="textarea"
                  v-model="formData.party"
                  v-bind:class="{ over_flow:formData.party.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="nameLength"
                  disabled
                  placeholder="\"
                ></el-input>
                <!-- <el-input v-model="docData.party"  @input="widthCheck($event.target, 23,$event)" maxlength="47" v-bind:class="{over_flow: isOverflow}" placeholder="\"></el-input> -->
              </el-form-item>
            </td>
            <td>身份证件号</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item :prop="isParty ? 'partyIdNo' :''">
                <el-input
                  type="textarea"
                  v-model="formData.partyIdNo"
                  v-bind:class="{ over_flow:formData.partyIdNo.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 2}"
                  maxlength="18"
                  placeholder="\"
                  :disabled="isParty && !originalData.partyIdNo ? false : true"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>住址</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item :prop="isParty ? 'partyAddress' :''">
                <el-input
                  type="textarea"
                  v-model="formData.partyAddress"
                  v-bind:class="{ over_flow:formData.partyAddress.length>14?true:false }"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  :maxlength="adressLength"
                  :disabled="isParty && !originalData.partyAddress ? false : true"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
            <td>联系电话</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item :prop="isParty ? 'partyTel' :''">
                <el-input
                  v-model="formData.partyTel"
                  :maxLength="maxLength"
                  :disabled="isParty && !originalData.partyTel ? false : true"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td rowspan="4">单位</td>
            <td>名称</td>
            <td colspan="5" class="color_DBE4EF">
              <el-form-item prop="partyName">
                <el-input
                  v-model="formData.partyName"
                  :maxLength="maxLength"
                  disabled
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>地址</td>
            <td colspan="4" class="color_DBE4EF">
              <el-form-item prop="partyUnitAddress">
                <el-input
                  v-model="formData.partyUnitAddress"
                  :maxLength="maxLength"
                  :disabled="!isParty && !originalData.partyUnitAddress ? false : true"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>联系电话</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyUnitTel">
                <el-input
                  v-model="formData.partyUnitTel"
                  minlength="11"
                  :maxLength="maxLength"
                  :disabled="!isParty && !originalData.partyUnitTel ? false : true"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
            <td>法定代表人</td>
            <td class="color_DBE4EF">
              <el-form-item prop="partyManager">
                <el-input
                  v-model="formData.partyManager"
                  :maxLength="maxLength"
                  :disabled="!isParty && !originalData.partyManager ? false : true"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="2">统一社会信用代码</td>
            <td colspan="3" class="color_DBE4EF">
              <el-form-item prop="socialCreditCode">
                <el-input
                  v-model="formData.socialCreditCode"
                  :maxLength="maxLength"
                  :disabled="!isParty && !originalData.socialCreditCode ? false : true"
                  placeholder="\"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
          <p>
            
              <el-form-item prop="afsj" class="pdf_datapick" style="width: 150px">
                <el-date-picker v-model="formData.afsj" type="date" format="yyyy年MM月dd日" placeholder="  年  月  日">
                </el-date-picker>
              </el-form-item>
            ，你（单位）
              <el-form-item rows = '2' prop="caseCauseName" style="width: 300px">
                <el-input v-model="formData.caseCauseName" type='textarea'  v-bind:class="{ over_flow:formData.party.length>14?true:false }" :autosize="true" :maxLength='90'></el-input>
              </el-form-item>
            。依据
            <span>
              <el-form-item prop="punishLaw" style="width: 320px">
                <el-select v-model="formData.punishLaw" :maxLength='maxLength'  style="width: 320px">
                  <el-option v-for="item in laWOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </span>的规定，本机关决定对你（单位）的
            <span>
              <el-form-item prop="detainGoods" style="width: 330px">
                <el-input v-model="formData.detainGoods" :maxLength='maxLength'></el-input>
              </el-form-item>
            </span>（财物、设施或场所的名称及数量）实施
            <span>
              <el-form-item prop="enforceMeasure" style="width: 280px">
                <el-select v-model="formData.enforceMeasure" style="width: 280px" :maxLength='maxLength'>
                  <el-option v-for="item in measurOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <!-- <el-input v-model="docData.enforceMeasure" :maxLength='maxLength'></el-input> -->
              </el-form-item>
            </span>的行政强制措施，期限为
            <span>
              <el-form-item prop="measureStartDate" style="width: 150px" class="pdf_datapick">
                <el-date-picker v-model="formData.measureStartDate" style="width: 220px" @change="startTime" type="date" format="yyyy年MM月dd日" value-format="yyyy-MM-dd" placeholder="  年  月  日">
                </el-date-picker>
              </el-form-item>
            </span>至
            <span>
              <el-form-item prop="measureEndDate" style="width: 150px" class="pdf_datapick">
                <el-date-picker v-model="formData.measureEndDate" type="date" format="yyyy年MM月dd日" value-format="yyyy-MM-dd" placeholder="  年  月  日">
                </el-date-picker>
              </el-form-item>
            </span>。
          </p>

          <p>
            如果不服本决定，可以依法在六十日内向
            <span>
              <el-form-item prop="reconsiderationOrgan" style="width: 230px">
                <el-select v-model="formData.reconsiderationOrgan" style="width: 230px" :maxLength='maxLength'>
                  <el-option v-for="item in reconsiderationOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <!-- <el-input v-model="docData.reconsiderationOrgan"  :maxLength='maxLength'></el-input> -->
              </el-form-item>
            </span>申请行政复议，或者在六个月内依法向
            <span>
              <el-form-item prop="lawsuitOrgan" style="width: 230px">
                <el-select v-model="formData.lawsuitOrgan" style="width: 230px" :maxLength='maxLength'>
                  <el-option v-for="item in enforcementOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <!-- <el-input v-model="docData.lawsuitOrgan"  :maxLength='maxLength'></el-input> -->
              </el-form-item>
            </span>人民法院提起行政诉讼，但本决定不停止执行，法律另有规定的除外。
          </p>

          <div class="pdf_seal">
            <span @click='makeSeal'>交通运输执法部门(印章)</span><br>
            <el-form-item prop="makeDate" class="pdf_datapick">
              <el-date-picker v-model="formData.makeDate" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日">
              </el-date-picker>
            </el-form-item>
          </div>

          <br><br><br><br>
          <p class="p_begin">查封、扣押场所、设施、财物清单如下：</p>
          <div @click="handleAdd">
            <el-table :data="tableData" border stripe style="width: 100%">
              <el-table-column prop="sort" label="序号" width="120"  align="center"></el-table-column>
              <el-table-column prop="itemName" label="查封、扣押场所、设施、财物名称"  align="center"></el-table-column>
              <el-table-column prop="spec" label="规格" width="120" :formatter="formatSpec"  align="center"></el-table-column>
              <el-table-column prop="amount" label="数量" width="120"  align="center"></el-table-column>
              <el-table-column prop="note" label="备注"  align="center"> </el-table-column>
            </el-table>
          </div>
          <br>
          <p>
            其他说明：
            <span>
              <el-form-item prop="caseName">
                <el-input type='textarea' v-model="formData.caseName" v-bind:class="{ over_flow:formData.party.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength'></el-input>
              </el-form-item>
            </span>
          </p>

          <br>
          <div class="notice clear">
            <span>(本文书一式两份：一份存根，一份交当事人或其代理人。)</span>
          </div>
          </el-form>
      </div>

          <!-- 添加弹出框 -->
          <el-dialog title="查封、扣押场所、设施、财物清单" :visible.sync="addVisible" width="60%" v-loading="addLoading" :before-close="handleClose">
            <div>
              <div>
                <el-form ref="docForm">
                  <el-table :data="tableDatas" stripe border style="width: 100%">
                    <el-table-column  prop="sort" label="序号" align="center"  width="120">
                    </el-table-column>

                    <el-table-column label="查封、扣押场所、设施、财物名称" align="center">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.itemName"></el-input>
                      </template>
                    </el-table-column>

                    <el-table-column prop="spec" label="规格"  width="120" align="center">
                      <template slot-scope="scope">
                        <el-select v-model="scope.row.spec" placeholder="请选择">
                          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </template>
                    </el-table-column>

                    <el-table-column prop="amount"  width="220" label="数量" align="center">
                      <template slot-scope="scope">
                        <el-input-number size="mini" v-model="scope.row.amount" :min="1"  label="数量"></el-input-number>
                      </template>
                    </el-table-column>

                    <el-table-column label="备注" align="center">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.note"></el-input>
                      </template>
                    </el-table-column>

                    <el-table-column width="52%" >
                      <template slot-scope="scope">
                        <el-button size="mini" icon="el-icon-circle-close" circle @click="handleRow(scope.$sort, scope.row)"></el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-button icon="el-icon-circle-plus-outline" @click="addTableData" circle type="info" style="margin-left: 50%;margin-top: 10px"></el-button>
                </el-form>
              </div>
              <div style="margin-left: 45%;margin-top: 10px">
                  <el-button size="medium" type="primary" @click="submitForm('form')">确 定</el-button>
                  <el-button size="medium" @click="addVisible=false">取  消</el-button>
              </div>
            </div>
          </el-dialog>
          <casePageFloatBtns :pageDomId="'adminCoerciveMeasure-print'" :formOrDocData="formOrDocData" @saveData="saveData"></casePageFloatBtns>

          <overflowInput ref="overflowInputRef" @overFloeEditInfo="getOverFloeEditInfo"></overflowInput>
    </div>
</template>
<script>
import overflowInput from "../modle/overflowInput";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { getOrganDetailApi, getOrganIdApi } from "@/api/system";
import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
import mySignture from "@/common/js/mySignture";
import { validateIDNumber, validatePhone, validateZIP } from '@/common/js/validator'
export default {
   components: {
    overflowInput,
    casePageFloatBtns
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(['caseId']) },
  data() {
    //当事人类型为公司时验证
    var validateIfCom = (rule, value, callback) => {
      if (!this.isParty && !value) {
        return callback(new Error("请输入"));
      }
      callback();
    };
    return {
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
      originalData:"",
      isParty: true,
      huanjieAndDocId: "4028e4ef63683cd00163684359a10001",  //行政强制措施决定书ID
      rules: {
        caseName: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        partyIdNo: [
          { required: true, message: "请输入", trigger: "blur" },
          { validator: validateIDNumber, trigger: "blur" }
        ],
        partyTel: [
          { required: true, message: "请输入", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ],
        partyAddress: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        partyManager: [
          { validator: validateIfCom, trigger: "blur" }
        ],
        partyUnitAddress: [
          { validator: validateIfCom, trigger: "blur" }
        ],
        partyUnitTel: [
          { validator: validateIfCom, trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ],
        socialCreditCode: [
          { validator: validateIfCom, trigger: "blur" }
        ],
        afsj: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        caseCauseName: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        punishLaw: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        detainGoods: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        enforceMeasure: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        measureStartDate: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        measureEndDate: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        reconsiderationOrgan: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        lawsuitOrgan: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        makeDate: [
          { required: true, message: '请输入', trigger: 'blur' },
        ]
      },
      nameLength: 23,
      adressLength: 23,
      maxLength: 23,
      tableData: [],
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
          label: '份'
        },
        {
          value: '2',
          label: '套'
        },
        {
          value: '3',
          label: '个'
        },
      ],
      measurOptions: [
        {
          value: '1',
          label: '查封'
        },
        {
          value: '2',
          label: '扣押'
        }
      ],
      reconsiderationOptions : [],
      enforcementOptions : [],
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
    overFlowEdit() {
      this.$refs.overflowInputRef.showModal(0, '', this.maxLengthOverLine);
    },
    // 获取多行编辑内容
    getOverFloeEditInfo(edit) {
      this.formData.illegalFactsEvidence = edit;
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
      this.com_submitCaseForm(handleType, "docForm",true); 
    },
    //是否是完成状态
    isOverStatus() {
      if (this.$route.params.docStatus == '1') {
          this.formOrDocData.showBtn = [false, false, false, false, false, false, false, false, false, true]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
        }
    },
    addTableData(){
      console.log(this.tableDatas)
      let length = this.tableDatas.length;
      if(length == 0){
        this.tableDatas.push({'sort': 1,'spec' : '1', 'amount' : 1});
      }else{
        this.tableDatas.push({'sort': Number(this.tableDatas[length - 1].sort) + 1,'spec' : '1', 'amount' : 1});
      }
    },
    handleAdd(sort, row) {
        this.tableDatas = this.tableData;
        this.addVisible = true;
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
    },
    handleRow(sort, row) {
        this.tableDatas.splice(sort, 1)
        for(let i=0; i<this.tableDatas.length; i++){
          if(this.tableDatas[i].sort > sort){
            this.tableDatas[i].sort = this.tableDatas[i].sort - 1;
          }
        }
    },
    submitForm(formName){
      for(let i=0; i<this.tableDatas.length; i++){
          if(!this.tableDatas[i].itemName && !this.tableDatas[i].spec && !this.tableDatas[i].amount && !this.tableDatas[i].note){
            this.$message({
              message: '数据至少有一项不为空！',
              type: 'warning'
            });
            return;
          }
        }
      this.tableData = this.tableDatas;
      this.addVisible = false;
    },
    formatSpec: function(row, column, cellValue) {
      if( cellValue == '1'){
        return "份";
      }else if( cellValue == '2'){
        return "套";
      }else if( cellValue == '3'){
        return "个";
      }
    },
    startTime(){
      if (this.formData.measureStartDate){
        this.$set(this.formData, 'measureEndDate', new Date(this.formData.measureStartDate.getTime() + 29 * 24 * 3600 * 1000));
      }
    },
    //根据用户的组织机构ID获取复议机构和诉讼机构
    getOrganDetailOptions() {
      let orgId = JSON.parse(window.localStorage.userInfo).id;
      console.log('orgId='+orgId);
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
                _this.formData.reconsiderationOrgan = 'reconsiderationOrgan1';
                _this.formData.lawsuitOrgan = 'enforcementOrgan1';
            });
      });

    },


  },
  mounted() {
    this.$set(this.formData, 'measureStartDate', new Date());
    this.startTime();
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
</style>
