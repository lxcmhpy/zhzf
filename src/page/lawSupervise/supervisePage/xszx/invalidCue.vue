<template>
<div class="main_box">
    <div class="main_content" style="margin-top: 24px">
        <div class="shadow">
            <div class="box w-2">
                <div class="box_title">
                    <span class="titleflag">
                    </span>
                    <span class="title">相关说明</span>
                </div>
                <table class="table_style" v-if="obj">
                    <tr>
                        <td>
                            <el-input
                                    type="textarea"
                                    :rows="2"
                                    placeholder="请输入内容"
                                    v-model="obj.vehicleNumber">
                            </el-input>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <xszxCommon></xszxCommon>
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
