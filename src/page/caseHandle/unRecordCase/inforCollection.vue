<template>
  <div id="inforCollectionBox">
    <div class="linkPart">
      <div class="linkPartCon">
        <a href="#caseInfo" class="activeA">案件情况</a>
        <a @click="jump(2)">当事人</a>
        <a href="#carInfo">车辆信息</a>
        <a href v-if="showOverrun">超限信息</a>
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
            <el-form-item label="案件来源" prop="caseSource">
              <el-select
                v-model="inforForm.caseSource"
                placeholder="请选择"
                @change="changeCaseSource"
              >
                <el-option
                  v-for="item in allcaseSource"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="item hasMargintop">
            <el-input v-model="inforForm.caseSourceText" :disabled="caseSourceTextDisable"></el-input>
          </div>
        </div>
        <div>
          <div class="item">
            <el-form-item label="案发时间">
              <el-date-picker
                v-model="inforForm.afsj"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
              ></el-date-picker>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="受案时间" prop="acceptTime">
              <el-date-picker
                v-model="inforForm.acceptTime"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
              ></el-date-picker>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemOne">
            <el-form-item label="违法行为">
              <el-input v-model="inforForm.caseCauseName" :disabled="true"></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="item">
            <el-form-item label="程序类型">
              <el-input v-model="inforForm.programType" :disabled="true"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="案件类型">
              <el-input v-model="inforForm.caseType" :disabled="true"></el-input>
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
            <el-form-item label="执法人员" id="lawPersonBox" prop="lawPersonListId">
              <!-- <el-input> -->
              <el-select v-model="lawPersonListId" multiple @remove-tag="removeLawPersontag">
                <el-option
                  v-for="item in alreadyChooseLawPerson"
                  :key="item.id"
                  :label="item.lawOfficerName"
                  :value="item.id"
                  placeholder="请添加"
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
              <el-input
                placeholder="请输入内容"
                v-model="inforForm.partyIdNo"
                class="input-with-select hasMargintop"
              >
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
              <el-input v-model="inforForm.partyName" maxlength="40" show-word-limit></el-input>
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
                <el-select
                  v-model="driverOrAgentInfo.relationWithParty"
                  @change="changeRelationWithParty"
                >
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
                <el-input
                  v-model="driverOrAgentInfo.name"
                  :disabled="relationWithPartyIsOne && index==0"
                ></el-input>
              </el-form-item>
            </div>
            <div class="item appendSelect">
              <el-form-item label="证件类型">
                <el-input
                  placeholder="请输入内容"
                  v-model="driverOrAgentInfo.zhengjianNumber"
                  class="input-with-select hasMargintop"
                  :disabled="relationWithPartyIsOne && index==0"
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
                <el-select
                  v-model="driverOrAgentInfo.sex"
                  :disabled="relationWithPartyIsOne && index==0"
                >
                  <el-option value="0" label="男"></el-option>
                  <el-option value="1" label="女"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="itemThird">
              <el-form-item label="年龄">
                <el-input
                  v-model="driverOrAgentInfo.age"
                  type="number"
                  :disabled="relationWithPartyIsOne && index==0"
                ></el-input>
              </el-form-item>
            </div>
            <div class="itemThird">
              <el-form-item label="联系电话">
                <el-input
                  v-model="driverOrAgentInfo.tel"
                  :disabled="relationWithPartyIsOne && index==0"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div>
            <div class="itemBig">
              <el-form-item label="联系地址">
                <el-input
                  v-model="driverOrAgentInfo.adress"
                  :disabled="relationWithPartyIsOne && index==0"
                ></el-input>
              </el-form-item>
            </div>
            <div class="itemSmall">
              <el-form-item label="邮编">
                <el-input
                  v-model="driverOrAgentInfo.adressCode"
                  :disabled="relationWithPartyIsOne && index==0"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div>
            <div class="itemBig">
              <el-form-item label="工作单位">
                <el-input
                  v-model="driverOrAgentInfo.company"
                  :disabled="relationWithPartyIsOne && index==0"
                ></el-input>
              </el-form-item>
            </div>
            <div class="itemSmall">
              <el-form-item label="职位">
                <el-input
                  v-model="driverOrAgentInfo.position"
                  :disabled="relationWithPartyIsOne && index==0"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div>
            <div class="itemOne">
              <el-form-item label="从业资格证号">
                <el-input
                  v-model="driverOrAgentInfo.zigeNumber"
                  :disabled="relationWithPartyIsOne && index==0"
                ></el-input>
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
              <el-input v-model="inforForm.illegalLaw">
                <el-button slot="append" icon="el-icon-search" @click="showPunishDiag"></el-button>
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemOne">
            <el-form-item label="处罚依据">
              <el-input v-model="inforForm.punishLaw">
                <el-button slot="append" icon="el-icon-search" @click="showPunishDiag"></el-button>
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemOne" id="judgeFreedomBox">
            <!-- <el-form-item label="自由裁量标准">
              <el-input v-model="inforForm.discretionId"></el-input>
            </el-form-item>-->
            <p>自由裁量标准(违法程度/违法情节/建议处罚)</p>
            <ul>
              <li
                v-for="(item,index) in judgFreedomList"
                :key="index"
                :class="{activeJudgli : activeJudgli==item.drawerName}"
                @click="selectJudgFreedom(item)"
              >
                <div>{{item.drawerName}}</div>
                <div>{{item.wfqj}}</div>
                <div>{{item.jycf}}</div>
              </li>
            </ul>
            <!-- <el-table
              ref="multipleTable"
              :data="judgFreedomList"
              tooltip-effect="dark"
              style="width: 100%"
              class="judgFreedomTable"
              @selection-change="selectJudgFreedom"
            >
              <el-table-column type="selection"></el-table-column>
              <el-table-column prop="drawerName" label="违法程度"></el-table-column>
              <el-table-column prop="wfqj" label="违法情节"></el-table-column>
              <el-table-column prop="jycf" label="建议处罚"></el-table-column>
            </el-table>-->
          </div>
        </div>
        <div>
          <div class="itemOne">
            <el-form-item label="拟处罚金额">
              <el-input v-model="inforForm.tempPunishAmount"></el-input>
            </el-form-item>
          </div>
        </div>
        <el-button class="caseSubmitBtn" icon="el-icon-plus" @click="submitInfo(1)">提交</el-button>
        <el-button class="caseSubmitBtn caseSubmitBtn2" icon="el-icon-plus" @click="stageInfo">暂存</el-button>
      </div>
    </el-form>

    <chooseLawPerson ref="chooseLawPersonRef" @setLawPer="setLawPerson" @userList="getAllUserList"></chooseLawPerson>
    <punishDiag ref="punishDiagRef" @setIllegalLawAndPunishLaw="setIllegalLawAndPunishLaw"></punishDiag>
  </div>
</template>
<script>
import chooseLawPerson from "./chooseLawPerson";
import punishDiag from "./punishDiag";
import iLocalStroage from "@/js/localStroage";

export default {
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
      console.log(this.lawPersonListId)
      if (this.lawPersonListId.length<2) {
        return callback(new Error('执法人员不得少于2人'));
      }else if(this.lawPersonListId.length > 9){
        return callback(new Error('执法人员不得多于9人'));
      }
      callback();
    };
    return {
      inforForm: {
        caseSource: "", //案件来源
        caseSourceText: "", //案件来源后的
        afsj: "", //案发时间
        acceptTime: "", //受案时间
        caseCauseId: "", //违法行为id
        caseCauseName: "", //违法行为
        zfmlId:"", //执法门类ID
        zfml:"", //执法门类
        programType: "", //程序类型
        caseType: "", // 案件类型
        partyType: 1, //当事人类型
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
        punishLaw: "",
        discretionId: "",
        tempPunishAmount: "",
        organId: iLocalStroage.gets("userInfo").organId,
        caseTypeId: "",
        staffId: "",
        staff: "",
        certificateId: ""
      },
      rules: {
        caseSource: [{ required: true, message: "请选择", trigger: "change" }],
        acceptTime: [
          { required: true, message: "请选择时间", trigger: "change" }
        ],
        party: [
          // { required: true, message: "请输入", trigger: "blur" },
          { validator: validatePart, trigger: "blur" }
        ],
        partyName: [
          // { required: true, message: "请输入", trigger: "blur" },
          { validator: validatePartName, trigger: "blur" }
        ],
        lawPersonListId:[
          // { required: true, message: "", trigger: "blur" },
          { validator: validateLawPersonNumber, trigger: "change" }
        ]
        // relationWithCase: [
        //   { required: true, message: "请选择", trigger: "change" }
        // ]
      },
      //案件类型
      allcaseSource: [
        { value: "行政检查", label: "行政检查" },
        { value: "投诉举报", label: "投诉举报" },
        { value: "上级交办", label: "上级交办" },
        { value: "下级报请", label: "下级报请" },
        { value: "部门移送", label: "部门移送" },
        { value: "其他途径", label: "其他途径" }
      ],
      //证件类型
      credentialType: [
        { value: "0", label: "身份证" },
        { value: "1", label: "护照" }
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
      showTrailer: false, //是否显示挂车信息
      judgFreedomList: [], //自由裁量列表
      caseSourceTextDisable: false,
      relationWithPartyIsOne: false, //与当事人关系是否为同一人
      activeJudgli: "",
      showOverrun: false, //显示超限信息锚点
      lawPersonListId: "",
      currentUserLawId: ""
    };
  },
  components: {
    chooseLawPerson,
    punishDiag
  },
  methods: {
    //更改案件来源
    changeCaseSource(val) {
      console.log(val);
      if (val == "行政检查" || val == "投诉举报") {
        this.caseSourceTextDisable = true;
      } else {
        this.caseSourceTextDisable = false;
      }
    },
    //选择执法人员
    addLawPerson() {
      console.log(this.lawPersonListId);
      this.$refs.chooseLawPersonRef.showModal(this.lawPersonListId,this.alreadyChooseLawPerson);
    },
    //设置执法人员
    setLawPerson(userlist) {
      console.log(userlist);
      // this.lawPersonList = userlist;
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
       this.inforForm.staffId =  staffIdArr.join(',');
       this.inforForm.staff =  staffArr.join(',');
       this.inforForm.certificateId =  certificateIdArr.join(',');
    },
    //默认设置执法人员为当前用户 需要用用户的id去拿他作为执法人员的id
    setLawPersonCurrentP() {
      this.$store
        .dispatch("findLawOfficerList", iLocalStroage.gets("userInfo").organId)
        .then(
          res => {
            this.userList = res.data;
            let currentUserData = {};
            this.lawPersonListId = [];
            this.alreadyChooseLawPerson = [];
            
            res.data.forEach(item => {
              if (
                item.lawOfficerName == iLocalStroage.gets("userInfo").username
              ) {
                currentUserData.id = item.id;
                currentUserData.lawOfficerName = item.lawOfficerName;
                currentUserData.selectLawOfficerCard = item.lawOfficerCards.split(",")[0]
                this.lawPersonListId.push(currentUserData.id);
                this.alreadyChooseLawPerson.push(currentUserData);
                this.currentUserLawId = currentUserData.id;
              }
            });
          },
          err => {
            console.log(err);
          }
        );
    },
    removeLawPersontag(val) {
      console.log(val);
      if (this.currentUserLawId == val) {
        this.lawPersonListId.push(val);
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
        this.inforForm.partyZipCode = "";
        this.inforForm.partyUnitPosition = "";
        this.inforForm.occupation = "";
        this.inforForm.partyEcertId = "";
      }
    },
    //更改与当事人关系   为同一人时自动赋值且不可编辑
    changeRelationWithParty(val) {
      console.log(val);
      if (val == "0") {
        console.log(val);
        this.driverOrAgentInfoList[0].name = this.inforForm.party;
        this.driverOrAgentInfoList[0].zhengjianType = this.inforForm.partyIdType;
        this.driverOrAgentInfoList[0].sex = this.inforForm.partySex;
        this.driverOrAgentInfoList[0].age = this.inforForm.partyAge;
        this.driverOrAgentInfoList[0].tel = this.inforForm.partyTel;
        this.driverOrAgentInfoList[0].adress = this.inforForm.partyAddress;
        this.driverOrAgentInfoList[0].adressCode = this.inforForm.partyZipCode;
        this.driverOrAgentInfoList[0].company = this.inforForm.partyUnitPosition;
        this.driverOrAgentInfoList[0].position = this.inforForm.occupation;
        this.driverOrAgentInfoList[0].zigeNumber = this.inforForm.partyEcertId;
        this.relationWithPartyIsOne = true;
      } else {
        this.relationWithPartyIsOne = false;
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
    showPunishDiag() {
      let data = {
        caseCauseId: this.inforForm.caseCauseId,
        caseCauseName: this.inforForm.caseCauseName
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
      if (this.activeJudgli == item.drawerName) {
        this.activeJudgli = "";
        this.inforForm.discretionId = "";
      } else {
        this.activeJudgli = item.drawerName;
        this.inforForm.discretionId = item.id;
      }
    },
    toNextPart() {},
    jump(index) {
      if (index == 2) {
        // let a = document.getElementById('title2').ffsetTop;
        // console.log("a",a);
      }
    },
    //提交信息
    submitInfo(state) {
      // this.searchLawPerson();
      // console.log('searchLawPerson', this.allUserList)
      // console.log("lawPersonList", this.lawPersonList)

      this.$refs["inforForm"].validate(valid => {
        if (valid) {
          // let submitData = {
          //   caseSource: this.inforForm.caseSource,
          //   inforForm: this.inforForm.inforForm,
          //   afsj: this.inforForm.afsj,
          //   acceptTime: this.inforForm.acceptTime,
          //   caseCauseId: this.inforForm.caseCauseId,
          //   caseCauseName: this.inforForm.caseCauseName,
          //   programType: this.inforForm.programType,
          //   caseType: this.inforForm.caseType,
          //   lawPersonList: this.inforForm.lawPersonList,
          //   partyType: this.inforForm.partyType,
          //   party: this.inforForm.party,
          //   partyIdType: this.inforForm.partyIdType,
          //   partyIdNo: this.inforForm.partyIdNo,
          //   partySex: this.inforForm.partySex,
          //   partyAge: this.inforForm.partyAge,
          //   partyTel: this.inforForm.partyTel,
          //   partyAddress: this.inforForm.partyAddress,
          //   partyZipCode: this.inforForm.partyZipCode,
          //   partyUnitPosition: this.inforForm.partyUnitPosition,
          //   occupation: this.inforForm.occupation,
          //   partyEcertId: this.inforForm.partyEcertId,
          //   partyName: this.inforForm.partyName,
          //   partyUnitTel: this.inforForm.partyUnitTel,
          //   socialCreditCode: this.inforForm.socialCreditCode,
          //   roadTransportLicense: this.inforForm.roadTransportLicense,
          //   partyManager: this.inforForm.partyManager,
          //   partyManagerPositions: this.inforForm.partyManagerPositions,
          //   partyUnitAddress: this.inforForm.partyUnitAddress,
          //   vehicleShipId: this.inforForm.vehicleShipId,
          //   vehicleIdColor: this.inforForm.vehicleIdColor,
          //   vehicleShipType: this.inforForm.vehicleShipType,
          //   brand: this.inforForm.brand,
          //   ccertId: this.inforForm.ccertId,
          //   trailerIdNo: this.inforForm.trailerIdNo,
          //   trailerColor: this.inforForm.trailerColor,
          //   trailerType: this.inforForm.trailerType,
          //   trailerBrand: this.inforForm.trailerBrand,
          //   trailerCcertId: this.inforForm.trailerCcertId,
          //   caseCauseNameCopy: this.inforForm.caseCauseNameCopy,
          //   illegalLaw: this.inforForm.illegalLaw,
          //   punishLaw: this.inforForm.punishLaw,
          //   agentPartyEcertId:JSON.stringify(this.driverOrAgentInfoList),
          //   discretionId:this.inforForm.discretionId
          // };
          this.inforForm.agentPartyEcertId = JSON.stringify(
            this.driverOrAgentInfoList
          );
          console.log(this.inforForm)
          this.inforForm.state = state;
          this.inforForm.caseStatus = '未立案';
          this.$store
            .dispatch("saveOrUpdateCaseBasicInfo", this.inforForm)
            .then(
              res => {
                console.log(res);
                this.$message({
                  type: "success",
                  message: "提交成功!"
                });
                this.$store.dispatch("deleteTabs", this.$route.name);
                this.$store.commit("setCaseId", res.data.id);
                this.$router.replace({
                  name: "establish"
                });
              },
              err => {
                console.log(err);
              }
            );
        }
      });
    },
    //查询执法人员
    getAllUserList(list) {
      console.log("list", list);
      this.allUserList = list;
      setTimeout(() => {}, 100);
    },
    stageInfo() {}
  },
  mounted() {
    let someCaseInfo = iLocalStroage.gets("someCaseInfo");
    console.log(someCaseInfo);
    this.inforForm.caseCauseName = someCaseInfo.illageAct;
    this.inforForm.caseCauseNameCopy = someCaseInfo.illageAct;
    this.inforForm.caseCauseId = someCaseInfo.illageActId;
    this.inforForm.programType = someCaseInfo.programType;
    this.inforForm.caseType = someCaseInfo.caseType;
    this.inforForm.caseTypeId = someCaseInfo.caseTypeId;
    this.inforForm.zfmlId = someCaseInfo.cateId;
    this.inforForm.zfml = someCaseInfo.cateName;

    this.showOverrun =
      someCaseInfo.illageAct == "车辆在公路上擅自超限行驶" ? true : false;
  },
  created() {
    this.findJudgFreedomList();
    // this.setLawPerson(
    //   [iLocalStroage.gets('userInfo').username]
    // )
    this.setLawPersonCurrentP();
  }
};
</script>
<style lang="less">
@import "../../../css/caseHandle/index.less";
</style>