<script>
export default {
  inject: ['indexPage'],
  props: {
    id: {
      type: Number,
      default: null
    }
  },
  methods: {
    /**
     * 点击关闭图标
     */
    handleClosePhoneVideo() {
      this.indexPage.showVideo = false
    },

    /**
     * 电话框生成函数
     */
    renderPhone() {
      return (
        <div class="phoneWindow">
          <div class="phoneVideoContant">
            <img on-click={this.handleClosePhoneVideo} src="./static/images/img/lawSupervise/ring_off.png" />
            <div>取消</div>
          </div>
          <div class="phoneVideoFooter">
            <span>点击接听</span>
          </div>
        </div>
      )
    },

    /**
     * 视频框生成函数
     */
    renderVideo() {
      return (
        <div class="videoWindow">
          <div class="videoWindowContant">
            <div class="personWindow"></div>
            <div class="personWindow"></div>
          </div>
          <div class="videoWindowBtns">
            <div><img src="./static/images/img/lawSupervise/ring_off.png" /></div>
            <div><img on-click={this.handleClosePhoneVideo} src="./static/images/img/lawSupervise/ring_off.png" /></div>
          </div>
        </div>
      )
    }
  },
  render() {
    return (
      <div class="jiangXiMap-phoneVideo">
        <div class="phoneVideoHeader"><i on-click={this.handleClosePhoneVideo} class="el-icon-close" /></div>
        { this.id === 0 ?
            this.renderPhone()
            : this.id === 1 ?
            this.renderVideo()
            : null
        }
      </div>
    )
  }
}
</script>

<style lang="scss">
.jiangXiMap-phoneVideo {
  width: 430px;
  height: 366px;
  background: #303133;
  position: absolute;
  top: 85px;
  left: 50%;
  transform: translateX(-215px);
  box-sizing: border-box;
  padding: 15px;
  border-radius: 4px;
  .phoneVideoHeader {
    text-align: right;
    .el-icon-close {
      cursor: pointer;
      color: #FFFFFF;
      font-weight: 600;
    }
  }
  .phoneWindow {
    .phoneVideoContant {
      height: 70px;
      width: 48px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateY(-35px) translateX(-24px);
      text-align: center;
      img{
        cursor: pointer;
      }
      div {
        margin-top: 5px;
        text-align: center;
        color: #FFFFFF;
        font-size: 14px;
        font-weight: 500;
      }
    }
    .phoneVideoFooter {
      position: absolute;
      bottom: 20px;
      width: 60px;
      text-align: center;
      left: 50%;
      transform: translateX(-30px);
      span {
        color: #FFFFFF;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
      }
    }
  }
  .videoWindow {
    .videoWindowContant {
      height: 246px;
      display: flex;
      justify-content: flex-start;
      margin-top: 10px;
      .personWindow {
        flex: 1;
        border: 1px solid #eee;
      }
      .personWindow:nth-child(2) {
        margin-left: -1px;
      }
    }
    .videoWindowBtns {
      display: flex;
      justify-content: center;
      margin-top: 20px;
      div {
        text-align: center;
        width: 100px;
        img {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
