<template>
  <div class="imanage-box noborder-card">
    <el-tabs type="border-card">
      <el-tab-pane v-for="(item,index) in titleList" :key="index" :label="item"></el-tab-pane>
    </el-tabs>
    <div class="tabs-content">
      <div class="halfpage-left">
        <p class="border-title">关联文书</p>
        <div>
          <ul>
            <li class="icon-list" v-for="(item,index) in fileList" :key="index" :label="item">
              <div class="icon-box">
                <i class="iconfont law-icon_wenshu"></i>
              </div>
              {{item}}
            </li>
          </ul>
        </div>
      </div>
      <div class="halfpage-right">
        <p class="border-title">可选文书</p>
        <div></div>

      </div>
    </div>
    <div class="big-bottom-btn">
      <el-button>取消</el-button>
      <el-button type="primary" style="margin-left:34px">保存</el-button>
    </div>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";

export default {

  data() {
    return {
      isHome: true,
      searchModleName: '',
      titleList: ['处罚案件的什么模板'],
      typeList: [{}],
      fileList: ['《安全隐患告知函》', '《责令整改通知书》', '《立案登记表》'],
    }
  },

  methods: {
  },
  mounted() {
  }
}
</script>