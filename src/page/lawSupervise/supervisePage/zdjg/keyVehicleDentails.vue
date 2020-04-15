<template>
  <div class="keyVehicleDentails">
    <!-- 车辆信息 -->
    <div class="shadow-box bg-white">
      <div class="table-style">
        <div class="info-box">
          <div class="title-box">
            <span class="title-blue"></span>
            <span class="title-text">车辆信息</span>
          </div>
          <table>
            <tr>
              <td class="table-bg">车牌号码</td>
              <td>京B123445</td>
              <td class="table-bg">车辆颜色</td>
              <td></td>
            </tr>
            <tr>
              <td class="table-bg">车属地</td>
              <td></td>
              <td class="table-bg">从业资格证</td>
              <td></td>
            </tr>
            <tr>
              <td class="table-bg">历史查处次数</td>
              <td></td>
              <td class="table-bg">监控状态</td>
              <td></td>
            </tr>
            <tr>
              <td class="table-bg">监管原因</td>
              <td></td>
              <td class="table-bg"></td>
              <td></td>
            </tr>

          </table>

        </div>

      </div>
    </div>
    <!-- 历史查处 -->
    <div class="shadow-box bg-white margin-top22px">
      <div class="info-box">
        <div class="title-box">
          <span class="title-blue"></span>
          <span class="title-text">历史查处</span>
        </div>
      </div>
      <div class="history-record">
          
      </div>
    </div>

    <!-- 当前轨迹             (驶入有数据时，地图展开） -->
    <div class="shadow-box bg-white margin-top22px">
      <div class="info-box">
        <div class="title-box">
          <span class="title-blue"></span>
          <span class="title-text">当前轨迹</span>
        </div>
      </div>
      <div class="map-box" style="height:200px">
        <el-amap vid="lawSupervise" mapStyle="amap://styles/whitesmoke" :center="center" :plugin="plugin" :amap-manager="amapManager" :zoom="zoom" :events="events" class="amap-demo">
          <!-- <el-amap-marker v-for="(marker,index) in markers" :key="index" :position="marker.position" :events="marker.events" :template="marker.template"></el-amap-marker> -->
        </el-amap>
      </div>
    </div>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";

import Vue from "vue";
import echarts from 'echarts';
import 'echarts/lib/chart/graph';
import { lawSuperviseObj, yjObj } from '@/page/lawSupervise/supervisePage/kshjg/echarts/echartsJson.js';
import { getZfjgLawSupervise, getBySiteId, getById } from '@/api/lawSupervise.js';
import { lawSuperviseMixins, mixinsCommon } from "@/common/js/mixinsCommon";

import AMap from 'vue-amap';
import { AMapManager } from 'vue-amap';

Vue.use(AMap);
AMap.initAMapApiLoader({
  key: '2fab5dfd6958addd56c89e58df8cbb37',
  plugin: ['Autocomplete', 'PlaceSearch', 'Scale', 'OverView', 'ToolBar', 'MapType',
    'PolyEditor', 'AMap.CircleEditor', 'lazyAMapApiLoaderInstance', 'Geolocation', 'Marker', 'Icon'],
  v: '1.4.4',
  uiVersion: '1.0.11',
  showLabel: false
});
let amapManager = new AMap.AMapManager();
export default {
  data() {
    return {
      visible: false,
      activeName: '道路运输证',
      checkSearchForm: {
        number: '',
        color: '1'
      },
      percentage: 30,
      formInline: {
        user: '',
        region: '',
        startTime: '',
        endTime: '',
        selectTime: '',
        status: '1',
        applyTime: '1',
      },
      center: [116.397428, 39.90923],
      zoom: 16,
      amapManager,
      events: {
        init(map) {
          // AMapUI.loadUI(['overlay/SimpleMarker'], function(SimpleMarker) {
          // const marker = new SimpleMarker({
          // iconStyle: 'red',
          // map: [],
          // position: map.getCenter()
          // });
          // });
        }
      },

      plugin: [{
        pName: 'ToolBar',
        position: 'RB'
      }, {
        pName: 'Scale',
        position: 'RB'
      }, {
        pName: 'Geolocation',
        position: 'RB',
        events: {
          init(o) {
            // o 是高德地图定位插件实例
            o.getCurrentPosition((status, result) => {
              if (result && result.position) {
                self.currentAddressObj = result.addressComponent;
                self.lng = result.position.lng;
                self.lat = result.position.lat;
                self.center = [self.lng, self.lat];
                self.loaded = true;
                self.$nextTick();
              }
            });
          }
        }
      },
      {
        pName: 'PlaceSearch',
        renderStyle: 'default',
        events: {
        },
      }
      ],
    };
  },
  inject: ["reload"],
  mixins: [mixinGetCaseApiList],
  methods: {
    showModal(data) {
      console.log(data);
      this.visible = true;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.checkSearchForm = {
        number: '',
        color: ''
      };
    },
    gotoCoerciveMeasureDoc() {
      this.$store.dispatch("deleteTabs", this.$route.name);
      this.$router.push({ name: 'removeOrPrelong' })
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    }
  },
  mounted() { }
};
</script>
<style lang="scss">
@import "@/assets/css/cluesReview.scss";
</style>