<template>
  <div id="inforCollectionBox">
    <div class="linkPart">
      <div class="linkPartCon">
        <a :class="activeA[0]? 'activeA' :''" @click="jump(1)" id="scrollDiv">案件情况</a>
        <a :class="activeA[1]? 'activeA' :''" @click="jump(2)">当事人</a>
        <a :class="activeA[2]? 'activeA' :''" @click="jump(3)">车辆信息</a>
        <a :class="activeA[3]? 'activeA' :''" @click="jump(4)">路损清单</a>
        <a :class="activeA[4]? 'activeA' :''" @click="jump(5)">违法事实</a>
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
          <div class="item hasMargintop"  v-if="showJBRecord">
             <el-button type="primary" size="small" @click="findReportRecordDocPdf">举报记录</el-button>
          </div>
          <div class="item" v-show="caseSourceTextDisable">
            <el-form-item prop="caseSourceText">
              <el-input
                ref="caseSourceText"
                v-model="inforForm.caseSourceText"
                :placeholder="caseSourceTextPla"
              ></el-input>

            </el-form-item>
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
        <div class="afddBox">
          <label class="el-form-item__label" style="width: 100px;">案发地点</label>
          <div class="itemFive2">
            <el-form-item label-width="0" prop="highwayRoute">
              <el-select ref="highwayRoute" v-model="inforForm.highwayRoute"  placeholder="本机构路线编号">
                <el-option v-for="item in routeList" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="itemFive2">
            <el-form-item label-width="20px" prop="direction">
              <el-select ref="direction" v-model="inforForm.direction" placeholder="方向">
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
              <el-select ref="position" v-model="inforForm.position" placeholder="位置">
                <el-option
                  v-for="item in directionList"
                  :key="item.name"
                  :label="item.label"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>

          <div class="showMapBtn"><label class="mustTip">*</label><el-button type="primary" icon="iconfont law-weizhi" size="mini" @click="showMap" v-if="!hasLatitudeAndLongitude">请获取坐标</el-button><el-button type="info" icon="iconfont law-weizhi" size="mini" disabled v-else>已获取坐标</el-button></div>
        </div>
        <div>
          <div class="gongLiBox1">K</div>
          <div class="itemFive">
            <el-form-item  prop="pileNumber" label-width="0px">
              <el-input v-model="inforForm.pileNumber" placeholder="公里数"></el-input>
            </el-form-item>
          </div>
          <div class="gongLiBox2">+</div>
          <div class="itemFive">
            <el-form-item label-width="0px" prop="distance">
              <el-input v-model="inforForm.distance" placeholder="米数" style="vertical-align: middle;">
                <template slot="append">m</template>
              </el-input>
            </el-form-item>

          </div>
          <div class="gongLiBox3">至</div>
          <div class="gongLiBox3">K</div>
          <div class="itemFive">
            <el-form-item  prop="pileNumber2" label-width="0px">
              <el-input v-model="inforForm.pileNumber2" placeholder="公里数"></el-input>
            </el-form-item>
          </div>
          <div class="gongLiBox2">+</div>
          <div class="itemFive">
            <el-form-item label-width="0px" prop="distance2">
              <el-input v-model="inforForm.distance2" placeholder="米数" style="vertical-align: middle;">
                <template slot="append">m</template>
              </el-input>
            </el-form-item>

          </div>
          <!-- <div class="itemFive">
            <el-form-item label="K">
              <el-input v-model="inforForm.pileNumber2" placeholder="公里数"></el-input>
            </el-form-item>
          </div>
          <div class="itemFive">
            <el-form-item label="+" label-width="30px">
              <el-input v-model="inforForm.distance2" placeholder="米数" style="vertical-align: middle;">
                <template slot="append">m</template>
              </el-input>
            </el-form-item>
          </div>  -->
        </div>
        <div>
          <div class="itemOne">
            <el-form-item label="执法人员" id="lawPersonBox" prop="lawPersonListId">
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
                  :disabled="currentUserLawId==item.id?true:false"
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
              <el-input
                ref="partyIdNo"
                placeholder="请输入内容"
                v-model="inforForm.partyIdNo"
                @change="changePartyIdType(inforForm.partyIdNo)"
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
              <el-select
                placeholder="请选择"
                v-model="inforForm.partySex"
                :disabled="inforForm.partyIdNo?true:false"
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
                :disabled="inforForm.partyIdNo?true:false"
                @change="noFue('inforForm.partyAge',inforForm.partyAge)"
              ></el-input>
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
              <el-input
                ref="partyZipCode"
                v-model="inforForm.partyZipCode"
                @blur="blur3($event.target.value)"
              ></el-input>
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
            <el-form-item label="职务">
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
              <el-input ref="partyName" v-model="inforForm.partyName"></el-input>
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
            <el-form-item label="统一社会信用代码" class="lable-height18px">
              <el-input v-model="inforForm.socialCreditCode"></el-input>
            </el-form-item>
          </div>
          <div class="itemBig">
            <el-form-item label="道路经营许可证" class="lable-height18px">
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
        <div
          class="driverOrAgentBox"
          v-for="(driverOrAgentInfo,index) in driverOrAgentInfoList"
          :key="index"
        >
          <div v-show="partyTypePerson=='1'">
            <div>
              <div class="item">
                <el-form-item label="与当事人关系">
                  <el-select
                    v-model="driverOrAgentInfo.relationWithParty"
                    @change="changeRelationWithParty(index)"
                  >
                    <el-option
                      v-for="item in index === 0?allRelationWithParty:allRelationWithParty_"
                      :key="item.value"
                      :label="item.label"
                      :value="item.label"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="item">
                <!-- 需要完善验证 -->
                <el-form-item label="与案件关系" class="is-required">
                  <el-select
                    v-model="driverOrAgentInfo.relationWithCase"
                    :disabled="index==0&&relationWithPartyIsOne[index]"
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
          <div v-show="partyTypePerson!='1'">
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
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="item">
                <!-- 需要完善验证 -->
                <el-form-item label="与案件关系" class="is-required">
                  <el-select v-model="driverOrAgentInfo.relationWithCase">
                    <el-option
                      v-for="item in allQYRelationWithCase"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
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
                  :disabled="index==0&&relationWithPartyIsOne[index]"
                ></el-input>
              </el-form-item>
            </div>
            <div class="item appendSelect">
              <el-form-item label="证件类型" prop="partyIdNo">
                <el-input
                  ref="partyIdNo"
                  placeholder="请输入内容"
                  v-model="driverOrAgentInfo.zhengjianNumber"
                  @change="changePartyIdType2(driverOrAgentInfo.zhengjianNumber,index)"
                  class="input-with-select hasMargintop"
                  :disabled="index==0&&relationWithPartyIsOne[index]"
                >
                  <el-select
                    slot="prepend"
                    v-model="driverOrAgentInfo.zhengjianType"
                    :disabled="index==0&&relationWithPartyIsOne[index]"
                  >
                    <el-option
                      v-for="item in credentialType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      :disabled="index==0&&relationWithPartyIsOne[index]"
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
                  :disabled="index==0&&relationWithPartyIsOne[index]"
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
                  :disabled="index==0&&relationWithPartyIsOne[index]"
                  @change="noFueA(driverOrAgentInfo.age)"
                ></el-input>
              </el-form-item>
            </div>
            <div class="itemThird">
              <el-form-item label="联系电话">
                <el-input
                  v-model="driverOrAgentInfo.tel"
                  :disabled="index==0&&relationWithPartyIsOne[index]"
                  @blur="blur2($event.target.value)"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div>
            <div class="itemBig">
              <el-form-item label="联系地址">
                <el-input
                  v-model="driverOrAgentInfo.adress"
                  :disabled="index==0&&relationWithPartyIsOne[index]"
                ></el-input>
              </el-form-item>
            </div>
            <div class="itemSmall">
              <el-form-item label="邮编">
                <el-input
                  v-model="driverOrAgentInfo.adressCode"
                  :disabled="index==0&&relationWithPartyIsOne[index]"
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
                  :disabled="index==0&&relationWithPartyIsOne[index]"
                ></el-input>
              </el-form-item>
            </div>
            <div class="itemSmall">
              <el-form-item label="职务">
                <el-input
                  v-model="driverOrAgentInfo.position"
                  :disabled="index==0&&relationWithPartyIsOne[index]"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div>
            <div class="itemOne">
              <el-form-item label="从业资格证号">
                <el-input
                  v-model="driverOrAgentInfo.zigeNumber"
                  :disabled="index==0&&relationWithPartyIsOne[index]"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <!-- 分隔线 -->
          <div class="line" v-if="index<driverOrAgentInfoList.length-1"></div>
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
      <div class="caseFormBac" id="link_4" ref="link_4" @mousewheel="scrool4">
        <p>路损清单</p>
        <div>
          <div class="item" id="payTotalBox">
            <el-form-item label="赔偿总金额">
              <el-input v-model="payTotal" disabled></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-button type="primary" size="small" @click="addpathLoss">添加</el-button>
          </div>
        </div>

        <div>
          <el-table :data="pathLossList" id="pathLossListTable">
            <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
            <el-table-column label="路产名称" prop="roadLcName" align="center"></el-table-column>
            <el-table-column label="单位" prop="roadLcUnit" align="center"></el-table-column>
            <el-table-column label="单价(元)" prop="roadLcPrice" align="center"></el-table-column>
            <el-table-column label="数量" width="150" align="center">
              <template slot-scope="scope">
                <el-input-number v-model="pathLossList[scope.$index].quantity" :min="1" size="mini"></el-input-number>
              </template>
            </el-table-column>
            <el-table-column label="合计" align="center">
              <template
                slot-scope="scope"
              >{{pathLossList[scope.$index].quantity * pathLossList[scope.$index].roadLcPrice}}</template>
            </el-table-column>
            <el-table-column label="备注" prop="roadLcNote" align="center">
              <template slot-scope="scope">
                <el-tooltip effect="dark" placement="top-start">
                  <div slot="content" style="max-width:200px">{{scope.row.roadLcNote}}</div>
                  <span>{{scope.row.roadLcNote}}</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="50" align="center">
              <template slot-scope="scope">
                <i class="iconfont law-delete" @click="deletePathLoss(scope.$index)"></i>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="caseFormBac" id="link_5" ref="link_5" @mousewheel="scrool5">
        <p>违法事实</p>
        <div>
          <div class="itemOne">
            <el-form-item label="违法行为" label-width="122px">
              <el-input v-model="inforForm.caseCauseNameCopy" :disabled="true" ></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemOne">
            <el-form-item label="认定条款" prop="illegalLaw" label-width="122px">
              <el-input ref="illegalLaw" v-model="inforForm.illegalLaw" :disabled="true">
                <el-button slot="append" icon="el-icon-search" @click="showPunishDiag('compensation')"></el-button>
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemOne">
            <el-form-item label="赔（补）偿依据" prop="punishLaw" label-width="122px">
              <el-input ref="punishLaw" v-model="inforForm.punishLaw" :disabled="true">
                <el-button slot="append" icon="el-icon-search" @click="showPunishDiag('compensation')"></el-button>
              </el-input>
            </el-form-item>
          </div>
        </div>

        <el-button
          class="caseSubmitBtn"
          icon="el-icon-plus"
          :disabled="disableBtn"
          @click="submitInfo(1)"
        >提交</el-button>
        <el-button
          class="caseSubmitBtn caseSubmitBtn2"
          icon="el-icon-plus"
          :disabled="disableBtn || disableZcBtn"
          @click="stageInfo(0)"
        >暂存</el-button>
      </div>
    </el-form>

    <chooseLawPerson ref="chooseLawPersonRef" @setLawPer="setLawPerson" @userList="getAllUserList"></chooseLawPerson>
    <punishDiag ref="punishDiagRef" @setIllegalLawAndPunishLaw="setIllegalLawAndPunishLaw"></punishDiag>
    <!--快速入口 -->

    <caseSlideMenu :activeIndex="'inforCollect'" @fromSlide="fromSlide"></caseSlideMenu>
    <!-- 置顶 -->
    <el-backtop target="#inforCollectionBox" :bottom="46" :right="8" :visibility-height="800">
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
    <choosePathLoss ref="choosePathLossRef" @selectData="selectRoadData"></choosePathLoss>
    <mapDiag ref="mapDiagRef" @getLngLat="getLngLat"></mapDiag>
  </div>
</template>
<script>
import { inforCollectionCommonMixins } from "@/common/js/caseHandle/inforCollectionCommonMixins";
import choosePathLoss from "./diag/choosePathLoss";
import mapDiag from "./diag/mapDiag";
import {mapGetters} from "vuex";
export default {
  mixins: [inforCollectionCommonMixins],
  data() {
    return {
      pathLossList: [],
      showJBRecord:false,
    };
  },
  // computed: {...mapGetters(['caseId','openTab','caseHandle'])},
  components: {
    choosePathLoss,
    mapDiag
  },
  computed: {
    payTotal() {
      let total = 0;
      for (var i in this.pathLossList) {
        total +=
          this.pathLossList[i].roadLcPrice * this.pathLossList[i].quantity;
      }
      return total;
    }
  },
  methods: {
    //添加路损
    addpathLoss() {
      //   let item = { name:'', unit:'', unitPrice:'', quantity:'', total:'', note:''}
      //   this.pathLossList.push(item);
      this.$refs.choosePathLossRef.showModal(this.pathLossList);
    },
    //删除路损
    deletePathLoss(lossIndex) {
      this.pathLossList.splice(lossIndex, 1);
    },
    //选中的路损
    selectRoadData(data) {
      //   data.forEach(item=>{
      //       item.quantity = 1;
      //   })
      this.pathLossList = [...this.pathLossList, ...data];
      this.pathLossList.map((v, i) => {
        let quantity = v.quantity || 0;
        this.$set(v, "quantity", quantity);
      });
    },
    changeCaseSource(item) {
        if(item.value === "投诉举报"){
            this.showJBRecord = true
        }else{
            this.showJBRecord = false;
        }
      if (item.value === "行政检查" || item.value === "投诉举报") {
        this.caseSourceTextDisable = false;
        this.inforForm.caseSourceText = '';

      } else {
        this.caseSourceTextPla = item.placeholder
        this.caseSourceTextDisable = true;
      }
      this.inforForm.caseSource = item.value
    },
    //显示地图
    showMap(){
      this.$refs.mapDiagRef.showModal();
    },
    //获取坐标
    getLngLat(lngLatStr){
        this.inforForm.latitudeAndLongitude = lngLatStr;
        this.hasLatitudeAndLongitude = true;
    },

    //查询举报文书有没有生成
    findReportRecordDocPdf(){
        this.$store.dispatch("getFile", {
            docId: this.BASIC_DATA_SYS.reportRecordDoc_caseDoctypeId,
            caseId: this.caseId,
          }).then(res=>{
              console.log('生成了举报文书',res);
              let otherData ={};
              if(res.length>=1){
                //显示举报文书的pdf
                  otherData={
                      nextRoute:'case_handle_myPDF',
                      params:{hasBack:true,status:2}
                  }
                  this.$store.commit('setDocId', this.BASIC_DATA_SYS.reportRecordDoc_caseDoctypeId);
              }else{
                //跳转举报记录文书
                 otherData={
                      nextRoute:'case_handle_reportRecordDoc'
                  }
              }
              this.stageInfo(0,otherData);

          })
          .catch(err=>{console.log(err)})
    }
  },
  created() {
    //新增属性
    this.$set(this.inforForm, "payTotal",);
    this.$set(this.inforForm, "roadDamageList");
    console.log('pathLossList',this.pathLossList);
    // this.findReportRecordDocPdf()
  },
  mounted(){

  }
};
</script>
<style lang="scss">
  @import "@/assets/css/caseHandle/index.scss";
</style>
