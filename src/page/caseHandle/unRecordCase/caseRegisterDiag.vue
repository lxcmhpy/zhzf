<template>
  <div style="casehome_dialog">
    <el-dialog title="立案登记" :visible.sync="visible" @close="closeDialog" :close-on-click-modal="false" width="40%">
      <div>
        <el-form :model="caseRegisterForm" :rules="rules" ref="caseRegisterForm" class="caseRegisterForm" label-width="100px">
          <div class="item">
            <el-form-item label="业务领域" prop="cateId">
              <el-select v-model="caseRegisterForm.cateId" placeholder="请选择" @change="changeLawCate">
                <el-option v-for="item in lawCateList" :key="item.cateId" :label="item.cateName" :value="item.cateId"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="程序类型" prop="programType">
              <el-radio-group v-model="caseRegisterForm.programType" @change="changeType">
                <el-radio :label="0">一般程序</el-radio>
                <el-radio :label="1">简易程序</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <div class="item" id="illegalActBox">
            <el-form-item label="违法行为" prop="illageAct">
              <el-input v-model="caseRegisterForm.illageAct" @click="chooseIllegalAct">
                <el-button slot="append" @click="chooseIllegalAct"></el-button>
              </el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="案件类型" prop="caseType">
              <el-select v-model="caseRegisterForm.caseType" placeholder="请选择">
                <el-option v-for="(item,index) in caseTypeList" :key="index" :label="item.caseTypeName" :value="item.caseTypeName"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="goToInforCollect">确 定</el-button>
      </span>

      <chooseillegalAct ref="chooseillegalActRef" @setIllegaAct="setIllegaAct"></chooseillegalAct>
    </el-dialog>
  </div>
</template>
<script>
import chooseillegalAct from "@/page/chooseIllegegaDialog.vue";
import iLocalStroage from "@/common/js/localStroage";
import MainContent from "@/components/mainContent";
import Layout from "@/page/lagout/mainLagout"; //Layout 是架构组件，不在后台返回，在文件里单独引入
import {
  queryFlowBycaseTypeApi,
} from "@/api/caseHandle";
import { queryLawCateByOrganIdApi} from "@/api/caseDeploy";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      visible: false,
      caseRegisterForm: {
        cateId: "",
        programType: 0,
        caseType: "",
        illageAct: ""
      },
      illageActId: "", //违法行为id
      rules: {
        cateId: [{ required: true, message: "请选择", trigger: "change" }],
        programType: [{ required: true, message: "请选择", trigger: "change" }],
        caseType: [{ required: true, message: "请选择", trigger: "change" }],
        illageAct: [{ required: true, message: "请选择", trigger: "change" }]
      },
      lawCateList: [], //业务领域列表
      caseTypeList: [] ,//案件类型列表
      staff:'',
      staffId:'',
      organId:iLocalStroage.gets('userInfo').organId,
      certificateId:'',
    };
  },
  inject: ["reload"],
  components: {
    chooseillegalAct
  },
  computed: {
        ...mapGetters(["openTab"])
  },
  methods: {
    showModal(data, caseForm) {
      this.visible = true;
      // this.getEnforceLawType();
      this.illageActId = data && data.id || '';
      let _this = this;
      let data1={
        organId:this.organId
      };
      // this.$store.dispatch("getEnforceLawType", "1").then(
        queryLawCateByOrganIdApi(data1).then(
        res => {
          _this.lawCateList = res.data;
          if(caseForm){
             _this.lawCateList.forEach(element => {
            // console.log('循环', caseForm.wayType, element.cateName)
            if (element.cateName == caseForm.wayType) {
              _this.caseRegisterForm.cateId = element.cateId;
            }
            if (element.cateName == caseForm.wayType) {
              _this.caseRegisterForm.cateId = element.cateId;
            }
            if (element.cateName == caseForm.wayType) {
              _this.caseRegisterForm.cateId = element.cateId;
            }

          });
          }
          _this.getCaseType();
        },
        err => {
          console.log(err);
        }
      );
      // 首页跳转代入
      // debugger
      if(caseForm){
         this.caseRegisterForm.programType = caseForm.programType;
      }

      this.caseRegisterForm.illageAct = data ? data.strContent : null;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    changeType() {
      this.caseRegisterForm.caseType = "";
      this.getCaseType();
    },
    //选择违法行为弹窗
    chooseIllegalAct() {
      if (this.caseRegisterForm.cateId) {
        let cateName = "";
        let _this = this
        this.lawCateList.forEach(item => {
          if (item.cateId == _this.caseRegisterForm.cateId) {
            cateName = item.cateName;
            return;
          }
        });
        let lawCate = {
          cateId: this.caseRegisterForm.cateId,
          cateName: cateName,
          hyTypeId: '',
          resourse:'establish'
        };
        this.$refs.chooseillegalActRef.showModal(lawCate);
      } else {
        this.$messageOne.info({showClose: true, message: '请选择业务领域'})
      }
    },
    //获取业务领域
    getEnforceLawType() {
      let _this = this
      this.$store.dispatch("getEnforceLawType", "1").then(
        res => {
          _this.lawCateList = res.data;
          console.log('列表121', _this.lawCateList)
        },
        err => {
          console.log(err);
        }
      );
    },
    //获取案件类型
    getCaseType() {
      this.caseTypeList = [];
      let data = {
        programType: this.caseRegisterForm.programType,
        cateId: this.caseRegisterForm.cateId,
        organId: this.organId
      };
      let _this = this
      this.$store.dispatch("getCaseType", data).then(
        res => {
          console.log("案件类型", res);
          _this.caseTypeList = res.data;
        },
        err => {
          console.log(err);
        }
      );
    },
    //选择门类
    changeLawCate(val) {
      this.caseRegisterForm.illageAct = "";
      this.getCaseType();
    },
    //设置违法行为
    setIllegaAct(val) {
      this.caseRegisterForm.illageAct = val.strContent;
      this.illageActId = val.id;
    },
    goToInforCollect() {
      let _this = this
      this.$refs["caseRegisterForm"].validate(valid => {
        if (valid) {
          let caseTypeId = "";
          _this.caseTypeList.forEach(item => {
            if (item.caseTypeName == _this.caseRegisterForm.caseType) {
              caseTypeId = item.caseTypeId;
            }
          })
          let cateName = ''; //业务领域name
          _this.lawCateList.forEach(item => {
            if (item.cateId == _this.caseRegisterForm.cateId) {
              cateName = item.cateName;
              return;
            }
          });
          let someCaseInfo = {
            illageAct: _this.caseRegisterForm.illageAct,
            illageActId: _this.illageActId,
            programType:
              _this.caseRegisterForm.programType == "0"
                ? "一般程序"
                : "简易程序",
            caseType: _this.caseRegisterForm.caseType,
            caseTypeId: caseTypeId,
            cateId: _this.caseRegisterForm.cateId,
            cateName: cateName
          };
          iLocalStroage.sets("someCaseInfo", someCaseInfo);
          iLocalStroage.removeItem("stageCaseId");
          this.findInforCollectPageName(caseTypeId);
          // _this.$router.push({
          //   name: 'case_handle_inforCollect',
          // });
        }
      });
    },
    //根据案件类型判断进入哪个信息采集页
    findInforCollectPageName(id){
      queryFlowBycaseTypeApi(id).then(res=>{
          console.log('res',res);
          this.setLawPersonCurrentP(res.data.basicInfoPage);
      }).catch(err=>{console.log(err)})
    },
    //暂存案件 获取案件id和临时案号
    getCaseInfor(inforName){
      let driverOrAgentInfoList= [
        {
          //驾驶人或代理人
          relationWithParty: "",
          relationWithCase: "",
          name: "",
          zhengjianType: "",
          zhengjianNumber: "",
          sex: "",
          age: "",
          tel: "",
          adress: "",
          adressCode: "",
          company: "",
          position: "",
          zigeNumber: ""
        }
      ];
      let otherInfo =  {isBigTransfer: '否'};
      let someCaseInfo = iLocalStroage.gets("someCaseInfo");
      let inforForm ={
        acceptTime: new Date().format('yyyy-MM-dd HH:mm'), //受案时间
        // acceptTime: '', //受案时间
        partyType: 1, //当事人类型
        partyIdType: "0", //证件类型
        organId: iLocalStroage.gets("userInfo").organId,
        otherInfo:JSON.stringify(otherInfo),
        agentPartyEcertId:'',
        state:0,
        caseStatus:'未立案',
        caseCauseName :someCaseInfo.illageAct,
        caseCauseNameCopy :someCaseInfo.illageAct,
        caseCauseId : someCaseInfo.illageActId,
        programType : someCaseInfo.programType,
        caseType : someCaseInfo.caseType,
        caseTypeId : someCaseInfo.caseTypeId,
        zfmlId : someCaseInfo.cateId,
        zfml : someCaseInfo.cateName,
        staff:this.staff,
        staffId:this.staffId,
        certificateId:this.certificateId,
        agentPartyEcertId :JSON.stringify(driverOrAgentInfoList),
      };
      console.log('inforForm',inforForm)
      this.$store
        .dispatch("saveOrUpdateCaseBasicInfo",inforForm)
        .then(res => {
          console.log('哈哈哈哈');
          let setCaseNumber = res.data.caseNumber!='' ? res.data.caseNumber : res.data.tempNo;
          this.$store.commit("setCaseNumber", setCaseNumber);
          this.$store.commit("setCaseId", res.data.id);
          iLocalStroage.set("stageCaseId", res.data.id);
          this.$store.commit("setInforCollectionType", inforName);
          //防止出现多个信息采集tab
          let newOpenTab = this.openTab.filter(item => {return item.isCase == false })
          this.$store.commit("reset_ALLTABS", newOpenTab);
          console.log('newOpenTab',newOpenTab)
          this.$router.push({ 
            name: inforName,
          });
        })
        .catch(err=>{console.log(err)})
    },
    setLawPersonCurrentP(inforName) {
      let _this = this
      this.$store
        .dispatch("findLawOfficerList", iLocalStroage.gets("userInfo").organId)
        .then(
          res => {
            console.log('执法人员列表', res)
            _this.userList = res.data;
            // let currentUserData = {};
            // _this.lawPersonListId = [];
            // _this.alreadyChooseLawPerson = [];
            let thisUserIsLaw = false;
            res.data.forEach(item => {
              if (
                item.userId == iLocalStroage.gets("userInfo").id
              ) {
                thisUserIsLaw = true;
                this.staff = item.lawOfficerName;
                this.staffId = item.id;
                this.certificateId = item.lawOfficerCards.split(",")[0];
                this.getCaseInfor(inforName);
              }
            });
            if(!thisUserIsLaw) this.$message('当前用户不是执法人员！')
          },
          err => {
            console.log(err);
          }
        );
    },
  },
  mounted() { }
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/index.scss">
/* @import "@/assets/css/caseHandle/index.scss"; */
</style>
