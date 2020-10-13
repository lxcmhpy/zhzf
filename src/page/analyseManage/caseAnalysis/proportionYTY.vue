<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage toggleBox">
      <div class="handlePart">
        <el-form
          :inline="true"
          :model="logForm"
          label-width="100px"
          ref="logForm"
        >
          <el-form-item label="统计年度" prop>
            <el-date-picker
              v-model="year"
              type="year"
              value-format="yyyy"
              placeholder="选择年"
              @change="changeFun"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>

      <div
        id="chartColumn"
        style="width: 100%; height: 400px; margin-bottom: 20px"
      ></div>

      <div class="tablePart">
        <el-table
          :data="tableData"
          stripe
          resizable
          border
          style="width: 100%; height: 100%"
        >
          <el-table-column
            prop="time"
            label="日期"
            align="center"
          ></el-table-column>

          <el-table-column
            :prop="item.name"
            :label="item.name"
            align="center"
            v-for="(item, i) in seriesData[trendYear]"
            :key="i"
          ></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>


<script>
import echarts from "echarts";
import { proportionYTYApi } from "@/api/analysis/analysisManage.js";
export default {
  data() {
    return {
      year: "2020",
      tableData: [],
      seriesData: [],
      trendYear: "",
      trendYearNew: "",
      trendYearDate: [],
      trendYearDateNew: [],
      XData: [],
      logForm: {},
    };
  },
  methods: {
    changeFun(val) {
      this.getData(val);
    },
    getData(date) {
      let that = this;
      let param = {
        year: date,
      };
      proportionYTYApi(param).then((res) => {
        if (res.code == 200) {
          that.seriesData = res.data;

          Object.keys(res.data).forEach(function (element, index) {
            if (index == 0) {
              that.trendYear = element;
              res.data[element].map((item) => {
                that.trendYearDate.push((item.value / 10000).toFixed(2));
              });
            } else if (index == 1) {
              that.trendYearNew = element;
              res.data[element].map((item) => {
                that.XData.push(item.name);
                that.trendYearDateNew.push((item.value / 10000).toFixed(2));
              });
            }
          });
          let beforeYear = {},
            year = {},
            cloums = [];
          Object.keys(res.data).map((key, index) => {
            res.data[key].map((item) => {
              if (index === 0) {
                beforeYear.time = key;
                beforeYear[item.name] = (item.value / 10000).toFixed(2);
              } else if (index === 1) {
                year.time = key;
                year[item.name] = (item.value / 10000).toFixed(2);
              }
            });
          });
          that.tableData.push(beforeYear, year);
          that.drawLine();
        }
      });
      (err) => {
        console.log(err);
      };
    },
    drawLine() {
      this.chartColumn = echarts.init(document.getElementById("chartColumn"));

      this.chartColumn.setOption({
        title: {
          text: this.year + "年度案件罚没款同期对比(万元)",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          left: "center",
          top: "bottom",
          data: [this.year - 1 + "年", this.year + "年"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "15%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: this.XData,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
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
                color: function (params) {
                  var colorList = ["rgb(42,170,227)"];
                  return colorList[0];
                },
              },
            },
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
                color: function (params) {
                  var colorList = ["rgb(25,46,94)"];
                  return colorList[0];
                },
              },
            },
          },
        ],
      });
    },
  },
  mounted() {
    this.getData("2020");
  },
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
