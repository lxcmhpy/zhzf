<template>
<!-- 已转办页面 -->
<div class="main_box">
    <div class="main_content" style="margin-top: 24px">
        <div class="shadow">
            <div class="box w-2">
                <div class="box_title">
                    <span class="titleflag">
                    </span>
                    <span class="title">转办说明</span>
                    <el-button type="button" class="submitBtn blueBtn"  style="position:absolute;right:-100px;top: 130px;" @click="goToInforCollect">
                        <div>查 看</div>
                    </el-button>
                </div>
                <table class="table_style" v-if="obj">
                    <tr>
                        <td class="color_ff w-1">车牌号</td>
                        <td>{{obj.vehicleNumber}}</td>
                        <td class="color_ff w-1">车牌颜色</td>
                        <td>{{obj.vehicleColor}}</td>
                    </tr>
                    <tr>
                        <td class="color_ff w-1">转办时间</td>
                        <td></td>
                        <td class="color_ff w-1">转办说明</td>
                        <td>{{obj.key}}</td>
                    </tr>
                    <tr>
                        <td class="color_ff w-1">处置机构</td>
                        <td>{{obj.checkTime}}</td>
                        <td class="color_ff w-1">状态</td>
                        <td></td>
                    </tr>
                </table>

            </div>
        </div>
        <xszxDetailView v-if="obj" :obj="obj"></xszxDetailView>
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
    <span class="transferDetail">已转办</span>

    <!-- <btns></btns> -->
</div>
</template>

<style src="@/assets/css/sliderPage.scss" lang="scss"></style>
<style src="@/assets/css/basicStyles/error.scss" lang="scss"></style>
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
        },
         goToInforCollect() {
            this.$store.commit('setCaseId','3f04ca8748038e4e7fe1b6719f8f8d43');
            this.$store.commit('setCaseApproval',false);
            this.$store.commit('setCaseNumber','吐临〔2020〕第00600号');
            this.$router.push({
                name: 'case_handle_inforCollect'
            });
        },
    },
    mounted () {
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
