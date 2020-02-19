<template>
  <div class="box">
    <el-form ref="caseLinkDataForm">
      <el-input ref="id" type="hidden"></el-input>
    </el-form>
    <el-form ref="docForm" :model="formData" label-width="105px">

      <!-- <div class="header-case">
        <div class="header_left">
          <div class="triangle"></div>
          <div class="header_left_text">
            返回
          </div>
        </div>
      </div> -->
      <div class="content_box">
        <div class="content">
          <div class="content_title">
            当事人权利
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
                <el-form-item prop="illegalFact" label="违法事实">
                  <el-input type="textarea" ref="illegalFact" clearable class="height106" v-model="formData.illegalFact" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="违法条款">
                  <el-input ref="illegalLaw" clearable class="w-120" v-model="formData.illegalLaw" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="处罚条款">
                  <el-input ref="punishLaw" clearable class="w-120" v-model="formData.punishLaw" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="tempPunishAmount" label="拟处罚决定">
                  <el-input ref="tempPunishAmount" :disabled="true" clearable class="w-120" v-model="formData.tempPunishAmount" size="small"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="border_blue"></div>
          <div class="content_form bottom_form">
            <div class="row">
              <div class="col">
                <el-form-item label="执行方式">
                  <el-row>
                    <el-col :span="4">
                      <el-checkbox label="是否重大案件" v-model="formData.isImportant"></el-checkbox>
                    </el-col>
                  </el-row>
                </el-form-item>
              </div>
              <div class="col">
                <el-col :span="20">
                  <div align="right">
                    <el-button type="primary" size="small">上传记录</el-button>
                    <el-button type="success" size="small">线上记录</el-button>
                  </div>
                </el-col>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content_box">
        <div class="content">
          <el-row :gutter="20">
            <el-col :span="16">
              <div class="second_title">
                执法文书
              </div>
            </el-col>
          </el-row>
          <div class="table_form">
            <el-table :data="docTableDatas" stripe border style="width: 100%">
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
                    <!-- 已完成 -->
                    <i  class="iconfont law-eye" @click="viewDocPdf(scope.row)"></i>
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
      </div>
      <div class="content_box">
        <div class="content">
          <el-row :gutter="20">
            <el-col :span="16">
              <div class="second_title">
                当事人提交的证据材料
              </div>
            </el-col>
            <el-col :span="8">
              <div class="second_title_btns">
                <el-button type="primary" size="small">上传附件</el-button>
              </div>
            </el-col>
          </el-row>
          <div class="table_form">
            <el-table :data="evidenceTableDatas" stripe border style="width: 100%" height="100%">
              <el-table-column prop="index" label="序号" align="center">
              </el-table-column>
              <el-table-column prop="name" label="证据名称" align="center">
              </el-table-column>
              <el-table-column prop="status" label="时间" align="center">
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <i type="primary" class="el-icon-view cell-icon" @click="evidenceOption(scope)"></i>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>

        <!-- 悬浮按钮 -->
        <div class="float-btns ">

          <el-button type="primary" @click="continueHandle">
           <svg t="1577515608465" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2285" width="24" height="24">
              <path d="M79.398558 436.464938c-25.231035 12.766337-56.032441 2.671394-68.800584-22.557835-12.775368-25.222004-2.682231-56.025216 22.548804-68.798778 244.424411-123.749296 539.711873-85.083624 744.047314 97.423694 33.059177-37.018403 66.118353-74.034999 99.179336-111.042564 26.072732-29.199292 74.302319-15.865804 81.689744 22.574091 20.740782 107.953934 41.486982 215.915094 62.229569 323.867222 5.884653 30.620785-18.981527 58.454577-50.071928 56.06134-109.610235-8.480185-219.211438-16.95134-328.812642-25.422494-39.021496-3.010963-57.692354-49.437946-31.610591-78.633625 33.060983-37.007565 66.116547-74.025968 99.175724-111.03534-172.88741-154.431492-422.746726-187.152906-629.574746-82.435711z" fill="#FFFFFF" p-id="2286"></path>
            </svg><br>
            下一<br>环节</el-button>
          <el-button type="primary" @click="submitCaseDoc(1)">
            <i class="iconfont law-save"></i>
            <br>
            保存</el-button>
          <el-button type="success" @click="submitCaseDoc(0)">
            <i class="iconfont law-save"></i>
            <br>
            暂存
          </el-button>
        </div>
      </div>
    </el-form>
    <checkDocFinish ref="checkDocFinishRef"></checkDocFinish>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/js/mixins";
import { mapGetters } from "vuex";
import checkDocFinish from '../../components/checkDocFinish'

export default {
  components: {
    checkDocFinish
  },
  data() {
    return {
      formData: {
        caseNumber:"",
        caseName:"",
        illegalFact:"",
        illegalLaw:"",
        punishLaw:"",
        tempPunishAmount:"",
        checkList: "",
        isImportant: ""
      },
      //提交方式
      handleType: 0, //0  暂存     1 提交
      caseLinkDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: '', //案件id
        caseLinktypeId: "2c9029ac6c26fd72016c27247b290003", //表单类型IDer
        //表单数据
        formData: "",
        status: ""
      },
      docTableDatas: [
        // {
        //   index: '1',
        //   name: '听证通知书',
        //   status: '-',
        //   option: '1',
        //   url: 'hearingNoticePdf',
        // }, {
        //   index: '2',
        //   name: '听证笔录',
        //   status: '完成',
        //   option: '2',
        //   url: 'hearingRecordePdf',

        // }, {
        //   index: '3',
        //   name: '陈述申辩书',
        //   status: '未完成',
        //   option: '3',
        // }
      ],
      evidenceTableDatas: [],
      rules: {
        caseNumber: [
          { required: true, message: '案号必须填写', trigger: 'blur' }
        ],
        // caseName: [
        //   { required: true, message: '案由必须填写', trigger: 'blur' }
        // ],
      },
    }
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(['caseId']) },
  inject: ['reload'],
  methods: {
    //加载表单信息
    setFormData() {
      this.caseLinkDataForm.caseBasicinfoId = this.caseId;
      this.com_getFormDataByCaseIdAndFormId(this.caseLinkDataForm.caseBasicinfoId, this.caseLinkDataForm.caseLinktypeId, 'form');
    },
    submitCaseDoc(handleType) {
      //参数  提交类型 、formRef、有无下一环节按
      this.com_submitCaseForm(handleType, 'docForm', true);
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
    },
    // 证据材料- 操作
    evidenceOption(data) {

    },
    //查看文书
    viewDoc(row) {
      this.com_viewDoc(row);
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
      let data={
        linkTypeId:'2c9029ac6c26fd72016c27247b290003'
      }
      this.com_getDocListByCaseIdAndFormId(data)
    },
    //删除
    delDocDataByDocId(data) {
      this.$store.dispatch("delDocDataByDocId", data).then(
        res => {
          console.log('删除', res)

          // this.docTableDatas = res.data;
          // console.log('文书列表', this.docTableDatas)
        },
        err => {
          console.log(err);
        }
      );
    },
  },
  mounted() {
    // this.setFormData();
  },
  created() {
    this.setFormData();
    //通过案件id和表单类型Id查询已绑定文书
    this.getDocListByCaseIdAndFormId();
  }
}
</script>

<style lang="less" scoped>
@import "../../../../css/documentForm.less";
</style>
