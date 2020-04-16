<template>
  <div class="main-box">
    <dealNotes></dealNotes>
    <otherEnclosure style="margin-top:22px"></otherEnclosure>
    <evidencePackage style="margin-top:22px"></evidencePackage>

  </div>
</template>
<script>
import dealNotes from '@/components/cluesReview/dealNotes.vue'
import otherEnclosure from '@/components/cluesReview/otherEnclosure.vue'
import evidencePackage from '@/components/cluesReview/evidencePackage.vue'
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