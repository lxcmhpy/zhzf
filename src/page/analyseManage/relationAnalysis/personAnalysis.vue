<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox searchAndpageBox2">
      <div class="handlePart">
        <el-form :inline="true" :model="logForm" label-width="70px" ref="logForm">
          <el-form-item label="执法机构" prop>
            <elSelectTree
              ref="elSelectTreeObj1"
              :options="tableDataTree"
              :accordion="true"
              :props="{label: 'label', value: 'id'}"
              @getValue="hindleChanged1"
            ></elSelectTree>
          </el-form-item>
        </el-form>
      </div>
      <el-row :gutter="20" style="min-height: 50%">
        <el-col :span="12" style="height: 100%">
          <el-card class="box-card">
            <div id="chart2" class="chart-box"></div>
          </el-card>
        </el-col>
        <el-col :span="12" style="height: 100%">
          <el-card class="box-card">
            <div id="chart3" class="chart-box"></div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top:20px;min-height: 50%">
        <el-col :span="12" style="height: 100%">
          <el-card class="box-card">

            <div id="chart4" class="chart-box"></div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card" style="height: 100%">

            <div id="chart5" class="chart-box"></div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>


<script>
  import echarts from "echarts";
  import {
    countDevice,
    countDeviceType,
    countUsePer,
    countVehicle,
  } from "@/api/device/statistic.js";
  import elSelectTree from "@/components/elSelectTree/elSelectTree";
  import {personApi} from '@/api/analysis/analysisManage.js'

  export default {
    components: {elSelectTree},
    data() {
      return {
        logForm:{},
        organizationId: '',
        tableDataTree: [],
        state: '',
      };
    },
    methods: {
      getData(data) {
        let param = {
          organId: data
        };
        personApi(param).then(res => {
          if (res.code == 200) {
            this.chartFun('chart2','年龄段组成',res.data.age);
            this.chartFun('chart3','性别组成',res.data.sex)
            this.chartFun('chart4','学历组成',res.data.education)
            this.chartFun('chart5','职称组成',res.data.post)
          }
        });
        err => {
          console.log(err);
        };
      },
      // 获取机构树
      getOidTreeData() {
        let _this = this;
        _this.$store.dispatch("findOrganTreeByCurrUser").then(
          (res) => {
            ;
            _this.tableDataTree = res.data;
          },
          (err) => {
            console.log(err);
          }
        );
      },
      hindleChanged1(val) {
        this.$refs.elSelectTreeObj1.$children[0].handleClose();
        this.getData(val)
      },
      chartFun(id,name,data) {
        this.chartColumn = echarts.init(document.getElementById(id));
        this.chartColumn.setOption({
          title: {
            text: name,
            left: "center"
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          series: [
            {
              name: "",
              type: "pie",
              radius: "75%",
              center: ["50%", "60%"],
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
      },
    },
    mounted() {
      this.getData(JSON.parse(localStorage.getItem('userInfo')).organId)
    },
    created() {
      this.getOidTreeData();
    },
  };
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
<style scoped>
  .box-card {
    min-height: 50%;
  }

  .chart-box {
    width: 500px;
    height: 350px;
  }
</style>
