

<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="50%"
    append-to-body
  >
    <el-form :model="vehicleForm" :rules="rules" ref="vehicleForm" class="errorTipForm">
        <div align="center">
            <table class="tg" style="width:100%;">
              <tr>
                <td class="tg-n6x5" style="width:25%;">车牌号码</td>
                <td class="tg-cly1" style="width:25%;">{{vehicleForm.VehicleNo}}</td>
                <td class="tg-n6x5" style="width:25%;">车牌颜色代码</td>
                <td class="tg-cly1" style="width:25%;">{{vehicleForm.PlateColorCode}}</td>
              </tr>
              <tr>
                <td class="tg-n6x5">车辆燃料类型</td>
                <td class="tg-cly1">{{vehicleForm.FuelType}}</td>
                <td class="tg-n6x5">车辆类型代码</td>
                <td class="tg-cly1">{{vehicleForm.VehicleTypeCode}}</td>
              </tr>
              <tr>
                <td class="tg-n6x5">车籍地行政区域代码</td>
                <td class="tg-cly1">{{vehicleForm.VehicleZoneCode}}</td>
                <td class="tg-n6x5">车辆核定载客位</td>
                <td class="tg-cly1">{{vehicleForm.ApproveSeat}}</td>
              </tr>
              <tr>
                <td class="tg-n6x5">标志牌号</td>
                <td class="tg-cly1">{{vehicleForm.SignId}}</td>
                <td class="tg-n6x5">标志牌类型</td>
                <td class="tg-cly1">{{vehicleForm.SignType}}</td>
              </tr>
              <tr>
                <td class="tg-n6x5">有效起始日期</td>
                <td class="tg-cly1">{{vehicleForm.LineValidBegin}}</td>
                <td class="tg-n6x5">有效截止日期</td>
                <td class="tg-cly1">{{vehicleForm.LineValidEnd}}</td>
              </tr>
              <tr>
                <td class="tg-n6x5">线路名称</td>
                <td class="tg-cly1">{{vehicleForm.OperLineName}}</td>
                <td class="tg-n6x5">客运班线类型</td>
                <td class="tg-cly1">{{vehicleForm.LineOpTypeCode}}</td>
              </tr>
              <tr>
                <td class="tg-n6x5">始发客运站行政区划（转汉字）</td>
                <td class="tg-cly1">{{vehicleForm.StartStationZone}}</td>
                <td class="tg-n6x5">始发客运站</td>
                <td class="tg-cly1">{{vehicleForm.StartStation}}</td>
              </tr>
              <tr>
                <td class="tg-n6x5">讫点客运站行政区划（转汉字）</td>
                <td class="tg-cly1">{{vehicleForm.EndStationZone}}</td>
                <td class="tg-n6x5">讫点客运站</td>
                <td class="tg-cly1">{{vehicleForm.EndStation}}</td>
              </tr>
              <tr>
                <td class="tg-n6x5">主要途径站点</td>
                <td class="tg-cly1">{{vehicleForm.LineTransPlace}}</td>
                <td class="tg-n6x5">省级行政区划代码</td>
                <td class="tg-cly1">{{vehicleForm.ProvinceCode}}</td>
              </tr>
              <tr>
                <td class="tg-n6x5">线路有效期始</td>
                <td class="tg-cly1">{{vehicleForm.LineValidBegin}}</td>
                <td class="tg-n6x5">线路有效期止</td>
                <td class="tg-cly1">{{vehicleForm.LineValidEnd}}</td>
              </tr>
              <tr>
                <td class="tg-n6x5">客运班线营运状态代码</td>
                <td class="tg-cly1">{{vehicleForm.LineOpStatusCode}}</td>
                <td class="tg-cly1"></td>
                <td class="tg-cly1"></td>
              </tr>
            </table>
        </div>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      vehicleForm: {
      },
      dialogTitle: "",
      rules:[]
    };
  },
  methods: {
    vehicleLookLook(data) {
      this.visible = true;
      this.dialogTitle = "客运线路标识牌详情";
      this.vehicleForm = data;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.$refs["vehicleForm"].resetFields();
    },
  }
};
</script>
<style lang='scss' src="@/assets/css/checkInfo.scss" scoped></style>
<style lang="scss">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{font-family:Arial, sans-serif;font-size:16px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg .tg-cly1{text-align:center;vertical-align:middle;height: 25px;}
.tg .tg-n6x5{background-color:#c0c0c0;color:#000000;text-align:center;vertical-align:middle;height: 25px;}
</style>