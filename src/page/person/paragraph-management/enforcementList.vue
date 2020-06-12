<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPageLayout" id="userBox">
      <div class="searchPage">
        <div class="handlePart">
          <el-form :inline="true" :model="userForm" ref="userFormRef">
            <el-form-item label="执法机构" prop="oName">
              <el-input v-model="userForm.oName" placeholder></el-input>
            </el-form-item>
            <el-form-item label label-width="13px">
              <el-button
                title="搜索"
                class="commonBtn searchBtn"
                size="medium"
                icon="iconfont law-sousuo"
                @click="currentPage = 1; enfPageList();"
              ></el-button>
              <el-button
                title="重置"
                class="commonBtn searchBtn"
                size="medium"
                icon="iconfont law-zhongzhi"
                @click="reset"
              ></el-button>
              <el-button
                title="新增"
                class="commonBtn searchBtn"
                icon="iconfont law-adduser"
                size="medium"
                @click="addOrgApply('',0)"
              ></el-button>
              <el-button
                title="删除"
                class="commonBtn searchBtn"
                icon="el-icon-delete"
                size="medium"
                @click="deleteEnf"
              ></el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="tablePart">
          <el-table
            :data="tableData"
            stripe
            style="width: 100%;height:100%"
            @selection-change="selectUser"
          >
            >
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column prop="id" v-if="false" label="1"></el-table-column>
            <el-table-column prop="oid" v-if="false" label="2"></el-table-column>
            <el-table-column prop="branchId" v-if="false" label="2"></el-table-column>
            <el-table-column prop="oname" label="执法机构" align="center"></el-table-column>
            <el-table-column prop="sectionBegin" label="号段起" align="center"></el-table-column>
            <el-table-column prop="sectionEnd" label="号段止" align="center"></el-table-column>
            <el-table-column prop="remark" label="备注" align="center"></el-table-column>
            <el-table-column label="操作项" width="160" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="addOrgApply(scope.row,1)">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="paginationBox" v-show="totalPage">
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
      <!-- 新增执法号段管理 -->
      <addParagraph ref="addParagraphRef" :code="provinceCode" @getEnfPageList="enfPageList"></addParagraph>
    </div>
  </div>
</template>

<script>
import addParagraph from "./addParagraph";
export default {
  data() {
    return {
      isShow: false,
      userForm: {
        id: "",
        oid: "",
        oName: "",
        branchId: "",
        branchName: "",
        sectionBegin: "",
        sectionEnd: "",
        remark: ""
      },
      tableData: [], //表格数据
      defaultExpandedKeys: [], //默认展开的key
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总数
      departments: [], //机构下的部门
      currentOrganId: "",
      selectUserIdList: [], //选中的userid
      provinceCode: "" // 省号
    };
  },
  components: { addParagraph },
  methods: {
    //
    deleteEnf(row) {
      let _this = this;
      if (_this.selectUserIdList.length === 0) {
        _this.$message.warning("请选择要删除的执法号段");
        return false;
      } else if (_this.selectUserIdList.length > 1) {
        _this.$message.warning("每次只能选择1个执法号段删除");
        return false;
      }
      _this
        .$confirm("确定要删除该执法号段吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          _this.$store
            .dispatch("getEnfDeleteAll", _this.selectUserIdList[0])
            .then(
              res => {
                if (res.code === 200) {
                  _this.$message({
                    type: "success",
                    message: "删除成功!"
                  });
                  //重新加载页面数据
                  _this.enfPageList();
                }
              },
              err => {
                this.$message({ type: "error", message: err.msg || "" });
              }
            );
        })
        .catch(() => {});
    },
    //执法号段列表查询
    enfPageList() {
      let _this = this;
      let data = {
        oName: _this.userForm.oName,
        current: _this.currentPage,
        size: _this.pageSize
      };
      _this.$store.dispatch("getEnfList", data).then(
        res => {
          _this.tableData = res.data.records;
          _this.totalPage = res.data.total;
        },
        err => {
          this.$message({ type: "error", message: err.msg || "" });
        }
      );
    },
    //获取选中的user
    selectUser(val) {
      let _this = this;
      _this.selectUserIdList = [];
      val.forEach((item, index) => {
        _this.selectUserIdList.push(item.id);
      });
    },
    handleSizeChange(val) {
      //更改每页显示的条数
      let _this = this;
      _this.pageSize = val;
      _this.enfPageList();
    },
    handleCurrentChange(val) {
      //更换页码
      let _this = this;
      _this.currentPage = val;
      _this.enfPageList();
    },
    reset() {
      // 重置查询条件
      let _this = this;
      _this.$refs["userFormRef"].resetFields();
    },
    addOrgApply(row, type) {
      //新增or修改
      let _this = this;
      _this.$refs.addParagraphRef.showModal(row, type);
    },
    // 获取省号
    getProvinceCode() {
      this.$store.dispatch("getProvinceCode").then(
        res => {
          if (res.code === 200) {
            this.provinceCode = res.data;
          }
        },
        err => {
          this.$message({ type: "error", message: err.msg || "" });
        }
      );
    }
  },
  created() {
    let _this = this;
    _this.enfPageList();
    this.getProvinceCode();
  }
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
