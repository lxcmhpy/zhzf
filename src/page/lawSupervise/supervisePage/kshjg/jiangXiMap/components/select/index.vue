<script>
export default {
  inject: ['indexPage'],
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
  data() {
    return {
      isIndeterminate: true,
      checkedCities: [], // 选择的参数
      checkAll: false,
      colors: [{
        name: '眼眸',
        path: 'http://111.75.227.156:18984/xxzx_admin_site01/rest/services/JIANGXISIMPLE2020YM/MapServer/{z}/{y}/{x}'
      }, {
        name: '一蓑烟雨',
        path: 'http://111.75.227.156:18984/xxzx_admin_site01/rest/services/JIANGXI2020YSYY/MapServer/{z}/{y}/{x}'
      }, {
        name: '烟雨',
        path: 'http://111.75.227.156:18984/xxzx_admin_site01/rest/services/JIANGXISIMPLEQHC2020/MapServer/{z}/{y}/{x}?key=OWUYmEyO'
      }]
    }
  },
  methods: {
    /**
     * 点击全屏按钮
     */
    handleFullScreen() {
      this.$emit('handleFullScreen')
    },

    /**
     * 点击全选
     */
    handleCheckAllChange(val) {
      this.checkAll = val
      this.checkedCities = val ?
        this.list[1].options.map(item => {return item.name})
        : [];
      this.isIndeterminate = false;
      this.$emit('handleCheckAllChange', val)
    },

    /**
     * 点击全选
     */
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.list[1].options.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.list[1].options.length;
      this.$emit('handleCheckedCitiesChange', value)
    },

    /**
     * 点击单个复选框，完成数据双向绑定
     */
    handleItemCheck(val,event) {
      let name = event.target.defaultValue
      if(val) {
        this.checkedCities.push(name)
      } else {
        let index = this.checkedCities.indexOf(name)
        this.checkedCities.splice(index, 1)
      }
      this.$emit('handleItemCheck', {val, name})
    },

    /**
     * 选中节点时触发
     */
    handleChange(value) {
      this.$emit("handleChange", value)
    },

    /**
     * 点击换肤按钮
     */
    changeColor(data) {
      this.indexPage.layerUrl = data.path
      this.indexPage.page.init()
      console.log(data)
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
     * 下拉复选框生成函数
     */
    renderDropdown() {
      let data = this.list[1]
      return (
        <div class="jk-mapSelect-box">
          {
            data.imgUrl ? <img src={data.imgUrl} /> : null
          }
          <div class="selectDown">
            <el-dropdown hide-on-click={false} placement="bottom">
              <span class="el-dropdown-link">
                {data.title}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <el-checkbox indeterminate={this.isIndeterminate} value={this.checkAll} on-change={this.handleCheckAllChange}>全选</el-checkbox>
                  <el-checkbox-group
                    value={this.checkedCities}
                    on-change={this.handleCheckedCitiesChange}>
                    {this._l(data.options, item => {
                      return (
                        <div>
                          <el-checkbox on-change={this.handleItemCheck} label={item.name}>{item.name}</el-checkbox>
                        </div>
                      )
                    })}
                  </el-checkbox-group>
                </el-dropdown-item>
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
        <div class="jk-mapSelect-box" on-click={this.handleFullScreen}>
          {
            data.imgUrl ? <img src={data.imgUrl} /> : null
          }
          <span class="fullScreen">{data.title}</span>
        </div>
      )
    },

    /**
     * 换肤按钮生成函数
     */
    rendChangeColor() {
      return (
        <el-popover
          class="changeColor"
          placement="bottom"
          width="60"
          trigger="click">
          <div class="changeText" on-click={()=>{this.changeColor(this.colors[0])}}>{this.colors[0].name}</div>
          <div class="changeText" on-click={()=>{this.changeColor(this.colors[1])}}>{this.colors[1].name}</div>
          <div class="changeText" on-click={()=>{this.changeColor(this.colors[2])}}>{this.colors[2].name}</div>
          <i class="iconfont law-skin f22" slot="reference"></i>
        </el-popover>
      )
    }
  },
  render() {
    return (
      <div class="jk-mapSelect">
        {this.renderDropdown()}
        {this.renderFull()}
        {this.rendChangeColor()}
      </div>
    )
  }
}
</script>

<style lang="scss">
.changeText {
  padding: 5px 10px;
  text-align: center;
  cursor: pointer;
}
.changeText:hover {
  background: #4573d0;
  color: #FFFFFF;
}
.jk-mapSelect {
  position: absolute;
  top: 40px;
  right: 80px;
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
    cursor: pointer;
    img {
      margin-right: 10px;
    }
    .fullScreen {
      font-size: 14px;
      color: #606266;
    }
    .selectDown {
      // .myCheckBox {
      //   display: flex;
      //   flex-direction: column;
      //   justify-content: flex-start;
      // }
    }
  }
  .changeColor {
    margin-right: 20px;
    .iconfont {
      color:#4573d0;
      cursor: pointer;
    }
  }
}
</style>
