<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage toggleBox">
      <div class="handlePart">
        <el-form :inline="true" :model="logForm" label-width="100px" ref="logForm">
          <el-form-item label="统计年度" prop>
            <el-date-picker v-model="value3" type="year" placeholder="选择年"></el-date-picker>
          </el-form-item>
        </el-form>
      </div>

      <div id="chartColumn" style="width: 100%; height: 400px;margin-bottom:20px"></div>

      <div class="tablePart">
        <el-table :data="tableData" stripe resizable border style="width: 100%;height:100%;">
          <el-table-column prop="time" label="日期" align="center"></el-table-column>
          <el-table-column prop="lscf" label="路损处罚" align="center"></el-table-column>
          <el-table-column prop="cxcf" label="超限处罚" align="center"></el-table-column>
          <el-table-column prop="slxk" label="涉路许可" align="center"></el-table-column>
          <el-table-column prop="cxxk" label="超限许可" align="center"></el-table-column>
          <el-table-column prop="lspc" label="路损赔偿" align="center"></el-table-column>
          <el-table-column prop="zs" label="总数" align="center"></el-table-column>
        </el-table>
      </div>
      
    </div>
  </div>
</template>


<script>
import echarts from "echarts";
export default {
  data() {
    return {
      value3: "",
      value2: "",
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      tableData: [{
        time: "2018年1-12月",
        lscf: "1714804",
        cxcf: "23473275",
        slxk: "17502999",
        cxxk: "0",
        lspc: "35561880",
        zs: "78252958"
      },{
        time: "2019年1-12月",
        lscf: "968369",
        cxcf: "179100",
        slxk: "8203862",
        cxxk: "0",
        lspc: "18883066",
        zs: "28234397"
      }],
      logForm: {
        organ: "",
        type: "",
        operation: "",
        username: "",
        startTime: "",
        endTime: "",
        dateArray: ""
      },
      isShow: false
    };
  },
  methods: {
    drawLine() {
      this.chartColumn = echarts.init(document.getElementById("chartColumn"));

      this.chartColumn.setOption({
        title: {
          text: "2019年案件罚没款同期对比",
          left: "center"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          left: "center",
          top: "bottom",
          data: ["2018年1-12月", "2019年1-12月"]
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
            data: [
              "路损处罚",
              "超限处罚",
              "涉路许可",
              "超限许可",
              "路损赔偿",
              "总数"
            ]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "2018年1-12月",
            type: "bar",
            data: [1714804, 23473275, 17502999, 0, 35561880, 78252958],
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
          },
          {
            name: "2019年1-12月",
            type: "bar",
            data: [968369, 179100, 8203862, 0, 18883066, 28234397],
            //设置柱子的宽度
            barWidth: 30,
            //配置样式
            itemStyle: {
              //通常情况下：
              normal: {
                color: function(params) {
                  var colorList = ["rgb(25,46,94)"];
                  return colorList[0];
                }
              }
            }
          }
        ]
      });
    },

    //表单筛选
    getLogList(val) {
      this.currentPage = val;
      let data = {
        organ: this.logForm.organ,
        type: this.logForm.type,
        operation: this.logForm.operation,
        username: this.logForm.username,
        startTime: this.logForm.dateArray ? this.logForm.dateArray[0] : "",
        endTime: this.logForm.dateArray ? this.logForm.dateArray[1] : "",
        current: this.currentPage,
        size: this.pageSize
      };
      let _this = this;
      this.$store.dispatch("getloglist", data).then(res => {
        _this.tableData = res.data.records;
        _this.totalPage = res.data.total;
      });
      err => {
        console.log(err);
      };
    },
    //展开
    showSomeSearch() {
      this.isShow = !this.isShow;
    },
    // 日志重置
    reset() {
      this.$refs["logForm"].resetFields();
      this.getLogList();
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getLogList(1);
    },
    //更换页码
    handleCurrentChange(val) {
      this.getLogList(val);
    }
  },
  mounted() {
    this.drawLine();
  },
  created() {
    // this.getLogList();
  }
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
