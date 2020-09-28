<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage toggleBox">
      <div class="handlePart">
        <el-form :inline="true" :model="logForm" label-width="100px" ref="logForm">
          <el-form-item label="统计年度" prop>
            <el-date-picker  v-model="year" type="year" placeholder="选择年" value-format="yyyy" @change="searchDraw"></el-date-picker>
          </el-form-item>
        </el-form>
      </div>

      <div id="chartColumn" style="width: 100%; height: 500px;margin-bottom:20px"></div>
    </div>
  </div>
</template>


<script>
import echarts from "echarts";
import {amountProportionApi} from '@/api/analysis/analysisManage.js'
export default {
  data() {
    return {
      year: "2020",
      isShow: false,
      logForm: {
      },
      seriesData:[],
      XData:[]
    };
  },
  methods: {
    searchDraw(date) {
      let param = {
        year:date
      };
      amountProportionApi(param).then(res => {
        if(res.code == 200){
          this.seriesData = res.data
          res.data.map(item => {
            this.XData.push(item.name)
          })
          this.drawLine()
        }
      });
      err => {
        console.log(err);
      };
    },
    drawLine() {
      this.chartColumn = echarts.init(document.getElementById("chartColumn"));

      this.chartColumn.setOption({
        title: {
          text: this.year+"年度各类案件类型数量比重",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          left: "center",
          top: "bottom",
          data: this.XData
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: this.seriesData,
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
    this.searchDraw(this.year);
  },
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
