<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox searchAndpageBox2">
      <div class="handlePart">
        <el-form :inline="true" :model="logForm" label-width="70px" ref="logForm">
          <el-form-item label="执法机构" prop>
            <el-select size="small" v-model="state" placeholder="立案机构">
              <el-option label="全部" value></el-option>

            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <el-row :gutter="20" style="min-height: 50%">
        <el-col :span="12" style="height: 100%">
          <el-card class="box-card">
            <div id="chart2" class="chart-box"></div>
          </el-card>
        </el-col>
        <el-col :span="12" style="height: 100%">
          <el-card class="box-card">
            <div id="chart3" class="chart-box"></div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top:20px;min-height: 50%">
        <el-col :span="12" style="height: 100%">
          <el-card class="box-card">

            <div id="chart4" class="chart-box"></div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card" style="height: 100%">

            <div id="chart5" class="chart-box"></div>
          </el-card>
        </el-col>
      </el-row>
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
      state:'',
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
    }
  },
  mounted() {
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
<style scoped>
  .box-card{
    min-height: 50%;
  }
  .chart-box {
    width: 500px;
    height: 350px;
  }
</style>
