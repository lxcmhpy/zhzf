<template>
    <div class="print_box" style="height:100% !important">
        <object>
            <embed class="print_info" style="padding:0px;width: 1000px;margin:0 auto;height:100% !important"
                name="plugin" id="plugin" :src="storagePath" type="application/pdf" internalinstanceid="29">
        </object>
    </div>
</template>

<script>
    import iLocalStroage from "@/common/js/localStroage";
    export default {
        data() {
            return {
                storagePath: null
            }
        },
        methods: {
            getFile() {
                this.$util.com_getFileStream(this.$route.params.id).then((res) => {
                    this.storagePath = res;
                  });
                
            }
        },
        mounted() {
            if (this.$route.params.id !== undefined) {
                this.getFile()
            }
        },
        components: {}
    }

</script>
