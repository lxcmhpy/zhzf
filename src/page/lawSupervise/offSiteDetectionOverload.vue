<template>
<!--  执法监管首页 by-jingli -->
<div id="lawSupervise" ref="lawSupervise" class="mainBox" >
    <div class="amap-page-container">
        <el-amap vid="lawSupervise"
            mapStyle="normal"
            :center="center"
            :plugin="plugin"
            :amap-manager="amapManager"
            :zoom="zoom"
            :events="events"
            class="amap-demo">
            <el-amap-marker v-for="(marker,index) in markers" :key="index" :position="marker" ></el-amap-marker>
        </el-amap>
    </div>
    <div class="amap-search">
        <el-select
            v-model="category"
            placeholder="请选择">
            <el-option
            v-for="(item,index) in categoryList"
            :key="index"
            :label="item.show"
            :value="item.code"
            ></el-option>
        </el-select>
        <!-- {{category}}  --- {{categoryList[category].placeholder}} -->
        <!-- <el-input v-model="searchObj.searchValue" :placeholder="categoryList[searchObj.category].placeholder"></el-input> -->
        <el-amap-search-box class="search-box"   :search-option="searchOption" :on-search-result="searchAll">
            <input name="aa" :value="333">
        </el-amap-search-box>
        <!-- <el-button icon="el-icon-search" @click="onSearchResult()"></el-button> -->
         <!-- <el-amap-search-box :search-option="searchOption" :on-search-result="onSearchResult">
             <i class="el-icon-search"></i>
         </el-amap-search-box> -->
    </div>
     <div class="amap-tool">
         <el-button v-for="(item,index) in tabList" :key="index"
          @click="currentTabIndex === index ? currentTabIndex = null : currentTabIndex = index">
             <i class="iconfont law-guanli"></i>
             {{item.name}}
             <transition name="el-zoom-in-top">
                <div class="drop-down-menu transition-box" v-if="currentTabIndex == index">
                    <i class="el-icon-caret-top"></i>
                    <ul>
                        <li v-for="subItem in item.children" :key="subItem.name">
                            <i class="iconfont law-guanli"></i>
                            <p>{{subItem.name}}</p>
                        </li>
                    </ul>
                </div>
             </transition>
         </el-button>
     </div>
    <div class="amap-main-content">
        <transition name="el-fade-in">
            <div class="echarts-box" v-show="status1" style="width:380px">
                <em class="title left">非现场执法点</em>
                <i class="iconfont law-delete1 right" @click="status1 = false"></i>
                <div class="amap-chart">
                    <el-table
                    v-loading="loading"
                        :data="tableData"
                        style="width: 100%">
                        <el-table-column
                            type="index"
                            label="站点名称"
                            width="80">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="超限查处量"
                            width="100"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="num"
                            label="黑名单"
                            width="70"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="num"
                            label="过检总量"
                            width="80"
                            >
                        </el-table-column>
                        <el-table-column
                            label="状态"
                            width="50"
                            >
                            <template>
                                <circle style="background: green;"></circle>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </transition>
         <transition name="el-fade-in">
            <div class="echarts-box" v-show="status2" style="width: 540px">
                <em class="title left">告警车辆</em>
                <i class="iconfont law-delete1 right" @click="status2 = false"></i>
                <div class="amap-chart">
                    <el-table
                    v-loading="loading"
                        :data="tableData"
                        style="width: 100%">
                        <el-table-column
                            type="index"
                            label="过检时间"
                            width="80">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="车牌号"
                            width="90"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="num"
                            label="超载率"
                            width="70"
                            >
                        </el-table-column>
                         <el-table-column
                            prop="num"
                            label="车属地"
                            width="70"
                            >
                        </el-table-column>
                         <el-table-column
                            prop="num"
                            label="黑名单"
                            width="70"
                            >
                        </el-table-column>
                         <el-table-column
                            prop="num"
                            label="历史查处"
                            width="80"
                            >
                        </el-table-column>
                         <el-table-column
                            prop="num"
                            label="站点名称"
                            width="80"
                            >
                        </el-table-column>
                    </el-table>
                </div>
            </div>
         </transition>
    </div>
    <!-- <div class="amap-main-content">

    </div> -->
        <!-- 标记 -->
        <!-- <el-amap-marker v-for="(marker, index) in markers" :position="marker" :key="index"></el-amap-marker> -->

</div>
</template>
<script>
import Vue from "vue";
import echarts from 'echarts'
import 'echarts/lib/chart/graph'
import {lawSuperviseObj,yjObj} from './echarts/echartsJson'
import {getZfjgLawSupervise} from '@/api/lawSupervise.js'
import { mixinsCommon } from "@/common/js/mixinsCommon";
import AMap from 'vue-amap';
import { AMapManager } from 'vue-amap';

Vue.use(AMap);
AMap.initAMapApiLoader({
    key: '2fab5dfd6958addd56c89e58df8cbb37',
    plugin: ['Autocomplete', 'PlaceSearch', 'Scale', 'OverView', 'ToolBar', 'MapType', 'PolyEditor', 'AMap.CircleEditor', 'lazyAMapApiLoaderInstance'],
    v: '1.4.4',
    uiVersion: '1.0.11',
});
let amapManager = new AMap.AMapManager();

export default {
    // el: '#lawSupervise',
    name: 'lawSupervise',
    data () {
        return {
            status1: true,
            status2: true,
            status3: true,
            // tableData: [{
            //     name: '京A12345',
            //     num: '123'
            // },{
            //     name: '粤C12345',
            //     num: '333'
            // },{
            //     name: '津B12345',
            //     num: '2'
            // },{
            //     name: '冀C12345',
            //     num: '89'
            // }],
            lawSuperviseObj,
            yjObj,
            currentTabIndex: null,
            category: 0,
            // searchObj: {
            //     category: 0,
            //     searchValue: ''
            // },
            tabList: [{
                name: '队伍力量',
                children: [{
                    name: '执法人员',
                    icon: ''
                },{
                    name: '执法机构',
                    icon: ''
                },{
                    name: '执法车辆',
                    icon: ''
                },{
                    name: '执法船舶',
                    icon: ''
                }]
            },{
                name: '应用场景',
                children: [{
                    name: '非现场站点',
                    icon: ''
                },{
                    name: '视频监控',
                    icon: ''
                },{
                    name: '固定站点',
                    icon: ''
                },{
                    name: '卫星影像',
                    icon: ''
                },{
                    name: '黑名单车辆',
                    icon: ''
                }]
            }],
            categoryList: [{
                show: '地图位置',
                code: -1,
                placeholder: '请输入位置信息'
            },{
                show: '执法人员',
                code: 0,
                placeholder: '请输入执法人员名称'
            },{
                show: '执法机构',
                code: 1,
                placeholder: '请输入执法机构名称'
            },{
                show: '执法车辆',
                code: 2,
                placeholder: '请输入车牌号'
            },{
                show: '非现场治超检测点',
                code: 4,
                placeholder: '请输入站点名称'
            },{
            //     show: '视频监控',
            //     code: '5',
            //     placeholder: '请输入站点名称'
            // },{
                show: '监管车辆',
                code: 6,
                placeholder: '请输入车牌号码'
            },{
                show: '监管企业',
                code: 5,
                placeholder: '请输入企业名称'
            }],
            center: [116.397428, 39.90923],
            searchOption: {
                city: '北京',
                citylimit: false
            },
            zoom: 12,
            amapManager,
            events: {
                init(map) {
                    AMapUI.loadUI(['overlay/SimpleMarker'], function(SimpleMarker) {
                        // const marker = new SimpleMarker({
                        // iconStyle: 'red',
                        // map: [],
                        // position: map.getCenter()
                        // });
                    });
                }
            },
            plugin: [{
                pName: 'ToolBar',
                position: 'RB'
            }, {
                pName: 'Scale',
                position: 'RB'
            }],
            markers: []
        }
    },
    methods: {
         onSearchResult(pois) {
          let latSum = 0;
          let lngSum = 0;
          debugger;
          this.markers.splice(this.markers.length)
          if (pois.length > 0) {
            pois.forEach(poi => {
              let {lng, lat} = poi;
              lngSum += lng;
              latSum += lat;
              this.markers.push([poi.lng, poi.lat]);
            });
            let center = {
              lng: lngSum / pois.length,
              lat: latSum / pois.length
            };
            this.mapCenter = [center.lng, center.lat];
          }
            // AMapUI.loadUI(['overlay/SimpleMarker'], function(SimpleMarker) {
            //     const marker = new SimpleMarker({
            //     iconLabel: 'A',
            //     iconStyle: 'red',
            //     map: map,
            //     position: map.getCenter()
            //     });
            // });
        },
        searchAll (pois) {
            debugger
            console.log(this.searchOption)
            this.onSearchResult(pois);
            if (this.category == -1) {
                // 搜索地图位置
            } else {
                if (pois.length > 0) {
                    let type = this.category
                    let name = pois[0].name
                    new Promise((resolve, reject) => {
                        getZfjgLawSupervise(type,name).then(
                            res => {
                                debugger
                                resolve(res);
                            },
                            error => {
                                reject(error);
                            })
                    })
                }
            }
        }
    },
    mounted () {
        // var flowChart = echarts.init(document.getElementById('echartsBox1'))
        // flowChart.setOption(this.lawSuperviseObj.option)
        // var flowChart1 = echarts.init(document.getElementById('echartsBox2'))
        // flowChart1.setOption(this.yjObj)
        this.getRealTimeDataByLawSupervise()
    },
    mixins: [mixinsCommon],
    components: {
        // echarts,
    }
}
</script>
<style lang="scss">
@import "@/assets/css/lawSupervise/lawSupervise.scss";
</style>
