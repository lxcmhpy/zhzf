<template>
  <div class="print_box" :class="{'color_FFFFFF': updatePrintStyleBoo}" style="height:100% !important">
    <object >
      <embed class="print_info" style="padding:0px;width: 1000px;margin:0 auto;height:100% !important" name="plugin" id="plugin" :src="storagePath" type="application/pdf" internalinstanceid="29">
    </object>
  </div>
</template>

<script>
export default {
  data () {
    return {
      storagePath: null
    }
  },
  methods: {
    getFile () {
      let _this = this
      this.$store.dispatch("getFile", {
          docId: '5cad5b54eb97a15250672a4c397cee56',
          caseId: '74842584eeb4a22c44cd8ef501c689cd'
        }).then(
        res => {
          console.log(res[0].storagePath)
          _this.storagePath = res[0].storagePath
        },
        err => {
          console.log(err);
        }
      );
    }
  },
  mounted () {
    this.getFile()
  },
  components: {
  }
}
</script>
