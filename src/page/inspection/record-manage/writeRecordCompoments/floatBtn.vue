<template>

  <!-- 悬浮按钮 -->
  <div class="float-btns" style="top:105px;right:5px;">
    {{!formOrDocData.pageDomId}}
    <li v-if="formOrDocData.showBtn[0]" @mouseenter="changeActive(1)" @mouseout="removeActive(1)" class='el-button el-button--primary' style="padding:10px 0" @click="writeDoc">
      文书<br />填报
    </li>
    <li v-if="formOrDocData.showBtn[1]" @mouseenter="changeActive(2)" @mouseout="removeActive(2)" class='el-button el-button--primary' style="padding:10px 0">
      相关<br />记录
    </li>
    <li v-if="formOrDocData.showBtn[2]" @mouseenter="changeActive(3)" @mouseout="removeActive(3)" class='el-button el-button--primary' style="padding:10px 0">
      操作<br />记录
    </li>
    <documentSideMenu ref="documentSideMenuRef"></documentSideMenu>
    <relativeRecord ref="relativeRecordRef"></relativeRecord>
    <operationRecord ref="operationRecordRef"></operationRecord>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import iLocalStroage from '@/common/js/localStroage';
import documentSideMenu from './documentSideMenu.vue'
import operationRecord from './operationRecord.vue'
import relativeRecord from './relativeRecord.vue'
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
  props: ['formOrDocData', 'storagePath'],
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(['caseId', 'docId', 'showQZBtn']) },
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
      console.log('点击',this.formOrDocData.pageDomId)
      if (this.formOrDocData.pageDomId||this.$route.query.addOrEiditFlag!='add') {
        this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
        this.$router.push({
          name: 'inspection_inspectionFiles',
          // params: item
          query: { id: this.formOrDocData.pageDomId || this.$route.query.id }
        });
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
      // $event.currentTarget.className = "active";
      console.log('移入', index)
      switch (index) {
        case 1: this.$refs.documentSideMenuRef.showModal(this.formOrDocData.pageDomId); break;
        case 2: this.$refs.relativeRecordRef.showModal(); break;
        case 3: this.$refs.operationRecordRef.showModal(); break;
        default: break;
      }
    },
    removeActive(index) {
      // $event.currentTarget.className = "";
      console.log('移出', index)
      switch (index) {
        case 1: this.$refs.documentSideMenuRef.closeDialog(); break;
        case 2: this.$refs.relativeRecordRef.closeDialog(); break;
        case 3: this.$refs.operationRecordRef.closeDialog(); break;
        default: break;
      }
    }
  },
  mounted() {

  }
}
</script>
