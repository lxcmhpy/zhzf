<template>
    <div class="dataScreen">
        <div class="border-line-dark">
            <div class="border-line-cover">
                <ul class="left first">
                    <li class="line" v-for="item in 5" :key="item.toString()"></li>
                    <li class="line last" ></li>
                    <li class="line margin0" ></li>
                    <li class="line margin0" ></li>
                    <li class="circle"></li>
                    <li class="line margin0" ></li>
                    <li class="circle"><span class="el-icon-plus"></span></li>
                    <li class="line margin0" ></li>
                    <li class="circle"></li>
                    <li class="line margin0" ></li>
                    <li class="line margin0" ></li>
                </ul>
                <div style="clear:both"></div>
            </div>
            <div style="width: 300px; height: 300px;position:absolute;top:0px;z-index:1000;">
                <div style="width: 300px; height: 300px;" ref="echartsPie"></div>
            </div>
             <div style="width: 300px; height: 300px;position:absolute;top:0px;left: 300px;z-index:1000;">
                <div style="width: 300px; height: 300px;" ref="echartsPie1"></div>
            </div>
             <div style="width: 500px; height: 300px;position:absolute;top:0px;top: 300px;z-index:1000;">
                <div style="width: 500px; height: 300px;" ref="echartsLine"></div>
            </div>
            <div style="width: 100%;height: 100%;position:absolute;top:0px;">
                <el-amap vid="map" mapStyle="amap://styles/darkblue" :plugin="plugin" :events="events" :center="[107.4976,32.1697]" :amap-manager="amapManager" :zoom="4" >
                </el-amap>
                <!-- <div id="map"></div> -->
            </div>
        </div>
    </div>
</template>
<style src="@/assets/css/catsDataScreen.scss" lang="scss"></style>
<script>
import Vue from "vue";
import echarts from "echarts";
import AMap from "vue-amap";
import { AMapManager, lazyAMapApiLoaderInstance,Object3D,Object3DLayer } from "vue-amap";
Vue.use(AMap);
AMap.initAMapApiLoader({
  key: "2fab5dfd6958addd56c89e58df8cbb37",
  plugin: [
      "Autocomplete",
    "PlaceSearch",
    "Scale",
    "OverView",
    "ToolBar",
    "MapType",
    "PolyEditor",
    "AMap.CircleEditor",
    // "lazyAMapApiLoaderInstance",
    "Geolocation",
    "Marker",
    "Icon",
    "LngLat",
    "DistrictSearch"
    // "Object3D",
    // "Object3DLayer",
    // "Object3D.MeshLine"
  ],
  v: "1.4.4",
  uiVersion: "1.0.11",
  rotateEnable:true,
  viewMode: '3D'
    // zoom: 1
});
let amapManager = new AMap.AMapManager();

export default {
    data () {
        let _self = this;
        return {
            amapManager,
            plugin: [],
            events: {
                init (o) {
                    lazyAMapApiLoaderInstance.load().then(() => {
                        _self.setLine();
                        _self.drawPie();
                    });
                }
            }
        }
    },
    methods: {
            // 绘制路径
        setLine() {
            let map = this.amapManager.getMap();

            AMapUI.loadUI(['geo/DistrictExplorer'], DistrictExplorer => {
                var districtExplorer = new DistrictExplorer({
                    map: map,
                    zoom: 0
                });
                var adcode = 100000;
                districtExplorer.loadAreaNode(adcode, function(error, areaNode) {
                    //清除已有的绘制内容
                    districtExplorer.clearFeaturePolygons();
                    //绘制子区域
                    // districtExplorer.renderSubFeatures(areaNode, function(feature, i) {
                    //     return {
                    //         bubble: true,
                    //         strokeColor: "#002a49", //线颜色
                    //         strokeOpacity: 3, //线透明度
                    //         strokeWeight: 2, //线宽
                    //         fillColor: null, //填充色
                    //         fillOpacity: 0.1, //填充透明度
                    //         color:'white'
                    //     };
                    // });
                        //绘制父级区划，仅用黑色描边
                    districtExplorer.renderParentFeature(areaNode, {
                        cursor: 'default',
                        bubble: true,
                        strokeOpacity: 1,
                        strokeColor: '#002a49', //线颜色
                        fillColor: null,
                        strokeWeight: 5, //线宽
                        zIndex:0,
                        zoom:-1
                    });
                });
            })


            AMapUI.loadUI(['misc/PathSimplifier'], function(PathSimplifier) {
                if (!PathSimplifier.supportCanvas) {
                alert('当前环境不支持 Canvas！');
                return;
                }
                var pathSimplifierIns = new PathSimplifier({
                    zIndex: 100,
                    zoom: 10,
                    autoSetFitView: false,
                    map: map, // 所属的地图实例
                    getPath: function(pathData, pathIndex) {
                    return pathData.path;
                    },
                    getHoverTitle: function(pathData, pathIndex, pointIndex) {
                    if (pointIndex >= 0) {
                        //point
                        return pathData.name + '，点：' + pointIndex + '/' + pathData.path.length;
                    }
                    return pathData.name + '，点数量' + pathData.path.length;
                    },
                    renderOptions: {
                        renderAllPointsIfNumberBelow: 1, // 绘制路线节点，如不需要可设置为-1
                        pathNavigatorStyle: {
                            "initRotateDegree": 0,
                            "width": 14,
                            "height": 14,
                            "autoRotate": true,
                            "lineJoin": "round",
                            "content": "defaultPathNavigator",
                            "fillStyle": "orange",
                            "strokeStyle": "rgba(254,254,40,0.4)",
                            "borderWidth": 3,
                            "lineWidth": 2,
                            "pathLinePassedStyle": {
                                "lineWidth": 3,
                                // rgba(21,164,254,1)
                                "strokeStyle": "orange",
                                "borderWidth": 1,
                                "borderStyle": "rgba(254,254,40,0.6)",
                                "dirArrowStyle": true
                            }
                        },
                        pathLineSelectedStyle: {
                            "lineWidth": 1,
                            "strokeStyle": "orange",
                            "borderWidth": 1,
                            "borderStyle": "transparent",
                            "dirArrowStyle": true
                        },
                        pathLineStyle: {
                            // "radius": '100% 0 0 100%/50%',
                            "lineWidth": 2,
                            "strokeStyle": "rgba(250,208,32,0.8)",
                            "borderWidth": 1,
                            "borderStyle": "transparent",
                            "dirArrowStyle": true
                        },
                        startPointStyle: {
                            "radius": 20,
                            "fillStyle": "rgba(235,220,40,0.9)",
                            "lineWidth": 17,
                            "strokeStyle": "rgba(160,142,29,0.3)"
                        },
                        endPointStyle: {
                            "radius": 20,
                            "fillStyle": "rgba(235,220,40,0.9)",
                            "lineWidth": 17,
                            "strokeStyle": "rgba(160,142,29,0.3)"
                        }
                    }
                });
                // 设定数据源数组，并触发重新绘制。data为空时将清除显示内容。
                pathSimplifierIns.setData([{
                    name: '北京-巴彦淖尔 线路',
                    path: [
                    [116.405289, 39.904987],
                    // [113.964458, 40.54664],
                    // [111.47836, 41.135964],
                    // [108.949297, 41.670904],
                    // [106.380111, 42.149509],
                    // [103.774185, 42.56996],
                    // [101.135432, 42.930601],
                    // [98.46826, 43.229964],
                    // [95.777529, 43.466798],
                    // [93.068486, 43.64009],
                    // [90.34669, 43.749086],
                    [127.61792, 43.793308]
                    ]
                }, {
                    name: '北京-巴彦淖尔 线路',
                    path: [
                        [116.405289, 39.904987],
                        // [114, 38.65],
                        // // [113, 38],
                        // [112, 38],
                        // [110, 37.8],
                        // [105.5, 38],
                        // [102, 37.9],
                        // [100, 37.8],
                        // [99, 37.7],
                        // [97.5, 37.5],
                        // [97, 37.4],
                        // [96, 37.5],
                        // [95, 37.7],
                        // [94, 37.9],
                        [90.61792,38]
                    ]
                }]);

                function onload() {
                    pathSimplifierIns.renderLater();
                }
                let speed = 2000000;
            //对第一条线路（即索引 0）创建一个巡航器
                var navg1 = pathSimplifierIns.createPathNavigator(0, {
                    loop: true, // 循环播放
                    speed: speed,// 巡航速度，单位千米/小时
                    // pathNavigatorStyle: extend({}, pathNavigatorStyles[0])
                    zoom: 50,
                    zIndex:100
                });
                navg1.start();
                var navg2 = pathSimplifierIns.createPathNavigator(1, {
                    loop: true, // 循环播放
                    speed: speed,// 巡航速度，单位千米/小时
                    zoom: 50,
                    zIndex:100
                    // pathNavigatorStyle: extend({}, pathNavigatorStyles[0])
                });
                navg2.start();
            });

        },
        drawPie () {
            let mychart = this.$refs.echartsPie;
            if (mychart) {
                let chart = echarts.init(mychart);
                let option = {
                    title: {
                        text: '执法持证\n情况',
                        textStyle: {
                            color: '#66d7ff',
                            fontSize: 22,
                            lineHeight:30
                        },
                        textAlign: 'center',
                        textVerticalAlign: 'middle',
                        left: '50%',
                        top: '50%'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{d}%'
                    },
                    // legend: {
                        // orient: 'vertical',
                        // left: 10,
                        // selected: ['海事证', '部发证', '省内证']
                    // },
                    series: [
                        {
                            name: '执法持证情况',
                            type: 'pie',
                            hoverOffset: 0,
                            selectedOffset: 10,
                            selectedMode:'multiple',
                            hoverAnimation:false,
                            radius: ['50%', '61%'],
                            // selectedMode: '海事证',
                            avoidLabelOverlap: false,
                            label: {
                                show: true,
                                position: 'outside',
                                lineHeight: 18,
                                fontSize: 14,
                                // padding: 50,
                                formatter: function(data) {
                                    // debugger;
                                    return data.data.title === ''?'': data.data.title + ' \n'+ data.data.value + '%';
                                },
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    // fontSize: '18',
                                    fontWeight: 'bold',
                                }
                            },
                            animationType: 'scale',
                            animationEasing: 'elasticOut',
                            // animationType: 'expansion',
                            // animationEasing: 'quinticOut',
                            animationDelay: function (idx) {
                                return idx * 50 + 1000;
                            },
                            labelLine: {
                                show: false
                                // lineStyle:{
                                //     color: 'transparent'
                                // }
                            },
                            data: [
                                {value: 10, title: '海事证', name: '海事证', itemStyle: { color: '#f99513' },selectedMode:true},
                                {value: 10, title: '', name: '海事证', itemStyle: { color: '#f99513' },selectedMode:true},
                                {value: 10, title: '',name: '海事证', itemStyle: { color: '#f99513' },selectedMode:true},
                                {value: 10, title: '部发证',  name: '部发证', itemStyle: { color: '#f7d02f' }},
                                {value: 10, title: '',name: '部发证', itemStyle: { color: '#f7d02f' }},
                                {value: 10, title: '',name: '部发证', itemStyle: { color: '#f7d02f' }},
                                {value: 10, title: '',name: '部发证', itemStyle: { color: '#f7d02f' }},
                                {value: 10 ,title: '省内证',  name: '省内证', itemStyle: { color: '#66d7ff' }},
                                {value: 10,title: '', name: '省内证', itemStyle: { color: '#66d7ff' }},
                                {value: 10, title: '',name: '省内证', itemStyle: { color: '#66d7ff' }},
                                {value: 10, title: '',name: '省内证', itemStyle: { color: '#66d7ff' }},
                                {value: 10, title: '',name: '省内证', itemStyle: { color: '#66d7ff' }},
                                {value: 10,title: '', name: '省内证', itemStyle: { color: '#66d7ff' }},
                                {value: 10, title: '',name: '省内证', itemStyle: { color: '#66d7ff' }},
                                {value: 10,title: '', name: '省内证', itemStyle: { color: '#66d7ff' }},
                                {value: 10, title: '',name: '省内证', itemStyle: { color: '#66d7ff' }},
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowOffsetX: 0,
                                    shadowColor: '#000c14',
                                    borderWidth: 0,
                                },
                                normal: {
                                    shadowBlur: 0,
                                    shadowOffsetX: 0,
                                    shadowColor: 'none',
                                    fontWeight: 'bolder',
                                    borderWidth: 7,
                                    borderColor: '#000c14',
                                },
                            },
                        }
                    ],
                    animationDelayUpdate: function (idx) {
                        // 越往后的数据延迟越大
                        return idx * 40;
                    }
                };
                chart.setOption(option);
            }

            let mychart1 = this.$refs.echartsPie1;
            if (mychart1) {
                let chart1 = echarts.init(mychart1);
                let option1 = {
                    title: {
                        text: '执法持证\n情况',
                        textStyle: {
                            color: '#66d7ff',
                            fontSize: 22,
                            lineHeight:30
                        },
                        textAlign: 'center',
                        textVerticalAlign: 'middle',
                        left: '50%',
                        top: '50%'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{d}%'
                    },
                    // legend: {
                        // orient: 'vertical',
                        // left: 10,
                        // selected: ['海事证', '部发证', '省内证']
                    // },
                    series: [
                        {
                            name: '执法持证情况',
                            type: 'pie',
                            hoverOffset: 0,
                            selectedOffset: 10,
                            selectedMode:'multiple',
                            hoverAnimation:false,
                            radius: ['50%', '61%'],
                            // selectedMode: '海事证',
                            avoidLabelOverlap: false,
                            label: {
                                show: true,
                                position: 'outside',
                                lineHeight: 18,
                                fontSize: 14,
                                // padding: 50,
                                formatter: function(data) {
                                    // debugger;
                                    return data.data.title === ''?'': data.data.title + ' \n'+ data.data.value + '%';
                                },
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    // fontSize: '18',
                                    fontWeight: 'bold',
                                }
                            },
                            animationType: 'scale',
                            animationEasing: 'elasticOut',
                            animationDelay: function (idx) {
                                return idx * 50 + 1000;
                            },
                            labelLine: {
                                show: false
                                // lineStyle:{
                                //     color: 'transparent'
                                // }
                            },
                            data: [
                                {value: 10, title: '海事证', name: '海事证', itemStyle: { color: '#f99513' },selectedMode:true},
                                {value: 10, title: '', name: '海事证', itemStyle: { color: '#f99513' },selectedMode:true},
                                {value: 10, title: '',name: '海事证', itemStyle: { color: '#f99513' },selectedMode:true},
                                {value: 10, title: '部发证',  name: '部发证', itemStyle: { color: '#f7d02f' }},
                                {value: 10, title: '',name: '部发证', itemStyle: { color: '#f7d02f' }},
                                {value: 10, title: '',name: '部发证', itemStyle: { color: '#f7d02f' }},
                                {value: 10, title: '',name: '部发证', itemStyle: { color: '#f7d02f' }},
                                {value: 10 ,title: '省内证',  name: '省内证', itemStyle: { color: '#66d7ff' }},
                                {value: 10,title: '', name: '省内证', itemStyle: { color: '#66d7ff' }},
                                {value: 10, title: '',name: '省内证', itemStyle: { color: '#66d7ff' }},
                                {value: 10, title: '',name: '省内证', itemStyle: { color: '#66d7ff' }},
                                {value: 10, title: '',name: '省内证', itemStyle: { color: '#66d7ff' }},
                                {value: 10,title: '', name: '省内证', itemStyle: { color: '#66d7ff' }},
                                {value: 10, title: '',name: '省内证', itemStyle: { color: '#66d7ff' }},
                                {value: 10,title: '', name: '省内证', itemStyle: { color: '#66d7ff' }},
                                {value: 10, title: '',name: '省内证', itemStyle: { color: '#66d7ff' }},
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowOffsetX: 0,
                                    shadowColor: '#000c14',
                                    borderWidth: 0,
                                },
                                normal: {
                                    shadowBlur: 0,
                                    shadowOffsetX: 0,
                                    shadowColor: 'none',
                                    fontWeight: 'bolder',
                                    borderWidth: 7,
                                    borderColor: '#000c14',
                                },
                            },
                        }
                    ],
                    animationDelayUpdate: function (idx) {
                        // 越往后的数据延迟越大
                        return idx * 10;
                    }
                };
                chart1.setOption(option1);
            }

            let mychart2 = this.$refs.echartsLine;
            if (mychart2) {
                let chart2 = echarts.init(mychart2);
                let option2 = {
                     textStyle: {
                            color: '#2f718a',
                            borderColor: '#2f718a'
                    },
                    symbol: 'circle',
                    symbolSize: 10,
                    xAxis: {
                        type: 'category',
                        data: ['2013', '14', '15', '16', '17', '18', '19'],
                        axisLine: {
                            lineStyle: {
                                width: 1,
                                color: '#33728a',
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                width: 0,
                                color: '#66D7FF',
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                width: 1,
                                color: '#33728a',
                                type: 'dashed'
                            }
                        }
                    },
                    series: [{
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line',
                        animationType: 'expansion',
                        animationEasing: 'bounceInOut',
                        // animationType: 'scale',
                        // animationEasing: 'elasticOut',
                        animationDelay: function (idx) {
                            return idx * 50 + 1000;
                        },
                        lineStyle: {
                            width: 1,
                            color: '#f7d02f'
                        },
                        itemStyle:{
                            color: '#f7d02f',
                            borderWidth:5,
                        }
                    },{
                        data: [320, 732, 601, 834, 1090, 1130, 520],
                        type: 'line',
                        animationType: 'expansion',
                        animationEasing: 'backInOut',
                        animationDelay: function (idx) {
                            return idx * 50 + 1000;
                        },
                        lineStyle: {
                            width: 1,
                            color: '#66D7FF',
                        },
                        itemStyle:{
                            color: '#66D7FF',
                            borderWidth:5,
                        }
                    }]
                };
                chart2.setOption(option2);
            }
        }
    },
    mounted () {

    }
}
</script>

