<template>
    <div class="check">
        <div class="top shadow">
            <div class="title_content">
                <div class="title_back float" @click="goBack">&lt;返回</div>
                <div class="float title_box title">客运线路标志牌</div>
            </div>
        </div>
        <el-form :inline="true" :model="checkData">
            <div class="center shadow">
                <div class="center_content">
                <span class="titleflag">
                </span>
                <span class="title">查验条件</span>
                </div>
                <div class="title_box">
                    <el-form-item label="车牌颜色" class="margin28" prop="plateColorCode">
                        <el-select v-model="checkData.plateColorCode" placeholder="请选择">
                            <el-option
                                v-for="(item,i) in sfList"
                                :key="i"
                                :label="item.value"
                                :value="item.label">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="车牌号码" prop="vehicleNo">
                        <el-input style="width:400px;" v-model="checkData.vehicleNo " placeholder="输入车牌号码"></el-input>
                    </el-form-item>
                    <el-form-item>
                    <el-button type="primary" @click="getVehicleCheck" size="medium">查询</el-button>
                    </el-form-item>
                </div>
            </div>
        </el-form>
        <div class="bottom shadow">
            <div class="center_content">
                <span class="titleflag">
                </span>
                <span class="title">查验结果</span>
            </div>
            <div class="tablePart" align="center">
                <el-table :data="tableData" stripe resizable border style="width: 100%;height:100%;" >
                <el-table-column prop="VehicleNo" label="车牌号" align="center"></el-table-column>
                <el-table-column prop="SignId" label="标识牌号" align="center"></el-table-column>
                <el-table-column prop="ValidDate" label="标识牌有效起始日期" align="center"></el-table-column>
                <el-table-column prop="OperLineName" label="线路名称" align="center"></el-table-column>
                <el-table-column prop="LineOpStatusCode" label="客运班线类型" align="center"></el-table-column>
                <el-table-column prop="LineValidBegin" label="线路有效起始日期" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                        <template slot-scope="scope" >
                            <div>
                            <el-button type="text" @click="vehicleLookLook(scope.$index, scope.row)">查看</el-button>
                            </div>
                        </template>
                </el-table-column>
                </el-table>
            </div>
                <vehicleLookLook ref="vehicleLookLookRef" @uploadaaa="getVehiclexList()"></vehicleLookLook>
            </div>
        </div>
</template>

<script>
import vehicleLookLook from "@/page/checkInfo/checkInfoDiag/vehicleLookLook";
import { crewCheckApiKyxlbsp } from "@/api/checkInfo";
export default {
  data() {
    return {
      checkData: {
        plateColorCode: "",
        vehicleNo : "",
      },
      tableData: [],
      searchList: [],
      showFlag: true,
      checkFlag: false,
      loading: true,
      sfList:[
        {
          value: '蓝色',
          label: 1
        },
        {
          value: '黄色',
          label: 2
        },
        {
          value: '黑色 ',
          label: 3
        },
        {
          value: '白色',
          label: 4
        },
        {
          value: '其他',
          label: 9
        }
      ],

    }
  },
  components: {
    vehicleLookLook,
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    // 返回
    goBack() {
      this.$router.go(-1);//返回上一层
    },
    getVehicleCheck() {
      let data = {
        vehicleNo: this.checkData.vehicleNo,
        plateColorCode: this.checkData.plateColorCode
      };
      // this.searchList = [];
      this.checkFlag = true;
      let _this = this
      // this.$store.dispatch("crewCheckApiKyxlbsp", data).then(res => {
        crewCheckApiKyxlbsp(data).then(res => {
          console.log("列表",res);
        _this.tableData = res.data;
      });
    },
    changeType() {
      this.clearData()
    },
    //查看
    vehicleLookLook(index, row) {
      this.$refs.vehicleLookLookRef.vehicleLookLook(row);
    },
    // 清空数据
    clearData() {
      this.checkData.plateColorCode = '';
      this.checkData.vehicleNo  = '';
    },
  },
  // created(){
  //   this.getVehicleCheck();
  // }
}
</script>
<!--
<style lang='scss' scoped>
@import "@/assets/css/checkInfo.scss";
</style>-->
