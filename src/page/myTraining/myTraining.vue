<template>
  <div class="training-page">
    <el-card>
      <div class="handlePart">
        <el-form
          :inline="true"
          :model="searchTrainForm"
          label-width="80px"
          ref="searchTrainFormRef"
        >
          <el-row>
            <el-form-item label="培训名称" prop="trainName">
              <el-input v-model="searchTrainForm.trainName"></el-input>
            </el-form-item>
            <el-form-item label="培训类型" prop="trainType">
              <el-select v-model="searchTrainForm.trainType" remote>
                <el-option
                  v-for="value in trainTypeInfo"
                  :key="value.id"
                  :label="value.name"
                  :value="value.id"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="开始时间" prop="beginTime">
              <el-date-picker
                v-model="searchTrainForm.beginTime"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="请选择开始时间"
                clearable
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间" prop="endTime">
              <el-date-picker
                v-model="searchTrainForm.endTime"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="请选择结束时间"
                clearable
              ></el-date-picker>
            </el-form-item>
            <el-form-item style="margin-left:20px;">
              <el-button
                title="搜索"
                class="commonBtn searchBtn"
                size="medium"
                icon="iconfont law-sousuo"
                @click="currentPage = 1; getTrainList();"
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
            resizable
            stripe
            style="width: 100%;height:100%;"
            class="batch-table"
            v-loading="tableLoading"
            element-loading-spinner="car-loading"
            element-loading-text="加载中..."
          >
            <el-table-column v-if="!tableLoading" label>
              <template slot="header">
                <div class="header-total">全部培训（{{ totalPage }}）</div>
              </template>
              <template slot-scope="scope">
                <el-row type="flex" :gutter="14">
                  <el-col :span="22">
                    <p>
                      <span class="exam-name">{{scope.row.trainName}}</span>
                    </p>
                    <p class="course-desc">{{scope.row.remark || ''}}</p>
                    <p class="exam-info">
                      <span class="m-r-30"><i class="iconfont law-shijian"></i>培训时间：{{ scope.row.beginTime }} - {{ scope.row.endTime }}</span>
                      <span>培训类型：{{ scope.row.trainType }}</span>
                      <span><i class="el-icon-coin"></i>总学分：<span class="num">{{ scope.row.trainCredit }}</span></span>
                      <i class="split">|</i>
                      <span>合格学分：<span class="num">{{ scope.row.qualifiedCredits }}</span></span>
                      <i class="split">|</i>
                      <span>已获学分：<span class="num">{{ scope.row.myCredit || 0 }}</span></span>
                    </p>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column width="300px" align="center">
              <template slot-scope="scope">
                <el-button type="primary" @click="enterTrain(scope.row)">进入培训</el-button>
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
    </el-card>
  </div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import { getAllTrainPage } from '@/api/trained';

export default {
  data() {
    return {
      tableData: [],
      trainTypeInfo: [], // 培训类型列表
      searchTrainForm: {
        trainName: "", // 培训名称
        trainType: "", // 培训类型
        beginTime: "", // 开始时间
        endTime: "" // 结束时间
      },
      selectedCourse: [], // 选中培训id
      selectUser: [], // 选中培训信息
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
    this.getDictInfo('人员信息-培训类型');
    this.getTrainList();
  },
  methods: {
    //点击下拉框的时查询试卷类型
    getDictInfo(name) {
      if(this.trainTypeInfo.length === 0){
        this.$store.dispatch("findAllDrawerByName", name).then(
          res => {
            if (res.code === 200) {
              this.trainTypeInfo = res.data;
            } else {
              console.info("没有查询到数据");
            }
          }
        );
      }
    },
    // 获取培训列表
    getTrainList(){
      this.tableLoading = true;
      let data = {
        current: this.currentPage,
        size: this.pageSize,
        idNo: this.UserInfo.idNumber
      };
      data = Object.assign(data, this.searchTrainForm);
      getAllTrainPage(data).then(
        res => {
          this.tableLoading = false;
          if (res.code === 200 && typeof(res.data.data) !== 'string') {
            this.tableData = res.data.data;
            this.totalPage = res.data.data.length;
          }
        },
        err => {
          this.tableLoading = false;
          this.$message({ type: "error", message: err.msg || "" });
        }
      );
    },
    // 进入培训
    enterTrain(train){
      this.$router.push({
        name: 'startTrained',
        params: {
          trainName: train.trainName,
          trainperId: train.trainperId,
          trainId: train.trainId
        }
      })
    },
    // 筛选项重置
    resetLog() {
      this.$refs["searchTrainFormRef"].resetFields();
      this.currentPage = 1;
      this.getTrainList();
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTrainList();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTrainList();
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
  >>>.el-input__icon {
    line-height: 32px;
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
          .iconfont{
            font-size: 14px;
            margin-right: 14px;
          }
          .el-icon-coin{
            font-weight: bold;
            margin-right: 14px;
          }
          .split{
            font-style: inherit;
            margin: 0 20px;
          }
          .num{
            color: #FA6400;
          }
        }
      }
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
</style>
