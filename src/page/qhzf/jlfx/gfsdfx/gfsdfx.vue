<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage toggleBox">
      <div class="handlePart">
        <el-form :inline="true" :model="logForm" label-width="100px" ref="logForm">
          <el-form-item label="立案机构" prop>
            <el-select size="small" v-model="state" placeholder="立案机构">
              <el-option label="全部" value></el-option>
             
            </el-select>
          </el-form-item>
          <el-form-item label="执法门类" prop>
            <el-select size="small" v-model="state" placeholder="执法门类">
              <el-option label="全部" value></el-option>
              
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="tablePart">
        <el-tabs type="border-card">
          <el-tab-pane label="年视图">
            <div id="chartYear" style="width: 1000px; height: 400px;"></div>
          </el-tab-pane>
          <el-tab-pane label="月视图">
            <div id="chartMonth" style="width: 1000px; height: 400px;"></div>
          </el-tab-pane>
          <el-tab-pane label="日视图">
            <div id="chartDay" style="width: 1000px; height: 400px;"></div>
          </el-tab-pane>
        </el-tabs>
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
    drawLine1() {
      this.chartColumn = echarts.init(document.getElementById("chartYear"));

      this.chartColumn.setOption({
        title: {
          text: "案件高发时段分析",
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
          data: ["2015年", "2016年", "2017年", "2018年", "2019年", "2020年"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            // data: this.data1,
            data:[150,123,165,169,122,190],
            type: "line"
          }
        ]
      });
    },
    drawLine2() {
      this.chartColumn = echarts.init(document.getElementById("chartMonth"));

      this.chartColumn.setOption({
         title: {
          text: "2020年案件高发时段分析",
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
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            // data: this.data2,
            data:[150,123,165,169,122,190,156,178,175,136,103,106],
            type: "line"
          }
        ]
      });
    },
    drawLine3() {
      this.chartColumn = echarts.init(document.getElementById("chartDay"));

      this.chartColumn.setOption({
         title: {
          text: "案件高发时段分析",
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
    search1(val) {
      this.currentPage = val;
      let data = {
        // year:2018
      };
      let _this = this;
      this.$store.dispatch("sjglfx", data).then(res => {
        console.log(res);
         var map={};
         res.forEach(item =>{
              map[item[0]]=item[1];  
                
         });
        console.log(map);
        this.data1=[map[2015]=undefined?0:map[2015],
        map[2016]=undefined?0:map[2016]
        ,map[2017]=undefined?0:map[2017],
        map[2018]=undefined?0:map[2018],
        map[2019]=undefined?0:map[2019],
        map[2020]=undefined?0:map[2020]
        ]
           this.drawLine1();
      });
      err => {
        console.log(err);
      };
    },
    search2(val) {
      this.currentPage = val;
      let data = {
        // year:2018
      };
      let _this = this;
      this.$store.dispatch("sjglfxmonth", data).then(res => {
        console.log(res);
          var map={};
         res.forEach(item =>{
         var tmp=item[0];
         if(tmp<10){
           tmp=tmp.substring(1,2);
         }
              map[tmp]=item[1];       
         });

        
        var map2=[];
        for(var i=1;i<=12;i++){
          if(map[i]!=undefined){
             map2.push(map[i] );
          }else{
             map2.push(0);
          }
        }
        
        this.data2=map2;
           this.drawLine2();
      });
      err => {
        console.log(err);
      };
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
    // this.search1();
    // this.search2();
    // this.search3();
    this.drawLine1();
    this.drawLine2();
    this.drawLine3();
  },
  created() {
    // this.getLogList();
  }
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
