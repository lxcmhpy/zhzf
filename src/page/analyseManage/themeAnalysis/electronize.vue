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
            ></el-date-picker>
          </el-form-item>
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
    dzhbafx,dzhbafxry
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
        data5:[],
        isShow: false
      };
    },
    methods: {
      drawLine1() {
        this.chartColumn = echarts.init(document.getElementById("chart1"));

        this.chartColumn.setOption({
          title: {
            text: "办案数量TOP机构排名",
            left: "center"
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          // legend: {
          //     left: 'center',
          //     top: 'bottom',
          //     data: ['操作不当', '未按规定安全驾驶', '交通事故', '车辆失控', '逃避公路车辆通行费','轮胎爆裂','疲劳驾驶',
          //     '闯卡逃逸','大厢板封闭不严,抛洒杂物','其他原因',]
          // },
          series: [
            {
              name: "",
              type: "pie",
              radius: "55%",
              center: ["50%", "60%"],
              //data: this.data1,
              data: [{name:'宁夏交通运输厅',value:34},{name:'石嘴山市执法队',value:12},{name:'固原市执法队',value:22},{name:'银川交通厅',value:32},{name:'中卫市执法队',value:6}],
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
            text: "县市(市辖区)级办案数量TOP5机构",
            left: "center"
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          // legend: {
          //     left: 'center',
          //      top: 'bottom',
          //     data: ['2018年1-12月', ]
          // },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "15%",
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              //data: this.data2,
              data: ['宁夏交通运输厅','银川交通厅','石嘴山市执法队','固原市执法队','中卫市执法队'],
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
              data: this.data3,
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
            }
          ]
        });
      },
      drawLine3() {
        this.chartColumn = echarts.init(document.getElementById("chart3"));

        this.chartColumn.setOption({
          title: {
            text: "执法人员办案数量TOP5",
            left: "center"
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          // legend: {
          //     left: 'center',
          //      top: 'bottom',
          //     data: ['2018年1-12月', ]
          // },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "15%",
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              data: this.data4,
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
              data: this.data5,
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
            }
          ]
        });
      },
      search1(val) {
        this.currentPage = val;
        let data = {
          // year:2018
        };
        let _this = this;
        // this.$store.dispatch("dzhbafx", data).then(res => {
        dzhbafx(data).then(res => {
          console.log(res);
          var map={};
          res.forEach(item =>{
            map[item[0]]=item[1];

          });
          console.log(map);
          var arr=[];
          // arr.push({value:res[]})
          this.data1=[ {value:res[0][1], name:res[0][0]},{value:res[1][1], name:res[1][0]}
            ,{value:res[2][1], name:res[2][0]},{value:res[3][1], name:res[3][0]}
            ,{value:res[4][1], name:res[4][0]},{value:res[5][1], name:res[5][0]}
          ];
          this.drawLine1();

          this.data2=[res[0][0],res[1][0],res[2][0],res[3][0],res[4][0]];
          this.data3=[res[0][1],res[1][1],res[2][1],res[3][1],res[4][1]];
          this.drawLine2();
        });
        err => {
          console.log(err);
        };
      },
      search2(val) {
        this.currentPage = val;
        let data = {
          // year:2018
        };
        let _this = this;
        // this.$store.dispatch("dzhbafxry", data).then(res => {
        dzhbafxry(data).then(res => {

          console.log(res);
          var map={};
          res.forEach(item =>{
            map[item[0]]=item[1];

          });
          console.log(map);


          this.data4=[res[0][0],res[1][0],res[2][0],res[3][0],res[4][0]];
          this.data5=[res[0][1],res[1][1],res[2][1],res[3][1],res[4][1]];
          this.drawLine3();
        });
        err => {
          console.log(err);
        };
      },
    },
    mounted() {
      this.search1();
      this.search2();
      // this.drawLine2();
      // this.drawLine3();
    },
    created() {

    }
  };
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
