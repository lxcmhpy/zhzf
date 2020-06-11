<template>
  <el-dialog
    class="add-question-dialog"
    title="选择替换"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="62%"
  >
    <el-row>
      <el-col :span="8" class="left-panel">
        <div class="departOrUserTree" v-loading="treeLoading" element-loading-spinner="car-loading">
          <p>
            <i class="left-splitline"></i>题库大纲
          </p>
          <!-- 大纲列表 -->
          <outlineList
            ref="outlineList"
            :treeData="outlineData"
            :treeProps="defaultProps"
            :defaultExpandedKeys="defaultExpandedKeys"
            nodeKey="outlineId"
            @clickTreeNode="handleNodeClick"
          />
        </div>
      </el-col>
      <el-col :span="16" class="right-panel">
        <div class="departTable">
          <div class="handelBtn" style="margin-bottom:0px;">
            <div>
              <el-form
                :inline="true"
                :model="questionOutlineForm"
                label-width="80px"
                ref="searchFormRef"
              >
                <div class="item">
                  <el-row>
                    <el-form-item label="难度" label-width="48px" prop="questionLevel">
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
                </div>
              </el-form>
            </div>
          </div>
          <el-table
            :data="tableData"
            stripe
            class="question-table"
            style="width: 100%"
            v-loading="tableLoading"
            element-loading-spinner="car-loading"
            element-loading-text="加载中..."
            height="420px"
          >
            <el-table-column width="20" align="center"></el-table-column>
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
                </div>
                <div class="question-row-cnt">
                  <div>
                    <span class="m-r-34">题型：{{scope.row.questionTypeName}}</span>
                    <span class="m-r-34">命题时间：{{scope.row.createTime}}</span>
                    <span>命题人：{{scope.row.createName}}</span>
                  </div>
                  <div>
                    <el-button type="text" @click.stop="replaceQuestion(scope.row)">替换</el-button>
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
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <!-- <el-button type="primary" @click="checkForm">保 存</el-button> -->
    </div>
  </el-dialog>
</template>
<script>
import outlineList from "@/components/examComponents/outlineList";


export default {
  data() {
    return {
      visible: false,
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
      questionOutlineForm: {
        questionLevel: "",
        questionName: "",
        questionType: ""
      },
      levelList: [], //试题难度列表
      questionLevelNume: ["简单", "容易", "一般", "困难"],
      tableLoading: false,
      treeLoading: false
    };
  },
  components: { outlineList },
  computed: {},
  created() {
    this.getDictInfo("考试-试题难度", "levelList");
    this.getAllOutline();
  },
  methods: {
    // 查询字典-获取试题类型&试题难度
    getDictInfo(name, codeName) {
      if (!this[codeName].length) {
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
    // 重置查询项
    resetLog() {
      this.$refs["searchFormRef"].resetFields();
    },

    //点击树事件
    handleNodeClick(data) {
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
    getAllOutline() {
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

    // 替换
    replaceQuestion(question) {
      const loading = this.$loading({
        lock: true,
        text: '正在替换',
        spinner: 'car-loading',
        customClass: 'loading-box',
        background: 'rgba(234,237,244, 0.8)'
      });
      this.$store.dispatch("selectExamQuestionInfo", question.questionId).then(
        res => {
          loading.close();
          if (res.code === 200) {
            res.data['optionList'] = res.data.pqoList;
            delete res.data.pqoList;
            this.$emit('selectReplace', res.data);
            this.closeDialog();
          }
        },
        err => {
          loading.close();
          this.$message({ type: "error", message: err.msg || "" });
        }
      );
    },
    showModal(questionType) {
      this.questionOutlineForm.questionType = questionType;
      this.visible = true;
      this.tableLoading = false;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.currentOutlineId = '';
      this.currentPage = 1;
      this.pageSize = 10;
      this.totalPage = 0;
      this.tableData.splice(0, this.tableData.length);
      this.$refs["searchFormRef"].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
.add-question-dialog{
  >>>.el-dialog__body{
    padding: 0 20px;
  }
  .left-panel{
    max-height: 520px;
    padding: 20px;
    overflow-y: scroll;
    .departOrUserTree {
      width: 100%;
      background: #fff;
      border-right: none;
      padding: 0;
      >p {
        padding: 10px 0 19px 0px;
        font-size: 18px;
        font-weight: bolder;
        .left-splitline {
          display: inline-block;
          width: 3px;
          height: 18px;
          background: rgba(69, 115, 208, 1);
          float: left;
          margin-right: 8px;
        }
      }
    }
  }
  .right-panel{
    padding: 20px;
    border-left: 1px solid #eee;
    overflow: hidden;
  }
}
.departTable {
  width: 100%;
  padding: 0;
  overflow: hidden;
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
      color: #7e828c;
    }
    &.level-1 {
      background: rgba(244, 178, 142, 1);
    }
    &.level-2 {
      background: rgba(250, 84, 28, 1);
    }
    &.level-3 {
      background: rgba(135, 20, 0, 1);
    }
  }
}
.question-table {
  height: calc(100% - 176px);
  // min-height: 240px;
  >>> .el-table__row {
    .el-table-column--selection {
      vertical-align: top;
      .cell {
        margin-top: 15px;
      }
    }
  }
  .question-row-cnt {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    .m-r-34 {
      margin-right: 34px;
    }
    .question-item {
      display: flex;
      width: 85%;
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
