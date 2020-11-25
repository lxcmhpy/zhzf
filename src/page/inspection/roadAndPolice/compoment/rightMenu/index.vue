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
          @mouseleave ="leaveItem(item.label)"
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
import _ from "lodash";
import documentSideMenu from "@/page/inspection/roadAndPolice/compoment/rightDialog/documentSideMenu.vue";
import operationRecord from "@/page/inspection/roadAndPolice/compoment/rightDialog/operationRecord.vue";
import relativeRecord from "@/page/inspection/roadAndPolice/compoment/rightDialog/relativeRecord.vue";
import fileDir from "@/page/inspection/roadAndPolice/compoment/rightDialog/fileDir.vue";

import { setMenuFn } from "./menuConfig.js";
export default {
  name: "rightMenu",
  data() {
    return {
      menuList: [],
      refMap: {
        doc: "documentSideMenuRef",
        photo: "relativeRecordRef",
        record: "operationRecordRef",
        dir: "fileDirRef"
      }
    };
  },
  computed: { ...mapGetters(["inspectionOverWeightId", "penaltyDecisionId"]) },
  components: {
    documentSideMenu,
    relativeRecord,
    operationRecord,
    fileDir
  },
  methods: {
    handleClickMenu(label) {
      console.log(" -> label", label);
      // this.$emit("clickRightMenu", label);
      this.goToPage(label);
    },
    enterItem(label) {
      console.log("🚀 ~ file: index.vue ~ line 73 ~ enterItem ~ enterItem")
      // debugger
    //   _.throttle(()=>{
		// 	console.log('hello')
		// },1000)
      //   this.$emit("enterRightMenu", label);
      this.closeAllDialog();
      this.$refs[this.refMap[label]].showModal();
    },

    closeAllDialog() {
      Object.keys(this.refMap).forEach(key => {
        this.$refs[this.refMap[key]].closeDialog();
      });
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

    //跳转页面
    goToPage(label) {
      this.closeAllDialog();
      const routeMap = {
        doc: "inspection_documents_list",
        photo: "inspection_imageMange",
        record: "inspection_documents_list",
        dir: "inspection_file_order_page"
      };
      if (this.inspectionOverWeightId) {
        this.$router.push({
          name: routeMap[label]
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
