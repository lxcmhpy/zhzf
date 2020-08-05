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
    list() {
      return this.config.option
    }
  },
  methods: {
    /**
     * 选中节点时触发
     */
    handleChange(value) {
      this.$emit("handleChange", value)
    },

    /**
     * 点击图层下拉菜单项的回调
     */
    handleCommand(type) {
      this.$emit('handleCommand', type)
    },

    /**
     * 级联选择框生成函数
     */
    renderCascader() {
      let data = this.list[0]
      return (
        <div class="jk-mapSelect-box">
          {
            data.imgUrl ? <img src={data.imgUrl} /> : null
          }
          <div class="selectDown">
            <el-popover
              placement="bottom"
              width="200"
              trigger="click">
              <div class="block">
                <el-cascader
                  clearable
                  options={data.options}
                  on-change={ this.handleChange }>
                </el-cascader>
              </div>
              <div slot="reference">
                <el-dropdown placement="bottom">
                  <span class="el-dropdown-link">
                    { data.title }<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu></el-dropdown-menu>
                </el-dropdown>
              </div>
            </el-popover>
          </div>
        </div>
      )
    },

    /**
     * 下拉选择框生成函数
     */
    renderDropdown() {
      let data = this.list[1]
      return (
        <div class="jk-mapSelect-box">
          {
            data.imgUrl ? <img src={data.imgUrl} /> : null
          }
          <div class="selectDown">
            <el-dropdown on-command={this.handleCommand}>
              <span class="el-dropdown-link">
                {data.title}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                {this._l(data.options, item => {
                  return (
                    <el-dropdown-item command={item.type}>{item.name}</el-dropdown-item>
                  )
                })}
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      )
    },

    /**
     * 全屏按钮生成函数
     */
    renderFull() {
      let data = this.list[2]
      return (
        <div class="jk-mapSelect-box">
          {
            data.imgUrl ? <img src={data.imgUrl} /> : null
          }
          <span class="fullScreen">{data.title}</span>
        </div>
      )
    }
  },
  render() {
    return (
      <div class="jk-mapSelect">
        {this.renderCascader()}
        {this.renderDropdown()}
        {this.renderFull()}
      </div>
    )
  }
}
</script>

<style lang="scss">
.jk-mapSelect {
  position: absolute;
  top: 20px;
  right: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 350px;
  height: 40px;
  background: #FFFFFF;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 4px;
  &-box {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      margin-right: 10px;
    }
    .fullScreen {
      font-size: 14px;
      color: #606266;
      cursor: pointer;
    }
  }
}
</style>
