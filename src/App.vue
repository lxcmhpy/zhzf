<template>
  <div id="app">
    <v-loading v-show="loading"></v-loading>
    <router-view v-if="isRouterAlive"/>
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
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>

<style lang="less">
@import "./assets/iconfont/iconfont.css";
@import "./css/variables.less";
@import "./css/base.less";
@import "./css/transition.less";
@import "./css/reloadElementUI.less";
@import "./css/components.less";
</style>
