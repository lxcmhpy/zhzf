<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox">
      <div class="handlePart">
        <div class="search">
          <el-form :inline="true" :model="addVersionForm" ref="addVersionFormRef">
                <el-form-item label="版本名称:" prop="appVersion">
                    <el-input v-model="addVersionForm.appVersion"></el-input>
                </el-form-item>
            
                <el-form-item label="版本号:" prop="appVersionCode">
                    <el-input v-model="addVersionForm.appVersionCode"></el-input>
                </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                icon="el-icon-plus"
                size="medium"
                @click="addVersionComPage"
              >新增</el-button>
              <el-button type="info" icon="el-icon-search" size="medium" @click="currentPage = 1 ;getVersion()">查询</el-button>
              <el-button type="primary" size="medium" @click="resetLog">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="tablePart" >
        <el-table
          :data="tableData"
          stripe
          style="width: 100%;height:100%;"
          @selection-change="selectUser"
        >
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column prop="appVersion" label="版本名称" align="center"></el-table-column>
          <el-table-column prop="appVersionCode" label="版本号" align="center"></el-table-column>
          <el-table-column prop="appUpgrade" label="下载地址" align="center"></el-table-column>
          <el-table-column prop="appForcedUpgrade" label="是否强制更新" align="center" :formatter = "format"></el-table-column>
          <el-table-column prop="createTime" label="更新时间" align="center"></el-table-column>
          <el-table-column prop="modifyId" label="操作人" align="center"></el-table-column>
          <el-table-column prop="modifyTime" label="操作日期" align="center"></el-table-column>
          <el-table-column prop="appMessage" label="更新内容" align="center"></el-table-column>
          <el-table-column prop="opt" label="操作项" align="center">
            <template slot-scope="scope">
              <el-button @click="editVersion1(scope.row)" type="text">查看</el-button>
              <el-button @click="editVersion(scope.row)" type="text">修改</el-button>
              <el-button type="text" @click="deleteVersionById(scope.row)">删除</el-button>
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
    <addVersionComp ref="addVersionCompRef" @getVersionList="getVersion"></addVersionComp>
  </div>
</template>
<script>
import addVersionComp from "./addVersion";
export default {
  data() {
    return {
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      tableData: [],
       addVersionForm: {
                appVersion: "",//版本名称
                appVersionCode:"",  //版本号
                appMessage: "",//更新内容
                appUpgrade:"", //下载地址
                appForcedUpgrade: "",  //是否强制跟新  0：否  1：是
              
            },
    };
  },
  components: {
    //新增组件
    addVersionComp
  },
  methods: {
    //修改人员信息
    editVersion(row) {
      this.$refs.addVersionCompRef.showModal(2, row);
    },
    editVersion1(row) {
      this.$refs.addVersionCompRef.showModal(3, row);
    },
    //根据id删除单个人员信息
    deleteVersionById(row) {
      let _this = this;
      let data={
        appId:row.appId
      }
      _this
        .$confirm("确定要删除该条记录吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          iconClass: "el-icon-question",
          customClass: "custom-confirm"
        })
        .then(() => {
          _this.$store
            .dispatch("deleteVersionModel", data)
            .then(
              res => {
                _this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                //重新加载页面数据
                _this.getVersion();
              },
              err => {
                console.log(err);
              }
            );
        })
        .catch(() => {});
    },
     //性别转换
    format(row, column) {
      if (row.appForcedUpgrade === '0') {
        return '否'
      } else if (row.appForcedUpgrade === '1') {
        return '是'
      } 
    },
    //删除所选择的用户信息
    deleteVersion() {
      let _this = this;
      this.$confirm("确定要删除所选的人员吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        iconClass: "el-icon-question",
        customClass: "custom-confirm"
      })
        .then(() => {
          _this.$store
            .dispatch("deleteVersionByIdMoudle", _this.selectDataIdList)
            .then(
              res => {
                _this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                //重新加载页面数据
                _this.getVersion();
              },
              err => {
                console.log(err);
              }
            );
        })
        .catch(() => {});
    },
    addVersionComPage() {
      this.$refs.addVersionCompRef.showModal(1, "");
    },
    //条件查询
    getVersion() {
      let _this = this;
      let data = {
        appVersion: _this.addVersionForm.appVersion,
        appVersionCode: _this.addVersionForm.appVersionCode,
        current: _this.currentPage,
        size: _this.pageSize
      };
      _this.$store.dispatch("getVersionModel", data).then(res => {
        _this.tableData = res.data.records;
        _this.totalPage = res.data.total;
      });
      err => {
        console.log(err);
      };
    },
    // 重置
    resetLog() {
      this.$refs["addVersionFormRef"].resetFields();
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getVersion();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getVersion();
    },
    //获取选中的user
    selectUser(val) {
      this.selectDataIdList = [];
      val.forEach((item, index) => {
        this.selectDataIdList.push(item.VersionId);
      });
    }
  },
  created() {
    this.getVersion();
  }
};
</script>
<style lang="scss">
@import "@/assets/css/personManage.scss";
</style>
