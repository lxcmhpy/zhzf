<template>
  <!-- 返回菜单 -->
  <div  :class="lineUnder? 'hederLink2 hederLink2Hasline':'hederLink2'">
    <span>
      <span @click="back">
        <i class="iconfont amd-arrows_left"></i>
      </span>
      {{backTitle}}
    </span>
  </div>
</template>
<script>
export default {
  name: "backSubmenu",
  data() {
    return {};
  },
  props: {
    backTitle: String,
    lineUnder: Boolean
  },
  computed: {
    curreyRouterName() {
      return this.$route.name;
    }
  },
  methods: {
    back() {
      this.$router.back(-1);
    }
  }
};
</script>

