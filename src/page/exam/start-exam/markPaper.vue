<template>
  <div class="entry-exam">
    <div class="page-contain">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {};
  },
  computed: {},
  components: {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.entry-exam {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("../../../../static/images/img/exam/page_top.png") no-repeat;
  background-size: 32%;
  overflow: scroll;
}
.page-contain {
  width: 80%;
  height: calc(100% - 64px);
  margin: 32px auto;
  min-width: 1064px;
  position: relative;
  display: flex;
  align-items: center;
}
</style>
