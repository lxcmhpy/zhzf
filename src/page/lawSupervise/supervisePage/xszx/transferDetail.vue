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
                    <el-button type="button" class="submitBtn blueBtn"  style="position:absolute;right:-100px;top: 130px;" @click="visible=true">
                        <div>查 看</div>
                    </el-button>
                      <el-dialog class='mini-dialog-title' :title="title" :visible.sync="visible" :show-close='false' :close-on-click-modal="false" width="420px">
                        <div class="error-message">
                        <div class="">
                            <img :src="'./static/images/img/cluesReview/icon_wuxiao.png'" alt="">
                        </div>
                        <p>是否进入案件系统，查看当前案件详情</p>
                        </div>
                        <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="goToInforCollect">确认</el-button>
                        <el-button @click="visible = false">取消</el-button>
                        </span>
                    </el-dialog>
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
                        <td>{{obj.checkTime}}</td>
                        <td class="color_ff w-1">转办说明</td>
                        <td>{{obj.key}}</td>
                    </tr>
                    <tr>
                        <td class="color_ff w-1">处置机构</td>
                        <td>{{obj.organName}}</td>
                        <td class="color_ff w-1">状态</td>
                        <td>{{obj.status}}</td>
                    </tr>
                </table>

            </div>
        </div>
        <!-- <xszxDetailView v-if="obj" :obj="obj"></xszxDetailView> -->
        <template>
            <div>
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
                                <td></td>
                                <td class="color_ff w-1">最大允许总质量</td>
                                <td>{{obj.key}}</td>
                            </tr>
                            <tr>
                                <td class="color_ff w-1">车辆类型</td>
                                <td>{{obj.checkTime}}</td>
                                <td class="color_ff w-1">重点监管</td>
                                <td></td>
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
                                <td width="260px">6</td>
                                <td class="color_ff w-1">驱动轴</td>
                                <td width="260px">
                                    双轴
                                </td>
                            </tr>
                            <tr>
                                <td class="color_ff w-1">轴型</td>
                                <td >{{obj.vehicleColor}}</td>
                                <td class="color_ff w-1">总重</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td class="color_ff w-1">限重</td>
                                <td>{{obj.key}}</td>
                                <td class="color_ff w-1">超重（KG）</td>
                                <td>{{obj.checkTime}}</td>
                            </tr>
                            <tr>
                                <td class="color_ff w-1">超限率（%）</td>
                                <td></td>
                                <td class="color_ff w-1">车长</td>
                                <td>{{obj.speed}}</td>
                        </tr>
                            <tr>
                                <td class="color_ff w-1">车宽</td>
                                <td>{{obj.direction}}</td>
                                <td class="color_ff w-1">车高</td>
                                <td>{{obj.axleNumber}}</td>
                            </tr>
                        </table>
                    </div>
                    <div class="box w-2">

                        <div class="box_title">
                        </div>
                        <table class="table_style" v-if="obj">
                            <tr>
                                <td class="color_ff w-1">检测时间</td>
                                <td width="260px">{{obj.vehicleNumber}}</td>
                                <td class="color_ff w-1">检测站点</td>
                                <td width="260px">{{obj.vehicleColor}}</td>
                            </tr>
                            <tr>
                                <td class="color_ff w-1">检测设备编号</td>
                                <td></td>
                                <td class="color_ff w-1">设备状态</td>
                                <td>{{obj.key}}</td>
                            </tr>
                            <tr>
                                <td class="color_ff w-1">检测位置</td>
                                <td>{{obj.checkTime}}</td>
                                <td class="color_ff w-1">车道号</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td class="color_ff w-1">所属执法机构</td>
                                <td>{{obj.speed}}</td>
                                <td class="color_ff w-1">处理状态</td>
                                <td>{{obj.direction}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            <div class="shadow">
                    <div class="box w-2">
                        <div class="box_title">
                            <span class="titleflag">
                            </span>
                            <span class="title">驾驶员/车主信息</span>
                        </div>
                        <table class="table_style" v-if="obj">
                            <tr>
                                <td class="color_ff w-1">姓名</td>
                                <td width="260px"><el-input width="300px" v-model="userObj.name" placeholder="请输入"></el-input></td>
                                <td class="color_ff w-1">联系方式</td>
                                <td width="260px"><el-input width="300px" v-model="userObj.mobile" placeholder="请输入"></el-input></td>
                            </tr>
                            <tr>
                                <td class="color_ff w-1">备注</td>
                                <td width="260px" colspan="3"><el-input v-model="userObj.mark" type="textarea" :autosize="{ minRows: 1, maxRows: 2}"></el-input></td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="shadow">
                    <div class="box w-2">
                        <div class="box_title">
                            <span class="titleflag"></span>
                            <span class="title">电子证据单</span>
                        </div>
                        <ul class="list" >
                            <li>
                                <embed name="plugin" id="plugin" :src="storageStr"
                        type="application/pdf" internalinstanceid="29" class="print_info"
                        style="padding: 0px; width: 815px; height:250px; position: relative;">
                            </li>
                        </ul>
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
                                <video class="img" controls>
                                    <source :src="'./static/images/img/lawSupervise/temp/link_05.mp4'" type="video/mp4">
                                </video>
                            </li>
                            <li @click="dialogPDFVisible = true">
                                <img class="img" :src="'./static/images/img/lawSupervise/temp/link_03.jpg'">
                            <i class="iconfont law-pdf1" style="color:#ccc;"></i>
                            </li>
                            <li @click="dialogPDFVisible = true">
                            <img class="img" :src="'./static/images/img/lawSupervise/temp/link_04.jpg'">
                            <i class="iconfont law-pdf1" style="color:white;"></i>
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
                                        :src="'./static/images/img/temp/sp.jpg'"
                                        :preview-src-list="['https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg','https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg']"
                                        >
                                    </el-image>
                                </div>
                            </li>
                            <li>
                                <img  class="img" :src="'./static/images/img/temp/sp.jpg'" @click="dialogPDFVisible = true">
                            </li>
                            <li>
                                <img class="img" :src="'./static/images/img/temp/sp.jpg'" @click="dialogPDFVisible = true">
                                <i class="iconfont law-bofang"></i>
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
            </div>

        </template>
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
import iLocalStroage from '@/common/js/localStroage';
import btns from '@/page/lawSupervise/supervisePage/xszx/componentChild/btns.vue';
import {getDetailById} from '@/api/lawSupervise.js';
import { mapGetters } from "vuex";
import xszxDetailView from './componentChild/xszxDetailView.vue';

export default {
    data () {
        return {
            obj: null,
            visible: false,
            xjHost: null,
            imgList: [
                '/api/ecds/GetCarPicture?work_no='+this.obj.workNo+'&photo=PHOTO_D',
                '/api/ecds/GetCarPicture?work_no='+this.obj.workNo+'&photo=PHOTO_F',
                '/api/ecds/GetCarPicture?work_no='+this.obj.workNo+'&photo=PHOTO_L',
                '/api/ecds/GetCarPicture?work_no='+this.obj.workNo+'&photo=PHOTO_S'
                ],
            acitveCar: 0,
            // xjHost: null,
            dialogPDFVisible: false,
            storageStr: '',
            currentUrl: '',
            userObj: {
                name: '',
                mobile: '',
                mark: ''
            }
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
        this.storageStr = iLocalStroage.gets('CURRENT_BASE_URL').PDF_HOST + '14,16d92a05edcd';
        this.xjHost = iLocalStroage.gets('CURRENT_BASE_URL').XJ_IMG_HOST;
    },
    computed: {
        // ...mapGetters(["offSiteManageId"])
    },
    components: {
        btns, xszxDetailView
    }
}
</script>
