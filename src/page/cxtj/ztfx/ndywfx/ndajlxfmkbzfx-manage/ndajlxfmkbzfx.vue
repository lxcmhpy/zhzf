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
          <el-table-column prop="time" label="案件类型" align="center"></el-table-column>
          <el-table-column prop="lscf" label="路损处罚" align="center"></el-table-column>
          <el-table-column prop="cxcf" label="超限处罚" align="center"></el-table-column>
          <el-table-column prop="slxk" label="涉路许可" align="center"></el-table-column>
          <el-table-column prop="cxxk" label="超限许可" align="center"></el-table-column>
          <el-table-column prop="lspc" label="路损赔偿" align="center"></el-table-column>
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
        time: "2019年1-12月",
        lscf: "96.83",
        cxcf: "17.91",
        slxk: "820.38",
        cxxk: "0.0",
        lspc: "1888.3",
      },{
        time: "所占比重(%)",
        lscf: "3.4%",
        cxcf: "0.6%",
        slxk: "29.1%",
        cxxk: "0.0%",
        lspc: "66.9%",
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
          text: "2019年度各类收缴费用金额及所占比重(万元)",
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
            "路损处罚",
            "超限处罚",
            "涉路许可",
            "超限许可",
            "路损赔偿",
          ]
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: [
              { value: 96.83, name: "路损处罚" },
              { value: 17.91, name: "超限处罚" },
              { value: 820.38, name: "涉路许可" },
              { value: 0.0, name: "超限许可" },
              { value: 1888.3, name: "路损赔偿" },
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
