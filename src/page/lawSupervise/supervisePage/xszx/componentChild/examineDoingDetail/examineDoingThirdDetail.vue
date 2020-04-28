<template>
 <!-- 完成证据包 -->
<div class="main_box">
    <xszxDetailView :obj="obj"></xszxDetailView>
    <div class="shadow">
        <div class="box w-2">
            <div class="box_title">
                <span class="titleflag">
                </span>
                <span class="title">相关说明</span>
            </div>
            <div>
                <el-input
                        type="textarea"
                        :rows="4"
                        placeholder="请输入内容"
                        v-model="obj.remarks">
                </el-input>
            </div>
        </div>
    </div>
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
