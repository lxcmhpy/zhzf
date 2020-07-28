<template>
  <div class="jk-baseHMap"></div>
</template>

<script>
import loadScript from "@/common/js/loadScript.js";
import loadCss from "@/common/js/loadCss.js";
export default {
  props: {
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
      default: 10
    },
  },
  beforeCreate() {
    this.map = null;
  },
  methods: {
    /**
     *
     * 初始化地图
     */
    init() {
      let Map = new HMap(this.$el, {
        controls: {
          // 放大缩小控件
          zoom: false,
          // 旋转控件
          rotate: false,
           // 比例尺控件
          scaleLine: true,
          // 平移缩放控件
          zoomSlider: true,
          // 比例尺控件
          scaleLine: true
        },
        view: {
          center: this.center,
          projection: 'EPSG:3857',
          zoom: this.zoom,
          minZoom: 3,
          maxZoom: 13
        },
        baseLayers: [
          {
            layerName: 'ArcGIS',
            isDefault: true,
            layerType: 'TileXYZ',
            tileGrid: {
              tileSize: 256,
              extent: [-2.0037507067161843E7, -3.0240971958386254E7, 2.0037507067161843E7, 3.0240971958386205E7],
              origin: [-2.0037508342787E7, 2.0037508342787E7],
              resolutions: [
                156543.03392800014,
                78271.51696399994,
                39135.75848200009,
                19567.87924099992,
                9783.93962049996,
                4891.96981024998,
                2445.98490512499,
                1222.992452562495,
                611.4962262813797,
                305.74811314055756,
                152.87405657041106,
                76.43702828507324,
                38.21851414253662,
                19.10925707126831,
                9.554628535634155,
                4.77731426794937,
                2.388657133974685
              ]
            },
            layerUrl: 'http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}'
          }
        ]
      });
      Map.on('loadMapSuccess', event => {
        console.log('地图加载成功', event);
      });
      //注入地图实例
      this.map = Map;
      //派发地图初始化事件
      this.$emit("init", this.map, this);
    },

    /**
     * 坐标转换
     * 经纬度转Mercator， lonLatToMercator (lng, lat)
     */
    getTransLatLng(arr) {
      return HMap.transform.lonLatToMercator(Number(arr[0]), Number(arr[1]))
    },

    /**
     * 地图添加点位
     */
    addPoint(data) {
      const point = {
        attributes: {
          id: data.id
        },
        geometry: this.getTransLatLng(data.propertyValue.split(','))
      }
      const options = {
        layerName: 'pointLayer',
        zoomToExtent: true,
        style: {
          image: {
            type: 'icon',
            image: {
              imageSrc: '/static/images/img/lawSupervise/map_jigou.png',
              imageAnchor: [0.5, 1]
            }
          }
        },
        selectStyle: {
          image: {
            type: 'icon',
            image: {
              imageSrc: '/static/images/img/lawSupervise/map_jigou.png',
              imageAnchor: [0.5, 1]
            }
          }
        }
      }
      this.map.addPoint(point, options)
    },
  },
  created() {
    loadCss("/static/hmap/hmap.css");
    loadScript("/static/hmap/hmap.js").then(() => this.init());
  }
}
</script>

<style lang="scss">
.jk-baseHMap {
  width: 100%;
  height: 100%;
  .ol-viewport {
    .ol-overlaycontainer-stopevent {
      .hmap-zoom-slider {
        top: unset;
        bottom: 6em;
        left: unset;
        right: 4em;
      }
      .hmap-scale-line-control {
        left: unset;
        right: 1em;
        .hmap-scale-line-control-inner {
          border: 2px solid #FFFFFF;
          border-top: none;
          color: #FFFFFF;
        }
      }
    }
  }
}
</style>
