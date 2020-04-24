<template>
<!-- 无效信息页面 -->
<div class="main_box">
    <div class="main_content" style="margin-top: 24px">
        <div class="shadow">
            <div class="box w-2" v-if="obj">
                <div class="box_title">
                    <span class="titleflag">
                    </span>
                    <span class="title">无效说明</span>
                </div>
                <div>
                    <el-input
                            type="textarea"
                            :rows="4"
                            placeholder="请输入内容"
                            value="车牌号遮挡">
                    </el-input>
                </div>
            </div>
        </div>
        <xszxDetailView v-if="obj" :obj="obj"></xszxDetailView>
    </div>
    <btns></btns>
</div>
</template>

<style src="@/assets/css/sliderPage.scss" lang="scss"></style>
<style src="@/assets/css/basicStyles/error.scss" lang="scss"></style>
<style lang="scss" src="@/assets/css/cluesReview.scss"></style>
<style>
.main_box .main_content .shadow {
    padding-top: 14px;
}
</style>
<script>
import btns from '@/page/lawSupervise/supervisePage/xszx/componentChild/btns.vue';
import {getDetailById} from '@/api/lawSupervise.js';
import { mapGetters } from "vuex";
import xszxDetailView from './componentChild/xszxDetailView.vue';

export default {
    data () {
        return {
            obj: null
        }
    },
    methods: {
        getDetailById (id) {
            let _this = this;
            new Promise((resolve, reject) => {
                getDetailById(id).then(
                    res => {
                        // resolve(res);
                        _this.obj = res.data;
                        // obj.list = res.data
                    },
                    error => {
                        //  _this.errorMsg(error.toString(), 'error')
                            return
                    }
                )
            })
        }
    },
    mounted () {
        // alert(this.offSiteManageId);
        this.getDetailById(this.$route.params.offSiteManageId);
    },
    computed: {
        // ...mapGetters(["offSiteManageId"])
    },
    components: {
        btns, xszxDetailView
    }
}
</script>
