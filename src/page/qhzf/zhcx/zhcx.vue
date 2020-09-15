<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage toggleBox">
      <div class="handlePart">
        <el-form :inline="true" :model="logForm" label-width="100px" ref="logForm">
          <el-form-item label="数据来源" prop>
            <el-select size="small" v-model="state" placeholder="请选择数据来源">
              <el-option label="全国数据" value></el-option>
              
            </el-select>
          </el-form-item>
          <el-form-item label="业户名称" prop>
            <el-input v-model="name" size="small" placeholder="请输入业户名称"></el-input>
          </el-form-item>
          <el-form-item label="经营许可证号" prop>
            <el-input v-model="name" size="small" placeholder="请输入经营许可证号"></el-input>
          </el-form-item>
          <el-form-item label=" " label-width="13px">
            <el-button size="small" type="warning" @click="refreshList">搜索</el-button>
            <el-button size="small" type="success" @click="refreshList">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="tablePart">
        <el-tabs type="border-card">
          <el-tab-pane label="业户信息">
            <div>
              <section>
                <el-table
                  :show-header="false"
                  :data="tableData"
                  :span-method="objectSpanMethod"
                  border
                  :cell-style="columnStyle"
                  style="width: 100%; margin-top: 0px"
                >
                  <el-table-column width="180" prop="name"></el-table-column>
                  <el-table-column prop="amount1"></el-table-column>
                  <el-table-column width="180" prop="amount2"></el-table-column>
                  <el-table-column prop="amount3"></el-table-column>
                </el-table>
              </section>
            </div>
          </el-tab-pane>
          <el-tab-pane label="车辆信息">
            <div>
              <section>
                <el-table
                  :show-header="false"
                  :data="tableData2"
                  :span-method="objectSpanMethod"
                  border
                  :cell-style="columnStyle"
                  style="width: 100%; margin-top: 0px"
                >
                  <el-table-column width="180" prop="name"></el-table-column>
                  <el-table-column prop="amount1"></el-table-column>
                  <el-table-column width="180" prop="amount2"></el-table-column>
                  <el-table-column prop="amount3"></el-table-column>
                </el-table>
              </section>
            </div>
          </el-tab-pane>
          <el-tab-pane label="人员信息">
            <div>
              <section>
                <el-table
                  :show-header="false"
                  :data="tableData3"
                  :span-method="objectSpanMethod"
                  border
                  :cell-style="columnStyle"
                  style="width: 100%; margin-top: 0px"
                >
                  <el-table-column width="180" prop="name"></el-table-column>
                  <el-table-column prop="amount1"></el-table-column>
                  <el-table-column width="180" prop="amount2"></el-table-column>
                  <el-table-column prop="amount3"></el-table-column>
                </el-table>
              </section>
            </div>
          </el-tab-pane>
          <el-tab-pane label="船舶信息">
            <div>
              <section>
                <el-table
                  :show-header="false"
                  :data="tableData4"
                  :span-method="objectSpanMethod"
                  border
                  :cell-style="columnStyle"
                  style="width: 100%; margin-top: 0px"
                >
                  <el-table-column width="180" prop="name"></el-table-column>
                  <el-table-column prop="amount1"></el-table-column>
                  <el-table-column width="180" prop="amount2"></el-table-column>
                  <el-table-column prop="amount3"></el-table-column>
                </el-table>
              </section>
            </div>
          </el-tab-pane>
          <el-tab-pane label="案件信息">
            <div>
              <section>
                <el-table
                  :show-header="false"
                  :data="tableData5"
                  :span-method="objectSpanMethod"
                  border
                  :cell-style="columnStyle"
                  style="width: 100%; margin-top: 0px"
                >
                  <el-table-column width="180" prop="name"></el-table-column>
                  <el-table-column prop="amount1"></el-table-column>
                  <el-table-column width="180" prop="amount2"></el-table-column>
                  <el-table-column prop="amount3"></el-table-column>
                </el-table>
              </section>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      value3: "",
      value2: "",
      value1: "",
      checked: true,
      dataForm: {},
      logForm: {
        organ: "",
        type: "",
        operation: "",
        username: "",
        startTime: "",
        endTime: "",
        dateArray: ""
      }
    };
  },
  computed: {
    //因为数据用到了dataform中的数据，所以写在了computed中
    tableData() {
      return [
        {
          name: "业户姓名",
          amount1: this.dataForm.id,
          amount2: "业户地址",
          amount3: this.dataForm.createDate
        },
        {
          name: "电话/手机",
          amount1: this.dataForm.nickName,
          amount2: "初次发证日期",
          amount3: this.dataForm.phone
        },
        {
          name: "经营许可证号",
          amount1: this.dataForm.gradeName,
          amount2: "发证机构名称",
          amount3: this.dataForm.gradeCode
        },
        {
          name: "许可证状态",
          amount1: this.dataForm.channel,
          amount2: "有效期起止日期",
          amount3: this.dataForm.provinceName
        },
        {
          name: "户籍地运管机构",
          amount1: this.dataForm.channel,
          amount2: "业户经营范围",
          amount3: this.dataForm.provinceName
        }
      ];
    },
     tableData2() {
      return [
        {
          name: "车牌号",
          amount1: this.dataForm.id,
          amount2: "车牌颜色",
          amount3: this.dataForm.createDate
        },
        {
          name: "车辆类型",
          amount1: this.dataForm.nickName,
          amount2: "品牌",
          amount3: this.dataForm.phone
        },
        {
          name: "道路运输证号",
          amount1: this.dataForm.gradeName,
          amount2: "发证机构名称",
          amount3: this.dataForm.gradeCode
        },
        {
          name: "道路运输证状态",
          amount1: this.dataForm.channel,
          amount2: "有效期起止日期",
          amount3: this.dataForm.provinceName
        },
        // {
        //   name: "户籍地运管机构",
        //   amount1: this.dataForm.channel,
        //   amount2: "业户经营范围",
        //   amount3: this.dataForm.provinceName
        // }
      ];
    },
     tableData3() {
      return [
        {
          name: "执法人员姓名",
          amount1: this.dataForm.id,
          amount2: "执法证号",
          amount3: this.dataForm.createDate
        },
        {
          name: "电话/手机",
          amount1: this.dataForm.nickName,
          amount2: "初次发证日期",
          amount3: this.dataForm.phone
        },
        {
          name: "经营许可证号",
          amount1: this.dataForm.gradeName,
          amount2: "发证机构名称",
          amount3: this.dataForm.gradeCode
        },
        {
          name: "许可证状态",
          amount1: this.dataForm.channel,
          amount2: "有效期起止日期",
          amount3: this.dataForm.provinceName
        },
        {
          name: "户籍地运管机构",
          amount1: this.dataForm.channel,
          amount2: "业户经营范围",
          amount3: this.dataForm.provinceName
        }
      ];
    },
     tableData4() {
      return [
        {
          name: "船舶编号",
          amount1: this.dataForm.id,
          amount2: "船舶类型",
          amount3: this.dataForm.createDate
        },
        {
          name: "电话/手机",
          amount1: this.dataForm.nickName,
          amount2: "初次发证日期",
          amount3: this.dataForm.phone
        },
        {
          name: "经营许可证号",
          amount1: this.dataForm.gradeName,
          amount2: "发证机构名称",
          amount3: this.dataForm.gradeCode
        },
        {
          name: "许可证状态",
          amount1: this.dataForm.channel,
          amount2: "有效期起止日期",
          amount3: this.dataForm.provinceName
        },
        {
          name: "户籍地运管机构",
          amount1: this.dataForm.channel,
          amount2: "业户经营范围",
          amount3: this.dataForm.provinceName
        }
      ];
    },
     tableData5() {
      return [
        {
          name: "案件编号",
          amount1: this.dataForm.id,
          amount2: "当事人姓名",
          amount3: this.dataForm.createDate
        },
        {
          name: "案件来源",
          amount1: this.dataForm.nickName,
          amount2: "案发时间",
          amount3: this.dataForm.phone
        },
        {
          name: "案件类型",
          amount1: this.dataForm.gradeName,
          amount2: "案发地点",
          amount3: this.dataForm.gradeCode
        },
        {
          name: "许可证状态",
          amount1: this.dataForm.channel,
          amount2: "有效期起止日期",
          amount3: this.dataForm.provinceName
        },
        // {
        //   name: "户籍地运管机构",
        //   amount1: this.dataForm.channel,
        //   amount2: "业户经营范围",
        //   amount3: this.dataForm.provinceName
        // }
      ];
    }
  },

  methods: {
    // 自定义列背景色
    columnStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 0 || columnIndex == 2) {
        //第三第四列的背景色就改变了2和3都是列数的下标
        return "background:#f3f6fc;";
      } else {
        return "background:#ffffff;";
      }
    },
    // 和并列
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // if (columnIndex === 0) {
      //   if (rowIndex % 4 === 0) {
      //     return {
      //       rowspan: 4,
      //       colspan: 1
      //     };
      //   } else {
      //     return {
      //       rowspan: 0,
      //       colspan: 0
      //     };
      //   }
      // }
    }
  },
  mounted() {},
  created() {}
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
