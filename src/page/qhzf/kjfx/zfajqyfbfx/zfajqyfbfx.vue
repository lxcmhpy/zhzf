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
              value-format="yyyyMM" @change="select"
              style="width:400px"
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
import {
      kjglfx,
    } from '@/api/fxyp.js'
import "echarts/map/js/china.js";
import "echarts/map/js/province/qinghai.js";
import "echarts/map/json/province/qinghai.json";
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
      data1:[],
      data2:[],
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
      data3:[],
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
          mapType: "青海",
          roam: true,
          label: {
            normal: {
              show: false //省份名称
            },
            emphasis: {
              show: false
            }
          },
          data: this.data1
        }
      ]
      });
    },
    drawLine2() {
      this.chartColumn = echarts.init(document.getElementById("chart2"));
       var yData = this.data3;
       var dataArr = this.data2;
  // [87, 95, 79, 60, 53, 92, 79, 60, 53, 92,26];
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
          left: 160,
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
    //查询-----------------------------------------------------------------------------------------------------
    search1(province,start,end) {
      
      let data = {
        province:province,
        start:start,
        end:end
      };
      
         kjglfx(data).then(res => {
        if(res.length!=0){
            this.data1.push({name: province, value: res[0][1]==null?0:res[0][1] });            
            this.data2.push(res[0][1]==null?0:res[0][1] );
            this.data3.push(province);
        }else{
          this.data1.push({name: province, value: 0});
            this.data2.push(0);
            this.data3.push(province);
        }
        this.drawLine1();
        this.drawLine2();
      });
      err => {
        console.log(err);
      };
    },
    select(val){
      
     if(val!=null){
      this.data1=[];
      this.data2=[];
      this.data3=[];
      this.search1('西宁市',val[0],val[1]);
      this.search1('海东市',val[0],val[1]);
      this.search1('玉树藏族自治州',val[0],val[1]);
      this.search1('黄南藏族自治州',val[0],val[1]);
      this.search1('海西蒙古族藏族自治州',val[0],val[1]);
      this.search1('海南藏族自治州',val[0],val[1]);
      this.search1('海北藏族自治州',val[0],val[1]);
      this.search1('果洛藏族自治州',val[0],val[1]);
     }
     
   }
  },
  mounted() {
     this.data1=[];
     this.data2=[];
     this.data3=[];
     this.search1('西宁市',202001,202012);
     this.search1('海东市',202001,202012);
     this.search1('玉树藏族自治州',202001,202012);
     this.search1('黄南藏族自治州',202001,202012);
     this.search1('海西蒙古族藏族自治州',202001,202012);
     this.search1('海南藏族自治州',202001,202012);
     this.search1('海北藏族自治州',202001,202012);
     this.search1('果洛藏族自治州',202001,202012);
    // this.drawLine1();
    // this.drawLine2();
    
 
  },
  created() {}
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
