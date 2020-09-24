<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage toggleBox">
      <div class="handlePart">
        <el-form :inline="true" :model="logForm" label-width="100px" ref="logForm">
          <el-form-item label="统计年度" prop>
            <el-date-picker v-model="value3" type="year" placeholder="选择年" value-format="yyyy" @change="select"></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <el-row :gutter="20" style="min-height: 50%">
        <el-col :span="12" style="height: 100%">
          <el-card class="box-card">
            <div id="chartColumn" class="chart-box"></div>
          </el-card>
        </el-col>
        <el-col :span="12" style="height: 100%">
          <el-card class="box-card">
            <div id="chartColumn1" class="chart-box"></div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>


<script>
  import echarts from "echarts";
  import {
    ndajsltbtj
  } from '@/api/fxyp.js'
  export default {
    data() {
      return {
        value3: "2019",
        value2: "",
        currentPage: 1, //当前页
        pageSize: 10, //pagesize
        totalPage: 0, //总页数
        tableData: [{
          time: "2018年1-12月",
          lscf: "1714804",
          cxcf: "23473275",
          slxk: "17502999",
          cxxk: "0",
          lspc: "35561880",
          zs: "78252958"
        },{
          time: "2019年1-12月",
          lscf: "968369",
          cxcf: "179100",
          slxk: "8203862",
          cxxk: "0",
          lspc: "18883066",
          zs: "28234397"
        }],
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
      drawLine() {
        this.chartColumn = echarts.init(document.getElementById("chartColumn"));

        this.chartColumn.setOption({
          title: {
            text: "年度路政案件数量同期对比",
            left: "center"
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            left: "center",
            top: "bottom",
            data: [(this.value3-1)+"年",this.value3+"年"]
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "15%",
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              data: [
                "1月",
                "2月",
                "3月",
                "4月",
                "5月",
                "6月",
                "7月",
                "8月",
                "9月",
                "10月",
                "11月",
                "12月"
              ]
            }
          ],
          yAxis: [
            {
              type: "value"
            }
          ],
          series: [
            {
              name: "2018年",
              type: "bar",
              data: [5,6,10,21,8,5,8,9,13,25,11,18],
              //设置柱子的宽度
              barWidth: 30,
              //配置样式
              itemStyle: {
                //通常情况下：
                normal: {
                  color: function(params) {
                    var colorList = ["rgb(42,170,227)"];
                    return colorList[0];
                  }
                }
              }
            },
            {
              name: "2019年",
              type: "bar",
              data:  [8,1,20,19,11,25,18,9,23,15,6,8],
              //设置柱子的宽度
              barWidth: 30,
              //配置样式
              itemStyle: {
                //通常情况下：
                normal: {
                  color: function(params) {
                    var colorList = ["rgb(25,46,94)"];
                    return colorList[0];
                  }
                }
              }
            }
          ]
        });
      },
      drawLine1() {
        this.chartColumn1 = echarts.init(document.getElementById("chartColumn1"));

        this.chartColumn1.setOption({
          title: {
            text: "案发同比图",
            left: "center"
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            left: "center",
            top: "bottom",
            data: ["2018年","2019年"]
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "15%",
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              data: [
                "1月",
                "2月",
                "3月",
                "4月",
                "5月",
                "6月",
                "7月",
                "8月",
                "9月",
                "10月",
                "11月",
                "12月"
              ]
            }
          ],
          yAxis: [
            {
              type: "value"
            }
          ],
          series: [
            {
              name: "2018年",
              type: "bar",
              data: [8,1,20,19,11,25,18,9,23,15,6,8],
              //设置柱子的宽度
              barWidth: 30,
              //配置样式
              itemStyle: {
                //通常情况下：
                normal: {
                  color: function(params) {
                    var colorList = ["rgb(42,170,227)"];
                    return colorList[0];
                  }
                }
              }
            },
            {
              name: this.value3+"年",
              type: "bar",
              data:  [5,6,10,21,8,5,8,9,13,25,11,18],
              //设置柱子的宽度
              barWidth: 30,
              //配置样式
              itemStyle: {
                //通常情况下：
                normal: {
                  color: function(params) {
                    var colorList = ["rgb(25,46,94)"];
                    return colorList[0];
                  }
                }
              }
            }
          ]
        });
      },
    },
    mounted() {
      this.drawLine();
      this.drawLine1();
    },
    created() {

    }
  };
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
<style scoped lang="scss">
  .chart-box {
    width: 500px;
    height: 350px;
  }
</style>
