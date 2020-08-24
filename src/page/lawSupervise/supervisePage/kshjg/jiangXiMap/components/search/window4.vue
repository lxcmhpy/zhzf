<template>
  <div class="search-window4">
    <header class="search-window4-header">
      {{window4.title}}
      <span class="personGoBack" @click="handlePersonGoBack">返回</span>
    </header>
    <div class="search-window4-info">
      <p>机构名称：{{window4.info.organName}}</p>
      <p v-if="window4.info.mobile">联系方式：{{window4.info.mobile}}</p>
      <div class="btns">
        <div class="btnsBox" v-for="(item,index) of btnList" :key="index" @click="handleClickBtns(index)">
          <i :class="item.class" :style="(index===0 || index===1)?{color:window4.info.padStateColor} : index===2 ? {color:window4.info.peStateColor} : null" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['page'],
  props: {
    window4: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      btnList: [
        { class: 'el-icon-phone' },
        { class: 'iconfont law-shipin' },
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
      this.page.showCom = "Window2"
    },

    /**
     * 点击底部小图标
     */
    handleClickBtns(index) {
      this.$emit('handleClickBtns', index, this.window4.info)
    }
  },
}
</script>

<style lang="scss">
.search-window4 {
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
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
    border-radius: 4px 4px 0 0;
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
