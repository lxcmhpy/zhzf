<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox" id="roleBox">
      <div class="handlePart">
        <div class="search toggleBox">
          <div
            class="handlePart caseHandleSearchPart"
            :class="isShow ? 'autoHeight' : 'aaa'"
          >
            <el-form :inline="true" :model="searchForm" class ref="searchForm">
              <el-form-item label="记录时间" prop="timeList">
                <el-date-picker
                  v-model="timeList"
                  :clearable="false"
                  format="yyyy-MM-dd HH:mm"
                  value-format="yyyy-MM-dd HH:mm"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="业务领域" prop="domain">
                <el-select v-model="searchForm.domain" placeholder="请选择">
                  <el-option
                    v-for="item in lawCateList"
                    :key="item.cateId"
                    :label="item.cateName"
                    :value="item.cateName"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="模板标题" prop="title">
                <el-input
                  v-model="searchForm.title"
                  placeholder="请输入模板名称"
                ></el-input>
              </el-form-item>
              <el-form-item label="数据范围" prop="currentOrgan">
                <el-select
                  v-model="searchForm.currentOrgan"
                  placeholder="请选择"
                  @change="changStatus"
                >
                  <el-option label="本机构" value="1"></el-option>
                  <el-option label="本机构及子机构" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div class="search-btns">
              <el-button
                size="medium"
                class="commonBtn searchBtn"
                title="搜索"
                icon="iconfont law-sousuo"
                @click="searchTableData()"
              ></el-button>
              <el-button
                size="medium"
                class="commonBtn searchBtn"
                title="重置"
                icon="iconfont law-zhongzhi"
                @click="resetSearchData('searchForm')"
              ></el-button>
              <el-button
                size="medium"
                class="commonBtn toogleBtn"
                :title="isShow ? '点击收缩' : '点击展开'"
                :icon="isShow ? 'iconfont law-top' : 'iconfont law-down'"
                @click="isShow = !isShow"
              >
              </el-button>
            </div>
          </div>
        </div>
      </div>
      <div></div>
      <div class="handlePart">
        <div class="search" style="width: 100%">
          <el-form :inline="true">
            <el-form-item>
              <el-button
                type="primary"
                size="medium"
                @click="exportMethod('记录统计表.xls')"
                >导出</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="tablePart">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%"
          height="100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
            prop="createTime"
            label="记录时间"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="domain"
            label="业务领域"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="title"
            label="模板标题"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="createUser"
            label="记录人"
            align="center"
          ></el-table-column>
          <!-- <el-table-column prop="currentOrgan" label="状态" align="center"></el-table-column> -->
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
  </div>
</template>
<script>
import {
  findRecordLogListApi,
  excelExportRecordLogListApi,
} from "@/api/inspection";
import iLocalStroage from "@/common/js/localStroage";
export default {
  data() {
    return {
      tableData: [], //表格数据
      timeList: [],
      multipleSelection: [],
      searchForm: {
        domain: "",
        currentOrgan: "1",
        createUser: iLocalStroage.gets("userInfo").nickName,
        title: "", //模板标题
        name: "",
      },

      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      lawCateList: [], //业务领域列表
      createUserName: "",
      isShow: false,
    };
  },
  methods: {
    // 导出
    exportMethod(fileName) {
      let data = {
        startTime: this.timeList[0],
        endTime: this.timeList[1],
        title: this.searchForm.title,
        currentOrgan: this.searchForm.currentOrgan,
        createUser: this.searchForm.name == "1",
        userId:
          this.searchForm.currentOrgan == "保存" &&
          this.searchForm.title == "" &&
          this.searchForm.domain == "" &&
          this.timeList.length == 0
            ? ""
            : iLocalStroage.gets("userInfo").id,
        domain: this.searchForm.domain,
        current: this.currentPage,
        size: this.pageSize,
        organId: iLocalStroage.gets("userInfo").organId,
        organName: iLocalStroage.gets("userInfo").organName,
      };
      excelExportRecordLogListApi(data)
        .then((res) => {
          //浏览器兼容，Google和火狐支持a标签的download，IE不支持
          //其他浏览器
          let link = document.createElement("a"); // 创建a标签
          link.style.display = "none";
          link.setAttribute("download", fileName); //必须要重命名
          let objectUrl = URL.createObjectURL(res);
          link.href = objectUrl;
          link.click();
          URL.revokeObjectURL(objectUrl);
        })
        .catch((err) => {
          console.log(err);
          throw new Error(err);
        });
    },
    // 查询列表时
    getTableData() {
      //   console.log("time,creatUser", this.timeList, this.searchForm.createUser);
      let data = {
        startTime: this.timeList[0],
        endTime: this.timeList[1],
        title: this.searchForm.title,
        currentOrgan: this.searchForm.currentOrgan,
        createUser: this.searchForm.name == "1",
        userId:
          this.searchForm.currentOrgan == "保存" &&
          this.searchForm.title == "" &&
          this.searchForm.domain == "" &&
          this.timeList.length == 0
            ? ""
            : iLocalStroage.gets("userInfo").id,
        domain: this.searchForm.domain,
        current: this.currentPage,
        size: this.pageSize,
        organId: iLocalStroage.gets("userInfo").organId,
      };
      console.log("getTableData -> data", data);
      findRecordLogListApi(data).then(
        (res) => {
          console.log(res);
          this.tableData = res.data.records;
          this.totalPage = res.data.total;
        },
        (error) => {}
      );
    },
    // 查询
    searchTableData() {
      this.currentPage = 1;
      this.getTableData();
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
      let _this = this;
      this.$store.dispatch("getEnforceLawType", "1").then(
        (res) => {
          _this.lawCateList = res.data;
        },
        (err) => {}
      );
    },

    // 选择数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log("multipleSelection", this.multipleSelection);
    },

    resetSearchData(formName) {
      this.$refs[formName].resetFields();
      this.timeList = [];
      this.getTableData();
    },
    changStatus(val) {
      console.log("changStatus -> val", val);
    },
  },
  mounted() {
    // this.createUserName = iLocalStroage.gets("userInfo").nickName;
    this.getTableData();
    this.getEnforceLawType();
  },
};
</script>
<style lang="scss" src="@/assets/css/card.scss"></style>
<style lang="scss" src="@/assets/css/searchPage.scss"></style>