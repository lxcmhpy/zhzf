<template v-if="caseInfo">
  <div>
    <el-dialog
      custom-class="leftDialog leftDialog2 archiveCatalogueBox documentFormCat margin-bottom0"
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
          卷宗目录
        </div>
      </template>
      <div class="a">
        <table border="1" bordercolor="black" width="100%" cellspacing="0">
          <tr>
            <td>序号</td>
            <td>材料名称</td>
            <td>页码</td>
          </tr>
          <tr
            v-for="(item, index) in caseList"
            :key="index"
            @click="alertPDF(item)"
            :class="!item.storageId && item.name == '备考表' ? 'activeTd' : ''"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ item.name ? item.name : item.evName }}</td>
            <td>{{ item.page }}</td>
          </tr>
        </table>
      </div>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button
          @click="routerArchiveCatalogueDetail"
          type="primary"
          icon="iconfont law-paixu"
        >
          排序管理</el-button
        >
      </span> -->
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
// import { findByCaseBasicInfoIdApi, findByCaseIdAndDocIdApi, findVoByDocCaseIdApi } from "@/api/caseHandle";
// import { uploadCommon, findCommonFileApi } from "@/api/upload";
export default {
  data() {
    return {
      visible: false,
      caseList: [],
      getData: false
    };
  },
  inject: ["reload"],
  computed: { ...mapGetters(["inspectionOverWeightId"]) },
  methods: {
    showModal(id) {
      this.visible = true;
      // if(!this.caseList.length){
      //   this.getByMlCaseId();
      // }
      //   console.log('this.getData',this.getData)
      //   if(refresh || !this.getData) this.getByMlCaseId();
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    getByMlCaseId() {
      this.getData = true;
      this.$store.dispatch("getByMlCaseIdNew", this.caseId).then(
        res => {
          //   let beikaoFlag = true;
          //   res.data.forEach(element => {
          // if (element.name == "备考表") {
          //   if (beikaoFlag) {
          //     if (element.storageId === "") {
          //     } else {
          //       this.caseList.push(element);
          //       beikaoFlag = false;
          //     }
          //   }
          // } else {
          //   this.caseList.push(element);
          // }
          //   });

          //   if ((beikaoFlag = true)) {
          this.caseList = res.data;
          //   }
        },
        err => {}
      );
    },

    //点击排序按钮
    // routerArchiveCatalogueDetail() {
    //   this.$router.push({ name: "case_handle_archiveCatalogueDetail" });
    // },
    //点击卷宗目录列表
    alertPDF(item) {
      //   if (this.$route.name != "case_handle_archiveCover") {
      //     this.$router.push({
      //       name: "case_handle_archiveCover",
      //       params: { clickData: JSON.stringify(item), mulvList: this.caseList }
      //     });
      //     return;
      //   }
      //   this.$store.commit("setClickArchiveCatalogue", item);
      //   this.$store.commit("setArchiveCatalogueList", this.caseList);
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
