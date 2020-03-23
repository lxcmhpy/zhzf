<template>
<!--  队伍力量 by-jingli -->
<div id="teamStrength" ref="teamStrength" class="mainBox" >
    <div class="amap-page-container">
        <el-amap vid="teamStrength"
            mapStyle="normal"
            :center="center"
            :plugin="plugin"
            :amap-manager="amapManager"
            :zoom="zoom"
            :events="events"
            class="amap-demo">

        </el-amap>
    </div>
    <div class="amap-search">
        <el-select
            v-model="searchObj.category"
            placeholder="请选择">
            <el-option
            v-for="(item,index) in categoryList"
            :key="index"
            :label="item.show"
            :value="item.code"
            ></el-option>
        </el-select>
        <el-input v-model="searchObj.searchValue" :placeholder="categoryList[searchObj.category].placeholder"></el-input>
        <el-button icon="el-icon-search" ></el-button>
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
         <!-- <el-button >
             <i class="iconfont law-guanli"></i>
             应用场景
         </el-button> -->

     </div>
        <!-- 标记 -->
        <!-- <el-amap-marker v-for="(marker, index) in markers" :position="marker" :key="index"></el-amap-marker> -->

</div>
</template>
<script>
import Vue from "vue";
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
    // el: '#teamStrength',
    name: 'teamStrength',
    data () {
        return {
            currentTabIndex: 0,
            searchObj: {
                category: '0',
                searchValue: ''
            },
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
                code: '0',
                placeholder: '请输入位置信息'
            },{
                show: '执法人员',
                code: '1',
                placeholder: '请输入执法人员名称'
            },{
                show: '执法机构',
                code: '2',
                placeholder: '请输入执法机构名称'
            },{
                show: '执法车辆',
                code: '3',
                placeholder: '请输入车牌号'
            },{
                show: '非现场治超检测点',
                code: '4',
                placeholder: '请输入站点名称'
            },{
                show: '视频监控',
                code: '5',
                placeholder: '请输入站点名称'
            },{
                show: '监管车辆',
                code: '6',
                placeholder: '请输入车牌号码'
            },{
                show: '监管企业',
                code: '7',
                placeholder: '请输入企业名称'
            }],
            center: [116.397428, 39.90923],
            zoom: 12,
            amapManager,
            events: {
                init(map) {
                    AMapUI.loadUI(['overlay/SimpleMarker'], function(SimpleMarker) {
                        const marker = new SimpleMarker({
                        iconLabel: 'A',
                        iconStyle: 'red',
                        map: map,
                        position: map.getCenter()
                        });
                    });
                }
            },
            plugin: [{
                pName: 'ToolBar',
                position: 'RB'
            }, {
                pName: 'Scale',
                position: 'RB'
            }]
        }
    },
    methods: {
    },
    mounted () {
    }
}
</script>
<style lang="scss">
@import "@/assets/css/lawSupervise/lawSupervise.scss";
</style>
