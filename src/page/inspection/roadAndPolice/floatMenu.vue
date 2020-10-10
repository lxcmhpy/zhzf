<template>
  <div class="right_side_box">
    <div class="btn_box">
      <i class="el-icon-arrow-down"></i>
    </div>
    <el-menu class="el-menu-vertical-demo" background-color="#545c64" active-background-color="#F3F9F9" text-color="#9EA7B6" active-text-color="#4573D0" :collapse="true">
      <!-- 悬浮按钮 -->

      <el-menu-item @click="clickLink('inspection_inspectionRAPFiles')">
        <!-- <li v-if="formOrDocData.showBtn[0]" @mouseenter="changeActive(1)" @mouseout="removeActive(1)"  @click="writeDoc"> -->
        <div @mouseenter="changeActive(1)" @mouseout="removeActive(1)">文书<br />填报</div>
      </el-menu-item>
      <el-menu-item @click="clickLink1('inspection_imageMange')">
        <div @mouseenter="changeActive(2)" @mouseout="removeActive(2)">照片<br />证据</div>
      </el-menu-item>
      <el-menu-item >
        <div @mouseenter="changeActive(3)" @mouseout="removeActive(3)">操作<br />记录</div>
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
  watch: {
    carinfoId(val, oldVal) {
      // debugger
      console.log(this.carinfoId)
    },
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(['caseId', 'docId', 'showQZBtn', 'inspectionOverWeightId']) },
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
      if (this.inspectionOverWeightId) {
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
    changeActive(index) {
      this.closeAllDialog()
      switch (index) {
        case 1: this.$refs.documentSideMenuRef.showModal(this.inspectionOverWeightId.firstcheckId ? this.inspectionOverWeightId.firstcheckId : ''); break;
        case 2: this.$refs.relativeRecordRef.showModal(this.inspectionOverWeightId || this.carinfoId); break;
        case 3: this.$refs.operationRecordRef.showModal(); break;
        default: break;
      }
    },
    removeActive(index) {
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
    clickLink(name) {
      this.closeAllDialog()
      if (this.inspectionOverWeightId) {
        this.$router.push({
          name: name,
        });
      } else {
        this.$confirm('请先保存记录', "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => { })
      }
    },
    clickLink1(name) {
      this.closeAllDialog()
      let _this = this
      if (this.inspectionOverWeightId || this.carinfoId) {

        this.$router.push({
          name: name,
          params: {
            carinfoId: _this.carinfoId,
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
