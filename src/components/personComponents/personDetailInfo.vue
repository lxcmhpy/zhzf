<template>
  <div>
    <div class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition" v-show="!isShowAddPerson">
      <div class="el-table__body-wrapper is-scrolling-none">
        <table class="el-table__body">
            <tr class="el-table__row">
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>*&nbsp;姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</font></td>
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>{{personInfoDetailForm.personName}}</font></td>
              <td class="el-table_column_center" style="font-weight:bold;" rowspan="4"><font size=4>人员照片：</font></td>
              <td class="el-table_column" style="text-align:center" rowspan="4">
                <div class="block">
                  <el-avatar shape="square" :size="260" :src="imageUrl"></el-avatar>
                </div>
              </td>
              <td class="el-table_column_center" style="font-weight:bold;width:200px;" rowspan="15">
                  <el-button type="primary" round  @click="editPersonPage">修改</el-button>
              </td>
            </tr>
            <tr class="el-table__row">
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4 >*身份证号：</font></td>
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>{{personInfoDetailForm.idNo}}</font></td>
            </tr>
            <tr class="el-table__row">
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>*&nbsp;性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</font></td>
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>{{personInfoDetailForm.sexName}}</font></td>
            </tr>
            <tr>
            <td class="el-table_column_center" style="font-weight:bold;"><font size=4>出生日期：</font></td>
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>{{personInfoDetailForm.birthDate}}</font></td>
            </tr>
            <tr class="el-table__row">
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>*&nbsp;民&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;族：</font></td>
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>{{personInfoDetailForm.nationName}}</font></td>
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>分配渠道：</font></td>
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>{{personInfoDetailForm.disChannelName}}</font></td>
              <!--<td class="el-table_column_center" style="font-weight:bold;"><font size=4>*参加工作日期：</font></td>
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>{{personInfoDetailForm.workDate}}</font></td>-->
            </tr>
            <tr class="el-table__row">
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>*政治面貌：</font></td>
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>{{personInfoDetailForm.politicalStatusName}}</font></td>
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>入党日期：</font></td>
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>{{personInfoDetailForm.admissionDate}}</font></td>
            </tr>
            <tr>
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>*所属机构：</font></td>
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>{{personInfoDetailForm.oidName}}</font></td>
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>*人员编制：</font></td>
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>{{personInfoDetailForm.staffingName}}</font></td>
            </tr>
            <tr class="el-table__row">
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>*&nbsp;岗&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：</font></td>
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>{{personInfoDetailForm.branchIdName}}</font></td>
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>*&nbsp;职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;务：</font></td>
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>{{personInfoDetailForm.postName}}</font></td>
            </tr>
            <tr class="el-table__row">
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>*&nbsp;学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;历：</font></td>
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>{{personInfoDetailForm.degreeName}}</font></td>
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>毕业学校：</font></td>
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>{{personInfoDetailForm.school}}</font></td>
            </tr>
            <tr class="el-table__row">
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>毕业专业：</font></td>
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>{{personInfoDetailForm.majorName}}</font></td>
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>毕业证书编号：</font></td>
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>{{personInfoDetailForm.graduationNo}}</font></td>
            </tr>
            <!--<tr>
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>岗位状态：</font></td>
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>待确定</font></td>
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>分配渠道：</font></td>
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>{{personInfoDetailForm.disChannelName}}</font></td>
            </tr>-->
            <tr class="el-table__row">
            <td class="el-table_column_center" style="font-weight:bold;"><font size=4>执法领域(门类)：</font></td>
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>{{personInfoDetailForm.certNo}}</font></td>
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>执法区域：</font></td>
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>{{personInfoDetailForm.area}}</font></td>
            </tr>
            <tr class="el-table__row">
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>省内执法证号：</font></td>
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>{{personInfoDetailForm.provinceNo}}</font></td>
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>海事执法证号：</font></td>
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>{{personInfoDetailForm.maritimeNo}}</font></td>
            </tr>
            <tr class="el-table__row">
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>证件办理状态：</font></td>
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>{{personInfoDetailForm.certStatusName}}</font></td>
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>当前证件状态：</font></td>
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>{{personInfoDetailForm.personStatusName}}</font></td>
            </tr>
            <tr class="el-table__row">
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>部级执法证号：</font></td>
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>{{personInfoDetailForm.ministerialNo}}</font></td>
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</font></td>
              <td class="el-table_column_center" style="font-weight:bold;"><font size=4>{{personInfoDetailForm.note}}</font></td>
            </tr>
        </table>
      </div>
    </div>
    <!--  修改页面 -->
    <div v-show="isShowAddPerson" style="margin-left:-20px;">
        <div class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition">
          <div class="el-table__body-wrapper is-scrolling-none">
            <table class="el-table__body">
                <tr class="el-table__row">
                  <td class="el-table_column_center" style="font-weight:bold;text-align:right"><font size=4>*&nbsp;姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></td>
                  <!--<td class="el-table_column_center" style="font-weight:bold;"><font size=4>{{personInfoDetailForm.personName}}</font></td>-->
                  <td class="el-table_column_left" style="font-weight:bold;text-align:left" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input class="el-input__inner" v-model="personInfoDetailForm.personName"/></td>
                  <td class="el-table_column_center" style="font-weight:bold;text-align:right" rowspan="4"><font size=4>人员照片：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></td>
                  <td class="el-table_column" style="text-align:center" rowspan="4">
                    <div class="block">
                      <!--<el-avatar shape="square" :size="200" :src="url"></el-avatar>-->
                      <el-upload
                          class="avatar-uploader"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess"
                          :before-upload="beforeAvatarUpload">
                          <img v-if="imageUrl" :src="imageUrl" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </div>
                  </td>
                  <td class="el-table_column_center" style="font-weight:bold;width:200px;" rowspan="15">
                      <el-button type="primary" round  @click="savePersonPage">保存</el-button>
                  </td>
                </tr>
                <tr class="el-table__row">
                  <td class="el-table_column_center" style="font-weight:bold;text-align:right"><font size=4 >*身份证号：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></td>
                  <td class="el-table_column_center" style="font-weight:bold;text-align:left"><font size=4>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input class="el-input__inner" v-model="personInfoDetailForm.idNo"/></font>
                    </td>
                </tr>
                <tr class="el-table__row">
                  <td class="el-table_column_center" style="font-weight:bold;text-align:right"><font size=4>*&nbsp;性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></td>
                  <td class="el-table_column_center" style="font-weight:bold;text-align:left"><font size=4>
                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input class="el-input__inner" v-model="personInfoDetailForm.sexName"/>
                    </font></td>
                </tr>
                <tr>
                <td class="el-table_column_center" style="font-weight:bold;text-align:right"><font size=4>出生日期：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></td>
                  <td class="el-table_column_center" style="font-weight:bold;text-align:left"><font size=4>
                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input class="el-input__inner" v-model="personInfoDetailForm.birthDate"/>
                    </font></td>
                </tr>
                <tr class="el-table__row">
                  <td class="el-table_column_center" style="font-weight:bold;text-align:right"><font size=4>*&nbsp;民&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;族：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></td>
                  <td class="el-table_column_center" style="font-weight:bold;text-align:left"><font size=4>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input class="el-input__inner" v-model="personInfoDetailForm.nationName"/></font></td>
                  <td class="el-table_column_center" style="font-weight:bold;text-align:right"><font size=4>分配渠道：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></td>
                  <td class="el-table_column_center" style="font-weight:bold;text-align:left"><font size=4>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input class="el-input__inner" v-model="personInfoDetailForm.disChannelName"/>
                    </font>
                  </td>
                  <!--<td class="el-table_column_center" style="font-weight:bold;text-align:right"><font size=4>*参加工作日期：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></td>
                  <td class="el-table_column_center" style="font-weight:bold;text-align:left"><font size=4>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input class="el-input__inner" v-model="personInfoDetailForm.workDate"/>
                    </font></td>-->
                </tr>
                <tr class="el-table__row">
                  <td class="el-table_column_center" style="font-weight:bold;text-align:right"><font size=4>*政治面貌：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></td>
                  <td class="el-table_column_center" style="font-weight:bold;text-align:left"><font size=4>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input class="el-input__inner" v-model="personInfoDetailForm.politicalStatusName"/>
                    </font></td>
                  <td class="el-table_column_center" style="font-weight:bold;text-align:right"><font size=4>入党日期：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></td>
                  <td class="el-table_column_center" style="font-weight:bold;text-align:left"><font size=4>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<!--<input class="el-input__inner" v-model="personInfoDetailForm.admissionDate"/>-->
                    <el-date-picker v-model="personInfoDetailForm.admissionDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                        style="width: 320px;" placeholder="请选择入党日期" :disabled='isDisabled' clearable >
                    </el-date-picker>
                    </font></td>
                </tr>
                <tr>
                  <td class="el-table_column_center" style="font-weight:bold;text-align:right"><font size=4>*所属机构：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></td>
                  <td class="el-table_column_center" style="font-weight:bold;text-align:left"><font size=4>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input class="el-input__inner" v-model="personInfoDetailForm.oidName"/>
                    </font></td>
                  <td class="el-table_column_center" style="font-weight:bold;text-align:right"><font size=4>*人员编制：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></td>
                  <td class="el-table_column_center" style="font-weight:bold;text-align:left"><font size=4>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input class="el-input__inner" v-model="personInfoDetailForm.staffingName"/>
                    </font></td>
                </tr>
                <tr class="el-table__row">
                  <td class="el-table_column_center" style="font-weight:bold;text-align:right"><font size=4>*&nbsp;岗&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></td>
                  <td class="el-table_column_center" style="font-weight:bold;text-align:left"><font size=4>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input class="el-input__inner" v-model="personInfoDetailForm.branchIdName"/>
                    </font></td>
                  <td class="el-table_column_center" style="font-weight:bold;text-align:right"><font size=4>*&nbsp;职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;务：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></td>
                  <td class="el-table_column_center" style="font-weight:bold;text-align:left"><font size=4>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input class="el-input__inner" v-model="personInfoDetailForm.postName"/>
                    </font></td>
                </tr>
                <tr class="el-table__row">
                  <td class="el-table_column_center" style="font-weight:bold;text-align:right"><font size=4>*&nbsp;学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;历：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></td>
                  <td class="el-table_column_center" style="font-weight:bold;text-align:left"><font size=4>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input class="el-input__inner" v-model="personInfoDetailForm.degreeName"/>
                    </font></td>
                  <td class="el-table_column_center" style="font-weight:bold;text-align:right"><font size=4>毕业学校：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></td>
                  <td class="el-table_column_center" style="font-weight:bold;text-align:left"><font size=4>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input class="el-input__inner" v-model="personInfoDetailForm.school"/>
                   </font></td>
                </tr>
                <tr class="el-table__row">
                  <td class="el-table_column_center" style="font-weight:bold;text-align:right"><font size=4>毕业专业：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></td>
                  <td class="el-table_column_center" style="font-weight:bold;text-align:left"><font size=4>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input class="el-input__inner" v-model="personInfoDetailForm.majorName"/>
                    </font></td>
                  <td class="el-table_column_center" style="font-weight:bold;text-align:right"><font size=4>毕业证书编号：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></td>
                  <td class="el-table_column_center" style="font-weight:bold;text-align:left"><font size=4>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input class="el-input__inner" v-model="personInfoDetailForm.graduationNo"/>
                   </font></td>
                </tr>
                <!--<tr>
                  <td class="el-table_column_center" style="font-weight:bold;text-align:right"><font size=4>岗位状态：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></td>
                  <td class="el-table_column_center" style="font-weight:bold;text-align:left"><font size=4>待确定</font></td>
                  <td class="el-table_column_center" style="font-weight:bold;text-align:right"><font size=4>分配渠道：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></td>
                  <td class="el-table_column_center" style="font-weight:bold;text-align:left"><font size=4>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input class="el-input__inner" v-model="personInfoDetailForm.disChannelName"/>
                    </font></td>
                </tr>-->
                <tr class="el-table__row">
                <td class="el-table_column_center" style="font-weight:bold;text-align:right"><font size=4>执法领域(门类)：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></td>
                  <td class="el-table_column_center" style="font-weight:bold;text-align:left"><font size=4>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input class="el-input__inner" v-model="personInfoDetailForm.certNo"/>
                    </font></td>
                  <td class="el-table_column_center" style="font-weight:bold;text-align:right"><font size=4>执法区域：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></td>
                  <td class="el-table_column_center" style="font-weight:bold;text-align:left"><font size=4>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input class="el-input__inner" v-model="personInfoDetailForm.area"/>
                    </font></td>
                </tr>
                <tr class="el-table__row">
                  <td class="el-table_column_center" style="font-weight:bold;text-align:right"><font size=4>省内执法证号：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></td>
                  <td class="el-table_column_center" style="font-weight:bold;text-align:left"><font size=4>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input class="el-input__inner" v-model="personInfoDetailForm.provinceNo"/>
                   </font></td>
                  <td class="el-table_column_center" style="font-weight:bold;text-align:right"><font size=4>海事执法证号：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></td>
                  <td class="el-table_column_center" style="font-weight:bold;text-align:left"><font size=4>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input class="el-input__inner" v-model="personInfoDetailForm.maritimeNo"/>
                    </font></td>
                </tr>
                <tr class="el-table__row">
                  <td class="el-table_column_center" style="font-weight:bold;text-align:right"><font size=4>证件办理状态：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></td>
                  <td class="el-table_column_center" style="font-weight:bold;text-align:left"><font size=4>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input class="el-input__inner" v-model="personInfoDetailForm.certStatusName"/>
                    </font></td>
                  <td class="el-table_column_center" style="font-weight:bold;text-align:right"><font size=4>当前证件状态：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></td>
                  <td class="el-table_column_center" style="font-weight:bold;text-align:left"><font size=4>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input class="el-input__inner" v-model="personInfoDetailForm.personStatusName"/>
                    </font></td>
                </tr>
                <tr class="el-table__row">
                  <td class="el-table_column_center" style="font-weight:bold;text-align:right"><font size=4>部级执法证号：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></td>
                  <td class="el-table_column_center" style="font-weight:bold;text-align:left"><font size=4>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input class="el-input__inner" v-model="personInfoDetailForm.ministerialNo"/>
                   </font></td>
                  <td class="el-table_column_center" style="font-weight:bold;text-align:right"><font size=4>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></td>
                  <td class="el-table_column_center" style="font-weight:bold;text-align:left"><font size=4> 
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input class="el-input__inner" v-model="personInfoDetailForm.note"/>
                    </font></td>
                </tr>
            </table>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
    export default {
        name: "personDetailInfo",//人员基本信息组件
        data(){
          return {
            imageUrl:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
            isDisabled:true,
            isShowAddPerson:this.$route.params.pageStatus=='0'?false:true,
            personInfoDetailForm:{
              personId:this.$route.params.pageStatus=='0'?this.$route.params.personInfo.personId:'',
              orgName:this.$route.params.pageStatus=='0'?this.$route.params.personInfo.orgName:'',
              school:this.$route.params.pageStatus=='0'?this.$route.params.personInfo.school:'',
              branchName:this.$route.params.pageStatus=='0'?this.$route.params.personInfo.branchName:'',
              branchIdName:this.$route.params.pageStatus=='0'?this.$route.params.personInfo.branchIdName:'',
              personName:this.$route.params.pageStatus=='0'?this.$route.params.personInfo.personName:'',
              sex:this.$route.params.pageStatus=='0'?this.$route.params.personInfo.sex:'',
              sexName:this.$route.params.pageStatus=='0'?this.$route.params.personInfo.sexName:'',
              nation:this.$route.params.pageStatus=='0'?this.$route.params.personInfo.nation:'',
              degree:this.$route.params.pageStatus=='0'?this.$route.params.personInfo.degree:'',
              idNo:this.$route.params.pageStatus=='0'?this.$route.params.personInfo.idNo:'',
              birthDate:this.$route.params.pageStatus=='0'?this.$route.params.personInfo.birthDate:'',
              workDate:this.$route.params.pageStatus=='0'?this.$route.params.personInfo.workDate:'',
              enfoceDate:this.$route.params.pageStatus=='0'?this.$route.params.personInfo.enfoceDate:'',
              major:this.$route.params.pageStatus=='0'?this.$route.params.personInfo.major:'',
              graduationNo:this.$route.params.pageStatus=='0'?this.$route.params.personInfo.graduationNo:'',
              disChannel:this.$route.params.pageStatus=='0'?this.$route.params.personInfo.disChannel:'',
              post:this.$route.params.pageStatus=='0'?this.$route.params.personInfo.post:'',
              area:this.$route.params.pageStatus=='0'?this.$route.params.personInfo.area:'',
              provinceNo:this.$route.params.pageStatus=='0'?this.$route.params.personInfo.provinceNo:'',
              ministerialNo:this.$route.params.pageStatus=='0'?this.$route.params.personInfo.ministerialNo:'',
              maritimeNo:this.$route.params.pageStatus=='0'?this.$route.params.personInfo.maritimeNo:'',
              staffing:this.$route.params.pageStatus=='0'?this.$route.params.personInfo.staffing:'',
              certNo:this.$route.params.pageStatus=='0'?this.$route.params.personInfo.certNo:'',
              qualificationNo:this.$route.params.pageStatus=='0'?this.$route.params.personInfo.qualificationNo:'',
              politicalStatus:this.$route.params.pageStatus=='0'?this.$route.params.personInfo.politicalStatus:'',
              admissionDate:this.$route.params.pageStatus=='0'?this.$route.params.personInfo.admissionDate:'',
              certStatus:this.$route.params.pageStatus=='0'?this.$route.params.personInfo.certStatus:'',
              personStatus:this.$route.params.pageStatus=='0'?this.$route.params.personInfo.personStatus:'',
              note:this.$route.params.pageStatus=='0'?this.$route.params.personInfo.note:'',
              attached:this.$route.params.pageStatus=='0'?this.$route.params.personInfo.attached:'',
              nationName:this.$route.params.pageStatus=='0'?this.$route.params.personInfo.nationName:'',
              degreeName:this.$route.params.pageStatus=='0'?this.$route.params.personInfo.degreeName:'',
              oidName:this.$route.params.pageStatus=='0'?this.$route.params.personInfo.oidName:'',
              branchIdName:this.$route.params.pageStatus=='0'?this.$route.params.personInfo.branchIdName:'',
              politicalStatusName:this.$route.params.pageStatus=='0'?this.$route.params.personInfo.politicalStatusName:'',
              staffingName:this.$route.params.pageStatus=='0'?this.$route.params.personInfo.staffingName:'',
              postName:this.$route.params.pageStatus=='0'?this.$route.params.personInfo.postName:'',
              certStatusName:this.$route.params.pageStatus=='0'?this.$route.params.personInfo.certStatusName:'',
              disChannelName:this.$route.params.pageStatus=='0'?this.$route.params.personInfo.disChannelName:'',
              personStatusName:this.$route.params.pageStatus=='0'?this.$route.params.personInfo.personStatusName:'',
              majorName:this.$route.params.pageStatus=='0'?this.$route.params.personInfo.majorName:'',
            },
          }
        },
        methods:{
          editPersonPage(){
            this.isShowAddPerson=true;
          },
          savePersonPage(){
              //修改
              this.$store.dispatch("updatePersonInfo", this.personInfoDetailForm).then(res => {
                  this.$emit("getAllPersons");
                      this.$message({
                          type: "success",
                          message:  "修改成功!",
                      });
                      //this.$refs["addPersonForm"].resetFields();
                      //this.visible = false;
                      this.isShowAddPerson=false;
                  });
                  err => {
                      console.log(err);
              };
          },
          handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
          },
          beforeAvatarUpload(file) {
              const isJPG = file.type === 'image/jpeg';
              const isLt2M = file.size / 1024 / 1024 < 2;

              if (!isJPG) {
              this.$message.error('上传头像图片只能是 JPG 格式!');
              }
              if (!isLt2M) {
              this.$message.error('上传头像图片大小不能超过 2MB!');
              }
              return isJPG && isLt2M;
          },
        }
    }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/personManage.scss";
   .el-table td {
    width:320px;
    height: 60px;
    border:0px solid #e4e7ed;
  }
  .fullscreen .el-input .el-input__inner {
    height: 45px;
  }
  .el-input__inner:hover {
      border-color: 
      #C0C4CC;
  }
  .el-input__inner {
    -webkit-appearance: none;
    background-color: #FFF;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    border-top-color: rgb(220, 223, 230);
    border-right-color: rgb(220, 223, 230);
    border-bottom-color: rgb(220, 223, 230);
    border-left-color: rgb(220, 223, 230);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color:
        #606266;
        display: inline-block;
        font-size: inherit;
        height: 40px;
        line-height: 40px;
        outline: 0;
        padding: 0 15px;
        -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        width: 100%;
    }
    input {
        border-radius: 0px !important;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 260px;
      height: 220px;
      line-height: 220px;
      text-align: center;
    }
    .avatar {
      width: 260px;
      height: 220px;
      display: block;
    }
</style>
