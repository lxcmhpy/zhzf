<template>
  <el-container class="body_bg">
    <el-main>
      <el-row class="main">
        <el-row>
          <el-col :span="6" style="height:60px;margin-top: 25px;margin-left: 100px; ">
            <div class="dptitle_1 dptitle_font" @click="ajpage()">执法案件</div>
          </el-col>
          <el-col :span="4" class="dptitle_2" style="margin-left: 13px;">
            江西执法数据分析研判系统
          </el-col>
          <el-col :span="6" style="height:60px;margin-left: -505px;margin-top: 35px;">
            <div class="dptitle_3 dptitle_font" @click="zbpage()">人员装备</div>

          </el-col>
          <el-col :span="6" style="height:60px;margin-left:50px;margin-top: 35px;">
            <div class="dptitle_4">
              <span class="dpright_font0">涉案本地车辆：</span>
              <span class="dpright_font1">{{vehicle}}辆</span>
            </div>

          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-row class="left_1">
              <el-row>
                <div class="bt">案件类型</div>
              </el-row>
              <el-row style="text-align:center;overflow-y: hidden;overflow-x: auto;height: 153px;">
                <el-col class="case-box" v-for="(item,i) in caseTypeCon" :key="i">
                  <img src="../../../../static/images/map/一般案件.png" style="height:60px;width:60px;">
                  <div class="type">{{item.name}}</div>
                  <div id="ybaj" class="count">{{item.value}}</div>
                  <div class="dw">例</div>
                </el-col>
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
                      <span class="sl">{{complete}}</span>
                      <span class="dw" style="margin-left:0px;">例/</span>
                      <span class="sl2">{{all}}</span>
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
                <div id="afd" class="afd" style="width: 100%; height: 200px;"></div>
              </el-row>
            </el-row>
            <el-row class="right_3">
              <el-row>
                <div class="bt">罚没款项</div>
              </el-row>
              <el-row style="text-align:center;">
                <el-row class="mt24">
                  <el-col :span="12"><img src="../../../../static/images/map/处罚金额.png" style="height:80px;width:100px;">

                  </el-col>
                  <el-col :span="12">
                    <div class="type" style="height:30px;width:100px;margin-left:25px;">【 处罚金额 】</div>
                    <div class="count" style="text-align:center;width:100px;margin-left:25px;">{{penalty}}
                    </div>
                    <div class="dw" style="height:30px;width:100px;margin-left:25px;">{{unit}}</div>
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
  import {NxMap} from '@/common/js/mapType.js'
  import "echarts/map/js/china.js";
  import "echarts/map/js/province/jiangxi.js";
  import "echarts/map/json/province/jiangxi.json";
  import "echarts/map/js/province/ningxia.js";
  import "echarts/map/json/province/ningxia.json";
  import "echarts/lib/component/title";
  import "echarts/lib/component/legend";
  import "echarts/lib/chart/heatmap";
  import "echarts/lib/component/toolbox";
  import "echarts/lib/component/tooltip";
  import "../../../../static/css/animate.min.css";
  import {lawCaseApi} from '@/api/analysis/analysisManage.js'

  export default {
    data() {
      return {
        vehicle: '',
        penalty: '',
        all: '',
        complete: '',
        caseTypeCon: [],
        incidentTrend: [],
        data1: [],
        data2: [],
        carsData: {
          xAxis: [],
          series: []
        },
        legendTrend: [],
        trendYear: '',
        trendYearNew: '',
        trendYearDate: [],
        trendYearDateNew: [],
        trendYearNewX: [],
        caseStatusData: [],
        caseNumber: [],
        caseNumberXData: [],
        caseNumberSeries: [],
        crimePlaceXData: [],
        crimePlaceSeries: [],
        carSortXData: [],
        carSortSeries: [],
        mapData:[],
        unit:'万元'
      };
    },
    methods: {
      getData() {
        let that = this;
        let param = {
          organId: JSON.parse(localStorage.getItem('userInfo')).organId
        };
        lawCaseApi(param).then(res => {
          if (res.code == 200) {
            if(res.data.vehicleInvolved){
              this.vehicle = res.data.vehicleInvolved[0].value;
            }else{
              this.vehicle = ''
            }
            this.caseTypeCon = res.data.typeOfCase;
            this.incidentTrend = res.data.incidentTrend;
            this.trendYearNewX = ['01','02','03','04','05','06','07','08','09','10','11','12']
            Object.keys(res.data.incidentTrend).forEach(function (element, index) {
              if (index == 0) {
                that.trendYearDate = [0,0,0,0,0,0,0,0,0,0,0,0]
                that.trendYear = element
                if(res.data.incidentTrend[element].length>0){
                  that.trendYearNewX.map(i=>{
                    res.data.incidentTrend[element].map(item => {
                      if(i == item.name){
                        that.trendYearDate[i-1]= item.value
                      }else{
                        return
                      }
                    })
                  })
                }else{
                  that.trendYearDate = [0,0,0,0,0,0,0,0,0,0,0,0]
                }
              } else if (index == 1) {
                that.trendYearDateNew = [0,0,0,0,0,0,0,0,0,0,0,0]
                that.trendYearNew = element
                if(res.data.incidentTrend[element].length>0) {
                  that.trendYearNewX.map(i=>{
                    res.data.incidentTrend[element].map(item => {
                      if(i == item.name){
                        that.trendYearDateNew[i-1]= item.value
                      }else{
                        return
                      }
                    })
                  })
                }else{
                  that.trendYearDateNew = [0,0,0,0,0,0,0,0,0,0,0,0]
                }
              }
            })
            this.caseStatusData = res.data.caseStatus
            res.data.caseStatus.map(item => {
              if (item.name == '已结案') {
                that.complete = item.value
              } else if (item.name == '总案件') {
                that.all = item.value
              }
            });
            //执法机构案件数量
            if(res.data.caseNumber.length>0){
              res.data.caseNumber.slice(0, 5).map(item => {
                that.caseNumberSeries.push(item.value)
                that.caseNumberXData.push(item.name)
              })
            }

            //罚没款项

            if(res.data.confiscated[0].value.length>8){
              that.unit = '亿元'
              that.penalty = (res.data.confiscated[0].value/100000000).toFixed(2)
            }else{
              that.unit = '万元'
              that.penalty = (res.data.confiscated[0].value/10000).toFixed(2)
            }

            //案发地
            res.data.crimePlace.slice(0, 5).map(item => {
              that.crimePlaceSeries.push(item.value)
              that.crimePlaceXData.push(item.name)
            })
            //车辆排名
            if(res.data.vehicles){
              res.data.vehicles.slice(0, 5).map(item => {
                that.carSortSeries.push(item.value)
                that.carSortXData.push(item.name)
              })
            }else{
              that.carSortSeries =[]
              that.carSortXData =[]
            }
            that.mapData = res.data.mapdata
            NxMap(that.mapData,'案件数量')
            that.trend()    //年度案发趋势
            that.caseStatus()   //案件状态
            that.caseNumberFun()   //执法机构案件数量
            that.crimePlaceFun()  //案发地
            that.carSortFun()   //车辆排名

          }
        });
        err => {
          console.log(err);
        };
      },
      ajpage() {
        this.$router.push({path: '/lawCase_JX'})
      },
      zbpage() {
        this.$router.push({path: '/personEquip'})
      },
      /*江西*/
     /* map(mapData) {
        //地图数据
        let jiangxi = "../../../../static/json/map/data-1518338017111-rJK1gtpUM.json";
        let yingtan = "../../../../static/json/map/data-1518338860057-By447tpLf.json";
        let yichun = "../../../../static/json/map/data-1518338852969-Hy677KTIf.json";
        let xinyu = "../../../../static/json/map/data-1518338838010-SyAzQYTIf.json";
        let shangrao = "../../../../static/json/map/data-1518338829670-H1UfQYa8G.json";
        let pingxiang = "../../../../static/json/map/data-1518338823093-HkyMQtpUf.json";
        let nanchang = "../../../../static/json/map/data-1518338805373-S1Temta8G.json";
        let jiujiang = "../../../../static/json/map/data-1518338799987-S1deQFTLz.json";
        let jingdezhen = "../../../../static/json/map/data-1518338783915-HJOJXtaLf.json";
        let jian = "../../../../static/json/map/data-1518338772507-BJnAMKTIz.json";
        let ganzhou = "../../../../static/json/map/data-1518338763250-S17RfKpLM.json";
        let fuzhou = "../../../../static/json/map/data-1518338684239-S1EFGtp8f.json";

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
            '南昌市': [115.89, 28.48],
            '景德镇市': [117.28, 29.09],
            '萍乡市': [113.93, 27.41],
            '九江市': [115.97,29.51],
            '新余市': [114.81, 27.72],
            '鹰潭市': [117.12, 28.10],
            '赣州市': [115.04, 25.67],
            '吉安市': [115.05, 26.88],
            '宜春市': [114.41, 28.03],
            '抚州市': [116.45, 27.79],
            '上饶市': [117.92, 28.22]
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
              let temp = [];
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
                res = "<span style='color:#fff;'>" + name + "</span><br/>案件数量：" + value;
                return res;
              }
            },
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
            data: mapData
          });
        })
        },*/
      /*宁夏*/
      /*map() {
        let ningxia = "../../../../static/json/map/ningxia.json";
        let guyuan = "../../../../static/json/map/guyuan.json";
        let shizuishan = "../../../../static/json/map/shizuishan.json";
        let wuzhong = "../../../../static/json/map/wuzhong.json";
        let yinchuan = "../../../../static/json/map/yinchuan.json";
        let zhongwei = "../../../../static/json/map/zhongwei.json";

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
                res = "<span style='color:#fff;'>" + name + "</span><br/>案件数量：" + value;
                return res;
              }
            },
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
            data: that.mapData
          });
        })
      },*/
      trend() {
        /*年度案发趋势*/
        this.chartColumn = echarts.init(document.getElementById("ndafqs"));
        const colorList = ["#9E87FF", '#73DDFF', '#fe9a8b', '#F56948', '#9E87FF', "#9E87FF", '#73DDFF', '#fe9a8b', '#F56948', '#9E87FF', "#9E87FF", '#73DDFF']
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
            data: ['01','02','03','04','05','06','07','08','09','10','11','12'],
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
          series: [
            {
              name: this.trendYear,
              type: 'line',
              data: this.trendYearDate,
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
                ])
              },
              itemStyle: {
                normal: {
                  color: colorList[0],
                  borderColor: colorList[0]
                }
              }
            }, {
              name: this.trendYearNew,
              type: 'line',
              data: this.trendYearDateNew,
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
                ])
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

      caseNumberFun() {
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
            bottom: '34%'
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
              interval: 0,
              formatter: function (value) {
               return value.substring(0, 2)+'\n'+value.substring(2, 5)
              }
            },
            splitLine: {
              show: false,
            },
            data: this.caseNumberXData,
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
              data: this.caseNumberSeries,
              type: 'pictorialBar',
              symbol: 'image://' + insetShadowUrl,
              barWidth: 30,
            },
            {
              data: this.caseNumberSeries,
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
      caseStatus() {
        this.chartColumn = echarts.init(document.getElementById("ajzt"));
        let value = this.complete / this.all;
        let title = '';
        let int = (value*100).toFixed(2);
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
              startAngle: '90'-int,
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
                  width: 70
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
      carSortFun() {
        /*涉案外埠车辆排名*/
        this.chartColumn = echarts.init(document.getElementById("clpm"));
        let option = {
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
            data: this.carSortXData,
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
              interval: 0,
              formatter: function (value) {
                return value.substring(0, 2);
              },
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
              fontWeight: 'bold',
              fontSize: 14,
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
            data: this.carSortSeries,
            z: 10
          }]
        };
        this.chartColumn.setOption(option);

      },
      crimePlaceFun() {
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
            top: '20',
            right: '20',
            left: '40',
            bottom: '70' //图表尺寸大小
          },
          xAxis: [{
            type: 'category',
            color: '#59588D',
            data: this.crimePlaceXData,
            axisLabel: {
              margin: 10,
              color: '#999',
              textStyle: {
                fontSize: 12
              },
              interval: 0,
              formatter: function (value) {
                return value.substring(0, 3);
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
            data: this.crimePlaceSeries,
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
          },
            /*{
            data: this.crimePlaceSeries,
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
          }*/
          ]
        });
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
      this.getData()
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
    height: 33px;
    font-size: 13px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 20px;
  }

  .count {
    width: 58px;
    font-size: 22px;
    font-family: DINCond-Bold, DINCond;
    font-weight: bold;
    color: rgba(4, 241, 248, 1);
    line-height: 26px;
    margin-left: 5px;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
    margin-top: 12px;
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

  .mt24 {
    margin-top: 24px;
  }

  .case-box {
    width: 74px;
    height: 153px;
  }
  .afd *{
  white-space: pre;
  }
</style>
