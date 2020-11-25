<template>
  <div id="inforCollectionBox">
    <div class="linkPart">
      <div class="linkPartCon">
        <a
          href="#"
          :class="activeA[0] ? 'activeA' : ''"
          @click="jump(1)"
          id="scrollDiv"
          ><i class="iconfont law-icon_chel"></i>车辆信息</a
        >
        <a href="#" :class="activeA[1] ? 'activeA' : ''" @click="jump(2)"
          ><i class="iconfont law-icon_qye"></i>驾驶人/企业</a
        >
        <a href="#" :class="activeA[2] ? 'activeA' : ''" @click="jump(3)"
          ><i class="iconfont law-icon_nianj"></i>初检信息</a
        >
        <a href="#" :class="activeA[3] ? 'activeA' : ''" @click="jump(4)"
          ><i class="iconfont law-icon_xzai"></i>卸载/复检记录</a
        >
        <a href="#" :class="activeA[4] ? 'activeA' : ''" @click="jump(5)"
          ><i class="iconfont law-icon_cfa"></i>抄告交警数据</a
        >
      </div>
    </div>
    <el-form
      :model="carInfo"
      :rules="carInfoRules"
      ref="carInfo"
      label-width="100px"
      style="margin-top: 82px"
      :disabled="!isEditStatus"
    >
      <div class="caseFormBac" id="link_1" ref="link_1" @mousewheel="scrool1">
        <p>车辆信息</p>
        <div>
          <div class="item">
            <el-form-item label="车牌颜色" prop="vehicleIdColor">
              <el-select v-model="carInfo.vehicleIdColor">
                <el-option
                  v-for="(item, index) in allVehicleIdColor"
                  :key="index"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="车辆号牌" prop="vehicleShipId">
              <el-input
                v-model="carInfo.vehicleShipId"
                placeholder="请输入车辆号牌"
              >
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click="searchNumber"
                ></el-button>
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="item">
            <el-form-item label="车型" prop="vehicleShipType">
              <el-select v-model="carInfo.vehicleShipType" placeholder="请选择">
                <el-option
                  v-for="(item, index) in allVehicleShipType"
                  :key="index"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="道路运输证号" prop="transportNum">
              <el-input
                v-model="carInfo.transportNum"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="item">
            <el-form-item
              label="车辆轴数"
              prop="axisNum"
              style="width: 70%; display: inline-block"
            >
              <el-select
                placeholder="请选择"
                v-model="carInfo.axisNum"
                @change="weightLimit(carInfo.axisNum)"
              >
                <el-option label="2" value="2"></el-option>
                <el-option label="3" value="3"></el-option>
                <el-option label="4" value="4"></el-option>
                <el-option label="5" value="5"></el-option>
                <el-option label="6" value="6"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label-width="0"
              prop="axisType"
              style="width: calc(30% - 6px); display: inline-block"
            >
              <el-select placeholder="请选择" v-model="carInfo.axisType">
                <el-option label="双轴" value="双轴"></el-option>
                <el-option label="单轴" value="单轴"></el-option>
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
            <el-form-item label="货物名称" prop="loadGoods">
              <el-input
                v-model="carInfo.loadGoods"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="item">
            <el-form-item label="起止地点" prop="startPlace">
              <el-input
                v-model="carInfo.startPlace"
                placeholder="装载货物起始点"
              ></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item prop="endPlace">
              <el-input
                v-model="carInfo.endPlace"
                placeholder="装载货物终止点"
              ></el-input>
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
              <el-select v-model="carInfo.trailerColor">
                <el-option
                  v-for="(item, index) in allVehicleIdColor"
                  :key="index"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
    <el-form
      :model="carInfo.drivePerson"
      :rules="drivePersonRules"
      ref="drivePerson"
      label-width="100px"
      :disabled="!isEditStatus"
    >
      <div class="caseFormBac" id="link_2" ref="link_2" @mousewheel="scrool2">
        <p>驾驶员/企业</p>
        <div>
          <div class="item">
            <el-form-item label="驾驶人姓名" prop="party">
              <el-input
                ref="party"
                v-model="carInfo.drivePerson.party"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </div>
          <div class="item appendSelect">
            <el-form-item label="身份证号" prop="partyIdNo">
              <el-input
                ref="partyIdNo"
                placeholder="请输入"
                v-model="carInfo.drivePerson.partyIdNo"
                class="input-with-select hasMargintop"
              >
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="item">
            <el-form-item label="联系电话" prop="partyTel">
              <el-input
                ref="partyTel"
                v-model="carInfo.drivePerson.partyTel"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="从业资格证号" prop="cpsCardNum">
              <el-input
                v-model="carInfo.drivePerson.cpsCardNum"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="item">
            <el-form-item label="驾驶证号" prop="driveCardNum">
              <el-input
                v-model="carInfo.drivePerson.driveCardNum"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="驾驶员档案号" prop="driverFileNum">
              <el-input
                v-model="carInfo.drivePerson.driverFileNum"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemOne">
            <el-form-item label="联系地址" prop="partyAddress">
              <el-input
                v-model="carInfo.drivePerson.partyAddress"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemOne">
            <el-form-item label="职务" prop="occupation">
              <!-- <el-select v-model="carInfo.drivePerson.occupation" :loading="selectLoading" @focus="getDictInfo('人员信息-职务','postInfo')">
                <el-option v-for="value in postInfo" :key="value.id" :label="value.name" :value="value.name"></el-option>
              </el-select> -->
              <el-row>
                <el-col :span="12">
                  <el-input
                    v-model="carInfo.drivePerson.occupation"
                    @focus="getDictInfo('人员信息-职务', 'postInfo')"
                  ></el-input>
                </el-col>
                <el-col :span="12" class="defualt-click-btn">
                  <el-button
                    type="primary"
                    size="medium"
                    @click="chooseOccupation('个体')"
                    style="margin-left: 27px"
                    :plain="
                      carInfo.drivePerson.occupation == '个体' ? false : true
                    "
                    >个体</el-button
                  >
                  <el-button
                    type="primary"
                    size="medium"
                    @click="chooseOccupation('')"
                    :plain="carInfo.drivePerson.occupation == '' ? false : true"
                    >无</el-button
                  >
                  <!-- <el-button type="primary" size="medium" @click="chooseOccupation('其他')" :plain='carInfo.drivePerson.occupation=="其他"?false:true'>其他</el-button>
                  <el-button type="primary" size="medium" @click="chooseOccupation('不知道')" :plain='carInfo.drivePerson.occupation=="不知道"?false:true'>不知道</el-button> -->
                </el-col>
              </el-row>
            </el-form-item>
          </div>
          <div class="itemOne">
            <el-form-item label="企业名称" prop="partyUnitPosition">
              <el-input
                v-model="carInfo.drivePerson.partyUnitPosition"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemOne">
            <el-form-item label="执法人员" id="lawPersonBox" prop="lawOfficer">
              <el-input
                v-model="carInfo.drivePerson.lawOfficer"
                readonly
              ></el-input>
              <!-- <el-select ref="lawPersonListId" v-model="carInfo.drivePerson.lawOfficerId" multiple @remove-tag="removeLawPersontag">
                <el-option v-for="item in alreadyChooseLawPerson" :key="item.id" :label="item.lawOfficerName" :value="item.id" placeholder="请添加" :disabled="currentUserLawId==item.id?true:false"></el-option>
              </el-select> -->
              <el-button
                icon="el-icon-plus"
                @click="
                  addLawPerson(
                    'drivePerson',
                    lawPersonListId,
                    alreadyChooseLawPerson
                  )
                "
              ></el-button>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
    <el-form
      :model="carInfo.firstCheck"
      :rules="firstCheckRules"
      ref="firstCheck"
      label-width="100px"
      :disabled="!isEditStatus"
    >
      <div class="caseFormBac" id="link_3" ref="link_3" @mousewheel="scrool3">
        <p>初检记录</p>
        <div>
          <div class="itemOne">
            <el-form-item label="初检单号" prop="oddNumber">
              <el-input v-model="carInfo.firstCheck.oddNumber">
                <template slot="append">查询</template>
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="item">
            <el-form-item label="初检站点" prop="firstCheckStation">
              <el-input v-model="carInfo.firstCheck.firstCheckStation">
                <template slot="append">
                  <div @click="checkFirstCheckStation(1)">选择</div>
                </template>
              </el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="初检时间" prop="firstCheckTime">
              <el-date-picker
                v-model="carInfo.firstCheck.firstCheckTime"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
              >
              </el-date-picker>
            </el-form-item>
          </div>
        </div>

        <div>
          <div class="item">
            <el-form-item label="车货总重" prop="totalWeight">
              <el-input
                v-model="carInfo.firstCheck.totalWeight"
                @input="overLimit()"
                @change="firstCheckOverWeight(1)"
                onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')"
              >
                <template slot="append">吨</template>
              </el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="车货限重" prop="weightLimit">
              <el-input
                v-model="carInfo.firstCheck.weightLimit"
                @input="overLimit()"
                @change="firstCheckOverWeight"
                onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')"
              >
                <template slot="append">吨</template>
              </el-input>
            </el-form-item>
          </div>
          <!-- <div class="item">
            <el-form-item label="驱动轴" prop="axisType">
              <el-radio-group v-model="carInfo.firstCheck.axisType">
                <el-radio label="单轴"></el-radio>
                <el-radio label="双轴"></el-radio>
              </el-radio-group>
            </el-form-item>
          </div> -->
        </div>
        <div>
          <div class="item">
            <el-form-item label="超限质量" prop="overWeight">
              <el-input
                v-model="carInfo.firstCheck.overWeight"
                @input="firstCheckOverWeight"
                @change="firstCheckOverWeight"
                onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')"
              >
                <template slot="append">吨</template>
              </el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="超限率" prop="overRatio">
              <el-input
                v-model="carInfo.firstCheck.overRatio"
                onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')"
              >
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemThird">
            <el-form-item label="车货总长" prop="totalLength">
              <el-input
                v-model="carInfo.firstCheck.totalLength"
                placeholder="/"
                onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')"
              >
                <!-- <template slot="append">米</template> -->
              </el-input>
            </el-form-item>
          </div>
          <div class="itemThird">
            <el-form-item>
              <el-input
                v-model="carInfo.firstCheck.limitLength"
                placeholder="/"
                disabled
              >
                <!-- <template slot="append">米</template> -->
              </el-input>
            </el-form-item>
          </div>
          <div class="itemThird">
            <el-form-item>
              <el-input
                v-model="carInfo.firstCheck.overLength"
                placeholder="/"
                onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')"
              >
                <!-- <template slot="append">米</template> -->
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemThird">
            <el-form-item label="车货总宽" prop="totalWide">
              <el-input
                v-model="carInfo.firstCheck.totalWide"
                placeholder="/"
                onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')"
              >
                <!-- <template slot="append">米</template> -->
              </el-input>
            </el-form-item>
          </div>
          <div class="itemThird">
            <el-form-item>
              <el-input
                v-model="carInfo.firstCheck.limitWide"
                placeholder="/"
                disabled
              >
                <!-- <template slot="append">米</template> -->
              </el-input>
            </el-form-item>
          </div>
          <div class="itemThird">
            <el-form-item>
              <el-input
                v-model="carInfo.firstCheck.overWide"
                placeholder="/"
                onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')"
              >
                <!-- <template slot="append">米</template> -->
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemThird">
            <el-form-item label="车货总高" prop="totalHeight">
              <el-input
                v-model="carInfo.firstCheck.totalHeight"
                placeholder="/"
                onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')"
              >
                <!-- <template slot="append">米</template> -->
              </el-input>
            </el-form-item>
          </div>
          <div class="itemThird">
            <el-form-item>
              <el-input
                v-model="carInfo.firstCheck.limitHeight"
                placeholder="/"
                disabled
              >
                <!-- <template slot="append">米</template> -->
              </el-input>
            </el-form-item>
          </div>
          <div class="itemThird">
            <el-form-item>
              <el-input
                v-model="carInfo.firstCheck.overHeight"
                placeholder="/"
                onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')"
              >
                <!-- <template slot="append">米</template> -->
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemOne">
            <el-form-item label="初检结果" id="lawPersonBox" prop="checkResult">
              <el-radio-group v-model="carInfo.firstCheck.checkResult">
                <el-radio label="超限超载">超限超载</el-radio>
                <el-radio label="未超载">未超载</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemOne">
            <el-form-item label="初检人员" id="lawPersonBox" prop="checkPerson">
              <el-input
                v-model="carInfo.firstCheck.checkPerson"
                readonly
              ></el-input>
              <!-- <el-select ref="lawPersonListId" v-model="carInfo.firstCheck.checkPersonId" multiple @remove-tag="removeLawPersontag">
                <el-option v-for="item in alreadyChooseLawPerson" :key="item.id" :label="item.lawOfficerName" :value="item.id" placeholder="请添加" :disabled="currentUserLawId==item.id?true:false"></el-option>
              </el-select> -->
              <el-button
                icon="el-icon-plus"
                @click="
                  addLawPerson(
                    'firstCheck',
                    lawPersonListId2,
                    alreadyChooseLawPerson2
                  )
                "
              ></el-button>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
    <el-form
      :model="carInfo.secondCheck"
      :rules="secondCheckRules"
      ref="secondCheck"
      label-width="100px"
      :disabled="!isEditStatus"
    >
      <div class="caseFormBac" id="link_4" ref="link_4" @mousewheel="scrool4">
        <p>卸载/复检记录</p>
        <div>
          <div class="itemOne">
            <el-form-item label="复检单号" prop="oddNumber">
              <el-input v-model="carInfo.secondCheck.oddNumber">
                <template slot="append">查询</template>
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="item">
            <el-form-item label="复检站点" prop="secondCheckStation">
              <el-input v-model="carInfo.secondCheck.secondCheckStation">
                <template slot="append">
                  <div @click="checkFirstCheckStation(2)">选择</div>
                </template>
              </el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="复检时间" prop="secondCheckTime">
              <el-date-picker
                v-model="carInfo.secondCheck.secondCheckTime"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
              >
              </el-date-picker>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemOne">
            <el-form-item label="卸载方式" prop="unloadMode">
              <!-- <el-input v-model="carInfo.secondCheck.unloadMode"></el-input> -->
              <el-select v-model="carInfo.secondCheck.unloadMode">
                <el-option
                  v-for="(item, index) in optionsXZFS"
                  :key="index"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div
          v-if="carInfo.secondCheck.unloadMode == '分装'"
          style="
            background: #f6f8fc;
            width: calc(70% + 20px);
            padding-right: 20px;
          "
        >
          <div>
            <div class="item">
              <el-form-item
                label="分装车辆"
                :prop="
                  carInfo.secondCheck.unloadMode == '分装'
                    ? 'fenPlateColor'
                    : 'pachor'
                "
              >
                <el-select v-model="carInfo.secondCheck.fenPlateColor">
                  <el-option
                    v-for="(item, index) in allVehicleIdColor"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
                <!-- <el-autocomplete style="width: 100%" v-model="carInfo.secondCheck.checkWorker" :fetch-suggestions="queryCheckWorker"></el-autocomplete> -->
              </el-form-item>
            </div>
            <div class="item">
              <el-form-item
                label="分装车号"
                :prop="
                  carInfo.secondCheck.unloadMode == '分装'
                    ? 'fenPlate'
                    : 'pachor'
                "
              >
                <el-input
                  v-model="carInfo.secondCheck.fenPlate"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </div>
          </div>

          <div>
            <div class="item">
              <el-form-item
                label="车型"
                :prop="
                  carInfo.secondCheck.unloadMode == '分装'
                    ? 'fenCarType'
                    : 'pachor'
                "
              >
                <el-select v-model="carInfo.secondCheck.fenCarType">
                  <el-option
                    v-for="(item, index) in allVehicleShipType"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="item">
              <el-form-item
                label="分装吨位"
                :prop="
                  carInfo.secondCheck.unloadMode == '分装'
                    ? 'fenTonnage'
                    : 'pachor'
                "
              >
                <el-input
                  v-model="carInfo.secondCheck.fenTonnage"
                  onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="line" style="clear: both"></div>
          <div>
            <div class="item">
              <el-form-item
                label="分装承运人"
                :prop="
                  carInfo.secondCheck.unloadMode == '分装'
                    ? 'fenPerson'
                    : 'pachor'
                "
              >
                <el-input
                  v-model="carInfo.secondCheck.fenPerson"
                  placeholder="请输入姓名"
                ></el-input>
              </el-form-item>
            </div>
            <div class="item">
              <el-form-item
                label="身份证号"
                :prop="
                  carInfo.secondCheck.unloadMode == '分装' ? 'idCard' : 'pachor'
                "
              >
                <el-input
                  v-model="carInfo.secondCheck.idCard"
                  placeholder="请输入身份证号"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div>
            <div class="item">
              <el-form-item
                label="联系电话"
                :prop="
                  carInfo.secondCheck.unloadMode == '分装' ? 'phone' : 'pachor'
                "
              >
                <el-input
                  ref="partyTel"
                  v-model="carInfo.secondCheck.phone"
                  placeholder="请输入联系电话"
                ></el-input>
              </el-form-item>
            </div>
            <div class="item">
              <el-form-item
                label="联系地址"
                :prop="
                  carInfo.secondCheck.unloadMode == '分装'
                    ? 'address'
                    : 'pachor'
                "
              >
                <el-input
                  v-model="carInfo.secondCheck.address"
                  placeholder="请输入联系地址"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div>
            <div class="item">
              <el-form-item
                label="保全价值"
                :prop="carInfo.secondCheck.preserveValue"
              >
                <el-input
                  v-model="carInfo.secondCheck.preserveValue"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </div>
            <div class="item"></div>
          </div>
        </div>
        <div>
          <div class="item">
            <el-form-item label="复检质量" prop="secondCheckWeight">
              <el-input
                v-model="carInfo.secondCheck.secondCheckWeight"
                @change="cuntUnloadWeight"
                onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')"
              >
                <template slot="append">吨</template>
              </el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="卸载质量" prop="unloadWeight">
              <el-input
                v-model="carInfo.secondCheck.unloadWeight"
                @change="secondCheckOverWeight"
                onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')"
              >
                <template slot="append">吨</template>
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="item">
            <el-form-item label="超限率" prop="overRatio">
              <el-input
                v-model="carInfo.secondCheck.overRatio"
                onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')"
              >
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="复检结果" prop="checkResult">
              <el-radio-group v-model="carInfo.secondCheck.checkResult">
                <el-radio label="未超载（最小）">未超载</el-radio>
                <el-radio label="超限超载">超限超载</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemOne">
            <el-form-item label="复检人员意见" prop="personOpinion">
              <el-input
                type="textarea"
                :rows="2"
                v-model="carInfo.secondCheck.personOpinion"
                readonly
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemOne">
            <el-form-item label="复检人员" id="lawPersonBox" prop="checkPerson">
              <el-input
                v-model="carInfo.secondCheck.checkPerson"
                readonly
              ></el-input>
              <!-- <el-select ref="lawPersonListId" v-model="carInfo.secondCheck.checkPersonId" multiple @remove-tag="removeLawPersontag">
                <el-option v-for="item in alreadyChooseLawPerson" :key="item.id" :label="item.lawOfficerName" :value="item.id" placeholder="请添加" :disabled="currentUserLawId==item.id?true:false"></el-option>
              </el-select> -->
              <el-button
                icon="el-icon-plus"
                @click="
                  addLawPerson(
                    'secondCheck',
                    lawPersonListId3,
                    alreadyChooseLawPerson3
                  )
                "
              ></el-button>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
    <el-form
      :model="carInfo.copyingPoliceData"
      :rules="copyNoticeRules"
      ref="copyingPoliceData"
      label-width="100px"
      :disabled="!isEditStatus"
    >
      <div
        class="caseFormBac clear-float-div"
        id="link_5"
        ref="link_5"
        @mousewheel="scrool5"
      >
        <p>抄告交警数据</p>
        <div>
          <div class="itemOne">
            <el-form-item label="抄告单位" prop="copyingUnit">
              <el-col :span="9" :offset="0">
                <el-input
                  class="short-input"
                  v-model="carInfo.copyingPoliceData.copyingUnit"
                ></el-input>
              </el-col>
              <span class="after-text"> 公安交通警察大队 </span>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemOne">
            <el-form-item label="抄告依据" prop="copyingBasis">
              <el-input
                type="textarea"
                :rows="2"
                v-model="carInfo.copyingPoliceData.copyingBasis"
              ></el-input>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
    <!-- <el-form label-width="200px;">
      <div
        class="caseFormBac clear-float-div"
        id="link_5"
        ref="link_5"
        @mousewheel="scrool5"
      >
        <p>抄告交警数据</p>
        <div class="el-form-item is-required">
          <div class="el-form-item__label">公安交警处罚决定书</div>
          <div>
            <ul>
              <li
                v-for="(item, index) in fileList"
                :key="index"
                class="file-list-chufa"
              >
                <div style="position: relative; height: 30px">
                  <div
                    style="
                      width: 60px;
                      position: absolute;
                      left: 50%;
                      margin-left: -15px;
                    "
                  >
                    <div
                      style="width: auto; float: left"
                      @click="handlePictureCardPreview(item)"
                    >
                      <img
                        src="../../../../static/images/img/personInfo/icon_ac_wenshu.svg"
                        alt=""
                      />
                    </div>
                    <div class="del-icon-s">
                      <i
                        class="el-icon-close"
                        style="font-size: 12px"
                        @click="removeFile(item)"
                      ></i>
                    </div>
                  </div>
                </div>
                <div
                  class="file-list-chufa-text"
                  @click="handlePictureCardPreview(item)"
                >
                  {{ item.fileName }}
                </div>
              </li>
            </ul>
            <el-upload
              :disabled="!isEditStatus"
              class="avatar-uploader upload-demo modle-upload"
              style="margin-bottom: 22px; float: left"
              :show-file-list="false"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePictureCardPreview"
              :http-request="uploadFile"
              :on-remove="handleRemoveFile"
              :before-remove="beforeRemoveFile"
              multiple
              :file-list="fileList"
            >
               <el-button size="small" type="primary">选取文件</el-button> 
              <i
                class="el-icon-plus avatar-uploader-icon"
                style="
                  width: 87px;
                  height: 72px;
                  line-height: 72px;
                  margin-left: 0;
                "
              ></i>
            </el-upload>
          </div>
        </div>
      </div>
    </el-form> -->
    <chooseLawPerson
      ref="chooseLawPersonRef"
      @setLawPer="setLawPerson"
      @userList="getAllUserList"
    ></chooseLawPerson>
    <!-- 置顶 -->
    <el-backtop
      target="#inforCollectionBox"
      :bottom="46"
      :right="0"
      :visibility-height="800"
      style="width: 58px; height: 58px"
      @click="backTop"
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
    <!-- 右侧菜单 -->
    <rightMenu></rightMenu>

    <div class="float-btns" style="bottom: 150px">
      <el-button type="primary" @click="handleClickEdit" v-show="!isEditStatus">
        <i class="iconfont law-save"></i>
        <br />修改
      </el-button>
      <el-button type="primary" @click="saveDataBtn(0)" v-show="isEditStatus">
        <i class="iconfont law-save"></i>
        <br />保存
      </el-button>
      <el-button
        type="primary"
        @click="saveDataBtn(1)"
        v-show="inspectionOverWeightId && isEditStatus"
      >
        <i class="iconfont law-save"></i>
        <br />归档
      </el-button>
    </div>

    <el-dialog :visible.sync="dialogImageVisible" size="tiny">
      <img v-if="dialogImageUrl" width="100%" :src="dialogImageUrl" alt="" />
      <div lazy id="myPdfBOx" v-if="pdfUrl">
        <iframe
          :src="
            '/static/pdf/web/viewer.html?file=' + encodeURIComponent(pdfUrl)
          "
          frameborder="0"
          style="width: 790px; height: 1119px"
        ></iframe>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="checkStationVisible"
      title="请选择一个站点"
      size="tiny"
    >
      <ul>
        <li
          v-for="(item, index) in stationRecord"
          :key="index"
          @click="checkSure(item)"
          style="
            cursor: pointer;
            line-height: 40px;
            background: #f5f7fa;
            margin-bottom: 20px;
            padding: 0 20px;
          "
        >
          {{ item.name }}
        </li>
      </ul>
    </el-dialog>
  </div>
</template>
<script>
import util from "@/common/js/util";

import chooseLawPerson from "@/page/caseHandle/unRecordCase/chooseLawPerson";
// import chooseLawPerson from "@/page/inspection/record-manage/chooseModlePerson";
import mapDiag from "@/page/caseHandle/case/form/inforCollectionPage/diag/mapDiag";
import rightMenu from "@/page/inspection/roadAndPolice/compoment/rightMenu/index.vue";

import iLocalStroage from "@/common/js/localStroage";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import {
  validateIDNumber,
  checkPassport,
  validateAge,
  validateZIP,
  validatePhone,
  vaildateCardNum
} from "@/common/js/validator";
import {
  findLawOfficerListApi,
  getAssistFile,
  getFileStreamByStorageIdApi
} from "@/api/caseHandle";
import { findRouteManageByOrganIdApi } from "@/api/system";
import {
  saveOrUpdateCarInfoApi,
  getDictListDetailByNameApi,
  findCarInfoByIdApi
} from "@/api/inspection";
import { deleteFileByIdApi, uploadCommon } from "@/api/upload.js";
import { findDueryFixedSitePage } from "@/api/lawSupervise.js";
import { vehicleCheckApi, yyclCheckApi } from "@/api/checkInfo.js";
import lawOfficerVue from "../../sys/lawOfficer-manage/lawOfficer.vue";
export default {
  data() {
    //执法人员人数不得少于2个，最多不多与9个
    const validatePersonNumber = (rule, value, callback) => {
      if (this.lawPersonListId.length < 2) {
        return callback(new Error("执法人员不得少于2人"));
      } else if (this.lawPersonListId.length > 9) {
        return callback(new Error("执法人员不得多于9人"));
      }
      callback();
    };
    const validatePersonNumber2 = (rule, value, callback) => {
      if (this.lawPersonListId2.length < 2) {
        return callback(new Error("初检人员不得少于2人"));
      } else if (this.lawPersonListId2.length > 9) {
        return callback(new Error("初检人员不得多于9人"));
      }
      callback();
    };
    const validatePersonNumber3 = (rule, value, callback) => {
      if (this.lawPersonListId3.length < 2) {
        return callback(new Error("复检人员不得少于2人"));
      } else if (this.lawPersonListId3.length > 9) {
        return callback(new Error("复检人员不得多于9人"));
      }
      callback();
    };
    // 检验身份证
    var checkIdNoPassSort = (rule, value, callback) => {
      // validateIDNumber
      var reg = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/;
      callback();
    };

    return {
      saveType: "", //提交方式（0：保存   1:归档）
      stationRecord: [],
      changePartyIdType2Index: "",
      theStr: "", // 输入框长度到达设定值时输入框的内容
      recentCheckWorkers: [], //历史保存过检测人员
      vehicleTypeList: [], //车型
      vehicleAxlesTypeList: [], //轴数
      brandList: [], //品牌
      carInfo: {
        // fileStatus: 0,
        id: "",
        checkType: "路警联合",
        // detectStation: '',//监测站
        vehicleIdColor: "黄色",
        vehicleShipId: "",
        vehicleShipType: "",
        transportNum: "",
        axisNum: "",
        axisType: "",
        businessStatus: "",
        businessScope: "",
        loadGoods: "",
        startPlace: "",
        endPlace: "",
        trailerIdNo: "",
        trailerColor: "",
        drivePerson: {
          party: "",
          partyIdNo: "",
          partyTel: "",
          partyAddress: "",
          occupation: "",
          partyUnitPosition: "",
          lawOfficer: "",
          lawOfficerId: "",
          cpsCardNum: "", //从业资格证号
          driveCardNum: "", //驾驶证号
          driverFileNum: "" //驾驶员档案号
        },
        firstCheck: {
          firstCheckTime: "",
          firstCheckStation: "",
          oddNumber: "",
          vehicleShipType: "",
          axisType: "",
          axisNum: "",
          axisType: "",
          totalWeight: "",
          weightLimit: "",
          overWeight: "",
          overRatio: "",
          totalLength: "",
          totalWide: "",
          totalHeight: "",
          checkResult: "超限超载",
          checkPerson: "",
          checkPersonId: "",
          overHeight: "",
          overWide: "",
          overLength: "",
          limitWide: "",
          limitLength: "",
          limitHeight: ""
        },

        secondCheck: {
          secondCheckTime: "",
          secondCheckStation: "",
          oddNumber: "",
          unloadMode: "自行卸载",
          fenPlateColor: "黄色",
          fenTonnage: "",
          fenPlate: "",
          fenCarType: "",
          fenPerson: "",
          idCard: "",
          phone: "",
          address: "",
          unloadWeight: "",
          secondCheckWeight: "",
          checkNumber: "",
          overRatio: "",
          checkPerson: "",
          checkPersonId: "",
          checkResult: "",
          personOpinion:
            "经复检，该车符合《超限运输车辆行驶公路管理规定》（2016年第62号令）货物装载认定标准。", //复检人员意见
          preserveValue: "" //保全价值
        },
        copyingPoliceData: {
          copyingUnit: "",
          copyingBasis: ""
        },
        penaltyDecision: {}
      },
      fileList: [],
      drawerOption: [
        { name: "车牌颜色", option: 1 },
        { name: "车型", option: 2 },
        { name: "路警联合-卸载方式", option: 3 }
      ],
      // routeList: [],
      directionList: [],
      locationList: [],
      carInfoRules: {
        vehicleShipId: [
          { required: true, message: "请输入", trigger: "blur" },
          { validator: vaildateCardNum, trigger: "blur" }
        ],
        vehicleShipType: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        axisNum: [{ required: true, message: "请选择", trigger: "change" }],
        axisType: [{ required: true, message: "请选择", trigger: "change" }],
        trailerIdNo: [{ validator: vaildateCardNum, trigger: "blur" }],
        vehicleIdColor: [
          { required: true, message: "请选择", trigger: "blur" }
        ],
        loadGoods: [{ required: true, message: "请输入", trigger: "blur" }],
        startPlace: [{ required: true, message: "请输入", trigger: "blur" }],
        endPlace: [{ required: true, message: "请输入", trigger: "blur" }]
      },
      drivePersonRules: {
        party: [{ required: true, message: "请输入", trigger: "blur" }],
        partyTel: [
          { required: true, message: "请输入", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ],
        partyIdNo: [
          { required: true, message: "请输入", trigger: "blur" },
          { validator: checkIdNoPassSort, trigger: "blur" }
        ],
        partyAddress: [{ required: true, message: "请输入", trigger: "blur" }],
        lawOfficer: [
          { required: true, message: "请选择" },
          { validator: validatePersonNumber, trigger: "change" }
        ]
      },
      firstCheckRules: {
        vehicleShipId: [
          { required: true, message: "请输入", trigger: "blur" },
          { validator: vaildateCardNum, trigger: "blur" }
        ],
        firstCheckStation: [
          { required: true, message: "请输入", trigger: "change" }
        ],
        firstCheckTime: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        totalWeight: [{ required: true, message: "请输入", trigger: "blur" }],
        overRatio: [{ required: true, message: "请输入", trigger: "change" }],
        overWeight: [{ required: true, message: "请输入", trigger: "change" }],
        checkResult: [{ required: true, message: "请选择", trigger: "change" }],
        checkPerson: [
          { required: true, message: "请选择" },
          { validator: validatePersonNumber2, trigger: "change" }
        ],
        weightLimit: [{ required: true, message: "请输入", trigger: "blur" }]
      },
      secondCheckRules: {
        fenPlateColor: [{ required: true, message: "请选择", trigger: "blur" }],
        fenPlate: [{ required: true, message: "请输入", trigger: "blur" }],
        fenTonnage: [{ required: true, message: "请输入", trigger: "blur" }],
        fenPerson: [{ required: true, message: "请输入", trigger: "blur" }],
        idCard: [
          { required: true, message: "请输入", trigger: "blur" },
          { validator: checkIdNoPassSort, trigger: "blur" }
        ],
        secondCheckWeight: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        unloadWeight: [{ required: true, message: "请输入", trigger: "blur" }],
        overRatio: [{ required: true, message: "请输入", trigger: "change" }],
        checkResult: [{ required: true, message: "请输入", trigger: "change" }],
        unloadMode: [{ required: true, message: "请输入", trigger: "blur" }],
        secondCheckTime: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        secondCheckStation: [
          { required: true, message: "请输入", trigger: "change" }
        ],
        phone: [{ validator: validatePhone, trigger: "blur" }],
        checkPerson: [
          { required: true, message: "请选择" },
          { validator: validatePersonNumber3, trigger: "change" }
        ]
      },
      copyNoticeRules: {
        copyingUnit: [{ required: true, message: "请输入", trigger: "blur" }]
      },
      alreadyChooseLawPerson: [],
      alreadyChooseLawPerson2: [],
      alreadyChooseLawPerson3: [],
      allVehicleIdColor: [], //车牌颜色下拉框
      allVehicleShipType: [],
      lawPersonListId: [],
      lawPersonListId2: [],
      lawPersonListId3: [],
      currentUserLawId: "",
      // disableBtn: false, //提交暂存按钮的禁用
      activeA: [true, false, false, false, false],
      autoSava: true, //自动暂存
      // allTrailerTypeType: [], //挂车类型,
      //案发地点标志
      afddFlag: false,
      // disableZcBtn: false, //暂存按钮禁用车型
      hasLatitudeAndLongitude: false, //案发坐标是否已经获取
      formOrDocData: "",
      submitFileData: "",
      saveEileData: "",
      formArr: ["drivePerson", "carInfo", "secondCheck", "firstCheck"],
      resultArr: [], //接受验证返回结果数组
      //表单验证错误提示
      rejectObj: [
        "车辆信息未填写完整，请检查！",
        "驾驶员/企业信息未填写完整，请检查！",
        "初检记录未填写完整，请检查！",
        "卸载/复检记录未填写完整，请检查！"
      ],
      optionsXZFS: [],
      currentPerson: "",
      selectLoading: false,
      postInfo: [], //职务
      sfList: [
        {
          value: "蓝色",
          label: 1
        },
        {
          value: "黄色",
          label: 2
        },
        {
          value: "黑色 ",
          label: 3
        },
        {
          value: "白色",
          label: 4
        },
        {
          value: "其他",
          label: 9
        }
      ],
      dialogImageUrl: "",
      pdfUrl: "",
      dialogImageVisible: false,
      isEditStatus: false,
      checkStationVisible: false,
      currentStation: ""
    };
  },
  components: {
    chooseLawPerson,
    mapDiag,
    rightMenu
  },

  mixins: [mixinGetCaseApiList],
  computed: {
    ...mapGetters(["inspectionOverWeightId", "inspectionOverWeightAdd"])
  },
  methods: {
    //选择执法人员
    addLawPerson(item, lawPersonListId, alreadyChooseLawPerson) {
      this.currentPerson = item;
      this.$refs.chooseLawPersonRef.showModal(
        lawPersonListId,
        alreadyChooseLawPerson
      );
    },
    //设置执法人员
    setLawPerson(userlist) {
      let certificateIdArr = [];
      userlist.forEach(item => {
        //   //给表单数据赋值
        certificateIdArr.push(
          item.lawOfficerName + "(" + item.selectLawOfficerCard + ")"
        ); //执企业组织信息员
      });
      if (this.currentPerson == "drivePerson") {
        this.lawPersonListId = [];
        this.alreadyChooseLawPerson = userlist;
        this.carInfo.drivePerson.lawOfficer = certificateIdArr.join(",");
        this.alreadyChooseLawPerson.forEach(item => {
          this.lawPersonListId.push(item.id);
        });
        // 初检、复检继承驾驶人信息中的执法人员
        this.lawPersonListId2 = [];
        this.alreadyChooseLawPerson2 = userlist;
        this.carInfo.firstCheck.checkPerson = certificateIdArr.join(",");
        this.alreadyChooseLawPerson2.forEach(item => {
          this.lawPersonListId2.push(item.id);
        });
        this.lawPersonListId3 = [];
        this.alreadyChooseLawPerson3 = userlist;
        this.carInfo.secondCheck.checkPerson = certificateIdArr.join(",");
        this.alreadyChooseLawPerson3.forEach(item => {
          this.lawPersonListId3.push(item.id);
        });
      }
      if (this.currentPerson == "firstCheck") {
        this.lawPersonListId2 = [];
        this.alreadyChooseLawPerson2 = userlist;
        this.carInfo.firstCheck.checkPerson = certificateIdArr.join(",");
        this.alreadyChooseLawPerson2.forEach(item => {
          this.lawPersonListId2.push(item.id);
        });
      }
      if (this.currentPerson == "secondCheck") {
        this.lawPersonListId3 = [];
        this.alreadyChooseLawPerson3 = userlist;
        this.carInfo.secondCheck.checkPerson = certificateIdArr.join(",");
        this.alreadyChooseLawPerson3.forEach(item => {
          this.lawPersonListId3.push(item.id);
        });
      }
    },
    // 默认设置联系人为当前用户 需要用用户的id去拿他作为执法人员的id
    setLawPersonCurrentP(type) {
      // type=1为回显
      let _this = this;
      this.$store
        .dispatch("findLawOfficerList", iLocalStroage.gets("userInfo").organId)
        .then(
          res => {
            let currentUserData = {};
            this.lawPersonListId = [];
            this.alreadyChooseLawPerson = [];
            this.lawPersonListId2 = [];
            this.alreadyChooseLawPerson2 = [];
            this.lawPersonListId3 = [];
            this.alreadyChooseLawPerson3 = [];

            res.data.forEach(item => {
              if (type) {
                if (
                  item.lawOfficerName &&
                  _this.carInfo.drivePerson.lawOfficer &&
                  _this.carInfo.drivePerson.lawOfficer.indexOf(
                    item.lawOfficerName
                  ) != -1
                ) {
                  this.alreadyChooseLawPerson.push(item);
                  this.lawPersonListId.push(item.id);
                }
                if (
                  _this.carInfo.firstCheck.checkPerson &&
                  _this.carInfo.firstCheck.checkPerson.indexOf(
                    item.lawOfficerName
                  ) != -1
                ) {
                  this.alreadyChooseLawPerson2.push(item);
                  this.lawPersonListId2.push(item.id);
                }
                if (
                  _this.carInfo.secondCheck.checkPerson &&
                  _this.carInfo.secondCheck.checkPerson.indexOf(
                    item.lawOfficerName
                  ) != -1
                ) {
                  this.alreadyChooseLawPerson3.push(item);
                  this.lawPersonListId3.push(item.id);
                }
              } else if (item.userId == iLocalStroage.gets("userInfo").id) {
                currentUserData.id = item.id;
                currentUserData.lawOfficerName = item.lawOfficerName;
                currentUserData.selectLawOfficerCard = item.lawOfficerCards.split(
                  ","
                )[0];
                this.alreadyChooseLawPerson.push(currentUserData);
                this.lawPersonListId.push(currentUserData.id);
                this.alreadyChooseLawPerson2.push(currentUserData);
                this.lawPersonListId2.push(currentUserData.id);
                this.alreadyChooseLawPerson3.push(currentUserData);
                this.lawPersonListId3.push(currentUserData.id);

                this.$set(
                  _this.carInfo.drivePerson,
                  "lawOfficer",
                  currentUserData.lawOfficerName +
                    "(" +
                    currentUserData.selectLawOfficerCard +
                    ")"
                );
                this.$set(
                  _this.carInfo.firstCheck,
                  "checkPerson",
                  currentUserData.lawOfficerName +
                    "(" +
                    currentUserData.selectLawOfficerCard +
                    ")"
                );
                this.$set(
                  _this.carInfo.secondCheck,
                  "checkPerson",
                  currentUserData.lawOfficerName +
                    "(" +
                    currentUserData.selectLawOfficerCard +
                    ")"
                );
              }
            });

            this.$refs.carInfo.clearValidate();
            this.$refs.drivePerson.clearValidate();
            this.$refs.firstCheck.clearValidate();
            this.$refs.secondCheck.clearValidate();
          },
          err => {
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
    submitInfo(state) {},
    //查询执法人员
    getAllUserList(list) {
      this.allUserList = list;
    },
    stageInfo(state) {},
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
          lawOfficerCards: staffCertificateIdList[index]
        };
        this.alreadyChooseLawPerson.push(newlaw);
      });
      //设置当前执法人员不可以删除
      findLawOfficerListApi(iLocalStroage.gets("userInfo").organId)
        .then(res => {
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].userId == iLocalStroage.gets("userInfo").id) {
              this.currentUserLawId = res.data[i].id;
              break;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    change2(val) {
      var reg = /(^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$)|(^((\d3)|(\d{3}\-))?(1[358]\d{9})$)/;
      if (!reg.test(val) && val) {
        this.$message("手机号不正确");
      }
      // callback();
    },
    change3(val) {
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
      results.forEach(item => {
        a.push({ value: item.inputValue });
      });
      cb(a);
    },
    //查找路线
    // findRouteManageByOrganId() {
    //   let data = { organId: iLocalStroage.gets("userInfo").organId };
    //   findRouteManageByOrganIdApi(data).then(
    //     res => {
    //       this.routeList = res.data;
    //     }
    //   );
    // },

    // 锚点回显-start
    scrool1() {
      let scrolled = this.$refs.link_1.scrollTop;
      this.activeA = [true, false, false, false, false];
    },
    scrool2() {
      let scrolled = this.$refs.link_2.scrollTop;
      this.activeA = [false, true, false, false, false];
    },
    scrool3() {
      let scrolled = this.$refs.link_3.scrollTop;
      this.activeA = [false, false, true, false, false];
    },
    scrool4() {
      let scrolled = this.$refs.link_4.scrollTop;
      this.activeA = [false, false, false, true, false];
    },
    scrool5() {
      let scrolled = this.$refs.link_5.scrollTop;
      this.activeA = [false, false, false, false, true];
    },
    // 锚点回显-end
    createFilter(queryString, data) {
      return data => {
        return (
          data.inputValue.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    //显示地图
    showMap() {
      this.$refs.mapDiagRef.showModal();
    },

    getDrawerList(data) {
      let _this = this;
      data.forEach(element => {
        getDictListDetailByNameApi(element.name).then(res => {
          switch (element.option) {
            case 1:
              _this.allVehicleIdColor = res.data;
              break; //车牌颜色
            case 2:
              _this.allVehicleShipType = res.data;
              break; //车型
            case 3:
              _this.optionsXZFS = res.data;
              break; //车型
          }
        });
      });
    },

    //根据数据字典查询
    getDictInfo(name, codeName) {
      let _this = this;
      if (_this[codeName].length) {
        return false;
      }
      _this.selectLoading = true;
      _this.$store
        .dispatch("findAllDrawerByName", name)
        .then(
          //查询执法领域
          res => {
            _this.selectLoading = false;
            if (res.code === 200) {
              _this[codeName] = res.data;
            } else {
              console.info("没有查询到数据");
            }
          },
          err => {
            _this.selectLoading = false;
            console.log(err);
          }
        )
        .catch(() => {});
    },

    //获取坐标
    getLngLat(lngLatStr, address) {
      this.form.eventCoordinate = lngLatStr;
      this.form.eventAddress = address;
      this.hasLatitudeAndLongitude = true;
    },

    // 根据车辆轴数计算限重数
    weightLimit(data) {
      switch (Number(data)) {
        case 2:
          this.$set(this.carInfo.firstCheck, "weightLimit", 18);
          break;
        case 3:
          this.$set(this.carInfo.firstCheck, "weightLimit", 25);
          break;
        case 4:
          this.$set(this.carInfo.firstCheck, "weightLimit", 31);
          break;
        case 5:
          this.$set(this.carInfo.firstCheck, "weightLimit", 43);
          break;
        case 6:
          this.$set(this.carInfo.firstCheck, "weightLimit", 49);
          break;
      }
      this.firstCheckOverWeight();
    },
    saveFileData() {},

    // 搜索车辆号牌
    searchNumber() {
      let _this = this;
      // 查询车辆号牌
      if (this.carInfo.vehicleShipId && this.carInfo.vehicleIdColor) {
        let colorCode = "";
        this.sfList.forEach(element => {
          if (element.value == this.carInfo.vehicleIdColor) {
            colorCode = element.label;
          }
        });
        let json = [];
        let param = {
          vehicleNo: this.carInfo.vehicleShipId,
          plateColor: colorCode
        };
        json.push(param);
        vehicleCheckApi(JSON.stringify(json)).then(res => {
          if (res.data) {
            let chewckData = {
              transCertificateCode: res.data[0].transCertificateCode,
              vehicleNo: this.carInfo.vehicleShipId,
              vin: ""
            };
            yyclCheckApi(chewckData).then(res => {
              _this.carInfo.businessScope = res.data[0].BusinessScopeCode || "";
              _this.carInfo.vehicleShipType = res.data[0].VehicleTypeCode || "";
              _this.carInfo.transportNum = res.data[0].LicenseCode || "";
              _this.carInfo.businessStatus = res.data[0].OperatingStatus || "";
              _this.carInfo.drivePerson.partyUnitPosition =
                res.data[0].OwnerName || "";
            });
          } else {
            this.$message.error("未查到数据");
            _this.carInfo.businessScope = "";
            _this.carInfo.vehicleShipType = "";
            _this.carInfo.transportNum = "";
            _this.carInfo.businessStatus = "";
            _this.carInfo.drivePerson.partyUnitPosition = "";
          }
        });
      } else {
        this.$message.error("请正确输入车辆颜色和车牌号码");
      }
    },

    // 点击保存按钮是否验证
    saveDataBtn(handleType) {
      let _this = this;
      if (handleType == 0) {
        _this.saveType = "0";
        // 保存
        // 隐藏保存、签章按钮，显示撤销、删除按钮
        // this.$emit('saveDataStatus', handleType);
        this.saveMethod();
        // 保存-修改状态
      }
      if (handleType == 1) {
        _this.saveType = "1";
        // 归档
        this.resultArr = [];
        let that = this;

        this.formArr.forEach((item, index) => {
          //根据表单的ref校验
          this.refForm(item, this.rejectObj[index]);
        });
        Promise.all(this.resultArr)
          .then(function() {
            //验证全部通过
            // _this.carInfo.fileStatus = 1;
            _this.saveMethod();
          })
          .catch(function(data) {
            //验证失败 提示reject失败状态的值
            that.$message.error("请先完善表单内容");
          });
      }
    },

    // 重置表单
    refForm(formName, err) {
      let that = this;
      let result = new Promise(function(resolve, reject) {
        that.$refs[formName].validate(valid => {
          if (valid) {
            resolve();
          } else {
            reject(err);
          }
        });
      });
      that.resultArr.push(result);
    },

    //设置为百分比形式
    setOverRatio(data) {
      let firstCheckOverRatio = data.firstCheck.overRatio;
      let secondCheckOverRatio = data.secondCheck.overRatio;

      if (
        firstCheckOverRatio &&
        firstCheckOverRatio.toString().indexOf("%") == -1
      ) {
        firstCheckOverRatio = firstCheckOverRatio
          ? firstCheckOverRatio + "%"
          : "";
      }
      if (
        secondCheckOverRatio &&
        secondCheckOverRatio.toString().indexOf("%") == -1
      ) {
        secondCheckOverRatio = secondCheckOverRatio
          ? secondCheckOverRatio + "%"
          : "";
      }
    },

    resetIds() {
      this.carInfo.drivePerson.id = "";
      this.carInfo.firstCheck.id = "";
      this.carInfo.secondCheck.id = "";
      this.carInfo.copyingPoliceData.id = "";
      this.carInfo.penaltyDecision.id = "";
    },

    //初次保存后把id赋值回来
    setIdsBack(obj) {
      this.carInfo.drivePerson.id = obj.drivePerson.id;
      this.carInfo.firstCheck.id = obj.firstCheck.id;
      this.carInfo.secondCheck.id = obj.secondCheck.id;
      this.carInfo.copyingPoliceData.id = obj.copyingPoliceData.id;
      this.carInfo.penaltyDecision.id = obj.penaltyDecision.id;
    },

    // 调用保存接口
    saveMethod() {
      let data = JSON.parse(JSON.stringify(this.carInfo));
      this.setOverRatio(data);

      data.drivePerson = JSON.stringify(data.drivePerson);
      data.firstCheck = JSON.stringify(data.firstCheck);
      data.secondCheck = JSON.stringify(data.secondCheck);
      data.copyingPoliceData = JSON.stringify(data.copyingPoliceData);
      data.penaltyDecision = data.penaltyDecision ? data.penaltyDecision : {};
      data.penaltyDecision = JSON.stringify(data.penaltyDecision);
      saveOrUpdateCarInfoApi(data).then(
        res => {
          if (res.code == 200) {
            this.$store.commit("set_inspection_OverWeightId", data.id);
            this.$store.commit(
              "set_inspection_penaltyDecisionId",
              res.data.penaltyDecision.id
            );
            // this.$message({
            //   type: "success",
            //   message: res.msg
            // });
            if (this.saveType === "1") {
              this.$router.push({
                name: "inspection_overloadDocumentDoc_QH"
              });
            } else {
              this.setIdsBack(res.data);
            }
          } else {
            this.$message.error(res.msg);
          }
        },
        error => {}
      );
    },

    // 随机生成车辆信息ID
    generateId() {
      let originStr = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        originChar = "0123456789abcdef",
        len = originChar.length;
      return originStr.replace(/x/g, function(match) {
        return originChar.charAt(Math.floor(Math.random() * len));
      });
    },

    // 获取页面信息
    getPageData() {
      let _this = this;
      findCarInfoByIdApi(_this.inspectionOverWeightId).then(res => {
        if (res.code == 200) {
          _this.carInfo = res.data;
          this.$store.commit(
            "set_inspection_penaltyDecisionId",
            res.data.penaltyDecision.id
          );
          _this.initOverRatio();
          _this.getFile();
          _this.setLawPersonCurrentP(1);
        } else {
          _this.$message.error(res.msg);
        }
      });
    },

    //设置超限率
    initOverRatio() {
      let firstCheckOverRatio = this.carInfo.firstCheck.overRatio;
      let secondCheckOverRatio = this.carInfo.secondCheck.overRatio;
      if (
        firstCheckOverRatio &&
        firstCheckOverRatio.toString().indexOf("%") != -1
      ) {
        firstCheckOverRatio = firstCheckOverRatio
          .toString()
          .substring(0, firstCheckOverRatio.lastIndexOf("%"));
      }
      if (
        secondCheckOverRatio &&
        secondCheckOverRatio.toString().indexOf("%") != -1
      ) {
        secondCheckOverRatio = secondCheckOverRatio
          .toString()
          .substring(0, secondCheckOverRatio.lastIndexOf("%"));
      }
    },

    //上传附件
    uploadFile(param) {
      var fd = new FormData();
      fd.append("file", param.file);
      fd.append("category", "路警联合;附件");
      fd.append("fileName", param.file.name);
      fd.append("status", 1); //传图片状态
      fd.append("caseId", this.inspectionOverWeightId); //传记录id
      fd.append("docId", "000005"); //传类型代码
      uploadCommon(fd).then(res => {
        this.getFile();
      });
    },

    // 删除文件前的钩子
    beforeRemoveFile(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    // 删除文件
    handleRemoveFile(file, fileList) {
      if (file.storageId) {
        deleteFileByIdApi(file.storageId).then(res => {});
      } else {
        return;
      }
    },

    // 删除文件
    removeFile(file) {
      this.$confirm("确认删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        iconClass: "el-icon-question",
        customClass: "custom-confirm"
      }).then(() => {
        deleteFileByIdApi(file.storageId).then(
          res => {
            this.getFile();
          },
          error => {}
        );
      });
    },

    // 获取文件
    getFile() {
      if (this.inspectionOverWeightId) {
        let data = {
          caseId: this.inspectionOverWeightId,
          category: "路警联合;附件",
          docId: "000005"
        };
        getAssistFile(data).then(res => {
          res.data.forEach(element => {
            element.name = element.fileName;
          });
          this.fileList = res.data;
        });
      }
    },

    /* 置顶后锚点回到第一个 */
    backTop() {
      this.activeA = [true, false, false, false, false];
    },

    // 预览图片弹框
    handlePictureCardPreview(file) {
      this.pdfUrl = this.dialogImageUrl = "";
      let fileType = this.$util.getFileType(file.name);
      if (fileType == "pdf") {
        this.getFileStream(file.storageId);
        this.dialogImageVisible = true;
      } else if (fileType == "image") {
        this.$util.com_getFileStream(file.storageId).then(res => {
          this.dialogImageUrl = res;
        });
        this.dialogImageVisible = true;
      } else {
        this.$message.error("当前文件格式不支持预览");
      }
    },

    //根据stroagId请求文件流
    getFileStream(storageId) {
      //设置地址
      this.$store.commit("setDocPdfStorageId", storageId);
      getFileStreamByStorageIdApi(storageId).then(res => {
        this.getObjectURL(res);
      });
    },

    // 将返回的流数据转换为url
    getObjectURL(file) {
      let url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        try {
          url = window.webkitURL.createObjectURL(file);
        } catch (error) {}
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        try {
          url = window.URL.createObjectURL(file);
        } catch (error) {}
      }

      this.pdfUrl = url;
      // this.pdfVisible = true
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 初检计算超出重量
    overLimit() {
      if (
        this.carInfo.firstCheck.weightLimit &&
        this.carInfo.firstCheck.totalWeight
      ) {
        this.carInfo.firstCheck.overWeight =
          Number(this.carInfo.firstCheck.totalWeight) -
          Number(this.carInfo.firstCheck.weightLimit);
        if (this.carInfo.firstCheck.overWeight < 0) {
          this.carInfo.firstCheck.overWeight = 0;
        } else {
          var number = this.carInfo.firstCheck.overWeight;
          number = String(number).replace(/^(.*\..{4}).*$/, "$1");
          this.carInfo.firstCheck.overWeight = Number(number);
        }
      }
    },

    //选择职务
    chooseOccupation(data) {
      this.$set(this.carInfo.drivePerson, "occupation", data);
    },

    //改变状态为编辑
    handleClickEdit() {
      this.isEditStatus = true;
      this.$refs.drivePerson.validateField("lawOfficer");
      this.$refs.firstCheck.validateField("checkPerson");
      this.$refs.secondCheck.validateField("checkPerson");
    },

    //初检计算超出比例
    firstCheckOverWeight(type) {
      if (
        this.carInfo.firstCheck.overWeight &&
        this.carInfo.firstCheck.weightLimit
      ) {
        let number =
          (this.carInfo.firstCheck.overWeight /
            this.carInfo.firstCheck.weightLimit) *
          100;
        number = String(number).replace(/^(.*\..{4}).*$/, "$1");
        number = Number(number); // number = 12.3321
        console.log(number);
        this.$set(this.carInfo.firstCheck, "overRatio", number);
      } else {
        this.$set(this.carInfo.firstCheck, "overRatio", 0);
      }

      this.secondCheckOverWeight();
      if (type == 1) {
        this.cuntUnloadWeight();
      }
    },

    //复检计算超出比例
    secondCheckOverWeight() {
      if (
        this.carInfo.secondCheck.secondCheckWeight &&
        this.carInfo.firstCheck.weightLimit &&
        this.carInfo.secondCheck.secondCheckWeight -
          this.carInfo.firstCheck.weightLimit >
          0
      ) {
        let number =
          ((this.carInfo.secondCheck.secondCheckWeight -
            this.carInfo.firstCheck.weightLimit) /
            this.carInfo.firstCheck.weightLimit) *
          100;
        number = String(number).replace(/^(.*\..{4}).*$/, "$1");
        number = Number(number); // number = 12.3321
        this.$set(this.carInfo.secondCheck, "overRatio", number);
      } else {
        this.$set(this.carInfo.secondCheck, "overRatio", 0);
      }
    },

    checkSure(item) {
      if (this.currentStation == 1) {
        this.carInfo.firstCheck.firstCheckStation = item.name;
      }
      if (this.currentStation == 2) {
        this.carInfo.secondCheck.secondCheckStation = item.name;
      }
      this.checkStationVisible = false;
    },

    //选择初检站点
    checkFirstCheckStation(type) {
      let _this = this;
      this.currentStation = type;
      let data = {
        organId: iLocalStroage.gets("userInfo").organId
      };
      findDueryFixedSitePage(data).then(res => {
        _this.stationRecord = res.data.records;
        if (_this.stationRecord.length == 1) {
          if (type == 1) {
            _this.carInfo.firstCheck.firstCheckStation = this.stationRecord[0].name;
          }
          if (type == 2) {
            _this.carInfo.secondCheck.secondCheckStation = this.stationRecord[0].name;
          }
        } else {
          this.checkStationVisible = true;
        }
      });
    },

    //复检质量变化
    cuntUnloadWeight() {
      if (
        this.carInfo.firstCheck.totalWeight &&
        this.carInfo.secondCheck.secondCheckWeight &&
        this.carInfo.firstCheck.totalWeight -
          this.carInfo.secondCheck.secondCheckWeight >
          0
      ) {
        let number =
          this.carInfo.firstCheck.totalWeight -
          this.carInfo.secondCheck.secondCheckWeight;
        number = String(number).replace(/^(.*\..{4}).*$/, "$1");
        number = Number(number); // number = 12.3321
        this.$set(this.carInfo.secondCheck, "unloadWeight", number);
      } else {
        this.$set(this.carInfo.secondCheck, "unloadWeight", "");
      }
      this.secondCheckOverWeight();
    },

    //格式化时间
    formatDateTime(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      h = h < 10 ? "0" + h : h;
      var minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      // var second=date.getSeconds();
      // second=second < 10 ? ('0' + second) : second;
      return y + "-" + m + "-" + d + " " + h + ":" + minute;
    },

    //重置所有表单
    resetAllForms() {
      this.resetForm("carInfo");
      this.resetForm("drivePerson");
      this.resetForm("firstCheck");
      this.resetForm("secondCheck");
      this.resetForm("copyingPoliceData");
    },

    // 添加滚动事件
    addScollEvent() {
      // 鼠标滚动
      this.$refs.link_1.addEventListener("scroll", this.scrool1);
      this.$refs.link_2.addEventListener("scroll", this.scrool2);
      this.$refs.link_3.addEventListener("scroll", this.scrool3);
      this.$refs.link_4.addEventListener("scroll", this.scrool4);
      this.$refs.link_5.addEventListener("scroll", this.scrool5);
    }
  },

  activated() {
    // debugger
    console.log("bbbbbbbb", this.inspectionOverWeightId);
    // 如果是新建
    if (this.inspectionOverWeightAdd) {
      this.$store.commit("set_inspection_OverWeight_add", false); //是否新建重置为false
      this.isEditStatus = true; //可编辑
      this.resetAllForms();
      this.fileList = [];
      this.carInfo.id = this.generateId();
      this.setLawPersonCurrentP();
      this.carInfo.firstCheck.firstCheckTime = this.formatDateTime(new Date());
      this.resetIds();
    } else {
      this.isEditStatus = false;
      if (this.inspectionOverWeightId) {
        this.getPageData();
      }
    }

    this.getDrawerList(this.drawerOption);
    this.addScollEvent();
  },

  mounted() {
    // debugger;
    // console.log("mounted");
    // if (!this.inspectionOverWeightId) {
    //   this.isEditStatus = true; //可编辑
    // } else {
    //   this.isEditStatus = false;
    // }
  },

  created() {
    // this.findRouteManageByOrganId();
  },
  beforeRouteLeave(to, from, next) {
    console.log("to", to);
    console.log("from", from);
    console.log("next", next);
    console.log("this.autoSava", this.autoSava);
    this.isEditStatus = false;
    if (this.autoSava && to.name != "login") {
      //退出登录不自动暂存
      // this.stageInfo(0);
    }

    next(vm => {
      console.log(vm);
    });
  }
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/index.scss"></style>
<style lang="scss">
.error-color {
  color: #ff6600;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 87px;
  height: 72px;
  line-height: 72px;
  text-align: center;
}
.avatar {
  width: 87px;
  height: 72px;
  display: block;
}
.clear-float-div:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.file-list-chufa {
  padding: 5px;
  width: auto;
  min-width: 100px;
  float: left;
  text-align: center;
  margin-right: 20px;
  box-sizing: border-box;
  cursor: pointer;
  i {
    font-size: 34px;
  }
  .file-list-chufa-text {
    margin-top: 15px;
    color: #20232c;
    line-height: 20px;
    font-size: 14px;
  }
}
.defualt-click-btn {
  .btn-default {
    background: #ecf1fa;
    color: #4573d0;
  }
}
.file-list-chufa :hover {
  .del-icon-s {
    display: inline-block;
  }
}
.del-icon-s {
  display: none;
  margin-left: 10px;
  width: auto;
  float: left;
  margin-top: -6px;
}
</style>
