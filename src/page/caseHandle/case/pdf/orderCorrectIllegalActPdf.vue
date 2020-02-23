<template>
<div class="main">
  <div class="a4-box">
    <div class="pdf-box">
      <!-- <div>交通运输行政执法文书式样之二十二 ： 中止（终结、恢复）行政强制执行通知书</div> -->
      <div class="pdf-title">责令改正违法行为通知书</div>
      <div class="case-number">案号：{{caseNumber}}</div>
      <div class="pdf-report-info">
        <p class="begin">
          当事人（个人姓名或单位名称） ：
          <span class="pdf-line width250">&nbsp;</span>
        </p>
        <p>
          经调查，你（单位）存在下列违法事实：
          <span class="pdf-line width395">&nbsp;</span>
          <span class="pdf-line width721">&nbsp;</span>
          <span class="pdf-line width721">&nbsp;</span>
          <span class="pdf-line width721">&nbsp;</span>
        </p>
        <p>
          根据<span class="pdf-line width250">&nbsp;</span>的规定，现责令你（单位）
        </p>
        <p>
          <input type="checkbox"/>立即予以改正。
        </p>
        <p>
          <input type="checkbox"/>在<span class="pdf-line width80">&nbsp;</span>年
          <span class="pdf-line width30">&nbsp;</span>月
          <span class="pdf-line width30">&nbsp;</span>日前整改完毕。
        </p>
        <p>
            如果不服本处罚决定，可以在六十日内依法向<span class="pdf-line width150">&nbsp;</span>申请
行政复议，或者在六个月内依法向<span class="pdf-line width150">&nbsp;</span>人民法院提起诉讼。
        </p>
        <br><br>
         <p>
          当事人或其代理人签名：   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           执法人员签名：
          </p>
          <p>
         <span class="pdf-line width150">&nbsp;</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         <span class="pdf-line width150">&nbsp;</span>
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
</div>
</template>
<script>
export default {
  data() {
    return {
      caseNumber: "010-123456"
    };
  }
};
</script>
<style lang="scss">
@import "@/assets/css/pdf.scss";
</style>
