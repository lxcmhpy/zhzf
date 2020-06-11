<template>
  <div class="print_box" style="height:100% !important">
    <object >
      <embed class="print_info" style="padding:0px;width: 1000px;margin:0 auto;height:100% !important" name="plugin" id="plugin" :src="storagePath" type="application/pdf" internalinstanceid="29">
    </object>
  </div>
</template>

<script>

import iLocalStroage from "@/common/js/localStroage";

export default {
  data () {
    return {
      storagePath: null
    }
  },
  methods: {
    getFile () {
      console.log('this.$route.params',this.$route.params)
      this.storagePath = iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST +this.$route.params.storageId
    }
  },
  mounted () {
    this.getFile()
  },
  components: {
  }
}
</script>
