<template>
  <div class="main-box">
    <dealNotes></dealNotes>
    <otherEnclosure style="margin-top:22px"></otherEnclosure>
    <evidencePackage style="margin-top:22px"></evidencePackage>

  </div>
</template>
<script>
import dealNotes from '@/components/caseCenter/dealNotes.vue'
import otherEnclosure from '@/components/caseCenter/otherEnclosure.vue'
import evidencePackage from '@/components/caseCenter/evidencePackage.vue'
export default {
  components: {
    dealNotes,
    otherEnclosure,
    evidencePackage
  },

}
</script>
<style scoped>
.main-box{
    padding: 22px;
}
</style>
<style lang="scss" src="@/assets/css/cluesReview.scss" scoped></style>
