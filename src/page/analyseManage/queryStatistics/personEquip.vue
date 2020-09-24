<template>
  <el-container class="body_bg">
      <el-main >
          <el-row class="main">
       <el-row>
          <el-col :span="6" style="height:60px;margin-top: 35px;margin-left: 100px; " >
              <div class="title_1 title_font"  @click="ajpage()">执法案件</div>
          </el-col>
          <el-col :span="4" class="title_2" style="margin-left: 13px;">
               宁夏执法数据分析研判系统
          </el-col>
          <el-col :span="6" style="height:60px;margin-left: -520px;margin-top: 28px;" >
              <div class="title_3 title_font" @click="zbpage()" >人员装备</div>

          </el-col>
           <el-col :span="4" style="height:60px;margin-left:-30px;margin-top: 35px;" >
              <div class="title_4" >
                  <span class="right_font0">执法人员：</span>
                  <span class="right_font1">96人</span>
              </div>

          </el-col>
           <el-col :span="4" style="height:60px;margin-left:0px;margin-top: 35px;" >
              <div class="title_5" >
                  <span class="right_font0">执法装备：</span>
                  <span class="right_font1">72件</span>
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


<script>
import echarts from "echarts";

import "echarts/map/js/china.js";
/*import "echarts/map/js/province/jiangxi.js";
import "echarts/map/json/province/jiangxi.json";*/
import "echarts/map/js/province/ningxia.js";
import "echarts/map/json/province/ningxia.json";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/chart/heatmap";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/tooltip";
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
      }
    };
  },
  methods:{
      ajpage(){
           this.$router.push({ path:'/lawCase'  })
      },
      zbpage(){
           this.$router.push({ path:'/personEqpt'  })
      },
    /*map() {
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
        /!**
         * i 实例对象
         * o option
         * n 地图名
        **!/
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

        /!**
         * name 地图名
        **!/
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
        }]
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
    		console.log(name, option, instance);
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
    	}]
    });
})

    },*/
    map() {
      var ningxia = "../../../../static/json/map/ningxia.json";
      var guyuan = "../../../../static/json/map/guyuan.json";
      var shizuishan = "../../../../static/json/map/shizuishan.json";
      var wuzhong = "../../../../static/json/map/wuzhong.json";
      var yinchuan = "../../../../static/json/map/yinchuan.json";
      var zhongwei = "../../../../static/json/map/zhongwei.json";

      echarts.extendsMap = function (id, opt) {
        // 实例
        var chart = this.init(document.getElementById("map"));

        var curGeoJson = {};
        var cityMap = {
          "固原市": guyuan,
          "石嘴山市": shizuishan,
          "吴忠市": wuzhong,
          "银川市": yinchuan,
          "中卫市": zhongwei
        };
        var geoCoordMap = {
          '中卫市': [105.196754199, 37.5211241916],
          '吴忠市': [106.208254199, 37.9935610029],
          '固原市': [106.285267996, 36.0215234807],
          '石嘴山市': [106.379337202, 39.0202232836],
          '银川市': [106.206478608, 38.5026210119],
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
          callback: function (name, option, instance) {
          }
        };
        if (opt) opt = this.util.extend(defaultOpt, opt);

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

          resetOption: function (i, o, n) {
            var breadcrumb = this.createBreadcrumb(n);

            var j = name.indexOf(n);
            var l = o.graphic.length;
            if (j < 0) {
              o.graphic.push(breadcrumb);
              o.graphic[0].children[0].shape.x2 = 145;
              o.graphic[0].children[1].shape.x2 = 145;
              if (o.graphic.length > 2) {
                for (var x = 0; x < opt.data.length; x++) {
                  if (n === opt.data[x].name + '市') {
                    o.series[0].data = handleEvents.initSeriesData([opt.data[x]]);
                    break;
                  } else o.series[0].data = [];
                }
              }
              ;
              name.push(n);
              idx++;
            } else {
              o.graphic.splice(j + 2, l);
              if (o.graphic.length <= 2) {
                o.graphic[0].children[0].shape.x2 = 60;
                o.graphic[0].children[1].shape.x2 = 60;
                o.series[0].data = handleEvents.initSeriesData(opt.data);
              }
              ;
              name.splice(j + 1, l);
              idx = j;
              pos.leftCur -= pos.leftPlus * (l - j - 1);
            }
            ;

            o.geo.map = n;
            o.geo.zoom = 0.4;
            i.clear();
            i.setOption(o);
            this.zoomAnimation();
            opt.callback(n, o, i);
          },

          createBreadcrumb: function (name) {
            var cityToPinyin = {
              "固原市": 'guyuan.json',
              "石嘴山市": 'shizuishan',
              "吴忠市": 'wuzhong',
              "银川市": 'yinchuan',
              "中卫市": 'zhongwei'
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
                onclick: function () {
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
                onclick: function () {
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
                onclick: function () {
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
          initSeriesData: function (data) {
            var temp = [];
            for (var i = 0; i < data.length; i++) {
              var geoCoord = geoCoordMap[data[i].name];
              if (geoCoord) {
                temp.push({
                  name: data[i].name,
                  value: geoCoord.concat(data[i].value, data[i].level)
                });
              }
            }
            ;
            return temp;
          },

          zoomAnimation: function () {
            var count = null;
            var zoom = function (per) {
              if (!count) count = per;
              count = count + per;
              // console.log(per,count);
              chart.setOption({
                geo: {
                  zoom: count
                }
              });
              if (count < 1) window.requestAnimationFrame(function () {
                zoom(0.2);
              });
            };
            window.requestAnimationFrame(function () {
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
              onclick: function () {
                var name = this.style.key;
                handleEvents.resetOption(chart, option, name);
              }
            }, {
              type: 'text',
              left: 0,
              top: 'left',
              style: {
                text: name[0] === '宁夏' ? '宁夏' : name[0],
                textAlign: 'left',
                fill: style.textColor,
                font: style.font
              },
              onclick: function () {
                handleEvents.resetOption(chart, option, '宁夏');
              }
            }, {
              type: 'text',
              left: 0,
              top: 20,
              style: {
                text: 'NINGXIA',
                textAlign: 'center',
                fill: style.textColor,
                font: '12px "Microsoft YaHei", sans-serif',
              },
              onclick: function () {
                handleEvents.resetOption(chart, option, '宁夏');
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
            regions: opt.activeArea.map(function (item) {
              if (typeof item !== 'string') {
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
              } else {
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
                color: function (params) {
                  return levelColorMap[params.value[3]];
                },
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },
            data: handleEvents.initSeriesData(opt.data)
          }]
        };

        chart.setOption(option);
        // 添加事件
        chart.on('click', function (params) {
          var _self = this;
          if (opt.goDown && params.name !== name[idx]) {
            if (cityMap[params.name]) {
              var url = cityMap[params.name];
              $.get(url, function (response) {
                // console.log(response);
                curGeoJson = response;
                echarts.registerMap(params.name, response);
                handleEvents.resetOption(_self, option, params.name);
              });
            }
          }
        });

        chart.setMap = function (mapName) {
          var _self = this;
          if (mapName.indexOf('市') < 0) mapName = mapName + '市';
          var citySource = cityMap[mapName];
          if (citySource) {
            var url = './map/' + citySource + '.json';
            $.get(url, function (response) {
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

      $.getJSON(ningxia, function (geoJson) {
        echarts.registerMap('宁夏', geoJson);
        var myChart = echarts.extendsMap('chart-panel', {
          bgColor: '#154e90', // 画布背景色
          mapName: '宁夏',    // 地图名
          goDown: true,       // 是否下钻
          // 下钻回调
          callback: function (name, option, instance) {
            console.log(name, option, instance);
          },
          // 数据展示
          data: [{
            name: '银川',
            value: 10,
            level: 1
          }, {
            name: '固原',
            value: 12,
            level: 2
          }, {
            name: '石嘴山',
            value: 55,
            level: 3
          }, {
            name: '吴忠',
            value: 16,
            level: 2
          }, {
            name: '中卫',
            value: 17,
            level: 4
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

            data: [{
                    value: 10,
                    name: '执法岗'
                }, {
                    value: 20,
                    name: '非执法岗'
                },
                {
                    value: 40,
                    name: '监督岗'
                },

            ]
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
                    formatter: '{c}%',
                    textStyle: {
                        color: '#fff',
                        fontSize:14,
                    }
                },
                emphasis: {
                    position: 'inside',
                    formatter: '{b}: {c}%'
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

            data: [{
                    value: 10,
                    name: '执法岗'
                }, {
                    value: 20,
                    name: '非执法岗'
                },
                {
                    value: 40,
                    name: '监督岗'
                },

            ]
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
        name: "点位统计",
        type: "pie",
        // 如果radius是百分比则必须加引号
        radius: ["10%", "70%"],
        center: ["50%", "42%"],
        roseType: "radius",
        data: [
          { value: 20, name: "公务员编制" },
          { value: 16, name: "参照公务员管理编制" },
          { value: 24, name: "事业编制" },
          { value: 25, name: "其他" },

        ],
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
					data: ['执法 机构一', '执法 机构二', '执法 机构三', '执法 机构四', '执法 机构五', '执法 机构六', '执法 机构七', '执法 机构八'],
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
					data: ['执法 机构一', '执法 机构二', '执法 机构三', '执法 机构四', '执法 机构五', '执法 机构六', '执法 机构七', '执法 机构八'],
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
        data: ['通讯 指挥类', '稽查 取证类', '基础 办案类', '安全 防护类', '安防 监控类','辅助 设备类' ],
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
        data: [123, 60, 25, 18, 12,11],
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
        data: [11, 12, 12, 18, 30],
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








  },
  mounted() {
    this.drawLeft1();
    this.drawLeft2();
    this.drawBottom1();
    this.drawBottom2();
    this.drawRight1();
    this.drawRight2();
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
