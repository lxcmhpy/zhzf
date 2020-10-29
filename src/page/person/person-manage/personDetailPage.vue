<template>
  <div class="com_searchAndpageBoxPadding" >
    <div style="padding-bottom: 30px;">
      <div class="person_detail"  style="background-color:#eaedf4;">
        <div class="top_title shadow">
          <el-menu ref="tabMenu" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleClick" active-text-color='#4573D0'>
            <el-menu-item index="1">基本信息</el-menu-item>
            <el-menu-item index="2" :disabled="!pageParams.id">教育调动</el-menu-item>
            <el-menu-item index="3" :disabled="!pageParams.id">培训考试</el-menu-item>
            <el-menu-item index="4" :disabled="!pageParams.id">奖励惩罚</el-menu-item>
            <el-menu-item index="5" :disabled="!pageParams.id">证明材料</el-menu-item>
            <el-menu-item index="6" :disabled="!pageParams.id">证件信息</el-menu-item>
            <!--<el-menu-item index="7">布局</el-menu-item>-->
          </el-menu>
        </div>
        <div class="dentail_info_box shadow">
          <div v-if="key==1">
            <personDetailInfo
              v-if="!pageParams.type && reloadPage"
              :person="personInfo"
              :pageParams="pageParams"
              />
            <personDetailInfo
              v-else-if="reloadPage && personInfo.personId"
              :person="personInfo"
              :pageParams="pageParams"
              @editSuccess="initPage" />
          </div>
          <div v-if="key==2" >
            <education :params="pageParams" />
            <div style="background-color:#eaedf4; height:22px;width:100%;"></div>
            <adjustingPosts :params="pageParams" />
          </div>
          <div v-if="key==3">
            <train :params="pageParams" />
            <div style="background-color:#eaedf4; height:22px;width:100%;"></div>
            <exam :params="pageParams" />
          </div>
          <div v-if="key==4">
            <reward :params="pageParams" />
            <div style="background-color:#eaedf4; height:22px;width:100%;"></div>
            <punishment :params="pageParams" />
          </div>
          <div v-if="key==5">
            <material
              :params="pageParams"
              :materialInfo="picInfo"
              @uploadMaterial="uploadMaterial"
              @uploadPhototImg="uploadIdImg"/>
          </div>
          <div v-if="key==6">
            <approval :params="pageParams" />
            <div style="background-color:#eaedf4; height:22px;width:100%;"></div>
            <certificates :params="pageParams" />
            <div style="background-color:#eaedf4; height:22px;width:100%;"></div>
            <annualReview :params="pageParams" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import approval from '@/components/personComponents/approval'
import personDetailInfo from '@/components/personComponents/personDetailInfo'
import train from '@/components/personComponents/train'
import reward from '@/components/personComponents/reward'
import punishment from '@/components/personComponents/punishment'
import exam from '@/components/personComponents/exam'
import education from '@/components/personComponents/education'
import certificates from '@/components/personComponents/certificates'
import annualReview from '@/components/personComponents/annualReview'
import adjustingPosts from '@/components/personComponents/adjustingPosts'
import material from '@/components/personComponents/material'
import newCss from '@/page/person/person-manage/newCss.vue'
import { mapGetters } from "vuex";

export default {
  name: "personInfo",//人员详情总页面
  data() {
    return {
      activeIndex: '1',
      key: '1',
      personInfo: {},
      reloadPage: true,
      pageParams: { type: '', id: '' },
      picInfo: {
        idPic: {idcardFront: '' , idcardBack: ''},
        organPic: '',
        eduPic: '',
        otherPic: ''
      },
      showMenu: true,
      pageTabIndex: ''
    }
  },
  computed: {
    ...mapGetters(["activeIndexSto"])
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
    adjustingPosts,
    certificates,
    material,
    newCss
  },
  mounted() {
    this.pageParams.id = '';
    this.pageParams.type = '';
    if(this.$route.path !== '/personDetailPage'){
      localStorage.setItem('NewRouter', JSON.stringify({
        'path': this.$route.path,
        'meta': this.$route.meta,
        'name': this.$route.name
      }));
    }
    this.initPage();
    sessionStorage.removeItem('LeavePersonInfoPage');
    this.pageTabIndex = this.activeIndexSto;
  },
  watch: {
    '$route.path'(newVal,oldVal){
      this.$refs.tabMenu.updateActiveIndex('1');
      this.key = '1';
      this.activeIndex = '1';
      this.initPage();
      const SaveRoute = localStorage.getItem('NewRouter');
      if(!SaveRoute || SaveRoute.indexOf(this.$route.path) < 0){
        localStorage.setItem('NewRouter', JSON.stringify({
          'path': this.$route.path,
          'meta': this.$route.meta,
          'name': this.$route.name
        }));
      }
    }
  },
  methods: {
    // 初始化页面显示(区分编辑新增)默认新增
    initPage() {
      this.personInfo = {};
      this.reloadPage = true;
      if(localStorage.getItem('AddPerson') && this.$route.path === '/personDetailPage'){
        this.pageParams.id = localStorage.getItem('AddPerson');
        this.pageParams.type = 'edit';
      }else{
        const params = this.$route.path.split('/');
        this.pageParams.type = params[2];
        this.pageParams.id = params[3];
      }
      switch (this.pageParams.type) {
        case 'edit':
        case 'view':
          this.getPersonInfo();
        break
      }
    },
    // 获取人员详情
    getPersonInfo() {
      this.reloadPage = false;
      const loading = this.$loading({
        lock: true,
        text: '正在获取人员信息',
        spinner: 'car-loading',
        customClass: 'loading-box',
        background: 'rgba(234,237,244, 0.8)'
      });
      this.$store.dispatch("getPersonDetailInfo", this.pageParams.id).then(
        res => {
          this.reloadPage = true;
          loading.close();
          if(res.code === 200){
            this.personInfo = res.data;
            this.setPicSHow(res.data);
          }
        },
        err => {
          loading.close();
          this.reloadPage = true;
          this.$message({type: 'error', message: err.msg || ''});
        }
      );
    },
    handleClick(key, keyPath) {
      this.key = key;
    },
    // 设置证明回显
    setPicSHow(person){
      this.picInfo.idPic.idcardFront = '';
      this.picInfo.idPic.idcardBack = '';
      this.picInfo.organPic = '';
      this.picInfo.eduPic = '';
      this.picInfo.otherPic = '';
      this.picInfo.idPic.idcardFront = person.idcardFront || '';
      this.picInfo.idPic.idcardBack = person.idcardBack || '';
      this.picInfo.organPic = person.organPic || '';
      this.picInfo.eduPic = person.eduPic || '';
      this.picInfo.otherPic = person.otherPic || '';
    },
    // 上传证明材料成功后更新人员信息
    uploadMaterial(data){
      this.picInfo[data.type] = data.data;
    },
    // 上传身份证照片成功后更新人员信息
    uploadIdImg(data){
      this.picInfo.idPic.idcardFront = data.idcardFront;
      this.picInfo.idPic.idcardBack = data.idcardBack;
    }
  },
  destroyed() {
    if(localStorage.getItem('NewRouter')){
      localStorage.removeItem('NewRouter');
    }
    if(sessionStorage.getItem('LeavePersonInfoPage')){
      sessionStorage.removeItem('LeavePersonInfoPage')
    }
  },
  async beforeRouteLeave(to, from, next){
    let leavelPage = await this.$store.dispatch('leaveEditPersonInfo', '当前信息尚未保存，是否确认跳转？');
    if(leavelPage){
      next();
      console.log('1');
    }else{
      if(to.path.indexOf('login') > -1){
        next();
      }else{
        this.$store.commit("SET_ACTIVE_INDEX_STO", this.pageTabIndex);
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/personManageTitle.scss";
.dentail_info_box{
  overflow: hidden;
  position: relative;
}
</style>
