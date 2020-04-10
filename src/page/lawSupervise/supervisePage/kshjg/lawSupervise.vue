<template>
  <!--  执法监管首页 by-jingli -->
  <div id="lawSupervise" ref="lawSupervise" class="mainBox">
    <div class="amap-page-container">
      <!-- amap://styles/whitesmoke -->
      <!-- :features="['road','bg', 'building']" -->
      <el-amap
        vid="lawSupervise"
        :mapStyle="style"
        :center="center"
        :plugin="plugin"
        :amap-manager="amapManager"
        :zoom="zoom"
        :events="events"
        class="amap-demo"
      >
        <el-amap-marker
          v-for="(marker,index) in markers"
          :key="index"
          :position="marker.position"
          :events="marker.events"
          :template="marker.template"
        ></el-amap-marker>
        <el-amap-info-window
          v-if="curWindow"
          :visible="curWindow&&curWindow.visible"
          :position="curWindow.position"
        >
          <div :class="'lawWindowStyle'+curWindow.category">
            <!-- 0执法人员 -->
            <div v-if="curWindow.category == 0">
              <div class="lawWindowTitle">
                <i class="iconfont law-people"></i>
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
                <externalVideoBtns @click="show=false"></externalVideoBtns>
            </div>
            <!-- 1执法机构 -->
            <div v-else-if="curWindow.category == 1">
              <div class="lawWindowTitle">
                <i class="iconfont law-zfj"></i>
                {{curWindow.other.name}}
                <!-- <div class="right">{{curWindow.other.enforceNo}}</div> -->
              </div>
              <div class="flexBox">
                <div class="con">
                  <p>{{curWindow.other.address}}</p>
                  <p>{{curWindow.other.contact}}&nbsp;&nbsp;{{curWindow.other.phone}}</p>
                </div>
                <div class="status">
                  <i class="iconfont law-mobile-phone"></i>
                  <p>{{curWindow.other.status}}</p>
                </div>
              </div>

              <div class="btns">
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
              </div>
            </div>
            <!-- 2执法车辆 -->
            <div v-else-if="curWindow.category == 2">
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
                <externalVideoBtns ></externalVideoBtns>
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
              <div class="flexBox">
                <div class="con">
                  <i class="iconfont law-ship"></i>
                  {{curWindow.other.shipNumber}}
                  <br />
                  {{curWindow.other.organName}}
                </div>
                <div class="status">
                  <i class="iconfont law-mobile-phone"></i>
                  <p>在线</p>
                </div>
              </div>
                <externalVideoBtns ></externalVideoBtns>
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
              <div class="lawWindowTitle">
                <i class="iconfont law-jiankong"></i>
                {{curWindow.other.name}}
                <div class="right">{{curWindow.other.status == 0? '正常': '异常'}}</div>
              </div>
              <div class="flexBox">
                <div class="con">
                  <p>{{curWindow.other.address}}</p>
                  <div>
                    <p>
                      {{curWindow.other.createTime}} &nbsp;
                      超限{{curWindow.other.cxchl}} &nbsp;
                      黑名单{{curWindow.other.blackList}}
                    </p>
                  </div>
                </div>
                <div class="status">
                  <i class="iconfont law-mobile-phone"></i>
                  <p>在线</p>
                </div>
              </div>
              <div class="btns">
                <el-table
                  v-if="curWindow.other.list"
                  style="width: 100%;"
                  :data="curWindow.other.list"
                  resizable
                  stripe
                >
                  <el-table-column width="100" prop="checkTime" label="过检时间"></el-table-column>
                  <el-table-column width="100" prop="vehicleNumber" label="车牌号"></el-table-column>
                  <el-table-column width="70" prop="overload" label="超载率"></el-table-column>
                  <el-table-column width="100" prop="area" label="车属地"></el-table-column>
                  <el-table-column width="80" label="重点监管">
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
                <externalVideoBtns ></externalVideoBtns>
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
                <externalVideoBtns ></externalVideoBtns>
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
        </el-amap-info-window>
      </el-amap>
      <div class="toolbar">
        <!-- <span v-if="loaded">
            location: lng = {{ lng }} lat = {{ lat }}
            </span>
        <span v-else>正在定位</span>-->
        <!-- <externalVideoBtns style="position:absolute;z-index:300"></externalVideoBtns> -->
      </div>
      <!-- 右侧浮动栏 -->
      <div class="amap-position" :class="'amap-' + direction + '-box'">
        <div class="drawerBtn" @click="updateDrawer">
          <i class="el-icon-arrow-right"></i>
        </div>
        <el-drawer
          :direction="direction"
          size="350px"
          customClass="amap-drawer"
          :wrapperClosable="false"
          :withHeader="false"
          :modal="false"
          :visible.sync="drawer"
        >
          <div class="drawerBtn" @click="drawer=false">
            <i class="el-icon-arrow-right"></i>
          </div>
          <div class="amap-main-content">
            <transition name="el-fade-in">
              <div class="echarts-box" v-show="status1">
                <em class="title left">近三个月执行情况</em>
                <i class="iconfont law-delete1 right" @click="status1 = false"></i>
                <div id="echartsBox1" class="amap-chart" style="height:200px"></div>
              </div>
            </transition>
            <transition name="el-fade-in">
              <div class="echarts-box" v-show="status2">
                <em class="title left">近三个月查处排行</em>
                <i class="iconfont law-delete1 right" @click="status2 = false"></i>
                <div class="amap-chart">
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
              </div>
            </transition>
            <transition name="el-fade-in">
              <div class="echarts-box">
                <em class="title left">车辆预警</em>
                <i class="iconfont law-delete1 right" @click="status3 = false"></i>
                <div id="echartsBox2" class="amap-chart" style="height:200px"></div>
              </div>
            </transition>
          </div>
        </el-drawer>
      </div>
    </div>
    <div class="amap-search">
      <el-select v-model="styleIndexNumher" placeholder="样式切换">
        <el-option
          v-for="(item,index) in styleListNumber"
          :key="index"
          :label="item"
          :value="index"
        ></el-option>
      </el-select>
      <el-select v-model="categorySelect" @change="category=categorySelect" placeholder="请选择">
        <el-option
          v-for="(item,index) in categoryList"
          :key="index"
          :label="item.show"
          :value="item.code"
        ></el-option>
      </el-select>
      <el-amap-search-box
        class="search-box"
        ref="searchAmapBox"
        :search-option="searchOption"
        :on-search-result="searchAll"
      ></el-amap-search-box>
    </div>
    <div class="amap-tool">
      <el-button
        v-for="(item,index) in tabList"
        :key="index"
        @click="currentTabIndex === index ? currentTabIndex = null : currentTabIndex = index"
      >
        <img :src="'./static/images/img/lawSupervise/'+item.iconfont+'.png'" />
        {{item.name}}
        <i class="el-icon-arrow-down el-icon--right"></i>
        <transition name="el-zoom-in-top">
          <div class="drop-down-menu transition-box" v-if="currentTabIndex == index">
            <i class="el-icon-caret-top"></i>
            <ul>
              <li
                v-for="subItem in item.children"
                :key="subItem.name"
                :class="{'select':subItem.select}"
                @click="searchByTab(subItem)"
              >
                <i :class="subItem.icon"></i>
                <p>{{subItem.name}}</p>
              </li>
            </ul>
          </div>
        </transition>
      </el-button>
    </div>
        <transition name="el-fade-in" >
        <div class="makePhoneBox" id="phoneBox" v-show="makePhoneStatus">
            <div >
                <div class="echarts-box">
                    <i class="el-icon-close right" id="closePhone" @click="updateMakePhoneStatus"></i>
                    <i class="el-icon-rank right" @mousedown="event=>start(event,'phoneBox')"></i>
                    <div class="videoBox">
                        <video class="video" width="200px" height="200px" id="video_local" autoplay="autoplay" muted></video>
                        <video class="video" width="200px" height="200px" id="video_remote" autoplay="autoplay"></Video>
                    </div>
                </div>
                <div class="phoneBtns">
                    <img :src="'./static/images/img/lawSupervise/ring_off.png'" @click="ringOff">
                </div>
            </div>
        </div>
        </transition>
  </div>
</template>
<script type="text/javascript" src="@/common/js/call.js"></script>
<script>
import Vue from "vue";
require("@/common/js/call.js");
import echarts from "echarts";
import "echarts/lib/chart/graph";
import {lawSuperviseObj, yjObj} from "@/page/lawSupervise/supervisePage/kshjg/echarts/echartsJson.js";
import { getZfjgLawSupervise, getBySiteId } from "@/api/lawSupervise.js";
import { lawSuperviseMixins, mixinsCommon } from "@/common/js/mixinsCommon";
import externalVideoBtns from '../../componentCommon/externalVideoBtns.vue';
// import externalVideoBtns from '@/page/lawSupervise/componentCommon/externalVideoBtns.vue';
import _ from "lodash";
import AMap from "vue-amap";
import { AMapManager } from "vue-amap";

// import draggable from "vuedraggable";
// import { PhoneCallModule } from "@/common/js/call.js";
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
        makePhoneStatus: false,
        show: true,
        categorySelect: -1,
        direction: "rtl",
        drawer: false,
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
        allSearchList: []
    };
  },
  methods: {
    updateMakePhoneStatus () {
        this.makePhoneStatus = !this.makePhoneStatus;
        if (this.makePhoneStatus) {
            window.PhoneCallModule.sipRegister();
            let _this=this;
            setTimeout(function() {
                _this.videoCall();
            },2000)
        } else {
            this.ringOff();
        }
    },
    videoCall() {
      window.PhoneCallModule.sipVideoCall("10000","test1");
    },
    ringOff () {
        window.PhoneCallModule.sipHangUp();
        this.makePhoneStatus = false;
    },
    start (e, id) {
        let odiv = e.target;        //获取目标元素
            //算出鼠标相对元素的位置
            document.onmousemove = (e)=>{       //鼠标按下并移动的事件
            // "phoneBox"
                let obj = document.getElementById(id).style;
                obj.left = e.clientX < 325 ? '0px' : (e.clientX -350 )+ 'px';
                obj.top = e.clientY < 90 ? '0px' : (e.clientY -110) + 'px';
                if (e.clientY >= (document.body.clientHeight - 60)) {
                     obj.top = (document.body.clientHeight - 210) +'px';
                }
                if (e.clientX >= (document.body.clientWidth-400)) {
                    obj.left = (document.body.clientWidth-400) + 'px';
                }
            };
            document.onmouseup = (e) => {
                document.onmousemove = null;
                document.onmouseup = null;
            };
    },
    updateDrawer() {
      this.drawer = !this.drawer;
      if (this.drawer) {
        let _this = this;
        this.$nextTick(() => {
          var flowChart = echarts.init(document.getElementById("echartsBox1"));
          flowChart.setOption(_this.lawSuperviseObj.option);
          var flowChart1 = echarts.init(document.getElementById("echartsBox2"));
          flowChart1.setOption(_this.yjObj);
          _this.getRealTimeDataByLawSupervise();
        });
      }
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
          if (category != -1) {
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
          } else {
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
            resolve(res);
            obj.list = res.data;
          },
          error => {
            //  _this.errorMsg(error.toString(), 'error')
            return;
          }
        );
      });
    },
    searchByTab(item) {
      // this.markers.splice(0, this.markers.length);
        item.select = !item.select;
      if (item.select&&this.allSearchList.length >= 5) {
        item.select = false;
        this.errorMsg(`至多选择5条数据`, "error");
        return
      }
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
          size: 0,
          type: item.code
        };
        this.allSearchList.push(data);
        this.getZfjgLawSupervise(data, this.category);
      } else {
        let _this = this;
        let _index = _.findIndex(this.allSearchList, function(chr) {
          return chr.type === item.code;
        });
        if(_index > -1) {
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
          size: 0,
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
    }
  },
  mounted() {
  },
  mixins: [lawSuperviseMixins, mixinsCommon],
  components: {
    // echarts,
    externalVideoBtns
  }
};
</script>

<style lang="scss" src="@/assets/css/lawSupervise/lawSupervise.scss"></style>
<style src="@/assets/css/basicStyles/error.scss" lang="scss"></style>
