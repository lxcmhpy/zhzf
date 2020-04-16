<template>
  <div class="check">
    <div class="top shadow">
        <div class="title_content">
            <div class="title_back float" @click="goBack">&lt;返回</div>
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
        <div class="title_box_c">
            <el-radio-group v-model="checkType" @change="changeType">
              <el-radio :label="1">船员证查验</el-radio>
              <el-radio :label="2">身份证查验</el-radio>
            </el-radio-group>
        </div>
        <div class="title_box">
            <el-form-item label="船员证号码" v-if="checkType==1">
              <el-input style="width:400px;" v-model="checkData.certNo" placeholder="输入船员证号码"></el-input>
            </el-form-item>
            <el-form-item label="身份证号码" v-if="checkType==2">
              <el-input style="width:400px;" v-model="checkData.idCardNo" placeholder="输入身份证号码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getCrewCheck" size="medium">查询</el-button>
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
          <el-table-column prop="ANAME" label="姓名" align="center"></el-table-column>
          <el-table-column prop="ID_CARD_NO" label="身份证号" align="center"></el-table-column>
          <el-table-column prop="CERT_NO" label="船员证号" align="center"></el-table-column>
          <el-table-column prop="CERT_STATUS" label="证书状态" align="center"></el-table-column>
          <el-table-column prop="ISSU_DATE" label="证书有效起始日期" align="center"></el-table-column>
          <el-table-column prop="ISSU_ORG_CODE" label="签发机关" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
                <template slot-scope="scope" >
                    <div>
                    <el-button type="text" @click="crewLookLook(scope.$index, scope.row)">查看</el-button>
                    </div>
                </template>
          </el-table-column>
        </el-table>
      </div>
        <crewLookLook ref="crewLookLookRef" @uploadaaa="getCrewList()"></crewLookLook>
    </div>
  </div>
</template>

<script>
import crewLookLook from "@/page/checkInfo/checkInfoDiag/crewLookLook";
import { crewCheckApiIdcard ,crewCheckApiCertificates} from "@/api/checkInfo";
// import { crewCheckApiCertificates } from "@/api/checkInfo";
export default {
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
      loading: true,
    }
  },
  components: {
    crewLookLook,
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    // 返回
    goBack() {
      this.$router.go(-1);//返回上一层
    },
    getCrewCheck() {
      this.searchList = [];
      this.checkFlag = true;
      let _this = this
      if(this.checkType == 1){
        let data = {
            certNo: this.checkData.certNo,
          };
          // this.$store.dispatch("crewCheckApiKyxlbsp", data).then(res => {
            crewCheckApiCertificates(data).then(res => {
              console.log("船舶",res);
              _this.tableData = res.data;
            });
      }else{
          let data = {
            idCardNo: this.checkData.idCardNo,
          };
          // this.$store.dispatch("crewCheckApiCertificates", data).then(res => {
            crewCheckApiIdcard(data).then(res => {
              console.log("船舶",res);
              _this.tableData = res.data;
            });
      }
    },
    changeType() {
      this.clearData()
    },
    //查看
    crewLookLook(index, row) {
      this.$refs.crewLookLookRef.crewLookLook(row);
    },
    // 清空数据
    clearData() {
      this.checkData.certNo = '';
      this.checkData.idCardNo = '';
    }
  }
}
</script>

<!--<style lang='scss' scoped>
// @import "@/assets/css/checkInfo.scss";
// </style>-->
