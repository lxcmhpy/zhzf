<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage toggleBox">
      <div class="handlePart">
        <el-form :inline="true" :model="logForm" label-width="100px" ref="logForm">
          <el-form :inline="true" :model="logForm" label-width="100px" ref="logForm">
            <el-form-item label="统计周期" prop>
              <el-date-picker
                v-model="value3"
                type="monthrange"
                range-separator="至"
                start-placeholder="开始月份"
                end-placeholder="结束月份"
              ></el-date-picker>
            </el-form-item>
          </el-form>
        </el-form>
      </div>
      <el-row>
        <el-col :span="6">
          <el-table :data="tableData" stripe resizable border style="width: 100%;height:450px;">
            <el-table-column prop="lx" label="路线" align="center"></el-table-column>
            <el-table-column prop="ajsl" label="案件数量" align="center"></el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12">
          <div id="chartColumn" style="width: 800px; height: 400px;"></div>
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
      value3: "",
      value2: "",
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      tableData: [
        {
          lx:'S200',
          ajsl:3
        }
      ],
      logForm: {
        organ: "",
        type: "",
        operation: "",
        username: "",
        startTime: "",
        endTime: "",
        dateArray: ""
      },
      isShow: false
    };
  },
  methods: {
    drawLine() {
      this.chartColumn = echarts.init(document.getElementById("chartColumn"));

      this.chartColumn.setOption({
        title: {
          text: "巡查里程直方图",
          left: "center"
        },
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: ["江西交通厅", "江西省交通运输厅", "南昌路政管理局", "九江路政管理局", ],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "",
            type: "bar",
            barWidth: "60%",
            data: [100, 520, 200, 334, 390]
          }
        ]
      });
    }
  },
  mounted() {
    this.drawLine();
  },
  created() {
  }
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
