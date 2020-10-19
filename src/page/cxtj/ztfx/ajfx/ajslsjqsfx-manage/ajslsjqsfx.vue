<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage toggleBox">
      <!-- <div class="handlePart">
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
      </div> -->
      <div class="tablePart">
        <el-tabs type="border-card">
          <el-tab-pane label="年视图">
            <div id="chartYear" style="width: 1000px; height: 400px;"></div>
          </el-tab-pane>
          <el-tab-pane label="月视图">
                <el-form :inline="true" :model="logForm" label-width="100px" ref="logForm">
                  <el-form-item label="年份" prop>
                    <el-date-picker
                      v-model="value1"
                      type="year"
                      value-format="yyyy" @change="select2"
                    ></el-date-picker>
                  </el-form-item>
                  
                </el-form>
            <div id="chartMonth" style="width: 1000px; height: 400px;"></div>
          </el-tab-pane>
          <el-tab-pane label="日视图">
                <el-form :inline="true" :model="logForm" label-width="100px" ref="logForm">
                  
                  <el-form-item label="年份月份" prop>
                    <el-date-picker
                      v-model="value2"
                      type="month"
                      value-format="yyyyMM" @change="select3"
                    ></el-date-picker>
                  </el-form-item>
                </el-form>
            <div id="chartDay" style="width: 1000px; height: 400px;"></div>
          </el-tab-pane>
          <el-tab-pane label="时视图">
                <el-form :inline="true" :model="logForm" label-width="100px" ref="logForm">
                  
                  <el-form-item label="日期" prop>
                    <el-date-picker
                      v-model="value3"
                      type="date"
                       value-format="yyyyMMdd" @change="select4"
                    ></el-date-picker>
                  </el-form-item>
                </el-form>
            <div id="chartHourse" style="width: 1000px; height: 400px;"></div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>


<script>
import echarts from "echarts";
import {
      sjglfx,sjglfxmonth,sjglfxday,sjglfxhour
    } from '@/api/fxyp.js'
export default {
  data() {
    return {
      value1: "2020",
      value2: "202005",
      value3: "20200508",
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
      data5:[],
    };
  },
  methods: {
    drawLine1() {
      this.chartColumn = echarts.init(document.getElementById("chartYear"));

      this.chartColumn.setOption({
        title: {
          text: "",
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
            data: this.data1,
            // data:[0,0,0,0,0,1569],
            type: "line"
          }
        ]
      });
    },
    drawLine2() {
      this.chartColumn = echarts.init(document.getElementById("chartMonth"));

      this.chartColumn.setOption({
         title: {
          text: "",
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
            data: this.data2,
            // data:[156,123,226,186,223,178,226,269,259,365,369,302],
            type: "line"
          }
        ]
      });
    },
    drawLine3() {
      this.chartColumn = echarts.init(document.getElementById("chartDay"));

      this.chartColumn.setOption({
         title: {
          text: "",
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
          data: this.data3
          //  data:['0801','0802','0803','0804','0805','0806','0807','0808','0809','0810',
          //  '0811','0812','0813','0814','0815','0816','0817','0818','0819','0820',
          //  '0821','0822','0823','0824','0825','0826','0827','0828','0829','0830','0831'],
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: this.data5,
          //   data:[2,3,1,4,1,7,8,3,2,1,
          //  1,2,3,5,5,5,6,3,2,1,
          //  1,2,3,4,6,7,8,1,1,2,3],
            type: "line"
          }
        ]
      });
    },
    drawLine4() {
      this.chartColumn = echarts.init(document.getElementById("chartHourse"));

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
      };
      let _this = this;
      sjglfx(data).then(res => {
        console.log(res);
         var map={};
         res.forEach(item =>{
              map[item[0]]=item[1];  
                
         });
        console.log(map);
        this.data1=[map[2015]==undefined?0:map[2015],
        map[2016]==undefined?0:map[2016],
        map[2017]==undefined?0:map[2017],
        map[2018]==undefined?0:map[2018],
        map[2019]==undefined?0:map[2019],
        map[2020]==undefined?0:map[2020]
        ]
           this.drawLine1();
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
      sjglfxmonth(data).then(res => {
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
      let data = {
        yearMonth:val
      };
      let _this = this;
      sjglfxday(data).then(res => {
        console.log(res);
         var arr1=[];
         var arr2=[];
         res.forEach(item =>{
               arr1.push(item[0]);
               arr2.push(item[1]);
         });
        
        this.data3=arr1;
        this.data5=arr2;
           this.drawLine3();
      });
      err => {
        console.log(err);
      };
    },
    search4(val) {
      let data = {
        day:val
      };
      sjglfxhour(data).then(res => {
        console.log(res);
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
         
        console.log(this.data4+"111"); 
        
        
        
           this.drawLine4();
      });
      err => {
        console.log(err);
      };
    },
    select2(val){ 
     if(val!=null){
     this.search2(val) 
     }
     
   },
    select3(val){
     if(val!=null){
       this.search3(val) 
     }
     
   },
   select4(val){
     this.data4=[];
     if(val!=null){
       this.search4(val) 
     }
     
   }
  },
  mounted() {
    // this.drawLine1();
    // this.drawLine2();
    // this.drawLine3();
    this.data4=[];
    this.search1();
    this.search2(2020);
    this.search3(202005);
    this.search4(20200508);
  },
  created() {
  }
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
