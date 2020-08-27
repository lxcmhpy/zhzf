<template>
  <div class="cats-layout-page-content">
    <div class="searchAndpageBox toggleBox">
      <div class="handlePart" style="margin-left: 0px;">
        <div class="search">
          <el-form :inline="true">
            <el-form-item label="检查名称">
              <el-input v-model="search.batchName" clearable placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="cats-common" icon="el-icon-search" @click="searchData">查询
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="cats-common" icon="el-icon-refresh-left" @click="resetSearch">重置
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="cats-common" icon="el-icon-plus" @click="add_openDialog">新增
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="tablePart">
        <!-- @row-click="handleNodeClick" -->
        <el-table :data="dataList" stripe resizable border style="width: 100%;height:100%;" row-key="id">
          <el-table-column prop="batchName" label="检查名称" align="center"></el-table-column>
          <el-table-column prop="batchYear" label="所属年份" align="center"></el-table-column>
          <el-table-column prop="ajBsjs" label="案卷基数(省)" align="center"></el-table-column>
          <el-table-column prop="ajCqjs" label="案卷/抽取基数(省)" align="center"></el-table-column>
          <el-table-column prop="ryBsjs" label="人员基数(省)" align="center"></el-table-column>
          <el-table-column prop="ryCqjs" label="人员抽取数(省)" align="center"></el-table-column>
          <!-- <el-table-column prop="personKs" label="人员考试数(省)" align="center"></el-table-column> -->
          <el-table-column label="操作" align="center" width="120">
            <template slot-scope="scope">
              <el-button type="text" @click="update_openDialog(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="paginationBox">
        <div v-if="totalPage / dataList.length > 1">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40]" layout="prev, pager, next,sizes,jumper" :total="totalPage"></el-pagination>
        </div>
        <div class="noMore" v-else>没有更多了</div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  findPykhBatchByPage,
  deletePykhBatchById,
  getCurrentBatchId
} from '@/api/pykh/catsAppraisalStartUp.js'
import iLocalStroage from '@/common/js/localStroage'
export default {
  data() {
    return {
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      search: {},
      dataList: []
    }
  },
  methods: {
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      this.fetchData()
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData()
    },
    fetchData() {
      let data = {
        current: this.currentPage,
        size: this.pageSize,
        batchName: this.search.batchName
      }
      let _this = this
      findPykhBatchByPage(data).then(res => {
        if (res.code == 200) {
          _this.dataList = res.data.records
          _this.totalPage = res.data.total
        }
      })
    },
    searchData() {
      this.fetchData()
    },
    add_openDialog() {
      let _this = this
      getCurrentBatchId().then(res => {
        if (res.code == 200) {
          if (res.data === null) {
            let routerData = {
              type: '0',
              url: this.$route.name
            }
            _this.$router.push({
              name: 'catsAppraisalStartUpAdd',
              params: routerData
            })
          } else {
            _this.catsMessage({
              type: 'warning',
              message: '本年已发起考核,不能重复发起'
            })
            return
          }
        }
      })
    },
    update_openDialog(data) {
      data.type = '1'
      this.$router.push({
        name: 'catsAppraisalStartUpAdd',
        params: data
      })
    },
    deletePykhBatchById(data) {
      deletePykhBatchById(data.id).then(res => {
        if (res.code == 200) {
          this.fetchData()
        }
      })
    },
    resetSearch() {
      this.search = {}
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>
