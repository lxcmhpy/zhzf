<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage toggleBox">
      <div class="handlePart">
        <el-form :inline="true" :model="logForm" label-width="100px" ref="logForm">
          <el-form-item label="统计日期" prop>
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期"
              style="width:150px">
            </el-date-picker>
          </el-form-item>
         
        </el-form>
      </div>
      <div class="tablePart">
         <div id="chartDay" style="width: 1000px; height: 400px;"></div>
     
      </div>
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
      value1: "",
      state: "",
      checked: true,
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
      data3:[],
      data4:[],
    };
  },
  methods: {
  
    drawLine3() {
      this.chartColumn = echarts.init(document.getElementById("chartDay"));

      this.chartColumn.setOption({
         title: {
          text: "投诉举报高发时段分析",
          left: "center"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: {
          type: "category",
          // data: this.data3
          data:[
            "0时","1时","2时","3时","4时","5时","6时","7时","8时","9时","10时","11时",
            "12时","13时","14时","15时","16时","17时","18时","19时","20时","21时","22时","23时",
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            // data: this.data4,
            data:[
            "12","1","22","14","15","11","10","5","7","25","13","11",
            "17","12","5","16","20","13","15","16","20","11","2","1",
          ],
            type: "line"
          }
        ]
      });
    },
    
    search3(val) {
      this.currentPage = val;
      let data = {
        // year:2018
      };
      let _this = this;
      this.$store.dispatch("sjglfxday", data).then(res => {
        console.log(res);
         var arr1=[];
         var arr2=[];
         res.forEach(item =>{
               arr1.push(item[0]);
               arr2.push(item[1]);
         });
        
        this.data3=arr1;
        this.data4=arr2;
           this.drawLine3();
      });
      err => {
        console.log(err);
      };
    },
  },
  mounted() { 
    // this.search3();  
    this.drawLine3();
  },
  created() {
   
  }
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
