<template>
  <div class="fullscreen">
    <el-container id="fullscreenCon">
      <el-header id="mainHeader">
        <div class="main_logo"><img :src="'./static/images/img/main/logo.png'" alt="">
          <span>{{ systemTitle }}(人员考试子系统)</span>
        </div>
        <div v-if="showLogout" class="headerRight">
          <div>
            <a class="logout-btn" @click="loginOut"><i class="el-icon-switch-button"></i>退出</a>
          </div>
        </div>
      </el-header>
      <el-container class="exam-container">
        <router-view></router-view>
      </el-container>

    </el-container>

  </div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import { mapGetters } from "vuex";
import { getDictListDetailByNameApi } from "@/api/system";
export default {
  name: "mainLagout",
  data() {
    return {

    };
  },
  components: {},
  computed: {
    examinneName(){
      return sessionStorage.getItem('ExamName');
    },
    showLogout(){
      return this.$route.path !== '/startAnswer'
    },
    systemTitle(){
      return sessionStorage.getItem('DocumentTitle');
    }
  },
  inject: ["reload"],
  methods: {
    //退出
    loginOut() {
      this.$store.dispatch('signOutSystem', this.examinneName).then(res => {
        this.$router.push("/examLogin");
      }, err => {
        this.$router.push("/examLogin");
      })
    },
    //获取系统标题
    getSystemData() {
      if(this.systemTitle){
        window.document.title = this.systemTitle;
        return;
      }
      getDictListDetailByNameApi('系统标题').then(res => {
        sessionStorage.setItem('DocumentTitle', res.data[0].name);
        window.document.title = res.data[0].name
      }, err => {
        console.log(err);
      })
    }
  },
  watch: {},
  mounted() {},
  created(){
    this.getSystemData();
  }
};
</script>
<style lang="scss">
@import "@/assets/css/main.scss";
</style>
<style lang="scss" scoped>
.logout-btn{
  cursor: pointer;
  >i{
    margin-right: 6px;
  }
  &:hover{
    color: #4573D0;
  }
}
.exam-container{
  background:linear-gradient(180deg,rgba(245,245,250,1) 0%,rgba(246,246,251,1) 100%);
}
</style>


