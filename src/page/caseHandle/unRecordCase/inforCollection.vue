<template>
  <div id="inforCollectionBox">
    <div class="linkPart">
      <div class="linkPartCon">
        <a href="#caseInfo" class="activeA" >案件情况</a>
        <a  @click="jump(2)">当事人</a>
        <a href="#carInfo">车辆信息</a>
        <a href="#breakLaw">违法事实</a>
      </div>
    </div>
    <el-form
      :model="inforForm"
      :rules="rules"
      ref="inforForm"
      class="caseInfoForm"
      label-width="100px"
    >
      <div class="caseFormBac">
        <p id="caseInfo">案件情况</p>
        <div>
          <div class="item">
            <el-form-item label="案件来源" prop="caseType">
              <el-select v-model="inforForm.caseType" placeholder="请选择">
                <el-option
                  v-for="item in allCaseType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="item">
            <el-input></el-input>
          </div>
        </div>
        <div>
          <div class="item">
            <el-form-item label="案发时间">
              <el-date-picker v-model="inforForm.time1" type="datetime"></el-date-picker>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="受案时间" prop="time2">
              <el-date-picker v-model="inforForm.time2" type="datetime"></el-date-picker>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemOne">
            <el-form-item label="违法行为">
              <el-input :disabled="true"></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="item">
            <el-form-item label="程序类型">
              <el-input :disabled="true"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="案件类型">
              <el-input :disabled="true"></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemOne">
            <el-form-item label="案发地点">
              <el-input></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemOne">
            <el-form-item label="执法人员" id="lawPersonBox">
              <!-- <el-input> -->
              <el-select v-model="inforForm.lawPersonList" multiple>
                <el-option
                  v-for="item in alreadyChooseLawPerson"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-button icon="el-icon-plus" @click="addLawPerson"></el-button>
              <!-- </el-input> -->
            </el-form-item>
          </div>
        </div>
      </div>

      <div class="caseFormBac">
        <p id="title2">当事人信息</p>
        <div>
          <div class="itemOne">
            <el-form-item label="执法人员">
              <!-- <el-radio v-model="inforForm.partyType" label="1">个人</el-radio>
              <el-radio v-model="inforForm.partyType" label="2">企业组织</el-radio>-->
              <el-radio-group v-model="inforForm.partyType" @change="changePartyType">
                <el-radio :label="1">个人</el-radio>
                <el-radio :label="2">企业组织</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>
        <div v-show="partyTypePerson=='1'">
          <div class="item">
            <el-form-item label="姓名" prop="party">
              <el-input v-model="inforForm.party"></el-input>
            </el-form-item>
          </div>
          <div class="item appendSelect">
            <el-form-item label="证件类型">
              <el-input placeholder="请输入内容" v-model="inforForm.partyIdNo" class="input-with-select">
                <el-select slot="prepend" v-model="inforForm.partyIdType">
                  <el-option
                    v-for="item in credentialType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div v-show="partyTypePerson=='1'">
          <div class="itemThird">
            <el-form-item label="性别">
              <el-select placeholder="请选择" v-model="inforForm.partySex">
                <el-option value="0" label="男"></el-option>
                <el-option value="1" label="女"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="itemThird">
            <el-form-item label="年龄">
              <el-input v-model="inforForm.partyAge" type="number"></el-input>
            </el-form-item>
          </div>
          <div class="itemThird">
            <el-form-item label="联系电话">
              <el-input v-model="inforForm.partyTel"></el-input>
            </el-form-item>
          </div>
        </div>
        <div v-show="partyTypePerson=='1'">
          <div class="itemBig">
            <el-form-item label="联系地址">
              <el-input v-model="inforForm.partyAddress"></el-input>
            </el-form-item>
          </div>
          <div class="itemSmall">
            <el-form-item label="邮编">
              <el-input v-model="inforForm.partyZipCode"></el-input>
            </el-form-item>
          </div>
        </div>
        <div v-show="partyTypePerson=='1'">
          <div class="itemBig">
            <el-form-item label="工作单位">
              <el-input v-model="inforForm.partyUnitPosition"></el-input>
            </el-form-item>
          </div>
          <div class="itemSmall">
            <el-form-item label="职位">
              <el-input v-model="inforForm.occupation"></el-input>
            </el-form-item>
          </div>
        </div>
        <div v-show="partyTypePerson=='1'">
          <div class="itemOne">
            <el-form-item label="从业资格证号">
              <el-input v-model="inforForm.partyEcertId"></el-input>
            </el-form-item>
          </div>
        </div>
        <div v-show="partyTypePerson!='1'">
          <div class="itemBig">
            <el-form-item label="单位名称" prop="partyName">
              <el-input v-model="inforForm.partyName"></el-input>
            </el-form-item>
          </div>
          <div class="itemSmall">
            <el-form-item label="联系电话">
              <el-input v-model="inforForm.partyUnitTel"></el-input>
            </el-form-item>
          </div>
        </div>
        <div v-show="partyTypePerson!='1'">
          <div class="itemSmall">
            <el-form-item label="统一社会信用代码">
              <el-input v-model="inforForm.socialCreditCode"></el-input>
            </el-form-item>
          </div>
          <div class="itemBig">
            <el-form-item label="道路经营许可证">
              <el-input v-model="inforForm.roadTransportLicense"></el-input>
            </el-form-item>
          </div>
        </div>
        <div v-show="partyTypePerson!='1'">
          <div class="itemSmall">
            <el-form-item label="法定代表人">
              <el-input v-model="inforForm.partyManager"></el-input>
            </el-form-item>
          </div>
          <div class="itemBig">
            <el-form-item label="职务">
              <el-input v-model="inforForm.partyManagerPositions"></el-input>
            </el-form-item>
          </div>
        </div>
        <div v-show="partyTypePerson!='1'">
          <div class="itemOne">
            <el-form-item label="地址">
              <el-input v-model="inforForm.partyUnitAddress"></el-input>
            </el-form-item>
          </div>
        </div>

        <p>驾驶人或代理人</p>
        <div
          class="driverOrAgentBox"
          v-for="(driverOrAgentInfo,index) in driverOrAgentInfoList"
          :key="index"
        >
          <div>
            <div class="item">
              <el-form-item label="与当事人关系">
                <el-select v-model="driverOrAgentInfo.relationWithParty">
                  <el-option
                    v-for="item in allRelationWithParty"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="item">
              <el-form-item label="与案件关系" prop="relationWithCase">
                <el-select v-model="driverOrAgentInfo.relationWithCase">
                  <el-option
                    v-for="item in allRelationWithCase"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div>
            <div class="item">
              <el-form-item label="姓名">
                <el-input v-model="driverOrAgentInfo.name"></el-input>
              </el-form-item>
            </div>
            <div class="item appendSelect">
              <el-form-item label="证件类型">
                <el-input
                  placeholder="请输入内容"
                  v-model="driverOrAgentInfo.zhengjianNumber"
                  class="input-with-select"
                >
                  <el-select slot="prepend" v-model="driverOrAgentInfo.zhengjianType">
                    <el-option
                      v-for="item in credentialType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-input>
              </el-form-item>
            </div>
          </div>
          <div>
            <div class="itemThird">
              <el-form-item label="性别">
                <el-select v-model="driverOrAgentInfo.sex">
                  <el-option value="0" label="男"></el-option>
                  <el-option value="1" label="女"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="itemThird">
              <el-form-item label="年龄">
                <el-input v-model="driverOrAgentInfo.age" type="number"></el-input>
              </el-form-item>
            </div>
            <div class="itemThird">
              <el-form-item label="联系电话">
                <el-input v-model="driverOrAgentInfo.tel"></el-input>
              </el-form-item>
            </div>
          </div>
          <div>
            <div class="itemBig">
              <el-form-item label="联系地址">
                <el-input v-model="driverOrAgentInfo.adress"></el-input>
              </el-form-item>
            </div>
            <div class="itemSmall">
              <el-form-item label="邮编">
                <el-input v-model="driverOrAgentInfo.adressCode"></el-input>
              </el-form-item>
            </div>
          </div>
          <div>
            <div class="itemBig">
              <el-form-item label="工作单位">
                <el-input v-model="driverOrAgentInfo.company"></el-input>
              </el-form-item>
            </div>
            <div class="itemSmall">
              <el-form-item label="职位">
                <el-input v-model="driverOrAgentInfo.position"></el-input>
              </el-form-item>
            </div>
          </div>
          <div>
            <div class="itemOne">
              <el-form-item label="从业资格证号">
                <el-input v-model="driverOrAgentInfo.zigeNumber"></el-input>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="buttonBox">
          <el-button
            type="primary"
            size="medium"
            icon="el-icon-plus"
            @click="addDriverOrAgent"
          >添加其他人</el-button>
        </div>
      </div>

      <div class="caseFormBac">
        <p>车辆信息</p>
        <div>
          <div class="item">
            <el-form-item label="车牌号">
              <el-input v-model="inforForm.vehicleShipId"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="车牌颜色">
              <el-select v-model="inforForm.vehicleIdColor">
                <el-option
                  v-for="item in allVehicleIdColor"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="item">
            <el-form-item label="车牌类型">
              <el-select v-model="inforForm.vehicleShipType">
                <el-option
                  v-for="item in allVehicleShipType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="品牌">
              <el-input v-model="inforForm.brand"></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemOne">
            <el-form-item label="道路运输证号">
              <el-input v-model="inforForm.ccertId"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="buttonBox" v-if="!showTrailer">
          <el-button type="primary" size="medium" icon="el-icon-plus" @click="addTrailer">添加挂车数据</el-button>
        </div>
        <p v-if="showTrailer">挂车信息</p>
        <div v-if="showTrailer">
          <div class="item">
            <el-form-item label="车牌号">
              <el-input v-model="inforForm.trailerIdNo"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="车牌颜色">
              <el-select v-model="inforForm.trailerColor">
                <el-option
                  v-for="item in allVehicleIdColor"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div v-if="showTrailer">
          <div class="item">
            <el-form-item label="车牌类型">
              <el-select v-model="inforForm.trailerType">
                <el-option
                  v-for="item in allVehicleShipType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="品牌">
              <el-input v-model="inforForm.trailerBrand"></el-input>
            </el-form-item>
          </div>
        </div>
        <div v-if="showTrailer">
          <div class="itemOne">
            <el-form-item label="道路运输证号">
              <el-input v-model="inforForm.trailerCcertId"></el-input>
            </el-form-item>
          </div>
        </div>
      </div>
      <!-- <div class="caseFormBac">
        <p>补充信息</p>
        <div>
          <el-button type="primary" size="medium" icon="el-icon-plus">添加超限数据</el-button>
          <el-button type="primary" size="medium" icon="el-icon-plus">添加路产损坏信息</el-button>
          <el-button type="primary" size="medium" icon="el-icon-plus">添加其他</el-button>
        </div>
      </div>-->
      <div class="caseFormBac">
        <p>违法事实</p>
        <div>
          <div class="itemOne">
            <el-form-item label="违法行为">
              <el-input v-model="inforForm.caseCauseNameCopy" :disabled="true"></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemOne">
            <el-form-item label="违法条款" prop="illegalLaw">
              <el-input v-model="inforForm.illegalLaw"></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemOne">
            <el-form-item label="处罚依据">
              <el-input v-model="inforForm.punishLaw" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" @click="showPunishDiag"></el-button>
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemOne">
            <el-form-item label="自由裁量标准">
              <el-input v-model="inforForm.discretionId"></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemOne">
            <el-form-item label="拟处罚金额">
              <el-input v-model="inforForm.tempPunishAmount"></el-input>
            </el-form-item>
          </div>
        </div>
        <el-button class="caseSubmitBtn" icon="el-icon-plus" @click="submitInfo">提交</el-button>
        <el-button class="caseSubmitBtn caseSubmitBtn2" icon="el-icon-plus" @click="stageInfo">暂存</el-button>

      </div>
    </el-form>

    <chooseLawPerson ref="chooseLawPersonRef" @setLawPer="setLawPerson"></chooseLawPerson>
    <punishDiag ref="punishDiagRef"></punishDiag>
  </div>
</template>
<script>
import chooseLawPerson from "./chooseLawPerson";
import punishDiag from "./punishDiag";

export default {
  data() {
    //选择个人试验证
    var validatePart = (rule, value, callback) => {
      if (partyType == 1 && !value) {
        return callback(new Error("请输入"));
      }
      callback();
    };
    //选择公司时验证
    var validatePartName = (rule, value, callback) => {
      if (partyType == 2 && !value) {
        return callback(new Error("请输入"));
      }
      callback();
    };
    return {
      inforForm: {
        caseType: "",
        time1: "",
        lawPersonList: "",
        partyType: "1", //当事人类型
        party: "", //当事人信息-当事人姓名
        partyIdType: "0", //证件类型
        partyIdNo: "", //当事人信息-身份证件号
        partySex: "",
        partyAge: "",
        partyTel: "",
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
        punishLaw: ""
      },
      rules: {
        caseType: [{ required: true, message: "请选择", trigger: "blur" }],
        time2: [{ required: true, message: "请选择时间", trigger: "blur" }],
        party: [
          { required: true, message: "请输入", trigger: "blur" },
          { validator: validatePart, trigger: "blur" }
        ],
        partyName: [
          { required: true, message: "请输入", trigger: "blur" },
          { validator: validatePartName, trigger: "blur" }
        ],
        relationWithCase: [
          { required: true, message: "请选择", trigger: "blur" }
        ]
      },
      //案件类型
      allCaseType: [
        { value: 0, label: "行政检测" },
        { value: 1, label: "投诉举报" },
        { value: 2, label: "上级交办" },
        { value: 3, label: "下级报请" },
        { value: 4, label: "部门移送" },
        { value: 5, label: "其他途径" }
      ],
      //证件类型
      credentialType: [
        { value: "0", label: "身份证" },
        { value: "1", label: "护照" }
      ],
      alreadyChooseLawPerson: [{ value: "1", label: "张三" }],
      partyTypePerson: "", //判断要显示的部分
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
          adressCode: "",
          company: "",
          position: "",
          zigeNumber: ""
        }
      ],
      allRelationWithParty: [
        //与当事人关系下拉框
        { value: "0", label: "同一人" },
        { value: "1", label: "近亲戚" },
        { value: "2", label: "借用车辆" },
        { value: "3", label: "雇佣关系" },
        { value: "4", label: "车辆所有人" }
      ],
      allRelationWithCase: [
        //与案件关系下拉框
        { value: "0", label: "当事人" },
        { value: "1", label: "驾驶人" },
        { value: "2", label: "实际所有者" },
        { value: "3", label: "证人" },
        { value: "4", label: "承运人" },
        { value: "5", label: "代理人" }
      ],
      allVehicleIdColor: [
        //车牌颜色下拉框
        { value: "1", label: "黄色" },
        { value: "2", label: "蓝色" },
        { value: "3", label: "绿色" },
        { value: "4", label: "黄绿" },
        { value: "5", label: "黑色" },
        { value: "6", label: "白色" },
        { value: "7", label: "其他" }
      ],
      allVehicleShipType: [
        { value: "1", label: "中小客车" },
        { value: "2", label: "大客车" },
        { value: "3", label: "小型货车" },
        { value: "4", label: "中型货车" },
        { value: "5", label: "大型货车" },
        { value: "6", label: "特大型货车" },
        { value: "7", label: "集装箱车" },
        { value: "8", label: "摩托车" },
        { value: "9", label: "拖拉机" }
      ],
      showTrailer: false //是否显示挂车信息
    };
  },
  components: {
    chooseLawPerson,
    punishDiag
  },
  methods: {
    //选择执法人员
    addLawPerson() {
      this.$refs.chooseLawPersonRef.showModal();
    },
    //设置执法人员
    setLawPerson(userlist) {
      // console.log(userlist);
      this.inforForm.lawPersonList = userlist;
      this.alreadyChooseLawPerson = userlist;
    },
    //更改当事人类型
    changePartyType(val) {
      console.log(val);
      this.partyTypePerson = val;
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
    showPunishDiag() {
      this.$refs.punishDiagRef.showModal();
    },
    toNextPart(){

    },
    jump(index){
      if(index==2){
        let a = document.getElementById('title2').scrollTop;
        console.log("a",a);
      }
    },
    //提交信息
    submitInfo(){

    },
    stageInfo(){

    }

  }
};
</script>
<style lang="less">
@import "../../../css/caseHandle/index.less";
</style>