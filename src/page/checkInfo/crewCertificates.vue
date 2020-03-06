<template>
  <div class="check yehu">
    <div class="top shadow">
      <div class="title_content">
        <div class="title_back float" @click="goBack">&lt;返回
        </div>
        <div class="float title_box title">船员适任证查验</div>

      </div>

    </div>
    <el-form :inline="true" :model="checkData">
      <div class="center shadow">
        <div class="center_content">
          <span class="titleflag">
          </span>
          <span class="title">查验条件</span>
        </div>
        <el-form-item label="船员证号码">
          <el-input v-model="checkData.certNo" placeholder="输入船员证号码"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码">
          <el-input v-model="checkData.idCardNo" placeholder="输入身份证号码"></el-input>
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
      <div class="empty" v-if="(checkData.certNo==''&&checkData.idCardNo=='')||!checkFlag">
        <img src="../../../static/images/img/check/pic_zhishi.svg" alt="">
        <p class="check_result_text">请在上方查验条件输入检索内容，显示结果</p>
      </div>
      <div v-if="(checkData.certNo!=''||checkData.idCardNo!='')" class="check_result_text">相关的{{searchList.length}}个搜索结果</div>
      <div class="empty" v-if="searchList==[{}]&&(checkData.certNo!=''||checkData.idCardNo!='')">
        <img src="../../../static/images/img/check/pic_kong.svg" alt="">
        <p class="check_result_text">正在查询</p>
      </div>

      <span v-if="searchList.length!=0 &&(checkData.certNo!=''||checkData.idCardNo!='')">
        <table v-for='item in searchList' :key="item.id">
          <tr>
            <td class="color_ff" width='20%'>
              姓名
            </td>
            <td width='30%'>{{item.ANAME}}</td>
            <td class="color_ff" width='20%'>
              性别
            </td>
            <td width='30%'>{{item.SEX}}</td>
          </tr>
          <tr>
            <td class="color_ff">
              身份证件号码
            </td>
            <td>{{item.ID_CARD_NO}}</td>
            <td class="color_ff">
              年龄
            </td>
            <td>{{item.CERT_POSI}}</td>
          </tr>
          <tr>
            <td class="color_ff">
              船员证号码
            </td>
            <td>{{item.CERT_NO}}</td>
            <td class="color_ff">
              证书状态
            </td>
            <td>{{item.CERT_STATUS}}</td>
          </tr>
          <tr>
            <td class="color_ff">
              证书有效期开始日期
            </td>
            <td>{{item.ISSU_DATE}}</td>
            <td class="color_ff">
              证书有效期截止日期
            </td>
            <td>{{item.EXPIRY_DATE}}</td>
          </tr>
          <tr>
            <td class="color_ff">
              签发机关
            </td>
            <td>{{item.ISSU_ORG_CODE}}</td>
            <td class="color_ff">
              证书签发日期
            </td>
            <td>{{item.ISSU_DATE}}</td>
          </tr>

        </table>
      </span>
    </div>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
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
      tableData: [],
      searchList: [],
      showFlag: true,
      checkFlag: false,
      // loading: true,
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
<style lang='scss' scoped>
@import "@/assets/css/checkInfo.scss";
</style>
