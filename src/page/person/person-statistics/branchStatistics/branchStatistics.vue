<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPageLayout" id="userBox">
      <div class="searchPage">
        <div class="handlePart">
          <el-form
            class="search-form"
            :inline="true"
            ref="userFormRef"
            label-width="70px"
            :model="formInline"
          >
            <el-row>
              <el-form-item label="省份" prop="personName">
                <el-input v-model="formInline.personName"></el-input>
              </el-form-item>
              <el-form-item label="二级单位" prop="ministerialNo">
                <el-input v-model="formInline.ministerialNo"></el-input>
              </el-form-item>
              <el-form-item label="所属门类" prop="branchId">
                <el-select
                  v-model="formInline.branchId"
                  placeholder="执法领域"
                  remote
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
              <el-form-item label="是否发证" prop="oName">
                <!-- <el-select v-model="formInline.oid" placeholder="选择所属机构" remote  @focus="getDepatements('人员信息-所属机构','oidsInfo')">
                <el-option
                    v-for="value in oidsInfo" :key="value.id" :label="value.name" :value="value.id">
                </el-option>
                </el-select>-->
                <el-input v-model="formInline.oName"></el-input>
              </el-form-item>
              <el-form-item label=" " label-width="13px">
                <el-button
                  title="搜索"
                  class="commonBtn searchBtn"
                  size="medium"
                  icon="iconfont law-sousuo"
                  @click="currentPage = 1 ;getPersonList();"
                ></el-button>
                <el-button
                  title="重置"
                  class="commonBtn searchBtn"
                  size="medium"
                  icon="iconfont law-zhongzhi"
                  @click="reset"
                ></el-button>
              </el-form-item>
            </el-row>
          </el-form>
        </div>

        <div class="tablePart">
          <el-table
            :data="tableData"
            stripe
            style="width: 100%;height:100%"
            v-loading="tableLoading"
            element-loading-spinner="car-loading"
            element-loading-text="加载中..."
          >
            <el-table-column prop="branchName" label="执法门类" align="center"></el-table-column>
            <el-table-column prop="total" label="合计" ></el-table-column>
            <el-table-column prop="man" label="其中：男性" align="center"></el-table-column>
            <el-table-column prop="woman" label="其中：女性" align="center"></el-table-column>
            <el-table-column prop="mix" label="占总人数百分比（%）" align="center"></el-table-column>
          </el-table>
        </div>
        <!-- <div class="paginationBox" v-show="true">
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
        </div> -->
      </div>

    </div>
  </div>
</template>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
<script>
export default {
  data() {
    return {
      branchIdsInfo: [], //执法领域列表
      oidsInfo: [], //所属机构列表
      formInline: {
        personId: "",
        personName: "", //姓名
        ministerialNo: "", //执法证号
        oName: "", //所属机构
        branchName: "", //执法门类
        post: "",
        branchId: ""
      },
      tableData: [], //表格数据
      defaultExpandedKeys: [], //默认展开的key
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总数
      departments: [], //机构下的部门
      currentOrganId: "",
      selectUserIdList: [], //选中的userid
      tableLoading: false
    };
  },

  methods: {
    //根据查询条件查询人员基本信息
    getPersonList() {
      let _this = this;
      let data = {
        personName: _this.formInline.personName,
        ministerialNo: _this.formInline.ministerialNo,
        branchId: _this.formInline.branchId,
        oName: _this.formInline.oName,
        certStatus: _this.formInline.certStatus,
        personType: _this.formInline.personType,
        post: _this.formInline.post,
        current: _this.currentPage,
        size: _this.pageSize
      };
      this.tableLoading = true;
      _this.$store.dispatch("statisticByBranchApi", data).then(
        res => {
          this.tableLoading = false;
          _this.tableData = res.data;
          _this.totalPage = res.data.total;
        },
        err => {
          this.tableLoading = false;
          this.$message({ type: "error", message: err.msg || "" });
        }
      );
    },
    //性别转换
    sexFormat(row, column) {
      if (row.sex === "0") {
        return "男";
      } else if (row.sex === "1") {
        return "女";
      }
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getPersonList();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getPersonList();
    },
    // 表格编辑
    handleEdit(row) {
      this.$refs.addParagraph.showModal(row.personId);
      // this.$refs.addUserRef.addUserForm = JSON.parse(JSON.stringify(row));
    },
    // 表格
    // 重置查询条件
    reset() {
      this.$refs["userFormRef"].resetFields();
      this.currentPage = 1;
      this.getPersonList();
    },
    //点击下拉框的时候后头获取下拉框数据
    getDepatements(name, codeName) {
      if (this[codeName].length === 0) {
        this.$store.dispatch("findAllDrawerByName", name).then(
          //查询执法领域
          res => {
            if (res.code === 200) {
              this[codeName] = res.data;
            } else {
              console.info("没有查询到数据");
            }
          }
        );
      }
    }
  },
  created() {
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

