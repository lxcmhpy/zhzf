<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage toggleBox">
      <div class="handlePart">
        <el-form :inline="true" :model="logForm" label-width="100px" ref="logForm">
          <el-form-item label="统计周期">
            <el-date-picker
              v-model="logForm.date"
              size="small"
              type="monthrange"
              range-separator="至"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
              format="yyyy-MM"
              value-format="yyyy-MM"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="立案机构">
            <elSelectTree
              ref="elSelectTreeObj1"
              :options="logForm.mechanismOption"
              :accordion="true"
              :props="{label: 'label', value: 'id'}"
              @getValue="handleMechanism"
            />
          </el-form-item>
          <el-form-item>
            <el-button style="margin-left: 10px" size="small" type="primary" icon="el-icon-search" @click="handleSerch">搜索</el-button>
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
  import echarts from "echarts"
  import { dzhbafx } from '@/api/analysis/analysisManage.js'
  import elSelectTree from "@/components/elSelectTree/elSelectTree";
  export default {
    components: {
      elSelectTree,
    },
    data() {
      return {
        logForm: {
          date: [
            String(new Date().getFullYear()-1) + '-' + ((new Date().getMonth()+1) > 9 ? String(new Date().getMonth()+1) : '0'+String(new Date().getMonth()+1)),
            String(new Date().getFullYear()) + '-' + ((new Date().getMonth()+1) > 9 ? String(new Date().getMonth()+1) : '0'+String(new Date().getMonth()+1))
          ],
          mechanismOption: []
        },
        organId: JSON.parse(localStorage.getItem("userInfo")).organId
      }
    },
    created() {
      this.init()
    },
    methods: {
      /**
       * 初始化界面
       */
      init() {
        // 获取机构数据
        this.$store.dispatch("findOrganTreeByCurrUser").then(res => {
          if(res.code === 200) {
            this.logForm.mechanismOption = res.data
            res.data.map(item => {
              if(item.id === this.organId) {
                // this.$refs.elSelectTreeObj1.valueTitle = res.data[0].label // 默认显示第一个
                this.$refs.elSelectTreeObj1.valueTitle = item.label // 默认显示当前机构
              }
            })
          }
        }, err => { console.log(err) })

        let params = {
          organId: this.organId,
          startTime: this.logForm.date[0],
          endTime: this.logForm.date[1]
        }
        this.getData(params)
      },

      /**
       * 获取数据
       */
      getData(params) {
        dzhbafx(params).then(res => {
          if(res.code === 200) {
            let data = res.data
            this.drawLine1(data.org)
            this.drawLine2(data.orgTop10)
            this.drawLine3(data.people)
          }
        }, err => { console.log(err) })
      },

      /**
       * 选中机构
       */
      handleMechanism(val) {
        console.log(val)
        this.$refs.elSelectTreeObj1.$children[0].handleClose()
        this.organId = val
      },

      /**
       * 点击搜索，获取数据
       */
      handleSerch() {
        let params = {
          organId: this.organId || JSON.parse(localStorage.getItem("userInfo")).organId,
          startTime: this.logForm.date[0],
          endTime: this.logForm.date[1]
        }
        this.getData(params)
      },

      /**
       * 点击饼图触发
       */
      handleClick(data) {
        console.log(data)
        this.organId = data.data.id
        this.$refs.elSelectTreeObj1.valueTitle = data.data.name // 更改显示的机构
        let params = {
          organId: data.data.id,
          startTime: this.logForm.date[0],
          endTime: this.logForm.date[1]
        }
        this.getData(params)
      },

      drawLine1(data) {
        let dom = document.getElementById("chart1")
        if(dom) {
          let myChart = echarts.init(dom)
          const option = {
            title: {
              text: "办案数量TOP机构排名",
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
                radius: "55%",
                center: ["50%", "60%"],
                data: data,
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)"
                  }
                }
              }
            ]
          }
          myChart.setOption(option)
          myChart.on('click', this.handleClick)
        }
      },
      drawLine2(data) {
        let _xAxis = [], _series = []
        if(data.length > 0) {
          data.map(item => {
            _xAxis.push(item.name)
            _series.push(item.value)
          })
        }

        let dom = document.getElementById("chart2")
        if(dom) {
          let myChart = echarts.init(dom)
          const option = {
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
                data: _xAxis,
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
                data: _series,
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
          }
          myChart.setOption(option)
        }
      },
      drawLine3(data) {
        let _xAxis = [], _series = []
        if(data.length > 0) {
          data.map(item => {
            _xAxis.push(item.name)
            _series.push(item.value)
          })
        }

        let dom = document.getElementById("chart3")
        if(dom) {
          let myChart = echarts.init(dom)
          const option = {
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
            grid: {
              left: "3%",
              right: "4%",
              bottom: "15%",
              containLabel: true
            },
            xAxis: [
              {
                type: "category",
                data: _xAxis,
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
                data: _series,
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
          }
          myChart.setOption(option)
        }
      },
    },
  }
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
