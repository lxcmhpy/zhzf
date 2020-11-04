<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage toggleBox">
      <el-row>
        <el-col :span="6">
          <div>
            <el-tree
              class="filter-tree"
              :data="organData"
              :props="defaultProps"
              node-key="id"
              default-expand-all
              :expand-on-click-node="false"
              ref="tree"
              @node-click="handleNodeClick"
            >
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>
                  <i
                    :class="data.children ? 'iconfont law-icon_zhan_bag' : ''"
                  ></i>
                  {{ node.label }}
                </span>
              </span>
            </el-tree>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="handlePart">
            <el-form
              :inline="true"
              :model="logForm"
              label-width="100px"
              ref="logForm"
            >
              <el-form-item label="起始年月">
                <el-date-picker
                  v-model="value1"
                  type="monthrange"
                  range-separator="至"
                  start-placeholder="开始月份"
                  end-placeholder="结束月份"
                  value-format="yyyy-MM"
                  :clearable="false"
                ></el-date-picker>
              </el-form-item>

              <el-form-item label=" " label-width="13px">
                <el-button
                  size="medium"
                  icon="iconfont law-sousuo"
                  @click="getData()"
                  >查询</el-button
                >
              </el-form-item>

              <el-form-item label=" " label-width="13px">
                <el-button
                  size="medium"
                  icon="el-icon-setting"
                  v-popover:popover4
                  >列过滤</el-button
                >
              </el-form-item>
            </el-form>
          </div>
          <div class="tablePart">
            <el-popover
              ref="popover4"
              placement="right"
              width="200"
              trigger="click"
            >
              <el-checkbox-group v-model="checkboxVal">
                <el-checkbox label="新增案件量" style="display: block">
                  新增案件量
                </el-checkbox>
                <el-checkbox label="总案件量" style="display: block">
                  总案件量
                </el-checkbox>
                <el-checkbox label="公路路政" style="display: block">
                  公路路政
                </el-checkbox>
                <el-checkbox label="道路运政" style="display: block">
                  道路运政
                </el-checkbox>
                <el-checkbox label="水路运政" style="display: block">
                  水路运政
                </el-checkbox>
                <el-checkbox label="航道行政" style="display: block">
                  航道行政
                </el-checkbox>
                <el-checkbox label="港口行政" style="display: block">
                  港口行政
                </el-checkbox>
                <el-checkbox label="工程质量安全监督" style="display: block">
                  工程质量安全监督
                </el-checkbox>
                <el-checkbox label="海事行政" style="display: block">
                  海事行政
                </el-checkbox>
                <el-checkbox label="综合执法" style="display: block">
                  综合执法
                </el-checkbox>
                <el-checkbox label="其他" style="display: block">
                  其他
                </el-checkbox>
                <el-checkbox label="总结案量" style="display: block">
                  总结案量
                </el-checkbox>
                <el-checkbox label="结案率" style="display: block">
                  结案率
                </el-checkbox>
              </el-checkbox-group>
            </el-popover>
            <el-table
              :key="key"
              :data="tableData"
              row-key="id"
              border
              default-expand-all
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            >
              fit highlight-current-row style="width: 100%" >
              <el-table-column prop="name" label="" width="130" />
              <el-table-column prop="organName" label="机构名称" width="180" />
              <el-table-column
                v-for="fruit in formThead"
                :key="fruit"
                :label="fruit"
              >
                <template slot-scope="scope">
                  {{ scope.row[fruit] }}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>


<script>
import { reportStatisticApi } from "@/api/analysis/analysisManage.js";
const defaultFormThead = [
  "新增案件量",
  "总案件量",
  "其他",
  "总结案量",
  "结案率",
];
export default {
  data() {
    return {
      key: 1, // table key
      formTheadOptions: [
        "新增案件量",
        "总案件量",
        "公路路政",
        "道路运政",
        "水路运政",
        "航道行政",
        "港口行政",
        "工程质量安全监督",
        "海事行政",
        "综合执法",
        "其他",
        "总结案量",
        "结案率",
      ],
      checkboxVal: defaultFormThead, // checkboxVal
      formThead: defaultFormThead, // 默认表头
      value1: [new Date(new Date().getFullYear(), 0), new Date()], //今年1月-至今
      checked: true,
      organData: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      defaultExpandedKeys: [], //默认展开的key
      tableData: [],
      logForm: {
        startTime: "",
        endTime: "",
        organId: JSON.parse(localStorage.getItem("userInfo")).organId,
      },
      isShow: false,
    };
  },
  watch: {
    checkboxVal(valArr) {
      this.formThead = this.formTheadOptions.filter(
        (i) => valArr.indexOf(i) >= 0
      );
      this.key = this.key + 1; // 为了保证table 每次都会重渲
    },
  },
  methods: {
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
          _this.logForm.organId = res.data[0].id;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    //点击树事件
    handleNodeClick(data) {
      this.tableData = [];
      this.logForm.organId = data.id;
      this.getData();
    },

    // 自定义列背景色
    columnStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 0) {
        //第三第四列的背景色就改变了2和3都是列数的下标
        return "background:#f3f6fc;";
      } else {
        return "background:#ffffff;";
      }
    },
    async getData() {
      this.logForm.startTime = this.value1[0];
      this.logForm.endTime = this.value1[1];
      let res = await reportStatisticApi(this.logForm);
      let tableData = [];
      let sumlist = [];
      if (res.data.organ) {
        let organ = res.data.organ;
        organ.name = "本级";
        organ.id = 2;
        organ["结案率"] =
          organ["总案件量"] != 0
            ? ((organ["总结案量"] / organ["总案件量"]) * 100).toFixed(2) + "%"
            : 0;
        tableData.push(organ);
        sumlist.push(organ);
      }
      if (res.data.subOrganList) {
        let sub = {};
        this.getSum(res.data.subOrganList, sub);
        sub.name = "下级汇总";
        sub.id = 3;
        for (let i = 0; i < res.data.subOrganList.length; i++) {
          res.data.subOrganList[i].id = i + 4;
        }
        sub.children = res.data.subOrganList;
        tableData.push(sub);
        sumlist = sumlist.concat(res.data.subOrganList);
      }
      let sum = {};
      this.getSum(sumlist, sum);
      sum.name = "本级汇总";
      sum.id = 1;
      tableData.unshift(sum);
      this.tableData = tableData;
    },
    getSum(list, sum) {
      list.forEach((item) => {
        if (!item["新增案件量"]) item["新增案件量"] = 0;
        if (!item["总案件量"]) item["总案件量"] = 0;
        if (!item["总结案量"]) item["总结案量"] = 0;

        item["结案率"] =
          item["总案件量"] != 0
            ? ((item["总结案量"] / item["总案件量"]) * 100).toFixed(2) + "%"
            : 0;
        Object.keys(item).forEach((k) => {
          if (k !== "organName") {
            if (!sum[k]) sum[k] = 0;
            sum[k] += item[k];
          }
        });
        sum["结案率"] =
          sum["总案件量"] != 0
            ? ((sum["总结案量"] / sum["总案件量"]) * 100).toFixed(2) + "%"
            : 0;
      });
    },
  },
  mounted() {
    this.getAllOrgan();
    this.getData();
  },
  created() {
  },
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
