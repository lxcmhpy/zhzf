<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPageLayout" id="userBox">
      <div class="searchPage">
        <div class="handlePart">
          <el-form
            class="search-form"
            :inline="true"
            ref="userForm"
            :model="formInline"
            label-width="70px"
          >
            <el-row>
              <el-form-item label="姓名" prop="personName">
                <el-input v-model="formInline.personName"></el-input>
              </el-form-item>
              <el-form-item label="执法证号" prop="ministerialNo">
                <el-input v-model="formInline.ministerialNo"></el-input>
              </el-form-item>
              <el-form-item label="所属机构" prop="oName">
                <el-input v-model="formInline.oName"></el-input>
              </el-form-item>
              <el-form-item label="年份" prop="reviewYear">
                <el-select
                  v-model="formInline.reviewYear"
                  placeholder="请选择"
                  remote
                  :filterable="getYearList.length > 5"
                  @focus="getYear('年份','getYearList')"
                >
                  <el-option
                    v-for="value in getYearList"
                    :key="value.id"
                    :label="value.name"
                    :value="value.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label=" " label-width="13px">
                <el-button
                  title="搜索"
                  class="commonBtn searchBtn"
                  size="medium"
                  icon="iconfont law-sousuo"
                  @click="currentPage = 1;getPersonList();"
                ></el-button>
                <el-button
                  title="重置"
                  class="commonBtn searchBtn"
                  size="medium"
                  icon="iconfont law-zhongzhi"
                  @click="reset"
                ></el-button>
                <el-button
                  size="medium"
                  class="commonBtn toogleBtn"
                  :title="isShow? '点击收缩':'点击展开'"
                  :icon="isShow? 'iconfont law-top': 'iconfont law-down'"
                  @click="isShow = !isShow"
                ></el-button>
              </el-form-item>
              <!-- <el-button style="float:right" type="primary" icon="el-icon-share" size="medium" @click="personYearApply(1,2)">人员复审</el-button> -->
            </el-row>
            <el-row v-show="isShow">
              <el-form-item label="执法领域" prop="branchId">
                <el-select
                  v-model="formInline.branchId"
                  placeholder="请选择"
                  remote
                  :filterable="branchIdsInfo.length > 5"
                  @focus="getDepatements('执法门类','branchIdsInfo')"
                >
                  <el-option
                    v-for="value in branchIdsInfo"
                    :key="value.id"
                    :label="value.name"
                    :value="value.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="职务" prop="post">
                <el-select
                  v-model="formInline.post"
                  placeholder="请选择"
                  :filterable="postList.length > 5"
                  remote
                  @focus="getDepatements('人员信息-职务','postList')"
                >
                  <el-option
                    v-for="value in postList"
                    :key="value.id"
                    :label="value.name"
                    :value="value.id"
                  ></el-option>
                </el-select>
              </el-form-item>

              <!-- <el-form-item label="成绩" prop="reviewScore">
              <el-select
                v-model="formInline.reviewScore"
                placeholder="请选择"
                remote
                :filterable="reviewScoreList.length > 5"
                @focus="getDepatements('人员年审-年审成绩','reviewScoreList')">
                <el-option
                  v-for="value in reviewScoreList" :key="value.id" :label="value.name" :value="value.id">
                </el-option>
              </el-select>
              </el-form-item>-->
            </el-row>
          </el-form>
        </div>
        <div class="tablePart">
          <el-table
            :data="tableData"
            stripe
            style="width: 100%;height:100%"
            @selection-change="selectDate"
            v-loading="tableLoading"
            element-loading-spinner="car-loading"
            element-loading-text="加载中..."
          >
            <!-- <el-table-column type="selection" align="center"></el-table-column> -->
            <el-table-column prop="personId" v-if="false" label></el-table-column>
            <el-table-column prop="personName" label="姓名" align="left"></el-table-column>
            <el-table-column prop="sex" label="性别" :formatter="sexFormat" align="center"></el-table-column>
            <el-table-column prop="postName" label="职务" align="center"></el-table-column>
            <el-table-column prop="ministerialNo" label="执法证号" align="center"></el-table-column>
            <el-table-column prop="oname" label="所属机构" align="center"></el-table-column>
            <el-table-column prop="branchName" label="执法领域" align="center"></el-table-column>
            <el-table-column label="操作项" width="160" align="center">
              <template slot-scope="scope">
                <div style="width:160px">
                  <!-- <el-button type="text" @click="handleEdit(scope.row)">修改</el-button> -->
                  <el-button type="text" @click="handlePage(scope.row)">年审</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="paginationBox" v-show="true">
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
      <!-- 年审 -->
      <addParagraph ref="addParagraph" @getApplyList="getPersonList"></addParagraph>
      <!-- 弹窗提示 -->
      <tipWindow ref="tips" @getAllPersons="getOrgList"></tipWindow>
    </div>
  </div>
</template>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
 <script>
import addParagraph from "./addParagraph";
import tipWindow from "./tipWindow";
export default {
  data() {
    return {
      isShow: false,
      tableLoading: false,
      branchIdsInfo: [], //执法领域列表
      postList: [], //职务列表
      reviewScoreList: [], //成绩列表
      getYearList: [], //年份列表
      oidsInfo: [], //所属机构列表
      formInline: {
        personId: "",
        personName: "", //姓名
        ministerialNo: "", //执法证号
        oName: "", //所属机构
        branchId: "", //执法门类
        post: "", //职务
        reviewYear: "", // 年份
        reviewScore: "", // 成绩
        doReviewYear: "" //执行年审年份
      },
      tableData: [], //表格数据
      defaultExpandedKeys: [], //默认展开的key
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总数
      currentOrganId: "",
      selectUserIdList: [] //选中的userid
    };
  },
  components: {
    addParagraph,
    tipWindow
  },
  methods: {
    //查询年份下拉框
    selectDate(val) {
      let _this = this;
      _this.selectUserIdList = [];
      val.forEach((item, index) => {
        _this.selectUserIdList.push(item.personId);
      });
    },
    //性别转换
    sexFormat(row, column) {
      if (row.sex === "0") {
        return "男";
      } else if (row.sex === "1") {
        return "女";
      }
    },
    // 根据查询条件查询年审人员信息
    handleYear(row) {
      let _this = this;
      _this.$store.dispatch("approveAr", this.selectUserIdList).then(
        res => {
          if (res.code === 200) {
            console.info("年审成功");
            this.getPersonList();
          }
        },
        err => {
          this.$message.error(err.msg);
        }
      );
    },
    //跳转页面执行年审
    handlePage(row) {
      this.$refs.addParagraph.showModal(
        row.personId,
        "0",
        this.formInline.doReviewYear
      );
    },
    // 查询年审人员信息列表
    getPersonList() {
      let _this = this;
      _this.tableLoading = true;
      let data = {
        personName: _this.formInline.personName,
        idNo: _this.formInline.idNo,
        ministerialNo: _this.formInline.ministerialNo,
        branchId: _this.formInline.branchId,
        oName: _this.formInline.oName,
        certStatus: _this.formInline.certStatus,
        personType: _this.formInline.personType,
        post: _this.formInline.post,
        reviewYear: _this.formInline.reviewYear,
        current: _this.currentPage,
        size: _this.pageSize
      };
      this.formInline.doReviewYear = _this.formInline.reviewYear;
      _this.$store.dispatch("getAnnualreviewListMoudle", data).then(
        res => {
          _this.tableData = res.data.records;
          _this.totalPage = res.data.total;
          _this.tableLoading = false;
        },
        err => {
          this.$message.error(err.msg || err.message);
          this.tableLoading = false;
        }
      );
    },
    //点击下拉框的时候后头获取下拉框数据
    getDepatements(name, codeName) {
      if (this.branchIdsInfo.length === 0) {
        this.$store.dispatch("findAllDrawerByName", name).then(
          //查询执法领域
          res => {
            if (res.code === 200) {
              if (codeName === "branchIdsInfo") {
                this.branchIdsInfo = res.data;
              }
              if (codeName === "postList") {
                this.postList = res.data;
              }
              if (codeName === "oidsInfo") {
                this.oidsInfo = res.data;
              }
              if (codeName === "reviewScoreList") {
                this.reviewScoreList = res.data;
              }
            } else {
              console.info("没有查询到数据");
            }
          }
        );
      }
    },
    //点击下拉框的时候后头获取下拉框Year数据
    getYear(name, codeName) {
      this.$store.dispatch("getYearMoudle", name).then(
        //查询执法领域
        res => {
          if (res.code === 200) {
            if (this.getYearList.size == undefined) {
              this.getYearList = [];
              if (codeName === "getYearList") {
                for (let i = res.data.minYear; i <= res.data.maxYear; i++) {
                  this.getYearList.push({ id: i, name: i });
                }
              }
            }
          } else {
            console.info("没有查询到数据");
          }
        }
      );
    },
    //执法号段列表查询
    getOrgList(val) {
      this.getPersonList();
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getOrgList();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getOrgList();
    },
    // 表格编辑
    handleEdit(type) {
      this.$refs.tips.showModal(type);
      // this.$refs.addUserRef.addUserForm = JSON.parse(JSON.stringify(row));
    },
    //点击添加tab标签，查看人员详情信息
    personYearApply(row, param) {
      let _this = this;
      _this.$store.commit("setPersonInfo", "", "");
      _this.$router.replace({
        name: "personYearApply",
        params: {}
      });
    },
    //更具id删除
    handleDelete(row) {},
    // 重置查询条件
    reset() {
      this.$refs["userForm"].resetFields();
    },

    getNowYear() {
      let date = new Date();
      let year = date.getFullYear();
      this.formInline.reviewYear = year;
      this.formInline.doReviewYear = year;
    }
  },
  mounted() {
    // this.setDepartTable(this.data)
  },
  created() {
    this.getNowYear();
    this.getPersonList();
  }
};
</script>
<style  lang="scss" scoped>
.search-form {
  >>> .el-input,
  >>> .el-select {
    width: 180px;
    margin-right: 0;
  }
}
</style>
