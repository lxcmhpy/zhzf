<template>
  <div class="searchAndpageBox" id="logBox">
    <div class="handlePart">
      <div class="search">
        <el-form :inline="true" :model="logForm"  ref="logForm">
          <!-- <el-row>
            <el-col :span="13"> -->
              <el-form-item label="机构名称" prop="organ">
                <el-input v-model="logForm.organ"></el-input>
              </el-form-item>
              <el-form-item label="功能名称" prop="type">
                <el-input v-model="logForm.type"></el-input>
              </el-form-item>
              <el-form-item label="操作名称" prop="operation">
                <el-input v-model="logForm.operation"></el-input>
              </el-form-item>
              <el-form-item label="操作人" prop="username">
                <el-input v-model="logForm.username"></el-input>
              </el-form-item>
              <el-form-item label="操作日期" >
                <el-form-item prop="createTime1">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="logForm.createTime1"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item prop="createTime2">
                  <el-time-picker
                    placeholder="选择时间"
                    v-model="logForm.createTime2"
                    style="width: 100%;"
                  ></el-time-picker>
                </el-form-item>
              </el-form-item>
            <!-- </el-col> -->
            <!-- <el-col :span="4"> -->
              <el-form-item>
                <el-button type="primary" size="medium" icon="el-icon-search" @click="getLogList">查询</el-button>
                <el-button type="primary" size="medium" @click="resetLog">重置</el-button>
              </el-form-item>
            <!-- </el-col>
          </el-row> -->
        </el-form>
      </div>
    </div>
    <div class="tablePart">
      <el-table :data="tableData" stripe style="width: 100%;height:100%">
        <!-- <el-table-column type="selection" width="55" align="center"></el-table-column>-->
        <el-table-column prop="organ" label="机构名称" align="center"></el-table-column>
        <el-table-column prop="ip" label="IP地址" align="center"></el-table-column>
        <el-table-column prop="type" label="功能名称" align="center"></el-table-column>
        <el-table-column prop="operation" label="操作名称" align="center"></el-table-column>
        <el-table-column prop="username" label="操作人" align="center"></el-table-column>
        <el-table-column prop="createTime" label="时间" align="center"></el-table-column>
      </el-table>
    </div>
    <div class="paginationBox">
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
  </div>
</template>


<script>
export default {
  data() {
    return {
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      tableData: [],
      logForm: {
        organ: "",
        type: "",
        operation: "",
        username: "",
        createTime1: "",
        createTime2: ""
      },
      rules: {
        createTime1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        createTime2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    //表单筛选
    getLogList() {
      let data = {
        organ: this.logForm.organ,
        type: this.logForm.type,
        operation: this.logForm.operation,
        username: this.logForm.username,
        // createTime: this.logForm.createTime1 + " " +this.logForm.createTime2,
        // createTime: this.logForm.createTime2,
        current: this.currentPage,
        size: this.pageSize
      };
      console.log(data);
      this.$store.dispatch("getloglist", data).then(res => {
        this.tableData = res.data.records;
         this.totalPage = res.data.total;
        console.log(res);
      });
      err => {
        console.log(err);
      };
    },

    // 日志重置
    resetLog() {
      this.$refs["logForm"].resetFields();
    },

    //更改每页显示的条数
    handleSizeChange(val) {
      console.log("每页显示的条数", val);
      this.pageSize = val;
      this.getLogList();
    },
    //更换页码
    handleCurrentChange(val) {
      console.log("当前页", val);
      this.currentPage = val;
      this.getLogList();
    }
  },
  mounted() {
    // this.setDepartTable(this.data)
  },
  created() {
    this.getLogList();
  }
};
</script>
<style lang="less">
@import "../../../css/systemManage.less";
</style>