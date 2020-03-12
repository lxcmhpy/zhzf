<template>
  <div class="person_detail"  style="background-color:#eaedf4;height:1038px;">
    <div class="top_title shadow">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleClick" active-text-color='#4573D0'>
        <el-menu-item index="1">基本信息</el-menu-item>
        <el-menu-item index="2">教育调动</el-menu-item>
        <el-menu-item index="3">培训考试</el-menu-item>
        <el-menu-item index="4">奖励惩罚</el-menu-item>
        <el-menu-item index="5">证明材料</el-menu-item>
        <el-menu-item index="6">证件信息</el-menu-item>
        <!--<el-menu-item index="7">布局</el-menu-item>-->
      </el-menu>
    </div>
    <div class="dentail_info_box shadow">
      <personDetailInfo v-if="key==1" />
      <span v-if="key==2" >
          <education />
          <div style="background-color:#eaedf4; height:22px;width:100%;"></div>
          <adjustingPosts />
      </span>
      <span v-if="key==3">
        <train />
        <div style="background-color:#eaedf4; height:22px;width:100%;"></div>
        <exam />
      </span>
      <span v-if="key==4">
        <reward />
        <div style="background-color:#eaedf4; height:22px;width:100%;"></div>
        <punishment />
      </span>
      <span v-if="key==5">
        <material />
      </span>
      <span v-if="key==6">
        <approval />
        <div style="background-color:#eaedf4; height:22px;width:100%;"></div>
        <certificates />
        <div style="background-color:#eaedf4; height:22px;width:100%;"></div>
        <annualReview />
      </span>
      <!--<span v-if="key==7">
        <newCss />
      </span>-->

    </div>
  </div>
</template>

<script>
import approval from './approval'
import personDetailInfo from './personDetailInfo'
import train from './train'
import reward from './reward'
import punishment from './punishment'
import exam from './exam'
import education from './education'
import certificates from './certificates'
import annualReview from './annualReview'
import adjustingPosts from './adjustingPosts'
import approvalRecord from './approvalRecord'
import material from './material'
import newCss from '@/page/person/person-manage/newCss.vue'

export default {
  name: "personInfo",//人员详情总页面
  data() {
    return {
      activeName: 'one',
      activeIndex: '1',
      key: '1',
    }
  },
  components: {
    personDetailInfo,
    approval,
    education,
    train,
    exam,
    reward,
    punishment,
    annualReview,
    approvalRecord,
    adjustingPosts,
    certificates,
    material,
    newCss
  },
  methods: {

    handleClick(key, keyPath) {
      this.key = key
      console.log(key, keyPath);
    }
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/personManageTitle.scss";
// .el-tabs__nav is-top {
//   transform: translateX(400px);
// }
</style>
