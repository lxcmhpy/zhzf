<template>
  <div class="superviseBtns">
    <div v-if="['0', '1'].indexOf(tabActiveValue) > -1">
      <el-button type="button" class="submitBtn blueBtn" @click="showModal" >
        <i class="el-icon-warning-outline"></i>
        <div>无效<br />信息</div>
      </el-button>
      <el-button type="button" class="submitBtn blueBtn" @click="nextRouter">
        <i class="iconfont law-xiayibu"></i>
        <div>下一步</div>
      </el-button>
    </div>
    <div v-else>
      <el-button type="button" class="submitBtn blueBtn">
        <div>完成</div>
      </el-button>
    </div>

    <div>
      <el-dialog class="mini-dialog-title" title="无效信息" :visible.sync="visible" :show-close="false"
        :close-on-click-modal="false" width="420px" >
        <div class="error-message">
          <div class="">
            <img src="@/../static/images/img/cluesReview/icon_wuxiao.png"  alt="" />
          </div>
          <p>当前线索为无效信息</p>
        </div>
        <el-form :model="checkSearchForm" ref="checkSearchForm" class="checkSearchForm" label-width="0">
          <div class="invalidinfo">
            <el-select v-model="checkSearchForm.number" placeholder="选择无效线索类型">
              <el-option :value="0" label="无效线索类型1"></el-option>
              <el-option :value="1" label="无效线索类型2"></el-option>
            </el-select>
            <p>备注说明</p>
            <el-input v-model="checkSearchForm.color" type="textarea"></el-input>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="gotoCoerciveMeasureDoc">确认</el-button>
          <el-button @click="visible = false">取消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<style scoped lang="scss">
.superviseBtns {
  position: fixed;
  right: 50px;
  bottom: 50px;
  z-index: 2100;
  .submitBtn {
    display: block;
    margin: 8px;
    width: 50px;
    height: 73px;
    padding: 0px;
    margin: 8px 0px;
    line-height: 16px;
    font-size: 12px;
    i {
      font-size: 20px;
    }
    div {
      margin-top: 4px;
      // margin-left: -10px;
    }
  }
  .blueBtn {
    background: rgba(69, 115, 208, 1);
    box-shadow: 0px 2px 4px 0px rgba(39, 66, 122, 0.35);
    color: white;
  }
  .greenBtn {
    background: rgba(74, 175, 167, 1);
    box-shadow: 0px 2px 4px 0px rgba(39, 66, 122, 0.35);
    color: white;
  }
}
</style>
<style lang="scss" src="@/assets/css/cluesReview.scss"></style>
<script>
import {mapGetters} from "vuex";
export default {
  //tabActiveValue: 1检测数据核对,2违法超限复合,3生成证据包
  props: ['tabActiveValue'],
  data() {
    return {
      visible: false,
      checkSearchForm: {
        number: '',
        color: ''
      }
    };
  },
  methods: {
    showModal(data) {
      console.log(data);
      this.visible = true;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    gotoCoerciveMeasureDoc() {
      this.$store.dispatch("deleteTabs", this.$route.name);
      this.$router.push({ name: 'removeOrPrelong' })
    },
    dialogInvalidCue() {

    },
    goToInforCollect() {

      this.$store.commit('setCaseId','f205736182a36d9fd0574fa75eb30a30');
      this.$store.commit('setCaseApproval',false);
      this.$store.commit('setCaseNumber','吐临〔2020〕第00320号');
      this.$router.push({
        name: 'establish'
      });
      // let someCaseInfo = {"illageAct":"从事水路运输经营的船舶未随船携带船舶营运证件","illageActId":"206e7cbe53ff4a1dad5a7607fdbe9b28","programType":"一般程序","caseType":"标准案件","caseTypeId":"c82372d6b571a5b5691451a477bd58bc","cateId":"1002000300000000","cateName":"水路运政"}
      // iLocalStroage.sets("someCaseInfo", someCaseInfo);
      // this.$router.push({
      //     name: 'inforCollect',
      // });
    },
    nextRouter() {
      let nextStatus=parseInt(this.$route.params.status)+1
      this.$router.push({
        name: 'examineDoingDetail',
        params: {
          status: nextStatus.toString()
        }
      });
    }
  },
  mounted() {

  },
  computed: {
  },
}
</script>
