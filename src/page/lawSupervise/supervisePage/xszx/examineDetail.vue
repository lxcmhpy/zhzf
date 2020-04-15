<template>
<!--审核审批-->
<div class="main_box">
    <div class="com_examin_top">
        <!-- <ul class="com_searchPage_tab">
            <li v-for="(item, index) in processStatus" :class="{'active': index === tabActiveValue}"  :key="index" @click="activeAndSearch(item,index)">{{item.value}}</li>
        </ul> -->
        <!-- @tab-click="activeAndSearch" -->
        <el-tabs v-model="tabActiveValue" :stretch="true" @tab-click="search">
            <el-tab-pane v-for="(item, index) in processStatus" :key="item.value"  :name="item.value" >
                <span slot="label">
                    <el-badge :value="index==0?null:index" >
                        {{item.value}}
                    </el-badge>
                </span>
            </el-tab-pane>
        </el-tabs>
    </div>
    <div class="main_content" style="margin-top: 24px">
        <xszxCommon v-if="obj" :obj="obj"></xszxCommon>
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
    <btns></btns>
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
import btns from '@/page/lawSupervise/componentCommon/btns.vue';
import {getDetailById} from '@/api/lawSupervise.js';
import { mapGetters } from "vuex";
import xszxCommon from './componentChild/xszxCommon.vue';

export default {
    data () {
        return {
            obj: null,
            processStatus: [{
                value: '检测数据核对'
            }, {
                value: '违法超限复合'
            }, {
                value: '生成证据包'
            }],
            tabActiveValue: '检测数据核对',
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
        this.getDetailById(this.offSiteManageId);
    },
    computed: {
        ...mapGetters(["offSiteManageId"])
    },
    components: {
        btns, xszxCommon
    }
}
</script>
