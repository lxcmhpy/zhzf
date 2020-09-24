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
export default {
  data() {
    return {
      value1:'',
      logForm: {
        organ: "",
        type: "",
        operation: "",
        username: "",
        startTime: "",
        endTime: "",
        dateArray: ""
      }
    };
  },
  methods: {
    drawLine() {
      this.chartColumn = echarts.init(document.getElementById("chartColumn"));

      this.chartColumn.setOption({
        title: {
          text: "金额分布图",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          left: "center",
          top: "bottom",
          data: ["赔偿金额", "处罚金额", "许可补偿"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "赔偿金额" },
              { value: 310, name: "处罚金额" },
              { value: 234, name: "许可补偿" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    },
    drawLine1() {
      this.chartColumn1 = echarts.init(document.getElementById("chartColumn1"));

      this.chartColumn1.setOption(
        {
          title: {
            text: "2019年度各类收缴费用金额及所占比重(万元)",
            left: "center"
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            left: "center",
            top: "bottom",
            data: [
              "路损处罚",
              "超限处罚",
              "涉路许可",
              "超限许可",
              "路损赔偿",
            ]
          },
          series: [
            {
              name: "",
              type: "pie",
              radius: "55%",
              center: ["50%", "50%"],
              data: [
                { value: 96.83, name: "路损处罚" },
                { value: 17.91, name: "超限处罚" },
                { value: 820.38, name: "涉路许可" },
                { value: 0.0, name: "超限许可" },
                { value: 1888.3, name: "路损赔偿" },
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            }
          ]
        }
      );
    }
  },
  mounted() {
    this.drawLine();
    this.drawLine1();
  },
  created() {
    // this.getLogList();
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
