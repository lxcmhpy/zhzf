<template>
  <div class="paper-main">
    <div v-if="errMsg" class="no-data-tip">暂无数据</div>
    <div v-if="!errMsg && this.$route.params.name" class="paper-name">{{ this.$route.params.name }}</div>
    <div v-if="!errMsg" class="paper-content">
      <div
        class="paper-question"
        v-for="(paragrap, pIndex) in pageData.paragraphList"
        :key="paragrap.paragraphId"
        :class="{'borderBottom': paragrap.questionList.length}"
      >
        <div>
          <div class="question-type">
            <span>{{ paragrapIndex[pIndex] }}、{{ paragrap.paragraphTypeName }}（每题{{ paragrap.paragraphTypQuestionScore }}分，共{{ paragrap.paragraphSum }}分）</span>
            <div v-if="editQuestion" class="random-btn">
              <el-button type="primary" icon="icon-random" @click="randomSegment(paragrap)">随机节段</el-button>
            </div>
          </div>
          <div v-if="paragrap.questionList.length">
            <div v-for="(item, index) in paragrap.questionList" :key="item.pqId">
              <questionView
                v-if="refreshQuestion"
                :key="item.questionId"
                :question="item"
                :questionIndex="index + 1"
                :editable="editQuestion"
                :questionType="paragrap.paragraphTypeName"
                :questionLevel="questionLevelList[item.questionLevel]"
                @randomQuestion="selectRandomQuestion($event, paragrap, pIndex)"
                @randomSuccess="randomOneQuestion($event, paragrap)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="JSON.stringify(pageData) !== '{}'" class="paper-handle">
      <!-- 审核操作按钮 -->
      <div v-if="viewType === 'apply'" class="float-btns">
        <el-button class="edit_btn" type="primary" @click="applyPaper('0')">
          <i class="edit_icon el-icon-circle-check"></i>
          <br />通过
        </el-button>
        <el-button class="edit_btn" type="info" @click="applyPaper('1')">
          <i class="edit_icon el-icon-circle-close"></i>
          <br />不通过
        </el-button>
      </div>
      <!-- 修改操作按钮 -->
      <div v-if="viewType === 'edit'" class="float-btns">
        <el-button v-if="!editQuestion" class="edit_btn" type="primary" @click="editPaper">
          <i class="edit_icon el-icon-edit"></i>
          <br />修改
        </el-button>
        <el-button v-if="editQuestion" class="edit_btn" type="primary" @click="saveEditQuestion">
          <i class="iconfont law-save"></i>
          <br />保存
        </el-button>
        <el-button v-if="editQuestion" class="edit_btn" type="primary" @click="cancelEdit">
          <i class="edit_icon el-icon-circle-close"></i>
          <br />取消
        </el-button>
      </div>
      <el-backtop class="page-backtop" target=".el-main" :right="50">
        <el-button class="edit_btn" type="primary">
          <i class="edit_icon el-icon-top"></i>
          <br />置顶
        </el-button>
      </el-backtop>
    </div>
    <selectQuestion ref="selectQuestion" @selectReplace="selectReplace" />
  </div>
</template>
<script>
import questionView from "@/page/exam/common/questionView";
import selectQuestion from "@/page/exam/common/selectQuestion";

export default {
  name: "pageDetail",
  props: {},
  components: { questionView, selectQuestion },
  data() {
    return {
      num: 1,
      answer: "1",
      dialogImageUrl: "",
      dialogVisible: false,
      pageName: "",
      pageData: {},
      pageDataClone: {}, // 克隆一份pageData，取消修改使用
      errMsg: false,
      paragrapIndex: ["一", "二", "三", "四", "五", "六", "七", "八", "九"],
      editQuestion: false,
      replaceData: {
        questionIds: [],
        pqId: []
      },
      refreshQuestion: true,
      edtiQuestion: {},
      editParagrap: {},
      questionLevelList: {},
      editParagrapIndex: null
    };
  },
  computed: {
    pageId() {
      return this.$route.params.pageId;
    },
    viewType() {
      return this.$route.params.type;
    },
    verifyId(){
      return this.$route.params.verifyId;
    }
  },
  mounted() {},
  created() {
    this.getPageMessageDetail();
    this.getLevelList();
  },
  methods: {
    // 获取试题列表
    getPageMessageDetail() {
      let data = { pageId: this.pageId };
      this.errMsg = false;
      const loading = this.$loading({
        lock: true,
        text: "正在获取试卷信息",
        spinner: "car-loading",
        customClass: "loading-box",
        background: "rgba(234,237,244, 0.8)"
      });
      this.$store.dispatch("previewPage", data).then(
        res => {
          loading.close();
          if (res.code == "200") {
            this.pageData = res.data;
            this.pageDataClone = JSON.parse(JSON.stringify(res.data));
            if (this.pageData && this.pageData.paragraphList.length) {
              // 动态添加题目序号
              this.pageData.paragraphList.forEach((item, index) => {
                if (index === 0) {
                  item["startIndex"] = 0;
                } else {
                  const preNum = this.pageData.paragraphList[index - 1];
                  item["startIndex"] =
                    preNum.startIndex + preNum.questionList.length;
                }
              });
            }
          }
        },
        err => {
          loading.close();
          this.errMsg = true;
          this.$message({ type: "error", message: err.msg || "" });
        }
      );
    },
    // 获取试题难度
    getLevelList() {
      this.$store.dispatch("findAllDrawerByName", '考试-试题难度').then(
        res => {
          if (res.code === 200) {
            if(res.data && res.data.length){
              res.data.forEach(item => {
                this.questionLevelList[item.id] = item.name;
              })
            }
          } else {
            console.info("没有查询到数据");
          }
        }
      );
    },
    // 审核试卷
    applyPaper(type) {
      let status = type == '0' ? '确定审核通过吗' : '确定审核不通过吗？'
      let data = {
        verifyId:this.verifyId,
        verifyResult:type
      }
      console.info("aaaaa"+JSON.stringify(data))
      this.$confirm(status, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        iconClass: 'custom-question',
        customClass: 'custom-confirm'
      }).then(() => {
        this.$store.dispatch('verifyInfo', data).then(res => {
          if(res.code === 200){
            this.$message({ type: "success", message: "操作成功!"});
          }
        },
          err => {console.log(err);}
        );
      }).catch(() => {});
     
    },
    // 修改试卷题目
    editPaper() {
      this.editQuestion = true;
    },
    // 取消修改
    cancelEdit() {
      this.pageData = this.pageDataClone;
      this.replaceData = {};
      this.editQuestion = false;
    },
    // 随机节段
    randomSegment(paragrap){
      this.$confirm(`确认随机替换该节段试题吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        iconClass: "custom-question",
        customClass: "custom-confirm"
      })
        .then(() => {
          const loading = this.$loading({
            lock: true,
            text: `正在随机抽取节段试题`,
            spinner: 'car-loading',
            customClass: 'loading-box',
            background: 'rgba(234,237,244, 0.8)'
          });
          let queryData = {
            paragraphId: paragrap.paragraphId,
            pageId: this.pageId
          };
          this.$store.dispatch('randomParagraphQuestion', queryData).then(res => {
            loading.close();
            if(res.code === 200){
              let i = 0;
              if(res.data && res.data.length){
                paragrap.questionList.forEach((question, index) => {
                  if(question.isLock === '0'){
                    const replaceQuestion = res.data[i];
                    this.setChangeData(question.pqId, replaceQuestion.questionId);
                    replaceQuestion.pqId = question.pqId;
                    replaceQuestion.isLock = '0';
                    replaceQuestion['optionList'] = replaceQuestion.optionVoList;
                    delete replaceQuestion.optionVoList;
                    paragrap.questionList.splice(index, 1, replaceQuestion);
                    i++;
                  }
                })
              }
            }
          }, err => {
            loading.close();
            this.$message({ type: 'error', message: err.msg || '' });
          })
        })
        .catch(() => {});
    },
    // 随机替换一道题
    randomOneQuestion(e, paragrap){
      this.refreshQuestion = false;
      const editIndex = paragrap.questionList.findIndex(item => item.pqId === e.pqId);
      const item = e.data;
      item['optionList'] = e.data.optionVoList;
      delete item.optionVoList;
      item.pqId = e.pqId;
      paragrap.questionList[editIndex] = item;
      this.refreshQuestion = true;
      this.setChangeData(e.pqId, e.data.questionId);
    },
    // 记录修改的数据
    setChangeData(pqId, questionId){
      const index = this.replaceData.pqId.indexOf(pqId);
      if(index > -1){
        this.replaceData.questionIds.splice(index, 1, questionId);
      }else{
        this.replaceData.pqId.push(pqId);
        this.replaceData.questionIds.push(questionId);
      }
    },
    // 选择随机替换
    selectRandomQuestion(question, paragrap, paragrapIndex){
      this.edtiQuestion = question;
      this.editParagrap = paragrap;
      this.editParagrapIndex = paragrapIndex;
      this.$refs.selectQuestion.showModal(question.questionType);
    },
    // 选中题目替换
    selectReplace(question){
      this.refreshQuestion = false;
      const editIndex = this.editParagrap.questionList.findIndex(item => item.pqId === this.edtiQuestion.pqId);
      question.pqId = this.edtiQuestion.pqId;
      this.pageData.paragraphList[this.editParagrapIndex].questionList[editIndex] = question;
      this.refreshQuestion = true;
      this.setChangeData(question.pqId, question.questionId);
    },
    // 保存修改后题目
    saveEditQuestion(){
      const loading = this.$loading({
        lock: true,
        text: `正在保存`,
        spinner: 'car-loading',
        customClass: 'loading-box',
        background: 'rgba(234,237,244, 0.8)'
      });
      const saveData = {
        questionIds: this.replaceData.questionIds.join(','),
        pqIds: this.replaceData.pqId.join(',')
      }
      this.$store.dispatch("saveReplaceQuestion",saveData).then(
        res => {
          loading.close();
          if (res.code === 200) {
            this.replaceData = {};
            this.$message({ type: "success", message: `保存成功!` });
          }
        },
        err => {
          loading.close();
          this.$message({ type: "error", message: err.msg || "" });
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.no-data-tip {
  height: 200px;
  text-align: center;
  line-height: 200px;
  font-size: 18px;
}
.paper-name {
  font-size: 24px;
  font-weight: 500;
  color: rgba(32, 35, 43, 1);
  line-height: 34px;
  margin: 30px 0;
  text-align: center;
}
.paper-content {
  margin: 0 10%;
  .paper-question {
    padding: 0 2% 40px;
    margin-bottom: 40px;
    .question-type {
      height: 48px;
      line-height: 48px;
      font-size: 18px;
      color: rgba(32, 35, 43, 1);
      margin-bottom: 20px;
      .random-btn{
        float: right;
      }
    }
    &.borderBottom{
      border-bottom: 1px dashed #5e89b5;
    }
  }
}
.paper-handle {
  position: fixed;
  right: 50px;
  bottom: 150px;
  .float-btns{
    bottom: 220px;
    right: 50px;
  }
  .edit_btn {
    display: block;
    margin-left: 0;
    margin-top: 12px;
    width: 48px;
    height: 48px;
    padding: 12px 0;
    text-align: center;
    .edit_icon {
      margin-bottom: 4px;
      margin-right: 0;
      font-size: 14px;
    }
    .law-save{
      font-size: 14px;
    }
  }
}
.page-backtop{
  width: 48px;
  height: 48px;
  .edit_btn {
    display: block;
    margin-left: 0;
    margin-top: 12px;
    width: 48px;
    height: 48px;
    padding: 12px 0;
    text-align: center;
    .edit_icon {
      margin-bottom: 4px;
      margin-right: 0;
      font-size: 14px;
    }
  }
}
</style>