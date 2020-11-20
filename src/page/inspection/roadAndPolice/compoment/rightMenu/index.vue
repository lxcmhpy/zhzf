<template>
  <div class="right_side_box right-side-menu">
    <div class="btn_box">
      <i class="el-icon-arrow-down"></i>
    </div>
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#545c64"
      active-background-color="#F3F9F9"
      text-color="#9EA7B6"
      active-text-color="#4573D0"
      :collapse="true"
    >
      <el-menu-item
        @click="handleClickMenu(item.label)"
        :key="item.label"
        :disabled="item.disabled"
        v-for="item in menuList"
      >
        <div
          class="div-item"
          @mouseenter="enterItem(item.label)"
          @mouseout="leaveItem(item.label)"
        >
          <span>{{ item.name }}</span>
        </div>
      </el-menu-item>
    </el-menu>

    <documentSideMenu ref="documentSideMenuRef"></documentSideMenu>
    <relativeRecord ref="relativeRecordRef"></relativeRecord>
    <operationRecord ref="operationRecordRef"></operationRecord>
    <fileDir ref="fileDirRef"></fileDir>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import documentSideMenu from "@/page/inspection/roadAndPolice/compoment/documentSideMenu.vue";
import operationRecord from "@/page/inspection/record-manage/writeRecordCompoments/operationRecord.vue";
import relativeRecord from "@/page/inspection/roadAndPolice/compoment/relativeRecord.vue";
import fileDir from "@/page/inspection/roadAndPolice/compoment/fileDir.vue";
import { setMenuFn } from "./menuConfig.js";
export default {
  name:'rightMenu',
  data() {
    return {
      menuList: []
    };
  },
  computed: { ...mapGetters(["inspectionOverWeightId", "penaltyDecisionId"]) },
  components: {
    documentSideMenu,
    relativeRecord,
    operationRecord,
    fileDir,
  },
  methods: {
    handleClickMenu(label) {
      //   this.$emit("clickRightMenu", label);
      if (label === "doc") {
        this.handleClickDocumentBtn();
      }
      if (label === "photo") {
        this.handleClickImgsBtn();
      }
    },
    enterItem(label) {
      //   this.$emit("enterRightMenu", label);
      this.closeAllDialog();
      switch (label) {
        case "doc":
          this.$refs.documentSideMenuRef.showModal(this.penaltyDecisionId);
          break;
        case "photo":
          this.$refs.relativeRecordRef.showModal(
            this.inspectionOverWeightId
          );
          break;
        case "record":
          this.$refs.operationRecordRef.showModal();
          break;
        case "dir":
          this.$refs.fileDirRef.showModal();
          break;
        default:
          break;
      }
    },
    leaveItem(label) {
      console.log("leaveItem -> label", label);
      //   this.$emit("leaveRightMenu", label);
    },

    // clickRightMenu' @enterRightMenu='enterRightMenu' @leaveRightMenu='leaveRightMenu
    clickRightMenu(label) {
      console.log("clickRightMenu -> label", label);
    },
    enterRightMenu(label) {
      console.log("enterRightMenu -> label", label);
    },
    leaveRightMenu(label) {
      console.log("leaveRightMenu -> label", label);
    },
    closeAllDialog() {
      this.$refs.documentSideMenuRef.closeDialog();
      this.$refs.relativeRecordRef.closeDialog();
      this.$refs.operationRecordRef.closeDialog();
      this.$refs.fileDirRef.closeDialog();
    },
    // 跳转到文书列表
    handleClickDocumentBtn() {
      // debugger
      this.closeAllDialog();
      if (this.inspectionOverWeightId) {
        this.$router.push({
          name: "inspection_inspectionRAPFiles" //文书列表页面
        });
      } else {
        this.$confirm("请先保存记录", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {});
      }
    },

    // 跳转到证据照片列表页
    handleClickImgsBtn() {
      this.closeAllDialog();
      if (this.inspectionOverWeightId ) {
        this.$router.push({
          name: "inspection_imageMange",
        });
      } else {
        this.$confirm("请先保存记录", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {});
      }
    }
  },
  created() {
    this.menuList = setMenuFn(this);
  }
};
</script>

<style lang="scss" src="@/assets/css/documentForm.scss"></style>
<style lang="scss">
.right-side-menu {
  .el-menu-vertical-demo {
    .el-menu-item {
      .div-item {
        height: 100%;
        display: flex;
        align-content: center;
        justify-content: center;
        span {
          width: 32px;
          height: 32px;
          //   border: 1px solid red;
          font-size: 16px;
          visibility: visible;
          white-space: break-spaces;
        }
      }
    }
  }
}
</style>
