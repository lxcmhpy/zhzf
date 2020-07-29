<template>
  <div>
    <div>
      <el-dialog
        class="exam-page-dialog"
        :title="dialogtitle"
        :visible.sync="visible"
        @close="closeDialog"
        :close-on-click-modal="false"
        width="68%"
      >
        <el-row >
          <div style="margin-bottom: 15px;">
            <el-button v-if="isConfigOver !== '1'" type="primary" icon="el-icon-plus" size="medium" @click="addCourse">添加课程</el-button>
            <el-button
              v-if="isConfigOver !== '1'"
              type="info"
              icon="el-icon-delete-solid"
              size="medium"
              @click="deleteCourse"
            >移除课程</el-button>
          </div>
        </el-row>
        <div>
          <el-table
            :data="tableData"
            v-loading="tableLoading"
            element-loading-spinner="car-loading"
            element-loading-text="加载中..."
            :max-height="380"
            @selection-change="selectionCourse"
          >
            <el-table-column type="selection" label align="center" width="40px"></el-table-column>
            <el-table-column prop="lessonName" label="课程名称" min-width="120px" align="left" fixed="left"></el-table-column>
            <el-table-column prop="lessonType" label="课程类型" align="center" width="120px" :formatter="setTypeName"></el-table-column>
            <el-table-column prop="lessonCredits" label="学分" width="80px" align="center"></el-table-column>
            <el-table-column prop="publicTime" label="发布时间" width="180px" align="center"></el-table-column>
            <el-table-column prop="publicUserName" label="发布人" min-width="120px" align="center"></el-table-column>
            <el-table-column prop="publicOrg" label="发布机构" min-width="120px" align="left"></el-table-column>
             <el-table-column prop="lessonComment" label="课程简介" min-width="120px" align="left"></el-table-column>
            <el-table-column label="操作" align="center" width="100px" fixed="right">
              <template slot-scope="scope">
                <el-button type="text" @click="preViewCourse(scope.row)">预览</el-button>
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
    <selectCourse ref="selectCourse" @getTrainLessonInfo="getTrainLessonInfo" />
    <!-- 预览 -->
    <el-dialog
      title="课件预览"
      :visible.sync="showPreview"
      :close-on-click-modal="false"
      width="65%"
      class="course-view-dialog"
    >
      <coursewarePreview v-if="showPreview" :list="viewCourseList" />
    </el-dialog>
  </div>
</template>
<script>
import selectCourse from "./selectCourse";
import coursewarePreview from "@/page/trained/course-manage/components/coursewarePreview";
import { getSelectedLessonList, deleteSelectedCourse, viewLesson } from '@/api/trained';

export default {
  data() {
    return {
      branchIdsInfo: [{ id: "", name: "全部" }], //执法领域列表
      visible: false,
      dialogtitle: "",
      trainId: '',
      tableData: [],
      selectedCourse: [],
      tableLoading: false,
      totalPage: 0,
      currentPage: 1,
      isConfigOver: '',
      showPreview: false,
      viewCourseList: [],
      reloadBatchList: false
    };
  },
  components: { selectCourse, coursewarePreview },
  methods: {
    showModal(data) {
      this.trainId = data.trainId;
      this.visible = true;
      this.isConfigOver = data.isConfigOver;
      this.dialogtitle = "课程选择";
      this.getCourseList();
    },
    // 添加课程
    addCourse() {
      this.$refs.selectCourse.showModal(this.trainId);
    },
    // 移除课程
    deleteCourse() {
      if (this.selectedCourse.length == 0) {
        this.$message({ type: "warning", message: "请选择要删除的课程" });
      } else if(this.selectedCourse.length > 1){
        this.$message({ type: "warning", message: "只能选择一条课程删除" });
      } else {
        this.$confirm("确认移除吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          iconClass: "el-icon-question",
          customClass: "custom-confirm"
        })
        .then(() => {
          deleteSelectedCourse(this.selectedCourse[0]).then(
            res => {
              if (res.code === 200) {
                this.$message({ type: "success", message: "移除成功!" });
                //重新加载页面数据
                this.getCourseList();
                this.reloadBatchList = true;
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
      this.selectedCourse = val.map(item => item.tlId);
    },
    getTrainLessonInfo(){
      this.reloadBatchList = true;
      this.getCourseList();
    },
    // 预览课程
    preViewCourse(row) {
      const loading = this.$loading({
        lock: true,
        text: "正在获取课件信息",
        spinner: "car-loading",
        customClass: "loading-box",
        background: "rgba(234,237,244, 0.8)"
      });
      this.viewCourseList.splice(0, this.viewCourseList.length);
      viewLesson({ lessonId: row.lessonId }).then(
        res => {
          loading.close();
          if (res.code === 200) {
            if(res.data){
              this.viewCourseList = res.data.listVo;
            }
            this.showPreview = true;
          }
        },
        err => {
          loading.close();
          this.$message({ type: "error", message: err.msg || "" });
        }
      );
    },
    // 已选课程
    getCourseList() {
      this.tableLoading = true;
      let data = {
        trainId: this.trainId,
        current: this.currentPage,
        size: this.pageSize
      };
      getSelectedLessonList(data).then(res => {
        this.tableLoading = false;
        if(res.code === 200){
          this.tableData = res.data.records;
          this.totalPage = res.data.total;
        }
      }, err => {
        this.tableLoading = false;
        this.$message({ type: 'error', message: err.msg || '' });
      })
    },
    // 课件类型转换
    setTypeName(row, cell, cellValue){
      let val = '';
      switch(cellValue){
        case '1':
          val = '日常课程';
          break;
        case '2':
          val = '专业课程';
          break;
      }
      return val;
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
      this.reloadBatchList && this.$emit('getbatchManage');
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
}
.search-form {
  >>> .el-form-item {
    margin-bottom: 10px;
  }
  >>> .el-input__inner {
    width: 176px;
  }
}
.course-view-dialog{
  >>>.el-dialog{
    height: 70%;
    .el-dialog__body{
      height: calc(100% - 112px);
    }
  }
}
</style>