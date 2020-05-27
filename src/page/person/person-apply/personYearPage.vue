<template>
  <div class="com_searchAndpageBoxPadding" >
    <div class="n_searchAndpageBox" style="height:1060px;">
      <personInfoPage />
    </div>
  </div>
</template>
<script>
import personYearApply from "./person-yearApply/personYearApply"
export default {
  name: 'personDetailPage',
  data() {
    return {

    }
  },
  components: {
    personInfoPage
  },
}

</script>
<style lang="scss" src="@/assets/css/personManageTitle.scss" scoped>
/* @import "@/assets/css/personManageTitle.scss"; */
</style>
