<template>
  <div class="com_searchAndpageBoxPadding recordModleManage">
    <div class="searchAndpageBox" id="roleBox">
      <div class="">
        <div class="search toggleBox">
          <div
            class="handlePart caseHandleSearchPart"
            :class="isShow ? 'autoHeight' : 'aaa'"
          >
            <el-form :inline="true" :model="searchForm" class ref="searchForm">
              <el-form-item>
                <el-button
                  icon="el-icon-plus"
                  type="primary"
                  size="medium"
                  @click="addNewModle"
                  v-if="isHome"
                  >新增模板</el-button
                >
              </el-form-item>
              <el-form-item label="业务领域" prop="domain">
                <el-select v-model="searchForm.domain" placeholder="请选择">
                  <el-option
                    v-for="item in lawCateList"
                    :key="item.cateId"
                    :label="item.cateName"
                    :value="item.cateName"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="模板标题" prop="title">
                <el-input
                  v-model="searchForm.title"
                  placeholder="请输入模板名称"
                ></el-input>
              </el-form-item>
            </el-form>
            <div class="search-btns">
              <el-button
                size="medium"
                class="commonBtn searchBtn"
                title="搜索"
                icon="iconfont law-sousuo"
                @click="searchTableData()"
              ></el-button>
              <el-button
                size="medium"
                class="commonBtn searchBtn"
                title="重置"
                icon="iconfont law-zhongzhi"
                @click="resetSearchData('searchForm')"
              ></el-button>
              <el-button
                size="medium"
                class="commonBtn toogleBtn"
                :title="isShow ? '点击收缩' : '点击展开'"
                :icon="isShow ? 'iconfont law-top' : 'iconfont law-down'"
                @click="isShow = !isShow"
              >
              </el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="tablePart-no">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            prop="domain"
            label="业务领域"
            align="center"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="title"
            label="模板标题"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="title"
            label="模板管理者"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="title"
            label="关联文书"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="isTransferToCase"
            label="转立案"
            align="center"
          ></el-table-column>
          <el-table-column label="操作" align="center" width="300">
            <template slot-scope="scope">
              <!-- <el-button @click="viewRecord(scope.row)" type="text">查看</el-button> -->
              <el-button @click="editModle(scope.row)" type="text"
                >修改</el-button
              >
              <el-button
                type="text"
                @click="delModle(scope.row.id)"
                v-if="scope.row.createUser == createUserName"
                >删除</el-button
              >
              <el-button @click="editModle(scope.row)" type="text"
                >复制模板</el-button
              >
              <el-button @click="editModle(scope.row)" type="text"
                >文书配置</el-button
              >
              <el-button @click="editModle(scope.row)" type="text"
                >转立案</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- <div class="paginationBox">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40]" layout="prev, pager, next,sizes,jumper" :total="totalPage"></el-pagination>
      </div> -->
    </div>

    <preview ref="previewRef" @userList="getPreviewList"></preview>
    <addModle ref="addModleRef" @getAddModle="getAddModle"></addModle>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import iLocalStroage from "@/common/js/localStroage";
import preview from "./previewDialog.vue";
import addModle from "./addModle.vue";
import {
  findRecordlModleByNameApi,
  findRecordModleByIdApi,
  removeMoleByIdApi,
  findRecordlModleByPageApi,
  findRecordModleByNameIdApi,
  findRecordModleByPersonApi,
  findUserCollectTemplateApi,
  removeMoleCollectByIdApi
} from "@/api/inspection";
import Vue from "vue";
import { mapGetters } from "vuex";
export default {
  components: {
    preview,
    addModle
  },
  data() {
    return {
      isHome: true,
      searchModleName: "",
      compData: [],
      viewFlag: [],
      modleList: [],
      modleSaveList: [], //收藏列表
      modleSaveListDefaut: [], //收藏列表
      currentUserLawId: "",
      modleSaveListFlag: true,
      showSave: true,
      tableData: [], //表格数据
      // currentPage: 1, //当前页
      // pageSize: 10, //pagesize
      // totalPage: 0, //总页数
      createUserName: "",
      isShow: false,
      lawCateList: [], //业务领域列表
      searchForm: {
        domain: "",
        status: "",
        createUser: iLocalStroage.gets("userInfo").nickName,
        otherUser: "",
        title: "",
        defaultDisplay: true,
        name: ""
      }
    };
  },
  methods: {
    addNewModle() {
      this.$refs.addModleRef.showModal();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //查询
    getAddModle(list) {
      console.log("getAddModle", list);
      this.getTableData();
    },
    //查询
    getPreviewList(list) {
      console.log("getPreviewList", list);
      setTimeout(() => {}, 100);
    },
    // 选择模板
    writeRecord(item) {
      // 写记录
      this.$router.push({
        name: "inspection_writeInfoRecord",
        // params: item
        // query: { id: item.id, addOrEiditFlag: 'add' }
        params: {
          id: item.id,
          addOrEiditFlag: "add"
        }
      });

      // this.$store.commit("set_inspection_orderId", item.id);
    },
    // 删除模板
    delModle(item) {
      console.log("选中的模板", item);
      this.$confirm("确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        console.log("删除", item.id);
        let data = {
          id: item.id,
          userId: iLocalStroage.gets("userInfo").id
        };

        removeMoleByIdApi(data).then(
          res => {
            console.log(res);
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: res.msg
              });
              this.getTableData();
              this.searchSaveList();
            }
          },
          error => {
            // reject(error);
          }
        );
      });
    },
    // 预览
    preview() {
      this.$refs.previewRef.showModal(this.compData);
    },
    handleChange(val) {
      console.log(val);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getTableData() {
      let data = {
        organId: iLocalStroage.gets("userInfo").organId,
        templateUserId: iLocalStroage.gets("userInfo").id,
        domain: this.searchForm.domain, //业务领域
        title: this.searchForm.title
        // size: this.pageSize,
        // current: this.currentPage,
      };
      findRecordlModleByPageApi(data).then(
        res => {
          // debugger
          console.log(res);
          if (res.data) {
            // this.tableData = res.data.records
            this.tableData = res.data;
            // this.totalPage = res.data.total
          }
        },
        error => {
          // reject(error);
        }
      );
    },
    searchSaveList() {
      let data = iLocalStroage.gets("userInfo").id;
      findUserCollectTemplateApi(data).then(
        res => {
          console.log(res);
          if (res.data) {
            this.modleSaveList = res.data;
            this.modleSaveListDefaut = JSON.parse(JSON.stringify(res.data));
          }
        },
        error => {
          // reject(error);
        }
      );
    },
    //更改每页显示的条数
    // handleSizeChange(val) {
    //   this.pageSize = val;
    //   this.currentPage = 1;
    //   this.getTableData();
    // },
    //更换页码
    // handleCurrentChange(val) {
    //   this.currentPage = val;
    //   this.getTableData();
    // }, // 选择数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log("multipleSelection", this.multipleSelection);
    },
    resetSearchData(formName) {
      this.$refs[formName].resetFields();
      this.searchForm.defaultDisplay = true;
      // debugger
      this.getTableData();
    },
    // 查询
    searchTableData() {
      // this.currentPage = 1;
      // 如果修改查询条件，则默认查询
      this.getTableData();
    },
    //获取业务领域
    getEnforceLawType() {
      let _this = this;
      this.$store.dispatch("getEnforceLawType", "1").then(
        res => {
          _this.lawCateList = res.data;
        },
        err => {
          console.log(err);
        }
      );
    },
    // 修改模板
    editModle(item) {
      console.log("选中的模板", item);
      this.$refs.addModleRef.showModal(item);
    }
  },
  mounted() {
    this.createUserName = iLocalStroage.gets("userInfo").nickName;
    this.getTableData();
    this.searchSaveList();
    this.getEnforceLawType();
  }
};
</script>
<style lang="scss" src="@/assets/css/card.scss"></style>
<style lang="scss" src="@/assets/css/searchPage.scss"></style>
<style lang="scss">
.recordModleManage {
  .toggleBox {
    .handlePart{
      padding-left: 0px;
    }
  }
  #roleBox {
    height: inherit;
    .tablePart-no {
      height: calc(100% - 67px);
      overflow: auto;
    }
  }
}
</style>
