<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage toggleBox">
      <div class="handlePart">
        <el-form :inline="true" :model="logForm" label-width="100px" ref="logForm">
          <el-form-item label="统计年度" prop>
            <el-date-picker v-model="value3" type="year" placeholder="选择年" value-format="yyyy" @change="select"></el-date-picker>
          </el-form-item>
        </el-form>
      </div>

      <div id="chartColumn" style="width: 100%; height: 400px;margin-bottom:20px"></div>

      <div class="tablePart">
        <el-table :data="tableData" stripe resizable border style="width: 100%;height:100%;">
          <el-table-column prop="time" label="日期" align="center"></el-table-column>
          <el-table-column prop="gllz" label="公路路政" align="center"></el-table-column>
          <el-table-column prop="dlyz" label="道路运政" align="center"></el-table-column>
          <el-table-column prop="slyz" label="水路运政" align="center"></el-table-column>
          <el-table-column prop="hdxz" label="航道行政" align="center"></el-table-column>
          <el-table-column prop="gkxz" label="港口行政" align="center"></el-table-column>
          <el-table-column prop="hsxz" label="海事行政" align="center"></el-table-column>
           <el-table-column prop="gczlaqjd" label="工程质量安全监督" align="center"></el-table-column>
        </el-table>
      </div>
      
    </div>
  </div>
</template>


<script>
import echarts from "echarts";
import {
      ndajfmktbtj,
    } from '@/api/fxyp.js'
export default {
  data() {
    return {
      value4: [],
      value3: "2019",
      value2: [],
      value1: [],
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      tableData: [{
        time: "",
        gllz: "",
        dlyz: "",
        slyz: "",
        hdxz: "",
        gkxz: "",
        hsxz: "",
        gczlaqjd:"",
        qt:"",
        zhzf:"",
      },{
        time: "",
        gllz: "",
        dlyz: "",
        slyz: "",
        hdxz: "",
        gkxz: "",
        hsxz: "",
        gczlaqjd:"",
        qt:"",
        zhzf:"",
      }],
       logForm: {
        organ: "",
        type: "",
        operation: "",
        username: "",
        startTime: "",
        endTime: "",
        dateArray: ""
      },
    
    };
  },
  methods: {
    drawLine() {
      this.chartColumn = echarts.init(document.getElementById("chartColumn"));

      this.chartColumn.setOption({
        title: {
          text: this.value3+"年案件罚没款同期对比",
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
          data: [this.value3-1+"年", this.value3+"年"]
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
            data: 
            this.value1,
            //  [
          //  "公路路政",
          //   "道路运政",
          //   "水路运政",
          //   "航道行政",
          //   "港口行政",
          //   "海事行政",
          //   "工程质量安全监督",
          //   "其他",
          //   "综合执法",
          // ]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: this.value3-1+"年",
            type: "bar",
            data: this.value2,
            // [1714804, 23473275, 17502999, 0, 35561880, 78252958],
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
          },
          {
            name: this.value3+"年",
            type: "bar",
            data:this.value4, 
            // [968369, 179100, 8203862, 0, 18883066, 28234397],
            //设置柱子的宽度
            barWidth: 30,
            //配置样式
            // itemStyle: {
            //   //通常情况下：
            //   normal: {
            //     color: function(params) {
            //      var colorList = ["rgb(42,170,227)"];
            //       return colorList[0];
            //     }
            //   }
            // }
          }
        ]
      });
    },
    //   drawLine() {
    //   this.chartColumn = echarts.init(document.getElementById("chartColumn"));

    //   this.chartColumn.setOption({
    //     title: {
    //       text: this.value3+"年案件罚没款同期对比",
    //       left: "center"
    //     },
    //     tooltip: {
    //       trigger: "axis",
    //       axisPointer: {
    //         // 坐标轴指示器，坐标轴触发有效
    //         type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
    //       }
    //     },
    //     legend: {
    //       left: "center",
    //       top: "bottom",
    //       data: ["2018年", "2019年"]
    //     },
    //     grid: {
    //       left: "3%",
    //       right: "4%",
    //       bottom: "15%",
    //       containLabel: true
    //     },
    //     xAxis: [
    //       {
    //         type: "category",
    //         data: 
    //         // this.value1,
    //          [
    //        "公路路政",
    //         "道路运政",
    //         "水路运政",
    //         "航道行政",
    //         "港口行政",
    //         "海事行政",
    //         // "工程质量安全监督",
    //       //   "其他",
    //       //   "综合执法",
    //       ],
    //       }
    //     ],
    //     yAxis: [
    //       {
    //         type: "value"
    //       }
    //     ],
    //     series: [
    //       {
    //         name: "2018年",
    //         type: "bar",
    //         data: 
    //         // this.value2,
    //         [1714804, 23473275, 17502999, 0, 35561880, 78252958],
    //         //设置柱子的宽度
    //         barWidth: 30,
    //         //配置样式
    //         // itemStyle: {
    //         //   //通常情况下：
    //         //   normal: {
    //         //     color: function(params) {
    //         //       var colorList = ["rgb(25,46,94)"];
    //         //       return colorList[0];
    //         //     }
    //         //   }
    //         // }
    //       },
    //       {
    //         name: "2019年",
    //         type: "bar",
    //         data:
    //         // this.value4, 
    //         [968369, 179100, 8203862, 0, 18883066, 28234397],
    //         //设置柱子的宽度
    //         barWidth: 30,
    //         //配置样式
    //         // itemStyle: {
    //         //   //通常情况下：
    //         //   normal: {
    //         //     color: function(params) {
    //         //      var colorList = ["rgb(42,170,227)"];
    //         //       return colorList[0];
    //         //     }
    //         //   }
    //         // }
    //       }
    //     ]
    //   });
    // },
    //查询-----------------------------------------------------------------------------------------------------   
  search(val) {    
      let data = {
       year:val
      };
      let _this = this;
    
      ndajfmktbtj(data).then(res => { 
         this.value1=[];
         this.value2=[];
         var map={};
         console.log(res);
       res.forEach(item =>{
          map[item[0]]=item[1];
          // this.value1.push(item[0]);
          this.value2.push(item[1])
         });
        
         this.tableData[0].time=val+"年";
         this.tableData[0].gllz=map["公路路政"]==undefined?0:map["公路路政"];
        this.tableData[0].dlyz=map["道路运政"]==undefined?0:map["道路运政"];
        this.tableData[0].slyz=map["水路运政"]==undefined?0:map["水路运政"];
        this.tableData[0].hdxz=map["航道行政"]==undefined?0:map["航道行政"];
        this.tableData[0].gkxz=map["港口行政"]==undefined?0:map["港口行政"];
        this.tableData[0].hsxz=map["海事行政"]==undefined?0:map["海事行政"];
        this.tableData[0].gczlaqjd=map["工程质量安全监督"]==undefined?0:map["工程质量安全监督"];
         
           
                             
            this.drawLine();
       
      });
      err => {
        console.log(err);
      };
    },
     search2(val) {    
      let data = {
       year:val
      };
      let _this = this;
    
      ndajfmktbtj(data).then(res => { 
        //  this.value1=[];
        //  this.value2=[];
         var map={};
         
       res.forEach(item =>{
          map[item[0]]=item[1];
          this.value1.push(item[0]);
          this.value4.push(item[1])
         });
          console.log(this.value1);
         this.tableData[1].time=val+"年";
         this.tableData[1].gllz=map["公路路政"]==undefined?0:map["公路路政"];
        this.tableData[1].dlyz=map["道路运政"]==undefined?0:map["道路运政"];
        this.tableData[1].slyz=map["水路运政"]==undefined?0:map["水路运政"];
        this.tableData[1].hdxz=map["航道行政"]==undefined?0:map["航道行政"];
        this.tableData[1].gkxz=map["港口行政"]==undefined?0:map["港口行政"];
        this.tableData[1].hsxz=map["海事行政"]==undefined?0:map["海事行政"];
        this.tableData[1].gczlaqjd=map["工程质量安全监督"]==undefined?0:map["工程质量安全监督"];
       
                             
            this.drawLine();
       
      });
      err => {
        console.log(err);
      };
    },
   select(val){
     if(val!=null){
      this.search(val-1);
       this.search2(val);
     }
     
   }
   
    
  },
  mounted() {
    // this.drawLine();
    this.search(2018);
       this.search2(2019);
  },
  created() {
   
  }
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
