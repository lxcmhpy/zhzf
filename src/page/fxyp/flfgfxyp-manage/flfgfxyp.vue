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
               value-format="yyyyMM" @change="select"
               style="width:400px"
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
      flfgfxyp
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
      data1:[],
      data2:[]
    };
  },
  methods: {
    drawLine() {
      this.chartColumn = echarts.init(document.getElementById("chartColumn"));

      this.chartColumn.setOption({
        title: {
          text: "法律法规分析",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        // legend: {
        //   // left: 'right',
        //   // top: 'bottom',
        //   orient: "vertical",
        //   right: 150,
        //   top: 150,
        //   bottom: 10,
        //   data: this.data1,
        //   // ["法律法规A执行次数", "法律法规B执行次数", "法律法规C执行次数"]
        // },
        series: [
          {
            name: "",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.data2,
            // [
            //   { value: 335, name: "法律法规A执行次数" },
            //   { value: 310, name: "法律法规B执行次数" },
            //   { value: 234, name: "法律法规C执行次数" }
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
    search(start,end) {
      let data = {
       start:start,
       end:end
      };
    
      flfgfxyp(data).then(res => {
        console.log(res);
        if(res.length!=0){
          for(var i=0;i<10;i++){
            this.data1.push(res[i][1]);
            this.data2.push({ value: res[i][1], name: res[i][0] });
          }
        }
         this.drawLine();
      });
      err => {
        console.log(err);
      };
    },
    select(val){
      if(val!=null){
        this.data1=[];
        this.data2=[];
        this.search(val[0],val[1]);

      }
     
     }
  },
  mounted() {
    // this.drawLine();
    this.data1=[];
    this.data2=[];
    this.search(202001,202012);
  },
  created() {
  }
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
