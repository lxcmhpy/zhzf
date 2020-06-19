<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="applay-detail">
      <el-tabs v-model="tabLabel" style="min-height:800px;">
        <el-tab-pane label="试卷信息">
          <pageDetail :pageData="params"></pageDetail>
        </el-tab-pane>
        <el-tab-pane label="题目分布">
          <questionDetail v-if="tabLabel == 1"></questionDetail>
        </el-tab-pane>
        <el-tab-pane label="审核记录">
          <applayDetail v-if="tabLabel == 2"></applayDetail>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import applayDetail from "./../../common/applayDetail";
import pageDetail from "./../../common/pageDetail";
import questionDetail from "./../../common/questionDetail";
export default {
  data() {
    return {
      tableData: [],
      params: {
        pageData: {}
      },
      tabLabel: ""
    };
  },
  computed: {
    pageId() {
      return this.$route.query.pageId;
    }
  },
  components: {
    pageDetail,
    applayDetail,
    questionDetail
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.applay-detail {
  padding: 15px;
  >>> .el-tabs {
    background: #fff;
    .el-tabs__item {
      padding: 0 20px;
      &.is-active {
        background: #fff;
      }
    }
    .el-tabs__header {
      background: #eaedf4;
    }
    .el-tabs__active-bar {
      box-sizing: content-box;
      top: 0;
      padding: 0 20px;
      left: -20px;
    }
  }
}
</style>