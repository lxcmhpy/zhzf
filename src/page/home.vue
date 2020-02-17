<template>
  <div class="full">
    <div v-if="currentHome == 'xboot'" class="full">
      系统管理首页
    </div>
    <div v-if="currentHome == 'caseHandle'" class="full">
      <!-- 案件办理首页 -->
      <caseHome></caseHome>
    </div>
    <!-- {{currentHome}} -->
  </div>
</template>
<script>
import iLocalStroage from "@/js/localStroage";
import caseHome from '@/page/caseHome.vue';
export default {
  components: {
    caseHome
  },
  data() {
    return {
      nav: iLocalStroage.get('headActiveNav')
    }
  },
  computed: {
    currentHome: function () {
      console.log(iLocalStroage.get('headActiveNav'))
      return iLocalStroage.get('headActiveNav')
    }
  },
  methods: {

  },
  watch: {
    nav(to, from) {
      console.log(to);
    }
  }

}
</script>
<style scoped>
.full {
  width: 100%;
  height: 100%;
}
</style>