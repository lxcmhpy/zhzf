<template>
  <div class="search-window2">
    <el-tree
      :data="option"
      :props="defaultProps"
      @node-click="handleNodeClick"
      :render-content="renderSlot"
    >
    </el-tree>
  </div>
</template>

<script>
export default {
  inject: ['page'],
  props: {
    window2: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    option() {
      return this.window2.option
    },
    defaultProps() {
      return this.window2.defaultProps
    }
  },
  methods: {
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
     * 节点被点击时的回调
     */
    handleNodeClick(data) {
      this.$emit('handleNodeClick', data)
    },
  }
}
</script>

<style lang="scss">
.search-window2 {
  height: 402px;
  overflow: auto;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  background: #FFFFFF;
  box-sizing: border-box;
  padding: 15px;
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
