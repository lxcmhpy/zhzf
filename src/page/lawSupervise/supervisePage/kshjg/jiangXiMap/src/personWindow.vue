<template>
  <div class="personWindow">
    <header class="personWindow-header">
      {{config.title}}
      <span class="personGoBack" @click="handlePersonGoBack">返回</span>
    </header>
    <div class="personWindow-info">
      <p>机构名称：{{config.info.organName}}</p>
      <p v-if="config.info.mobile">联系方式：{{config.info.mobile}}</p>
      <div class="btns">
        <div class="btnsBox" v-for="(item,index) of btnList" :key="index">
          <i :class="item.class" />
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
  data() {
    return {
      btnList: [
        { class: 'el-icon-phone blueC3' },
        { class: 'iconfont law-shipin greenC3' },
        { class: 'iconfont law-jiankong' },
        { class: 'iconfont law-msg-box' },
        { class: 'iconfont law-xianlu' }
      ]
    }
  },
  methods: {
    /**
     * 点击返回
     */
    handlePersonGoBack() {
      this.$emit('handlePersonGoBack')
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
  // height: 263px;
  background: #FFFFFF;
  &-header {
    background: #00adb5;
    height: 46px;
    font-size: 14px;
    font-weight: 400;
    color: #ffffff;
    font-family: Helvetica,Arial,sans-serif;
    box-sizing: border-box;
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .personGoBack {
      font-size: 13px;
      cursor: pointer;
    }
  }
  &-info {
    box-sizing: border-box;
    padding: 15px;
    color: #7b7b7b;
    font-size: 14px;
    p {
      line-height: 30px;
    }
    .btns {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-top: 10px;
      .btnsBox {
        width: 30px;
        height: 30px;
        cursor: pointer;
        background: #EEEEEE;
        border-radius: 50%;
        text-align: center;
        line-height: 30px;
        margin-right: 10px;
      }
    }
  }
}
</style>
