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
          <el-form-item
            label="统计周期"
            v-for="(item, index) in dateList"
            v-show="item.activeName === activeName"
            :key="index">
            <el-date-picker
              v-model="item.value"
              :type="item.type"
              :placeholder="item.placeholder"
              :value-format="item.valueFormat">
            </el-date-picker>
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
            <div ref="echarts" style="width: 1000px; height: 400px;"></div>
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
            value: "",
            type: "year",
            placeholder: "选择年",
            valueFormat: "yyyy"
          },
          {
            activeName: 'dayView',
            value: "",
            type: "month",
            placeholder: "选择月",
            valueFormat: "yyyy/MM"
          },
          {
            activeName: 'hoursView',
            value: "",
            type: "date",
            placeholder: "选择日期",
            valueFormat: "yyyy/MM/dd"
          },
        ],
        tabPans: [
          { label: "年视图", name: "year" },
          { label: "月视图", name: "monthView" },
          { label: "日视图", name: "dayView" },
          { label: "时视图", name: "hoursView" },
        ],
        activeName: 'year',

        state: "",
        checked: true,
        logForm: {
          organ: "",
          type: "",
          operation: "",
          username: "",
          startTime: "",
          endTime: "",
          dateArray: ""
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
      init() {
        sjglfx().then(res => {
          let data = res.data
          this.setCharts(data)
        }).catch(() => {
          throw new Error("sjglfx::::::接口数据错误")
        })
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
        if(val === 'year') {
          this.init()
        } else {
          this.getData(val, dateMap.get(val))
        }
      },

      /**
       * 获取数据
       */
      getData(val, params) {
        let axiosMap = new Map([
          [ 'monthView', sjglfxmonth(params) ],
          [ 'dayView', sjglfxday(params) ],
          [ 'hoursView', sjglfxhours(params) ],
        ])
        axiosMap.get(val)
          .then(res => {
            let data = res.data
            this.setCharts(data)
          }).catch(() => {
            throw new Error("sjglfx::::::接口数据错误")
          })
      },

      /**
       * 给图表赋值
       */
      setCharts(data) {
        let xAxis = [], series = [];
        console.log(data)
        // this.drawCharts({ xAxis, series })
      },

      /**
       * 折线图数据格式
       */
      drawCharts({ xAxis, series }) {
        let dom = this.$refs.echarts
        if(dom) {
          let myChart = echarts.init(dom)
          const option = {
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
                data: data,
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
