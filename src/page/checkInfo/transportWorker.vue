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
      <el-input v-model="checkData.ownerName" placeholder="请输入从业资格证号(身份证号)"></el-input>
    </el-form-item>
    <el-form-item label="姓名">
      <el-input v-model="checkData.ownerName" placeholder="请输入姓名"></el-input>
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
      <div class="tablePart" align="center">
        <el-table :data="tableData" stripe resizable border style="width: 100%;height:100%;" >
          <el-table-column prop="staffName" label="姓名" align="center"></el-table-column>
          <el-table-column prop="CertificateCode" label="从业资格证号" align="center"></el-table-column>
          <el-table-column prop="cyzgzlb" label="从业资格类别" align="center"></el-table-column>
          <el-table-column prop="LicenseIssueOrganCode" label="发证机关" align="center"></el-table-column>
          <el-table-column prop="zjyxq" label="证件有效期" align="center"></el-table-column>
          <el-table-column prop="CertificateState" label="资格证状态" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
                <template slot-scope="scope" >
                    <div>
                    <el-button type="text" @click="transportWorkerSee(scope.$index, scope.row)">查看</el-button>
                    </div>
                </template>
          </el-table-column>
        </el-table>
      </div>
        <transportWorkerSee ref="transportWorkerSeeRef"></transportWorkerSee>
    </div>
  </div>
  
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import transportWorkerSee from "@/page/checkInfo/checkInfoDiag/transprotWorkerDiag";
export default {
  mixins: [mixinGetCaseApiList],
  components: {
    transportWorkerSee
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
        staffName: 1,
        CertificateCode: 1,
        cyzgzlb: 1,
        LicenseIssueOrganCode: 1,
        zjyxq: 1,
        CertificateState: 1
      }],
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
          value: '新疆维吾尔族自治区',
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
      ]
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
    transportWorkerSee(index, row) {
      this.$refs.transportWorkerSeeRef.transportWorkerSee(row);
    }
  }
}
</script>
<style lang='scss' scoped>
@import "@/assets/css/checkInfo.scss";
</style>
