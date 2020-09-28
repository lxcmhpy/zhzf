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
              @change="changeTime"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div >
        <el-row>
          <div id="chart1" style="width:100%;height: 550px;"></div>
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
import {spaceApi} from '@/api/analysis/analysisManage.js'
export default {
  data() {
    return {
      date:['2019-01','2020-09'],
      logForm: {},
      isShow: false,
      addressCon:[],
      mapData:[],
      addressName:[],
      addressValue:[]
    };
  },
  methods: {
    changeTime(val){
      this.addressCon = []
      this.getData(val)
    },
    getData(time) {
      let param = {
        startTime: time[0],
        endTime:time[1]
      };
      let json={}
      spaceApi(param).then(res => {
        if (res.code == 200) {
          res.data.forEach(v=>{
            json['value'] = v.split(',').map(val => parseFloat(val))
            this.addressCon.push({value:v.split(',').map(val => parseFloat(val))})
          })
          this.drawLine1()
        }
      });

    },
    drawLine1() {
      let myChart = echarts.init(document.getElementById("chart1"));
     myChart.setOption({
         title: {
           text: '',
           x: 'left',
           textStyle: {
             fontSize: 33,
             color: '#fff',
             fontWeight: 'bold',
             fontFamily: 'testFamily'
           }
         },
         tooltip: {
           trigger: 'item'
         },
         toolbox: {
           show: false,
           showTitle: true,
           orient: 'vertical',
           left: 'right',
           top: 'center',
           feature: {
             mark: {show: true},
             dataView: {show: true, readOnly: false},
             restore: {show: true},
             saveAsImage: {show: true}
           }
         },
         visualMap: {
           show: false,
           inRange: {
             color: ['#d94e5d', '#eac736', '#50a3ba'].reverse()
           },
           textStyle: {
             color: '#fff'
           }
         },
         geo: {
           map: '宁夏',
           zoom: 1.3,
           label: {
             emphasis: {
               show: true
             }
           },
           roam: true,
           itemStyle: {
             normal: {
               borderWidth: 1,
               borderColor:'#389BB7',
               areaColor: '#A5DCF4',
             },
             emphasis: {
               areaColor: '#389BB7',
               borderWidth: 0
             }
           }
         },
         series: [{
           name: '中国',
           zoom: 2,
           aspectScale: 0.75, //长宽比
           type: 'heatmap',
           coordinateSystem: 'geo',
           data: this.addressCon,
           itemStyle: {
             normal: {
               borderColor: '#389BB7',
               borderWidth: 1,
             },
             emphasis: {
               areaColor: '#d8d5e6'
             }
           }
         }]
       }
     )
    }
  },
  mounted() {
    this.getData(this.date)
  },
  created() {}
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
