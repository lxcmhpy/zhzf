<template>
  <div class="box">
    <el-form ref="caseDocForm" :model="formData" :rules="rules" label-width="105px">
      <div class="content_box">
        <div class="content">
          <div class="content_title">
            调查类文书
          </div>
          <div class="border_blue"></div>
          <div class="content_form">
            <div class="row">
              <div class="col">
                <el-form-item prop="caseNumber" label="案号" >
                  <el-input ref="caseNumber" clearable class="w-120" v-model="formData.caseNumber" size="small" :disabled="true"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="caseName" label="案由">
                  <el-input ref="caseCauseName" clearable class="w-120" v-model="formData.caseCauseName" size="small" :disabled="true"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row" v-if="isParty">
              <div class="col">
                <el-form-item label="个人">
                  <el-input ref="party" clearable class="w-120" v-model="formData.party" size="small" placeholder="请输入" :disabled="originalData.party ? true : false"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="性别">
                  <el-select placeholder="请选择" v-model="formData.partySex" :disabled="originalData.partySex ? true : false">
                    <el-option value="0" label="男"></el-option>
                    <el-option value="1" label="女"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="row" v-if="isParty">
              <div class="col">
                <el-form-item label="身份证号码" prop="partyIdNo">
                  <el-input clearable class="w-120" v-model="formData.partyIdNo" size="small" placeholder="请输入" :disabled="originalData.partyIdNo ? true : false"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="年龄">
                  <el-input ref="partyAge" clearable class="w-120" type="number" v-model="formData.partyAge" size="small" placeholder="请输入" :disabled="originalData.partyAge ? true : false"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row" v-if="isParty">
              <div class="col">
                <el-form-item label="联系电话" prop="partyTel">
                  <el-input ref="partyTel" clearable class="w-120" v-model="formData.partyTel" size="small" placeholder="请输入" :disabled="originalData.partyTel ? true : false"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="所在单位">
                  <el-input ref="partyUnitPosition" clearable class="w-120" v-model="formData.partyUnitPosition" size="small" placeholder="请输入" :disabled="originalData.partyUnitPosition ? true : false"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row" v-if="isParty">
              <div class="col">
                <el-form-item label="联系地址">
                  <el-input ref="partyAddress" clearable class="w-120" v-model="formData.partyAddress" size="small" placeholder="请输入" :disabled="originalData.partyAddress ? true : false"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="邮编" prop="partyZipCode">
                  <el-input ref="partyZipCode" clearable class="w-120" v-model="formData.partyZipCode" size="small" placeholder="请输入" :disabled="originalData.partyZipCode ? true : false"></el-input>
                </el-form-item>
              </div>
            </div>

            <div class="row" v-if="!isParty">
              <div class="col">
                <el-form-item label="单位">
                  <el-input ref="partyName" clearable class="w-120" v-model="formData.partyName" size="small" placeholder="请输入" :disabled="originalData.partyName ? true : false"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="地址">
                  <el-input ref="partyUnitAddress" clearable class="w-120" v-model="formData.partyUnitAddress" size="small" placeholder="请输入" :disabled="originalData.partyUnitAddress ? true : false"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row" v-if="!isParty">
              <div class="col">
                <el-form-item label="法定代表人">
                  <el-input ref="partyManager" clearable class="w-120" v-model="formData.partyManager" size="small" placeholder="请输入" :disabled="originalData.partyManager ? true : false"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="联系电话">
                  <el-input ref="partyUnitTel" clearable class="w-120" v-model="formData.partyUnitTel" size="small" placeholder="请输入" :disabled="originalData.partyUnitTel ? true : false"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="统一社会信用代码" class="line-height13">
                  <el-input ref="socialCreditCode" clearable class="w-120" v-model="formData.socialCreditCode" size="small" placeholder="请输入" :disabled="originalData.socialCreditCode ? true : false"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="车牌号码">
                  <el-input ref="vehicleShipId" clearable class="w-120" v-model="formData.vehicleShipId" size="small" placeholder="请输入" :disabled="originalData.vehicleShipId ? true : false"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="车辆类型">
                  <el-input ref="vehicleShipType" clearable class="w-120" v-model="formData.vehicleShipType" size="small" placeholder="请输入" :disabled="originalData.vehicleShipType ? true : false"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content_box">
        <div class="content">
          <div class="table_form">
            <el-table :data="docTableDatas" stripe border style="width: 100%">
              <el-table-column type="index" label="序号" align="center" width="50">
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
                    <!-- 已完成 -->
                    <i class="iconfont law-eye" @click="viewDocPdf(scope.row)"></i>
                    <i  class="iconfont law-print"></i>
                  </span>
                  <span v-if="scope.row.status == '0'" class="tableHandelcase">
                    <!-- 未完成 -->
                    <i class="iconfont law-edit" @click="viewDoc(scope.row)"></i>
                    <i class="iconfont law-delete" @click="delDocDataByDocId(scope.row)"></i>
                  </span>
                  <span v-if="scope.row.status === ''" class="tableHandelcase">
                    <!-- 无状态 -->
                    <i class="iconfont law-add" @click="viewDoc(scope.row)"></i>
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!-- 悬浮按钮 -->
        <div class="float-btns btn-height63">
          <el-button type="primary"  @click="continueHandle">
            <svg t="1577515608465" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2285" width="24" height="24">
              <path d="M79.398558 436.464938c-25.231035 12.766337-56.032441 2.671394-68.800584-22.557835-12.775368-25.222004-2.682231-56.025216 22.548804-68.798778 244.424411-123.749296 539.711873-85.083624 744.047314 97.423694 33.059177-37.018403 66.118353-74.034999 99.179336-111.042564 26.072732-29.199292 74.302319-15.865804 81.689744 22.574091 20.740782 107.953934 41.486982 215.915094 62.229569 323.867222 5.884653 30.620785-18.981527 58.454577-50.071928 56.06134-109.610235-8.480185-219.211438-16.95134-328.812642-25.422494-39.021496-3.010963-57.692354-49.437946-31.610591-78.633625 33.060983-37.007565 66.116547-74.025968 99.175724-111.03534-172.88741-154.431492-422.746726-187.152906-629.574746-82.435711z" fill="#FFFFFF" p-id="2286"></path>
            </svg>
            <br>
            下一<br>环节
          </el-button>

          <el-button type="primary" @click="submitCaseDoc(1)">
            <i class="iconfont law-save"></i>
            <br>
            保存
          </el-button>
        </div>
      </div>
    </el-form>
    <checkDocFinish ref="checkDocFinishRef"></checkDocFinish>
    <chooseAskPeopleDia ref="chooseAskPeopleDiaRef"></chooseAskPeopleDia>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import checkDocFinish from '../components/checkDocFinish'
import chooseAskPeopleDia from '@/page/caseHandle/components/chooseAskPeopleDia'

import {validateIDNumber,validatePhone,validateZIP} from '@/common/js/validator'
export default {
  components: {
    checkDocFinish,
    chooseAskPeopleDia
  },
  data() {
    return {
      formData: {
        caseNumber: "",
        caseCauseName:"",
        party:"",
        partySex:"",
        partyIdNo:"",
        partyAge:"",
        partyTel:"",
        partyUnitPosition:"",
        partyAddress:"",
        partyZipCode:"",
        partyName:"",
        partyUnitAddress:"",
        partyManager:"",
        partyUnitTel:"",
        socialCreditCode:"",
        vehicleShipId:"",
        vehicleShipType:"",
      },
      caseLinkDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: '', //案件ID
        caseLinktypeId: "2c90293b6c178b55016c17c93326000f", //表单类型ID
        //表单数据
        formData: "",
        status: ""
      },
      handleType: 0,
      docTableDatas: [],
      rules: {
        partyIdNo:[
          { validator: validateIDNumber, trigger: "blur" }
        ],
        partyTel:[
          { validator: validatePhone, trigger: "blur" }
        ],
        partyZipCode:[
          { validator: validateZIP, trigger: "blur" }
        ],
        closeResult: [
          { required: true, message: '处理结果必须填写', trigger: 'blur' }
        ],
        closeSituation: [
          { required: true, message: '执行情况必须填写', trigger: 'blur' }
        ],
      },
      // nextBtnDisab: true
      isParty:true,  //当事人类型为个人
      originalData:"", 

    }
  },
  computed: { ...mapGetters(['caseId']) },
  mixins: [mixinGetCaseApiList],
  inject: ['reload'],
  methods: {
    //加载表单信息
    setFormData() {
      this.caseLinkDataForm.caseBasicinfoId = this.caseId;
      this.com_getFormDataByCaseIdAndFormId(this.caseLinkDataForm.caseBasicinfoId, this.caseLinkDataForm.caseLinktypeId, 'form');
    },
    //保存表单数据
    submitCaseDoc(handleType) {
      this.com_submitCaseForm(handleType, 'caseDocForm', true);
    },
    //下一环节
    continueHandle() {
      let caseData={
        caseBasicinfoId:this.caseLinkDataForm.caseBasicinfoId,
        caseLinktypeId:this.caseLinkDataForm.caseLinktypeId,
      }
      let canGotoNext = true; //是否进入下一环节
      for(let i=0;i<this.docTableDatas.length;i++){
        if(this.docTableDatas[i].status != 1 || this.docTableDatas[i].status != "1"){
          canGotoNext = false
          break;
        }
      }
      if(canGotoNext){
        this.com_goToNextLinkTu(this.caseId,this.caseLinkDataForm.caseLinktypeId);
      }else{
        this.$refs.checkDocFinishRef.showModal(this.docTableDatas,caseData);
      }


      // this.com_goToNextLinkTu(this.caseLinkDataForm.caseLinktypeId);
    },
    // 进入文书
    enterDoc(row) {
      this.$store.dispatch("deleteTabs", this.$route.name);//关闭当前页签
      console.log('row', row)
      this.$router.push({
        name: row.url,
        params: {
          id: row.id,
          //案件ID
          caseBasicinfoId: this.caseBasicinfoId,
          docId: row.docId,
          url: this.$route.name,
        }
      });
    },
    //查看文书
    viewDoc(row) {
      //为询问笔录时弹出选择框
      if(row.docId=="2c9029ca5b71686d015b71a86ead0032"){
          this.$refs.chooseAskPeopleDiaRef.showModal(row,this.isSaveLink);
      }else{
        this.com_viewDoc(row);
      }

    },
    //预览pdf
    viewDocPdf(row){
      let routerData = {
          hasApprovalBtn:false,
          docId:row.docId,
          approvalOver:false,
          hasBack:true,
        }
        this.$store.dispatch("deleteTabs", this.$route.name);
        this.$router.push({name:'myPDF',params:routerData})
    },
    //通过案件id和表单类型Id查询已绑定文书
    getDocListByCaseIdAndFormId() {
      let data = {
        linkTypeId: "2c90293b6c178b55016c17c93326000f"     //环节ID
      };
      this.com_getDocListByCaseIdAndFormId(data);
    },
  },
  created() {
    this.setFormData();
    //通过案件id和表单类型Id查询已绑定文书
    this.getDocListByCaseIdAndFormId();
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/documentForm.scss";
</style>
