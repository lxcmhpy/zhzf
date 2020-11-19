<template>
  <div class="right_side_box">
    <div class="btn_box">
      <i class="el-icon-arrow-down"></i>
    </div>
    <el-menu class="el-menu-vertical-demo" background-color="#545c64" active-background-color="#F3F9F9" text-color="#9EA7B6" active-text-color="#4573D0" :collapse="true">
      <!-- 悬浮按钮 -->

      <!-- <el-menu-item @click="handleClickDocumentBtn('inspection_inspectionRAPFiles')"> -->
      <el-menu-item @click="handleClickDocumentBtn">
        <!-- <li v-if="formOrDocData.showBtn[0]" @mouseenter="enterItem(1)" @mouseout="leaveItem(1)"  @click="writeDoc"> -->
        <div @mouseenter="enterItem(1)" @mouseout="leaveItem(1)">文书<br />填报</div>
      </el-menu-item>
      <el-menu-item @click="handleClickImgsBtn">
        <div @mouseenter="enterItem(2)" @mouseout="leaveItem(2)">照片<br />证据</div>
      </el-menu-item>
      <el-menu-item >
        <div @mouseenter="enterItem(3)" @mouseout="leaveItem(3)">操作<br />记录</div>
      </el-menu-item>
      <el-menu-item >
        <div @mouseenter="enterItem(4)" @mouseout="leaveItem(4)">卷宗<br />目录</div>
      </el-menu-item>
    </el-menu>
    <documentSideMenu ref="documentSideMenuRef"></documentSideMenu>
    <relativeRecord ref="relativeRecordRef"></relativeRecord>
    <operationRecord ref="operationRecordRef"></operationRecord>

  </div>

</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import iLocalStroage from '@/common/js/localStroage';
import documentSideMenu from '@/page/inspection/roadAndPolice/compoment/documentSideMenu.vue';
import operationRecord from '@/page/inspection/record-manage/writeRecordCompoments/operationRecord.vue';
import relativeRecord from '@/page/inspection/roadAndPolice/compoment/relativeRecord.vue';
export default {
  data() {
    return {
      // docId
      makeSealStr: '',
      // showQZBtn:false,  //是否显示签章按钮
    }
  },
  components: {
    documentSideMenu,
    relativeRecord,
    operationRecord
  },
  props: ['formOrDocData', 'storagePath', 'carinfoId'],
  
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(['caseId', 'docId', 'showQZBtn', 'inspectionOverWeightId','penaltyDecisionId']) },
  methods: {
    //   打印方法
    async printContent() {
    },
    uploadFile(file, name) {
      var f = new File([file.output("blob")], name, { type: 'application/pdf' })
      var fd = new FormData()
      fd.append("file", f)
      fd.append('caseId', this.caseId)
      fd.append('docId', '5cad5b54eb97a15250672a4c397cee56')
      fd.append('category', '文书');

      this.$store.dispatch("uploadFile", fd).then(
        res => {
          console.log(res)
        },
        err => {
          console.log(err);
        }
      );
    },
    // 文书列表
    writeDoc() {
      // debugger
      // if (this.addOrEiditFlag == 'add' || !this.formOrDocData.pageDomId) {
      // } else {
      console.log('点击')
      if (this.penaltyDecisionId) {
        this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
        this.$router.push({
          name: 'inspection_inspectionRAPFiles',
        });
      } else {
        this.$confirm('请先保存记录', "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => { })
      }
    },
    getFile() {
      this.$store.dispatch("getFile", {
        docId: '5cad5b54eb97a15250672a4c397cee56',
        caseId: '297708bcd8e80872febb61577329194f'
      }).then(
        res => {
          console.log(res[0].storagePath)
        },
        err => {
          console.log(err);
        }
      );
    },
    // 跳转到pdf页面
    viewPDF() {
      this.$router.push({ name: "case_handle_viewPDF" })
    },
    // 鼠标移入
    enterItem(index) {
      this.closeAllDialog()
      switch (index) {
        case 1:  this.$refs.documentSideMenuRef.showModal(this.penaltyDecisionId); break;
        case 2: this.$refs.relativeRecordRef.showModal(this.inspectionOverWeightId || this.carinfoId); break;
        case 3: this.$refs.operationRecordRef.showModal(); break;
        case 4: this.$refs.operationRecordRef.showModal(); break;
        default: break; 
      }
    },

    // 鼠标移出
    leaveItem(index) {
      // $event.currentTarget.className = "";
      console.log('移出', index)
      //   switch (index) {
      //     case 1: this.$refs.documentSideMenuRef.closeDialog(); break;
      //     case 2: this.$refs.relativeRecordRef.closeDialog(); break;
      //     case 3: this.$refs.operationRecordRef.closeDialog(); break;
      //     default: break;
      //   }
    },
    closeAllDialog() {
      this.$refs.documentSideMenuRef.closeDialog();
      this.$refs.relativeRecordRef.closeDialog();
      this.$refs.operationRecordRef.closeDialog();
    },
    // 跳转到文书列表
    handleClickDocumentBtn() {
      // debugger
      this.closeAllDialog()
      if (this.inspectionOverWeightId) {
        this.$router.push({
          name: 'inspection_inspectionRAPFiles',//文书列表页面
        });
      } else {
        this.$confirm('请先保存记录', "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => { })
      }
    },

    // 跳转到证据照片列表页
    handleClickImgsBtn() {
      this.closeAllDialog()
      if (this.inspectionOverWeightId || this.carinfoId) {
        this.$router.push({
          name: 'inspection_imageMange',
          params: {
            carinfoId: this.carinfoId,
          }
        });
      } else {
        this.$confirm('请先保存记录', "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => { })
      }
    },
  },
  mounted() {

  }
}
</script>
<style lang="scss" src="@/assets/css/documentForm.scss"></style>
