<template>
  <div id="inforCollectionBox">
    <div class="linkPart">
      <div class="linkPartCon">
        <a :class="activeA[0]? 'activeA' :''" @click="jump(1)" id="scrollDiv">案件情况</a>
        <a :class="activeA[1]? 'activeA' :''" @click="jump(2)">当事人</a>
        <a :class="activeA[2]? 'activeA' :''" @click="jump(3)">车辆信息</a>
        <a :class="activeA[3]? 'activeA' :''" v-if="showOverrun" @click="jump(4)">超限信息</a>
        <!-- <a :class="activeA[3]? 'activeA' :''" @click="jump(4)">超限信息</a> -->
        <a :class="activeA[4]? 'activeA' :''" @click="jump(5)">违法事实</a>
      </div>
    </div>
    <el-form :model="inforForm" :rules="rules" ref="inforForm" class="caseInfoForm" label-width="100px"
             :disabled="isHandleCase">
      <div class="caseFormBac" id="link_1" ref="link_1" @mousewheel="scrool1">
        <p>案件情况</p>
        <div>
          <div class="item">
            <el-form-item label="案件来源" prop="caseSource">
              <el-select ref="caseSource" v-model="inforForm.caseSource" placeholder="请选择" @change="changeCaseSource">
                <el-option v-for="item in allcaseSource" :key="item.value" :label="item.label"
                           :value="item"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="item hasMargintop">
            <el-form-item prop="caseSourceText">
              <el-input ref="caseSourceText" v-model="inforForm.caseSourceText" v-show="caseSourceTextDisable"
                        :placeholder="caseSourceTextPla"></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="item">
            <el-form-item label="案发时间">
              <el-date-picker v-model="inforForm.afsj" type="datetime" format="yyyy-MM-dd HH:mm"
                              value-format="yyyy-MM-dd HH:mm"></el-date-picker>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="受案时间" prop="acceptTime">
              <el-date-picker v-model="inforForm.acceptTime" type="datetime" format="yyyy-MM-dd HH:mm"
                              value-format="yyyy-MM-dd HH:mm"></el-date-picker>
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
          <div class="itemOne" v-if="!afddFlag">
            <el-form-item label="案发地点">
              <el-input v-model="inforForm.afdd"></el-input>
            </el-form-item>
          </div>
          <label v-if="afddFlag" class="el-form-item__label" style="width: 100px;">案发地点</label>
          <div class="itemFive">
            <el-form-item v-if="afddFlag" label-width="0">
              <el-select v-model="inforForm.routeId" placeholder="本机构路线编号" filterable allow-create>
                <el-option v-for="item in routeList" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="itemFive">
            <el-form-item v-if="afddFlag" label-width="20px">
              <el-select v-model="inforForm.direction" placeholder="方向">
                <el-option v-for="item in locationList" :key="item.name" :label="item.label"
                           :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="itemFive">
            <el-form-item v-if="afddFlag" label-width="20px">
              <el-select v-model="inforForm.location" placeholder="位置">
                <el-option v-for="item in directionList" :key="item.name" :label="item.label"
                           :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="itemFive">
            <el-form-item v-if="afddFlag" label="K">
              <el-input v-model="inforForm.kilometre" placeholder="公里数"></el-input>
            </el-form-item>
          </div>
          <div class="itemFive">
            <el-form-item v-if="afddFlag" label="+" label-width="30px">
              <el-input v-model="inforForm.metre" placeholder="米数" style="vertical-align: middle;">
                <template slot="append">m</template>
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemOne">
            <el-form-item label="执法人员" id="lawPersonBox" prop="lawPersonListId">
              <!-- <el-input> -->
              <el-select ref="lawPersonListId" v-model="lawPersonListId" multiple @remove-tag="removeLawPersontag">
                <el-option v-for="item in alreadyChooseLawPerson" :key="item.id" :label="item.lawOfficerName"
                           :value="item.id" placeholder="请添加"
                           :disabled="currentUserLawId==item.id?true:false"></el-option>
              </el-select>
              <el-button icon="el-icon-plus" @click="addLawPerson"></el-button>
              <!-- </el-input> -->
            </el-form-item>
          </div>
        </div>
      </div>

      <div class="caseFormBac" id="link_2" ref="link_2" @mousewheel="scrool2">
        <p>当事人信息</p>
        <div>
          <div class="itemOne">
            <el-form-item label="当事人类型">
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
              <el-input ref="party" v-model="inforForm.party"></el-input>
            </el-form-item>
          </div>
          <div class="item appendSelect">
            <el-form-item label="证件类型" prop="partyIdNo">
              <el-input ref="partyIdNo" placeholder="请输入内容" v-model="inforForm.partyIdNo"
                        @change="changePartyIdType(inforForm.partyIdNo)" class="input-with-select hasMargintop">
                <el-select slot="prepend" v-model="inforForm.partyIdType">
                  <el-option v-for="item in credentialType" :key="item.value" :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div v-show="partyTypePerson=='1'">
          <div class="itemThird">
            <el-form-item label="性别">
              <el-select placeholder="请选择" v-model="inforForm.partySex" :disabled="inforForm.partyIdNo?true:false">
                <el-option :value="0" label="男"></el-option>
                <el-option :value="1" label="女"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="itemThird">
            <el-form-item label="年龄" prop="partyAge">
              <el-input ref="partyAge" v-model="inforForm.partyAge" type="number"
                        :disabled="inforForm.partyIdNo?true:false"
                        @change="noFue('inforForm.partyAge',inforForm.partyAge)"></el-input>
            </el-form-item>
          </div>
          <div class="itemThird">
            <el-form-item label="联系电话" prop="partyTel">
              <el-input ref="partyTel" v-model="inforForm.partyTel"></el-input>
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
            <el-form-item label="邮编" prop="partyZipCode">
              <el-input ref="partyZipCode" v-model="inforForm.partyZipCode"
                        @blur="blur3($event.target.value)"></el-input>
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
              <el-input ref="partyName" v-model="inforForm.partyName" maxlength="40"></el-input>
            </el-form-item>
          </div>
          <div class="itemSmall">
            <el-form-item label="联系电话" prop="partyUnitTel">
              <el-input ref="partyUnitTel" v-model="inforForm.partyUnitTel"></el-input>
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
            <el-form-item label="职务">
              <el-input v-model="inforForm.partyManagerPositions" maxlength="20"></el-input>
            </el-form-item>
          </div>
          <div class="itemBig">
            <el-form-item label="法定代表人">
              <el-input v-model="inforForm.partyManager" maxlength="20"></el-input>
            </el-form-item>
          </div>
        </div>
        <div v-show="partyTypePerson!='1'">
          <div class="itemOne">
            <el-form-item label="地址">
              <el-input v-model="inforForm.partyUnitAddress" maxlength="40"></el-input>
            </el-form-item>
          </div>
        </div>
        <!-- 分隔线 -->
        <div class="line"></div>
        <p>驾驶人或代理人</p>
        <div class="driverOrAgentBox" v-for="(driverOrAgentInfo,index) in driverOrAgentInfoList" :key="index">
          <div>
            <div class="item">
              <el-form-item label="与当事人关系">
                <el-select v-model="driverOrAgentInfo.relationWithParty" @change="changeRelationWithParty(index)">
                  <el-option v-for="item in index === 0?allRelationWithParty:allRelationWithParty_" :key="item.value"
                             :label="item.label" :value="item.label"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="item">
              <!-- 需要完善验证 -->
              <el-form-item label="与案件关系" class="is-required">
                <el-select v-model="driverOrAgentInfo.relationWithCase"
                           :disabled="index==0&&relationWithPartyIsOne[index]">
                  <el-option v-for="item in allRelationWithCase" :key="item.value" :label="item.label"
                             :value="item.label"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div>
            <div class="item">
              <el-form-item label="姓名">
                <el-input v-model="driverOrAgentInfo.name"
                          :disabled="index==0&&relationWithPartyIsOne[index]"></el-input>
              </el-form-item>
            </div>
            <div class="item appendSelect">
              <el-form-item label="证件类型" prop="partyIdNo">
                <el-input ref="partyIdNo" placeholder="请输入内容" v-model="driverOrAgentInfo.zhengjianNumber"
                          @change="changePartyIdType2(driverOrAgentInfo.zhengjianNumber,index)"
                          class="input-with-select hasMargintop" :disabled="index==0&&relationWithPartyIsOne[index]">
                  <el-select slot="prepend" v-model="driverOrAgentInfo.zhengjianType"
                             :disabled="index==0&&relationWithPartyIsOne[index]">
                    <el-option v-for="item in credentialType" :key="item.value" :label="item.label" :value="item.value"
                               :disabled="index==0&&relationWithPartyIsOne[index]"></el-option>
                  </el-select>
                </el-input>
              </el-form-item>
            </div>
          </div>
          <div>
            <div class="itemThird">
              <el-form-item label="性别">
                <el-select v-model="driverOrAgentInfo.sex" :disabled="index==0&&relationWithPartyIsOne[index]">
                  <el-option :value="0" label="男"></el-option>
                  <el-option :value="1" label="女"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="itemThird">
              <el-form-item label="年龄">
                <el-input v-model="driverOrAgentInfo.age" type="number"
                          :disabled="index==0&&relationWithPartyIsOne[index]"
                          @change="noFueA(driverOrAgentInfo.age)"></el-input>
              </el-form-item>
            </div>
            <div class="itemThird">
              <el-form-item label="联系电话">
                <el-input v-model="driverOrAgentInfo.tel" :disabled="index==0&&relationWithPartyIsOne[index]"
                          @blur="blur2($event.target.value)"></el-input>
              </el-form-item>
            </div>
          </div>
          <div>
            <div class="itemBig">
              <el-form-item label="联系地址">
                <el-input v-model="driverOrAgentInfo.adress"
                          :disabled="index==0&&relationWithPartyIsOne[index]"></el-input>
              </el-form-item>
            </div>
            <div class="itemSmall">
              <el-form-item label="邮编">
                <el-input v-model="driverOrAgentInfo.adressCode" :disabled="index==0&&relationWithPartyIsOne[index]"
                          @blur="blur3($event.target.value)"></el-input>
              </el-form-item>
            </div>
          </div>
          <div>
            <div class="itemBig">
              <el-form-item label="工作单位">
                <el-input v-model="driverOrAgentInfo.company"
                          :disabled="index==0&&relationWithPartyIsOne[index]"></el-input>
              </el-form-item>
            </div>
            <div class="itemSmall">
              <el-form-item label="职位">
                <el-input v-model="driverOrAgentInfo.position"
                          :disabled="index==0&&relationWithPartyIsOne[index]"></el-input>
              </el-form-item>
            </div>
          </div>
          <div>
            <div class="itemOne">
              <el-form-item label="从业资格证号">
                <el-input v-model="driverOrAgentInfo.zigeNumber"
                          :disabled="index==0&&relationWithPartyIsOne[index]"></el-input>
              </el-form-item>
            </div>
          </div>
          <!-- 分隔线 -->
          <div class="line" v-if="index<driverOrAgentInfoList.length-1"></div>
        </div>
        <div class="buttonBox">
          <el-button type="primary" size="medium" icon="el-icon-plus" @click="addDriverOrAgent">添加其他人</el-button>
        </div>
      </div>

      <div class="caseFormBac" id="link_3" ref="link_3" @mousewheel="scrool3">
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
                <el-option v-for="item in allVehicleIdColor" :key="item.value" :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="item">
            <el-form-item label="车辆类型">
              <el-select v-model="inforForm.vehicleShipType">
                <el-option v-for="item in allVehicleShipType" :key="item.value" :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="品牌">
              <!--<el-input v-model="inforForm.brand"></el-input>-->
              <el-autocomplete style="width: 100%" v-model="inforForm.brand"
                               :fetch-suggestions="queryBrand"></el-autocomplete>
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
              <el-select v-model="inforForm.trailerColor" disabled>
                <el-option v-for="item in allVehicleIdColor" :key="item.value" :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div v-if="showTrailer">
          <div class="item">
            <el-form-item label="挂车类型">
              <el-select v-model="inforForm.trailerType">
                <el-option v-for="item in allTrailerTypeType" :key="item.id" :label="item.name"
                           :value="item.name"></el-option>
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
      <div class="caseFormBac" id="link_4" v-if="showOverrun" ref="link_4" @mousewheel="scrool4">
        <p>超限信息</p>
        <div>
          <div class="itemBig">
            <el-form-item label="检测站" class="is-required">
              <el-autocomplete style="width: 100%" v-model="inforForm.otherInfo.checkStastions"
                               :fetch-suggestions="querySearch"></el-autocomplete>
            </el-form-item>
          </div>
          <div class="itemSmall">
            <el-form-item label="检测单号">
              <el-input v-model="inforForm.otherInfo.checkNumber">
                <el-button slot="append" icon="el-icon-search" @click="showPunishDiag"></el-button>
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemBig">
            <el-form-item label="检测人员">
              <el-autocomplete style="width: 100%" v-model="inforForm.otherInfo.checkWorker"
                               :fetch-suggestions="queryCheckWorker"></el-autocomplete>
              <!-- <el-select v-model="inforForm.otherInfo.checkWorker">
                <el-option v-for="item in RecentCheckWorkers" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>-->
              <!-- <el-input v-model="inforForm.otherInfo.checkWorker"></el-input> -->
            </el-form-item>
          </div>
          <div class="itemSmall">
            <el-form-item label="检测时间" prop="checkTime">
              <el-date-picker ref="checkTime" v-model="inforForm.otherInfo.checkTime" type="datetime"
                              format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemBig">
            <el-form-item label="装载物" prop="vehiclefiledThing">
              <el-input ref="vehiclefiledThing" v-model="inforForm.otherInfo.vehiclefiledThing"></el-input>
            </el-form-item>
          </div>
          <div class="itemSmall">
            <el-form-item label="是否为大件运输" label-width="110px">
              <el-radio-group v-model="inforForm.otherInfo.isBigTransfer">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemThird">
            <el-form-item label="车辆轴数" class="is-required">
              <el-select placeholder="请选择" v-model="inforForm.otherInfo.vehicleAxleNumber"
                         @change="weightLimit('车辆轴数')">
                <el-option label="2" value="2"></el-option>
                <el-option label="3" value="3"></el-option>
                <el-option label="4" value="4"></el-option>
                <el-option label="5" value="5"></el-option>
                <el-option label="6" value="6"></el-option>

              </el-select>
            </el-form-item>
          </div>
          <div class="itemThird">
            <el-form-item label="车型" class="is-required">
              <el-select placeholder="请选择" v-model="inforForm.otherInfo.vehicleType" @change="weightLimit('车型')">
                <el-option v-for="item in vehicleTypeList" :key="item.value" :label="item.label"
                           :value="item.value"></el-option>
                <!-- <el-option label="中置轴挂车列车"></el-option>
                <el-option label="铰列车"></el-option>
                <el-option label="全挂汽车列车"></el-option> -->
              </el-select>
            </el-form-item>
          </div>
          <div class="itemThird">
            <el-form-item label="轴数分布" class="is-required">
              <el-select placeholder="请选择" v-model="inforForm.otherInfo.vehicleAxlesType" @change="weightLimit"
                         @input="concludeOverWeight">
                <el-option v-for="item in vehicleAxlesTypeList" :key="item.value" :label="item.label"
                           :value="item.value"></el-option>
                <!-- <el-option label="1+2+3"></el-option>
                <el-option label="2+2+2"></el-option> -->
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="item">
            <el-form-item label="车货总重" class="is-required">
              <el-input v-model="inforForm.otherInfo.allWeight" @input="concludeOverWeight">
                <template slot="append">吨</template>
              </el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="驱动轴" v-show="inforForm.otherInfo.vehicleAxleNumber==6">
              <el-radio-group v-model="inforForm.otherInfo.vehiclePowerType" @change="weightLimit"
                              @input="concludeOverWeight">
                <el-radio label="单轴"></el-radio>
                <el-radio label="双轴"></el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="item">
            <el-form-item label="总质量限值">
              <el-input v-model="inforForm.otherInfo.weightLimit" @input="concludeOverWeight">
                <template slot="append">吨</template>
              </el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="超限">
              <el-input v-model="inforForm.otherInfo.overWeight">
                <template slot="append">吨</template>
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemThird">
            <el-form-item label="车货总长">
              <el-input v-model="inforForm.otherInfo.allLength" placeholder="/">
                <template slot="append">米</template>
              </el-input>
            </el-form-item>
          </div>
          <div class="itemThird">
            <el-form-item label="长度限值">
              <el-input v-model="inforForm.otherInfo.lengthLimit" placeholder="/">
                <template slot="append">米</template>
              </el-input>
            </el-form-item>
          </div>
          <div class="itemThird">
            <el-form-item label="超长">
              <el-input v-model="inforForm.otherInfo.overLength" placeholder="/">
                <template slot="append">米</template>
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemThird">
            <el-form-item label="车货总宽">
              <el-input v-model="inforForm.otherInfo.allWidth" placeholder="/">
                <template slot="append">米</template>
              </el-input>
            </el-form-item>
          </div>
          <div class="itemThird">
            <el-form-item label="宽度限值">
              <el-input v-model="inforForm.otherInfo.widthLimit" placeholder="/">
                <template slot="append">米</template>
              </el-input>
            </el-form-item>
          </div>
          <div class="itemThird">
            <el-form-item label="超宽">
              <el-input v-model="inforForm.otherInfo.overWidth" placeholder="/">
                <template slot="append">米</template>
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemThird">
            <el-form-item label="车货高度">
              <el-input v-model="inforForm.otherInfo.allHeight" placeholder="/">
                <template slot="append">米</template>
              </el-input>
            </el-form-item>
          </div>
          <div class="itemThird">
            <el-form-item label="高度限值">
              <el-input v-model="inforForm.otherInfo.heightLimit" placeholder="/">
                <template slot="append">米</template>
              </el-input>
            </el-form-item>
          </div>
          <div class="itemThird">
            <el-form-item label="超高">
              <el-input v-model="inforForm.otherInfo.overHeight" placeholder="/">
                <template slot="append">米</template>
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="item">
            <el-form-item label="检测结果">
              <el-select placeholder="请选择" v-model="inforForm.otherInfo.checkResult">
                <el-option value="超限" label="超限"></el-option>
                <el-option value="未超限" label="未超限"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="备注">
              <el-input v-model="inforForm.otherInfo.overLimitRemark">
              </el-input>
            </el-form-item>
          </div>
        </div>
      </div>
      <div class="caseFormBac" id="link_5" ref="link_5" @mousewheel="scrool5">
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
              <el-input ref="illegalLaw" v-model="inforForm.illegalLaw" :disabled="true">
                <el-button slot="append" icon="el-icon-search" @click="showPunishDiag"></el-button>
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemOne">
            <el-form-item label="处罚依据" prop="punishLaw">
              <el-input ref="punishLaw" v-model="inforForm.punishLaw" :disabled="true">
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
              <li v-for="(item,index) in judgFreedomList" :key="index" :class="{activeJudgli : activeJudgli==item.id}"
                  @click="selectJudgFreedom(item)">
                <div>{{item.drawerName}}</div>
                <div>{{item.wfqj}}</div>
                <div>{{item.lawerLimit}}</div>
                <span class="selectIcon"><i class="el-icon-success"></i></span>
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
              <el-input v-model="inforForm.tempPunishAmount">
                <span slot="append">元</span>

              </el-input>
            </el-form-item>
          </div>
        </div>
        <el-button class="caseSubmitBtn" icon="el-icon-plus" :disabled="disableBtn" @click="submitInfo(1)">提交
        </el-button>
        <el-button class="caseSubmitBtn caseSubmitBtn2" icon="el-icon-plus" :disabled="disableBtn || disableZcBtn"
                   @click="stageInfo(0)">暂存
        </el-button>
      </div>
    </el-form>

    <chooseLawPerson ref="chooseLawPersonRef" @setLawPer="setLawPerson" @userList="getAllUserList"></chooseLawPerson>
    <punishDiag ref="punishDiagRef" @setIllegalLawAndPunishLaw="setIllegalLawAndPunishLaw"></punishDiag>
    <!--快速入口 -->

    <caseSlideMenu :activeIndex="'inforCollect'" @fromSlide="fromSlide"></caseSlideMenu>
    <!-- 置顶 -->
    <el-backtop target="#inforCollectionBox" :bottom="46" :right='8' :visibility-height='800'>
      <div class="back-ball">
        <svg t="1581647372853" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             p-id="1939" width="18" height="22">
          <path
            d="M862.72 147.2H161.28c-18.432 0-33.28-14.848-33.28-33.28s14.848-33.28 33.28-33.28h701.44c18.432 0 33.28 14.848 33.28 33.28s-14.848 33.28-33.28 33.28zM549.376 323.84v580.608c0 21.504-17.408 38.912-38.912 38.912-21.504 0-38.912-17.408-38.912-38.912V323.84c0-21.504 17.408-38.912 38.912-38.912 21.504 0 38.912 17.408 38.912 38.912z"
            p-id="1940" fill="#bfbfbf"></path>
          <path
            d="M542.72 262.144L207.872 661.248c-13.824 16.384-38.4 18.688-54.784 4.864-16.384-13.824-18.688-38.4-4.864-54.784L483.072 212.224c13.824-16.384 38.4-18.688 54.784-4.864 16.384 13.824 18.688 38.4 4.864 54.784z"
            p-id="1941" fill="rgb(158, 167, 182)"></path>
          <path
            d="M481.28 262.144l334.848 398.848c13.824 16.384 38.4 18.688 54.784 4.864 16.384-13.824 18.688-38.4 4.864-54.784L540.928 212.224c-13.824-16.384-38.4-18.688-54.784-4.864-16.384 13.824-18.688 38.4-4.864 54.784z"
            p-id="1942" fill="rgb(158, 167, 182)"></path>
        </svg>
      </div>
    </el-backtop>
  </div>
</template>
<script>
  import chooseLawPerson from "./chooseLawPerson";
  import punishDiag from "./punishDiag";
  import caseSlideMenu from '../components/caseSlideMenu'
  import iLocalStroage from "@/common/js/localStroage";
  import {mixinGetCaseApiList} from "@/common/js/mixins";
  import {mapGetters} from "vuex";
  import {validateIDNumber, validateAge, validateZIP, validatePhone} from '@/common/js/validator'
  import {
    getDictListDetailByNameApi, findHistoryBySignApi, findRouteManageByOrganIdApi
  } from "@/api/system";


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
      return {
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
          routeId: '',

          direction: '',

          location: '',

          kilometre: '',
          metre: ''
        },
        routeList: [],
        directionList: [],
        locationList: [],
        rules: {
          caseSource: [{required: true, message: "请选择", trigger: "change"}],
          caseSourceText: [{required: true, validator: validatecaseSourceText, trigger: "change"}],
          acceptTime: [
            {required: true, message: "请选择时间", trigger: "change"}
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
          'driverOrAgentInfo.relationWithCase': [
            {required: true, message: "请选择案件关系", trigger: "change"}
          ],
          illegalLaw: [
            {required: true, message: "请选择违法条款", trigger: "change"}
          ],
          punishLaw: [
            {required: true, message: "请选择处罚依据", trigger: "change"}
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
          {value: "0", label: "同一人"},
          {value: "1", label: "近亲戚"},
          {value: "2", label: "借用车辆"},
          {value: "3", label: "雇佣关系"},
          {value: "4", label: "车辆所有人"}
        ],
        allRelationWithParty_: [
          //与当事人关系下拉框
          {value: "1", label: "近亲戚"},
          {value: "2", label: "借用车辆"},
          {value: "3", label: "雇佣关系"},
          {value: "4", label: "车辆所有人"}
        ],
        allRelationWithCase: [
          //与案件关系下拉框
          {value: "0", label: "当事人"},
          {value: "1", label: "驾驶人"},
          {value: "2", label: "实际所有者"},
          {value: "3", label: "证人"},
          {value: "4", label: "承运人"},
          {value: "5", label: "代理人"}
        ],
        allVehicleIdColor: [
          //车牌颜色下拉框
          {value: "1", label: "黄色"},
          {value: "2", label: "蓝色"},
          {value: "3", label: "绿色"},
          {value: "4", label: "黄绿"},
          {value: "5", label: "黑色"},
          {value: "6", label: "白色"},
          {value: "7", label: "其他"}
        ],
        allVehicleShipType: [
          {value: "中小客车", label: "中小客车"},
          {value: "大客车", label: "大客车"},
          {value: "小型货车", label: "小型货车"},
          {value: "中型货车", label: "中型货车"},
          {value: "大型货车", label: "大型货车"},
          {value: "特大型货车", label: "特大型货车"},
          {value: "集装箱车", label: "集装箱车"},
          {value: "摩托车", label: "摩托车"},
          {value: "拖拉机", label: "拖拉机"}
        ],
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

      };
    },
    components: {
      chooseLawPerson,
      punishDiag,
      caseSlideMenu
    },
    mixins: [mixinGetCaseApiList],
    computed: {...mapGetters(['caseId'])},
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
          this.inforForm.partyZipCode = "";
          this.inforForm.partyUnitPosition = "";
          this.inforForm.occupation = "";
          this.inforForm.partyEcertId = "";
        }
      },
      //更改与当事人关系   为同一人时自动赋值且不可编辑
      changeRelationWithParty(index) {
        console.log(index, 'index')
        console.log(this.driverOrAgentInfoList[index].relationWithParty === '同一人');
        let val = this.driverOrAgentInfoList[index].relationWithParty
        if (val === '同一人') {
          console.log(val);
          // debugger
          this.driverOrAgentInfoList[index].relationWithCase = "当事人";
          this.driverOrAgentInfoList[index].name = this.inforForm.party;
          this.driverOrAgentInfoList[index].zhengjianType = this.inforForm.partyIdType;
          this.driverOrAgentInfoList[index].zhengjianNumber = this.inforForm.partyIdNo;
          this.driverOrAgentInfoList[index].sex = this.inforForm.partySex;
          this.driverOrAgentInfoList[index].age = this.inforForm.partyAge;
          this.driverOrAgentInfoList[index].tel = this.inforForm.partyTel;
          this.driverOrAgentInfoList[index].adress = this.inforForm.partyAddress;
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
        if (this.activeJudgli == item.id) {
          this.activeJudgli = "";
          this.inforForm.discretionId = "";
        } else {
          this.activeJudgli = item.id;
          this.inforForm.discretionId = item.id;
        }
        this.inforForm.tempPunishAmount = item.lawerLimit;
      },
      toNextPart() {
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
                    //                    this.$message({message: (fields[i].label) + '填写错误', type: 'warning'});
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
          _this.inforForm.state = state;
          _this.inforForm.caseStatus = '未立案';
          _this.$store.dispatch("saveOrUpdateCaseBasicInfo", _this.inforForm).then(
            res => {
              console.log(res);
              _this.$message({
                type: "success",
                message: "提交成功!"
              });
              _this.$store.dispatch("deleteTabs", _this.$route.name);
              _this.$store.commit("setCaseId", res.data.id);
              iLocalStroage.removeItem("stageCaseId");
              this.autoSava = false;
              _this.$router.replace({
                name: "case_handle_establish"
              });
            },
            err => {

              console.log(err);
            }
          );
        }
        //          if (valid) {
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
        //          _this.inforForm.agentPartyEcertId = JSON.stringify(
        //            _this.driverOrAgentInfoList
        //          );
        //          // 超限
        //          _this.inforForm.otherInfo = JSON.stringify(
        //            _this.inforForm.otherInfo
        //          );
        //          _this.inforForm.state = state;
        //          _this.inforForm.caseStatus = '未立案';
        //          _this.$store.dispatch("saveOrUpdateCaseBasicInfo", _this.inforForm).then(
        //            res => {
        //              console.log(res);
        //              _this.$message({
        //                type: "success",
        //                message: "提交成功!"
        //              });
        //              _this.$store.dispatch("deleteTabs", _this.$route.name);
        //              _this.$store.commit("setCaseId", res.data.id);
        //              iLocalStroage.removeItem("stageCaseId");
        //              this.autoSava = false;
        //              _this.$router.replace({
        //                name: "case_handle_establish"
        //              });
        //            },
        //            err => {
        //
        //              console.log(err);
        //            }
        //          );
        //          }
        //        });
      },
      //查询执法人员
      getAllUserList(list) {
        console.log("list", list);
        this.allUserList = list;
        setTimeout(() => {
        }, 100);
      },
      stageInfo(state) {
        this.inforForm.agentPartyEcertId = JSON.stringify(
          this.driverOrAgentInfoList
        );
        // 超限
        this.inforForm.otherInfo = JSON.stringify(
          this.inforForm.otherInfo
        );
        console.log(this.inforForm)
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
        //当前用户不是创建案件者，输入框设置为只读
        // currentUserId = iLocalStroage.gets("userInfo").id;
        // if(currentUserId!=data.createId){
        //    let allInput = document.querySelectorAll('.el-input');

        // };
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

      },
      //案件来源后的输入框是否显示
      showCaseSourceAfterInput(caseSource) {
        if (caseSource === "行政检查" || caseSource === "投诉举报") {
          this.caseSourceTextDisable = false;
        } else {
          this.caseSourceTextDisable = true;
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
      getTrailerType() {
        getDictListDetailByNameApi('trailerType').then(res => {
          console.log('挂车类型', res);
          this.allTrailerTypeType = res.data;
        }, err => {
          console.log(err);
        })
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
    this.getDirectionList();
    this.getLocationList();
    this.findJudgFreedomList();
    this.getTrailerType();
    this.findRouteManageByOrganId();
    // this.setLawPerson(
    //   [iLocalStroage.gets('userInfo').username]
    // )
    console.log(this.$route)
  
    if(!this.$route.params.fromSlide && !iLocalStroage.get("stageCaseId") && !this.$route.params.editFlag){
       this.setLawPersonCurrentP();
    }
   
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
    if (this.autoSava && to.name != 'login') {  //退出登录不自动暂存
      this.stageInfo(0);
      // iLocalStroage.set("stageCaseId", this.caseId);
    }

      next(vm => {
        console.log(vm)
      })

    }
  };
</script>
<style lang="scss">
  @import "@/assets/css/caseHandle/index.scss";
</style>
