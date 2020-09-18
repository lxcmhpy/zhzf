<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox searchAndpageBox2">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card class="box-card">
            <el-row type="flex" justify="end">
              <el-col :span="12">
                <div class="chart-title">装备使用概况</div>
              </el-col>
              <el-col :span="12">
                <elSelectTree
                  ref="elSelectTreeObj1"
                  :options="tableDataTree"
                  :accordion="true"
                  :props="{label: 'label', value: 'id'}"
                  @getValue="hindleChanged1"
                ></elSelectTree>
              </el-col>
            </el-row>
            <div id="deviceUseChart" class="chart-box"></div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card">
            <el-row type="flex" justify="end">
              <el-col :span="12">
                <div class="chart-title">装备分类统计</div>
              </el-col>
              <el-col :span="12">
                <elSelectTree
                  ref="elSelectTreeObj2"
                  :options="tableDataTree"
                  :accordion="true"
                  :props="{label: 'label', value: 'id'}"
                  @getValue="hindleChanged2"
                ></elSelectTree>
              </el-col>
            </el-row>
            <div id="deviceTypeChart" class="chart-box"></div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top:20px">
        <el-col :span="12">
          <el-card class="box-card">
            <el-row type="flex" justify="end">
              <el-col :span="12">
                <div class="chart-title">车辆使用概况</div>
              </el-col>
              <el-col :span="12">
                <elSelectTree
                  ref="elSelectTreeObj3"
                  :options="tableDataTree"
                  :accordion="true"
                  :props="{label: 'label', value: 'id'}"
                  @getValue="hindleChanged3"
                ></elSelectTree>
              </el-col>
            </el-row>
            <div id="vehicleUseChart" class="chart-box"></div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card">
            <el-row type="flex" justify="end">
              <el-col :span="12">
                <div class="chart-title">使用证状态</div>
              </el-col>
              <el-col :span="12">
                <elSelectTree
                  ref="elSelectTreeObj4"
                  :options="tableDataTree"
                  :accordion="true"
                  :props="{label: 'label', value: 'id'}"
                  @getValue="hindleChanged4"
                ></elSelectTree>
              </el-col>
            </el-row>
            <div id="certStateChart" class="chart-box"></div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import echarts from "echarts";
import {
  countDevice,
  countDeviceType,
  countUsePer,
  countVehicle,
} from "@/api/device/statistic.js";
import elSelectTree from "@/components/elSelectTree/elSelectTree";

export default {
  components: { elSelectTree },
  data() {
    return {
      tjData: {},
      tableDataTree: [],
      organizationId: "",
    };
  },
  methods: {
    // 获取机构树
    getOidTreeData() {
      let _this = this;
      _this.$store.dispatch("findOrganTreeByCurrUser").then(
        (res) => {
          debugger;
          _this.tableDataTree = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    // 所属机构切换
    hindleChanged1(val) {
      this.organizationId = val;
      this.$refs.elSelectTreeObj1.$children[0].handleClose();
      this.showChart1(val);
    },
    // 所属机构切换
    hindleChanged2(val) {
      this.organizationId = val;
      this.$refs.elSelectTreeObj2.$children[0].handleClose();
      this.showChart2(val);
    },
    // 所属机构切换
    hindleChanged3(val) {
      this.organizationId = val;
      this.$refs.elSelectTreeObj3.$children[0].handleClose();
      this.showChart3(val);
    },
    // 所属机构切换
    hindleChanged4(val) {
      this.organizationId = val;
      this.$refs.elSelectTreeObj4.$children[0].handleClose();
      this.showChart4(val);
    },
    async showChart1(val) {
      let data = "";
      let res = await this.getData(1, val);
      data = res;
      let legendData = [];
      let seriesData = [];
      data.forEach((k) => {
        let name = k.name + "(" + k.quantity + ")";
        legendData.push(name);
        seriesData.push({
          name: name,
          value: k.quantity,
        });
      });

      let myChart = echarts.init(document.getElementById("deviceUseChart"));
      myChart.setOption({
        legend: {
          type: "scroll",
          orient: "vertical",
          right: 10,
          bottom: 80,
          data: legendData,
        },
        series: [
          {
            type: "pie",
            color: [
              "#4477E0",
              "#5AD8A6",
              "#5D7092",
              "#F6BD16",
              "#E8684A",
              "#6DC8EC",
              "#9270CA",
              "#ff9f7f",
              "#E690D1",
              "#e7bcf3",
              "#9d96f5",
              "#8378EA",
              "#96BFFF",
            ],
            radius: ["40%", "60%"],
            center: ["40%", "50%"],
            data: seriesData,
          },
        ],
      });
    },
    async showChart2(val) {
      let data = "";
      let res = await this.getData(2, val);
      data = res;
      let legendData = [];
      let seriesData = [];
      data.forEach((k) => {
        legendData.push(k.name);
        seriesData.push(k.quantity);
      });
      let myChart = echarts.init(document.getElementById("deviceTypeChart"));
      myChart.setOption({
        tooltip: {
          trigger: "item",
          position: "top",
          formatter: "{b} <br/> {c}件",
        },
        xAxis: {
          type: "category",
          data: legendData,
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: false,
          },
        },
        series: [
          {
            data: seriesData,
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.3)",
            },
            itemStyle: {
              color: "#4477E0",
            },
          },
        ],
      });
    },
    async showChart3(val) {
      debugger;
      let data = "";
      let res = await this.getData(3, val);
      data = res;
      let legendData = [];
      let seriesData = [];
      data.forEach((k) => {
        legendData.push(k.name);
        seriesData.push({
          name: k.name,
          value: k.quantity,
        });
      });
      let myChart = echarts.init(document.getElementById("vehicleUseChart"));
      myChart.setOption({
        tooltip: {
          trigger: "item",
          position: "top",
          formatter: "{b} <br/> {d}%({c}辆)",
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          right: 10,
          bottom: 80,
          data: legendData,
        },
        series: [
          {
            type: "pie",
            color: [
              "#4477E0",
              "#5AD8A6",
              "#5D7092",
              "#F6BD16",
              "#E8684A",
              "#6DC8EC",
              "#9270CA",
              "#ff9f7f",
              "#E690D1",
              "#e7bcf3",
              "#9d96f5",
              "#8378EA",
              "#96BFFF",
            ],
            radius: "55%",
            center: ["40%", "50%"],
            data: seriesData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    },
    async showChart4(val) {
      debugger;
      let data = "";
      let res = await this.getData(4, val);
      data = res;
      let legendData = [];
      let seriesData = [];
      data.forEach((k) => {
        legendData.push(k.name);
        seriesData.push(k.quantity);
      });
      let myChart = echarts.init(document.getElementById("certStateChart"));
      myChart.setOption({
        tooltip: {
          trigger: "item",
          position: "top",
          formatter: "{b} : {c}",
        },
        xAxis: {
          type: "category",
          data: legendData,
          interval: 0,
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: false,
          },
          min: function (value) {
            return value.min;
          },
          max: function (value) {
            return value.max;
          },
        },
        series: [
          {
            data: seriesData,
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.3)",
            },
            itemStyle: {
              color: "#4477E0",
            },
          },
        ],
      });
    },
    async getData(type, organId) {
      let res = "";
      switch (type) {
        case 1:
          res = await countDevice(organId);
          break;
        case 2:
          res = await countDeviceType(organId);
          break;
        case 3:
          res = await countVehicle(organId);
          break;
        case 4:
          res = await countUsePer(organId);
          break;
      }
      return res.data;
    },
  },
  created() {
    this.getOidTreeData();
  },
  mounted() {
    this.showChart1(null);
    this.showChart2(null);
    this.showChart3(null);
    this.showChart4(null);
  },
};
</script>
<style>
.chart-title {
  margin-left: 20px;
  font-size: 20px;
  font-weight: bold;
  height: 40px;
  line-height: 40px;
  font-family: "黑体";
  color: #4c4d50;
}
.chart-box {
  width: 500px;
  height: 350px;
}
</style>

