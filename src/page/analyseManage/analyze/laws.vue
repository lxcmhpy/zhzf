<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage toggleBox">
      <div class="handlePart">
        <el-form :inline="true" :model="logForm" label-width="100px" ref="logForm">
          <el-form-item label="起始年月">
            <el-date-picker
              v-model="logForm.date"
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
        <div id="chartColumn" style="width: 100%; height: 400px;"></div>
      </div>
    </div>
  </div>
</template>


<script>
import echarts from "echarts";
import {flfgfxyp} from '@/api/analysis/analysisManage.js'
export default {
  data() {
    return {
      logForm: {
        date: [
          String(new Date().getFullYear()-1) + '-' + ((new Date().getMonth()+1) > 9 ? String(new Date().getMonth()+1) : '0'+String(new Date().getMonth()+1)),
          String(new Date().getFullYear()) + '-' + ((new Date().getMonth()+1) > 9 ? String(new Date().getMonth()+1) : '0'+String(new Date().getMonth()+1))
        ]
      }
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
      let startTime = this.logForm.date[0]
      let endTime = this.logForm.date[1]
      this.getData({ startTime, endTime })
    },

    /**
     * 选中时间
     */
    handleSelect(val) {
      let startTime = val[0], endTime = val[1]
      this.getData({ startTime, endTime })
    },

    /**
     * 获取数据
     */
    getData({ startTime, endTime }) {
      flfgfxyp({ startTime, endTime }).then(res => {
        if(res.code == 200) {
          this.drawLine(res.data)
        }
      }, err => { console.log(err) })
    },

    drawLine(data) {
      this.chartColumn = echarts.init(document.getElementById("chartColumn"));
      let _legend = data.map(item => {
        return item.name
      })

      this.chartColumn.setOption({
        title: {
          text: "法律法规分析",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          // left: 'right',
          // top: 'bottom',
          orient: "vertical",
          right: 150,
          top: 150,
          bottom: 10,
          data: _legend
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: "55%",
            center: ["30%", "60%"],
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
      });
    }
  },
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
