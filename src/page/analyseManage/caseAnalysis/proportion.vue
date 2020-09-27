<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage toggleBox">
      <div class="handlePart">
        <el-form :inline="true" :model="logForm" label-width="100px" ref="logForm">
          <el-form-item label="统计年度" prop>
            <el-date-picker v-model="year" type="year" placeholder="选择年" @change="changeFun"></el-date-picker>
          </el-form-item>
        </el-form>
      </div>

      <div id="chartColumn" style="width: 100%; height: 500px;margin-bottom:20px"></div>

      <div class="tablePart">
        <el-table :data="tableData" stripe resizable border style="width: 100%;height:100%;">
          <el-table-column :prop = item.name :label= item.name align="center" v-for="(item,i) in seriesData" :key="i"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>


<script>
  import echarts from "echarts";
  import {proportionApi} from '@/api/analysis/analysisManage.js'
  export default {
    data() {
      return {
        seriesData:[],
        year: "2019",
        tableData: [],
        logForm: {
        },
        XData:[],
      };
    },
    methods: {
      changeFun(val){
        this.getData(val)
      },
      getData(date) {
        let that = this
        let param = {
          year:date
        };
        proportionApi(param).then(res => {
          if(res.code == 200){
            that.seriesData = res.data
            res.data.map(item => {
              that.XData.push(item.name)
            })
            let json = {};
            that.tableData = []
            that.seriesData.forEach(v=>{
              json[v.name] = v.value
            })
            that.tableData.push(json)
            that.drawLine()
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
            text: this.year+"年度各类收缴费用金额及所占比重(万元)",
            left: "center"
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            left: "center",
            top: "bottom",
            data: [(this.year-1)+"年",this.year+"年"]
          },
          series: [
            {
              name: "",
              type: "pie",
              radius: "55%",
              center: ["50%", "60%"],
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
      },
    },
    mounted() {
      this.getData('2019');
    }
  };
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
