<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage batch-manage">
      <div class="handlePart">
        <el-form
          :inline="true"
          :model="organManageForm"
          label-width="80px"
          ref="organManageFormRef"
        >
          <div>
            <div class="item">
              <el-row>
                <el-form-item label="机构名称" prop="toName">
                  <el-input v-model="organManageForm.toName"></el-input>
                </el-form-item>
                <el-form-item style="margin-left:20px;">
                  <el-button
                    title="搜索"
                    class="commonBtn searchBtn"
                    size="medium"
                    icon="iconfont law-sousuo"
                    @click="currentPage = 1; getOrganList();"
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
                    @click="editOrganInfo('1')"
                  >新增机构</el-button>
                  <el-button
                    type="info"
                    icon="el-icon-delete-solid"
                    size="medium"
                    @click="deleteOrgan"
                  >删除机构</el-button>
                </el-form-item>
              </el-row>
            </div>
          </div>
        </el-form>
      </div>
      <div class="tablePart">
        <div class="table-wrap">
          <el-table
            :data="tableData"
            resizable
            stripe
            style="width: 100%;height:100%;"
            class="batch-table"
            @selection-change="selectionChange"
            v-loading="tableLoading"
            element-loading-spinner="car-loading"
            element-loading-text="加载中..."
          >
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column label>
              <template slot="header">
                <div class="header-total">全部机构（{{ totalPage }}）</div>
              </template>
              <template slot-scope="scope">
                <p>
                  <span class="exam-name">{{scope.row.toName}}</span>
                </p>
                <p class="course-desc">{{scope.row.toComment}}</p>
                <div class="exam-info">
                  <span class="m-r-30">联系人：{{ scope.row.contact }}</span>
                  <span class="m-r-30">联系电话：{{ scope.row.contactNo }}</span>
                  <el-button style="float:right;" class="m-r-20" type="text" @click="editOrganInfo('2', scope.row)">修改</el-button>
                </div>
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
    <addOrgan ref="editOrganDialog" @getOrganList="getOrganList" />
  </div>
</template>
<script>
import addOrgan from './addOrgan';
import { getTrainedOrganList, deleteTrainedOrgan } from '@/api/trained';

export default {
  data() {
    return {
      tableData: [],
      organManageForm: { toName: "" },
      selectOrganIdList: [], //选中机构id
      selectUser: [], // 选中机构信息
      currentPage: 1, // 当前页
      pageSize: 10, // pagesize
      totalPage: 0, // 总数
      tableLoading: false
    };
  },
  components: { addOrgan },
  created(){
    this.getOrganList();
  },
  methods: {
    // 根据查询条件查询培训机构列表
    getOrganList() {
      this.tableLoading = true;
      let data = {
        toName: this.organManageForm.toName,
        current: this.currentPage,
        size: this.pageSize
      };
      getTrainedOrganList(data).then(res => {
        this.tableLoading = false;
        if (res.code == 200) {
          this.tableData = res.data.records;
          this.totalPage = res.data.total;
        }
      }, err => {
        this.tableLoading = false;
        this.$message({ type: 'error', message: err.msg || '' });
      });
    },
    // 新增|修改机构
    editOrganInfo(type, row){
      this.$refs.editOrganDialog.showModal(type, row);
    },
    // 选择机构
    selectionChange(val){
      this.selectOrganIdList = val.map(item => item.toId);
    },
    // 删除机构
    deleteOrgan() {
      if (
        this.selectOrganIdList == undefined ||
        this.selectOrganIdList.length == 0
      ) {
        this.$message({ type: "warning", message: "请选择一条机构信息" });
      } else if (this.selectOrganIdList.length > 1) {
        this.$message({ type: "warning", message: "只能选择一条机构信息" });
      } else {
        this.$confirm("确认删除吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          iconClass: "el-icon-question",
          customClass: "custom-confirm"
        })
          .then(() => {
            deleteTrainedOrgan(this.selectOrganIdList[0]).then(
              res => {
                if (res.code === 200) {
                  this.$message({ type: "success", message: "删除成功!" });
                  //重新加载页面数据
                  this.getOrganList();
                }
              },
              err => {
                this.$message({ type: "error", message: err.msg || "" });
              }
            );
          })
          .catch(() => {});
      }
    },
    // 筛选项重置
    resetLog() {
      this.$refs["organManageFormRef"].resetFields();
      this.currentPage = 1;
      this.getOrganList();
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getOrganList();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getOrganList();
    }
  }
};
</script>

<style  lang="scss" scoped>
@import "@/assets/css/searchPage.scss";
@import "@/assets/css/personManage.scss";
.batch-manage {
  .tablePart {
    height: calc(100% - 120px) !important;
    .table-wrap {
      height: 82%;
    }
  }
  >>> .el-icon-date {
    line-height: 32px;
  }
  .batch-table {
    >>> .el-table__row {
      .el-table-column--selection {
        vertical-align: top;
      }
      td {
        padding: 15px 0;
        &.vertical-top {
          vertical-align: top;
        }
        .exam-status {
          display: inline-block;
          font-size: 15px;
          padding: 0px 6px;
          color: #000;
        }
        .exam-name {
          font-size: 18px;
          font-weight: 600;
          color: rgba(32, 35, 43, 1);
        }
        .course-desc {
          margin-top: 14px;
          color: #20222c;
        }
        .exam-info {
          margin: 14px 0;
          color: #7b7b7b;
        }
        .cell{
          display: block;
        }
      }
    }
  }
  .m-r-30 {
    margin-right: 30px;
  }
}
</style>
