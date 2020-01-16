<template>
  <div class="print_box">
    <embed class="print_info" style="padding:0px;width: 730px;height:100% !important"name="plugin" id="plugin" :src="storagePath" type="application/pdf" internalinstanceid="29">
  </div>
</template>
<script>
import pdf from 'vue-pdf'
export default {
  data () {
    return {
      storagePath: null
    }
  },
  methods: {
    getFile () {
      this.$store.dispatch("getFile", {
          docId: '5cad5b54eb97a15250672a4c397cee56',
          caseId: '297708bcd8e80872febb61577329194f'
        }).then(
        res => {
          console.log(res[0].storagePath)
          this.storagePath = res[0].storagePath
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
    pdf
  }
}
</script>
