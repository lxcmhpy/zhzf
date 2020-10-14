<template v-if="caseInfo">
  <div>
    <el-dialog
      custom-class="leftDialog leftDialog2 archiveCatalogueBox documentFormSupervisionCat"
      :visible.sync="visible"
      @close="closeDialog"
      top="0px"
      width="405px"
      :modal="false"
      :show-close="false"
      :append-to-body="true"
    >
      <template slot="title">
        <div class="catalogueTitle">
          文书列表2
          <span style="color:#E54241">（{{caseList.length}}）</span>
        </div>
      </template>
      <div class="userList">
        <ul class="caseList">
          <li
            v-for="(item,index) in caseList"
            :key="item.storageId"
            @click="showCasePdf(item)"
          >{{index + 1}} {{item.docName}}</li>
        </ul>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import {
  findByCaseBasicInfoIdApi,
  findByCaseIdAndDocIdApi,
  findVoByDocCaseIdApi,
} from "@/api/caseHandle";
import iLocalStroage from "@/common/js/localStroage";
export default {
  data() {
    return {
      visible: false,
      caseList: [],
      mlList: [],
      pdfVisible: false,
      checkedDocId: [],
      indexPdf: 0,
      nowShowPdfIndex: 0,
      docSrc: "", //文书的pdf地址
      isIndeterminate: true,
      checkAll: false,
      getData: false,
    };
  },
  inject: ["reload"],
  // props: ["caseInfo"],
  computed: { ...mapGetters(["caseId"]) },
  methods: {
    showModal() {
      this.visible = true;
      if (!this.getData) this.getByMlCaseId();
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    //获取已完成文书列表
    getByMlCaseId() {
      this.getData = true;
      let _this = this;
      findVoByDocCaseIdApi(this.caseId).then(
        (res) => {
          console.log(res);
          let newData = [];
          if (res.data && res.data.length > 0) {
            newData = res.data.filter(
              (item) => !item.docName.includes("送达回证")
            );
          }
          _this.caseList = newData;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    //跳转到pdf页面
    showCasePdf(item) {
      if(this.$route.name === 'lawEnforcementSupervision_casePDF'){
         this.$attrs.getFileStream(item.storageId);
      }else{
        this.$router.push({
          name: "lawEnforcementSupervision_casePDF",
          params: {
            currentPdf: JSON.stringify(item),
            allCasePdf: JSON.stringify(this.caseList),
          },
        });
      }
    },
  },
  mounted() {
    let class1 = document.getElementsByClassName("documentFormSupervisionCat");
    let class2 = class1[0].parentNode;
    class2.style.right = "60px";
    class2.style.top = "60px";
    class2.style.overflow = "hidden";
  },
};
</script>
<style scoped lang="scss">
.fullscreen .archiveCatalogueBox {
  background: #eaedf4;
  margin-right: 0;
  .el-dialog__header {
    height: 64px;
    background: #ffffff;
    color: #20232b;
    padding: 0 0 0 20px;
    line-height: 64px;
    .catalogueTitle {
      font-size: 20px;
      cursor: pointer;
    }
  }
}
.caseList {
  li {
    margin: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }
}
</style>
