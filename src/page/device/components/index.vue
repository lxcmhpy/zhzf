<template>
  <div class="com_searchAndpageBoxPadding">
    <div style="padding: 30px;">
      <span>2.1 装备管理弹窗</span>
      <el-button type="info" @click="openDialog('addByCopyRef')">复制新增装备</el-button>
      <el-button type="info" @click="openDialog('addDeviceRef')">新增装备</el-button>
      <el-button type="info" @click="openDialog('deviceDetailRef')">查看装备信息</el-button>
    </div>
    <div style="padding: 30px;">
      <span>2.2 装备管理弹窗-配发领用</span>
      <el-button type="info" @click="openDialog('allotmentReceiveRef')">配发(领用)单</el-button>
    </div>
    <div style="padding: 30px;">
      <span>3.21 新增车辆基本信息完成</span>
      <el-button type="info" @click="openEquipmentDetail">查看装备基本信息</el-button>
    </div>
    <div style="padding: 30px;">
      <span>5.21 发证申请基本信息</span>
      <el-button type="info" @click="openApplyCertificate">发证申请</el-button>
    </div>
    <!-- 复制装备 -->
    <AddByCopy ref="addByCopyRef" />
    <!-- 新增装备 -->
    <AddDevice ref="addDeviceRef"/>
    <!-- 查看装备信息 -->
    <DeviceDetail ref="deviceDetailRef" />
    <!-- 配发(领用)单 -->
    <AllotmentReceive ref="allotmentReceiveRef" />
  </div>
</template>
<script>
import AddByCopy from '@/page/device/components/addDevice/addByCopy';
import AddDevice from '@/page/device/components/addDevice/addDevice';
import DeviceDetail from '@/page/device/components/addDevice/deviceDetail';
import AllotmentReceive from '@/page/device/components/allotmentReceive/allotmentReceive';

export default {
  components: { AddByCopy, AddDevice, DeviceDetail, AllotmentReceive },
  data() {
    return {
    };
  },
  computed: {},
  created() {},
  methods: {
    // 打开弹窗
    openDialog(dialogName){
        this.$refs[dialogName].showModal();
    },
    // 查看装备基本信息
    openEquipmentDetail(){
      this.$router.push({ path: '/equipment-detail' });
    },
    // 发证申请
    openApplyCertificate(){
      this.$router.push({ path: '/apply-certificate' });
    }
  }
};
</script>

<style  lang="scss" scoped>
</style>
