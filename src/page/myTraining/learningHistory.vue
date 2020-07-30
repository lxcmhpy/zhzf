<template>
  <div class="training-page">
    <el-card>
      <div class="handlePart">
        <el-form
          :inline="true"
          :model="searchHistoryForm"
          label-width="120px"
          ref="searchHistoryFormRef"
        >
          <el-row>
            <el-form-item label="请输起始日期" prop="beginTime">
              <el-date-picker
                v-model="searchHistoryForm.beginTime"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="请输起始日期"
                clearable
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="请输入截止日期" prop="endTime">
              <el-date-picker
                v-model="searchHistoryForm.endTime"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="请输入截止日期"
                clearable
              ></el-date-picker>
            </el-form-item>
            <el-form-item style="margin-left:20px;">
              <el-button
                title="搜索"
                class="commonBtn searchBtn"
                size="medium"
                icon="iconfont law-sousuo"
                @click="currentPage = 1; getStudyHistoryList();"
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
        </el-form>
      </div>
      <div class="batch-manage">
        <div class="table-wrap">
          <el-table
            v-if="!tableLoading"
            style="width: 100%;height:34px;"
            class="batch-table"
          >
            <el-table-column label>
              <template slot="header">
                <div class="header-total">全部历史（{{ listTotal.size }}）</div>
              </template>
            </el-table-column>
          </el-table>
          <div
            class="exam-wrap"
            v-loading="tableLoading"
            element-loading-spinner="car-loading"
            element-loading-text="加载中...">
            <!-- 学习历史 -->
            <div class="history-day"  v-for="(item, index) in tableData" :key="index">
              <el-divider content-position="left">{{ item.studyTime }}</el-divider>
              <div
                class="exam-item"
                v-for="lesson in item.lesson"
                :key="lesson.cpId"
              >
                <el-card>
                  <div class="watch-record">
                    <el-image v-if="lesson.path" :src="lesson.path"></el-image>
                    <el-image v-else :src="'../../../static/images/img/trained/mock_exam.png'"></el-image>
                    <div class="time-record">{{ lesson.accTime == 0 ? "尚未观看" : "已观看"+lesson.accTime+"分钟"}}</div>
                  </div>
                  <p class="course-name">{{ lesson.couName }}</p>
                  <p class="course-from">来源:{{ lesson.publicOrgName }}</p>
                </el-card>
              </div>
            </div>
          </div>
        </div>
        <div class="paginationBox">
          <el-button
            type="default"
            plain
            :disabled="this.recordSize === this.totalPage"
            @click="loadMore">{{ this.recordSize === this.totalPage ? '已加载全部数据': '加载更多' }}</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import { getStudyHistory } from '@/api/trained';

export default {
  data() {
    return {
      tableData: [],
      trainTypeInfo: [], // 培训类型列表
      searchHistoryForm: {
        beginTime: "", // 开始时间
        endTime: "" // 结束时间
      },
      selectedCourse: [], // 选中课程id
      selectUser: [], // 选中培训信息
      currentPage: 1, // 当前页
      pageSize: 10, // pagesize
      totalPage: 0, // 总数
      tableLoading: false,
      showPreview: false,
      recordSize: 0,
      listTotal: { size: 0 }
    };
  },
  components: {},
  computed: {
    UserInfo() {
      return iLocalStroage.gets("userInfo");
    },
    baseUrl(){
      return iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST;
    }
  },
  created(){
    this.getStudyHistoryList();
  },
  methods: {
    // 获取学习历史列表
    getStudyHistoryList(){
      this.tableLoading = true;
      let data = {
        current: this.currentPage,
        size: this.pageSize,
        idNo: this.UserInfo.idNumber
      };
      data = Object.assign(data, this.searchHistoryForm);
      if(this.currentPage === 1){
        this.recordSize = 0;
      }
      getStudyHistory(data).then(
        res => {
          this.tableLoading = false;
          if (res.code === 200) {
            this.trainTypeInfo = res.data.data.records;
            this.totalPage = res.data.data.total;
            this.recordSize += res.data.data.records.length;
            this.listTotal.size = this.recordSize;
            this.mergeHistory(res.data.data.records);
          }
        },
        err => {
          this.tableLoading = false;
          this.$message({ type: "error", message: err.msg || "" });
        }
      );
    },
    // 合并同一天学习历史
    mergeHistory(history){
      if(history && history.length){
        let listData = [];
        history.forEach(item => {
          if(item.path){
            item.path = this.baseUrl + item.path;
          }
          if(item.beginTime){
            let itemBeginTime = this.formatTime(item.beginTime);
            let inList = listData.findIndex(study => study.studyTime === itemBeginTime);
            if(inList < 0){
              let studyHistory = { studyTime: itemBeginTime, lesson: [ item ] };
              listData.push(studyHistory);
            }else{
              listData[inList].lesson.push(item);
            }
          }
        });
        if(this.currentPage === 1){
          this.tableData = listData;
        } else{
          this.tableData = this.tableData.concat(listData);
        }
      }
    },
    // 加载更多
    loadMore(){
      this.currentPage += 1;
      this.getStudyHistoryList();
    },
    // 时间显示格式化
    formatTime(time){
      if(time){
        const itemTime = new Date(time);
        const year = itemTime.getFullYear();
        const month = this.timeFormat(itemTime.getMonth() + 1);
        const day = this.timeFormat(itemTime.getDate());
        return `${year}年${month}月${day}日`
      }
    },
    timeFormat(param) {
      return param < 10 ? "0" + param : param;
    },
    // 筛选项重置
    resetLog() {
      this.$refs["searchHistoryFormRef"].resetFields();
      this.currentPage = 1;
      this.getStudyHistoryList();
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getStudyHistoryList();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getStudyHistoryList();
    }
  }
};
</script>

<style  lang="scss" scoped>
.training-page {
  padding: 20px;
  height: 100%;
  box-sizing: border-box;
  >>>.el-card, >>>.el-card__body{
    height: 100%;
    position: relative;
  }
}
.batch-manage {
  >>> .el-icon-date {
    line-height: 32px;
  }
  height: calc(100% - 80px);
  .table-wrap{
    height: calc(100% - 80px);
  }
  .exam-wrap{
    display: flex;
    flex-wrap: wrap;
    height: calc(100% - 40px);
    overflow-y: scroll;
    .history-day{
      width: 100%;
    }
    .exam-item{
      margin: 20px 12px;
      width: 18%;
      min-width: 260px;
      display: inline-block;
      .watch-record{
        position: relative;
        height: 6em;
        .time-record{
          width: 100%;
          height: 22px;
          line-height: 22px;
          padding-left: 10px;
          box-sizing: border-box;
          position: absolute;
          bottom: 0;
          left: 0;
          color: #fff;
          font-size: 14px;
          background: rgba(0,0,0,.4);
          z-index: 100;
        }
        >>>.el-image{
          width: 100%;
          height: 100%;
        }
      }
      .course-name{
        font-size: 14px;
        color: #20222C;
        line-height: 20px;
        font-weight: bold;
        margin: 10px 0;
      }
      .course-from{
        font-size: 12px;
        color: #7B7B7B;
      }
    }
  }
}
</style>
