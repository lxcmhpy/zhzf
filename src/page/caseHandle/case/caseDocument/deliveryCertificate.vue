<template>
  <div class="print_box" id="caseInvest-print" style="width:790px; margin:0 auto;">
    <div class="print_info" id="deliverCertificate-print">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData" :class="isPdf">
        <div class="doc_topic">送达回证</div>
        <div class="doc_number">案号：{{docData.caseNumber}}</div>
        <!-- <div>案由:<el-form-item prop="caseName" style="width:585px">
            <el-input type="textarea" v-model="docData.caseName" :autosize="{ minRows: 1, maxRows: 3}" :maxLength='maxLength' placeholder="\" disabled style="height:36px;"></el-input>
          </el-form-item>
        </div> -->
        <div class="doc_cause" style="padding-bottom:10px;">
          案由：<span style="margin-top:-8px;border-bottom:1px solid black">{{docData.caseName}}</span>
        </div>
        <table class="print_table" border="1" bordercolor="black" width="100%" cellspacing="0">
          <tr>
            <td>
              送达单位
            </td>
            <td colspan="5" class="color_DBE4EF">
              <el-form-item prop="servedOrg" class="pdf_datapick">
                <el-input type='textarea' v-model="docData.servedOrg" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
              </el-form-item>

            </td>
          </tr>
          <tr>
            <td>
              受送达人
            </td>
            <td colspan="5" class="color_DBE4EF">
              <el-form-item prop="server" class="pdf_datapick">
                <el-input type='textarea' v-model="docData.server" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
              </el-form-item>

            </td>
          </tr>
          <tr>
            <td>
              代收人
            </td>
            <td colspan="5" class="color_DBE4EF">
              <el-form-item prop="collector" class="pdf_datapick">
                <el-input type='textarea' v-model="docData.collector" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
              </el-form-item>

            </td>
          </tr>
          <tr>
              <td width="20%">送达文书<br>名称,文号</td>
              <td width="20%">收件人姓名<br>(盖章)</td>
              <td width="20%">送达地点</td>
              <td width="20%">送达日期</td>
              <td width="10%">送达方式</td>
              <td width="10%">送达人</td>
          </tr>
          <tr v-if="docData.deliveryCertificatelist.length==0"  @click="handleAdd">
              <td></td>
              <td ></td>
              <td></td>
              <td></td>
              <td ></td>
              <td ></td>
          </tr>
            <tr @click="handleAdd" v-for="(item,index) in docData.deliveryCertificatelist" :key="index" >
              <td>{{item.docName ? item.docName : ''}}</td>
              <td>{{item.receiver ? item.receiver : ''}}</td>
              <td>{{item.address ? item.address : ''}}</td>
              <td>{{item.servedDate ? item.servedDate : ''}}</td>
              <td>{{item.servedType ? item.servedType : ''}}</td>
              <td>{{item.deliveryMaster ? item.deliveryMaster.join(',') : ''}}</td>
            </tr>

            <tr>
            <td colspan="6">
              <div class="pdf_seal">
                <br/><br/><br/>
                <span >交通运输执法部门(印章)</span><br>
                <el-form-item prop="makeDate" class="pdf_datapick">
                  <el-date-picker class="big_error" v-model="docData.makeDate" type="date" format="yyyy年MM月dd日" placeholder="    年  月  日" value-format="yyyy-MM-dd">
                  </el-date-picker>
                </el-form-item>
              </div>
            </td>

          </tr>
          <tr>
            <td colspan="6" class="color_DBE4EF remark">
              <el-form-item label='备注:'>
                <el-input type='textarea' v-model="docData.docNote" :autosize="{ minRows: 1, maxRows: 3}" :maxlength="nameLength" placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <el-form-item  prop="docLength" style="visibility:hidden">
          <el-input v-model="docData.docLength"></el-input>
        </el-form-item>
        </table>


      </el-form>
    </div>



     <!-- 添加弹出框 -->
    <el-dialog title="编辑送达详情" :visible.sync="addVisible" append-to-body width="75%" v-loading="addLoading" :before-close="handleClose">
      <div>
        <div  class="fullscreen">
          <el-form ref="addDocFormRef">
            <el-table :data="tableDatas" stripe border style="width: 100%">
              <!-- <el-table-column  prop="evidenceNo" label="序号" align="center">
              </el-table-column> -->

              <el-table-column label="送达文书名称,文号" align="center">
                <template slot-scope="scope">
                  <!-- <el-input v-model="scope.row.docName"></el-input> -->
                  <el-select v-model="scope.row.docName" placeholder="请选择">
                    <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>

              <el-table-column label="收件人姓名(盖章)" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.receiver" :disabled="true"></el-input>
                </template>
              </el-table-column>

              <el-table-column prop="address" label="送达地点" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.address"></el-input>
                </template>
              </el-table-column>

              <el-table-column label="送达日期" align="center" width="200">
                <template slot-scope="scope">
                  <el-date-picker  v-model="scope.row.servedDate" type="datetime" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" :clearable="true">
                  </el-date-picker>
                </template>
              </el-table-column>

              <el-table-column prop="servedType" label="送达方式" align="center">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.servedType" :clearable="true">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>

              <el-table-column prop="deliveryMaster" label="送达人" align="center" width="210px">
                <template slot-scope="scope">
                  <!-- {{scope.row.deliveryMaster}} -->
                  <!-- <el-input v-model="scope.row.deliveryMaster" v-on:click.native="chooseStaff(scope.row)"></el-input> -->
                  <el-select v-model="scope.row.deliveryMaster" multiple placeholder="请选择" style="width:200px">
                    <el-option
                      v-for="item in staffData"
                      :key="item.certificateId"
                      :label="item.name"
                      :value="item.name">
                      <span>{{ item.name }}</span>
                      <span style="margin-left:5px">{{ item.certificateId }}</span>
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>

              <!-- <el-table-column width="52%" >
                <template slot-scope="scope">
                  <el-button size="mini" icon="el-icon-circle-close" circle @click="handleRow(scope.row)"></el-button>
                </template>
              </el-table-column> -->
            </el-table>
            <el-button icon="el-icon-circle-plus-outline" @click="addTableData" circle type="info" style="margin-left: 50%;margin-top: 10px"></el-button>
          </el-form>
        </div>
        <div style="margin-left: 45%;margin-top: 10px">
            <el-button size="medium" type="primary" @click="submitForm('addDocFormRef')">确 定</el-button>
            <el-button size="medium" @click="addVisible=false">取  消</el-button>
        </div>
      </div>
    </el-dialog>
    <casePageFloatBtns :pageDomId="'deliverCertificate-print'" :formOrDocData="formOrDocData" @submitData="submitData" @saveData="saveData" @backHuanjie="submitData"></casePageFloatBtns>

    <chooseStaffDia ref="chooseStaffDiaRef" @setDeliveryMasterEmit="setDeliveryMaster"></chooseStaffDia>
  </div>
</template>
<script>
import chooseStaffDia from "./chooseStaffDia";
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
    chooseStaffDia
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
      docData: {
        caseName: "",
        caseNumber: "",
        servedOrg: iLocalStroage.gets("userInfo").organName,
        server: "",
        collector: "",
        docNote: '',
        deliveryCertificatelist:[], //送达文书列表
        docLength:0, //送达文书列表长度
        makeDate:''
      },
      handleType: 0, //0  暂存     1 提交
      caseDocDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: '', //案件id--从流程进入删掉，先写死测试用
        caseDoctypeId: '2c9029cf6931aa5c01693381ac690018', //表单类型IDer
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
          {  message: '代收人请输入', trigger: 'blur' },
        ],
        server: [
          { required: true, message: '受送达人请输入', trigger: 'blur' },
        ],
        docLength: [
           { validator: validateDocLength,trigger: "blur" }
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
      addDocFormRef:{
        deliveryMaster:''
      },
      options: [{
        value: '直接送达',
        label: '直接送达'
      }, {
        value: '代理送达',
        label: '代理送达'
      }, {
        value: '邮寄送达',
        label: '邮寄送达'
      }, {
        value: '其他方式',
        label: '其他方式'
      }],
      options2: [
        {
        value: '抽样取证凭证',
        label: '抽样取证凭证'
      }, {
        value: '证据登记保存清单',
        label: '证据登记保存清单'
      }, {
        value: '解除证据登记保存决定书',
        label: '解除证据登记保存决定书'
      }, {
        value: '行政强制措施决定书',
        label: '行政强制措施决定书'
      }, {
        value: '延长行政强制措施期限通知书',
        label: '延长行政强制措施期限通知书'
      }, {
        value: '解除行政强制措施决定书',
        label: '解除行政强制措施决定书'
      }, {
        value: '听证通知书',
        label: '听证通知书'
      }, {
        value: '当场行政处罚决定书',
        label: '当场行政处罚决定书'
      }, {
        value: '责令改正违法行为通知书',
        label: '责令改正违法行为通知书'
      }, {
        value: '分期（延期）缴纳罚款通知书',
        label: '分期（延期）缴纳罚款通知书'
      }, {
        value: '违法行为通知书',
        label: '违法行为通知书'
      }, {
        value: '行政处罚决定',
        label: '行政处罚决定'
      }, {
        value: '催告书',
        label: '催告书'
      }, {
        value: '行政强制执行决定书',
        label: '行政强制执行决定书'
      }, {
        value: '代履行决定书',
        label: '代履行决定书'
      }, {
        value: '中止（终结、恢复）行政强制执行通知书',
        label: '中止（终结、恢复）行政强制执行通知书'
      }],
      staffData:[],
    }
  },
  methods: {
  //根据案件ID和文书Id获取数据
    getDocDataByCaseIdAndDocId() {
      // debugger
      this.caseDocDataForm.caseBasicinfoId = this.caseId;
      let data = {
        caseId: this.caseId,
        docId: '2c9029cf6931aa5c01693381ac690018'
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
  // 提交文书表单
    saveData(handleType, docForm) {
      let newdeliveryCertificatelist =JSON.parse(JSON.stringify(this.docData.deliveryCertificatelist));
      console.log('newdeliveryCertificatelist',newdeliveryCertificatelist)
      if(newdeliveryCertificatelist.length >0 && newdeliveryCertificatelist[0].docName){
        newdeliveryCertificatelist.forEach(item=>{
          item.deliveryMaster = item.deliveryMaster.join(',');
        })
      }
      
      let data = {
            caseId: this.caseId, //流程里的案件id
            caseNumber: this.docData.caseNumber,
            caseName: this.docData.caseName,
            servedOrg: this.docData.servedOrg,//送达单位
            // server: this.docData.server,//受送达人
            server: this.docData.server,
            // collector: this.docData.collector,//代收人
            collector: this.docData.collector,
            deliveryCertificatelist:newdeliveryCertificatelist,//送达文书列表
            docNote: this.docData.docNote,//备注
            makeDate:this.docData.makeDate,

      };
      console.log('送达回证',data);
      if (handleType==1) {
         // debugger
        this.$refs['docForm'].validate((valid, noPass) => {
           // debugger
          if (valid) {
            this.$store.dispatch("saveOrUpdateDeliverReceipt", data).then(
              res => {
                console.log("23",res);
                //  debugger
                this.$message({
                  type: "success",
                  message: "提交成功"
                });
                this.$store.dispatch("deleteTabs", this.$route.name);//关闭当前页签
                // this.$router.push('deliverReceiptForm')
                //提交成功后提交pdf到服务器，后打开pdf
                console.log(res.data.id)
                // debugger
                this.printContent(res.data.id);
              },
              err => {
                console.log(err);
              }
            );
          } else {
            //  debugger
            // noPass[Object.keys(v)[0]]
            let a = Object.values(noPass)[0];
            console.log(a);
            this.$message({
              showClose: true,
              message: a[0].message,
              type: 'error',
              offset: 100,
              customClass: 'validateErrorTip'
            });
            return false;
          }

        });
      } else {

        this.$store.dispatch("saveOrUpdateDeliverReceipt",data).then(
          res => {
            console.log("暂存文书", res);
            this.$message({
              type: "success",
              message: "暂存成功"
            });
            // this.reload();
          },
          err => {
            console.log(err);
          }
        );
      }
    },

    //保存文书信息
    // saveData(handleType) {
    //   this.$refs['docForm'].validate(valid => {
    //     if (valid) {
    //       let data = {
    //         caseId: this.caseId, //流程里的案件id
    //         caseNumber: this.docData.caseNumber,
    //         caseName: this.docData.caseName,
    //         servedOrg: this.docData.servedOrg,//送达单位
    //         // server: this.docData.server,//受送达人
    //         server: this.docData.server,
    //         // collector: this.docData.collector,//代收人
    //         collector: this.docData.collector,
    //         deliveryCertificatelist: this.docData.deliveryCertificatelist,//送达文书列表
    //         docNote: this.docData.docNote//备注
    //       };
    //       console.log('添加', data)
    //       let _this = this
    //       debugger
    //       this.$store.dispatch("saveOrUpdateDeliverReceipt", data).then(res => {
    //         if (res.code == 200) {
    //           console.log('添加成功！')
    //           _this.$message({
    //             message: '添加成功！',
    //             type: 'success'
    //           });
    //           _this.$store.dispatch("deleteTabs", _this.$route.name); //关闭当前页签
    //           _this.$store.dispatch("printContent"); //关闭当前页签
    //           _this.$router.push('deliverReceiptForm')
    //         } else {
    //           _this.$message.error('出现异常，添加失败！');
    //         }
    //       });
    //     } else {
    //       console.log('error submit!!');
    //       return false;
    //     }
    //   });

    // },
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
        this.tableDatas.push({'servedType':'直接送达','servedDate':new Date().format('yyyy-MM-dd HH:mm')});
      }else{
        this.tableDatas.push({'servedType':'直接送达', 'servedDate':new Date().format('yyyy-MM-dd HH:mm')});
      }
    },
    handleAdd(row) {
        // this.tableDatas = JSON.parse(JSON.stringify(this.docData.tableData));
        this.addVisible = true;
        if(this.tableDatas.length == 0){
        this.tableDatas.push({'servedType':'直接送达','servedDate':new Date().format('yyyy-MM-dd HH:mm')});
        }
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
    },
    //删除当前添加行的数据
    // handleRow(row) {

    // },
    submitForm(formName){
      console.log('数组11',this.tableDatas)
      let canAdd = true;
      console.log('this.docData.caseNumber',this.docData.caseNumber)
      //是否为青海案件
      let isQHcase = this.docData.caseNumber.includes('青')
      for(let i=0; i<this.tableDatas.length; i++){
        this.tableDatas[i].receiver='';
        if(isQHcase){
          if(!this.tableDatas[i].docName){
              this.$message({
                message: '送达文书名称不能为空！',
                type: 'warning'
              });
            canAdd = false;
            break;
          }
          
        }else{
          if(!this.tableDatas[i].docName || !this.tableDatas[i].address || !this.tableDatas[i].servedDate || !this.tableDatas[i].servedType || !this.tableDatas[i].deliveryMaster){
            if(!this.tableDatas[i].docName){
              this.$message({
                message: '送达文书名称不能为空！',
                type: 'warning'
              });
            }else
            if(!this.tableDatas[i].address){
              this.$message({
                message: '送达地点不能为空！',
                type: 'warning'
              });
            }else
            if(!this.tableDatas[i].servedDate){
              this.$message({
                message: '送达日期不能为空！',
                type: 'warning'
              });
            }else
            if(!this.tableDatas[i].servedType){
              this.$message({
                message: '送达方式不能为空！',
                type: 'warning'
              });
            }else
            if(!this.tableDatas[i].deliveryMaster){
              this.$message({
                message: '送达人不能为空！',
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
          
        }
      console.log('canAdd',canAdd)
        if(canAdd){
          // this.tableDatas.forEach(item=>{
          //   item.deliveryMaster = item.deliveryMaster.join(',');
          // })
          // console.log('this.tableDatas',this.tableDatas)

          this.docData.deliveryCertificatelist = this.tableDatas;
          //  this.docData.deliveryCertificatelist.forEach(item=>{
          //    item.
          //  })
          this.addVisible = false;
        }


      console.log('数组',this.tableDatas)
    },
    getDataAfter() {
      console.log(this.docData.deliveryCertificatelist);
      // if (!this.docData.deliveryCertificatelist.length) {
      //   this.docData.deliveryCertificatelist = [{ docName: '', receiver: '', address: '', servedDate: '', servedType: '', deliveryMaster: '' }]
      // }
    },
    //选择执法人员
    chooseStaff(row){
      console.log("this",row);
      this.$refs.chooseStaffDiaRef.showModel(row);
    },
    setDeliveryMaster(userlist){
      console.log('选择的执法人员', userlist);
      // row.deliveryMaster = userlist.join(',');
    },
    //获取执法人员
    getLawOfficer(){
      let data = {
        id: this.caseId
      };
      this.$store.dispatch("getCaseBasicInfo", data).then(
        res => {
          console.log('获取案件信息', res);
          let staff = res.data.staff.split(',');
          let certificateId = res.data.certificateId.split(',');
          staff.forEach((item,index)=>{
             this.staffData.push({name:item,certificateId:certificateId[index]})
          })
        },
        err => {
          console.log(err);
        }
      );
    }
  },

  mounted() {
    this.getDocDataByCaseIdAndDocId();
    this.getDataAfter();
    // this.getCaseBasicInfo();
    // let organName = iLocalStroage.gets("userInfo").organName;
  },
  created() {
    this.isOverStatus();
    this.getLawOfficer();
  }
}
</script>
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss">
/* @import "@/assets/css/caseHandle/caseDocModle.scss"; */
</style>
<style lang="scss"  >
.print_box .print_info tr td{
  white-space: inherit;

}
#deliverCertificate-print{
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 100%;
  }
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
