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

      <!-- <div class="tablePart">
        <el-table :data="tableData" stripe resizable border style="width: 100%;height:100%;">
          <el-table-column prop="time" label="日期" align="center"></el-table-column>
          <el-table-column prop="lscf" label="路损处罚" align="center"></el-table-column>
          <el-table-column prop="cxcf" label="超限处罚" align="center"></el-table-column>
          <el-table-column prop="slxk" label="涉路许可" align="center"></el-table-column>
          <el-table-column prop="cxxk" label="超限许可" align="center"></el-table-column>
          <el-table-column prop="lspc" label="路损赔偿" align="center"></el-table-column>
          <el-table-column prop="zs" label="总数" align="center"></el-table-column>
        </el-table>
      </div> -->
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
      value2: "",
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
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
          text: this.value3+"年度各类案件类型数量比重",
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
            "一般案件",
            "超限超载",
            "处罚案件",
            "赔补偿案件",
           
          ]
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: [
              { value: this.ybaj, name: "一般案件" },
              { value: this.cxcz, name: "超限超载" },
              { value: this.cfaj, name: "处罚案件" },
              { value: this.pbcaj, name: "赔补偿案件" },
              
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

    
    search(val) {    
      let data = {
       year:val
      };
      let _this = this;
      // this.$store.dispatch("ndajsllxslbztj", data).then(res => {
      ndajsllxslbztj(data).then(res => { 
         var map={};
       res.forEach(item =>{
          map[item[0]]=item[1]
          
         });
         console.log(map);
            this.ybaj=map["一般案件"];      
            this.cfaj=map["处罚案件"];         
            this.pbcaj=map["赔补偿案件"];
            this.cxcz=map["超限超载"];
                             
            this.drawLine();
       
      });
      err => {
        console.log(err);
      };
    },
   select(val){
     this.search(val);
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
