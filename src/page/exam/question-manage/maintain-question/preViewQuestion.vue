<template>
  <el-dialog
    title="预览试题"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="48%"
  >
    <div v-if="visible">
      <questionView :question="question" :questionType="question.questionTypeName" />
    </div>
  </el-dialog>
</template>
<script>
import questionView from "@/page/exam/common/questionView";

export default {
  components: { questionView },
  data() {
    return {
      visible: false,
      question: {}
    };
  },
  methods: {
    showModal(row) {
      this.question = row;
      this.getQuestionInfo(row.questionId);
    },
    // 获取试题详情
    getQuestionInfo(questionId) {
      const loading = this.$loading({
        lock: true,
        text: '正在获取试题详情',
        spinner: 'car-loading',
        customClass: 'loading-box',
        background: 'rgba(234,237,244, 0.8)'
      });
      this.$store.dispatch("selectExamQuestionInfo", questionId).then(
        res => {
          loading.close();
          if (res.code === 200) {
            this.question.answer = res.data.answer;
            if (res.data.pqoList && res.data.pqoList.length) {
              this.question.optionList = res.data.pqoList;
            }
            this.visible = true;
          }
        },
        err => {
          loading.close();
          this.$message({ type: "error", message: err.msg || "" });
        }
      );
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
