<template>
  <el-container class="body_bg">
    <el-main>
      <el-row class="main">
        <el-row>
          <el-col :span="6" style="height:60px;margin-top: 25px;margin-left: 100px; ">
            <div class="dptitle_1 dptitle_font" @click="ajpage()">执法案件</div>
          </el-col>
          <el-col :span="4" class="dptitle_2" style="margin-left: -18px;">
            宁夏执法数据分析研判系统
          </el-col>
          <el-col :span="6" style="height:60px;margin-left: -505px;margin-top: 35px;">
            <div class="dptitle_3 dptitle_font" @click="zbpage()">人员装备</div>

          </el-col>
          <el-col :span="6" style="height:60px;margin-left:50px;margin-top: 35px;">
            <div class="dptitle_4">
              <span class="dpright_font0">涉案本地车辆：</span>
              <span class="dpright_font1">2518辆</span>
            </div>

          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-row class="left_1">
              <el-row>
                <div class="bt">案件类型</div>
              </el-row>
              <el-row>
                <el-row style="text-align:center">
                  <el-col :span="6"><img src="../../../../static/images/map/一般案件.png" style="height:60px;width:60px;">
                  </el-col>
                  <el-col :span="6"><img src="../../../../static/images/map/处罚案件.png" style="height:60px;width:60px;">
                  </el-col>
                  <el-col :span="6"><img src="../../../../static/images/map/赔补偿案件.png" style="height:60px;width:60px;">
                  </el-col>
                  <el-col :span="6"><img src="../../../../static/images/map/超限超载.png" style="height:60px;width:60px;">
                  </el-col>
                </el-row>
                <el-row style="text-align:center">
                  <el-col :span="6">
                    <div class="type">一般案件</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="type">处罚案件</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="type">赔补偿案件</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="type">超限超载</div>
                  </el-col>
                </el-row>
                <el-row style="text-align:center">
                  <el-col :span="6">
                    <div id="ybaj" class="count">{{ybaj}}</div>
                  </el-col>
                  <el-col :span="6">
                    <div id="cfaj" class="count">{{cfaj}}</div>
                  </el-col>
                  <el-col :span="6">
                    <div id="pbcaj" class="count">{{pbcaj}}</div>
                  </el-col>
                  <el-col :span="6">
                    <div id="cxcz" class="count">{{cxcz}}</div>
                  </el-col>
                </el-row>
                <el-row style="text-align:center">
                  <el-col :span="6">
                    <div class="dw">例</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="dw">例</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="dw">例</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="dw">例</div>
                  </el-col>
                </el-row>
              </el-row>
            </el-row>
            <el-row class="left_2">
              <el-row>
                <div class="bt">年度案发趋势</div>
              </el-row>
              <el-row>
                <div id="ndafqs" style="width: 100%; height: 200px;"></div>
              </el-row>
            </el-row>
            <el-row class="left_3">
              <el-row>
                <div class="bt">案件状态</div>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <div id="ajzt" style="width: 100%; height: 200px;margin-top:-20px"></div>
                </el-col>
                <el-col :span="12" style="">
                  <el-row>
                    <div class="ajbjl">案件办结率</div>
                  </el-row>
                  <el-row>
                    <div style="width:200px">
                      <span class="sl">3829</span>
                      <span class="dw" style="margin-left:0px;">例/</span>
                      <span class="sl2">5283</span>
                      <span class="dw" style="margin-left:0px;">例</span>
                    </div>
                  </el-row>
                </el-col>

              </el-row>
            </el-row>
          </el-col>
          <el-col :span="10">
            <el-row class="center_1">
              <div id="map" style="width: 485px; height: 400px;"></div>
            </el-row>
            <el-row class="center_2">
              <el-row>
                <div class="bt">执法机构案件数量</div>
              </el-row>
              <el-row>
                <div id="zfjgajsl" style="width: 100%; height: 200px;"></div>
              </el-row>
            </el-row>
          </el-col>
          <el-col :span="7">
            <el-row class="right_1">
              <el-row>
                <div class="bt">涉案外埠车辆省份排名 TOP5</div>
              </el-row>
              <el-row>
                <div id="clpm" style="width: 100%; height: 170px;"></div>
              </el-row>
            </el-row>
            <el-row class="right_2">
              <el-row>
                <div class="bt">案发地</div>
              </el-row>
              <el-row>
                <div id="afd" style="width: 100%; height: 200px;"></div>
              </el-row>
            </el-row>
            <el-row class="right_3">
              <el-row>
                <div class="bt">罚没款项</div>
              </el-row>
              <el-row style="text-align:center;">
                <el-row>
                  <el-col :span="12"><img src="../../../../static/images/map/处罚金额.png" style="height:80px;width:100px;">
                  </el-col>
                  <el-col :span="12"><img src="../../../../static/images/map/执行金额.png" style="height:80px;width:100px;">
                  </el-col>

                </el-row>
                <el-row>
                  <el-col :span="12">
                    <div class="type" style="height:30px;width:100px;margin-left:25px;">【 处罚金额 】</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="type" style="height:30px;width:100px;margin-left:25px;">【 执行金额 】</div>
                  </el-col>

                </el-row>
                <el-row>
                  <el-col :span="12">
                    <div class="count" style="height:40px;width:100px;margin-left:25px;">32682</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="count" style="height:40px;width:100px;margin-left:25px;">248292</div>
                  </el-col>

                </el-row>
                <el-row>
                  <el-col :span="12">
                    <div class="dw" style="height:30px;width:100px;margin-left:25px;">万元</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="dw" style="height:30px;width:100px;margin-left:25px;">万元</div>
                  </el-col>

                </el-row>
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
  import "../../../../static/css/animate.min.css";
  import {
    ndajsltbtj
  } from '@/api/fxyp.js'

  export default {
    data() {
      return {
        ybaj: "4306",
        cxcz: "9372",
        cfaj: "769",
        pbcaj: "19273",
        data1: [],
        data2: [],
        carsData:{
          xAxis:[],
          series:[]
        }
      };
    },
    methods: {
      getData(){
      },
      ajpage() {
        this.$router.push({path: '/lawCase'})
      },
      zbpage() {
        this.$router.push({path: '/personEqpt'})
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

        echarts.extendsMap = function (id, opt) {
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
            '九江': [115.97, 29.51],
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
            /!**
             * i 实例对象
             * o option
             * n 地图名
             **!/
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

            /!**
             * name 地图名
             **!/
            createBreadcrumb: function (name) {
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
                  text: name[0] === '江西' ? '江西省' : name[0],
                  textAlign: 'left',
                  fill: style.textColor,
                  font: style.font
                },
                onclick: function () {
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
                onclick: function () {
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

        $.getJSON(jiangxi, function (geoJson) {
          echarts.registerMap('江西', geoJson);
          var myChart = echarts.extendsMap('chart-panel', {
            bgColor: '#154e90', // 画布背景色
            mapName: '江西',    // 地图名
            goDown: true,       // 是否下钻
            // 下钻回调
            callback: function (name, option, instance) {
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
              value: 55,
              level: 3
            }, {
              name: '赣州',
              value: 16,
              level: 2
            }, {
              name: '吉安',
              value: 17,
              level: 4
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
            '中卫': [105.196754199, 37.5211241916],
            '吴忠': [106.208254199, 37.9935610029],
            '石嘴山': [106.379337202, 39.0202232836]
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

      drawLeft3() {
        this.chartColumn = echarts.init(document.getElementById("ajzt"));
        let value = 55.33;
        let title = '';
        let int = value.toFixed(2).split('.')[0];
        let float = value.toFixed(2).split('.')[1];
        this.chartColumn.setOption({
          backgroundColor: '',
          title: {
            text: '{a|' + int + '}{a|%}',
            x: 'center',
            y: 'center',
            textStyle: {
              rich: {
                a: {
                  fontSize: 12,
                  color: '#29EEF3'
                },
                b: {
                  fontSize: 20,
                  color: '#29EEF3',
                  padding: [0, 0, 14, 0]
                },
                c: {
                  fontSize: 20,
                  color: '#ffffff',
                  padding: [5, 0]
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
          ['交通 运输厅', '路政 管理总队', '青银 高速公路',
            '银川 高速公路', '京藏 高速公路', '福银 高速公路'],
          [120, 200, 150, 70, 110, 60]
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
            bottom: '30%'
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
              formatter: function (value) {
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
        let that = this
        that.$http.get("/home/getData").then(res => {
          if(res.status == 200){
            that.carsData.xAxis = res.data.data.cars.date;
            that.carsData.series = res.data.data.cars.data;
          }
          /*涉案外埠车辆排名*/
          that.chartColumn = echarts.init(document.getElementById("clpm"));
          let option={
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
              data: that.carsData.xAxis,
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
              data: that.carsData.series,
              z: 10
            }]
          };
          that.chartColumn.setOption(option);
          /*年度案发趋势*/
          this.chartColumn = echarts.init(document.getElementById("ndafqs"));
          const colorList = ["#9E87FF", '#73DDFF', '#fe9a8b', '#F56948', '#9E87FF', "#9E87FF", '#73DDFF', '#fe9a8b', '#F56948', '#9E87FF', "#9E87FF", '#73DDFF']
          const xData = []
          res.data.data.afqs.forEach((item,index)=>{
            xData.push(item.date)
          })
          const oldData = []
          res.data.data.afqs.forEach((item,index)=>{
            oldData.push(item.new)
          })
          const newData = []
          res.data.data.afqs.forEach((item,index)=>{
            newData.push(item.active)
          })
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
              right: '5%',
              bottom: '35%'
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
                formatter: function (value) {
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
              data: oldData,
              // data:this.data1,
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
              data: newData,
              //  data:this.data2,
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

         /*案发地*/
        const afd_xData = []
        res.data.data.afd.forEach((item,index)=>{
          afd_xData.push(item.name)
        })
        const afd_series = []
        res.data.data.afd.forEach((item,index)=>{
          afd_series.push(item.value)
        })
        const afd_series1 = []
        res.data.data.afd.forEach((item,index)=>{
          afd_series1.push(item.value1)
        })

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
            data: afd_xData,
            axisLabel: {
              margin: 10,
              color: '#999',
              textStyle: {
                fontSize: 12
              },
              interval: 0,
              formatter: function (value) {
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
            data: afd_series,
            barWidth: '16px',
            itemStyle: {
              normal: {
                color: function (params) { //展示正值的柱子，负数设为透明
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
            data: afd_series1,
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
        })
      },

      search1(val) {
        let data = {
          year: 2020
        };

        this.$store.dispatch("ndajsllxslbztj", data).then(res => {

          var map = {};
          res.forEach(item => {
            map[item[0]] = item[1]

          });
          console.log(map);
          this.ybaj = map["一般案件"];
          this.cfaj = map["处罚案件"];
          this.pbcaj = map["赔补偿案件"];
          this.cxcz = map["超限超载"];


        });
        err => {
          console.log(err);
        };
      },
      search2(val) {
        let data = {
          year: 2018
        };
        let _this = this;
        //   this.$store.dispatch("ndajsltbtj", data).then(res => {
        ndajsltbtj(data).then(res => {
          var map = {};
          res.forEach(item => {
            var tmp = item[0];
            if (tmp < 10) {
              tmp = tmp.substring(1, 2);
            }
            map[tmp] = item[1];
          });


          var map2 = [];
          for (var i = 1; i <= 12; i++) {
            if (map[i] != undefined) {
              map2.push(map[i]);
            } else {
              map2.push(0);
            }
          }
          this.data1 = map2;
        });
        err => {
          console.log(err);
        };
      },
      search3(val) {
        let data = {
          year: 2019
        };
        let _this = this;
        ndajsltbtj(data).then(res => {
          var map = {};
          res.forEach(item => {
            var tmp = item[0];
            if (tmp < 10) {
              tmp = tmp.substring(1, 2);
            }
            map[tmp] = item[1];
          });


          var map2 = [];
          for (var i = 1; i <= 12; i++) {
            if (map[i] != undefined) {
              map2.push(map[i]);
            } else {
              map2.push(0);
            }
          }


          this.data2 = map2;
        });
        err => {
          console.log(err);
        };
      },
      timer() {
        return setInterval(() => {
          this.font();
        }, 1000 * 5)


      },
      font() {
        $('#ybaj').addClass('flipOutX animated infinite');
        setTimeout(function () {
          $('#ybaj').removeClass('flipOutX animated infinite');
        }, 5000);
        $('#cfaj').addClass('flipOutX animated infinite');
        setTimeout(function () {
          $('#cfaj').removeClass('flipOutX animated infinite');
        }, 5000);
        $('#pbcaj').addClass('flipOutX animated infinite');
        setTimeout(function () {
          $('#pbcaj').removeClass('flipOutX animated infinite');
        }, 5000);
        $('#cxcz').addClass('flipOutX animated infinite');
        setTimeout(function () {
          $('#cxcz').removeClass('flipOutX animated infinite');
        }, 5000);
      }


    },
    mounted() {

      this.drawLeft3();
      this.drawCenter2();
      this.drawRight1();
      this.map();
    },
    created() {
      this.timer();
    },
//   destroyed() {
//   clearTimeout(this.timer)
//     }
  };
</script>
<style>
  .body_bg {
    background-image: url("../../../../static/images/map/bg.png");
  }

  .dptitle_1 {
    background-image: url("../../../../static/images/map/选中.png");
    background-size: 100%;
    height: 58px;
    width: 160px;
    text-align: center;
    line-height: 60px;
    cursor: pointer;
  }

  .dptitle_font {

    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(92, 216, 255, 1);
    /* line-height:25px; */
    text-shadow: 0px 0px 24px rgba(14, 40, 100, 1);

  }

  .dptitle_2 {
    width: 380px;
    height: 42px;
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 300;
    color: rgba(255, 255, 255, 1);
    line-height: 62px;
    text-shadow: 0px 4px 6px rgba(4, 42, 173, 1);
    text-align: center;
  }

  .dptitle_3 {
    background-image: url("../../../../static/images/map/导航-未选.png");
    background-size: 100%;
    background-repeat: no-repeat;
    height: 58px;
    width: 150px;
    text-align: center;
    line-height: 45px;
    cursor: pointer;
  }

  .dptitle_4 {
    background-image: url("../../../../static/images/map/右侧边框.png");
    background-size: 100%;
    background-repeat: no-repeat;
    height: 58px;
    width: 230px;
    text-align: center;
    line-height: 45px;
    cursor: pointer;
  }

  .left_1 {
    width: 300px;
    height: 200px;
    background: rgba(13, 18, 38, 0.1);
    box-shadow: 0px 0px 4px 1px rgba(12, 81, 149, 0.5);
    border: 1px solid rgba(14, 101, 187, 0.5);
    margin-left: 30px;
  }

  .left_2 {
    width: 300px;
    height: 200px;
    background: rgba(13, 18, 38, 0.1);
    box-shadow: 0px 0px 4px 1px rgba(12, 81, 149, 0.5);
    border: 1px solid rgba(14, 101, 187, 0.5);
    margin-left: 30px;
    margin-top: 5px;
  }

  .left_3 {
    width: 300px;
    height: 200px;
    background: rgba(13, 18, 38, 0.1);
    box-shadow: 0px 0px 4px 1px rgba(12, 81, 149, 0.5);
    border: 1px solid rgba(14, 101, 187, 0.5);
    margin-left: 30px;
    margin-top: 5px;
  }

  .center_1 {
    background-image: url("../../../../static/images/map/地图bg.png");
    background-size: 100%;
    height: 410px;
  }

  .center_2 {
    width: 480px;
    height: 200px;
    background: rgba(13, 18, 38, 0.1);
    box-shadow: 0px 0px 4px 1px rgba(12, 81, 149, 0.5);
    border: 1px solid rgba(14, 101, 187, 0.5);
    margin-left: 0px;
  }

  .right_1 {
    width: 300px;
    height: 200px;
    background: rgba(13, 18, 38, 0.1);
    box-shadow: 0px 0px 4px 1px rgba(12, 81, 149, 0.5);
    border: 1px solid rgba(14, 101, 187, 0.5);
    margin-left: 5px;
  }

  .right_2 {
    width: 300px;
    height: 200px;
    background: rgba(13, 18, 38, 0.1);
    box-shadow: 0px 0px 4px 1px rgba(12, 81, 149, 0.5);
    border: 1px solid rgba(14, 101, 187, 0.5);
    margin-left: 5px;
    margin-top: 5px;
  }

  .right_3 {
    width: 300px;
    height: 200px;
    background: rgba(13, 18, 38, 0.1);
    box-shadow: 0px 0px 4px 1px rgba(12, 81, 149, 0.5);
    border: 1px solid rgba(14, 101, 187, 0.5);
    margin-left: 5px;
    margin-top: 5px;
  }

  .bt {
    width: 100%;
    height: 22px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(4, 241, 248, 1);
    line-height: 22px;
    padding-left: 10px;
  }

  .type {
    width: 66px;
    height: 20px;
    font-size: 13px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 20px;
  }

  .count {
    width: 58px;
    height: 42px;
    font-size: 22px;
    font-family: DINCond-Bold, DINCond;
    font-weight: bold;
    color: rgba(4, 241, 248, 1);
    line-height: 42px;
    margin-left: 5px;
  }

  .dw {
    width: 14px;
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 20px;
    margin-left: 15px;
    margin-left: 25px;
  }

  .ajbjl {
    width: 70px;
    height: 19px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: rgba(255, 255, 255, 1);
    line-height: 19px;
    margin-top: 50px;
  }

  .sl {
    width: 190px;
    height: 51px;
    font-size: 23px;
    font-family: DINCondensed-Bold, DINCondensed;
    font-weight: bold;
    color: rgba(4, 241, 248, 1);
    line-height: 61px;
  }

  .sl2 {
    width: 190px;
    height: 51px;
    font-size: 17px;
    font-family: DINCondensed-Bold, DINCondensed;
    font-weight: bold;
    color: #FFFFFF;
    line-height: 61px;
  }

  /* .fullscreen .el-main {

      background-position: bottom;
  } */
  .body_bg .el-main {
    background: none;
  }

  .main {
    background-image: url("../../../../static/images/map/边框.png");
    background-size: 100% 100%;
  }

  .dpright_font0 {
    width: 196px;
    height: 28px;
    font-size: 20px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 28px;
  }

  .dpright_font1 {
    width: 196px;
    height: 28px;
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FF9703;
    line-height: 28px;
  }
</style>
