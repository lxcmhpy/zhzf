<template>
  <div id="inforCollectionBox">
    <div class="linkPart">
      <div class="linkPartCon">
        <a
          href="#"
          :class="activeA[0] ? 'activeA' : ''"
          @click="jump(1)"
          id="scrollDiv"
          >案件情况</a
        >
        <a href="#" :class="activeA[1] ? 'activeA' : ''" @click="jump(2)"
          >当事人</a
        >
        <a href="#" :class="activeA[2] ? 'activeA' : ''" @click="jump(3)">{{
          cateNameType ? "车辆信息" : inforForm.zfmlId !== '1002000500000000'?"船舶信息":"港口信息"
        }}</a>
        <a
          href="#"
          :class="activeA[3] ? 'activeA' : ''"
          v-if="showOverrun"
          @click="jump(4)"
          >超限信息</a
        >
        <!-- <a :class="activeA[3]? 'activeA' :''" @click="jump(4)">超限信息</a> -->
        <a href="#" :class="activeA[4] ? 'activeA' : ''" @click="jump(5)"
          >违法事实</a
        >
      </div>
    </div>
    <el-form
      :model="inforForm"
      :rules="rules"
      ref="inforForm"
      class="caseInfoForm"
      label-width="100px"
      :disabled="isHandleCase"
    >
      <div class="caseFormBac" id="link_1" ref="link_1" @mousewheel="scrool1">
        <p>案件情况</p>
        <div>
          <div class="item">
            <el-form-item label="案件来源" prop="caseSource">
              <el-select
                ref="caseSource"
                v-model="inforForm.caseSource"
                placeholder="请选择"
                @change="changeCaseSource"
              >
                <el-option
                  v-for="item in allcaseSource"
                  :key="item.value"
                  :label="item.label"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="item hasMargintop">
            <el-form-item prop="caseSourceText">
              <el-input
                ref="caseSourceText"
                v-model="inforForm.caseSourceText"
                v-show="caseSourceTextDisable"
                :placeholder="caseSourceTextPla"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="item">
            <el-form-item label="案发时间" prop="afsj">
              <el-date-picker
                @change="checkDays"
                v-model="inforForm.afsj"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
              ></el-date-picker>
              <div v-if="dateShow" class="el-form-item__error error-color">
                当前案发时间早于受案时间10日以上，若核对无误可忽略本提醒。
              </div>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="受案时间" prop="acceptTime">
              <el-date-picker
                @change="checkDays"
                v-model="inforForm.acceptTime"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
              ></el-date-picker>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="item">
            <el-form-item label="程序类型">
              <el-input
                v-model="inforForm.programType"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="案件类型">
              <el-input
                v-model="inforForm.caseType"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div v-if="cateNameType">
          <div class="afddBox" v-if="inforForm.zfmlId === '1002000100000000'">
            <label class="el-form-item__label" style="width: 100px"
              >案发地点</label
            >
            <div class="itemFive2">
              <el-form-item label-width="0" prop="highwayRoute">
                <el-select
                  ref="highwayRoute"
                  v-model="inforForm.highwayRoute"
                  placeholder="本机构路线编号"
                >
                  <el-option
                    v-for="item in routeList"
                    :key="item"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="itemFive2">
              <el-form-item label-width="20px" prop="direction">
                <el-select
                  ref="direction"
                  v-model="inforForm.direction"
                  placeholder="方向"
                >
                  <el-option
                    v-for="item in locationList"
                    :key="item.name"
                    :label="item.label"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="itemFive2">
              <el-form-item label-width="20px" prop="position">
                <el-select
                  ref="position"
                  v-model="inforForm.position"
                  placeholder="位置"
                >
                  <el-option
                    v-for="item in directionList"
                    :key="item.name"
                    :label="item.lable"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="showMapBtn">
              <label class="mustTip">*</label>
              <el-button
                type="primary"
                icon="iconfont law-weizhi"
                size="mini"
                @click="showMap"
                v-if="!hasLatitudeAndLongitude"
                >请获取坐标</el-button
              >
              <el-button
                type="info"
                icon="iconfont law-weizhi"
                size="mini"
                disabled
                v-else
                >已获取坐标</el-button
              >
            </div>
          </div>
          <div v-if="inforForm.zfmlId !== '1002000100000000'">
            <div class="itemOne">
              <el-form-item label="案发地点">
                <el-input v-model="inforForm.afdd">
                  <template slot="append">
                    <div class="showMapBtn" title="点击获取坐标">
                      <label class="mustTip">*</label>
                      <el-button
                        icon="iconfont law-weizhi"
                        size="mini"
                        @click="showMap"
                        v-if="!hasLatitudeAndLongitude"
                        >请获取坐标</el-button
                      >
                      <el-button
                        icon="iconfont law-weizhi"
                        size="mini"
                        disabled
                        v-else
                        >已获取坐标</el-button
                      >
                    </div>
                  </template>
                </el-input>
              </el-form-item>
            </div>
          </div>
          <div v-if="inforForm.zfmlId === '1002000100000000'">
            <span class="gongLiBox1">K</span>
            <span class="itemFive">
              <el-form-item prop="pileNumber" label-width="0px">
                <el-input
                  v-model="inforForm.pileNumber"
                  placeholder="公里数"
                ></el-input>
              </el-form-item>
            </span>
            <span class="gongLiBox2">+</span>
            <span class="itemFive">
              <el-form-item label-width="0px" prop="distance">
                <el-input
                  v-model="inforForm.distance"
                  placeholder="米数"
                  style="vertical-align: middle"
                >
                  <template slot="append">m</template>
                </el-input>
              </el-form-item>
            </span>
            <span class="gongLiBox3">至</span>
            <span class="gongLiBox3">K</span>
            <span class="itemFive">
              <el-form-item prop="pileNumber2" label-width="0px">
                <el-input
                  v-model="inforForm.pileNumber2"
                  placeholder="公里数"
                ></el-input>
              </el-form-item>
            </span>
            <span class="gongLiBox2">+</span>
            <span class="itemFive">
              <el-form-item label-width="0px" prop="distance2">
                <el-input
                  v-model="inforForm.distance2"
                  placeholder="米数"
                  style="vertical-align: middle"
                >
                  <template slot="append">m</template>
                </el-input>
              </el-form-item>
            </span>
          </div>
        </div>
        <div v-else>
          <div v-if="inforForm.zfmlId !== '1002000500000000'">
            <label class="el-form-item__label" style="width: 100px"
              >案发地点</label
            >
            <div class="itemFiveOne">
              <el-form-item label-width="0" prop="highwayRoute">
                <el-input
                  v-model="inforForm.highwayRoute"
                  placeholder="河道名称"
                ></el-input>
              </el-form-item>
            </div>
            <div class="itemFiveOne">
              <el-form-item label-width="20px" prop="direction">
                <el-input
                  v-model="inforForm.direction"
                  placeholder="河段/参照物名称"
                ></el-input>
              </el-form-item>
            </div>
            <div class="itemFiveTwo">
              <el-form-item label-width="20px" prop="position">
                <el-select
                  ref="position"
                  v-model="inforForm.position"
                  placeholder="位置"
                >
                  <el-option
                    v-for="item in directionSite"
                    :key="item.name"
                    :label="item.label"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="itemFiveTwo">
              <el-form-item label-width="0px" prop="distance2">
                <el-input
                  v-model="inforForm.distance2"
                  placeholder="米数"
                  style="vertical-align: middle"
                >
                  <template slot="append">m</template>
                </el-input>
              </el-form-item>
            </div>
            <div class="itemOne">
              <el-form-item label-width="100px">
                <el-input v-model="inforForm.afdd" placeholder="定位点信息">
                  <template slot="append">
                    <div class="showMapBtn" title="点击获取坐标">
                      <label class="mustTip">*</label>
                      <el-button
                        icon="iconfont law-weizhi"
                        size="mini"
                        @click="showMap"
                        v-if="!hasLatitudeAndLongitude"
                        >请获取坐标</el-button
                      >
                      <el-button
                        icon="iconfont law-weizhi"
                        size="mini"
                        disabled
                        v-else
                        >已获取坐标</el-button
                      >
                    </div>
                  </template>
                </el-input>
              </el-form-item>
            </div>
          </div>
          <div v-if="inforForm.zfmlId == '1002000500000000'">
            <div class="itemOne">
              <el-form-item label="案发地点">
                <el-input v-model="inforForm.afdd">
                  <template slot="append">
                    <div class="showMapBtn" title="点击获取坐标">
                      <label class="mustTip">*</label>
                      <el-button
                        icon="iconfont law-weizhi"
                        size="mini"
                        @click="showMap"
                        v-if="!hasLatitudeAndLongitude"
                        >请获取坐标</el-button
                      >
                      <el-button
                        icon="iconfont law-weizhi"
                        size="mini"
                        disabled
                        v-else
                        >已获取坐标</el-button
                      >
                    </div>
                  </template>
                </el-input>
              </el-form-item>
            </div>
          </div>
        </div>
        <div>
          <div class="itemOne">
            <el-form-item
              label="执法人员"
              id="lawPersonBox"
              prop="lawPersonListId"
            >
              <!-- <el-input> -->
              <el-select
                ref="lawPersonListId"
                v-model="lawPersonListId"
                multiple
                @remove-tag="removeLawPersontag"
              >
                <el-option
                  v-for="item in alreadyChooseLawPerson"
                  :key="item.id"
                  :label="item.lawOfficerName"
                  :value="item.id"
                  placeholder="请添加"
                  :disabled="currentUserLawId == item.id ? true : false"
                ></el-option>
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
              <el-radio-group
                v-model="inforForm.partyType"
                @change="changePartyType"
              >
                <el-radio :label="1">个人</el-radio>
                <el-radio :label="2">企业组织</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>
        <div v-show="partyTypePerson == '1'">
          <div class="item">
            <el-form-item label="姓名" prop="party">
              <el-input
                ref="party"
                @change="changeDriverOrAgentInfo"
                v-model="inforForm.party"
              ></el-input>
            </el-form-item>
          </div>
          <div class="item appendSelect">
            <el-form-item label="证件类型" prop="partyIdNo">
              <el-input
                ref="partyIdNo"
                placeholder="请输入内容"
                v-model="inforForm.partyIdNo"
                class="input-with-select hasMargintop"
              >
                <el-select
                  slot="prepend"
                  v-model="inforForm.partyIdType"
                  @change="changeDriverOrAgentInfo"
                >
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
        <div v-show="partyTypePerson == '1'">
          <div class="itemThird">
            <el-form-item label="性别" prop="partySex">
              <el-select
                placeholder="请选择"
                v-model="inforForm.partySex"
                :disabled="
                  inforForm.partyIdNo && inforForm.partyIdType === '0'
                    ? true
                    : false
                "
              >
                <el-option :value="0" label="男"></el-option>
                <el-option :value="1" label="女"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="itemThird">
            <el-form-item label="年龄" prop="partyAge">
              <el-input
                ref="partyAge"
                v-model="inforForm.partyAge"
                type="number"
                :disabled="
                  inforForm.partyIdNo && inforForm.partyIdType === '0'
                    ? true
                    : false
                "
                @change="noFue('inforForm.partyAge', inforForm.partyAge)"
              ></el-input>
            </el-form-item>
          </div>
          <div class="itemThird">
            <el-form-item label="联系电话" prop="partyTel">
              <el-input
                ref="partyTel"
                @change="changeDriverOrAgentInfo"
                v-model="inforForm.partyTel"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div v-show="partyTypePerson == '1'">
          <div class="itemThird">
            <el-form-item label="省/市/区" prop="provincesAddressArray">
              <el-cascader
                ref="areaCascader"
                v-model="inforForm.provincesAddressArray"
                :options="provincesList"
                @active-item-change="handleSelect"
                :props="{
                  expandTrigger: 'hover',
                  label: 'name',
                  value: 'name',
                }"
                filterable
                @change="handleSelect"
              ></el-cascader>
            </el-form-item>
          </div>
          <div class="itemThird">
            <el-form-item label="详细地址" prop="partyAddress">
              <el-input
                v-model="inforForm.partyAddress"
                @change="changeDriverOrAgentInfo"
              ></el-input>
            </el-form-item>
          </div>
          <div class="itemSmall">
            <el-form-item label="邮编" prop="partyZipCode">
              <el-input
                ref="partyZipCode"
                @change="changeDriverOrAgentInfo"
                v-model="inforForm.partyZipCode"
                @blur="blur3($event.target.value)"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div v-show="partyTypePerson == '1'">
          <div class="itemBig">
            <el-form-item label="工作单位">
              <el-input
                v-model="inforForm.partyUnitPosition"
                @change="changeDriverOrAgentInfo"
              ></el-input>
            </el-form-item>
          </div>
          <div class="itemSmall">
            <el-form-item label="职务">
              <el-input
                v-model="inforForm.occupation"
                @change="changeDriverOrAgentInfo"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div v-show="partyTypePerson == '1'">
          <div :class="cateNameType ? 'itemOne' : 'itemOne cateNameType'">
            <el-form-item v-if="cateNameType" label="从业资格证号">
              <el-input
                v-model="inforForm.partyEcertId"
              ></el-input>
            </el-form-item>
            <el-form-item v-else label="船舶船员适任证号"
            >
              <el-input
                v-model="inforForm.shipPeopleId"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div v-show="partyTypePerson != '1'">
          <div class="itemBig">
            <el-form-item label="单位名称" prop="partyName">
              <el-input
                ref="partyName"
                v-model="inforForm.partyName"
                @input="handleLength(inforForm.partyName, 'partyName')"
              ></el-input>
            </el-form-item>
          </div>
          <div class="itemSmall">
            <el-form-item label="联系电话" prop="partyUnitTel">
              <el-input
                ref="partyUnitTel"
                v-model="inforForm.partyUnitTel"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div v-show="partyTypePerson != '1'">
          <div class="itemSmall">
            <el-form-item
              label="统一社会信用代码"
              prop="socialCreditCode"
              class="lable-height18px"
            >
              <el-input v-model="inforForm.socialCreditCode"></el-input>
            </el-form-item>
          </div>
          <div class="itemBig">
            <el-form-item label="道路经营许可证" class="lable-height18px">
              <el-input v-model="inforForm.roadTransportLicense"></el-input>
            </el-form-item>
          </div>
        </div>
        <div v-show="partyTypePerson != '1'">
          <div class="itemSmall">
            <el-form-item label="职务">
              <el-input
                v-model="inforForm.partyManagerPositions"
                @input="
                  handleLength(
                    inforForm.partyManagerPositions,
                    'partyManagerPositions'
                  )
                "
              ></el-input>
            </el-form-item>
          </div>
          <div class="itemBig">
            <el-form-item label="法定代表人" prop="partyManager">
              <el-input
                v-model="inforForm.partyManager"
                @input="handleLength(inforForm.partyManager, 'partyManager')"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div v-show="partyTypePerson != '1'">
          <div class="itemOne">
            <el-form-item label="地址" prop="partyUnitAddress">
              <el-input
                v-model="inforForm.partyUnitAddress"
                @input="
                  handleLength(inforForm.partyUnitAddress, 'partyUnitAddress')
                "
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <!-- 分隔线 -->
        <div class="line"></div>
        <p>{{ cateNameType ? "驾驶人或代理人" : "船员或代理人" }}</p>
        <div
          class="driverOrAgentBox"
          v-for="(driverOrAgentInfo, index) in driverOrAgentInfoList"
          :key="index"
        >
          <div v-show="partyTypePerson == '1'">
            <div>
              <div class="item">
                <el-form-item label="与当事人关系">
                  <el-select
                    v-model="driverOrAgentInfo.relationWithParty"
                    @change="changeRelationWithParty(index)"
                  >
                    <el-option
                      v-for="item in index === 0
                        ? allRelationWithParty
                        : allRelationWithParty_"
                      :key="item.value"
                      :label="item.label"
                      :value="item.label"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="item">
                <!-- 需要完善验证 -->
                <el-form-item label="与案件关系">
                  <el-select
                    v-model="driverOrAgentInfo.relationWithCase"
                    :disabled="index == 0 && relationWithPartyIsOne[index]"
                  >
                    <el-option
                      v-for="item in allRelationWithCase"
                      :key="item.value"
                      :label="item.label"
                      :value="item.label"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
          </div>
          <div v-show="partyTypePerson != '1'">
            <div>
              <div class="item">
                <el-form-item label="与当事人关系">
                  <el-select
                    v-model="driverOrAgentInfo.relationWithParty"
                    @change="changeRelationWithParty"
                  >
                    <el-option
                      v-for="item in allQYRelationWithParty"
                      :key="item.value"
                      :label="item.label"
                      :value="item.label"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="item">
                <!-- 需要完善验证 -->
                <el-form-item label="与案件关系">
                  <el-select v-model="driverOrAgentInfo.relationWithCase">
                    <el-option
                      v-for="item in allQYRelationWithCase"
                      :key="item.value"
                      :label="item.label"
                      :value="item.label"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
          </div>
          <div>
            <div class="item">
              <el-form-item label="姓名">
                <el-input
                  v-model="driverOrAgentInfo.name"
                  :disabled="index == 0 && relationWithPartyIsOne[index]"
                ></el-input>
              </el-form-item>
            </div>
            <div class="item appendSelect">
              <el-form-item label="证件类型">
                <el-input
                  ref="partyIdNo"
                  placeholder="请输入内容"
                  v-model="driverOrAgentInfo.zhengjianNumber"
                  @input="changePartyIdType2Index = index"
                  @change="
                    changePartyIdType2(driverOrAgentInfo.zhengjianNumber, index)
                  "
                  class="input-with-select hasMargintop"
                  :disabled="index == 0 && relationWithPartyIsOne[index]"
                >
                  <el-select
                    slot="prepend"
                    v-model="driverOrAgentInfo.zhengjianType"
                    :disabled="index == 0 && relationWithPartyIsOne[index]"
                  >
                    <el-option
                      v-for="item in credentialType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      :disabled="index == 0 && relationWithPartyIsOne[index]"
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
                  :disabled="index == 0 && relationWithPartyIsOne[index]"
                >
                  <el-option :value="0" label="男"></el-option>
                  <el-option :value="1" label="女"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="itemThird">
              <el-form-item label="年龄">
                <el-input
                  v-model="driverOrAgentInfo.age"
                  type="number"
                  :disabled="index == 0 && relationWithPartyIsOne[index]"
                  @change="noFueA(driverOrAgentInfo.age)"
                ></el-input>
              </el-form-item>
            </div>
            <div class="itemThird">
              <el-form-item label="联系电话">
                <el-input
                  v-model="driverOrAgentInfo.tel"
                  :disabled="index == 0 && relationWithPartyIsOne[index]"
                  @blur="blur2($event.target.value)"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div>
            <div class="itemThird">
              <el-form-item label="省/市/区">
                <el-cascader
                  :ref="subAreaCascader + index"
                  v-model="driverOrAgentInfo.provincesAddress"
                  :options="provincesList"
                  @active-item-change="
                    (params) =>
                      handleSelectDriverOrAgent(
                        params,
                        index,
                        driverOrAgentInfo
                      )
                  "
                  :props="{
                    expandTrigger: 'hover',
                    label: 'name',
                    value: 'name',
                  }"
                  filterable
                  :disabled="index == 0 && relationWithPartyIsOne[index]"
                  @change="
                    (params) =>
                      handleSelectDriverOrAgent(
                        params,
                        index,
                        driverOrAgentInfo
                      )
                  "
                ></el-cascader>
              </el-form-item>
            </div>
            <div class="itemThird">
              <el-form-item label="详细地址">
                <el-input
                  v-model="driverOrAgentInfo.adress"
                  :disabled="index == 0 && relationWithPartyIsOne[index]"
                ></el-input>
              </el-form-item>
            </div>
            <div class="itemSmall">
              <el-form-item label="邮编">
                <el-input
                  v-model="driverOrAgentInfo.adressCode"
                  :disabled="index == 0 && relationWithPartyIsOne[index]"
                  @blur="blur3($event.target.value)"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div>
            <div class="itemBig">
              <el-form-item label="工作单位">
                <el-input
                  v-model="driverOrAgentInfo.company"
                  :disabled="index == 0 && relationWithPartyIsOne[index]"
                ></el-input>
              </el-form-item>
            </div>
            <div class="itemSmall">
              <el-form-item label="职务">
                <el-input
                  v-model="driverOrAgentInfo.position"
                  :disabled="index == 0 && relationWithPartyIsOne[index]"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div>
            <div :class="cateNameType ? 'itemOne' : 'itemOne cateNameType'">
              <el-form-item v-if="cateNameType" label="从业资格证号"
              >
                <el-input
                  v-model="driverOrAgentInfo.zigeNumber"
                  :disabled="index == 0 && relationWithPartyIsOne[index]"
                ></el-input>
              </el-form-item>
              <el-form-item v-else label="船舶船员适任证号"
              >
                <el-input
                  v-model="driverOrAgentInfo.shipPeopleId"
                  :disabled="index == 0 && relationWithPartyIsOne[index]"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <!-- 分隔线 -->
          <div
            class="line"
            v-if="index < driverOrAgentInfoList.length - 1"
          ></div>
        </div>
        <div class="buttonBox">
          <el-button
            type="primary"
            size="medium"
            icon="el-icon-plus"
            @click="addDriverOrAgent"
            >添加其他人</el-button
          >
        </div>
      </div>

      <div
        v-if="cateNameType"
        class="caseFormBac"
        id="link_3"
        ref="link_3"
        @mousewheel="scrool3"
      >
        <p>车辆信息</p>
        <div>
          <div class="item">
            <el-form-item label="车牌号" prop="vehicleShipId">
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
            <el-form-item label="车辆类型">
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
              <!--<el-input v-model="inforForm.brand"></el-input>-->
              <el-autocomplete
                style="width: 100%"
                v-model="inforForm.brand"
                :fetch-suggestions="queryBrand"
              ></el-autocomplete>
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
          <el-button
            type="primary"
            size="medium"
            icon="el-icon-plus"
            @click="addTrailer"
            >添加挂车数据</el-button
          >
        </div>
        <p v-if="showTrailer">挂车信息</p>
        <div v-if="showTrailer">
          <div class="item">
            <el-form-item label="车牌号" prop="trailerIdNo">
              <el-input v-model="inforForm.trailerIdNo"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="车牌颜色">
              <el-select v-model="inforForm.trailerColor" disabled>
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
            <el-form-item label="挂车类型">
              <el-select v-model="inforForm.trailerType">
                <el-option
                  v-for="item in allTrailerTypeType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
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
      <div
        v-else-if="inforForm.zfmlId !== '1002000500000000'"
        class="caseFormBac"
        id="link_3"
        ref="link_3"
        @mousewheel="scrool3"
      >
        <p>船舶信息</p>
        <div>
          <div class="item">
            <el-form-item label="船号" prop="shipNumber">
              <el-input v-model="inforForm.shipNumber"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="船舶名称" prop="shipName">
              <el-input v-model="inforForm.shipName"></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemThird">
            <el-form-item label="船型">
              <el-select v-model="inforForm.shipType">
                <el-option
                  v-for="item in shipType"
                  :key="item.name"
                  :label="item.label"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="itemThird">
            <el-form-item label="总吨" prop="shipWeight">
              <el-input v-model="inforForm.shipWeight"></el-input>
            </el-form-item>
          </div>
          <div class="itemThird">
            <el-form-item label="主机功率" prop="shipPower">
              <el-input v-model="inforForm.shipPower"></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="cateNameType">
            <el-form-item label="船舶营业运输证号" prop="shipTransportId">
              <el-input v-model="inforForm.shipTransportId"></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemThird">
            <el-form-item label="总长">
              <el-input v-model="inforForm.shipLength"><template slot="append">m</template></el-input>
            </el-form-item>
          </div>
          <div class="itemThird">
            <el-form-item label="型宽">
              <el-input v-model="inforForm.shipWidth"
                ><template slot="append">m</template></el-input
              >
            </el-form-item>
          </div>
          <div class="itemThird">
            <el-form-item label="型深">
              <el-input v-model="inforForm.shipHeight"
                ><template slot="append">m</template></el-input
              >
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="item appendSelect">
            <el-form-item label="核定载重线" prop="shipLoadLine">
              <el-input
                ref="shipLoadLine"
                placeholder="请输入内容"
                v-model="inforForm.shipLoadLine"
                class="input-with-select hasMargintop"
              >
                <template slot="append">mm</template>
                <el-select
                  slot="prepend"
                  v-model="inforForm.shipPlace"
                >
                  <el-option
                    v-for="item in loadLineList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="实际载重线">
              <el-input v-model="inforForm.shipRealLoadLine"
                ><template slot="append">mm</template></el-input
              >
            </el-form-item>
          </div>
        </div>
      </div>
      <div v-else-if="inforForm.zfmlId == '1002000500000000'"
        class="caseFormBac"
        id="link_3"
        ref="link_3"
        @mousewheel="scrool3">
        <p>港口信息</p>
        <div>
          <div class="item">
            <el-form-item label="港口名称" prop="harbourName">
              <el-input v-model="inforForm.harbourName"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="经营地域" prop="harbourPlace">
              <el-input v-model="inforForm.harbourPlace"></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="item">
            <el-form-item label="港口类型" prop="harbourType">
              <el-select v-model="inforForm.harbourType">
                <el-option
                  v-for="item in portTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="办公地点">
              <el-input v-model="inforForm.harbourWorkPlace"></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemOne">
            <el-form-item label="经营许可证号">
              <el-input v-model="inforForm.harbourLicense"></el-input>
            </el-form-item>
          </div>
        </div>
      </div>
      <div
        class="caseFormBac"
        id="link_4"
        v-if="showOverrun"
        ref="link_4"
        @mousewheel="scrool4"
      >
        <p>超限信息</p>
        <div>
          <div class="itemBig">
            <el-form-item label="检测站" class="is-required">
              <el-autocomplete
                style="width: 100%"
                v-model="inforForm.otherInfo.checkStastions"
                :fetch-suggestions="querySearch"
              ></el-autocomplete>
            </el-form-item>
          </div>
          <div class="itemSmall">
            <el-form-item label="检测单号">
              <el-input v-model="inforForm.otherInfo.checkNumber">
                <!-- <el-button slot="append" icon="el-icon-search" @click="showPunishDiag"></el-button> -->
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemBig">
            <el-form-item label="检测人员">
              <el-autocomplete
                style="width: 100%"
                v-model="inforForm.otherInfo.checkWorker"
                :fetch-suggestions="queryCheckWorker"
              ></el-autocomplete>
              <!-- <el-select v-model="inforForm.otherInfo.checkWorker">
                <el-option v-for="item in RecentCheckWorkers" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>-->
              <!-- <el-input v-model="inforForm.otherInfo.checkWorker"></el-input> -->
            </el-form-item>
          </div>
          <div class="itemSmall">
            <el-form-item label="检测时间" prop="checkTime">
              <el-date-picker
                ref="checkTime"
                v-model="inforForm.otherInfo.checkTime"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
              ></el-date-picker>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemBig">
            <el-form-item label="装载物" prop="vehiclefiledThing">
              <el-input
                ref="vehiclefiledThing"
                v-model="inforForm.otherInfo.vehiclefiledThing"
              ></el-input>
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
              <el-select
                placeholder="请选择"
                v-model="inforForm.otherInfo.vehicleAxleNumber"
                @change="weightLimit('车辆轴数')"
              >
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
              <el-select
                placeholder="请选择"
                v-model="inforForm.otherInfo.vehicleType"
                @change="weightLimit('车型')"
              >
                <el-option
                  v-for="item in vehicleTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
                <!-- <el-option label="中置轴挂车列车"></el-option>
                <el-option label="铰列车"></el-option>
                <el-option label="全挂汽车列车"></el-option>-->
              </el-select>
            </el-form-item>
          </div>
          <div class="itemThird">
            <el-form-item label="轴数分布" class="is-required">
              <el-select
                placeholder="请选择"
                v-model="inforForm.otherInfo.vehicleAxlesType"
                @change="weightLimit"
                @input="concludeOverWeight"
              >
                <el-option
                  v-for="item in vehicleAxlesTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
                <!-- <el-option label="1+2+3"></el-option>
                <el-option label="2+2+2"></el-option>-->
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="item">
            <el-form-item label="车货总重" class="is-required">
              <el-input
                v-model="inforForm.otherInfo.allWeight"
                @input="concludeOverWeight"
              >
                <template slot="append">吨</template>
              </el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item
              label="驱动轴"
              v-show="inforForm.otherInfo.vehicleAxleNumber == 6"
            >
              <el-radio-group
                v-model="inforForm.otherInfo.vehiclePowerType"
                @change="weightLimit"
                @input="concludeOverWeight"
              >
                <el-radio label="单轴"></el-radio>
                <el-radio label="双轴"></el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="item">
            <el-form-item label="总质量限值">
              <el-input
                v-model="inforForm.otherInfo.weightLimit"
                @input="concludeOverWeight"
              >
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
              <el-input
                v-model="inforForm.otherInfo.allLength"
                placeholder="/"
                @input="countOverLength"
              >
                <template slot="append">米</template>
              </el-input>
            </el-form-item>
          </div>
          <div class="itemThird">
            <el-form-item label="长度限值">
              <el-input
                v-model="inforForm.otherInfo.lengthLimit"
                placeholder="/"
                @input="countOverLength"
              >
                <template slot="append">米</template>
              </el-input>
            </el-form-item>
          </div>
          <div class="itemThird">
            <el-form-item label="超长">
              <el-input
                v-model="inforForm.otherInfo.overLength"
                placeholder="/"
              >
                <template slot="append">米</template>
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemThird">
            <el-form-item label="车货总宽">
              <el-input
                v-model="inforForm.otherInfo.allWidth"
                placeholder="/"
                @input="countOverWidth"
              >
                <template slot="append">米</template>
              </el-input>
            </el-form-item>
          </div>
          <div class="itemThird">
            <el-form-item label="宽度限值">
              <el-input
                v-model="inforForm.otherInfo.widthLimit"
                placeholder="/"
                @input="countOverWidth"
              >
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
            <el-form-item label="车货总高">
              <el-input
                v-model="inforForm.otherInfo.allHeight"
                placeholder="/"
                @input="countOverHeight"
              >
                <template slot="append">米</template>
              </el-input>
            </el-form-item>
          </div>
          <div class="itemThird">
            <el-form-item label="高度限值">
              <el-input
                v-model="inforForm.otherInfo.heightLimit"
                placeholder="/"
                @input="countOverHeight"
              >
                <template slot="append">米</template>
              </el-input>
            </el-form-item>
          </div>
          <div class="itemThird">
            <el-form-item label="超高">
              <el-input
                v-model="inforForm.otherInfo.overHeight"
                placeholder="/"
              >
                <template slot="append">米</template>
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="item">
            <el-form-item label="检测结果">
              <el-select
                placeholder="请选择"
                v-model="inforForm.otherInfo.checkResult"
              >
                <el-option value="超限" label="超限"></el-option>
                <el-option value="未超限" label="未超限"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="备注">
              <el-input
                v-model="inforForm.otherInfo.overLimitRemark"
              ></el-input>
            </el-form-item>
          </div>
        </div>
      </div>
      <div class="caseFormBac" id="link_5" ref="link_5" @mousewheel="scrool5">
        <p>违法事实</p>
        <div>
          <div class="itemOne">
            <el-form-item label="违法行为">
              <el-input v-model="inforForm.caseCauseNameCopy" :disabled="true">
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click="chooseIllegalAct"
                ></el-button>
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemOne">
            <el-form-item label="违法条款" prop="illegalLaw">
              <el-input
                ref="illegalLaw"
                v-model="inforForm.illegalLaw"
                :disabled="true"
              >
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click="showPunishDiag"
                ></el-button>
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemOne">
            <el-form-item label="处罚依据" prop="punishLaw">
              <el-input
                ref="punishLaw"
                v-model="inforForm.punishLaw"
                :disabled="true"
              >
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click="showPunishDiag"
                ></el-button>
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemOne" id="judgeFreedomBox">
            <!-- <el-form-item label="自由裁量标准">
              <el-input v-model="inforForm.discretionId"></el-input>
            </el-form-item>-->
            <p v-if="judgFreedomList && judgFreedomList.length !== 0">
              自由裁量标准(违法程度/违法情节/建议处罚)
            </p>
            <div>
              <el-radio-group
                class="money_group"
                @change="handleMoneyChange"
                v-model="radio3"
                v-if="judgFreedomList && judgFreedomList.length !== 0"
              >
                <el-radio
                  class="money_item"
                  v-for="(item, index) in judgFreedomList"
                  :key="index"
                  :label="item.id"
                  border
                >
                  <div class="money_name">{{ item.drawerName }}</div>
                  <div class="money_dist">
                    <el-tooltip
                      effect="dark"
                      :content="item.wfqj"
                      placement="top"
                    >
                      <span>{{ item.wfqj }}</span>
                    </el-tooltip>
                  </div>
                  <div class="money_count">
                    <el-tooltip
                      effect="dark"
                      :content="item.jycf"
                      placement="top"
                    >
                      <span>{{ item.lawerLimit }}</span>
                    </el-tooltip>
                  </div>
                </el-radio>
              </el-radio-group>
            </div>
          </div>
        </div>
        <div>
          <div class="itemOne">
            <el-form-item label="拟处罚金额">
              <el-input
                v-model="inforForm.tempPunishAmount"
                @input="changeTempPunishAmount"
              >
                <span slot="append">元</span>
              </el-input>
              <p style="font-size: 12px; color: #ff6600">
                {{ punishAmountAtention }}
              </p>
            </el-form-item>
          </div>
        </div>
        <el-button
          class="caseSubmitBtn"
          icon="el-icon-plus"
          :disabled="disableBtn"
          @click="submitInfo(1)"
          >提交</el-button
        >
        <el-button
          class="caseSubmitBtn caseSubmitBtn2"
          icon="el-icon-plus"
          :disabled="disableBtn || disableZcBtn"
          @click="stageInfo(0)"
          >暂存</el-button
        >
      </div>
    </el-form>

    <chooseLawPerson
      ref="chooseLawPersonRef"
      @setLawPer="setLawPerson"
      @userList="getAllUserList"
    ></chooseLawPerson>
    <punishDiag
      ref="punishDiagRef"
      @setIllegalLawAndPunishLaw="setIllegalLawAndPunishLaw"
    ></punishDiag>
    <!--快速入口 -->

    <caseSlideMenu
      fatherCom="inforCollection"
      :activeIndex="'inforCollect'"
      @fromSlide="fromSlide"
    ></caseSlideMenu>
    <!-- 置顶 -->
    <el-backtop
      target="#inforCollectionBox"
      :bottom="46"
      :right="0"
      :visibility-height="800"
      style="width: 58px; height: 58px"
    >
      <div class="back-ball">
        <svg
          t="1581647372853"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1939"
          width="18"
          height="22"
        >
          <path
            d="M862.72 147.2H161.28c-18.432 0-33.28-14.848-33.28-33.28s14.848-33.28 33.28-33.28h701.44c18.432 0 33.28 14.848 33.28 33.28s-14.848 33.28-33.28 33.28zM549.376 323.84v580.608c0 21.504-17.408 38.912-38.912 38.912-21.504 0-38.912-17.408-38.912-38.912V323.84c0-21.504 17.408-38.912 38.912-38.912 21.504 0 38.912 17.408 38.912 38.912z"
            p-id="1940"
            fill="#bfbfbf"
          />
          <path
            d="M542.72 262.144L207.872 661.248c-13.824 16.384-38.4 18.688-54.784 4.864-16.384-13.824-18.688-38.4-4.864-54.784L483.072 212.224c13.824-16.384 38.4-18.688 54.784-4.864 16.384 13.824 18.688 38.4 4.864 54.784z"
            p-id="1941"
            fill="rgb(158, 167, 182)"
          />
          <path
            d="M481.28 262.144l334.848 398.848c13.824 16.384 38.4 18.688 54.784 4.864 16.384-13.824 18.688-38.4 4.864-54.784L540.928 212.224c-13.824-16.384-38.4-18.688-54.784-4.864-16.384 13.824-18.688 38.4-4.864 54.784z"
            p-id="1942"
            fill="rgb(158, 167, 182)"
          />
        </svg>
      </div>
    </el-backtop>
    <mapDiag ref="mapDiagRef" @getLngLat="getLngLat"></mapDiag>
    <chooseillegalAct
      ref="chooseillegalActRef"
      @setIllegaAct="setIllegaAct"
    ></chooseillegalAct>
  </div>
</template>
<script>
import util from "@/common/js/util";
import chooseLawPerson from "./chooseLawPerson";
import punishDiag from "./punishDiag";
import mapDiag from "@/page/caseHandle/case/form/inforCollectionPage/diag/mapDiag";
import caseSlideMenu from "../components/caseSlideMenu";
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
  validateIsNumber,
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
import chooseillegalAct from "@/page/chooseIllegegaDialog.vue";

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
    //案件来源后面输入框的验证
    var validatecaseSourceText = (rule, value, callback) => {
      if (this.caseSourceTextDisable == true && !value) {
        return callback(new Error("请输入案件来源描述"));
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
      cateNameType: true, //船舶信息
      radio3: "", //拟定金额单选框绑定值
      punishList: [],
      changePartyIdType2Index: "",
      theStr: "", // 输入框长度到达设定值时输入框的内容
      recentCheckStastions: [], //最近五个检测站
      recentCheckWorkers: [], //历史保存过检测人员
      vehicleTypeList: [], //车型
      vehicleAxlesTypeList: [], //轴数
      brandList: [], //品牌
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
        harbourWorkPlace:"",
        harbourType:"",
        harbourPlace:"",
        harbourName:"",
        shipPlace:"",
        shipLoadLine:"",
        shipHeight:"",
        shipWidth:"",
        shipLength:"",
        shipTransportId:"",
        shipPower:"",
        shipWeight:"",
        shipType:"",
        shipName:"",
        shipPeopleId:"",
        harbourLicense:"",
        shipNumber:"",
        vehicleIdColor: "",
        portTypeList:"",
        vehicleShipType: "",
        brand: "",
        ccertId: "",
        trailerIdNo: "",
        trailerColor: "",
        trailerType: "",
        trailerBrand: "",
        trailerCcertId: "",
        caseCauseNameCopy: "",
        illegalLaw: "", //违法条款
        punishLaw: "", //处罚依据
        discretionId: "", //自由裁量标准
        tempPunishAmount: "", //拟处罚金额
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
      directionSite: [],
      locationList: [],
      rules: {
        caseSource: [{ required: true, message: "请选择", trigger: "change" }],
        caseSourceText: [
          {
            required: true,
            validator: validatecaseSourceText,
            trigger: "change",
          },
        ],
        afsj: [{ validator: validateTime, trigger: "change" }],
        acceptTime: [
          { required: true, message: "请选择时间", trigger: "change" },
          { required: true, validator: validateTime, trigger: "change" },
        ],
        party: [
          // { required: true, message: "请输入", trigger: "blur" },
          { required: true, validator: validatePart, trigger: "blur" },
        ],
        partyName: [
          // { required: true, message: "请输入", trigger: "blur" },
          { required: true, validator: validatePartName, trigger: "blur" },
        ],
        lawPersonListId: [
          {
            required: true,
            validator: validateLawPersonNumber,
            trigger: "change",
          },
        ],
        "otherInfo.checkTime": [
          { required: true, message: "请输入检测时间", trigger: "change" },
        ],
        "otherInfo.vehiclefiledThing": [
          { required: true, message: "请输入装载物", trigger: "change" },
        ],
        /*           'driverOrAgentInfo.relationWithCase': [
            {required: true, message: "请选择案件关系", trigger: "change"}
          ], */
        illegalLaw: [
          { required: false, message: "请选择违法条款", trigger: "change" },
        ],
        punishLaw: [
          { required: false, message: "请选择处罚依据", trigger: "change" },
        ],
        partyZipCode: [{ validator: validateZIP, trigger: "blur" }],
        provincesAddressArray: [
          { required: true, validator: validatePart, trigger: "change" },
        ],
        partyIdNo: [
          { required: true, validator: validatePart, trigger: "blur" },
          { validator: checkIdNoPassSort, trigger: "blur" },
        ],
        partyTel: [
          { required: true, validator: validatePart, trigger: "blur" },
          { validator: validatePhone, trigger: "blur" },
        ],
        partyAddress: [
          { required: true, validator: validatePart, trigger: "blur" },
        ],
        partyAge: [{ validator: validateAge, trigger: "blur" }],
        partyManager: [
          { required: true, validator: validatePartName, trigger: "blur" },
        ],
        partyUnitAddress: [
          { required: true, validator: validatePartName, trigger: "blur" },
        ],
        partyUnitTel: [
          { required: true, validator: validatePartName, trigger: "blur" },
          { validator: validatePhone, trigger: "blur" },
        ],
        socialCreditCode: [
          { required: true, validator: validatePartName, trigger: "blur" },
        ],
        highwayRoute: [
          {
            required: false,
            message: "请选择本机构路线编号",
            trigger: "change",
          },
        ],
        direction: [
          { required: true, message: "请选择方向", trigger: "change" },
        ],
        position: [
          { required: true, message: "请选择位置", trigger: "change" },
        ],
        distance: [
          { required: true, message: "请输入米数", trigger: "change" },
          { validator: validateIsNumber, trigger: "change" },
        ],
        pileNumber: [
          { required: true, message: "请输入公里数", trigger: "change" },
          { validator: validateIsNumber, trigger: "change" },
        ],
        pileNumber2: [{ validator: validateIsNumber, trigger: "change" }],
        distance2: [{ validator: validateIsNumber, trigger: "change" }],
        vehicleShipId: [{ validator: vaildateCardNum, trigger: "blur" }],
        trailerIdNo: [{ validator: vaildateCardNum, trigger: "blur" }],
      },
      //案件类型
      allcaseSource: [
        { value: "行政检查", label: "行政检查", placeholder: "" },
        { value: "投诉举报", label: "投诉举报", placeholder: "" },
        {
          value: "上级交办",
          label: "上级交办",
          placeholder: "请输入上级机关名称",
        },
        {
          value: "下级报请",
          label: "下级报请",
          placeholder: "请输入下级机关名称",
        },
        {
          value: "部门移送",
          label: "部门移送",
          placeholder: "请输入移送部门名称",
        },
        { value: "其他途径", label: "其他途径", placeholder: "请输入发现途径" },
      ],
      caseSourceTextPla: "",
      //证件类型
      credentialType: [
        { value: "0", label: "身份证" },
        { value: "1", label: "护照" },
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
          zigeNumber: "",
          shipPeopleId:""
        },
      ],
      driverOrAgentInfo: {
        relationWithParty: "1",
        age: "",
      },
      allRelationWithParty: [
        //与当事人关系下拉框
        /* {value: "0", label: "同一人"},
          {value: "1", label: "近亲戚"},
          {value: "2", label: "借用车辆"},
          {value: "3", label: "雇佣关系"},
          {value: "4", label: "车辆所有人"} */
      ],
      allRelationWithParty_: [
        //与当事人关系下拉框
        /* {value: "1", label: "近亲戚"},
          {value: "2", label: "借用车辆"},
          {value: "3", label: "雇佣关系"},
          {value: "4", label: "车辆所有人"} */
      ],
      allRelationWithCase: [
        //与案件关系下拉框
        /* {value: "0", label: "当事人"},
          {value: "1", label: "驾驶人"},
          {value: "2", label: "实际所有者"},
          {value: "3", label: "证人"},
          {value: "4", label: "承运人"},
          {value: "5", label: "代理人"} */
      ],
      allQYRelationWithParty: [
        //与当事人关系下拉框(企业组织)
        /* { value: "2", label: "借用车辆" },
        { value: "3", label: "雇佣关系" },
        { value: "5", label: "其他" } */
      ],
      allQYRelationWithCase: [
        //与案件关系下拉框(企业组织)
        /* { value: "1", label: "驾驶人" },
        { value: "3", label: "证人" },
        { value: "4", label: "承运人" },
        { value: "5", label: "代理人" } */
      ],
      allVehicleIdColor: [
        //车牌颜色下拉框
        /* {value: "1", label: "黄色"},
          {value: "2", label: "蓝色"},
          {value: "3", label: "绿色"},
          {value: "4", label: "黄绿"},
          {value: "5", label: "黑色"},
          {value: "6", label: "白色"},
          {value: "7", label: "其他"} */
      ],
      allVehicleShipType: [
        /* {value: "中小客车", label: "中小客车"},
          {value: "大客车", label: "大客车"},
          {value: "小型货车", label: "小型货车"},
          {value: "中型货车", label: "中型货车"},
          {value: "大型货车", label: "大型货车"},
          {value: "特大型货车", label: "特大型货车"},
          {value: "集装箱车", label: "集装箱车"},
          {value: "摩托车", label: "摩托车"},
          {value: "拖拉机", label: "拖拉机"} */
      ],
      shipType: [],
      loadLineList: [],
      portTypeList:[],
      dateShow: false,
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
      hasLatitudeAndLongitude: false, //案发坐标是否已经获取
      provincesList: [], //行政区划
      subAreaCascader: "subAreaCascader",
      maxLawerLimit: "",
      minLawerLimit: "",
      punishAmountAtention: "", //拟定金额提示语
      chosedLawItem: {},
    };
  },
  components: {
    chooseLawPerson,
    punishDiag,
    mapDiag,
    caseSlideMenu,
    chooseillegalAct,
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

    //更改案件来源
    changeCaseSource(item) {
      if (item.value === "行政检查" || item.value === "投诉举报") {
        this.caseSourceTextDisable = false;
        this.inforForm.caseSourceText = "";
      } else {
        this.caseSourceTextPla = item.placeholder;
        this.caseSourceTextDisable = true;
      }
      this.inforForm.caseSource = item.value;
    },
    //查询案发时间和受案时间相差天数
    checkDays() {
      this.dateShow = false;
      let afsj = this.inforForm.afsj; // 案发时间
      let acceptTime = this.inforForm.acceptTime; // 受案时间
      if (this.inforForm.afsj && this.inforForm.acceptTime) {
        let diff = new Date(acceptTime).getTime() - new Date(afsj).getTime();
        let days = diff / 24 / 60 / 60 / 1000;
        if (days > 10) {
          this.dateShow = true;
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
        this.inforForm.shipPeopleId = "";
      }
      if (
        this.driverOrAgentInfoList[0].relationWithParty == "同一人" ||
        this.driverOrAgentInfoList[0].relationWithParty == "近亲戚" ||
        this.driverOrAgentInfoList[0].relationWithParty == "车辆所有人" ||
        this.driverOrAgentInfoList[0].relationWithParty == "其它" ||
        this.driverOrAgentInfoList[0].relationWithCase == "当事人" ||
        this.driverOrAgentInfoList[0].relationWithCase == "实际所有者"
      ) {
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
        this.driverOrAgentInfoList[0].shipPeopleId = "";
        this.relationWithPartyIsOne[0] = false;
      }
    },
    changeDriverOrAgentInfo(type) {
      let val = this.driverOrAgentInfoList[0].relationWithParty;
      if (val === "同一人" && this.partyTypePerson == "1") {
        this.driverOrAgentInfoList[0].relationWithCase = "当事人";
        this.driverOrAgentInfoList[0].name = this.inforForm.party;
        this.driverOrAgentInfoList[0].zhengjianType = this.inforForm.partyIdType;
        this.driverOrAgentInfoList[0].zhengjianNumber = this.inforForm.partyIdNo;
        this.driverOrAgentInfoList[0].sex = this.inforForm.partySex;
        this.driverOrAgentInfoList[0].age = this.inforForm.partyAge;
        this.driverOrAgentInfoList[0].tel = this.inforForm.partyTel;
        this.driverOrAgentInfoList[0].adress = this.inforForm.partyAddress;
        this.driverOrAgentInfoList[0].provincesAddress = this.inforForm.provincesAddressArray;
        this.driverOrAgentInfoList[0].adressCode = this.inforForm.partyZipCode;
        this.driverOrAgentInfoList[0].company = this.inforForm.partyUnitPosition;
        this.driverOrAgentInfoList[0].position = this.inforForm.occupation;
        this.driverOrAgentInfoList[0].zigeNumber = this.inforForm.partyEcertId;
        this.driverOrAgentInfoList[0].shipPeopleId = this.inforForm.shipPeopleId;
        this.relationWithPartyIsOne[0] = true;
      }
    },
    //更改与当事人关系   为同一人时自动赋值且不可编辑
    changeRelationWithParty(index) {
      console.log(index, "index");
      let val = this.driverOrAgentInfoList[index].relationWithParty;
      if (val === "同一人") {
        console.log(val);
        this.driverOrAgentInfoList[index].relationWithCase = "当事人";
        this.driverOrAgentInfoList[index].name = this.inforForm.party;
        this.driverOrAgentInfoList[
          index
        ].zhengjianType = this.inforForm.partyIdType;
        this.driverOrAgentInfoList[
          index
        ].zhengjianNumber = this.inforForm.partyIdNo;
        this.driverOrAgentInfoList[index].sex = this.inforForm.partySex;
        this.driverOrAgentInfoList[index].age = this.inforForm.partyAge;
        this.driverOrAgentInfoList[index].tel = this.inforForm.partyTel;
        this.driverOrAgentInfoList[index].adress = this.inforForm.partyAddress;
        this.driverOrAgentInfoList[
          index
        ].provincesAddress = this.inforForm.provincesAddressArray;
        this.driverOrAgentInfoList[
          index
        ].adressCode = this.inforForm.partyZipCode;
        this.driverOrAgentInfoList[
          index
        ].company = this.inforForm.partyUnitPosition;
        this.driverOrAgentInfoList[index].position = this.inforForm.occupation;
        this.driverOrAgentInfoList[index].zigeNumber = this.inforForm.partyEcertId;
        this.driverOrAgentInfoList[index].shipPeopleId = this.inforForm.shipPeopleId;
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
        this.driverOrAgentInfoList[index].shipPeopleId = "";
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
        provincesAddress: "",
        adressCode: "",
        company: "",
        position: "",
        zigeNumber: "",
        shipPeopleId:"",
      };
      this.driverOrAgentInfoList.push(item);
    },
    //添加挂车
    addTrailer() {
      this.inforForm.trailerColor = "1";
      this.showTrailer = true;
    },
    //点击处罚依据显示弹窗
    //点击处罚依据显示弹窗
    showPunishDiag(titleType = "") {
      let illageClauseLabel = "";
      let punishClauseLabel = "";
      if (titleType == "compensation") {
        (titleType = "选择认定条款及赔（补）偿依据"),
          (illageClauseLabel = "认定条款");
        punishClauseLabel = "赔（补）偿依据";
      } else {
        titleType = "选择违法条款及处罚依据";
        illageClauseLabel = "违法条款";
        punishClauseLabel = "处罚依据";
      }
      let data = {
        // caseCauseId: this.inforForm.caseCauseId,
        caseCauseName: this.inforForm.caseCauseName,
        titleType: titleType,
        illageClauseLabel,
        punishClauseLabel,
        punishList: this.punishList,
      };
      this.$refs.punishDiagRef.showModal(data);
    },
    //获取违法条款、依据数据
    getPunishList() {
      this.$store
        .dispatch("findLawRegulationsByCauseId", this.inforForm.caseCauseId)
        .then(
          (res) => {
            this.punishList = res.data;
            if (this.judgFreedomList.length === 0) {
              this.initMoneyWhenNotExistStandard();
            }
          },
          (err) => {}
        );
    },
    //设置违法条款和处罚条款
    setIllegalLawAndPunishLaw(data) {
      console.log("设置违法条款和处罚条款 -> data", data);
      let illegalLawArr = [];
      let punishLawArr = [];
      let maxArr = [];
      let minArr = [];

      data.forEach((item) => {
        illegalLawArr.push(item.illageClause);
        punishLawArr.push(item.punishClause);
        maxArr.push(item.upperLimit);
        minArr.push(item.lawerLimit);
      });
      //暂存上下限，表单进入时用
      this.inforForm.upperLimit = maxArr.join(",");
      this.inforForm.lawerLimit = minArr.join(",");
      if (this.judgFreedomList.length == 0) {
        this.maxLawerLimit = Math.max(...maxArr);
        this.minLawerLimit = Math.min(...minArr);
      }

      this.inforForm.illegalLaw = illegalLawArr.join(";");
      this.inforForm.punishLaw = punishLawArr.join(";");
    },
    //有裁量标准选项时，初始化拟定金额，最大最小金额
    initMoneyWhenExistStandard(obj) {
      this.radio3 = obj.id;
      this.minLawerLimit = obj.lawerLimit;
      this.maxLawerLimit = obj.upperLimit;
      this.inforForm.tempPunishAmount = obj.lawerLimit;
    },
    //无裁量标准选项时，初始化最大最小金额
    initMoneyWhenNotExistStandard(obj) {
      console.log("无裁量标准选项时inforForm", this.inforForm);
      console.log("无裁量标准选项时punishList", this.punishList);
      console.log(" this.minLawerLimit", this.minLawerLimit);
      console.log(" this.maxLawerLimit", this.maxLawerLimit);
      let formdata = this.inforForm;
      let maxArr = formdata.upperLimit.split(",");
      let minArr = formdata.lawerLimit.split(",");
      this.maxLawerLimit = Math.max(...maxArr);
      this.minLawerLimit = Math.min(...minArr);
    },
    //获取自由裁量标准
    findJudgFreedomList(caseCauseId) {
      let _this = this;
      let data = {};
      let someCaseInfo = iLocalStroage.gets("someCaseInfo");
      if (someCaseInfo) {
        data = {
          causeId: someCaseInfo.illageActId,
        };
      } else {
        data = {
          causeId: caseCauseId,
        };
      }
      console.log("causeId", data);

      findJudgFreedomListApi(data).then(
        (res) => {
          if (res.data.length) {
            _this.judgFreedomList = res.data;
            _this.initMoneyWhenExistStandard(res.data[0]);
          }
        },
        (err) => {}
      );
    },
    //自由裁量标准选择变化
    handleMoneyChange(val, v2) {
      console.log(" -> val,v2", val, v2);
      this.judgFreedomList.forEach((item) => {
        if (val === item.id) {
          this.minLawerLimit = item.lawerLimit;
          this.maxLawerLimit = item.upperLimit;
          this.inforForm.tempPunishAmount = item.lawerLimit;
        }
      });
      this.changeTempPunishAmount();
    },
    //计算拟处罚金额上下限数值，分有无自由裁量2种情况
    // 修改拟定金额input值
    changeTempPunishAmount() {
      if (this.inforForm.tempPunishAmount == "") {
        this.punishAmountAtention = "";
        return;
      }
      if (
        parseInt(this.inforForm.tempPunishAmount) < parseInt(this.minLawerLimit)
      ) {
        this.punishAmountAtention = "拟处罚金额已低于自由裁量标准下限";
        return;
      }
      if (
        parseInt(this.inforForm.tempPunishAmount) > parseInt(this.maxLawerLimit)
      ) {
        this.punishAmountAtention = "拟处罚金额已超过自由裁量标准上限";
        return;
      }
      if (this.inforForm.tempPunishAmount < 0) {
        this.inforForm.tempPunishAmount = 0;
        this.punishAmountAtention = "拟处罚金额不可以小于零";
        return;
      }
      this.punishAmountAtention = "";
    },
    toNextPart() {},
    //点击滚动
    jump(index) {
      console.log(this.$el);
      this.activeA = [false, false, false, false, false];
      this.activeA[index - 1] = true;
      if (index >= 1) {
        let numTotal = 0;
        for (let i = 0; i < index; i++) {
          // let elPageOt = this.$el.querySelector(`#link_${i}`) ? this.$el.querySelector(`#link_${i}`).offsetHeight : 40;
          let elPageOt = this.$el.querySelector(`#link_${i}`)
            ? this.$el.querySelector(`#link_${i}`).offsetHeight
            : 0;
          numTotal += elPageOt;
        }
        console.log("numTotal", numTotal);
        document.getElementById("inforCollectionBox").scrollTop = numTotal;
      }
    },
    //提交信息
    submitInfo(state) {
      console.log("提交信息：", this.inforForm)
      if (!this.inforForm.latitudeAndLongitude) {
        this.$message("请获取坐标！");
        return;
      }
      let _this = this;
      let result = true;
      for (var field in _this.rules) {
        let obj = this.$refs["inforForm"];
        let _this = this;
        obj.validateField(field, (validMessage) => {
          if (validMessage !== "" && result === true) {
            result = false;
            return result;
          }
        });
      }
      if (result) {
        _this.inforForm.agentPartyEcertId = JSON.stringify(
          _this.driverOrAgentInfoList
        );
        // 超限
        _this.inforForm.otherInfo = JSON.stringify(_this.inforForm.otherInfo);
        _this.inforForm.state = state;
        _this.inforForm.caseStatus = "未立案";
        // 拼接案发地点
        if (_this.inforForm.zfmlId === "1002000100000000") {
          let afddSting =
            _this.inforForm.highwayRoute +
            _this.inforForm.direction +
            "k" +
            _this.inforForm.pileNumber +
            "+" +
            _this.inforForm.distance;
          if (_this.inforForm.distance2 || _this.inforForm.pileNumber2) {
            afddSting =
              afddSting +
              "至" +
              "k" +
              _this.inforForm.pileNumber2 +
              "+" +
              _this.inforForm.distance2 +
              " " +
              _this.inforForm.position;
          } else {
            afddSting = afddSting + " " + _this.inforForm.position;
          }
          _this.inforForm.afdd = afddSting;
        }
        let oldPartyAddress = this.inforForm.partyAddress;
        if (
          this.inforForm.provincesAddressArray &&
          this.inforForm.provincesAddressArray.length > 1
        ) {
          this.inforForm.provincesAddress = JSON.stringify(
            this.inforForm.provincesAddressArray
          );
          this.inforForm.partyAddress =
            this.inforForm.provincesAddress
              .replace("[", "")
              .replace("]", "")
              .replace(/"/g, "")
              .replace(/,/g, "") + this.inforForm.partyAddress;
        }
        _this.$store
          .dispatch("saveOrUpdateCaseBasicInfo", _this.inforForm)
          .then(
            (res) => {
              console.log(res);
              this.inforForm.partyAddress = oldPartyAddress;
              _this.$message({
                type: "success",
                message: "提交成功!",
              });
              _this.$store.dispatch("deleteTabs", _this.$route.name);
              _this.$store.commit("setCaseId", res.data.id);
              //设置
              _this.$store.commit("setCaseNumber", res.data.tempNo);
              iLocalStroage.removeItem("stageCaseId");
              this.autoSava = false;

              if (this.openTab) {
                let replaceIndex = null;
                for (let i = 0; i < this.openTab.length; i++) {
                  if (this.openTab[i].route == "/compensationInforCollect") {
                    replaceIndex = i;
                    break;
                  }
                }
                if (replaceIndex) {
                  this.openTab[replaceIndex].menuUrl = "case_handle_establish";
                  this.openTab[replaceIndex].name =
                    "case_handle_establish" +
                    "-and-" +
                    this.caseHandle.caseNumber;
                  this.openTab[replaceIndex].route = "/establish";
                }
              }
              this.$store.commit("setApprovalState", "");
              //跳转立案登记
              this.getCaseNextRoute("立案登记").then((res) => {
                this.$router.push({
                  name: res,
                });
              });
            },
            (err) => {
              this.inforForm.partyAddress = oldPartyAddress;
              console.log(err);
            }
          );
      }
    },
    //查询执法人员
    getAllUserList(list) {
      console.log("list", list);
      this.allUserList = list;
      setTimeout(() => {}, 100);
    },
    stageInfo(state) {
      this.inforForm.agentPartyEcertId = JSON.stringify(
        this.driverOrAgentInfoList
      );
      // 超限
      this.inforForm.otherInfo = JSON.stringify(this.inforForm.otherInfo);
      console.log(this.inforForm);

      let oldPartyAddress = this.inforForm.partyAddress;
      if (
        this.inforForm.provincesAddressArray &&
        this.inforForm.provincesAddressArray.length > 1
      ) {
        this.inforForm.provincesAddress = JSON.stringify(
          this.inforForm.provincesAddressArray
        );
        this.inforForm.partyAddress =
          this.inforForm.provincesAddress
            .replace("[", "")
            .replace("]", "")
            .replace(/"/g, "")
            .replace(/,/g, "") + this.inforForm.partyAddress;
      }

      this.inforForm.state = state;
      this.inforForm.caseStatus = "未立案";
      let _this = this;

      this.$store.dispatch("saveOrUpdateCaseBasicInfo", this.inforForm).then(
        (res) => {
          console.log(this.inforForm);
          this.inforForm.partyAddress = oldPartyAddress;
          if (this.inforForm.otherInfo) {
            this.inforForm.otherInfo = JSON.parse(this.inforForm.otherInfo);
          }
          _this.$message({
            type: "success",
            message: "暂存成功!",
          });
          _this.$store.commit("setCaseId", res.data.id);
          iLocalStroage.set("stageCaseId", res.data.id);
          // this.autoSava = false;
        },
        (err) => {
          this.inforForm.partyAddress = oldPartyAddress;
          console.log(err);
        }
      );
    },
    //右侧小导航进入的，则获取案件信息
    fromSlide() {
      console.log("fromSlide");
      let data = {
        id: this.caseId,
      };
      let _this = this;
      this.$store.dispatch("getCaseBasicInfo", data).then(
        (res) => {
          let dataArray = [];
          _this.driverOrAgentInfoList = JSON.parse(res.data.agentPartyEcertId);
          if (res.data.provincesAddress) {
            res.data.provincesAddressArray = JSON.parse(
              res.data.provincesAddress
            );
            res.data.partyAddress = res.data.partyAddress.replace(
              res.data.provincesAddress
                .replace("[", "")
                .replace("]", "")
                .replace(/"/g, "")
                .replace(/,/g, ""),
              ""
            );
            if (res.data.provincesAddressArray.length > 1) {
              let obj = {
                first: res.data.provincesAddressArray[0],
                second: res.data.provincesAddressArray[1],
              };
              if (res.data.provincesAddressArray.length == 3) {
                obj.three = res.data.provincesAddressArray[2];
              }
              dataArray.push(obj);
            }
          }
          if (_this.driverOrAgentInfoList.length > 0) {
            _this.driverOrAgentInfoList.forEach((p) => {
              if (p.provincesAddress && p.provincesAddress.length > 1) {
                let subObj = {
                  first: p.provincesAddress[0],
                  second: p.provincesAddress[1],
                };
                if (p.provincesAddress.length == 3) {
                  subObj.three = p.provincesAddress[2];
                }
                dataArray.push(subObj);
              }
            });
          }
          this.initProvincesList(dataArray);

          _this.inforForm = res.data;
          console.log("222222222", _this.inforForm);
          _this.handleCaseData(res.data);
          _this.findJudgFreedomList(res.data.caseCauseId);
          _this.getPunishList();
          console.log("plist", _this.provincesList);
        },
        (err) => {
          console.log(err);
        }
      );
    },

    //处理数据回显问题
    handleCaseData(data) {
      console.log("handleCaseData方法", data);
      this.showCaseSourceAfterInput(data.caseSource);
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

      //案发坐标
      this.hasLatitudeAndLongitude = data.latitudeAndLongitude !== "";
      console.log("坐标是否获取", this.hasLatitudeAndLongitude);
      //超限信息
      if (data.otherInfo != "") {
        // this.inforForm.otherInfo = JSON.parse(data.otherInfo);
        this.$set(this.inforForm, "otherInfo", JSON.parse(data.otherInfo));
      }
      if (data.caseCauseName == "车辆在公路上擅自超限行驶") {
        this.showOverrun = true;
      }
      if (data.caseStatus == "待审批") {
        this.isHandleCase = true;
      }
      if (data.trailerIdNo != "") {
        this.showTrailer = true;
      }
      if (data.discretionId != "") {
        this.activeJudgli = data.discretionId;
      }

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
      if (this.inforForm.zfml == "水路运政" || this.inforForm.zfml == "港口行政" || this.inforForm.zfml == "航道行政" || this.inforForm.zfml == "海事行政") {
        this.cateNameType = false;
      }
    },
    initProvincesList(data) {
      this.$store.dispatch("getCountryTree", data).then((res) => {
        this.provincesList = res.data;
      });
    },
    //案件来源后的输入框是否显示
    showCaseSourceAfterInput(caseSource) {
      if (
        caseSource === "行政检查" ||
        caseSource === "投诉举报" ||
        caseSource == ""
      ) {
        this.caseSourceTextDisable = false;
      } else {
        this.caseSourceTextDisable = true;
      }
    },
    // 超重限制及抽屉表
    weightLimit(type) {
      var inforForm = this.inforForm;
      if (type == "车辆轴数") {
        this.vehicleTypeList = [];
        this.vehicleAxlesTypeList = [];
        this.inforForm.otherInfo.vehicleType = "";
        this.inforForm.otherInfo.vehicleAxlesType = "";
        this.inforForm.otherInfo.vehiclePowerType = "";
      }
      if (type == "车型") {
        this.vehicleAxlesTypeList = [];
        this.inforForm.otherInfo.vehicleAxlesType = "";
        if (inforForm.otherInfo.vehicleType == "载货汽车") {
          if (inforForm.otherInfo.vehicleAxleNumber == 4) {
            this.vehicleAxlesTypeList = [{ label: "2+2", value: "2+2" }];
          }
        } else if (inforForm.otherInfo.vehicleType == "中置轴挂车列车") {
          if (inforForm.otherInfo.vehicleAxleNumber == 4) {
            this.vehicleAxlesTypeList = [
              { label: "1+1+2", value: "1+1+2" },
              { label: "1+2+1", value: "1+2+1" },
            ];
          } else if (inforForm.otherInfo.vehicleAxleNumber == 5) {
            this.vehicleAxlesTypeList = [
              { label: "1+2+2", value: "1+2+2" },
              { label: "2+1+2", value: "2+1+2" },
            ];
          } else if (inforForm.otherInfo.vehicleAxleNumber == 6) {
            this.vehicleAxlesTypeList = [
              { label: "1+2+3", value: "1+2+3" },
              { label: "2+2+2", value: "2+2+2" },
            ];
          }
        } else if (inforForm.otherInfo.vehicleType == "铰接列车") {
          if (inforForm.otherInfo.vehicleAxleNumber == 4) {
            this.vehicleAxlesTypeList = [{ label: "1+1+2", value: "1+1+2" }];
          } else if (inforForm.otherInfo.vehicleAxleNumber == 5) {
            this.vehicleAxlesTypeList = [
              { label: "1+2+2", value: "1+2+2" },
              {
                label: "2+1+2",
                value: "2+1+2",
              },
              { label: "1+1+3", value: "1+1+3" },
            ];
          } else if (inforForm.otherInfo.vehicleAxleNumber == 6) {
            this.vehicleAxlesTypeList = [{ label: "1+2+3", value: "1+2+3" }];
          }
        } else if (inforForm.otherInfo.vehicleType == "全挂汽车列车") {
          if (inforForm.otherInfo.vehicleAxleNumber == 4) {
            this.vehicleAxlesTypeList = [
              { label: "1+1+1+1", value: "1+1+1+1" },
            ];
          } else if (inforForm.otherInfo.vehicleAxleNumber == 5) {
            this.vehicleAxlesTypeList = [
              { label: "1+2+2", value: "1+2+2" },
              { label: "2+1+2", value: "2+1+2" },
            ];
          } else if (inforForm.otherInfo.vehicleAxleNumber == 6) {
            this.vehicleAxlesTypeList = [{ label: "2+2+2", value: "2+2+2" }];
          }
        }
      }

      inforForm.otherInfo.weightLimit = "";
      if (inforForm.otherInfo.vehicleAxleNumber == 6) {
        this.vehicleTypeList = [
          { label: "中置轴挂车列车", value: "中置轴挂车列车" },
          {
            label: "铰接列车",
            value: "铰接列车",
          },
          { label: "全挂汽车列车", value: "全挂汽车列车" },
        ];
        if (
          inforForm.otherInfo.vehiclePowerType &&
          inforForm.otherInfo.vehicleAxlesType
        ) {
          inforForm.otherInfo.weightLimit = 46;
          if (inforForm.otherInfo.vehiclePowerType == "双轴") {
            inforForm.otherInfo.weightLimit = 49;
          }
        }
      }
      if (inforForm.otherInfo.vehicleAxleNumber == 5) {
        this.vehicleTypeList = [
          { label: "中置轴挂车列车", value: "中置轴挂车列车" },
          {
            label: "铰接列车",
            value: "铰接列车",
          },
          { label: "全挂汽车列车", value: "全挂汽车列车" },
        ];
        if (
          inforForm.otherInfo.vehicleAxleNumber &&
          inforForm.otherInfo.vehicleType &&
          inforForm.otherInfo.vehicleAxlesType
        ) {
          this.inforForm.otherInfo.weightLimit = 43;
          if (inforForm.otherInfo.vehicleAxlesType == "1+1+3") {
            inforForm.otherInfo.weightLimit = 42;
          }
        }
      }
      if (inforForm.otherInfo.vehicleAxleNumber == 4) {
        this.vehicleTypeList = [
          { label: "中置轴挂车列车", value: "中置轴挂车列车" },
          {
            label: "铰接列车",
            value: "铰接列车",
          },
          { label: "全挂汽车列车", value: "全挂汽车列车" },
          { label: "载货汽车", value: "载货汽车" },
        ];
        if (
          inforForm.otherInfo.vehicleAxleNumber &&
          inforForm.otherInfo.vehicleType &&
          inforForm.otherInfo.vehicleAxlesType
        ) {
          this.inforForm.otherInfo.weightLimit = 36;
          if (inforForm.otherInfo.vehicleType == "中置轴挂车列车") {
            if (inforForm.otherInfo.vehicleAxlesType == "1+2+1") {
              inforForm.otherInfo.weightLimit = 35;
            }
          }
          if (inforForm.otherInfo.vehicleType == "载货汽车") {
            inforForm.otherInfo.weightLimit = 31;
          }
        }
      }
      if (inforForm.otherInfo.vehicleAxleNumber == 3) {
        this.vehicleTypeList = [
          { label: "中置轴挂车列车", value: "中置轴挂车列车" },
          { label: "铰接列车", value: "铰接列车" },
          {
            label: "载货汽车",
            value: "载货汽车",
          },
        ];
        this.vehicleAxlesTypeList = [{ label: "1+1+1", value: "1+1+1" }];
        if (
          inforForm.otherInfo.vehicleAxleNumber &&
          inforForm.otherInfo.vehicleType &&
          inforForm.otherInfo.vehicleAxlesType
        ) {
          this.inforForm.otherInfo.weightLimit = 27;
          if (inforForm.otherInfo.vehicleType == "载货汽车") {
            inforForm.otherInfo.weightLimit = 25;
          }
        }
      }
      if (inforForm.otherInfo.vehicleAxleNumber == 2) {
        this.vehicleTypeList = [{ label: "载货汽车", value: "载货汽车" }];
        this.vehicleAxlesTypeList = [{ label: "1+1", value: "1+1" }];
        if (
          inforForm.otherInfo.vehicleType &&
          inforForm.otherInfo.vehicleAxlesType
        ) {
          this.inforForm.otherInfo.weightLimit = 18;
        }
      }

      if (
        this.inforForm.otherInfo.weightLimit &&
        this.inforForm.otherInfo.allWeight
      ) {
        if (
          this.inforForm.otherInfo.weightLimit <
          this.inforForm.otherInfo.allWeight
        ) {
          inforForm.otherInfo.overWeight =
            this.inforForm.otherInfo.allWeight -
            this.inforForm.otherInfo.weightLimit;
        } else {
          inforForm.otherInfo.overWeight = 0;
        }
      } else {
        inforForm.otherInfo.overWeight = "";
      }
    },
    // 计算超重
    concludeOverWeight() {
      if (
        this.inforForm.otherInfo.weightLimit &&
        this.inforForm.otherInfo.allWeight
      ) {
        this.inforForm.otherInfo.overWeight = "";
        if (
          this.inforForm.otherInfo.weightLimit <
          this.inforForm.otherInfo.allWeight
        ) {
          console.log("正正正数啊啊啊啊啊啊啊啊啊");
          this.inforForm.otherInfo.overWeight =
            this.inforForm.otherInfo.allWeight -
            this.inforForm.otherInfo.weightLimit;
        } else {
          console.log("服服服数啊啊啊啊啊啊啊啊啊");
          this.inforForm.otherInfo.overWeight = "0";
          console.log(
            " this.inforForm.otherInfo.overWeight",
            this.inforForm.otherInfo.overWeight
          );
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
        if (
          iden.substring(10, 12) < month ||
          (iden.substring(10, 12) == month && iden.substring(12, 14) <= day)
        )
          age++;
      }
      if (val === 15) {
        age = myDate.getFullYear() - iden.substring(6, 8) - 1901;
        sex = iden.substring(13, 14);
        if (
          iden.substring(8, 10) < month ||
          (iden.substring(8, 10) == month && iden.substring(10, 12) <= day)
        )
          age++;
      }

      if (sex % 2 === 0) {
        sex = 1;
      } else {
        sex = 0;
      }
      this.inforForm.partyAge = age;
      this.inforForm.partySex = sex;
      this.changeDriverOrAgentInfo();
    },
    //自动计算年龄
    changePartyIdType2(idCard, index) {
      for (let i = 0; i < this.driverOrAgentInfoList.length; i++) {
        if (
          idCard === this.inforForm.partyIdNo &&
          this.driverOrAgentInfoList[i].relationWithParty !== "当事人"
        ) {
          this.$message("身份证号不能相同！");
          return;
        }
        if (
          index !== i &&
          idCard === this.driverOrAgentInfoList[i].zhengjianNumber
        ) {
          this.$message("身份证号不能相同！");
          return;
        }
      }
      if (idCard === this.driverOrAgentInfoList[index].zhengjianNumber) {
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
          if (
            iden.substring(10, 12) < month ||
            (iden.substring(10, 12) == month && iden.substring(12, 14) <= day)
          )
            age++;
        }
        if (val === 15) {
          age = myDate.getFullYear() - iden.substring(6, 8) - 1901;
          sex = iden.substring(13, 14);
          if (
            iden.substring(8, 10) < month ||
            (iden.substring(8, 10) == month && iden.substring(10, 12) <= day)
          )
            age++;
        }

        if (sex % 2 === 0) {
          sex = 1;
        } else {
          sex = 0;
        }
        this.driverOrAgentInfoList[index].age = age;
        this.driverOrAgentInfoList[index].sex = sex;
      }
    },
    noFue(val) {
      this.inforForm.partyAge = val >= 0 ? val : 0;
    },
    noFueA(val) {
      console.log("this.driverOrAgentInfo.age", this.driverOrAgentInfo.age);
      this.driverOrAgentInfo.age = val >= 0 ? val : 0;
    },

    blur2(val) {
      var reg = /(^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$)|(^((\d3)|(\d{3}\-))?(\d{11})$)/;
      if (!reg.test(val) && val) {
        this.$message("联系电话格式错误");
      }
      // callback();
    },
    blur3(val) {
      var reg = /^\d{6}$/;
      if (!reg.test(val) && val) {
        this.$message("请输入正确的6位邮编");
      }
    },
    //查询历史记录
    findHistoryBySign(sign) {
      findHistoryBySignApi(iLocalStroage.gets("userInfo").id, sign).then(
        (res) => {
          console.log("历史记录", res);
          if (sign == "checkStastions") {
            this.recentCheckStastions = res.data;
          } else if (sign == "checkWorker") {
            this.recentCheckWorkers = res.data;
          } else if (sign == "brand") {
            this.brandList = res.data;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    //检测站 可输入也可以选择
    querySearch(queryString, cb) {
      console.log("输入搜索");
      let checkStastions = this.recentCheckStastions;
      var results = queryString
        ? checkStastions.filter(this.createFilter(queryString, checkStastions))
        : checkStastions;
      let a = [];
      results.forEach((item) => {
        a.push({ value: item.inputValue });
      });
      cb(a);
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
    //品牌 可输入也可以选择
    queryBrand(queryString, cb) {
      let brand = this.brandList;
      var results = queryString
        ? brand.filter(this.createFilter(queryString, brand))
        : brand;
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

    handleSelect(node) {
      if (node) {
        let data = this.$refs["areaCascader"].panel.getNodeByValue(
          node[node.length - 1]
        ).data;
        if (data.childrenCount > 0 && data.children.length == 0) {
          this.$store.dispatch("getCountry", data.adCode).then((res) => {
            data.children = res.data;
          });
        } else if (data.childrenCount == 0) {
          this.inforForm.partyZipCode = data.postCode;
          this.changeDriverOrAgentInfo("");
        }
      }
    },
    handleSelectDriverOrAgent(node, index, info) {
      if (node) {
        let data = this.$refs[
          "subAreaCascader" + index
        ][0].panel.getNodeByValue(node[node.length - 1]).data;
        if (data.childrenCount > 0 && data.children.length == 0) {
          this.$store.dispatch("getCountry", data.adCode).then((res) => {
            res.data.forEach((p) => {
              if (p.childrenCount > 0) {
                p.children = [];
              }
            });
            data.children = res.data;
          });
        } else if (data.childrenCount == 0) {
          info.adressCode = data.postCode;
        }
      }
    },
    getCountry(pCode) {
      let params = pCode;
      let _this = this;
      this.$store.dispatch("getCountry", params).then(
        (res) => {
          res.data.forEach((p) => {
            if (p.childrenCount > 0) {
              p.children = [];
            }
          });
          _this.provincesList = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    initDrawer() {
      let data = [];
      //案发地点-方向
      data.push({
        pid: "004cec030c349c3fcd119f3c2eee948f",
        fieldName: "directionList",
      });
      //港口类型
      data.push({
        pid: "c9708ac3e4911801d0540b1c6cb208f0",
        fieldName: "portTypeList",
      });
      data.push({
        pid: "5a8731a4dc24a131f8bd7b0790640309",
        fieldName: "directionSite",
      });
      data.push({
        pid: "96b8484bf556739bb642500c4bcc68e0",
        fieldName: "shipType",
      });
      //案发地点-位置
      data.push({
        pid: "a648aef61fdc2e8d578272c4f16d0c4f",
        fieldName: "locationList",
      });
      //挂车类型
      data.push({
        pid: "88fb46494f4ad3e934920afe212b2dbb",
        fieldName: "allTrailerTypeType",
      });
      //与案件关系
      data.push({
        pid: "1736c6fcb82ca70f0f71681c3be964a5",
        fieldName: "allRelationWithCase",
      });
      //与当事人关系
      data.push({
        pid: "36606c561616a5937a1951975af89923",
        fieldName: "allRelationWithParty",
      });
      //车牌颜色
      data.push({
        pid: "388c5ac24cde480df1a54bc97829a481",
        fieldName: "allVehicleIdColor",
      });
      //车辆类型
      data.push({
        pid: "758832d166deeeb0b533de2ec0303507",
        fieldName: "allVehicleShipType",
      });
      //与当事人关系(企业组织)
      data.push({
        pid: "27fc92deb37ffe10410f2598e8747603",
        fieldName: "allQYRelationWithParty",
      });
      //与案件关系(企业组织)
      data.push({
        pid: "c130153daef2f222f138995fa04e8b84",
        fieldName: "allQYRelationWithCase",
      });
      //核定载重线
      data.push({
        pid: "ad29001872f9e72aa7c98dc2cd909dfd",
        fieldName: "loadLineList",
      });
      let _this = this;
      this.$store.dispatch("getDrawerList", data).then(
        (res) => {
          console.log(res);
          _this.directionList = res.data.directionList;
          _this.directionSite = res.data.directionSite;
          _this.shipType = res.data.shipType;
          _this.locationList = res.data.locationList;
          _this.allTrailerTypeType = res.data.allTrailerTypeType;
          res.data.allRelationWithCase.forEach((p) => {
            if (_this.cateNameType) {
              if (p.name != "当事人(船员)") {
                _this.allRelationWithCase.push({
                  label: p.name,
                  value: p.sort,
                });
              }
            } else {
              if (p.name != "当事人(驾驶人)") {
                _this.allRelationWithCase.push({
                  label: p.name,
                  value: p.sort,
                });
              }
            }
          });
          res.data.allRelationWithParty.forEach((p) => {
            _this.allRelationWithParty.push({ label: p.name, value: p.sort });
            if (p.sort != "1") {
              _this.allRelationWithParty_.push({
                label: p.name,
                value: p.sort,
              });
            }
          });
          res.data.allVehicleIdColor.forEach((p) => {
            _this.allVehicleIdColor.push({ label: p.name, value: p.sort + "" });
          });
          res.data.allVehicleShipType.forEach((p) => {
            _this.allVehicleShipType.push({ label: p.name, value: p.name });
          });
          res.data.allQYRelationWithParty.forEach((p) => {
            _this.allQYRelationWithParty.push({ label: p.name, value: p.sort });
          });
          res.data.allQYRelationWithCase.forEach((p) => {
            _this.allQYRelationWithCase.push({ label: p.name, value: p.sort });
          });
          // res.data.directionSite.forEach((p) => {
          //   _this.directionSite.push({ label: p.name, value: p.sort });
          // });
          // console.log(_this.directionSite);
          // res.data.shipType.forEach((p) => {
          //   _this.shipType.push({ label: p.name, value: p.sort });
          // });
          res.data.loadLineList.forEach((p) => {
            _this.loadLineList.push({ label: p.name, value: p.sort });
          });
          res.data.portTypeList.forEach((p) => {
            _this.portTypeList.push({ label: p.name, value: p.sort });
          });
        },
        (err) => {
          console.log(err);
        }
      );
    },

    //超限长宽高限值自动计算
    countOverLength() {
      if (
        this.inforForm.otherInfo.lengthLimit &&
        this.inforForm.otherInfo.allLength
      ) {
        if (
          Number(this.inforForm.otherInfo.lengthLimit) <
          Number(this.inforForm.otherInfo.allLength)
        ) {
          this.inforForm.otherInfo.overLength =
            this.inforForm.otherInfo.allLength -
            this.inforForm.otherInfo.lengthLimit;
        } else {
          this.inforForm.otherInfo.overLength = "0";
        }
      } else {
        this.inforForm.otherInfo.overLength = "";
      }
    },
    countOverWidth() {
      if (
        this.inforForm.otherInfo.widthLimit &&
        this.inforForm.otherInfo.allWidth
      ) {
        if (
          Number(this.inforForm.otherInfo.widthLimit) <
          Number(this.inforForm.otherInfo.allWidth)
        ) {
          this.inforForm.otherInfo.overWidth =
            this.inforForm.otherInfo.allWidth -
            this.inforForm.otherInfo.widthLimit;
        } else {
          this.inforForm.otherInfo.overWidth = "0";
        }
      } else {
        this.inforForm.otherInfo.overWidth = "";
      }
    },
    countOverHeight() {
      if (
        this.inforForm.otherInfo.heightLimit &&
        this.inforForm.otherInfo.allHeight
      ) {
        if (
          Number(this.inforForm.otherInfo.heightLimit) <
          Number(this.inforForm.otherInfo.allHeight)
        ) {
          this.inforForm.otherInfo.overHeight =
            this.inforForm.otherInfo.allHeight -
            this.inforForm.otherInfo.heightLimit;
        } else {
          this.inforForm.otherInfo.overHeight = "0";
        }
      } else {
        this.inforForm.otherInfo.overHeight = "";
      }
    },
    //选择违法行为弹窗 （需求更改：违法行为可以修改 --连鹏飞）
    chooseIllegalAct() {
      let lawCate = {
        cateId: this.inforForm.zfmlId,
        cateName: this.inforForm.zfml,
      };
      this.$refs.chooseillegalActRef.showModal(lawCate);
    },
    //设置违法行为
    setIllegaAct(val) {
      this.inforForm.caseCauseNameCopy = this.inforForm.caseCauseName =
        val.strContent;
      this.inforForm.caseCauseId = val.id;
      this.inforForm.illegalLaw = "";
      this.inforForm.punishLaw = "";
      this.getPunishList();
    },
  },

  mounted() {
    // 事务中心跳转
    let overWeightCaseData = iLocalStroage.gets("overWeightCaseData");
    console.log("事务中心", overWeightCaseData);
    if (overWeightCaseData) {
      this.inforForm.caseSource = overWeightCaseData.caseSource;
      this.inforForm.caseCauseName = overWeightCaseData.caseCauseName;
      this.inforForm.programType = overWeightCaseData.programType;
      this.inforForm.partyType = overWeightCaseData.partyType;
      this.caseSourceTextDisable = true;
      this.showOverrun = true;
      this.inforForm.afsj = new Date();
      this.inforForm.afdd = "密云检测站 北京市顺密路荆栗园村K24+860";
      return;
    }

    let someCaseInfo = iLocalStroage.gets("someCaseInfo");
    console.log("3333333", iLocalStroage);
    console.log("3333333", someCaseInfo);
    this.inforForm.caseCauseName = someCaseInfo.illageAct;
    this.inforForm.caseCauseNameCopy = someCaseInfo.illageAct;
    this.inforForm.caseCauseId = someCaseInfo.illageActId;
    this.inforForm.programType = someCaseInfo.programType;
    this.inforForm.caseType = someCaseInfo.caseType;
    this.inforForm.caseTypeId = someCaseInfo.caseTypeId;
    this.inforForm.zfmlId = someCaseInfo.cateId;
    if (this.inforForm.zfmlId === "1002000100000000") {
      this.afddFlag = true;
    } else {
      this.afddFlag = false;
    }

    this.inforForm.zfml = someCaseInfo.cateName;
    console.log("标志", someCaseInfo.illageAct);
    this.showOverrun =
      someCaseInfo.illageAct == "车辆在公路上擅自超限行驶" ? true : false;
    console.log("showOverrun", this.showOverrun);

    this.driverOrAgentInfo.relationWithParty = "1";
    this.$set(this.inforForm.otherInfo, "checkResult", "未超限");

    this.inforForm.trailerColor = "1";

    if (someCaseInfo.cateName == "水路运政" || someCaseInfo.cateName == "港口行政" || someCaseInfo.cateName == "航道行政" || someCaseInfo.cateName == "海事行政") {
      this.cateNameType = false;
    }
    // 鼠标滚动
    this.$refs.link_1.addEventListener("scroll", this.scrool1);
    this.$refs.link_2.addEventListener("scroll", this.scrool2);
    this.$refs.link_3.addEventListener("scroll", this.scrool3);
    if (this.showOverrun) {
      this.$nextTick(() => {
        this.$refs.link_4.addEventListener("scroll", this.scrool4);
      });
    }
    this.$refs.link_5.addEventListener("scroll", this.scrool5);
  },
  activated() {
    if (this.directionList.length == 0) {
      this.initDrawer();
    }
  },
  created() {
    this.initDrawer();
    this.findRouteManageByOrganId();
    if (
      !this.$route.params.fromSlide &&
      !iLocalStroage.get("stageCaseId") &&
      !this.$route.params.editFlag
    ) {
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
    if (!this.$route.params.fromSlide && !iLocalStroage.get("stageCaseId")) {
      this.getCountry("100000");
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
    console.log("to", to);
    console.log("from", from);
    console.log("next", next);
    console.log("this.autoSava", this.autoSava);
    if (this.autoSava && to.name != "login") {
      //退出登录不自动暂存
      this.stageInfo(0);
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
.money_group {
  width: 100%;
  padding-left: 20px;
  .money_item {
    width: calc(100% - 20px);
    margin-bottom: 10px;
    .el-radio__label {
      display: inline-block;
      width: calc(100% - 5px);
      .money_name {
        display: inline-block;
        width: 20%;
      }
      .money_dist {
        display: inline-block;
        width: 65%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
      }
      .money_count {
        display: inline-block;
        width: 20%;
      }
    }
  }
  .el-radio.is-bordered + .el-radio.is-bordered {
    margin-left: 0;
  }
}
.cateNameType .el-form-item .el-form-item__label {
  line-height: 20px !important;
}
.caseFormBac > div .itemFive2 {
  width: calc(28% - 20px);
}
.caseFormBac > div .itemFiveOne {
  width: calc(28% - 20px);
  display: inline-block;
}
.caseFormBac > div .itemFiveTwo {
  width: calc(18% - 20px);
  display: inline-block;
}
.caseFormBac > div .appendSelect .el-select {
  width: 105px !important;
}
#inforCollectionBox .afddBox .showMapBtn {
  right: 0 !important;
}
</style>
