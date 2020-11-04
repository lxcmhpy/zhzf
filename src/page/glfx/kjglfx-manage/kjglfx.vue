<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage toggleBox">
      <div class="handlePart">
        <el-form :inline="true" :model="logForm" label-width="100px" ref="logForm">
          <el-form-item label="统计周期" prop>
            <el-date-picker
              v-model="date"
              type="monthrange"
              range-separator="至"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
              format="yyyy-MM"
              value-format="yyyy-MM"
              @change="changeTime"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div class="mapBox" style="height:100%;">
        <div id="map" style="width:100%; height:100%;"></div>
      </div>
    </div>
  </div>
</template>


<script>
import loadScript from "@/common/js/loadScript.js";
import loadCss from "@/common/js/loadCss.js";
import {
      kjglfx
    } from '@/api/fxyp.js'

export default {
  data() {
    return {
      date:['2019-01','2020-09'],
      logForm: {},
      isShow: false,
      addressCon:[],
      mapData:[],
      addressName:[],
      addressValue:[],
      map: null,
      heatmap: null,
      mapConsts:{
  // 江西省范围
  extentJx: [113.57277, 24.488942, 118.482124, 30.079848],
  // 显示全国地图时的范围
  extentQg: [40.93120507614668, -4.898838628946014, 172.62495510997238, 59.89417413221303],
  // arcgis server默认origin
  originArcgisServer: [-400, 399.9999999999998],
  resolutions: [
    0.7031250000000002, 0.3515625000000001, 0.17578125000000006, 0.0624062618086491, 0.04394531353227711,
    0.021972656766138556, 0.010986328383069278, 0.005493164191534639, 0.0027465809060368165, 0.0013732916427489112,
    6.866458213744556E-4, 3.433229106872278E-4, 1.716614553436139E-4, 8.582953794130404E-5, 4.291595870115493E-5,
    2.1457979350577466E-5, 1.0728989675288733E-5, 5.363305107141452E-6, 2.681652553570726E-6
  ]
}
    };
  },
  methods: {
      /**
 * 创建蓝色底图
 */
createLayerArcgisXYZ () {
  var url = 'http://111.75.227.156:18984/xxzx_admin_site01/rest/services/JIANGXIQGBLUE/MapServer'
  url += '/tile/{z}/{y}/{x}'

  var tileGrid = new ol.tilegrid.TileGrid({
    origin: this.mapConsts.originArcgisServer, // 指定原点
    extent: this.mapConsts.extentQg, // 指定地图范围
    resolutions: this.mapConsts.resolutions.slice(3, 17) // 指定分辨率
  })
  // 创建图层
  return new ol.layer.Tile({
    source: new ol.source.XYZ({
      tileGrid,
      projection: 'EPSG:4326',
      url
    })
  })
},
plot (map,mapdata) {
  let el = document.getElementById('e_container')
  if (el) {
    el.parentNode.removeChild(el)
  }
  var heatData = {
    type: 'FeatureCollection',
    features: mapdata
    // [
    //   { type: 'Point', 'coordinates': [114.940278,25.85097], count: 100 },
    //   { type: 'Point', 'coordinates': [114.986373,25.85097], count: 150 },
    //   { type: 'Point', 'coordinates': [116.586373,28.111699], count: 100 },
    //   { type: 'Point', 'coordinates': [117.971185,28.44442], count: 419 },
    //   { type: 'Point', 'coordinates': [115.992811,29.712034], count: 319 },
    //   { type: 'Point', 'coordinates': [116.358351,27.98385], count: 719 },
    //   { type: 'Point', 'coordinates': [114.391136,27.8043], count: 519 },
    //   { type: 'Point', 'coordinates': [115.892151,28.676493], count: 319 },
    //   { type: 'Point', 'coordinates': [117.214664,29.29256], count: 139 },
    //   { type: 'Point', 'coordinates': [113.852186,27.622946], count: 129 },
    //   { type: 'Point', 'coordinates': [117.033838,28.238638], count: 190 },
    //   { type: 'Point', 'coordinates': [116.033838,28.238638], count: 190 },
    //   { type: 'Point', 'coordinates': [116.233838,28.238638], count: 190 },
    //   { type: 'Point', 'coordinates': [114.930835,27.810834], count: 189 }
    // ]
  }
  let vector = new ol.layer.Heatmap({
    // 矢量数据源
    source: new ol.source.Vector({
      features: (new ol.format.GeoJSON()).readFeatures(heatData),
    }),
    blur: 20, // 模糊尺寸
    radius: 20 // 热点半径
      })
      map.addLayer(vector);
    },
    getData(start,end){
    let data = {
       start:start,
       end:end
      };
      kjglfx(data).then(res => {   
          console.log(res);
          
         res.forEach(item =>{
             this.mapData.push(
               {
                type: 'Point', 'coordinates': [item[0]], count: item[1]
              }
        );
         });
        this.initMap(this.mapData);
       
    
      });
      err => {
        console.log(err);
      };
    },

  
    changeTime(val){
      if(val!=null){
        this.mapData=[];
         this.getData(v[0],v[1]);
      }
     
    },
   initMap(mapdata){
      // 创建中国蓝色底图
      var chinaBlue = this.createLayerArcgisXYZ()
      // 创建ol底图对象
      var map = new ol.Map({
        target: 'map', // 指定div
        layers: [
          chinaBlue
        ],
        // 指定视图，包括坐标系和中心
        view: new ol.View({
          center: [115.8, 28.8],
          projection: 'EPSG:4326',
        })
      })
      // 缩放至指定范围
      map.getView().fit(this.mapConsts.extentJx, map.getSize())

      this.plot(map,mapdata)
   }
  },
  mounted() {
     this.getData(201901,202009);
  },
  created() {
    loadCss("/static/hmap-js/ol.css");
    loadScript("/static//hmap-js/ol.js");
   
  }
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
