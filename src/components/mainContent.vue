<template>
  <router-view></router-view>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  name: "",
  data() {
    return {

    }
  },
  methods: {

  },
  watch: {
    '$route' (to, from) {
        // debugger;
        // this.init()
    }
  },
  destroyed () {
      this.$store.dispatch("LOGOUT");
  }
}
</script>
