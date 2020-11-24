<template>
  <el-dialog
    title="问题"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="400px"
    append-to-body
  >
    <div>
      <!-- <p  style="line-height: 30px;cursor: pointer;" @click="chooseQues">{{item}}</p> -->
      <el-radio-group v-model="question">
        <p
          v-for="(item, index) in questionList"
          :key="index"
          style="line-height: 30px"
        >
          <el-radio :label="item.request"></el-radio>
        </p>
      </el-radio-group>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="chooseQuesEmit()">确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { findRequestListByModelIdApi } from "@/api/caseHandle";
export default {
  data() {
    return {
      visible: false,
      question: "",
      questionList: [],
    };
  },
  methods: {
    showModal(modelId) {
      console.log("modelId", modelId);
      this.visible = true;
      this.findQuestionList(modelId);
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    chooseQuesEmit() {
      this.visible = false;
      let selectData = this.questionList.filter(
        (p) => p.request == this.question
      );
      this.$emit("chooseQues", selectData[0]);
    },
    //获取问题
    findQuestionList(modelId) {
      findRequestListByModelIdApi(modelId).then(
        (res) => {
          console.log("问题", res);
          this.questionList = res.data;
          console.log("this.questionList", this.questionList);
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
};
</script>

