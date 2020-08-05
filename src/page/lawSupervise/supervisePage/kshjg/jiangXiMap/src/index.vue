<template>
  <div class="jiangXiMap">
    <JkBaseHMap @init="init" :center="center" />
    <Search
      ref="Search"
      :config="searchWindowData"
      @handleNodeClick="handleNodeClick"
      @handlePerson="handlePerson"
    />
    <Select
      :config="selectData"
      @handleChange="handleChange"
      @handleCommand="handleCommand"
    />
  </div>
</template>

<script>
import JkBaseHMap from "@/components/jk-baseHMap";
import Search from "../components/search/index.vue";
import Select from "../components/select/index.vue";
import store from "../store.js";
export default {
  mixins: [store],
  components: {
    JkBaseHMap,
    Search,
    Select
  },
  data() {
    return {
      imgUrl: new Map([
        [0, '/static/images/img/lawSupervise/map_renyuan.png'],
        [1, '/static/images/img/lawSupervise/map_jigou.png'],
        [2, '/static/images/img/lawSupervise/map_jingche.png'],
        [3, '/static/images/img/lawSupervise/map_cbo.png'],
        [4, '/static/images/img/lawSupervise/map_o_gud.png'],
      ]), // 各类型所对应的点位图标
      page: null, // 地图组件的 this
      map: null,
      zoom: 8,
      center: [12118909.300259633, 4086043.1061670054],
      searchWindowData: {
        window1: {
          title: "专题查询",
          list: [
            { name: "执法部门", imgUrl: "http://111.75.227.156:18904/static/images/experience/basedata/zfbm.png"},
            { name: "执法部门", imgUrl: "http://111.75.227.156:18904/static/images/experience/basedata/zfbm.png"},
            { name: "执法部门", imgUrl: "http://111.75.227.156:18904/static/images/experience/basedata/zfbm.png"},
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
      },
      selectData: {
        organId: "",
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
              {name: '非现场站点', type: 4},
            ]
          },
          {
            title: "全屏",
            imgUrl: "/static/images/img/lawSupervise/qp.png",
          }
        ]
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
        data.imgUrl = this.imgUrl.get(data.type)
        // 显示弹出框
        this.searchWindowData.window4.title = data.label
        this.searchWindowData.window4.info = {
          organName: data.organName || '',
          mobile: data.mobile || ''
        }
        this.$refs.Search.showCom = "Window4"
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
      } else if (data.type === 4) {
        console.log('hahahahahahaha')
      } else {
        // 显示弹出框
        this.searchWindowData.window4.title = data.nickName
        this.searchWindowData.window4.info = {
          organName: data.organName || '',
          mobile: data.mobile || ''
        }
        this.$refs.Search.showCom = "Window4"
      }
      console.log(data)
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
