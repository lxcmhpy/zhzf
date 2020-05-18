<template>
  <div class="check check_home">
    <div class="home_top shadow">
      <div class="center_content">
        <span class="titleflag">
        </span>
        <span class="title">历史查验</span>
      </div>
      <div class="empty history">
        <img src="../../../static/images/img/check/pic_kong.svg" alt="">
        <p class="emty_result_text">暂无内容</p>
      </div>

    </div>
    <div class="home_bottom shadow">
      <div class="center_content">
        <span class="titleflag">
        </span>
        <span class="title">通用查验</span>
        <span class="search_box">

          <el-input placeholder="输入许可、班线等搜索方式" v-model="searchCheckType" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </span>

      </div>
      <!-- <div class="empty" v-if="(checkData.certNo==''&&checkData.idCardNo=='')||!checkFlag">
        <img src="../../../static/images/img/check/pic_zhishi.svg" alt="">
        <p class="emty_result_text">请在上方查验条件输入检索内容，显示结果</p>
      </div>-->
      <div v-if="(checkData.certNo!=''||checkData.idCardNo!='')" class="check_result_text">相关的{{searchList.length}}个搜索结果</div>
      <ul>
        <li v-for="item in typeList" :key="item.id" @click="infoCheck(item.name)">
          <div class="img_check">
            <img :src="'./static/images/img/'+item.icon+'.png'">
          </div>
          <span>{{item.lable}}</span>
        </li>
      </ul>
      <!-- <ul>

        <li>
          <div>
            <img :src="'./static/images/img/icon_lit_jyyh.png'">
          </div>
          <span>道路运输从业人员</span>
        </li>
        <li>
          <div>
            <img :src="'./static/images/img/icon_lit_yyunc.png'">
          </div>
          <span>营运车辆</span>
        </li>
        <li>
          <div>
            <img :src="'./static/images/img/icon_lit_jyyehu.png'">
          </div>
          <span>经营业户</span>
        </li>

        <li>
          <div>
            <img :src="'./static/images/img/icon_lit_kyxlu.png'">
          </div>
          <span>客运线路标志牌</span>
        </li>
        <li>
          <div>
            <img :src="'./static/images/img/icon_lit_cy.png'">
          </div>
          <span>船员适任证</span>
        </li>
        <li>
          <div>
            <img :src="'./static/images/img/icon_lit_cbyyzheng.png'">
          </div>
          <span>船舶营运证</span>
        </li>
      </ul> -->
    </div>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import '../../../static/iconfont/iconfont.js'
export default {
  mixins: [mixinGetCaseApiList],
  data() {
    return {
      checkData: {
        certNo: '',
        idCardNo: '',
      },
      radio: '1',
      checkType: 1,
      searchCheckType: '',
      tableData: [],
      searchList: [],
      showFlag: true,
      checkFlag: false,
      // loading: true,
      typeList: [
        {
          id: '1',
          lable: "道路运输从业人员",
          name: 'case_handle_transportWorker',
          icon: "icon_lit_jyyh",
        },
        {
            id: '2',
          lable: "营运车辆",
          name: 'case_handle_commercialVehicle',
          icon: "icon_lit_yyunc",
        },
        {
            id: '3',
          lable: "经营业户",
          name: 'case_handle_industry',
          icon: "icon_lit_jyyehu",
        },
        {
            id: '4',
          lable: "客运线路标志牌",
          name: 'case_handle_vehicleLine',
          icon: "icon_lit_kyxlu",
        },
        {
            id: '5',
          lable: "船员适任证",
          name: 'case_handle_crewCertificates',
          icon: "icon_lit_cy",
        },
        {
            id: '6',
          lable: "船舶营运证",
          name: 'case_handle_shipCertificates',
          icon: "icon_lit_cbyyzheng",
        },
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
      this.searchList = [];
      this.checkFlag = true;
      let _this = this
      this.$store.dispatch("crewCheck", this.checkData).then(
        res => {
          _this.searchList = res;
          _this.searchList[0].SEX = '';
          var sexData = _this.searchList[0].ID_CARD_NO.substr(17, 1)
          if (sexData % 2 == 0) {
            _this.searchList[0].SEX = '男'
          }
          if (sexData % 2 == 1) {
            _this.searchList[0].SEX = '女'
          }
          console.log('返回', _this.searchList)
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
    // 信息查验
    infoCheck(path) {

      // this.$store.dispatch("replaceTabs", '');
      this.$store.dispatch("deleteTabsByTitle", '信息查验');
      // this.$store.dispatch("deleteTabs", targetName);
      this.$router.push({ name: path ,title:'信息查验'});
    },
    // 清空数据
    clearData() {
      this.checkData.idCardNo = '';
      this.checkData.certNo = '';
    }

    // 船员发证信息_海船船员适任证-身份证号码资源服务接口
    // idCardNo:000000490710001

    // 船员发证信息_海船船员适任证-证书号码资源服务接口
    // certNo:DLE232200200406
  }
}
</script>
<style lang='scss' src="@/assets/css/checkInfo.scss" scoped></style>
<style type="text/css">
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
