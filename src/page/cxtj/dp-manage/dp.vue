<template>
  <el-container class="body_bg">
      <el-main >
          <el-row class="main">
       <el-row>
          <el-col :span="6" style="height:60px;margin-top: 35px;margin-left: 100px; " >
              <div class="title_1 title_font"  @click="ajpage()">执法案件</div>
          </el-col>
          <el-col :span="4" class="title_2" >
               <!-- 江西省执法数据分析研判系统 -->
          </el-col>
          <el-col :span="6" style="height:60px;margin-left: -520px;margin-top: 28px;" >
              <div class="title_3 title_font" @click="zbpage()" >人员装备</div>

          </el-col>
           <el-col :span="4" style="height:60px;margin-left:-30px;margin-top: 35px;" >
              <div class="title_4" >
                  <span class="right_font0">执法人员：</span>
                  <span class="right_font1">{{zfrysl}}人</span>
              </div>

          </el-col>
           <el-col :span="4" style="height:60px;margin-left:0px;margin-top: 35px;" >
              <div class="title_5" >
                  <span class="right_font0">执法装备：</span>
                  <span class="right_font1">{{zfzbsl}}件</span>
              </div>

          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7" >
            <el-row  class="left_1">
              <el-row  >
                <div class="bt">执法人员岗位分布</div>
              </el-row>
              <el-row>
                   <div id="gwfb" style="width: 100%; height: 200px;"></div>
              </el-row>
            </el-row>
            <el-row class="left_2">
               <el-row  >
                <div class="bt">执法人员编制分布</div>
              </el-row>
              <el-row>
                 <div id="ndafqs" style="width: 100%; height: 200px;"></div>
              </el-row>
            </el-row>

          </el-col>
          <el-col :span="10" >
              <el-row class="center_1">
              <div id="map" style="width: 550px; height: 400px;"></div>
            </el-row>

          </el-col>
           <el-col :span="7" >
             <el-row class="right_1">
              <el-row  >
                <div class="bt">装备类型</div>
              </el-row>
              <el-row>
                 <div id="clpm" style="width: 100%; height: 170px;"></div>
              </el-row>
            </el-row>
            <el-row class="right_2">
               <el-row  >
                <div class="bt">执法人员增长同比</div>
              </el-row>
              <el-row>
                 <div id="afd" style="width: 100%; height: 200px;"></div>
              </el-row>
            </el-row>
           </el-col>
        </el-row>

        <el-row>
          <el-col :span="12" >
            <el-row class="bottom_1">
               <el-row  >
                <div class="bt">执法机构人员数量</div>
              </el-row>
              <el-row>
                  <div id="rysl" style="width: 100%; height: 200px;"></div>
              </el-row>
            </el-row>

          </el-col>
          <el-col :span="12">
             <el-row class="bottom_2">
               <el-row  >
                <div class="bt">执法机构装备数量</div>
              </el-row>
              <el-row>
                 <div id="zbsl" style="width: 100%; height: 200px;"></div>
              </el-row>
            </el-row>
          </el-col>
        </el-row>
          </el-row>
      </el-main>
  </el-container>
</template>
</template>


<script>
import echarts from "echarts";

import "echarts/map/js/china.js";
import "echarts/map/js/province/jiangxi.js";
import "echarts/map/json/province/jiangxi.json";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/chart/heatmap";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/tooltip";


import {
      gwfb,bzfb,rysl,zfry,zfzb,zbsl,zblx,zztb
    } from '@/api/fxyp.js'
export default {
  data() {
    return {
      value3: "",
      value2: "",
      value1: "",
      checked: true,
      dataForm: {},
      logForm: {
        organ: "",
        type: "",
        operation: "",
        username: "",
        startTime: "",
        endTime: "",
        dateArray: ""
      },
      data1:[],
      data2:[],
      data3:[],
      data4:[],
      data5:[],
      data6:[],
      data7:[],
      data8:[],
      data9:[],
      zfrysl:"",
      zfzbsl:"",
    };
  },
  methods:{
      ajpage(){
           this.$router.push({ path:'/lawCase'  })
      },
      zbpage(){
           this.$router.push({ path:'/personEqpt'  })
      },
    map() {
     var jiangxi = "../../../../static/json/map/data-1518338017111-rJK1gtpUM.json";
    var yingtan = "../../../../static/json/map/data-1518338860057-By447tpLf.json";
    var yichun = "../../../../static/json/map/data-1518338852969-Hy677KTIf.json";
    var xinyu = "../../../../static/json/map/data-1518338838010-SyAzQYTIf.json";
    var shangrao = "../../../../static/json/map/data-1518338829670-H1UfQYa8G.json";
    var pingxiang = "../../../../static/json/map/data-1518338823093-HkyMQtpUf.json";
    var nanchang = "../../../../static/json/map/data-1518338805373-S1Temta8G.json";
    var jiujiang = "../../../../static/json/map/data-1518338799987-S1deQFTLz.json";
    var jingdezhen = "../../../../static/json/map/data-1518338783915-HJOJXtaLf.json";
    var jian = "../../../../static/json/map/data-1518338772507-BJnAMKTIz.json";
    var ganzhou = "../../../../static/json/map/data-1518338763250-S17RfKpLM.json";
    var fuzhou = "../../../../static/json/map/data-1518338684239-S1EFGtp8f.json";

echarts.extendsMap = function(id, opt){
    // 实例
    var chart = this.init(document.getElementById("map"));

    var curGeoJson = {};
    var cityMap = {
        "南昌市": nanchang,
        "景德镇市": jingdezhen,
        "萍乡市": pingxiang,
        "九江市": jiujiang,
        "新余市": xinyu,
        "鹰潭市": yingtan,
        "赣州市": ganzhou,
        "吉安市": jian,
        "宜春市": yichun,
        "抚州市": fuzhou,
        "上饶市": shangrao
    };
    var geoCoordMap = {
        '南昌': [115.89, 28.48],
        '景德镇': [117.28, 29.09],
        '萍乡': [113.93, 27.41],
        '九江': [115.97,29.51],
        '新余': [114.81, 27.72],
        '鹰潭': [117.12, 28.10],
        '赣州': [115.04, 25.67],
        '吉安': [115.05, 26.88],
        '宜春': [114.41, 28.03],
        '抚州': [116.45, 27.79],
        '上饶': [117.92, 28.22]
    };
    var levelColorMap = {
        '1': 'rgba(241, 109, 115, .8)',
        '2': 'rgba(255, 235, 59, .7)',
        '3': 'rgba(147, 235, 248, 1)'
    };

	var defaultOpt = {
		mapName: 'china',     // 地图展示
		goDown: false,        // 是否下钻
		bgColor: '#404a59',   // 画布背景色
        activeArea: [],       // 区域高亮,同echarts配置项
        data: [],
        // 下钻回调(点击的地图名、实例对象option、实例对象)
        callback: function(name, option, instance){}
	};
	if(opt) opt = this.util.extend(defaultOpt, opt);

	// 层级索引
	var name = [opt.mapName];
	var idx = 0;
	var pos = {
		leftPlus: 115,
		leftCur: -10,
		left: 38,
		top: 40
	};

	var line = [[0, 0], [8, 11], [0, 22]];
    // style
	var style = {
		font: '18px "Microsoft YaHei", sans-serif',
		textColor: '#eee',
		lineColor: 'rgba(147, 235, 248, .8)'
	};

    var handleEvents = {
        /**
         * i 实例对象
         * o option
         * n 地图名
        **/
        resetOption: function(i, o, n){
            var breadcrumb = this.createBreadcrumb(n);

            var j = name.indexOf(n);
            var l = o.graphic.length;
            if(j < 0){
                o.graphic.push(breadcrumb);
                o.graphic[0].children[0].shape.x2 = 145;
                o.graphic[0].children[1].shape.x2 = 145;
                if(o.graphic.length > 2){
                    for(var x = 0; x < opt.data.length; x++){
                        if(n === opt.data[x].name + '市'){
                            o.series[0].data = handleEvents.initSeriesData([opt.data[x]]);
                            break;
                        }else o.series[0].data = [];
                    }
                };
                name.push(n);
                idx++;
            }else{
                o.graphic.splice(j + 2, l);
                if(o.graphic.length <= 2){
                    o.graphic[0].children[0].shape.x2 = 60;
                    o.graphic[0].children[1].shape.x2 = 60;
                    o.series[0].data = handleEvents.initSeriesData(opt.data);
                };
                name.splice(j + 1, l);
                idx = j;
                pos.leftCur -= pos.leftPlus * (l - j - 1);
            };

            o.geo.map = n;
            o.geo.zoom = 0.4;
            i.clear();
            i.setOption(o);
            this.zoomAnimation();
            opt.callback(n, o, i);
        },

        /**
         * name 地图名
        **/
        createBreadcrumb: function(name){
            var cityToPinyin = {
                "南昌市": "nanchang",
                "景德镇市": "jingdezhen",
                "萍乡市": "pingxiang",
                "九江市": "jiujiang",
                "新余市": "xinyu",
                "鹰潭市": "yingtan",
                "赣州市": "ganzhou",
                "吉安市": "jian",
                "宜春市": "yichun",
                "抚州市": "fuzhou",
                "上饶市": "shangrao"
            };
            var breadcrumb = {
                type: 'group',
                id: name,
                left: pos.leftCur + pos.leftPlus,
                top: pos.top + 5,
                children: [{
                    type: 'polyline',
                    left: -90,
                    top: -5,
                    shape: {
                        points: line
                    },
                    style: {
                        stroke: '#fff',
                        key: name
                        // lineWidth: 2,
                    },
                    onclick: function(){
                        var name = this.style.key;
                        handleEvents.resetOption(chart, option, name);
                    }
                }, {
                    type: 'text',
                    left: -68,
                    top: 'middle',
                    style: {
                        text: name,
                        textAlign: 'center',
                        fill: style.textColor,
                        font: style.font
                    },
                    onclick: function(){
                        var name = this.style.text;
                        handleEvents.resetOption(chart, option, name);
                    }
                }, {
                    type: 'text',
                    left: -68,
                    top: 10,
                    style: {

                        name: name,
                        text: cityToPinyin[name] ? cityToPinyin[name].toUpperCase() : '',
                        textAlign: 'center',
                        fill: style.textColor,
                        font: '12px "Microsoft YaHei", sans-serif',
                    },
                    onclick: function(){
                        // console.log(this.style);
                        var name = this.style.name;
                        handleEvents.resetOption(chart, option, name);
                    }
                }]
            }

            pos.leftCur += pos.leftPlus;

            return breadcrumb;
        },

        // 设置effectscatter
        initSeriesData: function(data){
            var temp = [];
            for(var i = 0;i < data.length;i++){
                var geoCoord = geoCoordMap[data[i].name];
                if(geoCoord){
                    temp.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value, data[i].level)
                    });
                }
            };
            return temp;
        },

        zoomAnimation: function(){
            var count = null;
            var zoom = function(per){
                if(!count) count = per;
                count = count + per;
                // console.log(per,count);
                chart.setOption({
                    geo: {
                        zoom: count
                    }
                });
                if(count < 1) window.requestAnimationFrame(function(){
                    zoom(0.2);
                });
            };
            window.requestAnimationFrame(function(){
                zoom(0.2);
            });
        }
    };

    var option = {
    	// backgroundColor: opt.bgColor,
    	graphic: [{
    		type: 'group',
    		left: pos.left,
	        top: pos.top - 4,
    		children: [{
    			type: 'line',
    			left: 0,
        		top: -20,
        		shape: {
                    x1: 0,
                    y1: 0,
                    x2: 60,
                    y2: 0
                },
        		style: {
        			stroke: style.lineColor,
        		}
			}, {
    			type: 'line',
    			left: 0,
        		top: 20,
		        shape: {
                    x1: 0,
                    y1: 0,
                    x2: 60,
                    y2: 0
                },
                style: {
                    stroke: style.lineColor,
                }
    		}]
    	}, {
        	id: name[idx],
        	type: 'group',
        	left: pos.left + 2,
        	top: pos.top - 8,
        	children: [{
        		type: 'polyline',
        		left: 90,
        		top: -12,
        		shape: {
                    points: line
                },
        		style: {
                    stroke: 'transparent',
        			key: name[0]
        		},
        		onclick: function(){
        			var name = this.style.key;
	        		handleEvents.resetOption(chart, option, name);
	        	}
        	}, {
        		type: 'text',
        		left: 0,
                top: 'left',
        		style: {
	        		text: name[0] === '江西' ? '江西省' : name[0],
	        		textAlign: 'left',
	        		fill: style.textColor,
	        		font: style.font
	        	},
	        	onclick: function(){
	        		handleEvents.resetOption(chart, option, '江西');
	        	}
        	}, {
                type: 'text',
                left: 0,
                top: 20,
                style: {
                    text: 'JIANGXI',
                    textAlign: 'center',
                    fill: style.textColor,
                    font: '12px "Microsoft YaHei", sans-serif',
                },
                onclick: function(){
                    handleEvents.resetOption(chart, option, '江西');
                }
            }]
        }],
        geo: {
        	map: opt.mapName,
            // roam: true,
            zoom: 1,
        	label: {
                normal: {
                    show: true,
                    textStyle: {
                        color: '#fff'
                    }
                },
                emphasis: {
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            itemStyle: {
                normal: {
                    borderColor: 'rgba(147, 235, 248, 1)',
                    borderWidth: 1,
                    areaColor: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.8,
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    },
                    shadowColor: 'rgba(128, 217, 248, 1)',
                    // shadowColor: 'rgba(255, 255, 255, 1)',
                    shadowOffsetX: -2,
                    shadowOffsetY: 2,
                    shadowBlur: 10
                },
                emphasis: {
                    areaColor: '#389BB7',
                    borderWidth: 0
                }
            },
            regions: opt.activeArea.map(function(item){
                if(typeof item !== 'string'){
                    return {
                        name: item.name,
                        itemStyle: {
                            normal: {
                                areaColor: item.areaColor || '#389BB7'
                            }
                        },
                        label: {
                            normal: {
                                show: item.showLabel,
                                textStyle: {
                                    color: '#fff'
                                }
                            }
                        }
                    }
                }else{
                    return {
                        name: item,
                        itemStyle: {
                            normal: {
                                borderColor: '#91e6ff',
                                areaColor: '#389BB7'
                            }
                        }
                    }
                }
            })
        },
        series: [{
            type: 'effectScatter',
            coordinateSystem: 'geo',
            // symbol: 'diamond',
            showEffectOn: 'render',
            rippleEffect: {
                period: 15,
                scale: 6,
                brushType: 'fill'
            },
            hoverAnimation: true,
            itemStyle: {
                normal: {
                    color: function(params){
                        return levelColorMap[params.value[3]];
                    },
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            data: handleEvents.initSeriesData(opt.data)
        }],
        tooltip: {
                show:true,
                trigger: 'item',
                backgroundColor: 'rgba(166, 200, 76, 0.82)',
                borderColor: '#FFFFCC',
                showDelay: 0,
                hideDelay: 0,
                enterable: true,
                transitionDuration: 0,
                extraCssText: 'z-index:100',
                formatter: function(params, ticket, callback) {
                console.log(params);
                //根据业务自己拓展要显示的内容
                var res = "";
                var name = params.name;
                var value = params.value[2];
                res = "<span style='color:#fff;'>" + name + "</span><br/>装备数量：" + value;
                return res;
   }
  },
    };

    chart.setOption(option);
    // 添加事件
    chart.on('click', function(params){
        var _self = this;
    	if(opt.goDown && params.name !== name[idx]){
            if(cityMap[params.name]){
                var url = cityMap[params.name];
                $.get(url, function(response){
                    // console.log(response);
                    curGeoJson = response;
                    echarts.registerMap(params.name, response);
                    handleEvents.resetOption(_self, option, params.name);
                });
            }
    	}
    });

    chart.setMap = function(mapName){
        var _self = this;
        if(mapName.indexOf('市') < 0) mapName = mapName + '市';
        var citySource = cityMap[mapName];
        if(citySource){
            var url = './map/' + citySource + '.json';
            $.get(url, function(response){
                // console.log(response);
                curGeoJson = response;
                echarts.registerMap(mapName, response);
                handleEvents.resetOption(_self, option, mapName);
            });
        }
        // handleEvents.resetOption(this, option, mapName);
    };

    return chart;
};

$.getJSON(jiangxi, function(geoJson){
    echarts.registerMap('江西', geoJson);
    var myChart = echarts.extendsMap('chart-panel', {
    	bgColor: '#154e90', // 画布背景色
    	mapName: '江西',    // 地图名
    	goDown: true,       // 是否下钻
    	// 下钻回调
    	callback: function(name, option, instance){
    		console.log(name);
          if(name=="南昌市"){
              option.series[0].data.push({name: "安义县",value:[115.55,28.86,35,3]});
              option.series[0].data.push({name: "东湖区",value:[115.9 ,28.68, 35, 1]});
              option.series[0].data.push({name: "西湖区",value:[115.87, 28.67, 35, 2]});
              option.series[0].data.push({name: "青云谱区",value:[115.92 ,28.63,35,3]});
              option.series[0].data.push({name: "湾里区",value:[115.73 ,28.72, 35, 1]});
              option.series[0].data.push({name: "青山湖区",value:[115.95, 28.68, 35, 2]});
              option.series[0].data.push({name: "南昌县",value:[115.93, 28.55,35,3]});
              option.series[0].data.push({name: "新建县",value:[115.82, 28.7, 35, 1]});
              option.series[0].data.push({name: "进贤县",value:[116.27 ,28.37, 35, 2]});

         }
         if(name=="景德镇市"){
              option.series[0].data.push({name: "昌江区",value:[117.17, 29.27, 35, 1]});
              option.series[0].data.push({name: "珠山区 ",value:[117.2 ,29.3, 35, 2]});
              option.series[0].data.push({name: "浮梁县",value:[117.25 ,29.37, 35, 2]});
              option.series[0].data.push({name: "乐平市",value:[117.12 ,28.97, 35, 2]});

         }
         if(name=="萍乡市"){
              option.series[0].data.push({name: "安源区",value:[113.87, 27.65, 35, 2]});
              option.series[0].data.push({name: "湘东区",value:[113.73, 27.65, 35, 2]});
              option.series[0].data.push({name: "莲花县",value:[113.95, 27.13, 35, 1]});
              option.series[0].data.push({name: "上栗县",value:[113.8 ,27.88, 35, 2]});
              option.series[0].data.push({name: "芦溪县",value:[114.03, 27.63, 35, 2]});
         }
         if(name=="九江市"){
              option.series[0].data.push({name: "庐山区",value:[115.98, 29.68, 35, 3]});
              option.series[0].data.push({name: "浔阳区",value:[115.98, 29.73, 15,1]});
              option.series[0].data.push({name: "九江县",value:[115.88, 29.62, 35, 2]});
              option.series[0].data.push({name: "武宁县",value:[115.1 ,29.27, 25, 2]});
              option.series[0].data.push({name: "修水县",value:[114.57 ,29.03, 15, 2]});
              option.series[0].data.push({name: "永修县",value:[115.8 ,29.03, 35, 3]});
              option.series[0].data.push({name: "德安县",value:[115.77, 29.33, 15,1]});
              option.series[0].data.push({name: "星子县",value:[116.03, 29.45, 35, 2]});
              option.series[0].data.push({name: "都昌县 ",value:[116.18, 29.27, 25, 2]});
              option.series[0].data.push({name: "湖口县",value:[116.22, 29.73, 15, 2]});
              option.series[0].data.push({name: "彭泽县 ",value:[116.55 ,29.9, 25, 2]});
              option.series[0].data.push({name: "瑞昌市",value:[115.67 ,29.68, 15, 2]});
         }
         if(name=="新余市"){
              option.series[0].data.push({name: "渝水区 ",value:[114.93, 27.8, 15, 2]});
              option.series[0].data.push({name: "分宜县",value:[114.67 ,27.82, 35,1]});

         }
         if(name=="鹰潭市"){
               option.series[0].data.push({name: "月湖区",value:[117.05, 28.23,32,2]});
              option.series[0].data.push({name: "余江县",value:[116.82 ,28.2,34,1]});
              option.series[0].data.push({name: "贵溪市",value:[117.22 ,28.28,32,1]});

         }
         if(name=="赣州市"){
               option.series[0].data.push({name: "章贡区",value:[114.93 ,25.87,32,2]});
               option.series[0].data.push({name: "赣县",value:[115.0 ,25.87,34,1]});
               option.series[0].data.push({name: "信丰县",value:[114.93, 25.38,32,1]});
               option.series[0].data.push({name: "大余县",value:[114.35 ,25.4,31,2]});
               option.series[0].data.push({name: "上犹县",value:[114.53, 25.8,11,2]});
               option.series[0].data.push({name: "崇义县",value:[114.3, 25.7,32,2]});
               option.series[0].data.push({name: "安远县",value:[115.38 ,25.13,34,1]});
               option.series[0].data.push({name: "龙南县",value:[114.78 ,24.92,32,1]});
               option.series[0].data.push({name: "定南县",value:[115.03 ,24.78,31,2]});
               option.series[0].data.push({name: "全南县",value:[114.52, 24.75,11,2]});
               option.series[0].data.push({name: "宁都县",value:[116.02, 26.48,32,2]});
               option.series[0].data.push({name: "于都县",value:[115.42 ,25.95,34,1]});
               option.series[0].data.push({name: "兴国县",value:[115.35, 26.33,32,1]});
               option.series[0].data.push({name: "会昌县",value:[115.78 ,25.6,31,2]});
               option.series[0].data.push({name: "寻乌县",value:[115.65 ,24.95,11,2]});
               option.series[0].data.push({name: " 石城县",value:[116.33 ,26.33,32,1]});
               option.series[0].data.push({name: "瑞金市",value:[116.03 ,25.88,31,2]});
               option.series[0].data.push({name: "南康市",value:[114.75, 25.65,11,2]});

         }
         if(name=="吉安市"){
               option.series[0].data.push({name: "吉州区",value:[114.98, 27.12,32,2]});
              option.series[0].data.push({name: "青原区",value:[115.0 ,27.1,34,1]});
              option.series[0].data.push({name: "吉安县",value:[114.9 ,27.05,32,1]});
              option.series[0].data.push({name: "吉水县 ",value:[115.13 ,27.22,31,2]});
              option.series[0].data.push({name: "峡江县",value:[115.33, 27.62,25,2]});
              option.series[0].data.push({name: "新干县",value:[115.4, 27.77,25,2]});
              option.series[0].data.push({name: "永丰县 ",value:[115.43 ,27.32,32,2]});
              option.series[0].data.push({name: "泰和县",value:[114.88 ,26.8,34,1]});
              option.series[0].data.push({name: "遂川县",value:[114.52 ,26.33,32,1]});
              option.series[0].data.push({name: "万安县 ",value:[114.78, 26.47,31,2]});
              option.series[0].data.push({name: "安福县",value:[114.62 ,27.38,25,2]});
              option.series[0].data.push({name: "永新县",value:[114.23, 26.95,25,2]});
               option.series[0].data.push({name: "井冈山市",value:[114.27 ,26.72,25,2]});
         }
         if(name=="宜春市"){
               option.series[0].data.push({name: "袁州区",value:[114.38, 27.8,32,2]});
              option.series[0].data.push({name: "奉新县",value:[115.38, 28.7,34,1]});
              option.series[0].data.push({name: "万载县",value:[114.43, 28.12,32,1]});
              option.series[0].data.push({name: "上高县",value:[114.92, 28.23,31,2]});
              option.series[0].data.push({name: "宜丰县",value:[114.78, 28.38,25,2]});
              option.series[0].data.push({name: "靖安县 ",value:[115.35, 28.87,25,2]});
               option.series[0].data.push({name: "铜鼓县",value:[114.37, 28.53,32,1]});
              option.series[0].data.push({name: "丰城市",value:[115.78, 28.2,31,2]});
              option.series[0].data.push({name: "樟树市",value:[115.53, 28.07,25,2]});
              option.series[0].data.push({name: "高安市 ",value:[115.37 ,28.42,25,2]});
         }
         if(name=="抚州市"){
               option.series[0].data.push({name: "临川区",value:[116.35, 27.98,32,2]});
              option.series[0].data.push({name: "南城县",value:[116.63 ,27.55,34,1]});
              option.series[0].data.push({name: "黎川县",value:[116.92 ,27.3,32,1]});
              option.series[0].data.push({name: "南丰县",value:[116.53 ,27.22,31,2]});
              option.series[0].data.push({name: "崇仁县 ",value:[116.05, 27.77,25,2]});
              option.series[0].data.push({name: " 乐安县",value:[115.83, 27.43,25,2]});
               option.series[0].data.push({name: "宜黄县",value:[116.22, 27.55,34,1]});
              option.series[0].data.push({name: "金溪县",value:[116.77, 27.92,32,1]});
              option.series[0].data.push({name: "资溪县",value:[117.07, 27.7,31,2]});
              option.series[0].data.push({name: "东乡县  ",value:[116.62 ,28.23,25,2]});
              option.series[0].data.push({name: " 广昌县 ",value:[116.32 ,26.83,25,2]});
         }
        if(name=="上饶市"){
               option.series[0].data.push({name: "信州区",value:[117.95, 28.43,32,2]});
              option.series[0].data.push({name: "上饶县",value:[117.92, 28.43,34,1]});
              option.series[0].data.push({name: "广丰县",value:[118.18, 28.43,32,1]});
              option.series[0].data.push({name: "玉山县",value:[118.25, 28.68,31,2]});
              option.series[0].data.push({name: "铅山县",value:[117.7, 28.32,25,2]});
              option.series[0].data.push({name: "横峰县",value:[117.6, 28.42,25,2]});
               option.series[0].data.push({name: "戈阳县",value:[117.43, 28.4,31,2]});
              option.series[0].data.push({name: "余干县",value:[116.68, 28.7,25,2]});
              option.series[0].data.push({name: "横峰县",value:[117.6, 28.42,25,2]});
         }
           myChart.setOption(option);
    	},
        // 数据展示
    	data: [{
    		name: '南昌',
    		value: 10,
    		level: 1
    	}, {
    		name: '景德镇',
    		value: 12,
    		level: 2
    	}, {
    		name: '萍乡',
    		value: 11,
    		level: 3
    	}, {
    		name: '赣州',
    		value: 16,
    		level: 2
    	}, {
    		name: '吉安',
    		value: 12,
    		level: 1
    	}, {
    		name: '九江',
    		value: 12,
    		level: 1
    	}, {
    		name: '新余',
    		value: 12,
    		level: 1
    	}, {
    		name: '鹰潭',
    		value: 12,
    		level: 1
    	}, {
    		name: '宜春',
    		value: 12,
    		level: 1
    	}, {
    		name: '抚州',
    		value: 12,
    		level: 1
    	}, {
    		name: '上饶',
    		value: 12,
    		level: 1
    	}]
    });
})

    },
    drawLeft1() {
       this.chartColumn = echarts.init(document.getElementById("gwfb"));
       this.chartColumn.setOption({
    title: {
        text: '',
        subtext: '',
        // link: 'https://gallery.echartsjs.com/explore.html?u=bd-1841183165&type=work',
        target: 'blank',
        x: 'center',
        top: '10',
        textStyle: {
            color: '#FFF',
            fontSize: 16,
        }
    },
    grid:{
        top:'-5%',
        bottom:'15%'
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}%"
    },

    // legend: {
    //     data: ['A', 'B', 'C'],
    //     x: 'center',
    //     y: '92%',
    //     textStyle: {
    //         color: '#FFF'
    //     }
    // },

    color: ['#c2c1bd', '#00a1e5', '#23c768'],

    series: [

        {
            name: '',
            type: 'funnel',
            left: 'center',
            width: '90%',
            sort: 'ascending',
            label: {
                normal: {
                    formatter: '{b}',
                },

            },
            labelLine: {
                normal: {
                    show: true,
                    length: 30
                }
            },
            itemStyle: {
                normal: {
                    opacity: 0.3
                }
            },
            tooltip: {
                show: false
            },

            data: this.data1
            // [{
            //         value: 10,
            //         name: '执法岗'
            //     }, {
            //         value: 20,
            //         name: '非执法岗'
            //     },
            //     {
            //         value: 40,
            //         name: '监督岗'
            //     },
              
            // ]

        },

        {
            name: '',
            type: 'funnel',
            left: 'center',
            width: '80%',
            maxSize: '80%',
            sort: 'ascending',
            label: {
                normal: {
                    position: 'inside',
                    formatter: '{c}',
                    textStyle: {
                        color: '#fff',
                        fontSize:14,
                    }
                },
                emphasis: {
                    position: 'inside',
                    formatter: '{b}: {c}'
                }
            },
            itemStyle: {
                normal: {
                    opacity: 8,
                    borderColor: 'rgba(12, 13, 43, .9)',
                    borderWidth: 3,
                    shadowBlur: 5,
                    shadowOffsetX: 0,
                    shadowOffsetY: 5,
                    shadowColor: 'rgba(0, 0, 0, .6)'
                }
            },


            data: this.data1
            // [{
            //         value: 10,
            //         name: '执法岗'
            //     }, {
            //         value: 20,
            //         name: '非执法岗'
            //     },
            //     {
            //         value: 40,
            //         name: '监督岗'
            //     },
               
            // ]

        }
    ]
       });
    },
     drawLeft2() {
      this.chartColumn = echarts.init(document.getElementById("ndafqs"));

      this.chartColumn.setOption({
    //     legend: {
    //   top: "90%",
    //   itemWidth: 10,
    //   itemHeight: 10,
    //   textStyle: {
    //     color: "rgba(0,0,0,.5)",
    //     fontSize: "12"
    //   }
    // },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    // 注意颜色写的位置
    color: [
      "#006cff",
      "#60cda0",
      "#ed8884",
      "#ff9f7f",
      "#0096ff",
      "#9fe6b8",
      "#32c5e9",
      "#1d9dff"
    ],
    series: [
      {
        name: "",
        type: "pie",
        // 如果radius是百分比则必须加引号
        radius: ["50%", "70%"],
        center: ["50%", "42%"],
        // roseType: "radius",

        data: this.data2,
        // [
        //   { value: 20, name: "公务员编制" },
        //   { value: 16, name: "参照公务员管理编制" },
        //   { value: 24, name: "事业编制" },
        //   { value: 25, name: "其他" },
       
        // ],

        // 修饰饼形图文字相关的样式 label对象
        label: {
          fontSize: 10
        },
        // 修饰引导线样式
        labelLine: {
          // 连接到图形的线长度
          length: 10,
          // 连接到文字的线长度
          length2: 10
        }
      }
    ]
      });

    },
drawBottom1() {
      this.chartColumn = echarts.init(document.getElementById("rysl"));

      this.chartColumn.setOption({
        backgroundColor: '',
        tooltip: {
        trigger: 'axis',
        formatter: "{b} : {c}",
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
    },
				grid: {
					top: '10',
					right: '20',
					left: '40',
					bottom: '70' //图表尺寸大小
				},
				xAxis: [{
					type: 'category',
					color: '#59588D',
                    data:this.data3,
                    //  ['执法 机构一', '执法 机构二', '执法 机构三', '执法 机构四', '执法 机构五', '执法 机构六', '执法 机构七', '执法 机构八'],
					axisLabel: {
						margin: 10,
						color: '#999',
						textStyle: {
							fontSize: 12
                        },
                        interval: 0,
                        formatter:function(value)
                        {
                            return value.split(" ").join("\n");
                        }
					},
					axisLine: {
						lineStyle: {
							color: 'rgba(107,107,107,0.37)',
						}
					},
					axisTick: {
						show: false
					},
				}],
				yAxis: [{
					axisLabel: {
						formatter: '{value}',
						color: '#999',
						textStyle: {
							fontSize: 12
						},
					},
					axisLine: {
						lineStyle: {
							color: 'rgba(107,107,107,0.37)',
						}
					},
					axisTick: {
						show: false
					},
					splitLine: {
						lineStyle: {
							color: 'rgba(131,101,101,0.2)',
							type: 'dashed',
						}
					}
				}],
				series: [{
					type: 'bar',
                    data: this.data4,
                    // [40, 65, 50, 36, 30, 35, 40, 60],
					barWidth: '16px',
					itemStyle: {
						normal: {
							color: function(params) { //展示正值的柱子，负数设为透明
								let colorArr = params.value > 0 ? ['#55d1ff', '#2d82ff'] : ['rgba(0,0,0,0)', 'rgba(0,0,0,0)']
								return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: colorArr[0] // 0% 处的颜色
								}, {
									offset: 1,
									color: colorArr[1] // 100% 处的颜色
								}], false)
							},
							barBorderRadius: [30, 30, 0, 0] //圆角大小
						},
					},
					label: {
						normal: {
							show: true,
							fontSize: 16,
							fontWeight: 'bold',
							color: '#333',
							position: 'top',
						}
					}
				}, {
					data: [40, 60, 40, 36, 30, 35, 40, 60],
					type: 'line',
					smooth: true,
					name: '折线图',
					symbol: 'none',
					lineStyle: {
						color: '#3275FB',
						width: 3,
						shadowColor: 'rgba(0, 0, 0, 0.3)', //设置折线阴影
						shadowBlur: 10,
						shadowOffsetY: 10,
					},
					areaStyle: {
						normal: {
							color: new echarts.graphic.LinearGradient(
								0,
								0,
								0,
								1,
								[{
										offset: 0,
										color: 'rgba(73, 86, 255, 0.5)',

									},
									{
										offset: 1,
										color: 'rgba(255, 255, 255, 0.1)',
									}
								],
								false
							),


						}
					},
				}]
      });

    },





drawBottom2() {
      this.chartColumn = echarts.init(document.getElementById("zbsl"));
this.chartColumn.setOption({
        backgroundColor: '',
        tooltip: {
        trigger: 'axis',
        formatter: "{b} : {c}",
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
    },
				grid: {
					top: '10',
					right: '20',
					left: '40',
					bottom: '70' //图表尺寸大小
				},
				xAxis: [{
					type: 'category',
					color: '#59588D',
                    data: this.data5,
                    // ['执法 机构一', '执法 机构二', '执法 机构三', '执法 机构四', '执法 机构五', '执法 机构六', '执法 机构七', '执法 机构八'],
					axisLabel: {
						margin: 10,
						color: '#999',
						textStyle: {
							fontSize: 12
                        },
                        interval: 0,
                        formatter:function(value)
                        {
                            return value.split(" ").join("\n");
                        }
					},
					axisLine: {
						lineStyle: {
							color: 'rgba(107,107,107,0.37)',
						}
					},
					axisTick: {
						show: false
					},
				}],
				yAxis: [{
					axisLabel: {
						formatter: '{value}',
						color: '#999',
						textStyle: {
							fontSize: 12
						},
					},
					axisLine: {
						lineStyle: {
							color: 'rgba(107,107,107,0.37)',
						}
					},
					axisTick: {
						show: false
					},
					splitLine: {
						lineStyle: {
							color: 'rgba(131,101,101,0.2)',
							type: 'dashed',
						}
					}
				}],
				series: [{
					type: 'bar',
					data: [40, 65, 50, 36, 30, 35, 40, 60],
					barWidth: '16px',
					itemStyle: {
						normal: {
							color: function(params) { //展示正值的柱子，负数设为透明
								let colorArr = params.value > 0 ? ['#55d1ff', '#2d82ff'] : ['rgba(0,0,0,0)', 'rgba(0,0,0,0)']
								return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: colorArr[0] // 0% 处的颜色
								}, {
									offset: 1,
									color: colorArr[1] // 100% 处的颜色
								}], false)
							},
							barBorderRadius: [30, 30, 0, 0] //圆角大小
						},
					},
					label: {
						normal: {
							show: true,
							fontSize: 16,
							fontWeight: 'bold',
							color: '#333',
							position: 'top',
						}
					}
				}, {
                    data: this.data6,
                    // [40, 60, 40, 36, 30, 35, 40, 60],
					type: 'line',
					smooth: true,
					name: '折线图',
					symbol: 'none',
					lineStyle: {
						color: '#3275FB',
						width: 3,
						shadowColor: 'rgba(0, 0, 0, 0.3)', //设置折线阴影
						shadowBlur: 10,
						shadowOffsetY: 10,
					},
					areaStyle: {
						normal: {
							color: new echarts.graphic.LinearGradient(
								0,
								0,
								0,
								1,
								[{
										offset: 0,
										color: 'rgba(73, 86, 255, 0.5)',

									},
									{
										offset: 1,
										color: 'rgba(255, 255, 255, 0.1)',
									}
								],
								false
							),


						}
					},
				}]
      });

    },
drawRight1() {
      this.chartColumn = echarts.init(document.getElementById("clpm"));

      this.chartColumn.setOption({
      backgroundColor: "",
       tooltip: {
        trigger: 'axis',
        formatter: "{b} : {c}",
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
		left: '12%',
		top: '10%',
		bottom: '20%',
		right: '8%'
	},
    xAxis: {
        data:this.data7,
        //  ['通讯 指挥类', '稽查 取证类', '基础 办案类', '安全 防护类', '安防 监控类','辅助 设备类' ],
       axisTick: {
			show: false
		},
		axisLine: {
			lineStyle: {
				color: 'rgba(255, 129, 109, 0.1)',
				width: 1 //这里是为了突出显示加上的
			}
		},
		axisLabel: {
			textStyle: {
				color: '#999',
        fontSize: 12,

      },
       interval: 0,
        formatter:function(value)
        {
            return value.split(" ").join("\n");
        }
		}
    },
    yAxis: [{
			splitNumber: 2,
			axisTick: {
				show: false
			},
			axisLine: {
				lineStyle: {
					color: 'rgba(255, 129, 109, 0.1)',
					width: 1 //这里是为了突出显示加上的
				}
			},
			axisLabel: {
				textStyle: {
					color: '#999'
				}
			},
			splitArea: {
				areaStyle: {
					color: 'rgba(255,255,255,.5)'
				}
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: 'rgba(255, 129, 109, 0.1)',
					width: 0.5,
					type: 'dashed'
				}
			}
		}
	],
    series: [{
        name: 'hill',
        type: 'pictorialBar',
        barCategoryGap: '0%',
        symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
        label: {
			show: true,
			position: 'top',
			distance: 15,
			color: '#DB5E6A',
			fontWeight: 'bolder',
			fontSize: 20,
		},
        itemStyle: {
            normal: {
				color: {
					type: 'linear',
					x: 0,
					y: 0,
					x2: 0,
					y2: 1,
					colorStops: [{
							offset: 0,
							color: 'rgba(232, 94, 106, .8)' //  0%  处的颜色
						},
						{
							offset: 1,
							color: 'rgba(232, 94, 106, .1)' //  100%  处的颜色
						}
					],
					global: false //  缺省为  false
				}
			},
			emphasis: {
				opacity: 1
			}
        },
        data: this.data8,
        // [123, 60, 25, 18, 12,11],
        z: 10
    }]
      });

    },
 drawRight2() {
      this.chartColumn = echarts.init(document.getElementById("afd"));
const colorList = ["#9E87FF", '#73DDFF', '#fe9a8b', '#F56948', '#9E87FF']
const xData = ['2015 年', '2016 年', '2017 年', '2018 年', '2019 年']
      this.chartColumn.setOption({
        backgroundColor: '',
    title: {
        text: '',
        textStyle: {
            fontSize: 12,
            fontWeight: 400
        },
        left: 'center',
        top: '5%'
    },
    legend: {
        icon: 'circle',
        top: '5%',
        right: '5%',
        itemWidth: 6,
        itemGap: 20,
        textStyle: {
            color: '#556677'
        }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            label: {
                show: true,
                backgroundColor: '#fff',
                color: '#556677',
                borderColor: 'rgba(0,0,0,0)',
                shadowColor: 'rgba(0,0,0,0)',
                shadowOffsetY: 0
            },
            lineStyle: {
                width: 0
            }
        },
        backgroundColor: '#fff',
        textStyle: {
            color: '#5c6c7c'
        },
        padding: [10, 10],
        extraCssText: 'box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)'
    },
    grid: {
        top: '15%',
        right:'5%',
        bottom:'35%'
    },
    xAxis: [{
        type: 'category',
        data: xData,
        axisLine: {
            lineStyle: {
                color: 'rgba(107,107,107,0.37)', //x轴颜色
            }
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            interval: 0,
            textStyle: {
                color: '#999' //坐标轴字颜色
            },
            margin: 15,
            interval: 0,
        formatter:function(value)
        {
            return value.split(" ").join("\n");
        }
        },
        axisPointer: {
            label: {
                padding: [11, 5, 7],
                backgroundColor: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: '#fff' // 0% 处的颜色
                    }, {
                        offset: 0.9,
                        color: '#fff' // 0% 处的颜色
                    }, {
                        offset: 0.9,
                        color: '#33c0cd' // 0% 处的颜色
                    }, {
                        offset: 1,
                        color: '#33c0cd' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                }
            }
        },
        boundaryGap: false
    }],
    yAxis: [{
        type: 'value',
        axisTick: {
            show: false
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: 'rgba(107,107,107,0.37)', //y轴颜色
            }
        },
        axisLabel: {
            textStyle: {
                color: '#999'
            }
        },
        splitLine: {
            show: false
        }
    }],
    series: [{
        name: '人员增长比',
        type: 'line',
        data: this.data9,
        // [11, 12, 12, 18, 30],
        symbolSize: 1,
        symbol: 'circle',
        smooth: true,
        yAxisIndex: 0,
        showSymbol: false,
        lineStyle: {
            width: 5,
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                    offset: 0,
                    color: '#9effff'
                },
                {
                    offset: 1,
                    color: '#9E87FF'
                }
            ]),
            shadowColor: 'rgba(158,135,255, 0.3)',
            shadowBlur: 10,
            shadowOffsetY: 20
        },
        itemStyle: {
            normal: {
                color: colorList[0],
                borderColor: colorList[0]
            }
        }
    },

    ]
      });

    },
//查询-----------------------------------------------------------------------------------------------------
//执法人员岗位分布
search1() {
      let data = {
        // year:val
      };
      console.log();
      gwfb(data).then(res => {  
          console.log(res);  
          var v=0;  
           res.forEach(item =>{
             v=v+item[1];
         });
         console.log(v);  
           this.data1.push({value: (res[0][1]/v*100).toFixed(2),name:res[0][0]});   
           this.data1.push({value: (res[1][1]/v*100).toFixed(2),name:res[1][0]});        
           this.data1.push({value: (res[2][1]/v*100).toFixed(2),name:res[2][0]});   
        console.log(res[1][1]/v*100); 
       this.drawLeft1();
      });
      err => {
        console.log(err);
      };
    },
//执法人员编制分布
search2() {
      let data = {
        // year:val
      };
      bzfb(data).then(res => {    
         res.forEach(item =>{
             this.data2.push({value: item[1],name:item[0]});
         });
       this.drawLeft2();
      });
      err => {
        console.log(err);
      };
    },
//执法机构人员数量
search3() {
      let data = {
        // year:val
      };


      rysl(data).then(res => {   
           this.data3.push(res[0][0],res[1][0],res[2][0],res[3][0],res[4][0]);
             this.data4.push(res[0][1],res[1][1],res[2][1],res[3][0],res[4][0]);
        
        //  res.forEach(item =>{
        //      this.data3.push(item[0]);
        //      this.data4.push(item[1]);
        //  });
        
       this.drawBottom1();
      });
      err => {
        console.log(err);
      };
    },
//执法机构装备数量
search4() {
      let data = {
        // year:val
      };
      zbsl(data).then(res => {               
         res.forEach(item =>{
             this.data5.push(item[0]);
             this.data6.push(item[1]);
         });       
       this.drawBottom2();
      });
      err => {
        console.log(err);
      };
    },
   //执法人员
search5() {
      let data = {
        // year:val
      };
      zfry(data).then(res => {   
        var map={};
         res.forEach(item =>{
             map[item[0]]=item[1];        
         });
        this.zfrysl=map['执法人员'];
      });
      err => {
        console.log(err);
      };
    },
    //执法装备
search6() {
      let data = {
        // year:val
      };
      zfzb(data).then(res => {   
        var map={};
         res.forEach(item =>{
             map[item[0]]=item[1];   
         });
      this.zfzbsl=map['执法装备'];
      });
      err => {
        console.log(err);
      };
    },
   //装备类型
search7() {
      let data = {
        // year:val
      };
      zblx(data).then(res => {   
         res.forEach(item =>{
            this.data7.push(item[0]);
             this.data8.push(item[1]);    
         });
        
      this.drawRight1();
      });
      err => {
        console.log(err);
      };
    },
     //执法人员增长同比
search8() {
      let data = {
        // year:val
      };
      zztb(data).then(res => {   
          console.log(res);
       var map={};
         res.forEach(item =>{
             map[item[0]]=item[1];      
         });
         console.log(map);
        this.data9.push(((map[2015]-map[2014])/(map[2014]==0?1:map[2014])).toFixed(2));
        this.data9.push(((map[2016]-map[2015])/(map[2015]==0?1:map[2015])).toFixed(2));
        this.data9.push(((map[2017]-map[2016])/(map[2016]==0?1:map[2016])).toFixed(2));
        this.data9.push(((map[2018]-map[2017])/(map[2017]==0?1:map[2017])).toFixed(2));
        this.data9.push(((map[2019]-map[2018])/(map[2018]==0?1:map[2018])).toFixed(2));
      this.drawRight2();
      });
      err => {
        console.log(err);
      };
    },

  },
  mounted() {
     this.search1();
     this.search2();
     this.search3();
     this.search4();
     this.search5();
     this.search6();
     this.search7();
     this.search8();
    // this.drawLeft1();
    // this.drawLeft2();
    // this.drawBottom1();
    // this.drawBottom2();
    // this.drawRight1();
    // this.drawRight2();
    this.map();
  },
  created() {}
};
</script>
<style scoped>
.body_bg{
  background-image: url("../../../../static/images/map/bg.png");
}
.title_1{
  background-image: url("../../../../static/images/map/导航-未选.png");
  background-size: 100%;
  height: 58px;
  width: 150px;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
background-repeat: no-repeat;
}
.title_font{

font-size:18px;
font-family:PingFangSC-Medium,PingFang SC;
font-weight:500;
color:rgba(92,216,255,1);
/* line-height:25px; */
text-shadow:0px 0px 24px rgba(14,40,100,1);

}
.title_2{
width:380px;
height:42px;
font-size:20px;
font-family:PingFangSC-Medium,PingFang SC;
font-weight:300;
color:rgba(255,255,255,1);
line-height:63px;
text-shadow:0px 4px 6px rgba(4,42,173,1);
text-align: center;
}
.title_3{
  background-image: url("../../../../static/images/map/选中.png");
  background-size: 100%;
  background-repeat: no-repeat;
  height: 58px;
  width: 150px;
  text-align: center;
  line-height: 60px;
  cursor: pointer;
}
.title_4{
  background-image: url("../../../../static/images/map/右侧边框.png");
  background-size: 100%;
  background-repeat: no-repeat;
  height: 58px;
  width: 190px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
}
.title_5{
  background-image: url("../../../../static/images/map/右侧边框.png");
  background-size: 100%;
  background-repeat: no-repeat;
  height: 58px;
  width: 190px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
}
.left_1{
width:300px;
height:200px;
background:rgba(13,18,38,0.1);
box-shadow:0px 0px 4px 1px rgba(12,81,149,0.5);
border:1px solid rgba(14,101,187,0.5);
margin-left: 30px;
}
.left_2{
width:300px;
height:200px;
background:rgba(13,18,38,0.1);
box-shadow:0px 0px 4px 1px rgba(12,81,149,0.5);
border:1px solid rgba(14,101,187,0.5);
margin-left: 30px;
margin-top: 5px;
}
.bottom_1{
width:540px;
height:200px;
background:rgba(13,18,38,0.1);
box-shadow:0px 0px 4px 1px rgba(12,81,149,0.5);
border:1px solid rgba(14,101,187,0.5);
margin-left: 30px;
margin-top: 5px;
}
.center_1{
  background-image: url("../../../../static/images/map/地图bg.png");
  background-size: 100%;
  height: 410px;
}
.bottom_2{
width:540px;
height:200px;
background:rgba(13,18,38,0.1);
box-shadow:0px 0px 4px 1px rgba(12,81,149,0.5);
border:1px solid rgba(14,101,187,0.5);
margin-left: 5px;
margin-top: 5px;
}
.right_1{
width:300px;
height:200px;
background:rgba(13,18,38,0.1);
box-shadow:0px 0px 4px 1px rgba(12,81,149,0.5);
border:1px solid rgba(14,101,187,0.5);
margin-left: 5px;
}
.right_2{
width:300px;
height:200px;
background:rgba(13,18,38,0.1);
box-shadow:0px 0px 4px 1px rgba(12,81,149,0.5);
border:1px solid rgba(14,101,187,0.5);
margin-left: 5px;
margin-top: 5px;
}
.bt{
width:100%;
height:22px;
font-size:16px;
font-family:PingFangSC-Regular,PingFang SC;
font-weight:400;
color:rgba(4,241,248,1);
line-height:22px;
padding-left: 10px;
}
.type{
width:66px;
height:20px;
font-size:13px;
font-family:PingFangSC-Regular,PingFang SC;
font-weight:400;
color:rgba(255,255,255,1);
line-height:20px;
}
.count{
width:58px;
height:42px;
font-size:22px;
font-family:DINCond-Bold,DINCond;
font-weight:bold;
color:rgba(4,241,248,1);
line-height:42px;
}
.dw{
width:14px;
height:20px;
font-size:14px;
font-family:PingFangSC-Regular,PingFang SC;
font-weight:400;
color:rgba(255,255,255,1);
line-height:20px;
margin-left: 15px;
}
.ajbjl{
width:70px;
height:19px;
font-size:14px;
font-family:MicrosoftYaHei;
color:rgba(255,255,255,1);
line-height:19px;
margin-top: 70px;
}
.sl{
width:190px;
height:51px;
font-size:17px;
font-family:DINCondensed-Bold,DINCondensed;
font-weight:bold;
color:rgba(4,241,248,1);
line-height:61px;
}
.body_bg .el-main {
    background: none;
    width:'100%';
}
.main {
    background-image: url("../../../../static/images/map/边框.png");
    background-size: 100% 100%;
}
.right_font0{
width:196px;
height:28px;
font-size:20px;
font-family:PingFangSC-Regular,PingFang SC;
font-weight:400;
color:rgba(255,255,255,1);
line-height:28px;
}
.right_font1{
width:196px;
height:28px;
font-size:18px;
font-family:PingFangSC-Regular,PingFang SC;
font-weight:400;
color:#FF9703;
line-height:28px;
}
</style>
