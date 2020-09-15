<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage toggleBox">
      <div class="handlePart">
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
      </div>
      <div class="tablePart">
        <el-tabs type="border-card">
          <el-tab-pane label="赔补偿案件">
            <div id="chartYear" style="width: 1000px; height: 400px;"></div>
          </el-tab-pane>
          <el-tab-pane label="处罚案件">
            <div id="chartMonth" style="width: 1000px; height: 400px;"></div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>


<script>
import echarts from "echarts";
export default {
  data() {
    return {
      value3: "",
      value2: "",
      value1: "",
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
     t1:[],
     data1:[],
     data2:[],
     t2:[],
     data3:[],
     data4:[],

      isShow: false
    };
  },
  methods: {
    drawLine1() {
      this.chartColumn = echarts.init(document.getElementById("chartYear"));

      this.chartColumn.setOption({
        title: {
          text: "赔补偿案件直方图",
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
          data: ["案发数", "结案数"]
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
            // data: this.t1
            data:["西宁市交通局","海东市交通局","玉树交通局","海西交通局",]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "案发数",
            type: "bar",
            // data: this.data1,
            data:[100,105,80,90],
            //设置柱子的宽度
            barWidth: 30,
            //配置样式
            itemStyle: {
              //通常情况下：
              normal: {
                color: function(params) {
                  var colorList = ["rgb(42,170,227)"];
                  return colorList[0];
                }
              }
            }
          },
          {
            name: "结案数",
            type: "bar",
            // data: this.data2,
            data:[10,5,8,9],
            //设置柱子的宽度
            barWidth: 30,
            //配置样式
            itemStyle: {
              //通常情况下：
              normal: {
                color: function(params) {
                  var colorList = ["rgb(25,46,94)"];
                  return colorList[0];
                }
              }
            }
          }
        ]
      });
    },
    drawLine2() {
      this.chartColumn = echarts.init(document.getElementById("chartMonth"));

      this.chartColumn.setOption({
        title: {
          text: "处罚案件直方图",
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
          data: ["案发数", "结案数"]
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
            // data: this.t2
            data:["西宁市交通局","海东市交通局","玉树交通局","海西交通局",]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "案发数",
            type: "bar",
            // data: this.data3,
            data:[120,125,180,90],
            //设置柱子的宽度
            barWidth: 30,
            //配置样式
            itemStyle: {
              //通常情况下：
              normal: {
                color: function(params) {
                  var colorList = ["rgb(42,170,227)"];
                  return colorList[0];
                }
              }
            }
          },
          {
            name: "结案数",
            type: "bar",
            // data: this.data4,
            data:[10,5,2,9],
            barWidth: 30,
            //配置样式
            itemStyle: {
              //通常情况下：
              normal: {
                color: function(params) {
                  var colorList = ["rgb(25,46,94)"];
                  return colorList[0];
                }
              }
            }
          }
        ]
      });
    },
    //赔补偿
   search(val) {
      this.currentPage = val;
      let data = {
        // year:2018
      };
      let _this = this;
      this.$store.dispatch("ajsldbfxpbc", data).then(res => {
        // console.log(res);
         var map={};
         res.forEach(item =>{
              map[item[0]]=item[1];       
         });
        // console.log(map);
          this.t1=["交通运输部","固原综合执法支队","江西交通厅","新疆交通厅"]; 
          this.data2=
          [map["交通运输部"]=undefined?0:map["交通运输部"],
          map["固原综合执法支队"]=undefined?0:map["固原综合执法支队"],
          map["江西交通厅"]=undefined?0:map["江西交通厅"],
          map["新疆交通厅"]=undefined?0:map["新疆交通厅"]]; 

          // this.drawLine1();
      });
      err => {
        console.log(err);
      };
    },
     //赔补偿 发案
   searchfa(val) {
      this.currentPage = val;
      let data = {
        // year:2018
      };
      let _this = this;
      this.$store.dispatch("ajsldbfxpbcfa", data).then(res => {
        console.log(res);
         var map={};
         res.forEach(item =>{
              map[item[0]]=item[1];       
         });
        console.log(map);
           this.t1=["交通运输部","固原综合执法支队","江西交通厅","新疆交通厅"]; 
          this.data1=[map["交通运输部"],map["固原综合执法支队"],map["江西交通厅"],map["新疆交通厅"]]; 
          
          this.drawLine1();
      });
      err => {
        console.log(err);
      };
    },
     //处罚
   search2(val) {
      this.currentPage = val;
      let data = {
        // year:2018
      };
      let _this = this;
      this.$store.dispatch("ajsldbfxcf", data).then(res => {
        console.log(res);
         var map={};
         res.forEach(item =>{
              map[item[0]]=item[1];       
         });
        console.log(map);      
           this.t2=["交通运输部","固原综合执法支队","江西交通厅","新疆交通厅"]; 
          this.data4=[map["交通运输部"],map["固原综合执法支队"],map["江西交通厅"],map["新疆交通厅"]]; 
         
         

          
          // this.drawLine2();
      });
      err => {
        console.log(err);
      };
    },
    //处罚
   search2fa(val) {
      this.currentPage = val;
      let data = {
        // year:2018
      };
      let _this = this;
      this.$store.dispatch("ajsldbfxcffa", data).then(res => {
        console.log(res);
         var map={};
         res.forEach(item =>{
              map[item[0]]=item[1];       
         });
        console.log(map);      
           this.t2=["交通运输部","固原综合执法支队","江西交通厅","新疆交通厅"]; 
          this.data3=[map["交通运输部"],map["固原综合执法支队"],map["江西交通厅"],map["新疆交通厅"]]; 
      
         

          
          this.drawLine2();
      });
      err => {
        console.log(err);
      };
    },
  },
  
  mounted() {
    // this.search();
    // this.searchfa();
    // this.search2();
    // this.search2fa();
    this.drawLine1();
    this.drawLine2();
  },
  created() {
   
  }
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
