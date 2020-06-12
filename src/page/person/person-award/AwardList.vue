<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox" id="logBox">
      <div class="handlePart">
        <div class="search">
          <el-form :inline="true" :model="listAwardForm" ref="listAwardForm">
            <el-form-item label="id" v-show="false" prop="awardId">
              <el-input v-model="listAwardForm.awardId"></el-input>
            </el-form-item>
            <el-form-item label="奖励类型" prop="awardType">
              <el-select v-model="listAwardForm.awardType" placeholder="奖励类型">
                <el-option label="demo0" value="0"></el-option>
                <el-option label="demo1" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="奖励日期时间">
              <el-form-item prop="awardDate">
                <el-date-picker
                  type="datetime"
                  v-model="listAwardForm.awardDate"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期时间"
                  align="right"
                  :picker-options="pickerOptions"
                ></el-date-picker>
              </el-form-item>
            </el-form-item>
            <el-form-item label="奖励日期">
              <el-form-item prop="awardDateInfo">
                <el-date-picker
                  type="date"
                  v-model="listAwardForm.awardDateInfo"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </el-form-item>
            <el-form-item label="数据类型" prop="dataType">
              <el-select v-model="listAwardForm.dataType" placeholder="数据类型">
                <el-option label="demo0" value="0"></el-option>
                <el-option label="demo1" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                icon="el-icon-plus"
                size="medium"
                @click="addAwardComPage"
              >新增</el-button>
              <el-button type="warning" size="medium" @click="editAward(scope.row)">修改</el-button>
              <el-button type="info" icon="el-icon-search" size="medium" @click="currentPage = 1 ;getAward();">查询</el-button>
              <el-button type="primary" size="medium" @click="resetLog">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="tablePart" style="margin-top:-35px">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%;height:100%;"
          @selection-change="selectUser"
        >
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column prop="awardType" label="奖励类型" align="center"></el-table-column>
          <el-table-column prop="note" label="备注" align="center"></el-table-column>
          <el-table-column prop="awardDate" label="奖励日期时间" align="center"></el-table-column>
          <el-table-column prop="reward" label="奖励原因" align="center"></el-table-column>
          <el-table-column prop="awardDept" label="奖励机构" align="center"></el-table-column>
          <el-table-column prop="dataType" label="数据类型" align="center"></el-table-column>

          <el-table-column prop="opt" label="操作项" align="center">
            <template slot-scope="scope">
              <el-button @click="editAward(scope.row)" type="text">修改</el-button>
              <el-button type="text" @click="deleteAwardById(scope.row)">删除</el-button>
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
    <addAwardComp ref="addAwardCompRef" @getAwardList="getAward"></addAwardComp>
  </div>
</template>
<script>
import addAwardComp from "./AddAward";
export default {
  data() {
    return {
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      tableData: [],
      listAwardForm: {
        awardId: "",
        personId: "",
        awardType: "",
        note: "",
        awardDate: "",
        awardDateInfo: null,
        reward: "",
        awardDept: "",
        createId: "",
        createTime: "",
        modifyId: "",
        modifyTime: "",
        isDel: "",
        dataType: "",
        personId: ""
      },
      selectDataIdList: [], //选中执法人员id
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      filters: {
        formatDate(time) {
          var date = new Date(time);
          return formatDate(date, "yyyy-MM-dd");
        }
      }
    };
  },
  components: {
    //新增组件
    addAwardComp
  },
  methods: {
    //修改人员信息
    editAward(row) {
      this.$refs.addAwardCompRef.showModal(2, row);
    },
    //根据id删除单个人员信息
    deleteAwardById(row) {
      let _this = this;
      this.$confirm("确定要删除该人员吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        iconClass: "el-icon-question",
        customClass: "custom-confirm"
      })
        .then(() => {
          _this.$store.dispatch("deleteAwardByIdModudle", row.awardId).then(
            res => {
              _this.$message({
                type: "success",
                message: "删除成功!"
              });
              //重新加载页面数据
              _this.getAward();
            },
            err => {
              console.log(err);
            }
          );
        })
        .catch(() => {});
    },
    //删除所选择的用户信息
    deleteAward() {
      let _this = this;
      this.$confirm("确定要删除所选的人员吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        iconClass: "el-icon-question",
        customClass: "custom-confirm"
      })
        .then(() => {
          _this.$store
            .dispatch("deleteAwardModudle", _this.selectDataIdList)
            .then(
              res => {
                _this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                //重新加载页面数据
                _this.getAward();
              },
              err => {
                console.log(err);
              }
            );
        })
        .catch(() => {});
    },
    addAwardComPage() {
      this.$refs.addAwardCompRef.showModal(1, "");
    },
    //条件查询
    getAward() {
      let _this = this;
      let data = {
        awardType: _this.listAwardForm.awardType,
        awardDate: _this.listAwardForm.awardDate,
        awardDateInfo: _this.listAwardForm.awardDateInfo,
        dataType: _this.listAwardForm.dataType,
        current: _this.currentPage,
        size: _this.pageSize,
        personId: _this.$route.params.personInfo.personId
      };
      _this.$store.dispatch("getAwardListMoudle", data).then(res => {
        _this.tableData = res.data.records;
        _this.totalPage = res.data.total;
      });
      err => {
        console.log(err);
      };
    },
    // 重置
    resetLog() {
      this.$refs["listAwardForm"].resetFields();
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getAward();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getAward();
    },
    //获取选中的user
    selectUser(val) {
      this.selectDataIdList = [];
      let _this = this;
      val.forEach((item, index) => {
        _this.selectDataIdList.push(item.awardId);
      });
    }
  },
  created() {
    this.getAward();
  }
};
</script>
<style lang="scss">
@import "@/assets/css/personManage.scss";
</style>
