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
            v-for="(item, index) in documentList"
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
import { getDocListByIdApi } from "@/api/inspection";

export default {
  data() {
    return {
      visible: false,
      documentList: [],
      getData: false
    };
  },
  inject: ["reload"],
  computed: { ...mapGetters(["inspectionOverWeightId"]) },
  methods: {
    showModal() {
      this.visible = true;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },

    //获取卷宗目录列表
    getDocListByIdApi() {
      getDocListByIdApi(this.inspectionOverWeightId).then(res => {
        console.log("getDocListByIdApi -> res", res);
        this.documentList = res.data;
      });
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
    this.getDocListByIdApi();
  }
};
</script>
