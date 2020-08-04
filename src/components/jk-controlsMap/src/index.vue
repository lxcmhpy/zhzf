<template>
  <div class="jk-controlsMap">
    <BaseHMap @init="init" :center="center" :zoom="zoom" />
    <JkMapSearch
      class="jk-controlsMap-inputWithSearch"
      @handleSearch="handleSearch"
      @handleShowSearch="handleShowSearch"
      :config="config.searchData"
    />
    <JkMapSelect
      class="jk-controlsMap-mapSelect"
      @handleChange="handleChange"
      @handleCommand="handleCommand"
      :config="config.popoverData"
    />
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
    // 控件相关数据
    config: {
      type: Object,
      default() {
        return {}
      }
    },
    // 中心点
    center: {
      type: Array,
      default() {
        return [12118909.300259633, 4086043.1061670054];
      }
    },
    // 放大倍数
    zoom: {
      type: Number,
      default: 8
    },
  },
  methods: {
    /**
     * 派发地图初始化事件
     */
    init(map, _this) {
      this.$emit("init", map, _this)
    },

    /**
     * 点击头部输入栏触发
     */
    handleShowSearch() {
      this.$emit('handleShowSearch')
    },

    /**
     * 点击专题图片触发
     */
    handleSearch(data) {
      this.$emit("handleSearch", data)
    },

    /**
     * 选中级联选择器节点时触发
     */
    handleChange(value) {
      this.$emit('handleChange', value)
    },

    /**
     * 点击图层下拉菜单项的回调
     */
    handleCommand(type) {
      this.$emit('handleCommand', type)
    },
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
