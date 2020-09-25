<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage toggleBox">
      <div class="handlePart">
        <el-form :inline="true" :model="logForm" label-width="100px" ref="logForm">
          <el-form-item label="立案机构" prop>
            <el-select size="small" v-model="logForm.mechanism" placeholder="立案机构">
              <el-option label="全部" value></el-option>

            </el-select>
          </el-form-item>
          <el-form-item label="执法门类" prop>
            <el-select size="small" v-model="logForm.category" placeholder="执法门类">
              <el-option label="全部" value></el-option>

            </el-select>
          </el-form-item>
          <el-form-item
            label="统计周期"
            v-for="(item, index) in dateList"
            v-show="item.activeName === activeName"
            :key="index">
            <el-date-picker
              size="small"
              v-model="item.value"
              :type="item.type"
              :placeholder="item.placeholder"
              :value-format="item.valueFormat">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              size="small"
              style="margin-left: 30px"
              @click="handleSelect">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="tablePart">
        <el-tabs type="border-card" v-model="activeName" @tab-click="handleTabClick(activeName)">
          <el-tab-pane
          v-for="item in tabPans"
          :key="item.name"
          :label="item.label"
          :name="item.name">
            <div :id="item.id" style="width: 1000px; height: 400px;"></div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>


<script>
  import echarts from "echarts";
  import { sjglfx, sjglfxmonth, sjglfxday, sjglfxhours} from '@/api/fxyp.js'

  export default {
    data() {
      return {
        dateList: [
          {
            activeName: 'monthView',
            value: String(new Date().getFullYear()),
            type: "year",
            placeholder: "选择年",
            valueFormat: "yyyy"
          },
          {
            activeName: 'dayView',
            value: String(new Date().getFullYear()) + '/' + ((new Date().getMonth() + 1) > 9 ? String((new Date().getMonth() + 1)) : ('0'+String((new Date().getMonth() + 1)))),
            type: "month",
            placeholder: "选择月",
            valueFormat: "yyyy/MM"
          },
          {
            activeName: 'hoursView',
            value: String(new Date().getFullYear()) + '/' + ((new Date().getMonth() + 1) > 9 ? String((new Date().getMonth() + 1)) : ('0'+String((new Date().getMonth() + 1)))) + '/' + (new Date().getDate() > 9 ? String(new Date().getDate()) : ('0'+String(new Date().getDate()))),
            type: "date",
            placeholder: "选择日期",
            valueFormat: "yyyy/MM/dd"
          },
        ],
        tabPans: [
          { label: "年视图", name: "yearView", id: "yearChart" },
          { label: "月视图", name: "monthView", id: "monthChart" },
          { label: "日视图", name: "dayView", id: "dayChart" },
          { label: "时视图", name: "hoursView", id: "hoursChart" },
        ],
        activeName: 'yearView',
        checked: true,
        logForm: {
          mechanism: "",
          category: ""
        },
      };
    },
    created() {
      this.init()
    },
    methods: {
      /**
       * 初始化页面，显示年视图
       */
      init(params) {
        sjglfx(params).then(res => {
          if(res.code === 200) {
            return res.data
          } else {
            throw new Error("sjglfx::::接口数据错误")
          }
        }).then(data => {
          let echartsData = []
          Object.keys(data).map(key => {
            console.log(data[key].length)
            if(data[key].length > 0) {
              echartsData.push(data[key][0])
            }
          })
          this.setCharts(echartsData)
        })
      },

      /**
       * 点击搜索
       */
      handleSelect() {
        let valMap = new Map([
          [ 'monthView', this.dateList[0].value ],
          [ 'dayView', this.dateList[1].value ],
          [ 'hoursView', this.dateList[2].value ],
        ])
        let mechanism = this.logForm.mechanism
        let category = this.logForm.category
        if(this.activeName === 'yearView') {
          let params = mechanism + '/' + category
          this.init(params)
        } else {
          let params = mechanism + '/' + category + '/' + valMap.get(this.activeName)
          this.getData(params)
        }
      },

      /**
       * 切换选项卡触发
       */
      handleTabClick(val) {
        let dateMap = new Map([
          [ 'monthView', this.dateList[0].value ],
          [ 'dayView', this.dateList[1].value ],
          [ 'hoursView', this.dateList[2].value ],
        ])
        if(val === 'yearView') {
          this.init()
        } else {
          this.getData(dateMap.get(val))
        }
      },

      /**
       * 获取数据
       */
      getData(params) {
        let axiosMap = new Map([
          [ 'monthView', sjglfxmonth ],
          [ 'dayView', sjglfxday ],
          [ 'hoursView', sjglfxhours ],
        ])
        axiosMap.get(this.activeName)(params)
          .then(res => {
            if(res.code === 200) {
              return res.data
            } else {
              throw new Error("getData::::接口数据错误")
            }
          }).then(data => { this.setCharts(data) })
      },

      /**
       * 给图表赋值
       */
      setCharts(data) {
        console.log(data)
        let xAxis = [], series = [];
        let type = this.activeName
        data.map(item => {
          let years = item.years || '-',
          month = item.month || '-',
          day = item.day || '-',
          hours = item.dhoursay || '-'

          if(type === 'yearView') {
            xAxis.push(years)
          } else if (type === 'monthView') {
            xAxis.push((years + '/' + month))
          } else if (type === 'dayView') {
            xAxis.push((years + '/' + month + '/' + day))
          } else if (type === 'hoursView') {
            xAxis.push(hours)
          }
          series.push(item.value)
        })
        this.drawCharts({ xAxis, series })
      },

      /**
       * 折线图数据格式
       */
      drawCharts({ xAxis, series }) {
        let idMap = new Map([
          [ 'yearView', 'yearChart' ],
          [ 'monthView', 'monthChart' ],
          [ 'dayView', 'dayChart' ],
          [ 'hoursView', 'hoursChart' ],
        ])
        let chartRef = idMap.get(this.activeName)
        let dom = document.getElementById(chartRef)
        console.log(dom)
        if(dom) {
          let myChart = echarts.init(dom)
          let option = {
            title: {
              text: "年度案发数量分析",
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
              data: xAxis
            },
            yAxis: {
              type: "value"
            },
            series: [
              {
                data: series,
                type: "line"
              }
            ]
          }
          myChart.setOption(option)
        }
      },
    },
  };
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
