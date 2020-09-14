<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage batch-manage">
      <div class="handlePart">
        <el-form
          :inline="true"
          :model="courseManageForm"
          label-width="80px"
          ref="courseManageFormRef"
        >
          <div>
            <div class="item">
              <el-row>
                <el-form-item label="课程名称" prop="lessonName">
                  <el-input v-model="courseManageForm.lessonName" placeholder="考试名称"></el-input>
                </el-form-item>
                <el-form-item label="课程类型" prop="lessonType">
                  <el-select
                    v-model="courseManageForm.lessonType">
                    <el-option key="" label="全部" value=""></el-option>
                    <el-option :key="'2'" label="专业课程" :value="'2'"></el-option>
                    <el-option :key="'1'" label="日常课程" :value="'1'"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item style="margin-left:20px;">
                  <el-button
                    title="搜索"
                    class="commonBtn searchBtn"
                    size="medium"
                    icon="iconfont law-sousuo"
                    @click="currentPage = 1; getCourseList();"
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
                    @click="editCourseInfo('1')"
                  >新增课程</el-button>
                  <el-button
                    type="info"
                    icon="el-icon-delete-solid"
                    size="medium"
                    @click="deleteCourse"
                  >删除课程</el-button>
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
            <el-table-column prop="batchId" label>
              <template slot="header">
                <div class="header-total">全部课程（{{ totalPage }}）</div>
              </template>
              <template slot-scope="scope">
                <el-row type="flex" :gutter="14">
                  <el-col :span="4">
                    <el-image
                      class="course-cover-img"
                      :src="scope.row.lessonPic"
                    >
                      <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                      </div>
                    </el-image>
                  </el-col>
                  <el-col :span="20">
                    <p>
                      <span class="exam-name">{{ scope.row.lessonName }}</span>
                    </p>
                    <p class="course-desc">{{ scope.row.lessonComment }}</p>
                    <p class="exam-info">
                      <span class="m-r-30">课程类型：{{scope.row.lessonType == '1'?"日常课程":"专业课程"}}</span>
                      <span class="m-r-30">学分：{{scope.row.lessonCredits}}</span>
                      <span  v-if="scope.row.isPublic === '1'" class="m-r-30">发布人：{{scope.row.publicUserName}}</span>
                      <span  v-if="scope.row.isPublic === '1'" class="m-r-30">发布时间：{{scope.row.publicTime}}</span>
                      <span  v-if="scope.row.isPublic === '1'" class="m-r-30">发布机构：{{scope.row.publicOrg}}</span>
                    </p>
                  </el-col>
                </el-row>
                <div>
                  <el-button
                    v-if="scope.row.isPublic !== '1'"
                    class="m-r-20"
                    type="text"
                    @click="editCourseInfo('2', scope.row)"
                  >修改</el-button>
                  <el-button class="m-r-20" type="text" @click="previewCourse(scope.row)">预览</el-button>
                  <el-button
                    v-if="scope.row.isPublic !== '1'"
                    class="m-r-20"
                    type="text"
                    @click="releaseCourse(scope.row)"
                  >发布</el-button>
                  <el-button
                    v-if="scope.row.isPublic !== '1'"
                    class="m-r-20"
                    type="text"
                    @click="coursewareManage(scope.row)"
                  >课件管理</el-button>
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
    <!-- 添加课程 -->
    <addCourse ref="addCourse" @getCourseList="getCourseList" />
    <!-- 课件管理 -->
    <coursewareManage ref="coursewareManageRef" @refreshCourse="getCourseList" />
    <!-- 预览 -->
    <el-dialog
      title="课件预览"
      :visible.sync="showPreview"
      :close-on-click-modal="false"
      width="65%"
      class="course-dialog"
    >
      <coursewarePreview v-if="showPreview" :list="courseList" />
    </el-dialog>
  </div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import addCourse from "./components/addCourse";
import coursewareManage from "./components/coursewareManage";
import coursewarePreview from "./components/coursewarePreview";
import { getCourseList, deleteCourse, disposeOverLesson, viewLesson } from "@/api/trained";

export default {
  data() {
    return {
      tableData: [],
      courseTypeInfo: [], // 课程类型列表
      courseManageForm: {
        lessonName: "", // 课程名称
        lessonType: "" // 课程类型
      },
      selectedCourse: [], // 选中课程id
      selectUser: [], // 选中课程信息
      currentPage: 1, // 当前页
      pageSize: 10, // pagesize
      totalPage: 0, // 总数
      tableLoading: false,
      showPreview: false,
      courseList: []
    };
  },
  components: { addCourse, coursewareManage, coursewarePreview },
  computed: {},
  created(){
    this.getCourseList();
  },
  methods: {
    // 点击下拉框的时查询课程类型
    getDictInfo(name, codeName) {
      this.$store.dispatch("findAllDrawerByName", name).then(res => {
        if (res.code === 200) {
          if (codeName === "courseTypeInfo") {
            this.courseTypeInfo = res.data;
            this.courseTypeInfo.unshift({ id: "", name: "全部" });
          }
        } else {
          console.info("没有查询到数据");
        }
      });
    },
    // 新增|修改课程
    editCourseInfo(type, course) {
      this.$refs.addCourse.showModal(type, course);
    },
    // 预览
    previewCourse(row) {
      const loading = this.$loading({
        lock: true,
        text: "正在获取课件信息",
        spinner: "car-loading",
        customClass: "loading-box",
        background: "rgba(234,237,244, 0.8)"
      });
      this.courseList.splice(0, this.courseList.length);
      viewLesson({ lessonId: row.lessonId }).then(
        res => {
          loading.close();
          if (res.code === 200) {
            if(res.data){
              this.courseList = res.data.listVo;
              if(!res.data.listVo.length){
                this.$message({type: 'info', message: '请先添加课件在预览'});
              }else{
                this.showPreview = true;
              }
            }
          }
        },
        err => {
          loading.close();
          this.$message({ type: "error", message: err.msg || "" });
        }
      );
    },
    // 选择课程
    selectionChange(val){
      this.selectedCourse = val.map(item => item.lessonId);
    },
    // 发布
    releaseCourse(row) {
      this.$confirm("确认发布课程吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        iconClass: "custom-question",
        customClass: "custom-confirm"
      })
        .then(() => {
          const loading = this.$loading({
            lock: true,
            text: "正在发布",
            spinner: "car-loading",
            customClass: "loading-box",
            background: "rgba(234,237,244, 0.8)"
          });
          disposeOverLesson({ lessonId: row.lessonId }).then(
            res => {
              loading.close();
              if (res.code === 200) {
                this.$message({ type: "success", message: "发布完成!" });
                // 重新加载页面数据
                this.getCourseList();
              }
            },
            err => {
              loading.close();
              this.$message({ type: "error", message: err.msg || "" });
            }
          );
        })
        .catch(() => {});
    },
    // 课件管理
    coursewareManage(row) {
      this.$refs.coursewareManageRef.showModal(row.lessonId);
    },
    // 配置完成
    disposeInfo(row, param) {
      let _this = this;
      let data = {
        examId: row.examId
      };
      _this
        .$confirm("确认配置完成吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          iconClass: "custom-question",
          customClass: "custom-confirm"
        })
        .then(() => {
          const loading = _this.$loading({
            lock: true,
            text: "正在配置",
            spinner: "car-loading",
            customClass: "loading-box",
            background: "rgba(234,237,244, 0.8)"
          });
          _this.$store.dispatch("disposeInfo", data).then(
            res => {
              loading.close();
              if (res.code === 200) {
                _this.$message({ type: "success", message: "配置已完成!" });
                //重新加载页面数据
                _this.getCourseList();
              }
            },
            err => {
              loading.close();
              _this.$message({ type: "error", message: err.msg || "" });
            }
          );
        })
        .catch(() => {});
    },
    // 根据查询条件查询课程列表
    getCourseList() {
      this.tableLoading = true;
      let data = {
        lessonName: this.courseManageForm.lessonName,
        lessonType: this.courseManageForm.lessonType,
        current: this.currentPage,
        size: this.pageSize
      };
      getCourseList(data).then(
        res => {
          if (res.code == "200") {
            this.tableData = res.data.records;
            this.totalPage = res.data.total;
            this.tableLoading = false;
            this.tableData.forEach((item, index) => {
              this.createImageUrl(item.lessonPic, index);
            })
          }
        },
        err => {
          this.tableLoading = false;
          this.$message({ type: "error", message: err.msg || "" });
        }
      );
    },
    // 获取图片文件流
    createImageUrl(id, index){
      this.$util.com_getFileStream(id).then( res => {
        this.tableData[index].lessonPic = res;
      });
    },
    // 删除课程
    deleteCourse() {
      if (this.selectedCourse == undefined || this.selectedCourse.length == 0) {
        this.$message({
          type: "warning",
          message: "请选择一条课程信息"
        });
      } else if (this.selectedCourse.length > 1) {
        this.$message({
          type: "warning",
          message: "只能选择一条课程信息"
        });
      } else {
        this.$confirm("确认删除吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          iconClass: "el-icon-question",
          customClass: "custom-confirm"
        })
          .then(() => {
            deleteCourse(this.selectedCourse[0]).then(
              res => {
                if (res.code === 200) {
                  this.$message({ type: "success", message: "删除成功!" });
                  //重新加载页面数据
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
    // 筛选项重置
    resetLog() {
      this.$refs["courseManageFormRef"].resetFields();
      this.currentPage = 1;
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
        .exam-info {
          margin: 14px 0;
          color: #7b7b7b;
        }
      }
    }
    .course-cover-img {
      display: flex;
      width: 100%;
      height: 5.2em;
      justify-content: center;
      align-items: center;
      font-size: 24px;
    }
    .course-desc {
      margin-top: 14px;
      color: #20222c;
    }
  }
  .m-r-30 {
    margin-right: 30px;
  }
  .m-r-20 {
    margin-right: 20px;
  }
}
.course-dialog {
  >>> .el-dialog__body {
    padding: 0;
    position: relative;
    .courseware-preview {
      height: 560px;
    }
  }
}
</style>
