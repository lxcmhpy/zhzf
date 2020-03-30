<template>
  <div class="check yehu">
    <div class="top shadow">
      <div class="title_content">
        <div class="title_back float" @click="goBack">&lt;返回
        </div>
        <div class="float title_box title">营运车辆查验</div>
      </div>
    </div>
    <el-form :inline="true" :model="checkData">
      <div class="center2 shadow">

        <div class="center_content">
          <span class="titleflag">
          </span>
          <span class="title">查验条件</span>
           <el-radio-group v-model="checkType" @change="changeType">
            <el-radio :label="1">道路运输证号查验</el-radio>
            <el-radio :label="2">VIN证号查验</el-radio>
          </el-radio-group>
        </div>
       <el-form-item label="车牌号码">
          <el-input style="width:600px;padding-left:30px;" v-model="checkData.ownerName" placeholder="请输入车辆（挂车）号牌"></el-input>
        </el-form-item>
        <br/>
        <el-form-item label="道路运输证号" v-if="checkType==1">
          <el-input style="width:600px" v-model="checkData.ownerName" placeholder="请输入道路运输证号"></el-input>
        </el-form-item>
        <el-form-item label="VIN号" v-if="checkType==2">
          <el-input style="width:600px;padding-left:50px;" v-model="checkData.licenseCode" placeholder="请输入VIN号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getCheck" size="medium">查询</el-button>
        </el-form-item>

      </div>
    </el-form>
    <div class="bottom shadow">
      <div class="center_content">
        <span class="titleflag">
        </span>
        <span class="title">查验结果</span>
      </div>
      <div>
        <span>相关的 个搜索结果</span>  
      </div>  
      <div class="tablePart" align="center">
        <el-table :data="tableData" stripe resizable border style="width: 100%;height:100%;" >
          <el-table-column prop="cphm" label="车牌号码" align="center"></el-table-column>
          <el-table-column prop="dlyszh" label="道路运输证号" align="center"></el-table-column>
          <el-table-column prop="cljyfw" label="车辆经营范围" align="center"></el-table-column>
          <el-table-column prop="fzjg" label="发证机构" align="center"></el-table-column>
          <el-table-column prop="dlyszyxqsrq" label="道路运输证有效起始日期" align="center"></el-table-column>
          <el-table-column prop="jyywmc" label="经营业户名称" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
                <template slot-scope="scope" >
                    <div>
                    <el-button type="text" @click="commercialVehicleSee(scope.$index, scope.row)">查看</el-button>

                    </div>
                </template>
          </el-table-column>
        </el-table>
      </div>
        <commercialVehicleSee ref="commercialVehicleSeeRef"></commercialVehicleSee>
    </div>
  </div>
  
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import commercialVehicleSee from "@/page/checkInfo/checkInfoDiag/commercialVehicleDiag";
export default {
  mixins: [mixinGetCaseApiList],
  components: {
    commercialVehicleSee

  },
  data() {
//     OwnerName:北京京版物流有限责任公司
// LicenseCode:货备110115000169
// ProvinceCode:110000
    return {
      checkData: {
        provinceCode: '',
        ownerName: '',
        licenseCode: ''
      },
      radio: '1',
      checkType: 1,
      tableData: [{
        cphm: 1,
        dlyszh: 1,
        cljyfw: 1,
        fzjg: 1,
        dlyszyxqsrq: 1,
        jyyhmc: 1
      }],
      searchList: [{}],
      showFlag: true,

    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    // 返回
    goBack() {
      this.$router.go(-1);//返回上一层
    },
    //查询违法行为
    getCheck() {
        let _this = this
      this.$store.dispatch("yehuCheck", this.checkData).then(
        res => {
          console.log('返回', res)
          _this.searchList = res.data
          if (_this.searchList.length > 1) {
            _this.showFlag = false;
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    changeType() {
      this.clearData()
    },
    // 收起展开
    show() {
      this.showFlag = !this.showFlag;
    },
    // 清空数据
    clearData() {
      this.checkData.ownerName = '';
      this.checkData.licenseCode = '';
    },
    //查看
    commercialVehicleSee(index, row) {
      this.$refs.commercialVehicleSeeRef.commercialVehicleSee(row);
    }
  }
}
</script>
<style lang='scss' scoped>
@import "@/assets/css/checkInfo.scss";
</style>
