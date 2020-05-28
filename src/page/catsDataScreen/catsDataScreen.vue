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
            <div style="width: 500px; height: 500px;position:absolute;top:0px;z-index:1000;">
                <div style="width: 400px; height: 400px;" ref="echartsPie"></div>
            </div>
             <div style="width: 500px; height: 500px;position:absolute;top:0px;top: 300px;z-index:1000;">
                <div style="width: 400px; height: 400px;" ref="echartsPie1"></div>
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
        AMapUI.loadUI(['misc/PathSimplifier'], function(PathSimplifier) {
            if (!PathSimplifier.supportCanvas) {
            alert('当前环境不支持 Canvas！');
            return;
            }
            var pathSimplifierIns = new PathSimplifier({
                zIndex: 100,
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
                        "width": 12,
                        "height": 18,
                        "autoRotate": true,
                        "lineJoin": "round",
                        "content": "defaultPathNavigator",
                        "fillStyle": "#fff009",
                        "strokeStyle": "rgba(255,206,0,0.18)",
                        "lineWidth": 1,
                        "pathLinePassedStyle": {
                            "lineWidth": 1,
                            "strokeStyle": "red",
                            "borderWidth": 1,
                            "borderStyle": "rgba(250,208,32,0.1)",
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
                        "radius": '100% 0 0 100%/50%',
                        "lineWidth": 2,
                        "strokeStyle": "rgba(250,208,32,0.8)",
                        "borderWidth": 1,
                        "borderStyle": "transparent",
                        "dirArrowStyle": true
                    },
                    startPointStyle: {
                        "radius": 8,
                        "fillStyle": "rgba(250,208,32,0.8)",
                        "lineWidth": 14,
                        "strokeStyle": "rgba(160,142,29,0.8)"
                    },
                    endPointStyle: {
                        "radius": 8,
                        "fillStyle": "rgba(250,208,32,0.8)",
                        "lineWidth": 14,
                        "strokeStyle": "rgba(160,142,29,0.8)"
                    }
                }
            });
            // 设定数据源数组，并触发重新绘制。data为空时将清除显示内容。
            pathSimplifierIns.setData([{
                name: '北京-巴彦淖尔 线路',
                path: [
                     [116.405289, 39.904987],
                [113.964458, 40.54664],
                [111.47836, 41.135964],
                [108.949297, 41.670904],
                [106.380111, 42.149509],
                [103.774185, 42.56996],
                [101.135432, 42.930601],
                [98.46826, 43.229964],
                [95.777529, 43.466798],
                [93.068486, 43.64009],
                [90.34669, 43.749086],
                [87.61792, 43.793308]
                ]
            }, {
                name: '北京-巴彦淖尔 线路',
                path: [
                    [116.405289, 39.904987],
                    [43.068486, 43.64009]
                ]
            }]);
            // pathSimplifierIns.setData([{
            //     name: "点a",
            //     lnglat: [116.405289, 39.904987]
            // }, {
            //     name: "点b",
            //     lnglat: [113.964458, 40.54664]
            // }, {
            //     name: "点c",
            //     lnglat: [111.47836, 41.135964]
            // }, {
            //     name: "点d",
            //     lnglat: [108.949297, 41.670904]
            // }, {
            //     name: "点e",
            //     lnglat: [106.380111, 42.149509]
            // }, {
            //     name: "点f",
            //     lnglat: [103.774185, 42.56996]
            // }, {
            //     name: "点g",
            //     lnglat: [101.135432, 42.930601]
            // }, {
            //     name: "点h",
            //     lnglat: [98.46826, 43.229964]
            // }, {
            //     name: "点i",
            //     lnglat: [95.777529, 43.466798]
            // }, {
            //     name: "点j",
            //     lnglat: [93.068486, 43.64009]
            // }, {
            //     name: "点k",
            //     lnglat: [90.34669, 43.749086]
            // }, {
            //     name: "点l",
            //     lnglat: [87.61792, 43.793308]
            // }]);
            function onload() {
            pathSimplifierIns.renderLater();
        }

        function onerror(e) {
            alert('图片加载失败！');
        }

            //对第一条线路（即索引 0）创建一个巡航器
            var navg1 = pathSimplifierIns.createPathNavigator(0, {
                loop: true, // 循环播放
                speed: 1050000 // 巡航速度，单位千米/小时
                // pathNavigatorStyle: extend({}, pathNavigatorStyles[0])
            });
            navg1.start();
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
                            //   animationType: 'scale',
                            // animationEasing: 'quadraticOut',
                            animationType: 'expansion',
                            animationEasing: 'quinticOut',
                            animationDelay: function (idx) {
                                return idx * 12 + 1000;
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
                            // animationEasing: 'quadraticOut',
                            // animationType: 'expansion',
                            animationEasing: 'quinticOut',
                            animationDelay: function (idx) {
                                return idx * 12 + 1000;
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
        }
    },
    mounted () {

    }
}
</script>

