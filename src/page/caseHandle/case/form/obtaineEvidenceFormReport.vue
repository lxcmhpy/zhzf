<template>
  <div class="print_box" id='btnB'>
    <div class="print_info" id='obtanEvidence_print'>
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData" :class="isPdf">
        <div class="doc_topic">抽样取证凭证</div>
        <div class="doc_number">案号：{{docData.caseNumber}}</div>
        <table class="print_table" border="1" bordercolor="black" width="100%" cellspacing="0">
          <tr>
            <td rowspan="6">
              当<br>
              事<br>
              人
            </td>
            <td rowspan="2">个人</td>
            <td>姓名</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="party">
                <el-input type='textarea' v-model="docData.party" v-bind:class="{ over_flow:docData.party.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" disabled placeholder="\"></el-input>
                <!-- <el-input v-model="docData.party"  @input="widthCheck($event.target, 23,$event)" maxlength="47" v-bind:class="{over_flow: isOverflow}" placeholder="\"></el-input> -->
              </el-form-item>
            </td>
            <td>身份证件号</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyIdNo">
                <el-input type='textarea' v-model="docData.partyIdNo" :maxLength='18' placeholder="\" :autosize="{ minRows: 1, maxRows: 3}" :disabled="isParty ? false : true"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>住址</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyAddress">
                <el-input type='textarea' v-model="docData.partyAddress" v-bind:class="{ over_flow:docData.partyAddress.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" maxlength="30" :disabled="isParty  ? false : true" placeholder="\"></el-input>
              </el-form-item>
            </td>
            <td>联系电话</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyTel">
                <el-input v-model="docData.partyTel" maxLength='11' placeholder="\" :disabled="isParty ? false : true"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td rowspan="4"> 单位 </td>
            <td>名称</td>
            <td colspan="5" class="color_DBE4EF">
              <el-form-item prop="partyName">
                <el-input v-model="docData.partyName" :maxLength='maxLength' :disabled="isParty ? true : false" placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>地址</td>
            <td colspan="4" class="color_DBE4EF">
              <el-form-item prop="partyUnitAddress">
                <el-input v-model="docData.partyUnitAddress" :maxLength='maxLength' :disabled="isParty ? true : false" placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>联系电话</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyUnitTel">
                <el-input v-model="docData.partyUnitTel" minlength="11" :maxLength='maxLength' :disabled="isParty ? true : false" placeholder="\"></el-input>
              </el-form-item>
            </td>
            <td> 法定代表人 </td>
            <td class="color_DBE4EF">
              <el-form-item prop="partyManager">
                <el-input v-model="docData.partyManager" :maxLength='maxLength' :disabled="isParty ? true : false" placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              统一社会信用代码
            </td>
            <td colspan="3" class="color_DBE4EF">
              <el-form-item prop="socialCreditCode">
                <el-input v-model="docData.socialCreditCode" :maxLength='maxLength' :disabled="isParty ? true : false" placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
        <p class="textindent0 data_picker">
          抽样取证时间：
          <el-form-item prop="getEvidenceTime">
          <el-date-picker style="width:430px"  v-model="docData.getEvidenceTime" type="datetimerange" range-separator="至" start-placeholder=" 年  月  日  时  分" end-placeholder=" 年  月  日  时  分" format="yyyy年MM月dd日HH时mm分">
          </el-date-picker>
          </el-form-item>
        </p>
        <div class="pager_input quzheng">抽样取证地点：
          <el-form-item prop="evidencePlace">
            <el-input class='text_indent10 overflow_lins_textarea' v-model="docData.evidencePlace"  maxLength='30' placeholder="\"></el-input>
          </el-form-item>
        </div>
        <el-row :gutter="10" class="pager_input">
          <el-col :span="13">抽样取证机关：
            <el-form-item prop="evidenceDepartment">
              <el-input class='text_indent10 overflow_lins_textarea' v-model="docData.evidenceDepartment"  maxLength='12' placeholder="\"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            联系电话：
            <el-form-item prop="evidenceDepartmentPhone">
              <el-input class='text_indent10 overflow_lins_textarea' v-model="docData.evidenceDepartmentPhone" rows="3" maxLength='90' placeholder="\"></el-input>
            </el-form-item>

          </el-col>
        </el-row>
        <p>
          依据《中华人民共和国行政处罚法》第三十七条第二款规定，对你（单位）的下列物品进行抽样取证。
        </p>
        <table class="evidencetable" border="1" bordercolor="black" width="100%" cellspacing="0" @click="handleAdd">
          <!-- <tr>
            <td>序号</td>
            <td>被抽样物品名称</td>
            <td>规格及批号</td>
            <td>数量</td>
            <td>被抽样物品地点</td>
          </tr> -->

          <tr>
              <td width="10%">序号</td>
              <td width="30%">被抽样物品名称</td>
              <td width="10%">规格及批号</td>
              <td width="10%">数量</td>
              <td width="40%">被抽样物品地点</td>
          </tr>
          <tr v-for="(item,index) in docData.evdenceList" :key="index">
            <td>{{item.evidenceNo}}</td>
            <td >{{item.evidenceName}}</td>
            <td>{{item.spec}}</td>
            <td>{{item.amount}}</td>
            <td ><div style="">{{item.savePlace}}</div></td>
          </tr>
          <!-- <tr v-for="item in evdenceList" :key="item.id">
            <td class="color_DBE4EF">
             
              <el-form-item>
                <el-input class='text_indent10 overflow_lins_textarea' v-model="item.index" rows="3" maxLength='90' placeholder="\"></el-input>
              </el-form-item>
            </td>
            <td class="color_DBE4EF">
      
              <el-form-item>
                <el-input class='text_indent10 overflow_lins_textarea' v-model="item.sampleName" rows="3" maxLength='90' placeholder="\"></el-input>
              </el-form-item>
            </td>
            <td class="color_DBE4EF">
             
              <el-form-item>
                <el-input class='text_indent10 overflow_lins_textarea' v-model="item.batchNumber" rows="3" maxLength='90' placeholder="\"></el-input>
              </el-form-item>
            </td>
            <td class="color_DBE4EF">
             
              <el-form-item>
                <el-input class='text_indent10 overflow_lins_textarea' v-model="item.sampleNumber" rows="3" maxLength='90' placeholder="\"></el-input>
              </el-form-item>
            </td>
            <td class="color_DBE4EF">
             
              <el-form-item>
                <el-input class='text_indent10 overflow_lins_textarea' v-model="item.samplePlace" rows="3" maxLength='90' placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr> -->
         
        </table>
        <el-form-item  prop="evidenceLength" style="visibility:hidden">
          <el-input v-model="docData.evidenceLength"></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            当事人或其代理人签名：
            <span class="write_line width250"></span>
          </el-col>
          <el-col :span="12">
            执法人员签名：
            <span class="write_line width250"></span>
          </el-col>
        </el-row>
        <div class="pdf_seal">
          <span>交通运输执法部门(印章)</span><br>
          <el-form-item prop="makeDate" class="pdf_datapick">
            <el-date-picker class="big_error" v-model="docData.makeDate" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日">
            </el-date-picker>
          </el-form-item>
        </div>
        <div class="pager_input quzheng">备注：
          <el-form-item>
            <el-input class='text_indent10 overflow_lins_textarea' v-model="docData.note" rows="3" maxLength='90' placeholder="\"></el-input>
          </el-form-item>
        </div>
        <div class="notice clear">
          <span>(本文书一式两份：一份存根，一份交当事人或其代理人。)</span>
        </div>
      </el-form>
    </div>
    <!-- 悬浮按钮 -->
    <casePageFloatBtns :pageDomId="'obtanEvidence_print'" :formOrDocData="formOrDocData" @submitData="submitData" @saveData="saveData" @backHuanjie="submitData"></casePageFloatBtns>

    <!-- 添加弹出框 -->
    <el-dialog title="抽样取证物品" :visible.sync="addVisible" width="60%" v-loading="addLoading">
      <div>
        <div>
          <el-form ref="addEvidenceFormRef">
            <el-table :data="tableDatas" stripe border style="width: 100%">
              <el-table-column  prop="evidenceNo" label="序号" align="center">
              </el-table-column>

              <el-table-column label="被抽样物品名称" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.evidenceName"></el-input>
                </template>
              </el-table-column>

              <el-table-column prop="spec" label="规格及批号" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.spec"></el-input>
                </template>
              </el-table-column>

              <el-table-column prop="amount" label="数量" align="center">
                <template slot-scope="scope">
                  <el-input-number size="mini" v-model="scope.row.amount" :min="1"  label="描述文字"></el-input-number>
                </template>
              </el-table-column>

              <el-table-column label="抽样地点" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.savePlace"></el-input>
                </template>
              </el-table-column>

              <el-table-column width="52%" >
                <template slot-scope="scope">
                  <el-button size="mini" icon="el-icon-circle-close" circle @click="deleteEvidence(scope.row)"></el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button icon="el-icon-circle-plus-outline"  circle type="info" @click="addTableData" style="margin-left: 50%;margin-top: 10px"></el-button>
          </el-form>
        </div>
        <div style="margin-left: 45%;margin-top: 10px">
            <el-button size="medium" type="primary" @click="addEvidenceSure('addEvidenceFormRef')">确 定</el-button>
            <el-button size="medium" @click="addVisible=false">取  消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import overflowInput from "@/page/caseHandle/case/modle/overflowInput.vue";
import { mixinGetCaseApiList } from "@/common/js/mixins";

import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
import { validatePhone, validateIDNumber } from "@/common/js/validator";
export default {
  components: {
    casePageFloatBtns
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(['caseId']) },
  data() {
    //验证是否填写证据
    var validateEvidencLength = (rule, value, callback) => {
      if (this.docData.evdenceList.length == 0) {
        return callback(new Error("至少填写一个证据物品"));
      }
      callback();
    };
    return {
      
      docData: {
        caseNumber: '',
        // partyType: '',
        party: '',
        partyIdNo: '',
        partyAddress: '',
        partyTel: '',
        partyName: '',
        partyUnitAddress: '',
        partyUnitTel: '',
        partyManager: '',
        socialCreditCode: '',

        getEvidenceTime: '',
        evidencePlace: '',
        evidenceDepartment: '',
        evidenceDepartmentPhone: '',
        evdenceList: [],
        evidenceLength:0
      },
      // 下表格数据
      // evdenceList: [
      //   {
      //     index: '',
      //     sampleName: '',
      //     batchNumber: '',
      //     sampleNumber: '',
      //     samplePlace: ''
      //   },
      //   {
      //     index1: '',
      //     sampleName1: '',
      //     batchNumber1: '',
      //     sampleNumber1: '',
      //     samplePlace1: ''
      //   },
      //   {
      //     index2: '',
      //     sampleName2: '',
      //     batchNumber2: '',
      //     sampleNumber2: '',
      //     samplePlace2: ''
      //   },
      //   {
      //     index3: '',
      //     sampleName3: '',
      //     batchNumber3: '',
      //     sampleNumber3: '',
      //     samplePlace3: ''
      //   },
      //   {
      //     index4: '',
      //     sampleName4: '',
      //     batchNumber4: '',
      //     sampleNumber4: '',
      //     samplePlace4: ''
      //   },
      // ],
      caseDocDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件ID
        caseDoctypeId: this.$route.params.docId, //文书类型ID
        //文书数据
        docData: "",
        status: "" //提交状态
      },
      rules: {
        partyIdNo: [
          { validator:validateIDNumber , trigger: "blur"}
        ],
        partyTel: [
          { validator:validatePhone , trigger: "blur" }
        ],
        getEvidenceTime: [
          { required: true, message: '抽样取证时间不能为空', trigger: 'blur' }
        ],
        evidencePlace: [
          { required: true, message: '抽样取证地点不能为空', trigger: 'blur' }
        ],
        evidenceDepartment: [
          { required: true, message: '抽样取证机关不能为空', trigger: 'blur' }
        ],
        evidenceDepartmentPhone: [
          { required: true, message: '联系电话不能为空', trigger: 'blur' },
          { validator:validatePhone , trigger: "blur" }
        ],
        evidenceLength: [
           { validator: validateEvidencLength,trigger: "blur" }
        ],

      },
      tableDatas: [],
      nameLength: 23,
      adressLength: 23,
      maxLengthOverLine: 122,
      maxLength: 23,
      value: '',
      formOrDocData: {
        showBtn: [false, true, true, false, false, false, false, false, false], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节
        pageDomId: 'obtanEvidence_print',
      },
      isPdf: '',
      isParty: true, //当事人类型为个人
      needDealData:true,
      addVisible: false,
      addLoading: false,
    }
  },
  methods: {

    // 日期变化
    dataChange() {
      if (this.docData.dataEnd && this.docData.dataStart) {
        if (this.docData.dataEnd >= this.docData.dataStart) {

        }
        else {
          this.$message.error('开始日期不能晚于结束日期');
          this.docData.dataEnd = this.docData.dataStart = undefined;
        }

      }
    },
  
    //根据案件ID和文书Id获取数据
    getDocDataByCaseIdAndDocId() {
      this.caseDocDataForm.caseBasicinfoId = this.caseId;
      let data = {
        caseId: this.caseId,
        docId: this.$route.params.docId
      };
      this.com_getDocDataByCaseIdAndDocId(data)
      console.log('docData', this.docData.evdenceList)

    },
  

    
    overFlowEdit() { },

    //保存文书信息
    saveData(handleType) {
      // this.docData.evdenceList = this.evdenceList;
     
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
    getDataAfter() {
      console.log('this.docData', this.docData)
    },
    handleAdd(evidenceNo, row) {
        this.tableDatas = JSON.parse(JSON.stringify(this.docData.evdenceList));
        this.addVisible = true;
    },
    addTableData(){
      console.log(this.tableDatas)
      let length = this.tableDatas.length;
      if(length == 0){
        this.tableDatas.push({'evidenceNo': 1, 'amount' : 1});
      }else{
        this.tableDatas.push({'evidenceNo': Number(this.tableDatas[length - 1].evidenceNo) + 1, 'amount' : 1, 'savePlace': this.tableDatas[0].savePlace});
      }
    },
    //删除一行证据
    deleteEvidence(row) {
        for(let i=0; i<this.tableDatas.length; i++){
          if(this.tableDatas[i].evidenceNo > row.evidenceNo){
            this.tableDatas[i].evidenceNo = this.tableDatas[i].evidenceNo - 1;
          }
        }
        this.tableDatas.splice(row.evidenceNo-1, 1)
        console.log('newLing',this.tableDatas);
    },
    addEvidenceSure(formName){
      let canAdd = true;
      for(let i=0; i<this.tableDatas.length; i++){
          if(!this.tableDatas[i].evidenceName || !this.tableDatas[i].spec || !this.tableDatas[i].amount || !this.tableDatas[i].savePlace){
            this.$message({
              message: '数据至少有一项不为空！',
              type: 'warning'
            });
            canAdd = false;
            break;
          }
        }
        if(canAdd){
          this.docData.evdenceList = this.tableDatas;
          this.addVisible = false;
        }
    
    },
  },
  mounted() {
    this.getDocDataByCaseIdAndDocId();
    this.isOverStatus();
  },
}
</script>

<style lang="scss">
// @import "@/assets/css/documentForm.scss";
@import "@/assets/css/caseHandle/caseDocModle.scss";
.textindent0 {
  text-indent: 0 !important;
}
.print_box #obtanEvidence_print .el-form-item__content .el-input .el-input__inner{
  width: 100%;
}
.print_box .print_info .evidencetable tr td{
  white-space: inherit;
  text-align-last: center;
}
</style>
