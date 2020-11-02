<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox searchAndpageBox2">
      <div class="handlePart">
        <el-form :inline="true" :model="logForm" label-width="70px" ref="logForm">
          <el-form-item label="统计周期" prop>
            <el-date-picker
              v-model="value3"
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
      <el-row :gutter="20" style="min-height: 50%">
        <el-col :span="12" style="height: 100%">
          <el-card class="box-card">
            <div id="chart2" class="chart-box"></div>
          </el-card>
        </el-col>
        <el-col :span="12" style="height: 100%">
          <el-card class="box-card">
            <div id="chart3" class="chart-box"></div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top:20px;min-height: 50%">
        <el-col :span="12" style="height: 100%">
          <el-card class="box-card">

            <div id="chart4" class="chart-box"></div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card" style="height: 100%">

            <div id="chart5" class="chart-box"></div>
          </el-card>
        </el-col>
      </el-row>
      </div>
    </div>
  
</template>


<script>
import echarts from "echarts";
import {
      ryglfx,ryglfxXb,ryglfxXl,ryglfxZc
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
      data1:[],
      data2:[],
      data3:[],
      data4:[],
    };
  },
  methods: {

    drawLine1() {
      this.chartColumn = echarts.init(document.getElementById("chart2"));

      this.chartColumn.setOption({
        title: {
          text: "年龄段组成",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: "75%",
            center: ["50%", "60%"],
            data: this.data1,
            // [
            //   { value: 310, name: "24岁以下" },
            //   { value: 335, name: "25-29岁" },             
            //   { value: 234, name: "30-34岁" },
            //   { value: 310, name: "35-39岁" },
            //   { value: 335, name: "40-44岁" },             
            //   { value: 234, name: "45-49岁" },
            //   { value: 234, name: "50-54岁" },
            //   { value: 234, name: "55岁以上" },
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

    drawLine2() {
      this.chartColumn = echarts.init(document.getElementById("chart3"));

      this.chartColumn.setOption({
        title: {
          text: "性别组成",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: ["50%", "80%"],
            center: ["50%", "60%"],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },

            data: this.data2,
            // [
            //   { value: 335, name: "男" },
            //   { value: 310, name: "女" }
            // ]
          }
        ]
      });
    },

    drawLine3() {
      this.chartColumn = echarts.init(document.getElementById("chart4"));

      this.chartColumn.setOption({
        title: {
          text: "学历组成",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: "75%",
            center: ["50%", "60%"],
            data: this.data3,
            // [
            //   { value: 335, name: "高中及以下" },
            //   { value: 335, name: "大学专科" },
            //   { value: 310, name: "大学本科" },
            //   { value: 234, name: "硕士研究生" },
            //   { value: 310, name: "博士及以上" },
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

    drawLine4() {
      this.chartColumn = echarts.init(document.getElementById("chart5"));

      this.chartColumn.setOption({
        title: {
          text: "职称组成",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: "75%",
            center: ["50%", "60%"],
            data: this.data4,
            // [
            //   { value: 335, name: "科员" },
            //   { value: 150, name: "副科" },
            //   { value: 134, name: "正科" },
            //   { value: 50, name: "副处" },
            //   { value: 30, name: "正处" }
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
    search1(start,end) {
      let data = {
        start:start,
        end:end
      };
        var val1=0;
        var val2=0;
        var val3=0;
        var val4=0;
      ryglfx(data).then(res => {
       res.forEach(item =>{
         if(item[1]>0&&item[1]<24){          
           val1=val1+item[0];          
         }
         if(item[1]>25&&item[1]<39){           
           val2=val2+item[0];            
         }
          if(item[1]>40&&item[1]<49){        
           val3=val3+item[0];  
         }
         if(item[1]>50){          
           val4=val4+item[0];   
         }
         
         });
         this.data1.push({ value: val1, name: "24岁以下" },);
         this.data1.push({ value: val2, name: "25-39岁" },);
         this.data1.push({ value: val3, name: "40-49岁" },);
         this.data1.push({ value: val4, name: "50岁以上" },);
           this.drawLine1();
      });
      err => {
        console.log(err);
      };
    },
    search2(start,end) {
      let data = {
        start:start,
        end:end
      };
        
      ryglfxXb(data).then(res => {
         this.data2.push({ value: res[0][0], name: "男" },);
        this.data2.push({ value: res[1][0], name: "女" },);
           this.drawLine2();
      });
      err => {
        console.log(err);
      };
    },
    search3(start,end) {
      let data = {
        start:start,
        end:end
      };
      ryglfxXl(data).then(res => { 
      res.forEach(item =>{       
          this.data3.push({ value: item[0], name: item[1] },);
         });
           this.drawLine3();
      });
      err => {
        console.log(err);
      };
    },
    search4(start,end) {
      let data = {
        start:start,
        end:end
      };
      let _this = this;
      
        var map={};
        
      ryglfxZc(data).then(res => {
        res.forEach(item =>{       
          this.data4.push({ value: item[0], name: item[1] },);
         });
           this.drawLine4();
      });
      err => {
        console.log(err);
      };
    },
    select(val){
      
     if(val!=null){
        this.data1=[];
        this.data2=[];
        this.data3=[];
        this.data4=[];
        this.search1(val[0],val[1]);
        this.search2(val[0],val[1]);
        this.search3(val[0],val[1]);
        this.search4(val[0],val[1]);
     }
     
   }
  },
  mounted() {
    
    this.search1(202001,202012);
    this.search2(202001,202012);
    this.search3(202001,202012);
    this.search4(202001,202012);
    // this.drawLine1();
    // this.drawLine2();
    // this.drawLine3();
    // this.drawLine4();
    
  },
  created() {
  
  }
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
<style scoped>
  .box-card {
    min-height: 50%;
  }

  .chart-box {
    width: 500px;
    height: 350px;
  }
</style>