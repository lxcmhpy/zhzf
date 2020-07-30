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
    placeholder() {
      return this.config.placeholder
    },
    option() {
      return this.config.option
    }
  },
  data() {
    return {
      inputModel: "",
      isShow: false
    }
  },
  methods: {
    /**
     * 头部输入框生成函数
     */
    renderSearch() {
      return (
        <div class="input-with-select" on-click={ ()=>{this.isShow = true} }>
          <el-input
            value={ this.inputModel }
            on-input={ value => this.inputModel = value }
            placeholder={this.placeholder}>
            <div slot="suffix" class="closeBox" on-click={this.handleClose}>
              <i class="el-icon-close"></i>
            </div>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      )
    },

    /**
     * 查询框生成函数
     */
    renderContant() {
      return (
        <div class="contant">
          <header class="contant-titles">
            <h4>{this.title}</h4>
          </header>
          <article class="contant-flexBoxs">
            {
              this._l(this.option, item => {
                return (
                  <div class="flexBox">
                    <img on-click={() => {this.handleSearch(item)}} src={item.imgUrl} />
                    <div>{item.name}</div>
                  </div>
                )
              })
            }
          </article>
        </div>
      )
    },

    /**
     * 点击专题图片触发
     */
    handleSearch(data) {
      this.isShow = false
      this.$emit("handleSearch", data)
    },

    /**
     * 点击关闭按钮触发
     */
    handleClose() {
      event.stopPropagation()
      this.isShow = false
      this.inputModel=''
    }
  },
  render() {
    return (
      <div class="jk-mapSearch">
        { this.renderSearch() }
        {
          this.isShow ? this.renderContant() : null
        }
      </div>
    )
  }
}
</script>

<style lang="scss">
.jk-mapSearch {
  .tree-slot-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    img {
      margin-right: 5px;
    }
  }
  .input-with-select {
    margin-bottom: 10px;
    .el-input__inner {
      width: 311px;
      height: 40px;
      border-radius: 4px 0 0 4px;
    }
    .el-input-group__append {
      .el-button {
        .el-icon-search {
          color: #409EFF;
        }
      }
    }
    .closeBox {
      height: 40px;
      line-height: 40px;
      cursor: pointer;
    }
  }
  .contant {
    height: 308px;
    width: 370px;
    background: #fff;
    box-shadow: 1px 1px 8px #ddd;
    padding: 15px;
    box-sizing: border-box;
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
}
</style>
