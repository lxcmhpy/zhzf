<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage toggleBox">
      <div class="handlePart">
        <el-form :inline="true" :model="logForm" label-width="100px" ref="logForm">
          <el-form-item label="统计年度" prop>
            <el-date-picker v-model="year" type="year" value-format="yyyy" placeholder="选择年" @change="getData"></el-date-picker>
          </el-form-item>
        </el-form>
      </div>

      <div id="chartColumn" style="width: 100%; height: 400px;margin-bottom:20px"></div>

      <div class="tablePart">
        <el-table :data="tableData" stripe resizable border style="width: 100%;height:100%;">
          <el-table-column prop="time" label="日期" align="center"></el-table-column>
          <el-table-column prop="lscf" label="路损处罚" align="center"></el-table-column>
          <el-table-column prop="cxcf" label="超限处罚" align="center"></el-table-column>
          <el-table-column prop="slxk" label="涉路许可" align="center"></el-table-column>
          <el-table-column prop="cxxk" label="超限许可" align="center"></el-table-column>
          <el-table-column prop="lspc" label="路损赔偿" align="center"></el-table-column>
          <el-table-column prop="zs" label="总数" align="center"></el-table-column>
        </el-table>
      </div>

    </div>
  </div>
</template>


<script>
import echarts from "echarts";
import {proportionYTYApi} from '@/api/analysis/analysisManage.js'
export default {
  data() {
    return {
      year: "2020",
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
      trendYear:'',
      trendYearNew:'',
      trendYearDate:[],
      trendYearDateNew:[],
      XData:[],
      logForm: {
      }
    };
  },
  methods: {
    getData(date) {
      let that = this
      let param = {
        year:date
      };
      proportionYTYApi(param).then(res => {
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
          text: this.year+"年度案件罚没款同期对比",
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
            data: this.XData,
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
            data: this.trendYearDateNew,
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
    this.getData('2020');
  }
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
