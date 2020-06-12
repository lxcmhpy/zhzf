<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox" id="roleBox">
      <div class="handlePart">
        <div class="search">
          <el-form :inline="true" :model="searchForm" class>
            <el-form-item label="记录时间">
              <el-date-picker v-model="timeList" value-format="yyyy-MM-dd HH:mm:ss" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="业务领域">
              <el-select v-model="searchForm.domain" placeholder="请选择">
                <el-option v-for="item in lawCateList" :key="item.cateId" :label="item.cateName" :value="item.cateName"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="记录类型">
              <el-input v-model="searchForm.title"></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="searchForm.status" placeholder="请选择">
                <el-option label="全部" value=""></el-option>
                <el-option label="暂存" value="暂存"></el-option>
                <el-option label="保存" value="保存"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="记录人">
              <el-input v-model="searchForm.createUser"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search" @click="searchTableData">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search" @click="createLog">生成日志</el-button>
            </el-form-item>
            <el-form-item prop="name" style="float:right;display:inline-block" @click="viewMine()">
              <el-radio v-model="searchForm.name" label="1" @change='changeName()'>只显示我的</el-radio>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="tablePart">
        <el-table :data="tableData" stripe style="width: 100%" height="100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="createTime" label="记录时间" align="center"></el-table-column>
          <el-table-column prop="domain" label="业务领域" align="center"></el-table-column>
          <el-table-column prop="title" label="记录类型" align="center"></el-table-column><!-- 显示模板标题 -->
          <!-- <el-table-column prop="" label="执法机构" align="center"></el-table-column> -->
          <!-- <el-table-column prop="" label="执法人员" align="center"></el-table-column> -->
          <el-table-column prop="createUser" label="记录人" align="center"></el-table-column>
          <!-- <el-table-column prop="" label="交接班" align="center"></el-table-column> -->
          <el-table-column prop="status" label="状态" align="center"></el-table-column>
          <!-- <el-table-column prop="title" label="标题" align="center"></el-table-column> -->
          <el-table-column fixed="right" label="操作" align="center">
            <template slot-scope="scope">
              <!-- <el-button @click="viewRecord(scope.row)" type="text">查看</el-button> -->
              <el-button @click="editRecord(scope.row)" type="text">查看</el-button>
              <el-button type="text" @click="deleteRecord(scope.row.id)" v-if="scope.row.createUser==createUserName">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="paginationBox">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40]" layout="prev, pager, next,sizes,jumper" :total="totalPage"></el-pagination>
      </div>

    </div>
  </div>
</template>
<script>
import { findRecordListApi, removeRecordByIdApi, findRecordModleByIdApi, findRecordModleTimeByIdApi } from "@/api/Record";
import iLocalStroage from "@/common/js/localStroage";
export default {
  data() {
    return {
      tableData: [], //表格数据
      timeList: [],
      multipleSelection: [],
      searchForm: {
        domain: "",
        name: ''
      },
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      lawCateList: [], //业务领域列表
      createUserName: ''
    }
  },
  methods: {
    getTableData() {
      console.log('time,creatUser', this.timeList, this.searchForm.createUser)
      let data = {
        startTime: this.timeList[0],
        endTime: this.timeList[1],
        title: this.searchForm.title,
        status: this.searchForm.status,
        createUser: this.searchForm.createUser,
        domain: this.searchForm.domain,
        current: this.currentPage,
        size: this.pageSize,
        // name: this.dicSearchForm.name
      };
      findRecordListApi(data).then(
        res => {
          console.log(res)
          this.tableData = res.data.records
          this.totalPage = res.data.total
        },
        error => {
          // reject(error);
        })

    },
    // 查询
    searchTableData() {
      this.currentPage = 1;
      this.getTableData()
    },
    // 查询我的
    viewMine() {
      console.log(":", this.searchForm.name)
      if (this.searchForm.name == 1) {
        // this.searchForm.name=''
      }
      // this.searchForm.name=true
      // if (this.searchForm.name == '') {
      //   this.searchForm.createUser = iLocalStroage.gets("userInfo").username;
      // }
      // this.searchTableData()
    },
    changeName() {
      console.log(":", this.searchForm.name)
      this.searchForm.createUser = iLocalStroage.gets("userInfo").username;
      this.searchTableData()

    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getTableData();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTableData();
    },
    //获取业务领域
    getEnforceLawType() {
      let _this = this
      this.$store.dispatch("getEnforceLawType", "1").then(
        res => {
          _this.lawCateList = res.data;
          // console.log('列表121', _this.lawCateList)
        },
        err => {
          console.log(err);
        }
      );
    },
    // 查看
    viewRecord(row) {
      this.$router.push({
        name: 'inspection_writeRecordInfo',
        params: row
      });
    },
    // 修改
    editRecord(row) {
      let _this = this
      let list = []
      console.log('编辑', row)
      findRecordModleTimeByIdApi(row.templateId).then(
        res => {
          if (res.code == 200) {
            console.log('row.createTime <= res.data', row.createTime, res.data)
            if (row.createTime >= res.data) {
              // 写记录
              row.addOrEiditFlag = 'edit'
              this.$router.push({
                name: 'inspection_writeRecordInfo',
                params: row
              });
            } else {
              this.$message.error('当前模板已修改，该记录不可修改');
            }
          } else {
            this.$message.error(res.msg);
          }
        },
        error => {

        })

    },
    // 删除
    deleteRecord(id) {
      console.log('选中的模板', id)
      this.$confirm('确认删除？', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        console.log('删除', id)
        removeRecordByIdApi(id).then(
          res => {
            console.log(res)
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: res.msg
              });
              this.getTableData()
            }
          },
          error => {
            // reject(error);
          })

      })
    },
    // 选择数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log('multipleSelection', this.multipleSelection)
    },
    // 选择数据
    createLog() {
      console.log('multipleSelection', this.multipleSelection)

      if (this.multipleSelection.length == 0) {
        this.$message({ message: '请至少选择一条记录!', type: 'warning' });
      } else {
        this.$message({
          type: "success",
          message: '成功选中，暂未开发'
        });
      }
    }
  },
  mounted() {
    this.createUserName = iLocalStroage.gets("userInfo").username
    this.getTableData();
    this.getEnforceLawType();
  }
}
</script>
<style lang="scss" src="@/assets/css/card.scss"></style>