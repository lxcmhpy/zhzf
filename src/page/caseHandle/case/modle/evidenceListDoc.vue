<!-------长软------->
<template>
  <div class="print_box ">
    <div class="print_info" id="evidenceListDoc_print">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData">
        <div class="doc_topic">证据登记保存清单</div>
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
              <el-form-item prop="party" :rules="fieldRules('party',propertyFeatures['party'],'',isParty)">
                <el-input type='textarea' v-model="docData.party" v-bind:class="{ over_flow:docData.party.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" 
                  :disabled="!isParty || fieldDisabled(propertyFeatures['party'])" placeholder="\"></el-input>
                <!-- <el-input v-model="docData.party"  @input="widthCheck($event.target, 23,$event)" maxlength="47" v-bind:class="{over_flow: isOverflow}" placeholder="\"></el-input> -->
              </el-form-item>

            </td>
            <td>身份证件号</td>
            <td colspan="2" class="color_DBE4EF">
 
              <!-- <el-form-item prop="partyIdNo" :rules="isParty && propertyFeatures['partyIdNo'] && propertyFeatures['partyIdNo'].required ? rules.partyIdNo : [{ validator:validateIDNumber,trigger: 'blur'}]"> -->
              <el-form-item prop="partyIdNo" :rules="fieldRules('partyIdNo',propertyFeatures['partyIdNo'],validateIDNumber,isParty)">
                <el-input type="textarea" v-model="docData.partyIdNo" maxLength='18' v-bind:class="{ over_flow:docData.partyIdNo.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 2}" 
                  :disabled="!isParty || fieldDisabled(propertyFeatures['partyIdNo'])" placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>住址</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyAddress" :rules="fieldRules('partyAddress',propertyFeatures['partyAddress'],'',isParty)">
                <el-input type="textarea" v-model="docData.partyAddress" v-bind:class="{ over_flow:docData.partyAddress.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="adressLength" 
                  :disabled="!isParty || fieldDisabled(propertyFeatures['partyAddress'])" placeholder="\"></el-input>

              </el-form-item>
            </td>
            <td>联系电话</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyTel" :rules="fieldRules('partyTel',propertyFeatures['partyTel'],validatePhone,isParty)">
                <el-input v-model="docData.partyTel" maxLength='11' 
                  :disabled="!isParty || fieldDisabled(propertyFeatures['partyTel'])" placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td rowspan="4"> 单位 </td>
            <td>名称</td>
            <td colspan="5" class="color_DBE4EF">
              <el-form-item prop="partyName" :rules="fieldRules('partyName',propertyFeatures['partyName'],'',!isParty)">
                <el-input v-model="docData.partyName" :maxLength='maxLength' 
                :disabled="isParty || fieldDisabled(propertyFeatures['partyName'])" placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>地址</td>
            <td colspan="4" class="color_DBE4EF">
              <el-form-item prop="partyUnitAddress" :rules="fieldRules('partyUnitAddress',propertyFeatures['partyUnitAddress'],'',!isParty)">
                <el-input v-model="docData.partyUnitAddress" :maxLength='maxLength' 
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyUnitAddress'])" placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>联系电话</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyUnitTel" :rules="fieldRules('partyUnitTel',propertyFeatures['partyUnitTel'],validatePhone,!isParty)">
                <el-input v-model="docData.partyUnitTel"  :maxLength='11' 
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyUnitTel'])" placeholder="\"></el-input>
              </el-form-item>
            </td>
            <td> 法定代表人 </td>
            <td class="color_DBE4EF">
              <el-form-item prop="partyManager" :rules="fieldRules('partyManager',propertyFeatures['partyManager'],'',!isParty)">
                <el-input v-model="docData.partyManager" maxLength='10' 
                  :disabled="isParty || fieldDisabled(propertyFeatures['partyManager'])" placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              统一社会信用代码
            </td>
            <td colspan="3" class="color_DBE4EF">
              <el-form-item prop="socialCreditCode" :rules="fieldRules('socialCreditCode',propertyFeatures['socialCreditCode'],'',!isParty)">
                <el-input v-model="docData.socialCreditCode" maxLength='22' 
                  :disabled="isParty || fieldDisabled(propertyFeatures['socialCreditCode'])" placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>

        <p>因调查
          <span>
            <el-form-item prop="caseName" style="width:220px" :rules="fieldRules('caseName',propertyFeatures['caseName'])">
              <el-input type="textarea" v-model="docData.caseName" :maxLength='maxLength' 
                placeholder="\" v-bind:class="{ over_flow:docData.caseName.length>12?true:false }"
                :disabled="fieldDisabled(propertyFeatures['caseName'])"></el-input>
            </el-form-item>
          </span>一案，根据《中华人民共和国行政处罚法》第三十七条第二款的规定，对你（单位）下列物品予以先行登记保存
          <span>
            <el-form-item prop="acceptTreatmentNumber" style="width:120px" :rules="fieldRules('acceptTreatmentNumber',propertyFeatures['acceptTreatmentNumber'])">
              <el-input v-model="docData.acceptTreatmentNumber" :maxLength='maxLength' placeholder="\" :disabled="fieldDisabled(propertyFeatures['acceptTreatmentNumber'])"></el-input>
            </el-form-item>
           
          </span>日（自
          <span>
            <el-form-item prop="acceptTreatmentStartDate" class="pdf_datapick" :rules="fieldRules('acceptTreatmentStartDate',propertyFeatures['acceptTreatmentStartDate'])">
              <el-date-picker v-model="docData.acceptTreatmentStartDate" @blur="starttime" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日" value-format="yyyy-MM-dd" :disabled="fieldDisabled(propertyFeatures['acceptTreatmentStartDate'])">
              </el-date-picker>
            </el-form-item>
          </span>至
          <span>
            <el-form-item prop="acceptTreatmentEndDate" class="pdf_datapick" :rules="fieldRules('acceptTreatmentEndDate',propertyFeatures['acceptTreatmentEndDate'])">
              <el-date-picker v-model="docData.acceptTreatmentEndDate" @blur="endtime" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日" value-format="yyyy-MM-dd" :disabled="fieldDisabled(propertyFeatures['acceptTreatmentEndDate'])">
              </el-date-picker>
            </el-form-item>
          </span>）。在此期间，当事人或有关人员不得销毁或转移证据。
        </p>

        <!-- <div @click="handleAdd"> -->
          <!-- <el-table :data="tableData" border stripe  style="width: 100%">
            <el-table-column prop="evidenceNo" label="序号" width="120"  align="center"></el-table-column>
            <el-table-column prop="evidenceName" label="证据名称"  align="center"></el-table-column>
            <el-table-column prop="spec" label="规格" width="120" :formatter="formatSpec" align="center"></el-table-column>
            <el-table-column prop="amount" label="数量" width="120" align="center"></el-table-column>
            <el-table-column prop="savePlace" label="登记保存地点"  align="center"> </el-table-column>
          </el-table> -->

         <table class="evidencetable" border="1" bordercolor="black" width="100%" cellspacing="0">
            <tr>
              <td width="10%">序号</td>
              <td width="30%">证据名称</td>
              <td width="10%">规格</td>
              <td width="10%">数量</td>
              <td width="40%">登记保存地点</td>
            </tr>
            <tr v-if="docData.tableData.length==0"  @click="handleAdd">
              <td></td>
              <td ></td>
              <td></td>
              <td></td>
              <td ></td>
            </tr>
            <tr v-for="(item,index) in docData.tableData" :key="index"  @click="handleAdd">
              <td>{{item.evidenceNo}}</td>
              <td >{{item.evidenceName}}</td>
              <td>{{item.spec}}</td>
              <td>{{item.amount}}</td>
              <td ><div style="">{{item.savePlace}}</div></td>
            </tr>
         </table>

        <!-- </div> -->
        <el-form-item  prop="evidenceLength" style="visibility:hidden">
          <el-input v-model="docData.evidenceLength"></el-input>
        </el-form-item>
        <br>

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
          <span @click='makeSeal'>交通运输执法部门(印章)</span><br>
          <el-form-item prop="makeDate" class="pdf_datapick">
            <el-date-picker v-model="docData.makeDate" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日"  value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </div>
        <div class="notice clear">
          <span>(本文书一式两份：一份存根，一份交当事人或其代理人。)</span>
        </div>
      </el-form>
    </div>

    <!-- 添加弹出框 -->
    <el-dialog title="登记保存物品" :visible.sync="addVisible" append-to-body width="60%" v-loading="addLoading" :before-close="handleClose">
      <div>
        <div  class="fullscreen">
          <el-form ref="addEvidenceFormRef">
            <el-table :data="tableDatas" stripe border style="width: 100%">
              <el-table-column  prop="evidenceNo" label="序号" align="center">
              </el-table-column>

              <el-table-column label="证据名称" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.evidenceName"></el-input>
                </template>
              </el-table-column>

              <el-table-column prop="spec" label="规格" align="center">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.spec" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>

              <el-table-column prop="amount" label="数量" align="center">
                <template slot-scope="scope">
                  <el-input-number size="mini" v-model="scope.row.amount" :min="1"  label="描述文字"></el-input-number>
                </template>
              </el-table-column>

              <el-table-column label="登记保存地点" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.savePlace"></el-input>
                </template>
              </el-table-column>

              <el-table-column width="52%">
                <template slot-scope="scope">
                  <el-button size="mini" class="evdence-form" icon="el-icon-circle-close" circle @click="handleRow(scope.row)" style="border-radius: 50px;"></el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button icon="el-icon-circle-plus-outline" @click="addTableData" circle type="info" style="margin-left: 50%;margin-top: 10px"></el-button>
          </el-form>
        </div>
        <div style="margin-left: 45%;margin-top: 10px">
            <el-button size="medium" type="primary" @click="submitForm('addEvidenceFormRef')">确 定</el-button>
            <el-button size="medium" @click="addVisible=false">取  消</el-button>
        </div>
      </div>
    </el-dialog>
        
         <!-- 悬浮按钮 -->
        <casePageFloatBtns :pageDomId="'evidenceListDoc_print'" :formOrDocData="formOrDocData" @submitData="submitData" @saveData="saveData" @backHuanjie="submitData"></casePageFloatBtns>

        <overflowInput ref="overflowInputRef" @overFloeEditInfo="getOverFloeEditInfo"></overflowInput>
  </div>
</template>
<script>
import overflowInput from "./overflowInput";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
import mySignture from "@/common/js/mySignture";
import { validatePhone, validateIDNumber } from "@/common/js/validator";
export default {
  components: {
    overflowInput,
    casePageFloatBtns
  },
  mixins: [mixinGetCaseApiList],
  computed: { 
    ...mapGetters(['caseId']),
    // fieldDisabled(fieldProperty){
    //   return function(fieldProperty){
    //     console.log('asjddh',fieldProperty && fieldProperty.editable==false)
    //     return  fieldProperty && fieldProperty.editable==false
    //   }
    // },
    // fieldRules(field,fieldProperty,validateType=''){
    //   return function(field,fieldProperty,validateType=''){
    //     console.log(field,fieldProperty,validateType);
    //     return  fieldProperty && fieldProperty.required ? this.rules.field : [{ validator:validateType,trigger: 'blur'}]
    //   }
    // }
  },
  data() {
    //验证是否填写证据
    var validateEvidencLength = (rule, value, callback) => {
      if (this.docData.tableData.length == 0) {
        return callback(new Error("至少填写一个证据物品"));
      }
      callback();
    };
    return {
      validatePhone: validatePhone,
      validateIDNumber: validateIDNumber,
      docData: {
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
        caseName: '',
        acceptTreatmentNumber: '',
        acceptTreatmentStartDate: '',
        acceptTreatmentEndDate: '',
        makeDate: '',
        tableData:[], //证据清单
        evidenceLength:0, //证据清单长度
      },
      handleType: 0, //0  暂存     1 提交
      caseDocDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: '', //案件id--从流程进入删掉，先写死测试用
        caseDoctypeId: this.$route.params.docId,    //文书类型ID
        //表单数据
        docData: "",
        status: "",
        linkTypeId:this.BASIC_DATA_SYS.caseDoc_caseLinktypeId //所属环节的id
      },
      rules: {
        party: [
          { required: true, message: '当事人姓名不能为空', trigger: 'blur' },
        ],
        partyAddress: [
          { required: true, message: '当事人地址不能为空', trigger: 'blur' },
        ],
        partyIdNo: [
          { required: true, message: '身份证号码不能为空', trigger: 'blur' },
          { validator:validateIDNumber , trigger: "blur"}
        ],
        partyTel: [
          { required: true, message: '当事人联系电话不能为空', trigger: 'blur' },
          { validator:validatePhone , trigger: "blur" }
        ],
        partyName: [
          { required: true, message: '单位名称不能为空', trigger: 'blur' },
        ],
        partyUnitAddress: [
          { required: true, message: '单位地址不能为空', trigger: 'blur' },
        ],
        partyUnitTel: [
          { required: true, message: '单位联系电话不能为空', trigger: 'blur' },
          { validator:validatePhone , trigger: "blur" }
        ],
        partyManager: [
          { required: true, message: '法人不能为空', trigger: 'blur' },
        ],
        socialCreditCode: [
          { required: true, message: '社会信用代码不能为空', trigger: 'blur' },
        ],
        caseName: [
          { required: true, message: '案件名称不能为空', trigger: 'blur' },
        ],
        acceptTreatmentNumber: [
          { required: true, message: '保存时间不能为空', trigger: 'blur' },
        ],
        acceptTreatmentStartDate: [
          { required: true, message: '保存开始时间不能为空', trigger: 'blur' },
        ],
        acceptTreatmentEndDate: [
          { required: true, message: '保存结束时间不能为空', trigger: 'blur' },
        ],
        evidenceLength: [
           { validator: validateEvidencLength,trigger: "blur" }
        ],
      },
      nameLength: 23,
      adressLength: 23,
      maxLength: 23,
      // tableData: [],
      formOrDocData: {
        showBtn: [false, true, true, false, false, false, false, false, false], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节
        pageDomId: 'evidenceListDoc_print',
      },
      addVisible: false,
      addLoading: false,
      tableDatas: [],
      options: [
        {
          value: '份',
          label: '份'
        },
        {
          value: '套',
          label: '套'
        },
        {
          value: '件',
          label: '件'
        },
        {
          value: '其他待定',
          label: '其他待定'
        },
      ],
      isParty: true, //当事人类型为个人
      propertyFeatures:'', //字段属性配置

    }
  },

 methods: {
    //根据案件ID和文书Id获取数据
    getDocDataByCaseIdAndDocId() {
      this.caseDocDataForm.caseBasicinfoId = this.caseId;
      let data = {
        caseId: this.caseId,
        docId: this.$route.params.docId
      };
      this.com_getDocDataByCaseIdAndDocId(data)
    },
    //保存文书信息
    // addDocData(handleType) {
    //   this.com_addDocData(handleType, 'docForm');
    // },
    // 盖章
    makeSeal() {
      console.log('盖章!');
       mySignture.openURL('oeder');
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
      //  setTimeout(() => {
      //   this.printContent();
      //   }, 1000)
      this.com_addDocData(handleType, "docForm");
    },
    //是否是完成状态
    isOverStatus() {
      if (this.$route.params.docStatus == '1') {
          this.formOrDocData.showBtn = [false, false, false, false, false, false, false, false, false, true]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
        }
    },
    starttime(){
      if (this.docData.acceptTreatmentEndDate){
        if(this.docData.acceptTreatmentStartDate > this.docData.acceptTreatmentEndDate){
          this.$message({
            message: '开始时间不能大于结束时间',
            type: 'warning'
          });
          this.docData.acceptTreatmentStartDate = '';
          this.docData.acceptTreatmentNumber = '';
        }else{
          // this.docData.acceptTreatmentNumber = this.docData.acceptTreatmentEndDate - this.docData.acceptTreatmentStartDate;
          this.docData.acceptTreatmentNumber = new Date(this.docData.acceptTreatmentEndDate) - new Date(this.docData.acceptTreatmentStartDate);
          this.docData.acceptTreatmentNumber = Math.abs(this.docData.acceptTreatmentNumber)
          // 除以一天的毫秒数（默认时间戳是到毫秒的，就算取到秒级的时间戳后面也带了3个0）
          this.docData.acceptTreatmentNumber = this.docData.acceptTreatmentNumber / (24 * 3600 * 1000);
          // 取整
          console.log(this.docData.acceptTreatmentNumber,'this.docData.acceptTreatmentNumber')
          this.docData.acceptTreatmentNumber = Math.floor(this.docData.acceptTreatmentNumber) ;
          this.$set(this.docData, 'acceptTreatmentNumber',  this.docData.acceptTreatmentNumber);
          // 有问题，第一次点击不回显
          console.log("timestamp", this.docData.acceptTreatmentNumber)
        }
      }
    },
    endtime(){
      if (this.docData.acceptTreatmentStartDate){
        if(this.docData.acceptTreatmentStartDate > this.docData.acceptTreatmentEndDate){
          this.$message({
            message: '结束时间不能小于开始时间',
            type: 'warning'
          });
          this.docData.acceptTreatmentEndDate = '';
          this.docData.acceptTreatmentNumber = '';
        }else{
          console.log('时间',this.docData.acceptTreatmentStartDate,this.docData.acceptTreatmentEndDate)
          this.docData.acceptTreatmentNumber = new Date(this.docData.acceptTreatmentEndDate) - new Date(this.docData.acceptTreatmentStartDate);
          this.docData.acceptTreatmentNumber = Math.abs(this.docData.acceptTreatmentNumber)
          console.log('this.docData.acceptTreatmentEndDate',this.docData.acceptTreatmentEndDate)
          // 除以一天的毫秒数（默认时间戳是到毫秒的，就算取到秒级的时间戳后面也带了3个0）
          this.docData.acceptTreatmentNumber = this.docData.acceptTreatmentNumber / (24 * 3600 * 1000);
          // 取整
          this.docData.acceptTreatmentNumber = Math.floor(this.docData.acceptTreatmentNumber) ;

          this.$set(this.docData, 'acceptTreatmentNumber',  this.docData.acceptTreatmentNumber);
          // 有问题，第一次点击不回显
          console.log("timestamp", this.docData.acceptTreatmentNumber)

        }
      }
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

    handleAdd(evidenceNo, row) {
        this.tableDatas = JSON.parse(JSON.stringify(this.docData.tableData));
        this.addVisible = true;
         if(this.tableDatas.length == 0){
        this.tableDatas.push({'evidenceNo': 1, 'amount' : 1});
        }
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
    },

    handleRow(row) {
        for(let i=0; i<this.tableDatas.length; i++){
          if(this.tableDatas[i].evidenceNo > row.evidenceNo){
            this.tableDatas[i].evidenceNo = this.tableDatas[i].evidenceNo - 1;
          }
        }
        this.tableDatas.splice(row.evidenceNo-1, 1)
    },

    submitForm(formName){
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
          this.docData.tableData = this.tableDatas;
          this.addVisible = false;
        }
    
    },

    formatSpec: function(row, column, cellValue) {
      if( cellValue == '1'){
        return "份";
      }else if( cellValue == '2'){
        return "套";
      }else if( cellValue == '3'){
        return "件";
      }else if( cellValue == '4'){
        return "其他待定";
      }
    },
  },
  mounted() {
    this.getDocDataByCaseIdAndDocId();
   
    // let formFields = this.$refs.docForm.fields;
    // formFields.forEach(item=>{
    //   console.log('item',item);
    //   item.form.disabled = true;
    //   this.$set(item,'disabled',true);
    // })
  },
  created() {
    this.isOverStatus();
  },
}
</script>
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss">
/* @import "@/assets/css/caseHandle/caseDocModle.scss"; */
.print_box .print_info .evidencetable tr td{
  white-space: inherit;
  text-align-last: center;
}
.evdence-form {
  .el-icon-circle-close {
    color: #7b7b7b !important;
  }
}
</style>