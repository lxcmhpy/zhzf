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
          <div style="width:100%;height: 550px;" id="container">

          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>


<script>
  import loadScript from "@/common/js/loadScript.js";
import VueAMap from "vue-amap"
import {spaceApi} from '@/api/analysis/analysisManage.js'
import Vue from "vue";

export default {
  data() {
    return {
      date:['2019-01','2020-09'],
      logForm: {},
      isShow: false,
      addressCon:[],
      mapData:[],
      addressName:[],
      addressValue:[],
      map: null,
      heatmap: null
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
      spaceApi(param).then(res => {
        if (res.code == 200) {
          res.data.forEach(v=>{
            this.addressCon.push({'lng':v.name.split(',').map(val => parseFloat(val))[0],'lat':v.name.split(',').map(val => parseFloat(val))[1],'count':v.value})

          })
          setTimeout(() => {
            this.initMap();
            this.createHeatMap()
          }, 1000);
        }
      });


    },
    initMap(){
      this.map = new AMap.Map("container", {
        resizeEnable: true,
        center: [115.906044,28.557908],
        zoom: 11,
        mapStyle: 'amap://styles/grey', // 极夜蓝
        //自定义地图样式：https://lbs.amap.com/dev/mapstyle/index
      });
    },
    //判断浏览区是否支持canvas
    isSupportCanvas() {
      let elem = document.createElement("canvas");
      return !!(elem.getContext && elem.getContext("2d"));
    },
    createHeatMap() {
      /**
       * http://gaode.com)
       */
      let heatmapData = this.addressCon;
      if (!this.isSupportCanvas()) {
        return this.$msg.error(
          "热力图仅对支持canvas的浏览器适用,您所使用的浏览器不能使用热力图功能,请换个浏览器试试。"
        );
      }
      let __this = this;
      this.map.plugin(["AMap.Heatmap"], function() {
        //初始化heatmap对象
        __this.heatmap = new AMap.Heatmap(__this.map, {
          radius: 25, //给定半径
          opacity: [0, 0.8],
        });
        //设置数据集：该数据为北京部分“公园”数据
        __this.heatmap.setDataSet({
          data: heatmapData,
          max: 5
        });
      });
    }
    /*drawLine1() {
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
    }*/
  },
  mounted() {
    this.getData(this.date)
  },
  created() {
    loadScript('https://webapi.amap.com/maps?v=1.4.15&key="2fab5dfd6958addd56c89e58df8cbb37"').then(() => this.initMap());
  }
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
