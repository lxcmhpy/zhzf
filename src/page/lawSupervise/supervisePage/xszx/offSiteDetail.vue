<template>
<div class="main_box">
    <div class="main_content" style="margin-top: 24px">
        <div class="shadow">
            <div class="box w-2">
                <div class="box_title">
                    <span class="titleflag">
                    </span>
                    <span class="title">过检数据</span>
                </div>
                <table class="table_style" v-if="obj">
                    <tr>
                        <td class="color_ff w-1">车牌号</td>
                        <td>{{obj.vehicleNumber}}</td>
                        <td class="color_ff w-1">车辆颜色</td>
                        <td>{{obj.vehicleColor}}</td>
                    </tr>
                    <tr>
                        <td class="color_ff w-1">车辆类型</td>
                        <td></td>
                        <td class="color_ff w-1">重点监管</td>
                        <td>{{obj.key}}</td>
                    </tr>
                    <tr>
                        <td class="color_ff w-1">检测时间</td>
                        <td>{{obj.checkTime}}</td>
                        <td class="color_ff w-1"></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td class="color_ff w-1">车速</td>
                        <td>{{obj.speed}}</td>
                        <td class="color_ff w-1">行驶方向</td>
                        <td>{{obj.direction}}</td>
                    </tr>
                    <tr>
                        <td class="color_ff w-1">轴数</td>
                        <td>{{obj.axleNumber}}</td>
                        <td class="color_ff w-1">轴型</td>
                        <td>{{obj.axleType}}</td>
                    </tr>
                    <tr>
                        <td class="color_ff w-1">总重</td>
                        <td>{{obj.totalWeight}}</td>
                        <td class="color_ff w-1">限重</td>
                        <td>{{obj.load}}</td>
                    </tr>
                    <tr>
                        <td class="color_ff w-1">超重</td>
                        <td>{{obj.overweight}}</td>
                        <td class="color_ff w-1">超限率（%）</td>
                        <td>{{obj.overload}}</td>
                    </tr>
                    <tr>
                        <td class="color_ff w-1">车长</td>
                        <td>{{obj.length}}</td>
                        <td class="color_ff w-1">车宽</td>
                        <td>{{obj.width}}</td>
                    </tr>
                    <tr>
                        <td class="color_ff w-1">车高</td>
                        <td>{{obj.height}}</td>
                        <td class="color_ff w-1"></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td class="color_ff w-1">检测站点</td>
                        <td>{{obj.siteName}}</td>
                        <td class="color_ff w-1">车道号</td>
                        <td>{{obj.lane}}</td>
                    </tr>
                    <tr>
                        <td class="color_ff w-1">检测单位</td>
                        <td>{{obj.checkOrgan}}</td>
                        <td class="color_ff w-1">处理状态</td>
                        <td>{{obj.status}}</td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="shadow">
            <div class="box w-2">
                <div class="box_title">
                    <span class="titleflag">
                    </span>
                    <span class="title">检测拍照</span>
                </div>
                <ul class="list">
                    <li>
                        <img class="img" :src="'./static/images/img/temp/sp.jpg'">
                    </li>
                    <li>
                        <img class="img" :src="'./static/images/img/temp/sp.jpg'">
                        <i class="iconfont law-bofang"></i>
                    </li>
                    <li>
                        <img class="img" :src="'./static/images/img/temp/sp.jpg'">
                    </li>
                    <li>
                        <img class="img" :src="'./static/images/img/temp/sp.jpg'">
                        <i class="iconfont law-bofang"></i>
                    </li>
                </ul>
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
        btns
    }
}
</script>
