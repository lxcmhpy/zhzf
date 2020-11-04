<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage toggleBox">
      <div class="handlePart">
        <el-form :inline="true" :model="logForm" label-width="100px" ref="logForm">
          <el-form :inline="true" :model="logForm" label-width="100px" ref="logForm">
             <el-form-item label="统计年度" prop>
            <el-date-picker v-model="value1" type="year" placeholder="选择年" value-format="yyyy" ></el-date-picker>
          </el-form-item>
            <el-form-item label=" " label-width="13px">
            <el-button size="medium" icon="iconfont law-sousuo" @click="select()">查询</el-button>
          </el-form-item>
          </el-form>
        </el-form>
      </div>
      <div style="margin-top:30px">
        <el-row>
          <el-col :span="10">
            <div style="width: 400px; height: 400px;">
              <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe resizable border style="width: 100%;height:100%;" @row-click="find">
                <el-table-column prop="mc" label="名称" align="center"></el-table-column>
                <el-table-column prop="sl" label="数量" align="center"></el-table-column>
              </el-table>
              <el-pagination class="fy"
              layout="prev, pager, next"
              @current-change="current_change"
              :total="total"
              background
            >
          </el-pagination>
            </div>
          </el-col>
          <el-col :span="14">
             <el-row>
               <el-col :span="24">
                <div id="chart1" style="width: 700px; height: 200px; top:-50px"></div>
               </el-col>
             </el-row>
             <el-row>
               <el-col :span="24">
                <div id="chart2" style="width: 700px; height: 200px;"></div>
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
      yhhx,yhhxhour,yhhxhourOne,yhhxajlx,yhhxajlxOne
    } from '@/api/fxyp.js'
export default {
  data() {
    return {
      value1: "2020",
      total:0,//默认数据总数
      pagesize:10,//每页的数据条数
      currentPage:1,//默认开始页面
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
      this.chartColumn = echarts.init(document.getElementById("chart1"));

      this.chartColumn.setOption({
        title: {
          text: "案发数量分析(时)",
          left: "center"
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
          // this.data1
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
            data: 
            this.data4
          },
          
        ]
      });
    },
    drawLine2() {
      this.chartColumn2 = echarts.init(document.getElementById("chart2"));

      this.chartColumn2.setOption({
      backgroundColor: "",
      title: {
          text: "案发类型数量分析",
          left: "center"
        },
       tooltip: {
        trigger: 'axis',
        formatter: "{b} : {c}",
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
		left: '12%',
		top: '6%',
		bottom: '12%',
		right: '8%'
	},
    xAxis: {
        data:this.data1,
        //  ['湖南省', '福建省', '云南省', '山东省', '山西省' ],
       axisTick: {
			show: false
		},
		axisLine: {
			lineStyle: {
				color: 'rgba(255, 129, 109, 0.1)',
				width: 1 //这里是为了突出显示加上的
			}
		},
		axisLabel: {
			textStyle: {
				color: '#999',
				fontSize: 12
			}
		}
    },
    yAxis: [{
			splitNumber: 2,
			axisTick: {
				show: false
			},
			axisLine: {
				lineStyle: {
					color: 'rgba(255, 129, 109, 0.1)',
					width: 1 //这里是为了突出显示加上的
				}
			},
			axisLabel: {
				textStyle: {
					color: '#999'
				}
			},
			splitArea: {
				areaStyle: {
					color: 'rgba(255,255,255,.5)'
				}
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: 'rgba(255, 129, 109, 0.1)',
					width: 0.5,
					type: 'dashed'
				}
			}
		}
	],
    series: [{
        name: 'hill',
        type: 'pictorialBar',
        barCategoryGap: '0%',
        symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
        label: {
			show: true,
			position: 'top',
			distance: 15,
			color: '#DB5E6A',
			fontWeight: 'bolder',
			fontSize: 20,
		},
        itemStyle: {
            normal: {
				color: {
					type: 'linear',
					x: 0,
					y: 0,
					x2: 0,
					y2: 1,
					colorStops: [{
							offset: 0,
							color: 'rgba(232, 94, 106, .8)' //  0%  处的颜色
						},
						{
							offset: 1,
							color: 'rgba(232, 94, 106, .1)' //  100%  处的颜色
						}
					],
					global: false //  缺省为  false
				}
			},
			emphasis: {
				opacity: 1
			}
        },
        data: this.data2,
        // [123, 60, 25, 18, 12],
        z: 10
    }]
      });
      
    },
    current_change:function(currentPage){
        this.currentPage = currentPage;
      },
    //查询---------------------------------------------------------------------------------------------------
     search1(val) {    
      let data = {
       year:val
      };

    
      yhhx(data).then(res => { 
         this.total=res.length;
       res.forEach(item =>{
          this.tableData.push({mc:item[0],sl:item[1]});
         });
       
      });
      err => {
        console.log(err);
      };
    },
    search2(val) {    
      let data = {
       year:val
      };
      yhhxhour(data).then(res => { 
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
       
                             
            this.drawLine1();
       
      });
      err => {
        console.log(err);
      };
    },
    search3(val) {    
      let data = {
       year:val
      };
      yhhxajlx(data).then(res => { 
       console.log(res);
       res.forEach(item =>{
          this.data1.push(item[0]);
          this.data2.push(item[1]);
         });
     this.drawLine2();
       
      });
      err => {
        console.log(err);
      };
    },
    //查询单个
    search4(year,name) {    
      let data = {
       year:year,
       name:name
      };
      yhhxhourOne(data).then(res => { 
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
       
                             
            this.drawLine1();
       
      });
      err => {
        console.log(err);
      };
    },
       search5(year,name) {    
      let data = {
       year:year,
       name:name
      };
      yhhxajlxOne(data).then(res => { 
       console.log(res);
       res.forEach(item =>{
          this.data1.push(item[0]);
          this.data2.push(item[1]);
         });
     this.drawLine2();
       
      });
      err => {
        console.log(err);
      };
    },
   select(){
     if(this.value1!=null){
       var val=this.value1;
        this.data1=[];
        this.data2=[];
        this.data4=[];
        this.tableData=[];
      this.search1(val);
      this.search2(val);
      this.search3(val);
     }
     
   },
   find(row){
     console.log(row);
     var year="";
      if(this.value1!=null){
          year=this.value1;
      }else{
        year=2020;
      }
      this.data1=[];
      this.data2=[];
      this.data4=[];
      // this.tableData=[];
      this.search4(year,row.mc);
      this.search5(year,row.mc);
   }
  },
  mounted() {
    //  this.data1=[];
    //  this.data2=[];
    //  this.data4=[];
     this.search1(2020);
     this.search2(2020);
     this.search3(2020);
    // this.drawLine1();
    // this.drawLine2();
  },
  created() {
  }
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
