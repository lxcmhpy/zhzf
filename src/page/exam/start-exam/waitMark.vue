<template>
  <el-card class="box-card mark-card">
    <div class="page-content">
      <div class="top-handle">
        <div class="back-btn" @click="$router.go(-1)">
          <i class="el-icon-arrow-left"></i>返回
        </div>
      </div>
      <!-- 列表内容区域 -->
      <div class="content-wrap">
        <div class="search-wrap">
          <div class="mark-total">未评分人数：49</div>
          <div class="mark-search">
            <el-form :inline="true" label-width="120px">
              <el-form-item label="人员名称">
                <el-input v-model="personName"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button title="搜索" class="searchBtn" size="medium" icon="iconfont law-sousuo" @click="currentPage = 1;getPersonScoreList();"></el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="outline-table">
          <el-table
            :data="tableData"
            stripe
            style="width: 100%"
            v-loading="tableLoading"
            element-loading-spinner="car-loading"
            element-loading-text="加载中..."
          >
            <el-table-column prop="personName" label="人员名称" align="left"></el-table-column>
            <el-table-column prop="rollingTime" label="交卷时间" align="center"></el-table-column>
            <el-table-column prop="oname" label="所属机构" align="center"></el-table-column>
            <el-table-column prop="roomName" label="考场" align="center"></el-table-column>
            <el-table-column label="操作" width="220px" align="center">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.isScored === '1'"
                  type="primary"
                  size="medium"
                  @click="entryMarkList(scope.row)">评分</el-button>
                <span v-if="scope.row.isScored === '0'" style="color: #4AAF99;">已评分</span>
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
            :page-sizes="[10, 20, 30, 40]"
            layout="prev, pager, next,sizes,jumper"
            :total="totalPage"
          ></el-pagination>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
// import { setToken } from "@/common/js/auth";

export default {
  data() {
    return {
      personName: "",
      tableData: [],
      tableLoading: false,
      currentPage: 1,
      totalPage: 10,
      pageSize: 10
    };
  },
  computed: {
    examId(){
      return this.$route.query.examId;
    }
  },
  created(){
    this.getPersonScoreList();
  },
  methods: {
    // 获取待评分人员列表
    getPersonScoreList(){
      this.tableLoading = true;
      const queryData = {
        examId: this.examId,
        personName: this.personName,
        current: this.currentPage,
        size: this.pageSize
      };
      this.$store.dispatch('getPersonScoreList', queryData).then(res => {
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
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getPersonScoreList();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getPersonScoreList();
    },
    // 点击评分进入评分页面
    entryMarkList(row){
      this.$router.push({
        path: '/markQuestion',
        query: {
          examperId: row.examperId
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.mark-card {
  width: 100%;
  height: 100%;
  border: none;
  border-top: 14px solid #4573d0;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  background-color: #fff;
  >>>.el-card__body{
    position: relative;
    height: calc(100% - 40px);
    .el-table__body-wrapper{
      padding-bottom: 0;
    }
  }
  .page-content {
    height: 100%;
    position: relative;
    .top-handle {
      padding-bottom: 20px;
      border-bottom: 1px solid #eee;
      .back-btn {
        display: inline-block;
        cursor: pointer;
        color: #7b7b7b;
        .el-icon-arrow-left {
          margin-right: 6px;
        }
        &:hover {
          color: #4573d0;
        }
      }
    }
    .content-wrap {
      margin: 20px 0;
      height: calc(100% - 180px);
      .search-wrap {
        display: flex;
        margin-bottom: 10px;
        align-items: center;
        justify-content: space-between;
        .searchBtn {
          background: #eee;
        }
        .mark-total{
          font-size: 14px;
          color: #7B7B7B;
        }
        .mark-search{
          >>>.el-form-item{
            margin-bottom: 0;
          }
        }
      }
      .outline-table{
        height: 100%;
      }
    }
    .paginationBox{
      text-align: center;
    }
  }
}
</style>
