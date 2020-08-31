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
      <div style="margin-top:30px">
        <el-row>
          <el-col :span="8">
            <div style="width: 300px; height: 400px;">
              <el-table :data="tableData" stripe resizable border style="width: 100%;height:100%;">
                <el-table-column prop="xklx" label="许可类型" align="center"></el-table-column>
                <el-table-column prop="sl" label="数量" align="center"></el-table-column>
              </el-table>
            </div>
          </el-col>
          <el-col :span="16">
            <div id="chart2" style="width: 700px; height: 400px;"></div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>


<script>
import echarts from "echarts";
import {
      getFxypApi,
    } from '@/api/fxyp.js'
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
          xklx:'非公路标志许可',
          sl:'5'
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
    drawLine2() {
      this.chartColumn = echarts.init(document.getElementById("chart2"));

      this.chartColumn.setOption({
        title: {
          text: "在公路建筑控制区埋设管道、电缆的许可",
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
          data: ["申请数", "结案数"]
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
              "自治区路政局",
              "乌鲁木齐路政局",
              "伊犁路政局",
              "喀什路政局",
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
            name: "申请数",
            type: "bar",
            data: [1, 2, 3, 4],
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
            name: "结案数",
            type: "bar",
            data: [6, 5, 5, 4, 3, 2],
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
    fxypList(val) {
      this.currentPage = val
      let data = {
        //  organ: this.logForm.organ,
        // type: this.logForm.type,
        // operation: this.logForm.operation,
        // username: this.logForm.username,
      };
      let _this = this
      // this.$store.dispatch("getFxyp", data).then(res => {
      getFxyp(data).then(res => {
      
        console.log(res);
        // _this.tableData = res.data.records;
        //  _this.totalPage = res.data.total;
      });
      err => {
        console.log(err);
      };
    },
  },
  mounted() {
    this.drawLine2();
  },
  created() {
   this.fxypList();
  }
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
