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
          <el-form
            :inline="true"
            :model="logForm"
            label-width="100px"
            ref="logForm"
          >
            <el-form-item label="统计周期" prop>
              <el-date-picker
                v-model="logForm.date"
                size="small"
                type="monthrange"
                range-separator="至"
                start-placeholder="开始月份"
                end-placeholder="结束月份"
                format="yyyy-MM"
                value-format="yyyy-MM"
                @change="handleSelect"
              ></el-date-picker>
            </el-form-item>
          </el-form>
        </el-form>
      </div>
      <div style="margin-top: 30px">
        <el-row>
          <el-col :span="12">
            <div id="chart1" style="width: 400px; height: 400px"></div>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="6">
                <div id="chart2" style="width: 400px; height: 200px"></div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <div
                  id="chart3"
                  style="width: 400px; height: 200px; margin-top: 30px"
                ></div>
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
import { casepPeople } from "@/api/analysis/analysisManage.js";
export default {
  data() {
    return {
      logForm: {
        date: [
          String(new Date().getFullYear() - 1) +
            "-" +
            (new Date().getMonth() + 1 > 9
              ? String(new Date().getMonth() + 1)
              : "0" + String(new Date().getMonth() + 1)),
          String(new Date().getFullYear()) +
            "-" +
            (new Date().getMonth() + 1 > 9
              ? String(new Date().getMonth() + 1)
              : "0" + String(new Date().getMonth() + 1)),
        ],
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    /**
     * 初始化页面
     */
    init() {
      let year1 = this.logForm.date[0];
      let year2 = this.logForm.date[1];
      this.getData({ year1, year2 });
    },

    /**
     * 获取数据
     */
    getData({ year1, year2 }) {
      casepPeople({ year1, year2 }).then(
        (res) => {
          if (res.code == 200) {
            let data = res.data;
            this.drawLine1(data.ageGroup);
            this.drawLine2(data.age);
            this.drawLine3(data.type);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },

    /**
     * 选中时间
     */
    handleSelect(val) {
      let year1 = val[0],
        year2 = val[1];
      this.getData({ year1, year2 });
    },

    drawLine1(series) {
      this.chartColumn = echarts.init(document.getElementById("chart1"));

      this.chartColumn.setOption({
        title: {
          text: "个人案件被处罚人年龄段分布",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        // legend: {
        //   left: "center",
        //   top: "bottom",
        //   data: ["赔偿金额", "处罚金额", "许可补偿"]
        // },
        series: [
          {
            name: "",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: series,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    },
    drawLine2(data) {
      this.chartColumn = echarts.init(document.getElementById("chart2"));

      let _xAxis = [],
        _series = [];
      data.map((item) => {
        _xAxis.push(item.name);
        _series.push(item.value);
      });
      this.chartColumn.setOption({
        title: {
          text: "个人案件被处罚人年龄分布",
          left: "center",
        },
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: _xAxis,
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "",
            type: "bar",
            barWidth: "60%",
            data: _series,
          },
        ],
      });
    },
    drawLine3(data) {
      this.chartColumn = echarts.init(document.getElementById("chart3"));

      data.map((item) => {
        if (item.name === "1") {
          item.name = "个人";
        } else {
          item.name = "企业";
        }
      });
      this.chartColumn.setOption({
        title: {
          text: "案件当事人类型分布",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          left: "center",
          top: "bottom",
          data: ["个人", "企业"],
        },
        series: [
          ,
          {
            name: "",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    },
  },
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
