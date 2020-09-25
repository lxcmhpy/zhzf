<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage toggleBox">
      <div class="handlePart">
        <el-form :inline="true" :model="logForm" label-width="100px" ref="logForm">
          <el-form-item label="统计年度" prop>
            <el-date-picker v-model="year" type="year" placeholder="选择年" @change="getData"></el-date-picker>
          </el-form-item>
        </el-form>
      </div>

      <div id="chartColumn" style="width: 100%; height: 500px;margin-bottom:20px"></div>

      <div class="tablePart">
        <el-table :data="tableData" stripe resizable border style="width: 100%;height:100%;">
          <el-table-column prop="time" label="案件类型" align="center" v-for="(item,i) in seriesData" :key="i"></el-table-column>
          <el-table-column prop="lscf" label="路损处罚" align="center"></el-table-column>
          <el-table-column prop="cxcf" label="超限处罚" align="center"></el-table-column>
          <el-table-column prop="slxk" label="涉路许可" align="center"></el-table-column>
          <el-table-column prop="cxxk" label="超限许可" align="center"></el-table-column>
          <el-table-column prop="lspc" label="路损赔偿" align="center"></el-table-column>
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
        year: "",
        tableData: [{
          time: "2019年1-12月",
          lscf: "96.83",
          cxcf: "17.91",
          slxk: "820.38",
          cxxk: "0.0",
          lspc: "1888.3",
        },{
          time: "所占比重(%)",
          lscf: "3.4%",
          cxcf: "0.6%",
          slxk: "29.1%",
          cxxk: "0.0%",
          lspc: "66.9%",
        }],
        logForm: {
        },
        XData:[],
      };
    },
    methods: {
      getData(date) {
        let param = {
          year:date
        };
        proportionApi(param).then(res => {
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
            text: "2019年度各类收缴费用金额及所占比重(万元)",
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
      },
    },
    mounted() {
      this.getData('2020');
    }
  };
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
