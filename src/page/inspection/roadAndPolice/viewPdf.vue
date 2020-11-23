<template>
  <div class="print_box" style="width:790px;margin:0 auto;">
    <!-- pdfShowUrl{{ pdfShowUrl }} -->
    <!-- 右侧菜单 -->
    <rightMenu></rightMenu>
    <div class="div-float">
      <iframe
        :src="
          '/static/pdf/web/viewer.html?file=' + encodeURIComponent(pdfShowUrl)
        "
        frameborder="0"
        style="width:790px;height:75%"
      ></iframe>
    </div>
    <el-button
      type="primary"
      style="width: 70px;height: 40px;position: fixed;top: 115px;left: 240px;"
      @click="back"
      >返回</el-button
    >
  </div>
</template>
<script>
import rightMenu from "@/page/inspection/roadAndPolice/compoment/rightMenu/index.vue";
import { mapGetters } from "vuex";

// import { getDocumentById } from "@/api/inspection";
export default {
  data() {
    return {
      storagePath: [],
      pdfShowUrl: ""
    };
  },
  components: {
    rightMenu
  },
  computed: {
    ...mapGetters([
      // "caseId",
      // "docId",
      // "docDataId",
    ])
  },
  methods: {
    getFile() {
      if (this.$route.params && this.$route.params.storageId) {
        let storageId = this.$route.params.storageId;
        this.$util.com_getFileStream(storageId).then(res => {
          // debugger;
          this.pdfShowUrl = res;
        });
      }
    },

    back() {
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      // this.$router.go(-1); //返回上一层
      this.$router.push({
        name: "inspection_documents_list"
      });
    }
  },
  created() {
    this.getFile();
  }
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss"></style>
<style lang="scss">
.div-float {
  width: 790px;
  height: 1117px;
  position: fixed;
  top: 93px;
  left: auto;
  right: auto;
  // background: pink;
}
</style>
