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
              <!-- <el-form-item label="省份" prop="province">
                <el-select v-model="formInline.province" placeholder="省份" remote  @focus="getDepatements('人员信息-所属机构','oidsInfo')">
                <el-option>新疆</el-option>
                <el-option>宁夏</el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item label="所属机构" prop="oid">
                        <elSelectTree
                          ref="elSelectTreeObj"
                          :options="tableDataTree"
                          :accordion="true"
                          :props="{'label': 'label', 'value': 'id'}"
                          @getValue="handleChanged"
                        ></elSelectTree>
                        <el-input style="display:none" v-model="formInline.oid"></el-input>
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
              <!-- <el-form-item label="是否发证" prop="province">
                <el-select v-model="formInline.province" placeholder="是否发证" remote  @focus="getDepatements('人员信息-所属机构','oidsInfo')">
                <el-option>已发证</el-option>
                <el-option>未发证</el-option>
                </el-select>
              </el-form-item> -->
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
            <el-table-column prop="year" label="年度" align="center"></el-table-column>
            <el-table-column prop="man" label="其中：男性" align="center"></el-table-column>
            <el-table-column prop="woman" label="其中：女性" align="center"></el-table-column>
            <el-table-column prop="total" label="人数" ></el-table-column>
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
import { mixinPerson } from "@/common/js/personComm.js";
import elSelectTree from "@/components/elSelectTree/elSelectTree";
export default {
   mixins: [ mixinPerson ],
  components: { elSelectTree },
  data() {
    return {
      branchIdsInfo: [], //执法领域列表
      oidsInfo: [], //所属机构列表
      tableDataTree: [], //所属机构下拉列表值***
      formInline: {
        oid:"",//所属机构
         province: "", //省份
        oName: "", //所属单位
        branchId: "", //执法门类
        certStatus:"", //发证状态
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
         province: _this.formInline.province,
        oid: _this.formInline.oid,
        branchId: _this.formInline.branchId,
        certStatus: _this.formInline.certStatus,
      };
      this.tableLoading = true;
      _this.$store.dispatch("statisticByYearAdd", data).then(
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
        handleChanged(val) {
      this.$refs.elSelectTreeObj.$children[0].handleClose();
      this.formInline.oid = val;
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
    this.searchTable();
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

