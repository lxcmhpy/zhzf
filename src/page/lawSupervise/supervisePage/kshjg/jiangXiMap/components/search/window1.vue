<template>
  <div class="search-window1">
    <header class="search-window1-titles">
      <h4>{{title}}</h4>
    </header>
    <article class="search-window1-flexBoxs">
      <div class="flexBox" v-for="(item,index) of list" :key="index">
        <img @click="handleSearch(item)" :src="item.imgUrl" />
        <div>{{item.name}}</div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  inject: ['page'],
  props: {
    window1: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    title() {
      return this.window1.title
    },
    list() {
      return this.window1.list
    }
  },
  methods: {
    /**
     * 点击专题图片，隐藏当前窗口，并下钻到树窗口
     */
    handleSearch(data) {
      this.page.showCom = "Window2"
    },
  }
}
</script>

<style lang="scss">
.search-window1 {
  height: 300px;
  overflow: auto;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  padding: 15px;
  box-sizing: border-box;
  border-radius: 4px;
  &-titles {
    font-size: 14px;
    margin-bottom: 10px;
    h4 {
      font-weight: bold;
    }
  }
  &-titles h4:before {
    content: " ";
    display: inline-block;
    float: left;
    background: #46aaff;
    height: 14px;
    width: 4px;
    border-radius: 4px;
    margin-right: 6px;
  }
  &-flexBoxs {
    overflow: auto;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .flexBox {
      width: 33%;
      height: 69px;
      text-align: center;
      margin-bottom: 15px;
      img {
        width: 41px;
        margin-bottom: 5px;
        cursor: pointer;
      }
      div {
        text-align: center;
        font-size: 13px;
      }
    }
  }
}
</style>
