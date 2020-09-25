<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage toggleBox">
      <div class="handlePart">
        <el-form :inline="true" :model="logForm" label-width="100px" ref="logForm">
          <el-form-item label="统计年度" prop>
            <el-date-picker v-model="year" type="year" placeholder="选择年" value-format="yyyy" @change="searchDraw"></el-date-picker>
          </el-form-item>

        </el-form>
      </div>
      <el-row :gutter="20" style="min-height: 50%">
        <el-card class="box-card">
          <div id="chartColumn" class="chart-box"></div>
        </el-card>
      </el-row>
    </div>
  </div>
</template>


<script>
  import echarts from "echarts";
  import {numberYTYApi} from '@/api/analysis/analysisManage.js'
  export default {
    data() {
      return {
        year: "2020",
        logForm: {},
        trendYear:'',
        trendYearNew:'',
        trendYearDate:[],
        trendYearDateNew:[],
        XData:[]
      };
    },
    methods: {
      searchDraw(date) {
        let that = this
        let param = {
          year:date
        };
        numberYTYApi(param).then(res => {
          if(res.code == 200){

            Object.keys(res.data).forEach(function (element, index) {
              if (index == 0) {
                that.trendYear = element
                res.data[element].map(item => {
                  that.trendYearDate.push(item.value)
                })
              } else if (index == 1) {
                that.trendYearNew = element
                res.data[element].map(item => {
                  that.XData.push(item.name)
                  that.trendYearDateNew.push(item.value)
                })
              }

            })

            that.drawLine()
          }
        });
        err => {
          console.log(err);
        };
      },
      drawLine() {
        this.chartColumn = echarts.init(document.getElementById("chartColumn"));

        this.chartColumn.setOption({
          title: {
            text: this.year+"年度案件数量同期对比",
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
            data: [(this.year-1)+"年",this.year+"年"]
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
              data: this.XData
            }
          ],
          yAxis: [
            {
              type: "value"
            }
          ],
          series: [
            {
              name: this.trendYear,
              type: "bar",
              data: this.trendYearDate,
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
              name: this.trendYearNew,
              type: "bar",
              data:  this.trendYearDateNew,
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
      }
    },
    mounted() {
      this.searchDraw('2020')
    }
  };
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
<style scoped lang="scss">
  .chart-box {
    width: 100%;
    height: 420px;
  }
</style>
