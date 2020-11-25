<template>
  <div class="gzMap">
    <JkyBaseAMap @init="init" @handleClickPoint="handleClickPoint" :zoom="8" :searchStyle='searchStyle' />
    <TopInFo />
    <LeftDrawer ref='LeftDrawer' :config="groups" @getPeople='getPeople'  :allUsers="allUsers" />
    <Search
      ref="Search"
      :config="searchWindowData"
      :searchStyle='searchStyle'
      @handleNodeClick="handleNodeClick"
      @handlePerson="handlePerson"
      @handleClickBtns="handleClickBtns"
    />
    <Select
      ref="Select"
      :config="selectData"
      @handleChange="handleChange"
      @handleItemCheck="handleItemCheck"
      @handleCheckAllChange="handleCheckAllChange"
    />
    <Drawer v-if="isShowDrawer" :config="drawerData" @handleEcforce="handleEcforce" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import JkyBaseAMap from "@/components/jky-baseAMap";
import Search from "../components/search/index.vue";
import Select from "../components/select/index.vue";
import LeftDrawer from "../components/leftDrawer/index.vue";
import Drawer from "../components/drawer/index.vue";
import TopInFo from "../components/topInfo/index.vue";
import store from "../store.js";
import iLocalStroage from '@/common/js/localStroage';
export default {
  mixins: [store],
  provide() {
    return {
      indexPage: this
    }
  },
  components: {
    JkyBaseAMap,
    Search,
    Select,
    Drawer,
    TopInFo,
    LeftDrawer
  },
  watch: {
    makePhoneStatus (val, oldVal) {
      this.videoDoing = null;
    },

  },
  computed: {
    ...mapGetters(["makePhoneStatus", "doing"])
  },
  data() {
    return {
      searchStyle:{'gzMap-searchs':false,'gzMap-searchCopy':true},
      groups:[],
      allUsers:[],
      organId: "", // 根节点的 ID
      isShowDrawer: false, // 是否显示抽屉组件
      imgUrl: new Map([
        [0, '/static/images/img/lawSupervise/map_renyuan.png'],
        [1, '/static/images/img/lawSupervise/map_jigou.png'],
        [2, '/static/images/img/lawSupervise/map_jingche.png'],
        [3, '/static/images/img/lawSupervise/map_cbo.png'],
        [4, '/static/images/img/lawSupervise/map_o_gud.png'],
        [5, '/static/images/img/lawSupervise/map_didian.png']
      ]), // 各类型所对应的点位图标
      page: null, // 地图组件的 this
      map: null,
      searchWindowData: {
        window1: {
          title: "专题查询",
          list: [
            { name: "执法机构", imgUrl: "/static/images/img/lawSupervise/zfbm.png"},
            { name: "执法人员", imgUrl: "/static/images/img/lawSupervise/ysgljg.png"},
            { name: "事件", imgUrl: "/static/images/img/lawSupervise/ysgljg.png"},
            { name: "非现场站点", imgUrl: "/static/images/img/lawSupervise/ysgljg.png"},
          ]
        },
        window2: {
          defaultProps: {
            children: 'children',
            label: 'label'
          },
          option: []
        },
        window3: {
          title: "",
          info: {},
          option: []
        },
        window4: {
          title: '',
          info: {}
        },
        window5: {
          imgList: [],
          info: {},
          data: {}
        }
      },
      selectData: {
        option: [
          {
            title: "西安市",
            imgUrl: "/static/images/img/lawSupervise/area.png",
            options: [
              {
                value: 'xian',
                label: '西安市',
                children: [{
                  value: 'yanta',
                  label: '雁塔区',
                  children: [{
                    value: 'gaoxin',
                    label: '高新区',
                  }]
                }]
              },
              {
                value: ' ',
                label: '全国',
              }
            ]
          },
          {
            title: "图层",
            imgUrl: "/static/images/img/lawSupervise/icon_changjing.png",
            options: [
              {name: '执法人员', type: 0},
              {name: '执法机构', type: 1},
              {name: '执法车辆', type: 2},
              {name: '执法船舶', type: 3},
              {name: '事件地点', type: 5},
              {name: '非现场站点', type: 4},
              {name: '交通管制', type: 6},
              {name: '道路施工', type: 6},
            ]
          },
          {
            title: "全屏",
            imgUrl: "/static/images/img/lawSupervise/qp.png",
          }
        ]
      },
      drawerData: {
        // 告警车辆数据
        carData: {},
        // 非现场执法点数据
        noEnforceData: {
          option: []
        }
      },
      polygonList: [],
      savedPolygon: [],
      mouseTool: null,
      marker: null,
        lineArr: [
            [116.478935, 39.997761],
            [116.478939, 39.997825],
            [116.478912, 39.998549],
            [116.478912, 39.998549],
            [116.478998, 39.998555],
            [116.478998, 39.998555],
            [116.479282, 39.99856],
            [116.479658, 39.998528],
            [116.480151, 39.998453],
            [116.480784, 39.998302],
            [116.480784, 39.998302],
            [116.481149, 39.998184],
            [116.481573, 39.997997],
            [116.481863, 39.997846],
            [116.482072, 39.997718],
            [116.482362, 39.997718],
            [116.483633, 39.998935],
            [116.48367, 39.998968],
            [116.484648, 39.999861]
        ],
        con_id:'',
        param_uid1:'65550'
    }
  },
  methods: {
    /**
     * 地图初始化事件
     */
    init(_map, _this) {
      this.map = _map
      this.page = _this
      this.marker = new AMap.Marker({
          map: this.map,
          position: [116.478935, 39.997761],
          icon: "https://webapi.amap.com/images/car.png",
          offset: new AMap.Pixel(-26, -15),
          autoRotation: true,
          angle: -90
        });

        // 绘制轨迹
        let polyline = new AMap.Polyline({
          map: this.map,
          path: this.lineArr,
          showDir: true,
          strokeColor: "#28F", //线颜色
          // strokeOpacity: 1,     //线透明度
          strokeWeight: 6 //线宽
          // strokeStyle: "solid"  //线样式
        });

        let passedPolyline = new AMap.Polyline({
          map: this.map,
          // path: this.lineArr,
          strokeColor: "#AF5", //线颜色
          // strokeOpacity: 1,     //线透明度
          strokeWeight: 6 //线宽
          // strokeStyle: "solid"  //线样式
        });

        this.marker.on("moving", function (e) {
          passedPolyline.setPath(e.passedPath);
        });

        this.map.setFitView();
    },
    getPeople(data){
      this.getPeopleTree(data)
    },
    /**
     * 点击节点回调函数
     * 1.如果当前节点是执法人员、执法车辆、执法船舶，则发送请求获取子节点数据
     * 2.当前节点没有子节点时打点
     * 3.当前节点有子节点时获取当前节点信息并打点
     */
    handleNodeClick(data) {
      // 清空右侧复选框
      // this.$refs.Select.checkedCities = []

      if(data.label === "执法人员") {
        this.getPeopleTree(data)
      } else if (data.label === "执法车辆" || data.label === "执法船舶") { // 当前节点执法人员、执法车辆、执法船舶
        this.getCarShipTree(data)
        // 当前节点没有子节点时
      } else if (!data.hasOwnProperty('children') || data.children.length === 0) {
        if(data.propertyValue) {
          data.icon = this.imgUrl.get(data.type)
          this.page.addPoint(data)
        } else {
          this.$message.error('没有坐标数据')
        }
      } else { // 机构节点
        this.getLoad(data)
      }
      console.log(data)
      // else if(data.id === "03b7c79d442eb0d66b364a6242adb7f5" || data.id === "d56d4294b546fc7fe94ec56b0ce45a6a") {
      //   this.getLoad(data)
      // } else {
      //   // 添加点位图标
      //   data.imgUrl = this.imgUrl.get(data.type)
      //   // 显示弹出框
      //   this.searchWindowData.window4.title = data.label
      //   this.searchWindowData.window4.info = {
      //     organName: data.organName || '',
      //     mobile: data.mobile || '',
      //     padStateColor: data.padStateColor || '',
      //     peStateColor: data.peStateColor || ''
      //   }
      //   this.$refs.Search.showCom = "Window4"
      //   // 如果有点位，则打点，否则抛出异常
      //   if(data.propertyValue) {
      //     let latLng = data.propertyValue.split(',')
      //     // 手动给点位添加图层标识属性（希望后期能由后端添加）
      //     data.layerName = data.label
      //     this.page.addPoint(data, latLng)
      //   } else {
      //     throw new Error("handleNodeClick(data):::::::::没有坐标")
      //   }
      // }
    },

    /**
     * 显示信息窗体
     */
    handleOverLay(data) {
      let content = data.vehicleNumber || data.label || data.name || data.shipNumber || data.nickName || data.eventName
      this.page.addOverlay(data, content)
    },

    /**
     * 点击地图点位触发
     */
    handleClickPoint(data) {
      console.log(data)
      // 显示信息窗体
      this.handleOverLay(data)
      // 如果点位属于执法人员，执法车辆或者执法人员
      if(data.type === 0) {
        // 显示弹出框
        this.searchWindowData.window4.title = data.nickName
        this.searchWindowData.window4.info = [
          { title: "姓名", value: data.nickName },
          { title: "联系方式", value: data.mobile },
          { title: "机构名称", value: data.organName },
        ]
        this.searchWindowData.window4.info.peStateColor = data.peStateColor || ''
        this.searchWindowData.window4.info.padStateColor = data.padStateColor || ''
        this.searchWindowData.window4.info.sn = data.sn || ''
        this.searchWindowData.window4.info.padSn = data.padSn || ''
        this.searchWindowData.window4.btnList= [
            { class: 'el-icon-phone' },
            { class: 'iconfont law-shipin' },
            { class: 'iconfont law-jiankong' },
            { class: 'iconfont law-msg-box' },
            { class: 'iconfont law-xianlu' }
        ]
        this.$refs.Search.showCom = "Window4"
      } else if (data.type === 2) {
        this.searchWindowData.window4.title = data.vehicleNumber
        this.searchWindowData.window4.info = [
          { title: "车牌号", value: data.vehicleNumber },
          { title: "机构名称", value: data.organName },
        ]
        this.searchWindowData.window4.btnList= []
        this.$refs.Search.showCom = "Window4"
      } else if (data.type === 3) {
        this.searchWindowData.window4.title = data.shipNumber
        this.searchWindowData.window4.info = [
          { title: "机构名称", value: data.organName },
        ]
        this.searchWindowData.window4.btnList= []
        this.$refs.Search.showCom = "Window4"
      } else if (data.type === 5) {
        this.searchWindowData.window4.title = data.eventName
        this.searchWindowData.window4.info = [
          { title: "事件名称", value: data.eventName },
          { title: "时间", value: data.eventDate },
          { title: "地点", value: data.eventAddress },
        ]
        this.searchWindowData.window4.btnList= []
        this.$refs.Search.showCom = "Window4"
      } else if (data.type === 4) { // 如果是非现场站点
        this.$refs.Search.showCom = "Window5"
        this.getWindow5(data)
      } else {
        this.searchWindowData.window3.title = data.name
        this.searchWindowData.window3.info = {
          address: data.address || '',
          contactor: data.contactor || '',
          telephone: data.telephone || ''
        }
        this.getTheOrganTree(data)
      }
      // 当前点位是路政局
      // if(data.id === "03b7c79d442eb0d66b364a6242adb7f5" || data.id === "d56d4294b546fc7fe94ec56b0ce45a6a") {
      //   this.searchWindowData.window3.title = data.name
      //   this.searchWindowData.window3.info = {
      //     address: data.address || '',
      //     contactor: data.contactor || '',
      //     telephone: data.telephone || ''
      //   }
      //   this.getTheOrganTree(data)
      // } else if (data.type === 4) {
      //   this.$refs.Search.showCom = "Window5"
      //   this.getWindow5(data)
      // } else {
      //   // 显示弹出框
      //   this.searchWindowData.window4.title = data.vehicleNumber || data.label || data.shipNumber || data.nickName
      //   this.searchWindowData.window4.info = data
      //   this.$refs.Search.showCom = "Window4"
      // }
    },

    /**
     * 选中级联选择器节点时触发
     */
    handleChange(value) {
      console.log(value)
    },

    /**
     * 点击人员在线情况头像
     */
    handlePerson(node) {
      this.personClick(node)
    },

    /**
     * 点击列表，地图打点
     */
    handleEcforce(data) {
      // 添加点位图标
      data.icon = this.imgUrl.get(data.type)
      this.page.addPoint(data)
    },

    /**
     * 点击全选, 获取全部点位数据并打点
     */
    handleCheckAllChange(val) {
      this.getAllPoints(val)
    },

    /**
     * 点击 window4 底部小图标
     */
    handleClickBtns(index, data) {
      if(index === 0) {
        // 如果状态为在线（图标颜色为蓝色），则打开语音通话窗口
        if(data.padStateColor) {
          this.$store.commit('setDoing', '1');
          this.$store.commit('setMakePhoneStatus', !this.makePhoneStatus);
          window.PhoneCallModule.sipAudioCall(data.padSn,"test");
        }
      } else if (index === 1) {
        // 如果状态为在线（图标颜色为蓝色），则打开视频通话窗口
        if(data.padStateColor) {
          this.$store.commit('setDoing', '2');
          this.$store.commit('setMakePhoneStatus', !this.makePhoneStatus);
          window.PhoneCallModule.sipVideoCall(data.padSn,"test");
        }
      } else if (index === 2) {
        // 如果状态为在线（图标颜色为绿色），则打开视频窗口
        if(data.peStateColor) {
          this.clickPeVideo(data.sn)
        }
      }
    },
    startDrawPolygon() {
      this.clearPolygon();
      let __this = this;
      this.map.plugin("AMap.MouseTool", function() {
        __this.mouseTool = new AMap.MouseTool(__this.map);
      });
      this.mouseTool.rectangle(this.polyType);
      //监听draw事件可获取画好的覆盖物
      this.polygonList = [];
      this.mouseTool.on("draw", function(e) {
        __this.polygonList.push(e.obj);
        console.log("绘制的多边形", __this.polygonList);
        __this.mouseTool.close();
      });
    },
    stopAndSave() {
      // this.mouseTool.close();
      let savedPolygon = [];
      for (let i = 0; i < this.polygonList.length; i++) {
        console.log(this.polygonList[i].getOptions());
        let op = this.polygonList[i].getOptions();
        let routePath = [];
        op.path.forEach(item => {
          routePath.push([item.lng, item.lat]);
        });
        let savearr = {
          path: routePath,
          strokeColor: op.strokeColor,
          strokeOpacity: op.strokeOpacity,
          fillOpacity: op.fillOpacity,
          fillColor: op.fillColor,
          zIndex: op.zIndex
        };
        this.savedPolygon.push(savearr);
      }
      let save = JSON.stringify(this.savedPolygon);
      console.log("savedPolygon", save);
      // 模拟数据库存取
      sessionStorage.setItem("savedPolygon", save);
    },
    clearPolygon() {
      // this.map.remove(this.polygonList);
      this.polygonList = [];
      this.map.clearMap(); // 清除地图上的所有覆盖物
    },
    // 用保存的数据重新绘制多边形并添加事件
    redrawPolygon() {
      let __this = this;
      // 用浏览器模拟数据库存取
      let savedPolygon = JSON.parse(sessionStorage.getItem("savedPolygon"));
      console.log("重绘多边形数据", savedPolygon);
      if (savedPolygon == null) return;
      for (let i = 0; i < savedPolygon.length; i++) {
        var polygon = new AMap.Polygon(savedPolygon[i]);
        this.map.add(polygon);
      }
    },
    startAnimation() {
        this.marker.moveAlong(this.lineArr, 1000);
      },
      pauseAnimation() {
        this.marker.pauseMove();
      },
      resumeAnimation() {
        this.marker.resumeMove();
      },
      stopAnimation() {
        this.marker.stopMove();
      },
      login(){
            let _this = this
            websdk.request.authRequest.logon('121.89.209.103', '80', '1', 'rsy', '123456', null, 2, function (rsp) {
                console.log('demo_req_logon result:', rsp);
                if (rsp.cmd_status === 0) {
                    // XXX 设置当前调度台账号的ID，其他接口会使用此ID
                    _this.con_id = rsp.uid;
                    _this.req_user_profile()
                } else {
                }
            }, 'demo_req_logon');

        },
        showDailog(){
                websdk.request.videoRequest.playVideo(this.con_id, this.param_uid1, null, null, 0, 0, 0, function (rsp) {
                console.log('demo_req_play_video result:{}', rsp);
            }, 'demo_req_play_video');//
        },
        closeDailog(){
                websdk.request.videoRequest.stopPlayVideo(this.con_id, this.param_uid1, null, null, 0, 0, 0, function (rsp) {
                console.log('demo_req_stop_video result:{}', rsp);
            }, 'demo_req_stop_video');//
        },
        showUserModal(){
            websdk.view.showUserModal(this.param_uid1, null, function (result) {
                console.log('showUserModal result:{}', result);
            });
        },
        showGroupModal() {
            websdk.view.showGroupModal(global_data.param_tgid1, function (result) {
                console.log('showGroupModal result:{}', result);
            });
        },
        //获取群组列表
        req_grp_profile(targets) {
          let _this = this;
          if (!targets) {
              targets = null;
          }
          websdk.request.groupRequest.getGroupInfo(targets, function (rsp) { // [global_data.param_tgid1]
              console.log('demo_req_grp_profile result:', rsp);
              _this.groups = rsp
              this.$refs.LeftDrawer.changeLoading();
              console.log('this.group',_this.groups)
          }, 'demo_req_grp_profile');//
        },
        //获取所有用户信息
        req_user_profile: function () {
          let _this = this;
          var targets = null;
          //var targets = [global_data.param_uid1];
          websdk.request.userRequest.getUserInfo(targets, null, function (rsp) {
              console.log('demo_req_user_profile result:', rsp);
               _this.allUsers = rsp
              _this.req_grp_profile()
          }, 'demo_req_user_profile');//
        },
  },
  activated() {
    this.getTree()
  },

 created(){
   this.$nextTick(() => {
        websdk.init(function (result) {
            console.log('websdk.init result:', result);
            //设置关闭视频时的操作: 1:询问, 2:只关闭视频窗口, 3:关闭视频窗口并结束推流
            websdk.websdkui && websdk.websdkui.configApi.set_video_close_action(1);
            //只针对终端主动推的视频 0：与set_video_close_action一致，1:询问, 2:只关闭视频窗口, 3:关闭视频窗口并结束推流
            websdk.websdkui && websdk.websdkui.configApi.set_video_push_close_action(3);
            //只针对调度台拉取的视频 0：与set_video_close_action一致，1:询问, 2:只关闭视频窗口, 3:关闭视频窗口并结束推流
            websdk.websdkui && websdk.websdkui.configApi.set_video_pull_close_action(3);
        });
    })
    this.login()
},
  mounted(){

  }
}
</script>

<style lang="scss" scoped>
.gzMap {
  width: 100%;
  height: 100%;
  overflow: hidden;

}
.gzMap-searchCopy{
   position: absolute;
  top: 40px;
  left: 30px;
  width: 369px;
  box-sizing: border-box;
  .input-with-select {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    margin-bottom: 5px;
    .el-input__inner {
      width: 311px;
      height: 40px;
      border-radius: 4px 0 0 4px;
    }
    .el-input-group__append {
      .el-button {
        .el-icon-search {
          color: #409EFF;
        }
      }
    }
    .closeBox {
      height: 40px;
      line-height: 40px;
      cursor: pointer;
    }
  }
}
.gzMap-searchs {
    position: absolute;
    top: 40px;
    left: 400px;
    width: 369px;
  .input-with-select {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    margin-bottom: 5px;
    .el-input__inner {
      height: 40px;
      border-radius: 4px 0 0 4px;
    }
    .el-input-group__append {
      .el-button {
        .el-icon-search {
          color: #409EFF;
        }
      }
    }
    .closeBox {
      height: 40px;
      line-height: 40px;
      cursor: pointer;
    }
  }
}

</style>
