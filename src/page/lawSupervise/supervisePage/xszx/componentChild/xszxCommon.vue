<template>
    <div>
        <div class="shadow">
            <div class="box w-2">
                <div class="box_title">
                    <span class="titleflag">
                    </span>
                    <span class="title">称重检测数据（车辆信息）</span>
                </div>
                <table class="table_style" v-if="obj">
                    <tr>
                        <td class="color_ff w-1">图像识别车牌</td>
                        <td>{{obj.vehicleNumber}}</td>
                        <td class="color_ff w-1">车牌颜色</td>
                        <td>{{obj.vehicleColor}}</td>
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
                        <td class="color_ff w-1">车速</td>
                        <td>{{obj.speed}}</td>
                        <td class="color_ff w-1">行驶方向</td>
                        <td>{{obj.direction}}</td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="shadow">
            <div class="box w-2">
                <div class="box_title">
                    <span class="titleflag"></span>
                    <span class="title">称重检测数据（检测信息）</span>
                </div>
                <table class="table_style" v-if="obj">
                    <tr>
                        <td class="color_ff w-1">驱动轴</td>
                        <td>{{obj.vehicleNumber}}</td>
                        <td class="color_ff w-1">轴型</td>
                        <td>{{obj.vehicleColor}}</td>
                    </tr>
                    <tr>
                        <td class="color_ff w-1">总重</td>
                        <td></td>
                        <td class="color_ff w-1">限重</td>
                        <td>{{obj.key}}</td>
                    </tr>
                    <tr>
                        <td class="color_ff w-1">超重（KG）</td>
                        <td>{{obj.checkTime}}</td>
                        <td class="color_ff w-1">超限率（%）</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td class="color_ff w-1">车长</td>
                        <td>{{obj.speed}}</td>
                        <td class="color_ff w-1">车宽</td>
                        <td>{{obj.direction}}</td>
                    </tr>
                    <tr>
                        <td class="color_ff w-1">车高</td>
                        <td>{{obj.axleNumber}}</td>
                        <td class="color_ff w-1"></td>
                        <td></td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="shadow">
            <div class="box w-2">

                <div class="box_title">
                    <span class="titleflag"></span>
                    <span class="title">称重检测数据（站点信息）</span></div>
                <table class="table_style" v-if="obj">
                    <tr>
                        <td class="color_ff w-1">检测时间</td>
                        <td>{{obj.vehicleNumber}}</td>
                        <td class="color_ff w-1">检测站点</td>
                        <td>{{obj.vehicleColor}}</td>
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
        <div class="shadow">
            <div class="box w-2">
                <div class="box_title">
                    <span class="titleflag">
                    </span>
                    <span class="title">补充证据材料</span>
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
</template>
<script>
export default {
    props: ['obj']
}
</script>
