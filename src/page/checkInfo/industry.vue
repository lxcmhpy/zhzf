<template>
  <div class="check yehu">
    <div class="top shadow">
      <div class="title_content">
        <div class="title_back float" @click="goBack">&lt;返回
        </div>
        <div class="float title_box title">经营业户查验</div>

      </div>

    </div>
    <el-form :inline="true" :model="checkData">
      <div class="center shadow">
        <div class="center_content">
          <span class="titleflag">
          </span>
          <span class="title">查验条件</span>
          <el-radio-group v-model="checkType" @change="changeType" style="margin-left: 40px">
            <el-radio :label="1">业户名称查验</el-radio>
            <el-radio :label="2">经营许可证号查验</el-radio>
          </el-radio-group>
        </div>

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
        <el-form-item v-if="checkType==1">
          <span slot="label">业户名称<span style="color: red;">(个体户除外)</span></span>
          <el-input v-model="checkData.ownerName" placeholder="输入业户名称"></el-input>
        </el-form-item>
        <el-form-item label="经营许可证号" v-if="checkType==2">
          <el-input v-model="checkData.licenseCode" placeholder="输入经营许可证号"></el-input>
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
        <!-- <el-button @click="show(true)" v-if='showFlag' size="mini">&or;</el-button>
        <el-button @click="show(false)" v-if='!showFlag' size="mini">&and;</el-button> -->
      </div>
      <div class="result">
        <span>相关的{{yehuAmount}}个搜索结果</span>
      </div>
      <div class="tablePart" align="center">
        <el-table :data="tableData" stripe resizable border style="width: 100%;height:100%;min-height: 100px" :span-method="tableSpanMethod" >
          <el-table-column prop="OwnerName" label="业户名称" align="center"></el-table-column>
          <el-table-column prop="LicenseCode" label="经营许可证号" align="center"></el-table-column>
          <el-table-column prop="LicenseIssueOrgan" label="发证机关" align="center"></el-table-column>
          <el-table-column prop="EconType" label="经营类型" align="center"></el-table-column>
          <el-table-column label="许可证有效期" align="center">
            <template slot-scope="scope">
                <span>{{scope.row.ValidBeginDate}}</span> ~ <span>{{scope.row.ExpireDate}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="BusinessScopeCode" label="经营范围" align="center"></el-table-column>
          <el-table-column prop="OperatingStatus" label="经营状态" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
                <template slot-scope="scope" >
                    <span>
                      <el-button type="text" @click="industrySee(scope.$index, scope.row)">查看</el-button>
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
        <industrySee ref="industrySeeRef"></industrySee>
        <checkilleagalDiag ref="checkilleagalDiagRef"></checkilleagalDiag>
      <!-- <div v-if="tableData.lenth>0">请在上方查验条件输入检索内容，显示结果</div>
      <table v-for='item in searchList' :key="item.id">
        <tr>
          <td class="color_ff" valign="middle">
            经营业户名称
          </td>
          <td :colspan="3">{{item.OwnerName}}</td>
        </tr>
        <tr>
          <td class="color_ff" width='20%'>
            省份名称
          </td>
          <td width='30%'>{{item.ProvinceCode}}</td>
          <td class="color_ff" width='20%'>
            经营业户所在地行政区划代码
          </td>
          <td width='30%'>{{item.NativeAreaCode}}</td>
        </tr>
        <tr>
          <td class="color_ff">
            经营许可证字
          </td>
          <td>{{item.LicenseWord}}</td>
          <td class="color_ff">经营许可证号</td>
          <td>{{item.LicenseCode}}</td>
        </tr>
        <tr>
          <td class="color_ff" rowspan="2">经营范围</td>
          <td :colspan="3" rowspan="2">
            {{item.BusinessScopeCode}}
          </td>
        </tr>
        <tr></tr>
        <tr>
          <td class="color_ff">有效期起</td>
          <td>{{item.ValidBeginDate}}</td>
          <td class="color_ff">有效期止</td>
          <td>{{item.ExpireDate}}</td>
        </tr>
        <tr>
          <td class="color_ff">经营类型</td>
          <td>{{item.EconType}}</td>
          <td class="color_ff">经营状态</td>
          <td>{{item.OperatingStatus}}</td>
        </tr>
        <tr>
          <td class="color_ff">发证机关</td>
          <td>{{item.LicenseIssueOrgan}}</td>
          <td class="color_ff">核发日期</td>
          <td>{{item.LicenseIssueDate}}</td>
        </tr>
        <tr>
          <td class="color_ff">企业组织机构代码</td>
          <td>{{item.OrganizationCode}}</td>
          <td class="color_ff">经营业户负责人姓名</td>
          <td>{{item.PrincipalName}}</td>
        </tr>
      </table> -->
    </div>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import industrySee from "@/page/checkInfo/checkInfoDiag/industryDiag";
import checkilleagalDiag from "@/page/checkInfo/checkInfoDiag/checkilleagalDiag";
import { checkWithilleaglApi } from "@/api/checkInfo";
export default {
  mixins: [mixinGetCaseApiList],
  components: {
    industrySee,
    checkilleagalDiag
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
      yehuAmount:'0',
      // tableData: [{
      //   OwnerName: 1,
      //   LicenseCode: 1,
      //   LicenseIssueOrgan: 1,
      //   EconType: 1,
      //   xkzyxq: 1,
      //   OperatingStatus: 1
      // }],
      tableData: [

      ],
      //查看
    industrySee(index, row) {
      console.log(row);
      this.$refs.industrySeeRef.industrySee(row);
    },
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
      this.yehuAmount="0"
        let _this = this
      this.$store.dispatch("yehuCheck", this.checkData).then(
        res => {
          console.log('返回', res)
         // _this.searchList = res.data
          // _this.tableData = res.data;
          if ( res.data != null && res.data.length > 0) {
            _this.yehuAmount = res.data.length;
            this.getIllegalData(res.data);
          }
          if ( res.data != null &&  res.data.length > 1) {
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
    showIllegal(illeagl){
      this.$refs.checkilleagalDiagRef.showModal(illeagl)
    },
    //获取违法行为条数
    async getIllegalData(checkData){
      for(let item of checkData){
        let data = {partyName:item.OwnerName,roadTransportLicense:''}
        let illeagalRes = await checkWithilleaglApi(data);
        item.illeagl = illeagalRes.data;
        let illeaglTotal = 0;
        for(let item2 of item.illeagl.caseCount){
          illeaglTotal +=item2.count;
        }
        item.illeaglTotal = illeaglTotal;

      }
      
      
      
      //设置 合并单元格
      let startIndex = 0;
      for(let item2 of checkData){
        item2.ownerNum = 0;
          for(let item3 of checkData){
            if(item2.OwnerName == item3.OwnerName)  item2.ownerNum++
          }   
        if(item2.OperatingStatus == '营业')  item2.OperatingStatusType = 1;
        else item2.OperatingStatusType = 0;
      }

      //排序 先按名称排序 后按营业歇业排序
      checkData = checkData.sort(function(a,b){
          return a.OwnerName - b.OwnerName;
      });
      checkData = checkData.sort(function(a,b){
        if(a.OwnerName == b.OwnerName){
          return b.OperatingStatusType - a.OperatingStatusType
        }
      })
      
      for(let i = 0;i < checkData.length;i){
        checkData[i].total = checkData[i].ownerNum;
        i = i + checkData[i].ownerNum
      }
      

      console.log(checkData);
      this.tableData = checkData;
    },
    tableSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 8) {
        if (row.total) {
          return {
            rowspan: row.total,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },

  }
}
</script>

<style lang='scss' src="@/assets/css/checkInfo.scss" scoped></style>







