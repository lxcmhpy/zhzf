// 信息采集公用代码

import chooseLawPerson from "@/page/caseHandle/unRecordCase/chooseLawPerson";
import punishDiag from "@/page/caseHandle/unRecordCase/punishDiag";
import caseSlideMenu from '@/page/caseHandle/components/caseSlideMenu'
import iLocalStroage from "@/common/js/localStroage";
import {mapGetters} from "vuex";
import {validateIDNumber, validateAge, validateZIP, validatePhone} from '@/common/js/validator'
import {
  getDictListDetailByNameApi, findHistoryBySignApi, findRouteManageByOrganIdApi
} from "@/api/system";
import {findLawOfficerListApi} from "@/api/caseHandle";

export const inforCollectionCommonMixins = {
  data() {
    //选择个人试验证
    var validatePart = (rule, value, callback) => {
      if (this.inforForm.partyType == 1 && !value) {
        return callback(new Error("请输入"));
      }
      callback();
    };
    //选择公司时验证
    var validatePartName = (rule, value, callback) => {
      if (this.inforForm.partyType == 2 && !value) {
        return callback(new Error("请输入"));
      }
      callback();
    };
    //执法人员人数不得少于2个，最多不多与9个
    var validateLawPersonNumber = (rule, value, callback) => {
      if (this.lawPersonListId.length < 2) {
        return callback(new Error('执法人员不得少于2人'));
      } else if (this.lawPersonListId.length > 9) {
        return callback(new Error('执法人员不得多于9人'));
      }
      callback();
    };
    //案件来源后面输入框的验证
    var validatecaseSourceText = (rule, value, callback) => {
      if (this.caseSourceTextDisable == true && !value) {
        return callback(new Error("请输入案件来源描述"));
      }
      callback();
    };
    //验证时间
    var validateTime = (rule, value, callback) => {
      let afsj = this.inforForm.afsj; // 案发时间
      let acceptTime = this.inforForm.acceptTime // 受案时间
      if (Date.parse(afsj) > Date.parse(acceptTime) && this.inforForm.afsj) {
        return callback(new Error("案发时间不得晚于受案时间"));
      }
      callback();
    };
    return {
      moneyTooltip: "",// 自由裁量权金额提示语
      recentCheckStastions: [],//最近五个检测站
      recentCheckWorkers: [],//历史保存过检测人员
      vehicleTypeList: [],//车型
      vehicleAxlesTypeList: [],//轴数
      brandList: [],//品牌
      inforForm: {
        id: "", //案件id 修改时需要
        tempNo: "", //临时案号 修改时需要
        caseSource: "", //案件来源
        caseSourceText: "", //案件来源后的
        afsj: "", //案发时间
        acceptTime: new Date().format('yyyy-MM-dd HH:mm'), //受案时间
        caseCauseId: "", //违法行为id
        caseCauseName: "", //违法行为
        zfmlId: "", //执法门类ID
        zfml: "", //执法门类
        programType: "", //程序类型
        caseType: "", // 案件类型
        partyType: 1, //当事人类型
        party: "", //当事人信息-当事人姓名
        partyIdType: "0", //证件类型
        partyIdNo: "", //当事人信息-身份证件号
        partySex: "",
        partyAge: "",
        partyTel: "",
        provincesAddressArray: [],
        provincesAddress:"",
        partyAddress: "",
        partyZipCode: "",
        partyUnitPosition: "",
        occupation: "",
        partyEcertId: "",
        partyName: "",
        partyUnitTel: "",
        socialCreditCode: "",
        roadTransportLicense: "",
        partyManager: "",
        partyManagerPositions: "",
        partyUnitAddress: "",
        vehicleShipId: "",
        vehicleIdColor: "",
        vehicleShipType: "",
        brand: "",
        ccertId: "",
        trailerIdNo: "",
        trailerColor: "",
        trailerType: "",
        trailerBrand: "",
        trailerCcertId: "",
        caseCauseNameCopy: "",
        illegalLaw: "",
        punishLaw: "",
        discretionId: "",
        tempPunishAmount: "",
        organId: iLocalStroage.gets("userInfo").organId,
        caseTypeId: "",
        staffId: "",
        staff: "",
        certificateId: "",
        otherInfo: {
          isBigTransfer: '否',
        },
        weightLimit: '',
        overWeight: '',
        highwayRoute: '',
        direction: '',
        position: '',
        // kilometre: '',
        // metre: '',
        pileNumber:0,
        pileNumber2:0,
        distance:0,
        distance2:0,
        latitudeAndLongitude:'', //案发坐标
      },
      routeList: [],
      directionList: [],
      locationList: [],
      rules: {
        caseSourceText: [{required: true, validator: validatecaseSourceText, trigger: "change"}],
        afsj: [
          { validator: validateTime, trigger: "change"}
        ],
        acceptTime: [
          {required: true, message: "请选择时间", trigger: "change"},
          {required: true, validator: validateTime, trigger: "change"}
        ],
        party: [
          // { required: true, message: "请输入", trigger: "blur" },
          {required: true, validator: validatePart, trigger: "blur"}
        ],
        partyName: [
          // { required: true, message: "请输入", trigger: "blur" },
          {required: true, validator: validatePartName, trigger: "blur"}
        ],
        lawPersonListId: [
          {required: true, validator: validateLawPersonNumber, trigger: "change"}
        ],
        'otherInfo.checkTime': [
          {required: true, message: "请输入检测时间", trigger: "change"}
        ],
        'otherInfo.vehiclefiledThing': [
          {required: true, message: "请输入装载物", trigger: "change"}
        ],
        //青海非必填
        // 'driverOrAgentInfo.relationWithCase': [
        //   {required: true, message: "请选择案件关系", trigger: "change"}
        // ],
        illegalLaw: [
          {required: true, message: "请选择条款", trigger: "change"}
        ],
        punishLaw: [
          {required: true, message: "请选择依据", trigger: "change"}
        ],
        partyAge: [
          {validator: validateAge, trigger: "blur"}
        ],
        partyIdNo: [
          {validator: validateIDNumber, trigger: "blur"}
        ],
        partyZipCode: [
          {validator: validateZIP, trigger: "blur"}
        ],
        partyTel: [
          {validator: validatePhone, trigger: "blur"}
        ],
        partyUnitTel: [
          {validator: validatePhone, trigger: "blur"}
        ],
        highwayRoute: [
          {required: true, message: "请选择路线", trigger: "change"}
        ],
        direction: [
          {required: true, message: "请选择方向", trigger: "change"}
        ],
        position: [
          {required: true, message: "请选择位置", trigger: "change"}
        ],
        pileNumber: [
          {required: true, message: "请输入公里数", trigger: "blur"}
        ],
        distance: [
          {required: true, message: "请输入米数", trigger: "blur"}
        ],
      },
      //案件类型
      allcaseSource: [
        {value: "行政检查", label: "行政检查", placeholder: ""},
        {value: "投诉举报", label: "投诉举报", placeholder: ""},
        {value: "上级交办", label: "上级交办", placeholder: "请输入上级机关名称"},
        {value: "下级报请", label: "下级报请", placeholder: "请输入下级机关名称"},
        {value: "部门移送", label: "部门移送", placeholder: "请输入移送部门名称"},
        {value: "其他途径", label: "其他途径", placeholder: "请输入发现途径"}
      ],
      caseSourceTextPla: '',
      //证件类型
      credentialType: [
        {value: "0", label: "身份证"},
        {value: "1", label: "护照"}
      ],
      alreadyChooseLawPerson: [],
      partyTypePerson: "1", //判断要显示的部分
      driverOrAgentInfoList: [
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
          provincesAddress: [],
          adressCode: "",
          company: "",
          position: "",
          zigeNumber: ""
        }
      ],
      driverOrAgentInfo: {
        relationWithParty: '1',
        age: '',
      },
      allRelationWithParty: [
        //与当事人关系下拉框
        // {value: "0", label: "同一人"},
        // {value: "1", label: "近亲戚"},
        // {value: "2", label: "借用车辆"},
        // {value: "3", label: "雇佣关系"},
        // {value: "4", label: "车辆所有人"}
      ],
      allRelationWithParty_: [
        //与当事人关系下拉框
        // {value: "1", label: "近亲戚"},
        // {value: "2", label: "借用车辆"},
        // {value: "3", label: "雇佣关系"},
        // {value: "4", label: "车辆所有人"}
      ],
      allRelationWithCase: [
        //与案件关系下拉框
        // {value: "0", label: "当事人"},
        // {value: "1", label: "驾驶人"},
        // {value: "2", label: "实际所有者"},
        // {value: "3", label: "证人"},
        // {value: "4", label: "承运人"},
        // {value: "5", label: "代理人"}
      ],
      allQYRelationWithParty: [
      //与当事人关系下拉框(企业组织)
      // { value: "2", label: "借用车辆" },
      // { value: "3", label: "雇佣关系" },
      // { value: "5", label: "其他" }
     ],
      allQYRelationWithCase: [
      //与案件关系下拉框(企业组织)
      // { value: "1", label: "驾驶人" },
      // { value: "3", label: "证人" },
      // { value: "4", label: "承运人" },
      // { value: "5", label: "代理人" }
      ],
      allVehicleIdColor: [
        //车牌颜色下拉框
        // {value: "1", label: "黄色"},
        // {value: "2", label: "蓝色"},
        // {value: "3", label: "绿色"},
        // {value: "4", label: "黄绿"},
        // {value: "5", label: "黑色"},
        // {value: "6", label: "白色"},
        // {value: "7", label: "其他"}
      ],
      allVehicleShipType: [
        // {value: "中小客车", label: "中小客车"},
        // {value: "大客车", label: "大客车"},
        // {value: "小型货车", label: "小型货车"},
        // {value: "中型货车", label: "中型货车"},
        // {value: "大型货车", label: "大型货车"},
        // {value: "特大型货车", label: "特大型货车"},
        // {value: "集装箱车", label: "集装箱车"},
        // {value: "摩托车", label: "摩托车"},
        // {value: "拖拉机", label: "拖拉机"}
      ],
      dateShow: false, //是否显示时间提示语
      showTrailer: false, //是否显示挂车信息
      judgFreedomList: [], //自由裁量列表
      caseSourceTextDisable: false,
      relationWithPartyIsOne: [], //与当事人关系是否为同一人
      isHandleCase: false,
      activeJudgli: "",
      showOverrun: false, //显示超限信息锚点
      lawPersonListId: "",
      currentUserLawId: "",
      disableBtn: false, //提交暂存按钮的禁用
      activeA: [true, false, false, false, false],
      autoSava: true, //自动暂存
      allTrailerTypeType: [], //挂车类型,
      //案发地点标志
      afddFlag: false,
      disableZcBtn: false, //暂存按钮禁用
      hasLatitudeAndLongitude:false, //案发坐标是否已经获取
      provincesList: [],//行政区划
      subAreaCascader:'subAreaCascader',
    };
  },
  components: {
    chooseLawPerson,
    punishDiag,
    caseSlideMenu
  },
  computed: {...mapGetters(['caseId','openTab','caseHandle'])},
  methods: {
    //更改案件来源
    changeCaseSource(item) {
      if (item.value === "行政检查" || item.value === "投诉举报") {
        this.caseSourceTextDisable = false;
        this.inforForm.caseSourceText = '';
      } else {
        this.caseSourceTextPla = item.placeholder
        this.caseSourceTextDisable = true;
      }
      this.inforForm.caseSource = item.value
    },
    //选择执法人员
    addLawPerson() {
      this.$refs.chooseLawPersonRef.showModal(this.lawPersonListId, this.alreadyChooseLawPerson);
    },
    //设置执法人员
    setLawPerson(userlist) {
      console.log('选择的执法人员', userlist);
      this.alreadyChooseLawPerson = userlist;
      this.lawPersonListId = [];
      let staffIdArr = [];
      let staffArr = [];
      let certificateIdArr = [];

      this.alreadyChooseLawPerson.forEach(item => {
        this.lawPersonListId.push(item.id);
        //给表单数据赋值
        staffIdArr.push(item.id);
        staffArr.push(item.lawOfficerName);
        certificateIdArr.push(item.selectLawOfficerCard);
      });
      this.inforForm.staffId = staffIdArr.join(',');
      this.inforForm.staff = staffArr.join(',');
      this.inforForm.certificateId = certificateIdArr.join(',');

    },
    //默认设置执法人员为当前用户 需要用用户的id去拿他作为执法人员的id
    setLawPersonCurrentP() {
      let _this = this
      this.$store
        .dispatch("findLawOfficerList", iLocalStroage.gets("userInfo").organId)
        .then(
          res => {
            console.log('执法人员列表', res)
            _this.userList = res.data;
            let currentUserData = {};
            _this.lawPersonListId = [];
            _this.alreadyChooseLawPerson = [];

            res.data.forEach(item => {
              if (
                item.userId == iLocalStroage.gets("userInfo").id
              ) {
                currentUserData.id = item.id;
                currentUserData.lawOfficerName = item.lawOfficerName;
                currentUserData.selectLawOfficerCard = item.lawOfficerCards.split(",")[0]
                _this.alreadyChooseLawPerson.push(currentUserData);
                _this.lawPersonListId.push(currentUserData.id);
                _this.currentUserLawId = currentUserData.id;
                _this.inforForm.staff = item.lawOfficerName;
                _this.inforForm.staffId = item.id;


              }
            });
          },
          err => {
            console.log(err);
          }
        );
    },
    removeLawPersontag(val) {
      if (this.currentUserLawId == val) {
        this.lawPersonListId.push(val);
        this.$message('该执法人员不能删除！');
      }
    },
    //更改当事人类型
    changePartyType(val) {
    this.partyTypePerson = val;
    if (val == "1") {
      this.inforForm.partyName = "";
      this.inforForm.partyUnitTel = "";
      this.inforForm.socialCreditCode = "";
      this.inforForm.roadTransportLicense = "";
      this.inforForm.partyManager = "";
      this.inforForm.partyManagerPositions = "";
      this.inforForm.partyUnitAddress = "";
    } else {
      this.inforForm.party = "";
      this.inforForm.partyIdType = "";
      this.inforForm.partyIdNo = "";
      this.inforForm.partySex = "";
      this.inforForm.partyAge = "";
      this.inforForm.partyTel = "";
      this.inforForm.partyAddress = "";
      this.inforForm.provincesAddressArray = [];
      this.inforForm.partyZipCode = "";
      this.inforForm.partyUnitPosition = "";
      this.inforForm.occupation = "";
      this.inforForm.partyEcertId = "";
    }
    if(this.driverOrAgentInfoList[0].relationWithParty == "同一人" ||this.driverOrAgentInfoList[0].relationWithParty == '近亲戚' || this.driverOrAgentInfoList[0].relationWithParty == '车辆所有人' 
    || this.driverOrAgentInfoList[0].relationWithParty == '其它' || this.driverOrAgentInfoList[0].relationWithCase == '当事人' || this.driverOrAgentInfoList[0].relationWithCase == '实际所有者'){
        this.driverOrAgentInfoList[0].relationWithParty = "";
        this.driverOrAgentInfoList[0].relationWithCase = "";
        this.driverOrAgentInfoList[0].name = "";
        this.driverOrAgentInfoList[0].zhengjianType = "";
        this.driverOrAgentInfoList[0].zhengjianNumber = "";
        this.driverOrAgentInfoList[0].sex = "";
        this.driverOrAgentInfoList[0].age = "";
        this.driverOrAgentInfoList[0].tel = "";
        this.driverOrAgentInfoList[0].adress = "";
        this.driverOrAgentInfoList[0].provincesAddress = "";
        this.driverOrAgentInfoList[0].adressCode = "";
        this.driverOrAgentInfoList[0].company = "";
        this.driverOrAgentInfoList[0].position = "";
        this.driverOrAgentInfoList[0].zigeNumber = "";
    }
  },
    //更改与当事人关系   为同一人时自动赋值且不可编辑
    changeRelationWithParty(index) {
      console.log(index, 'index')
      console.log(this.driverOrAgentInfoList[index].relationWithParty === '同一人');
      let val = this.driverOrAgentInfoList[index].relationWithParty
      if (val === '同一人') {
        console.log(val);
        this.driverOrAgentInfoList[index].relationWithCase = "当事人";
        this.driverOrAgentInfoList[index].name = this.inforForm.party;
        this.driverOrAgentInfoList[index].zhengjianType = this.inforForm.partyIdType;
        this.driverOrAgentInfoList[index].zhengjianNumber = this.inforForm.partyIdNo;
        this.driverOrAgentInfoList[index].sex = this.inforForm.partySex;
        this.driverOrAgentInfoList[index].age = this.inforForm.partyAge;
        this.driverOrAgentInfoList[index].tel = this.inforForm.partyTel;
        this.driverOrAgentInfoList[index].adress = this.inforForm.partyAddress;
        this.driverOrAgentInfoList[index].provincesAddress = this.inforForm.provincesAddressArray;
        this.driverOrAgentInfoList[index].adressCode = this.inforForm.partyZipCode;
        this.driverOrAgentInfoList[index].company = this.inforForm.partyUnitPosition;
        this.driverOrAgentInfoList[index].position = this.inforForm.occupation;
        this.driverOrAgentInfoList[index].zigeNumber = this.inforForm.partyEcertId;
        this.relationWithPartyIsOne[index] = true;
      } else {
        this.driverOrAgentInfoList[index].relationWithCase = "";
        this.driverOrAgentInfoList[index].name = "";
        this.driverOrAgentInfoList[index].zhengjianType = "";
        this.driverOrAgentInfoList[index].zhengjianNumber = "";
        this.driverOrAgentInfoList[index].sex = "";
        this.driverOrAgentInfoList[index].age = "";
        this.driverOrAgentInfoList[index].tel = "";
        this.driverOrAgentInfoList[index].adress = "";
        this.driverOrAgentInfoList[index].provincesAddress = "";
        this.driverOrAgentInfoList[index].adressCode = "";
        this.driverOrAgentInfoList[index].company = "";
        this.driverOrAgentInfoList[index].position = "";
        this.driverOrAgentInfoList[index].zigeNumber = "";
        this.relationWithPartyIsOne[index] = false;
      }
    },
    //添加其他人信息
    addDriverOrAgent() {
      var item = {
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
      };
      this.driverOrAgentInfoList.push(item);
    },
    //添加挂车
    addTrailer() {
      this.showTrailer = true;
    },
    //点击处罚依据显示弹窗
    showPunishDiag(titleType='') {
      let illageClauseLabel = '';
      let punishClauseLabel = '';
      if(titleType =='compensation'){
        titleType = '选择认定条款及赔（补）偿依据',
        illageClauseLabel = '认定条款';
        punishClauseLabel = '赔（补）偿依据';
      }else{
        titleType = '选择违法条款及处罚依据';
        illageClauseLabel = '违法条款';
        punishClauseLabel = '处罚依据';
      }
      let data = {
        caseCauseId: this.inforForm.caseCauseId,
        caseCauseName: this.inforForm.caseCauseName,
        titleType:titleType,
        illageClauseLabel,
        punishClauseLabel
      };
      this.$refs.punishDiagRef.showModal(data);
    },
    //设置违法条款和处罚条款
    setIllegalLawAndPunishLaw(data) {
      console.log(data);
      let illegalLawArr = [];
      let punishLawArr = [];

      data.forEach(item => {
        illegalLawArr.push(item.illageClause);
        punishLawArr.push(item.punishClause);
      });
      this.inforForm.illegalLaw = illegalLawArr.join(";");
      this.inforForm.punishLaw = punishLawArr.join(";");
    },
    //查询自由裁量标准
    findJudgFreedomList() {
      this.$store.dispatch("findJudgFreedomList").then(
        res => {
          console.log(res);
          this.judgFreedomList = res.data;
        },
        err => {
          console.log(err);
        }
      );
    },
    //选中自由裁量
    selectJudgFreedom(item) {
      console.log(item);
      if (this.activeJudgli == item.id) {
        this.activeJudgli = "";
        this.inforForm.discretionId = "";
      } else {
        this.activeJudgli = item.id;
        this.inforForm.discretionId = item.id;
      }
      this.inforForm.tempPunishAmount = item.lawerLimit;
    },
  
    //点击滚动
    jump(index) {
      console.log(this.$el);
      this.activeA = [false, false, false, false, false];
      this.activeA[index - 1] = true;
      if (index >= 1) {
        let numTotal = 0;
        for (let i = 0; i < index; i++) {
          // let elPageOt = this.$el.querySelector(`#link_${i}`) ? this.$el.querySelector(`#link_${i}`).offsetHeight : 40;
          let elPageOt = this.$el.querySelector(`#link_${i}`) ? this.$el.querySelector(`#link_${i}`).offsetHeight : 0;
          numTotal += elPageOt;
        }
        console.log('numTotal', numTotal);
        document.getElementById("inforCollectionBox").scrollTop = numTotal;
      }
    },
    //提交信息
    submitInfo(state) {
      // this.searchLawPerson();
      // console.log('searchLawPerson', this.allUserList)
      // console.log("lawPersonList", this.lawPersonList)
      if(!this.inforForm.latitudeAndLongitude){
        this.$message('请获取坐标！');
        return;
      }
      if(!this.payTotal){
        this.$message('请添加路损清单！');
        return;
      }
      console.log("表单数据", this.inforForm)
      let _this = this
      //        this.$refs["inforForm"].validate(valid => {
      let result = true
      for (var field in _this.rules) {
        let obj = this.$refs['inforForm']
        let _this = this
        obj.validateField(field, (validMessage) => {
          if (validMessage !== '' && result === true) {
            result = false
            let fields = _this.$refs[field].elForm.fields
            for (let i in fields) {
              if (fields[i].labelFor === field) {
                if (fields[i].label) {
                  console.log(_this.$refs[field].$el.offsetTop);
                  document.getElementById('inforCollectionBox').scrollTop = _this.$refs[field].$el.offsetTop
                
                }
              }
            }
            return result
          }
        })
      }
      if (result) {
        _this.inforForm.agentPartyEcertId = JSON.stringify(
          _this.driverOrAgentInfoList
        );
        // 超限
        _this.inforForm.otherInfo = JSON.stringify(
          _this.inforForm.otherInfo
        );
        //赔补偿案件
        this.inforForm.roadDamageList = this.pathLossList ? JSON.stringify(this.pathLossList) : '';
        this.inforForm.payTotal = this.payTotal;
        _this.inforForm.state = state;
        _this.inforForm.caseStatus = '未立案';
        if(this.inforForm.provincesAddressArray && this.inforForm.provincesAddressArray.length>1){
            this.inforForm.provincesAddress=JSON.stringify(this.inforForm.provincesAddressArray)
        }
        _this.$store.dispatch("saveOrUpdateCaseBasicInfo", _this.inforForm).then(
          res => {
            console.log(res);
            _this.$message({
              type: "success",
              message: "提交成功!"
            });
            _this.$store.dispatch("deleteTabs", _this.$route.name);
            _this.$store.commit("setCaseId", res.data.id);
            //设置
            _this.$store.commit("setCaseNumber", res.data.tempNo);
            iLocalStroage.removeItem("stageCaseId");
            this.autoSava = false; 

            console.log('this.openTab',this.openTab);
            if(this.openTab){
              let replaceIndex = 0;
              for(let i=0;i < this.openTab.length;i++){
                if(this.openTab[i].route == '/compensationInforCollect'){
                  replaceIndex = i;
                  break;
                }
              }
              this.openTab[replaceIndex].menuUrl = 'case_handle_establish';
              this.openTab[replaceIndex].name = 'case_handle_establish' + '-and-' + this.caseHandle.caseNumber;
              this.openTab[replaceIndex].route = '/establish';
            }
            

            _this.$router.replace({
              name: "case_handle_establish"
            });
          },
          err => {

            console.log(err);
          }
        );
      }
    },
    //查询执法人员
    getAllUserList(list) {
      console.log("list", list);
      this.allUserList = list;
      setTimeout(() => {
      }, 100);
    },
    stageInfo(state,otherData={}) {
      this.inforForm.agentPartyEcertId = JSON.stringify(
        this.driverOrAgentInfoList
      );
      // 超限
      this.inforForm.otherInfo = JSON.stringify(
        this.inforForm.otherInfo
      );
      //赔补偿案件
      this.inforForm.roadDamageList = this.pathLossList ? JSON.stringify(this.pathLossList) : '';
      this.inforForm.payTotal = this.payTotal;
      console.log(this.inforForm)
      if(this.inforForm.provincesAddressArray && this.inforForm.provincesAddressArray.length>1){
        this.inforForm.provincesAddress=JSON.stringify(this.inforForm.provincesAddressArray)
      }
      this.inforForm.state = state;
      this.inforForm.caseStatus = '未立案';
      let _this = this

      this.$store
        .dispatch("saveOrUpdateCaseBasicInfo", this.inforForm)
        .then(
          res => {
            console.log(this.inforForm);
            if (this.inforForm.otherInfo) {
              this.inforForm.otherInfo = JSON.parse(this.inforForm.otherInfo)
            }
            _this.$message({
              type: "success",
              message: "暂存成功!"
            });
            _this.$store.commit("setCaseId", res.data.id);
            iLocalStroage.set("stageCaseId", res.data.id);
            // this.autoSava = false;
            //跳转举报记录
            if(otherData.nextRoute) {
              this.$router.push({
                name:otherData.nextRoute,
                params:otherData.params
              })
            }
          },
          err => {
            console.log(err);
          }
        );
    },
    //右侧小导航进入的，则获取案件信息
    fromSlide() {
      console.log('fromSlide');
      let data = {
        id: this.caseId
      };
      let _this = this
      this.$store.dispatch("getCaseBasicInfo", data).then(
        res => {
            let dataArray = [];
            _this.driverOrAgentInfoList = JSON.parse(res.data.agentPartyEcertId);
            if(res.data.provincesAddress){
                res.data.provincesAddressArray = JSON.parse(res.data.provincesAddress)
                if(res.data.provincesAddressArray.length>1){
                    let obj = {
                        first:res.data.provincesAddressArray[0],
                        second:res.data.provincesAddressArray[1]
                    }
                    if(res.data.provincesAddressArray.length==3){
                        obj.three = res.data.provincesAddressArray[2]
                    }
                    dataArray.push(obj)
                }
            }
            if(_this.driverOrAgentInfoList.length>0){
                _this.driverOrAgentInfoList.forEach(p=>{
                    if(p.provincesAddress && p.provincesAddress.length>1){
                        let subObj = {
                            first:p.provincesAddress[0],
                            second:p.provincesAddress[1]
                        }
                        if(p.provincesAddress.length==3){
                            subObj.three = p.provincesAddress[2]
                        }
                        dataArray.push(subObj)
                    }
                })
            }
            this.initProvincesList(dataArray)  
          _this.inforForm = res.data;
          this.handleCaseData(res.data);
        },
        err => {
          console.log(err);
        }
      );
    },
  
    
    //处理数据回显问题
    handleCaseData(data) {
      console.log('handleCaseData方法', data);
      this.showCaseSourceAfterInput(data.caseSource)
      //使当事人类型选中
      if (data.partyType == "1") {
        this.inforForm.partyType = 1;
        this.partyTypePerson = 1;
      } else {
        this.inforForm.partyType = 2;
        this.partyTypePerson = 2;
      }
      if (data.partySex == "1") {
        this.inforForm.partySex = 1;
      } else {
        this.inforForm.partySex = 0;
      }
      //驾驶人或代理人
      this.driverOrAgentInfoList = JSON.parse(data.agentPartyEcertId);
      //超限信息
      if (data.otherInfo != "") {
        this.inforForm.otherInfo = JSON.parse(data.otherInfo);
      }
      if (data.caseCauseName == '车辆在公路上擅自超限行驶') {
        this.showOverrun = true;
      }
      ;
      if (data.caseStatus == '待审批') {
        this.isHandleCase = true;
      }
      ;
      if (data.trailerIdNo != "") {
        this.showTrailer = true;
      }
      if (data.discretionId != "") {
        this.activeJudgli = data.discretionId;
      }
     
      //设置执法人员
      this.alreadyChooseLawPerson = [];
      let staffNameList = data.staff.split(',');
      let staffIdList = data.staffId.split(',');
      let staffCertificateIdList = data.certificateId.split(',');
      this.lawPersonListId = staffIdList;
      staffIdList.forEach((item, index) => {
        let newlaw = {
          id: item,
          lawOfficerName: staffNameList[index],
          lawOfficerCards: staffCertificateIdList[index]
        }
        this.alreadyChooseLawPerson.push(newlaw);
      });
      //设置当前执法人员不可以删除
      findLawOfficerListApi(iLocalStroage.gets("userInfo").organId).then(res=>{
        console.log('res',res);
        for(let i=0;i< res.data.length;i++){
          if (res.data[i].userId == iLocalStroage.gets("userInfo").id){
            this.currentUserLawId = res.data[i].id;
            break;
          }
        }
      }).catch(err=>{console.log(err)})

      //案发坐标
      this.hasLatitudeAndLongitude  = data.latitudeAndLongitude !=='';
      //路损清单
      this.pathLossList =  data.roadDamageList ? JSON.parse(data.roadDamageList) : [];
      this.payTotal = data.payTotal;
    },
    //案件来源后的输入框是否显示
    showCaseSourceAfterInput(caseSource) {
      if (caseSource === "行政检查" || caseSource === "投诉举报" || caseSource =='') {
        this.caseSourceTextDisable = false;
      } else {
        this.caseSourceTextDisable = true;
      }
      if(caseSource === "投诉举报"){
        this.showJBRecord = true;
      }
    },
    // 超重限制及抽屉表
    weightLimit(type) {
      var inforForm = this.inforForm;
      if (type == '车辆轴数') {

        this.vehicleTypeList = [];
        this.vehicleAxlesTypeList = [];
        this.inforForm.otherInfo.vehicleType = '';
        this.inforForm.otherInfo.vehicleAxlesType = '';
        this.inforForm.otherInfo.vehiclePowerType = '';
      }
      if (type == '车型') {
        this.vehicleAxlesTypeList = [];
        this.inforForm.otherInfo.vehicleAxlesType = '';
        if (inforForm.otherInfo.vehicleType == '载货汽车') {
          if (inforForm.otherInfo.vehicleAxleNumber == 4) {
            this.vehicleAxlesTypeList = [{label: '2+2', value: '2+2'}];
          }
        } else if (inforForm.otherInfo.vehicleType == '中置轴挂车列车') {
          if (inforForm.otherInfo.vehicleAxleNumber == 4) {
            this.vehicleAxlesTypeList = [{label: '1+1+2', value: '1+1+2'}, {label: '1+2+1', value: '1+2+1'}];
          } else if (inforForm.otherInfo.vehicleAxleNumber == 5) {
            this.vehicleAxlesTypeList = [{label: '1+2+2', value: '1+2+2'}, {label: '2+1+2', value: '2+1+2'}];
          } else if (inforForm.otherInfo.vehicleAxleNumber == 6) {
            this.vehicleAxlesTypeList = [{label: '1+2+3', value: '1+2+3'}, {label: '2+2+2', value: '2+2+2'}];
          }
        } else if (inforForm.otherInfo.vehicleType == '铰接列车') {
          if (inforForm.otherInfo.vehicleAxleNumber == 4) {
            this.vehicleAxlesTypeList = [{label: '1+1+2', value: '1+1+2'}];
          } else if (inforForm.otherInfo.vehicleAxleNumber == 5) {
            this.vehicleAxlesTypeList = [{label: '1+2+2', value: '1+2+2'}, {
              label: '2+1+2',
              value: '2+1+2'
            }, {label: '1+1+3', value: '1+1+3'}];
          } else if (inforForm.otherInfo.vehicleAxleNumber == 6) {
            this.vehicleAxlesTypeList = [{label: '1+2+3', value: '1+2+3'}];
          }
        } else if (inforForm.otherInfo.vehicleType == '全挂汽车列车') {
          if (inforForm.otherInfo.vehicleAxleNumber == 4) {
            this.vehicleAxlesTypeList = [{label: '1+1+1+1', value: '1+1+1+1'}];
          } else if (inforForm.otherInfo.vehicleAxleNumber == 5) {
            this.vehicleAxlesTypeList = [{label: '1+2+2', value: '1+2+2'}, {label: '2+1+2', value: '2+1+2'}];
          } else if (inforForm.otherInfo.vehicleAxleNumber == 6) {
            this.vehicleAxlesTypeList = [{label: '2+2+2', value: '2+2+2'}];
          }
        }

      }


      inforForm.otherInfo.weightLimit = '';
      if (inforForm.otherInfo.vehicleAxleNumber == 6) {
        this.vehicleTypeList = [{label: '中置轴挂车列车', value: '中置轴挂车列车'}, {
          label: '铰接列车',
          value: '铰接列车'
        }, {label: '全挂汽车列车', value: '全挂汽车列车'}];
        if (inforForm.otherInfo.vehiclePowerType && inforForm.otherInfo.vehicleAxlesType) {
          inforForm.otherInfo.weightLimit = 46;
          if (inforForm.otherInfo.vehiclePowerType == '双轴') {
            inforForm.otherInfo.weightLimit = 49;
          }
        }

      }
      if (inforForm.otherInfo.vehicleAxleNumber == 5) {
        this.vehicleTypeList = [{label: '中置轴挂车列车', value: '中置轴挂车列车'}, {
          label: '铰接列车',
          value: '铰接列车'
        }, {label: '全挂汽车列车', value: '全挂汽车列车'}];
        if (inforForm.otherInfo.vehicleAxleNumber && inforForm.otherInfo.vehicleType && inforForm.otherInfo.vehicleAxlesType) {
          this.inforForm.otherInfo.weightLimit = 43;
          if (inforForm.otherInfo.vehicleAxlesType == '1+1+3') {
            inforForm.otherInfo.weightLimit = 42;
          }
        }

      }
      if (inforForm.otherInfo.vehicleAxleNumber == 4) {
        this.vehicleTypeList = [{label: '中置轴挂车列车', value: '中置轴挂车列车'}, {
          label: '铰接列车',
          value: '铰接列车'
        }, {label: '全挂汽车列车', value: '全挂汽车列车'}, {label: '载货汽车', value: '载货汽车'}]
        if (inforForm.otherInfo.vehicleAxleNumber && inforForm.otherInfo.vehicleType && inforForm.otherInfo.vehicleAxlesType) {
          this.inforForm.otherInfo.weightLimit = 36;
          if (inforForm.otherInfo.vehicleType == '中置轴挂车列车') {
            if (inforForm.otherInfo.vehicleAxlesType == '1+2+1') {
              inforForm.otherInfo.weightLimit = 35;
            }
          }
          if (inforForm.otherInfo.vehicleType == '载货汽车') {
            inforForm.otherInfo.weightLimit = 31;
          }
        }

      }
      if (inforForm.otherInfo.vehicleAxleNumber == 3) {
        this.vehicleTypeList = [{label: '中置轴挂车列车', value: '中置轴挂车列车'}, {label: '铰接列车', value: '铰接列车'}, {
          label: '载货汽车',
          value: '载货汽车'
        }]
        this.vehicleAxlesTypeList = [{label: '1+1+1', value: '1+1+1'}];
        if (inforForm.otherInfo.vehicleAxleNumber && inforForm.otherInfo.vehicleType && inforForm.otherInfo.vehicleAxlesType) {
          this.inforForm.otherInfo.weightLimit = 27;
          if (inforForm.otherInfo.vehicleType == '载货汽车') {
            inforForm.otherInfo.weightLimit = 25;
          }
        }

      }
      if (inforForm.otherInfo.vehicleAxleNumber == 2) {
        this.vehicleTypeList = [{label: '载货汽车', value: '载货汽车'}]
        this.vehicleAxlesTypeList = [{label: '1+1', value: '1+1'}];
        if (inforForm.otherInfo.vehicleType && inforForm.otherInfo.vehicleAxlesType) {
          this.inforForm.otherInfo.weightLimit = 18;
        }
      }

      if (this.inforForm.otherInfo.weightLimit && this.inforForm.otherInfo.allWeight) {
        if (this.inforForm.otherInfo.weightLimit < this.inforForm.otherInfo.allWeight) {
          inforForm.otherInfo.overWeight = this.inforForm.otherInfo.allWeight - this.inforForm.otherInfo.weightLimit

        }
        else {
          inforForm.otherInfo.overWeight = 0
        }
      }
      else {
        inforForm.otherInfo.overWeight = ''
      }
    },
    // 计算超重
    concludeOverWeight() {
      console.log('执行', this.inforForm.otherInfo.overWeight)
      // if(!this.inforForm.otherInfo.overWeight&& this.inforForm.otherInfo.allWeight){
      //   this.inforForm.otherInfo.overWeight='0'
      // }
      if (this.inforForm.otherInfo.weightLimit && this.inforForm.otherInfo.allWeight) {
        this.inforForm.otherInfo.overWeight = '';
        if (this.inforForm.otherInfo.weightLimit < this.inforForm.otherInfo.allWeight) {
          console.log('正正正数啊啊啊啊啊啊啊啊啊')
          this.inforForm.otherInfo.overWeight = this.inforForm.otherInfo.allWeight - this.inforForm.otherInfo.weightLimit
        } else {
          console.log('服服服数啊啊啊啊啊啊啊啊啊')
          this.inforForm.otherInfo.overWeight = '0'
          console.log(' this.inforForm.otherInfo.overWeight', this.inforForm.otherInfo.overWeight)

        }
      }
    },
    //自动计算年龄
    changePartyIdType(idCard) {
      let iden = idCard;
      let val = idCard.length;
      let sex = null;
      let myDate = new Date();
      let month = myDate.getMonth() + 1;
      let day = myDate.getDate();
      let age = 0;
      if (val === 18) {
        age = myDate.getFullYear() - iden.substring(6, 10) - 1;
        sex = iden.substring(16, 17);
        if (iden.substring(10, 12) < month || iden.substring(10, 12) == month && iden.substring(12, 14) <= day) age++;

      }
      if (val === 15) {
        age = myDate.getFullYear() - iden.substring(6, 8) - 1901;
        sex = iden.substring(13, 14);
        if (iden.substring(8, 10) < month || iden.substring(8, 10) == month && iden.substring(10, 12) <= day) age++;
      }

      if (sex % 2 === 0) {
        sex = 1;
      } else {
        sex = 0;
      }
      ;
      this.inforForm.partyAge = age;
      this.inforForm.partySex = sex;
      // let nowDate = new Date();
      // let year = nowDate.getFullYear();
      // let age = '';
      // console.log('year', year)
      // if (idCard != null && idCard != "") {
      //   if (idCard.length == 15) {
      //     age = year - ("19" + idCard.substr(6, 2));
      //   } else if (idCard.length == 18) {
      //     age = year - idCard.substr(6, 4);
      //   }
      // }
      // // bug;
      // var sexData = idCard.substr(17, 1)
      // if (sexData % 2 == 0) {
      //   this.inforForm.partySex = 1
      // }
      // if (sexData % 2 == 1) {
      //   this.inforForm.partySex = 0
      // }
      // console.log('性别', sexData % 2)
      // // if()
      // console.log('年龄', age)
      // this.inforForm.partyAge = age;
    },
    //自动计算年龄
    changePartyIdType2(idCard, index) {
      for (let i = 0; i < this.driverOrAgentInfoList.length; i++) {
        if (idCard === this.inforForm.partyIdNo && this.driverOrAgentInfoList[i].relationWithParty !== '当事人') {
          this.$message('身份证号不能相同！');
          return
        }
        if (index !== i && idCard === this.driverOrAgentInfoList[i].zhengjianNumber) {
          this.$message('身份证号不能相同！');
          return
        }

      }
      if (idCard === this.driverOrAgentInfoList[0].zhengjianNumber) {

      }
      let iden = idCard;
      let val = idCard.length;
      let sex = null;
      let myDate = new Date();
      let month = myDate.getMonth() + 1;
      let day = myDate.getDate();
      let age = 0;
      if (val === 18) {
        age = myDate.getFullYear() - iden.substring(6, 10) - 1;
        sex = iden.substring(16, 17);
        if (iden.substring(10, 12) < month || iden.substring(10, 12) == month && iden.substring(12, 14) <= day) age++;

      }
      if (val === 15) {
        age = myDate.getFullYear() - iden.substring(6, 8) - 1901;
        sex = iden.substring(13, 14);
        if (iden.substring(8, 10) < month || iden.substring(8, 10) == month && iden.substring(10, 12) <= day) age++;
      }

      if (sex % 2 === 0) {
        sex = 1;
      } else {
        sex = 0;
      }
      ;
      this.driverOrAgentInfoList[index].age = age;
      this.driverOrAgentInfoList[index].sex = sex;
    },
    noFue(val) {
      this.inforForm.partyAge = val >= 0 ? val : 0;
    },
    noFueA(val) {
      console.log('this.driverOrAgentInfo.age', this.driverOrAgentInfo.age)
      // this.driverOrAgentInfo.age = 3;
      this.driverOrAgentInfo.age = val >= 0 ? val : 0;
    },

    blur2(val) {
      var reg = /(^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$)|(^((\d3)|(\d{3}\-))?(1[358]\d{9})$)/;
      if (!reg.test(val) && val) {
        this.$message('手机号不正确')
      }
      // callback();
    },
    blur3(val) {
      var reg = /^\d{6}$/;
      if (!reg.test(val) && val) {
        this.$message('请输入正确的6位邮编')
      }
    },
    //获取挂车类型数据
    // getTrailerType() {
    //   getDictListDetailByNameApi('trailerType').then(res => {
    //     console.log('挂车类型', res);
    //     this.allTrailerTypeType = res.data;
    //   }, err => {
    //     console.log(err);
    //   })
    // },
    //初始化抽屉表
    async initDrawData(){
      try{
        //获取挂车类型数据
        let  data1 = await getDictListDetailByNameApi('trailerType');
        this.allTrailerTypeType = data1.data;
        //与案件关系
        let  data2 = await getDictListDetailByNameApi('与案件关系');
        this.allRelationWithCase = data2.data;
        //与当事人关系
        let  data3 = await getDictListDetailByNameApi('与当事人关系');
        this.allRelationWithParty = data3.data;
        this.allRelationWithParty_ =  this.allRelationWithParty.filter(item=>item.name !='同一人');
        //与当事人关系(企业组织)
        let  data4 = await getDictListDetailByNameApi('当事人关系(企业组织)');
        this.allQYRelationWithParty = data4.data;
        //与案件关系(企业组织)
        let  data5 = await getDictListDetailByNameApi('与案件关系(企业组织)');
        this.allQYRelationWithCase = data5.data;
        //车牌颜色
        let  data6 = await getDictListDetailByNameApi('车牌颜色');
        this.allVehicleIdColor = data6.data;
        //车辆类型
        let  data7 = await getDictListDetailByNameApi('车辆类型');
        this.allVehicleShipType = data7.data;
      }catch(err){
        throw new Error(err);
      }
      
    },
    //查询历史记录
    findHistoryBySign(sign) {
      findHistoryBySignApi(iLocalStroage.gets('userInfo').id, sign).then(res => {
        console.log("历史记录", res);
        if (sign == 'checkStastions') {
          this.recentCheckStastions = res.data;
        } else if (sign == "checkWorker") {
          this.recentCheckWorkers = res.data;
        } else if (sign == "brand") {
          this.brandList = res.data;
        }

      }, err => {
        console.log(err);
      })
    },
    //检测站 可输入也可以选择
    querySearch(queryString, cb) {
      console.log("输入搜索");
      let checkStastions = this.recentCheckStastions;
      var results = queryString ? checkStastions.filter(this.createFilter(queryString, checkStastions)) : checkStastions;
      let a = [];
      results.forEach(item => {
        a.push({value: item.inputValue})
      })
      cb(a);
    },
    //检测人员 可输入也可以选择
    queryCheckWorker(queryString, cb) {
      let checkWorker = this.recentCheckWorkers;
      var results = queryString ? checkWorker.filter(this.createFilter(queryString, checkWorker)) : checkWorker;
      let a = [];
      results.forEach(item => {
        a.push({value: item.inputValue})
      })
      cb(a);
    },
    //品牌 可输入也可以选择
    queryBrand(queryString, cb) {
      let brand = this.brandList;
      var results = queryString ? brand.filter(this.createFilter(queryString, brand)) : brand;
      let a = [];
      results.forEach(item => {
        a.push({value: item.inputValue})
      })
      cb(a);
    },
    //案发地点-方向
    getDirectionList() {
      this.$store.dispatch("getDictListDetail", "004cec030c349c3fcd119f3c2eee948f").then(
        res => {
          console.log("字典值列表", res);
          this.directionList = res.data;
        },
        err => {
          console.log(err);
        }
      );
    },

    //案发地点-位置
    getLocationList() {
      this.$store.dispatch("getDictListDetail", "a648aef61fdc2e8d578272c4f16d0c4f").then(
        res => {
          console.log("字典值列表", res);
          this.locationList = res.data;
        },
        err => {
          console.log(err);
        }
      );
    },
    //查找路线
    findRouteManageByOrganId() {
      let data = {organId: iLocalStroage.gets("userInfo").organId};
      findRouteManageByOrganIdApi(data).then(
        res => {
          console.log("路线", res);
          this.routeList = res.data;
        },
        err => {
          console.log(err);
        })
    },
    //查询案发时间和受案时间相差天数
    checkDays(){
      this.dateShow = false;
      let afsj = this.inforForm.afsj; // 案发时间
      let acceptTime = this.inforForm.acceptTime // 受案时间
      if(this.inforForm.afsj && this.inforForm.acceptTime){
        let diff = new Date(acceptTime).getTime() - new Date(afsj).getTime();
        let days = diff / 24 / 60 / 60 / 1000;
        if(days > 10){
          this.dateShow = true;
        }
      }
    },
    // 锚点回显-start
    scrool1() {
      let scrolled = this.$refs.link_1.scrollTop;
      this.activeA = [true, false, false, false, false]
    },
    scrool2() {
      let scrolled = this.$refs.link_1.scrollTop;
      this.activeA = [false, true, false, false, false]
    },
    scrool3() {
      let scrolled = this.$refs.link_1.scrollTop;
      this.activeA = [false, false, true, false, false]
    },
    scrool4() {
      let scrolled = this.$refs.link_1.scrollTop;
      this.activeA = [false, false, false, true, false]
    },
    scrool5() {
      let scrolled = this.$refs.link_1.scrollTop;
      this.activeA = [false, false, false, false, true]
    },
    // 锚点回显-end
    createFilter(queryString, data) {
      return (data) => {
        return (data.inputValue.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect (node) {
        if(node){
            let data = this.$refs['areaCascader'].panel.getNodeByValue(node[node.length - 1]).data;
            if (data.childrenCount>0 && data.children.length == 0) {
                this.$store.dispatch("getCountry",data.adCode).then(
                    res => {
                        data.children = res.data
                    }
                )
            }else if(data.childrenCount==0){
                this.inforForm.partyZipCode=data.postCode
                this.changeDriverOrAgentInfo('')
            }
        }
      },
      handleSelectDriverOrAgent(node,index,info){
          if(node){
            let data = this.$refs['subAreaCascader'+index][0].panel.getNodeByValue(node[node.length - 1]).data;
            if (data.childrenCount>0 && data.children.length == 0) {
                this.$store.dispatch("getCountry",data.adCode).then(
                    res => {
                        res.data.forEach(p => {
                        if (p.childrenCount > 0) {
                            p.children = []
                        }
                        })
                        data.children = res.data
                    }
                )
            }else if (data.childrenCount==0){
                info.adressCode=data.postCode
            }
        }
      },
    initProvincesList(data){
        this.$store.dispatch("getCountryTree",data).then(
            res => {
                this.provincesList = res.data
            }
        )
    },
    getCountry (pCode) {
        let params = pCode;
        let _this = this
        this.$store.dispatch("getCountry", params).then(
          res => {
            res.data.forEach(p => {
                if (p.childrenCount > 0) {
                    p.children = []
                }
            })
            _this.provincesList = res.data
          },
          err => {
            console.log(err);
          }
    )},
  },

  mounted() {
    // 事务中心跳转
    let overWeightCaseData = iLocalStroage.gets("overWeightCaseData")
    console.log('事务中心', overWeightCaseData)
    if (overWeightCaseData) {
      this.inforForm.caseSource = overWeightCaseData.caseSource
      this.inforForm.caseCauseName = overWeightCaseData.caseCauseName
      this.inforForm.programType = overWeightCaseData.programType
      this.inforForm.partyType = overWeightCaseData.partyType
      this.caseSourceTextDisable = true
      this.showOverrun = true
      this.inforForm.afsj = new Date()
      this.inforForm.afdd = '密云检测站 北京市顺密路荆栗园村K24+860'
      return
    }


    let someCaseInfo = iLocalStroage.gets("someCaseInfo");
    console.log(someCaseInfo);
    this.inforForm.caseCauseName = someCaseInfo.illageAct;
    this.inforForm.caseCauseNameCopy = someCaseInfo.illageAct;
    this.inforForm.caseCauseId = someCaseInfo.illageActId;
    this.inforForm.programType = someCaseInfo.programType;
    this.inforForm.caseType = someCaseInfo.caseType;
    this.inforForm.caseTypeId = someCaseInfo.caseTypeId;
    this.inforForm.zfmlId = someCaseInfo.cateId;
    if (this.inforForm.zfmlId == "1002000100000000") {
      this.afddFlag = true;
    } else {
      this.afddFlag = false;
    }

    this.inforForm.zfml = someCaseInfo.cateName;
    console.log("标志", someCaseInfo.illageAct)
    this.showOverrun =
      someCaseInfo.illageAct == "车辆在公路上擅自超限行驶" ? true : false;
    console.log('showOverrun', this.showOverrun)

    this.driverOrAgentInfo.relationWithParty = '1';
    this.$set(this.inforForm.otherInfo, 'checkResult', '未超限')

    this.inforForm.trailerColor = '1'

    // 鼠标滚动
    this.$refs.link_1.addEventListener('scroll', this.scrool1);
    this.$refs.link_2.addEventListener('scroll', this.scrool2);
    this.$refs.link_3.addEventListener('scroll', this.scrool3);
    if (this.showOverrun) {
      this.$nextTick(() => {
        this.$refs.link_4.addEventListener('scroll', this.scrool4);

      })

    }
    this.$refs.link_5.addEventListener('scroll', this.scrool5);

},
created() {
  this.checkDays();
  this.getDirectionList();
  this.getLocationList();
  // this.findJudgFreedomList();
  // this.getTrailerType();
  this.initDrawData();
  this.findRouteManageByOrganId();
  // this.setLawPerson(
  //   [iLocalStroage.gets('userInfo').username]
  // )
  console.log(this.$route)

  // if(!this.$route.params.fromSlide && !iLocalStroage.get("stageCaseId") && !this.$route.params.editFlag){
  //    this.setLawPersonCurrentP();
  // }
 
  if (this.$route.params.fromSlide) {
    this.fromSlide();
    this.disableBtn = true;
    this.autoSava = false;
  }
  //暂存数据后从其他页面回到信息采集页
  if (iLocalStroage.get("stageCaseId")) {
    this.fromSlide();
    // this.autoSava = false;
  }
  if(!this.$route.params.fromSlide && !iLocalStroage.get("stageCaseId")){
    this.getCountry('100000');
  }
  this.findHistoryBySign("checkStastions");
  this.findHistoryBySign("checkWorker");
  this.findHistoryBySign("brand");
  //修改基本信息
  if (this.$route.params.editFlag) {
    this.fromSlide();
    this.disableZcBtn = true; //暂存按钮禁用
    this.autoSava = false;
  }
},
beforeRouteLeave(to, from, next) {
  console.log('to', to)
  console.log('from', from)
  console.log('next', next);
  console.log('this.autoSava', this.autoSava);
  // if (this.autoSava && to.name != 'login') {  //退出登录不自动暂存
  //   this.stageInfo(0);
  // }

    next(vm => {
      console.log(vm)
    })

  }
};
