<template>
  <div class="details-header">
    <div class="details-header-img">
      <img src="/static/images/img/notice/logo_pic.png" alt="图标" />
      <img src="/static/images/img/notice/banner_tit.png" alt />
    </div>
    <!-- 导航栏 -->
    <el-menu
      class="details-header-menu"
      :router="true"
      :default-active="activeIndex"
      background-color="transparent"
      text-color="#ffffff"
      active-text-color="#ffffff"
      mode="horizontal"
    >
      <el-menu-item v-for="item of menuList" :key="item.index" :index="item.index">
        <div>{{ item.name }}</div>
        <div class="elMenuLineBox">
          <span class="line"></span>
        </div>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "/index",
      menuList: [
        { name: "首页" },
        { name: "执法动态" },
        { name: "政策法规" },
        { name: "事前公示" },
        { name: "事后公示" },
        { name: "网上投诉" },
      ],
    };
  },
};
</script>

<style lang="scss">
.details-header {
  height: 90px;
  background: #236bd5;
  display: flex;
  justify-content: space-between;
  &-img {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    img {
      height: 55px;
      margin-left: 52px;
      margin-right: 15px;
    }
    img:nth-child(2) {
      margin: 0;
      width: 374px;
      height: 29px;
    }
  }
  .el-menu {
    border: none;
  }
  &-menu {
    display: flex;
    align-items: center;
    margin-right: 42px;
    .el-menu-item {
      // 更改 element 默认样式
      cursor: pointer;
      width: 120px;
      height: 48px;
      font-size: 20px;
      font-family: "PingFangSC, PingFangSC-Regular";
      font-weight: 400;
      border: none;
      line-height: 48px;
      text-align: center;
    }
    .el-menu-item.is-active {
      // 更改 element 默认样式
      background: transparent !important;
      border: none;
      .elMenuLineBox {
        display: flex;
        justify-content: center;
        .line {
          width: 48px;
          height: 3px;
          background: #ffffff;
          margin-top: 8px;
        }
      }
    }
    .el-menu-item:hover {
      // 更改 element 默认样式
      background: transparent !important;
      border: none;
    }
  }
}
</style>
