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
     *
     * 选中节点时触发
     */
    handleChange(value) {
      this.$emit("handleChange", value)
    },

    /**
     *
     * 级联选择框生成函数
     */
    renderCascader(data) {
      return (
        <div class="block">
          <el-cascader
            clearable
            options={data.options}
            on-change={ this.handleChange }>
          </el-cascader>
        </div>
      )
    },

    /**
     *
     * 下拉选择生成函数
     */
    renderDropdown(data) {
      return (
        <div slot="reference">
          <el-dropdown placement="bottom">
            <span class="el-dropdown-link">
              { data.title }<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu style="width:0;height:0;"></el-dropdown-menu>
          </el-dropdown>
        </div>
      )
    }
  },
  render() {
    return (
      <div class="jk-mapSelect">
        {this._l(this.list, item => {
          return (
            <div class="jk-mapSelect-box">
              {
                item.imgUrl ? <img src={item.imgUrl} /> : null
              }
              <div class="selectDown">
                <el-popover
                  placement="bottom"
                  width="200"
                  trigger="click">
                  { this.renderCascader(item) }
                  { this.renderDropdown(item) }
                </el-popover>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}
</script>

<style lang="scss">
.jk-mapSelect {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 417px;
  height: 46px;
  background: #FFFFFF;
  &-box {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      margin-right: 10px;
    }
  }
}
</style>
