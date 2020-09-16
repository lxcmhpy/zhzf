<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="fullBox departBox">
      <div class="departOrUserTree" v-loading="treeLoading" element-loading-spinner="car-loading">
        <p>
          <i class="left-splitline"></i>题库大纲
        </p>
        <!-- 大纲列表 -->
        <outlineList
          v-if="outlineData.length"
          ref="outlineList"
          :treeData="outlineData"
          :treeProps="defaultProps"
          :defaultExpandedKeys="defaultExpandedKeys"
          nodeKey="outlineId"
          @clickTreeNode="handleNodeClick"
        />
      </div>
      <div class="departTable">
        <div class="handelBtn" style="margin-bottom:0px;">
          <div>
            <el-form
              :inline="true"
              :model="questionOutlineForm"
              label-width="120px;"
              ref="questionOutlineFormRef"
            >
              <div class="item">
                <el-row>
                  <el-form-item label="题型" prop="questionType">
                    <el-select
                      v-model="questionOutlineForm.questionType"
                      placeholder="选择题型"
                      remote
                      @focus="getDictInfo('考试-试题类型','questionTypeList')"
                    >
                      <el-option
                        v-for="value in questionTypeList"
                        :key="value.id"
                        :label="value.name"
                        :value="value.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="难度" prop="questionLevel">
                    <el-select
                      v-model="questionOutlineForm.questionLevel"
                      placeholder="选择难度"
                      remote
                      @focus="getDictInfo('考试-试题难度','levelList')"
                    >
                      <el-option
                        v-for="value in levelList"
                        :key="value.id"
                        :label="value.name"
                        :value="value.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="试题内容" prop="questionName" placeholder="试题内容">
                    <el-input v-model="questionOutlineForm.questionName"></el-input>
                  </el-form-item>
                  <el-form-item style="margin-left:5px;">
                    <el-button
                      title="搜索"
                      class="commonBtn searchBtn"
                      size="medium"
                      icon="iconfont law-sousuo"
                      @click="currentPage = 1; getSelectOutline()"
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
                <el-row v-if="handleLimit">
                  <el-form-item>
                    <el-button
                      type="primary"
                      icon="el-icon-plus"
                      size="medium"
                      @click="addQuestionInfo('','1')"
                    >新增考题</el-button>
                    <el-button type="info" size="medium" @click="batchImport">批量导入</el-button>
                    <el-button type="info" size="medium" @click="batchStart">批量启用</el-button>
                  </el-form-item>
                </el-row>
              </div>
            </el-form>
          </div>
        </div>
        <el-table
          :data="tableData"
          stripe
          class="question-table"
          :class="{'noHandle': handleLimit}"
          style="width: 100%"
          v-loading="tableLoading"
          element-loading-spinner="car-loading"
          element-loading-text="加载中..."
          @selection-change="selectDataInfo"
        >
          <el-table-column type="selection" width="40" align="center"></el-table-column>
          <el-table-column prop="outlineName" align="left">
            <template slot="header">
              <div class="header-total">全部试题（{{ totalPage }}）</div>
            </template>
            <template slot-scope="scope">
              <div class="question-row-cnt">
                <div class="question-item">
                  <span
                    class="level-name"
                    :class="`level-${questionLevelNume.indexOf(scope.row.questionLevelName)}`"
                  >{{scope.row.questionLevelName}}</span>
                  <span class="question-desc">{{scope.row.questionName}}</span>
                </div>
                <div>
                  <el-tooltip
                    :content="`已${scope.row.isUse === '0' ? '启用' : '停用'}`"
                    placement="top"
                  >
                    <el-switch
                      :value="scope.row.isUse"
                      active-color="#13ce66"
                      inactive-color="#7E828C"
                      :active-value="'0'"
                      :inactive-value="'1'"
                      @change="changeIsUse($event, scope.row)"
                    ></el-switch>
                  </el-tooltip>
                </div>
              </div>
              <div class="question-row-cnt">
                <div>
                  <span class="m-r-34">题型：{{scope.row.questionTypeName}}</span>
                  <span class="m-r-34">命题时间：{{scope.row.createTime}}</span>
                  <span>命题人：{{scope.row.createName}}</span>
                </div>
                <div>
                  <el-button
                    @click.stop="viewQuestion(scope.row)"
                    type="text"
                    style="margin-right: 30px;"
                  >预览</el-button>
                  <el-button
                    v-if="handleLimit"
                    type="text"
                    style="margin-right: 30px;"
                    @click.stop="updateQuestionInfo(scope.row.questionId, '2')"
                  >修改</el-button>
                  <el-button
                    v-if="handleLimit"
                    type="text"
                    @click.stop="deleteQuestionInfo(scope.row.questionId)"
                  >删除</el-button>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
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
      <addMaintainQuestion ref="addMaintainQuestionRef" @getAllQuestion="getSelectOutline"></addMaintainQuestion>
      <!-- 试题预览 -->
      <preViewQuestion ref="preViewQuestion" />
      <!-- 批量上传 -->
      <importQuestion ref="importQuestion" @reloadQuestion="getSelectOutline" />
    </div>
  </div>
</template>
<script>
import addMaintainQuestion from "./addMaintainQuestion";
import errorPage from "./../../common/erroPage";
import outlineList from "@/components/examComponents/outlineList";
import preViewQuestion from "./preViewQuestion";
import importQuestion from "./importQuestion";

export default {
  data() {
    return {
      selectCurrentTreeName: "",
      outlineData: [],
      defaultProps: {
        children: "children",
        label: "outlineName"
      },
      tableData: [], //表格数据
      departLevel: 0, //级别
      defaultExpandedKeys: [], //默认展开的key
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      currentOutlineId: "", //当前organ的id
      showAddDialog: false,
      systemType: "", //系统类型：部级还是省级
      questionOutlineForm: {
        questionLevel: "",
        questionName: "",
        questionType: ""
      },
      levelList: [], //试题难度列表
      questionTypeList: [], //试题类型列表
      selectQustionId: [], // 选中试题Id
      questionLevelNume: ["简单", "一般", "困难"],
      tableLoading: false,
      treeLoading: false,
      editable: true,
      currentNodeLevel: ''
    };
  },
  components: {
    addMaintainQuestion,
    errorPage,
    outlineList,
    preViewQuestion,
    importQuestion
  },
  inject: ["reload"],
  computed:{
    handleLimit(){
      return !this.editable || (this.editable && this.currentNodeLevel === '1')
    }
  },
  methods: {
    selectDataInfo(val) {
      this.selectQustionId = val.map(item => item.questionId);
    },
    //获取下拉列表
    getDictInfo(name, codeName) {
      if (this[codeName].length === 0) {
        this.$store.dispatch("findAllDrawerByName", name).then(
          //查询执法领域
          res => {
            if (res.code === 200) {
              this[codeName] = res.data;
            } else {
              console.info("没有查询到数据");
            }
          }
        );
      }
    },
    batchImport() {
      if (this.currentOutlineId === null || this.currentOutlineId === "") {
        this.$message({ type: "warning", message: "请先选择大纲!" });
        return;
      }
      this.$refs.importQuestion.showModal(this.currentOutlineId);
    },
    // 批量开启
    batchStart() {
      if (this.selectQustionId.length === 0) {
        this.$message({ type: "warning", message: "请选择要启用的试题" });
      } else {
        let data = { isUserStr: [] };
        this.selectQustionId.forEach(id => {
          data.isUserStr.push(`${id},0`);
        });
        this.enableQuestion(data, "批量开启");
      }
    },
    // 重置
    resetLog() {
      this.$refs["questionOutlineFormRef"].resetFields();
      this.currentPage = 1;
      this.getSelectOutline();
    },
    //新增-修改试题
    addQuestionInfo() {
      let _this = this;
      let parentNode = {
        currentOutlineId: this.currentOutlineId,
        selectCurrentTreeName: this.selectCurrentTreeName
      };
      if (this.currentOutlineId == null || this.currentOutlineId == "") {
        _this.$message({
          type: "error",
          message: "请选择大纲!"
        });
      } else {
        this.$refs.addMaintainQuestionRef.showModal(parentNode, "1");
      }
    },
    //修改试题
    updateQuestionInfo(questionId, type) {
      this.$refs.addMaintainQuestionRef.showModal(questionId, type);
    },
    //删除试题
    deleteQuestionInfo(questionId) {
      let _this = this;
      this.$confirm("确认删除该试题?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        iconClass: "custom-question",
        customClass: "custom-confirm"
      })
        .then(() => {
          _this.$store.dispatch("deleteExamQuestionInfo", questionId).then(
            res => {
              if (res.code == "200") {
                _this.getSelectOutline();
                _this.$message({ type: "success", message: "删除成功!" });
              } else {
                _this.$message({ type: "error", message: "删除失败!" });
              }
            },
            err => {
              _this.$message({ type: "error", message: err.msg || "" });
              console.log(err);
            }
          );
        })
        .catch(() => {});
    },
    //点击树事件
    handleNodeClick(data) {
      this.currentNodeLevel = data.topLevel;
      if (data.parentId != null) {
        this.selectCurrentTreeName = data.outlineName;
        this.currentOutlineId = data.outlineId;
        this.currentPage = 1;
        this.totalPage = 0;
        this.getSelectOutline(this.currentOutlineId);
      } else {
        this.selectCurrentTreeName = "";
        this.currentOutlineId = "";
      }
    },

    // 获取大纲
    getAllOutline(outlineId) {
      let _this = this;
      _this.treeLoading = true;
      this.$store.dispatch("examOutlineTreeAllInfo").then(
        res => {
          _this.treeLoading = false;
          if (res.code == "200" && res.data.length > 0) {
            _this.defaultExpandedKeys.push(res.data[0].outlineId);
            _this.selectCurrentTreeName = _this.selectCurrentTreeName
              ? _this.selectCurrentTreeName
              : res.data[0].outlineName;
            if (res.data[0].children && res.data[0].children.length > 0) {
              res.data[0].children.forEach(item => {
                _this.defaultExpandedKeys.push(item.outlineId);
              });
            }
            _this.outlineData = res.data;
          }
        },
        err => {
          _this.treeLoading = false;
          _this.$message({ type: "error", message: err.msg || "" });
          console.log(err);
        }
      );
    },
    //获取选中的大纲下的试题
    getSelectOutline() {
      let data = {
        outlineId: this.currentOutlineId,
        current: this.currentPage,
        size: this.pageSize
      };
      data = Object.assign(data, this.questionOutlineForm);
      this.tableLoading = true;
      this.$store.dispatch("getOutlineQuestionList", data).then(
        res => {
          this.tableLoading = false;
          if (res.data != null) {
            this.tableData = res.data.records;
            this.totalPage = res.data.total;
          }
        },
        err => {
          this.tableLoading = false;
          console.log(err);
        }
      );
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getSelectOutline();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getSelectOutline();
    },
    //查询系统类型
    getSystemType() {
      this.$store.dispatch("getSystemParamInfo").then(
        res => {
          _this.systemType = res.data.records;
        },
        err => {
          console.log(err);
        }
      );
    },
    //修改启用状态
    changeIsUse(event, row) {
      let statusTxt = event === "0" ? "启用" : "停用";
      this.$confirm(`请确认是否${statusTxt}试题？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        iconClass: "custom-question",
        customClass: "custom-confirm"
      })
        .then(() => {
          let data = {
            isUserStr: [`${row.questionId},${event}`]
          };
          this.enableQuestion(data, statusTxt);
        })
        .catch(() => {});
    },
    // 启用试题
    enableQuestion(data, status) {
      const loading = this.$loading({
        lock: true,
        text: `正在${status}`,
        spinner: "car-loading",
        customClass: "loading-box",
        background: "rgba(234,237,244, 0.8)"
      });
      data.isUserStr = JSON.stringify(data.isUserStr);
      this.$store.dispatch("changeQuestionIsUse", data).then(
        res => {
          loading.close();
          this.$message({ type: "success", message: `${status}成功!` });
          this.getSelectOutline();
        },
        err => {
          loading.close();
          this.$message({ type: "error", message: err.msg || "" });
        }
      );
    },
    // 预览试题
    viewQuestion(row) {
      this.$refs.preViewQuestion.showModal(row);
    },
    // 获取登录用户所属部门
    getSystemParams() {
      this.$store.dispatch("getSystemParams").then(
        res => {
          if (res.code === 200) {
            this.editable = res.data === "province";
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  },
  created() {
    this.getSystemParams();
    this.getAllOutline();
  }
};
</script>

<style lang="scss">
@import "@/assets/css/systemManage.scss";
</style>
<style lang="scss" scoped>
.departOrUserTree {
  overflow-y: scroll;
  .left-splitline {
    display: inline-block;
    width: 3px;
    height: 18px;
    background: rgba(69, 115, 208, 1);
    float: left;
    margin-right: 8px;
  }
}
.departTable {
  // min-height: 640px;
  .outline-title {
    border-left: 3px solid #4573d0;
    padding-left: 10px;
    line-height: 20px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .header-total {
    color: rgba(32, 35, 43, 1);
    font-weight: 600;
  }
  .level-name {
    display: inline-block;
    width: 44px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background: rgba(238, 238, 238, 1);
    color: #fff;
    &.level-0 {
      background: rgba(244, 178, 142, 1);
    }
    &.level-1 {
      background: rgba(250, 84, 28, 1);
    }
    &.level-2 {
      background: rgba(135, 20, 0, 1);
    }
  }
  .batch-import {
    display: inline-block;
    margin: 0 15px;
  }
}
.question-table {
  height: calc(100% - 194px);
  // min-height: 240px;
  >>> .el-table__row {
    .el-table-column--selection {
      vertical-align: top;
      .cell {
        margin-top: 15px;
        .el-checkbox{
          display: block;
        }
      }
    }
  }
  >>> .el-table__body-wrapper {
    padding-bottom: 0;
  }
  .question-row-cnt {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    padding-right: 15px;
    .m-r-34 {
      margin-right: 34px;
    }
    .question-item {
      display: flex;
      width: 70%;
      .question-desc {
        flex: 1;
        color: #20232b;
        font-weight: 560;
        display: inline-block;
        line-height: 20px;
        margin-left: 6px;
      }
    }
  }
}
.paginationBox {
  text-align: center;
  >>> .el-input__inner {
    height: 28px;
    line-height: 28px;
  }
}
</style>
