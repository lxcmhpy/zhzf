<template>
  <div>
    <div>
      <el-dialog
        class="exam-page-dialog"
        title="个人培训详情"
        :visible.sync="visible"
        @close="closeDialog"
        :close-on-click-modal="false"
        width="62%"
      >
        <div>
          <el-table
            :data="tableData"
            v-loading="tableLoading"
            element-loading-spinner="car-loading"
            element-loading-text="加载中..."
            :max-height="380"
          >
            <el-table-column prop="lessonName" label="课程名称" min-width="120px" align="left"></el-table-column>
            <el-table-column prop="couName" label="课件名称" min-width="220px" align="left"></el-table-column>
            <el-table-column prop="accProgress" label="学习进度" min-width="180px" align="center">
              <template slot-scope="scope">
                <el-progress :percentage="scope.row.accProgress"></el-progress>
              </template>
            </el-table-column>
            <el-table-column prop="accCredit" label="已获学分" min-width="80px" align="center"></el-table-column>
            <el-table-column prop="lastStudyTime" label="完成时间" width="140px" align="center"></el-table-column>
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
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {getTrainDetail} from '@/api/trained'

export default {
  data() {
    return {
      searchData: {},
      visible: false,
      dialogtitle: "",
      tableData: [],
      currentPage: 1,
      totalPage: 0,
      tableLoading: false
    };
  },
  components: {},
  methods: {
    showModal(data) {
      this.visible = true;
      this.dialogtitle = "考试详情";
      this.searchData = data;
      this.getTrainDetailInfo();
    },
    // 获取培训详情
    getTrainDetailInfo(){
      this.tableLoading = true;
      getTrainDetail(this.searchData).then(
        res => {
          this.tableLoading = false;
          if (res.code === 200) {
            this.tableData = res.data.records;
          } else {
            console.info("没有查询到数据");
          }
        },
      err => {
        this.tableLoading = false;
        this.$message({ type: 'error', message: err.msg || '' });
      }
      );
    },
    // 查询参加培训人员列表
    getPageAllInfo() {
      let data = {
        current: this.currentPage,
        size: this.pageSize
      };
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getPageAllInfo();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getPageAllInfo();
    },
    closeDialog() {
      this.visible = false;
      this.tableData.splice(0, this.tableData.length);
    }
  }
};
</script>
<style lang="scss" scoped>
.exam-page-dialog {
  >>> .el-dialog {
    min-width: 976px;
    // max-width: 1064px;
  }
  >>> .el-dialog__body {
    padding-bottom: 20px;
  }
  >>>.el-table__body-wrapper{
    padding-bottom: 0;
  }
  >>>.el-table--scrollable-x .el-table__body-wrapper{
    &::-webkit-scrollbar{
      height: 12px;
    }
    &::-webkit-scrollbar-track{
      height: 12px;
    }
  }
  >>>.el-table__fixed-body-wrapper{
    bottom: 8px;
  }
  >>>.el-table__fixed-right::before, >>>.el-table__fixed::before{
    display: none;
  }
  .paginationBox {
    margin-top: 10px;
    text-align: center;
    >>> .el-input__inner {
      height: 32px;
      line-height: 32px;
    }
  }
}
.search-form {
  >>> .el-form-item {
    margin-bottom: 10px;
  }
  >>> .el-input__inner {
    width: 176px;
  }
}
</style>