<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage toggleBox">
      <div class="handlePart">
        <el-form :inline="true" :model="logForm" label-width="100px" ref="logForm">
          <el-form :inline="true" :model="logForm" label-width="100px" ref="logForm">
            <el-form-item label="统计年份" prop>
              <el-date-picker
                v-model="value3"
                type="year"
                
              ></el-date-picker>
            </el-form-item>
          </el-form>
        </el-form>
      </div>

      <div id="chartColumn" style="width: 100%; height: 400px;"></div>
    </div>
  </div>
</template>


<script>
import echarts from "echarts";
import {
      ajslsjqsfx,
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
      isShow: false,
      data1:[],
      data2:[],
    };
  },
  methods: {
    drawLine() {
      this.chartColumn = echarts.init(document.getElementById("chartColumn"));

      this.chartColumn.setOption({
        title: {
          text: "",
          left: "left"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          // left: "center",
          // top: "bottom",
          data: [ "2019年每月案发数量"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
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
          // {
          //   name: "2018年每月案发数量",
          //   type: "line",
          //   stack: "总量",
          //   data: this.data1,
          //   itemStyle: {
          //     //通常情况下：
          //     normal: {
          //       color: "#00CCFF"
          //     }
          //   }
          // },
          {
            name: "2019年每月案发数量",
            type: "line",
            stack: "总量",
            data: this.data2,
            itemStyle: {
              //通常情况下：
              normal: {
                color: "#002933"
              }
            }
          }
        ]
      });
    },

  //  search(val) {
  //     this.currentPage = val;
  //     let data = {
  //       year:2018
  //     };
  //     let _this = this;
  //     this.$store.dispatch("ajslsjqsfx", data).then(res => {
        
  //        var map={};
  //        res.forEach(item =>{
  //        var tmp=item[0];
  //        if(tmp<10){
  //          tmp=tmp.substring(1,2);
  //        }
  //             map[tmp]=item[1];       
  //        });

        
  //       var map2=[];
  //       for(var i=1;i<=12;i++){
  //         if(map[i]!=undefined){
  //            map2.push(map[i] );
  //         }else{
  //            map2.push(0);
  //         }
  //       }
       
        
  //         this.data1=map2; 
         

          
  //         this.drawLine();
  //     });
  //     err => {
  //       console.log(err);
  //     };
  //   },
    search2(val) {
      this.currentPage = val;
      let data = {
        year:2019
      };
      let _this = this;
      // this.$store.dispatch("ajslsjqsfx", data).then(res => {
      ajslsjqsfx(data).then(res => {
        
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
          this.drawLine();
      });
      err => {
        console.log(err);
      };
    },
    
  },
  mounted() {
    // this.search();
    this.search2();
  },
  created() {
  
  }
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
