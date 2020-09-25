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

      <div id="chartColumn" style="width: 100%; height: 500px;margin-bottom:20px"></div>

      <div class="tablePart">
        <el-table :data="tableData" stripe resizable border style="width: 100%;height:100%;">
          <el-table-column prop="gllz" label="公路路政" align="center"></el-table-column>
          <el-table-column prop="dlyz" label="道路运政" align="center"></el-table-column>
          <el-table-column prop="slyz" label="水路运政" align="center"></el-table-column>
          <el-table-column prop="hdxz" label="航道行政" align="center"></el-table-column>
          <el-table-column prop="gkxz" label="港口行政" align="center"></el-table-column>
          <el-table-column prop="hsxz" label="海事行政" align="center"></el-table-column>
           <el-table-column prop="gczlaqjd" label="工程质量安全监督" align="center"></el-table-column>
            <el-table-column prop="qt" label="其他" align="center"></el-table-column>
             <el-table-column prop="zhzf" label="综合执法" align="center"></el-table-column>
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
        gllz: "20",
        dlyz: "30",
        slyz: "40",
        hdxz: "10",
        gkxz: "30",
        hsxz: "20",
        gczlaqjd:"10",
        qt:"30",
        zhzf:"20",
      },],
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
          text: "2019年度收缴费用金额及所占比重(万元)",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          left: "center",
          top: "bottom",
          data: [
           "公路路政",
            "道路运政",
            "水路运政",
            "航道行政",
            "港口行政",
            "海事行政",
            "工程质量安全监督",
            "其他",
            "综合执法",
          ]
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: [
              { value: 20, name: "公路路政" },
              { value: 30, name: "道路运政" },
              { value: 40, name: "水路运政" },
              { value: 10, name: "航道行政" },
              { value: 30, name: "港口行政" },
              { value: 20, name: "海事行政" },
              { value: 10, name: "工程质量安全监督" },
              { value: 30, name: "其他" },
              { value: 20, name: "综合执法" },
            ],
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
