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
                    <!-- <span class="titleflag"></span>
                    <span class="title">称重检测数据（检测信息）</span> -->
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
                    <!-- <span class="titleflag"></span>
                    <span class="title">称重检测数据（站点信息）</span> -->
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
                    <span class="title">现场照片/视频</span>
                </div>
                <ul class="list">
                    <li v-for="index in 4" :key="index">
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
                <embed name="plugin" id="plugin" src="http://172.16.170.54:9332/11,1083f85ef928"
                type="application/pdf" internalinstanceid="29" class="print_info"
                style="padding: 0px; width: 730px; height:1100px; position: relative;">
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    props: ['obj'],
    data () {
        return {
            dialogPDFVisible: false,
            storagePath: 'http://172.16.170.54:9332/12,3b11e8faa6 '
        }
    }
}
</script>
<style lang="scss" src="@/assets/css/cluesReview.scss"></style>
