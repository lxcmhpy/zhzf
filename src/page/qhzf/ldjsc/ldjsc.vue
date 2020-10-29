<template>
  <el-container class="body_bg"> 
      <el-main>
          <el-row class="main">
        <el-row>
          <el-col :span="6" style="height:60px;margin-top: 25px;margin-left: 100px; " >
              <div class="dptitle_1 dptitle_font" >领导驾驶仓</div>
          </el-col>
          <el-col :span="4" class="dptitle_2" >
               <!-- 江西省执法数据分析研判系统 -->
          </el-col>
          <!-- <el-col :span="6" style="height:60px;margin-left: -505px;margin-top: 35px;" >
              <div class="dptitle_3 dptitle_font" @click="zbpage()">人员装备</div>
               
          </el-col> -->
          <el-col :span="6" style="height:60px;margin-left:50px;margin-top: 35px;" >
              <div class="dptitle_4" >
                  <span class="dpright_font0">涉案本地车辆：</span>
                  <span class="dpright_font1">{{bdcl}}辆</span>
              </div>
               
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7" >
            <el-row  class="left_1">
              <el-row  >
                <div class="bt">案件类型</div>
              </el-row>
              <el-row>
                  <el-row style="text-align:center">
                       <el-col :span="6" ><img src="../../../../static/images/map/一般案件.png" style="height:60px;width:60px;"></el-col>
                       <el-col :span="6" ><img src="../../../../static/images/map/处罚案件.png" style="height:60px;width:60px;"></el-col>
                       <el-col :span="6" ><img src="../../../../static/images/map/赔补偿案件.png" style="height:60px;width:60px;"></el-col>
                       <el-col :span="6" ><img src="../../../../static/images/map/超限超载.png" style="height:60px;width:60px;"></el-col>
                  </el-row>
                  <el-row style="text-align:center">
                       <el-col :span="6" ><div class="type">一般案件</div></el-col>
                       <el-col :span="6" ><div class="type">处罚案件</div></el-col>
                       <el-col :span="6" ><div class="type">赔补偿案件</div></el-col>
                       <el-col :span="6" ><div class="type">超限超载</div></el-col>
                  </el-row>
                  <el-row style="text-align:center">
                       <el-col :span="6" ><div id="ybaj" class="count">{{ybaj}}</div></el-col>
                       <el-col :span="6" ><div id="cfaj" class="count">{{cfaj}}</div></el-col>
                       <el-col :span="6" ><div id="pbcaj" class="count">{{pbcaj}}</div></el-col>
                       <el-col :span="6" ><div id="cxcz" class="count">{{cxcz}}</div></el-col>
                  </el-row>
                  <el-row style="text-align:center">
                       <el-col :span="6" ><div class="dw">例</div></el-col>
                       <el-col :span="6" ><div class="dw">例</div></el-col>
                       <el-col :span="6" ><div class="dw">例</div></el-col>
                       <el-col :span="6" ><div class="dw">例</div></el-col>
                  </el-row>
              </el-row>
            </el-row>
            <el-row class="left_2">
               <el-row  >
                <div class="bt">年度案发趋势</div>
              </el-row>
              <el-row>
                 <div id="ndafqs" style="width: 100%; height: 200px;"></div>
              </el-row>
            </el-row>
            <el-row class="left_3">
               <el-row  >
                <div class="bt">案件状态</div>
              </el-row>
              <el-row>
                <el-col :span="12" > 
                  <div id="ajzt" style="width: 100%; height: 200px;margin-top:-20px"></div>
                </el-col>
                <el-col :span="12" style="" >
                  <el-row  >
                    <div class="ajbjl">案件办结率</div>
                    </el-row>
                      <el-row  >
                             <div style="width:200px" >
                                 <span class="sl">{{ja}}</span>
                                 <span class="dw" style="margin-left:0px;">例/</span>
                                 <span class="sl2">{{af}}</span>
                                 <span class="dw" style="margin-left:0px;">例</span>
                            </div>                         
                        </el-row>
                  </el-col>
                
              </el-row>
            </el-row>
          </el-col>
          <el-col :span="10" >
              <el-row class="center_1">
              <div id="map" style="width: 485px; height: 400px;"></div>
            </el-row>
            <el-row class="center_2">
               <el-row  >
                <div class="bt">执法机构案件数量</div>
              </el-row>
              <el-row>
                 <div id="zfjgajsl" style="width: 100%; height: 200px;"></div>
              </el-row>
            </el-row>
          </el-col>
           <el-col :span="7" >
             <el-row class="right_1">
              <el-row  >
                <div class="bt">涉案外埠车辆省份排名 TOP5</div>
              </el-row>
              <el-row>
                 <div id="clpm" style="width: 100%; height: 170px;"></div>
              </el-row>
            </el-row>
            <el-row class="right_2">
               <el-row  >
                <div class="bt">案发地</div>
              </el-row>
              <el-row>
                 <div id="afd" style="width: 100%; height: 200px;"></div>
              </el-row>
            </el-row>
            <el-row class="right_3">
              <el-row  >
                <div class="bt">罚没款项</div>
              </el-row>
              <el-row style="text-align:center;">
                 <el-row>
                       <el-col :span="12" ><img src="../../../../static/images/map/处罚金额.png" style="height:80px;width:100px;"></el-col>
                       <el-col :span="12" ><img src="../../../../static/images/map/执行金额.png" style="height:80px;width:100px;"></el-col>
                      

                  </el-row>
                  <el-row >
                       <el-col :span="12" ><div class="type" style="height:30px;width:100px;margin-left:25px;">【 处罚金额 】</div></el-col>
                       <el-col :span="12" ><div class="type" style="height:30px;width:100px;margin-left:25px;">【 执行金额 】</div></el-col>
                       
                  </el-row>
                  <el-row>
                       <el-col :span="12" ><div class="count" style="height:40px;width:100px;margin-left:25px;">{{cfje}}</div></el-col>
                       <el-col :span="12" ><div class="count" style="height:40px;width:100px;margin-left:25px;">{{zxje}}</div></el-col>
                       
                  </el-row>
                  <el-row>
                       <el-col :span="12" ><div class="dw" style="height:30px;width:100px;margin-left:25px;">万元</div></el-col>
                       <el-col :span="12" ><div class="dw" style="height:30px;width:100px;margin-left:25px;">万元</div></el-col>
                     
                  </el-row>
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
import "../../../../static/css/animate.min.css";
import {
      ndajsltbtj,ajlx,ajzt,zfjgajsl,fmkx,bdcl,wdcl,afddfb,map,mapybaj,mapcfaj,mappbcaj,mapcxcz
    } from '@/api/fxyp.js'
export default {
  data() {
    return {
    //   ybaj:"4306",
    //   cxcz:"9372",
    //   cfaj:"769",
    //   pbcaj:"9273",
      ybaj:"",
      cxcz:"",
      cfaj:"",
      pbcaj:"",
      data1:[],
      data2:[],
      ja:"",
      af:"",
      jal:"",
      data3:[],
      data4:[],
      cfje:"",
      zxje:"",
      bdcl:"",
      data5:[],
      data6:[],
      data7:[],
      data8:[],
      datamap:
       [{
    		name: '西宁市',
            value: 0,
            value1: 0,
            value2: 0,
            value3: 0,
            value4: 0,
    		level: 1
    	}, {
    		name: '玉树藏族自治州',
            value: 0,
            value1: 0,
            value2: 0,
            value3: 0,
            value4: 0,
    		level: 2
    	}, {
    		name: '黄南藏族自治州',
            value: 0,
            value1: 0,
            value2: 0,
            value3: 0,
            value4: 0,
    		level: 3
    	}, {
    		name: '海南藏族自治州',
            value: 0,
            value1: 0,
            value2: 0,
            value3: 0,
            value4: 0,
    		level: 2
    	}, {
    		name: '海西蒙古族藏族自治州',
            value: 0,
            value1: 0,
            value2: 0,
            value3: 0,
            value4: 0,
    		level: 1
    	}, {
    		name: '海东市',
            value: 0,
            value1: 0,
            value2: 0,
            value3: 0,
            value4: 0,
    		level: 1
    	}, {
    		name: '海北藏族自治州',
            value: 0,
            value1: 0,
            value2: 0,
            value3: 0,
            value4: 0,
    		level: 1
    	}, {
    		name: '果洛藏族自治州',
            value: 0,
            value1: 0,
            value2: 0,
            value3: 0,
            value4: 0,
    		level: 1
    	}],
      nc:0,
      jj:0,
      sr:0,
      fz:0,
      yc:0,
      ja:0,
      gz:0,
      jdz:0,
      px:0,
      xy:0,
      yt:0,
    };
  },
  methods:{
    map(datamap) {
     var qinghai = "../../../../static/json/map/青海-630000.json";
    var xining = "../../../../static/json/map/西宁市-630100.json";
    var yushu = "../../../../static/json/map/玉树藏族自治州-632700.json";
    var huangnan = "../../../../static/json/map/黄南藏族自治州-632300.json";
    var haixi = "../../../../static/json/map/海西蒙古族藏族自治州-632800.json";
    var hainan = "../../../../static/json/map/海南藏族自治州-632500.json";
    var haidong = "../../../../static/json/map/海东市-630200.json";
    var haibei = "../../../../static/json/map/海北藏族自治州-632200.json";
    var guoluo = "../../../../static/json/map/果洛藏族自治州-632600.json";
echarts.extendsMap = function(id, opt){
    // 实例
    var chart = this.init(document.getElementById("map"));

    var curGeoJson = {};
    var cityMap = {
        "西宁市": xining,
        "玉树藏族自治州": yushu,
        "黄南藏族自治州": huangnan,
        "海西蒙古族藏族自治州": haixi,
        "海南藏族自治州": hainan,
        "海东市": haidong,
        "海北藏族自治州": haibei,
        "果洛藏族自治州": guoluo,
    };
    var geoCoordMap = {
        '西宁市': [101.76792099, 36.640738612],
                    '玉树藏族自治州': [97.0133161374, 33.0062399097],
                    '黄南藏族自治州': [102.007600308, 35.5228515517],
                    '海西蒙古族藏族自治州': [97.3426254153, 37.3737990706],
                    '海南藏族自治州': [100.624066094, 36.2843638038],
                    '海东市': [102.085206987, 36.5176101677],
                    '海北藏族自治州': [100.879802174, 36.9606541011],
                    '果洛藏族自治州': [100.223722769, 34.4804845846],
                    '大通回族土族自治县':[101.67,36.92],
                    // '茫崖市':[102.09,36.47],
                    '德令哈市':[97.36084,37.36946],
                    '平安区':[102.09,36.47],
                    '湟中县':[101.57,36.49],
                    '乐都区':[102.38,36.49],
                    '民和回族土族自治县':[102.80,36.30],
                    '湟源县':[101.28,36.72],
                    '互助土族自治县':[101.95,36.84],
                    '化隆回族自治县':[102.30,36.11],
                    '循化撒拉族自治县':[102.46,35.84],
                    '门源回族自治县':[101.62,37.37],
                    '海晏县':[100.99,36.89],
                    '刚察县':[100.17,37.32],
                    '祁连县':[100.22,38.20],
                    '同仁县':[102.00,35.54],
                    '尖扎县':[102.00,35.92],
                    '泽库县':[101.50,35.03],
                    '河南蒙古族自治县':[101.62,34.75],
                    '共和县':[100.61,36.27],
                    '贵德县':[101.47,36.02],
                    '贵南县':[100.75,35.57],
                    '同德县':[100.63,35.24],
                    '兴海县':[99.99,35.60],
                    '玛沁县':[100.26,34.49],
                    '甘德县':[99.89,33.95],
                    '久治县':[101.47,33.46],
                    '班玛县':[100.73,32.92],
                    '达日县':[99.68,33.74],
                    '玛多县':[98.26,34.92],
                    '玉树市':[96.97,33.03],
                    '称多县':[97.12,33.35],
                    '囊谦县':[96.47,32.23],
                    '杂多县':[95.30,32.92],
                    '治多县':[95.60,33.86],
                    '曲麻菜县':[95.50,34.52],
                    '格尔木市':[94.90,36.41],
                    '乌兰县':[98.46,36.90],
                    '都兰县':[98.13,36.30],
                    '天峻县':[99.03,37.28],
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
		left: 30,
		top: 5
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
                "西宁市": "xining",
                "玉树藏族自治州": "yushu",
                "黄南藏族自治州": "huangnan",
                "海西蒙古族藏族自治州": "haixi",
                "海南藏族自治州": "hainan",
                "海东市": "haidong",
                "海北藏族自治州": "haibei",
                "果洛藏族自治州": "guoluo",


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
                        value: geoCoord.concat(data[i].value, data[i].level),
                         value1: geoCoord.concat(data[i].value1, data[i].level),
                        value2: geoCoord.concat(data[i].value2, data[i].level),
                        value3: geoCoord.concat(data[i].value3, data[i].level),
                        value4: geoCoord.concat(data[i].value4, data[i].level),
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
	        		text: name[0] === '青海' ? '青海省' : name[0],
	        		textAlign: 'left',
	        		fill: style.textColor,
	        		font: style.font
	        	},
	        	onclick: function(){
	        		handleEvents.resetOption(chart, option, '青海');
	        	}
        	}, {
                type: 'text',
                left: 0,
                top: 20,
                style: {
                    text: 'QINGHAI',
                    textAlign: 'center',
                    fill: style.textColor,
                    font: '12px "Microsoft YaHei", sans-serif',
                },
                onclick: function(){
                    handleEvents.resetOption(chart, option, '青海');
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
                var value1 = params.data.value1[2];
                var value2 = params.data.value2[2];
                var value3 = params.data.value3[2];
                var value4 = params.data.value4[2];
                res = "<span style='color:#fff;'>" + name + "</span><br/>案件数量：" + value
                +"<br/>一般案件：" + value1
                +"<br/>处罚案件：" + value2
                +"<br/>赔补偿案件：" + value3
                +"<br/>超限超载：" + value4
                ;
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
                curGeoJson = response;
                echarts.registerMap(mapName, response);
                handleEvents.resetOption(_self, option, mapName);
            });
        }
        // handleEvents.resetOption(this, option, mapName);
    };

    return chart;
};

$.getJSON(qinghai, function(geoJson){
    echarts.registerMap('青海', geoJson);
    var myChart = echarts.extendsMap('chart-panel', {
    	bgColor: '#154e90', // 画布背景色
    	mapName: '青海',    // 地图名
    	goDown: true,       // 是否下钻
    	// 下钻回调
    	callback: function(name, option, instance){

         console.log(name);
          if(name=="西宁市"){
              option.series[0].data.push({name: "大通回族土族自治县",value:[101.67, 36.92,0,3],
              value1:[101.67, 36.92,0,3],
              value2:[101.67, 36.92,0,3],
              value3:[101.67, 36.92,0,3],
              value4:[101.67, 36.92,0,3]
              });
              option.series[0].data.push({name: "湟中县",value:[101.57, 36.49, 0, 1],
              value1:[101.57, 36.49,0,3],
              value2:[101.57, 36.49,0,3],
              value3:[101.57, 36.49,0,3],
              value4:[101.57, 36.49,0,3]
              });
              option.series[0].data.push({name: "甘德县",value:[101.28, 36.72, 0, 2],
              value1:[101.28, 36.72,0,3],
              value2:[101.28, 36.72,0,3],
              value3:[101.28, 36.72,0,3],
              value4:[101.28, 36.72,0,3]
              });

         }
         if(name=="海东市"){
              option.series[0].data.push({name: "乐都区",value:[102.38, 36.49, 0, 1],
              value1:[102.38, 36.49,0,3],
              value2:[102.38, 36.49,0,3],
              value3:[102.38, 36.49,0,3],
              value4:[102.38, 36.49,0,3]
              });
              option.series[0].data.push({name: "民和回族土族自治县",value:[102.8, 36.3, 0, 2],
              value1:[102.8, 36.3,0,3],
              value2:[102.8, 36.3,0,3],
              value3:[102.8, 36.3,0,3],
              value4:[102.8, 36.3,0,3]
              });
              option.series[0].data.push({name: "互助土族自治县",value:[101.95, 36.84, 0, 2],
              value1:[101.95, 36.84,0,3],
              value2:[101.95, 36.84,0,3],
              value3:[101.95, 36.84,0,3],
              value4:[101.95, 36.84,0,3]
              });
              option.series[0].data.push({name: "化隆回族自治县",value:[102.3, 36.11, 0, 2],
              value1:[102.3, 36.11,0,3],
              value2:[102.3, 36.11,0,3],
              value3:[102.3, 36.11,0,3],
              value4:[102.3, 36.11,0,3]
              });
              option.series[0].data.push({name: "循化撒拉族自治县",value:[102.46, 35.84, 0, 2],
              value1:[102.46, 35.84,0,3],
              value2:[102.46, 35.84,0,3],
              value3:[102.46, 35.84,0,3],
              value4:[102.46, 35.84,0,3]
              });
              option.series[0].data.push({name: "平安区",value:[102.09, 36.47, 0,3],
              value1:[102.09, 36.47,0,3],
              value2:[102.09, 36.47,0,3],
              value3:[102.09, 36.47,0,3],
              value4:[102.09, 36.47,0,3]
              });
         }
         if(name=="黄南藏族自治州"){
              option.series[0].data.push({name: "同仁县",value:[102, 35.54, 0, 2],
              value1:[102, 35.54,0,3],
              value2:[102, 35.54,0,3],
              value3:[102, 35.54,0,3],
              value4:[102, 35.54,0,3]
              });
              option.series[0].data.push({name: "尖扎县",value:[102, 35.92, 0, 2],
              value1:[102, 35.92,0,3],
              value2:[102, 35.92,0,3],
              value3:[102, 35.92,0,3],
              value4:[102, 35.92,0,3]
              });
              option.series[0].data.push({name: "泽库县",value:[101.5, 35.03, 0, 1],
              value1:[101.5, 35.03,0,3],
              value2:[101.5, 35.03,0,3],
              value3:[101.5, 35.03,0,3],
              value4:[101.5, 35.03,0,3]
              });
              option.series[0].data.push({name: "河南蒙古族自治县",value:[101.62, 34.75, 0, 2],
              value1:[101.62, 34.75,0,3],
              value2:[101.62, 34.75,0,3],
              value3:[101.62, 34.75,0,3],
              value4:[101.62, 34.75,0,3]
              });

         }
         if(name=="海南藏族自治州"){
              option.series[0].data.push({name: "共和县",value:[100.61, 36.27, 0, 3],
              value1:[100.61, 36.27,0,3],
              value2:[100.61, 36.27,0,3],
              value3:[100.61, 36.27,0,3],
              value4:[100.61, 36.27,0,3]
              });
              option.series[0].data.push({name: "同德县",value:[100.63, 35.24, 0,1],
              value1:[100.63, 35.24,0,3],
              value2:[100.63, 35.24,0,3],
              value3:[100.63, 35.24,0,3],
              value4:[100.63, 35.24,0,3]
              });
              option.series[0].data.push({name: "贵德县",value:[101.47, 36.02, 0, 2],
              value1:[101.47, 36.02,0,3],
              value2:[101.47, 36.02,0,3],
              value3:[101.47, 36.02,0,3],
              value4:[101.47, 36.02,0,3]
              });
              option.series[0].data.push({name: "兴海县",value:[99.99, 35.6, 0, 2],
              value1:[99.99, 35.6,0,3],
              value2:[99.99, 35.6,0,3],
              value3:[99.99, 35.6,0,3],
              value4:[99.99, 35.6,0,3]
              });
              option.series[0].data.push({name: "贵南县",value:[100.75, 35.57, 0, 2],
              value1:[100.75, 35.57,0,3],
              value2:[100.75, 35.57,0,3],
              value3:[100.75, 35.57,0,3],
              value4:[100.75, 35.57,0,3]
              });
         }
         if(name=="海北藏族自治州"){
              option.series[0].data.push({name: "门源回族自治县",value:[101.62, 37.37, 0, 2],
              value1:[101.62, 37.37,0,3],
              value2:[101.62, 37.37,0,3],
              value3:[101.62, 37.37,0,3],
              value4:[101.62, 37.37,0,3]
              });
              option.series[0].data.push({name: "祁连县",value:[100.22, 38.2, 0,1],
              value1:[100.22, 38.2,0,3],
              value2:[100.22, 38.2,0,3],
              value3:[100.22, 38.2,0,3],
              value4:[100.22, 38.2,0,3]
              });
              option.series[0].data.push({name: "海晏县",value:[100.99, 36.89, 0, 2],
              value1:[100.99, 36.89,0,3],
              value2:[100.99, 36.89,0,3],
              value3:[100.99, 36.89,0,3],
              value4:[100.99, 36.89,0,3]
              });
              option.series[0].data.push({name: "刚察县",value:[100.17, 37.32, 0, 2],
              value1:[100.17, 37.32,0,3],
              value2:[100.17, 37.32,0,3],
              value3:[100.17, 37.32,0,3],
              value4:[100.17, 37.32,0,3]
              });
         }
         if(name=="果洛藏族自治州"){
               option.series[0].data.push({name: "玛沁县",value:[100.26,34.49,0,2],
              value1:[100.26,34.49,0,3],
              value2:[100.26,34.49,0,3],
              value3:[100.26,34.49,0,3],
              value4:[100.26,34.49,0,3]
              });
              option.series[0].data.push({name: "班玛县",value:[100.73,32.92,0,1],
              value1:[100.73,32.92,0,3],
              value2:[100.73,32.92,0,3],
              value3:[100.73,32.92,0,3],
              value4:[100.73,32.92,0,3]
              });
              option.series[0].data.push({name: "甘德县",value:[99.89,33.95,0,1],
              value1:[99.89,33.95,0,3],
              value2:[99.89,33.95,0,3],
              value3:[99.89,33.95,0,3],
              value4:[99.89,33.95,0,3]
              });
              option.series[0].data.push({name: "达日县",value:[99.68,33.74,0,2],
              value1:[99.68,33.74,0,3],
              value2:[99.68,33.74,0,3],
              value3:[99.68,33.74,0,3],
              value4:[99.68,33.74,0,3]
              });
              option.series[0].data.push({name: "久治县",value:[101.47,33.46,0,2],
              value1:[101.47,33.46,0,3],
              value2:[101.47,33.46,0,3],
              value3:[101.47,33.46,0,3],
              value4:[101.47,33.46,0,3]
              });
              option.series[0].data.push({name: "玛多县",value:[98.26,34.92,0,3],
              value1:[98.26,34.92,0,3],
              value2:[98.26,34.92,0,3],
              value3:[98.26,34.92,0,3],
              value4:[98.26,34.92,0,3]
              });
         }
         if(name=="海西蒙古族藏族自治州"){
               option.series[0].data.push({name: "格尔木市",value:[94.9,36.41,0,2],
              value1:[94.9,36.41,0,3],
              value2:[94.9,36.41,0,3],
              value3:[94.9,36.41,0,3],
              value4:[94.9,36.41,0,3]
              });
              option.series[0].data.push({name: "乌兰县",value:[98.46,36.9,0,1],
              value1:[98.46,36.9,0,3],
              value2:[98.46,36.9,0,3],
              value3:[98.46,36.9,0,3],
              value4:[98.46,36.9,0,3]
              });
              option.series[0].data.push({name: "都兰县",value:[98.13,36.3,0,1],
              value1:[98.13,36.3,0,3],
              value2:[98.13,36.3,0,3],
              value3:[98.13,36.3,0,3],
              value4:[98.13,36.3,0,3]
              });
              option.series[0].data.push({name: "天峻县",value:[99.03,37.28,0,2],
              value1:[99.03,37.28,0,3],
              value2:[99.03,37.28,0,3],
              value3:[99.03,37.28,0,3],
              value4:[99.03,37.28,0,3]
              });
               option.series[0].data.push({name: "德令哈市",value:[97.36084,37.36946,0,2],
              value1:[97.36084,37.36946,0,3],
              value2:[97.36084,37.36946,0,3],
              value3:[97.36084,37.36946,0,3],
              value4:[97.36084,37.36946,0,3]
              });

         }
         if(name=="玉树藏族自治州"){
               option.series[0].data.push({name: "玉树市",value:[96.97,33.03,0,2],
              value1:[96.97,33.03,0,3],
              value2:[96.97,33.03,0,3],
              value3:[96.97,33.03,0,3],
              value4:[96.97,33.03,0,3]
              });
              option.series[0].data.push({name: "杂多县",value:[95.3,32.92,0,1],
              value1:[95.3,32.92,0,3],
              value2:[95.3,32.92,0,3],
              value3:[95.3,32.92,0,3],
              value4:[95.3,32.92,0,3]
              });
              option.series[0].data.push({name: "称多县",value:[97.12,33.35,0,1],
              value1:[97.12,33.35,0,3],
              value2:[97.12,33.35,0,3],
              value3:[97.12,33.35,0,3],
              value4:[97.12,33.35,0,3]
              });
              option.series[0].data.push({name: "治多县",value:[95.6,33.86,0,2],
              value1:[95.6,33.86,0,3],
              value2:[95.6,33.86,0,3],
              value3:[95.6,33.86,0,3],
              value4:[95.6,33.86,0,3]
              });
              option.series[0].data.push({name: "囊谦县",value:[96.47,32.23,0,2],
              value1:[96.47,32.23,0,3],
              value2:[96.47,32.23,0,3],
              value3:[96.47,32.23,0,3],
              value4:[96.47,32.23,0,3]
              });
              option.series[0].data.push({name: "曲麻菜县",value:[95.50,34.52,0,2],
              value1:[95.50,34.52,0,3],
              value2:[95.50,34.52,0,3],
              value3:[95.50,34.52,0,3],
              value4:[95.50,34.52,0,3]
              });
         }

           myChart.setOption(option);

    	},
        // 数据展示
    	data: datamap,
        
    });
})


    },
     drawLeft2() {
      this.chartColumn = echarts.init(document.getElementById("ndafqs"));
const colorList = ["#9E87FF", '#73DDFF', '#fe9a8b', '#F56948', '#9E87FF',"#9E87FF", '#73DDFF', '#fe9a8b', '#F56948', '#9E87FF',"#9E87FF", '#73DDFF']
const xData = ['1 月', '2 月', '3 月', '4 月', '5 月', '6 月', '7 月','8 月','9 月','10 月','11 月','12 月']
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
        name: '2018',
        type: 'line',
        // data: [10, 10, 30, 12, 15, 3, 7, 30, 12, 15, 3, 7],
        data:this.data1,
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
    }, {
        name: '2019',
        type: 'line',
        // data: [5, 12, 11, 14, 25, 16, 10, 20, 13, 5, 13, 17],
         data:this.data2,
        symbolSize: 1,
        symbol: 'circle',
        smooth: true,
        yAxisIndex: 0,
        showSymbol: false,
        lineStyle: {
            width: 5,
            color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [{
                    offset: 0,
                    color: '#73DD39'
                },
                {
                    offset: 1,
                    color: '#73DDFF'
                }
            ]),
            shadowColor: 'rgba(115,221,255, 0.3)',
            shadowBlur: 10,
            shadowOffsetY: 20
        },
        itemStyle: {
            normal: {
                color: colorList[1],
                borderColor: colorList[1]
            }
        }
    }]
      });
      
    },
drawLeft3() {
      this.chartColumn = echarts.init(document.getElementById("ajzt"));
     let value = this.jal;
    //  55.33;
      let title = '';
      let int = value.toFixed(2).split('.')[0];
      let float = value.toFixed(2).split('.')[1];
      this.chartColumn.setOption({
          backgroundColor: '',
    title: {
        text: '{a|'+ int +'}{a|%}',
        x: 'center',
        y: 'center',
        textStyle: {
            rich:{
                a: {
                    fontSize: 12,
                    color: '#29EEF3'
                },
                b: {
                    fontSize: 20,
                    color: '#29EEF3',
                    padding: [0,0,14,0]
                },
                c: {
                    fontSize: 20,
                    color: '#ffffff',
                    padding: [5,0]
                }
            }
        }
    },
    series: [
        {
            type: 'gauge',
            radius: '60%',
            clockwise: false,
            startAngle: '90',
            endAngle: '-269.9999',
            splitNumber: 25,
            detail: {
                offsetCenter: [0, -20],
                formatter: ' '
            },
            pointer: {
                show: false
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: [
                        [0, '#2CFAFC'],
                        [52 / 100, '#1DE2A4'],
                        [1, 'rgba(32,187,252,0.15)']
                    ],
                    width: 30
                }
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: true,
                length: 32,
                lineStyle: {
                    color: '#051F54',
                    width: 6
                }
            },
            axisLabel: {
                show: false
            }
        },
        {
            type: 'pie',
            name: '内层细圆环',
            radius: ['43%', '45%'],
            hoverAnimation: false,
            clockWise: false,
            itemStyle: {
                normal: {
                    color: '#0C355E'
                }
            },
            label: {
                show: false
            },
            data: [100]
        },
        {
            type: 'pie',
            name: '内层环',
            radius: [0, '43%'],
            hoverAnimation: false,
            clockWise: false,
            itemStyle: {
                normal: {
                    color: '#02163F'
                }
            },
            label: {
                show: false
            },
            data: [100]
        }
    ]
      });
  
    },





drawCenter2() {
      this.chartColumn = echarts.init(document.getElementById("zfjgajsl"));
const createSvg = (shadowColor, shadowBlur) => `
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" 
        x="0px" y="0px" 
        viewBox="0 0 32 128"
        xml:space="preserve"
    >
        <style>
            .st2 {
                fill: transparent;
                stroke: ${shadowColor};
                stroke-width: ${shadowBlur}px;
                filter: url(#chart-inset-shadow);
            }
        </style>
        <defs>
            <filter id="chart-inset-shadow" width="200%" height="200%" x="-50%" y="-50%">
        		<feGaussianBlur in="SourceGraphic" result="gass" stdDeviation="${shadowBlur * 0.75}" />
        		<feMerge>
        			<feMergeNode in="gass" />
        		</feMerge>
        	</filter>
        </defs>
        <path class="st2" d="M0 0 L32 0 L32 128 L0 128 Z" />
    </svg>
`;

const svgString = createSvg('#156dff', 8);
const svg = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});

const DOMURL = window.URL || window.webkitURL || window;
const insetShadowUrl = DOMURL.createObjectURL(svg);

const dataSet = [
    // ['江西省 交通运输厅', '江西省公路 路政管理总队', '新余高速公路 路政管理支队',
    //  '南昌高速公路 路政管理支队', '高速公路 管理局', '赣州高速公路 路政管理支队', '吉安高速公路 路政管理支队'],
    //  ['交通 运输厅', '路政 管理总队', '新余 高速公路',
    //  '南昌 高速公路',  '赣州 高速公路', '吉安 高速公路'],
    // [120, 200, 150, 70, 110, 130]
    this.data3,this.data4
];

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
        top: '5%',
        bottom:'30%'
    },
    xAxis: {
        type: 'category',
        axisLine: {
            show: false,
        },
        axisTick: {
            show: false,
        },
        axisLabel: {
            color: 'rgba(255,255,255, 0.5)',
            // interval: 0,  
            formatter:function(value)  
            {  
                return value.split(" ").join("\n");  
            } 
        },
        splitLine: {
            show: false,
        },
        data: dataSet[0],
    },
    yAxis: {
        type: 'value',
        axisLine: {
            show: false,
        },
        axisTick: {
            show: false,
        },
        axisLabel: {
            color: 'rgba(255,255,255, 0.5)',
        },
        splitLine: {
            show: true,
            lineStyle: {
                type: 'dashed',
                color: 'rgba(255,255,255,0.1)',
                width: 2,
            },
        },
    },
    series: [
        {
            data: dataSet[1],
            type: 'pictorialBar',
            symbol: 'image://' + insetShadowUrl,
            barWidth: 30,
        },
        {
            data: dataSet[1],
            type: 'bar',
            barWidth: 30,
            itemStyle: {
                color: 'transparent',
                borderWidth: 1,
                borderColor: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [{
                            offset: 0,
                            color: '#156dff'
                        },
                        {
                            offset: 1,
                            color: '#00eaeb'
                        },
                    ]
                ),
                shadowColor: 'blue',
                shadowBlur: 12,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
            },
        },
    ],
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
		top: '6%',
		bottom: '12%',
		right: '8%'
	},
    xAxis: {
        data:this.data5,
        //  ['湖南省', '福建省', '云南省', '山东省', '山西省' ],
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
				fontSize: 12
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
        data: this.data6,
        // [123, 60, 25, 18, 12],
        z: 10
    }]
      });
      
    },
 drawRight2() {
      this.chartColumn = echarts.init(document.getElementById("afd"));
        
        
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
                    data: this.data7,
                    // ['南昌市', '九江市', '吉安市', '新余市', '萍乡市', '宜春市', '抚州市', '上饶市'],
					axisLabel: {
						margin: 10,
						color: '#999',
						textStyle: {
							fontSize: 12
                        },
                        interval: 0,  
                        formatter:function(value)  
                        {  
                            return value.split("").join("\n");  
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
                    data:this.data8, 
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
//查询-----------------------------------------------------------------------------------------------------
//案件类型
 search1(val) {    
      let data = {
       year:2020
      };
      
       ajlx(data).then(res => {   
         var map={};
       res.forEach(item =>{
          map[item[0]]=item[1]
          
         });
         console.log(map);
            this.ybaj=map["一般案件"];      
            this.cfaj=map["处罚案件"];         
            this.pbcaj=map["赔补偿案件"];
            this.cxcz=map["超限超载"];
                             
           
       
      });
      err => {
        console.log(err);
      };
    },
    //2018年案件数量
    search2(val) {
      let data = {
        year:2018
      };
      ndajsltbtj(data).then(res => {   
         var map={};
         res.forEach(item =>{
         var tmp=item[0];
         if(tmp<10){
           tmp=tmp.substring(1,2);
         }
              map[tmp]=item[1];       
         });

        
        var map2=[];
        for(var i=1;i<=12;i++){
          if(map[i]!=undefined){
             map2.push(map[i] );
          }else{
             map2.push(0);
          }
        }       
          this.data1=map2; 
          this.drawLeft2();
      });
      err => {
        console.log(err);
      };
    },
      //2019年案件数量
    search3(val) {
      let data = {
        year:2019
      };
      let _this = this;
     ndajsltbtj(data).then(res => {
         var map={};
         res.forEach(item =>{
         var tmp=item[0];
         if(tmp<10){
           tmp=tmp.substring(1,2);
         }
              map[tmp]=item[1];       
         });

        
        var map2=[];
        for(var i=1;i<=12;i++){
          if(map[i]!=undefined){
             map2.push(map[i] );
          }else{
             map2.push(0);
          }
        }
       

         this.data2=map2;
          this.drawLeft2();
      });
      err => {
        console.log(err);
      };
    },
    //案件状态  
    search4(val) {
      let data = {
        year:val
      };
     ajzt(data).then(res => {
         var map={};
         console.log(res);
         res.forEach(item =>{
         
              map[item[0]]=item[1];       
         });
            this.af=map['案发'];
            this.ja=map['结案'];
            this.jal=map['结案']/map['案发'];
             console.log(this.jal);
          this.drawLeft3();
      });
      err => {
        console.log(err);
      };
    },
    //执法机构案件数量  
    search5(val) {
      let data = {
        year:val
      };
     zfjgajsl(data).then(res => {
        //  var map={};
         console.log(res);
         this.data3.push(res[0][0],res[1][0],res[2][0],res[3][0],res[4][0]);
         this.data4.push(res[0][1],res[1][1],res[2][1],res[3][1],res[4][1]);
        //  res.forEach(item =>{
         
        //     //   map[item[0]]=item[1];       
        //  });
            // console.log(map);
          this.drawCenter2();
      });
      err => {
        console.log(err);
      };
    },
//罚没款项
    search6(val) {
      let data = {
        year:val
      };
     fmkx(data).then(res => {
         var map={};
         console.log(res);
         res.forEach(item =>{
         
              map[item[0]]=item[1];       
         });
            this.cfje=map['处罚金额'];
            this.zxje="0";
         
      });
      err => {
        console.log(err);
      };
    },
//本地车辆
    search7(val) {
      let data = {
        year:val
      };
     bdcl(data).then(res => {
         var map={};
         console.log(res);
         res.forEach(item =>{
         
              map[item[0]]=item[1];       
         });
            this.bdcl=map['赣'];
            
         
      });
      err => {
        console.log(err);
      };
    },
//外地车辆
    search8(val) {
      let data = {
        year:val
      };
     wdcl(data).then(res => {
         this.data5.push(res[0][0],res[1][0],res[2][0],res[3][0],res[4][0]);
         this.data6.push(res[0][1],res[1][1],res[2][1],res[3][1],res[4][1]);
         this.drawRight1();
         
      });
      err => {
        console.log(err);
      };
    },
//案发地
search9(province,start,end) {
      
      let data = {
        province:province,
        start:start,
        end:end
      };
      
         afddfb(data).then(res => {
        console.log(res);
        var map={};
         res.forEach(item =>{
         
              map[item[0]]=item[1];       
         });
        if(res.length!=0){
            this.data7.push(province);        
            this.data8.push(res[0][1]==undefined?0:res[0][1] );
        }else{       
            this.data7.push(province);        
            this.data8.push(0);
        }
       this.drawRight2();
      
       
       
      });
      err => {
        console.log(err);
      };
    },
//地图
searchMap(start,end) {
      
      let data = {
        start:start,
        end:end
      };
      
         map(data).then(res => {
            console.log(res);
            var map={};
            res.forEach(item =>{
                map[item[0]]=item[1];       
            });
        if(res.length!=0){
            if(map['西宁市']!=undefined){
                this.datamap[0].value=map['西宁市'];
            }else{
                this.datamap[0].value=0;
            }
            if(map['玉树藏族自治州']!=undefined){
                this.datamap[1].value=map['玉树藏族自治州'];
            }else{
               this.datamap[1].value=0;
            }
            if(map['黄南藏族自治州']!=undefined){
               this.datamap[2].value=map['黄南藏族自治州'];
            }else{
                this.datamap[2].value=0;
            }
            if(map['海南藏族自治州']!=undefined){
               this.datamap[3].value=map['海南藏族自治州'];
            }else{
               this.datamap[3].value=0;
            }
            if(map['海西蒙古族藏族自治州']!=undefined){
              this.datamap[4].value=map['海西蒙古族藏族自治州'];
            }else{
              this.datamap[4].value=0;
            }
            if(map['海东市']!=undefined){
                this.datamap[5].value=map['海东市'];
            }else{
              this.datamap[5].value=0;
            }
            if(map['海北藏族自治州']!=undefined){
               this.datamap[6].value=map['海北藏族自治州'];
            }else{
                 this.datamap[6].value=0;
            }
            if(map['果洛藏族自治州']!=undefined){
              this.datamap[7].value=map['果洛藏族自治州'];
            }else{
              this.datamap[7].value=0;
            }
      
        }
         this.map(this.datamap);
      });
      err => {
        console.log(err);
      };
  
    },
searchMap1(start,end) {
      
      let data = {
        start:start,
        end:end
      };
     
      mapybaj(data).then(res => {
            console.log(res);
            var map={};
            res.forEach(item =>{
                map[item[0]]=item[1];       
            });
        if(res.length!=0){
            if(map['西宁市']!=undefined){
                this.datamap[0].value1=map['西宁市'];
            }else{
                this.datamap[0].value1=0;
            }
            if(map['玉树藏族自治州']!=undefined){
                this.datamap[1].value1=map['玉树藏族自治州'];
            }else{
               this.datamap[1].value1=0;
            }
            if(map['黄南藏族自治州']!=undefined){
               this.datamap[2].value1=map['黄南藏族自治州'];
            }else{
                this.datamap[2].value1=0;
            }
            if(map['海南藏族自治州']!=undefined){
               this.datamap[3].value1=map['海南藏族自治州'];
            }else{
               this.datamap[3].value1=0;
            }
            if(map['海西蒙古族藏族自治州']!=undefined){
              this.datamap[4].value1=map['海西蒙古族藏族自治州'];
            }else{
              this.datamap[4].value1=0;
            }
            if(map['海东市']!=undefined){
                this.datamap[5].value1=map['海东市'];
            }else{
              this.datamap[5].value1=0;
            }
            if(map['海北藏族自治州']!=undefined){
               this.datamap[6].value1=map['海北藏族自治州'];
            }else{
                 this.datamap[6].value1=0;
            }
            if(map['果洛藏族自治州']!=undefined){
              this.datamap[7].value1=map['果洛藏族自治州'];
            }else{
              this.datamap[7].value1=0;
            }
  
        }
         this.map(this.datamap);
      });
      err => {
        console.log(err);
      };
     
    },
    searchMap2(start,end) {
      
      let data = {
        start:start,
        end:end
      };
      
       
      mapcfaj(data).then(res => {
            console.log(res);
            var map={};
            res.forEach(item =>{
                map[item[0]]=item[1];       
            });
        if(res.length!=0){
             if(map['西宁市']!=undefined){
                this.datamap[0].value2=map['西宁市'];
            }else{
                this.datamap[0].value2=0;
            }
            if(map['玉树藏族自治州']!=undefined){
                this.datamap[1].value2=map['玉树藏族自治州'];
            }else{
               this.datamap[1].value2=0;
            }
            if(map['黄南藏族自治州']!=undefined){
               this.datamap[2].value2=map['黄南藏族自治州'];
            }else{
                this.datamap[2].value2=0;
            }
            if(map['海南藏族自治州']!=undefined){
               this.datamap[3].value2=map['海南藏族自治州'];
            }else{
               this.datamap[3].value2=0;
            }
            if(map['海西蒙古族藏族自治州']!=undefined){
              this.datamap[4].value2=map['海西蒙古族藏族自治州'];
            }else{
              this.datamap[4].value2=0;
            }
            if(map['海东市']!=undefined){
                this.datamap[5].value2=map['海东市'];
            }else{
              this.datamap[5].value2=0;
            }
            if(map['海北藏族自治州']!=undefined){
               this.datamap[6].value2=map['海北藏族自治州'];
            }else{
                 this.datamap[6].value2=0;
            }
            if(map['果洛藏族自治州']!=undefined){
              this.datamap[7].value2=map['果洛藏族自治州'];
            }else{
              this.datamap[7].value2=0;
            }
  
        }
         this.map(this.datamap);
      });
      err => {
        console.log(err);
      };
     
    },
    searchMap3(start,end) {
      
      let data = {
        start:start,
        end:end
      };
      
      mappbcaj(data).then(res => {
            console.log(res);
            var map={};
            res.forEach(item =>{
                map[item[0]]=item[1];       
            });
        if(res.length!=0){
             if(map['西宁市']!=undefined){
                this.datamap[0].value3=map['西宁市'];
            }else{
                this.datamap[0].value3=0;
            }
            if(map['玉树藏族自治州']!=undefined){
                this.datamap[1].value3=map['玉树藏族自治州'];
            }else{
               this.datamap[1].value3=0;
            }
            if(map['黄南藏族自治州']!=undefined){
               this.datamap[2].value3=map['黄南藏族自治州'];
            }else{
                this.datamap[2].value3=0;
            }
            if(map['海南藏族自治州']!=undefined){
               this.datamap[3].value3=map['海南藏族自治州'];
            }else{
               this.datamap[3].value3=0;
            }
            if(map['海西蒙古族藏族自治州']!=undefined){
              this.datamap[4].value3=map['海西蒙古族藏族自治州'];
            }else{
              this.datamap[4].value3=0;
            }
            if(map['海东市']!=undefined){
                this.datamap[5].value3=map['海东市'];
            }else{
              this.datamap[5].value3=0;
            }
            if(map['海北藏族自治州']!=undefined){
               this.datamap[6].value3=map['海北藏族自治州'];
            }else{
                 this.datamap[6].value3=0;
            }
            if(map['果洛藏族自治州']!=undefined){
              this.datamap[7].value3=map['果洛藏族自治州'];
            }else{
              this.datamap[7].value3=0;
            }
            
        }
        this.map(this.datamap);
      });
      err => {
        console.log(err);
      };
   
    },
    searchMap4(start,end) {
      
      let data = {
        start:start,
        end:end
      };
      
      
      mapcxcz(data).then(res => {
            console.log(res);
            var map={};
            res.forEach(item =>{
                map[item[0]]=item[1];       
            });
        if(res.length!=0){
            if(map['西宁市']!=undefined){
                this.datamap[0].value4=map['西宁市'];
            }else{
                this.datamap[0].value4=0;
            }
            if(map['玉树藏族自治州']!=undefined){
                this.datamap[1].value4=map['玉树藏族自治州'];
            }else{
               this.datamap[1].value4=0;
            }
            if(map['黄南藏族自治州']!=undefined){
               this.datamap[2].value4=map['黄南藏族自治州'];
            }else{
                this.datamap[2].value4=0;
            }
            if(map['海南藏族自治州']!=undefined){
               this.datamap[3].value4=map['海南藏族自治州'];
            }else{
               this.datamap[3].value4=0;
            }
            if(map['海西蒙古族藏族自治州']!=undefined){
              this.datamap[4].value4=map['海西蒙古族藏族自治州'];
            }else{
              this.datamap[4].value4=0;
            }
            if(map['海东市']!=undefined){
                this.datamap[5].value4=map['海东市'];
            }else{
              this.datamap[5].value4=0;
            }
            if(map['海北藏族自治州']!=undefined){
               this.datamap[6].value4=map['海北藏族自治州'];
            }else{
                 this.datamap[6].value4=0;
            }
            if(map['果洛藏族自治州']!=undefined){
              this.datamap[7].value4=map['果洛藏族自治州'];
            }else{
              this.datamap[7].value4=0;
            }
           
        }
         this.map(this.datamap);
      });
      err => {
        console.log(err);
      };
   
    },
    mapAll(){
        this.searchMap(202001,202012);
        this.searchMap1(202001,202012);
        this.searchMap2(202001,202012);
        this.searchMap3(202001,202012);
        this.searchMap4(202001,202012);
    },
















    timer() {
        return  setInterval(() => {
          this.font();
   }, 1000*5)
        
       
      },
      font(){
          $('#ybaj').addClass('flipOutX animated infinite');
        setTimeout(function(){
            $('#ybaj').removeClass('flipOutX animated infinite');
        }, 5000);
         $('#cfaj').addClass('flipOutX animated infinite');
        setTimeout(function(){
            $('#cfaj').removeClass('flipOutX animated infinite');
        }, 5000);
         $('#pbcaj').addClass('flipOutX animated infinite');
        setTimeout(function(){
            $('#pbcaj').removeClass('flipOutX animated infinite');
        }, 5000);
         $('#cxcz').addClass('flipOutX animated infinite');
        setTimeout(function(){
            $('#cxcz').removeClass('flipOutX animated infinite');
        }, 5000);
      },



   
    
   
  },
  mounted() {
    this.search1();
    this.search2();
    this.search3();
    this.search4(2020);
    this.search5(2020);
    this.search6(2020);
    this.search7(2020);
    this.search8(2020);
    this.search9('西宁市',202001,202012);
    this.search9('玉树藏族自治州',202001,202012);
    this.search9('黄南藏族自治州',202001,202012);
    this.search9('海南藏族自治州',202001,202012);
    this.search9('海西蒙古族藏族自治州',202001,202012);
    this.search9('海东市',202001,202012);
    this.search9('海北藏族自治州',202001,202012);
    this.search9('果洛藏族自治州',202001,202012);
    //  this.map();
    // this.drawLeft2();
    // this.drawLeft3();
    // this.drawCenter2();
    // this.drawRight1();
    // this.drawRight2();
    
  },
  created() {
       this.timer();
       this.mapAll();
        
  },

};
</script>
<style>
.body_bg{
  background-image: url("../../../../static/images/map/bg.png");
}
.dptitle_1{
  background-image: url("../../../../static/images/map/选中.png");
  background-size: 100%;
  height: 58px;
  width: 160px;
  text-align: center;
  line-height: 60px;
  cursor: pointer;
}
.dptitle_font{
     
font-size:18px;
font-family:PingFangSC-Medium,PingFang SC;
font-weight:500;
color:rgba(92,216,255,1);
/* line-height:25px; */
text-shadow:0px 0px 24px rgba(14,40,100,1);

}
.dptitle_2{
width:380px;
height:42px;
font-size:20px;
font-family:PingFangSC-Medium,PingFang SC;
font-weight:300;
color:rgba(255,255,255,1);
line-height:62px;
text-shadow:0px 4px 6px rgba(4,42,173,1);
text-align: center;
}
.dptitle_3{
  background-image: url("../../../../static/images/map/导航-未选.png");
  background-size: 100%;
  background-repeat: no-repeat;
  height: 58px;
  width: 150px;
  text-align: center;
  line-height: 45px;
  cursor: pointer;
}
.dptitle_4{
  background-image: url("../../../../static/images/map/右侧边框.png");
  background-size: 100%;
  background-repeat: no-repeat;
  height: 58px;
  width: 230px;
  text-align: center;
  line-height: 45px;
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
.left_3{
width:300px;
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
.center_2{
width:480px;
height:200px;
background:rgba(13,18,38,0.1);
box-shadow:0px 0px 4px 1px rgba(12,81,149,0.5);
border:1px solid rgba(14,101,187,0.5);
margin-left: 0px;
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
.right_3{
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
margin-left: 5px;
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
margin-left: 25px;
}
.ajbjl{
width:70px;
height:19px;
font-size:14px;
font-family:MicrosoftYaHei;
color:rgba(255,255,255,1);
line-height:19px;
margin-top: 50px;
}
.sl{
width:190px;
height:51px;
font-size:23px;
font-family:DINCondensed-Bold,DINCondensed;
font-weight:bold;
color:rgba(4,241,248,1);
line-height:61px;  
}
.sl2{
width:190px;
height:51px;
font-size:17px;
font-family:DINCondensed-Bold,DINCondensed;
font-weight:bold;
color:#FFFFFF;
line-height:61px;  
}
/* .fullscreen .el-main {
    
    background-position: bottom;
} */
.body_bg .el-main {
    background: none;
    width:'100%';
}
.main {
    background-image: url("../../../../static/images/map/qh.png");
    background-size: 100% 100%;
}
.dpright_font0{
width:196px;
height:28px;
font-size:20px;
font-family:PingFangSC-Regular,PingFang SC;
font-weight:400;
color:rgba(255,255,255,1);
line-height:28px;
}
.dpright_font1{
width:196px;
height:28px;
font-size:18px;
font-family:PingFangSC-Regular,PingFang SC;
font-weight:400;
color:#FF9703;
line-height:28px;
}
</style>
