<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="n_searchAndpageBox">
      <personInfoPage />
    </div>
  </div>
</template>
<script>
import personInfoPage from "@/components/personComponents/personInfo"
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
<style lang="scss" scoped>
@import "@/assets/css/personManageTitle.scss";
</style>
