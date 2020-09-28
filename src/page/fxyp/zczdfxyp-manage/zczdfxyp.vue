<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage toggleBox">
      <div class="handlePart">
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
      </div>
      <div id="chart1" style="width: 100%; height: 50%;"></div>
      <div style="margin-top:30px;margin-bottom:30px">
        <el-row>
          <el-col :span="6">
            <div id="chart2" style="width: 100%; height: 100%;"></div>
          </el-col>
          <el-col :span="6">
            <div id="chart3" style="width: 100%; height: 100%;"></div>
          </el-col>
          <el-col :span="6">
            <div id="chart4" style="width: 100%; height: 100%;"></div>
          </el-col>
          <el-col :span="6">
            <div id="chart5" style="width: 100%; height: 100%;"></div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>


<script>
import echarts from "echarts";
import {
      ryglfx,
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
      data1:[],
       data2:[],
    };
  },
  methods: {
    drawLine1() {
      this.chartColumn = echarts.init(document.getElementById("chart1"));

      this.chartColumn.setOption({
        title: {
          text: "执法人员数量",
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
            data: this.data1,
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
            data: this.data2
          }
        ]
      });
    },

    drawLine2() {
      this.chartColumn = echarts.init(document.getElementById("chart2"));

      this.chartColumn.setOption({
        title: {
          text: "年龄段组成",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: "75%",
            center: ["50%", "60%"],
            data: [
              { value: 310, name: "24岁以下" },
              { value: 335, name: "25-29岁" },             
              { value: 234, name: "30-34岁" },
              { value: 310, name: "35-39岁" },
              { value: 335, name: "40-44岁" },             
              { value: 234, name: "45-49岁" },
              { value: 234, name: "50-54岁" },
              { value: 234, name: "55岁以上" },
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

    drawLine3() {
      this.chartColumn = echarts.init(document.getElementById("chart3"));

      this.chartColumn.setOption({
        title: {
          text: "性别组成",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: ["50%", "80%"],
            center: ["50%", "60%"],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },

            data: [
              { value: 335, name: "男" },
              { value: 310, name: "女" }
            ]
          }
        ]
      });
    },

    drawLine4() {
      this.chartColumn = echarts.init(document.getElementById("chart4"));

      this.chartColumn.setOption({
        title: {
          text: "学历组成",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: "75%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "高中及以下" },
              { value: 335, name: "大学专科" },
              { value: 310, name: "大学本科" },
              { value: 234, name: "硕士研究生" },
              { value: 310, name: "博士及以上" },
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

    drawLine5() {
      this.chartColumn = echarts.init(document.getElementById("chart5"));

      this.chartColumn.setOption({
        title: {
          text: "职称组成",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: "75%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "局长" },
              { value: 310, name: "市长" },
              { value: 234, name: "行长" }
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
    search1(val) {
      this.currentPage = val;
      let data = {
        // year:2018
      };
      let _this = this;
      // this.$store.dispatch("ryglfx", data).then(res => {
      ryglfx(data).then(res => {
      
        console.log(res);
         this.data2=[res[0][0],res[1][0],res[2][0],res[3][0],res[4][0]];  
          this.data1=[res[0][1],res[1][1],res[2][1],res[3][1],res[4][1]]; 
           this.drawLine1();
      });
      err => {
        console.log(err);
      };
    },
  },
  mounted() {
    // this.drawLine1();
    this.search1();
    this.drawLine2();
    this.drawLine3();
    this.drawLine4();
    this.drawLine5();
  },
  created() {
    // this.getLogList();
  }
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
