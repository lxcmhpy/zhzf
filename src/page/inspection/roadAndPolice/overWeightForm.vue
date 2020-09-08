<template>
  <div id="inforCollectionBox">
    <div class="linkPart">
      <div class="linkPartCon">
        <a href="#" :class="activeA[0]? 'activeA' :''" @click="jump(1)" id="scrollDiv">车辆信息</a>
        <a href="#" :class="activeA[1]? 'activeA' :''" @click="jump(2)">驾驶人/企业信息</a>
        <a href="#" :class="activeA[2]? 'activeA' :''" @click="jump(3)">初检信息</a>
        <a href="#" :class="activeA[3]? 'activeA' :''" @click="jump(4)">卸载/复检记录</a>
        <a href="#" :class="activeA[4]? 'activeA' :''" @click="jump(5)">处罚决定</a>
      </div>
    </div>
    <el-form :model="carInfo" :rules="carInfoRules" ref="carInfo" label-width="100px" :disabled="isHandleCase" style="margin-top: 82px;">
      <div class="caseFormBac" id="link_1" ref="link_1" @mousewheel="scrool1">
        <p>车辆信息</p>
        <div>
          <div class="item">
            <el-form-item label="车牌颜色" prop="vehicleIdColor">
              <el-select v-model="carInfo.vehicleIdColor">
                <el-option v-for="(item,index) in allVehicleIdColor" :key="index" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="车辆号牌" prop="vehicleShipId">
              <el-input v-model="carInfo.vehicleShipId" placeholder="车辆号牌">
                <el-button slot="append" icon="el-icon-search" @click="searchNumber"></el-button>
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="item">
            <el-form-item label="车辆类型" prop="vehicleShipType">
              <el-select v-model="carInfo.vehicleShipType">
                <el-option v-for="(item,index) in allVehicleShipType" :key="index" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="道路运输证号" prop="transportNum">
              <el-input v-model="carInfo.transportNum"></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="item">
            <el-form-item label="车辆轴数" prop="axisNum">
              <el-select placeholder="请选择" v-model="carInfo.axisNum" @change="weightLimit('车辆轴数')">
                <el-option label="2" value="2"></el-option>
                <el-option label="3" value="3"></el-option>
                <el-option label="4" value="4"></el-option>
                <el-option label="5" value="5"></el-option>
                <el-option label="6" value="6"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="经营状态" prop="businessStatus">
              <el-input v-model="carInfo.businessStatus"></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemOne">
            <el-form-item label="经营范围" prop="businessScope">
              <el-input v-model="carInfo.businessScope"></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemOne">
            <el-form-item label="装载货物" prop="loadGoods">
              <el-input v-model="carInfo.loadGoods"></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="item">
            <el-form-item label="起止路线" prop="startPlace">
              <el-input v-model="carInfo.startPlace" placeholder="请输入装载货物起始点"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item prop="endPlace">
              <el-input v-model="carInfo.endPlace" placeholder="请输入装载货物终止点"></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="item">
            <el-form-item label="挂车号牌" prop="trailerIdNo">
              <el-input v-model="carInfo.trailerIdNo"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="挂车牌颜色" prop="trailerColor">
              <el-select v-model="carInfo.trailerColor" placeholder="请选择挂车号牌颜色">
                <el-option v-for="(item,index) in allVehicleIdColor" :key="index" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
    <el-form :model="drivePerson" :rules="drivePersonRules" ref="drivePerson" label-width="100px" :disabled="isHandleCase">
      <div class="caseFormBac" id="link_2" ref="link_2" @mousewheel="scrool2">
        <p>驾驶员/企业信息</p>
        <div>
          <div class="item">
            <el-form-item label="姓名" prop="party">
              <el-input ref="party" v-model="drivePerson.party"></el-input>
            </el-form-item>
          </div>
          <div class="item appendSelect">
            <el-form-item label="身份证号" prop="partyIdNo">
              <el-input ref="partyIdNo" placeholder="请输入身份证号" v-model="drivePerson.partyIdNo" class="input-with-select hasMargintop">
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="item">
            <el-form-item label="联系电话" prop="partyTel">
              <el-input ref="partyTel" v-model="drivePerson.partyTel"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="联系地址" prop="partyAddress">
              <el-input v-model="drivePerson.partyAddress"></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="item">
            <el-form-item label="职务" prop="occupation">
              <el-input v-model="drivePerson.occupation"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="企业名称" prop="partyUnitPosition">
              <el-input v-model="drivePerson.partyUnitPosition"></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemOne">
            <el-form-item label="执法人员" id="lawPersonBox" prop="lawPersonListId">
              <el-select ref="lawPersonListId" v-model="drivePerson.lawOfficer" multiple @remove-tag="removeLawPersontag">
                <el-option v-for="item in alreadyChooseLawPerson" :key="item.id" :label="item.lawOfficerName" :value="item.id" placeholder="请添加" :disabled="currentUserLawId==item.id?true:false"></el-option>
              </el-select>
              <el-button icon="el-icon-plus" @click="addLawPerson"></el-button>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
    <el-form :model="firstCheck" :rules="firstCheckRules" ref="firstCheck" label-width="100px" :disabled="isHandleCase">
      <div class="caseFormBac" id="link_3" ref="link_3" @mousewheel="scrool3">
        <p>初检记录</p>
        <div>
          <div class="itemOne">
            <el-form-item label="初测单号" prop="oddNumber">
              <el-input v-model="firstCheck.oddNumber">
                <template slot="append">查询</template>
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="item">
            <el-form-item label="车货总重" prop="totalWeight">
              <el-input v-model="firstCheck.totalWeight">
                <template slot="append">吨</template>
              </el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="车货限重" prop="weightLimit">
              <el-input v-model="firstCheck.weightLimit">
                <template slot="append">吨</template>
              </el-input>
            </el-form-item>
          </div>
          <!-- <div class="item">
            <el-form-item label="驱动轴" prop="axisType">
              <el-radio-group v-model="firstCheck.axisType">
                <el-radio label="单轴"></el-radio>
                <el-radio label="双轴"></el-radio>
              </el-radio-group>
            </el-form-item>
          </div> -->
        </div>
        <div>
          <div class="item">
            <el-form-item label="超限质量" prop="overWeight">
              <el-input v-model="firstCheck.overWeight">
                <template slot="append">吨</template>
              </el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="超限比例" prop="overRatio">
              <el-input v-model="firstCheck.overRatio">
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemThird">
            <el-form-item label="车货总长" prop="totalLength">
              <el-input v-model="firstCheck.totalLength" placeholder="/">
                <!-- <template slot="append">米</template> -->
              </el-input>
            </el-form-item>
          </div>
          <div class="itemThird">
            <el-form-item>
              <el-input v-model="firstCheck.lengthLimit" placeholder="/">
                <!-- <template slot="append">米</template> -->
              </el-input>
            </el-form-item>
          </div>
          <div class="itemThird">
            <el-form-item>
              <el-input v-model="firstCheck.overLength" placeholder="/">
                <!-- <template slot="append">米</template> -->
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemThird">
            <el-form-item label="车货总宽" prop="totalWide">
              <el-input v-model="firstCheck.totalWide" placeholder="/">
                <!-- <template slot="append">米</template> -->
              </el-input>
            </el-form-item>
          </div>
          <div class="itemThird">
            <el-form-item>
              <el-input v-model="firstCheck.widthLimit" placeholder="/">
                <!-- <template slot="append">米</template> -->
              </el-input>
            </el-form-item>
          </div>
          <div class="itemThird">
            <el-form-item>
              <el-input v-model="firstCheck.overWidth" placeholder="/">
                <!-- <template slot="append">米</template> -->
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemThird">
            <el-form-item label="车货总高" prop="totalHeight">
              <el-input v-model="firstCheck.totalHeight" placeholder="/">
                <!-- <template slot="append">米</template> -->
              </el-input>
            </el-form-item>
          </div>
          <div class="itemThird">
            <el-form-item>
              <el-input v-model="firstCheck.heightLimit" placeholder="/">
                <!-- <template slot="append">米</template> -->
              </el-input>
            </el-form-item>
          </div>
          <div class="itemThird">
            <el-form-item>
              <el-input v-model="firstCheck.overHeight" placeholder="/">
                <!-- <template slot="append">米</template> -->
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemOne">
            <el-form-item label="初检人员" id="lawPersonBox" prop="checkPerson">
              <el-select ref="lawPersonListId" v-model="firstCheck.checkPerson" multiple @remove-tag="removeLawPersontag">
                <el-option v-for="item in alreadyChooseLawPerson" :key="item.id" :label="item.lawOfficerName" :value="item.id" placeholder="请添加" :disabled="currentUserLawId==item.id?true:false"></el-option>
              </el-select>
              <el-button icon="el-icon-plus" @click="addLawPerson"></el-button>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemOne">
            <el-form-item label="初检结果" id="lawPersonBox" prop="checkResult">
              <el-radio-group v-model="firstCheck.checkResult">
                <el-radio :label="1">超限超载</el-radio>
                <el-radio :label="2">未超载</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
    <el-form :model="secondCheck" :rules="secondCheckRules" ref="secondCheck" label-width="100px" :disabled="isHandleCase">
      <div class="caseFormBac" id="link_4" ref="link_4" @mousewheel="scrool4">
        <p>卸载/复检记录</p>
        <div>
          <div class="itemOne">
            <el-form-item label="复检单号" prop="oddNumber">
              <el-input v-model="secondCheck.oddNumber">
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemOne">
            <el-form-item label="卸载方式" prop="unloadMode">
              <el-input v-model="secondCheck.unloadMode"></el-input>
              <!-- <el-select v-model="secondCheck.checkWorker">
                <el-option v-for="item in RecentCheckWorkers" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>-->
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="item">
            <el-form-item label="分装车辆" prop="fenPlateColor">
              <el-select v-model="secondCheck.fenPlateColor">
                <el-option v-for="(item,index) in allVehicleIdColor" :key="index" :label="item.name" :value="item.name"></el-option>
              </el-select>
              <!-- <el-autocomplete style="width: 100%" v-model="secondCheck.checkWorker" :fetch-suggestions="queryCheckWorker"></el-autocomplete> -->
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="分装车号" prop="fenPlate">
              <el-input v-model="secondCheck.fenPlate"></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="item">
            <el-form-item label="车辆类型" prop="fenCarType">
              <el-select v-model="secondCheck.fenCarType">
                <el-option v-for="item in allVehicleShipType" :key="item.value" :label="item.name" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="分装吨位" prop="fenTonnage">
              <el-input v-model="secondCheck.fenTonnage"></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="item">
            <el-form-item label="分装承运人" prop="fenPerson">
              <el-input v-model="secondCheck.fenPerson"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="身份证号" prop="IdCard">
              <el-input v-model="secondCheck.IdCard"></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="item">
            <el-form-item label="联系电话" prop="phone">
              <el-input ref="partyTel" v-model="secondCheck.phone"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="联系地址" prop="address">
              <el-input v-model="secondCheck.address"></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="item">
            <el-form-item label="复检质量" prop="secondCheckWeight">
              <el-input v-model="secondCheck.secondCheckWeight"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="卸载质量" prop="unloadWeight">
              <el-input v-model="secondCheck.unloadWeight"></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="item">
            <el-form-item label="超限比例" prop="overRatio">
              <el-input v-model="secondCheck.overRatio"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="复检结果" prop="checkResult">
              <el-input v-model="secondCheck.checkResult"></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemOne">
            <el-form-item label="执法人员" id="lawPersonBox" prop="checkPerson">
              <el-select ref="lawPersonListId" v-model="secondCheck.checkPerson" multiple @remove-tag="removeLawPersontag">
                <el-option v-for="item in alreadyChooseLawPerson" :key="item.id" :label="item.lawOfficerName" :value="item.id" placeholder="请添加" :disabled="currentUserLawId==item.id?true:false"></el-option>
              </el-select>
              <el-button icon="el-icon-plus" @click="addLawPerson"></el-button>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
    <div class="caseFormBac" id="link_5" ref="link_5" @mousewheel="scrool5">
      <p>处罚决定</p>
    </div>

    <chooseLawPerson ref="chooseLawPersonRef" @setLawPer="setLawPerson" @userList="getAllUserList"></chooseLawPerson>
    <!-- 置顶 -->
    <el-backtop target="#inforCollectionBox" :bottom="46" :right="0" :visibility-height="800" style="width: 58px;height: 58px;">
      <div class="back-ball">
        <svg t="1581647372853" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1939" width="18" height="22">
          <path d="M862.72 147.2H161.28c-18.432 0-33.28-14.848-33.28-33.28s14.848-33.28 33.28-33.28h701.44c18.432 0 33.28 14.848 33.28 33.28s-14.848 33.28-33.28 33.28zM549.376 323.84v580.608c0 21.504-17.408 38.912-38.912 38.912-21.504 0-38.912-17.408-38.912-38.912V323.84c0-21.504 17.408-38.912 38.912-38.912 21.504 0 38.912 17.408 38.912 38.912z" p-id="1940" fill="#bfbfbf" />
          <path d="M542.72 262.144L207.872 661.248c-13.824 16.384-38.4 18.688-54.784 4.864-16.384-13.824-18.688-38.4-4.864-54.784L483.072 212.224c13.824-16.384 38.4-18.688 54.784-4.864 16.384 13.824 18.688 38.4 4.864 54.784z" p-id="1941" fill="rgb(158, 167, 182)" />
          <path d="M481.28 262.144l334.848 398.848c13.824 16.384 38.4 18.688 54.784 4.864 16.384-13.824 18.688-38.4 4.864-54.784L540.928 212.224c-13.824-16.384-38.4-18.688-54.784-4.864-16.384 13.824-18.688 38.4-4.864 54.784z" p-id="1942" fill="rgb(158, 167, 182)" />
        </svg>
      </div>
    </el-backtop>
    <mapDiag ref="mapDiagRef" @getLngLat="getLngLat"></mapDiag>
    <!-- 悬浮按钮-拓展 -->
    <floatBtns :formOrDocData="formOrDocData" @submitFileData="submitFileData" @saveEileData="saveFileData" :fileEiditFlag='fileEiditFlag'></floatBtns>
  </div>
</template>
<script>
import util from "@/common/js/util";
import chooseLawPerson from "@/page/caseHandle/unRecordCase/chooseLawPerson";
import mapDiag from "@/page/caseHandle/case/form/inforCollectionPage/diag/mapDiag";
import floatBtns from './floatMenu.vue';
import iLocalStroage from "@/common/js/localStroage";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import {
  validateIDNumber,
  checkPassport,
  validateAge,
  validateZIP,
  validatePhone,
  vaildateCardNum,
} from "@/common/js/validator";
import {
  getDictListDetailByNameApi,
  findHistoryBySignApi,
  findRouteManageByOrganIdApi,
} from "@/api/system";
import {
  findJudgFreedomListApi,
  findLawOfficerListApi,
} from "@/api/caseHandle";

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
      if (this.lawPersonListId.length < 2) {
        return callback(new Error("执法人员不得少于2人"));
      } else if (this.lawPersonListId.length > 9) {
        return callback(new Error("执法人员不得多于9人"));
      }
      callback();
    };
    // 检验身份证
    var checkIdNoPassSort = (rule, value, callback) => {
      if (this.inforForm.partyIdType === "0") {
        // validateIDNumber
        var reg = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/;
        if (!reg.test(value) && value) {
          callback(new Error("身份证格式错误"));
        } else {
          if (this.changePartyIdType2Index) {
            this.changePartyIdType2(
              this.driverOrAgentInfo.zhengjianNumber,
              this.changePartyIdType2Index
            );
          } else {
            this.changePartyIdType(this.inforForm.partyIdNo);
          }
        }
        callback();
      }
      // else {
      //   var reg = /^((1[45]\d{7})|(G\d{8})|(P\d{7})|(S\d{7,8}))?$/
      //   if (!reg.test(value) && value) {
      //     callback(new Error('护照号码格式错误'));
      //   }
      //   callback();
      // }
    };
    //验证时间
    var validateTime = (rule, value, callback) => {
      let afsj = this.inforForm.afsj; // 案发时间
      let acceptTime = this.inforForm.acceptTime; // 受案时间
      if (Date.parse(afsj) > Date.parse(acceptTime) && this.inforForm.afsj) {
        return callback(new Error("案发时间不得晚于受案时间"));
      }
      callback();
    };
    return {
      changePartyIdType2Index: "",
      theStr: "", // 输入框长度到达设定值时输入框的内容
      recentCheckWorkers: [], //历史保存过检测人员
      vehicleTypeList: [], //车型
      vehicleAxlesTypeList: [], //轴数
      brandList: [], //品牌
      carInfo: {
        vehicleIdColor: '',
        vehicleShipId: '',
        vehicleShipType: '',
        transportNum: '',
        axisNum: '',
        businessStatus: '',
        businessScope: '',
        loadGoods: '',
        startPlace: '',
        endPlace: '',
        trailerIdNo: '',
        trailerColor: '',
      },
      drivePerson: {
        party: '',
        partyIdNo: '',
        partyTel: '',
        partyAddress: '',
        occupation: '',
        partyUnitPosition: '',
        lawOfficer: '',
      },
      firstCheck: {
        oddNumber: '',
        vehicleShipId: '',
        vehicleShipType: '',
        axisType: '',
        axisNum: '',
        totalWeight: '',
        weightLimit: '',
        overWeight: '',
        overRatio: '',
        totalLength: '',
        totalWide: '',
        totalHeight: '',
        checkResult: '1',
        checkPerson: '',
      },
      secondCheck: {
        oddNumber: '',
        unloadMode: '',
        fenPlateColor: '',
        fenTonnage: '',
        fenPlate: '',
        fenCarType: '',
        fenPerson: '',
        IdCard: '',
        phone: '',
        address: '',
        unloadWeight: '',
        secondCheckWeight: '',
        checkNumber: '',
        overRatio: '',
        checkPerson: '',
      },
      inforForm: {
        id: "", //案件id 修改时需要
        tempNo: "", //临时案号 修改时需要
        caseSource: "", //案件来源
        caseSourceText: "", //案件来源后的
        afsj: "", //案发时间
        acceptTime: new Date().format("yyyy-MM-dd HH:mm"), //受案时间
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
        provincesAddress: "",
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
          isBigTransfer: "否",
        },
        weightLimit: "",
        overWeight: "",
        routeId: "",
        direction: "",
        location: "",
        kilometre: "",
        metre: "",
      },
      routeList: [],
      directionList: [],
      locationList: [],
      carInfoRules: {
        vehicleIdColor: [{ required: true, message: "请选择", trigger: "change" }],
        loadGoods: [{ required: true, message: "请输入", trigger: "change" }],
        startPlace: [{ required: true, message: "请输入", trigger: "change" }],
        endPlace: [{ required: true, message: "请输入", trigger: "change" }],
      },
      drivePersonRules: {
        party: [
          // { required: true, message: "请输入", trigger: "blur" },
          { required: true, validator: validatePart, trigger: "blur" },
        ],
        partyTel: [{ required: true, message: "请输入", trigger: "change" },
        { validator: validatePhone, trigger: "blur" }],
        partyIdNo: [{ required: true, message: "请输入", trigger: "change" },
        { validator: checkIdNoPassSort, trigger: "blur" }],
        partyAddress: [{ required: true, message: "请输入", trigger: "change" }],
      },
      firstCheckRules: {
        totalWeight: [{ required: true, message: "请输入", trigger: "change" }],
        overRatio: [{ required: true, message: "请输入", trigger: "change" }],
        overWeight: [{ required: true, message: "请输入", trigger: "change" }],
        checkResult: [{ required: true, message: "请选择", trigger: "change" }],
      },
      secondCheckRules: {
        fenPlateColor: [{ required: true, message: "请选择", trigger: "change" }],
        fenPlate: [{ required: true, message: "请输入", trigger: "change" }],
        fenTonnage: [{ required: true, message: "请输入", trigger: "change" }],
        fenPerson: [{ required: true, message: "请输入", trigger: "change" }],
        IdCard: [{ required: true, message: "请输入", trigger: "change" }],
        secondCheckWeight: [{ required: true, message: "请输入", trigger: "change" }],
        unloadWeight: [{ required: true, message: "请输入", trigger: "change" }],
        overRatio: [{ required: true, message: "请输入", trigger: "change" }],
        checkResult: [{ required: true, message: "请输入", trigger: "change" }],
      },
      alreadyChooseLawPerson: [],
      partyTypePerson: "1", //判断要显示的部分
      allVehicleIdColor: [],//车牌颜色下拉框
      allVehicleShipType: [],
      isHandleCase: false,
      lawPersonListId: "",
      currentUserLawId: "",
      disableBtn: false, //提交暂存按钮的禁用
      activeA: [true, false, false, false, false],
      autoSava: true, //自动暂存
      allTrailerTypeType: [], //挂车类型,
      //案发地点标志
      afddFlag: false,
      disableZcBtn: false, //暂存按钮禁用
      hasLatitudeAndLongitude: false, //案发坐标是否已经获取
      fileEiditFlag: '',
      formOrDocData: '',
      submitFileData: '',
      saveEileData: '',
    };
  },
  components: {
    chooseLawPerson,
    mapDiag,
    floatBtns,
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(["caseId", "openTab", "caseHandle"]) },
  methods: {
    /**
     *
     * 控制输入框长度，一个汉字占两个字符，一个字母占一个，中文符号占两个，英文符号占一个
     */
    handleLength(val, type) {
      if (type === "partyName") {
        if (util.getCodeLength(val) === 40) {
          this.theStr = val;
        } else if (util.getCodeLength(val) > 40) {
          this.inforForm.partyName = this.theStr;
        }
      } else if (type === "partyManager") {
        if (util.getCodeLength(val) === 20) {
          this.theStr = val;
        } else if (util.getCodeLength(val) > 20) {
          this.inforForm.partyManager = this.theStr;
        }
      } else if (type === "partyManagerPositions") {
        if (util.getCodeLength(val) === 20) {
          this.theStr = val;
        } else if (util.getCodeLength(val) > 20) {
          this.inforForm.partyManagerPositions = this.theStr;
        }
      } else if (type === "partyUnitAddress") {
        if (util.getCodeLength(val) === 60) {
          this.theStr = val;
        } else if (util.getCodeLength(val) > 60) {
          this.inforForm.partyUnitAddress = this.theStr;
        }
      }
    },

    //选择执法人员
    addLawPerson() {
      this.$refs.chooseLawPersonRef.showModal(
        this.lawPersonListId,
        this.alreadyChooseLawPerson
      );
    },
    //设置执法人员
    setLawPerson(userlist) {
      console.log("选择的执法人员", userlist);
      // this.lawPersonList = userlist;
      this.alreadyChooseLawPerson = userlist;
      this.lawPersonListId = [];
      let staffIdArr = [];
      let staffArr = [];
      let certificateIdArr = [];

      this.alreadyChooseLawPerson.forEach((item) => {
        this.lawPersonListId.push(item.id);
        //给表单数据赋值
        staffIdArr.push(item.id);
        staffArr.push(item.lawOfficerName);
        certificateIdArr.push(item.selectLawOfficerCard);
      });
      this.inforForm.staffId = staffIdArr.join(",");
      this.inforForm.staff = staffArr.join(",");
      this.inforForm.certificateId = certificateIdArr.join(",");
    },
    //默认设置执法人员为当前用户 需要用用户的id去拿他作为执法人员的id
    setLawPersonCurrentP() {
      let _this = this;
      this.$store
        .dispatch("findLawOfficerList", iLocalStroage.gets("userInfo").organId)
        .then(
          (res) => {
            console.log("执法人员列表", res);
            _this.userList = res.data;
            let currentUserData = {};
            _this.lawPersonListId = [];
            _this.alreadyChooseLawPerson = [];

            res.data.forEach((item) => {
              if (item.userId == iLocalStroage.gets("userInfo").id) {
                currentUserData.id = item.id;
                currentUserData.lawOfficerName = item.lawOfficerName;
                currentUserData.selectLawOfficerCard = item.lawOfficerCards.split(
                  ","
                )[0];
                _this.alreadyChooseLawPerson.push(currentUserData);
                _this.lawPersonListId.push(currentUserData.id);
                _this.currentUserLawId = currentUserData.id;
                _this.inforForm.staff = item.lawOfficerName;
                _this.inforForm.staffId = item.id;
              }
            });
          },
          (err) => {
            console.log(err);
          }
        );
    },
    removeLawPersontag(val) {
      if (this.currentUserLawId == val) {
        this.lawPersonListId.push(val);
        this.$message("该执法人员不能删除！");
      }
    },

    //点击滚动
    jump(index) {
      this.activeA = [false, false, false, false, false];
      this.activeA[index - 1] = true;
      if (index >= 1) {
        let numTotal = 0;
        for (let i = 0; i < index; i++) {
          let elPageOt = this.$el.querySelector(`#link_${i}`)
            ? this.$el.querySelector(`#link_${i}`).offsetHeight
            : 0;
          numTotal += elPageOt;
        }
        document.getElementById("inforCollectionBox").scrollTop = numTotal;
      }
    },
    //提交信息
    submitInfo(state) {

    },
    //查询执法人员
    getAllUserList(list) {
      console.log("list", list);
      this.allUserList = list;
    },
    stageInfo(state) {

    },
    //处理数据回显问题
    handleCaseData(data) {

      //设置执法人员
      this.alreadyChooseLawPerson = [];
      let staffNameList = data.staff.split(",");
      let staffIdList = data.staffId.split(",");
      let staffCertificateIdList = data.certificateId.split(",");
      this.lawPersonListId = staffIdList;
      staffIdList.forEach((item, index) => {
        let newlaw = {
          id: item,
          lawOfficerName: staffNameList[index],
          lawOfficerCards: staffCertificateIdList[index],
        };
        this.alreadyChooseLawPerson.push(newlaw);
      });
      //设置当前执法人员不可以删除
      findLawOfficerListApi(iLocalStroage.gets("userInfo").organId)
        .then((res) => {
          console.log("res", res);
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].userId == iLocalStroage.gets("userInfo").id) {
              this.currentUserLawId = res.data[i].id;
              break;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    blur2(val) {
      var reg = /(^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$)|(^((\d3)|(\d{3}\-))?(1[358]\d{9})$)/;
      if (!reg.test(val) && val) {
        this.$message("手机号不正确");
      }
      // callback();
    },
    blur3(val) {
      var reg = /^\d{6}$/;
      if (!reg.test(val) && val) {
        this.$message("请输入正确的6位邮编");
      }
    },

    //检测人员 可输入也可以选择
    queryCheckWorker(queryString, cb) {
      let checkWorker = this.recentCheckWorkers;
      var results = queryString
        ? checkWorker.filter(this.createFilter(queryString, checkWorker))
        : checkWorker;
      let a = [];
      results.forEach((item) => {
        a.push({ value: item.inputValue });
      });
      cb(a);
    },
    //查找路线
    findRouteManageByOrganId() {
      let data = { organId: iLocalStroage.gets("userInfo").organId };
      findRouteManageByOrganIdApi(data).then(
        (res) => {
          console.log("路线", res);
          this.routeList = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
    },

    // 锚点回显-start
    scrool1() {
      let scrolled = this.$refs.link_1.scrollTop;
      this.activeA = [true, false, false, false, false];
    },
    scrool2() {
      let scrolled = this.$refs.link_1.scrollTop;
      this.activeA = [false, true, false, false, false];
    },
    scrool3() {
      let scrolled = this.$refs.link_1.scrollTop;
      this.activeA = [false, false, true, false, false];
    },
    scrool4() {
      let scrolled = this.$refs.link_1.scrollTop;
      this.activeA = [false, false, false, true, false];
    },
    scrool5() {
      let scrolled = this.$refs.link_1.scrollTop;
      this.activeA = [false, false, false, false, true];
    },
    // 锚点回显-end
    createFilter(queryString, data) {
      return (data) => {
        return (
          data.inputValue.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    //显示地图
    showMap() {
      this.$refs.mapDiagRef.showModal();
    },
    //获取坐标
    getLngLat(lngLatStr, address) {
      this.inforForm.latitudeAndLongitude = lngLatStr;
      this.inforForm.afdd = address;
      this.hasLatitudeAndLongitude = true;
    },
    getDrawerList(data) {
      let _this = this
      data.forEach(element => {
        getDictListDetailByNameApi(element.name).then(
          res => {
            switch (element.option) {
              case 1: _this.allVehicleIdColor = res.data; break;//车牌颜色
              case 2: _this.allVehicleShipType = res.data; break;//车辆类型
            }
          },
          error => {
            // reject(error);
          })
      });

    },
    weightLimit() { },
    saveFileData() { },
    searchNumber() {
      // 查询车辆号牌
    },
  },

  mounted() {
    this.getDrawerList([
      { name: '车牌颜色', option: 1 },
      { name: '车辆类型', option: 2 }])

    // 鼠标滚动
    this.$refs.link_1.addEventListener("scroll", this.scrool1);
    this.$refs.link_2.addEventListener("scroll", this.scrool2);
    this.$refs.link_3.addEventListener("scroll", this.scrool3);
    this.$refs.link_4.addEventListener("scroll", this.scrool4);
    this.$refs.link_5.addEventListener("scroll", this.scrool5);
  },
  created() {
    this.findRouteManageByOrganId();
  },
  beforeRouteLeave(to, from, next) {
    console.log("to", to);
    console.log("from", from);
    console.log("next", next);
    console.log("this.autoSava", this.autoSava);
    if (this.autoSava && to.name != "login") {
      //退出登录不自动暂存
      // this.stageInfo(0);
    }

    next((vm) => {
      console.log(vm);
    });
  },

};
</script>
<style lang="scss" src="@/assets/css/caseHandle/index.scss">
</style>
<style lang="scss">
.error-color {
  color: #ff6600;
}
</style>
