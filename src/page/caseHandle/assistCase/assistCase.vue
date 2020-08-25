<template>
  <!-- 案件协查列表 -->
  <div class="assist-case-tab">
    <el-tabs v-model="activeName" class="assist-tabs">
      <el-tab-pane label="发起的" name="sponsored">
          <SponsoredCase />
      </el-tab-pane>
      <el-tab-pane label="接收到的" name="received">接收到的</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import SponsoredCase from '@/page/caseHandle/assistCase/sponsoredCase';

export default {
  data() {
    return {
        activeName: 'sponsored'
    };
  },
  components: { SponsoredCase },
  computed: {},
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.assist-case-tab{
    height: 100%;
    .assist-tabs{
        height: 100%;
        >>>.el-tabs__nav{
            width: 100%;
            background: #fff;
            .el-tabs__active-bar{
                height: 4px;
            }
            .el-tabs__item{
                width: 50%;
                height: 58px;
                line-height: 58px;
                font-size: 20px;
                text-align: center;
            }
        }
    }

}
</style>
