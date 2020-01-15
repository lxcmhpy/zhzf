<template>
  <div class="main">
    <div class="a4-box">
      <div class="pdf-box" ref="docForm">
        <!-- <div>交通运输行政执法文书式样之二十二 ： 中止（终结、恢复）行政强制执行通知书</div> -->
        <div class="pdf-title">听证笔录</div>
        <div class="case-number">案号：{{docData.caseNumber}}</div>
        <div class="pdf-report-info">
          <p class="begin">
            案件名称：
            <span class="pdf-line width555">&nbsp;</span>
          </p>
          <p class="begin">
            支持听证机关：
            <span class="pdf-line width555">&nbsp;</span>
          </p>
          <p class="begin">
            听证地点：
            <span class="pdf-line width555">&nbsp;</span>
          </p>
          <p class="begin">
            听证时间：
            <span class="pdf-line width30"></span>年
            <span class="pdf-line width30"></span>日
            <span class="pdf-line width30"></span>时
            <span class="pdf-line width30"></span>分
            至
            <span class="pdf-line width30"></span>年
            <span class="pdf-line width30"></span>月
            <span class="pdf-line width30"></span>日
            <span class="pdf-line width30"></span>时
            <span class="pdf-line width30"></span>分
          </p>
          <p class="begin">
            支持人：
            <span class="pdf-line width250">&nbsp;</span>
            听证员：
            <span class="pdf-line width250">&nbsp;</span>
          </p>
          <p class="begin">
            记录员：
            <span class="pdf-line width555">&nbsp;</span>
          </p>
          <p class="begin">
            执法人员：
            <span class="pdf-line width250">&nbsp;</span>
            执法证号：
            <span class="pdf-line width250">&nbsp;</span>
          </p>
          <p class="begin">
            执法人员：
            <span class="pdf-line width250">&nbsp;</span>
            执法证号：
            <span class="pdf-line width250">&nbsp;</span>
          </p>
          <p class="begin">
            当事人：
            <span class="pdf-line width150">&nbsp;</span>
            法定代表人：
            <span class="pdf-line width150">&nbsp;</span>
            联系电话：
            <span class="pdf-line width150">&nbsp;</span>
          </p>
          <p class="begin">
            委托代理人：
            <span class="pdf-line width150">&nbsp;</span>
            性别：
            <span class="pdf-line width30">&nbsp;</span>
            年龄：
            <span class="pdf-line width30">&nbsp;</span>
            工作单位及职务：
            <span class="pdf-line width150">&nbsp;</span>
          </p>
          <p class="begin">
            第三方：
            <span class="pdf-line width150">&nbsp;</span>
            性别：
            <span class="pdf-line width30">&nbsp;</span>
            年龄：
            <span class="pdf-line width30">&nbsp;</span>
            工作单位及职务：
            <span class="pdf-line width150">&nbsp;</span>
          </p>
          <p class="begin">
            其他参与人员：
            <span class="pdf-line width80">&nbsp;</span>
            性别：
            <span class="pdf-line width30">&nbsp;</span>
            年龄：
            <span class="pdf-line width30">&nbsp;</span>
            工作单位及职务：
            <span class="pdf-line width150">&nbsp;</span>
          </p>
          <p class="begin">
            听证记录：<span class="pdf-line width555">&nbsp;</span>
          </p>
          <p class="begin">
            <span class="pdf-line width650">&nbsp;</span>
          </p>
          <p class="begin">
            <span class="pdf-line width650">&nbsp;</span>
          </p>
          <p class="begin">
            <span class="pdf-line width650">&nbsp;</span>
          </p>
          <br><br>
          <p class="begin">
            当事人或其代理人签名： &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 支持人及听证员签名:<span class="pdf-line width150">&nbsp;</span>
          </p>
          <br>
          <p class="begin">
            <span class="pdf-line width250">&nbsp;</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            记录员签名:<span class="pdf-line width150">&nbsp;</span>
          </p>
          <br>
          <p class="begin">
            其他听证人员签名：
          </p>
          <p class="begin">
            <span class="pdf-line width250"></span>
          </p>
          <!-- <div class="pdf-wirte">
          <div class="pdf-seal">
            交通运输执法部门（印章）
            <br />年 月 日
          </div>
        </div>

        <p class="begin margin-top87">（本文书一式两份：一份存根，一份交当事人或其代理人。）</p> -->
        </div>
      </div>
    </div>
    <!-- 悬浮按钮 -->
    <casePageFloatBtns
      :pageDomId="'subOutputRank-print'"
      :formOrDocData="formOrDocData"
      @submitData="submitData"
      @saveData="saveData"
      @backHuanjie="submitData"
    ></casePageFloatBtns>
    <!-- <div class="float-btns">
      <el-button type="primary" @click="addDocData(1)">
        <svg t="1577414377979" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1726" width="16" height="16">
          <path d="M414.273133 1024a19.76097 19.76097 0 0 1-19.741211-20.488101l8.762126-237.513979a19.749115 19.749115 0 0 1 4.202738-11.471084l503.439415-641.372015-822.359463 475.187017 249.409882 129.274208c9.688823 5.021748 13.47267 16.947289 8.450922 26.635125-5.023724 9.687835-16.946301 13.471682-26.635125 8.449934L38.362218 606.82539a19.758006 19.758006 0 1 1-0.793324-34.650361l932.344942-538.738859a19.759982 19.759982 0 0 1 29.505118 19.454706l-109.172395 912.697585a19.758994 19.758994 0 0 1-28.848132 15.124522L609.347756 847.568976l-181.518965 171.052626a19.754055 19.754055 0 0 1-13.555658 5.378398z m28.276109-250.126145l-6.748685 182.935685 156.731307-147.692555a19.76097 19.76097 0 0 1 22.780144-3.091294l239.112482 126.310359L950.834551 126.32913 442.549242 773.873855z" p-id="1727" fill="#FFFFFF"></path>
        </svg><br>
        提交</el-button>
      <el-button type="success" @click="addDocData(0)">
        <svg t="1577415780823" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2584" width="16" height="16">
          <path d="M98 124.1V902c0 14.3 11.6 25.9 25.9 25.9h777.9c14.3 0 25.9-11.6 25.9-25.9V124.1c0-14.3-11.6-25.9-25.9-25.9H123.9c-14.3 0-25.9 11.6-25.9 25.9z m207.4 37.6h414.9v191.7H305.4V161.7z m558.8 702.7H162.6V161.7h104v230.6h492.7V161.7h105v702.7z" p-id="2585" fill="#FFFFFF"></path>
          <path d="M605.1 191.9h70v128h-70z" p-id="2586" fill="#FFFFFF"></path>
        </svg>
        <br>
        暂存</el-button>
    </div> -->
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/js/mixins";
import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
export default {
  mixins: [mixinGetCaseApiList],
  data() {
    return {
      // caseNumber: "",
      docData:{
        caseNumber:""
      },
      caseDocDataForm:{
        id: "", //修改的时候用
        caseBasicinfoId: '', //案件id
        caseDoctypeId: "2c9029ca5b71686d015b718068cf0015", //文书模版ID
        docData:'',
        status:''
      },
      formOrDocData: {
        showBtn: [false, true, true, false, false, false, false, false, false], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节
        pageDomId:'subOutputRank-print',
      }
    };
  },
  computed: { ...mapGetters(['caseId']) },
  components: {
    // overflowInput,
    casePageFloatBtns
  },
  methods: {
    //根据案件ID和文书Id获取数据
    getDocDataByCaseIdAndDocId() {
      this.caseDocDataForm.caseBasicinfoId = this.caseId;
      let data = {
        caseId: this.caseId,
        docId: this.$route.params.docId
      };
      this.com_getDocDataByCaseIdAndDocId(data)
    },
    addDocData(handleType) {
      this.com_addDocData(handleType);
      // this.$store.dispatch("deleteTabs", this.$route.name);//关闭当前页签
      // this.$router.push({
      //   name: this.$route.params.url,
      // });
    },
    //提交
    submitData(handleType) {
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      this.$router.push({
        name: this.$route.params.url
      });
    },
    //保存文书信息
    saveData(handleType) {
      this.com_addDocData(handleType, "docForm");
    },
    //是否是完成状态
    isOverStatus(){
      if(this.$route.params.docStatus == '1'){
        this.formOrDocData.showBtn =[false,false,false,false,false,false,false,false,false,true]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
      }
    }
  },
  mounted() {
    this.getDocDataByCaseIdAndDocId();
    console.log('$route.params',this.$route.params)
  },
  created(){
    this.isOverStatus();
  }
};
</script>
<style lang="less">
@import "../../../../css/pdf.less";
</style>