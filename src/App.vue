<template>
  <div id="app">
    <v-loading v-show="loading"></v-loading>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive && isRouterAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive && isRouterAlive"></router-view>
    <audio id="audio_remote"  ref="audio_remote" autoplay="autoplay"> </audio>
    <audio id="ringtone" loop ref="ringtone"  :src="'./static/sounds/ringtone.wav'"> </audio>
    <audio id="ringbacktone" ref="ringbacktone"  loop :src="'./static/sounds/ringbacktone.wav'"> </audio>
    <audio id="dtmfTone" ref="dtmfTone"  :src="'./static/sounds/dtmf.wav'"> </audio>
    <dialogPhoneVideo></dialogPhoneVideo>
  </div>
</template>
<script>
import loading from "@/components/loading";
import { mapGetters } from "vuex";
import dialogPhoneVideo from "@/components/phoneVideo/dialogPhoneVideo.vue";

export default {
  name: "App",
  data() {
    return {
      isRouterAlive: true
    };
  },
  components: {
    "v-loading": loading,
     dialogPhoneVideo
  },
  computed: {
    ...mapGetters(["loading",'systemTitle'])
  },
  provide() {
    return {
      reload: this.reload
    };
  },
  methods: {
    //刷新页面
    reload() {
      this.isRouterAlive = false;
      let _this = this
      this.$nextTick(() => {
        _this.isRouterAlive = true;
      });
    },

  }
};
</script>
<style>
@import "../static/iconfont/iconfont.css";
</style>
<style lang="scss">
@import "@/assets/css/basicStyles/variables.scss";
@import "@/assets/css/basicStyles/base.scss";
@import "@/assets/css/basicStyles/transition.scss";
@import "@/assets/css/reloadElementUI.scss";
@import "@/assets/css/components.scss";
</style>
