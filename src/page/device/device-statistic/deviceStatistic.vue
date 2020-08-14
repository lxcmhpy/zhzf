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
                  ref="elSelectTreeObj"
                  :options="tableDataTree"
                  :accordion="true"
                  :props="{label: 'label', value: 'id'}"
                  @getValue="hindleChanged"
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
                  ref="elSelectTreeObj"
                  :options="tableDataTree"
                  :accordion="true"
                  :props="{label: 'label', value: 'id'}"
                  @getValue="hindleChanged"
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
                  ref="elSelectTreeObj"
                  :options="tableDataTree"
                  :accordion="true"
                  :props="{label: 'label', value: 'id'}"
                  @getValue="hindleChanged"
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
                  ref="elSelectTreeObj"
                  :options="tableDataTree"
                  :accordion="true"
                  :props="{label: 'label', value: 'id'}"
                  @getValue="hindleChanged"
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
/* import {
  queryDeviceVehicle,
  deleteVehicles,
} from "@/api/device/deviceVehicle.js"; */
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
          _this.tableDataTree = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    // 所属机构切换
    hindleChanged(val) {
      this.organizationId = val;
      this.$refs.elSelectTreeObj.$children[0].handleClose();
    },
    showChart1() {
      let legendData = ["闲置", "在用", "维修", "调拨", "报废"];
      let seriesData = [
        { value: 335, name: "闲置" },
        { value: 310, name: "在用" },
        { value: 234, name: "维修" },
        { value: 135, name: "调拨" },
        { value: 1548, name: "报废" },
      ];
      /*let legendData = [];
      let seriesData = [];
       let total = parseFloat(this.tjData.caseInfoTotal);
      Object.keys(this.tjData.businessAreaMap).forEach((k) => {
        let num = parseFloat(this.tjData.businessAreaMap[k]);
        let percent =
          total <= 0 ? "0%" : Math.round((num / total) * 10000) / 100.0 + "%";
        let n = k;
        legendData.push(n);
        seriesData.push({
          name: n,
          value: this.tjData.businessAreaMap[k],
        });
      }); */
      debugger;
      let myChart = echarts.init(document.getElementById("deviceUseChart"));
      myChart.setOption({
        // title: {
        //   text: "装备使用概况",
        //   left: "left",
        // },
        tooltip: {
          trigger: "item",
          position: "top",
          formatter: "{b} : {c}",
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          right: 10,
          bottom: 20,
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
            radius: ["50%", "70%"],
            data: seriesData,
          },
        ],
      });
    },
    showChart2() {
      let data1 = ["通用设备", "电气设备"];
      let data2 = ["4", "8"];
      /*  let data1 = [];
      let data2 = [];
      Object.keys(this.tjData.cityDivisionMap).forEach((k) => {
        data1.push(k);
        data2.push(this.tjData.cityDivisionMap[k]);
      });*/
      debugger;
      let myChart = echarts.init(document.getElementById("deviceTypeChart"));
      myChart.setOption({
        // title: {
        //   text: "装备分类统计",
        //   left: "left",
        // },
        tooltip: {
          trigger: "item",
          position: "top",
          formatter: "{b} <br/> {c}件",
        },
        xAxis: {
          type: "category",
          data: data1,
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: false,
          },
        },
        series: [
          {
            data: data2,
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
    showChart3() {
      let legendData = ["正常", "维修", "报废"];
      let seriesData = [
        { value: 4, name: "正常" },
        { value: 8, name: "维修" },
        { value: 6, name: "报废" },
      ];
      /*let legendData = [];
      let seriesData = [];
       let total = parseFloat(this.tjData.caseInfoTotal);
      Object.keys(this.tjData.businessAreaMap).forEach((k) => {
        let num = parseFloat(this.tjData.businessAreaMap[k]);
        let percent =
          total <= 0 ? "0%" : Math.round((num / total) * 10000) / 100.0 + "%";
        let n = k;
        legendData.push(n);
        seriesData.push({
          name: n,
          value: this.tjData.businessAreaMap[k],
        });
      }); */
      debugger;
      let myChart = echarts.init(document.getElementById("vehicleUseChart"));
      myChart.setOption({
        // title: {
        //   text: "车辆使用概况",
        //   left: "left",
        // },
        tooltip: {
          trigger: "item",
          position: "top",
          formatter: "{b} <br/> {d}%({c}辆)",
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          right: 10,
          bottom: 20,
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
    showChart4() {
      let data1 = [
        "未申请",
        "申请中",
        "待颁发",
        "正常",
        "挂失",
        "注销",
        "已年审",
      ];
      let data2 = ["4", "8", "4", "13", "4", "2", "4"];
      /*  let data1 = [];
      let data2 = [];
      Object.keys(this.tjData.cityDivisionMap).forEach((k) => {
        data1.push(k);
        data2.push(this.tjData.cityDivisionMap[k]);
      });*/
      debugger;
      let myChart = echarts.init(document.getElementById("certStateChart"));
      myChart.setOption({
        // title: {
        //   text: "使用证状态",
        //   left: "left",
        // },
        tooltip: {
          trigger: "item",
          position: "top",
          formatter: "{b} : {c}",
        },
        xAxis: {
          type: "category",
          data: data1,
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: false,
          },
        },
        series: [
          {
            data: data2,
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
  },
  created() {
    this.getOidTreeData();
  },
  mounted() {
    this.showChart1();
    this.showChart2();
    this.showChart3();
    this.showChart4();
  },
};
</script>
<style>
.chart-title {
  margin-left: 20px;
  font-size: 18px;
  font-weight: bold;
  height: 40px;
  line-height: 40px;
}
.chart-box {
  width: 500px;
  height: 400px;
}
</style>

