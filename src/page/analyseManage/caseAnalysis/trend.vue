<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage toggleBox">
      <div class="handlePart">
        <el-form :inline="true" :model="logForm" label-width="100px" ref="logForm">
          <el-form-item label="立案机构" prop>
            <elSelectTree
              ref="elSelectTreeObj1"
              :options="mechanismOption"
              :accordion="true"
              :props="{label: 'label', value: 'id'}"
              @getValue="handleMechanism"
            />
          </el-form-item>
          <el-form-item label="执法门类" prop>
            <el-select v-model="logForm.category" placeholder="请选择">
              <el-option
                v-for="item in categoryOption"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
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
        <el-tabs type="border-card" v-model="activeName" @tab-click="handleSelect">
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
  import { sjglfx, sjglfxmonth, sjglfxday, sjglfxhours, zfml } from '@/api/fxyp.js'
  import elSelectTree from "@/components/elSelectTree/elSelectTree";

  export default {
    components: { elSelectTree },
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
            value: String(new Date().getFullYear()) + ' ' + ((new Date().getMonth() + 1) > 9 ? String((new Date().getMonth() + 1)) : ('0'+String((new Date().getMonth() + 1)))),
            type: "month",
            placeholder: "选择月",
            valueFormat: "yyyy MM"
          },
          {
            activeName: 'hoursView',
            value: String(new Date().getFullYear()) + ' ' + ((new Date().getMonth() + 1) > 9 ? String((new Date().getMonth() + 1)) : ('0'+String((new Date().getMonth() + 1)))) + ' ' + (new Date().getDate() > 9 ? String(new Date().getDate()) : ('0'+String(new Date().getDate()))),
            type: "date",
            placeholder: "选择日期",
            valueFormat: "yyyy MM dd"
          },
        ],
        tabPans: [
          { label: "年视图", name: "yearView", id: "yearChart" },
          { label: "月视图", name: "monthView", id: "monthChart" },
          { label: "日视图", name: "dayView", id: "dayChart" },
          { label: "时视图", name: "hoursView", id: "hoursChart" },
        ],
        activeName: 'yearView',
        logForm: {
          mechanism: "",
          category: ""
        },
        mechanismOption: [],
        categoryOption: []
      }
    },
    created() {
      this.init()
    },
    methods: {
      /**
       * 初始化页面，默认显示年数据，机构和门类默认选择第一个
       */
      init() {
        let reqArr = [this.$store.dispatch("findOrganTreeByCurrUser"), zfml()]
        Promise.all(reqArr).then(result => {
          result.map((res,index) => {
            // 第一个为机构数据，第二个为门类数据
            if(index === 0) {
              this.mechanismOption = res.data
              this.$refs.elSelectTreeObj1.valueTitle = res.data[0].label // 默认显示第一个
              this.logForm.mechanism = res.data[0].id
            } else if (index === 1) {
              this.categoryOption = res.data
              this.logForm.category = res.data[0].value // 默认显示第一个
            }
          })
          return
        }, err => { console.log(err) }).then(() => {
          let mechanism = this.mechanismOption[0].id
          let category = this.categoryOption[0].value
          let params = {
            mechanism,
            category
          }
          this.getData(params)
        })
      },

      /**
       * 点击搜索或者切换视图
       */
      handleSelect() {
        let valMap = new Map([
          [ 'monthView', this.dateList[0].value ],
          [ 'dayView', this.dateList[1].value.split(" ") ],
          [ 'hoursView', this.dateList[2].value.split(" ") ],
        ])
        let mechanism = this.logForm.mechanism
        let category = this.logForm.category
        let params = {}
        if(this.activeName === 'yearView') {
          params = {
            mechanism,
            category
          }
        } else if (this.activeName === 'monthView') {
          params = {
            mechanism,
            category,
            year: valMap.get(this.activeName)
          }
        } else if (this.activeName === 'dayView') {
          params = {
            mechanism,
            category,
            year: valMap.get(this.activeName)[0],
            month: valMap.get(this.activeName)[1]
          }
        } else if (this.activeName === 'hoursView') {
          params = {
            mechanism,
            category,
            year: valMap.get(this.activeName)[0],
            month: valMap.get(this.activeName)[1],
            day: valMap.get(this.activeName)[2],
          }
        }
        this.getData(params)
      },

      /**
       * 获取数据
       */
      getData(params) {
        let axiosMap = new Map([
          [ 'yearView', sjglfx ],
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
          }).then(data => {
            // 如果是年数据，则处理数据格式
            if(this.activeName === 'yearView') {
              let echartsData = []
              Object.keys(data).map(key => {
                if(data[key].length === 0) {
                  echartsData.push({years:key, value: 0})
                } else {
                  echartsData.push(data[key][0])
                }
              })
              this.setCharts(echartsData)
            } else {
              this.setCharts(data)
            }
          })
      },

      /**
       * 给图表赋值
       */
      setCharts(data) {
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

      /**
       * 选中机构
       */
      handleMechanism(val) {
        this.$refs.elSelectTreeObj1.$children[0].handleClose()
        this.logForm.mechanism = val
        console.log(val)
      }
    },
  }
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
