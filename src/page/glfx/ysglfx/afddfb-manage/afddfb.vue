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
      afddfb,
    } from '@/api/fxyp.js'
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
          data: this.data1
          // [
          //   { name: "南昌市", value: "209" },
          //   { name: "九江市", value:  "181"},
          //   { name: "上饶市", value: "154" },
          //   { name: "抚州市", value: "144" },
          //   { name: "宜春市", value: "135" },
          //   { name: "吉安市", value: "117"},
          //   { name: "赣州市", value: "74" },
          //   { name: "景德镇市", value: "72" },
          //   { name: "萍乡市", value: "67" },
          //   { name: "新余市", value: "55" },
          //   { name: "鹰潭市", value: "26" },
          // ] 
        }
      ]
      });
    },
    drawLine2() {
      this.chartColumn = echarts.init(document.getElementById("chart2"));
      var salvProName =this.data3;
      // ["南昌市","九江市","上饶市","抚州市","宜春市","吉安市","赣州市","景德镇市","萍乡市","新余市","鹰潭市",];
      var salvProValue =this.data2;
      // [209,181,154,144,135,117,74,72,67,55,26];
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
   //查询-----------------------------------------------------------------------------------------------------
    search1(province,start,end) {
      
      let data = {
        province:province,
        start:start,
        end:end
      };
      
         afddfb(data).then(res => {
        if(res.length!=0){
            this.data1.push({name: province, value: res[0][1]==null?0:res[0][1] });            
            this.data2.push(res[0][1]==null?0:res[0][1] );
            this.data3.push(province);
        }else{
          this.data1.push({name: province, value: 0});
            this.data2.push(0);
            this.data3.push(province);
        }
        console.log(this.data1);
        console.log(this.data2);
        console.log(this.data3);
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
      this.search1('南昌市',val[0],val[1]);
      this.search1('九江市',val[0],val[1]);
      this.search1('上饶市',val[0],val[1]);
      this.search1('抚州市',val[0],val[1]);
      this.search1('宜春市',val[0],val[1]);
      this.search1('吉安市',val[0],val[1]);
      this.search1('赣州市',val[0],val[1]);
      this.search1('景德镇市',val[0],val[1]);
      this.search1('萍乡市',val[0],val[1]);
      this.search1('新余市',val[0],val[1]);
      this.search1('鹰潭市',val[0],val[1]);
     }
     
   }
  },
  mounted() {
    this.data1=[];
    this.data2=[];
    this.data3=[];
    this.search1('南昌市',202001,202012);
    this.search1('九江市',202001,202012);
    this.search1('上饶市',202001,202012);
    this.search1('抚州市',202001,202012);
    this.search1('宜春市',202001,202012);
    this.search1('吉安市',202001,202012);
    this.search1('赣州市',202001,202012);
    this.search1('景德镇市',202001,202012);
    this.search1('萍乡市',202001,202012);
    this.search1('新余市',202001,202012);
    this.search1('鹰潭市',202001,202012);
    // this.drawLine1();
    // this.drawLine2();
    
 
  },
  created() {}
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
