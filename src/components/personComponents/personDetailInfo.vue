<template>
  <div class="pserson-detail-wrap">
    <div class="new_css" v-show="isShowAddPerson">
      <el-form ref="addForm" :model="personInfoDetailForm" label-width="140px" :rules="rules">
        <div class="float css_left" style="position: absolute;top:0;bottom:0;">
          <!-- 左侧内容 -->
          <div ref="uploadRef" class="block" style="margin-top:50px;">
            <div class="image-view">
              <img :src="personImg" alt />
            </div>
            <div class="el-upload--picture-card">
              <el-button size="cats-common" @click="uploadAvatar">上传照片</el-button>
            </div>
          </div>
        </div>
        <div class="float css_right" style="float:right;">
          <!-- 右侧表格 -->
          <!--基本信息 -->
          <div class="info_box">
            <div class="info_content float">
              <div class="center_content">
                <span class="titleflag"></span>
                <span class="title-left">基本信息</span>
              </div>
              <div class="info_body">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="真实姓名" prop="personName">
                      <el-input v-model="personInfoDetailForm.personName" maxlength="25"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="身份证号" prop="idNo">
                      <el-input v-model="personInfoDetailForm.idNo" maxlength="18"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="性别" prop="sexName">
                      <el-input v-model="personInfoDetailForm.sexName" :disabled="isDisabled"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="出生日期" prop="birthDate">
                      <el-input v-model="personInfoDetailForm.birthDate" :disabled="isDisabled"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="民族" prop="nationName">
                      <el-select
                        v-model="personInfoDetailForm.nationName"
                        placeholder="民族"
                        class="nation-select"
                        :filterable="nationInfo.length > 5"
                        :popper-append-to-body="false"
                        @change="selectVal($event,'nation')"
                      >
                        <el-option
                          v-for="value in nationInfo"
                          :key="value.id"
                          :label="value.name"
                          :value="value.id"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="参加工作日期" prop="workDate">
                      <el-date-picker
                        v-model="personInfoDetailForm.workDate"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择参加工作日期"
                        clearable
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="政治面貌" prop="politicalStatusName">
                      <!--<el-input v-model="personInfoDetailForm.politicalStatusName"></el-input>-->
                      <el-select
                        v-model="personInfoDetailForm.politicalStatusName"
                        placeholder="政治面貌"
                        :loading="selectLoading"
                        @change="selectVal($event,'politicalStatus')"
                        @focus="getDictInfo('人员信息-政治面貌','politicalInfo')"
                      >
                        <el-option
                          v-for="value in politicalInfo"
                          :key="value.id"
                          :label="value.name"
                          :value="value.id"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="入党日期" prop="admissionDate">
                      <el-date-picker
                        v-model="personInfoDetailForm.admissionDate"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择入党日期"
                        clearable
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
          <!-- 学历 -->
          <div class="info_box">
            <div class="info_content float">
              <div class="center_content">
                <span class="titleflag"></span>
                <span class="title-left">学历信息</span>
              </div>
              <div class="info_body">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="学历" prop="degree">
                      <!--<el-input v-model="personInfoDetailForm.degree"></el-input>-->
                      <el-select
                        v-model="personInfoDetailForm.degreeName"
                        placeholder="学历"
                        :loading="selectLoading"
                        filterable
                        @change="selectVal($event,'degree')"
                        @focus="getDictInfo('人员信息-学历','degreeInfo')"
                      >
                        <el-option
                          v-for="value in degreeInfo"
                          :key="value.id"
                          :label="value.name"
                          :value="value.id"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="毕业学校" prop="school">
                      <el-input v-model="personInfoDetailForm.school"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="毕业专业" prop="major">
                      <el-select
                        v-model="personInfoDetailForm.majorName"
                        placeholder="毕业专业"
                        :filterable="majorOptions.length > 5"
                        :loading="selectLoading"
                        @change="selectVal($event,'major')"
                        @focus="getDictInfo('人员信息-毕业专业','majorOptions')"
                      >
                        <el-option
                          v-for="value in majorOptions"
                          :key="value.id"
                          :label="value.name"
                          :value="value.id"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="毕业证书编号"
                      prop="graduationNo"
                    >
                      <el-input v-model="personInfoDetailForm.graduationNo" maxlength="18"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="分配渠道" prop="disChannel">
                      <!--<el-input v-model="personInfoDetailForm.disChannelName"></el-input>-->
                      <el-select
                        v-model="personInfoDetailForm.disChannelName"
                        placeholder="分配渠道"
                        :filterable="disChannelInfo.length > 5"
                        :loading="selectLoading"
                        @change="selectVal($event,'disChannel')"
                        @focus="getDictInfo('人员信息-分配渠道','disChannelInfo')"
                      >
                        <el-option
                          v-for="value in disChannelInfo"
                          :key="value.id"
                          :label="value.name"
                          :value="value.id"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
          <!--  工作信息 -->
          <div class="info_box">
            <div class="info_content float">
              <div class="center_content">
                <span class="titleflag"></span>
                <span class="title-left">工作信息</span>
              </div>
              <div class="info_body">
                <el-row v-if="isShowAddPerson">
                  <el-col :span="12">
                    <div v-if="pageParams.type">
                      <el-form-item label="所属机构" prop="oid">
                        <el-select disabled v-model="personInfoDetailForm.oid" placeholder="所属机构">
                          <el-option
                            :key="personInfoDetailForm.oid"
                            :label="personInfoDetailForm.oname"
                            :value="personInfoDetailForm.oid"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                    <div v-else>
                      <el-form-item label="所属机构" prop="oid">
                        <elSelectTree
                          v-if="showSelectTree"
                          ref="elSelectTreeObj"
                          :options="tableDataTree"
                          :accordion="true"
                          :props="props"
                          @getValue="handleChanged"
                        ></elSelectTree>
                        <el-input style="display:none" v-model="personInfoDetailForm.oid"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="人员编制" prop="staffingName">
                      <!--<el-input v-model="personInfoDetailForm.staffing"></el-input>-->
                      <el-select
                        v-model="personInfoDetailForm.staffingName"
                        placeholder="人员编制"
                        :filterable="staffingInfo.length > 5"
                        :loading="selectLoading"
                        @change="selectVal($event,'staffing')"
                        @focus="getDictInfo('人员信息-人员编制','staffingInfo')"
                      >
                        <el-option
                          v-for="value in staffingInfo"
                          :key="value.id"
                          :label="value.name"
                          :value="value.id"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="职务" prop="postName">
                      <!--<el-input v-model="personInfoDetailForm.post"></el-input>-->
                      <el-select
                        v-model="personInfoDetailForm.postName"
                        placeholder="职务"
                        :filterable="postInfo.length > 5"
                        :loading="selectLoading"
                        @change="selectVal($event,'post')"
                        @focus="getDictInfo('人员信息-职务','postInfo')"
                      >
                        <el-option
                          v-for="value in postInfo"
                          :key="value.id"
                          :label="value.name"
                          :value="value.id"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="岗位" prop="stationId">
                      <!--<el-input v-model="personInfoDetailForm.stationName"></el-input>-->
                      <el-select
                        v-model="personInfoDetailForm.stationName"
                        placeholder="岗位"
                        :filterable="stationInfo.length > 5"
                        :loading="selectLoading"
                        @change="selectVal($event,'stationId')"
                      >
                        <el-option
                          v-for="value in stationInfo"
                          :key="value.id"
                          :label="value.name"
                          :value="value.id"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item
                      label="执法领域"
                      prop="branchName"
                      :rules="{required: rules.branchName !== undefined, message: '执法领域必须填写', trigger: 'change' }"
                    >
                      <el-select
                        v-model="personInfoDetailForm.branchName"
                        placeholder="执法领域"
                        :filterable="branchInfo.length > 5"
                        :loading="selectLoading"
                        clearable
                        @change="selectVal($event,'branchId')"
                        @focus="getDictInfo('执法门类','branchInfo')"
                      >
                        <el-option
                          v-for="value in branchInfo"
                          :key="value.id"
                          :label="value.name"
                          :value="value.id"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="执法区域"
                      prop="area"
                      :rules="[ { required: rules.branchName !== undefined, message: '执法区域不能为空', trigger: 'blur'},
                      { validator: isSpecialChar, trigger: 'blur' }]"
                    >
                      <el-input v-model="personInfoDetailForm.area" maxlength="25"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="从事执法日期" prop="enfoceDate">
                      <!--<el-input v-model="personInfoDetailForm.enfoceDate"></el-input>-->
                      <el-date-picker
                        v-model="personInfoDetailForm.enfoceDate"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择从事执法日期"
                        clearable
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="法律职业资格证书号" prop="lawCertNo">
                      <el-input v-model="personInfoDetailForm.lawCertNo"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item
                      label="省内执法证号"
                      prop="provinceNo"
                    >
                      <el-input v-model="personInfoDetailForm.provinceNo" maxlength="25"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item
                      label="部级执法证号"
                      prop="ministerialNo"
                    >
                      <el-input v-model="personInfoDetailForm.ministerialNo" maxlength="8"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="海事执法证号"
                      prop="maritimeNo"
                    >
                      <el-input v-model="personInfoDetailForm.maritimeNo" maxlength="25"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row style="margin-left:950px;">
                  <!-- <el-button class="edit_save" type="primary" @click="savePersonPage">保存</el-button> -->
                  <div v-if="pageParams.type !== 'view'" class="float-btns">
                    <el-button class="edit_btn" type="primary" @click="savePersonPage">
                      <i class="iconfont law-save"></i>
                      <br />保存
                    </el-button>
                  </div>
                </el-row>
              </div>
            </div>
          </div>
        </div>
      </el-form>
      <UploadPersonAvatar ref="uploadAvatar" @showAvatar="showAvatar" @submitAvatar="changeAvatar" />
    </div>
    <div class="dentail_info_box" v-show="!isShowAddPerson" style="overflow: hidden;">
      <el-form ref="form" :model="personInfoDetailForm" label-width="150px">
        <div v-if="pageParams.type === 'edit'" class="float-btns">
          <el-button class="edit_btn" type="primary" @click="editPersonPage">
            <i class="iconfont law-edit"></i>
            <br />修改
          </el-button>
        </div>
        <!--基本信息 -->
        <el-row>
          <div class="info_box">
            <!-- <hr class="line" /> -->
            <div class="info_content float" style="float:left">
              <div class="center_content">
                <span class="titleflag"></span>
                <span class="title-left">基本信息</span>
              </div>
              <div class="info_body">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="姓名：" prop="personName">{{personInfoDetailForm.personName}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="身份证号：" prop="idNo">{{personInfoDetailForm.idNo}}</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="性别：" prop="sexName">{{personInfoDetailForm.sexName}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="出生日期：" prop="birthDate">{{personInfoDetailForm.birthDate}}</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="民族：" prop="nationName">{{personInfoDetailForm.nationName}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="参加工作日期：" prop="workDate">{{personInfoDetailForm.workDate}}</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item
                      label="政治面貌："
                      prop="politicalStatusName"
                    >{{personInfoDetailForm.politicalStatusName}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="入党日期："
                      prop="admissionDate"
                    >{{personInfoDetailForm.admissionDate}}</el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
            <!-- 照片 -->
            <div class="img_box float">
              <img :src="personImg" alt />
            </div>
          </div>
        </el-row>
        <!-- 学历信息 -->
        <el-row>
          <div class="info_box">
            <hr class="line" />
            <div class="info_content">
              <div class="center_content">
                <span class="titleflag"></span>
                <span class="title-left">学历信息</span>
              </div>
              <div class="info_body">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="学历：" prop="degreeName">{{personInfoDetailForm.degreeName}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="毕业学校：" prop="school">{{personInfoDetailForm.school}}</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="毕业专业：" prop="major">{{personInfoDetailForm.majorName}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="毕业证书编号："
                      prop="graduationNo"
                    >{{personInfoDetailForm.graduationNo}}</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item
                      label="分配渠道："
                      prop="disChannelName"
                    >{{personInfoDetailForm.disChannelName}}</el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </el-row>
        <!-- 工作信息 -->
        <div class="info_box">
          <hr class="line" />
          <div class="info_content">
            <div class="center_content">
              <span class="titleflag"></span>
              <span class="title-left">工作信息</span>
            </div>
            <div class="info_body">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="所属机构：" prop="oname">{{personInfoDetailForm.oname}}</el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label="人员编制："
                    prop="staffingName"
                  >{{personInfoDetailForm.staffingName}}</el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="职务：" prop="postName">{{personInfoDetailForm.postName}}</el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="岗位：" prop="stationName">{{personInfoDetailForm.stationName}}</el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="执法领域：" prop="branchName">{{personInfoDetailForm.branchName}}</el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="执法区域：" prop="area">{{personInfoDetailForm.area}}</el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label="从事执法日期："
                    prop="enfoceDate"
                  >{{personInfoDetailForm.enfoceDate}}</el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label="法律职业资格证号："
                    prop="lawCertNo"
                  >{{personInfoDetailForm.lawCertNo}}</el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label="省内执法证号："
                    prop="provinceNo"
                  >{{personInfoDetailForm.provinceNo}}</el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label="部级执法证号："
                    prop="ministerialNo"
                  >{{personInfoDetailForm.ministerialNo}}</el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label="海事执法证号："
                    prop="maritimeNo"
                  >{{personInfoDetailForm.maritimeNo}}</el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label="证件办理状态："
                    prop="certStatusName"
                  >{{personInfoDetailForm.certStatusName}}</el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label="当前证件状态："
                    prop="currentCertStatusName"
                  >{{personInfoDetailForm.currentCertStatusName}}</el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import { validateIDNumber, isSpecialChar } from "@/common/js/validator";
import { mixinPerson } from "@/common/js/personComm";
import elSelectTree from "@/components/elSelectTree/elSelectTree";
import UploadPersonAvatar from "@/components/personComponents/uploadPersonAvatar";
import iLocalStroage from "@/common/js/localStroage.js";
export default {
  name: "personDetailInfo", //人员基本信息组件
  mixins: [mixinPerson],
  props: {
    person: {
      type: Object,
      default: () => {},
      required: true,
    },
    pageParams: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  data() {
    return {
      isSpecialChar: isSpecialChar,
      pageType: "",
      tableDataTree: [], //所属机构下拉列表值***
      props: {
        label: "label",
        value: "id",
      },
      nationInfo: [], //民族信息列表
      politicalInfo: [], //政治面貌
      degreeInfo: [], //学历列表
      disChannelInfo: [], //分配渠道
      oidInfo: [], //所属机构
      stationInfo: [], //岗位列表
      stationStatusInfo: [], //岗位状态
      postInfo: [], //职务
      staffingInfo: [], //人员编制
      branchInfo: [], //执法领域
      majorOptions: [], // 毕业专业
      imageUrl: "",
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      isDisabled: true,
      photoList: [],
      personInfoDetailForm: {
        personId: "",
        school: "",
        branchId: "",
        branchName: "",
        personName: "",
        sex: "",
        sexName: "",
        idNo: "",
        birthDate: "",
        workDate: "",
        enfoceDate: "",
        major: "",
        graduationNo: "",
        post: "",
        postName: "",
        area: "",
        provinceNo: "",
        ministerialNo: "",
        maritimeNo: "",
        certNo: "",
        qualificationNo: "",
        admissionDate: "",
        certStatus: "",
        personStatus: "",
        note: "",
        attached: "",
        nation: "",
        nationName: "",
        degree: "",
        degreeName: "",
        oname: "",
        oid: "",
        politicalStatus: "",
        politicalStatusName: "",
        staffing: "",
        staffingName: "",
        certStatusName: "",
        disChannel: "",
        disChannelName: "",
        personStatusName: "",
        majorName: "",
        stationName: "",
        stationStatus: "",
        stationId: "",
        stationStatusName: "",
        lawCertNo: "",
        currentCertStatusName: "",
        photoUrl: "",
      },
      rules: {
        personName: [
          {
            required: true,
            message: "姓名必须填写",
            trigger: "blur",
          },
          { validator: isSpecialChar, trigger: 'blur' }
        ],
        idNo: [
          {
            required: true,
            message: "身份证号必须填写",
            trigger: "blur",
          },
          {
            validator: this.vailidIdNo,
            trigger: "blur",
          },
        ],
        nationName: [
          {
            required: true,
            message: "民族必须填写",
            trigger: "change",
          },
        ],
        workDate: [
          {
            required: true,
            message: "参加工作时间必须填写",
            trigger: "blur",
          },
        ],
        politicalStatusName: [
          {
            required: true,
            message: "政治面貌必须填写",
            trigger: "change",
          },
        ],
        degree: [
          {
            required: true,
            message: "学历必须填写",
            trigger: "change",
          },
        ],
        postName: [
          {
            required: true,
            message: "职务必须填写",
            trigger: "change",
          },
        ],
        stationId: [
          {
            required: true,
            message: "岗位必须填写",
            trigger: "change",
          },
        ],
        lawCertNo: [
          {
            validator: this.validateLawCertNo,
            trigger: "blur",
          },
        ],
        oid: [
          {
            required: true,
            message: "所属机构必须填写",
            trigger: "change",
          },
        ],
        staffingName: [
          {
            required: true,
            message: "人员编制必须填写",
            trigger: "change",
          },
        ],
        graduationNo: [ { required: false, validator: isSpecialChar, trigger: 'blur' } ],
        ministerialNo: [ { required: false, validator: isSpecialChar, trigger: 'blur' } ],
        maritimeNo: [ { required: false, validator: isSpecialChar, trigger: 'blur' } ],
        provinceNo: [ { required: false, validator: isSpecialChar, trigger: 'blur' } ],
      },
      personImg: "@/../static/images/img/personInfo/upload_bg.png",
      selectLoading: false,
      showSelectTree: false,
      personClone: {},
      personAvatarFile: null,
      isShowAddPerson: false,
    };
  },
  computed: {
    uploadDisabled: function () {
      let _this = this;
      return _this.photoList.length > 0;
    },
  },
  watch: {
    pageParams: {
      handler: function (val, oldval) {
        if (val.type === "edit" || val.type === "view") {
          this.isShowAddPerson = false;
        } else {
          this.isShowAddPerson = true;
        }
      },
      deep: true,
    },
  },
  components: {
    elSelectTree,
    UploadPersonAvatar,
  },
  created() {
    this.searchTable();
    this.getNationOption();
    this.getStationInfo(); // 获取岗位
  },
  mounted() {
    this.initPage();
  },
  methods: {
    // 初始化页面显示(区分编辑新增)默认新增
    initPage() {
      switch (this.pageParams.type) {
        case "edit":
        case "view":
          this.pageType = "0";
          this.personClone = JSON.parse(JSON.stringify(this.person));
          this.showPersonInfo(this.person);
          break;
        default:
          this.pageType = "1";
          this.showSelectTree = true;
      }
    },
    // 人员信息回显
    showPersonInfo(info) {
      for (const key in this.personInfoDetailForm) {
        this.personInfoDetailForm[key] = info[key] || '';
      }
      this.personInfoDetailForm["sexName"] = info.sex === "0" ? "男" : "女";
      if (info.photoUrl) {
        // 获取头像图片流
        this.$util.com_getFileStream(info.photoUrl).then((res) => {
          this.personImg = res;
        });
      }
    },
    handleChanged(val) {
      this.$refs.elSelectTreeObj.$children[0].handleClose();
      this.personInfoDetailForm.oid = val;
    },
    /* 法律资格证书编号 */
    validateLawCertNo(rule, value, callback) {
      if (value === "" || value === undefined || value === null) {
        callback();
      }
      let reg = /^[A-C]{1}[0-9]{14}$/;
      if (!reg.test(value)) {
        callback(new Error("请输入正确的法律资格证书编号,例：A01234567891234"));
      }
      callback();
    },
    selectVal(event, codeName) {
      let _this = this;
      _this.personInfoDetailForm[codeName] = event;
      if (codeName === "stationId") {
        this.stationChange(event);
      }
    },
    // 岗位变化时相关表单项校验修改
    stationChange(stationId) {
      delete this.rules["branchName"];
      const station = this.stationInfo.find((item) => item.id === stationId);
      if (station) {
        if (station.isLce === "0") {
          this.rules["branchName"] = [
            {
              required: true,
              message: "执法领域必须填写",
              trigger: "change",
            },
          ];
        }
      }
      this.$refs.addForm.clearValidate(["branchName", "area"]);
    },
    savePersonPage() {
      let _this = this;
      let methodSaveOrUpdate = "";
      let messageName = "";
      //修改
      if (_this.pageParams.type == "edit") {
        methodSaveOrUpdate = "updatePersonInfo";
        messageName = "修改成功";
      } else {
        methodSaveOrUpdate = "addPersonInfo";
        messageName = "保存成功";
      }
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.saveEditConfirm(messageName, methodSaveOrUpdate);
        } else {
          return false;
        }
      });
    },
    // 新增修改保存是提示
    saveEditConfirm(messageName, methodSaveOrUpdate) {
      const _this = this;
      if (_this.pageParams.type == "edit") {
        //修改的时候提示
        let confirmText = "";
        switch (_this.personInfoDetailForm.certStatusName) {
          case "暂扣":
          case "挂失":
            confirmText = "执法领域";
            break;
          case "到期换证":
          case "注销":
          case "吊销":
          case "审批未通过":
            confirmText = "执法区域";
            break;
        }
        if (this.checkChangeVal()) {
          const textNode = `<div>当前证件办理状态为<span style="color:red;font-weight: 600;">
            ${_this.personInfoDetailForm.certStatusName}</span>，
            证件相关信息（姓名、身份证号、${confirmText}${
            confirmText ? "、" : ""
          }部级执法证号）
            修改后需重新进行<span style="color:red;font-weight: 600;">证件申请!</span></div>`;
          _this
            .$confirm(textNode, "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              dangerouslyUseHTMLString: true,
              iconClass: "el-icon-question",
              customClass: "custom-confirm",
            })
            .then(() => {
              this.submitPersonInfo(messageName, methodSaveOrUpdate);
            })
            .catch(() => {});
        } else {
          this.submitPersonInfo(messageName, methodSaveOrUpdate);
        }
      } else {
        this.submitPersonInfo(messageName, methodSaveOrUpdate);
      }
    },
    // 判断人员相关信息是否修改
    checkChangeVal() {
      if (this.personInfoDetailForm.certStatusName !== "未申请") {
        // 姓名personName  身份证号idNo 部级执法证号ministerialNo
        const change =
          this.personClone.personName !==
            this.personInfoDetailForm.personName ||
          this.personClone.idNo !== this.personInfoDetailForm.idNo ||
          this.personClone.ministerialNo !==
            this.personInfoDetailForm.ministerialNo;
        return change;
      } else {
        return false;
      }
    },

    // 保存人员信息
    submitPersonInfo(messageName, methodSaveOrUpdate) {
      let _this = this;
      const loading = this.$loading({
        lock: true,
        text: "正在保存",
        spinner: "car-loading",
        customClass: "loading-box",
        background: "rgba(234,237,244, 0.8)",
      });
      _this.$store
        .dispatch(methodSaveOrUpdate, _this.personInfoDetailForm)
        .then(
          (res) => {
            if (res.code === 200) {
              _this.catsMessage({
                type: "success",
                message: messageName,
              });
              this.uploadPhoto(loading, res.data);
            }
          },
          (err) => {
            _this.$message.error(err.msg || "");
            loading.close();
          }
        );
    },
    // 上传照片
    uploadPhoto(saveLoad, personData) {
      if (this.personAvatarFile) {
        let _this = this;
        const formData = new FormData();
        formData.append("file", this.personAvatarFile);
        this.$store.dispatch("uploadMaterial", formData).then((res) => {
          if (res.code === 200) {
            const saveFile = {
              personId: personData.personId,
              photoUrl: res.data[0].storageId,
            };
            _this.$store.dispatch("savePersonPhoto", saveFile).then(
              (res) => {
                saveLoad.close();
                if (_this.pageParams.type === "edit") {
                  _this.$emit("editSuccess");
                } else {
                  _this.openPersonDetail(personData, "edit");
                }
              },
              (err) => {
                saveLoad.close();
                _this.catsMessage({
                  type: "error",
                  message: err.msg || "",
                });
              }
            );
          }
        }),
          (err) => {
            _this.showSubmitBtn = true;
            saveLoad.close();
            _this.catsMessage({
              type: "error",
              message: err.msg || "",
            });
          };
      } else {
        if (this.pageParams.type === "edit") {
          this.$emit("editSuccess");
        } else {
          this.openPersonDetail(personData, "edit");
        }
      }
    },
    // 修改基本信息
    editPersonPage() {
      let _this = this;
      this.$store
        .dispatch("personEdabled", {
          personId: _this.pageParams.id,
        })
        .then(
          (res) => {
            if (res.code === 200) {
              _this.isShowAddPerson = true;
              _this.showSelectTree = true;
              _this.pageType = "0";
              _this.stationChange(_this.personInfoDetailForm.stationId);
            }
          },
          (err) => {
            console.log(err);
          }
        );
    },
    //身份证号码校验(需要走后台做重复验证)
    vailidIdNo(rule, value, callback) {
      let _this = this;
      // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
      let reg = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/;
      if (reg.test(value)) {
        _this.getValidIdNo(value.length);
        callback();
      } else {
        callback(new Error("身份证格式错误"));
      }
    },
    getValidIdNo(val) {
      let _this = this;
      let iden = _this.personInfoDetailForm.idNo;
      let myDate = new Date();
      let month = myDate.getMonth() + 1;
      let day = myDate.getDate();
      let age = 0;
      let sex = "";
      let birth = "";
      if (val === 18) {
        age = myDate.getFullYear() - iden.substring(6, 10) - 1;
        sex = iden.substring(16, 17);
        birth =
          iden.substring(6, 10) +
          "-" +
          iden.substring(10, 12) +
          "-" +
          iden.substring(12, 14);
        if (
          iden.substring(10, 12) < month ||
          (iden.substring(10, 12) == month && iden.substring(12, 14) <= day)
        )
          age++;
      }
      if (val === 15) {
        age = myDate.getFullYear() - iden.substring(6, 8) - 1901;
        sex = iden.substring(13, 14);
        birth =
          "19" +
          iden.substring(6, 8) +
          "-" +
          iden.substring(8, 10) +
          "-" +
          iden.substring(10, 12);
        if (
          iden.substring(8, 10) < month ||
          (iden.substring(8, 10) == month && iden.substring(10, 12) <= day)
        )
          age++;
      }
      if (sex % 2 == 0) {
        _this.personInfoDetailForm.sex = "1";
        _this.personInfoDetailForm.sexName = "女";
      } else {
        _this.personInfoDetailForm.sex = "0";
        _this.personInfoDetailForm.sexName = "男";
      }
      _this.personInfoDetailForm.birthDate = birth;
    },
    // 上传照片弹出裁剪窗口
    uploadAvatar() {
      this.$refs.uploadAvatar.openDialog();
    },
    // 裁剪后照片显示
    showAvatar(data) {
      this.personImg = data;
    },
    // 裁剪后的照片文件
    changeAvatar(file) {
      this.personAvatarFile = file;
    },
    getDepartmentInfo() {
      //查询机构数据
      this.getOrgInfo();
    },
    // 获取民族下拉
    getNationOption() {
      let _this = this;
      this.$store
        .dispatch("findAllDrawerByName", "人员信息-民族")
        .then((res) => {
          if (res.code === 200) {
            _this.nationInfo = res.data;
          }
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
              if (codeName === "nationInfo") {
                _this.nationInfo = res.data;
              }
              if (codeName === "politicalInfo") {
                _this.politicalInfo = res.data;
              }
              if (codeName === "degreeInfo") {
                _this.degreeInfo = res.data;
              }
              if (codeName === "disChannelInfo") {
                _this.disChannelInfo = res.data;
              }
              if (codeName === "stationInfo") {
                _this.stationInfo = res.data;
              }
              if (codeName === "stationStatusInfo") {
                _this.stationStatusInfo = res.data;
              }
              if (codeName === "postInfo") {
                _this.postInfo = res.data;
              }
              if (codeName === "staffingInfo") {
                _this.staffingInfo = res.data;
              }
              if (codeName === "branchInfo") {
                _this.branchInfo = res.data;
              }
              if (codeName === "majorOptions") {
                _this.majorOptions = res.data;
              }
            } else {
              console.info("没有查询到数据");
            }
          },
          (err) => {
            _this.selectLoading = false;
            console.log(err);
          }
        )
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/page/personManageTitle.scss";

.el-select,
.el-input,
.el-input .el-input--suffix,
.el-date-editor.el-input.el-date-editor--date {
  width: 100%;
  max-width: 420px;
}

>>> .el-icon-date {
  line-height: 32px;
}

.nation-select {
  >>> .el-select-dropdown {
    height: 274px;
    overflow: scroll;
  }
}

.pserson-detail-wrap {
  .image-view {
    background-color: #fbfdff;
    border: 1px dashed#c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 136px;
    height: 190px;
    line-height: 190px;
    margin: 0 auto;

    > img {
      width: 100%;
    }
  }

  .upload-person-img {
    text-align: center;
  }

  >>> .el-upload--picture-card {
    box-sizing: border-box;
    border: none;
    width: 136px;
    height: 32px;
    line-height: 32px;
    margin: 18px auto;

    .el-button {
      width: 100%;
      background: linear-gradient(
        180deg,
        rgba(248, 248, 248, 1) 0%,
        rgba(238, 238, 238, 1) 100%
      );
      border: 1px solid rgba(221, 221, 221, 1);
      color: #000;

      &:hover {
        background: rgba(238, 238, 238, 1);
      }
    }
  }

  .float-btns {
    width: 48px;
    height: 100px;
    position: fixed;
    right: 70px;
    bottom: 70px;
    z-index: 100;

    &.float-btns .el-button {
      border-radius: 1px;
      width: 48px;
      height: 48px;
      padding: 0;
      text-align: center;
    }

    .iconfont {
      display: inline-block;
      margin-bottom: 12px;
      margin-left: 4px;
    }
  }
}

.el-upload-list--picture-card .el-upload-list__item {
  overflow: hidden;
  background-color: #fff;
  border: 1px solid #c0ccda;
  border-radius: 6px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 178px;
  height: 178px;
  margin: 0 8px 8px 0;
  margin-left: 0px;
  display: inline-block;
  margin-left: -12px;
}

.info_box {
  position: relative;

  .img_box {
    position: absolute;
    right: 150px;
    top: 20px;
    background-color: #fbfdff;
    border: 1px dashed#c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 136px;
    height: 190px;
    line-height: 190px;
    margin: 0 auto;

    > img {
      width: 100%;
    }
  }
}
</style>
