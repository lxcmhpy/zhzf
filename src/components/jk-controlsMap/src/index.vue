<template>
  <div class="jk-controlsMap">
    <BaseHMap />
    <JkMapSearch
      @handleNodeClick="handleNodeClick"
      :config="config.treeData"
      class="jk-controlsMap-inputWithSearch"
    />
  </div>
</template>

<script>
import BaseHMap from "@/components/jk-baseHMap";
import JkMapSearch from "@/components/jk-mapSearch"
export default {
  components: {
    BaseHMap,
    JkMapSearch
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
}
</style>
