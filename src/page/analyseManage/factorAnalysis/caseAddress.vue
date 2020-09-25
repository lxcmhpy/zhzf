<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage toggleBox">
      <div class="handlePart">
        <el-form :inline="true" :model="logForm" label-width="100px" ref="logForm">
          <el-form-item label="统计周期" prop>
            <el-date-picker
              v-model="date"
              type="monthrange"
              range-separator="至"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
              format="yyyy-MM"
              value-format="yyyy-MM"
              @change="searchDraw"
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
import "echarts/map/js/province/ningxia.js";
import "echarts/map/json/province/ningxia.json";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/chart/heatmap";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/tooltip";
import {caseAddressApi} from '@/api/analysis/analysisManage.js'
export default {
  data() {
    return {
      date:[],
      logForm: {
      },
      isShow: false,
      mapData:[],
      addressName:[],
      addressValue:[]
    };
  },
  methods: {
    searchDraw() {
      let param = {
        year:this.date[0],
        year2:this.date[1]
      };
      if(this.date.length ==0){
        param.year = '2019-09'
        param.year2 = '2020-09'
      }
      caseAddressApi(param).then(res => {
        if(res.code == 200){
          this.mapData = res.data
          res.data.map(item => {
            this.addressName.push(item.name)
            this.addressValue.push(item.value)
          })
          this.drawLine1()
          this.drawLine2()
        }
      });
      err => {
        console.log(err);
      };
    },
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
        max: 500,
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
          data: this.mapData //数据
        }
      ]
      });
    },
    drawLine2() {
      this.chartColumn = echarts.init(document.getElementById("chart2"));
      var salvProName = this.addressName;
      var salvProValue = this.addressValue;
      var salvProMax =[];//背景按最大值
      for (let i = 0; i < salvProValue.length; i++) {
          salvProMax.push(salvProValue[0])
      }
      this.chartColumn.setOption({
        title: {
        text: "各省市案发数量分布",
        subtext: "",
        x: "center"
      },
          backgroundColor:"",
    grid: {
        left: '2%',
        right: '2%',
        bottom: '2%',
        top: '6%',
        containLabel: true
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'none'
        },
        formatter: function(params) {
            return params[0].name  + ' : ' + params[0].value
        }
    },
    xAxis: {
        show: false,
        type: 'value'
    },
    yAxis: [{
        type: 'category',
        inverse: true,
        axisLabel: {
            show: true,
            textStyle: {
                color: 'black'
            },
        },
        splitLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLine: {
            show: false
        },
        data: salvProName
    }, {
        type: 'category',
        inverse: true,
        axisTick: 'none',
        axisLine: 'none',
        show: true,
        axisLabel: {
            textStyle: {
                color: '#ffffff',
                fontSize: '12'
            },
        },
        data:salvProValue
    }],
    series: [{
            name: '值',
            type: 'bar',
            zlevel: 1,
            itemStyle: {
                normal: {
                    barBorderRadius: 30,
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                        offset: 0,
                        color: 'rgb(57,89,255,1)'
                    }, {
                        offset: 1,
                        color: 'rgb(46,200,207,1)'
                    }]),
                },
            },
            barWidth: 20,
            data: salvProValue
        },
        {
            name: '背景',
            type: 'bar',
            barWidth: 20,
            barGap: '-100%',
            data: salvProMax,
            itemStyle: {
                normal: {
                    color: 'rgba(24,31,68,1)',
                    barBorderRadius: 30,
                }
            },
        },
    ]
      });
    },
  },
  mounted() {
    this.searchDraw()
  },
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
