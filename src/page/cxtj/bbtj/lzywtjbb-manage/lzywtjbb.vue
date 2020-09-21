<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage toggleBox">
      <div class="handlePart">
        <el-form :inline="true" :model="logForm" label-width="100px" ref="logForm">
          <el-form-item label prop>
            <el-button size="medium" icon="el-icon-circle-plus" @click="add()">新增</el-button>
          </el-form-item>
          <el-form-item label prop>
            <el-button size="medium" icon="el-icon-edit" @click="getLogList(1)">查看</el-button>
          </el-form-item>
          <el-form-item label prop>
            <el-button size="medium" icon="el-icon-upload2" @click="getLogList(1)">上报</el-button>
          </el-form-item>
          <el-form-item label prop>
            <el-button size="medium" icon="iconfont law-sousuo" @click="getLogList(1)">查看汇总报表</el-button>
          </el-form-item>
          <el-form-item label="年份" prop>
            <el-date-picker v-model="value3" type="year" placeholder="选择年"></el-date-picker>
          </el-form-item>
          <el-form-item label="月份">
            <el-date-picker v-model="value2" type="month" value-format="M" placeholder="选择月"></el-date-picker>
          </el-form-item>
          <el-form-item label=" " label-width="13px">
            <el-button size="medium" icon="iconfont law-sousuo" @click="getLogList(1)">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="tablePart">
        <el-table :data="tableData" stripe resizable border style="width: 100%;height:100%;">
          <el-table-column prop="tbdw" label="填报单位" align="center"></el-table-column>
          <el-table-column prop="zt" label="状态" align="center"></el-table-column>
          <el-table-column prop="nd" label="年度" align="center"></el-table-column>
          <el-table-column prop="yd" label="月度" align="center"></el-table-column>
          <el-table-column prop="tbr" label="填报人" align="center"></el-table-column>
          <el-table-column prop="tbri" label="填报日期" align="center"></el-table-column>
          <el-table-column prop="sbr" label="上报人" align="center"></el-table-column>
          <el-table-column prop="sbrq" label="上报日期" align="center"></el-table-column>
        </el-table>
      </div>
      <div class="paginationBox" v-show="totalPage">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          background
          :page-sizes="[10, 20, 30, 40]"
          layout="prev, pager, next,sizes,jumper"
          :total="totalPage"
        ></el-pagination>
      </div>

      <el-dialog
        :title="dialogTitle"
        :visible.sync="isShowDialog"
        :close-on-click-modal="false"
        @close="closeDialog"
        width="35%"
      >
        <el-form
          :model="addItemObj"
          :rules="rules"
          ref="addItemObj"
          class="errorTipForm"
          label-width="100px"
        >
          <div class="item">
            <el-form-item label="填报单位" prop="icon">
              <el-input ref="icon" v-model="addItemObj.icon"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="状态" prop="name">
              <el-input ref="name" v-model="addItemObj.name"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="年度" prop="title">
              <el-input ref="title" v-model="addItemObj.title"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="月度" prop="url">
              <el-input v-model="addItemObj.url"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="填报人" prop="path">
              <el-input ref="path" v-model="addItemObj.path"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="填报日期" prop="permTypes">
              <el-input ref="permTypes" v-model="addItemObj.permTypes"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="上报人" prop="path">
              <el-input ref="path" v-model="addItemObj.path"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="上报日期" prop="component">
              <el-input ref="component" v-model="addItemObj.component"></el-input>
            </el-form-item>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="isShowDialog = false">取 消</el-button>
          <el-button type="primary" @click="sureAdd">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      value3: "",
      value2: "",
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      tableData: [
        {
          tbdw:'银川路政管理局',
          zt:'已上报',
          nd:'2019',
          yd:'7',
          tbr:'刘新',
          tbri:'2019-07-02',
          sbr:'刘新',
          sbrq:'2019-07-02',
        },{
          tbdw:'中卫路政管理局',
          zt:'未填报',
          nd:'2019',
          yd:'8',
          tbr:'',
          tbri:'',
          sbr:'',
          sbrq:'',
        }
      ],
      dialogTitle: "",
      isShowDialog: false,
      logForm: {
        organ: "",
        type: "",
        operation: "",
        username: "",
        startTime: "",
        endTime: "",
        dateArray: ""
      },
      addItemObj: {
        pLevel: "",
        permTypes: "",
        id: "",
        parentId: "",
        name: "",
        showAlways: "",
        type: "",
        title: "",
        path: "",
        component: "",
        icon: "",
        url: "",
        buttonType: [],
        sortOrder: ""
      },
      logType: [
        {
          value: null,
          label: "全部"
        },
        {
          value: 0,
          label: "操作日志"
        },
        {
          value: 1,
          label: "登录日志"
        }
      ],
      isShow: false
    };
  },
  methods: {
    //新增
    add() {
      this.dialogTitle = "新增";
      this.isShowDialog = true;
      let _this = this;
      setTimeout(() => {
        // _this.$refs.elSelectTreeObj.clearHandle()
      });
    },
    closeDialog() {
      this.$nextTick(() => {
        this.$refs["addItemObj"].resetFields();
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
    // this.setDepartTable(this.data)
  },
  created() {
    // this.getLogList();
  }
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
