<template>
  <div class="com_searchAndpageBoxPadding complaint-statistic">
    <div class="searchAndpageBox searchAndpageBox2">
      <div class="handlePart caseHandleSearchPart">
        <el-form
          :model="searchForm"
          ref="searchForm"
          style="width:100%"
          label-width="150px"
          size="medium"
          :rules="rules"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="统计周期" prop="daterange">
                <el-date-picker
                  v-model="searchForm.daterange"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                  :clearable="false"
                  @change="load"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div id="myChart" class="my-chart-box"></div>
    </div>
  </div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import { countByHour } from "@/api/notice/complaint";
import echarts from "echarts";

export default {
  data() {
    var validateDaterange = (rule, value, callback) => {
      if (value[0] === "" || value[1] === "") {
        callback(new Error("请输入统计周期"));
      } else {
        callback();
      }
    };
    return {
      searchForm: {
        daterange: [
          new Date().format("yyyy-MM-dd"),
          new Date().format("yyyy-MM-dd"),
        ],
      },
      rules: {
        daterange: [{ validator: validateDaterange, trigger: "blur" }],
      },
    };
  },
  methods: {
    async showChart(data) {
      let legendData = [];
      let seriesData = [];
      for (let i = 1; i < 25; i++) {
        let item = data.find(function (item) {
          return Number(item.name) === i;
        });
        if (item) {
          legendData.push(item.name + "时");
          seriesData.push(item.value);
        } else {
          legendData.push(i + "时");
          seriesData.push(0);
        }
      }
      let myChart = echarts.init(document.getElementById("myChart"));
      myChart.setOption({
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: legendData,
        },
        yAxis: {
          type: "value",
          name: "单位：起",
          max: function (value) {
            return value.max < 20 ? 20 : value.max + 20;
          },
        },
        series: [
          {
            data: seriesData,
            type: "line",
          },
        ],
      });
    },
    //获取已归档的数据
    getDataList(searchData) {
      let data = searchData;
      let _this = this;
      countByHour(data).then(
        (res) => {
          _this.showChart(res.data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    load() {
      let data = {
        startTime: this.searchForm.daterange[0],
        endTime: this.searchForm.daterange[1],
      };
      this.getDataList(data);
    },
  },
  created() {},
  mounted() {
    this.load();
  },
};
</script>
<style lang="scss" scoped>
.complaint-statistic {
  .my-chart-box {
    width: 100%;
    height: 400px;
  }
}
</style>