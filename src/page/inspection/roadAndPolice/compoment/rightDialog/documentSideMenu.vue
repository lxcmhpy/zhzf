<template v-if="caseInfo">
  <div class="inspection-doc-dialog">
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
      <div v-if="fileList.length === 0">暂无数据</div>
      <div
        v-if="inspectionOverWeightId"
        class="userList caseAndEvidenceListDiaClass"
      >
        <el-checkbox-group v-model="checkList">
          <div
            class="check-div"
            v-for="(item, index) in fileList"
            :key="item.docName"
          >
            <span class="index-span">{{ index + 1 }}</span>
            <el-checkbox  :disabled='item.status!=="完成"'></el-checkbox>
            <span class="doc-name-span" :disabled='item.status!=="完成"' @click="handleClickDoc(item)">{{ item.docName }}</span>
          </div>
        </el-checkbox-group>
        <!-- <li
          v-for="(item, index) in fileList"
          :label="item.docName"
          :key="item.docName"
          style="font-size: 16px;line-height: 36px;cursor: pointer;"
          @click="handleClickDocument(item)"
        >
          <span class="name">{{ index + 1 }}、</span>
          <span class="name">{{ item.docName }}</span>
          <span class="name" style="margin-left:20px;color:bule">{{
            item.status
          }}</span>
        </li> -->
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getDocListByIdApi } from "@/api/inspection";
import iLocalStroage from "@/common/js/localStroage";
export default {
  data() {
    return {
      visible: false,
      fileList: [],
      checkList: []
    };
  },
  inject: ["reload"],
  computed: {
    ...mapGetters(["inspectionOverWeightId", "penaltyDecisionId"])
  },
  methods: {
    showModal() {
      // debugger;
      this.visible = true;
      this.fileList = [];
      // _.throttle(()=>{
      // console.log('hello')
      // },1000)
      if (this.penaltyDecisionId && this.fileList.length === 0) {
        this.getDocListByIdFn();
      }
    },

    handleClickDoc(doc){
    console.log("🚀 ~ file: documentSideMenu.vue ~ line 86 ~ handleClickDoc ~ doc", doc)
      
    },

    //点击文书
    handleClickDocument(item) {
      console.log("🚀 ~ ~ item", item);
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

    //关闭弹窗
    closeDialog() {
      this.visible = false;
    },

    //获取文书列表
    getDocListByIdFn() {
      getDocListByIdApi(this.penaltyDecisionId, false).then(res => {
        if (res.code == 200) {
          this.fileList = res.data || [];
        }
      });
    },

    //设置弹窗左偏移
    setRight() {
      let class1 = document.getElementsByClassName("documentFormCat");
      let class2 = class1[0].parentNode;
      class2.style.right = "60px";
      class2.style.top = "60px";
      class2.style.overflow = "hidden";
    }
  },

  mounted() {
    //设置弹窗遮罩层不要遮到右侧快捷菜单
    this.setRight();
  }
};
</script>
<style lang="scss">
// .inspection-doc-dialog {
.userList {
  .check-div {
    height: 40px;
    line-height: 40px;
    .index-span {
      display: inline-block;
      width: 20px;
      font-size: 16px;
    }
    .doc-name-span {
      display: inline-block;
      width: calc(100% - 38px);
      font-size: 16px;
      margin-left: 4px;
      cursor: pointer;
    }
  }
}

// }
</style>
