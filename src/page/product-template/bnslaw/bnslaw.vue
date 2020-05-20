<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox" id="bnslawBox">
      <div class="handlePart">
        <div class="search">
          <el-form :inline="true" :model="bnslawSearchForm" ref="bnslawSearchForm">
            <el-form-item label="法规名称" prop='strName'>
              <el-input v-model="bnslawSearchForm.strName" placeholder="输入法规名称"></el-input>
            </el-form-item>
            <el-form-item label="发布文号" prop="strNumber">
              <el-input v-model="bnslawSearchForm.strNumber" placeholder="发布文号"></el-input>
            </el-form-item>
            <el-form-item label="发布时间" prop="dtmDate">
              <!-- <el-input v-model="bnslawSearchForm.dtmDate" placeholder="发布时间"></el-input> -->
              <el-date-picker v-model="bnslawSearchForm.dtmDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search" @click="getBtnlawListSearch">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search" @click="resetForm('bnslawSearchForm')">重置</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-plus" @click="addBtnlaw">添加(法规)</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="tablePart">
        <el-table :data="tableData" stripe style="width: 100%" height="100%">
          <el-table-column prop="bcode" label="法规编码" align="center" width="80px"></el-table-column>
          <el-table-column prop="strName" label="法规标题" align="center"></el-table-column>
          <el-table-column prop="strOrgan" label="发布机关" align="center"></el-table-column>
          <el-table-column prop="strNumber" label="发布文号" align="center"></el-table-column>
          <el-table-column prop="dtmDate" label="发布时间" align="center"></el-table-column>
          <el-table-column prop="shiDate" label="实施时间" align="center"></el-table-column>
          <el-table-column prop="industryType" label="行业类型" align="center"></el-table-column>
          <el-table-column prop="status" label="时效性" align="center">
            <template slot-scope="scope">
              <div>{{scope.row.status === 0?'有效':'无效'}}</div>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column> -->
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <!-- <el-button type="text" @click="editBtnlaw(scope.row)">编辑</el-button> -->
              <el-button type="text" @click="getBtnlawVal(scope.row)">法条管理</el-button>
              <el-button type="text" @click="getBtnlawDentails(scope.row)">详情</el-button>
              <el-button type="text" @click="deleteBtnlaw(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="paginationBox">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40]" layout="prev, pager, next,sizes,jumper" :total="totalPage"></el-pagination>
      </div>
      <el-dialog :title="dialogTitle" :visible.sync="visible" @close="visible = false" :close-on-click-modal="false" width="30%">
        <el-form :model="addBtnlawForm" :rules="rules" ref="addBtnlawForm" label-width="80px">
          <el-form-item label="法规标题" prop="strName">
            <el-input v-model="addBtnlawForm.strName"></el-input>
          </el-form-item>
          <el-form-item label="发布文号" prop="strNumber">
            <el-input v-model="addBtnlawForm.strNumber"></el-input>
          </el-form-item>
          <el-form-item label="发布机关" prop="strOrgan">
            <el-input v-model="addBtnlawForm.strOrgan"></el-input>
          </el-form-item>
          <el-form-item label="法规效力" prop="drawerName">
            <el-input v-model="addBtnlawForm.drawerName"></el-input>
          </el-form-item>
          <el-form-item label="网站链接" prop="webLink">
            <el-input v-model="addBtnlawForm.webLink"></el-input>
          </el-form-item>
          <el-form-item label="行业类型" prop="industryType">
            <el-input v-model="addBtnlawForm.industryType"></el-input>
          </el-form-item>
          <el-form-item label="发布时间" prop="dtmDate">
            <el-date-picker v-model="addBtnlawForm.dtmDate" type="date" placeholder="选择发布时间" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="实施时间" prop="shiDate">
            <el-date-picker v-model="addBtnlawForm.shiDate" type="date" placeholder="选择发布时间" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="时效性" prop="status">
            <el-input v-model="addBtnlawForm.status"></el-input>
          </el-form-item>
          <el-form-item label="题注" prop="strNote">
            <el-input v-model="addBtnlawForm.strNote"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="addEditbtnlaw">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 详情 -->
      <el-dialog title="法规详情" :visible.sync="dentailVisible" @close="dentailVisible = false" :close-on-click-modal="false" width="30%">
        <el-form :model="addBtnlawForm" :rules="rules" ref="addBtnlawForm" label-width="100px" class="dentail-solid">
          <el-form-item label="法规标题：" prop="strName">
            {{addBtnlawForm.strName}}
          </el-form-item>
          <el-form-item label="发布文号：" prop="strNumber">
            {{addBtnlawForm.strNumber}}
          </el-form-item>
          <el-form-item label="发布机关：" prop="strOrgan">
            {{addBtnlawForm.strOrgan}}
          </el-form-item>
          <el-form-item label="法规效力：" prop="drawerName">
            {{addBtnlawForm.drawerName}}
          </el-form-item>
          <el-form-item label="网站链接：" prop="webLink">
            {{addBtnlawForm.webLink}}
          </el-form-item>
          <el-form-item label="行业类型：" prop="industryType">
            {{addBtnlawForm.industryType}}
          </el-form-item>
          <el-form-item label="发布时间：" prop="dtmDate">
            {{addBtnlawForm.statdtmDateus}}
          </el-form-item>
          <el-form-item label="实施时间：" prop="shiDate">
            {{addBtnlawForm.shiDate}}
          </el-form-item>
          <el-form-item label="时效性：" prop="status">
            {{addBtnlawForm.status === 0?'有效':'无效'}}
          </el-form-item>
          <el-form-item label="题注：" prop="strNote">
            {{addBtnlawForm.strNote}}
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dentailVisible = false">关闭</el-button>
        </span>
      </el-dialog>

    </div>
  </div>
</template>
<script>

import { mapGetters } from "vuex";
import {
  getBnsLawListApi, addBnsLawApi, deleteBnslawApi
} from "@/api/system";
export default {
  data() {
    return {
      tableData: [], //表格数据
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      searchName: "", //查询名称
      bnslawSearchForm: {
        strName: "",
        strNumber: '',
        dtmDate: '',
      },
      info: "",
      dialogTitle: "添加法规",
      visible: false,
      dentailVisible: false,
      // 添加、修改
      addBtnlawForm: {
        strName: '',
        drawerName: '',
        webLink: '',
        dtmDate: '',
        strNumber: '',
        strOrgan: '',
        industryType: '',
        shiDate: '',
        strNote: '',
        status: 1,
      },
      rules: {},
    };
  },
  inject: ["reload"],
  methods: {
    //获取法规列表
    getBtnlawList() {
      let data = {
        current: this.currentPage,
        size: this.pageSize,
        strName: this.bnslawSearchForm.strName,
        strNumber: this.bnslawSearchForm.strNumber,
        // dtmDate: JSON.stringify(this.bnslawSearchForm.dtmDate)
      };
      let _this = this;

      getBnsLawListApi(data).then(
        res => {
          console.log('类型', res);
          // this.caseTypeList = res.data.records;
          console.log("法规列表", res);
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
      // this.$refs.showBtnlawKeyRef.showModal(row);
      this.$store.commit("SET_BTNLAW_ID", row.id);
      this.$router.push({
        name: 'lawRegulations',
        // params:{
        //   personInfo:data,
        //   pageStatus:param
        // }
      });
    },
    //删除法规
    deleteBtnlaw(id) {
      console.log("12345", id);
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        getBnsLawListApi(id).then(
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
    //添加法规
    addBtnlaw() {
      this.visible = true
    },
    addEditbtnlaw() {
      let data = this.addBtnlawForm;
      let _this = this;
      console.log(typeof (this.addBtnlawForm.status))
      addBnsLawApi(data).then(
        res => {
          console.log("添加法规", res);
          if (res.code == '200') {
            this.visible = false;
            this.getBtnlawList();
          } else {
            this.$message.error('添加失败');
            return
          }
        },
        error => {
          console.log(error)
          this.$message.error('添加失败');
        }
      );
    },
    //编辑法规
    editBtnlaw(row) {
      let data = {
        row: row,
        pid: ""
      };
      this.$refs.addEditBtnlawRef.showModal(2, data, "list");
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
    }
  },
  created() {
    this.getBtnlawList();
  }
};
</script>

<style lang="scss">
@import "@/assets/css/systemManage.scss";
</style>
