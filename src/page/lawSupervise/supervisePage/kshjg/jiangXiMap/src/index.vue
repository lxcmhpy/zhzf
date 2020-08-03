<template>
  <div class="jiangXiMap">
    <JkControlsMap
      @init="init"
      @handleChange="handleChange"
      @handleSearch="handleSearch"
      @handleShowSearch="handleShowSearch"
      :config="config"
      :center="center"
    />
    <keep-alive>
      <component
        :is="showComp"
        :class="showComp==='JkMapTree'?'jiangXiMap-tree':null"
        :config="showComp==='JkMapTree'?treeData:showComp==='MapWinDow'?windowData:personData"
        @handleNodeClick="handleNodeClick"
        @handleButton="handleButton"
        @handleGoBack="handleGoBack"
        @handlePerson="handlePerson"
        @handlePersonGoBack="() => {showComp='MapWinDow'}"
      />
    </keep-alive>
    <!-- <JkMapTree
      class="jiangXiMap-tree"
      :config="treeData"
      @handleNodeClick="handleNodeClick"
      @handleButton="handleButton"
    />
    <MapWinDow v-if="showWindow" @handleClose="handleClose" :config="windowData" /> -->
  </div>
</template>

<script>
import JkControlsMap from "@/components/jk-controlsMap";
import JkMapTree from "@/components/jk-mapTree";
import MapWinDow from "./mapWindow.vue";
import PersonWindow from "./personWindow.vue";
import store from "../store.js"
export default {
  mixins: [store],
  components: {
    JkControlsMap,
    JkMapTree,
    MapWinDow,
    PersonWindow
  },
  data() {
    return {
      showComp: "",
      page: null, // 地图组件的 this
      map: null,
      zoom: 8,
      center: [12118909.300259633, 4086043.1061670054],
      personData: {
        title: '',
        info: {}
      },
      windowData: {
        title: "",
        info: {},
        option: []
      },
      treeData: {
        option: [],
      },
      config: {
        searchData: {
          title: "专题查询",
          placeholder: "搜执法人员、执法机构",
          option: [
            { name: "执法部门", imgUrl: "http://111.75.227.156:18904/static/images/experience/basedata/zfbm.png"},
            { name: "执法部门", imgUrl: "http://111.75.227.156:18904/static/images/experience/basedata/zfbm.png"},
            { name: "执法部门", imgUrl: "http://111.75.227.156:18904/static/images/experience/basedata/zfbm.png"},
            { name: "执法部门", imgUrl: "http://111.75.227.156:18904/static/images/experience/basedata/zfbm.png"},
            { name: "执法部门", imgUrl: "http://111.75.227.156:18904/static/images/experience/basedata/zfbm.png"},
          ]
        },
        popoverData: {
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
                  value: 'quanguo',
                  label: '全国',
                }
              ]
            },
            {
              title: "图层",
              imgUrl: "/static/images/img/lawSupervise/icon_changjing.png",
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
                  value: 'quanguo',
                  label: '全国',
                }
              ]
            },
            {
              title: "全屏",
              imgUrl: "/static/images/img/lawSupervise/qp.png",
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
                  value: 'quanguo',
                  label: '全国',
                }
              ]
            }
          ]
        }
      }
    }
  },
  methods: {
    /**
     * 地图初始化事件
     */
    init(_map, _this) {
      this.map = _map
      this.page = _this
      _map.on('feature:onselect', event => {
        this.handleClickPoint(event.value.N.data)
      });
    },

    /**
     * 给获取到的每个节点的 children 添加 执法人员、执法车辆、执法船舶子节点
     */
    addNode(arr) {
      let myNode = [
        { label: '执法人员', type: 0, children: [] },
        { label: '执法车辆', type: 2, children: [] },
        { label: '执法船舶', type: 3, children: [] },
      ]
      arr.map(item => {
        if(item.hasOwnProperty('children') && item.type!=0 && item.type!=2 && item.type!=3) {
          myNode.map(myNodeItem => {
            // 给自定义节点添加 pid 属性， 值为父节点的 id
            myNodeItem.pid = item.id
          })
          // 在 children 里添加自定义节点
          item.children = myNode.concat(item.children)
          // 递归调用
          this.addNode(item.children)
        }
      })
      return arr
    },

    /**
     * 点击当前专题图片，下钻到树形结构窗口
     */
    handleSearch(data) {
      this.showComp = "JkMapTree"
      console.log(data)
    },

    /**
     * 点击头部输入栏触发
     */
    handleShowSearch() {
      this.showComp = ''
    },

    /**
     * 点击节点回调函数
     * 1.如果当前节点是路政局，则获取路政局数据、地图打点
     * 2.如果当前节点是自定义节点，发送请求获取子节点数据
     * 3.如果当前节点没有下级，则地图打点并打开信息窗口
     */
    handleNodeClick(data) {
      console.log(data)
      if(data.label === '执法人员') {
        this.getPeopleTree(data)
      } else if (data.label === '执法车辆' || data.label === '执法船舶') {
        this.getCarShipTree(data)
        // 当前节点为路政管理局和分局
      } else if(data.id === "03b7c79d442eb0d66b364a6242adb7f5" || data.id === "d56d4294b546fc7fe94ec56b0ce45a6a") {
        this.getLoad(data)
      } else {
        // 添加点位图标
        data.parentLabel === "执法人员" ?
          data.imgUrl = "/static/images/img/lawSupervise/map_renyuan.png"
          : data.parentLabel === "执法车辆" ?
          data.imgUrl = "/static/images/img/lawSupervise/map_jingche.png"
          : data.imgUrl = "/static/images/img/lawSupervise/map_cbo.png"
        // 显示弹出框
        this.personData.title = data.label
        this.personData.info = {
          organName: data.organName || '',
          mobile: data.mobile || ''
        }
        this.showComp = "PersonWindow"
        // 如果有点位，则打点，否则抛出异常
        if(data.propertyValue) {
          let latLng = data.propertyValue.split(',')
          this.page.addPoint(data, latLng)
        } else {
          throw new Error("handleNodeClick(data):::::::::没有坐标")
        }
      }
    },

    /**
     * 点击地图点位触发
     */
    handleClickPoint(data) {
      // 当前点位是路政局
      if(data.id === "03b7c79d442eb0d66b364a6242adb7f5" || data.id === "d56d4294b546fc7fe94ec56b0ce45a6a") {
        this.getTheOrganTree(data)
      }
      console.log(data)
    },

    /**
     * 点击返回
     */
    handleGoBack() {
      this.showComp = "JkMapTree"
    },

    /**
     * 选中级联选择器节点时触发
     */
    handleChange(value) {
      console.log(value)
    },

    /**
     * 点击查询按钮触发
     */
    handleButton(data) {
      console.log(data)
    },

    /**
     * 点击人员在线情况头像
     */
    handlePerson(node) {
      this.personClick(node)
    }
  },
  created() {
    this.getTree()
  }
}
</script>

<style lang="scss">
.jiangXiMap {
  &-tree {
    position: absolute;
    top: 70px;
    left: 30px;
  }
}
</style>

<style lang="scss" scoped>
.jiangXiMap {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
