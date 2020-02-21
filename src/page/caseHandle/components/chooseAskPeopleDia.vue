<template>
  <el-dialog
    title="添加询问笔录"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="30%"
  >
    <div>
      <p>请选择被询问人类型，系统将会根据选项，自动 填写被询问人信息：</p>

      <el-radio-group v-model="peopleType">
        <div class="peopleTypeListBox">
            <div v-for="(item,index) in peopleTypeList" :key="index"><el-radio :label="item.value">{{item.label}}</el-radio></div>
        </div>
      </el-radio-group>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="showAskDoc">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mixinGetCaseApiList } from "@/js/mixins";
import iLocalStroage from "@/js/localStroage";

export default {
  data() {
    return {
      visible: false,
      peopleType:0,
      docData:"",
      peopleTypeList:[
          {
              value:0,
              label:'当事人'
          },
          {
              value:1,
              label:'与案件的关系是'
          },
          {
              value:2,
              label:'代理人'
          },
          {
              value:3,
              label:'以上均不是'
          }
      ]
    };
  },
  mixins: [mixinGetCaseApiList],
  methods: {
    showModal(data,isSaveLink) {
      this.visible = true;
      this.isSaveLink = isSaveLink;
      this.docData = data;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    showAskDoc(){
       this.com_viewDoc(this.docData); 
    }
  }
};
</script>
<style lang="less" scope>
    .peopleTypeListBox{
        margin-top: 15px;
        display: flex;
        flex-wrap:wrap;
        &>div{
            width: 50%;
            margin-bottom: 10px;
        }
    }

</style>
