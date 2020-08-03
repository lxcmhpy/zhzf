<template>
  <div class="personWindow">
    <header class="personWindow-header">
      {{config.title}}
    </header>
    <div class="personWindow-info">
      <p>机构名称：{{config.info.organName}}</p>
      <p v-if="config.info.mobile">联系方式：{{config.info.mobile}}</p>
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
  }
}
</script>

<style lang="scss" scoped>
.personWindow {
  position: absolute;
  width: 370px;
  top: 70px;
  left: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  height: 263px;
  background: #FFFFFF;
  &-header {
    background: #00adb5;
    height: 46px;
    line-height: 46px;
    font-size: 14px;
    font-weight: 400;
    color: #ffffff;
    font-family: Helvetica,Arial,sans-serif;
    box-sizing: border-box;
    padding-left: 15px;
  }
  &-info {
    box-sizing: border-box;
    padding: 15px;
    color: #7b7b7b;
    font-size: 14px;
    p {
      line-height: 30px;
    }
  }
}
</style>
