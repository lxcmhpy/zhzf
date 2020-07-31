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
  computed: {
    title() {
      return this.config.title
    },
    info() {
      return this.config.info
    }
  },
  methods: {
    /**
     * 点击返回
     */
    handleGoBack() {
      this.$emit('handleGoBack')
    },

    /**
     * 信息弹框生成函数
     */
    renderInfo() {
      return (
        <div class="jiangXiMap_mapWindow-info">
          <header>
            <span>{this.title}</span>
            <span class="goBack" on-click={this.handleGoBack}>返回</span>
          </header>
          <p class="contantInfo">地址：宁夏回族自治区固原市原州区六盘山西路与六盘山东路交叉路口往西南约50米(利民小区西北侧约50米)</p>
          <p class="contantInfo">联系人：曾新富</p>
          <p class="contantInfo">联系方式：13717000000</p>
          <div class="peopleTitle">
            <img src="/static/images/img/lawSupervise/icon_duiwu.png" />
            <span>人员在线情况</span>
          </div>
          <div class="peopleOnline"></div>
        </div>
      )
    }
  },
  render() {
    return (
      <div class="jiangXiMap_mapWindow">
        { this.renderInfo() }
      </div>
    )
  }
}
</script>

<style lang="scss">
.jiangXiMap_mapWindow {
  position: absolute;
  top: 70px;
  left: 30px;
  &-info {
    width: 370px;
    height: 402px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    background: #FFFFFF;
    box-sizing: border-box;
    header {
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
    .contantInfo {
      padding: 15px;
      box-sizing: border-box;
      line-height: 40px;
      color: #7b7b7b;
      font-size: 14px;
    }
    .peopleTitle {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      img {
        margin: 0 5px 0 10px;
      }
      span {
        color: #7b7b7b;
        font-size: 14px;
      }
    }
    .peopleOnline {

    }
  }
}
</style>
