<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox" id="roleBox">
      <div class="handlePart">
        <div class="search toggleBox">
          <div class="handlePart caseHandleSearchPart" :class="isShow?'autoHeight':'aaa'">
            <el-form :inline="true" :model="searchForm" class ref="searchForm">
              <el-form-item label="记录时间" prop='timeList'>
                <el-date-picker v-model="timeList" :clearable="false" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="业务领域" prop='domain'>
                <el-select v-model="searchForm.domain" placeholder="请选择">
                  <el-option v-for="item in lawCateList" :key="item.cateId" :label="item.cateName" :value="item.cateName"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="记录类型" prop='title'>
                <!-- <el-input v-model="searchForm.title"></el-input> -->
                <el-select v-model="searchForm.title" placeholder="请选择">
                  <el-option v-for="(item,index) in recordTitleList" :key="index" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="状态" prop='status'>
                <el-select v-model="searchForm.status" placeholder="请选择" @change="changStatus">
                  <el-option label="全部" value="全部"></el-option>
                  <el-option label="暂存" value="暂存"></el-option>
                  <el-option label="保存" value="保存"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="记录人" prop='otherUser'>
                <el-input v-model="searchForm.otherUser" @change="changeOtherUser"></el-input>
              </el-form-item>
              <!-- <el-form-item>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="medium" icon="el-icon-search" @click="resetSearchData('searchForm')">重置</el-button>
              </el-form-item> -->
              <!-- <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search" @click="createLog">生成日志</el-button>
            </el-form-item> -->
            </el-form>
            <div class="search-btns">
              <!-- <el-button type="primary" size="medium" icon="el-icon-search" @click="searchTableData">查询</el-button> -->
              <el-button size="medium" class="commonBtn searchBtn" title="搜索" icon="iconfont law-sousuo" @click="searchTableData()"></el-button>
              <el-button size="medium" class="commonBtn searchBtn" title="重置" icon="iconfont law-zhongzhi" @click="resetSearchData('searchForm')"></el-button>
              <el-button size="medium" class="commonBtn toogleBtn" :title="isShow? '点击收缩':'点击展开'" :icon="isShow? 'iconfont law-top': 'iconfont law-down'" @click="isShow = !isShow">
              </el-button>
            </div>
          </div>

        </div>

      </div>
      <div style="height:20px;text-align:right" class="chose-mine">
        <!-- <el-form-item prop="name" style="float:right;display:inline-block" class="chose-mine"> -->
        <el-radio style="float:right" v-model="searchForm.name" label="1" @click.native.prevent="changeName()">只显示我的</el-radio>
        <!-- </el-form-item> -->
      </div>
      <div class="tablePart">
        <el-table :data="tableData" stripe style="width: 100%" height="100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="createTime" label="记录时间" align="center"></el-table-column>
          <el-table-column prop="domain" label="业务领域" align="center"></el-table-column>
          <el-table-column prop="title" label="记录类型" align="center"></el-table-column><!-- 显示模板标题 -->
          <el-table-column prop="createUser" label="记录人" align="center"></el-table-column>
          <el-table-column prop="status" label="状态" align="center"></el-table-column>
          <el-table-column fixed="right" label="操作" align="center">
            <template slot-scope="scope">
              <!-- <el-button @click="viewRecord(scope.row)" type="text">查看</el-button> -->
              <el-button @click="editRecord(scope.row)" type="text">查看</el-button>
              <el-button type="text" @click="deleteRecord(scope.row.id)" v-if="scope.row.createUser==createUserName">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="paginationBox">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40]" layout="prev, pager, next,sizes,jumper" :total="totalPage"></el-pagination>
      </div>

    </div>
  </div>
</template>
<script>
import { findRecordListApi, removeRecordByIdApi, findRecordModleByIdApi, findRecordModleTimeByIdApi, findAllModleNameApi } from "@/api/inspection";
import iLocalStroage from "@/common/js/localStroage";
import { deleteFileByCaseAndHuanjieApi } from "@/api/caseHandle";
export default {
  data() {
    return {
      tableData: [], //表格数据
      timeList: [],
      recordTitleList: [],
      multipleSelection: [],
      searchForm: {
        domain: "",
        status: '',
        createUser: iLocalStroage.gets("userInfo").nickName,
        otherUser: '',
        title: '',
        defaultDisplay: true,
        name: ''
      },
      defautSearchForm: {
        domain: "",
        status: '',
        createUser: iLocalStroage.gets("userInfo").nickName,
        otherUser: '',
        defaultDisplay: true,
        name: ''
      },
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      lawCateList: [], //业务领域列表
      createUserName: '',
      isShow: false
    }
  },
  methods: {
    // 查询列表时
    getTableData() {
      console.log('time,creatUser', this.timeList, this.searchForm.createUser)
      let data = {
        startTime: this.timeList[0],
        endTime: this.timeList[1],
        title: this.searchForm.title,
        status: this.searchForm.status == '全部' ? '' : this.searchForm.status,//查询全部的时候不传值
        createUser: this.searchForm.name == '1' || this.searchForm.otherUser == iLocalStroage.gets("userInfo").nickName ? iLocalStroage.gets("userInfo").nickName : '',//只选择我的和记录人为本人时传值
        // 查询条件只有保存时，不传userId
        userId: this.searchForm.status == '保存' && this.searchForm.title == '' && this.searchForm.domain == '' && this.searchForm.otherUser == '' && this.timeList.length == 0 ? '' : iLocalStroage.gets("userInfo").id,
        // 选中只选择我的时，不传值
        otherUser: this.searchForm.otherUser == iLocalStroage.gets("userInfo").nickName ? '' : this.searchForm.otherUser,
        domain: this.searchForm.domain,
        current: this.currentPage,
        size: this.pageSize,
        // 无查询条件未改变时defaultDisplay不传值
        defaultDisplay: this.searchForm.defaultDisplay,
        organId: iLocalStroage.gets("userInfo").organId,
        // name: this.dicSearchForm.name
      };
      findRecordListApi(data).then(
        res => {
          console.log(res)
          this.tableData = res.data.records
          this.totalPage = res.data.total
        },
        error => {
          // reject(error);
        })

    },
    // 查询
    searchTableData() {
      this.currentPage = 1;
      // 如果修改查询条件，则默认查询
      console.log('this.searchForm == this.defautSearchForm', this.searchForm, this.defautSearchForm)
      console.log('this.timeList', this.timeList)
      if (this.searchForm.otherUser || this.searchForm.status || this.searchForm.domain || this.searchForm.title || this.timeList.length != 0) {
        // debugger
        this.searchForm.defaultDisplay = ''

      } else {
        this.searchForm.defaultDisplay = true

      }
      this.getTableData()
    },
    // 查询我的
    viewMine() {
      console.log(":", this.searchForm.name)
      if (this.searchForm.name == 1) {
        // this.searchForm.name=''
      }
      // this.searchForm.name=true
      // if (this.searchForm.name == '') {
      //   this.searchForm.createUser = iLocalStroage.gets("userInfo").username;
      // }
      // this.searchTableData()
    },
    changeName() {
      console.log(":", this.searchForm.name)
      if (this.searchForm.name == '') {
        // 选中只显示我的、
        this.searchForm.name = '1';
        this.searchForm.createUser = iLocalStroage.gets("userInfo").nickName;
        this.searchForm.defaultDisplay = ''
      } else {
        this.searchForm.name = '';
        this.searchForm.defaultDisplay = true
        this.searchForm.createUser = '';

      }
      this.searchForm.otherUser = "";
      this.currentPage = 1;
      // 判断保存
      if (this.searchForm.status == '保存') {
        this.searchForm.defaultDisplay = true
        this.searchTableData()
        // return
      } else {
        this.getTableData()

      }

    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getTableData();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTableData();
    },
    //获取业务领域
    getEnforceLawType() {
      let _this = this
      this.$store.dispatch("getEnforceLawType", "1").then(
        res => {
          _this.lawCateList = res.data;
          // console.log('列表121', _this.lawCateList)
        },
        err => {
          console.log(err);
        }
      );
    },
    // 查看
    viewRecord(row) {
      this.$router.push({
        name: 'inspection_writeRecordInfo',
        params: row
      });
    },
    // 修改
    editRecord(row) {
      this.$store.commit("set_inspection_orderId", row.id)
      debugger
      console.log(row)
      let addOrEiditFlag
      if (row.status == '暂存') {
        addOrEiditFlag = 'temporary'
      }
      if (row.status == '保存') {
        addOrEiditFlag = 'view'
      }
      // debugger
      let _this = this
      let list = []
      console.log('编辑', row)
      // findRecordModleTimeByIdApi(row.templateId).then(
      //   res => {
      //     if (res.code == 200) {
      //       console.log('row.createTime <= res.data', row.createTime, res.data)
      //       if (row.createTime >= res.data) {
      //         // 写记录
      //         // row.addOrEiditFlag = 'edit'
      this.$router.push({
        name: 'inspection_writeRecordInfo',
        params: { id: row.id, addOrEiditFlag: addOrEiditFlag }
        // query: { id: row.id, addOrEiditFlag: addOrEiditFlag }
      });
      //       } else {
      //         this.$message.error('当前模板已修改，该记录不可修改');
      //       }
      //     } else {
      //       this.$message.error(res.msg);
      //     }
      //   },
      //   error => {

      //   })

    },
    // 删除
    deleteRecord(id) {
      console.log('选中的模板', id)
      this.$confirm('确认删除？', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        console.log('删除', id)
        removeRecordByIdApi(id).then(
          res => {
            console.log(res)
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: res.msg
              });
              this.getTableData()
            }
          },
          error => {
            // reject(error);
          })

      })
    },

    getRecordTitleList() {
      let data = iLocalStroage.gets("userInfo").organId
      // debugger
      console.log(data)
      findAllModleNameApi(data).then(
        res => {
          console.log(res)
          this.recordTitleList = res.data
        },
        error => {
          // reject(error);
        })

    },
    // 选择数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log('multipleSelection', this.multipleSelection)
    },
    // 选择数据
    createLog() {
      console.log('multipleSelection', this.multipleSelection)

      if (this.multipleSelection.length == 0) {
        this.$message({ message: '请至少选择一条记录!', type: 'warning' });
      } else {
        this.$message({
          type: "success",
          message: '成功选中，暂未开发'
        });
      }
    },
    resetSearchData(formName) {
      this.$refs[formName].resetFields();
      this.searchForm.defaultDisplay = true
      this.timeList = []
      // debugger
      this.getTableData()
    },
    changStatus() {
      if (this.searchForm.status == '保存') {
        this.searchForm.createUser = ''
      } else {
        this.searchForm.createUser = iLocalStroage.gets("userInfo").nickName
      }
    },
    changeOtherUser() {
      if (this.searchForm.name == '1') {

        this.$set(this.searchForm, 'name', '')
        this.searchForm.name = '';
        this.searchForm.createUser = this.searchForm.otherUser == iLocalStroage.gets("userInfo").nickName ? iLocalStroage.gets("userInfo").nickName : '';
        this.currentPage = 1;
        console.log('        this.searchForm.createUser =', this.searchForm.otherUser)
        if (this.searchForm.otherUser == '' || this.searchForm.otherUser == iLocalStroage.gets("userInfo").nickName) {
          this.searchForm.defaultDisplay = true
        } else {
          this.searchForm.defaultDisplay = ''
        }
        // 判断保存
        if (this.searchForm.status == '保存') {
          this.searchForm.defaultDisplay = true
          this.searchTableData()
          // return
        } else {
          this.getTableData()

        }

      }
    }
  },
  mounted() {
    this.createUserName = iLocalStroage.gets("userInfo").nickName
    this.getTableData();
    this.getEnforceLawType();
    this.getRecordTitleList();
  }
}
</script>
<style lang="scss" src="@/assets/css/card.scss"></style>
<style lang="scss" src="@/assets/css/searchPage.scss"></style>