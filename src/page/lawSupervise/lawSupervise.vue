<template>
<!--  执法监管首页 by-jingli -->
<div id="lawSupervise" ref="lawSupervise" class="mainBox" >
    <div class="amap-page-container">
        <!-- amap://styles/whitesmoke -->
            <!-- :features="['road','bg', 'building']" -->
        <el-amap vid="lawSupervise"
            :mapStyle="style"
            :center="center"
            :plugin="plugin"
            :amap-manager="amapManager"
            :zoom="zoom"
            :events="events"
            class="amap-demo">
            <el-amap-marker v-for="(marker,index) in markers" :key="index" :position="marker.position" :events="marker.events">
            </el-amap-marker>
            <el-amap-info-window v-if="curWindow" :visible="curWindow.visible" :position="curWindow.position">
                 <div :class="slotStyle" >
                     <!-- 0执法人员 -->
                     <div v-if="curWindow.category == 0">
                        <div>{{curWindow.other.nickName}}
                            <div class="right">{{curWindow.other.enforceNo}}</div>
                        </div>
                        <div class="flexBox">
                            <div class="con">
                                <p>{{curWindow.other.address}}</p>
                                <p>{{curWindow.other.mobile}}</p>
                            </div>
                            <div class="status">
                                <i class="iconfont law-mobile-phone"></i>
                                <p>在线</p>
                            </div>
                        </div>

                        <div class="btns">
                            <i class="iconfont law-mobile"></i>
                            <i class="iconfont law-shipin"></i>
                            <i class="iconfont law-jiankong"></i>
                            <i class="iconfont law-msg-box"></i>
                            <i class="iconfont law-xianlu"></i>
                        </div>
                     </div>
                     <!-- 1执法机构 -->
                     <div v-else-if="curWindow.category == 1"></div>
                     <!-- 2执法车辆 -->
                     <div v-else-if="curWindow.category == 2"></div>
                     <!-- 3执法船舶 -->
                     <div v-else-if="curWindow.category == 3"></div>
                     <!-- 4非现场治超检测 -->
                     <div v-else-if="curWindow.category == 4"></div>
                     <!-- 5监管企业 -->
                     <div v-else-if="curWindow.category == 5"></div>
                     <!-- 6监管车辆 -->
                     <div v-else-if="curWindow.category == 6"></div>
                     <div v-else></div>

                </div>
            </el-amap-info-window>
        </el-amap>
        <div class="toolbar">
            <span v-if="loaded">
            location: lng = {{ lng }} lat = {{ lat }}
            </span>
            <span v-else>正在定位</span>
        </div>
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
        <el-amap-search-box class="search-box" ref="searchAmapBox" :search-option="searchOption" :on-search-result="searchAll">
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
                        <li v-for="subItem in item.children" :key="subItem.name" @click="searchByTab(subItem)">
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
            <div class="echarts-box" v-show="status1">
                <em class="title left">近三个月执行情况</em>
                <i class="iconfont law-delete1 right" @click="status1 = false"></i>
                <div id="echartsBox1" class="amap-chart"></div>
            </div>
        </transition>
         <transition name="el-fade-in">
            <div class="echarts-box" v-show="status2">
                <em class="title left">近三个月查处排行</em>
                <i class="iconfont law-delete1 right" @click="status2 = false"></i>
                <div class="amap-chart">
                    <el-table
                    v-loading="loading"
                        :data="tableData"
                        style="width: 100%">
                        <el-table-column
                            type="index"
                            label="排名"
                            width="50">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="车牌号/企业名称"
                            width="140"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="num"
                            label="查处次数"
                            width="100"
                            >
                        </el-table-column>
                    </el-table>
                </div>
            </div>
         </transition>
    </div>
    <div class="amap-right-position" v-show="status3">
        <div class="echarts-box">
            <em class="title left">车辆预警</em>
            <i class="iconfont law-delete1 right" @click="status3 = false"></i>
            <div id="echartsBox2" class="amap-chart"></div>
        </div>
    </div>
    <!-- <div class="amap-main-content">

    </div> -->
        <!-- 标记 -->
        <!-- <el-amap-marker v-for="(marker, index) in markers" :position="marker" :key="index"></el-amap-marker> -->

</div>
</template>
<script>
import Vue from "vue";
import echarts from 'echarts';
import 'echarts/lib/chart/graph';
import {lawSuperviseObj,yjObj} from './echarts/echartsJson';
import {getZfjgLawSupervise} from '@/api/lawSupervise.js';
import { lawSuperviseMixins } from "@/common/js/mixinsCommon";

import AMap from 'vue-amap';
import { AMapManager } from 'vue-amap';

Vue.use(AMap);
AMap.initAMapApiLoader({
    key: '2fab5dfd6958addd56c89e58df8cbb37',
    plugin: ['Autocomplete', 'PlaceSearch', 'Scale', 'OverView', 'ToolBar', 'MapType',
    'PolyEditor', 'AMap.CircleEditor', 'lazyAMapApiLoaderInstance', 'Geolocation', 'Marker'],
    v: '1.4.4',
    uiVersion: '1.0.11',
    showLabel: false
});
// AMap.service(["AMap.PlaceSearch"], function () {
//     //构造地点查询类
//     placeSearch = new AMap.PlaceSearch({
//     pageSize: 5, // 单页显示结果条数
//     pageIndex: 1, // 页码
//     citylimit: false,  //是否强制限制在设置的城市内搜索
//     map: map, // 展现结果的地图实例
//     panel: "panel", // 结果列表将在此容器中进行展示。
//     autoFitView: true, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
//     renderStyle: 'default'
//     });

// });
// 添加列表点选监听事件
// AMap.event.addListener(placeSearch, "selectChanged", this.selectAddress);
let amapManager = new AMap.AMapManager();

export default {
    // el: '#lawSupervise',
    name: 'lawSupervise',
    data () {
        let self = this;
        return {
            windows: [],
            curWindow: null,
            default: '',
            slotStyle: 'lawWindowStyle1',
            status1: true,
            status2: true,
            status3: true,
            lawSuperviseObj,
            yjObj,
            currentTabIndex: null,
            category: -1,
            tabList: [{
                name: '队伍力量',
                children: [{
                    name: '执法人员',
                    icon: '',
                    code: 0
                },{
                    name: '执法机构',
                    icon: '',
                    code: 1
                },{
                    name: '执法车辆',
                    icon: '',
                    code: 2
                },{
                    name: '执法船舶',
                    icon: '',
                    code: 3
                }]
            },{
                name: '应用场景',
                children: [{
                    name: '非现场站点',
                    icon: '',
                    code: 4
                },{
                    name: '视频监控',
                    icon: '',
                    code: 7
                },{
                    name: '固定站点',
                    icon: '',
                    code: null
                },{
                    name: '卫星影像',
                    icon: '',
                    code: null
                },{
                    name: '黑名单车辆',
                    icon: '',
                    code: null
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
                show: '执法船舶',
                code: 3,
                placeholder: '请输入站点名称'
            },{
                show: '非现场治超检测点',
                code: 4,
                placeholder: '请输入站点名称'
            },{
                show: '监管企业',
                code: 5,
                placeholder: '请输入企业名称'
            },{
                show: '监管车辆',
                code: 6,
                placeholder: '请输入车牌号码'
            },{
                show: '视频监控',
                code: 7,
                placeholder: '请输入'
            }],
            center: [116.397428, 39.90923],
            searchOption: {
                city: '北京',
                citylimit: true
            },
            currentAddressObj: null,
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
            loaded: false,
            lng: 0,
            lat: 0,
            plugin: [{
                pName: 'ToolBar',
                position: 'RB'
            }, {
                pName: 'Scale',
                position: 'RB'
            },{
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
            markers: []
        }
    },
    methods: {
        eve(marker) {
            debugger
            marker.visible = true
        },
        onSearchResult(pois, category) {
          let latSum = 0;
          let lngSum = 0;
          if (pois.length > 0) {
            let _this = this;
            let windows = []
            pois.forEach((poi,i) => {
                let {lng, lat} = poi;
                lngSum += lng;
                latSum += lat;
                let that = _this
                if (category != -1) {
                    _this.markers.push({
                        position:[poi.lng, poi.lat],
                        other: poi.other,
                        visible: false,
                        iconStyle: 'red',
                        // icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png',
                        // content: `<div class="prompt">${ poi.other.username }</div>`,
                        events: {
                            click() {
                                that.windows.forEach(window => {
                                    window.visible = false;
                                });

                                that.curWindow = that.windows[i];
                                console.log(that.curWindow);
                                that.$nextTick(() => {
                                    that.curWindow.visible = true;
                                });
                            }
                        }
                    });
                } else {
                    _this.markers.push({
                        position: [poi.lng, poi.lat],
                        visible: false,
                        // icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png',
                        content: null,
                        iconStyle: 'red',
                        events: {
                            click() {
                                that.windows.forEach(window => {
                                    window.visible = false;
                                });

                                that.curWindow = that.windows[i];
                                console.log(that.curWindow);
                                that.$nextTick(() => {
                                    that.curWindow.visible = true;
                                });
                            }
                        }
                    })
                }
                windows.push({
                    position: [poi.lng, poi.lat],
                    category: category,
                    other: poi.other,
                    visible: false
                });
            });
            let center = {
              lng: lngSum / pois.length,
              lat: latSum / pois.length
            };
            console.log(this.curWindow);
            this.windows = windows;
            this.center = [center.lng, center.lat];
          }
        },
        searchByTab (item) {
            this.category = item.code
            let data = {
                    // area: this.currentAddressObj.province + this.currentAddressObj.district,
                    area: '东城区',
                    current: 1,
                    key: '',
                    size: 0,
                    type: item.code
                }
            this.getZfjgLawSupervise(data)
        },
        searchAll (pois) {
            this.markers.splice(0, this.markers.length)
            if (this.category == -1) {
                this.onSearchResult(pois, this.category);
                // 搜索地图位置
            } else {
                // this.currentAddressObj.province + this.currentAddressObj.district
                let data = {
                    area: '',
                    current: 1,
                    key: this.$refs.searchAmapBox.keyword,
                    size: 0,
                    type: this.category
                }
                this.getZfjgLawSupervise(data)
            }
        },
        getZfjgLawSupervise (data) {
            let _this = this
            new Promise((resolve, reject) => {
                    getZfjgLawSupervise(data).then(
                        res => {
                            // resolve(res);
                            let resultList = []
                            res.data.records.forEach((item,i)=>{
                                let position = item.position.split(',');
                                let lng = parseFloat(position[0]);
                                let lat = parseFloat(position[1]);
                                resultList.push({
                                    address: item.address,
                                    distance: null,
                                    id: item.id,
                                    lat: lat,
                                    lng: lng,
                                    location: {
                                        O: lng,
                                        P: lat,
                                        lat: lat,
                                        lng: lng
                                    },
                                    name: item.nickName,
                                    shopinfo: '',
                                    tel: '',
                                    type: _this.category,
                                    other: item
                                })
                            })

                            _this.onSearchResult(resultList, _this.category)
                        },
                        error => {
                            reject(error);
                        })
                })
        }
    },
    mounted () {
        var flowChart = echarts.init(document.getElementById('echartsBox1'))
        flowChart.setOption(this.lawSuperviseObj.option)
        var flowChart1 = echarts.init(document.getElementById('echartsBox2'))
        flowChart1.setOption(this.yjObj)
        this.getRealTimeDataByLawSupervise()
    },
    mixins: [
        lawSuperviseMixins
    ],
    components: {
        // echarts,
    }
}
</script>
<style lang="scss">
@import "@/assets/css/lawSupervise/lawSupervise.scss";
</style>
