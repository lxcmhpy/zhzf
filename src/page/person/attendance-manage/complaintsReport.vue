<template>
<!-- 投诉举报记录管理 -->
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage">
      <div class="handlePart">
        <el-form
          class="search-form"
          :inline="true"
          :model="searchForm"
          label-width="68px"
          ref="searchFormRef"
        >
          <div>
            <div class="item">
              <el-form-item label="姓名" prop="personName">
                <el-input v-model="searchForm.personName"></el-input>
              </el-form-item>
              <el-form-item label="执法证号" prop="ministerialNo">
                <el-input v-model="searchForm.ministerialNo"></el-input>
              </el-form-item>
              <el-form-item style="margin-top:1px; margin-left: 15px;">
                <el-button
                  title="搜索"
                  class="commonBtn searchBtn"
                  size="medium"
                  icon="iconfont law-sousuo"
                  @click="currentPage = 1 ;getComplaintsList()"
                ></el-button>
                <el-button
                  title="重置"
                  class="commonBtn searchBtn"
                  size="medium"
                  icon="iconfont law-zhongzhi"
                  @click="resetLog"
                ></el-button>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <div class="tableHandle">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="medium"
          @click="editComplaints('add')"
        >新增</el-button>
        <el-button type="info" icon="el-icon-delete-solid" size="medium">删除</el-button>
      </div>
      <div class="tablePart">
        <el-table
          :data="tableData"
          resizable
          stripe
          class="person-table"
          v-loading="tableLoading"
          element-loading-spinner="car-loading"
          element-loading-text="加载中..."
          style="width: 100%;height:100%;"
          @selection-change="selectUser"
        >
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column prop="personName" label="姓名" align="center" min-width="100px"></el-table-column>
          <el-table-column prop="idNo" label="执法证号" align="center" min-width="140px"></el-table-column>
          <el-table-column prop="oname" label="执法门类" align="center"></el-table-column>
          <el-table-column prop="postName" label="所在单位" align="center"></el-table-column>
          <el-table-column prop="stationName" label="被投诉次数" align="center"></el-table-column>
          <el-table-column prop="opt" label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="editComplaints('edit', scope.row)">
                <i class="iconfont law-eye" />
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="paginationBox">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          background
          :page-sizes="[10, 20, 30, 40, 50]"
          layout="prev, pager, next,sizes,jumper"
          :total="totalPage"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      searchForm: {
        personName: "", //姓名
        ministerialNo: "" //执法证号
      },
      tableData: [
        {
          personName: '张三',
          idNo: '640321199008101710',
          oname: '道路运政',
          postName: '交通厅',
          stationName: '2'
        }
      ],
      selectUserIdList: [],
      currentPage: 0,
      pageSize: 10,
      totalPage: 0,
      tableLoading: false
    };
  },
  components: {  },
  created(){},
  methods: {
    // 根据查询条件查询举报记录列表
    getComplaintsList() {
      let data = {
        personName: this.searchForm.personName,
        ministerialNo: this.searchForm.ministerialNo,
        current: this.currentPage,
        size: this.pageSize
      };
    },
    // 编辑投诉信息
    editComplaints(type, row){
      if (!this.selectUserIdList.length) {
        this.$message.warning("请选择人员");
        return false;
      } else if (this.selectUserIdList.length > 1) {
        this.$message.warning("每次只能选择1名人员");
        return false;
      } else {
        this.$router.push({
          name: 'personComplaintsReportDetail'
        })
      }
    },
    // 删除所选择的用户信息
    deletePerson() {
      if (!this.selectUserIdList.length) {
        this.$message.warning("请选择人员");
        return false;
      } else if (this.selectUserIdList.length > 1) {
        this.$message.warning("每次只能选择1名人员");
        return false;
      } else {
        this.$confirm("确定要删除吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          iconClass: "el-icon-question",
          customClass: "custom-confirm"
        })
          .then(() => {
            console.log('删除人员');
          })
          .catch(() => {});
      }
    },
    // 日志重置
    resetLog() {
      this.$refs["searchFormRef"].resetFields();
      this.currentPage = 1;
      this.getComplaintsList();
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getComplaintsList();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getComplaintsList();
    },
    // 获取选中的user
    selectUser(val) {
      this.selectUserIdList = val;
    //   val.forEach((item, index) => {
    //     this.selectUserIdList.push(item.personId);
    //     this.selectList.push(item.stationStatusName);
    //   });
    }
  }
};
</script>

<style  lang="scss" scoped>
@import "@/assets/css/searchPage.scss";
@import "@/assets/css/personManage.scss";
.search-form {
  >>> .el-input,
  >>> .el-select {
    width: 180px;
    margin-right: 0;
  }
}
>>> .el-select {
  margin-right: 0;
}
.person-table {
  >>> .el-table__body-wrapper {
    padding-bottom: 0;
  }
}
.tableHandle {
  margin-bottom: 10px;
}
</style>
