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

      <div id="chartColumn" style="width: 100%; height: 500px;margin-bottom:20px"></div>

      <div class="tablePart">
        <el-table :data="tableData" stripe resizable border style="width: 100%;height:100%;">
          <el-table-column prop="gllz" label="公路路政" align="center"></el-table-column>
          <el-table-column prop="dlyz" label="道路运政" align="center"></el-table-column>
          <el-table-column prop="slyz" label="水路运政" align="center"></el-table-column>
          <el-table-column prop="hdxz" label="航道行政" align="center"></el-table-column>
          <el-table-column prop="gkxz" label="港口行政" align="center"></el-table-column>
          <el-table-column prop="hsxz" label="海事行政" align="center"></el-table-column>
           <el-table-column prop="gczlaqjd" label="工程质量监督" align="center"></el-table-column>
            <!-- <el-table-column prop="qt" label="其他" align="center"></el-table-column>
             <el-table-column prop="zhzf" label="综合执法" align="center"></el-table-column> -->
        </el-table>
      </div>
    </div>
  </div>
</template>


<script>
import echarts from "echarts";
import {
      ndajlxfmkbztj,
    } from '@/api/fxyp.js'
export default {
  data() {
    return {
      value3: "2020",
      value2: [],
      value1: [],
     
      tableData: [{
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
      isShow: false
    };
  },
  methods: {
    drawLine() {
      this.chartColumn = echarts.init(document.getElementById("chartColumn"));

      this.chartColumn.setOption({
        title: {
          text: this.value3+"年度收缴费用金额及所占比重(万元)",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          left: "center",
          top: "bottom",
          data:this.value1
          //  [
          //  "公路路政",
          //   "道路运政",
          //   "水路运政",
          //   "航道行政",
          //   "港口行政",
          //   "海事行政",
          //   "工程质量监督",
          //   "其他",
          //   "综合执法",
          // ]
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: this.value2,
            // [
            //   { value: 20, name: "公路路政" },
            //   { value: 30, name: "道路运政" },
            //   { value: 40, name: "水路运政" },
            //   { value: 10, name: "航道行政" },
            //   { value: 30, name: "港口行政" },
            //   { value: 20, name: "海事行政" },
            //   { value: 10, name: "工程质量监督" },
            //   { value: 30, name: "其他" },
            //   { value: 20, name: "综合执法" },
            // ],
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
       //查询-----------------------------------------------------------------------------------------------------
 search(val) {    
      let data = {
       year:val
      };
      let _this = this;
    
      ndajlxfmkbztj(data).then(res => { 
          this.value1=[];
         this.value2=[];
         var map={};
       res.forEach(item =>{
          map[item[0]]=item[1];
          this.value1.push(item[0]);
          this.value2.push({value:item[1],name:item[0] })
         });
         console.log(map);
        this.tableData[0].gllz=map["公路路政"]==null?0:map["公路路政"];
        this.tableData[0].dlyz=map["道路运政"]==null?0:map["道路运政"];
        this.tableData[0].slyz=map["水路运政"]==null?0:map["水路运政"];
        this.tableData[0].hdxz=map["航道行政"]==null?0:map["航道行政"];
        this.tableData[0].gkxz=map["港口行政"]==null?0:map["港口行政"];
        this.tableData[0].hsxz=map["海事行政"]==null?0:map["海事行政"];
        this.tableData[0].gczlaqjd=map["工程质量监督"]==null?0:map["工程质量监督"];
        // this.tableData[0].qt=map["其他"]==null?0:map["其他"];
        // this.tableData[0].zhzf=map["综合执法"]==null?0:map["综合执法"];
       
                             
            this.drawLine();
       
      });
      err => {
        console.log(err);
      };
    },
   select(val){
     if(val!=null){
      this.search(val);
     }
     
   }
   
  },
  mounted() {
    this.search(2020);
  },
  created() {
   
  }
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
