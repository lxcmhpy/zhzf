<template>
  <div class="class-page">
    <el-card class="classroom-wrap">
      <div class="handlePart">
        <el-form :inline="true" :model="searchForm" label-width="80px" ref="searchFormRef">
          <div>
            <div class="item">
              <el-row>
                <el-form-item label="课程名称" prop="lessonName">
                  <el-input v-model="searchForm.lessonName"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    title="搜索"
                    class="commonBtn searchBtn"
                    size="medium"
                    icon="iconfont law-sousuo"
                    @click="currentPage = 1; getDailyLesson();"
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
            </div>
          </div>
        </el-form>
      </div>
      <div
        class="course-list"
        v-loading="tableLoading"
        element-loading-spinner="car-loading"
        element-loading-text="加载中...">
        <div v-if="tableData.length === 0" class="empty-table">暂无数据</div>
        <!-- 课程列表 -->
        <div
          class="course-item"
          v-for="item in tableData"
          :key="item.lessonId"
          @click="startStudy(item)">
          <div class="course-cover-img">
            <el-image class="course-cover-img" :src="item.lessonPic || lessonDefaultPic">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
          <p class="course-name">{{ item.lessonName }}</p>
          <p class="course-desc">
            <span>已获学分<span class="credits-num">{{ item.myLessonCredits }}</span></span>
            <i class="split">|</i>
            <span>总学分<span class="credits-num">{{ item.lessonCredits }}</span></span>
          </p>
          <p class="course-desc">
            <span class="user-name" style="margin-right:10px;">{{ item.publicUserName }}</span>
            <span class="trained-time">{{ item.publicTime }}</span>
          </p>
        </div>
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
    </el-card>
  </div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import { getAllDailyLessonPage } from '@/api/trained';

export default {
  components: {},
  data() {
    return {
      searchForm: { lessonName: "" },
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      totalPage: 0,
      tableLoading: false,
      lessonDefaultPic: '@/../static/images/img/trained/lesson_default.jpg'
    };
  },
  computed: {
    UserInfo() {
      return iLocalStroage.gets("userInfo");
    },
    baseUrl(){
      return iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST;
    }
  },
  created(){
    this.getDailyLesson();
  },
  methods: {
    // 获取日常课程
    getDailyLesson(){
      this.tableLoading = true;
      let data = {
        lessonName: this.searchForm.lessonName,
        current: this.currentPage,
        size: this.pageSize,
        idNo: this.UserInfo.idNumber
      };
      getAllDailyLessonPage(data).then(
        res => {
          this.tableLoading = false;
          if (res.code === 200) {
            this.tableData = res.data.data.records;
            this.totalPage = res.data.data.total;
            this.tableData.forEach(item => {
              if(item.lessonPic){
                item.lessonPic = this.baseUrl + item.lessonPic;
              }
            });
          }
        },
        err => {
          this.tableLoading = false;
          this.$message({ type: "error", message: err.msg || "" });
        }
      );
    },
    // 日常课程开始学习
    startStudy(row){
      this.$router.push({
        path: "/course-detail",
        query: {
          lessonId: row.lessonId,
          perId: row.personLessonId
        }
      });
    },
    // 重置搜索
    resetLog() {
      this.$refs.searchFormRef.resetFields();
      this.currentPage = 1;
      this.getDailyLesson();
    },
    // 切换每页显示条数
    handleSizeChange(val){
      this.pageSize = val;
      this.getDailyLesson();
    },
    // 分页切换页码
    handleCurrentChange(val){
      this.currentPage = val;
      this.getDailyLesson();
    }
  }
};
</script>

<style  lang="scss" scoped>
.class-page{
  position: relative;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  .classroom-wrap,>>>.el-card__body{
    position: relative;
    height: 100%;
    box-sizing: border-box;
  }
  .course-list{
    display: flex;
    flex-wrap: wrap;
    height: calc(100% - 130px);
    overflow-y: scroll;
    .course-item{
      font-size: 14px;
      color: #7B7B7B;
      width: 20%;
      margin: 20px 2%;
      .course-name{
        margin-top: 10px;
        color: #20222C;
        line-height: 22px;
      }
      .course-desc{
        margin-top: 10px;
        .credits-num{
          color: #FB802D;
          margin-left: 6px;
        }
        .split{
          font-style: inherit;
          margin: 0 10px;
        }
      }
      .course-cover-img{
        width: 100%;
        height: 6em;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24px;
      }
    }
    .empty-table{
      width: 100%;
      text-align:center;
      line-height:60px;
    }
  }
}
</style>
