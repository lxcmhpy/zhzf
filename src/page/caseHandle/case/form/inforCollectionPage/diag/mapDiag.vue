<template>
  <div class="dialo">
    <el-dialog
      title="选择位置信息"
      :visible.sync="visible"
      width="50%"
      @close="closeDialog"
      :close-on-click-modal="false"
      :modal-append-to-body='false'
    >
      <div class="mapCon">
        <el-amap
          vid="myMap"
          class="amap-demo"
          :center="center"
          :plugin="plugin"
          :amap-manager="amapManager"
          :zoom="zoom"
          :events="events"
        >
         
          <el-amap-marker :position="componentMarker.position"></el-amap-marker>
        </el-amap>
        <div class="toolbar">
          <span v-if="loaded">经度: {{ lng }}    纬度 {{ lat }}</span>
          <span v-else>正在定位</span>
          <el-button type="primary" @click="sendLngLat">确定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Vue from "vue";
import VueAMap from "vue-amap";
import { AMapManager } from "vue-amap";

Vue.use(VueAMap);
console.log('VueAMap',VueAMap)
VueAMap.initAMapApiLoader({
  key: "2fab5dfd6958addd56c89e58df8cbb37",
  plugin: [
    "AMap.Autocomplete",
    "AMap.PlaceSearch",
    "AMap.Scale",
    "AMap.OverView",
    "AMap.ToolBar",
    "Geolocation",
    "Geocoder"
  ],
  v: "1.4.4",
  uiVersion: "1.0.11",
  showLabel: false
});
let amapManager = new VueAMap.AMapManager();
console.log('amapManager',amapManager)
export default {
  data() {
    let self = this;
    return {
      visible: false,
      center: [116.397428, 39.90923],
      zoom: 16,
      amapManager,
      lng: 0,
      lat: 0,
      address:"",
      loaded: false,
      plugin: [
          {pName: "ToolBar",},{pName: "Scale",},{pName: "Geocoder",},
          {
          pName: 'Geolocation',
          events: {
            //   init(o) {                
            //       console.log(o)
            //       // o 是高德地图定位插件实例
            //     o.getCurrentPosition((status, result) => {
            //       console.log(status,result);
            //       if (result && result.position) {
            //         console.log("result",result);
            //         self.lng = result.position.lng;
            //         self.lat = result.position.lat;
            //         self.address = result.formattedAddress;
            //         self.center = [self.lng, self.lat];
            //         self.loaded = true;
            //         self.componentMarker.position=[self.lng, self.lat]
            //         self.$nextTick();
            //       }else{
            //         alert('定位失败！');
            //         self.loaded = true;
            //         self.$nextTick();
            //       }
            //     });
            //   },

              init (o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  console.log(result.addressComponent)
                  self.currentAddressObj = result.addressComponent;
                  self.lng = result.position.lng;
                  self.lat = result.position.lat;
                //   self.address = result.formattedAddress;
                  self.center = [self.lng, self.lat];
                  self.loaded = true;
                  self.componentMarker.position=[self.lng, self.lat];
                  self.$nextTick();
                } else {
                  o.getCityInfo((status, result) => {
                    if (result && result.city) {
                      self.currentAddressObj = result;
                      self.lng = result.center[0];
                      self.lat = result.center[1];
                      self.center = result.center;
                      self.loaded = true;
                      self.componentMarker.position=[self.lng, self.lat];
                      self.$nextTick();
                      self.zoom = 11
                    } else {
                      self.$message({
                        type: "error",
                        message: result.message
                      });
                    }
                  });
                }
              });
            }
          }
      }],
      events: {
        init(map) {
        },
        // click: e => {
        //   console.log('e',e)
        //   self.lng = e.lnglat.lng;
        //   self.lat = e.lnglat.lat;
        //   self.componentMarker.position=[e.lnglat.lng, e.lnglat.lat]
        // },
        dragging:e=>{
          //拖动地图，点标记固定在可视区域中心
          console.log('dragstart e',e.target);
          console.log('amapManager',amapManager);
          let newCenter = amapManager._map.getCenter();
          console.log('newCenter',newCenter)
          self.lng = newCenter.lng;
          self.lat = newCenter.lat;
          self.componentMarker.position=[newCenter.lng, newCenter.lat];
          // self.mapAddr();
          self.getaddress([self.lng,self.lat])

        }
      },
    //mark 位置
      componentMarker: {
        position: [0, 0]
      }
    };
  },
  inject: ["reload"],
  methods: {
    showModal() {
      this.visible = true;
    },
    closeDialog() {
      this.visible = false;
    },
    //获取经纬度
    sendLngLat(){
        let lngLatStr = [this.lng,this.lat].join(',');
        console.log('lngLatStr',lngLatStr);
         this.visible = false;
         this.$emit('getLngLat',lngLatStr,this.address);
    },
    //逆解码函数
    getaddress: function(lnglat) {
      let self=this;
      
      var geocoder = new AMap.Geocoder({
        radius: 1000,
        extensions: "all"
      });        
      geocoder.getAddress(lnglat, function(status, result) {
        if (status === 'complete' && result.info === 'OK') {
          if (result && result.regeocode) {
            self.address = result.regeocode.formattedAddress;
            self.$nextTick();
          }
        }
      }); 
    },
  },
  mounted() {}
};
</script>
<style lang="scss">
.mapCon{
    position: relative;
    .amap-demo {
        height: 300px;
        width: auto;
    }
    .toolbar{
        position: absolute;
        right: 10px;
        bottom: 10px;
        padding: 10px;
        box-shadow: 0 0 3px #ccc;
        background: #fff;
    }
}

</style>


