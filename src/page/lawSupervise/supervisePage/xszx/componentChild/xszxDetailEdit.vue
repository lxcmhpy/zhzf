<template>
    <div>
         <!-- <span :class="$route.name">待审核</span> -->
        <div class="shadow">
            <div class="box w-2">
                <div class="box_title">
                    <span class="titleflag">
                    </span>
                    <span class="title">称重检测数据</span>
                    <span class="right btns">
                        <span class="blueC" @click="updateHp"><img :src="'./static/images/img/lawSupervise/icon_cheliang1.png'">号牌更正</span>&nbsp;&nbsp;
                        <span  class="greenC2" @click="checkVisible = true"><img :src="'./static/images/img/lawSupervise/icon_chepai.png'">车辆查验</span>
                    </span>
                    <el-dialog class='mini-dialog-title' title="号牌更正" :visible.sync="visible" :show-close='false' :close-on-click-modal="false" width="460px">
                        <el-form :model="checkSearchForm" ref="checkSearchForm" class="checkSearchForm" label-width="120px">
                            <div>
                                <div class="item">
                                <el-form-item label="图像识别车牌">
                                    <el-input v-model="checkSearchForm.number"></el-input>
                                </el-form-item>
                                </div>
                                <div class="item">
                                <el-form-item label="车牌颜色">
                                    <el-input v-model="checkSearchForm.color"></el-input>
                                </el-form-item>
                                </div>

                            </div>
                        </el-form>
                        <span slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="saveHp">保存</el-button>
                            <el-button @click="visible = false">取消</el-button>
                        </span>
                    </el-dialog>
                     <el-drawer
                     class="el-drawer-title-noborder"
                            title="车辆查验"
                            direction="rtl"
                            size="876px"
                            :show-close="false"
                            :visible.sync="checkVisible">
                            <div class="vehicle-dialog table-style">
                                <el-form>
                                    <div class="check-vehicle">
                                        <div class="top">
                                            <el-input ref="TOORGANID" class="focusHide" v-model="checkSearchForm.number" placeholder="请输入车牌号">
                                                <el-select v-model="checkSearchForm.color" slot="prepend">
                                                <el-option label="全部" value="1"></el-option>
                                                <el-option label="选项2" value="2"></el-option>
                                                <el-option label="选项3" value="3"></el-option>
                                                </el-select>
                                                <el-button slot="append" style="width:100px" icon="el-icon-search"></el-button>
                                            </el-input>
                                        </div>
                                        <div class="banner">
                                            <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
                                                <el-tab-pane name="道路运输证">
                                                <span slot="label"><i class="iconfont law-zhengjian"></i>道路运输证</span>
                                                </el-tab-pane>
                                                <el-tab-pane name="所属企业">
                                                <span slot="label"><i class="iconfont law-qiye"></i>所属企业</span>
                                                </el-tab-pane>
                                                <el-tab-pane name="大件运输许可">
                                                <span slot="label"><i class="iconfont law-hezizanwushuju"></i>大件运输许可</span>
                                                </el-tab-pane>
                                                <el-tab-pane name="行驶轨迹">
                                                <span slot="label"><i class="iconfont law-guiji"></i>行驶轨迹</span>
                                                </el-tab-pane>
                                                <el-tab-pane name="违法记录">
                                                <span slot="label"><i class="iconfont law-zhuyi"></i>违法记录</span>
                                                </el-tab-pane>
                                            </el-tabs>
                                        </div>
                                        <!-- 道路运输证 -->
                                        <div class="table-padding" v-if="activeName=='道路运输证'">
                                            <div class="table">
                                                <table>
                                                <tr>
                                                    <td class="table-bg">车牌号</td>
                                                    <td></td>
                                                    <td class="table-bg">车牌颜色</td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td class="table-bg">车辆类型</td>
                                                    <td></td>
                                                    <td class="table-bg"></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td class="table-bg">车辆营运状态</td>
                                                    <td></td>
                                                    <td class="table-bg"></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td class="table-bg">道路运输证号</td>
                                                    <td></td>
                                                    <td class="table-bg">发证机构</td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td class="table-bg">有效期起</td>
                                                    <td></td>
                                                    <td class="table-bg">有效期止</td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td class="table-bg">经营范围</td>
                                                    <td colspan="3"></td>
                                                </tr>
                                                </table>
                                            </div>
                                        </div>
                                        <!-- 所属企业 -->
                                        <div class="table-padding" v-if="activeName=='所属企业'">
                                            <div class="table">
                                                <table>
                                                <tr>
                                                    <td class="table-bg">经营业户名称</td>
                                                    <td></td>
                                                    <td class="table-bg">企业组织机构代码</td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td class="table-bg">经营业户所在地行政区划代码</td>
                                                    <td></td>
                                                    <td class="table-bg">负责人姓名</td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td class="table-bg">经营许可证号</td>
                                                    <td></td>
                                                    <td class="table-bg">发证机关</td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td class="table-bg">经济类型</td>
                                                    <td></td>
                                                    <td class="table-bg">经营范围</td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td class="table-bg">有效期起</td>
                                                    <td></td>
                                                    <td class="table-bg">有效期止</td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td class="table-bg">经营状态</td>
                                                    <td></td>
                                                    <td class="table-bg"></td>
                                                    <td></td>
                                                </tr>
                                                </table>
                                            </div>
                                        </div>
                                        <!-- 大件运输许可 -->
                                        <div class="table-padding" v-if="activeName=='大件运输许可'">
                                            <div class="table" v-if="activeName=='大件运输许可'">
                                                <table>
                                                <tr>
                                                    <td class="table-bg">有效范围</td>
                                                    <td></td>
                                                    <td class="table-bg">通行日期</td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td class="table-bg">承运单位</td>
                                                    <td></td>
                                                    <td class="table-bg"></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td class="table-bg">车牌号</td>
                                                    <td></td>
                                                    <td class="table-bg">厂牌型号</td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td class="table-bg">自重（T）</td>
                                                    <td></td>
                                                    <td class="table-bg">载重（T）</td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td class="table-bg">货物名称</td>
                                                    <td></td>
                                                    <td class="table-bg">货物总量</td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td class="table-bg">车货总重（T）</td>
                                                    <td></td>
                                                    <td class="table-bg"></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td class="table-bg">载后总尺寸</td>
                                                    <td></td>
                                                    <td class="table-bg"></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td class="table-bg">轴荷分布</td>
                                                    <td></td>
                                                    <td class="table-bg"></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td class="table-bg">通行线路</td>
                                                    <td></td>
                                                    <td class="table-bg"></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td class="table-bg">发证单位</td>
                                                    <td></td>
                                                    <td class="table-bg"></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td class="table-bg">经办人</td>
                                                    <td></td>
                                                    <td class="table-bg">发证日期</td>
                                                    <td></td>
                                                </tr>
                                                </table>
                                            </div>
                                        </div>
                                        <!-- 行驶轨迹 -->
                                        <div class="map" v-if="activeName=='行驶轨迹'">

                                            <div class="map-top">
                                                <span class="map-top-title">轨迹信息</span>
                                                <span class="map-top-icon"><i class="el-icon-search"></i>搜索</span>
                                                <span class="map-top-icon"><i class="iconfont law-chizi"></i>测距</span>
                                            </div>
                                            <div class="map-btm">
                                                <div class="map-search">
                                                <ul>
                                                    <li>车牌号：京N·65920</li>
                                                    <li>开始时间：
                                                    <el-date-picker v-model="formInline.startTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd" :clearable='false' style="width:320px;"></el-date-picker>
                                                    </li>
                                                    <li>选择时间：
                                                    <el-date-picker v-model="formInline.selectTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd" :clearable='false' style="width:320px;"></el-date-picker>

                                                    </li>
                                                </ul>
                                                <ul>
                                                    <li>车牌颜色：黑色</li>
                                                    <li>结束时间：
                                                    <el-date-picker v-model="formInline.endTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd" :clearable='false' style="width:320px;"></el-date-picker>
                                                    </li>
                                                    <li>当前进度：<el-progress :percentage="percentage" color="#2DE1D3"></el-progress>
                                                    </li>
                                                </ul>
                                                </div>
                                                <div class="map-box">
                                                <el-amap vid="lawSupervise" mapStyle="amap://styles/whitesmoke" :center="center" :plugin="plugin" :amap-manager="amapManager" :zoom="zoom" :events="events">
                                                    <!-- <el-amap-marker v-for="(marker,index) in markers" :key="index" :position="marker.position" :events="marker.events" :template="marker.template"></el-amap-marker> -->
                                                </el-amap>
                                                </div>
                                            </div>

                                        </div>
                                        <!-- 违法记录 -->
                                        <div class="list" v-if="activeName=='违法记录'">
                                            <div class="list-search">
                                                <div class="el-form demo-form-inline el-form--inline search-box">
                                                <el-form-item label="立案时间">
                                                    <el-select v-model="formInline.applyTime">
                                                    <el-option label="全部" value="1"></el-option>
                                                    <el-option label="选项二" value="2"></el-option>
                                                    </el-select>
                                                </el-form-item>
                                                <el-form-item label="处置状态">
                                                    <el-select v-model="formInline.status">
                                                    <el-option label="全部" value="1"></el-option>
                                                    <el-option label="选项二" value="2"></el-option>
                                                    </el-select>
                                                </el-form-item>
                                                <el-form-item label="">
                                                    <el-input
                                                        placeholder="默认排序"
                                                        suffix-icon="el-icon-caret-bottom"
                                                        value="默认排序">
                                                    </el-input>
                                                </el-form-item>
                                                </div>
                                            </div>
                                            <ul class="list-info">
                                                <li>
                                                <p>京（XX）路政赔〔2020〕第00008号</p>
                                                <div class="left main-info">
                                                    <tr>
                                                    <td class="width198">立案时间：2019-12-14</td>
                                                    <td>当事人姓名/公司：百度在线网络技术（北京）有限公司</td>
                                                    </tr>
                                                    <tr>
                                                    <td>处置状态：已结案</td>
                                                    <td>立案机构：北京市交通大队</td>
                                                    </tr>
                                                </div>
                                                <div class="right">
                                                    <el-button type="success" size="medium" class="btnstyle" style="background-color: #4AAFA7 !important; width:100px;border-color: #4AAFA7 !important;">
                                                    查看详情
                                                    </el-button>
                                                </div>
                                                </li>
                                                <li>
                                                <p>京（XX）路政赔〔2020〕第00008号</p>
                                                <div class="left main-info">
                                                    <tr>
                                                    <td class="width198">立案时间：2019-12-14</td>
                                                    <td>当事人姓名/公司：百度在线网络技术（北京）有限公司</td>
                                                    </tr>
                                                    <tr>
                                                    <td>处置状态：已结案</td>
                                                    <td>立案机构：北京市交通大队</td>
                                                    </tr>
                                                </div>
                                                <div class="right">
                                                    <el-button type="success" size="medium" class="btnstyle" style="background-color: #4AAFA7 !important; width:100px;border-color: #4AAFA7 !important;">
                                                    查看详情
                                                    </el-button>
                                                </div>
                                                </li>
                                                <li>
                                                <p>京（XX）路政赔〔2020〕第00008号</p>
                                                <div class="left main-info">
                                                    <tr>
                                                    <td class="width198">立案时间：2019-12-14</td>
                                                    <td>当事人姓名/公司：百度在线网络技术（北京）有限公司</td>
                                                    </tr>
                                                    <tr>
                                                    <td>处置状态：已结案</td>
                                                    <td>立案机构：北京市交通大队</td>
                                                    </tr>
                                                </div>
                                                <div class="right">
                                                    <el-button type="success" size="medium" class="btnstyle" style="background-color: #4AAFA7 !important; width:100px;border-color: #4AAFA7 !important;">
                                                    查看详情
                                                    </el-button>
                                                </div>
                                                </li>
                                                <li>
                                                <p>京（XX）路政赔〔2020〕第00008号</p>
                                                <div class="left main-info">
                                                    <tr>
                                                    <td class="width198">立案时间：2019-12-14</td>
                                                    <td>当事人姓名/公司：百度在线网络技术（北京）有限公司</td>
                                                    </tr>
                                                    <tr>
                                                    <td>处置状态：已结案</td>
                                                    <td>立案机构：北京市交通大队</td>
                                                    </tr>
                                                </div>
                                                <div class="right">
                                                    <el-button type="success" size="medium" class="btnstyle" style="background-color: #4AAFA7 !important; width:100px;border-color: #4AAFA7 !important;">
                                                    查看详情
                                                    </el-button>
                                                </div>
                                                </li>
                                                <li>
                                                <p>京（XX）路政赔〔2020〕第00008号</p>
                                                <div class="left main-info">
                                                    <tr>
                                                    <td class="width198">立案时间：2019-12-14</td>
                                                    <td>当事人姓名/公司：百度在线网络技术（北京）有限公司</td>
                                                    </tr>
                                                    <tr>
                                                    <td>处置状态：已结案</td>
                                                    <td>立案机构：北京市交通大队</td>
                                                    </tr>
                                                </div>
                                                <div class="right">
                                                    <el-button type="success" size="medium" class="btnstyle" style="background-color: #4AAFA7 !important; width:100px;border-color: #4AAFA7 !important;">
                                                    查看详情
                                                    </el-button>
                                                </div>
                                                </li>
                                                <li>
                                                <p>京（XX）路政赔〔2020〕第00008号</p>
                                                <div class="left main-info">
                                                    <tr>
                                                    <td class="width198">立案时间：2019-12-14</td>
                                                    <td>当事人姓名/公司：百度在线网络技术（北京）有限公司</td>
                                                    </tr>
                                                    <tr>
                                                    <td>处置状态：已结案</td>
                                                    <td>立案机构：北京市交通大队</td>
                                                    </tr>
                                                </div>
                                                <div class="right">
                                                    <el-button type="success" size="medium" class="btnstyle" style="background-color: #4AAFA7 !important; width:100px;border-color: #4AAFA7 !important;">
                                                    查看详情
                                                    </el-button>
                                                </div>
                                                </li>
                                                <li>
                                                <p>京（XX）路政赔〔2020〕第00008号</p>
                                                <div class="left main-info">
                                                    <tr>
                                                    <td class="width198">立案时间：2019-12-14</td>
                                                    <td>当事人姓名/公司：百度在线网络技术（北京）有限公司</td>
                                                    </tr>
                                                    <tr>
                                                    <td>处置状态：已结案</td>
                                                    <td>立案机构：北京市交通大队</td>
                                                    </tr>
                                                </div>
                                                <div class="right">
                                                    <el-button type="success" size="medium" class="btnstyle" style="background-color: #4AAFA7 !important; width:100px;border-color: #4AAFA7 !important;">
                                                    查看详情
                                                    </el-button>
                                                </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </el-form>
                            </div>
                    <!-- </el-dialog> -->
                     </el-drawer>
                </div>
                <table class="table_style" v-if="obj">
                    <tr>
                        <td class="color_ff w-1">图像识别车牌</td>
                        <td>
                            <el-input width="300px" readonly v-model="obj.vehicleNumber"></el-input>
                        </td>
                        <td class="color_ff w-1">车牌颜色</td>
                        <td>
                            <el-input width="100px" readonly v-model="obj.vehicleColor"></el-input>
                        </td>
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
                             <el-select value="双轴"  placeholder="请选择">
                                <el-option
                                label="双轴"
                                value="双轴"
                                ></el-option>
                            </el-select>

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
                        <el-upload
                             class="avatar-uploader uploadFile"
                             drag
                             list-type="picture-card"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :limit="1"
                        >
                            <i class="el-icon-picture"></i>
                        </el-upload>
                    </li>
                </ul>
            </div>
        </div>


    </div>
</template>
<script>
import Vue from "vue";
import echarts from 'echarts';
import 'echarts/lib/chart/graph';
import AMap from 'vue-amap';
import { AMapManager } from 'vue-amap';

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
export default {
    props: ['obj'],
    data () {
        let self = this;
        return {
            visible: false,
            checkSearchForm: {
                number: '',
                color: ''
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
        }
    },
    methods:{
        //关闭弹窗的时候清除数据
        closeDialog() {
            this.visible = false;
        },
        gotoCoerciveMeasureDoc() {
            this.$store.dispatch("deleteTabs", this.$route.name);
            this.$router.push({ name: 'removeOrPrelong' });
        },
        updateHp () {
            this.visible = true;
        },
        check () {
            this.checkVisible = true
        },
        handleClick(tab, event) {
        },
        saveHp () {
            this.obj.vehicleNumber = this.checkSearchForm.number;
            this.obj.vehicleColor = this.checkSearchForm.color;
            this.visible = false;
        }
    }
}
</script>
<style lang='scss'>
</style>


