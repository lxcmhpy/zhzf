<template>
  <div class="main">
    <div class="a4-box">
      <div class="pdf-box">
        <!-- <div>交通运输行政执法文书式样之二十二 ： 中止（终结、恢复）行政强制执行通知书</div> -->
        <div class="pdf-title">听证通知书</div>
        <div class="case-number">案号：{{docData.caseNumber}}</div>
        <div class="pdf-report-info">
          <p class="begin">
            当事人（个人姓名或单位名称） ：
            <span class="pdf-line width250">&nbsp;</span>
          </p>
          <p>
            根据你（单位）申请，关于
            <span class="pdf-line width430">&nbsp;</span>一案，现定于
            <span class="pdf-line width80">&nbsp;</span>年
            <span class="pdf-line width80">&nbsp;</span>月
            <span class="pdf-line width80">&nbsp;</span>日
            <span class="pdf-line width80">&nbsp;</span>时在
            <span class="pdf-line width250">&nbsp;</span>（公开、不公开）举行听证会议，请准时出席。
          </p>
          <p>
            听证人姓名：<span class="pdf-line width250">&nbsp;</span> 职务：<span class="pdf-line width250">&nbsp;</span>
          </p>
          <p>
            记录员姓名：<span class="pdf-line width250">&nbsp;</span> 职务：<span class="pdf-line width250">&nbsp;</span>
          </p>
          <p>
            根据《中华人民共和国行政处罚法》第四十二条规定，你（单位）可以申请
            听证主持人、听证员、记录员回避。
          </p>
          <p>
            注意事项如下：
          </p>
          <p>
            1.请事先准备相关证据，通知证人和委托代理人准时参加。
          </p>
          <p>
            2.委托代理人参加听证的，应当在听证会前向本机关提交授权委托书等有关
            证明。
          </p>
          <p>
            3.申请延期举行的，应当在举行听证会前向本行政机关提出，由本机关决定
            是否延期。
          </p>
          <p>
            4.不按时参加听证会且未事先说明理由的，视为放弃听证权利。
          </p>
          <p>
            特此通知。
          </p>
          <br><br>
          <p>
            联系地址：<span class="pdf-line width250">&nbsp;</span>
            邮编：<span class="pdf-line width250">&nbsp;</span>
          </p>
          <p>
            联系人：<span class="pdf-line width250">&nbsp;</span>
            联系电话：<span class="pdf-line width250">&nbsp;</span>
          </p>
          <div class="pdf-wirte">
            <div class="pdf-seal">
              交通运输执法部门（印章）
              <br />年 月 日
            </div>
          </div>

          <p class="begin margin-top87">（本文书一式两份：一份存根，一份交当事人或其代理人。）</p>
        </div>
      </div>
    </div>
      <!-- 悬浮按钮 -->
    <div class="float-btns">
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
    </div>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/js/mixins";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      docData:{
        caseNumber:""
      },
      caseDocDataForm:{
        id: "", //修改的时候用
        caseBasicinfoId: '', //案件id
        caseDoctypeId: "2c9029ca5b71686d015b71836d570019", //文书模版ID
        docData:'',
        status:''
      }
    }
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(['caseId']) },
  methods:{
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
    }
  },
  mounted() {
    this.getDocDataByCaseIdAndDocId();
  },
};
</script>
<style lang="less">
@import "../../../../css/pdf.less";
</style>