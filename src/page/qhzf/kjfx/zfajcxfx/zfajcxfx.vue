<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage toggleBox">
      <div class="handlePart">
        <el-form :inline="true" :model="logForm" label-width="100px" ref="logForm">
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
      <div >
        <el-row>
          <el-col :span="12">
            <div id="chart1" style="width: 550px; height: 500px;"></div>
          </el-col>
         <el-col :span="12">
            <el-row>
              <el-col :span="6" >
                <div style="width: 500px; height: 450px;">
              <el-table :data="tableData" stripe resizable border style="width: 100%;height:100%;">
                <el-table-column prop="xklx" label="行政区划" align="center"></el-table-column>
                <el-table-column prop="sl" label="案件数量" align="center"></el-table-column>
              </el-table>
            </div>
                <!-- <div id="chart2" style="width: 500px; height: 400px;margin-top:60px" ></div> -->
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
      kjglfx,
    } from '@/api/fxyp.js'
import "echarts/map/js/china.js";
import "echarts/map/js/province/qinghai.js";
import "echarts/map/json/province/qinghai.json";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/chart/heatmap";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/tooltip";

export default {
  data() {
    return {
      value3: "",
      value2: "",
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
        tableData: [
        {
          xklx:'西宁市',
          sl:'0'
        }, {
          xklx:'玉树藏族自治州',
          sl:'0'
        }, {
          xklx:'黄南藏族自治州',
          sl:'0'
        }, {
          xklx:'海南藏族自治州',
          sl:'0'
        }, {
          xklx:'海西蒙古族藏族自治州',
          sl:'0'
        }, {
          xklx:'海东市',
          sl:'0'
        }, {
          xklx:'海北藏族自治州',
          sl:'0'
        }, {
          xklx:'果洛藏族自治州',
          sl:'0'
        }
      ],
      data1:[],
      data2:[],
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
      data3:[],
    };
  },
  methods: {
    drawLine1() {
      let myChart = echarts.init(document.getElementById("chart1"));
    
      myChart.setOption({
        backgroundColor: "#FFFFFF",
      title: {
        text: "",
        subtext: "",
        x: "center"
      },
      tooltip: {
        trigger: "item"
      },
 
      //左侧小导航图标
      visualMap: {
        min: 0,
        max: 100,
        text: ["高", "低"],
        inRange: {
          color: ["lightskyblue", "yellow", "orangered"]
        }
      },
 
      //配置属性
      series: [
        {
          name: "案发数量",
          type: "map",
          mapType: "青海",
          roam: true,
          label: {
            normal: {
              show: false //省份名称
            },
            emphasis: {
              show: false
            }
          },
          data: this.data1
        }
      ]
      });
    },
    
    //查询-----------------------------------------------------------------------------------------------------
    search1(province,start,end) {
      
      let data = {
        province:province,
        start:start,
        end:end
      };
      
         kjglfx(data).then(res => {
            res.forEach(item =>{
               map[item[0]]=item[1];
         });
        if(res.length!=0){
            this.data1.push({name: province, value: res[0][1]==null?0:res[0][1] });            
            if(map['西宁市']!=undefined){
                this.tableData[0].sl=map['西宁市'];
            }else{
                this.tableData[0].sl=0;
            }
            if(map['玉树藏族自治州']!=undefined){
                this.tableData[1].sl=map['玉树藏族自治州'];
            }else{
               this.tableData[1].sl=0;
            }
            if(map['黄南藏族自治州']!=undefined){
               this.tableData[2].sl=map['黄南藏族自治州'];
            }else{
                this.tableData[2].sl=0;
            }
            if(map['海南藏族自治州']!=undefined){
               this.tableData[3].sl=map['海南藏族自治州'];
            }else{
               this.tableData[3].sl=0;
            }
            if(map['海西蒙古族藏族自治州']!=undefined){
              this.tableData[4].sl=map['海西蒙古族藏族自治州'];
            }else{
              this.tableData[4].sl=0;
            }
            if(map['海东市']!=undefined){
                this.tableData[5].sl=map['海东市'];
            }else{
              this.tableData[5].sl=0;
            }
            if(map['海北藏族自治州']!=undefined){
               this.tableData[6].sl=map['海北藏族自治州'];
            }else{
                 this.tableData[6].sl=0;
            }
            if(map['果洛藏族自治州']!=undefined){
              this.tableData[7].sl=map['果洛藏族自治州'];
            }else{
              this.tableData[7].sl=0;
            }
        }else{
          this.data1.push({name: province, value: 0});
          this.tableData[0].sl=0;
          this.tableData[1].sl=0;
          this.tableData[2].sl=0;
          this.tableData[3].sl=0;
          this.tableData[4].sl=0;
          this.tableData[5].sl=0;
          this.tableData[6].sl=0;
          this.tableData[7].sl=0;
        }
        this.drawLine1();
      });
      err => {
        console.log(err);
      };
    },
    select(val){
      
     if(val!=null){
      this.data1=[];
      this.tableData[0].sl=0;
      this.tableData[1].sl=0;
      this.tableData[2].sl=0;
      this.tableData[3].sl=0;
      this.tableData[4].sl=0;
      this.tableData[5].sl=0;
      this.tableData[6].sl=0;
      this.tableData[7].sl=0;
      this.search1('西宁市',val[0],val[1]);
      this.search1('海东市',val[0],val[1]);
      this.search1('玉树藏族自治州',val[0],val[1]);
      this.search1('黄南藏族自治州',val[0],val[1]);
      this.search1('海西蒙古族藏族自治州',val[0],val[1]);
      this.search1('海南藏族自治州',val[0],val[1]);
      this.search1('海北藏族自治州',val[0],val[1]);
      this.search1('果洛藏族自治州',val[0],val[1]);
     }
     
   }
  },
  mounted() {
     this.data1=[];
     this.tableData[0].sl=0;
     this.tableData[1].sl=0;
     this.tableData[2].sl=0;
     this.tableData[3].sl=0;
     this.tableData[4].sl=0;
     this.tableData[5].sl=0;
     this.tableData[6].sl=0;
     this.tableData[7].sl=0;
     this.search1('西宁市',202001,202012);
     this.search1('海东市',202001,202012);
     this.search1('玉树藏族自治州',202001,202012);
     this.search1('黄南藏族自治州',202001,202012);
     this.search1('海西蒙古族藏族自治州',202001,202012);
     this.search1('海南藏族自治州',202001,202012);
     this.search1('海北藏族自治州',202001,202012);
     this.search1('果洛藏族自治州',202001,202012);
    // this.drawLine1();

    
 
  },
  created() {}
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
