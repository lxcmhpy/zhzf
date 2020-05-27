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
        <div class="shadow">
            <div class="box w-2">
                <div class="box_title">
                    <span class="titleflag">
                    </span>
                    <span class="title">称重检测数据</span>
                </div>
                <table class="table_style" v-if="obj">
                    <tr>
                        <td class="color_ff w-1">图像识别车牌</td>
                        <td width="260px">{{obj.vehicleNumber}}</td>
                        <td class="color_ff w-1">车牌颜色</td>
                        <td width="260px">{{obj.vehicleColor}}</td>
                    </tr>
                    <tr>
                         <td class="color_ff w-1">ETC识别车牌</td>
                        <td>{{obj.etcVehicleNumber}}</td>
                        <td class="color_ff w-1">最大允许总质量</td>
                        <td>{{obj.load}}</td>
                    </tr>
                            <tr>
                        <td class="color_ff w-1">车辆类型</td>
                        <td>{{obj.vehicleType}}</td>
                        <td class="color_ff w-1">重点监管</td>
                        <td>{{obj.key}}</td>
                    </tr>
                    <tr>
                        <td class="color_ff w-1">车速（km/h）</td>
                        <td>{{obj.speed}}</td>
                        <td class="color_ff w-1">行驶方向</td>
                        <td>{{obj.direction}}</td>
                    </tr>
                </table>
            </div>
            <div class="box w-2">
                <div class="box_title">
                </div>
                <table class="table_style" v-if="obj">
                    <tr>
                        <td class="color_ff w-1">轴数</td>
                        <td width="260px">{{obj.axleNumber}}</td>
                        <td class="color_ff w-1">驱动轴</td>
                        <td width="260px">
                             双轴
                        </td>
                    </tr>
                    <tr>
                         <td class="color_ff w-1">轴型</td>
                        <td >{{obj.axleType}}</td>
                        <td class="color_ff w-1">总重（KG）</td>
                        <td>{{obj.totalWeight}}</td>
                    </tr>
                    <tr>
                        <td class="color_ff w-1">限重（KG）</td>
                        <td>{{obj.load}}</td>
                        <td class="color_ff w-1">超重（KG）</td>
                        <td>{{obj.overweight}}</td>
                     </tr>
                    <tr>
                        <td class="color_ff w-1">超限率（%）</td>
                        <td>{{obj.overload}}%</td>
                        <td class="color_ff w-1">车长（mm）</td>
                        <td>{{obj.length}}</td>
                   </tr>
                    <tr>
                        <td class="color_ff w-1">车宽（mm）</td>
                        <td>{{obj.width}}</td>
                        <td class="color_ff w-1">车高（mm）</td>
                        <td>{{obj.height}}</td>
                    </tr>
                </table>
            </div>
            <div class="box w-2">

                <div class="box_title">
                </div>
                <table class="table_style" v-if="obj">
                    <tr>
                        <td class="color_ff w-1">检测时间</td>
                        <td width="260px">{{obj.checkTime}}</td>
                        <td class="color_ff w-1">检测站点</td>
                        <td width="260px">{{obj.siteName}}</td>
                    </tr>
                    <tr>
                        <td class="color_ff w-1">检测设备编号</td>
                        <td>{{obj.checkEquipment}}</td>
                        <td class="color_ff w-1">设备状态</td>
                        <td>{{obj.status}}</td>
                    </tr>
                    <tr>
                        <td class="color_ff w-1">检测位置</td>
                        <td>{{obj.checkLocation}}</td>
                        <td class="color_ff w-1">车道号</td>
                        <td>{{obj.lane}}</td>
                    </tr>
                    <tr>
                        <td class="color_ff w-1">所属执法机构</td>
                        <td>{{obj.organName}}</td>
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
                    <span class="title">现场照片/视频</span>
                </div>
                <ul class="list">
                    <li>
                        <div class="demo-image__preview">
                           <el-image
                            class="img"
                                style="width: 100px; height: 100px"
                                :src="'./static/images/img/lawSupervise/temp/link_01.jpg'"
                                :preview-src-list="['./static/images/img/lawSupervise/temp/link_01.jpg','./static/images/img/lawSupervise/temp/link_02.jpg','./static/images/img/lawSupervise/temp/link_03.jpg','./static/images/img/lawSupervise/temp/link_04.jpg']"
                                >
                            </el-image>
                        </div>
                    </li>
                    <li>
                        <img class="img" :src="'./static/images/img/lawSupervise/temp/link_03.jpg'">
                        <i class="iconfont law-bofang"></i>
                    </li>
                    <li>
                        <video class="img" controls>
		                    <!-- <source :src="'./static/images/img/lawSupervise/temp/link_05.mp4'" type="video/mp4"> -->
                        </video>
                    </li>
                    <li>
                         <video class="img" controls>
		                    <!-- <source :src="'./static/images/img/lawSupervise/temp/link_05.mp4'" type="video/mp4"> -->
                        </video>
                    </li>
                </ul>
            </div>
        </div>
        <div class="shadow">
            <div class="box w-2">
                <div class="box_title">
                    <span class="titleflag">
                    </span>
                    <span class="title">补充证据材料</span>
                </div>
                <ul class="list">
                    <li v-for="index in 2" :key="index">
                        <div class="demo-image__preview">
                           <el-image
                            class="img"
                                style="width: 100px; height: 100px"
                                :src="'./static/images/img/lawSupervise/temp/link_01.jpg'"
                                :preview-src-list="['./static/images/img/lawSupervise/temp/link_01.jpg','./static/images/img/lawSupervise/temp/link_02.jpg','./static/images/img/lawSupervise/temp/link_03.jpg','./static/images/img/lawSupervise/temp/link_04.jpg']"
                                >
                            </el-image>
                        </div>
                    </li>
                    <li @click="dialogPDFVisible = true">
                       <img class="img" :src="'./static/images/img/lawSupervise/temp/link_03.jpg'">
                       <i class="iconfont law-pdf1" style="color:white"></i>
                    </li>
                    <li @click="dialogPDFVisible = true">
                       <img class="img" :src="'./static/images/img/lawSupervise/temp/link_01.jpg'">
                       <i class="iconfont law-pdf1" style="color:white"></i>
                    </li>
                </ul>
            </div>
        </div>
        <el-dialog title="PDF展示" :visible.sync="dialogPDFVisible" append-to-body width="770px">
            <div>
                <embed name="plugin" id="plugin" :src="storageStr"
                type="application/pdf" internalinstanceid="29" class="print_info"
                style="padding: 0px; width: 730px; height:1100px; position: relative;">
            </div>
        </el-dialog>
        <!-- <xszxDetailView v-if="obj" :obj="obj"></xszxDetailView> -->
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
import iLocalStroage from '@/common/js/localStroage';
// import xszxDetailView from './componentChild/xszxDetailView.vue';

export default {
    data () {
        return {
            obj: null,
            dialogPDFVisible: false,
            storageStr: ''
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
        this.storageStr = iLocalStroage.gets('CURRENT_BASE_URL').PDF_HOST + '14,16d92a05edcd';
    },
    computed: {
        // ...mapGetters(["offSiteManageId"])
    },
    components: {
        btns
    }
}
</script>
