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
      ndajsltbtj
    } from '@/api/fxyp.js'
export default {
  data() {
    return {
      value3: "2019",
      value2: "",
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      tableData: [{
        time: "2018年1-12月",
        lscf: "1714804",
        cxcf: "23473275",
        slxk: "17502999",
        cxxk: "0",
        lspc: "35561880",
        zs: "78252958"
      },{
        time: "2019年1-12月",
        lscf: "968369",
        cxcf: "179100",
        slxk: "8203862",
        cxxk: "0",
        lspc: "18883066",
        zs: "28234397"
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
          text: this.value3+"年度案件数量同期对比",
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
          data: [(this.value3-1)+"年",this.value3+"年"]
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
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: (this.value3-1)+"年",
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
            name: this.value3+"年",
            type: "bar",
            data:  this.data2,
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

   //查询-----------------------------------------------------------------------------------------------------
    search(val) {
      let data = {
        year:val
      };
      ndajsltbtj(data).then(res => {   
      
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
          this.data1=map2; 
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
      ndajsltbtj(data).then(res => {   
    
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
     select(val){
       if(val!=null){
         this.search(val-1);
          this.search2(val);
       }
     
   }
  },
  mounted() {
    this.search(2018);
    this.search2(2019);
  },
  created() {
    
  }
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
