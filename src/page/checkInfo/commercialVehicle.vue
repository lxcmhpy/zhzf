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
            <el-radio :label="3">车牌颜色查验</el-radio>
          </el-radio-group>
        </div>
       <el-form-item label="车牌号码">
          <el-input style="width:300px;padding-left:30px;" v-model="checkData.vehicleNo" placeholder="请输入车辆（挂车）号牌"></el-input>
        </el-form-item>
        <el-form-item label="道路运输证号" v-if="checkType==1">
          <el-input style="width:300px;padding-left:10px;" v-model="checkData.transCertificateCode" placeholder="请输入道路运输证号"></el-input>
        </el-form-item>
        <el-form-item label="VIN号" v-if="checkType==2">
          <el-input style="width:300px;padding-left:30px;" v-model="checkData.vin" placeholder="请输入VIN号"></el-input>
        </el-form-item>
        <el-form-item label="车牌颜色" v-if="checkType==3">
          <el-select style="width:300px;padding-left:10px;padding-right:20px;" v-model="checkData.plateColor" placeholder="请选择车牌颜色">
            <el-option
              v-for="(item,i) in sfList"
              :key="i"
              :label="item.name"
              :value="item.notes">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getCheck(checkType)" size="medium">查询</el-button>
        </el-form-item>

      </div>
    </el-form>
    <div class="bottom shadow">
      <div class="center_content">
        <span class="titleflag">
        </span>
        <span class="title">查验结果</span>
      </div>
      <div class="result">
        <span>相关的{{yyclAmount}}个搜索结果</span>
      </div>
      <div class="tablePart" align="center">
        <el-table :data="tableData" stripe resizable border style="width: 100%;height:100%;" >
          <el-table-column prop="VehicleNo" label="车牌号码" align="center"></el-table-column>
          <el-table-column prop="TransCertificateCode" label="道路运输证号" align="center"></el-table-column>
          <el-table-column prop="BusinessScopeCode" label="车辆经营范围" align="center"></el-table-column>
          <el-table-column prop="TransCertificateGrantOrgan" label="发证机构" align="center"></el-table-column>
          <el-table-column prop="CertificateBeginDate" label="道路运输证有效起始日期" align="center"></el-table-column>
          <el-table-column prop="OwnerName" label="经营业户名称" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
                <template slot-scope="scope" >
                    <span>
                      <el-button type="text" @click="commercialVehicleSee(scope.$index, scope.row)">查看</el-button>
                    </span>
                </template>
          </el-table-column>
           <el-table-column label="违法记录" align="center">
            <template slot-scope="scope" >
                    <span>
                      <el-button type="text" @click="showIllegal(scope.row.illeagl)">{{scope.row.illeaglTotal}}次</el-button>
                    </span>
                </template>
          </el-table-column>
        </el-table>
      </div>
        <commercialVehicleSee ref="commercialVehicleSeeRef"></commercialVehicleSee>
        <checkilleagalDiag ref="checkilleagalDiagRef"></checkilleagalDiag>

    </div>
  </div>

</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import commercialVehicleSee from "@/page/checkInfo/checkInfoDiag/commercialVehicleDiag";
import { checkWithilleaglApi } from "@/api/checkInfo";
import checkilleagalDiag from "@/page/checkInfo/checkInfoDiag/checkilleagalDiag";

export default {
  mixins: [mixinGetCaseApiList],
  components: {
    commercialVehicleSee,
    checkilleagalDiag
  },
  data() {
//     OwnerName:北京京版物流有限责任公司
// LicenseCode:货备110115000169
// ProvinceCode:110000
    return {
      checkData: {
        vehicleNo: '',
        transCertificateCode: '',
        vin: '',
        plateColor:''
      },
      sfList:[],
      radio: '1',
      checkType: 1,
      yyclAmount:'0',
      tableData: [
      //   {
      //   cphm: 1,
      //   dlyszh: 1,
      //   cljyfw: 1,
      //   fzjg: 1,
      //   dlyszyxqsrq: 1,
      //   jyyhmc: 1
      // }
      ],
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
    //查询
    getCheck(checkType) {
        let _this = this
        if(checkType==3){
            let json=[];
            let param={
                vehicleNo:this.checkData.vehicleNo,
                plateColor:this.checkData.plateColor
            };
            json.push(param);
            this.$store.dispatch("vehicleCheck", JSON.stringify(json)).then(
                res => {
                    console.log('返回', res);
                    let tableData=[];
                    for(let index in res.data){
                        let result = {};
                        let jsonObj=res.data[index];
                        for(let key in jsonObj){
                            let keyval = jsonObj[key];
                            key = key.replace(key[0],key[0].toUpperCase());
                            result[key] = keyval;
                        }
                        tableData.push(result);
                    }

                    // _this.tableData = tableData;
                    if (tableData!=null && tableData.length > 0) {
                        _this.yyclAmount = _this.tableData.length;
                        this.getIllegalData(tableData);
                    }
                    if (tableData!=null && tableData.length > 1) {
                        _this.showFlag = false;
                    }
                },
                err => {
                    console.log(err);
                }
            );
        }else{
          this.$store.dispatch("yyclCheck", this.checkData).then(
              res => {
                  console.log('返回', res)
                  // _this.tableData = res.data;
                  if (res.data!=null && res.data.length > 0) {
                      _this.yyclAmount = res.data.length;
                      this.getIllegalData(res.data);
                  }
                  if (_this.tableData!=null && _this.tableData.length > 1) {
                      _this.showFlag = false;
                  }
              },
              err => {
                  console.log(err);
              }
          );
        }

    },
    getDictListDetail(data){
        let _this = this;
        this.$store.dispatch("getDictListDetail", data).then(
            res => {
                console.log('车牌颜色', res)
                _this.sfList = res.data;
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
      this.checkData.vehicleNo = '';
      this.checkData.transCertificateCode = '';
      this.checkData.vin = '';
    },
    //查看
    commercialVehicleSee(index, row) {
      this.$refs.commercialVehicleSeeRef.commercialVehicleSee(row);
    },
    showIllegal(illeagl){
      this.$refs.checkilleagalDiagRef.showModal(illeagl)
    },
    //获取违法行为条数
    async getIllegalData(checkData){
      for(let item of checkData){
        let data = {vehicleShipId:item.VehicleNo,ccertId:''}
        let illeagalRes = await checkWithilleaglApi(data);
        item.illeagl = illeagalRes.data;
        let illeaglTotal = 0;
        for(let item2 of item.illeagl.caseCount){
          illeaglTotal +=item2.count;
        }
        item.illeaglTotal = illeaglTotal;

      }
      console.log(checkData);
      this.tableData = checkData;
    }
  },
  created() {
      this.getDictListDetail("efae9ce1bd95b7698ce57f668d264fae");
  }
}
</script>

<style lang='scss' src="@/assets/css/checkInfo.scss" scoped></style>

