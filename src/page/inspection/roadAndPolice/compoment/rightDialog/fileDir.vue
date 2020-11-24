<template v-if="caseInfo">
  <div class="file-dir-container">
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
            @click="handleClickDocName(item)"
            :class="!item.storageId ? 'activeTd' : ''"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ item.docName }}</td>
            <td>{{ item.page }}</td>
          </tr>
        </table>
      </div>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button
          @click="handleOrder"
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
      // debugger
      if (this.inspectionOverWeightId && this.documentList.length === 0) {
        this.getDocListByIdFn();
      }
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },

    //获取卷宗目录列表
    getDocListByIdFn() {
      getDocListByIdApi(this.inspectionOverWeightId).then(res => {
        console.log(" -> res", res);
        this.documentList = res.data;
      });
    },

    //点击排序按钮
    handleOrder() {
      this.$router.push({ name: "inspection_file_order_page" });
    },
    //点击卷宗目录
    handleClickDocName(item) {
      console.log(
        "🚀 ~ file: fileDir.vue ~ line 91 ~ handleClickDocName ~ item",
        item
      );
      const routerMap = {
        "卷宗封面【青海检查】": "inspection_overloadDocumentDoc_QH"
      };
      if (item.storageId) {
        this.$router.push({
          name: "inspection_overload_pdf",
          params: { id: inspection_overload_pdf, storageId: item.storageId }
        });
      } else {
        this.$router.push({
          name: routerMap[item.docName]
        });
      }
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
.file-dir-container {
  table {
    text-align: center;
    background: #fdffff;
    td {
      padding: 10px 0;
      min-height: 38px;
      border: 1px solid #7f8185;
      cursor: pointer;
    }
    tr {
      td:nth-child(1),
      td:nth-child(3) {
        width: 40px;
      }
    }
    .activeTd {
      td {
        color: red;
      }
    }
  }
}
</style>
