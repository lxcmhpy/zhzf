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
        return [115.8, 28.8];
      }
    },
    // 放大倍数
    zoom: {
      type: Number,
      default: 10
    },
  },
  data () {
        return {
            mapConsts: {
                // 江西省范围
                extentJx: [113.57277, 24.488942, 118.482124, 30.079848],
                // arcgis server默认origin
                originArcgisServer: [-400, 399.9999999999998],
                resolutions: [
                    0.010986328383069278, 0.005493164191534639, 0.0027465809060368165, 0.0013732916427489112,
                    6.866458213744556E-4, 3.433229106872278E-4, 1.716614553436139E-4, 8.582953794130404E-5, 4.291595870115493E-5,
                    2.1457979350577466E-5, 1.0728989675288733E-5, 5.363305107141452E-6, 2.681652553570726E-6
                ]
            }
        }
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
          center: [115.8, 28.8],
          projection: 'EPSG:4326',
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
              extent: this.mapConsts.extentJx,
              origin: this.mapConsts.originArcgisServer,
              resolutions: this.mapConsts.resolutions
            },
            projection: 'EPSG:4326',
            // layerUrl: 'http://111.75.227.156:18967/arcgis/rest/services/jx_channel_mix_2019/MapServer/tile/{z}/{y}/{x}?key=OWUYmEyO'
            //layerUrl: 'http://111.75.227.156:18984/xxzx_admin_site01/rest/services/JIANGXIQGBLUE/MapServer/tile/{z}/{y}/{x}'
            layerUrl: 'http://111.75.227.156:18984/xxzx_admin_site01/rest/services/JXMAP_2020/MapServer/tile/{z}/{y}/{x}'
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
     * 地图添加点位(单点)
     */
    addPoint(data, latLng) {
      if(!latLng) throw new Error("addPoint() in jk-baseHMap:::::::::::没有坐标")
      const point = {
        attributes: {
          id: data.id,
          data: data, // 带入当前点位信息
        },
        geometry: this.getTransLatLng(latLng)
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
