<template>
  <!--  执法监管首页 by-jingli -->
  <div id="lawSupervise" ref="lawSupervise" class="mainBox" :class="{'lawScreenFull':lawScreenFull}">
    <el-carousel :interval="8000" indicator-position="none" height="28px" style="position:absolute;top:0px;line-height:28px;width:100%;font-size:12px;color:#20232B">
        <el-carousel-item :key="1">
            <div style="background:#F9DAAC;padding-left:17px;">
                <i class="el-icon-info red"></i>&nbsp;&nbsp;&nbsp;
                <!-- <span>{{lunarDate}} </span> -->
                <span>北京市发布大风蓝色预警，局部伴有扬沙，请相关单位注意。</span>
            </div>
        </el-carousel-item>
         <el-carousel-item :key="2">
            <div style="background:#F9DAAC;padding-left:17px;">
                <i class="el-icon-info red"></i>&nbsp;&nbsp;&nbsp;
                <span>{{lunarDate}} </span>
            </div>
        </el-carousel-item>
    </el-carousel>
    <div class="amap-page-container">
      <!-- amap://styles/whitesmoke -->
      <!-- :features="['road','bg', 'building']" -->
      <el-amap vid="lawSupervise" :mapStyle="style" :center="center" :plugin="plugin" :amap-manager="amapManager" :zoom="zoom" :events="events" class="amap-demo">
        <el-amap-marker v-for="(marker,index) in markers" :key="index" :position="marker.position" :events="marker.events" :template="marker.template"></el-amap-marker>
        <el-amap-info-window v-if="curWindow" :visible="curWindow&&curWindow.visible"  :position="curWindow.position">
          <div :class="'lawWindowStyle'+curWindow.category">
            <!-- 0执法人员 -->
            <div v-if="curWindow.category == 0">
              <div class="lawWindowTitle">
                <!-- <i class="iconfont law-people"></i> -->
                <img :src="'./static/images/img/lawSupervise/icon_head.png'">
                <div class="titleBox">
                    <div class="nickName">{{curWindow.other.nickName}}</div>
                    <div class="num">{{curWindow.other.enforceNo}}</div>
                </div>
                <div class="right">
                    <div class="status">
                        <i class="iconfont law-mobile-phone"></i>
                    </div>
                    <p>在线</p>
                </div>
              </div>
              <div class="flexBox">
                <div class="con">
                  <p>{{curWindow.other.address}}</p>
                  <p>{{curWindow.other.mobile}}</p>
                </div>
                <!-- <div class="status greenC2">
                  <i class="iconfont law-mobile-phone"></i>
                  <p>在线</p>
                </div> -->
              </div>
                <externalVideoBtns :doing="videoDoing"  @updateMakePhoneStatus="updateMakePhoneStatus" :curWindow="curWindow"></externalVideoBtns>

            </div>
            <!-- 1执法机构 -->
            <div v-else-if="curWindow.category == 1">
              <div class="lawWindowTitle">
                <i class="iconfont law-zfj"></i>
                 <div class="title">{{curWindow.other.name}}</div>
                <span></span>
                <!-- <div class="right">{{curWindow.other.enforceNo}}</div> -->
              </div>
              <div class="flexBox">
                <div class="con">
                  <p>地址：{{curWindow.other.address}}</p>
                  <p>联系人：{{curWindow.other.contact}}</p>
                  <p>联系方式：{{curWindow.other.phone}}</p>
                </div>
                <div class="status">
                  <!-- <i class="iconfont law-mobile-phone"></i>
                  <p>{{curWindow.other.status}}</p> -->
                </div>
              </div>
             <div class="btns">
                <div class="flex-title"><img  :src="'./static/images/img/lawSupervise/icon_duiwu.png'">人员在线情况</div>
                <span class="phoneBtn blueBg" >李静</span>
                <span  class="phoneBtn" >王玉凤</span>
                <span  class="phoneBtn blueBg lineh" >迪丽<br>热巴</span>
                <span  class="phoneBtn blueBg lineh" >欧阳<br>娜娜</span>
                <span class="phoneBtn blueBg" >李静</span>
                <span  class="phoneBtn" >王玉凤</span>
                <span  class="phoneBtn blueBg lineh" >迪丽<br>热巴</span>
                <span  class="phoneBtn blueBg lineh" >欧阳<br>娜娜</span>
                <span  class="phoneBtn blueBg" >···</span>
            </div>
              <!-- <div class="btns">
                <div class="flexBox">
                  <div class="con">
                    <p>{{curWindow.other.address}}</p>
                    <p>{{curWindow.other.contact}}&nbsp;&nbsp;{{curWindow.other.phone}}</p>
                  </div>
                </div>
                <div class="flexBox">
                  <div class="con">
                    <i class="el-icon-location"></i>
                    <span>{{curWindow.other.position}}</span>
                  </div>
                </div>
              </div> -->
            </div>
            <!-- 2执法车辆 -->
            <div v-else-if="curWindow.category == 2">
                <div class="lawWindowTitle">
                    <i class="iconfont law-car"></i>
                    <div class="title">{{curWindow.other.vehicleNumber}}</div>
                    <span></span>
                    <!-- <div class="right">{{curWindow.other.enforceNo}}</div> -->
                </div>
                <div class="flexBox">
                    <div class="con">
                        <p>{{curWindow.other.organName}}</p>
                    </div>
                </div>
              <!-- <div class="flexBox">
                <div class="con">
                  <p>
                    <i class="iconfont law-car"></i>
                    {{curWindow.other.vehicleNumber}}
                  </p>
                  <p>{{curWindow.other.organName}}</p>
                </div>
                <div class="status greenC2">
                  <i class="iconfont law-mobile-phone"></i>
                  <p>在线</p>
                </div>
              </div> -->
                <externalVideoBtns :doing="videoDoing"  @updateMakePhoneStatus="updateMakePhoneStatus" :curWindow="curWindow"></externalVideoBtns>
                  <!-- <p>{{curWindow.other.mobile}}</p> -->

              <!-- <div class="btns">
                <i class="iconfont law-mobile"></i>
                <i class="iconfont law-shipin"></i>
                <i class="iconfont law-jiankong"></i>
                <i class="iconfont law-msg-box"></i>
                <i class="iconfont law-xianlu"></i>
              </div> -->
            </div>
            <!-- 3执法船舶 -->
            <div v-else-if="curWindow.category == 3">
              <!-- <div>
                            <i class="iconfont law-ship"></i>
                            {{curWindow.other.shipNumber}}<br>
                            {{curWindow.other.organName}}
              </div>-->
              <div class="lawWindowTitle">
                    <i class="iconfont law-ship"></i>
                    <div class="title">{{curWindow.other.shipNumber}}</div>
                    <span></span>
                    <!-- <div class="right">{{curWindow.other.enforceNo}}</div> -->
                </div>
                <div class="flexBox">
                    <div class="con">
                        <p>{{curWindow.other.organName}}</p>
                    </div>
                </div>
              <!-- <div class="flexBox">
                <div class="con">
                  <i class="iconfont law-ship"></i>
                  {{curWindow.other.shipNumber}}
                  <br />
                  {{curWindow.other.organName}}
                </div>
                <div class="status greenC2">
                  <i class="iconfont law-mobile-phone"></i>
                  <p>在线</p>
                </div>
              </div> -->
                <externalVideoBtns :doing="videoDoing"  @updateMakePhoneStatus="updateMakePhoneStatus" :curWindow="curWindow"></externalVideoBtns>

              <!-- <div class="btns">
                <i class="iconfont law-mobile"></i>
                <i class="iconfont law-shipin"></i>
                <i class="iconfont law-jiankong"></i>
                <i class="iconfont law-msg-box"></i>
                <i class="iconfont law-xianlu"></i>
              </div> -->
            </div>
            <!-- 4非现场治超检测 -->
            <div v-else-if="curWindow.category == 4">
              <div>
                  <img width="100%" :src="'./static/images/img/lawSupervise/jg_bg.png'">
              </div>
              <div class="lawWindowTitle">
                {{curWindow.other.name}}
                <div class="right">
                    <i class="iconfont law-jiankong"></i>
                </div>
              </div>
              <div class="flexBox">
                <div class="con">
                   <p>状态：<i class="circle "></i>在线</p>
                  <p>{{curWindow.other.address}}</p>
                  <div>
                    <p>
                      {{curWindow.other.createTime}} &nbsp;
                      超限{{curWindow.other.cxchl}} &nbsp;
                      黑名单{{curWindow.other.blackList}}
                    <span class="right" @click="routerXs">详情</span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="con ">
                <el-table style="width: 100%;line-height: 40px;" :data="curWindow.other.list" resizable stripe
                @row-click="routerXsDetail">
                  <el-table-column width="160" align="center" prop="checkTime" label="过检时间"></el-table-column>
                  <el-table-column width="90" align="center" prop="vehicleNumber" label="车牌号"></el-table-column>
                  <el-table-column width="65" align="center" prop="overload" label="超载率"></el-table-column>
                  <el-table-column width="66" align="center" prop="area" label="车属地"></el-table-column>
                  <el-table-column width="78" align="center" label="重点监管">
                    <template>
                      <span>是</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <!-- 5监管企业 -->
            <div v-else-if="curWindow.category == 5">
              <div class="lawWindowTitle">
                <i class="iconfont law-zfj"></i>
                {{curWindow.other.nickName}}
                <div class="right">{{curWindow.other.enforceNo}}</div>
              </div>
              <div class="flexBox">
                <div class="con">
                  <p>{{curWindow.other.address}}</p>
                  <p>{{curWindow.other.mobile}}</p>
                </div>
                <div class="status">
                  <i class="iconfont law-mobile-phone"></i>
                  <p>在线</p>
                </div>
              </div>
                <externalVideoBtns :doing="videoDoing"  @updateMakePhoneStatus="updateMakePhoneStatus" :curWindow="curWindow"></externalVideoBtns>
              <!-- <div class="btns">
                <i class="iconfont law-mobile"></i>
                <i class="iconfont law-shipin"></i>
                <i class="iconfont law-jiankong"></i>
                <i class="iconfont law-msg-box"></i>
                <i class="iconfont law-xianlu"></i>
              </div> -->
            </div>
            <!-- 6监管车辆 -->
            <div v-else-if="curWindow.category == 6">
              <div class="flexBox">
                <div class="con">
                  <p>
                    <i class="iconfont law-car"></i>
                    {{curWindow.other.vehicleNumber}}
                  </p>
                  <p>{{curWindow.other.organName}}</p>
                  <!-- <p>{{curWindow.other.mobile}}</p> -->
                </div>
                <div class="status">
                  <i class="iconfont law-mobile-phone"></i>
                  <p>在线</p>
                </div>
              </div>
                <externalVideoBtns :doing="videoDoing"  @updateMakePhoneStatus="updateMakePhoneStatus" :curWindow="curWindow"></externalVideoBtns>
              <!-- <div class="btns">
                <i class="iconfont law-mobile"></i>
                <i class="iconfont law-shipin"></i>
                <i class="iconfont law-jiankong"></i>
                <i class="iconfont law-msg-box"></i>
                <i class="iconfont law-xianlu"></i>
              </div> -->
            </div>
            <!-- -1搜索地图 -->
            <div v-else-if="curWindow.category == -1">
              <div class="noneWindow">
                当前位置：{{curWindow.other.address}}
                <br />
                当前坐标：[{{curWindow.other.lng}},{{curWindow.other.lat}}]
                <br />
                类型：{{curWindow.other.type}}
              </div>
            </div>
            <!-- <div v-else></div> -->

          </div>
          <div :class="'lawWindowStyle-po'">
            <!-- 0执法人员 -->
            <div v-if="curWindow.category == 0">
              <div class="lawWindowTitle">
                <img :src="'./static/images/img/lawSupervise/icon_head.png'">
                <div class="titleBox">
                    <div class="nickName">{{curWindow.other.nickName}}</div>
                </div>
              </div>
            </div>
            <!-- 1执法机构 -->
            <div v-else-if="curWindow.category == 1">
              <div class="lawWindowTitle">
                <i class="iconfont law-zfj"></i>
                 <div class="title">{{curWindow.other.name}}</div>
                <span></span>
              </div>
            </div>
            <!-- 2执法车辆 -->
            <div v-else-if="curWindow.category == 2">
                <div class="lawWindowTitle">
                    <i class="iconfont law-car"></i>
                    <div class="title">{{curWindow.other.vehicleNumber}}</div>
                    <span></span>
                </div>
            </div>
            <!-- 3执法船舶 -->
            <div v-else-if="curWindow.category == 3">
              <div class="lawWindowTitle">
                    <i class="iconfont law-ship"></i>
                    <div class="title">{{curWindow.other.shipNumber}}</div>
                    <span></span>
                </div>
            </div>
            <!-- 4非现场治超检测 -->
            <div v-else-if="curWindow.category == 4">
              <div class="lawWindowTitle">
                   <i class="iconfont law-jiankong"></i>
                   <div class="title">{{curWindow.other.name}}</div>
              </div>
            </div>
            <!-- 5监管企业 -->
            <div v-else-if="curWindow.category == 5">
              <div class="lawWindowTitle">
                <i class="iconfont law-zfj"></i>
                <div class="title">{{curWindow.other.nickName}}</div>
              </div>
            </div>
            <!-- 6监管车辆 -->
            <div v-else-if="curWindow.category == 6">
              <div class="flexBox">
                <div class="con">
                  <p>
                    <i class="iconfont law-car"></i>
                    <span class="title">{{curWindow.other.vehicleNumber}}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </el-amap-info-window>
      </el-amap>
      <div class="toolbar">
        <!-- <span v-if="loaded">
            location: lng = {{ lng }} lat = {{ lat }}
            </span>
        <span v-else>正在定位</span>-->
        <!-- <externalVideoBtns :doing="videoDoing"  style="position:absolute;z-index:300"></externalVideoBtns> -->
      </div>
      <!-- 右侧浮动栏 -->
       <!-- :class="{'widthDrawer600': category == 4}" -->
      <div class="amap-position amap-rtl-box" >
        <div class="amap-tool" style="position:relative;z-index:5;left:-120px;top:45px;" :class="{'left-500':drawer}">
            <el-popover
                placement="bottom-start"
                trigger="click"
                >
                <div class="drop-down-menu transition-box" >
                    <el-input class="no-border w160" value="" placeholder="城市名称，回车搜索"></el-input>
                    <el-menu :default-active="activeIndex"  @select="handleSelect" unique-opened :collapse="true">
                        <el-submenu :index="`${index}`" v-for="(item,index) in areaList" :key="`${index}`">
                                <template slot="title">{{item.titleName}}</template>
                                <el-menu-item-group :index="child.titleName" v-for="(child,i) in item.children" :key="i" >{{child.titleName}}</el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                </div>
                <el-button slot="reference">
                    <img :src="'./static/images/img/lawSupervise/area.png'"/>
                    <!-- <el-input class="no-border w75" v-model="areaObj" readonly></el-input> -->
                    <span>{{areaObj}}</span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
            </el-popover>
            <el-popover
                placement="bottom-start"
                trigger="click"
                >
                <div class="drop-down-menu transition-box">
                        <ul>
                            <li>
                                <span >
                                    <el-checkbox v-model="checked"  @change="isCheckAll">{{radioVal}}</el-checkbox>&nbsp;</span>
                                 <!-- <el-radio v-model="radioVal" label="2">取消全选</el-radio> -->
                            </li>
                        <li v-for="subItem in tabList[0].children" :key="subItem.name" :class="{'select':subItem.select}" @click="searchByTab(subItem)">
                            <i :class="subItem.icon"></i>
                            <p>{{subItem.name}}</p>
                        </li>
                    </ul>
                </div>
                <el-button slot="reference">
                    <img :src="'./static/images/img/lawSupervise/icon_changjing.png'"/>
                    <!-- <el-input class="no-border w100" v-model="categoryStr" readonly></el-input> -->
                    <span>{{categoryStr}}</span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
            </el-popover>

            <el-button size="medium" class="commonBtn searchBtn"  @click="lawScreenFull=!lawScreenFull">
                <img :src="'./static/images/img/lawSupervise/qp.png'" />
                全屏
            </el-button>
                         <el-popover
            placement="bottom-start"
            trigger="click"
            >
                <div class="drop-down-menu transition-box">
                    <ul>
                        <li v-for="(item,index) in styleListNumber" :class="{'select':styleIndexNumher==index}" :key="index" @click="styleIndexNumher=index">
                            <p>{{item}}</p>
                        </li>
                    </ul>
                </div>
                <el-button slot="reference" class="skinBtn">
                    <i class="iconfont law-skin f22"></i>
                </el-button>
           </el-popover>
        </div>
        <div class="drawerBtn" @click="updateDrawer">
          <i class="el-icon-arrow-right"></i>
        </div>
        <!-- v-if="category != 4"  -->
        <el-drawer modal-append-to-body :direction="direction" size="450px"
           customClass="amap-drawer" :wrapperClosable="false" :withHeader="false" :modal="false" :visible.sync="drawer">
          <div class="drawerBtn" @click="drawer=false">
            <i class="el-icon-arrow-right"></i>
          </div>
          <div class="amap-main-content" style="padding:0px 17px" v-show="category != 4">

              <div class="echarts-box">
                <div class="title" @click="status1 = !status1">
                    近三个月执行情况
                    <i v-if="status1 == true" class="iconfont law-youyou right"></i>
                    <i v-if="status1 == false" class="iconfont law-zuozuo right" ></i>
                </div>
                <el-collapse-transition>
                    <div v-show="status1" id="echartsBox1" class="amap-chart" style="height:200px;width:380px"></div>
                </el-collapse-transition>
              </div>

              <div class="echarts-box">
                <div class="title" @click="status2 = !status2">
                    近三个月查处排行
                    <i v-if="status2 == true" class="iconfont law-youyou right" ></i>
                    <i v-if="status2 == false" class="iconfont law-zuozuo right"></i>
                </div>
                <el-collapse-transition>
                    <div class="amap-chart"  v-show="status2">
                        <ul style="width: 100%">
                        <li class="mc" v-for="(item,index) in tableData" :key="index">
                            <div>{{index+1}}</div>
                            <div>
                            <i :class="['iconfont',item.icon]"></i>
                            {{item.name}}
                            </div>
                            <div>{{item.num}}</div>
                        </li>
                        <li class="ck">查看全部</li>
                        </ul>
                    </div>
                </el-collapse-transition>
              </div>

              <div class="echarts-box">
                <div class="title" @click="status3 = !status3">
                    车辆预警
                    <i v-if="status3 == true" class="iconfont law-youyou right" ></i>
                    <i v-if="status3 == false" class="iconfont law-zuozuo right" ></i>
                </div>
                <el-collapse-transition>
                    <div v-show="status3" id="echartsBox2" class="amap-chart" style="height:200px;width:380px"></div>
                </el-collapse-transition>
              </div>

          </div>
          <div class="amap-main-content" style="padding:0px" v-show="category == 4">

                    <div class="echarts-box" >
                        <div class="title" @click="status4 = !status4">
                            告警车辆
                            <i v-if="status4 == true" class="iconfont law-youyou right"></i>
                            <i v-if="status4 == false" class="iconfont law-zuozuo right" ></i>
                        </div>

                        <el-collapse-transition>
                            <div class="amap-chart" v-show="status4">
                                 <el-popover
                                    title="告警车辆详情"
                                    placement="left"
                                    trigger="hover"
                                    >
                                    <div class="leftTabelHoverDiv" v-if="gjObj">
                                        <p>过检时间：{{gjObj.checkTime}}</p>
                                        <p>车牌号：{{gjObj.vehicleNumber}}</p>
                                        <p>超载率{{gjObj.overload}}</p>
                                        <p>站点名称：{{gjObj.siteName}}</p>
                                        <p>车属地：{{gjObj.area}}</p>
                                        <p>重点监管：<i class="iconfont law-star orangeC"></i></p>
                                        <p>历史查处：{{gjObj.lscc}}</p>
                                    </div>

                                        <el-table
                                        slot="reference"
                                        v-loading="loading"
                                            @row-click="(row, column, event)=>positionEvent1(row, column, event, 6)"
                                            @cell-mouse-enter="positionEventEnter"
                                            :data="gjclList"
                                            style="width: 100%;height: auto;">
                                            <el-table-column label="时间"  align="center" prop="createTime">
                                                <template slot-scope="scope">
                                                    <span >{{scope.row.checkTime?scope.row.checkTime.split(' ')[1]:scope.row.checkTime}}</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column
                                                prop="vehicleNumber"
                                                label="车牌号"
                                                >
                                            </el-table-column>
                                            <el-table-column
                                                prop="overload"
                                                label="超载率"
                                                width="70"
                                                >
                                            </el-table-column>
                                            <!-- <el-table-column
                                                prop="area"
                                                label="车属地"
                                                >
                                            </el-table-column> -->
                                            <!-- <el-table-column
                                                label="重点监管"
                                                width="80"
                                                >
                                                <template>
                                                    <div><i class="iconfont law-star orangeC"></i></div>
                                                </template>
                                            </el-table-column> -->
                                            <el-table-column
                                                prop="siteName"
                                                label="站点"
                                                >
                                            </el-table-column>
                                            <el-table-column
                                                prop="lscc"
                                                width="55px"
                                                label="历史"
                                                >
                                            </el-table-column>
                                        </el-table>
                                 </el-popover>
                            </div>
                        </el-collapse-transition>

                    </div>
                <div class="echarts-box" >
                     <div class="title" @click="status5 = !status5">
                        非现场执法点
                        <i v-if="status5 == true" class="iconfont law-youyou right"></i>
                        <i v-if="status5 == false" class="iconfont law-zuozuo right" ></i>
                    </div>
                     <el-collapse-transition>
                        <div v-show="status5">
                            <el-popover
                                title="非现场执法点详情"
                                placement="left"
                                trigger="hover"
                                >
                                <div class="leftTabelHoverDiv"  v-if="fxcObj">
                                    <p>站点名称：{{fxcObj.name}}</p>
                                    <p>超限查处量：{{fxcObj.cxchl}}</p>
                                    <p>重点监管：{{fxcObj.blackList}}</p>
                                    <p>过检总量：{{fxcObj.gjzl}}</p>
                                    <p>状态：{{fxcObj.status}}</p>
                                    <p>重点监管：<i class="iconfont law-star orangeC"></i></p>
                                    <p>历史查处：{{fxcObj.lscc}}</p>
                                </div>
                                <el-table
                                slot="reference"
                                v-loading="loading"
                                    @row-click="(row, column, event)=>positionEvent(row, column, event, 4)"
                                    @cell-mouse-enter="positionEventEnter1"
                                    :data="zfdList"
                                    style="width: 100%;">
                                    <el-table-column
                                        width="150px"
                                        prop="name"
                                        label="站点"
                                        >
                                    </el-table-column>
                                    <!-- <el-table-column
                                        width="92px"
                                        prop="cxchl"
                                        label="超限查处量"
                                        >
                                    </el-table-column> -->
                                    <el-table-column
                                        prop="blackList"
                                        label="告警"
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        prop="gjzl"
                                        label="过检"
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        prop="status"
                                        label="状态"
                                        width="80px"
                                        >
                                        <template>
                                            <div class="orangeBg circle" ></div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-popover>
                        </div>
                     </el-collapse-transition>
                </div>
            <!-- <el-collapse-transition> -->
                <!-- <div class="amap-tool" >
                    <div class="" style="right:0px;" >
                        <div class="top-title">
                            <el-button size="medium" class="commonBtn searchBtn" >
                                <img :src="'./static/images/img/lawSupervise/icon_01.png'" />
                                非现场治超
                            </el-button>
                            <el-button size="medium" class="commonBtn searchBtn" >
                                <img :src="'./static/images/img/lawSupervise/icon_02.png'" />
                                入口称重
                            </el-button>
                            <el-button size="medium" class="commonBtn searchBtn" >
                                <img :src="'./static/images/img/lawSupervise/icon_03.png'" />
                                暂无
                            </el-button>
                        </div>
                        <el-collapse-transition>
                            <div class="echarts-box" style="width:100%;margin:0px;">
                                <div>
                                    <el-table
                                    v-loading="loading"
                                        @row-click="(row, column, event)=>positionEvent(row, column, event, 4)"
                                        :data="zfdList"
                                        style="width: 100%;">
                                        <el-table-column
                                            width="150px"
                                            prop="name"
                                            label="站点名称"
                                            >
                                        </el-table-column>
                                        <el-table-column
                                            width="92px"
                                            prop="cxchl"
                                            label="超限查处量"
                                            >
                                        </el-table-column>
                                        <el-table-column
                                            prop="blackList"
                                            label="重点监管"
                                            >
                                        </el-table-column>
                                        <el-table-column
                                            prop="gjzl"
                                            label="过检总量"
                                            >
                                        </el-table-column>
                                        <el-table-column
                                            prop="status"
                                            label="状态"
                                            width="80px"
                                            >
                                            <template>
                                                <div class="orangeBg circle" ></div>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </el-collapse-transition>
                    </div>
                </div> -->
            <!-- </el-collapse-transition> -->
          </div>
        </el-drawer>
        <!-- <el-drawer
            modal-append-to-body
            size="620px"
            customClass="amap-drawer w-680"
            :direction="direction"
            :wrapperClosable="false"
            :withHeader="false"
            :modal="false"
            :visible.sync="drawer1"
            >
            <div class="drawerBtn" @click="drawer1=false">
                <i class="el-icon-arrow-right"></i>
            </div>
            <div class="amap-main-content" style="padding: 0px 22px">
                <el-collapse-transition>
                    <div class="echarts-box" v-show="status1">
                        <em class="title left"><i class="titleflag"></i>非现场执法点</em>
                        <i class="iconfont law-delete1 right"></i>
                        <div>
                            <el-table
                            v-loading="loading"
                                @row-click="(row, column, event)=>positionEvent(row, column, event, 4)"
                                :data="zfdList"
                                style="width: 100%;">
                                <el-table-column
                                    prop="name"
                                    label="站点名称"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="cxchl"
                                    label="超限查处量"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="blackList"
                                    label="重点监管"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="gjzl"
                                    label="过检总量"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="status"
                                    label="状态"
                                    >
                                    <template>
                                        <div class="orangeBg circle" ></div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-collapse-transition>
            </div>
        </el-drawer> -->
      </div>


     <!-- <div class="amap-position" :class="'amap-' + direction1 + '-box'">
            <div class="drawerBtn" @click="updateDrawer1">
                <i class="el-icon-arrow-right"></i>
            </div>
            <el-drawer
                customClass="amap-drawer"
                :direction="direction1"
                :wrapperClosable="false"
                :withHeader="false"
                :modal="false"
                :visible.sync="drawer1"
                modal-append-to-body
                >
                 <el-collapse-transition>
                    <div class="echarts-box" >
                        <em class="title left"><i class="titleflag"></i>告警车辆</em>
                        <i class="iconfont law-delete1 right" @click="status2 = false"></i>
                        <div class="amap-chart">
                            <el-table
                            v-loading="loading"
                                @row-click="(row, column, event)=>positionEvent1(row, column, event, 6)"
                                :data="gjclList"
                                style="width: 100%;height: auto;">
                                <el-table-column label="过检时间"  align="center" prop="checkTime">
                                    <template slot-scope="scope">
                                        <span >{{scope.row.checkTime.split(' ')[0]}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="vehicleNumber"
                                    label="车牌号"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="overload"
                                    label="超载率"
                                    width="70"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="area"
                                    label="车属地"
                                    >
                                </el-table-column>
                                <el-table-column
                                    label="重点监管"
                                    width="80"
                                    >
                                    <template>
                                        <div><i class="iconfont law-star orangeC"></i></div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="lscc"
                                    label="历史查处"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="siteName"
                                    label="站点名称"
                                    >
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-collapse-transition>
            </el-drawer>
     </div> -->
      <!-- 底部浮动栏 -->
        <div class="amap-position" :class="'amap-' + direction1 + '-box'" v-if="false">
            <div class="drawerBtn" @click="updateDrawer1">
                <i class="el-icon-arrow-right"></i>
            </div>
            <el-drawer
                size="350px"
                customClass="amap-drawer"
                :direction="direction1"
                :wrapperClosable="false"
                :withHeader="false"
                :modal="false"
                :visible.sync="drawer1"
                >
                <div class="drawerBtn" @click="drawer1=false">
                    <i class="el-icon-arrow-right"></i>
                </div>
                <div class="amap-main-content" style="padding: 0px 22px">
                    <!-- <el-collapse-transition>
                        <div class="echarts-box" v-show="status1">
                            <em class="title left"><i class="titleflag"></i>非现场执法点</em>
                            <i class="iconfont law-delete1 right" @click="status1 = false"></i>
                            <div class="amap-chart">
                                <el-table
                                v-loading="loading"
                                    @row-click="(row, column, event)=>positionEvent(row, column, event, 4)"
                                    :data="zfdList"
                                    style="width: 100%;height: 170px;">
                                    <el-table-column
                                        prop="name"
                                        label="站点名称"
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        prop="cxchl"
                                        label="超限查处量"
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        prop="blackList"
                                        label="重点监管"
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        prop="gjzl"
                                        label="过检总量"
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        prop="status"
                                        label="状态"
                                        >
                                        <template>
                                            <div class="orangeBg circle" ></div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </el-collapse-transition> -->
                    <el-collapse-transition>
                        <div class="echarts-box" v-show="status2">
                            <em class="title left"><i class="titleflag"></i>告警车辆</em>
                            <i class="iconfont law-delete1 right" @click="status2 = false"></i>
                            <div class="amap-chart">
                                <el-table
                                v-loading="loading"
                                    @row-click="(row, column, event)=>positionEvent(row, column, event, 6)"
                                    :data="gjclList"
                                    style="width: 100%;">
                                    <el-table-column
                                        prop="checkTime"
                                        label="过检时间">
                                    </el-table-column>
                                    <el-table-column
                                        prop="vehicleNumber"
                                        label="车牌号"
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        prop="overload"
                                        label="超载率"
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        prop="area"
                                        label="车属地"
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        label="重点监管"
                                        >
                                        <template>
                                            <div><i class="iconfont law-star orangeC"></i></div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="lscc"
                                        label="历史查处"
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        prop="siteName"
                                        label="站点名称"
                                        >
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </el-collapse-transition>
                </div>
            </el-drawer>
        </div>
    </div>
    <div class="amap-search" @mousemove="toolShow = true" @mouseleave="toolShow = false">
        <el-amap-search-box class="search-box-blue" ref="searchAmapBox" :search-option="searchOption" :on-search-result="searchAll">
        </el-amap-search-box>
        <div class="amap-tool-search" v-if="toolShow" >
            <el-button size="medium" class="tabBtn" :class="{'isCheck': isCheck}" @click="isCheck = true">
                <img :src="'./static/images/img/lawSupervise/icon_renyuan.png'" />
                <span class="name">人员</span>
            </el-button>
             <el-button size="medium" class="tabBtn" :class="{'isCheck': !isCheck}" @click="isCheck = false">
                <img :src="'./static/images/img/lawSupervise/icon_jigou.png'" />
                <span class="name">机构</span>
            </el-button>
            <div class="amap-tool-search" style="top:96px;padding: 22px;margin-bottom: 22px;">
                <el-tree
                    :data="data"
                    :props="defaultProps"
                    accordion
                    @node-click="handleNodeClick">
                     <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span><img class="tree-node-icon" :src="'./static/images/img/lawSupervise/'+data.icon+'.png'">{{node.label}}</span>
                    </span>
                </el-tree>
            </div>
        </div>
    </div>
    <!-- <div class="amap-tool" style="left:auto;right: 450px;z-index:5;" >
        <div class="amap-main-content amap-position-right" style="right:0px;" v-show="categoryStr == '非现场站点'">
            <div class="top-title">
                <el-button size="medium" class="commonBtn searchBtn" >
                    <img :src="'./static/images/img/lawSupervise/icon_01.png'" />
                    非现场治超
                </el-button>
                 <el-button size="medium" class="commonBtn searchBtn" >
                    <img :src="'./static/images/img/lawSupervise/icon_02.png'" />
                    入口称重
                </el-button>
                 <el-button size="medium" class="commonBtn searchBtn" >
                    <img :src="'./static/images/img/lawSupervise/icon_03.png'" />
                    暂无
                </el-button>
            </div>
            <el-collapse-transition>
                <div class="echarts-box" >
                    <div>
                        <el-table
                        v-loading="loading"
                            @row-click="(row, column, event)=>positionEvent(row, column, event, 4)"
                            :data="zfdList"
                            style="width: 100%;">
                            <el-table-column
                                width="150px"
                                prop="name"
                                label="站点名称"
                                >
                            </el-table-column>
                            <el-table-column
                                width="92px"
                                prop="cxchl"
                                label="超限查处量"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="blackList"
                                label="重点监管"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="gjzl"
                                label="过检总量"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="status"
                                label="状态"
                                width="80px"
                                >
                                <template>
                                    <div class="orangeBg circle" ></div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
         <el-popover
            placement="bottom-start"
            trigger="click"
            >
            <div class="drop-down-menu transition-box" >
                <el-input class="no-border w160" value="" placeholder="城市名称，回车搜索"></el-input>
                <el-menu :default-active="activeIndex"  @select="handleSelect" unique-opened :collapse="true">
                    <el-submenu :index="`${index}`" v-for="(item,index) in areaList" :key="`${index}`">
                            <template slot="title">{{item.titleName}}</template>
                            <el-menu-item-group :index="child.titleName" v-for="(child,i) in item.children" :key="i" >{{child.titleName}}</el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </div>
            <el-button slot="reference">
                <img :src="'./static/images/img/lawSupervise/area.png'"/>
                <el-input class="no-border w75" v-model="areaObj" readonly></el-input>
                <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
        </el-popover>
        <el-popover
            placement="bottom-start"
            trigger="click"
            >
            <div class="drop-down-menu transition-box">
                    <ul>
                    <li v-for="subItem in tabList[0].children" :key="subItem.name" :class="{'select':subItem.select}" @click="searchByTab(subItem)">
                        <i :class="subItem.icon"></i>
                        <p>{{subItem.name}}</p>
                    </li>
                </ul>
            </div>
            <el-button slot="reference">
                <img :src="'./static/images/img/lawSupervise/icon_changjing.png'"/>
                <el-input class="no-border w100" v-model="categoryStr" readonly></el-input>
                <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
        </el-popover>
        <el-button size="medium" class="commonBtn searchBtn"  @click="lawScreenFull=!lawScreenFull">
            <img :src="'./static/images/img/lawSupervise/qp.png'" />
            全屏
        </el-button>
    </div> -->
            <!-- <el-button>
            <div slot="reference">
                <img :src="'./static/images/img/lawSupervise/area.png'"/>
                <el-input class="no-border w75" v-model="areaObj" readonly></el-input>
                <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <transition name="el-zoom-in-top" >
            <div class="drop-down-menu transition-box" v-show="currentTabIndex === 'show0'">
                <el-input class="no-border w160"  placeholder="城市名称，回车搜索"></el-input>
                <el-menu :default-active="activeIndex"  @select="handleSelect" unique-opened>
                    <el-submenu :index="`${index}`" v-for="(item,index) in areaList" :key="`${index}`">
                            <template slot="title">{{item.titleName}}</template>
                            <el-menu-item :index="`${index}-${i}`" v-for="(child,i) in item.children" :key="i">{{child.titleName}}</el-menu-item>
                    </el-submenu>
                </el-menu>
            </div>
            </el-collapse-transition>
        </el-button> -->
        <!-- <el-button @mousemove="currentTabIndex = 'show1'" @mouseleave="currentTabIndex = null">
            <div>
                <img :src="'./static/images/img/lawSupervise/icon_changjing.png'"/>
                <el-input class="no-border w100" v-model="categoryStr" readonly></el-input>
                <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <transition name="el-zoom-in-top"  >
                <div class="drop-down-menu transition-box" v-show="currentTabIndex === 'show1'">
                    <i class="el-icon-caret-top"></i>
                    <ul>
                    <li v-for="subItem in tabList[0].children" :key="subItem.name" :class="{'select':subItem.select}" @click="searchByTab(subItem)">
                        <i :class="subItem.icon"></i>
                        <p>{{subItem.name}}</p>
                    </li>
                    </ul>
                </div>
            </el-collapse-transition>
        </el-button> -->
    <!-- <div class="amap-search">
      <el-select v-model="styleIndexNumher" placeholder="样式切换">
        <el-option v-for="(item,index) in styleListNumber" :key="index" :label="item" :value="index"></el-option>
      </el-select>
      <el-select v-model="categorySelect" @change="category=categorySelect" placeholder="请选择">
        <el-option v-for="(item,index) in categoryList" :key="index" :label="item.show" :value="item.code"></el-option>
      </el-select>
      <el-amap-search-box class="search-box" ref="searchAmapBox" :search-option="searchOption" :on-search-result="searchAll"></el-amap-search-box>
    </div> -->
    <!-- <div class="amap-tool">
      <el-button v-for="(item,index) in tabList" :key="index" @click="currentTabIndex === index ? currentTabIndex = null : currentTabIndex = index">
        <img :src="'./static/images/img/lawSupervise/'+item.iconfont+'.png'" />
        {{item.name}}
        <i class="el-icon-arrow-down el-icon--right"></i>
        <transition name="el-zoom-in-top">
          <div class="drop-down-menu transition-box" v-if="currentTabIndex == index">
            <i class="el-icon-caret-top"></i>
            <ul>
              <li v-for="subItem in item.children" :key="subItem.name" :class="{'select':subItem.select}" @click="searchByTab(subItem)">
                <i :class="subItem.icon"></i>
                <p>{{subItem.name}}</p>
              </li>
            </ul>
          </div>
        </el-collapse-transition>
      </el-button>
      <el-button size="medium" class="commonBtn searchBtn" icon="el-icon-copy-document" @click="lawScreenFull=!lawScreenFull">全屏切换</el-button>
    </div> -->
  </div>
</template>
<script>
import Vue from "vue";
import { mapGetters } from "vuex";
// require("@/common/js/call.js");
import echarts from "echarts";
import "echarts/lib/chart/graph";
import { lawSuperviseObj, yjObj } from "@/page/lawSupervise/supervisePage/kshjg/echarts/echartsJson.js";
import { getZfjgLawSupervise, getBySiteId, getById, getOrganTree } from "@/api/lawSupervise.js";
import { lawSuperviseMixins, mixinsCommon } from "@/common/js/mixinsCommon";
import externalVideoBtns from '../../componentCommon/externalVideoBtns.vue';
import lunarDate from '@/common/js/lunarDate.js';
import {BASIC_DATA_SYS} from '@/common/js/BASIC_DATA.js'

// import externalVideoBtns from '@/page/lawSupervise/componentCommon/externalVideoBtns.vue';
import _ from "lodash";
import AMap from "vue-amap";
import { AMapManager } from "vue-amap";

Vue.use(AMap);
AMap.initAMapApiLoader({
  key: "2fab5dfd6958addd56c89e58df8cbb37",
  plugin: [
    "Autocomplete",
    "PlaceSearch",
    "Scale",
    "OverView",
    "ToolBar",
    "MapType",
    "PolyEditor",
    "AMap.CircleEditor",
    "lazyAMapApiLoaderInstance",
    "Geolocation",
    "Marker",
    "Icon"
  ],
  v: "1.4.4",
  uiVersion: "1.0.11",
  showLabel: false
});
let amapManager = new AMap.AMapManager();
export default {
  // el: '#lawSupervise',
  name: "lawSupervise",
  data() {
    let self = this;
    return {
        lunarDate: '',
        status5:true,
        status4:true,
        isCheck: true,
        toolShow: false,
        checked: false,
        radioVal: '全选',
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        data: [{
          label: '乌鲁木齐路政管理局',
          icon: 'icon_jc1',
          children: [{
              label: '执法人员',
              icon: 'icon_jc11',
              children: [

              ]
            },{
              label: '执法车辆',
              icon: 'icon_cl11'
            },{
              label: '执法船舶',
              icon: 'icon_cb11'
            }, {
            label: '后峡路政管理局',
            icon: 'icon_jc1',
            children: [{
              label: '执法人员',
              icon: 'icon_jc11',
              children: [
              ]
            },{
              label: '执法车辆',
              icon: 'icon_cl11'
            },{
              label: '执法船舶',
              icon: 'icon_cb11'
            },{
              label: '燕尔窝路政队',
              icon: 'icon_jc1'
            }]
          }]
        }, {
          label: '昌吉路政管理局',
          icon: 'icon_jc1',
          children: [{
            label: '木垒路政管理局',
            icon: 'icon_jc1',
            children: [{
              label: '昌吉局路政大队',
              icon: 'icon_jc1',
            }]
          }, {
            label: '奇台路政管理局',
            icon: 'icon_jc1',
            children: [{
              label: '三级 2-2-1',
              icon: 'icon_jc1',
            }]
          }]
        }, {
          label: '石河子路政管理局',
          icon: 'icon_jc1',
          children: [{
            label: '卡子弯道班超限监测站',
            icon: 'icon_jc1',
            children: [{
              label: '三级 3-1-1',
              icon: 'icon_jc1',
            }]
          }, {
            label: '二级 3-2',
            icon: 'icon_jc1',
            children: [{
              label: '三级 3-2-1',
              icon: 'icon_jc1',
            }]
          }]
        }],
      areaObj: '全国',
      activeIndex:'',
      areaList: [
          {
              titleName: '北京市',
              children: [
                  {
                      titleName: '东城区'
                  },{
                      titleName: '西城区'
                  },{
                      titleName: '海淀区'
                  },{
                      titleName: '朝阳区'
                  },{
                      titleName: '丰台区'
                  },{
                      titleName: '石景山区'
                  }
              ]
          }, {
              titleName: '天津',
              children: [
                  {
                      titleName: '南开区'
                  },{
                      titleName: '红桥区'
                  },{
                      titleName: '北辰区'
                  },{
                      titleName: '河北区'
                  },{
                      titleName: '和平区'
                  },{
                      titleName: '东丽区'
                  }
              ]
          }
      ],
      lawScreenFull: false,
      videoDoing: null,
      showVideo: false,
      show: true,
      categorySelect: -1,
      direction: "rtl",
      direction1: 'btt',
      drawer: false,
      drawer1: false,
      windows: [],
      curWindow: null,
      default: "",
      slotStyle: "lawWindowStyle1",
      slotStyleList: ["", "greenBg2", "orangeBg", "redBg"],
      status1: true,
      status2: true,
      status3: true,
      lawSuperviseObj,
      yjObj,
      currentTabIndex: null,
      category: -1,
      categoryList: [
        {
          show: "地图位置",
          code: -1,
          placeholder: "请输入位置信息",
          className: "map_didian"
        },
        {
          show: "执法人员",
          code: 0,
          placeholder: "请输入执法人员名称",
          className: "map_renyuan"
        },
        {
          show: "执法机构",
          code: 1,
          placeholder: "请输入执法机构名称",
          className: "map_jigou"
        },
        {
          show: "执法车辆",
          code: 2,
          placeholder: "请输入车牌号",
          className: "map_jingche"
        },
        {
          show: "执法船舶",
          code: 3,
          placeholder: "请输入站点名称",
          className: "map_cbo"
        },
        {
          show: "非现场治超检测点",
          code: 4,
          placeholder: "请输入站点名称",
          className: "map_o_gud"
        },
        {
          show: "监管企业",
          code: 5,
          placeholder: "请输入企业名称",
          className: "map_o_gud"
        },
        {
          show: "监管车辆",
          code: 6,
          placeholder: "请输入车牌号码",
          className: "map_jingche"
        },
        {
          show: "视频监控",
          code: 7,
          placeholder: "请输入",
          className: "map_didian"
        }
      ],
      center: [116.397428, 39.90923],
      searchOption: {
        city: "北京",
        citylimit: true
      },
      currentAddressObj: null,
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
      loaded: false,
      lng: 0,
      lat: 0,
      plugin: [
        {
          pName: "ToolBar",
          position: "RB"
        },
        {
          pName: "Scale",
          position: "RB"
        },
        {
          pName: "Geolocation",
          position: "RB",
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
          pName: "PlaceSearch",
          renderStyle: "default",
          events: {}
        }
      ],
      markers: [],
      allSearchList: [],
      zfdList: null,
      gjclList: null,
      categoryStr: '图层',
      checkTableNum: null,
      gjObj: null,
      fxcObj: null
    };
  },
  methods: {
    positionEventEnter (row, column, cell, event) {
        // this.checkTableNum = row.in
        // debugger;
        this.gjObj = row;
    },
    positionEventEnter1 (row, column, cell, event) {
        // this.checkTableNum = row.in
        // debugger;
        this.fxcObj = row;
    },
    isCheckAll () {
        // debugger;
        let _this = this;
        if (this.radioVal == '全选') {
            this.radioVal = '取消全选';
            this.tabList[0].children.forEach((item)=>{
            // debugger;
                if(!item.select) {
                    _this.checkAll(item);
               }
            })
        } else {
            this.radioVal = '全选';
            this.tabList[0].children.forEach((item)=>{
            // debugger;
                if(item.select) {
                    _this.checkAll(item);
                }
            })
        }

    },
    handleSelect (key, keyPath) {
        // debugger;
        this.areaObj = key;
    },
    handleNodeClick (node) {

    },
    routerXs () {
        this.$router.push({
            name: 'law_supervise_offSiteManage'
        })
    },
    routerXsDetail () {
        this.$router.push({
            name: 'law_supervise_examineDoingDetail',
            params: {
                status: '0',
                tabTitle: '待审核',
                offSiteManageId: '1'
            }
        })
    },
    positionEvent (row, column, event, category) {
        // debugger;
        this.category == 4;
        // debugger;
        this.markers.splice(0, this.markers.length);
        if (this.curWindow) {
            this.curWindow.visible = false;
        }
        this.getById(category, row.id);
        this.routerXsDetail();
    },
    positionEvent1 () {
        this.routerXsDetail()
    },
    getById (type,id) {
        let _this = this
        new Promise((resolve, reject) => {
            getById(type,id).then(
                res => {
                    // resolve(res);
                    let resultList = []
                    if (res.data) {
                        _this.errorMsg(`总计1条数据`, 'success');
                        let position = res.data.position ? res.data.position.split(','):['',''];
                        let lng = parseFloat(position[0]);
                        let lat = parseFloat(position[1]);
                        // _this.category = type;
                        resultList.push({
                            address: res.data.area,
                            distance: null,
                            id: res.data.id,
                            lat: lat,
                            lng: lng,
                            location: {
                                O: lng,
                                P: lat,
                                lat: lat,
                                lng: lng
                            },
                            name: res.data.vehicleNumber,
                            shopinfo: '',
                            tel: '',
                            type: type,
                            other: res.data
                        })
                    } else {
                        _this.errorMsg('暂无数据', 'error');
                    }


                    _this.onSearchResult(resultList, type,0)
                },
                error => {
                    //  _this.errorMsg(error.toString(), 'error')
                    return
                })
        })
    },
    updateMakePhoneStatus (code) {
        this.videoDoing = code;
        // this.makePhoneStatus = !this.makePhoneStatus;
        this.$store.commit('setMakePhoneStatus', !this.makePhoneStatus);
        this.$store.commit('setDoing', code);
        this.showVideo = true;
    },
    ringOff() {
      this.videoDoing = null;
      window.PhoneCallModule.sipHangUp();
      this.$store.commit('setMakePhoneStatus', false);
      this.$store.commit('setDoing', null);
    },
    start(e, id) {
      let odiv = e.target;        //获取目标元素
      //算出鼠标相对元素的位置
      document.onmousemove = (e) => {       //鼠标按下并移动的事件
        // "phoneBox"
        let obj = document.getElementById(id).style;
        obj.left = e.clientX < 325 ? '0px' : (e.clientX - 350) + 'px';
        obj.top = e.clientY < 90 ? '0px' : (e.clientY - 110) + 'px';
        if (e.clientY >= (document.body.clientHeight - 60)) {
          obj.top = (document.body.clientHeight - 210) + 'px';
        }
        if (e.clientX >= (document.body.clientWidth - 400)) {
          obj.left = (document.body.clientWidth - 400) + 'px';
        }
      };
      document.onmouseup = (e) => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    updateDrawer() {
        // debugger;
        this.drawer = !this.drawer;
        // debugger;
        // if (this.category != 4) {
            // this.drawer = true;
            // if (this.drawer) {
              let _this = this;
              this.$nextTick(() => {
                var flowChart = echarts.init(document.getElementById("echartsBox1"));
                flowChart.setOption(_this.lawSuperviseObj.option);
                var flowChart1 = echarts.init(document.getElementById("echartsBox2"));
                flowChart1.setOption(_this.yjObj);
              //   _this.getRealTimeDataByLawSupervise();
              });
            // }
        // }
    },
    updateDrawer1 () {
        // debugger;
        // if (this.category == 4) {
        //     this.drawer1 = true;
        // } else {
        //     this.drawer1 = false;
        // }
         this.drawer1 = !this.drawer1 ;
        // this.getRealTimeDataByLawSupervise();
        this.searchPageAll(4, 'zfdList');
        this.searchPageAll(6, 'gjclList');
        // this.category = 4;
        // this.searchByTab(this.tabList[1].children[0]);

    },
    searchPageAll (code, obj) {
        this.markers.splice(0, this.markers.length);
        if (this.curWindow) {
            this.curWindow.visible = false;
        }
        // 进入页面加载查询所有初始数据
        let data = {
                // area: this.currentAddressObj.province + this.currentAddressObj.district,
                area: '',
                current: 1,
                key: '',
                size: 20,
                type: code
            };
        let that = this;
        new Promise((resolve, reject) => {
                getZfjgLawSupervise(data).then(
                    res => {
                        // resolve(res);
                        let resultList = [];
                        that[obj] = res.data.records.splice(0,5);
                    },
                    error => {
                        //  _this.errorMsg(error.toString(), 'error')
                        return
                    })
            })
    },
    onSearchResult(pois, category, length) {
      let latSum = 0;
      let lngSum = 0;
      if (pois.length > 0) {
        let _this = this;
        // let windows = []
        pois.forEach((poi, i) => {
          let { lng, lat } = poi;
          lngSum += lng;
          latSum += lat;
          let that = _this;
          if (category == -1) {
                _this.markers.push({
                position: [poi.lng, poi.lat],
                visible: false,
                other: poi,
                // icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png',
                // content: null,
                template: `<div><img src="./static/images/img/lawSupervise/map_didian.png"><span style="position:absolute;left:12px;top:8px;color:white">${i +
                    1}</span></div>`,
                events: {
                    click() {
                    that.windows.forEach(window => {
                        window.visible = false;
                    });

                    that.curWindow = that.windows[i];

                    console.log(that.curWindow);
                    that.$nextTick(() => {
                        that.curWindow.visible = true;
                    });
                    }
                }
                });

          } else if (category == 4) {
                _this.markers.push({
                  position: [poi.lng, poi.lat],
                  other: poi.other,
                  visible: false,
                  template: `<span><img src="/static/images/img/lawSupervise/${
                    _this.categoryList[category + 1].className
                    }.png"><em style="position:absolute;top:7px;font-style:normal;left:5px;font-size: 12px; color: red;">G122</em></span>`,
                  // icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png',
                  // content: `<div class="prompt">${ poi.other.username }</div>`,
                  events: {
                    click() {
                      that.windows.forEach(window => {
                        window.visible = false;
                      });
                      that.curWindow = that.windows[length + i];
                      if (category == 4) {
                        that.getBySiteId(
                          that.curWindow.other.id,
                          that.curWindow.other
                        );
                        // debugger;
                      }
                      console.log(that.curWindow);
                      that.$nextTick(() => {
                        that.curWindow.visible = true;
                      });
                    }
                  }
                });
          } else {
               _this.markers.push({
                  position: [poi.lng, poi.lat],
                  other: poi.other,
                  visible: false,
                  template: `<img src="/static/images/img/lawSupervise/${
                    _this.categoryList[category + 1].className
                    }.png">`,
                  // icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png',
                  // content: `<div class="prompt">${ poi.other.username }</div>`,
                  events: {
                    click() {
                      that.windows.forEach(window => {
                        window.visible = false;
                      });
                      that.curWindow = that.windows[length + i];
                      if (category == 4) {
                        that.getBySiteId(
                          that.curWindow.other.id,
                          that.curWindow.other
                        );
                      }
                      console.log(that.curWindow);
                      that.$nextTick(() => {
                        that.curWindow.visible = true;
                      });
                    }
                  }
                });
          }
          let aaa = {
            position: [poi.lng, poi.lat],
            category: category,
            other: poi.other ? poi.other : poi,
            visible: false
          };
          _this.windows.push(aaa);
        });
        let center = {
          lng: lngSum / pois.length,
          lat: latSum / pois.length
        };
        console.log(this.curWindow);
        // this.windows = [...this.windows, ...windows];
        this.center = [center.lng, center.lat];
      }
    },
    getBySiteId(id, obj) {
      let _this = this;
      new Promise((resolve, reject) => {
        getBySiteId(id).then(
          res => {
            _this.$set(_this.curWindow.other, 'list', res.data.splice(0,5));
          },
          error => {
            //  _this.errorMsg(error.toString(), 'error')
            return;
          }
        );
      });
    },
    checkAll (item) {
        item.select = !item.select;
         this.category = item.code;
        this.categoryStr = item.name;
        if (item.select) {
            if (this.curWindow) {
            this.curWindow.visible = false;
            }
            this.category = item.code;
            let data = {
            // area: this.currentAddressObj.province + this.currentAddressObj.district,
            area: "东城区",
            current: 1,
            key: "",
            //   size: 20,
            type: item.code
            };
            this.allSearchList.push(data);
            this.getZfjgLawSupervise(data, this.category);
        } else {
            let _this = this;
            let _index = _.findIndex(this.allSearchList, function (chr) {
            return chr.type === item.code;
            });
            if (_index > -1) {
            this.allSearchList.splice(_index, 1);
            this.markers.splice(0, this.markers.length);
            this.windows.splice(0, this.windows.length);
            this.allSearchList.forEach((v, i) => {
                _this.getZfjgLawSupervise(v, v.type);
            });
            }
        }
    },
    searchByTab(item) {
      // this.markers.splice(0, this.markers.length);
      item.select = !item.select;
      if (item.select && this.allSearchList.length > 5) {
        item.select = false;
        // debugger;
        this.errorMsg(`至多选择5条数据`, "error");
        return
      }
      this.categoryStr = item.name;
      this.category = item.code;
      if (item.select) {
        if (this.curWindow) {
          this.curWindow.visible = false;
        }
        this.category = item.code;
        let data = {
          // area: this.currentAddressObj.province + this.currentAddressObj.district,
          area: "东城区",
          current: 1,
          key: "",
        //   size: 20,
          type: item.code
        };
        this.allSearchList.push(data);
        this.getZfjgLawSupervise(data, this.category);
      } else {
        let _this = this;
        let _index = _.findIndex(this.allSearchList, function (chr) {
          return chr.type === item.code;
        });
        if (_index > -1) {
          this.allSearchList.splice(_index, 1);
          this.markers.splice(0, this.markers.length);
          this.windows.splice(0, this.windows.length);
          this.allSearchList.forEach((v, i) => {
            _this.getZfjgLawSupervise(v, v.type);
          });
        }
      }

      if (this.category == '4') {
          this.drawer1 = false;
          this.drawer = false;
          this.updateDrawer1();
          this.updateDrawer();
      }
    },
    searchAll(pois) {
      this.markers.splice(0, this.markers.length);
      if (this.curWindow) {
        this.curWindow.visible = false;
      }
      if (this.category == -1) {
        this.errorMsg(`总计${pois.length}条数据`, "success");
        this.onSearchResult(pois, this.category, 0);
        // 搜索地图位置
      } else {
        // this.currentAddressObj.province + this.currentAddressObj.district
        let data = {
          area: "",
          current: 1,
          key: this.$refs.searchAmapBox.keyword,
          size: 20,
          type: this.category
        };
        this.getZfjgLawSupervise(data, this.category);
      }
    },
    getZfjgLawSupervise(data, category) {
      let _this = this;
      new Promise((resolve, reject) => {
        getZfjgLawSupervise(data).then(
          res => {
            // resolve(res);
            let resultList = [];
            if (res.data && res.data.records.length == 0) {
              _this.errorMsg("暂无数据", "error");
              // return
            } else {
              _this.errorMsg(
                `查询到${res.data.records.length}条数据`,
                "success"
              );
            }
            res.data.records.forEach((item, i) => {
              let position = item.position.split(",");
              let lng = parseFloat(position[0]);
              let lat = parseFloat(position[1]);
              resultList.push({
                address: item.address,
                distance: null,
                id: item.id,
                lat: lat,
                lng: lng,
                location: {
                  O: lng,
                  P: lat,
                  lat: lat,
                  lng: lng
                },
                name: item.nickName,
                shopinfo: "",
                tel: "",
                type: _this.category,
                other: item
              });
            });

            _this.onSearchResult(resultList, category, _this.windows.length);
          },
          error => {
            //  _this.errorMsg(error.toString(), 'error')
            return;
          }
        );
      });
    },
    getOrganTree () {
        let _this = this;
       new Promise((resolve, reject) => {
        getOrganTree(BASIC_DATA_SYS.lawSupervise).then(
          res => {
            let dataArray = res.data;
            dataArray.forEach((item,i)=>{
                addChildren(item);
            })
            function addChildren(item) {

                item.icon = item.icon?item.icon:'icon_jc1';
                if (item.children&&item.children.length>0 ) {
                    item.children.splice(0,0,{
                        id: item.id,
                        pid:item.pid,
                        label: '执法人员',
                        icon: 'icon_jc11',
                    },{
                        id: item.id,
                        pid:item.pid,
                        label: '执法车辆',
                        icon: 'icon_cl11'
                    },{
                        id: item.id,
                        pid:item.pid,
                        label: '执法船舶',
                        icon: 'icon_cb11'
                    });
                    let len = item.children.length;
                    while (len > 0) {
                        item.children.forEach((obj,i)=> {
                            addChildren(obj);
                            len--;
                        })
                    }
                } else if (['执法人员','执法车辆', '执法船舶'].indexOf(item.label) == -1){
                    // debugger;
                   item.children = [{
                         id: item.id,
                        pid:item.pid,
                        label: '执法人员',
                        icon: 'icon_jc11',
                    },{
                        id: item.id,
                        pid:item.pid,
                        label: '执法车辆',
                        icon: 'icon_cl11'
                    },{
                        id: item.id,
                        pid:item.pid,
                        label: '执法船舶',
                        icon: 'icon_cb11'
                    }];
                }
                // return item
            }
            _this.data = dataArray;
            debugger;
          },
          error => {
            //  _this.errorMsg(error.toString(), 'error')
            return;
          }
        );
      });
    }
  },
  mounted() {
     this.$nextTick(() => {
        //  debugger;
         window.PhoneCallModule.initialize();
        if (!window.PhoneCallModule.getRegistered()) {
            window.PhoneCallModule.sipRegister();
        }
     })
    this.lunarDate = lunarDate();
    this.getOrganTree();
    //   this.updateDrawer();
  },
  mixins: [lawSuperviseMixins, mixinsCommon],
  components: {
    // echarts,
    externalVideoBtns
  },
   watch: {
        makePhoneStatus (val, oldVal) {
            this.videoDoing = null;
        }
    },
    computed: {
        ...mapGetters(["makePhoneStatus", "doing"])
    }
};
</script>

<style lang="scss" src="@/assets/css/lawSupervise/lawSupervise.scss"></style>
<style src="@/assets/css/basicStyles/error.scss" lang="scss"></style>
