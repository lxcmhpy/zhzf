<template>
  <div
    class="com_searchAndpageBoxPadding statistics-page"
    style="height: calc(100% - 44px)"
  >
    <div class="searchAndpageBox" style="height: 100%;padding: 0px;">
      <div class="statisticsOrganTree">
        <div class="searchTreeBox">
          <el-input placeholder="输入机构名" v-model="filterText">
            <el-button slot="append" size="mini" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <div class="treeBox">
          <el-tree
            style="font-size: 14px"
            class="filter-tree"
            :data="organData"
            :props="defaultProps"
            node-key="id"
            :filter-node-method="filterNode"
            :default-expanded-keys="defaultExpandedKeys"
            ref="tree"
            @node-click="handleNodeClick"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>
                <i
                  :class="
                    data.children && data.children.length > 0
                      ? 'iconfont law-icon_shou_bag'
                      : ''
                  "
                ></i>
                <span :class="data.children ? '' : 'hasMarginLeft'">{{
                  node.label
                }}</span>
              </span>
            </span>
          </el-tree>
        </div>
      </div>
      <div class="statistics-content">
        <div class="statistics-content-fliter">

          <el-form :inline="true" :model="filterForm" label-width="100px" ref="filterForm">

            <el-form-item label="起始年月" prop>
              <el-date-picker
                v-model="dateArray"
                type="monthrange"
                range-separator="至"
                start-placeholder="开始月份"
                end-placeholder="结束月份"
              ></el-date-picker>
            </el-form-item>
            
            <el-form-item label=" " label-width="13px">
              <el-button size="medium" icon="iconfont law-sousuo" @click="getStatisticsData()">查询</el-button>
            </el-form-item>

          </el-form>
        </div>

        <div class="statistics-content-table">

          <el-table  
              v-loading="loading"
              :data="tableData"
              row-key="id"
              border
              default-expand-all
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            >
            <el-table-column prop="name" label="" min-width="10%" />
            <el-table-column prop="organName" label="机构名称" min-width="15%" />
            <el-table-column prop="newNumber" label="新增巡查日志量" min-width="15%" />
            <el-table-column prop="total" label="总巡查日志量" min-width="15%" />
            <el-table-column prop="inspectionTime" label="巡查时长（小时）" min-width="15%" />
            <el-table-column prop="inspectionLengthTotal" label="巡查里程数（公里）" min-width="15%" />
            <el-table-column prop="finshRate" label="巡查计划完成度" min-width="15%" />
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getChecklogStatisticsApi } from "@/api/supervision";

export default {
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "label",
      },
      defaultExpandedKeys: [], //默认展开的key
      filterText: "",
      organData: [], //所属机构下拉列表值***
      filterForm: {
        organId: JSON.parse(localStorage.getItem("userInfo")).organId,
        startTime: "",
        endTime: ""
      },
      dateArray: [new Date(new Date().getFullYear(), 0), new Date()], //今年1月-至今
      tableData: [],
      loading: false
    };
  },
  components: {},
  created() {
    this.getAllOrgan();
    this.getStatisticsData();
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    //点击树事件
    handleNodeClick(data) {
      this.filterForm.organId = data.id;
      this.getStatisticsData();
    },
    //获取机构
    getAllOrgan() {
      let _this = this;
      this.$store.dispatch("getAllOrgan").then(
        (res) => {
          _this.defaultExpandedKeys.push(res.data[0].id);
          if (res.data[0].children && res.data[0].children.length > 0) {
            res.data[0].children.forEach((item) => {
              _this.defaultExpandedKeys.push(item.id);
            });
          }
          _this.organData = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    getStatisticsData() {
      this.loading = true;
      let startYear = this.dateArray[0].getFullYear()
      let startMonth = this.dateArray[0].getMonth() + 1;
      this.filterForm.startTime = startYear + "-" + startMonth + "-01 00:00:00";

      let endYear = this.dateArray[1].getFullYear();
      let endMonth = this.dateArray[1].getMonth() + 1;
      this.filterForm.endTime = endYear + "-" + endMonth + "-" + new Date(endYear,endMonth,0).getDate() + " 59:59:59";


      const params = JSON.parse(JSON.stringify(this.filterForm));
      getChecklogStatisticsApi(params).then(
        res => {
          // this.tableData =  [res.data];
          const tableData = [];
          let bjhz = {};
          let bj = {};
          let xjhz = {};
          if(res.data.organId){
            bjhz.id = 1;
            bjhz.name = "本级汇总";
            

            bj = res.data;
            bj.name = "本级";
            bj.id = 2;

          }
          if(res.data.sublevel) {
            let total = 0;
            let inspectionLengthTotal = 0;
            let inspectionTime = 0;
            let bindTimeTotal = 0;
            let timeTotal = 0;
            let newNumber = 0;
            total = res.data.sublevel.reduce((total, item) => total + item.total, 0);;
            inspectionLengthTotal = res.data.sublevel.reduce((inspectionLengthTotal, item) => inspectionLengthTotal + item.inspectionLengthTotal, 0);
            inspectionTime = res.data.sublevel.reduce((inspectionTime, item) => inspectionTime + parseFloat(item.inspectionTime), 0);
            bindTimeTotal = res.data.sublevel.reduce((bindTimeTotal, item) => bindTimeTotal + item.bindTimeTotal, 0);
            timeTotal = res.data.sublevel.reduce((timeTotal, item) => timeTotal + item.timeTotal, 0);
            newNumber = res.data.sublevel.reduce((newNumber, item) => newNumber + item.newNumber, 0);

            xjhz = {total,inspectionLengthTotal,inspectionTime,bindTimeTotal,timeTotal,newNumber};

            xjhz.name = "下级汇总";
            xjhz.id = 3;
            xjhz.children = res.data.sublevel;
            xjhz.finshRate = bindTimeTotal == 0 || timeTotal == 0 ? "0" : (bindTimeTotal*100/timeTotal).toFixed(2) + "%";

          }
          bjhz.total = bj.total + xjhz.total || 0;
          bjhz.inspectionLengthTotal = bj.inspectionLengthTotal + xjhz.inspectionLengthTotal || 0;
          bjhz.inspectionTime = parseFloat(bj.inspectionTime) + parseFloat(xjhz.inspectionTime) || 0;
          bjhz.bindTimeTotal = bj.bindTimeTotal + xjhz.bindTimeTotal || 0;
          bjhz.timeTotal = bj.timeTotal + xjhz.timeTotal || 0;
          bjhz.newNumber = bj.newNumber + xjhz.newNumber || 0;
          bjhz.total = bj.total + xjhz.total || 0;
          bjhz.finshRate = bjhz.bindTimeTotal == 0 || bjhz.timeTotal == 0 ? "0" : (bjhz.bindTimeTotal * 100/bjhz.timeTotal).toFixed(2) + "%";

          tableData.push(bjhz);
          tableData.push(bj);
          if(res.data.sublevel && res.data.sublevel.length > 0) tableData.push(xjhz);

          this.tableData = tableData;
          this.loading = false;
        }
      )
    }
  },
};
</script>


<style  lang="scss" scoped>
.statistics-page {
  .statisticsOrganTree {
    width: 20%;
    height: 100%;
    float: left;
    background: #f5f7fb;
    box-sizing: border-box;
    padding: 20px 0 20px 20px;
    border-right: 1px solid #eeeeee;
    .el-input {
      padding-right: 20px;
      box-sizing: border-box;
    }
    .el-tree {
      background: #f5f7fb;
      
    }
    .treeBox {
      overflow-y: auto;
      height: calc(100% - 36px);

      >>> .el-tree-node:focus > .el-tree-node__content {
        background-color: #cee5ff;
      }

    }
    p {
      line-height: 30px;
    }
    .custom-tree-node {
      span {
        i {
          color: #0074f5;
          margin-right: 5px;
        }
      }
      .hasMarginLeft {
        margin-left: 2px;
      }
    }
    .searchTreeBox {
      margin: 10px 0;
      input {
        height: 36px;
      }
      .el-input-group__append {
        padding: 0 15px;
        background: #eee;
      }
    }
  }

  .statistics-content {
    width: 80%;
    height: 100%;
    float: left;

    .statistics-content-fliter {
      padding-top: 20px;
      max-height: 50px;
    }

    .statistics-content-table {
      padding: 10px;
      height: calc(100% - 90px);
    }
  }
}
</style>
