<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage toggleBox">
      <div class="handlePart">
        <el-form :inline="true" :model="logForm" label-width="100px" ref="logForm">
          <el-form-item label="起始年月" prop>
            <el-date-picker
              v-model="value1"
              type="monthrange"
              range-separator="至"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div class="tablePart">
        <div id="chartColumn" style="width: 100%; height: 400px;"></div>
      </div>
    </div>
  </div>
</template>


<script>
  import echarts from "echarts";
  import {
    getFayyfx,
  } from '@/api/fxyp.js'
  export default {
    data() {
      return {
        value1:"",
        logForm: {
          organ: "",
          type: "",
          operation: "",
          username: "",
          startTime: "",
          endTime: "",
          dateArray: ""
        },
        t1:"",
        t2:"",
        t3:"",
        t4:"",
        t5:"",
        t6:"",
        t7:"",
        t8:"",
        t9:"",
        t10:"",
        n1:"",
        n2:"",
        n3:"",
        n4:"",
        n5:"",
        n6:"",
        n7:"",
        n8:"",
        n9:"",
        n10:"",
      };
    },
    methods: {
      drawLine() {
        this.chartColumn = echarts.init(document.getElementById("chartColumn"));

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
            data: [
              this.n1,
              this.n2,
              this.n3,
              this.n4,
              this.n5,
              this.n6,
              this.n7,
              this.n8,
              this.n9,
              this.n10
            ]
          },
          series: [
            {
              name: "案发原因",
              type: "pie",
              radius: "55%",
              center: ["50%", "60%"],
              data: [
                { value: this.t1, name: this.n1 },
                { value: this.t2, name: this.n2 },
                { value: this.t3, name: this.n3 },
                { value: this.t4, name: this.n4 },
                { value: this.t5, name: this.n5 },
                { value: this.t6, name: this.n6 },
                { value: this.t7, name: this.n7 },
                { value: this.t8, name: this.n8 },
                { value: this.t9, name: this.n9 },
                { value: this.t10, name:this.n10 }
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
      searchDraw() {
        let data = {

        };
        let _this = this
        // this.$store.dispatch("getFayyfx", data).then(res => {
        getFayyfx(data).then(res => {

          console.log(res[0][1]);
          _this.t1 = res[0][1];
          _this.t2 = res[1][1];
          _this.t3 = res[2][1];
          _this.t4 = res[3][1];
          _this.t5 = res[4][1];
          _this.t6 = res[5][1];
          _this.t7 = res[6][1];
          _this.t8 = res[7][1];
          _this.t9 = res[8][1];
          _this.t10= res[9][1];

          _this.n1 = res[0][0];
          _this.n2 = res[1][0];
          _this.n3 = res[2][0];
          _this.n4 = res[3][0];
          _this.n5 = res[4][0];
          _this.n6 = res[5][0];
          _this.n7 = res[6][0];
          _this.n8 = res[7][0];
          _this.n9 = res[8][0];
          _this.n10= res[9][0];
          this.drawLine();
        });
        err => {
          console.log(err);
        };
      },
    },
    mounted() {
      this.searchDraw();
      // this.drawLine();
    },
    created() {
      // this.getLogList();
    }
  };
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
