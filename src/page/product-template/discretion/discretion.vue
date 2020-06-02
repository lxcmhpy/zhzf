<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox" id="discretionBox">
      <div class="handlePart">
        <div class="search">
          <el-form :inline="true" :model="discretionSearchForm" ref="discretionSearchForm">
            <el-form-item label="违法行为" prop='causeName'>
              <el-input v-model="discretionSearchForm.causeName" placeholder="输入违法行为"></el-input>
            </el-form-item>
            <el-form-item label="违法程度" prop="drawerId">
              <el-select v-model="discretionSearchForm.drawerId" placeholder="请选择"  @change="getWfcdType"  style="width:260px;" >
                <el-option v-for="item in drawerList" 
                    :key="item.id" 
                    :label="item.name" 
                    :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label=" " label-width="13px">
                <el-button size="medium" class="commonBtn searchBtn" title="搜索" icon="iconfont law-sousuo" @click="getDiscretionListSearch(1)"></el-button>
                <el-button size="medium" class="commonBtn searchBtn" title="重置" icon="iconfont law-zhongzhi" @click="reset"></el-button>
                <el-button size="medium" class="commonBtn addBtn" title="新增自由裁量权" icon="iconfont law-adduser" @click="addDiscretion"></el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="tablePart">
        <el-table :data="tableData" stripe style="width: 100%" height="100%">
          <el-table-column prop="causeName" label="违法行为" align="left"></el-table-column>
          <el-table-column prop="drawerName" label="违法程度" align="left"></el-table-column>
          <el-table-column prop="wfqj" label="违法情节" align="center"></el-table-column>
          <el-table-column prop="upperLimit" label="下限" align="center"></el-table-column>
          <el-table-column prop="jycf" label="建议处罚" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="editDiscretion(scope.row)">编辑</el-button>
              <el-button type="text" @click="deleteDiscretion(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="paginationBox">
        <el-pagination @size-change="handleSizeChange" 
                @current-change="handleCurrentChange" 
                :current-page="currentPage" background 
                :page-sizes="[10, 20, 30, 40]" 
                layout="prev, pager, next,sizes,jumper" 
                :total="totalPage">
          </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>

import { mapGetters } from "vuex";
import {
  getDiscretionListApi, deleteDiscretionByIdApi
} from "@/api/system";
export default {
  data() {
    return {
      tableData: [], //表格数据
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      searchName: "", //查询名称
      discretionSearchForm: {
        causeName: "",
        drawerId: '',
      },
      visible: false,
      dentailVisible: false,
      drawerList: [], //程度
    };
  },
  inject: ["reload"],
  methods: {
    //获取法规列表
    getDiscretionList() {
      let data = {
        current: this.currentPage,
        size: this.pageSize,
        strName: this.bnslawSearchForm.strName,
        strNumber: this.bnslawSearchForm.strNumber,
        startTime: this.bnslawSearchForm.dtmDate? this.bnslawSearchForm.dtmDate[0] : '',
        endTime: this.bnslawSearchForm.dtmDate? this.bnslawSearchForm.dtmDate[1] : '',
      };
      let _this = this;
      getDiscretionListApi(data).then(
        res => {
          console.log('类型', res);
          _this.tableData = res.data.records;
          _this.totalPage = res.data.total;
        },
        error => {
          console.log(error)
        }
      );
    },
    // 查询
    getBtnlawListSearch() {
      this.currentPage = 1;
      this.getBtnlawList()
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.currentPage = 1;
      this.getBtnlawList()
    },
    //详情
    getBtnlawDentails(row) {
      this.addBtnlawForm = row
      this.dentailVisible = true
    },
    //获取法规值
    getBtnlawVal(row) {
      this.$store.commit("SET_BTNLAW_ID", row.id);
      this.$router.push({
        name: 'lawRegulations',
        params: {strName: row.strName}
      });
    },
    //删除法规
    deleteBtnlaw(id) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBnslawApi(id).then(
          res => {
            console.log('类型', res);
            if (res.code == 200) {
              this.getBtnlawList()
            } else {
              this.$message({
                type: 'info',
                message: '删除失败'
              });
            }
          },
          error => {
            console.log(error)
          }
        );
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    //编辑法规
    editBtnlaw(row) {
      this.visible = true;
      let data = {
        id :row.id
      };
      this.isAdd=true;
      getBnsLawByIdApi(data).then(
        res => {
          console.log("bnslaw",res);
          this.addBtnlawForm = res.data;
        });
        err => {
          console.log(err);
        };
    },
   closeTitle(){
      this.visible = false;
      this.$refs["addBtnlawForm"].resetFields();
   },
   selectDrawer(vId){ 
        let obj = {};
        obj = this.lawLimitList.find((item)=>{ 
            return item.id === vId;
        });
        return obj.name;
     },
    selectIndustry(vId){ 
        let obj = {};
        obj = this.lawCateList.find((item)=>{ 
            return item.cateId === vId;
        });
        return obj.cateName;
     },
    //添加法规
    addBtnlaw() {
      this.visible = true
    },
    addEditbtnlaw() {
      this.addBtnlawForm.drawerName =this.selectDrawer(this.addBtnlawForm.drawerId);
      this.addBtnlawForm.industryType =this.selectIndustry(this.addBtnlawForm.industryTypeId);
      let data = this.addBtnlawForm;
      let _this = this;
      addBnsLawApi(data).then(
        res => {
          console.log("添加法规", res);
          if (res.code == '200') {
             this.$message({ message: '添加成功',type: 'success'});
            this.visible = false;
            this.getBtnlawList();
          } else {
            this.$message.error('添加失败');
            return
          }
        },
        error => {
          console.log(error)
        }
      );
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getBtnlawList();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getBtnlawList();
    },
    //获取法规值
    getBtnlawKeyList(data) {
      // let this = this
      this.$store.dispatch("getBtnlawListDetail", data).then(
        res => {
          console.log("法规值列表", res);
          if (res.data.length != 0) {
            this.info = "此数据法规已维护法规值，确认删除吗？";
          } else {
            this.info = "确认删除?";
          }
          this.$confirm(this.info, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$store.dispatch("deleteBtnlaw", data).then(
                res => {
                  this.reload();
                  this.$message({
                    type: "success",
                    message: "删除成功!"
                  });
                },
                err => {
                  console.log(err);
                }
              );
            })
            .catch(() => { });
        },
        err => {
          console.log(err);
        }
      );
    },
    // 抽屉表
    getlawCateList() {
      this.$store.dispatch("getEnforceLawType", "1").then(
        res => {
        console.log('getEnforceLawType',res)
          this.lawCateList = res.data;
        },
        err => {
          console.log(err);
        }
      );
       getDictListDetailByNameApi('法规效力').then(res => {
         console.log('法规效力',res)
          this.lawLimitList = res.data;
        }, err => {
          console.log(err);
        })
    }
  },
  created() {
    this.getBtnlawList();
    this.getlawCateList();
  }
};
</script>

<style lang="scss" src="@/assets/css/systemManage.scss">
/* @import "@/assets/css/systemManage.scss"; */
</style>
