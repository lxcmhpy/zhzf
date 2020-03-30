<template>
  <div class="check">
    <div class="top shadow">
        <div class="title_content">
            <div class="title_back float" @click="goBack">&lt;返回</div>
            <div class="float title_box title">船舶录查验</div>
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
              <el-radio :label="1">国内船舶查验</el-radio>
              <el-radio :label="2">国际船舶查验</el-radio>
            </el-radio-group>
        </div>
        <div class="title_box">
            <el-form-item label="船舶识别号" v-if="checkType==1">
              <el-input style="width:400px;" v-model="checkData.zjh" placeholder="输入国内船舶识别号码"></el-input>
            </el-form-item>
            <el-form-item label="船舶识别号" v-if="checkType==2">
              <el-input style="width:400px;" v-model="checkData.zsbh" placeholder="输入国际船舶识别号码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getCbCheck" size="medium">查询</el-button>
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
          <el-table-column prop="cbsbh" label="船舶识别号" align="center"></el-table-column>
          <el-table-column prop="cm" label="船名" align="center"></el-table-column>
          <el-table-column prop="dw" label="总吨位" align="center"></el-table-column>
          <el-table-column prop="cblx" label="船舶类型" align="center"></el-table-column>
          <el-table-column prop="cbsyr" label="船舶所有人" align="center"></el-table-column>
          <el-table-column prop="cbjyr" label="船舶经营人" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
                <template slot-scope="scope" >
                    <div>
                    <el-button type="text" @click="shipLookLook(scope.$index, scope.row)">查看</el-button>
                    </div>
                </template>
          </el-table-column>
        </el-table>
      </div>
        <shipLookLook ref="shipLookLookRef" @uploadaaa="getCbxxList()"></shipLookLook>
    </div>
  </div>
</template>

<script>
import shipLookLook from "@/page/checkInfo/checkInfoDiag/shipLookLook";
export default {
  data() {
    return {
      checkData: {
        zjh: '',
        zsbh: '',
      },
      radio: '1',
      checkType: 1,
      tableData: [{
        cbsbh: 1,
        cm: 11,
        dw: 1,
        cblx: 1,
        cbsyr: 1,
        cbjyr: 1
      }],
      searchList: [],
      showFlag: true,
      checkFlag: false,
      loading: true,
    }
  },
  components: {
    shipLookLook,
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    // 返回
    goBack() {
      this.$router.go(-1);//返回上一层
    },
    getCbCheck() {
      let data = {
        cbsbh: "",
        cm:"",
        dw:"",
        cblx:"",
        cbsyr:"",
        cbjyr: ""
      };
      this.searchList = [];
      this.checkFlag = true;
      let _this = this
    },
    changeType() {
      this.clearData()
    },
    //查看
    shipLookLook(index, row) {
      this.$refs.shipLookLookRef.shipLookLook(row);
    },
    // 清空数据
    clearData() {
      this.checkData.zjh = '';
      this.checkData.zsbh = '';
    }
  }
}
</script>

<style lang='scss' scoped>
@import "@/assets/css/checkInfo.scss";
</style>