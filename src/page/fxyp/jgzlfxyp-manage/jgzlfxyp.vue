<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage toggleBox">
      <div class="handlePart">
        <el-form :inline="true" :model="logForm" label-width="100px" ref="logForm">
          <el-form-item label="统计周期" prop>
            <el-date-picker
              v-model="value3"
              type="monthrange"
              range-separator="至"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div >
        <el-row>
          <el-col :span="12">
            <div id="chart1" style="width: 550px; height: 500px;"></div>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="6" >
                <div id="chart2" style="width: 600px; height: 400px;margin-top:60px" ></div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>


<script>
import echarts from "echarts";

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

export default {
  data() {
    return {
      value3: "",
      value2: "",
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      tableData: [
        {
          road: "S201",
          number: 3
        }
      ],
      logForm: {
        organ: "",
        type: "",
        operation: "",
        username: "",
        startTime: "",
        endTime: "",
        dateArray: ""
      },
      isShow: false,
      data1:[],
      data2:[],

    };
  },
  methods: {
    drawLine1() {
      let myChart = echarts.init(document.getElementById("chart1"));

      myChart.setOption({
        backgroundColor: "#FFFFFF",
      title: {
        text: "",
        subtext: "",
        x: "center"
      },
      tooltip: {
        trigger: "item"
      },

      //左侧小导航图标
      visualMap: {
        min: 0,
        max: 200,
        text: ["高", "低"],
        inRange: {
          color: ["lightskyblue", "yellow", "orangered"]
        }
      },

      //配置属性
        series: [
          {
            name: "案发数量",
            type: "map",
            mapType: "宁夏",
            roam: true,
            label: {
              normal: {
                show: false //省份名称
              },
              emphasis: {
                show: false
              }
            },
            data: [
              { name: "银川市", value: "215" },
              { name: "石嘴山市", value: "131"},
              { name: "吴忠市", value: "84" },
              { name: "中卫市", value: "56" },
              { name: "固原市", value: "10" }
            ] //数据
          }
        ]
      });
    },
    drawLine2() {
      this.chartColumn = echarts.init(document.getElementById("chart2"));
      // var xData =["南昌市","九江市","上饶市","抚州市","宜春市","吉安市","赣州市","景德镇市","萍乡市","新余市","鹰潭市",];
      // var yData =[209,181,154,144,135,117,74,72,67,55,26];
      const data = [209,181,154,144,68]
      const sideData = data;
      this.chartColumn.setOption({
       backgroundColor: "",
    tooltip: {
        trigger: 'axis',
        formatter: "{b} : {c}",
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    xAxis: {
        data: ["银川市","石嘴山市","吴忠市","中卫市","固原市"],
        //坐标轴
        axisLine: {
            lineStyle: {
                color: 'black'
            }
        },
        //坐标值标注
        axisLabel: {
            show: true,
            textStyle: {
                color: 'black',
            },
            interval: 0,
            formatter:function(value)
            {
                return value.split("").join("\n");
            }
        }
    },
    yAxis: {
        //坐标轴
        axisLine: {
            show: false
        },
        //坐标值标注
        axisLabel: {
            show: true,
            textStyle: {
                color: 'black',
            }
        },
        //分格线
        splitLine: {
            lineStyle: {
                color: '#4784e8'
            }
        }
    },
    series: [
      {
        name: 'a',
       tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
        type: 'bar',
        barWidth: 24.5,
         itemStyle: {
              //通常情况下：
              normal: {
                color: function(params) {
                  var colorList = ["rgb(42,170,227)"];
                  return colorList[0];
                }
              }
            },
        // itemStyle: {
        //     normal: {
        //         color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
        //             offset: 0,
        //             color: "#0B4EC3" // 0% 处的颜色
        //         }, {
        //             offset: 0.6,
        //             color: "#138CEB" // 60% 处的颜色
        //         }, {
        //             offset: 1,
        //             color: "#17AAFE" // 100% 处的颜色
        //         }], false)
        //     }
        // },
        data: data,
        // barGap: 0
    },
    ]

      });
    },
    search1(val) {
      this.currentPage = val;
      let data = {
        // year:2018
      };
      let _this = this;
      this.$store.dispatch("afddfb", data).then(res => {
        console.log(res);
        //  var map={};
        //  res.forEach(item =>{
        //       map[item[0]]=item[1];

        //  });
        // console.log(map);


          this.data1=[res[0][0],res[1][0],res[2][0],res[3][0],res[4][0]];
          this.data2=[res[0][1],res[1][1],res[2][1],res[3][1],res[4][1]];
           this.drawLine2();
      });
      err => {
        console.log(err);
      };
    },
  },
  mounted() {
    //  this.search1();
    this.drawLine1();
    this.drawLine2();
    // this.drawLine3();
  },
  created() {}
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
