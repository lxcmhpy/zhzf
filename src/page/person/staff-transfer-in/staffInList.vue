<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPageLayout" id="userBox">
      <div class="searchPage">
        <div class="handlePart">
          <el-form class="search-form" :inline="true" ref="staffInSearchForm" label-width="70px">
            <el-row>
              <el-form-item label="姓名">
                <el-input v-model="staffInForm.personName"></el-input>
              </el-form-item>
              <el-form-item label="执法证号">
                <el-input v-model="staffInForm.certNo"></el-input>
              </el-form-item>
              <el-form-item label="调入机构" prop="oid">
                <el-input v-model="staffInForm.inOName"></el-input>
              </el-form-item>
              <el-form-item label=" " label-width="13px">
                <el-button
                  title="搜索"
                  class="commonBtn searchBtn"
                  size="medium"
                  icon="iconfont law-sousuo"
                  @click="currentPage = 1 ;getStaffinPage();"
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
              <el-form-item label=" " label-width="13px" style="float:right">
                <el-button
                  type="primary"
                  icon="el-icon-success"
                  size="medium"
                  @click="acceptStraffIn"
                >调动接收</el-button>
                <el-button
                  type="info"
                  icon="el-icon-error"
                  size="medium"
                  @click="refuseStraffIn"
                >拒绝接收</el-button>
              </el-form-item>
            </el-row>
            <el-row v-show="isShow">
              <el-form-item label="执法领域" prop="branchId">
                <el-select
                  v-model="staffInForm.branchId"
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
              <el-form-item label="职务" prop="post">
                <el-select
                  v-model="staffInForm.post"
                  placeholder="职务"
                  remote
                  @focus="getDepatements('人员信息-职务','postIdsInfo')"
                >
                  <el-option
                    v-for="value in postIdsInfo"
                    :key="value.id"
                    :label="value.name"
                    :value="value.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-row>
          </el-form>
        </div>
        <div class="tablePart">
          <el-table
            :data="tableData"
            stripe
            v-loading="tableLoading"
            element-loading-spinner="car-loading"
            element-loading-text="加载中..."
            style="width: 100%;height:100%"
            @selection-change="selectData"
          >
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column prop="transferId" v-if="false" label align="center"></el-table-column>
            <el-table-column prop="transferStatusName" label="调岗状态" align="center"></el-table-column>
            <el-table-column prop="personName" label="姓名" align="center"></el-table-column>
            <el-table-column prop="idNo" label="身份证号" align="center" min-width="180px"></el-table-column>
            <el-table-column prop="outOName" label="调出单位" align="center"></el-table-column>
            <el-table-column prop="outTime" label="调出时间" align="center"></el-table-column>
            <el-table-column prop="reason" label="调岗原因" align="center"></el-table-column>
            <el-table-column prop="inOName" label="调入单位" align="center"></el-table-column>
            <el-table-column prop="inTime" label="调入时间" align="center"></el-table-column>
            <el-table-column label="操作项" width="160" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="getDetailInfo(scope.row,'0')">查看</el-button>
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
            :page-sizes="[10, 20, 30, 40]"
            layout="prev, pager, next,sizes,jumper"
            :total="totalPage"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!-- -->
    <refuseStaff ref="refuseStaffCompRef" @getRefuseStaff="getStaffinPage"></refuseStaff>
  </div>
</template>

<script>
import addParagraph from "./addParagraph";
import refuseStaff from "./refuseStaff";
import { mixinPerson } from "@/common/js/personComm";
import elSelectTree from "@/components/elSelectTree/elSelectTree";
export default {
  name: "staffInList",
  mixins: [mixinPerson],
  data() {
    return {
      isShow: false,
      staffInForm: {
        personName: "", //姓名
        certNo: "", //执法证号
        oid: "", //所属机构
        branchName: "", //执法门类
        post: "",
        inOName: "",
        branchName: ""
      },
      tableData: [], //表格数据
      defaultExpandedKeys: [], //默认展开的key
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总数
      departments: [], //机构下的部门
      currentOrganId: "",
      selectUserIdList: [], //选中的userid
      branchIdsInfo: [], //存储执法领域下拉框数据
      postIdsInfo: [], //存储职务下拉框数据
      oidsInfo: [] //存储所属机构下拉框数据
    };
  },
  components: {
    refuseStaff
  },
  methods: {
    acceptStraffIn() {
      //接收调动
      let _this = this;
      if (!_this.selectUserIdList.length) {
        this.$message.warning("请选择调入人员");
        return false;
      } else if (_this.selectUserIdList.length > 1) {
        this.$message.warning("每次只能选择一名人员调入");
        return false;
      }
      let data = {
        transferId: _this.selectUserIdList[0]
      };
      _this.$store.dispatch("acceptTransfer", data).then(
        res => {
          if (res.code === 200) {
            _this.$message({
              type: "success",
              message: "接收成功!"
            });
            _this.getStaffinPage();
          }
        },
        err => {
          this.$message({ type: "error", message: err.msg || "" });
        }
      );
    },
    refuseStraffIn() {
      //拒绝调动
      if (!this.selectUserIdList.length) {
        this.$message.warning("请选择拒绝调动人员");
        return false;
      } else if (this.selectUserIdList.length > 1) {
        this.$message.warning("每次只能拒绝一名人员");
        return false;
      } else {
        this.$refs.refuseStaffCompRef.showModal(this.selectUserIdList[0]);
      }
    },
    sexFormat(row, column) {
      if (row.sex === "0") {
        return "男";
      } else if (row.sex === "1") {
        return "女";
      }
    },
    //点击下拉框的时候后头获取下拉框数据
    getDepatements(name, codeName) {
      let _this = this;
      if (_this.branchIdsInfo.length === 0) {
        _this.$store.dispatch("findAllDrawerByName", name).then(res => {
          if (res.code === 200) {
            if (codeName === "branchIdsInfo") {
              _this.branchIdsInfo = res.data;
            }
            if (codeName === "postIdsInfo") {
              _this.postIdsInfo = res.data;
            }
            if (codeName === "oidsInfo") {
              _this.oidsInfo = res.data;
            }
          } else {
            console.info("没有查询到数据");
          }
        });
      }
      _this.$store.dispatch("findAllDrawerByName", name).then(res => {
        if (res.code === 200) {
          if (codeName === "branchIdsInfo") {
            _this.branchIdsInfo = res.data;
          }
          if (codeName === "postIdsInfo") {
            _this.postIdsInfo = res.data;
          }
          if (codeName === "oidsInfo") {
            _this.oidsInfo = res.data;
          }
        } else {
          console.info("没有查询到数据");
        }
      });
    },
    getStaffinPage() {
      //查询列表
      let _this = this;
      let data = {
        branchId: _this.staffInForm.branchId,
        inOName: _this.staffInForm.inOName,
        post: _this.staffInForm.post,
        certNo: _this.staffInForm.certNo,
        personName: _this.staffInForm.personName,
        current: _this.currentPage,
        size: _this.pageSize
      };
      _this.getPageList("getStaffInList", data);
    },
    //执法号段列表查询
    getOrgList(val) {},
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getStaffinPage();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getStaffinPage();
    },
    // 表格
    //点击添加tab标签，查看人员详情信息
    getDetailInfo(row, param) {
      this.openPersonDetail(row, "view");
    },
    //更具id删除
    handleDelete(row) {},
    // 重置查询条件
    reset() {
      this.$refs["staffInSearchForm"].resetFields();
      this.currentPage = 1 ;
      this.getStaffinPage();
    },

    //新增
    addOrgApply() {
      let _this = this;
      let parentNode = {};
      _this.$refs.addParagraph.showModal("1", parentNode);
    },
    //获取选中的user
    selectData(val) {
      let _this = this;
      _this.selectUserIdList = [];
      val.forEach((item, index) => {
        _this.selectUserIdList.push(item.transferId);
      });
    }
  },
  mounted() {
    // this.setDepartTable(this.data)
  },
  created() {
    let _this = this;
    _this.getStaffinPage();
  }
};
</script>

<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
<style  lang="scss" scoped>
.search-form {
  >>> .el-input,
  >>> .el-select {
    width: 180px;
    margin-right: 0;
  }
}
.paginationBox {
  >>> .el-select {
    margin-right: 0;
  }
}
</style>
