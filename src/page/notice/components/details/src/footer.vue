<template>
  <div class="details-footer">
    <div class="details-footer-contant">
      <div class="footerImg">
        <a :href="infoData.titleLink">
          <img src="/static/images/img/notice/logo_pic_2.png" />
        </a>
      </div>
      <div class="footerInfo">
        <div class="topInfo">
          <span>主办单位：{{ infoData.directOrgan }}</span>
          <span>承办单位：{{ infoData.undertakeOrgan }}</span>
        </div>
        <div class="bottomInfo">
          <a class="bottomLink" :href="infoData.recordLink">备案序号：{{infoData.recordNumber}}</a>
          <span class="bottomLink noLink">政府网站标识码：{{ infoData.websiteCode }}</span>
          <a class="bottomLink" :href="infoData.security">公网安备：{{infoData.securityRecordation}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["infoData"],
  //   computed: {
  //     infoData() {
  //       return JSON.parse(localStorage.getItem("footerInfo"));
  //     },
  //   },
};
</script>

<style lang="scss">
.details-footer {
  height: 130px;
  background: #fafafa;
  margin-top: 77px;
  border-top: 2px solid #dadada;
  &-contant {
    width: 1000px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .footerImg {
      a {
        img {
          height: 64px;
        }
      }
    }
    .footerInfo {
      margin-left: 40px;
      span {
        margin-right: 64px;
      }
      .topInfo {
        margin-bottom: 14px;
        span {
          font-size: 14px;
          font-family: "PingFangSC, PingFangSC-Medium";
          font-weight: 500;
          color: #6f7175;
        }
      }
      .bottomInfo {
        .bottomLink {
          margin-right: 64px;
          font-size: 14px;
          font-family: "PingFangSC, PingFangSC-Regular";
          font-weight: 400;
          color: #236bd5;
        }
        .bottomLink.noLink {
          color: rgba(111, 113, 117, 1);
        }
      }
    }
  }
}
</style>
