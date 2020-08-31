<template>
  <div class="print_box" id="caseInvest-print" style="width:790px; margin:0 auto;">
    <div class="print_info" id="deliverCertificate-print">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData" :class="isPdf">
        <div class="doc_topic">公路路产损坏赔（补）偿清单</div>
        <table class="print_table" border="1" bordercolor="black" width="100%" cellspacing="0">
          <tr>
            <td style="width:60px">
              案由
            </td>
            <td colspan="6" class="color_DBE4EF">
              <el-form-item prop="caseName" :rules="fieldRules('caseName',propertyFeatures['caseName'])">
                <el-input type="textarea" v-model="docData.caseName" :disabled="fieldDisabled(propertyFeatures['caseName'])" :maxLength='maxLength' placeholder="\" :autosize="{ minRows: 1, maxRows: 2}"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td rowspan="3">
              当事人基本情况
            </td>
            <td>
              姓名
            </td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="party" :rules="fieldRules('party',propertyFeatures['party'])">
                <el-input type="textarea" v-model="docData.party" :disabled="fieldDisabled(propertyFeatures['party'])" :maxLength='maxLength' placeholder="\" :autosize="{ minRows: 1, maxRows: 2}"></el-input>
              </el-form-item>
            </td>
            <td>
              地址
            </td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyAddress" :rules="fieldRules('partyAddress',propertyFeatures['partyAddress'])">
                <el-input type="textarea" v-model="docData.partyAddress" :disabled="fieldDisabled(propertyFeatures['partyAddress'])" :maxLength='maxLength' placeholder="\" :autosize="{ minRows: 1, maxRows: 2}"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>

            <td>
              单位名称
            </td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyName" :rules="fieldRules('partyName',propertyFeatures['partyName'])">
                <el-input type="textarea" v-model="docData.partyName" :disabled="fieldDisabled(propertyFeatures['partyName'])" :maxLength='maxLength' placeholder="\" :autosize="{ minRows: 1, maxRows: 2}"></el-input>
              </el-form-item>
            </td>
            <td>
              法定代表人
            </td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="partyManager" :rules="fieldRules('partyManager',propertyFeatures['partyManager'])">
                <el-input type="textarea" v-model="docData.partyManager" :disabled="fieldDisabled(propertyFeatures['partyManager'])" :maxLength='maxLength' placeholder="\" :autosize="{ minRows: 1, maxRows: 2}"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              车辆所在地
            </td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="carLocation" :rules="fieldRules('carLocation',propertyFeatures['carLocation'])">
                <el-input type="textarea" v-model="docData.carLocation" :disabled="fieldDisabled(propertyFeatures['carLocation'])" :maxLength='maxLength' placeholder="\" :autosize="{ minRows: 1, maxRows: 2}"></el-input>
              </el-form-item>
            </td>
            <td>
              车型及车牌号
            </td>
            <td colspan="2" class="color_DBE4EF">
              <!-- <el-form-item prop="caseName" :rules="fieldRules('caseName',propertyFeatures['caseName'])">
                <el-input type="textarea" v-model="docData.caseName" :disabled="fieldDisabled(propertyFeatures['caseName'])" :maxLength='maxLength' placeholder="\" :autosize="{ minRows: 1, maxRows: 2}"></el-input>
              </el-form-item> -->
              <p>
                <el-form-item prop="vehicleType" style="width:calc(50% - 10px);" :rules="fieldRules('vehicleType',propertyFeatures['vehicleType'])">
                  <el-input type="textarea" v-model="docData.vehicleType" :disabled="fieldDisabled(propertyFeatures['vehicleType'])" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
                </el-form-item>
                <el-form-item prop="number" style="width:calc(50% - 10px);" :rules="fieldRules('number',propertyFeatures['number'])">
                  <el-input type="textarea" v-model="docData.number" :disabled="fieldDisabled(propertyFeatures['number'])" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
                </el-form-item>
              </p>
            </td>
          </tr>
          <tr>
            <td>
              时间
            </td>
            <td colspan="2" class="color_DBE4EF">
              <el-form-item prop="time" :rules="fieldRules('time',propertyFeatures['time'])">
                <el-input type="textarea" v-model="docData.time" :disabled="fieldDisabled(propertyFeatures['time'])" :maxLength='maxLength' placeholder="\" :autosize="{ minRows: 1, maxRows: 2}"></el-input>
              </el-form-item>
            </td>
            <td>
              地址
            </td>
            <td colspan="3" class="color_DBE4EF">
              <el-form-item prop="adress" :rules="fieldRules('adress',propertyFeatures['adress'])">
                <el-input type="textarea" v-model="docData.adress" :disabled="fieldDisabled(propertyFeatures['adress'])" :maxLength='maxLength' placeholder="\" :autosize="{ minRows: 1, maxRows: 2}"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td :rowspan="docData.deliveryCertificatelist.length+2">路产损失</td>
            <td>项目名称</td>
            <td>单位</td>
            <td>数量</td>
            <td>补偿标准</td>
            <td>小计(元)</td>
            <td>备注</td>
          </tr>

          <tr @click="handleAdd" v-for="(item,index) in docData.deliveryCertificatelist" :key="index">
            <td>{{item.docName ? item.docName : ''}}</td>
            <td>{{item.unit ? item.unit : ''}}</td>
            <td>{{item.amount ? item.amount : ''}}</td>
            <td>{{item.stander ? item.stander : ''}}</td>
            <td>{{item.total ? item.total : ''}}</td>
            <td>{{item.notes ? item.notes: ''}}</td>
          </tr>
          <tr>
            <td>合计</td>
            <td></td>
            <td></td>
            <td></td>
            <td>￥{{docData.total}}</td>
            <td></td>
          </tr>
          <tr>
            <td>备注</td>
            <td colspan="6" class="color_DBE4EF remark">
              <el-form-item prop="docNote" :rules="fieldRules('adress',propertyFeatures['docNote'])">
                <el-input type='textarea' v-model="docData.docNote"  :disabled="fieldDisabled(propertyFeatures['docNote'])" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <!-- <el-form-item prop="docLength" style="visibility:hidden">
            <el-input v-model="docData.docLength"></el-input>
          </el-form-item> -->
        </table>
        <p>
          当事人（当事人代理人）：<el-form-item style="width:200px" prop="personName" :rules="fieldRules('personName',propertyFeatures['personName'])">
            <el-input type="textarea" v-model="docData.personName" :disabled="fieldDisabled(propertyFeatures['personName'])" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength"></el-input>
          </el-form-item>
        </p>
        <p>
          执法人员： <el-form-item style="width:200px" prop="staff1" :rules="fieldRules('staff1',propertyFeatures['staff1'])">
            <el-input type="textarea" v-model="docData.staff1" :disabled="fieldDisabled(propertyFeatures['staff1'])" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength"></el-input>
          </el-form-item>
          执法证号： <el-form-item style="width:200px" prop="certificateId1" :rules="fieldRules('certificateId1',propertyFeatures['certificateId1'])">
            <el-input type="textarea" v-model="docData.certificateId1" :disabled="fieldDisabled(propertyFeatures['certificateId1'])" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength"></el-input>
          </el-form-item>
        </p>
        <p>
          执法人员： <el-form-item style="width:200px" prop="staff2" :rules="fieldRules('staff2',propertyFeatures['staff2'])">
            <el-input type="textarea" v-model="docData.staff2" :disabled="fieldDisabled(propertyFeatures['staff2'])" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength"></el-input>
          </el-form-item>
          执法证号： <el-form-item style="width:200px" prop="certificateId2" :rules="fieldRules('certificateId2',propertyFeatures['certificateId2'])">
            <el-input type="textarea" v-model="docData.certificateId2" :disabled="fieldDisabled(propertyFeatures['certificateId2'])" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength"></el-input>
          </el-form-item>
        </p>
        <div class="pdf_seal">
          <span>交通运输执法部门(印章)</span>
          <br />
          <el-form-item prop="makeDate" class="pdf_datapick" :rules="fieldRules('makeDate',propertyFeatures['makeDate'])">
            <el-date-picker class="big_error" v-model="docData.makeDate"  type="date" format="yyyy年MM月dd日" placeholder="    年  月  日" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
        </div>
        <div class="notice clear">
          <span>(本文书一式两份：一份存根，一份交当事人或其代理人。)</span>
        </div>
      </el-form>
    </div>

    <!-- 添加弹出框 -->
    <el-dialog title="编辑路产损失详情" :visible.sync="addVisible" append-to-body width="75%" v-loading="addLoading" :before-close="handleClose">
      <div>
        <div class="fullscreen">
          <el-form ref="addDocFormRef">
            <el-table :data="tableDatas" stripe border style="width: 100%">
              <el-table-column label="项目名称" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.docName"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="单位" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.unit"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="amount" label="数量" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.amount"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="补偿标准" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.stander"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="total" label="小计（元）" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.total" type="number"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="notes" label="备注" align="center" width="210px">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.notes"></el-input>
                </template>
              </el-table-column>
            </el-table>
            <el-button icon="el-icon-circle-plus-outline" @click="addTableData" circle type="info" style="margin-left: 50%;margin-top: 10px"></el-button>
          </el-form>
        </div>
        <div style="margin-left: 45%;margin-top: 10px">
          <el-button size="medium" type="primary" @click="submitForm('addDocFormRef')">确 定</el-button>
          <el-button size="medium" @click="addVisible=false">取 消</el-button>
        </div>
      </div>
    </el-dialog>
    <casePageFloatBtns :formOrDocData="formOrDocData" @saveData="saveData"></casePageFloatBtns>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
import { validatePhone, validateIDNumber } from "@/common/js/validator";
import {
  findCaseAllBindPropertyApi,
} from "@/api/caseHandle";
import iLocalStroage from "@/common/js/localStroage";
export default {
  components: {
    casePageFloatBtns,
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(['caseId']) },
  data() {
    //验证是否填写送达文书
    var validateDocLength = (rule, value, callback) => {
      if (this.docData.deliveryCertificatelist.length == 0) {
        return callback(new Error("至少填写一个送达文书"));
      }
      callback();
    };
    return {
      propertyFeatures: '', //字段属性配置
      docData: {
        caseName: "",
        caseNumber: "",
        servedOrg: iLocalStroage.gets("userInfo").organName,
        server: "",
        collector: "",
        docNote: '',
        deliveryCertificatelist: [{}], //送达文书列表
        docLength: 0, //送达文书列表长度
        makeDate: '',
        staff1: '',
        certificateId1: '',
        staff2: '',
        certificateId2: '',
        docNote: '',
        personName: '',
        adress: '',
        time: '',
        vehicleType: '',
        carLocation: '',
        partyManager: '',
        partyName: '',
        partyAddress: '',
        party: '',
        number: '',
      },
      handleType: 0, //0  暂存     1 提交
      caseDocDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: '', //案件id--从流程进入删掉，先写死测试用
        caseDoctypeId: 'ce523795a2165d15a1c3d6cf29b2b18b', //表单类型IDer
        //表单数据
        docData: "",
        status: ""
      },
      name: '',
      rules: {
        servedOrg: [
          { required: true, message: '送达单位请输入', trigger: 'blur' },
        ],
        collector: [
          { message: '代收人请输入', trigger: 'blur' },
        ],
        server: [
          { required: true, message: '受送达人请输入', trigger: 'blur' },
        ],
        docLength: [
          { validator: validateDocLength, trigger: "blur" }
        ],
      },
      nameLength: 23,
      adressLength: 23,
      maxLengthOverLine: 122,
      maxLength: 23,
      formOrDocData: {
        showBtn: [false, true, true, false, false, false, false, false, false], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节
        pageDomId: 'deliverCertificate-print',
      },
      addVisible: false,
      addLoading: false,
      tableDatas: [],
      isPdf: '',
      addDocFormRef: {
        deliveryMaster: ''
      },
      staffData: [],
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
      console.log(data);
      this.com_getDocDataByCaseIdAndDocId(data);
    },
    // 打印
    print() {
      console.log('打印!');
    },
    // 多行编辑
    overFlowEdit() {
      this.$refs.overflowInputRef.showModal(0, '', this.maxLengthOverLine);
    },
    //提交
    submitData(handleType) {
      // debugger
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      this.$router.push({
        name: this.$route.params.url
      });
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
    addTableData() {
      console.log(this.tableDatas)
      let length = this.tableDatas.length;
      if (length == 0) {
        this.tableDatas.push({});
      } else {
        this.tableDatas.push({});
      }
    },
    handleAdd(row) {
      // this.tableDatas = JSON.parse(JSON.stringify(this.docData.tableData));
      this.addVisible = true;
      if (this.tableDatas.length == 0) {
        this.tableDatas.push({});
      }
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    submitForm(formName) {
      console.log('数组11', this.tableDatas)
      let canAdd = true;
      for (let i = 0; i < this.tableDatas.length; i++) {
        if (!this.tableDatas[i].docName || !this.tableDatas[i].amount || !this.tableDatas[i].unit || !this.tableDatas[i].stander || !this.tableDatas[i].total) {
          if (!this.tableDatas[i].docName) {
            this.$message({
              message: '项目名称不能为空！',
              type: 'warning'
            });
          } else
            if (!this.tableDatas[i].amount) {
              this.$message({
                message: '数量不能为空！',
                type: 'warning'
              });
            } else
              if (!this.tableDatas[i].unit) {
                this.$message({
                  message: '单位不能为空！',
                  type: 'warning'
                });
              } else
                if (!this.tableDatas[i].stander) {
                  this.$message({
                    message: '补偿标准不能为空！',
                    type: 'warning'
                  });
                } else
                  if (!this.tableDatas[i].total) {
                    this.$message({
                      message: '小计不能为空！',
                      type: 'warning'
                    });
                  }
          // this.$message({
          //   message: '数据至少有一项不为空！',
          //   type: 'warning'
          // });
          canAdd = false;
          break;
        }
      }

      if (canAdd) {
        this.docData.deliveryCertificatelist = this.tableDatas;
        this.autoTotal();
        this.addVisible = false;
      }


      console.log('数组', this.tableDatas)
    },
    getDataAfter() {
      console.log(this.docData.deliveryCertificatelist);
      if (!this.docData.deliveryCertificatelist.length) {
        this.docData.deliveryCertificatelist = [{ docName: '', unit: '', amount: '', notes: '', total: '' }]
      }
    },
    //选择执法人员
    chooseStaff(row) {
      console.log("this", row);
      this.$refs.chooseStaffDiaRef.showModel(row);
    },
    setDeliveryMaster(userlist) {
      console.log('选择的执法人员', userlist);
      // row.deliveryMaster = userlist.join(',');
    },
    //获取执法人员
    getLawOfficer() {
      let data = {
        id: this.caseId
      };
      this.$store.dispatch("getCaseBasicInfo", data).then(
        res => {
          console.log('获取案件信息', res);
          let staff = res.data.staff.split(',');
          let certificateId = res.data.certificateId.split(',');
          staff.forEach((item, index) => {
            this.staffData.push({ name: item, certificateId: certificateId[index] })
          })
        },
        err => {
          console.log(err);
        }
      );
    },
    // 合计
    autoTotal() {
      console.log('tableDatas',this.tableDatas)
      this.docData.total=0
      this.tableDatas.forEach(element => {
        this.docData.total+=Number(element.total)
      });
    }
  },

  mounted() {
    this.getDocDataByCaseIdAndDocId();
    this.isOverStatus();
    this.getDataAfter();
  },
  created() {
    this.getLawOfficer();
  }
}
</script>
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss">
/* @import "@/assets/css/caseHandle/caseDocModle.scss"; */
</style>
<style  scoped>
.print_box .print_info tr td {
  white-space: inherit;
}
/* .color_DBE4EF
  /deep/
  .el-form-item__content
  /deep/
  .el-input--prefix
  /deep/
  .el-input__inner {
  padding-left: 0px;
  width: 75%;
} */
</style>
