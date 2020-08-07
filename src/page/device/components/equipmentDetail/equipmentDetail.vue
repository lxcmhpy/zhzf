<!-- 新增车辆基本信息完成 -->
<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="equipment-detail">
      <el-tabs v-model="tabLabel" style="min-height:800px;">
        <el-tab-pane label="基本信息">
          <BaseInfo />
        </el-tab-pane>
        <el-tab-pane label="车辆照片" v-if="show">
          <PhotosInfo />
        </el-tab-pane>
        <el-tab-pane label="年检信息" v-if="show">
          <YearInspection />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import BaseInfo from "@/page/device/components/equipmentDetail/baseInfo";
import PhotosInfo from "@/page/device/components/equipmentDetail/photosInfo";
import YearInspection from "@/page/device/components/equipmentDetail/yearInspection";

export default {
  components: { BaseInfo, PhotosInfo, YearInspection },
  data() {
    return {
      tableData: [],
      params: {
        pageData: {},
      },
      tabLabel: "",
    };
  },
  computed: {
    show: function () {
      if (this.$route.params.id == "add") {
        return false;
      } else {
        return true;
      }
    },
  },
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