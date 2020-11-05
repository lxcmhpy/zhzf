<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage toggleBox">
      <div class="handlePart">
        <el-form :inline="true" :model="logForm" label-width="100px" ref="logForm">
          <el-form-item label="统计年度" prop>
            <el-date-picker  v-model="value3" type="year" placeholder="选择年" value-format="yyyy" @change="select"></el-date-picker>
          </el-form-item>
        </el-form>
      </div>

      <div id="chartColumn" style="width: 100%; height: 500px;margin-bottom:20px"></div>
    </div>
  </div>
</template>


<script>
import echarts from "echarts";

import {
      ndajsllxslbztj,
    } from '@/api/fxyp.js'
export default {
  data() {
    return {
      value3: "2020",
      value2: [],
      value1:[],
     
      ybaj:"",
      cxcz:"",
      cfaj:"",
      pbcaj:"",
      isShow: false,
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
          text: this.value3+"年度执法领域案件数量比重",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          left: "center",
          top: "bottom",
          data: this.value1
          // [
          //   "公路路政",
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
            data:this.value2,
            //  [
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
    
      ndajsllxslbztj(data).then(res => { 
         this.value1=[];
         this.value2=[];
       res.forEach(item =>{
          this.value1.push(item[0]);
          this.value2.push({value:item[1],name:item[0] })
         });
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
