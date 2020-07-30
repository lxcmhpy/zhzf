<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="home-wrap">
      <div class="top-wrap">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-card class="credits-card">
              <span class="top-left-title">日</span>
              <div class="creddits-record">
                <div class="num">
                  <p>{{dayTotalScores}}</p>
                  <p></p>
                  <p class="text">日常学分</p>
                </div>
              </div>
              <el-progress :percentage="100" :show-text="false" class="day-progress"></el-progress>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card class="credits-card">
              <span class="top-left-title trained">培</span>
              <div class="creddits-record">
                <div class="num trained">
                  <p>{{trainTotalScores}}</p>
                  <p></p>
                  <p class="text">培训学分</p>
                </div>
              </div>
              <el-progress :percentage="100" :show-text="false" class="trained-progress"></el-progress>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card class="credits-card">
              <span class="top-left-title total">总</span>
              <div class="creddits-record">
                <div class="num total">
                  <p>{{allScore}}</p>
                  <p></p>
                  <p class="text">总学分</p>
                </div>
              </div>
              <el-progress :percentage="100" :show-text="false" class="total-progress"></el-progress>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div class="course-wrap">
        <el-card>
          <div class="handlePart">
            <el-form :inline="true" :model="searchForm" label-width="80px" ref="searchFormRef">
              <el-row>
                <!-- <el-form-item label="起止日期" prop="beginTime">
                  <el-date-picker
                    v-model="searchForm.beginTime"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    clearable
                  ></el-date-picker>
                </el-form-item> -->
                <el-form-item label="课件名称" prop="couName">
                  <el-input v-model="searchForm.couName"></el-input>
                </el-form-item>
                <el-form-item label="课程类型" prop="lessonType">
                  <el-select v-model="searchForm.lessonType">
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
                    @click="currentPage = 1; getCreditsList();"
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
                :data="tableData"
                style="width: 100%;height:100%;"
                class="batch-table"
                v-loading="tableLoading"
                element-loading-spinner="car-loading"
                element-loading-text="加载中..."
              >
                <el-table-column label="课件名称" prop="couName" min-width="140px" align="left"></el-table-column>
                <el-table-column label="归属课程" prop="lessonName" min-width="120px" align="center"></el-table-column>
                <el-table-column label="课程类型" prop="lessonType" min-width="120px" align="center" :formatter="typeFormat"></el-table-column>
                <el-table-column label="获得学分" prop="accCredit" width="120px" align="center"></el-table-column>
                <el-table-column label="日期" prop="beginTime" width="180px" align="center"></el-table-column>
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
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import { getMyCredits } from '@/api/trained';

export default {
  data() {
    return {
      searchForm: {
        couName: "",
        lessonType: ""
      },
      trainTypeInfo: [],
      tableData: [],
      currentPage: 1,
      totalPage: 0,
      tableLoading: false,
      personImg: "@/../static/images/img/personInfo/upload_bg.png",
      allScore:"",
      dayTotalScores:"",
      trainTotalScores:"",
    };
  },
  components: {},
  computed: {
    UserInfo() {
      return iLocalStroage.gets("userInfo");
    }
  },
  created() {
    this.getCreditsList();
  },
  methods: {
    // 获取学分列表
    getCreditsList() {
      this.tableLoading = true;
      let data = {
        current: this.currentPage,
        size: this.pageSize,
        idNo: this.UserInfo.idNumber
      };
      data = Object.assign(data, this.searchForm);
      getMyCredits(data).then(
        res => {
          this.tableLoading = false;
          if (res.code === 200) {
            this.tableData = res.data.data.dataList.records;
            this.allScore = res.data.data.allScore;
            this.dayTotalScores = res.data.data.dayTotalScores;
            this.trainTotalScores = res.data.data.trainTotalScores;
            this.totalPage = res.data.data.dataList.total;
          }
        },
        err => {
          this.tableLoading = false;
          this.$message({ type: "error", message: err.msg || "" });
        }
      );
    },
    //点击下拉框的时查询试卷类型
    getDictInfo(name) {
      if (this.trainTypeInfo.length === 0) {
        this.$store.dispatch("findAllDrawerByName", name).then(res => {
          if (res.code === 200) {
            this.trainTypeInfo = res.data;
          } else {
            console.info("没有查询到数据");
          }
        });
      }
    },
    // 课件类型转换
    typeFormat(row, cell, cellValue){
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
    // 筛选项重置
    resetLog() {
      this.$refs["searchFormRef"].resetFields();
      this.currentPage = 1;
      this.getCreditsList();
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getCreditsList();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getCreditsList();
    }
  }
};
</script>

<style  lang="scss" scoped>
$dayColor: #007aff;
$trainedColor: #ff8000;
$totalColor: #4aafa7;

.home-wrap {
  position: relative;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  .top-wrap {
    margin-bottom: 20px;
    .credits-card {
      position: relative;
      .top-left-title {
        display: inline-block;
        width: 48px;
        height: 38px;
        line-height: 38px;
        text-align: center;
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(0, 122, 255, 0.1);
        border-radius: 0px 0px 100px 0px;
        color: $dayColor;
        font-size: 14px;
        font-weight: bold;
        &.trained {
          background: rgba(255, 128, 0, 0.1);
          color: $trainedColor;
        }
        &.total {
          background: rgba(74, 175, 167, 0.1);
          color: $totalColor;
        }
      }
      .creddits-record {
        height: 122px;
        text-align: center;
        .num {
          font-size: 48px;
          color: $dayColor;
          margin-top: 20px;
          margin-bottom: 10px;
          background: url("../../../static/images/img/trained/day_credits.svg")
            no-repeat right top;
          display: inline-block;
          padding-right: 40px;
          &.trained {
            color: $trainedColor;
            background: url("../../../static/images/img/trained/trained_credits.svg")
              no-repeat right top;
          }
          &.total {
            color: $totalColor;
            background: url("../../../static/images/img/trained/total_credits.svg")
              no-repeat right top;
          }
          .text {
            font-size: 14px;
            font-weight: bold;
            color: #999;
            text-align: left;
            margin-top: 10px;
            margin-bottom: 20px;
          }
        }
      }
      .day-progress {
        >>> .el-progress-bar__inner {
          background-color: $dayColor;
        }
        >>> .el-progress-bar__outer {
          background: rgba(0, 122, 255, 0.1);
        }
      }
      .trained-progress {
        >>> .el-progress-bar__inner {
          background-color: $trainedColor;
        }
        >>> .el-progress-bar__outer {
          background: rgba(255, 128, 0, 0.1);
        }
      }
      .total-progress {
        >>> .el-progress-bar__inner {
          background-color: $totalColor;
        }
        >>> .el-progress-bar__outer {
          background: rgba(74, 175, 167, 0.1);
        }
      }
    }
  }
  .course-wrap {
    position: relative;
    height: calc(100% - 202px);
    .card-title {
      display: inline-block;
      padding-left: 8px;
      border-left: 4px solid #4573d0;
      font-size: 20px;
      color: #20232b;
      font-weight: bold;
    }
    >>> .el-row,
    >>> .el-col,
    >>> .el-card {
      height: 100%;
    }
    >>> .el-card__body {
      height: calc(100% - 40px);
      overflow-y: scroll;
    }
    .batch-manage, .table-wrap{
      height: calc(100% - 60px);
    }
  }
}
</style>
