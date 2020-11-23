<template>
  <div class="jky-baseHMap"></div>
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
        return [115.871344, 28.710709];
      }
    },
    // 底图
    layerUrl: {
      type: String,
      default: 'http://111.75.227.156:18967/arcgis/rest/services/jx_channel_mix_2019/MapServer/tile/{z}/{y}/{x}?key=OWUYmEyO'
    }
  },
  data () {
    return {
      zoom: 8,
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
      },
      pointsLayerName: new Set(), // 多点点位的图层标识
      pointLayerName: new Set(), // 单点点位的图层标识
      informationWindow: [], // 信息窗体
      lineId: new Set(), // 单线的id标识
      interval: null
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
          extent: [113.57277, 24.488942, 118.482124, 30.079848],
          minZoom: 2,
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
            layerUrl: this.layerUrl
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
     * 通过图层标识清除多个点位
     */
    cleanPoints(layerName) {
      this.map.removeFeatureByLayerName(layerName)
    },

    /**
     * 通过图层标识清除所有单点
     */
    cleanPoint() {
      this.pointLayerName.forEach(item => {
        this.map.removeFeatureById(item)
      })
      this.pointLayerName.clear()
    },

    /**
     * 清除所有点位
     */
    cleanAll() {
      // 清除点位的时候清除信息弹窗
      this.informationWindow.map(item => {
        this.map.removeOverlay(item)
      })
      // this.map.removeOverlay(this.informationWindow)
      // this.map.informationWindow.hide()
      this.cleanPoint()
      // 清除所有多点
      this.pointsLayerName.forEach(item => {
        this.map.removeFeatureByLayerName(item)
      })
      // 清空 Set
      this.pointsLayerName.clear()
    },

    /**
     * 添加信息窗体
     */
    addOverlay(data, content) {
      let latLng = data.propertyValue.split(',')
      let window = new HMap.Popover(this.map.getMap(), {
        offset: [0, -45],
        showCloser: true,
        showMarkFeature: false,
        showMinimize: false,
      })
      this.map.addOverlay(window)
      window.show(latLng, content)
      this.informationWindow.push(window)
    },

    /**
     * 地图添加点位(单点)
     */
    addPoint(data, latLng, zoomToExtent) {
      // 打点之前清除地图点位
      this.cleanAll()
      let _layerName = data.id || ''
      this.pointLayerName.add(_layerName)
      if(!latLng) throw new Error("addPoint():::::::::::没有坐标")
      const point = {
        attributes: {
          id: data.id,
          data: data, // 带入当前点位信息
        },
        geometry: latLng
      }
      const options = {
        layerName: _layerName,
        zoomToExtent: zoomToExtent==='0'?false:true,
        style: {
          image: {
            type: 'icon',
            image: {
              imageSrc: data.imgUrl || '',
              imageAnchor: [0.5, 1]
            }
          }
        },
        selectStyle: {
          image: {
            type: 'icon',
            image: {
              imageSrc: data.imgUrl || '',
              imageAnchor: [0.5, 1]
            }
          }
        }
      }
      this.map.addPoint(point, options)
    },

    /**
     * 地图添加点位(多点)
     */
    addPoints(arr) {
      if(arr) {
        // this.map.removeOverlay(this.informationWindow)
        // 清除单点点位
        this.cleanPoint()

        let _layerName = arr.layerName
        this.pointsLayerName.add(_layerName)
        let points = arr.map(item => {
          // 打开信息弹窗
          let content = item.vehicleNumber || item.label || item.name || item.shipNumber || item.nickName || item.eventName
          this.addOverlay(item, content)
          let point = (item && item.propertyValue && item.propertyValue.split(',')) || []
          // 点位数据正常
          if(point.length === 2) {
            return {
              attributes: {
                id: item.id,
                data: item, // 带入当前点位信息
              },
              geometry: point
            }
          }
        })
        const options = {
          layerName: _layerName,
          zoomToExtent: true,
          style: {
            image: {
              type: 'icon',
              image: {
                imageSrc: arr.imgUrl || '',
                imageAnchor: [0.5, 1]
              }
            }
          },
          selectStyle: {
            image: {
              type: 'icon',
              image: {
                imageSrc: arr.imgUrl || '',
                imageAnchor: [0.5, 1]
              }
            }
          }
        }
        this.map.addPoints(points, options)
        this.zoom = 3
      }
    },

    /**
     * 添加轨迹动画
     */
    addTrackAction(data, points) {
      if(points.length > 0) {
        let index = 0
        this.interval = setInterval(() => {
          if(index < points.length) {
            this.addPoint(data, points[index], '0')
            index++
          } else {
            index = 0
          }
        }, 1000)
      }
    },

    /**
     * 添加单线
     */
    addLine(points, id, layerName) {
      this.lineId = id
      const line = {
        attributes: {
          id: id
        },
        geometry: {
          paths: [points]
        },
      }
      const options = {
        geomType: 'EsriJSON',
        layerName: layerName,
        zoomToExtent: true,
        style: {
          stroke: {
            strokeColor: '#1b9de8',
            strokeWidth: 3
          }
        },
        selectStyle: {
          stroke: {
            strokeColor: '#D81E06',
            strokeWidth: 3
          }
        }
      }
      this.map.addPolyline(line, options)
      // 添加轨迹动画
      this.addTrackAction({
        id: 'trackAction',
        imgUrl: '/static/images/img/lawSupervise/map_renyuan.png'
      }, points)
    },

    /**
     * 通过 id 删除单线
     */
    removeFeatureById() {
      if (!Map) return
      this.map.removeFeatureById(this.lineId)
      // 删除轨迹图标
      this.map.removeFeatureById('trackAction')
      // 清除轨迹动画
      clearInterval(this.interval)
    },
  },
  created() {
    loadCss("/static/hmap/hmap.css");
    loadScript("/static/hmap/hmap.js").then(() => this.init());
  },
  beforeDestroy() {
    clearInterval(this.interval)
  }
}
</script>

<style lang="scss">
.jky-baseHMap {
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
      }
    }
  }
}
</style>
