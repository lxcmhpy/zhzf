<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage toggleBox">
      <div class="handlePart">
        <el-form :inline="true" :model="logForm" label-width="100px" ref="logForm">
          <el-form :inline="true" :model="logForm" label-width="100px" ref="logForm">
            <el-form-item label="统计日期" prop>
            <el-date-picker  style="width:60%" v-model="value3" type="date" placeholder="选择日期" value-format="yyyyMMdd" @change="select"  ></el-date-picker>
          </el-form-item>
           <!-- <el-form-item label="执法门类" prop>
            <el-select size="small" v-model="state" placeholder="执法门类">
              <el-option label="全部" value></el-option>
             
            </el-select>
          </el-form-item> -->
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
      qsglfx,
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
      logType: [
        {
          value: null,
          label: "全部"
        },
        {
          value: 0,
          label: "操作日志"
        },
        {
          value: 1,
          label: "登录日志"
        }
      ],
      data4:[]
    };
  },
  methods: {
    drawLine() {
      this.chartColumn = echarts.init(document.getElementById("chartColumn"));

      this.chartColumn.setOption({
        title: {
          text: ""
        },
        tooltip: {
          trigger: "axis"
        },
        // legend: {
        //   data: ["2018年每月案发数量", "2019年每月案发数量"]
        // },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: 
          // this.data3
          [
            "1时",
            "2时",
            "3时",
            "4时",
            "5时",
            "6时",
            "7时",
            "8时",
            "9时",
            "10时",
            "11时",
            "12时",
            "13时",
            "14时",
            "15时",
            "16时",
            "17时",
            "18时",
            "19时",
            "20时",
            "21时",
            "22时",
            "23时",
            "24时"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "案发数量",
            type: "line",
            stack: "总量",
            data: this.data4
            // [
            //   120,
            //   132,
            //   101,
            //   134,
            //   90,
            //   230,
            //   210,
            //   132,
            //   101,
            //   134,
            //   90,
            //   230,
            //   120,
            //   132,
            //   101,
            //   134,
            //   90,
            //   230,
            //   210,
            //   132,
            //   101,
            //   134,
            //   90,
            //   230
            // ]
          },
          
        ]
      });
    },
    //查询-----------------------------------------------------------------------------------------------------
    search1(val) {
      let data = {
        day:val
      };
      qsglfx(data).then(res => {
         var map={};
         res.forEach(item =>{
           map[item[0]]=item[1];   
         });
        
         
           if(map['01时']==undefined){
              this.data4.push(0);
            }else{
              this.data4.push(map['01时']);
            }
            if(map['02时']==undefined){
              this.data4.push(0);
            }else{
              this.data4.push(map['02时']);
            }
            if(map['03时']==undefined){
              this.data4.push(0);
            }else{
              this.data4.push(map['03时']);
            }
            if(map['04时']==undefined){
              this.data4.push(0);
            }else{
              this.data4.push(map['04时']);
            }
            if(map['05时']==undefined){
              this.data4.push(0);
            }else{
              this.data4.push(map['05时']);
            }
            if(map['06时']==undefined){
              this.data4.push(0);
            }else{
              this.data4.push(map['06时']);
            }
            if(map['07时']==undefined){
              this.data4.push(0);
            }else{
              this.data4.push(map['07时']);
            }
            if(map['08时']==undefined){
              this.data4.push(0);
            }else{
              this.data4.push(map['08时']);
            }
            if(map['09时']==undefined){
              this.data4.push(0);
            }else{
              this.data4.push(map['09时']);
            }
            if(map['10时']==undefined){
              this.data4.push(0);
            }else{
              this.data4.push(map['10时']);
            }
            if(map['11时']==undefined){
              this.data4.push(0);
            }else{
              this.data4.push(map['11时']);
            }
            if(map['12时']==undefined){
              this.data4.push(0);
            }else{
              this.data4.push(map['12时']);
            }
            if(map['13时']==undefined){
              this.data4.push(0);
            }else{
              this.data4.push(map['13时']);
            }
            if(map['14时']==undefined){
              this.data4.push(0);
            }else{
              this.data4.push(map['14时']);
            }
            if(map['15时']==undefined){
              this.data4.push(0);
            }else{
              this.data4.push(map['15时']);
            }
            if(map['16时']==undefined){
              this.data4.push(0);
            }else{
              this.data4.push(map['16时']);
            }
            if(map['17时']==undefined){
              this.data4.push(0);
            }else{
              this.data4.push(map['17时']);
            }
            if(map['18时']==undefined){
              this.data4.push(0);
            }else{
              this.data4.push(map['18时']);
            }
            if(map['19时']==undefined){
              this.data4.push(0);
            }else{
              this.data4.push(map['19时']);
            }
            if(map['20时']==undefined){
              this.data4.push(0);
            }else{
              this.data4.push(map['20时']);
            }
            if(map['21时']==undefined){
              this.data4.push(0);
            }else{
              this.data4.push(map['21时']);
            }
            if(map['22时']==undefined){
              this.data4.push(0);
            }else{
              this.data4.push(map['22时']);
            }
            if(map['23时']==undefined){
              this.data4.push(0);
            }else{
              this.data4.push(map['23时']);
            }
            if(map['24时']==undefined){
              this.data4.push(0);
            }else{
              this.data4.push(map['24时']);
            }
           this.drawLine();
      });
      err => {
        console.log(err);
      };
    },
    select(val){ 
     if(val!=null){
       this.data4=[];
       this.search1(val); 
     }
     
   },
  },
  mounted() {
    // this.drawLine();
    this.search1(20200508);
  },
  created() {
    
  }
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
