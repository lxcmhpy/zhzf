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
          <el-col :span="12">
            <div id="chart1" style="width: 400px; height: 400px;"></div>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="6">
                <div id="chart2" style="width: 400px; height: 200px;"></div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <div id="chart3" style="width: 400px; height: 200px;"></div>
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
      getAjdsrtzfx,
    } from '@/api/fxyp.js'
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
      fr:"",
      gr:"",
      isShow: false
    };
  },
  methods: {
    drawLine1() {
      this.chartColumn = echarts.init(document.getElementById("chart1"));

      this.chartColumn.setOption({
        title: {
          text: "个人案件被处罚人年龄段分布",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
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
            data: [
              { value: 335, name: "21-30岁" },
              { value: 310, name: "31-40岁" },
              { value: 234, name: "41-50岁" }
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
     drawLine2() {
      this.chartColumn = echarts.init(document.getElementById("chart2"));

      this.chartColumn.setOption({
        title: {
          text: "个人案件被处罚人年龄分布",
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
            data: [
              "21岁",
              "22岁",
              "23岁",
              "24岁",
              "25岁",
              "26岁",
              "27岁",
              "28岁",
              "29岁",
            ],
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
            data: [10, 52, 200, 334, 390, 330, 220, 390, 330,]
          }
        ]
      });
    },
    drawLine3() {
      this.chartColumn = echarts.init(document.getElementById("chart3"));

      this.chartColumn.setOption({
        title: {
          text: "案件当事人类型分布",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          left: "center",
          top: "bottom",
          data: ["法人", "个人"]
        },
        series: [,
          {
            name: "",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: this.fr, name: "法人" },
              { value: this.gr, name: "个人" },
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
     searchDraw3() {
      let data = {
        //  organ: this.logForm.organ,
        // type: this.logForm.type,
        // operation: this.logForm.operation,
        // username: this.logForm.username,
      };
      let _this = this
      // this.$store.dispatch("getAjdsrtzfx", data).then(res => {
      getAjdsrtzfx(data).then(res => {
        console.log(res);
         _this.fr = res[0];
         _this.gr = res[1];
         this.drawLine3();
      });
      err => {
        console.log(err);
      };
    },
  },
  mounted() {
    this.searchDraw3();
    this.drawLine1();
    this.drawLine2();
    //this.drawLine3();
  },
  created() {
    
  }
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
