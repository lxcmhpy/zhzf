<template>
  <div class="details">
    <!-- 顶部路由 -->
    <Header />
    <!-- 内容部分 -->
    <div class="details-contant">
      <!-- <el-breadcrumb class="elBreadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="oldRouter.name" :to="{ path: oldRouter.path }">{{oldRouter.name}}</el-breadcrumb-item>
        <el-breadcrumb-item>正文</el-breadcrumb-item>
      </el-breadcrumb>-->
      <div class="title">{{ title }}</div>
      <div class="minTitle">
        <span>来源：{{ source }}</span>
        <span>发布时间：{{ time }}</span>
        <span>【字体：大 中 小 】</span>
      </div>
      <div class="line"></div>
      <div class="content" ref="content">
        <div v-html="content"></div>
      </div>
      <!-- 下载链接 -->
      <div class="downLoad" v-if="files.length">
        <header class="downHeader">
          <img src="/static/images/home/downLoad.png" />
          <span>附件下载</span>
        </header>
        <div class="downTarget">
          <div>
            <p class="itemTarget" v-for="(item,index) of files" :key="index">
              <el-button
                type="text"
                @click="download(item.storageId)"
              >{{index+1 + '.' +item.fileName }}</el-button>
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- 页脚部分 -->
    <Footer :info-data="footData" />
  </div>
</template>

<script>
import Header from "./header.vue";
import Footer from "./footer.vue";
import iLocalStroage from "@/common/js/localStroage";
import { findWebsiteInfo } from "@/api/notice/website.js";
export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      titleImg: "",
      footData: "",
    };
  },
  computed: {
    title() {
      return this.$route.query.title || "";
    },
    content() {
      return this.$route.query.content || "";
    },
    files() {
      return JSON.parse(this.$route.query.files) || [];
    },
    source() {
      return this.$route.query.source || "";
    },
    time() {
      return this.$route.query.time || "";
    },
    oldRouter() {
      let data = this.$route.query.oldRouter || "{}";
      return JSON.parse(data);
    },
  },
  methods: {
    download(fieldId) {
      let a = document.createElement("a");
      a.href =
        iLocalStroage.gets("CURRENT_BASE_URL").CAPTCHA_HOST +
        "/notice/sys/file/download/" +
        fieldId;
      a.click();
    },
    async getData() {
      let res = await findWebsiteInfo();
      if (res.data) {
        this.footData = res.data;
        this.titleImg = res.data.titleImg;
      }
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang="scss">
.details {
  height: 100vh;
  overflow: auto;
  &-contant {
    width: 1000px;
    margin: 0 auto;
    .elBreadcrumb {
      margin: 30px 0 30px 0;
    }
    .title {
      margin-top: 30px;
      font-size: 30px;
      font-family: "PingFangSC, PingFangSC-Medium";
      font-weight: 500;
      color: #05122c;
      margin-bottom: 16px;
    }
    .minTitle {
      margin-bottom: 12px;
      span {
        font-size: 12px;
        font-family: "PingFangSC, PingFangSC-Regular";
        font-weight: 400;
        color: #9b9ea4;
        margin-right: 48px;
      }
    }
    .line {
      height: 1px;
      background: rgba(0, 0, 0, 0.15);
      margin-bottom: 27px;
    }
    .downLoad {
      height: 209px;
      border: 1px solid rgba(217, 217, 217, 1);
      margin-top: 52px;
      .downHeader {
        height: 36px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background: rgba(242, 243, 247, 1);
        img {
          width: 17px;
          height: 16px;
          margin: 0 9px 0 14px;
        }
        span {
          font-size: 14px;
          font-family: "PingFangSC, PingFangSC-Regular";
          font-weight: 400;
          color: #6f7175;
        }
      }
      .downTarget {
        height: calc(100% - 36px);
        box-sizing: border-box;
        padding: 20px 18px 0 18px;
        overflow: auto;
        .itemTarget {
          margin-bottom: 20px;
          a {
            font-size: 14px;
            font-family: "PingFangSC, PingFangSC-Regular";
            font-weight: 400;
            color: #1253b2;
          }
        }
      }
    }
  }
}
</style>
