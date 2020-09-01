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
                <div id="chart2" style="width: 500px; height: 400px;margin-top:60px" ></div>
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
        max: 100,
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
          mapType: "江西",
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
            { name: "南昌市", value: "209" },
            { name: "九江市", value:  "181"},
            { name: "上饶市", value: "154" },
            { name: "抚州市", value: "144" },
            { name: "宜春市", value: "135" },
            { name: "吉安市", value: "117"},
            { name: "赣州市", value: "74" },
            { name: "景德镇市", value: "72" },
            { name: "萍乡市", value: "67" },
            { name: "新余市", value: "55" },
            { name: "鹰潭市", value: "55" },
          ] 
        }
      ]
      });
    },
    drawLine2() {
      this.chartColumn = echarts.init(document.getElementById("chart2"));
      // var salvProName =["南昌市","九江市","上饶市","抚州市","宜春市","吉安市","赣州市","景德镇市","萍乡市","新余市","鹰潭市",];
    var yData = ["南昌市","九江市","上饶市","抚州市","宜春市","吉安市","赣州市","景德镇市","萍乡市","新余市","鹰潭市",];
  var dataArr = [87, 95, 79, 60, 53, 92, 79, 60, 53, 92,26];
  var allDataArr = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100,100];

this.chartColumn.setOption({
   backgroundColor: '#fff',
      tooltip: {
          trigger: 'axis',
          padding: [10,10],
          axisPointer: {
              type: 'shadow'
          },
          formatter: function(param) {
              return param[0].name + "：" + param[0].value
          }
      },
      grid: {
          left: 60,
          right: 48,
          top: 0,
          bottom: 0
      },
      xAxis: {
          type: 'value',
          axisLabel: {
              show: false
          },
          axisTick: {
              show: false
          },
          axisLine: {
              show: false
          },
          splitLine: {
              show: false
          }
      },
      yAxis: [{
          type: 'category',
          data: yData,
          axisLabel: {
              color: "#000",
              fontSize: 14
          },
          axisTick: {
              show: false
          },
          axisLine: {
              show: false
          }
      }, {
          type: 'category',
          axisTick: 'none',
          axisLine: 'none',
          show: true,
          axisLabel: {
              textStyle: {
                  color: '#0058a3',
                  fontSize: 14
              }
          },
          data: dataArr
      }],
      series: [{
              name: '',
              type: 'bar',
              data: dataArr,
              barWidth: 10,
              zlevel: 1,
              itemStyle: {
                  normal: {
                      color: '#0058a3'
                  }
              }
          },
          {
              name: '',
              type: 'bar',
              barWidth: 10,
              barGap: '-100%',
              data: allDataArr,
              itemStyle: {
                  normal: {
                      color: '#eee'
                  }
              }
          }
      ]
      });
    },
    // search1(val) {
    //   this.currentPage = val;
    //   let data = {
    //     // year:2018
    //   };
    //   let _this = this;
    //   this.$store.dispatch("afddfb", data).then(res => {
    //     console.log(res);
    //     //  var map={};
    //     //  res.forEach(item =>{
    //     //       map[item[0]]=item[1];  
                
    //     //  });
    //     // console.log(map);
        

    //       this.data1=[res[0][0],res[1][0],res[2][0],res[3][0],res[4][0]];  
    //       this.data2=[res[0][1],res[1][1],res[2][1],res[3][1],res[4][1]]; 
    //        this.drawLine2();
    //   });
    //   err => {
    //     console.log(err);
    //   };
    // },
  },
  mounted() {
     this.drawLine1();
    this.drawLine2();
    // this.drawLine2();
    // this.drawLine3();
  },
  created() {}
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
