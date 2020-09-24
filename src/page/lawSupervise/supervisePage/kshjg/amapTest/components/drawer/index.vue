<template>
  <div class="jiangXiMap-drawer">
    <div class="jiangXiMap-drawer-open" @click="handleOpen">
      <i class="el-icon-arrow-left" />
    </div>
    <el-drawer
      class="jiangXiMap-drawer-window"
      title="我是标题"
      :visible.sync="isShow"
      :show-close="true"
      :with-header="false">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="告警车辆" name="1">
          <CarInfo
            :config="config.carData"
            @handleItem="handleItem"
            @handleMore="handleMore" />
        </el-collapse-item>
        <el-collapse-item title="非现场执法点" name="2">
          <NoEnforce :config="config.noEnforceData" @handleEcforce="handleEcforce" />
        </el-collapse-item>
      </el-collapse>
    </el-drawer>
  </div>
</template>

<script>
import CarInfo from "./carInfo.vue";
import NoEnforce from "./noEnforce.vue";
export default {
  components: {
    CarInfo,
    NoEnforce
  },
  props: {
    config: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      isShow: false, // 是否显示抽屉
      activeNames: ['1', '2']
    }
  },
  methods: {
    /**
     * 点击开关按钮
     */
    handleOpen() {
      this.isShow = true
    },

    /**
     * 点击展开
     */
    handleChange(val) {
      console.log(val);
    },

    /**
     * 点击列表元素，跳转路由
     */
    handleItem(data) {
      this.isShow = false
      this.$router.push({
        name: 'law_supervise_examineDoingDetail',
        params: {
          status: '0',
          tabTitle: '线索详情',
          offSiteManageId: data.id
        }
      });
    },

    /**
     * 点击查看更多，跳转路由
     */
    handleMore() {
      this.isShow = false
      this.$router.push({
        name: 'law_supervise_offSiteManage'
      })
    },

    /**
     * 点击列表，地图打点
     */
    handleEcforce(data) {
      this.isShow = false
      this.$emit('handleEcforce', data)
    }
  },
}
</script>

<style lang="scss">
.jiangXiMap-drawer {
  position: absolute;
  top: 20px;
  right: 0;
  display: flex;
  justify-content: flex-start;
  .el-collapse-item__header {
    box-sizing: border-box;
    padding-left: 20px;
  }
  &-open {
    width: 26px;
    height: 89px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('/static/images/img/lawSupervise/btn_norshouqi2.png') no-repeat;
    background-size:cover;
  }
}
</style>
