<template>
  <div class="jky-baseTMap"></div>
</template>

<script>
export default {
  name: "JkyBaseTMap",
  props: {
    zoom: {
      type: Number,
      default: 12
    },
    center: {
      type: Array,
      default() {
        return [116.40769, 39.89945]
      }
    }
  },
  data() {
    return {
      map: null,
    }
  },
  methods: {
    /**
     * 初始化地图
     */
    init() {
      let map = new T.Map(this.$el);
      map.centerAndZoom(new T.LngLat(this.center[0], this.center[1]), this.zoom);
      this.$emit('init', map, this)
      this.map = map
    },

    /**
     * 打点函数
     */

  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="scss">
.jky-baseTMap {
  width: 100%;
  height: 100%;
}
</style>
