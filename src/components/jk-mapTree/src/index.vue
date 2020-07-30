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
  },
  render() {
    return (
      <div class="jk-mapTree">
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

}
</style>
