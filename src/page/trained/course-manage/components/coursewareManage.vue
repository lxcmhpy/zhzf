<template>
  <div>
    <div>
      <el-dialog
        class="exam-page-dialog"
        title="课件管理"
        :visible.sync="visible"
        @close="closeDialog"
        :close-on-click-modal="false"
        width="62%"
      >
        <el-row>
          <div>
            <el-button type="primary" icon="el-icon-plus" size="medium" @click="editCourseware('1')">新增课件</el-button>
            <el-button
              type="info"
              icon="el-icon-delete-solid"
              size="medium"
              @click="deleteCourseware"
            >删除课件</el-button>
          </div>
        </el-row>
        <div style="margin-top: 14px;">
          <el-table
            :data="tableData"
            v-loading="tableLoading"
            element-loading-spinner="car-loading"
            element-loading-text="加载中..."
            :max-height="380"
            @selection-change="selectionCourse"
          >
            <el-table-column type="selection" label align="center" width="58px"></el-table-column>
            <el-table-column prop="couName" label="课件名称" align="left" min-width="120px"></el-table-column>
            <el-table-column prop="couTypeName" label="课件类型" align="center">
              <template slot-scope="scope">
                <i class="cou-type-icon" :class="{'video': scope.row.couType === '2'}"></i>
              </template>
            </el-table-column>
            <el-table-column prop="couTime" label="时长" width="120px" align="center"></el-table-column>
            <el-table-column prop="couCredits" label="学分" width="100px" align="left"></el-table-column>
            <el-table-column label="操作" align="center" width="100px" fixed="right">
              <template slot-scope="scope">
                <el-button type="text" @click="editCourseware('2', scope.row)">修改</el-button>
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
      </el-dialog>
    </div>
    <!-- 选择课程 -->
    <addCourseware ref="addCourseware" @getCoursewareComp="reloadCoursewareLsit" />
  </div>
</template>
<script>
import addCourseware from "./addCourseware";
import { getCoursewareList, deleteCourseware } from '@/api/trained';

export default {
  data() {
    return {
      visible: false,
      lessonId: '',
      tableData: [],
      selectedCourse: [],
      tableLoading: false,
      currentPage: 1,
      totalPage: 0,
      pageSize: 10,
      listChanged: false
    };
  },
  components: { addCourseware },
  methods: {
    showModal(id) {
      this.listChanged = false;
      this.visible = true;
      this.lessonId = id;
      this.getCourseList();
    },
    // 添加课件
    editCourseware(type, row) {
      const editRow = row || {};
      if(JSON.stringify(editRow) === '{}'){
        editRow['lessonId'] = this.lessonId;
      }
      this.$refs.addCourseware.showModal(type, editRow);
    },
    // 移除课程
    deleteCourseware() {
      if (this.selectedCourse.length == 0) {
        this.$message({ type: "warning", message: "请选择要删除的课件" });
      } else if(this.selectedCourse.length > 1){
        this.$message({ type: "warning", message: "只能选择一条课件" });
      } else {
        this.$confirm("确认删除吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          iconClass: "el-icon-question",
          customClass: "custom-confirm"
        })
        .then(() => {
          deleteCourseware(this.selectedCourse[0]).then(
            res => {
              if (res.code === 200) {
                this.$message({ type: "success", message: "移除成功!" });
                //重新加载页面数据
                this.listChanged = true;
                this.getCourseList();
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
    selectionCourse(val) {
      this.selectedCourse = val.map(item => item.couId);
    },
    // 获取课件列表
    getCourseList() {
      this.tableLoading = true;
      const queryData = {
        lessonId: this.lessonId,
        current: this.currentPage,
        size: this.pageSize
      };
      getCoursewareList(queryData).then(res => {
        if(res.code === 200){
          this.tableData = res.data.records;
          this.totalPage = res.data.total;
          this.tableLoading = false;
        }
      }, err => {
        this.tableLoading = false;
        this.$message({ type: "error", message: err.msg || "" });
      })
    },
    // 新增课件后刷新列表
    reloadCoursewareLsit(){
      this.listChanged = true;
      this.getCourseList();
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getCourseList();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getCourseList();
    },
    closeDialog() {
      this.visible = false;
      this.lessonId = '';
      this.tableData.splice(0, this.tableData.length);
      this.listChanged && this.$emit('refreshCourse');
    }
  }
};
</script>
<style lang="scss" scoped>
.exam-page-dialog {
  >>> .el-dialog {
    min-width: 976px;
  }
  >>> .el-dialog__body {
    padding-bottom: 20px;
  }
  >>> .el-table__body-wrapper {
    padding-bottom: 0;
  }
  >>> .el-table--scrollable-x .el-table__body-wrapper {
    &::-webkit-scrollbar {
      height: 12px;
    }
    &::-webkit-scrollbar-track {
      height: 12px;
    }
  }
  >>> .el-table__fixed-body-wrapper {
    bottom: 8px;
  }
  >>> .el-table__fixed-right::before,
  >>> .el-table__fixed::before {
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
  .cou-type-icon{
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url('../../../../../static/images/img/trained/icon_pdf.svg') no-repeat;
    background-size: 100%;
    &.video{
      background: url('../../../../../static/images/img/trained/icon_shipin.svg') no-repeat;
      background-size: 100%;
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