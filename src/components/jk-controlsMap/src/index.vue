<template>
  <div class="jk-controlsMap">
    <BaseHMap />
    <JkMapSearch
      class="jk-controlsMap-inputWithSearch"
      @handleNodeClick="handleNodeClick"
      :config="config.treeData"
    />
    <JkMapSelect
      class="jk-controlsMap-mapSelect"
      @handleChange="handleChange"
      :config="config.popoverData"
    >
    </JkMapSelect>
  </div>
</template>

<script>
import BaseHMap from "@/components/jk-baseHMap";
import JkMapSearch from "@/components/jk-mapSearch";
import JkMapSelect from "@/components/jk-mapSelect";
export default {
  components: {
    BaseHMap,
    JkMapSearch,
    JkMapSelect
  },
  props: {
    config: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    /**
     *
     * 点击节点回调函数
     */
    handleNodeClick(data) {
      this.$emit('handleNodeClick', data)
    },

    /**
     *
     * 选中级联选择器节点时触发
     */
    handleChange(value) {
      this.$emit('handleChange', value)
    }
  }
}
</script>

<style lang="scss">
.jk-controlsMap {
  width: 100%;
  height: 100%;
  position: relative;
  &-inputWithSearch {
    position: absolute;
    top: 20px;
    left: 30px;
  }
  &-mapSelect {
    position: absolute;
    top: 20px;
    right: 30px;
  }
}
</style>
