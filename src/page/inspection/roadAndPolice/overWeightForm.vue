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
    <el-form :model="carInfo" :rules="carInfoRules" ref="carInfo" label-width="100px" style="margin-top: 82px;">
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
              <el-input v-model="carInfo.vehicleShipId" placeholder="请输入车辆号牌">
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
            <el-form-item label="车辆轴数" prop="axisNum" style="width:69%;display: inline-block;">
              <el-select placeholder="请选择" v-model="carInfo.axisNum" @change="weightLimit('车辆轴数')">
                <el-option label="2" value="2"></el-option>
                <el-option label="3" value="3"></el-option>
                <el-option label="4" value="4"></el-option>
                <el-option label="5" value="5"></el-option>
                <el-option label="6" value="6"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label-width="0" prop="axisNum" style="width:29%;display: inline-block;">
              <el-select placeholder="请选择驱动轴" v-model="carInfo.axisType">
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
    <el-form :model="carInfo.drivePerson" :rules="drivePersonRules" ref="drivePerson" label-width="100px">
      <div class="caseFormBac" id="link_2" ref="link_2" @mousewheel="scrool2">
        <p>驾驶员/企业信息</p>
        <div>
          <div class="item">
            <el-form-item label="姓名" prop="party">
              <el-input ref="party" v-model="carInfo.drivePerson.party" placeholder="请输入姓名"></el-input>
            </el-form-item>
          </div>
          <div class="item appendSelect">
            <el-form-item label="身份证号" prop="partyIdNo">
              <el-input ref="partyIdNo" placeholder="请输入身份证号" v-model="carInfo.drivePerson.partyIdNo" class="input-with-select hasMargintop">
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="item">
            <!-- 改 -->
            <el-form-item label="联系电话" prop="partyTel">
              <el-input ref="partyTel" v-model="carInfo.drivePerson.partyTel" placeholder="请输入联系电话"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="联系地址" prop="partyAddress">
              <el-input v-model="carInfo.drivePerson.partyAddress" placeholder="请输入联系地址"></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="item">
            <el-form-item label="职务" prop="occupation">
              <el-select v-model="carInfo.drivePerson.occupation" placeholder="请选择职务" :loading="selectLoading" @focus="getDictInfo('人员信息-职务','postInfo')">
                <el-option v-for="value in postInfo" :key="value.id" :label="value.name" :value="value.name"></el-option>
              </el-select>
              <!-- <el-input v-model="carInfo.drivePerson.occupation" placeholder="请输入职务" @focus="getDictInfo('人员信息-职务','postInfo')"></el-input> -->
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="企业名称" prop="partyUnitPosition">
              <el-input v-model="carInfo.drivePerson.partyUnitPosition" placeholder="请输入所属企业名称"></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemOne">
            <el-form-item label="执法人员" id="lawPersonBox" prop="lawOfficer">
              <el-input v-model="carInfo.drivePerson.lawOfficer"></el-input>
              <!-- <el-select ref="lawPersonListId" v-model="carInfo.drivePerson.lawOfficerId" multiple @remove-tag="removeLawPersontag">
                <el-option v-for="item in alreadyChooseLawPerson" :key="item.id" :label="item.lawOfficerName" :value="item.id" placeholder="请添加" :disabled="currentUserLawId==item.id?true:false"></el-option>
              </el-select> -->
              <el-button icon="el-icon-plus" @click="addLawPerson('drivePerson',lawPersonListId,alreadyChooseLawPerson)"></el-button>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
    <el-form :model="carInfo.firstCheck" :rules="firstCheckRules" ref="firstCheck" label-width="100px">
      <div class="caseFormBac" id="link_3" ref="link_3" @mousewheel="scrool3">
        <p>初检记录</p>
        <div>
          <div class="itemOne">
            <el-form-item label="初测单号" prop="oddNumber">
              <el-input v-model="carInfo.firstCheck.oddNumber">
                <template slot="append">查询</template>
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="item">
            <el-form-item label="车货总重" prop="totalWeight">
              <el-input v-model="carInfo.firstCheck.totalWeight" onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')">
                <template slot="append">吨</template>
              </el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="车货限重" prop="weightLimit">
              <el-input v-model="carInfo.firstCheck.weightLimit" onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')">
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
              <el-input v-model="carInfo.firstCheck.overWeight" onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')">
                <template slot="append">吨</template>
              </el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="超限比例" prop="overRatio">
              <el-input v-model="carInfo.firstCheck.overRatio" onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')">
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemThird">
            <el-form-item label="车货总长" prop="totalLength">
              <el-input v-model="carInfo.firstCheck.totalLength" placeholder="/" onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')">
                <!-- <template slot="append">米</template> -->
              </el-input>
            </el-form-item>
          </div>
          <div class="itemThird">
            <el-form-item>
              <el-input v-model="carInfo.firstCheck.lengthLimit" placeholder="/" disabled>
                <!-- <template slot="append">米</template> -->
              </el-input>
            </el-form-item>
          </div>
          <div class="itemThird">
            <el-form-item>
              <el-input v-model="carInfo.firstCheck.overLength" placeholder="/">
                <!-- <template slot="append">米</template> -->
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemThird">
            <el-form-item label="车货总宽" prop="totalWide">
              <el-input v-model="carInfo.firstCheck.totalWide" placeholder="/" onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')">
                <!-- <template slot="append">米</template> -->
              </el-input>
            </el-form-item>
          </div>
          <div class="itemThird">
            <el-form-item>
              <el-input v-model="carInfo.firstCheck.widthLimit" placeholder="/" disabled>
                <!-- <template slot="append">米</template> -->
              </el-input>
            </el-form-item>
          </div>
          <div class="itemThird">
            <el-form-item>
              <el-input v-model="carInfo.firstCheck.overWidth" placeholder="/">
                <!-- <template slot="append">米</template> -->
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemThird">
            <el-form-item label="车货总高" prop="totalHeight">
              <el-input v-model="carInfo.firstCheck.totalHeight" placeholder="/" onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')">
                <!-- <template slot="append">米</template> -->
              </el-input>
            </el-form-item>
          </div>
          <div class="itemThird">
            <el-form-item>
              <el-input v-model="carInfo.firstCheck.heightLimit" placeholder="/" disabled>
                <!-- <template slot="append">米</template> -->
              </el-input>
            </el-form-item>
          </div>
          <div class="itemThird">
            <el-form-item>
              <el-input v-model="carInfo.firstCheck.overHeight" placeholder="/">
                <!-- <template slot="append">米</template> -->
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemOne">
            <el-form-item label="初检人员" id="lawPersonBox" prop="checkPerson">
              <el-input v-model="carInfo.firstCheck.checkPerson"></el-input>
              <!-- <el-select ref="lawPersonListId" v-model="carInfo.firstCheck.checkPersonId" multiple @remove-tag="removeLawPersontag">
                <el-option v-for="item in alreadyChooseLawPerson" :key="item.id" :label="item.lawOfficerName" :value="item.id" placeholder="请添加" :disabled="currentUserLawId==item.id?true:false"></el-option>
              </el-select> -->
              <el-button icon="el-icon-plus" @click="addLawPerson('firstCheck',lawPersonListId2,alreadyChooseLawPerson2)"></el-button>
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
      </div>
    </el-form>
    <el-form :model="carInfo.secondCheck" :rules="secondCheckRules" ref="secondCheck" label-width="100px">
      <div class="caseFormBac" id="link_4" ref="link_4" @mousewheel="scrool4">
        <p>卸载/复检记录</p>
        <div>
          <div class="itemOne">
            <el-form-item label="复检单号" prop="oddNumber">
              <el-input v-model="carInfo.secondCheck.oddNumber">
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemOne">
            <el-form-item label="卸载方式" prop="unloadMode">
              <!-- <el-input v-model="carInfo.secondCheck.unloadMode"></el-input> -->
              <el-select v-model="carInfo.secondCheck.unloadMode">
                <el-option v-for="(item,index)  in optionsXZFS" :key="index" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div v-if="carInfo.secondCheck.unloadMode=='分装'">
          <div>
            <div class="item">
              <el-form-item label="分装车辆" :prop="carInfo.secondCheck.unloadMode=='分装'?'fenPlateColor':'pachor'">
                <el-select v-model="carInfo.secondCheck.fenPlateColor">
                  <el-option v-for="(item,index) in allVehicleIdColor" :key="index" :label="item.name" :value="item.name"></el-option>
                </el-select>
                <!-- <el-autocomplete style="width: 100%" v-model="carInfo.secondCheck.checkWorker" :fetch-suggestions="queryCheckWorker"></el-autocomplete> -->
              </el-form-item>
            </div>
            <div class="item">
              <el-form-item label="分装车号" :prop="carInfo.secondCheck.unloadMode=='分装'?'fenPlate':'pachor'">
                <el-input v-model="carInfo.secondCheck.fenPlate" placeholder="请输入车辆号牌，回车做查询，必须先输入车辆颜色"></el-input>
              </el-form-item>
            </div>
          </div>
          <div>
            <div class="item">
              <el-form-item label="车辆类型" :prop="carInfo.secondCheck.unloadMode=='分装'?'fenCarType':'pachor'">
                <el-select v-model="carInfo.secondCheck.fenCarType">
                  <el-option v-for="(item,index) in allVehicleShipType" :key="index" :label="item.name" :value="item.name"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="item">
              <el-form-item label="分装吨位" :prop="carInfo.secondCheck.unloadMode=='分装'?'fenTonnage':'pachor'">
                <el-input v-model="carInfo.secondCheck.fenTonnage" onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')"></el-input>
              </el-form-item>
            </div>
          </div>
          <div>
            <div class="item">
              <el-form-item label="分装承运人" :prop="carInfo.secondCheck.unloadMode=='分装'?'fenPerson':'pachor'">
                <el-input v-model="carInfo.secondCheck.fenPerson" placeholder="请输入姓名"></el-input>
              </el-form-item>
            </div>
            <div class="item">
              <el-form-item label="身份证号" :prop="carInfo.secondCheck.unloadMode=='分装'?'idCard':'pachor'">
                <el-input v-model="carInfo.secondCheck.idCard" placeholder="请输入身份证号"></el-input>
              </el-form-item>
            </div>
          </div>
          <div>
            <div class="item">
              <el-form-item label="联系电话" :prop="carInfo.secondCheck.unloadMode=='分装'?'phone':'pachor'">
                <el-input ref="partyTel" v-model="carInfo.secondCheck.phone" placeholder="请输入联系电话"></el-input>
              </el-form-item>
            </div>
            <div class="item">
              <el-form-item label="联系地址" :prop="carInfo.secondCheck.unloadMode=='分装'?'address':'pachor'">
                <el-input v-model="carInfo.secondCheck.address" placeholder="请输入联系地址"></el-input>
              </el-form-item>
            </div>
          </div>
        </div>
        <div>
          <div class="item">
            <el-form-item label="复检质量" prop="secondCheckWeight">
              <el-input v-model="carInfo.secondCheck.secondCheckWeight" onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')">
                <template slot="append">吨</template>
              </el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="卸载质量" prop="unloadWeight">
              <el-input v-model="carInfo.secondCheck.unloadWeight" onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')">
                <template slot="append">吨</template>
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="item">
            <el-form-item label="超限比例" prop="overRatio">
              <el-input v-model="carInfo.secondCheck.overRatio" onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')"></el-input>
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
            <el-form-item label="复检人员" id="lawPersonBox" prop="checkPerson">
              <el-input v-model="carInfo.secondCheck.checkPerson"></el-input>
              <!-- <el-select ref="lawPersonListId" v-model="carInfo.secondCheck.checkPersonId" multiple @remove-tag="removeLawPersontag">
                <el-option v-for="item in alreadyChooseLawPerson" :key="item.id" :label="item.lawOfficerName" :value="item.id" placeholder="请添加" :disabled="currentUserLawId==item.id?true:false"></el-option>
              </el-select> -->
              <el-button icon="el-icon-plus" @click="addLawPerson('secondCheck',lawPersonListId3,alreadyChooseLawPerson3)"></el-button>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
    <el-form label-width="200px;">
      <div class="caseFormBac" id="link_5" ref="link_5" @mousewheel="scrool5">
        <p>处罚决定</p>
        <el-form-item label="公安交警处罚决定书" class="is-required">
          <el-upload class="upload-demo modle-upload" style="margin-bottom:22px" action="https://jsonplaceholder.typicode.com/posts/" :http-request="uploadFile" :on-remove="handleRemoveFile" :before-remove="beforeRemoveFile" multiple :file-list="fileList">
            <el-button size="small" type="primary">选取文件</el-button>
          </el-upload>
        </el-form-item>
      </div>
    </el-form>
    <chooseLawPerson ref="chooseLawPersonRef" @setLawPer="setLawPerson" @userList="getAllUserList"></chooseLawPerson>
    <!-- 置顶 -->
    <el-backtop target="#inforCollectionBox" :bottom="46" :right="0" :visibility-height="800" style="width: 58px;height: 58px;" @click="backTop">
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
    <!-- 悬浮按钮 -->
    <div class="float-btns" style="bottom:150px">
      <el-button type="primary" @click="saveDataBtn(0)">
        <i class="iconfont law-save"></i>
        <br />保存
      </el-button>
      <el-button type="primary" @click="saveDataBtn(1)" v-show="inspectionOverWeightId.id">
        <i class="iconfont law-save"></i>
        <br />归档
      </el-button>
    </div>
  </div>
</template>
<script>
import util from "@/common/js/util";
import chooseLawPerson from "@/page/caseHandle/unRecordCase/chooseLawPerson";
// import chooseLawPerson from "@/page/inspection/record-manage/chooseModlePerson";
import mapDiag from "@/page/caseHandle/case/form/inforCollectionPage/diag/mapDiag";
import floatBtns from './floatMenu.vue';
import iLocalStroage from "@/common/js/localStroage";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import { validateIDNumber, checkPassport, validateAge, validateZIP, validatePhone, vaildateCardNum, } from "@/common/js/validator";
import { findLawOfficerListApi, getAssistFile } from "@/api/caseHandle";
import { findRouteManageByOrganIdApi, } from "@/api/system";
import { saveOrUpdateCarInfoApi, getDictListDetailByNameApi, findCarInfoByIdApi } from "@/api/inspection";
import { deleteFileByIdApi, uploadCommon } from "@/api/upload.js";
import { vehicleCheckApi, yyclCheckApi } from "@/api/checkInfo.js";
export default {
  data() {
    //执法人员人数不得少于2个，最多不多与9个
    var validateLawPersonNumber = (rule, value, callback) => {
      if (this.lawPersonListId.length < 2) {
        return callback(new Error('执法人员不得少于2人'));
      } else if (this.lawPersonListId.length > 9) {
        return callback(new Error('执法人员不得多于9人'));
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
      changePartyIdType2Index: "",
      theStr: "", // 输入框长度到达设定值时输入框的内容
      recentCheckWorkers: [], //历史保存过检测人员
      vehicleTypeList: [], //车型
      vehicleAxlesTypeList: [], //轴数
      brandList: [], //品牌
      carInfo: {
        id: '',
        checkType: '路警联合',
        detectStation: '检测站1',//监测站
        vehicleIdColor: '黄色',
        vehicleShipId: '',
        vehicleShipType: '',
        transportNum: '',
        axisNum: '',
        axisType: '',
        businessStatus: '',
        businessScope: '',
        loadGoods: '',
        startPlace: '',
        endPlace: '',
        trailerIdNo: '',
        trailerColor: '',
        drivePerson: {
          party: '',
          partyIdNo: '',
          partyTel: '',
          partyAddress: '',
          occupation: '',
          partyUnitPosition: '',
          lawOfficer: '',
          lawOfficerId: '',
        },
        firstCheck: {
          oddNumber: '',
          vehicleShipType: '',
          axisType: '',
          axisNum: '',
          axisType: '',
          totalWeight: '',
          weightLimit: '',
          overWeight: '',
          overRatio: '',
          totalLength: '',
          totalWide: '',
          totalHeight: '',
          checkResult: '超限超载',
          checkPerson: '',
          checkPersonId: '',
        },

        secondCheck: {
          oddNumber: '',
          unloadMode: '',
          fenPlateColor: '黄色',
          fenTonnage: '',
          fenPlate: '',
          fenCarType: '',
          fenPerson: '',
          idCard: '',
          phone: '',
          address: '',
          unloadWeight: '',
          secondCheckWeight: '',
          checkNumber: '',
          overRatio: '',
          checkPerson: '',
          checkPersonId: '',
        },
        penaltyDecision: {}
      },
      fileList: [],
      routeList: [],
      directionList: [],
      locationList: [],
      carInfoRules: {
        vehicleShipId: [{ validator: vaildateCardNum, trigger: "change" }],
        trailerIdNo: [{ validator: vaildateCardNum, trigger: "change" }],
        vehicleIdColor: [{ required: true, message: "请选择", trigger: "change" }],
        loadGoods: [{ required: true, message: "请输入", trigger: "change" }],
        startPlace: [{ required: true, message: "请输入", trigger: "change" }],
        endPlace: [{ required: true, message: "请输入", trigger: "change" }],
      },
      drivePersonRules: {
        party: [
          { required: true, message: "请输入", trigger: "change" },
        ],
        partyTel: [{ required: true, message: "请输入", trigger: "change" },
        { validator: validatePhone, trigger: "change" }],
        partyIdNo: [{ required: true, message: "请输入", trigger: "change" },
        { validator: checkIdNoPassSort, trigger: "change" }],
        partyAddress: [{ required: true, message: "请输入", trigger: "change" }],
        lawOfficer: [{ required: true, message: "请选择", trigger: "change" },
        { validator: validateLawPersonNumber, trigger: "change" }],
      },
      firstCheckRules: {
        vehicleShipId: [{ required: true, message: "请输入", trigger: "change" },
        { validator: vaildateCardNum, trigger: "change" }],
        totalWeight: [{ required: true, message: "请输入", trigger: "change" }],
        overRatio: [{ required: true, message: "请输入", trigger: "change" }],
        overWeight: [{ required: true, message: "请输入", trigger: "change" }],
        checkResult: [{ required: true, message: "请选择", trigger: "change" }],
        checkPerson: [{ required: true, message: "请选择", trigger: "change" },
        { validator: validateLawPersonNumber, trigger: "change" }],
      },
      secondCheckRules: {
        fenPlateColor: [{ required: true, message: "请选择", trigger: "change" }],
        fenPlate: [{ required: true, message: "请输入", trigger: "change" }],
        fenTonnage: [{ required: true, message: "请输入", trigger: "change" }],
        fenPerson: [{ required: true, message: "请输入", trigger: "change" }],
        idCard: [{ required: true, message: "请输入", trigger: "change" },
        { validator: checkIdNoPassSort, trigger: "change" }],
        secondCheckWeight: [{ required: true, message: "请输入", trigger: "change" }],
        unloadWeight: [{ required: true, message: "请输入", trigger: "change" }],
        overRatio: [{ required: true, message: "请输入", trigger: "change" }],
        checkResult: [{ required: true, message: "请输入", trigger: "change" }],
        phone: [{ validator: validatePhone, trigger: "change" }],
        checkPerson: [{ required: true, message: "请选择", trigger: "change" },
        { validator: validateLawPersonNumber, trigger: "change" }],
      },
      alreadyChooseLawPerson: [],
      alreadyChooseLawPerson2: [],
      alreadyChooseLawPerson3: [],
      allVehicleIdColor: [],//车牌颜色下拉框
      allVehicleShipType: [],
      lawPersonListId: "",
      lawPersonListId2: "",
      lawPersonListId3: "",
      currentUserLawId: "",
      // disableBtn: false, //提交暂存按钮的禁用
      activeA: [true, false, false, false, false],
      autoSava: true, //自动暂存
      // allTrailerTypeType: [], //挂车类型,
      //案发地点标志
      afddFlag: false,
      // disableZcBtn: false, //暂存按钮禁用车辆类型
      hasLatitudeAndLongitude: false, //案发坐标是否已经获取
      fileEiditFlag: '',
      formOrDocData: '',
      submitFileData: '',
      saveEileData: '',
      formArr: [
        'drivePerson', 'carInfo', 'secondCheck', 'firstCheck'
      ],
      resultArr: [], //接受验证返回结果数组
      //表单验证错误提示
      rejectObj: [
        '车辆信息未填写完整，请检查！',
        '驾驶员/企业信息未填写完整，请检查！',
        '初检记录未填写完整，请检查！',
        '卸载/复检记录未填写完整，请检查！',
      ],
      optionsXZFS: [],
      currentPerson: '',
      carinfoId: '',
      selectLoading: false,
      postInfo: [], //职务
      sfList: [
        {
          value: '蓝色',
          label: 1
        },
        {
          value: '黄色',
          label: 2
        },
        {
          value: '黑色 ',
          label: 3
        },
        {
          value: '白色',
          label: 4
        },
        {
          value: '其他',
          label: 9
        }
      ],
    };
  },
  components: {
    chooseLawPerson,
    mapDiag,
    floatBtns,
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(["caseId", "openTab", "caseHandle", "inspectionOverWeightId"]) },
  methods: {
    //选择执法人员
    addLawPerson(item, lawPersonListId, alreadyChooseLawPerson) {
      this.currentPerson = item
      this.$refs.chooseLawPersonRef.showModal(lawPersonListId, alreadyChooseLawPerson);
    },
    //设置执法人员
    setLawPerson(userlist) {
      // this.lawPersonList = userlist;
      let certificateIdArr = [];
      userlist.forEach(item => {
        //   //给表单数据赋值
        // certificateIdArr.push(item.selectLawOfficerCard);//执法账号
        certificateIdArr.push(item.lawOfficerName + '(' + item.selectLawOfficerCard + ')');//执企业组织信息员
      });
      if (this.currentPerson == 'drivePerson') {
        this.lawPersonListId = [];
        this.alreadyChooseLawPerson = userlist;
        this.carInfo.drivePerson.lawOfficer = certificateIdArr.join(',')
        this.alreadyChooseLawPerson.forEach((item) => {
          this.lawPersonListId.push(item.id);
        });
        // 初检、复检继承驾驶人信息中的执法人员
        this.lawPersonListId2 = [];
        this.alreadyChooseLawPerson2 = userlist;
        this.carInfo.firstCheck.checkPerson = certificateIdArr.join(',')
        this.alreadyChooseLawPerson2.forEach((item) => {
          this.lawPersonListId2.push(item.id);
        });
        this.lawPersonListId3 = [];
        this.alreadyChooseLawPerson3 = userlist;
        this.carInfo.secondCheck.checkPerson = certificateIdArr.join(',')
        this.alreadyChooseLawPerson3.forEach((item) => {
          this.lawPersonListId3.push(item.id);
        });
      }
      if (this.currentPerson == 'firstCheck') {
        this.lawPersonListId2 = [];
        this.alreadyChooseLawPerson2 = userlist;
        this.carInfo.firstCheck.checkPerson = certificateIdArr.join(',')
        this.alreadyChooseLawPerson2.forEach((item) => {
          this.lawPersonListId2.push(item.id);
        });
      }
      if (this.currentPerson == 'secondCheck') {
        this.lawPersonListId3 = [];
        this.alreadyChooseLawPerson3 = userlist;
        this.carInfo.secondCheck.checkPerson = certificateIdArr.join(',')
        this.alreadyChooseLawPerson3.forEach((item) => {
          this.lawPersonListId3.push(item.id);
        });
      }
    },
    // 默认设置联系人为当前用户 需要用用户的id去拿他作为执法人员的id
    setLawPersonCurrentP(type) {
      // type=1为回显
      let _this = this
      this.$store
        .dispatch("findLawOfficerList", iLocalStroage.gets("userInfo").organId)
        .then(
          (res) => {
            let currentUserData = {};
            this.lawPersonListId = [];
            this.alreadyChooseLawPerson = [];
            this.lawPersonListId2 = [];
            this.alreadyChooseLawPerson2 = [];
            this.lawPersonListId3 = [];
            this.alreadyChooseLawPerson3 = [];

            res.data.forEach((item) => {
              if (type) {
                if (_this.carInfo.drivePerson.lawOfficer.indexOf(item.lawOfficerName) != -1) {
                  this.alreadyChooseLawPerson.push(item);
                  this.lawPersonListId.push(item.id);
                }
                if (_this.carInfo.firstCheck.checkPerson.indexOf(item.lawOfficerName) != -1) {
                  this.alreadyChooseLawPerson2.push(item);
                  this.lawPersonListId2.push(item.id);
                }
                if (_this.carInfo.secondCheck.checkPerson.indexOf(item.lawOfficerName) != -1) {
                  this.alreadyChooseLawPerson3.push(item);
                  this.lawPersonListId3.push(item.id);
                }
              } else
                if (item.userId == iLocalStroage.gets("userInfo").id) {
                  currentUserData.id = item.id;
                  currentUserData.lawOfficerName = item.lawOfficerName;
                  currentUserData.selectLawOfficerCard = item.lawOfficerCards.split(",")[0];
                  this.alreadyChooseLawPerson.push(currentUserData);
                  this.lawPersonListId.push(currentUserData.id);
                  this.alreadyChooseLawPerson2.push(currentUserData);
                  this.lawPersonListId2.push(currentUserData.id);
                  this.alreadyChooseLawPerson3.push(currentUserData);
                  this.lawPersonListId3.push(currentUserData.id);

                  this.$set(_this.carInfo.drivePerson, 'lawOfficer', currentUserData.lawOfficerName + '(' + currentUserData.selectLawOfficerCard + ')')
                  this.$set(_this.carInfo.firstCheck, 'checkPerson', currentUserData.lawOfficerName + '(' + currentUserData.selectLawOfficerCard + ')')
                  this.$set(_this.carInfo.secondCheck, 'checkPerson', currentUserData.lawOfficerName + '(' + currentUserData.selectLawOfficerCard + ')')
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
    // //获取坐标
    // getLngLat(lngLatStr, address) {
    //   this.inforForm.latitudeAndLongitude = lngLatStr;
    //   this.inforForm.afdd = address;
    //   this.hasLatitudeAndLongitude = true;
    // },
    getDrawerList(data) {
      let _this = this
      data.forEach(element => {
        getDictListDetailByNameApi(element.name).then(
          res => {
            switch (element.option) {
              case 1: _this.allVehicleIdColor = res.data; break;//车牌颜色
              case 2: _this.allVehicleShipType = res.data; break;//车辆类型
              case 3: _this.optionsXZFS = res.data; break;//车辆类型
            }
          },
          error => {
            // reject(error);
          })
      });

    },
    getDictInfo(name, codeName) {
      //根据数据字典查询
      let _this = this;
      if (_this[codeName].length) {
        return false;
      }
      _this.selectLoading = true;
      _this.$store
        .dispatch("findAllDrawerByName", name)
        .then(
          //查询执法领域
          (res) => {
            _this.selectLoading = false;
            if (res.code === 200) {
              _this[codeName] = res.data
            } else {
              console.info("没有查询到数据");
            }
          },
          (err) => {
            _this.selectLoading = false;
            console.log(err);
          }
        )
        .catch(() => { });
    },
    //获取坐标
    getLngLat(lngLatStr, address) {
      this.form.eventCoordinate = lngLatStr;
      this.form.eventAddress = address;
      this.hasLatitudeAndLongitude = true;
    },
    weightLimit() { },
    saveFileData() { },
    searchNumber() {
      let _this = this
      // 查询车辆号牌
      console.log()
      if (this.carInfo.vehicleShipId && this.carInfo.vehicleIdColor) {
        let colorCode = '';
        this.sfList.forEach(element => {
          if (element.value == this.carInfo.vehicleIdColor) {
            colorCode = element.label
          }
        });
        let json = [];
        let param = {
          vehicleNo: this.carInfo.vehicleShipId,
          plateColor: colorCode
        };
        json.push(param);
        vehicleCheckApi(JSON.stringify(json)).then(
          res => {
            let chewckData = {
              transCertificateCode: res.data[0].transCertificateCode,
              vehicleNo: this.carInfo.vehicleShipId,
              vin: ''
            }
            yyclCheckApi(chewckData).then(
              res => {
            _this.carInfo.businessScope = res.data[0].BusinessScopeCode;

                _this.carInfo.vehicleShipType = res.data[0].VehicleTypeCode;
                _this.carInfo.transportNum = res.data[0].LicenseCode;
                _this.carInfo.businessStatus = res.data[0].OperatingStatus;
              },
              error => {

              })
          },
          error => {

          })
      } else {
        this.$message.error('请正确输入车辆颜色和车牌号码');
      }
    },
    saveDataBtn(handleType) {
      let _this = this
      if (handleType == 0) {
        // 保存
        // 隐藏保存、签章按钮，显示撤销、删除按钮
        // this.$emit('saveDataStatus', handleType);
        this.saveMethod()
        // 保存-修改状态
      }
      if (handleType == 1) {
        // 归档
        this.resultArr = [];
        let that = this;

        this.formArr.forEach((item, index) => {
          //根据表单的ref校验
          this.refForm(item, this.rejectObj[index])
        })
        Promise.all(this.resultArr).then(function () {
          //验证全部通过
          _this.carInfo.fileStatus = 1
          _this.saveMethod()
        }).catch(function (data) {
          //验证失败 提示reject失败状态的值
          that.$message.error('请先完善表单内容');
        });

      }
    },
    refForm(formName, err) {
      console.log('err', err)
      let that = this;
      let result = new Promise(function (resolve, reject) {
        that.$refs[formName].validate((valid) => {
          if (valid) {
            resolve();
          } else {
            reject(err)
          }
        })
      })
      that.resultArr.push(result)
    },
    saveMethod() {
      let data = JSON.parse(JSON.stringify(this.carInfo))
      data.drivePerson = JSON.stringify(data.drivePerson)
      data.firstCheck = JSON.stringify(data.firstCheck)
      data.secondCheck = JSON.stringify(data.secondCheck)
      data.penaltyDecision = data.penaltyDecision ? data.penaltyDecision : {}
      data.penaltyDecision = JSON.stringify(data.penaltyDecision)
      data.id = data.id ? data.id : this.carinfoId
      saveOrUpdateCarInfoApi(data).then(
        res => {
          if (res.code == 200) {
            this.$store.commit("set_inspection_OverWeightId", { id: data.id })
            this.getData(data.id)
            this.$message({
              type: "success",
              message: res.msg
            });
          } else {
            this.$message.error(res.msg);
          }
        },
        error => {

        })
    },
    genID() {
      var originStr = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        originChar = '0123456789abcdef',
        len = originChar.length;
      return originStr.replace(/x/g, function (match) {
        return originChar.charAt(Math.floor(Math.random() * len))
      })
    },
    getData(id) {
      let _this = this
      findCarInfoByIdApi(this.inspectionOverWeightId.id || id).then(
        res => {
          if (res.code == 200) {
            _this.carInfo = res.data;
            this.carinfoId = this.inspectionOverWeightId.id || id;
            this.setLawPersonCurrentP(1);
            this.getFile()
          } else {
            this.$message.error(res.msg);
          }
        },
        error => {

        })
    },
    // saveFile(param) {
    //   this.fileListUpload.push(param)
    // },
    //上传附件
    uploadFile(param) {
      var fd = new FormData()
      fd.append("file", param.file);
      fd.append("category", '路警联合;图片');
      fd.append("fileName", param.file.name);
      fd.append('status', 1)//传图片状态
      fd.append('caseId', this.carinfoId)//传记录id
      fd.append('docId', '000005')//传类型代码
      uploadCommon(fd).then(
        // upload(fd).then(
        res => {
          console.log(res);
          this.getFile()
        },
        error => {
          console.log(error)
        }
      );
    },
    beforeRemoveFile(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleRemoveFile(file, fileList) {
      if (file.storageId) {
        deleteFileByIdApi(file.storageId).then(
          res => {
            console.log(res);
          },
          error => {
            console.log(error)
          }
        );
      } else {
        return;
      }
    },
    getFile() {
      let data = {
        caseId: this.carinfoId,
        category: "路警联合;图片",
        docId: "000005"
      }
      getAssistFile(data).then(
        res => {
          res.data.forEach(element => {
            element.name = element.fileName
          });
          this.fileList = res.data
        },
        error => {
          console.log(error)
        }
      );
    },
    /* 置顶后锚点回到第一个 */
    backTop() {
      this.activeA = [true, false, false, false, false];
    }
  },

  mounted() {
    this.getDrawerList([
      { name: '车牌颜色', option: 1 },
      { name: '车辆类型', option: 2 },
      { name: '路警联合-卸载方式', option: 3 },])

    if (this.inspectionOverWeightId.id) {
      this.getData()
    } else {
      this.carinfoId = this.genID()
      this.setLawPersonCurrentP();
    }

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
