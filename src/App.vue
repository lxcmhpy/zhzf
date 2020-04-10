<template>
  <div id="app">
    <v-loading v-show="loading"></v-loading>
    <router-view v-if="isRouterAlive"/>
    <div>
        <audio id="audio_remote" autoplay="autoplay"> </audio>
        <audio id="ringtone" loop :src="'./static/sounds/ringtone.wav'"> </audio>
        <audio id="ringbacktone" loop :src="'./static/sounds/ringbacktone.wav'"> </audio>
        <audio id="dtmfTone" :src="'./static/sounds/dtmf.wav'"> </audio>
    </div>
  </div>
</template>
<script>
import loading from "@/components/loading";
import { mapGetters } from "vuex";
export default {
  name: "App",
  data() {
    return {
      isRouterAlive: true
    };
  },
  components: {
    "v-loading": loading
  },
  computed: {
    ...mapGetters(["loading"])
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
    }
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
