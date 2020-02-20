<template>
  <div class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition" >
    <div class="el-table__body-wrapper is-scrolling-none">
      <table class="el-table__body">
          <tr class="el-table__row">
            <td class="el-table_column_right_1"><p>所属机构：&nbsp;</p></td>
            <td class="el-table_column_left">&nbsp;&nbsp;&nbsp;{{personInfoDetailForm.oid}}</td>
            <td class="el-table_column_right"><p>执法门类：&nbsp;</p></td>
            <td class="el-table_column_left_1">&nbsp;&nbsp;&nbsp;{{personInfoDetailForm.branchId}}</td>
          </tr>
          <tr class="el-table__row">
            <td class="el-table_column_right_1"><p>姓名：&nbsp;</p></td>
            <td class="el-table_column_left">&nbsp;&nbsp;&nbsp;{{personInfoDetailForm.personName}}</td>
            <td class="el-table_column_right"><p>性别：&nbsp;</p></td>
            <td class="el-table_column_left_1">&nbsp;&nbsp;&nbsp;{{personInfoDetailForm.sex}}</td>
          </tr>
          <tr class="el-table__row">
            <td class="el-table_column_right_1"><p>民族：&nbsp;</p></td>
            <td class="el-table_column_left">&nbsp;&nbsp;&nbsp;{{personInfoDetailForm.nation}}</td>
            <td class="el-table_column_right"><p>学历：&nbsp;</p></td>
            <td class="el-table_column_left_1">&nbsp;&nbsp;&nbsp;{{personInfoDetailForm.degree}}</td>
          </tr>
          <tr class="el-table__row">
            <td class="el-table_column_right_1"><p>身份证号：&nbsp;</p></td>
            <td class="el-table_column_left">&nbsp;&nbsp;&nbsp;{{personInfoDetailForm.idNo}}</td>
            <td class="el-table_column_right"><p>出生日期：&nbsp;</p></td>
            <td class="el-table_column_left_1">&nbsp;&nbsp;&nbsp;{{personInfoDetailForm.birthDate}}</td>
          </tr>
          <tr class="el-table__row">
            <td class="el-table_column_right_1"><p>参加工作日期：&nbsp;</p></td>
            <td class="el-table_column_left">&nbsp;&nbsp;&nbsp;{{personInfoDetailForm.workDate}}</td>
            <td class="el-table_column_right"><p>从事执法日期：&nbsp;</p></td>
            <td class="el-table_column_left_1">&nbsp;&nbsp;&nbsp;{{personInfoDetailForm.enfoceDate}}</td>
          </tr>
          <tr class="el-table__row">
            <td class="el-table_column_right_1"><p>毕业学校：&nbsp;</p></td>
            <td class="el-table_column_left">&nbsp;&nbsp;&nbsp;{{personInfoDetailForm.school}}</td>
            <td class="el-table_column_right"><p>毕业专业：&nbsp;</p></td>
            <td class="el-table_column_left_1">&nbsp;&nbsp;&nbsp;{{personInfoDetailForm.major}}</td>
          </tr>
          <tr class="el-table__row">
            <td class="el-table_column_right_1"><p>毕业证书编号：&nbsp;</p></td>
            <td class="el-table_column_left">&nbsp;&nbsp;&nbsp;{{personInfoDetailForm.graduationNo}}</td>
            <td class="el-table_column_right"><p>分配渠道：&nbsp;</p></td>
            <td class="el-table_column_left_1">&nbsp;&nbsp;&nbsp;{{personInfoDetailForm.disChannel}}</td>
          </tr>
          <tr class="el-table__row">
            <td class="el-table_column_right_1"><p>职务名称：&nbsp;</p></td>
            <td class="el-table_column_left">&nbsp;&nbsp;&nbsp;{{personInfoDetailForm.post}}</td>
            <td class="el-table_column_right"><p>执法区域：&nbsp;</p></td>
            <td class="el-table_column_left_1">&nbsp;&nbsp;&nbsp;{{personInfoDetailForm.area}}</td>
          </tr>
          <tr class="el-table__row">
            <td class="el-table_column_right_1"><p>省内执法证号：&nbsp;</p></td>
            <td class="el-table_column_left">&nbsp;&nbsp;&nbsp;{{personInfoDetailForm.provinceNo}}</td>
            <td class="el-table_column_right"><p>原持部级执法证号：&nbsp;</p></td>
            <td class="el-table_column_left_1">&nbsp;&nbsp;&nbsp;{{personInfoDetailForm.ministerialNo}}</td>
          </tr>
          <tr class="el-table__row">
            <td class="el-table_column_right_1"><p>海事执法证号：&nbsp;</p></td>
            <td class="el-table_column_left">&nbsp;&nbsp;&nbsp;{{personInfoDetailForm.maritimeNo}}</td>
            <td class="el-table_column_right"><p>人员编制：&nbsp;</p></td>
            <td class="el-table_column_left_1">&nbsp;&nbsp;&nbsp;{{personInfoDetailForm.staffing}}</td>
          </tr>
        <tr class="el-table__row">
          <td class="el-table_column_right_1"><p>执法证号：&nbsp;</p></td>
          <td class="el-table_column_left">&nbsp;&nbsp;&nbsp;{{personInfoDetailForm.certNo}}</td>
          <td class="el-table_column_right"><p>资格证书编号：&nbsp;</p></td>
          <td class="el-table_column_left_1">&nbsp;&nbsp;&nbsp;{{personInfoDetailForm.qualificationNo}}</td>
        </tr>
        <tr class="el-table__row">
          <td class="el-table_column_right_1"><p>政治面貌：&nbsp;</p></td>
          <td class="el-table_column_left">&nbsp;&nbsp;&nbsp;{{personInfoDetailForm.politicalStatus}}</td>
          <td class="el-table_column_right"><p>入党日期：&nbsp;</p></td>
          <td class="el-table_column_left_1">&nbsp;&nbsp;&nbsp;{{personInfoDetailForm.admissionDate}}</td>
        </tr>
        <tr class="el-table__row">
          <td class="el-table_column_right_1"><p>证件状态：&nbsp;</p></td>
          <td class="el-table_column_left">&nbsp;&nbsp;&nbsp;{{personInfoDetailForm.certStatus}}</td>
          <td class="el-table_column_right"><p>人员状态：&nbsp;</p></td>
          <td class="el-table_column_left_1">&nbsp;&nbsp;&nbsp;{{personInfoDetailForm.personStatus}}</td>
        </tr>
        <tr class="el-table__row">
          <td class="el-table_column_right_1"><p>照片：&nbsp;</p></td>
          <td class="el-table_column" style="text-align:left">
            <div class="block">
              <el-avatar shape="square" :size="150" :src="url"></el-avatar>
            </div>
          </td>
          <td class="el-table_column" style="text-align:right"><p>备注：&nbsp;</p></td>
          <td class="el-table_column" style="text-align:left;width:260px;">&nbsp;&nbsp;&nbsp;{{personInfoDetailForm.note}}</td>
        </tr>
        <tr class="el-table__row">
          <td class="el-table_column_right_1" style="text-align:right;width:260px;"><p>附件：&nbsp;</p></td>
          <td class="el-table_column" style="text-align:left;" colspan="3">&nbsp;&nbsp;&nbsp;{{personInfoDetailForm.attached}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex';
    export default {
        name: "personDetailInfo",//人员基本信息组件
        data(){
          return {
            url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',//图片路径
            personInfoDetailForm:{
              personId:this.$route.params.personInfo.personId,     
              orgName:this.$route.params.personInfo.orgName,      
              branchName:this.$route.params.personInfo.branchName,      
              personName:this.$route.params.personInfo.personName,      
              sex:this.$route.params.personInfo.sex,
              nation:this.$route.params.personInfo.nation,       
              degree:this.$route.params.personInfo.degree,       
              idNo:this.$route.params.personInfo.idNo,            
              birthDate:this.$route.params.personInfo.birthDate,       
              workDate:this.$route.params.personInfo.workDate,
              enfoceDate:this.$route.params.personInfo.enfoceDate,   
              major:this.$route.params.personInfo.major,        
              graduationNo:this.$route.params.personInfo.graduationNo,    
              disChannel:this.$route.params.personInfo.disChannel,      
              post:this.$route.params.personInfo.post,
              area:this.$route.params.personInfo.area,         
              provinceNo:this.$route.params.personInfo.provinceNo,   
              ministerialNo:this.$route.params.personInfo.ministerialNo,   
              maritimeNo:this.$route.params.personInfo.maritimeNo,      
              staffing:this.$route.params.personInfo.staffing,
              certNo:this.$route.params.personInfo.certNo,       
              qualificationNo:this.$route.params.personInfo.qualificationNo,                  
              politicalStatus:this.$route.params.personInfo.politicalStatus,   
              admissionDate:this.$route.params.personInfo.admissionDate,              
              certStatus:this.$route.params.personInfo.certStatus,   
              personStatus:this.$route.params.personInfo.personStatus,  
              note:this.$route.params.personInfo.note,           
              attached:this.$route.params.personInfo.attached,
            },
          }
        },
    }
</script>

<style scoped>
  @import "./../../css/personManage.less";
</style>
