<template>
  <div class="box">
    <el-form ref="caseLinkDataForm">
      <el-input ref="id" type="hidden"></el-input>
    </el-form>
    <el-form ref="forceExecuteForm" :model="formData" :rules="rules" label-width="105px">

      <div class="content_box">
        <div class="content">
          <div class="content_title">
            强制执行
          </div>
          <div class="border_blue"></div>

          <div class="content_form">
            <div class="row">
              <div class="col">
                <el-form-item prop="caseNumber" label="案号">
                  <el-input ref="caseNumber" :disabled="true" clearable class="w-120" v-model="formData.caseNumber" size="small"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="caseName" label="案由">
                  <el-input :disabled="true" clearable class="w-120" v-model="formData.caseName" size="small"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="punishDecision" label="处罚决定">
                  <el-input :disabled="originalData.punishDecision ? true : false" type="textarea" ref="punishDecision" clearable class="w-120" v-model="formData.punishDecision" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <el-form-item prop="punishTerm" label="处罚期限">
                  <el-input :disabled="true" ref="punishTerm" clearable class="w-120" v-model="formData.punishTerm" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <el-form-item label="强制类型">
                  <el-select v-model="formData.forceType" clearable @change="updateMethod">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" >
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="处罚金额">
                  <el-input :disabled="true" ref="tempPunishAmount" clearable class="w-120" v-model.number="formData.tempPunishAmount" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <el-form-item prop="paidAmount" label="已缴纳金额">
                  <el-input ref="paidAmount" clearable class="w-120" v-model.number="formData.paidAmount" size="small"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item prop="waitAmount" label="待缴纳金额">
                  <el-input ref="waitAmount" clearable class="w-120" v-model.number="formData.waitAmount" size="small"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="执行情况">
                  <el-select v-model="formData.executeState" clearable>
                    <el-option v-for="item in optionState" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
          <div class="border_blue"></div>
          </div>
        </div>
      </div>
      <div class="content_box">
        <div class="content">
          <div class="table_form">
            <!-- <el-table :data="docTableDatas" stripe border style="width: 100%">
              <el-table-column type="index" label="序号" align="center" width="100px">
              </el-table-column>
              <el-table-column prop="name" label="材料名称" align="center">
              </el-table-column>
              <el-table-column prop="status" label="状态" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.status == '1'">
                    已完成
                  </span>
                  <span v-if="scope.row.status == '0'">
                    未完成
                  </span>
                  <span v-if="scope.row.status == ''">
                    -
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.status == '1'" class="tableHandelcase">
                   
                    <i  class="iconfont law-eye" @click="viewDocPdf(scope.row)"></i>
                    <i  class="iconfont law-print"></i>
                  </span>
                  <span v-if="scope.row.status == '0'" class="tableHandelcase">
                   
                    <i class="iconfont law-edit" @click="viewDoc(scope.row)"></i>
                    <i class="iconfont law-delete" @click="delDocDataByDocId(scope.row)"></i>
                  </span>
                  <span v-if="scope.row.status === ''" class="tableHandelcase">
                   
                    <i class="iconfont law-add" @click="viewDoc(scope.row)"></i>
                  </span>
                </template>
              </el-table-column>
            </el-table> -->
            <el-table :data="docTableDatas" stripe border style="width: 100%" max-height="250" :row-class-name="getRowClass">
              <!-- 折叠 -->
              <el-table-column type="expand" expand-change v-if="allAskDocList.length>0">
                <template>
                  <ul class="moreDocList">
                    <li v-for="(item,index) in allAskDocList" :key="index">
                      <div>{{item.note}}</div>
                      <div>
                        <span v-if="item.status == '1'">已完成</span>
                        <span v-if="item.status == '0'">未完成</span>
                      </div>
                      <div>
                        <!-- 已完成 -->
                        <span v-if="item.status == '1'" class="tableHandelcase" @click="viewDocPdf(item)">查看</span>

                        <span v-if="item.status == '0'" class="tableHandelcase">
                          <!-- 未完成 -->
                          <span @click="viewDoc(item)">编辑</span>
                          <span @click="delDocDataByDocId(item)">清空</span>
                        </span>
                        <!-- 无状态 -->
                        <span v-if="item.status === ''" class="tableHandelcase" @click="viewDoc(item)">添加</span>
                      </div>
                    </li>
                  </ul>
                </template>
              </el-table-column>

              <el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
              <el-table-column prop="name" label="材料名称" align="center">
                 <template slot-scope="scope">
                  <span style="color:red">*</span>
                  {{scope.row.name}}
                  <span v-if="scope.row.name=='中止（终结、恢复）行政强制执行通知书'">
                    （{{finishDocCount}}/{{allDocCount}}）
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="status" label="状态" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.status == '1'">已完成</span>
                  <span v-if="scope.row.status == '0'">未完成</span>
                  <span v-if="scope.row.status == ''">-</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <span class="tableHandelcase" v-if="scope.row.openRow">
                    <!-- <i class="iconfont law-add" @click="viewDoc(scope.row)"></i> -->
                    <span @click="viewDoc(scope.row)">添加</span>
                  </span>
                  <span v-if="!scope.row.openRow">
                    <!-- 已完成 -->
                    <span v-if="scope.row.status == '1'" class="tableHandelcase" @click="viewDocPdf(scope.row)">查看</span>
                    <!-- 未完成 暂存 -->
                    <span v-if="scope.row.status == '0'" class="tableHandelcase">
                      <span @click="viewDoc(scope.row)">编辑</span>
                      <span @click="delDocDataByDocId(scope.row)">清空</span>
                    </span>
                    <!-- 无状态 -->
                    <span v-if="scope.row.status === ''" class="tableHandelcase" @click="viewDoc(scope.row)">添加</span>
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!-- 悬浮按钮 -->
        <div class="float-btns ">
          <el-button type="primary" @click="continueHandle" v-if="!this.$route.params.isComplete">
            <svg t="1577515608465" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2285" width="24" height="24">
              <path d="M79.398558 436.464938c-25.231035 12.766337-56.032441 2.671394-68.800584-22.557835-12.775368-25.222004-2.682231-56.025216 22.548804-68.798778 244.424411-123.749296 539.711873-85.083624 744.047314 97.423694 33.059177-37.018403 66.118353-74.034999 99.179336-111.042564 26.072732-29.199292 74.302319-15.865804 81.689744 22.574091 20.740782 107.953934 41.486982 215.915094 62.229569 323.867222 5.884653 30.620785-18.981527 58.454577-50.071928 56.06134-109.610235-8.480185-219.211438-16.95134-328.812642-25.422494-39.021496-3.010963-57.692354-49.437946-31.610591-78.633625 33.060983-37.007565 66.116547-74.025968 99.175724-111.03534-172.88741-154.431492-422.746726-187.152906-629.574746-82.435711z" fill="#FFFFFF" p-id="2286"></path>
            </svg>
            <br>
            下一<br>环节
          </el-button>

          <el-button type="primary" @click="submitCaseDoc(1)" v-if="!this.$route.params.isComplete">
            <i class="iconfont law-save"></i>
            <br>
            保存
          </el-button>
          <el-button type="primary" @click="backBtn" v-if="this.$route.params.isComplete">
            <i class="iconfont law-back"></i>
            <br />返回
          </el-button>
        </div>
      </div>
    </el-form>
    <checkDocFinish ref="checkDocFinishRef"></checkDocFinish>
    <chooseHandleTypeDia ref="chooseHandleTypeDiaRef" @getNewData="goAddPdf"></chooseHandleTypeDia>
    <resetDocDia ref="resetDocDiaRef" @getDocListByCaseIdAndFormIdEmit="getDocListByCaseIdAndFormId"></resetDocDia>

  </div>
</template>
<script>
  import { mixinGetCaseApiList } from "@/common/js/mixins";
  import { mapGetters } from "vuex";
  import checkDocFinish from "../../components/checkDocFinish";
  import chooseHandleTypeDia from '@/page/caseHandle/components/chooseHandleTypeDia';
  import resetDocDia from '@/page/caseHandle/components/resetDocDia';
  import iLocalStroage from "@/common/js/localStroage"
  export default {
    components: {
      checkDocFinish,
      chooseHandleTypeDia,
      resetDocDia
    },
    data() {
      var validatePaid = (rule, value, callback) => {
        if(value && typeof(value) != 'number'){
          callback(new Error('必须为数字!'));
        }
        if(value  && (value<0 ||value> Number(this.formData.tempPunishAmount))){
          callback(new Error('不得小于0或大于处罚金额!'));
        }else{
          callback();
        }
      };
      return {
        options : [{
          value: '强制执行',
          label: '强制执行'
        }, {
          value: '代履行',
          label: '代履行'

        }],
        optionState : [{
          value: '未完成',
          label: '未完成'
        }, {
          value: '已完成',
          label: '已完成'

        }],
        formData: {
          caseNumber:"",
          caseName:"",
          punishDecision:"",
          punishTerm:"",
          forceType:"",
          tempPunishAmount: "",
          paidAmount:"",
          waitAmount:"",
          executeState:""
        },
        //提交方式
        handleType: 0, //0  暂存     1 提交
        caseLinkDataForm: {
          id: "", //修改的时候用
          caseBasicinfoId: "", //案件id
          caseLinktypeId: "a36b59bd27ff4b6fe96e1b06390d204h", //表单类型IDer
          //表单数据
          formData: "",
          status: ""
        },
        originalData:"",
        docTableDatas: [],
        rules: {
          paidAmount:[
            { validator: validatePaid, trigger: 'blur'}
          ],
          waitAmount:[
            { validator: validatePaid, trigger: 'blur'}
          ]
        },
        isOnlinePay: false, //是否为电子缴纳
        needDealData:true,
        docTableDatasCopy: [],
        allAskDocList: [] ,//中止（终结、恢复）行政强制执行通知书
        unfinishFlag: '',
        isfinishFlag: true,
        finishDocCount: 0,//完成文书数
        allDocCount: 0,
      };
    },
    computed: {
      ...mapGetters(["caseId"]) ,
    },
    mixins: [mixinGetCaseApiList],
    methods: {
        updateMethod(){
        // if(this.formData.forceType=='强制执行'){
        //   console.log('444');
        //   if(this.docTableDatas[i].name=='行政强制执行决定书【2016】'){
        //     this.docTableDatas[i].isRequired = '0';
        //   }
        // }else{
        //   console.log('333');
        //   if(this.docTableDatas[i].name=='代履行决定书【2016】'){
        //     this.docTableDatas[i].isRequired = '0';
        //   }
        // }
      },

      	  //加载表单信息
      setFormData() {
        this.caseLinkDataForm.caseBasicinfoId = this.caseId;
        this.com_getFormDataByCaseIdAndFormId(
          this.caseLinkDataForm.caseBasicinfoId,
          this.caseLinkDataForm.caseLinktypeId,
          false);
      },

       //保存表单数据
      submitCaseDoc(handleType) {
        console.log(this.formData)
        this.com_submitCaseForm(handleType, "forceExecuteForm", false);
      },

      // 判断文书是否完成
      isComplete() {
        debugger
        this.unfinishFlag = '';
        console.log('强制类型:', this.formData.forceType)
        if (this.formData.forceType==='强制执行') {
          // 强制执行书必做
           debugger
          console.log(this.docTableDatas)
          let flag = true
          this.docTableDatas.forEach(element => {
            if (element.name == '行政强制执行决定书【2016】') {
               debugger
              this.unfinishFlag = '行政强制执行决定书';
              console.log('lement.status,element.status', element.status)
              if (element.status != 1) {
                 debugger
                this.unfinishFlag = '行政强制执行决定书';
                console.log('执行')
                let caseData = {}
                this.$refs.checkDocFinishRef.showModal(this.docTableDatas, caseData, this.unfinishFlag);
                flag = false;
                return false;
              }
            }
            else
              return flag;
            });
             return flag;
        }
      },
      
      isComplete2(){
        debugger
        this.unfinishFlag = '';
        console.log('强制类型:', this.formData.forceType)
        if (this.formData.forceType==='代履行') {
          // 代履行必做
          let flag2 = true;
          console.log(this.docTableDatas)
          this.docTableDatas.forEach(element => {
            if (element.name == '代履行决定书【2016】') {
               debugger
              if (element.status != 1) {
                 debugger
                this.unfinishFlag = '代履行决定书';
                console.log('this.unfinishFlag', this.unfinishFlag)
                let caseData = {}
                this.$refs.checkDocFinishRef.showModal(this.docTableDatas, caseData, this.unfinishFlag);
                flag2 = false;
                return flag2;
              }
              else
                return flag2;
            }
            else
              return flag2;
          });
          return flag2;
        }
      },
      
       //下一环节
      continueHandle() {
        debugger
        console.log('this.unfinishFlag', this.unfinishFlag)
        console.log('行政强制执行决定书', this.isComplete())
        console.log('代履行决定书', this.isComplete2())
        console.log('this.unfinishFlag', this.unfinishFlag)
        let caseData = {
          caseBasicinfoId: this.caseLinkDataForm.caseBasicinfoId,
          caseLinktypeId: this.caseLinkDataForm.caseLinktypeId
        };
        if ((this.isComplete() != false) && (this.isComplete2() != false)) {

          this.com_goToNextLinkTu(this.caseId, this.caseLinkDataForm.caseLinktypeId);
        }
        else {
          // this.$message({ message: '请完成对应文书', type: 'error' });
          console.log(this.unfinishFlag)
          let unfinishFlag = this.unfinishFlag || ""
          this.$refs.checkDocFinishRef.showModal(this.docTableDatas, caseData, unfinishFlag);
        }
      },

      // 进入文书
      enterDoc(row) {
        this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
        console.log("row", row);
        this.$router.push({
          name: row.url,
          params: {
            id: row.id,
            //案件ID
            caseBasicinfoId: this.caseBasicinfoId,
            docId: row.docId,
            url: this.$route.name
          }
        });
      },

      //查看文书
      viewDoc(row) {
        //为'中止（终结、恢复）强制执行'时弹出选择框
        if (row.docId == "2c902908696a1fc501696a754e3b0002") {
          iLocalStroage.removeItem("currentDocDataId");
          this.$refs.chooseHandleTypeDiaRef.showModal(row, this.isSaveLink);
        } else {
          this.com_viewDoc(row);
        }

      },
      //清空文书
      delDocDataByDocId(data){
        console.log("清空文书",data);
        this.$refs.resetDocDiaRef.showModal(data);
      },
      //通过案件id和表单类型Id查询已绑定文书
      getDocListByCaseIdAndFormId() {
        let data = {
          linkTypeId: "a36b59bd27ff4b6fe96e1b06390d204h" //环节ID
        };
        this.com_getDocListByCaseIdAndFormId(data);
      },

       //预览pdf
      viewDocPdf(row) {
        let routerData = {
          hasApprovalBtn: false,
          docId: row.docId,
          approvalOver: false,
          hasBack: true,
          docDataId:row.docDataId
        };
        this.$store.dispatch("deleteTabs", this.$route.name);
        this.$router.push({ name: "myPDF", params: routerData });
      },

      getDataAfter(){
        this.formData.forceType = this.formData.forceType ? this.formData.forceType : '强制执行';
        this.formData.executeState = this.formData.executeState ? this.formData.executeState : '未完成';
      },

       //返回到流程图
      backBtn(){
        this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
        this.$router.go(-1);
      },


       // 添加文书
      goAddPdf() {
        //提交pdf 显示pdf页
        this.caseLinkDataForm.caseBasicinfoId = this.caseId;
        this.approvalOver = true;
        this.com_getFormDataByCaseIdAndFormId(
          this.caseLinkDataForm.caseBasicinfoId,
          this.caseLinkDataForm.caseLinktypeId,
          true
        );
        // this.setMoreDocTableTitle()
      },


      getRowClass: function (row, index) {
        // console.log("row!!!!!!!!!!!!", row);
        if (row.row.openRow) {
          // console.log("显示");
          return "";
        } else {
          return "myhide-expand";
        }
      },


      setMoreDocTableTitle() {
        debugger
        console.log("djhafiufh执行方法")
        this.docTableDatas = [];
        this.allAskDocList = [];
        this.docTableDatas.push({ name: '中止（终结、恢复）行政强制执行通知书', status: '中止', openRow: true, url: "enforceDoc", docId: "2c902908696a1fc501696a754e3b0002" , note: '' });

        this.docTableDatasCopy.forEach(item => {
          console.log('名字啊啊啊', item.name)
          if (item.name != '中止（终结、恢复）行政强制执行通知书') {
            this.docTableDatas.push(item);
          } else {
            if (item.note != '') {
            this.allAskDocList.push(item);

            }
          }
        })
         this.allAskDocList.forEach(element => {
        if (element.name == '中止（终结、恢复）行政强制执行通知书' && element.status=='1') {
          this.finishDocCount += 1;
          }
        });
        this.allDocCount = this.allAskDocList.length
        console.log('this.docTableDatas', this.docTableDatas)
        console.log('this.allAskDocList', this.allAskDocList)
      }
    },

    mounted() {
      // this.getCaseBasicInfo();
    },
    created() {
      //获取表单数据
      this.setFormData();
      //通过案件id和表单类型Id查询已绑定文书
      this.getDocListByCaseIdAndFormId();
    },
    watch:{
      //代缴金额为0时,执行情况为已完成
      'formData.paidAmount'(val){
        console.log(val);
        this.formData.waitAmount = Number(this.formData.tempPunishAmount) - Number(this.formData.paidAmount);

      }
    }
    
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/css/documentForm.scss";
</style>
