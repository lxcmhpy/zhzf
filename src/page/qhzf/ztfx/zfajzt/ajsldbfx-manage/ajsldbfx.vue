<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage toggleBox">
      <div class="handlePart">
        <el-form :inline="true" :model="logForm" label-width="100px" ref="logForm">
          <!-- <el-form-item label="立案机构" prop>
            <el-select size="small" v-model="lajg" placeholder="立案机构">
              <el-option label="全部" value></el-option>
              
            </el-select>
          </el-form-item> -->
          <!-- <el-form-item label="执法门类" prop>
            <el-select size="small" v-model="zfml" placeholder="执法门类">
              <el-option label="公路路政" value></el-option>
              <el-option label="道路路政" value></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="起始年月" prop>
            <el-date-picker
              v-model="value"
              type="monthrange"
              range-separator="至"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
               value-format="yyyyMM" @change="select"
               style="width:400px"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div class="tablePart">
        <el-tabs type="border-card">
          <el-tab-pane label="赔补偿案件">
            <div id="chartYear" style="width: 1000px; height: 400px;"></div>
          </el-tab-pane>
          <el-tab-pane label="处罚案件">
            <div id="chartMonth" style="width: 1000px; height: 400px;"></div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>


<script>
import echarts from "echarts";
import {
      ajsldbfxpbc,ajsldbfxpbcfa,ajsldbfxcf,ajsldbfxcffa
    } from '@/api/fxyp.js'
export default {
  data() {
    return {
      value:"",
      lajg:[],
      zfml:[],
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
     t1:[],
     data1:[],
     data2:[],
     t2:[],
     data3:[],
     data4:[],

      isShow: false
    };
  },
  methods: {
    drawLine1() {
      this.chartColumn = echarts.init(document.getElementById("chartYear"));

      this.chartColumn.setOption({
        title: {
          text: "赔补偿案件直方图",
          left: "center"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          left: "center",
          top: "bottom",
          data: ["案发数", "结案数"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "15%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: this.t1
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "案发数",
            type: "bar",
            data: this.data1,
            //设置柱子的宽度
            barWidth: 30,
            //配置样式
            // itemStyle: {
            //   //通常情况下：
            //   normal: {
            //     color: function(params) {
            //       var colorList = ["rgb(42,170,227)"];
            //       return colorList[0];
            //     }
            //   }
            // }
          },
          {
            name: "结案数",
            type: "bar",
            data: this.data2,
            //设置柱子的宽度
            barWidth: 30,
            //配置样式
            // itemStyle: {
            //   //通常情况下：
            //   normal: {
            //     color: function(params) {
            //       var colorList = ["rgb(25,46,94)"];
            //       return colorList[0];
            //     }
            //   }
            // }
          }
        ]
      });
    },
    drawLine2() {
      this.chartColumn = echarts.init(document.getElementById("chartMonth"));

      this.chartColumn.setOption({
        title: {
          text: "处罚案件直方图",
          left: "center"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          left: "center",
          top: "bottom",
          data: ["案发数", "结案数"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "15%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: this.t2
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "案发数",
            type: "bar",
            data: this.data3,
            //设置柱子的宽度
            barWidth: 30,
            //配置样式
            // itemStyle: {
            //   //通常情况下：
            //   normal: {
            //     color: function(params) {
            //       var colorList = ["rgb(42,170,227)"];
            //       return colorList[0];
            //     }
            //   }
            // }
          },
          {
            name: "结案数",
            type: "bar",
            data: this.data4,
            barWidth: 30,
            //配置样式
            // itemStyle: {
            //   //通常情况下：
            //   normal: {
            //     color: function(params) {
            //       var colorList = ["rgb(25,46,94)"];
            //       return colorList[0];
            //     }
            //   }
            // }
          }
        ]
      });
    },
    //查询-----------------------------------------------------------------------------------------------------
     //赔补偿 案发
   searchfa(start,end) {    
      let data = {
       start:start,
       end:end
      };
      ajsldbfxpbcfa(data).then(res => {
         res.forEach(item =>{   
              this.t1.push(item[0]);
                    this.data1.push(item[1]); 
         });       
          this.drawLine1();
      });
      err => {
        console.log(err);
      };
    },
    //赔补偿  结案
   search(start,end) {    
      let data = {
       start:start,
       end:end
      };
      ajsldbfxpbc(data).then(res => {
         var map={};
         res.forEach(item =>{
              map[item[0]]=item[1]; 
         });
       for(var i=0;i<this.t1.length;i++){
          if(map[this.t1[i]]==undefined){
            this.data2.push(0);
          }else{
            this.data2.push(map[this.t1[i]]);
          }
       }
       console.log(this.data2);
          this.drawLine1();
      });
      err => {
        console.log(err);
      };
    },
    //处罚  案发
   search2fa(start,end) {    
      let data = {
       start:start,
       end:end
      };
      ajsldbfxcffa(data).then(res => {
         res.forEach(item =>{  
              this.t2.push(item[0]);
              this.data3.push(item[1]);    
         });     
          this.drawLine2();
      });
      err => {
        console.log(err);
      };
    },
     //处罚  结案
   search2(start,end) {    
      let data = {
       start:start,
       end:end
      };
      ajsldbfxcf(data).then(res => {
         var map={};
         res.forEach(item =>{
              map[item[0]]=item[1];   
         });
          for(var i=0;i<this.t2.length;i++){
          if(map[this.t2[i]]==undefined){
            this.data4.push(0);
          }else{
            this.data4.push(map[this.t2[i]]);
          }
       }         
          this.drawLine2();
      });
      err => {
        console.log(err);
      };
    },
    
     select(val){
      if(val!=null){
        this.t1=[];
        this.t2=[];
        this.data1=[];
        this.data2=[];
        this.data3=[];
        this.data4=[];
        this.searchfa(val[0],val[1]);
        this.search(val[0],val[1]);
         this.search2fa(val[0],val[1]);
        this.search2(val[0],val[1]);
       
      }
     
     }
  },
  
  mounted() {
    this.t1=[];
    this.t2=[];
    this.data1=[];
    this.data2=[];
    this.data3=[];
    this.data4=[];
    this.searchfa(202001,202012);
    this.search(202001,202012);
    this.search2fa(202001,202012);
    this.search2(202001,202012);
    
  },
  created() {
   
  }
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
