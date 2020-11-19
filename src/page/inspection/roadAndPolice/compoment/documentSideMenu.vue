<template v-if="caseInfo">
  <div>
    <el-dialog
      custom-class="leftDialog leftDialog2 archiveCatalogueBox documentFormCat"
      :visible.sync="visible"
      @close="closeDialog"
      top="0px"
      width="405px"
      :modal="false"
      :show-close="false"
      :append-to-body="true"
      style="top:60px;right:60px"
    >
      <template slot="title">
        <div class="catalogueTitle">
          文书列表
          <!-- <span style="color:#E54241">（{{fileList.length}}）</span> -->
        </div>
      </template>
      <div v-if="!inspectionOverWeightId">
        请先保存表单
      </div>
      <div class="userList caseAndEvidenceListDiaClass">
        <li
          v-for="(item, index) in fileList"
          :label="item.storageId"
          :key="item.storageId"
          style="font-size: 16px;line-height: 36px;cursor: pointer;"
          @click="handleClickDocName(item)"
        >
          <span class="name">{{ index + 1 }}、</span>
          <span class="name">{{ item.docName }}</span>
          <span class="name" style="margin-left:20px;color:bule">{{
            item.status
          }}</span>
        </li>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import {
  getTemplateDocList,
  getDocListById,
  findCarInfoFileByIdApi
} from "@/api/inspection";
import iLocalStroage from "@/common/js/localStroage";
export default {
  data() {
    return {
      visible: false,
      fileList: []
    };
  },
  inject: ["reload"],
  computed: {
    ...mapGetters(["caseId", "inspectionOverWeightId", "penaltyDecisionId"])
  },
  methods: {
    showModal() {
      this.visible = true;
      if (this.penaltyDecisionId) {
        this.getByMlCaseId(this.penaltyDecisionId);
      }
    },

    handleClickDocName(item) {
      if (item.status == "完成") {
        this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
        this.$router.push({
          name: "inspection_overload_pdf",
          params: { id: item.id, storageId: item.pdfStorageId }
        });
      } else {
        return;
        // this.$store.commit("set_inspection_fileId", item.id)
        // this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
        // this.$router.push({
        //   name: item.path,
        //   params: { id: item.id, addOrEiditFlag: 'add' }
        //   // query: { id: item.id, addOrEiditFlag: 'add' }
        // });
        // // 写表单
        // this.$emit('changeModleId', item);
      }
    },

    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    //获取文书列表
    getByMlCaseId(pageDomId) {
      findCarInfoFileByIdApi(pageDomId).then(
        res => {
          console.log("getByMlCaseId -> res", res);
          if (res.code == 200) {
            this.fileList = res.data;
          }
        },
        error => {}
      );
    }
  },
  mounted() {
    let class1 = document.getElementsByClassName("documentFormCat");
    let class2 = class1[0].parentNode;
    class2.style.right = "60px";
    class2.style.top = "60px";
    class2.style.overflow = "hidden";
  }
};
</script>
