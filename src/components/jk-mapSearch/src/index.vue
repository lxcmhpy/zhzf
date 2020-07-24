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
    option() {
      return this.config.option
    }
  },
  data() {
    return {
      inputModel: "",
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      isShow: false
    }
  },
  methods: {
    /**
     *
     * 节点被点击时的回调
     */
    handleNodeClick(data) {
      this.$emit('handleNodeClick', data)
    },

    /**
     *
     * 自定义子节点图标
     */
    renderSlot(h,{ node, data, store }) {
      return (
        <div class="tree-slot-box">
          <img
            src={
              data.label === '执法人员' ?
                '../../../../static/images/img/lawSupervise/icon_jc11.png'
                : data.label === '执法车辆' ?
                '../../../../static/images/img/lawSupervise/icon_cl11.png'
                : data.label === '执法船舶' ?
                '../../../../static/images/img/lawSupervise/icon_cb11.png'
                : '../../../../static/images/img/lawSupervise/icon_jc1.png'
            }
          />
          <span>{data.label}</span>
        </div>
      )
    },

    /**
     *
     * 头部输入框生成函数
     */
    renderSearch() {
      return (
        <div class="input-with-select">
          <el-input
            value={ this.inputModel }
            on-input={ value => this.inputModel = value }
            placeholder={this.title}>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      )
    },

    /**
     *
     * 图片和树结构的生成函数
     */
    renderContant() {
      return (
        <div class="contant">
          <div class="contant-imgBox">
            <img src="../../../../static/images/img/lawSupervise/icon_renyuan.png" />
          </div>
          <div>
            <el-tree
              data={this.option}
              props={this.defaultProps}
              on-node-click={this.handleNodeClick}
              render-content={this.renderSlot}
            >
            </el-tree>
          </div>
        </div>
      )
    }
  },
  render() {
    return (
      <div class="jk-mapSearch"
        on-mouseenter = {() => {this.isShow = true}}
        on-mouseleave = {() => {this.isShow = false}}
      >
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
    .el-input__inner {
      width: 392px;
      height: 46px;
    }
    .el-input-group__append {
      background-color: rgba(2,118,250,.9);
      color: #FFFFFF;
      border: none;
      border-radius: 0;
    }
  }
  .contant {
    height: 65vh;
    background: #FFFFFF;
    &-imgBox {
      height: 25%;
      border-bottom: 2px solid #EEEEEE;
      text-align: center;
      img {
        height: 100%;
      }
    }
  }
}
</style>
