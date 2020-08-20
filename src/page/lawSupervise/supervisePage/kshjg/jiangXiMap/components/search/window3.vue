<template>
  <div class="search-window3">
    <header class="search-window3-header">
      <span class="headerText">{{title}}</span>
      <span class="goBack" @click="handleGoBack">返回</span>
    </header>
    <div class="search-window3-contant">
      <p class="contantInfo">地址：{{info.address}}</p>
      <p class="contantInfo">联系人：{{info.contactor}}</p>
      <p class="contantInfo">联系方式：{{info.telephone}}</p>
      <div class="peopleTitle">
        <img src="/static/images/img/lawSupervise/icon_duiwu.png" />
        <span>人员在线情况</span>
      </div>
      <div class="peopleOnline">
        <div class="circleName" v-for="(item,index) of list" :key="index">
          <div
            class="flexCircle"
            @click="handlePerson(item)"
          >{{item.nickName}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['page'],
  props: {
    window3: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    title() {
      return this.window3.title
    },
    info() {
      return this.window3.info
    },
    list() {
      return this.window3.list
    }
  },
  methods: {
    /**
     * 点击返回
     */
    handleGoBack() {
      this.page.showCom = "Window2"
    },

    /**
     * 点击人员在线头像
     */
    handlePerson(node) {
      this.$emit("handlePerson", node)
    },
  }
}
</script>

<style lang="scss">
.search-window3 {
  height: 350px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  background: #00adb5;
  box-sizing: border-box;
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #ffffff;
    height: 46px;
    .headerText {
      line-height: 46px;
      font-size: 14px;
      font-weight: 400;
      font-family: Helvetica,Arial,sans-serif;
      margin-left: 15px;
    }
    .goBack {
      line-height: 46px;
      font-size: 13px;
      cursor: pointer;
      margin-right: 15px;
    }
  }
  &-contant {
    height: 304px;
    background: #FFFFFF;
    border-radius: 0 0 4px 4px;
    box-sizing: border-box;
    padding: 15px;
    overflow: auto;
    .contantInfo {
      line-height: 30px;
      color: #7b7b7b;
      font-size: 14px;
    }
    .peopleTitle {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin: 10px 0 10px 0;
      span {
        color: #7b7b7b;
        font-size: 14px;
        margin-left: 5px;
      }
    }
    .peopleOnline {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .circleName {
        width: 60px;
        height: 60px;
        box-sizing: border-box;
        padding: 10px;
        text-align: center;
        line-height: 50px;
        .flexCircle {
          width: 40px;
          height: 40px;
          cursor: pointer;
          text-align: center;
          line-height: 40px;
          border-radius: 50%;
          background:#00adb5;
          color: #fff;
          font-weight: 400;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
