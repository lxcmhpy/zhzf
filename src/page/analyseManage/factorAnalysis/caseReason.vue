<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage toggleBox">
      <div class="handlePart">
        <el-form :inline="true" :model="logForm" label-width="100px" ref="logForm">
          <el-form-item label="起始年月" prop>
            <el-date-picker
              v-model="logForm.date"
              size="small"
              type="monthrange"
              range-separator="至"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
              format="yyyy-MM"
              value-format="yyyy-MM"
              @change="handleSelect"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div class="tablePart">
        <div id="chart" style="width: 100%; height: 100%;"></div>
      </div>
    </div>
  </div>
</template>


<script>
  import echarts from "echarts";
  import {caseReasonApi} from '@/api/analysis/analysisManage.js'
  export default {
    data() {
      return {
        logForm: {
          date: [
            String(new Date().getFullYear()-1) + '-' + ((new Date().getMonth()+1) > 9 ? String(new Date().getMonth()+1) : '0'+String(new Date().getMonth()+1)),
            String(new Date().getFullYear()) + '-' + ((new Date().getMonth()+1) > 9 ? String(new Date().getMonth()+1) : '0'+String(new Date().getMonth()+1))
          ]
        },
      };
    },
    created() {
      this.init()
    },
    methods: {
      /**
       * 初始化页面
       */
      init() {
        let params = {
          year: this.logForm.date[0],
          year2: this.logForm.date[1]
        }
        this.getData(params)
      },

      /**
       * 选中时间触发
       */
      handleSelect(val) {
        let params = {
          year: val[0],
          year2: val[1]
        }
        this.getData(params)
      },

      /**
       * 获取数据
       */
      getData(params) {
        caseReasonApi(params).then(res => {
          if(res.code === 200) {
            return res.data
          } else {
            throw new Error("caseReasonApi:::::接口数据错误")
          }
        }).then(data => {
          this.drawLine(data)
        })
      },

      drawLine(data) {
        let _legend = [], _series = []
        if(data.length > 0) {
          data.map((item,index) => {
            // 取前10个数据
            if(index < 10) {
              _legend.push(item.name)
              _series.push({ name: item.name, value: item.value })
            }
          })
        }

        let dom = document.getElementById("chart")
        if(dom) {
          let myChart = echarts.init(dom)
          const option = {
            title: {
              text: "案发原因分析",
              left: "center"
            },
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              y: "bottom",
              data: _legend
            },
            series: [
              {
                name: "案发原因",
                type: "pie",
                radius: "55%",
                center: ["50%", "45%"],
                data: _series,
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
        }
      },
    },
  };
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>

<style lang="scss" scoped>
.com_searchAndpageBoxPadding {
  .searchPage {
    .tablePart {
      height: 87% !important;
    }
  }
}
</style>
