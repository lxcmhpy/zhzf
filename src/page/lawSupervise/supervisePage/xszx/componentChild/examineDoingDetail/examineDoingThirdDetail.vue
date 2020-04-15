<template>
 <!-- 完成证据包 -->
<div class="main_box">
    <xszxCommon :obj="obj"></xszxCommon>
</div>
</template>

<script>
import btns from '@/page/lawSupervise/supervisePage/xszx/componentChild/btns.vue';
import { mapGetters } from "vuex";
import xszxCommon from '../xszxCommon.vue';

export default {
    props: ['obj'],
    data () {
        return {
        }
    },
    methods: {
    },
    mounted () {
        // alert(this.offSiteManageId);
    },
    computed: {
        ...mapGetters(["offSiteManageId"])
    },
    components: {
        btns, xszxCommon
    }
}
</script>
