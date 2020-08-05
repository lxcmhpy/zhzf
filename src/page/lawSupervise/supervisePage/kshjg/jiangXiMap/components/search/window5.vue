<script>
export default {
  inject: ['page'],
  props: {
    window5: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    imgList() {
      return this.window5.imgList || []
    },
    info() {
      return this.window5.info
    },
    tableData() {
      // 重点监管没数据，目前先写死
      this.window5.data && this.window5.data.records && this.window5.data.records.map(item => {
        item.important = "否"
      })
      return this.window5.data.records || []
    }
  },
  methods: {
    /**
     * 图片切换栏生成函数
     */
    renderImgList() {
      return (
        <div class="search-window5-imgList">
          <el-carousel height="150px">
            {this._l(this.imgList, item => {
              return (
                <el-carousel-item>
                  <img src={`http://124.192.215.10:9332//${item.storageId}`} />
                </el-carousel-item>
              )
            })}
          </el-carousel>
        </div>
      )
    },

    /**
     * 站点详情模块生成函数
     */
    renderSite() {
      return (
        <div class="search-window5-site">
          <header class="siteHeader">
            <span class="siteHeaderLeft">{this.info.name}</span>
            <i class="iconfont law-jiankong" />
          </header>
          <article class="siteContant">
            <p>状态：在线</p>
            <p>{this.info.address}</p>
            <p>
              {this.info.createTime} &nbsp; 超限{this.info.cxchl} &nbsp; 黑名单{this.info.blackList}
              <span class="details">详情</span>
            </p>
          </article>
        </div>
      )
    },

    /**
     * table 表格生成函数
     */
    renderTable() {
      return (
        <div class="siteTable">
          <el-table
            data={this.tableData}
            style="width: 100%">
            <el-table-column
              show-overflow-tooltip={true}
              prop="checkTime"
              label="过检时间">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip={true}
              prop="vehicleNumber"
              label="车牌号">
            </el-table-column>
            <el-table-column
              prop="overload"
              label="超载率"
              align="center"
              width="70">
            </el-table-column>
            <el-table-column
              prop="area"
              label="车属地"
              width="70"
              align="center">
            </el-table-column>
            <el-table-column
              prop="important"
              label="重点监管"
              align="center"
              width="60">
            </el-table-column>
          </el-table>
        </div>
      )
    }
  },
  render() {
    return (
      <div class="search-window5">
        { this.renderImgList() }
        { this.renderSite() }
        { this.renderTable() }
      </div>
    )
  }
}
</script>

<style lang="scss">
.search-window5 {
  box-sizing: border-box;
  height: 600px;
  overflow: auto;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  background: #FFFFFF;
  &-imgList {
    img {
      width: 100%;
      height: 100%;
    }
  }
  &-site {
    .siteHeader {
      height: 30px;
      background: #909399;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #FFFFFF;
      font-size: 14px;
      .siteHeaderLeft {
        margin-left: 15px;
      }
      i {
        margin-right: 15px;
      }
    }
    .siteContant {
      box-sizing: border-box;
      padding: 15px;
      p {
        color: #7b7b7b;
        font-size: 14px;
        line-height: 30px;
        .details {
          cursor: pointer;
          margin-left: 20px;
        }
      }
    }
  }
}
</style>
