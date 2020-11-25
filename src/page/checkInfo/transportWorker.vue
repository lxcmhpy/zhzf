<template>
  <div class="check yehu">
    <div class="top shadow">
      <div class="title_content">
        <div class="title_back float" @click="goBack">&lt;返回
        </div>
        <div class="float title_box title">道路运输从业人员查验</div>
      </div>
    </div>
    <el-form :inline="true" :model="checkData">
      <div class="center shadow">
        <div class="center_content">
          <span class="titleflag">
          </span>
          <span class="title">查验条件</span>
        </div>
        <el-form-item label="从业资格证号">
      <el-input v-model="checkData.certificateCode" placeholder="请输入从业资格证号(身份证号)" @change="changeCertificateCode(checkData.certificateCode)"></el-input>
    </el-form-item>
    <el-form-item label="姓名">
      <el-input v-model="checkData.staffName" placeholder="请输入姓名"></el-input>
    </el-form-item>
        <el-form-item label="省份" class="margin28" >
          <el-select v-model="checkData.provinceCode" placeholder="请选择">
              <el-option
                v-for="(item,i) in sfList"
                :key="i"
                :label="item.value"
                :value="item.label"
                >
            </el-option>
          </el-select>
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
      <div class="result">
        <span>相关的{{dlyscyryAmount}}个搜索结果</span>
      </div>
      <div class="tablePart" align="center">
        <el-table :data="tableData" stripe resizable border style="width: 100%;height:100%;" >
          <el-table-column prop="staffName" label="姓名" align="center"></el-table-column>
          <el-table-column prop="CertificateCode" label="从业资格证号" align="center"></el-table-column>
          <el-table-column prop="WorkTypeCode" label="从业资格类别" align="center"></el-table-column>
          <el-table-column prop="LicenseIssueOrganCode" label="发证机关" align="center"></el-table-column>
          <el-table-column label="证件有效期" align="center">
            <template slot-scope="scope">
                <span>{{scope.row.CertificateIssueDate}}</span> ~ <span>{{scope.row.CertificateExpireDate}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="CertificateState" label="资格证状态" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
                <template slot-scope="scope" >
                    <span>
                    <el-button type="text" @click="transportWorkerSee(scope.$index, scope.row)">查看</el-button>
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
        <transportWorkerSee ref="transportWorkerSeeRef"></transportWorkerSee>
        <checkilleagalDiag ref="checkilleagalDiagRef"></checkilleagalDiag>

    </div>
  </div>

</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import transportWorkerSee from "@/page/checkInfo/checkInfoDiag/transprotWorkerDiag";
import checkilleagalDiag from "@/page/checkInfo/checkInfoDiag/checkilleagalDiag";
import { checkWithilleaglApi } from "@/api/checkInfo";

export default {
  mixins: [mixinGetCaseApiList],
  components: {
    transportWorkerSee,
    checkilleagalDiag
  },
  data() {
//     OwnerName:北京京版物流有限责任公司
// LicenseCode:货备110115000169
// ProvinceCode:110000
    return {
      checkData: {
        certificateCode: '',
        staffName: '',
        provinceCode: ''
      },
      radio: '1',
      checkType: 1,
      dlyscyryAmount:'0',
      tableData: [
      //   {
      //   staffName: 1,
      //   CertificateCode: 1,
      //   cyzgzlb: 1,
      //   LicenseIssueOrganCode: 1,
      //   zjyxq: 1,
      //   CertificateState: 1
      // }
      ],
      searchList: [{}],
      showFlag: true,
      sfList: [
        {
          value: '北京市',
          label: '110000'
        },
        {
          value: '天津市',
          label: '120000'
        },
        {
          value: '河北省 ',
          label: '130000'
        },
        {
          value: '山西省',
          label: '140000'
        },
        {
          value: '内蒙古自治区',
          label: '150000'
        },
        {
          value: '辽宁省',
          label: '210000'
        },
        {
          value: '吉林省',
          label: '220000'
        },
        {
          value: '黑龙江省',
          label: '230000'
        },
        {
          value: '上海市 ',
          label: '310000'
        },
        {
          value: '江苏省',
          label: '320000'
        },
        {
          value: '浙江省',
          label: '330000'
        },
        {
          value: '安徽省',
          label: '340000'
        },
        {
          value: '福建省',
          label: '350000'
        },
        {
          value: '江西省 ',
          label: '360000'
        },
        {
          value: '山东省',
          label: '370000'
        },
        {
          value: '河南省',
          label: '410000'
        },
        {
          value: '湖北省',
          label: '420000'
        },
        {
          value: '湖南省 ',
          label: '430000'
        },
        {
          value: '广东省',
          label: '440000'
        },
        {
          value: '广西壮族自治区',
          label: '450000'
        },
        {
          value: '海南省',
          label: '460000'
        },
        {
          value: '重庆市',
          label: '500000'
        },
        {
          value: '四川省 ',
          label: '510000'
        },
        {
          value: '贵州省',
          label: '520000'
        },
        {
          value: '云南省',
          label: '530000'
        },
        {
          value: '西藏自治区',
          label: '540000'
        },
        {
          value: '陕西省',
          label: '610000'
        },
        {
          value: '甘肃省 ',
          label: '620000'
        },
        {
          value: '青海省',
          label: '630000'
        },
        {
          value: '宁夏回族自治区',
          label: '640000'
        },
        {
          value: '新疆维吾尔自治区',
          label: '650000'
        },
        {
          value: '台湾省',
          label: '710000'
        },
        {
          value: '香港特别行政区',
          label: '720000'
        },
        {
          value: '澳门特别行政区',
          label: '730000'
        }
      ],
      area: {11:"110000",12:"120000",13:"130000",14:"140000",15:"150000",21:"210000",22:"220000",23:"230000",
          31:"310000",32:"320000",33:"330000",34:"340000",35:"350000",36:"360000",37:"370000",41:"410000",42:"420000",
          43:"430000",44:"440000",45:"450000",46:"460000",50:"500000",51:"510000",52:"520000",53:"530000",54:"540000",
          61:"610000",62:"620000",63:"630000",64:"640000",65:"650000",71:"710000",81:"720000",82:"730000",91:"国外"
      }
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
      this.$store.dispatch("dlyscyryCheck", this.checkData).then(
        res => {
          console.log('返回', res)
          res.data[0].staffName = this.checkData.staffName;
          // _this.tableData = res.data;
          if (res.data!=null &&  res.data.length > 0) {
             _this.dlyscyryAmount = res.data.length;
             this.getIllegalData(res.data);
          }
          if (res.data!=null && res.data.length > 1) {
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
    transportWorkerSee(index, row) {
      let certificateCode = this.checkData.certificateCode;
      let sex;
      let staffSex;
      let staffBirth;
      if(certificateCode.length == 15){
          staffSex = certificateCode.substring(13,14);
          staffBirth = "19"+certificateCode.substring(6,8)+"-"+certificateCode.substring(8,10)+"-"+certificateCode.substring(10,12);
      }
      if(certificateCode.length == 18){
          sex = certificateCode.substring(16,17);
          staffBirth = certificateCode.substring(6,10)+"-"+certificateCode.substring(10,12)+"-"+certificateCode.substring(12,14);
        }
      if(sex%2 === 0)
        staffSex = '女';
      else
        staffSex = '男';
      row.staffSex = staffSex;
      row.staffBirth = staffBirth;
      this.$refs.transportWorkerSeeRef.transportWorkerSee(row);
    },
    //自动计算省份
    changeCertificateCode(certificateCode) {
        let iden = certificateCode;
        this.checkData.provinceCode = this.area[iden.substring(0,2)];
    },
    showIllegal(illeagl){
      this.$refs.checkilleagalDiagRef.showModal(illeagl)
    },
    //获取违法行为条数
    async getIllegalData(checkData){
      for(let item of checkData){
        let data = {party:this.checkData.staffName,partyEcertId:this.checkData.certificateCode}
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
  }
}
</script>
<style lang='scss' src="@/assets/css/checkInfo.scss" scoped></style>
