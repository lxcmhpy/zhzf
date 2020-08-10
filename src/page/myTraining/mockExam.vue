<template>
  <div class="training-page">
    <el-card>
      <div class="handlePart">
        <el-form :inline="true" :model="myMockExam" label-width="80px" ref="myMockExamRef">
          <el-row>
            <el-form-item label="课程名称" prop="teName">
              <el-input v-model="myMockExam.teName" placeholder="考试名称"></el-input>
            </el-form-item>
            <!-- <el-form-item label="课程类型" prop="teType">
              <el-select v-model="myMockExam.teType">
                <el-option :key="'2'" label="专业课程" :value="'2'"></el-option>
                <el-option :key="'1'" label="日常课程" :value="'1'"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="开始时间" prop="examBegin">
              <el-date-picker
                v-model="myMockExam.examBegin"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="请选择开始时间"
                clearable
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间" prop="examEnd">
              <el-date-picker
                v-model="myMockExam.examEnd"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="请选择结束时间"
                clearable
              ></el-date-picker>
            </el-form-item> -->
            <el-form-item style="margin-left:20px;">
              <el-button
                title="搜索"
                class="commonBtn searchBtn"
                size="medium"
                icon="iconfont law-sousuo"
                @click="currentPage = 1; getExamList();"
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
          <el-table v-if="!tableLoading" style="width: 100%;height:34px;" class="batch-table">
            <el-table-column label>
              <template slot="header">
                <div class="header-total">全部考试（{{ totalPage }}）</div>
              </template>
            </el-table-column>
          </el-table>
          <!-- 模拟考试 -->
          <div
            class="exam-wrap"
            v-loading="tableLoading"
            element-loading-spinner="car-loading"
            element-loading-text="加载中..."
          >
            <div class="exam-item" v-for="item in tableData" :key="item.teId">
              <el-card style="height:auto;">
                <span class="exam-name">{{ item.teName }}</span>
                <el-image :src="'../../../static/images/img/trained/mock_exam.png'"></el-image>
                <p class="exam-time">
                  <i class="iconfont law-shijian"></i>
                  考试发布时间：{{ item.modifyTime }}
                </p>
                <div class="exam-handle">
                  <a
                    v-if="item.examStatue === '0' || item.examStatue === null || item.examStatue === undefined"
                    class="enter-mock-exam enter"
                    @click="startAnswer(item)"
                  >
                    <i class="enter-icon"></i>开始答题
                  </a>
                  <a
                    v-if="item.examStatue === '1' || item.examStatue === '-1'"
                    class="enter-mock-exam continue"
                    @click="startAnswer(item, 2)"
                  >
                    <i class="enter-icon"></i>继续答题
                  </a>
                  <a
                    v-if="item.examStatue === '2'"
                    class="enter-mock-exam again"
                    @click="startAnswer(item, 1)"
                  >
                    <i class="enter-icon"></i>重新答题
                  </a>
                </div>
              </el-card>
            </div>
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
      </div>
    </el-card>
  </div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import { getPersonMockExam } from "@/api/trained";

export default {
  data() {
    return {
      tableData: [],
      courseTypeInfo: [], // 课程类型列表
      myMockExam: {
        teName: "", // 课程名称
        teType: "", // 课程类型
        examBegin: "", // 开始时间
        examEnd: "" // 结束时间
      },
      selectedCourse: [], // 选中课程id
      selectUser: [], // 选中课程信息
      currentPage: 1, // 当前页
      pageSize: 10, // pagesize
      totalPage: 0, // 总数
      tableLoading: false,
      showPreview: false
    };
  },
  components: {},
  computed: {
    UserInfo() {
      return iLocalStroage.gets("userInfo");
    }
  },
  created() {
    this.getExamList();
  },
  methods: {
    //点击下拉框的时查询试卷类型
    getDictInfo(name, codeName) {
      this.$store.dispatch("findAllDrawerByName", name).then(
        //考试类型
        res => {
          if (res.code === 200) {
            this[codeName] = res.data;
          } else {
            console.info("没有查询到数据");
          }
        }
      );
    },
    // 获取模拟考试列表
    getExamList() {
      this.tableLoading = true;
      let data = {
        teName: this.myMockExam.teName,
        current: this.currentPage,
        size: this.pageSize,
        idNo: this.UserInfo.idNumber
      };
      getPersonMockExam(data).then(
        res => {
          this.tableLoading = false;
          if (res.code === 200) {
            this.tableData = res.data.records;
            this.totalPage = res.data.total;
          }
        },
        err => {
          this.tableLoading = false;
          this.$message({ type: "error", message: err.msg || "" });
        }
      );
    },
    // 开始答题
    startAnswer(exam, status) {
      this.$router.push({
        path: "/answer-mockexam",
        query: {
          teperId: exam.teperId,
          teId: exam.teId,
          idNo: this.UserInfo.idNumber,
          teName: exam.teName,
          statue: status
        },
        params: {
          tabTitle: exam.teName
        }
      });
    },
    // 筛选项重置
    resetLog() {
      this.$refs["myMockExamRef"].resetFields();
      this.currentPage = 1;
      this.getExamList();
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getExamList();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getExamList();
    }
  }
};
</script>

<style  lang="scss" scoped>
.training-page {
  padding: 20px;
  height: 100%;
  box-sizing: border-box;
  >>> .el-card,
  >>> .el-card__body {
    height: 100%;
    position: relative;
  }
}
.batch-manage {
  >>> .el-icon-date {
    line-height: 32px;
  }
  height: calc(100% - 80px);
  .table-wrap {
    height: calc(100% - 80px);
    border-bottom: 1px solid #e3e3ec;
  }
  .exam-wrap {
    display: flex;
    flex-wrap: wrap;
    height: calc(100% - 40px);
    overflow-y: scroll;
    .exam-item {
      margin: 20px 12px;
      .exam-name {
        font-size: 20px;
        color: #fff;
        z-index: 100;
        display: block;
        margin: 0 20px;
        position: absolute;
        left: 0;
        right: 0;
        text-align: center;
        top: 42px;
      }
    }
    .exam-time {
      margin: 10px 0;
      color: #7b7b7b;
      font-size: 14px;
      .iconfont {
        font-size: 14px;
        margin-right: 10px;
      }
    }
    .exam-handle {
      text-align: right;
      .enter-mock-exam {
        display: inline-block;
        font-size: 14px;
        color: #4573d0;
        padding: 5px 20px;
        cursor: pointer;
        .enter-icon {
          display: inline-block;
          width: 16px;
          height: 14px;
          background: url("../../../static/images/img/trained/enter_exam.svg");
          background-size: 100%;
          margin-right: 4px;
        }
        &.continue{
          color: #E67809;
          .enter-icon {
            background: url("../../../static/images/img/trained/enter_exam_con.svg");
            background-size: 100%;
          }
        }
        &.again{
          color: #4AAFA7;
          .enter-icon {
            background: url("../../../static/images/img/trained/enter_again.svg");
            background-size: 100%;
          }
        }
      }
    }
  }
}
</style>
