<template>
  <div class="jiangXiMap-noEnforce">
    <div
      class="jiangXiMap-noEnforce-infoList"
      v-for="(item, index) of list"
      :key="index"
      @click="handleEcforce(item)">
      <div class="itemInfo">
        <div>正常</div>
        <div>状态</div>
      </div>
      <div class="itemInfo">
        <div>{{ item.siteName }}</div>
        <div>
          告警（次）：<span>{{item.cxchl}}</span> &nbsp;&nbsp;
          过检（次）：<span>{{item.gjzl}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    list() {
      return this.config.option
    }
  },
  methods: {
    /**
     * 点击列表，地图打点
     */
    handleEcforce(data) {
      this.$emit('handleEcforce', data)
    }
  }
}
</script>

<style lang="scss">
.jiangXiMap-noEnforce {
  &-infoList:hover {
    background: #EBEEF5;
  }
  &-infoList {
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    .itemInfo {
      flex: 1;
      div {
        font-family: "PingFang SC";
        font-weight: 500;
        font-size: 14px;
      }

    }
    .itemInfo:nth-child(1) {
      text-align: center;
      div:nth-child(1) {
        font-weight: bold;
        font-size: 18px;
        color: #18c061;
      }
    }
    .itemInfo:nth-child(2) {
      flex: 2;
    }
  }
}
</style>
