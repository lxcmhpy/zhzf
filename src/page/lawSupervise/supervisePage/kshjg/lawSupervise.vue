<template>
  <!--  执法监管首页 by-jingli -->
  <div id="lawSupervise" ref="lawSupervise" class="mainBox" :class="{'lawScreenFull':lawScreenFull}">
    <el-carousel :interval="8000" indicator-position="none" height="28px" v-if="gjclList" style="position:absolute;top:0px;line-height:28px;width:100%;font-size:12px;color:#20232B">
        <el-carousel-item v-for="(row,index) in gjclList" :key="index.toString()">
            <div style="background:#F9DAAC;padding-left:17px;">
                <div class="lawHoverTitle" @click="updateDrawer1()" >
                        <span><i class="el-icon-info red"></i>&nbsp;&nbsp;</span>
                        <span class="bgCgray">{{row&&row.checkTime?row.checkTime:''}}  </span>
                        <span class="redC">{{row.vehicleNumber}}  </span>
                        <span class="bgCgray f12">超限率:<span class="blueC f18">{{row.overload.toFixed(2)}}% </span></span>
                        <!-- <span><span class="bgCgray">站点：</span>{{row.siteName}}</span> -->
                </div>
            </div>
        </el-carousel-item>
        <!-- <el-carousel-item :key="1">
            <div style="background:#F9DAAC;padding-left:17px;">
                <i class="el-icon-info red"></i>&nbsp;&nbsp;&nbsp;
                <span>北京市发布大风蓝色预警，局部伴有扬沙，请相关单位注意。</span>
            </div>
        </el-carousel-item>
         <el-carousel-item :key="2">
            <div style="background:#F9DAAC;padding-left:17px;">
                <i class="el-icon-info red"></i>&nbsp;&nbsp;&nbsp;
                <span>{{lunarDate}} </span>
            </div>
        </el-carousel-item> -->
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
                    <!-- <div class="num">{{curWindow.other.enforceNo}}</div> -->
                    <div class="num">{{curWindow.other.provincial ? curWindow.other.provincial : curWindow.other.ministerial ? curWindow.other.ministerial : curWindow.other.maritime}}</div>
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
                  <p>机构名称：{{curWindow.other.organName}}</p>
                  <p>联系方式：{{curWindow.other.mobile}}</p>
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
                 <div class="title" style="color: #fff;font-weight: 200;">{{curWindow.other.name}}</div>
                <!-- <span></span> -->
                <!-- <div class="right">{{curWindow.other.enforceNo}}</div> -->
              </div>
               <!-- <div class="right">
                    <div class="status">
                        <i class="iconfont law-mobile-phone"></i>
                    </div>
                    <p>在线</p>
                </div> -->
              <div class="flexBox">
                <div class="con">
                  <p>地址：{{curWindow.other.address}}</p>
                  <p>联系人：{{curWindow.other.contactor}}</p>
                  <p>联系方式：{{curWindow.other.telephone}}</p>
                </div>
                <div class="status">
                  <!-- <i class="iconfont law-mobile-phone"></i>
                  <p>{{curWindow.other.status}}</p> -->
                </div>
              </div>
             <div class="btns">
                <div class="flex-title"><img  :src="'./static/images/img/lawSupervise/icon_duiwu.png'">人员在线情况</div>
                <span  class="phoneBtn greenBg" @click="handleNodeClick(it)" :class="{'lineh': it.nickName.length>5}" v-for="(it,j) in curWindow.other.users" :key="'s'+j">{{it.nickName}}</span>
                <!-- <span  class="phoneBtn blueBg " >···</span> -->
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
                    <div class="title" style="color: #fff;font-weight: 200;">{{curWindow.other.vehicleNumber}}<span class="right" style="margin-top:0px;">在线</span></div>

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
                    <div class="title" style="color: #fff;font-weight: 200;">{{curWindow.other.shipNumber}}<span class="right" style="margin-top:0px;">在线</span></div>
                    <span></span>
                    <!-- <div class="right">{{curWindow.other.enforceNo}}</div> -->
                </div>
                <div class="flexBox">
                    <div class="con">
                        <p>{{curWindow.other.organName}}</p>
                    </div>
                </div>
              
                <externalVideoBtns :doing="videoDoing"  @updateMakePhoneStatus="updateMakePhoneStatus" :curWindow="curWindow"></externalVideoBtns>

            </div>
            <!-- 4非现场治超检测 -->
            <div v-else-if="curWindow.category == 4">
              <div>
                  <el-carousel ref="carousel" height="135px" indicator-position="outside" >
                            <el-carousel-item v-for="(item,index) in curWindow.other.imageList" :key="(index +1).toString()">
                                <img  width="100%" height="135px" :src="pHost+'/'+item.storageId">
                            </el-carousel-item>
                        </el-carousel>
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
                      {{time | formatDate}} &nbsp;
                      超限{{curWindow.other.cxchl}} &nbsp;
                      黑名单{{curWindow.other.blackList}}
                    <span class="right" @click="routerXsByName(curWindow.other.name)">详情</span>
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
                      <span>否</span>
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

          </div>
          <div :class="'lawWindowStyle-po'" :style="{width: pointWidth + 'px' }">
            <!-- 0执法人员 -->
            <div v-if="curWindow.category == 0">
              <div class="lawWindowTitle" style="padding:0">
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
                 <div class="title" :title="curWindow.other.name">{{curWindow.other.name}}</div>
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
                <div class="title" :title="curWindow.other.nickName">{{curWindow.other.nickName}}</div>
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
                @hide="hidePopover"
                >
                <div class="drop-down-menu" >
                  <el-cascader
                    ref="areaCascader"
                    :options="areaList"
                    @active-item-change="handleSelect"
                    @change="handleChange"
                    :props="areaProps"
                    expand-trigger="hover"
                    filterable
                    change-on-select
                  ></el-cascader>
                    <!-- <el-input class="no-border w160" value="" placeholder="城市名称，回车搜索"></el-input>
                    <el-menu :default-active="activeIndex"  @select="handleSelect" unique-opened :collapse="true">
                        <el-submenu :index="`${index}`" v-for="(item,index) in areaList" :key="`${index}`">
                                <template slot="title">{{item.titleName}}</template>
                                <el-menu-item-group :index="child.titleName" v-for="(child,i) in item.children" :key="i" >{{child.titleName}}</el-menu-item-group>
                        </el-submenu>
                    </el-menu> -->
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
                v-model="popoverVisible"
                >
                <div class="drop-down-menu">
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
                <div class="drop-down-menu">
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
        <!-- updateDrawer -->
        <div class="drawerBtn" v-show="category == 4" @click="openDrawer">
          <i class="el-icon-arrow-right"></i>
        </div>
        <!-- v-if="category != 4"  -->
        <el-drawer modal-append-to-body :direction="direction" size="450px"
           customClass="amap-drawer" :wrapperClosable="false" :withHeader="false" :modal="false" :visible.sync="drawer">
          <div class="drawerBtn" @click="drawer=false">
            <i class="el-icon-arrow-right"></i>
          </div>
          <!-- category != 4 -->
          <div class="amap-main-content" style="padding:0px 17px" v-show="false">

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
<!-- v-show="category == 4" -->
          <div class="amap-main-content" style="padding:0px" >

                    <div class="echarts-box" style="width:auto">
                        <div class="title" @click="status4 = !status4" style="margin:20px">
                            <img :src="'./static/images/img/lawSupervise/icon_che3.png'">&nbsp;
                            告警车辆
                            <i v-if="status4 == true" class="iconfont law-youyou right"></i>
                            <i v-if="status4 == false" class="iconfont law-zuozuo right" ></i>
                        </div>

                        <el-collapse-transition>
                            <div v-show="status4">
                              <ul class="addHoverBg" style="width: 100%;height: auto;">
                                <li v-for="(row,index) in gjclList" :key="index" @click="positionEvent1(row)">
                                  <el-popover
                                    placement="left-start"
                                    trigger="hover"
                                    >
                                    <div class="leftTabelHoverDiv">
                                        <div class="lawHoverTitle">
                                            <div class="gj-title">{{row.vehicleNumber}}</div>
                                            <div class="cxl" >
                                                <span class="blueC f18">{{row.overload.toFixed(2)}}%</span><br>
                                                <span class="bgCgray f12">超限率</span>
                                            </div>
                                        </div>
                                        <div class="lawHoverContent">
                                            <div class="flexBox">
                                                <p><span class="bgCgray">过检时间：</span>{{row&&row.checkTime?row.checkTime.split(' ')[1]:''}}</p>
                                                <!-- <p><span class="bgCgray">重点监管：</span><span class="redC">是</span></p> -->
                                                <p><span class="bgCgray">重点监管：</span><span>否</span></p>
                                            </div>
                                            <div class="flexBox">
                                                <p><span class="bgCgray">历史告警（次）：</span>{{row.lscc}}</p>
                                                <!-- <p><span class="bgCgray">检测（次）：</span>{{gjObj.mobile}}</p>
                                                <p><span class="bgCgray">状态：</span>{{gjObj.status}}</p> -->
                                            </div>
                                            <div class="flexBox">
                                                 <p><span class="bgCgray">总重（kg）：</span>{{row.totalWeight}}</p>
                                                <p><span class="bgCgray">超重（kg）：</span>{{row.overweight}}</p>
                                            </div>
                                            <div class="flexBox">
                                                <p><span class="bgCgray">站点：</span>{{row.siteName}}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div  slot="reference">
                                          <div class="leftTabelHoverDiv" style="padding: 0 20px;">
                                              <div class="lawHoverTitle">
                                              <div class="cxl" >
                                                  <span class="blueC f18">{{row.overload.toFixed(2)}}%</span><br>
                                                  <span class="bgCgray f12">超限率</span>
                                              </div>
                                              <div class="gj-con">
                                                  <!-- <span :class="{'redC': index==1,'orangeC':index==2}">{{row.vehicleNumber}}</span><span class="bgCgray" style="float:right">{{row&&row.checkTime?row.checkTime.split(' ')[1]:''}}</span> -->
                                                  <span>{{row.vehicleNumber}}</span><span class="bgCgray" style="float:right">{{row&&row.checkTime?row.checkTime.split(' ')[1]:''}}</span>
                                                  <p><span class="bgCgray">站点：</span>{{row.siteName}}</p>
                                              </div>
                                              </div>
                                          </div>
                                    </div>
                                  </el-popover>
                                </li>
                              </ul>
                                 <div style="text-align: center;"><el-button type="text" @click="routerXs">查看更多</el-button></div>
                            </div>
                        </el-collapse-transition>

                    </div>
                <div class="echarts-box" >
                     <div class="title" @click="status5 = !status5">
                         <img :src="'./static/images/img/lawSupervise/icon_zhifadian.png'">&nbsp;
                        非现场执法点
                        <i v-if="status5 == true" class="iconfont law-youyou right"></i>
                        <i v-if="status5 == false" class="iconfont law-zuozuo right" ></i>
                    </div>
                     <el-collapse-transition>
                        <div v-show="status5">
                            <ul style="width: 100%;height: auto;" slot="reference">
                                <li v-for="(row,index) in zfdList" :key="index" @click="positionEvent(row, 4)" >
                                    <div class="leftTabelHoverDiv" style="padding: 0px;">
                                        <div class="lawHoverTitle">
                                        <div class="cxl" >
                                            <span class="f18 redC" :class="{'greenC': index ===0}">{{index === 0? '正常': '异常'}}</span><br>
                                            <span class="bgCgray f12">状态</span>
                                        </div>
                                        <div class="gj-con">
                                              <p>{{row.name}}</p>
                                            <div class="flexBox">
                                                <p><span class="bgCgray">告警（次）：</span>{{row.cxchl}}</p>&nbsp;&nbsp;
                                                <p><span class="bgCgray">过检（次）：</span>{{row.gjzl}}</p>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                     </el-collapse-transition>
                </div>
            
          </div>
        </el-drawer>
        
      </div>
     
      <!-- 底部浮动栏 -->
        <div class="amap-position" :class="'amap-' + direction1 + '-box'" v-if="false">
            <div class="drawerBtn" @click="updateDrawer1()">
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
    <div class="amap-search" @mousemove="toolShow = true" @mousedown="curWindow = null" @mouseleave="toolShow = false">
        <!-- ref="searchAmapBox"  -->
        <!-- <el-amap-search-box class="search-box-blue" :search-option="searchOption" :on-search-result="searchAll" >
        </el-amap-search-box> -->
        <div class="search-box-blue" style="z-index:10;display:flex;">
            <el-input class="w-390" clearable
                :placeholder="placeholder"
                v-model="filterText">
            </el-input>
            <el-button  icon="el-icon-search" @click="searchAllByBtn"></el-button>
        </div>
        <div class="amap-tool-search" v-show="toolShow" >
            <el-button size="medium" class="tabBtn" :class="{'isCheck': isCheck}" @click="searchSwitch(true)">
                <img :src="'./static/images/img/lawSupervise/icon_renyuan.png'" />
                <span class="name">执法人员</span>
            </el-button>
             <el-button size="medium" class="tabBtn" :class="{'isCheck': !isCheck}" @click="searchSwitch(false)">
                <img :src="'./static/images/img/lawSupervise/icon_jigou.png'" />
                <span class="name">执法机构</span>
            </el-button>
            <div class="amap-tool-search" style="top:96px;padding: 22px;margin-bottom: 22px;">
                    <!--  -->
                    <!-- expand-on-click-node -->
                <el-tree
                    v-if="showTree"
                    :data="data"
                    :props="defaultProps"
                    accordion
                    ref="treeFilter"
                    :default-expand-all="expandTree"
                    :filter-node-method="filterNode"
                    @node-click="handleNodeClick">
                     <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span><img class="tree-node-icon" :src="'./static/images/img/lawSupervise/'+data.icon+'.png'">{{data.label}}</span>
                    </span>
                        <!-- <span class="custom-tree-node">
                            <span><img class="tree-node-icon" :src="'./static/images/img/lawSupervise/icon_jc1.png'">dd</span>
                        </span> -->
                </el-tree>
                <ul v-if="!showTree">
                    <li v-for="(item,index) in ryList" :key="index" style="display:flex;justify-content:space-between;" @click="handleNodeClick(item)">
                        <span v-if="isCheck">{{item.nickName}} </span>
                        <span v-if="isCheck"> {{item.organName}}</span>
                        <span v-if="!isCheck"> {{item.name}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    
  </div>
</template>
<script>
import Vue from "vue";
import iLocalStroage from '@/common/js/localStroage';
import { mapGetters } from "vuex";
// require("@/common/js/call.js");
import echarts from "echarts";
// import "echarts/lib/chart/graph";
import { lawSuperviseObj, yjObj } from "@/page/lawSupervise/supervisePage/kshjg/echarts/echartsJson.js";
import { getZfjgLawSupervise, getBySiteId, getById, getOrganTree, getOrganDetail, getUserById,organTreeByCurrUser,queryAlarmVehiclePage,findImageByCaseId,getCountry} from "@/api/lawSupervise.js";
import {getOrganDetailApi,getOrganIdApi}  from "@/api/system.js";
import { lawSuperviseMixins, mixinsCommon } from "@/common/js/mixinsCommon";
import externalVideoBtns from '../../componentCommon/externalVideoBtns.vue';
import lunarDate from '@/common/js/lunarDate.js';
import {BASIC_DATA_SYS} from '@/common/js/BASIC_DATA.js';
// import {dataJson} from './echarts/dataJson.js';

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
        showTree: true,
        filterText: '',
        lunarDate: '',
        status5:true,
        status4:true,
        placeholder:"搜执法人员、执法机构",
        isCheck: true,
        toolShow: false,
        pointWidth: 200,
        checked: false,
        radioVal: '全选',
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        data: null,
      areaObj: '',
      activeIndex:'',
      areaList: [
      ],
      areaProps: {
        label: 'name',
        value:'adCode'
      },
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
                  console.log(result.addressComponent)
                  self.currentAddressObj = result.addressComponent;
                  self.lng = result.position.lng;
                  self.lat = result.position.lat;
                  self.center = [self.lng, self.lat];
                  self.loaded = true;
                  self.areaObj = self.currentAddressObj.city
                  self.$nextTick();
                  self.getCountry('0',self.currentAddressObj.city)
                }else{
                  o.getCityInfo((status, result) => {
                    if (result && result.city) {
                      self.currentAddressObj = result;
                      self.lng = result.center[0];
                      self.lat = result.center[1];
                      self.center = result.center;
                      self.loaded = true;
                      self.areaObj = self.currentAddressObj.city
                      self.$nextTick();
                      self.getCountry('0',self.currentAddressObj.city)
                      self.zoom = 11
                    }else{
                      self.getCountry('0','')
                      self.$message({
                        type: "error",
                        message:result.message
                      });
                    }
                  });
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
      fxcObj: null,
      expandTree:false,
      userInfo: null,
      ryList: null,
      time:Date.parse(new Date()),
      popoverVisible:false,
      pHost:''
    };
  },
  filters: {
    formatDate: function (value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? ('0' + MM) : MM;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      let m = date.getMinutes();
      m = m < 10 ? ('0' + m) : m;
      let s = date.getSeconds();
      s = s < 10 ? ('0' + s) : s;
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
    }
  },
  methods: {
    getCountry (pCode,city) {
      let params = pCode;
      if(city){
        params+='/'+city
      }
      let _this = this
      getCountry(params).then(
          res => {
            console.log('筛选',res)
            res.data.forEach(p=>{
              if(p.childrenCount>0){
                p.children=[]
              }
            })
            _this.areaList = res.data
      })
    },
    filterNode (value, data, node) {
        let _this =this;

        if (value === "") {
            this.expandTree = false;
            return data;
        }
        // if (this.isCheck) {
        //     // if (data.id == value.organId && data.label==="执法人员") {
        //     //     this.toolShow = true;
        //     //     //  this.checkAll(this.tabList[0].children[0])
        //     //     if (data.children.length == 0) {
        //     //         const newChild = { id: value.id,icon:'icon_jc11',pid:value.organId, label: value.nickName, position:value.position, children: [] };
        //     //         this.$set(data.children,data.children.length, newChild);
        //     //     }
        //     //     // if (!data.children) {
        //     //     // }
        //     //     return true;
        //     // }
        //     return false;
        // } else {
        //     }
            return data.label.indexOf(value) > -1;
    },
    searchSwitch (flag) {
        this.placeholder = flag ? '搜执法人员':'搜执法机构';
        this.isCheck = flag;
    },
    searchAllByBtn () {
        if (this.filterText === "") {
            this.showTree = true
            this.organTreeByCurrUser(this.userInfo.organId);
        } else {
            let params = {
                key: this.filterText,
                    organId: this.userInfo.organId,
                    type: this.isCheck ? 0: 1
                }
            let _this = this;
            new Promise((resolve, reject) => {
                getOrganTree(params).then(
                    res => {
                      console.log('筛选',res)
                        _this.showTree = false;
                        _this.ryList = res.data;

                })
            })

            // if (this.isCheck) {


            //     // 人员
            // } else {
            //     this.showTree = true
            //     // 机构
            //     this.$refs.treeFilter.filter(this.filterText);
            // }
        }


    },
    callName(code) {
        this.doing = '2';

        if (!window.PhoneCallModule.getRegistered()) {
            // window.PhoneCallModule.sipRegister();
            let displayName = 'ecds05';
            let privateIdentity ='100006';
            let password = '1234';
            window.PhoneCallModule.sipRegister(displayName,privateIdentity,password);

        }
        // debugger;
        if (code == '李玉明') {
            window.PhoneCallModule.sipVideoCall('100013','app02');
        } else if(code == '赵一鸣') {
            window.PhoneCallModule.sipVideoCall('100008','pad01');
        }
        this.updateMakePhoneStatus('2');
    },
    positionEventEnter (row) {
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
        debugger;
        let _this = this;
        if (this.radioVal == '全选') {
            this.radioVal = '取消全选';
            this.tabList[0].children.forEach((item)=>{
              if(!item.select) {
                  item.select = !item.select;
                  _this.category = item.code;
                  _this.categoryStr = item.name;
                  if (_this.curWindow) {
                  _this.curWindow.visible = false;
                  }
                  _this.category = item.code;
                  let data = {
                    key: "",
                    type: item.code
                  };
                  _this.allSearchList.push(data);
                  _this.getZfjgLawSupervise(data, _this.category);
              }
            })
           
        } else {
            this.radioVal = '全选';
            this.tabList[0].children.forEach((item)=>{
              item.select = !item.select;
            })
            _this.allSearchList.splice(0, _this.allSearchList.length);
                    _this.markers.splice(0, _this.markers.length);
                    _this.windows.splice(0, _this.windows.length);
        }

    },
    handleChange(node){
      let data = this.$refs['areaCascader'].getCheckedNodes()[0].data;
      this.currentAddressObj = data;
      let position=data.center? data.center.split(','):['',''];
      this.lng=parseFloat(position[0]);
      this.lat=parseFloat(position[1]);
      this.center = [this.lng, this.lat];
      this.loaded = true;
      this.areaObj = data.name;
      if(data.grade==='country'){
        this.zoom = 5
      }else if(data.grade==='province'){
        this.zoom = 7
      }else if(data.grade==='city'){
        this.zoom = 11
      }else if(data.grade==='district'){
        this.zoom = 13
      }
      this.$nextTick();
      this.$refs.areaCascader.dropDownVisible = false;
    },
    hidePopover(){
      this.$refs.areaCascader.dropDownVisible = false;
    },
    handleSelect (node) {
      let data = this.$refs['areaCascader'].panel.getNodeByValue(node[node.length-1]).data;
      if(data.children.length==0){
        getCountry(data.adCode).then(
          res => {
            res.data.forEach(p=>{
              if(p.childrenCount>0){
                p.children=[]
              }
            })
            data.children = res.data
          }
        )
      }
    },
    personClick(node,resultList) {
      let position=node.propertyValue? node.propertyValue.split(','):['',''];
      let lng=parseFloat(position[0]);
      let lat=parseFloat(position[1]);
      resultList.push({
        address: node.address,
        distance: null,
        id: node.id,
        lat: lat,
        lng: lng,
        icon: 'icon_jc11',
        pid: node.organId,
        location: {
          O: lng,
          P: lat,
          lat: lat,
          lng: lng
        },
        name: node.name,
        label: node.nickName,
        position: [lng,lat],
        shopinfo: '',
        tel: '',
        type: '0',
        other: node
      });
      this.onSearchResult(resultList,0,0);
    },
    handleNodeClick (node) {
        this.markers.splice(0, this.markers.length);
        this.tabList[0].children.forEach((item)=>{
            item.select = false;
        })
        this.allSearchList.splice(0, this.allSearchList.length);
        let _this = this;
        // this.radioVal = '全选';
        //执法人员或者查询执法人员后选择执法人员
        if ((this.isCheck && !node.icon) || (node.icon === 'icon_jc11' && node.label === '执法人员')) {
            let resultList = [];
            if(!node.icon){//查询执法人员后选择执法人员
                this.personClick(node,resultList);
                // _this.toolShow = true;
                // _this.pointWidth = 150;
            }else{//执法人员
              let params = {
                  name: '',
                  organId: node.id,
                  type: 0
              }
              new Promise((resolve, reject) => {
                  // getOrganIdApi({id: node.id}).then(
                  getOrganTree(params).then(
                      res => {
                          // _this.showTree = false;
                          console.log('执法人员',res)
                          let nodeChildren = [];
                          res.data.forEach((v,i)=>{
                            let data = v
                            data.pid=v.organId
                            data.label=v.nickName
                            data.icon='icon_jc11'
                              nodeChildren.push(data)
                              let position = v.propertyValue ? v.propertyValue.split(','):['',''];
                              let lng = parseFloat(position[0]);
                              let lat = parseFloat(position[1]);
                              resultList.push({
                                  address: v.address,
                                  distance: null,
                                  id: v.id,
                                  lat: lat,
                                  lng: lng,
                                  icon: 'icon_jc11',
                                  // icons: 'ry',
                                  pid: v.organId,
                                  location: {
                                      O: lng,
                                      P: lat,
                                      lat: lat,
                                      lng: lng
                                  },
                                  name: v.name,
                                  label: v.nickName,
                                  // position: v.propertyValue,
                                  position: [lng, lat],
                                  shopinfo: '',
                                  tel: '',
                                  type: '0',
                                  other: v
                              })
                          })
                          node.children = nodeChildren
                          this.category = 0;
                          _this.onSearchResult(resultList, 0,0);
                          _this.errorMsg(`总计${res.data.length}条数据`, 'success');
                          // _this.toolShow = true;
                          // _this.pointWidth = 150;
                  })
              })
            }
        }
        //执法人员下的具体人员
        else if(node.icon === 'icon_jc11' && node.label !== '执法人员'){
          let resultList = [];
          this.personClick(node,resultList)
        } 
        //机构
        else if (node.icon === 'icon_jc1') {
             this.category = 1;
             let len = 0;
            new Promise((resolve, reject) => {
                getOrganDetailApi({id:node.id}).then(
                    res => {
                        // _this.showTree = false;
                            let resultList = [];
                            let v = res.data;
                            let position = node.propertyValue ? node.propertyValue.split(','):['',''];
                            let lng = parseFloat(position[0]);
                            let lat = parseFloat(position[1]);
                            // let lng = v.longitude?v.longitude: '';
                            // let lat = v.latitude?v.latitude: '';
                            len = v.name.length > len ? v.name.length : len;
                            resultList.push({
                                address: v.address,
                                distance: null,
                                id: v.id,
                                lat: lat,
                                lng: lng,
                                icon: 'icon_jc11',
                                // icons: 'ry',
                                pid: v.organId,
                                location: {
                                    O: lng,
                                    P: lat,
                                    lat: lat,
                                    lng: lng
                                },
                                name: v.name,
                                label: v.nickName,
                                // position: v.propertyValue,
                                position: [lng, lat],
                                shopinfo: '',
                                tel: '',
                                type: '1',
                                other: v
                            })
                        _this.onSearchResult(resultList, 1,0);
                        _this.errorMsg(`总计1条数据`, 'success');
                        // _this.toolShow = true;
                        // _this.pointWidth = len * 24;
                    })
                })

          }else if (node.icon === 'icon_cl11') {
            if(node.label === '执法车辆'){
              this.handleNode(node,{
                key: '',
                size: 20,
                type: 2
              }, 2);
            }else{
              this.location(node,'-1',2);
            }
          } else if (node.icon === 'icon_cb11') {
            if(node.label === '执法船舶'){
              this.handleNode(node,{
                  key: '',
                  size: 20,
                  type: 3
              }, 3);
            }else{
              this.location(node,'-1',3);
            }
          }
          //查询机构后选择机构
          else if (node.propertyValue){
            this.location(node,'-1',1);
        }
        
    },
    location(node,locationType,category) {
      let resultList=[];
      let position=node.propertyValue? node.propertyValue.split(','):['',''];
      let lng=parseFloat(position[0]);
      let lat=parseFloat(position[1]);
      resultList.push({
        address: node.address,
        distance: null,
        id: node.id,
        lat: lat,
        lng: lng,
        location: {
          O: lng,
          P: lat,
          lat: lat,
          lng: lng
        },
        name: node.name,
        shopinfo: '',
        tel: '',
        type: locationType,
        other: node
      });
      this.onSearchResult(resultList,category,0);
    },
    handleNode(node,data,category){
      data.organId = node.id;
      let _this = this;
      new Promise((resolve, reject) => {
        getZfjgLawSupervise(data).then(
          res => {
            // resolve(res);
            let resultList = [];
            if (res.data && res.data.length == 0) {
              _this.errorMsg("暂无数据", "error");
              // return
            } else {
              _this.errorMsg(
                `查询到${res.data?res.data.length:0}条数据`,
                "success"
              );
            }
            let nodeChildren = []
            res.data.forEach((item, i) => {
              let nodeData = item
              nodeData.pid=node.id
              nodeData.label=category==2?item.vehicleNumber:item.shipNumber
              nodeData.icon=category==2?'icon_cl11':'icon_cb11'
              nodeData.id=item.id
              nodeData.name = category==2?item.vehicleNumber:item.shipNumber
              nodeChildren.push(nodeData)
            //   let position = item.position.split(",");
            //   let lng = parseFloat(position[0]);
            //   let lat = parseFloat(position[1]);
            let position = item.propertyValue.split(",");
              let lng = parseFloat(position[0]);
              let lat = parseFloat(position[1]);
              item.nickName = item.nickName?item.nickName:item.name;
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
            node.children = nodeChildren
            _this.onSearchResult(resultList, category, _this.windows.length);
            // _this.toolShow = true;
            // _this.pointWidth = 180;
          },
          error => {
            //  _this.errorMsg(error.toString(), 'error')
            return;
          }
        );
      });
    },
    getOrganDetail (id) {
        return new Promise((resolve, reject) => {
            getOrganDetail(id).then(
                res => {
                    resolve(res.data);
                },
                error => {

                }
            )
        })
    },
    // routerXsBySiteName (siteName) {
    //   this.$router.push({
    //       name: 'law_supervise_offSiteManage',params:{siteName:siteName}
    //   })
    // },
    routerXs() {
      this.$router.push({
          name: 'law_supervise_offSiteManage'
      })
    },
    routerXsByName (name) {
         this.$router.push({
                    name: 'law_supervise_offSiteManage',
                    params: {
                        siteName: name
                    }
                });

    },
    routerXsDetail (row) {
        // debugger;
         this.$router.push({
                    name: 'law_supervise_examineDoingDetail',
                    params: {
                        status: '0',
                        tabTitle: '线索详情',
                        offSiteManageId: row.id
                    }
                });

    },
    positionEvent (row, category) {
        this.category == 4;
        // this.curWindow.category = 4;
        // debugger;
        this.markers.splice(0, this.markers.length);
        if (this.curWindow) {
            this.curWindow.visible = false;
        }
        this.getById(category, row.id);
        // this.allSearchList.push(data);
        // this.getZfjgLawSupervise(data, this.category);
        // this.routerXsDetail();
    },
    positionEvent1 (row) {
        this.routerXsDetail(row)
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
                        let position = res.data.propertyValue ? res.data.propertyValue.split(','):['',''];
                        let lng = parseFloat(position[0]);
                        let lat = parseFloat(position[1]);
                        // _this.category = type;
                        resultList.push({
                            address: res.data.address,
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
                            name: res.data.name,
                            shopinfo: '',
                            tel: '',
                            type: type,
                            other: res.data
                        })
                    } else {
                        _this.errorMsg('暂无数据', 'error');
                    }

                    // _this.allSearchList.push(data);
                    // _this.getZfjgLawSupervise(data, this.category);
                    _this.onSearchResult(resultList, 4,  0)
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
        // this.drawer = !this.drawer;
        // this.drawer = true;
        // debugger;
        // if (this.category != 4) {
            // this.drawer = true;
            // if (this.drawer) {
                // }
        // }
            //   let _this = this;
            //   this.$nextTick(() => {
            //     var flowChart = echarts.init(document.getElementById("echartsBox1"));
            //     flowChart.setOption(_this.lawSuperviseObj.option);
            //     var flowChart1 = echarts.init(document.getElementById("echartsBox2"));
            //     flowChart1.setOption(_this.yjObj);
                // this.getRealTimeDataByLawSupervise();
            //   });
    },
    openDrawer () {
        this.drawer = true;
        this.updateDrawer()
    },
    updateDrawer1 (flag) {
        // debugger;
        // if (this.category == 4) {
        //     this.drawer1 = true;
        // } else {
        //     this.drawer1 = false;
        // }
        //  this.drawer1 = !this.drawer1 ;
         
        // this.getRealTimeDataByLawSupervise();
        this.searchPageAll(4, 'zfdList', flag);
        this.searchPageAllGJ(6, 'gjclList');
        this.category = 4;
        // this.searchByTab(this.tabList[1].children[0]);

    },
    searchPageAll (code, obj, flag) {
        // this.markers.splice(0, this.markers.length);
        if (this.curWindow) {
            this.curWindow.visible = false;
        }
        // 进入页面加载查询所有初始数据
        let data = {
                // area: this.currentAddressObj.province + this.currentAddressObj.district,
                // area: '',
                // current: 1,
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
                        // that[obj] = res.data.records.splice(0,5);
                        that[obj] = res.data.splice(0,5);
                        that.pointZFD(code,that.zfdList,flag);

                    },
                    error => {
                        //  _this.errorMsg(error.toString(), 'error')
                        return
                    })
            })
    },
    pointZFD (code, list, flag) {
      let resultList = [];
      list.forEach((item, i) => {
            let position = item.propertyValue ? item.propertyValue.split(','):['',''];
            let lng = parseFloat(position[0]);
            let lat = parseFloat(position[1]);
            // _this.category = type;
            resultList.push({
                address: item.address,
                distance: null,
                id:item.id,
                lat: lat,
                lng: lng,
                location: {
                    O: lng,
                    P: lat,
                    lat: lat,
                    lng: lng
                },
                name: item.name,
                shopinfo: '',
                tel: '',
                type: code,
                other: item
            })
        }) 

        // _this.allSearchList.push(data);
        // _this.getZfjgLawSupervise(data, this.category);
        if(flag){
          this.onSearchResult(resultList, 4,  this.windows.length);
          this.drawer = false;
        }else{
          this.drawer = true;
          this.onSearchResult(resultList, 4,  0);
        }
          
    },
    searchPageAllGJ (code, obj) {
        // 告警车辆
        if (this.curWindow) {
            this.curWindow.visible = false;
        }
        // 进入页面加载查询所有初始数据
        let that = this;
        new Promise((resolve, reject) => {
                queryAlarmVehiclePage({current:1}).then(
                    res => {
                        let resultList = [];
                        that[obj] = res.data.records.splice(0,5);
                    },
                    error => {
                        //  _this.errorMsg(error.toString(), 'error')
                            return
                    }
                )
            })
    },
    onSearchResult(pois, category, length) {
      if (length == 0) {
        this.windows.splice(0,this.windows.length);
      }
      // debugger;
      let latSum = 0;
      let lngSum = 0;
      let numG = 100;
      let leng = 0;
      if (pois.length > 0) {
        let _this = this;
        // let windows = []
        pois.forEach((poi, i) => {
          let { lng, lat } = poi;
          if(lng && lat) {
            leng++;
            lngSum += parseFloat(lng);
            latSum += parseFloat(lat);
          }
          
          let that = _this;
          if (category == -1) {
                that.zoom = 16;
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
                       _this.pointWidth = 180;
                      that.windows.forEach(window => {
                          window.visible = false;
                      });
                      // that.$set(that, 'curWindow', that.windows[i]);
                      let i_index = i;
                      console.log(that.curWindow);
                      that.$nextTick(() => {
                          that.curWindow = that.windows[i_index];
                          that.curWindow.visible = true;
                      });
                    }
                }
                });

          } else if (category == 4) {
                that.zoom = 6;
                numG = poi.name.substring(0,4);
                _this.markers.push({
                  position: [poi.lng, poi.lat],
                  other: poi.other,
                  visible: false,
                  template: `<span><img src="/static/images/img/lawSupervise/${
                    _this.categoryList[category + 1].className
                    }.png"><em style="position:absolute;top:7px;font-style:normal;left:5px;font-size: 12px; color: red;">${numG}</em></span>`,
                  // icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png',
                  // content: `<div class="prompt">${ poi.other.username }</div>`,
                  events: {
                    click() {
                       _this.pointWidth = 150;
                      that.windows.forEach(window => {
                        window.visible = false;
                      });
                      console.log(that.curWindow);
                      let i_index = i;
                      that.$nextTick(() => {
                        that.curWindow = that.windows[length + i_index];
                            // that.$set(that, 'curWindow', that.windows[length + i]);
                        if (category == 4) {
                            that.getBySiteName(
                              that.curWindow.other
                            );
                            that.getImageBySiteId(
                              that.curWindow.other
                            );
                            // debugger;
                        }
                        that.curWindow.visible = true;
                      });
                    }
                  }
                });
          } else {
              that.zoom = 16;
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
                      that.pointWidth = 180;
                      that.windows.forEach(window => {
                        window.visible = false;
                      });
                      console.log(that.curWindow);
                      let i_index = i;
                      that.$nextTick(() => {
                        that.curWindow = that.windows[length + i_index];
                        if (category == 4) {
                            that.getBySiteId(
                            that.curWindow.other.id,
                            that.curWindow.other
                            );
                        } else if(category == 0) {
                              _this.pointWidth = 150;
                              new Promise((resolve, reject) => {
                                  getOrganIdApi({id: that.curWindow.other.id}).then(
                                      res => {
                                        _this.$set(_this.curWindow.other, 'address', res.data.address);
                                    });

                              })
                        }else if(category == 1){
                            _this.pointWidth = that.curWindow.other.name.length * 24;
                            new Promise((resolve, reject) => {
                                  getOrganTree({name: '',organId:that.curWindow.other.id,type: 0}).then(
                                      res => {
                                        _this.$set(_this.curWindow.other, 'users', res.data);
                                    });

                              })
                        }
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
        // debugger;
        let center = {
          lng: lngSum / leng,
          lat: latSum / leng
        };
        console.log(this.curWindow);
        // this.windows = [...this.windows, ...windows];
        this.center = [center.lng, center.lat];
      }
    },
    getBySiteId(id, obj) {
      debugger
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
    getBySiteName(obj){
      debugger
      let _this = this;
      new Promise((resolve, reject) => {
        queryAlarmVehiclePage({current:1,size:5,siteName:obj.name}).then(
          res => {
            _this.$set(_this.curWindow.other, 'list', res.data.records);
          },
          error => {
            //  _this.errorMsg(error.toString(), 'error')
            return;
          }
        );
      });
    },
    getImageBySiteId(obj){
      debugger
      let _this = this;
      new Promise((resolve, reject) => {
        findImageByCaseId(obj.id).then(
          res => {
            _this.$set(_this.curWindow.other, 'imageList', res.data);
          },
          error => {
            //  _this.errorMsg(error.toString(), 'error')
            return;
          }
        );
      });
    },
    /* checkAll (item) {
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
            // area: "东城区",
            // current: 1,
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
    }, */
    searchByTab(item) {
        debugger;
        if (this.allSearchList.length == 0) {
        this.markers.splice(0, this.markers.length);
        }
      item.select = !item.select;
      if (item.select && this.allSearchList.length >= 5) {
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
        let data = {
          // area: this.currentAddressObj.province + this.currentAddressObj.district,
        //   area: "东城区",
        //   current: 1,
          key: "",
        //   size: 20,
          type: item.code
        };
        this.allSearchList.push(data);
         if (this.category == 4) {
           this.updateDrawer1(1);
           this.popoverVisible=false;
                // this.searchPageAllGJ(data, this.category);
        } else {
            this.getZfjgLawSupervise(data, this.category);
        }

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
    searchAll(pois) {
      debugger;
      this.markers.splice(0, this.markers.length);
      if (this.curWindow) {
        this.curWindow.visible = false;
      }
      if (this.category == -1) {
        //   debugger;
        // this.errorMsg(`总计${pois.length}条数据`, "success");
        // this.onSearchResult(pois, this.category, 0);
        // 搜索地图位置
      } else {
        // this.currentAddressObj.province + this.currentAddressObj.district
        let data = {
        //   area: "",
        //   current: 1,
          key: this.$refs.searchAmapBox.keyword,
          size: 20,
          type: this.category
        };
        this.getZfjgLawSupervise(data, this.category);
      }
    },
    getZfjgLawSupervise(data, category) {
      data.organId = this.userInfo.organId;
      let _this = this;
      new Promise((resolve, reject) => {
        getZfjgLawSupervise(data).then(
          res => {
            // resolve(res);
            let resultList = [];
            if (res.data && res.data.length == 0) {
              _this.errorMsg("暂无数据", "error");
              // return
            } else {
              _this.errorMsg(
                `查询到${res.data?res.data.length:0}条数据`,
                "success"
              );
            }
            debugger;
            res.data.forEach((item, i) => {
            //   let position = item.position.split(",");
            //   let lng = parseFloat(position[0]);
            //   let lat = parseFloat(position[1]);
            let position = item.propertyValue.split(",");
              let lng = parseFloat(position[0]);
              let lat = parseFloat(position[1]);
              item.nickName = item.nickName?item.nickName:item.name;
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
            // _this.toolShow = true;
            // _this.pointWidth = 180;
          },
          error => {
            //  _this.errorMsg(error.toString(), 'error')
            return;
          }
        );
      });
    },
    organTreeByCurrUser (organId) {
        let _this = this;
        let params = {
            name: '',
            organId: organId,
            type: 0
        }
        new Promise((resolve, reject) => {
            organTreeByCurrUser().then(
                res => {
                    let dataArray = res.data;
                    dataArray.forEach((item,i)=>{
                        item.icon = 'icon_jc1';
                        item.position = item.propertyValue;
                        addChildren(item);
                    })

                    function addChildren(item) {
                        item.icon = 'icon_jc1';
                        item.position = item.propertyValue;
                        if (['执法人员','执法车辆', '执法船舶'].indexOf(item.name) == -1 ) {
                            /* if (item.users) {
                                item.users.forEach((user,i)=>{
                                    user.label = user.nickName;
                                    user.icon = 'icon_jc11';
                                })
                            } */
                            item.children = item.children ? item.children : [];
                            item.children.splice(0,0,{
                                id: item.id,
                                pid:item.pid,
                                label: '执法人员',
                                icon: 'icon_jc11',
                                children: []
                            },{
                                id: item.id,
                                pid:item.pid,
                                label: '执法车辆',
                                icon: 'icon_cl11',
                                children:[]
                            },{
                                id: item.id,
                                pid:item.pid,
                                label: '执法船舶',
                                icon: 'icon_cb11',
                                children:[]
                            });
                            let len = item.children.length -3;
                            while (len > 0) {
                                item.children.forEach((obj,i)=> {
                                    if (i > 2) {
                                        addChildren(obj);
                                        len--;
                                    }
                                })
                            }
                        } else if (['执法人员','执法车辆', '执法船舶'].indexOf(item.label) == -1){
                        }
                    }
                    _this.data = dataArray;
                }
            )
        })
    
    }
  },
  mounted() {
      this.userInfo = iLocalStroage.gets("userInfo");

     this.$nextTick(() => {
        //  debugger;
         window.PhoneCallModule.initialize();
        if (!window.PhoneCallModule.getRegistered()) {
            // window.PhoneCallModule.sipRegister();
            let displayName = 'ecds04';
            let privateIdentity ='100006';
            let password = '1234';
            window.PhoneCallModule.sipRegister(displayName,privateIdentity,password);
        }
     })
    this.lunarDate = lunarDate();
    this.organTreeByCurrUser(this.userInfo.organId);
    // this.updateDrawer();
  },
  created () {
    // this.searchPageAll(6, 'gjclList');
    this.searchPageAllGJ(6, 'gjclList');
    this.pHost = iLocalStroage.gets('CURRENT_BASE_URL').PDF_HOST;
  },
  mixins: [lawSuperviseMixins, mixinsCommon],
  components: {
    // echarts,
    externalVideoBtns
  },
  watch: {
      makePhoneStatus (val, oldVal) {
          this.videoDoing = null;
      },
      
  },
  computed: {
      ...mapGetters(["makePhoneStatus", "doing"])
  }
};
</script>

<style lang="scss" src="@/assets/css/lawSupervise/lawSupervise.scss"></style>
<style src="@/assets/css/basicStyles/error.scss" lang="scss"></style>
<style lang="scss">
.search-tips {
    display:none;
}
</style>