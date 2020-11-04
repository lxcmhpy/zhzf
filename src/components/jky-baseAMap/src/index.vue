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
      this.$emit("init", this.map, this)
    },

    /**
     * 地图打点函数(单个点位打点)
     */
    addPoint(data) {
      this.cleanPoint()
      let position = data.propertyValue.split(',') || []
      this.map.setZoomAndCenter(18, position) // 当前点位设为地图中心点，并调整缩放等级
      let marker = new AMap.Marker({
        position: position, //位置
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
      this.cleanPoint()
      let markerList = data.map(item => {
        let marker = new AMap.Marker({
          position: item.propertyValue.split(',') || [],   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          // title: item.title,
          icon: item.icon,
          offset: new AMap.Pixel(0,0), // 设置点标记偏移量
          anchor:'bottom-center', // 设置锚点方位
        });
        marker.on('click', () => {this.clickPoint(item)});
        return marker
      })
      this.map.setZoomAndCenter(9, this.getPointsCenter(data)) // 设中心点，并调整缩放等级
      this.map.add(markerList);
      this.markerList.push(markerList)
    },

    /**
     * 求多个点位的中位数
     */
    getPointsCenter(data) {
      if(data.length === 0) return false;
      let lng = [], lat =[], lnglat = [];
      data.map(item => {
        if(item.propertyValue) {
          if(item.propertyValue.split(',').length === 2) {
            lng.push(Number(item.propertyValue.split(',')[0]))
            lat.push(Number(item.propertyValue.split(',')[1]))
          }
        }
      })
      lng.sort((a,b) => { return a -b })
      lat.sort((a,b) => { return a -b })
      if(lng.length % 2 === 0) {
        let leftIndex = (lng.length / 2) -1
        let rightIndex = lng.length / 2
        lnglat[0] = (lng[leftIndex] + lng[rightIndex]) / 2
      } else if (lng.length % 2 === 1) {
        lnglat[0] = lng[Math.floor(lng.length / 2)]
      }
      if(lat.length % 2 === 0) {
        let leftIndex = (lat.length / 2) -1
        let rightIndex = lat.length / 2
        lnglat[1] = (lat[leftIndex] + lat[rightIndex]) / 2
      } else if (lat.length % 2 === 1) {
        lnglat[1] = lat[Math.floor(lat.length / 2)]
      }
      return lnglat
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
    cleanPoints(icon) {
      this.markerList.map((markers,index) => {
        if(markers[0]["Ce"].icon === icon) {
          this.map.remove(markers)
          this.markerList.splice(index, 1)
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
  width: 75%;
  height: 100%;
  background: white !important;
  float: right;
}
</style>
