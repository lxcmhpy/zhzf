<!-- 发证申请 -->
<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="equipment-detail">
      <el-tabs v-model="tabLabel" style="min-height:800px;position:relative;">
        <el-tab-pane label="基本信息">
          <ApplyBaseInfo />
        </el-tab-pane>
        <el-tab-pane label="审批单">
          <ApprovalForm />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import ApplyBaseInfo from "@/page/device/components/applyManage/applyBaseInfo";
import ApprovalForm from "@/page/device/components/applyManage/approvalForm";

export default {
  components: { ApplyBaseInfo, ApprovalForm },
  data() {
    return {
      tableData: [],
      params: {
        pageData: {},
      },
      tabLabel: "",
    };
  },
  computed: {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.equipment-detail {
  padding: 15px;
  >>> .el-tabs {
    background: #fff;
    .el-tabs__item {
      padding: 0 20px;
      &.is-active {
        background: #fff;
      }
    }
    .el-tabs__header {
      background: #eaedf4;
    }
    .el-tabs__active-bar {
      box-sizing: content-box;
      top: 0;
      padding: 0 20px;
      left: -20px;
    }
  }
  .float-btns {
    width: 48px;
    height: 100px;
    position: fixed;
    right: 70px;
    bottom: 70px;
    z-index: 100;
    &.float-btns .el-button {
      border-radius: 1px;
      width: 48px;
      height: 48px;
      padding: 0;
      text-align: center;
    }
    .iconfont {
      display: inline-block;
      margin-bottom: 12px;
      margin-left: 4px;
    }
  }
}
</style>
<style lang="scss">
.equipment-detail {
  .float-btns {
    width: 48px;
    height: 100px;
    position: fixed;
    right: 70px;
    bottom: 70px;
    z-index: 100;
    &.float-btns .el-button {
      border-radius: 1px;
      width: 48px;
      height: 48px;
      padding: 0;
      text-align: center;
    }
    .iconfont {
      display: inline-block;
      margin-bottom: 4px;
      margin-left: 4px;
    }
  }
}

</style>