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
            <p v-for="(item,index) in questionList" :key="index" style="line-height: 30px;"><el-radio  :label="item"></el-radio></p>
        </el-radio-group>
    </div>
     <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="chooseQuesEmit()">确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      question:"",
      questionList:['叫啥','住哪','为啥来这']
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    chooseQuesEmit(){
         this.visible = false;
        this.$emit("chooseQues",this.question);
    }
    
  }
};
</script>

