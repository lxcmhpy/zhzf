<template>
  <div class="search-window3">
    <header>
      <span>{{title}}</span>
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
        <div
          class="circleName"
          v-for="(item,index) of list"
          :key="index"
          @click="handlePerson(item)"
        >{{item.nickName}}</div>
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
  overflow: auto;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  background: #FFFFFF;
  box-sizing: border-box;
  header {
    border-radius: 4px 4px 0 0;
    width: 100%;
    height: 46px;
    background: #46aaff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    box-sizing: border-box;
    span {
      font-size: 14px;
      font-weight: 400;
      color: #ffffff;
      font-family: Helvetica,Arial,sans-serif;
    }
    .goBack {
      font-size: 13px;
      cursor: pointer;
    }
  }
  &-contant {
    width: 100%;
    box-sizing: border-box;
    padding: 15px;
    .contantInfo {
      line-height: 20px;
      color: #7b7b7b;
      font-size: 14px;
    }
    .peopleTitle {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      img {
        margin: 5px 0;
      }
      span {
        color: #7b7b7b;
        font-size: 14px;
      }
    }
    .peopleOnline {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .circleName {
        // margin-right: 10px;
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        border-radius: 50%;
        background:#00adb5;
        color: #fff;
        font-weight: 400;
        font-size: 12px;
        cursor: pointer;
      }
    }
  }
}
</style>
