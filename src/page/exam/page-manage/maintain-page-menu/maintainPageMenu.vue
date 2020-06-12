<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage page-menu">
      <div class="handlePart">
        <el-form
          :inline="true"
          :model="maintainPageForm"
          label-width="80px"
          ref="maintainPageFormRef"
        >
          <div>
            <div class="item">
              <el-row>
                <el-form-item label="试卷名称" prop="pageName" placeholder="试卷名称">
                  <el-input v-model="maintainPageForm.pageName"></el-input>
                </el-form-item>
                <el-form-item label="试卷类型" prop="pageType" style="margin-left:20px;">
                  <el-select
                    v-model="maintainPageForm.pageType"
                    placeholder="试卷类型"
                    remote
                    @focus="getDictInfo('考试-试卷类型','pageTypeList')"
                  >
                    <el-option
                      v-for="value in pageTypeList"
                      :key="value.id"
                      :label="value.name"
                      :value="value.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item style="margin-left: 15px;">
                  <el-button
                    title="搜索"
                    class="commonBtn searchBtn"
                    size="medium"
                    icon="iconfont law-sousuo"
                    @click="getPageInfoList"
                  ></el-button>
                  <el-button
                    title="重置"
                    class="commonBtn searchBtn"
                    size="medium"
                    icon="iconfont law-zhongzhi"
                    @click="resetLog"
                  ></el-button>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item>
                  <el-button
                    type="primary"
                    icon="el-icon-plus"
                    size="medium"
                    @click="addPageInfo('','1')"
                  >新增试卷</el-button>
                </el-form-item>
              </el-row>
            </div>
          </div>
        </el-form>
      </div>
      <div class="tablePart">
        <el-table
          :data="tableData"
          resizable
          stripe
          style="width: 100%;height:100%;"
          v-loading="tableLoading"
          element-loading-spinner="car-loading"
          element-loading-text="加载中..."
        >
          <el-table-column prop="pageId" label="试卷Id" v-if="false" align="center"></el-table-column>
          <el-table-column prop="pageName" label="试卷名称" align="left"></el-table-column>
          <el-table-column prop="pageTypeName" label="试卷类型" align="center"></el-table-column>
          <el-table-column prop="score" label="试卷总分" align="center"></el-table-column>
          <el-table-column prop="createName" label="出题人" align="center"></el-table-column>
          <el-table-column prop="oname" label="出题机构" align="center"></el-table-column>
          <el-table-column prop="verifyStatusName" label="审核状态" align="center"></el-table-column>
          <el-table-column prop="opt" label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="viewPageInfo(scope.row)">预览</el-button>
              <el-button type="text" @click="applyPageVerify(scope.row)" :disabled="scope.row.verifyStatusName == '审核通过' || scope.row.verifyStatusName == '待审核'?true:false">申请审核</el-button>
              <el-button type="text" @click="deletePageInfo(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination-box">
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
    <!-- 添加试卷 -->
    <addPageMenuComp ref="addPageMenuCompRef" @getPageComp="getPageInfoList"></addPageMenuComp>
  </div>
</template>
<script>
import addPageMenuComp from "./addPageMenu";
import { mixinPerson } from "@/common/js/personComm";
export default {
  mixins: [mixinPerson],
  data() {
    return {
      tableData: [],
      pageTypeList: [],
      maintainPageForm: {
        pageName: "",
        pageType: "",
        pageTypeName: ""
      }
    };
  },
  components: {
    addPageMenuComp
  },
  methods: {
    //点击下拉框的时查询试卷类型
    getDictInfo(name, codeName) {
      this.$store.dispatch("findAllDrawerByName", name).then(res => {
        if (res.code === 200) {
          if (codeName === "pageTypeList") {
            this.pageTypeList = res.data;
          }
        } else {
          console.info("没有查询到数据");
        }
      });
    },
    //申请审核
    applyPageVerify(row){
      let data = {
        pageId:row.pageId
      }
      this.$confirm("确定提交审核吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        iconClass: "custom-question",
        customClass: "custom-confirm"
      })
      .then(() => {
        this.$store.dispatch("applyPageVerify", data).then(
          res => {
            if (res.code === 200) {
              this.$message({ type: "success", message: "申请成功!" });
              this.getPageInfoList(); //重新加载页面数据
            }else{
              console(JSON.stringify(res))
            }
          },
          err => {
            this.$message({ type: "error", message: err.msg });
          }
        );
      })
      .catch(() => {});
    },
    addPageInfo() {
      this.$refs.addPageMenuCompRef.showModal(1, "");
    },
    // 试卷预览(可修改)
    viewPageInfo(row) {
      this.$store.commit("setExamInfo", "");
      this.$router.replace({
        name: "viewApplayDetail",
        params: {
          pageId: row.pageId,
          name: row.pageName,
          type: 'edit'
        }
      });
      //this.$refs.addPageMenuCompRef.showModal(2, row);
    },
    //根据查询条件
    getPageInfoList() {
      let _this = this;
      let data = {
        pageName: _this.maintainPageForm.pageName,
        pageType: _this.maintainPageForm.pageType,
        current: _this.currentPage,
        size: _this.pageSize
      };
      _this.getPageList("getPageManageList", data);
    },
    //删除试卷
    deletePageInfo(row) {
      this.$confirm("确定删除该试卷吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        iconClass: "custom-question",
        customClass: "custom-confirm"
      })
      .then(() => {
        this.$store.dispatch("deletePageManage", row.pageId).then(
          res => {
            if (res.code === 200) {
              this.$message({ type: "success", message: "删除成功!" });
              this.getPageInfoList(); //重新加载页面数据
            }
          },
          err => {
            this.$message({ type: "error", message: err.msg || "" });
          }
        );
      })
      .catch(() => {});
    },
    // 日志重置
    resetLog() {
      this.$refs["maintainPageFormRef"].resetFields();
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getPageInfoList();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getPageInfoList();
    },
    //获取选中的user
    selectUser(val) {
      let _this = this;
      _this.selectUserIdList = [];
      _this.selectList = [];
      val.forEach((item, index) => {
        _this.selectUserIdList.push(item.personId);
        _this.selectList.push(item.stationStatusName);
      });
    }
  },
  created() {
    this.getPageInfoList();
  }
};
</script>

<style  lang="scss" scoped>
@import "@/assets/css/searchPage.scss";
.page-menu{
  >>>.el-select{
    margin-right: 0;
  }
  .pagination-box{
    height: 40px;
    text-align: center;
    margin: 15px;
  }
}
</style>
