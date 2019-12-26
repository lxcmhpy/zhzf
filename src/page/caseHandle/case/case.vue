<template>
  <div class="case">

    <ul>
      <li @click="goDiao">调查文书</li>
      <li @click="goWen">询问文书</li>

      <!-- 打印版 -->
      <li @click="goEstablish">交通运输行政执法文书式样之一 ： 立案登记表</li>
      <li @click="goInquestReprot">交通运输行政执法文书式样之三 ： 勘验笔录</li>
      <li @click="goLiveReport">交通运输行政执法文书式样之四 ： 现场笔录</li>
      <li @click="goSendReprot">交通运输行政执法文书式样之二十三 ：送达回证</li>
      <li @click="goFinishReprot">交通行政执法文书式样之二十四 ： 结案报告</li>

    </ul>
  </div>
</template>
<script>
import MainContent from "@/components/mainContent";
import Layout from "@/page/lagout/mainLagout"; //Layout 是架构组件，不在后台返回，在文件里单独引入
export default {
  data() {
    return {};
  },
  methods: {
    goDiao() {
      this.makeRoute('/diao', '/diao2', '/diao3', 'diao', 'diao2', 'diao3', '调查类文书', 'caseHandle/case/diao.vue');
    },
    goWen() {
      this.makeRoute('/la', '/la2', '/la3', 'la', 'la2', 'la3', '问询', 'caseHandle/case/wen.vue');
    },
    // 立案登记表-打印
    goEstablish() {
      this.makeRoute('/establish', '/establish2', '/establish3', 'establish', 'establish2', 'establish3', '问询', 'caseHandle/case/establishForm.vue');
    },
    // 现场笔录-打印
    goLiveReport() {
      this.makeRoute('/live', '/live2', '/live3', '/live', '/live2', '/live3', '问询', 'caseHandle/case/liveRecord.vue');
    },
    // 勘验笔录-打印
    goInquestReprot() {
      this.makeRoute('/inspect', '/inspect2', '/inspect3', 'inspect', 'inspect2', 'inspect3', '问询', 'caseHandle/case/inspectRecord.vue');
    },
    // 送达回证-打印
    goSendReprot() {
      this.makeRoute('/send', '/send2', '/send3', 'send', 'send2', 'send3', '问询', 'caseHandle/case/sendReport.vue');
    },
    // 结案报告-打印
    goFinishReprot() {
      this.makeRoute('/finish', '/finish2', '/finish3', 'finish', 'finish2', 'finish3', '问询', 'caseHandle/case/finishReport.vue');
    },
    makeRoute(path1, path2, path3, name1, name2, name3, title, componentName) {  //path不可以重复  name也不可以重复
      this.$router.addRoutes([
        {
          path: path1,
          name: name1,
          component: Layout,
          children: [
            {
              path: path2,
              name: name2,
              component: MainContent,
              children: [
                {
                  path: path3,
                  name: name3,
                  meta: {
                    title: title
                  },
                  component: () => import("@/page/" + componentName)
                }
              ]
            }
          ]
        }
      ]);
      this.$router.push({ name: name3 });
    }
  }
};
</script>
<style lang="less">
.case li {
  cursor: pointer;
  line-height: 30px;
}
</style>
