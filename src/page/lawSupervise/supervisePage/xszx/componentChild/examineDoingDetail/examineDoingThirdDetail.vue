<template>
 <!-- 完成证据包 -->
<div class="main_box">
    <xszxDetailView :obj="obj"></xszxDetailView>
</div>
</template>

<script>
import btns from '@/page/lawSupervise/supervisePage/xszx/componentChild/btns.vue';
import { mapGetters } from "vuex";
import xszxDetailView from '../xszxDetailView.vue';

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
        // ...mapGetters(["offSiteManageId"])
    },
    components: {
        btns, xszxDetailView
    }
}
</script>
