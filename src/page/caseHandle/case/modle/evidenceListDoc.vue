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
              <el-form-item prop="party">
                <el-input type='textarea' v-model="docData.party" v-bind:class="{ over_flow:docData.party.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
                <!-- <el-input v-model="docData.party"  @input="widthCheck($event.target, 23,$event)" maxlength="47" v-bind:class="{over_flow: isOverflow}" placeholder="\"></el-input> -->
              </el-form-item>

            </td>
            <td>身份证件号</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyIdNo">
                <el-input v-model="docData.partyIdNo" :maxLength='maxLength' placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>住址</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyAddress">
                <el-input v-model="docData.partyAddress" v-bind:class="{ over_flow:docData.partyAddress.length>14?true:false }" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="adressLength" placeholder="\"></el-input>
              </el-form-item>
            </td>
            <td>联系电话</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyTel">
                <el-input v-model="docData.partyTel" :maxLength='maxLength' placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td rowspan="4"> 单位 </td>
            <td>名称</td>
            <td colspan="5" class="color_DBE4EF">
              <el-form-item prop="partyName">
                <el-input v-model="docData.partyName" :maxLength='maxLength' placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>地址</td>
            <td colspan="4" class="color_DBE4EF">
              <el-form-item prop="partyUnitAddress">
                <el-input v-model="docData.partyUnitAddress" :maxLength='maxLength' placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>联系电话</td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyUnitTel">
                <el-input v-model="docData.partyUnitTel" minlength="11" :maxLength='maxLength' placeholder="\"></el-input>
              </el-form-item>
            </td>
            <td> 法定代表人 </td>
            <td class="color_DBE4EF">
              <el-form-item prop="partyManager">
                <el-input v-model="docData.partyManager" :maxLength='maxLength' placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              统一社会信用代码
            </td>
            <td colspan="3" class="color_DBE4EF">
              <el-form-item prop="socialCreditCode">
                <el-input v-model="docData.socialCreditCode" :maxLength='maxLength' placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>

        <p>因调查
          <span>
            <el-form-item prop="caseName">
              <el-input v-model="docData.caseName" :maxLength='maxLength' placeholder="\"></el-input>
            </el-form-item>
          </span>一案，根据《中华人民共和国行政处罚法》第三十七条第二款的规定，对你（单位）下列物品予以先行登记保存
          <span>
            <el-form-item prop="acceptTreatmentNumber">
              <el-input v-model="docData.acceptTreatmentNumber" :maxLength='maxLength' placeholder="\"></el-input>
            </el-form-item>
          </span>日（自
          <span>
            <el-form-item prop="acceptTreatmentStartDate" class="pdf_datapick">
              <el-date-picker v-model="docData.acceptTreatmentStartDate" @blur="starttime" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日">
              </el-date-picker>
            </el-form-item>
          </span>至
          <span>
            <el-form-item prop="acceptTreatmentEndDate" class="pdf_datapick">
              <el-date-picker v-model="docData.acceptTreatmentEndDate" @blur="endtime" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日">
              </el-date-picker>
            </el-form-item>
          </span>）。在此期间，当事人或有关人员不得销毁或转移证据。
        </p>

        <div @click="handleAdd">
          <el-table :data="tableData" border stripe  style="width: 100%">
            <el-table-column prop="evidenceNo" label="序号" width="120"  align="center"></el-table-column>
            <el-table-column prop="evidenceName" label="证据名称"  align="center"></el-table-column>
            <el-table-column prop="spec" label="规格" width="120" :formatter="formatSpec" align="center"></el-table-column>
            <el-table-column prop="amount" label="数量" width="120" align="center"></el-table-column>
            <el-table-column prop="savePlace" label="登记保存地点"  align="center"> </el-table-column>
          </el-table>
        </div>
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
            <el-date-picker v-model="docData.makeDate" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日">
            </el-date-picker>
          </el-form-item>
        </div>
        <div class="notice clear">
          <span>(本文书一式两份：一份存根，一份交当事人或其代理人。)</span>
        </div>
      </el-form>
    </div>

    <!-- 添加弹出框 -->
    <el-dialog title="登记保存物品" :visible.sync="addVisible" width="60%" v-loading="addLoading" :before-close="handleClose">
      <div>
        <div>
          <el-form ref="docForm">
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

              <el-table-column width="52%" >
                <template slot-scope="scope">
                  <el-button size="mini" icon="el-icon-circle-close" circle @click="handleRow(scope.$evidenceNo, scope.row)"></el-button>
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
export default {
  components: {
    overflowInput,
    casePageFloatBtns
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(['caseId']) },
  data() {
    return {
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
        signtureSign: '',
        staff: '',
        makeDate: '',
      },
      handleType: 0, //0  暂存     1 提交
      caseDocDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: '', //案件id--从流程进入删掉，先写死测试用
        caseDoctypeId: this.$route.params.docId,    //文书类型ID
        //表单数据
        docData: "",
        status: ""
      },
      rules: {
        party: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        partyIdNo: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        partyTel: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        partyName: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        partyUnitTel: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        caseName: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        acceptTreatmentNumber: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        acceptTreatmentStartDate: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        acceptTreatmentEndDate: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
      },
      nameLength: 23,
      adressLength: 23,
      maxLength: 23,
      tableData: [],
      formOrDocData: {
        showBtn: [false, true, true, false, false, false, false, false, false], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节
        pageDomId: 'evidenceListDoc_print',
      },
      addVisible: false,
      addLoading: false,
      tableDatas: [],
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
          label: '件'
        },
        {
          value: '4',
          label: '其他待定'
        },
      ],
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
          this.docData.acceptTreatmentNumber = this.docData.acceptTreatmentEndDate - this.docData.acceptTreatmentStartDate;
          this.docData.acceptTreatmentNumber = Math.abs(this.docData.acceptTreatmentNumber)
          // 除以一天的毫秒数（默认时间戳是到毫秒的，就算取到秒级的时间戳后面也带了3个0）
          this.docData.acceptTreatmentNumber = this.docData.acceptTreatmentNumber / (24 * 3600 * 1000);
          // 取整
          this.docData.acceptTreatmentNumber = Math.floor(this.docData.acceptTreatmentNumber) + 1;
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
          this.docData.acceptTreatmentNumber = this.docData.acceptTreatmentEndDate - this.docData.acceptTreatmentStartDate;
          this.docData.acceptTreatmentNumber = Math.abs(this.docData.acceptTreatmentNumber)
          // 除以一天的毫秒数（默认时间戳是到毫秒的，就算取到秒级的时间戳后面也带了3个0）
          this.docData.acceptTreatmentNumber = this.docData.acceptTreatmentNumber / (24 * 3600 * 1000);
          // 取整
          this.docData.acceptTreatmentNumber = Math.floor(this.docData.acceptTreatmentNumber) + 1;

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

    handleRow(evidenceNo, row) {
        this.tableDatas.splice(evidenceNo, 1)
        for(let i=0; i<this.tableDatas.length; i++){
          if(this.tableDatas[i].evidenceNo > evidenceNo){
            this.tableDatas[i].evidenceNo = this.tableDatas[i].evidenceNo - 1;
          }
        }
    },

    submitForm(formName){
      for(let i=0; i<this.tableDatas.length; i++){
          if(!this.tableDatas[i].evidenceName && !this.tableDatas[i].spec && !this.tableDatas[i].amount && !this.tableDatas[i].savePlace){
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
        return "件";
      }else if( cellValue == '4'){
        return "其他待定";
      }
    },
  },
  mounted() {
    this.getDocDataByCaseIdAndDocId();
  },
  created() {
    this.isOverStatus();
  },
}
</script>
<style lang="scss">
@import "@/assets/css/caseHandle/caseDocModle.scss";
</style>
