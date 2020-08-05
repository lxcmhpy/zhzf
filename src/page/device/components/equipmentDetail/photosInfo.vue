<!-- 车辆照片管理 -->
<template>
  <div class="vehicle_photos_layout">
    <div class="content_left">
        <template>
          <div class="top-prompt-wrap">
            <span><font class="top-prompt">限制提示:单张照片2M以内，格式为jpg或png</font></span>
          </div>
        </template>
        <template>
          <!-- 车辆照片 -->
          <VehiclePhotos :photoList="vehiclePhotoList" :topTitle="vehicleTopTitle" />
        </template>
        <template>
          <!-- 行驶证照片 -->
          <VehiclePhotos :photoList="drivingPhotoList" :topTitle="drivingTopTitle" />
        </template>
        <template>
          <!-- 其他照片 -->
          <OtherPhotos :params="{ type: 'add' }" />
        </template>
    </div>
    <!-- <div class="content_right">
        <div style="margin-top:500px;">
        <el-button type="primary" round >修改</el-button>
        </div>
    </div> -->
    <!-- <div class="float-btns">
      <el-button class="edit_btn" type="primary">
        <i class="iconfont law-save" /><br />保存
      </el-button>
    </div> -->
  </div>
</template>
<script>
import VehiclePhotos from '@/page/device/components/equipmentDetail/vehiclePhotos';
import OtherPhotos from '@/page/device/components/equipmentDetail/otherPhotos';

export default {
  components:{ VehiclePhotos, OtherPhotos },
  props: {},
  data(){
    return {
        vehiclePhotoList: [
          {
            photoUrl: "",
            photoTips: "前45°照片",
            file: null,
          },
          {
            photoUrl: "",
            photoTips: "后45°照片",
            file: null,
          },
        ],
        vehicleTopTitle: {
            title: "车辆照片：", tips: "车辆前45°、后45°照片各一张"
        },
        drivingPhotoList: [
          {
            photoUrl: "",
            photoTips: "主页",
            file: null,
          },
          {
            photoUrl: "",
            photoTips: "副页",
            file: null,
          },
        ],
        drivingTopTitle: {
            title: "行驶证照片：", tips: "行驶证主页、副页照片各一张"
        }
    }
  },
  computed:{
    baseUrl(){
      return iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST;
    }
  },
  methods:{}
}
</script>
<style lang="scss" scoped>
.vehicle_photos_layout{
  background: #fff;
  
  .content_left {
    width:100%;
    height:100%;
    border-right: 1px solid #DDDDDD;
    float:left;
    margin-bottom: 40px;
  }
  .top-prompt-wrap{
    margin: 12px 0 0 35px;
    .top-prompt{
      font-size: 14px;
      color: #7B7B7B;
    }
  }
  .float-btns {
    width   : 48px;
    height  : 100px;
    position: fixed;
    right   : 70px;
    bottom  : 70px;  
    &.float-btns .el-button {
      border-radius: 1px;
      width        : 48px;
      height       : 48px;
      padding      : 0;
      text-align   : center;
    }
    .iconfont{
      display: inline-block;
      margin-bottom: 8px;
    }
  }
}
</style>