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
    buttons() {
      return this.config.buttons
    },
    option() {
      return this.config.option
    }
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      clickedIndex: 0
    }
  },
  methods: {
    /**
     * 节点被点击时的回调
     */
    handleNodeClick(data) {
      this.$emit('handleNodeClick', data)
    },

    /**
     * 点击按钮时触发
     */
    handleButton(data, index) {
      this.clickedIndex = index
      this.$emit("handleButton", data)
    },

    /**
     * 自定义子节点图标
     */
    renderSlot(h,{ node, data, store }) {
      return (
        <div class="tree-slot-box">
          <img
            src={
              data.label === '执法人员' ?
                '/static/images/img/lawSupervise/icon_jc11.png'
                : data.label === '执法车辆' ?
                '/static/images/img/lawSupervise/icon_cl11.png'
                : data.label === '执法船舶' ?
                '/static/images/img/lawSupervise/icon_cb11.png'
                : '/static/images/img/lawSupervise/icon_jc1.png'
            }
          />
          <span>{data.label}</span>
        </div>
      )
    },

    /**
     * 查询切换按钮生成函数
     */
    renderButtons() {
      return (
        <div class="jk-mapTree-buttons">
          {this._l(this.buttons, (item,index) => {
            return  <div class="topButton"
                      on-click={() => {this.handleButton(item,index)}}
                      style={this.clickedIndex===index?"background:#409eff;color:#fff;border-color:#409eff;":null}
                    >
                      {item.name}
                    </div>
          })}
        </div>
      )
    }
  },
  render() {
    return (
      <div class="jk-mapTree">
        { this.renderButtons() }
        <el-tree
          data={this.option}
          props={this.defaultProps}
          on-node-click={this.handleNodeClick}
          render-content={this.renderSlot}
        >
        </el-tree>
      </div>
    )
  }
}
</script>

<style lang="scss">
.jk-mapTree {
  width: 370px;
  height: 402px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  background: #FFFFFF;
  box-sizing: border-box;
  padding: 15px;
  overflow: auto;
  &-buttons {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    .topButton {
      width: 79px;
      height: 32px;
      background: #FFFFFF;
      border: 1px solid #dcdfe6;
      margin-left: -1px;
      color: #606266;
      font-weight: 500;
      font-size: 12px;
      text-align: center;
      line-height: 32px;
      cursor: pointer;
      transition: color .5s
    }
    .topButton:hover {
      color: #409eff;
    }
    .topButton:nth-child(1) {
      border-radius: 4px 0 0 4px;
      margin-left: 0;
    }
    .topButton:nth-last-child(1) {
      border-radius: 0 4px 4px 0;
    }
  }
  .el-tree {
    border-radius: 4px;
    .tree-slot-box {
      img {
        width: 13px;
        margin-right: 5px;
      }
      span {
        font-size: 12px;
        color: #606266;
        font-family: Helvetica,Arial,sans-serif;
      }
    }
  }
}
</style>
