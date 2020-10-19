<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage toggleBox">
      <div class="handlePart">
        <el-form :inline="true" :model="logForm" label-width="100px" ref="logForm">
          <el-form :inline="true" :model="logForm" label-width="100px" ref="logForm">
            <el-form-item label="统计周期" prop>
              <el-date-picker
                v-model="value3"
                type="monthrange"
                range-separator="至"
                start-placeholder="开始月份"
                end-placeholder="结束月份"
                 value-format="yyyyMM" @change="select"
              ></el-date-picker>
            </el-form-item>
          </el-form>
        </el-form>
      </div>
      <div style="margin-top:30px">
        <el-row>
          <el-col :span="12">
            <div id="chart1" style="width: 400px; height: 400px;"></div>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="6">
                <div id="chart2" style="width: 400px; height: 200px;"></div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <div id="chart3" style="width: 400px; height: 200px;"></div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>


<script>
import echarts from "echarts";
import {
      ajdsrtzfx,ajdsrtzfxAge
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
      data1: [],
      data2: [],
      data3: [],
      data4: [],
    };
  },
  methods: {
    drawLine1() {
      this.chartColumn = echarts.init(document.getElementById("chart1"));

      this.chartColumn.setOption({
        title: {
          text: "个人案件被处罚人年龄段分布",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        // legend: {
        //   left: "center",
        //   top: "bottom",
        //   data: ["赔偿金额", "处罚金额", "许可补偿"]
        // },
        series: [
          {
            name: "",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.data1,
            // [
            //   { value: 335, name: "21-30岁" },
            //   { value: 310, name: "31-40岁" },
            //   { value: 234, name: "41-50岁" }
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
      this.chartColumn = echarts.init(document.getElementById("chart2"));

      this.chartColumn.setOption({
        title: {
          text: "个人案件被处罚人年龄分布",
          left: "center"
        },
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: this.data2,
            // [
            //   "21岁",
            //   "22岁",
            //   "23岁",
            //   "24岁",
            //   "25岁",
            //   "26岁",
            //   "27岁",
            //   "28岁",
            //   "29岁",
            // ],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "",
            type: "bar",
            barWidth: "60%",
            data: this.data3
            // [10, 52, 200, 334, 390, 330, 220, 390, 330,]
          }
        ]
      });
    },
    drawLine3() {
      this.chartColumn = echarts.init(document.getElementById("chart3"));

      this.chartColumn.setOption({
        title: {
          text: "个人案件被处罚人年龄段分布",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        // legend: {
        //   left: "center",
        //   top: "bottom",
        //   data: ["赔偿金额", "处罚金额", "许可补偿"]
        // },
        series: [
          {
            name: "",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.data4,
            // [
            //   { value: 335, name: "21-30岁" },
            //   { value: 310, name: "31-40岁" },
            //   { value: 234, name: "41-50岁" }
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
    //年龄
    search1(start,end) {
      let data = {
       start:start,
       end:end
      };
         var val1=0;
        var val2=0;
        var val3=0;
        var val4=0;
      ajdsrtzfxAge(data).then(res => {
        res.forEach(item =>{
          this.data2.push(item[0]);
           this.data3.push(item[1]);
         if(item[0]>0&&item[0]<24){          
           val1=val1+item[1];          
         }
         if(item[0]>25&&item[0]<39){           
           val2=val2+item[1];            
         }
          if(item[0]>40&&item[0]<49){        
           val3=val3+item[1];  
         }
         if(item[0]>50){          
           val4=val4+item[1];   
         }
         
         });
         this.data1.push({ value: val1, name: "24岁以下" },);
         this.data1.push({ value: val2, name: "25-39岁" },);
         this.data1.push({ value: val3, name: "40-49岁" },);
         this.data1.push({ value: val4, name: "50岁以上" },);
         this.drawLine1();
         this.drawLine2();
      });
      err => {
        console.log(err);
      };
    },
    //法人
     search2(start,end) {
      let data = {
       start:start,
       end:end
      };
      ajdsrtzfx(data).then(res => {
        if(res.length!=0){
          this.data4.push({ value:res[0], name: "法人" });
          this.data4.push({ value:res[1], name: "个人" });
         this.drawLine3();
        }else{
           this.data4=[{ value:0, name: "法人" },{ value:0, name: "个人" }];
           this.drawLine3();
        }
         
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
      }
     
     }
  },
  mounted() {
        this.data1=[];
        this.data2=[];
        this.data3=[];
        this.data4=[];
        this.search1(202001,202012);
        this.search2(202001,202012);
        // this.drawLine1();
        // this.drawLine2();
        //this.drawLine3();
  },
  created() {
    
  }
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
