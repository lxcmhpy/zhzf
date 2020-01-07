<template>
  <div class="box">
    <el-form ref="caseDocForm" :model="formData" label-width="105px">
      <div class="content_box">
        <div class="content">
          <div class="content_title">
            调查类文书
          </div>
          <div class="border_blue"></div>

          <div class="content_form">
            <div class="row">
              <div class="col">
                <el-form-item prop="caseNumber" label="案号">
                  <el-input ref="caseNumber" clearable class="w-120" v-model="formData.caseNumber" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="caseName" label="案由">
                  <el-input ref="caseCauseName" clearable class="w-120" v-model="formData.caseCauseName" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <el-form-item label="单位">
                  <el-input ref="partyName" clearable class="w-120" v-model="formData.partyName" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="地址">
                  <el-input ref="partyUnitAddress" clearable class="w-120" v-model="formData.partyUnitAddress" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="法定代表人">
                  <el-input ref="partyManager" clearable class="w-120" v-model="formData.partyManager" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="职务">
                  <el-input ref="partyManagerPositions" clearable class="w-120" v-model="formData.partyManagerPositions" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="统一社会信用代码" class="line-height13">
                  <el-input ref="socialCreditCode" clearable class="w-120" v-model="formData.socialCreditCode" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="车牌号码">
                  <el-input ref="vehicleShipId" clearable class="w-120" v-model="formData.vehicleShipId" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="车辆类型">
                  <el-input ref="vehicleShipType" clearable class="w-120" v-model="formData.vehicleShipType" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>

        </div>

      </div>
      <div class="content_box">
        <div class="content">
          <div class="table_form">
            <el-table :data="tableDatas" stripe border style="width: 100%" height="100%">
              <el-table-column prop="id" label="序号" align="center">
              </el-table-column>
              <el-table-column prop="name" label="材料名称" align="center">
              </el-table-column>
              <el-table-column prop="status" label="状态" align="center">
                <template slot-scope="scope">
                  <div>{{scope.row.status === 0?'暂存':scope.row.status === 1?'完成':''}}</div>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <!-- {{scope.row.option}} -->
                  <span v-if="scope.row.status == ''">
                    <i type="primary" class="el-icon-circle-plus cell-icon" @click="enterDoc(scope.row)"></i>
                    <i type="primary" class="el-icon-upload2 cell-icon"></i>
                    <i type="primary" class="el-icon-delete-solid cell-icon"></i>
                  </span>
                  <span v-if="scope.row.status == 1">
                    <i type="primary" class="el-icon-view cell-icon" @click="viewDoc(scope.row)"></i>
                    <i type="primary" class="el-icon-printer cell-icon"></i>
                  </span>
                  <span v-if="scope.row.status == '暂存'">
                    <i type="primary" class="el-icon-edit cell-icon"></i>
                    <i type="primary" class="el-icon-upload2 cell-icon"></i>
                    <i type="primary" class="el-icon-delete-solid cell-icon"></i>
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!-- 悬浮按钮 -->
        <div class="float-btns btn-height63">
          <el-button type="primary" :disabled="nextBtnDisab" @click="continueHandle">
            <svg t="1577515608465" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2285" width="24" height="24">
              <path d="M79.398558 436.464938c-25.231035 12.766337-56.032441 2.671394-68.800584-22.557835-12.775368-25.222004-2.682231-56.025216 22.548804-68.798778 244.424411-123.749296 539.711873-85.083624 744.047314 97.423694 33.059177-37.018403 66.118353-74.034999 99.179336-111.042564 26.072732-29.199292 74.302319-15.865804 81.689744 22.574091 20.740782 107.953934 41.486982 215.915094 62.229569 323.867222 5.884653 30.620785-18.981527 58.454577-50.071928 56.06134-109.610235-8.480185-219.211438-16.95134-328.812642-25.422494-39.021496-3.010963-57.692354-49.437946-31.610591-78.633625 33.060983-37.007565 66.116547-74.025968 99.175724-111.03534-172.88741-154.431492-422.746726-187.152906-629.574746-82.435711z" fill="#FFFFFF" p-id="2286"></path>
            </svg>
            <br>
            下一<br>环节
          </el-button>

            <el-button type="primary" @click="submitCaseDoc(1)">
            <svg t="1577515608465" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2285" width="24" height="24">
              <path d="M79.398558 436.464938c-25.231035 12.766337-56.032441 2.671394-68.800584-22.557835-12.775368-25.222004-2.682231-56.025216 22.548804-68.798778 244.424411-123.749296 539.711873-85.083624 744.047314 97.423694 33.059177-37.018403 66.118353-74.034999 99.179336-111.042564 26.072732-29.199292 74.302319-15.865804 81.689744 22.574091 20.740782 107.953934 41.486982 215.915094 62.229569 323.867222 5.884653 30.620785-18.981527 58.454577-50.071928 56.06134-109.610235-8.480185-219.211438-16.95134-328.812642-25.422494-39.021496-3.010963-57.692354-49.437946-31.610591-78.633625 33.060983-37.007565 66.116547-74.025968 99.175724-111.03534-172.88741-154.431492-422.746726-187.152906-629.574746-82.435711z" fill="#FFFFFF" p-id="2286"></path>
            </svg>
            <br>
            保存
          </el-button>
        </div>
      </div>
    </el-form>

  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/js/mixins";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      formData: {
        caseNumber: "",
        caseName: "",
        partyName: "",
        partyUnitAddress: "",
        partyManagerPositions: "",
        partyManager: "",
        party: "",
        caseCauseNameCopy: "",
        illegalBasis: "",
        punishLaw: "",
        punishDecision: "",
        partyAddress: "",
        partyZipCode: "",
        // contactPerson:"",
        socialCreditCode: "",
        vehicleShipId: "",
        vehicleShipType: "",
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
      tableDatas: [],
      rules: {
        caseNumber: [
          { required: true, message: '案号必须填写', trigger: 'blur' }
        ],
        caseName: [
          { required: true, message: '案由必须填写', trigger: 'blur' }
        ],
        partyType: [
          { required: true, message: '当事人类型必须填写', trigger: 'blur' }
        ],
        closeResult: [
          { required: true, message: '处理结果必须填写', trigger: 'blur' }
        ],
        closeSituation: [
          { required: true, message: '执行情况必须填写', trigger: 'blur' }
        ],
      },
      nextBtnDisab:true
    }
  },
  computed:{...mapGetters(['caseId'])},
  mixins:[mixinGetCaseApiList],
  methods: {
    //加载表单信息
    setFormData(){
      this.caseLinkDataForm.caseBasicinfoId = this.caseId;
      this.com_getFormDataByCaseIdAndFormId(this.caseLinkDataForm.caseBasicinfoId,this.caseLinkDataForm.caseLinktypeId,'form');
    },
    //保存表单数据
    submitCaseDoc(handleType){
      this.com_submitCaseForm(handleType,'caseDocForm',true);
    },
    //下一环节
    continueHandle() {
      this.com_goToNextLinkTu(this.caseLinkDataForm.caseLinktypeId);
    },
    // 进入文书
    enterDoc(row) {
      this.$router.push({
         name:row.url,
          params: {
            id: row.id,
          }        
      });
    },
    //查看文书
    viewDoc(row){
      this.$router.push({
         name:row.url,
          params: {
            id: row.id,
          }        
      });
    },
    //通过案件id和表单类型Id查询已绑定文书
    getDocListByCaseIdAndFormId(){
      let data = {
        // caseBasicinfoId: this.$route.params.id,

        casebasicInfoId : "aa0f2161e5c1ae0d2619203eb63eb78d",
        linkTypeId:"2c90293b6c178b55016c17c93326000f"
      };
      this.$store.dispatch("getDocListByCaseIdAndFormId", data).then(
        res => {
          this.tableDatas = res.data;
        },
        err => {
          console.log(err);
        }
      );
    }
  },
  mounted() {
    // this.getCaseBasicInfo();
    
  },
  created(){
    this.setFormData();
    //通过案件id和表单类型Id查询已绑定文书
    this.getDocListByCaseIdAndFormId();
  }
}
</script>

<style lang="less" scoped>
@import "../../../css/documentForm.less";
</style>
