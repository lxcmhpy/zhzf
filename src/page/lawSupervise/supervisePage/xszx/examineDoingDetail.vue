<template>
<!-- 审核页面、待审核、审核中  -->
<div class="main_box">
    <div class="com_searchAndpageBoxPadding">
        <div class="com_searchPage_top com_examin_top" >
            <el-tabs v-model="tabActiveValue" :stretch="true" >
                <el-tab-pane v-for="(item, index) in processStatus" :key="index" disabled :name="`${index}`" >
                    <span slot="label">
                        <span class="processNum">{{index +1}}</span>
                        <!-- <el-badge :value="index==0?null:index" > -->
                            {{item.value}}
                        <!-- </el-badge> -->
                    </span>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="main_content" style="margin-top: 70px">
            <component v-if="obj" :obj="obj" v-bind:is="examineDoingDetailChildren[tabActiveValue]" ></component>
        </div>
    </div>
    <btns v-if="tabActiveValue" :tabActiveValue="tabActiveValue"></btns>
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
import {getDetailById, findAlarmVehicleById} from '@/api/lawSupervise.js';
import { mapGetters } from "vuex";
import xszxDetailView from './componentChild/xszxDetailView.vue';
import examineDoingFirstDetail from './componentChild/examineDoingDetail/examineDoingFirstDetail';
import examineDoingSecondDetail from './componentChild/examineDoingDetail/examineDoingSecondDetail';
import examineDoingThirdDetail from './componentChild/examineDoingDetail/examineDoingThirdDetail';


export default {
    data () {
        return {
            examineDoingDetailChildren: ['examineDoingFirstDetail','examineDoingSecondDetail','examineDoingThirdDetail','examineDoingThirdDetail'],
            obj: null,
            processStatus: [{
                value: '检测数据核对'
            }, {
                value: '违法超限复合'
            }, {
                value: '生成证据包'
            }],
            tabActiveValue: null,
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
        findAlarmVehicleById (id) {
            let _this = this;
            new Promise((resolve, reject) => {
                findAlarmVehicleById(id).then(
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
        init () {
            this.findAlarmVehicleById(this.$route.params.offSiteManageId);
            this.tabActiveValue = this.$route.params.status;
        }
    },
    mounted () {
        this.init()
    },
    computed: {
        // ...mapGetters(["offSiteManageId"])
    },
    watch: {
        $route (to, from) {
            this.init()
        }
    },
    components: {
        btns,examineDoingFirstDetail,examineDoingSecondDetail,examineDoingThirdDetail
    }
}
</script>
