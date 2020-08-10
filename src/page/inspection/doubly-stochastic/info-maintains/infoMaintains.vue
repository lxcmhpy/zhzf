<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox inspection-info" id="roleBox" style="height:calc(100% - 22px)">
      <!-- <div style="height:40px;line-height:40px">信息类型：</div> -->
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="height:100%">
        <el-tab-pane label="检查人员库" name="first">
          <div class="height100">
            <inspectors v-if="activeName=='first'"></inspectors>
          </div>
        </el-tab-pane>
        <el-tab-pane label="检查对象库" name="second">
          <inspectionObject  v-if="activeName=='second'"></inspectionObject>
        </el-tab-pane>
        <el-tab-pane label="检查专家库" name="third">
          <expert v-if="activeName=='third'"></expert>
        </el-tab-pane>
        <el-tab-pane label="事项清单库" name="fourth">
          <itemList v-if="activeName=='fourth'"></itemList>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import inspectors from './inspectors.vue'
import inspectionObject from './inspectionObject.vue'
import itemList from './itemList.vue'
import expert from './expert.vue'
export default {
  components: {
    inspectors,
    inspectionObject,
    expert,
    itemList
  },
  data() {
    return {
      activeName: 'first'
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style lang="scss" src="@/assets/css/card.scss"></style>