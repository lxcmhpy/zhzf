<template>
<div class="flex">
        <div class="b-flex-1">
            <!-- <span :class="$route.name">待审核</span> -->
            <div class="shadow">
                <div class="box b-w-720">
                    <div class="box_title">
                        <span class="titleflag">
                        </span>
                        <span class="title">称重检测数据</span>
                    </div>
                    <table class="table_style" v-if="obj">
                        <tr>
                            <td class="color_ff w-1">图像识别车牌</td>
                            <td width="27%">
                                {{obj.vehicleNumber}}
                            </td>
                            <td class="color_ff w-1">车牌颜色</td>
                            <td>
                                {{obj.vehicleColor}}
                            </td>
                        </tr>
                        <tr>
                            <td class="color_ff w-1">ETC识别车牌</td>
                            <td>{{obj.etcVehicleNumber}}</td>
                            <td class="color_ff w-1">最大允许总质量</td>
                            <td>{{obj.approvedLoad}}</td>
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
                <div class="box b-w-720">
                    <div class="box_title">
                        <!-- <span class="titleflag"></span>
                        <span class="title">称重检测数据（检测信息）</span> -->
                    </div>
                    <table class="table_style" v-if="obj">
                        <tr>
                            <td class="color_ff w-1">轴数</td>
                            <td width="27%">{{obj.axleNumber}}</td>
                            <td class="color_ff w-1">驱动轴</td>
                            <td >双轴
                                <!-- <el-select value="双轴"  placeholder="请选择">
                                    <el-option
                                    label="双轴"
                                    value="双轴"
                                    ></el-option>
                                </el-select> -->

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
                            <td>{{obj.approvedLoad}}</td>
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
                <div class="box b-w-720">

                    <div class="box_title">
                        <!-- <span class="titleflag"></span>
                        <span class="title">称重检测数据（站点信息）</span> -->
                    </div>
                    <table class="table_style" v-if="obj">
                        <tr>
                            <td class="color_ff w-1">检测时间</td>
                            <td width="27%">{{obj.checkTime}}</td>
                            <td class="color_ff w-1">检测站点</td>
                            <td>{{obj.siteName}}</td>
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
        <el-dialog title="PDF展示" :visible.sync="dialogPDFVisible" append-to-body width="770px">
                <div>
                    <embed name="plugin" id="plugin" :src="storageStr"
                    type="application/pdf" internalinstanceid="29" class="print_info"
                    style="padding: 0px; width: 730px; height:1100px; position: relative;">
                </div>
            </el-dialog>
            <el-dialog :visible.sync="dialogIMGVisible" append-to-body width="90%">
                <div>
                    <el-row>
                        <el-col :span="1" style="margin-top: 200px;">
                        <el-button @click="preview" icon="el-icon-arrow-left" circle title="上一个"></el-button>
                        </el-col>
                        <el-col :span="22">
                            <img width="100%" :src="xjHost+imgIndexUrl">
                        </el-col>
                        <el-col :span="1" style="margin-top: 200px;">
                            <el-button @click="next" icon="el-icon-arrow-right" circle title="下一个" class="right"></el-button>
                        </el-col>
                    </el-row>
                </div>
            </el-dialog>
            <el-dialog :visible.sync="dialogIMGVisible1" append-to-body width="90%">
                <div>
                    <img width="100%"  :src="'./static/images/img/lawSupervise/temp/link_01.jpg'">
                </div>
            </el-dialog>
        </div>
        <div class="b-w-320">
            <div class="shadow">
                <div class="box">
                    <div class="box_title">
                        <span class="titleflag">
                        </span>
                        <span class="title">现场照片/视频</span>
                        <span class="right f12"> {{parseInt(acitveCar)+1}} / 5</span>
                    </div>
                    <ul class="list">
                        <!-- v-for="index in 2" :key="index" -->
                        <li >
                            <!-- <img class="img" :src="'./static/images/img/temp/sp.jpg'" > -->

                            <el-carousel height="200px" @change="setActiveItem" :setActiveItem="setActiveItem" :autoplay="true" indicator-position="outside" :interval="5000">
                                <el-carousel-item :key="0">
                                    <video width="280px" height="180px" controls>
                                        <source :src="xjHost+'/api/ecds/GetCarPicture?work_no='+obj.workNo+'&photo=PHOTO_V'" type="video/mp4">
                                    </video>
                                </el-carousel-item>
                                <el-carousel-item  v-for="(item,index) in imgList" :key="(index +1).toString()">
                                    <img width="280px" height="180px" @click="showImg(index)"  :src="xjHost+item">
                                </el-carousel-item>
                                <!-- <el-carousel-item :key="2">
                                    <img width="280px" height="180px" @click="dialogIMGVisible = true"  :src="xjHost+'/api/ecds/GetCarPicture?work_no='+obj.workNo+'&photo=PHOTO_F'">
                                </el-carousel-item>
                                <el-carousel-item :key="3">
                                    <img width="280px" height="180px" @click="dialogIMGVisible = true"  :src="xjHost+'/api/ecds/GetCarPicture?work_no='+obj.workNo+'&photo=PHOTO_L'">
                                </el-carousel-item>
                                <el-carousel-item :key="4">
                                    <img width="280px" height="180px" @click="dialogIMGVisible = true"  :src="xjHost+'/api/ecds/GetCarPicture?work_no='+obj.workNo+'&photo=PHOTO_S'">
                                </el-carousel-item> -->
                            </el-carousel>
                            <!-- <i class="iconfont law-bofang"></i> -->
                        </li>
                        <!-- <li v-for="index in 2" :key="index">
                            <div class="demo-image__preview">
                                <el-image
                                class="img"
                                    style="width: 100px; height: 100px"
                                    :src="'./static/images/img/temp/sp.jpg'"
                                    :preview-src-list="['./static/images/img/temp/sp.jpg','./static/images/img/temp/sp.jpg']"
                                    >
                                </el-image>
                            </div>
                        </li> -->
                    </ul>
                </div>
            </div>
            <div class="shadow">
                <div class="box">
                    <div class="box_title">
                        <span class="titleflag">
                        </span>
                        <span class="title">补充证据材料</span>
                    </div>
                    <ul class="list" style="width: 278px;height:175px;margin-left: 0px">
                        <li>
                            <el-carousel height="200px" @change="setActiveItem" :setActiveItem="setActiveItem" :autoplay="true" indicator-position="outside" :interval="5000">
                                <el-carousel-item  v-for="(item,index) in fileList" :key="(index +1).toString()">
                                    <img v-if="item.status == '图片'" width="280px" height="180px" :src="pHost+'/'+item.storageId">
                                    <div v-else style="text-align: center;padding: 25px;">
                                        <div><i class="el-icon-document" style="font-size:45px;"></i></div>
                                        <div style="margin: 15px;line-height: 25px">{{item.fileName}}</div>
                                    </div>
                                </el-carousel-item>
                            </el-carousel>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="shadow">
            <div class="box w-2">
                <div class="box_title">
                    <span class="titleflag">
                    </span>
                    <span class="title">相关说明</span>
                </div>
                <div>
                    <el-input
                    style="width: 280px !important;height:100px"
                            type="textarea"
                            :rows="4"
                            disabled
                            placeholder="请输入内容"
                            v-model="obj.remarks">
                    </el-input>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
import Vue from "vue";
import echarts from 'echarts';
// import 'echarts/lib/chart/graph';
import AMap from 'vue-amap';
import { AMapManager } from 'vue-amap';
import {findAllDrawerById} from '@/api/lawSupervise.js';
import { BASIC_DATA_SYS } from "@/common/js/BASIC_DATA.js";
import iLocalStroage from '@/common/js/localStroage';
Vue.use(AMap);
AMap.initAMapApiLoader({
  key: '2fab5dfd6958addd56c89e58df8cbb37',
  plugin: ['Autocomplete', 'PlaceSearch', 'Scale', 'OverView', 'ToolBar', 'MapType',
    'PolyEditor', 'AMap.CircleEditor', 'lazyAMapApiLoaderInstance', 'Geolocation', 'Marker', 'Icon'],
  v: '1.4.4',
  uiVersion: '1.0.11',
  showLabel: false
});
let amapManager = new AMap.AMapManager();
//   <el-carousel-item :key="1">
//                                 <img width="280px" height="180px" @click="showImg('PHOTO_D')"  :src="xjHost+'/api/ecds/GetCarPicture?work_no='+obj.workNo+'&photo=PHOTO_D'">
//                             </el-carousel-item>
//                              <el-carousel-item :key="2">
//                                  <img width="280px" height="180px" @click="dialogIMGVisible = true"  :src="xjHost+'/api/ecds/GetCarPicture?work_no='+obj.workNo+'&photo=PHOTO_F'">
//                             </el-carousel-item>
//                             <el-carousel-item :key="3">
//                                  <img width="280px" height="180px" @click="dialogIMGVisible = true"  :src="xjHost+'/api/ecds/GetCarPicture?work_no='+obj.workNo+'&photo=PHOTO_L'">
//                             </el-carousel-item>
//                             <el-carousel-item :key="4">
//                                  <img width="280px" height="180px" @click="dialogIMGVisible = true"  :src="xjHost+'/api/ecds/GetCarPicture?work_no='+obj.workNo+'&photo=PHOTO_S'">
//                             </el-carousel-item>
export default {
    props: ['obj'],
    data () {
        let self = this;
        return {
            fileList: [],
            imgIndexUrl: null,
            imgList: [
                '/api/ecds/GetCarPicture?work_no='+this.obj.workNo+'&photo=PHOTO_D',
                '/api/ecds/GetCarPicture?work_no='+this.obj.workNo+'&photo=PHOTO_F',
                '/api/ecds/GetCarPicture?work_no='+this.obj.workNo+'&photo=PHOTO_L',
                '/api/ecds/GetCarPicture?work_no='+this.obj.workNo+'&photo=PHOTO_S'
                ],
            xjHost: null,
            dialogIMGVisible: false,
            storageStr: '',
            dialogPDFVisible: false,
            visible: false,
            checkSearchForm: {
                number: '',
                color: '',
                etc: ''
            },
            checkVisible: false,
            activeName: '道路运输证',
            percentage: 30,
            formInline: {
                user: '',
                region: '',
                startTime: '',
                endTime: '',
                selectTime: '',
                status: '1',
                applyTime: '1',
            },
            center: [116.397428, 39.90923],
            zoom: 16,
            amapManager,
            events: {
                init(map) {
                // AMapUI.loadUI(['overlay/SimpleMarker'], function(SimpleMarker) {
                // const marker = new SimpleMarker({
                // iconStyle: 'red',
                // map: [],
                // position: map.getCenter()
                // });
                // });
                }
            },
            colorList: [],
            plugin: [{
                pName: 'ToolBar',
                position: 'RB'
            }, {
                pName: 'Scale',
                position: 'RB'
            }, {
                pName: 'Geolocation',
                position: 'RB',
                events: {
                init(o) {
                    // o 是高德地图定位插件实例
                    o.getCurrentPosition((status, result) => {
                    if (result && result.position) {
                        self.currentAddressObj = result.addressComponent;
                        self.lng = result.position.lng;
                        self.lat = result.position.lat;
                        self.center = [self.lng, self.lat];
                        self.loaded = true;
                        self.$nextTick();
                    }
                    });
                }
                }
            },
            {
                pName: 'PlaceSearch',
                renderStyle: 'default',
                events: {
                },
            }
            ],
            acitveCar: 0,
            dialogIMGVisible1: false,
            formUpload: {
                caseId: null,
                category: '执法监管'
            },
            pHost: null
        }
    },
    methods:{
        showImg (index) {
            this.dialogIMGVisible = true;
            this.imgIndexUrl = this.imgList[index];
        },
        preview(){
          let index = this.imgList.findIndex(item=>item == this.imgIndexUrl);
          let n = index - 1;
          if(index == 0){
            n = this.imgList.length-1;
          }
          this.imgIndexUrl = this.imgList[n];
        },
        next(){
          let index = this.imgList.findIndex(item=>item == this.imgIndexUrl);
          let n = index + 1;
          if(index == this.imgList.length-1){
            n = 0
          }
          this.imgIndexUrl = this.imgList[n];
        },
        saveFile (params) {
            this.formUpload.file = params.file
        },
        //关闭弹窗的时候清除数据
        setActiveItem () {
             this.acitveCar++;
            if (this.acitveCar == 5) {
                this.acitveCar = 0;
            }
        },
        closeDialog() {
            this.visible = false;
        },
        gotoCoerciveMeasureDoc() {
            this.$store.dispatch("deleteTabs", this.$route.name);
            this.$router.push({ name: 'law_supervise_removeOrPrelong' });
        },
        updateHp () {
            this.checkSearchForm.number = this.obj.vehicleNumber;
            this.checkSearchForm.color = this.obj.vehicleColor;
            this.checkSearchForm.etc = this.obj.etcVehicleNumber;
            this.visible = true;
        },
        check () {
            this.checkSearchForm.number = this.obj.vehicleNumber;
            this.checkSearchForm.color = this.obj.vehicleColor;
            this.findAllDrawerById(BASIC_DATA_SYS.vehicleColor, 'colorList');
            this.checkVisible = true;
        },
        handleClick(tab, event) {
        },
        findAllDrawerById (data, listObj) {
            let _this = this
            new Promise((resolve, reject) => {
                findAllDrawerById(data).then(
                    res => {
                        // resolve(res)
                        _this[listObj] = res.data

                    },
                    error => {
                        //  _this.errorMsg(error.toString(), 'error')
                            return
                    }
                )
            })
        },
        saveHp () {
            this.obj.vehicleNumber = this.checkSearchForm.number;
            this.obj.vehicleColor = this.checkSearchForm.color;
            this.visible = false;
        },
        //通过案件ID和文书ID查询附件
        findFileList() {
            let data = {
                caseId: this.obj.id
            }
            getFileByCaseId(data).then(
                res => {
                    this.fileList = res.data;
                },
                error => {
                    console.log(error);
                }
            )
        },
    },
    mounted () {
        this.storageStr = iLocalStroage.gets('CURRENT_BASE_URL').PDF_HOST + '14,16d92a05edcd';
        this.xjHost = iLocalStroage.gets('CURRENT_BASE_URL').XJ_IMG_HOST;
        this.pHost = iLocalStroage.gets('CURRENT_BASE_URL').PDF_HOST;
        this.findFileList();
    }
}
</script>

<style lang="scss" src="@/assets/css/cluesReview.scss"></style>

