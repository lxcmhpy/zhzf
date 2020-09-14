<template>
  <div class="jky-baseAMap"></div>
</template>

<script>
import loadScript from "@/common/js/loadScript.js";
export default {
  props: {
    // 放大倍数
    zoom: {
      type: Number,
      default: 5
    },
  },
  data() {
    return {
      map: null,
      marker: {}, // 单点数据
      markerList: [], // 多点数据
    }
  },
  methods: {
    /**
     * 初始化地图
     */
    init() {
      this.map = new AMap.Map(this.$el, {
        zoom: this.zoom,//级别
        resizeEnable: true, // 地图中心点默认为当前位置
      });
    },

    /**
     * 地图打点函数(单个点位打点)
     */
    addPoint(data) {
      this.map.setZoomAndCenter(18, data.position) // 当前点位设为地图中心点，并调整缩放等级
      let marker = new AMap.Marker({
        position: data.propertyValue.split(',') || [], //位置
        icon: data.icon,
        offset: new AMap.Pixel(0,0), // 设置点标记偏移量
        anchor:'bottom-center', // 设置锚点方位
      })
      this.map.add(marker);//添加到地图
      marker.on('click', () => {this.clickPoint(data)});
      this.marker = marker
    },

    /**
     * 地图打点函数(多个点位打点)
     */
    addPoints(data) {
      let markerList = data.map(item => {
        let marker = new AMap.Marker({
          position: item.propertyValue.split(',') || [],   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          title: item.title,
          icon: item.icon,
          offset: new AMap.Pixel(0,0), // 设置点标记偏移量
          anchor:'bottom-center', // 设置锚点方位
        });
        marker.on('click', () => {this.clickPoint(item)});
        return marker
      })
      this.map.add(markerList);
      this.markerList = markerList
    },

    /**
     * 删除单个点位
     */
    cleanPoint() {
      this.map.remove(this.marker)
    },

    /**
     * 通过图层标识清除多个点位
     */
    cleanPoints(layerName) {
      this.markerList.map(marker => {
        if(marker["Ce"].title === layerName) {
          this.map.remove(marker)
        }
      })
    },

    /**
     * 添加信息窗体
     */
    addOverlay(data, content) {
      let latLng = data.propertyValue.split(',') || []
      // 创建 infoWindow 实例
      let infoWindow = new AMap.InfoWindow({
        offset: new AMap.Pixel(0, -40),
        anchor: 'bottom-center',
        content: content  //传入 dom 对象，或者 html 字符串
      });
      // 打开信息窗体
      infoWindow.open(this.map, latLng);
    },

    /**
     * 点击点位
     */
    clickPoint(data) {
      this.$emit('handleClickPoint', data)
    }
  },
  created() {
    loadScript('https://webapi.amap.com/maps?v=1.4.15&key="2fab5dfd6958addd56c89e58df8cbb37"').then(() => this.init());
  }
}
</script>

<style lang="scss">
.jky-baseAMap {
  width: 100%;
  height: 100%;
}
</style>
