<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage toggleBox">
      <div class="handlePart">
        <el-form :inline="true" :model="logForm" label-width="100px" ref="logForm">
          <el-form :inline="true" :model="logForm" label-width="100px" ref="logForm">
            <el-form-item label="统计日期" prop>
            <el-date-picker  style="width:60%" v-model="value3" type="date" placeholder="选择日期"  ></el-date-picker>
          </el-form-item>
           <el-form-item label="执法门类" prop>
            <el-select size="small" v-model="state" placeholder="执法门类">
              <el-option label="全部" value></el-option>
             
            </el-select>
          </el-form-item>
          </el-form>
        </el-form>
      </div>

      <div id="chartColumn" style="width: 100%; height: 400px;"></div>
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
      tableData: [],
      logForm: {
        organ: "",
        type: "",
        operation: "",
        username: "",
        startTime: "",
        endTime: "",
        dateArray: ""
      },
      logType: [
        {
          value: null,
          label: "全部"
        },
        {
          value: 0,
          label: "操作日志"
        },
        {
          value: 1,
          label: "登录日志"
        }
      ],
      isShow: false
    };
  },
  methods: {
    drawLine() {
      this.chartColumn = echarts.init(document.getElementById("chartColumn"));

      this.chartColumn.setOption({
        title: {
          text: ""
        },
        tooltip: {
          trigger: "axis"
        },
        // legend: {
        //   data: ["2018年每月案发数量", "2019年每月案发数量"]
        // },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "1时",
            "2时",
            "3时",
            "4时",
            "5时",
            "6时",
            "7时",
            "8时",
            "9时",
            "10时",
            "11时",
            "12时",
            "13时",
            "14时",
            "15时",
            "16时",
            "17时",
            "18时",
            "19时",
            "20时",
            "21时",
            "22时",
            "23时",
            "24时"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "案发数量",
            type: "line",
            stack: "总量",
            data: [
              120,
              132,
              101,
              134,
              90,
              230,
              210,
              132,
              101,
              134,
              90,
              230,
              120,
              132,
              101,
              134,
              90,
              230,
              210,
              132,
              101,
              134,
              90,
              230
            ]
          },
          // {
          //   name: "2019年每月案发数量",
          //   type: "line",
          //   stack: "总量",
          //   data: [
          //     220,
          //     182,
          //     191,
          //     234,
          //     290,
          //     330,
          //     310,
          //     191,
          //     234,
          //     290,
          //     330,
          //     310,
          //     120,
          //     132,
          //     101,
          //     134,
          //     90,
          //     230,
          //     210,
          //     132,
          //     101,
          //     134,
          //     90,
          //     230
          //   ]
          // }
        ]
      });
    }
  },
  mounted() {
    this.drawLine();
  },
  created() {
    this.getLogList();
  }
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
