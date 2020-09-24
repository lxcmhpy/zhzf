<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage toggleBox">
      <div class="handlePart">
        <el-form :inline="true" :model="logForm" label-width="100px" ref="logForm">
          <el-form-item label="起始年月" prop>
            <el-date-picker
              v-model="date"
              type="monthrange"
              range-separator="至"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
              format="yyyy-MM"
              value-format="yyyy-MM"
              @change="searchDraw"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div class="tablePart">
        <div id="chart" style="width: 100%; height: 400px;"></div>
      </div>
    </div>
  </div>
</template>


<script>
  import echarts from "echarts";
  import {caseReasonApi} from '@/api/analysis/analysisManage.js'
  export default {
    data() {
      return {
        date:[],
        logForm: {
          organ: "",
          type: "",
          operation: "",
          username: "",
          startTime: "",
          endTime: "",
          dateArray: ""
        },
        seriesData:[]
      };
    },
    methods: {
      drawLine() {
        this.chartColumn = echarts.init(document.getElementById("chart"));
        this.chartColumn.setOption({
          title: {
            text: "案发原因分析",
            left: "center"
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            left: "center",
            top: "bottom",
            data: []
          },
          series: [
            {
              name: "案发原因",
              type: "pie",
              radius: "55%",
              center: ["50%", "60%"],
              data: [],
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
      searchDraw() {
        let param = {
           year:this.date[0],
           year2:this.date[1]
        };
        if(this.date.length ==0){
          param.year = '2019-09'
          param.year2 = '2020-09'
        }
        caseReasonApi(param).then(res => {
          if(res.code == 200){
            this.seriesData = res.data
          }
           this.drawLine()
        });
        err => {
          console.log(err);
        };
      },
    },
    mounted() {
      this.searchDraw();
    },
  };
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
