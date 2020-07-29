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
     * 关闭弹窗
     */
    handleClose() {
      this.$emit('handleClose')
    },

    /**
     * 信息弹框生成函数
     */
    renderInfo() {
      return (
        <div class="jiangXiMap_mapWindow-info">
          <header>
            <div class="headerTitle">
              <i class="iconfont law-zfj"></i>
              <span>{this.title}</span>
            </div>
            <i on-click={this.handleClose} class="el-icon-close"></i>
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
    width: 450px;
    height: 368px;
    background: #FFFFFF;
    header {
      width: 100%;
      height: 50px;
      background: #4573d0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .headerTitle {
        font-size: 18px;
        font-weight: 200;
        color: #ffffff;
        i {
          margin: 0 5px 0 5px;
        }
      }
      .el-icon-close {
        cursor: pointer;
        margin-right: 10px;
      }
    }
    .contantInfo {
      box-sizing: border-box;
      padding-left: 10px;
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
