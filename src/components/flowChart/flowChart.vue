<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox" >
      <div class="handlePart">
        <el-button type="primary" size="medium" icon="el-icon-plus">添加</el-button>
      </div>
      <div >
        <!-- <div id="aa"><?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg class="icon" width="200px" height="200.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#d81e06" d="M999.041908 264.483956a65.537436 65.537436 0 0 0-28.728739-30.524286L542.524285 7.720849a65.986323 65.986323 0 0 0-61.946344 0L53.237945 232.613011a64.639663 64.639663 0 0 0-17.506576 15.711029 58.804138 58.804138 0 0 0-11.222163 14.36437A65.08855 65.08855 0 0 0 17.327021 291.866035v439.459934a68.230756 68.230756 0 0 0 36.808697 59.253025l426.89111 224.443275a72.270735 72.270735 0 0 0 30.524285 8.528844h4.937753a63.74189 63.74189 0 0 0 26.035419-6.733298l427.339997-224.443275a67.781869 67.781869 0 0 0 35.013151-59.253025V291.866035a65.986323 65.986323 0 0 0-5.835525-27.382079zM511.102227 505.98492v427.339997L103.962125 718.308259V282.888304l407.588988 224.443276h4.937753z"  /></svg></div> -->
          <div id="flowChart" style="width: 1000px;height:550px;margin:0 auto"></div>
      </div>
    </div>
    <!--快速入口 -->
    <div class="caseFaseEnterPart">
      <caseSlideMenu :activeIndex="'caseInfo'"></caseSlideMenu>
    </div>
  </div>
</template>
<script>
import caseSlideMenu from '@/page/caseHandle/components/caseSlideMenu'
import echarts from 'echarts'
import 'echarts/lib/chart/graph'
import _ from 'lodash'
import { mixinGetCaseApiList } from "@/js/mixins";
import { mapGetters } from "vuex";
import {svgData,stateColor,lineStyle,graphData,mainLinkData,layoutCharts} from './json/flowChart'
export default {
  data() {
    return {
      stateColor: stateColor,
      lineStyle: lineStyle,
      layoutCharts: layoutCharts,
      graphData: graphData,
      svgData: svgData,
      // 立案 0 调查 1 决定 2 执行 3 结案
      mainLinkData: mainLinkData,
      data: {},
      stateLinkArray: ['complete','doing','unLock']
    }
  },
  mixins:[mixinGetCaseApiList],
  computed:{...mapGetters(['caseId'])},
  components: {
    caseSlideMenu
  },
  methods: {
    async getFlowStatusByCaseId(id) {
      console.log(id)
      this.$store.dispatch("getFlowStatusByCaseId", id).then(
        res => {
          console.log('流程图',res)
          this.data = res.data;
          this.updateLinkData()
          this.updateGraphData()
          this.drawFlowChart()
        },
        err => {
          console.log(err);
        }
      );
    },
    drawFlowChart() {
      var flowChart = echarts.init(document.getElementById('flowChart'))
      let graphTemp = this.graphData
      let stateColorTemp = this.stateColor
      let mainLinkDataTemp = this.mainLinkData
      let layoutCharts = this.layoutCharts
      var option = {    //这里是option配置
        title: {
            text: '办案流程图'
        },
        legend: [{    //图例组件
            data: graphTemp.nodes,
            itemGap:5,
            y: 'bottom'
        }],
        calculable : true,
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        grid: {
            left: '5%',
            top: '10%',
            right: '5%',
            bottom: '5%',
            containLabel: true,
        },
        xAxis: [
        {
            position:'top',
            type : 'value',
            min: 0,
            max: layoutCharts.splitNumber,
            axisLine: {
                lineStyle: {
                    type: 'dashed',
                    color:'#ccc',
                    shadowOffsetX: 10,
                    shadowColor:'#ccc',
                }
            },
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    shadowOffsetX: 10,
                    shadowColor:'#ccc',
                    color:'#ccc',
                },
            },
            axisLabel: {
                show: false
            },
            splitNumber: layoutCharts.splitNumber,
            interval: 1,
        }
        ,{
            position:'top',
            nameLocation: 'start',
            type : 'category',
            axisLine: {
                lineStyle: {
                    type: 'dashed',
                    color:'#ccc',
                    shadowColor:'#ccc'
                }
            },
            data: mainLinkDataTemp
        }],
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    type: 'dashed',
                    color:'white'
                }
            }
        },
        series: [
            {
                type: 'graph',
                symbol:'rect',
                edgeSymbol: ['none', 'arrow'],
                edgeSymbolSize: [2, 7],
                data: graphTemp.nodes,
                links: graphTemp.links,
                draggable: false,   //注意这里设置为false,不然拖拽鼠标和节点有偏移
            }
        ]

      };
      flowChart.setOption(option)
      // this.updatePosition(flowChart,option)
      // initInvisibleGraphic(flowChart,option)
      let that = this;
      flowChart.off('click');
      flowChart.on('click', function(params){
          if (params.name) {
            // complete: '#0174f5',//已完成  doing: '#f2a010',// 进行中  unLock: '#52c2b6',// 已解锁  lock: '#b2b2b2' //未解锁
            if (that.stateLinkArray.indexOf(params.data.curLinkState) >-1){
              let clickRouter = that.com_getCaseRouteName(params.data.linkID);
              that.$store.dispatch('deleteTabs', 'flowChart');
              that.$router.push({name:clickRouter})
            }
          }

      })
    },
    updateGraphData() {
      let svgDataTemp = this.svgData
      let stateColorTemp = this.stateColor
      let layoutCharts = this.layoutCharts
      this.graphData.nodes.forEach(function (node) {
          node.x=parseInt(node.position.y * layoutCharts.xMargin);
          node.y=parseInt(node.position.x * layoutCharts.yMargin);
          if (node.attributes.modularity_class !== 'hide') {

              node.itemStyle = {
                normal:{
                    color: node.itemStyleColor == '' ? stateColorTemp.lock : node.itemStyleColor
                  }
              }
              node.label = {
                normal: {
                      show:true,
                      color: '#1f242a',
                      fontSize: 14,
                      fontWeight: 800,
                      position: 'bottom',
                      lineHeight: 40
                  }
              };
              node.symbolSize=[23, 26];
              node.sizeFlag=[23, 26];
              node.symbol = svgDataTemp[node.attributes.modularity_class];
              // node.symbol = 'path://M999.041908 264.483956a65.537436 65.537436 0 0 0-28.728739-30.524286L542.524285 7.720849a65.986323 65.986323 0 0 0-61.946344 0L53.237945 232.613011a64.639663 64.639663 0 0 0-17.506576 15.711029 58.804138 58.804138 0 0 0-11.222163 14.36437A65.08855 65.08855 0 0 0 17.327021 291.866035v439.459934a68.230756 68.230756 0 0 0 36.808697 59.253025l426.89111 224.443275a72.270735 72.270735 0 0 0 30.524285 8.528844h4.937753a63.74189 63.74189 0 0 0 26.035419-6.733298l427.339997-224.443275a67.781869 67.781869 0 0 0 35.013151-59.253025V291.866035a65.986323 65.986323 0 0 0-5.835525-27.382079zM511.102227 505.98492v427.339997L103.962125 718.308259V282.888304l407.588988 224.443276h4.937753z'
          } else {
              node.symbolSize=[0, 0];
              node.sizeFlag=[0, 0];
          }

      })
    },
    updateLinkData() {
      let mainLinkDataTemp = this.mainLinkData
      let graphDataTemp = this.graphData
      let _this = this
      let unPassArray = []

      // 更新节点状态
      for(let key in this.data) {
        if(key.indexOf('Main') > -1) {
          // 更新大环节节点状态
          let array = this.data[key].split(',')
          let curColor = this.stateColor[key.split('Main')[0]]
          array.forEach((v,i)=> {
            let j = _.findIndex(mainLinkDataTemp, function (chr) {
              return chr.name === v
            })
            if (j > -1) {
              mainLinkDataTemp[j].textStyle.backgroundColor = curColor
              mainLinkDataTemp[j].textStyle.shadowColor = curColor
              mainLinkDataTemp[j].textStyle.shadowBlur = curColor
            }
          })
          mainLinkDataTemp[3].textStyle.backgroundColor = mainLinkDataTemp[2].textStyle.backgroundColor
          mainLinkDataTemp[3].textStyle.color = mainLinkDataTemp[2].textStyle.backgroundColor
        } else {
          // 更新小环节节点状态
          let array = this.data[key].split(',')
          let curLinkState = key.split('Link')[0]
          let curColor = this.stateColor[curLinkState]
          array.forEach((v,i)=> {
            let j = _.findIndex(graphDataTemp.nodes, function (chr) {
              return chr.linkID === v
            })
            if (j > -1) {
              graphDataTemp.nodes[j].itemStyleColor = curColor
              graphDataTemp.nodes[j].curLinkState = curLinkState
            }
          })
        }
      }

      //循环 graphData生成link,初始化连线颜色为灰色,初始化临时节点的箭头样式
      for (let i = 0;i<graphDataTemp.nodes.length;i++){
        let nodes = graphDataTemp.nodes[i]
        if (_this.stateLinkArray.indexOf(nodes.curLinkState) == -1){
          nodes.itemStyleColor = '#b2b2b2'
          nodes.curLinkState = 'lock'
        }
        graphDataTemp.links.push({
          id: i,
          source: nodes.source,
          sourceName: nodes.name,
          linkID: nodes.linkID,
          curLinkState: nodes.curLinkState,
          target: nodes.target,
          lineStyle:{
            normal: {
              color: '#b2b2b2',
              width: 1
            }
          },
          symbol: nodes.target.indexOf('temp') > -1 ? ['none', 'circle'] : ['none', 'arrow'],
          symbolSize: nodes.target.indexOf('temp') > -1 ? [1, 1] : [2, 7]
        })
      }

      // 从后往前遍历节点，查找路径，修改节点状态
      for (let k = graphDataTemp.nodes.length - 1;k>=0;k--){
        // 记录当前节点
        let curNode = graphDataTemp.nodes[k]
        if (curNode.curLinkState === 'lock') {
          // 如果当前节点=='lock'说明其未解锁，不操作，
        } else {
          // 否则过滤得到当前节点的前一节点集合
          // let filterPreLinkArray = [] // 前一节点数组集合
          // graphDataTemp.links.filter((element, i)=>{
          //   if(curNode.source == element.target) {
          //     filterPreLinkArray.push(element)
          //   }
          //   return false
          // })
          debugger
          let filterPreLinkArray = this.findPreLinkArray(graphDataTemp.links, curNode.source)
          // 如果数组集合元素为1，说明当前元素只有一个前节点，则前一节点的颜色，必然和当前节点颜色一致
          if (filterPreLinkArray.length == 1) {
            filterPreLinkArray[0].lineStyle = lineStyle[curNode.curLinkState]
          } else if (filterPreLinkArray.length > 1) {
            // 如果有多个前节点，则找到前节点是否包含temp节点
            // 如果不包含temp 节点，再遍历前节点，看是否存在父子关系
            let filterPreIDPassArray = []
            for (let f = 0;f <filterPreLinkArray.length;f++) {
              let passCurSource = filterPreLinkArray[f].source
              //  = []
               let idPassArray = this.findPreLinkArray(graphDataTemp.links, passCurSource)
               console.log(idPassArray)
            }
          }

        }
      }


 //-----old-----old--------old-------修改link连接线状态----//
      // for (let k = graphDataTemp.nodes.length - 1;k>=0;k--){
      //   debugger
      //   let source = graphDataTemp.nodes[k].source
      //   if (graphDataTemp.nodes[k].itemStyleColor!=="#b2b2b2") {
      //     let jArray = []
      //     let tempArray = graphDataTemp.links.filter((element, i)=>{
      //       if(element.target === source) {
      //         jArray.push(i)
      //       }
      //       return false
      //     })
      //     jArray.forEach((v,i)=>{
      //       if(graphDataTemp.links[v].source.indexOf('temp')===-1){
      //         graphDataTemp.links[v].lineStyle.normal.color = graphDataTemp.nodes[k].itemStyleColor
      //         if (graphDataTemp.links[v].source.indexOf('_')>-1 && graphDataTemp.links[v].target.indexOf('_')>-1){
      //           unPassArray.push(graphDataTemp.nodes[k].source)
      //         }
      //       }
      //     })
      //   }
      // }
 // 修改link连接线状态
      // for (let k = graphDataTemp.nodes.length - 1;k>=0;k--){
      //   let source = graphDataTemp.nodes[k].source
      //   if (graphDataTemp.nodes[k].itemStyleColor!=="#b2b2b2") {
      //     let jArray = []
      //     let tempArray = graphDataTemp.links.filter((element, i)=>{
      //       if(element.target === source) {
      //         jArray.push(i)
      //       }
      //       return false
      //     })
      //     if(jArray.length === 1 ) {
      //       if (unPassArray.indexOf(graphDataTemp.links[jArray[0]].source)=== -1) {
      //         graphDataTemp.links[jArray[0]].lineStyle.normal.color = graphDataTemp.nodes[k].itemStyleColor
      //         if (graphDataTemp.links[jArray[0]].source.indexOf('temp')>-1) {

      //            _this.recursion(graphDataTemp, jArray[0],unPassArray)
      //         }
      //       }
      //     } else if(jArray.length>1){
      //       let array = {}
      //       jArray.forEach((v,i)=>{
      //         if(graphDataTemp.links[v].source.indexOf('temp') > -1){
      //           array[v] = {}
      //           _this.recursion1(graphDataTemp, v,unPassArray,array)
      //         }
      //       })
      //       let parentArray = []
      //       let str =JSON.stringify(array)
      //       let obj
      //       let boo = true
      //       while (boo){
      //           str = str.replace(/((\")(\d+)(\")(:)(\{)(\})(,)?){1,}/g, '')
      //           let newStr = str.replace(/((\")(\d+)(\")(:)(\{)(\})(,)?){1,}/g, '')
      //         if(str.length == newStr.length) {
      //           boo = false
      //           obj = JSON.parse(str.replace(/((\})(,)(\})){1,}/g,'}}'))
      //         } else {
      //           str = newStr
      //         }
      //       }
      //       for (var key in obj) {
      //         if (Object.keys(obj[key]).length === 0) {
      //           return
      //         }
      //         if(!isNaN(key)){
      //           graphDataTemp.links[parseInt(key)].lineStyle.normal.color = graphDataTemp.nodes[k].itemStyleColor
      //           this.recursion3(obj[key],graphDataTemp.links, graphDataTemp.nodes[k].itemStyleColor)
      //         }
      //       }
      //     }

      //   }
      // }
    },
    // 找到当前节点的所有前节点并返回array ,source为当前节点
    findPreLinkArray (allArray, source) {
      let array = []
      allArray.filter((element, i)=>{
            if(source == element.target) {
              array.push(element)
            }
            return false
      })
      return array
    },
    recursion3(obj,linksObj,color) {
      for (var key in obj) {
          if (Object.keys(obj[key]).length === 0) {
            return
          }
          if(!isNaN(key)){
            linksObj[parseInt(key)].lineStyle.normal.color = color
            this.recursion3(obj[key],linksObj,color)
          } else {
            break
          }
        }
    },
    recursion1 (graphDataTemp, v, unPassArray,array) {
      let sourceLink = graphDataTemp.links[v]
      let _this = this
      graphDataTemp.nodes.forEach((element,i)=>{
        let upPassBoo = unPassArray.indexOf(graphDataTemp.links[i].target) > -1
        if (upPassBoo) {
            return
        }
        let newObj = array[v];
          if(graphDataTemp.links[i].target==sourceLink.source) {
            newObj[i]={}
            if (graphDataTemp.links[i].source.indexOf('temp')>-1) {
                _this.recursion1(graphDataTemp, i,unPassArray,array[v])
            } else {
              if (element.source === element.id && element.itemStyleColor!=='#b2b2b2') {
              } else {
                 let index = _.findIndex(graphDataTemp.nodes,(v,m)=>{
                   return v.id === element.source
                 })
                 if (index > -1 && graphDataTemp.nodes[index].itemStyleColor !== '#b2b2b2') {
                   newObj[i]=graphDataTemp.nodes[index]
                 }
              }
              return
            }
          }

      })
    },
    recursion (graphDataTemp, v, unPassArray) {
      let sourceLink = graphDataTemp.links[v]
      let _this = this
      graphDataTemp.nodes.forEach((element,i)=>{
        let upPassBoo = unPassArray.indexOf(graphDataTemp.links[i].target) > -1
        if (upPassBoo) {
            return
        }

        if (sourceLink.source.indexOf('temp')==-1) {
          return
        } else {
          if(graphDataTemp.links[i].target==sourceLink.source) {
          graphDataTemp.links[i].lineStyle.normal.color = sourceLink.lineStyle.normal.color
            if (graphDataTemp.links[i].source.indexOf('temp')>-1) {
                _this.recursion(graphDataTemp, i,unPassArray)
            }
          }

        }
      })
    },
    async mountedInit() {
      this.getFlowStatusByCaseId(this.caseId);
      // this.data = {
      //   completeLink: '2c90293b6c178b55016c17c255a4000d,2c90293b6c178b55016c17c7ae92000e,2c90293b6c178b55016c17c93326000f,2c9029ee6cac9281016caca7f38e0002,a36b59bd27ff4b6fe96e1b06390d204e',//已完成
      //   //责令改正2c9029ee6cac9281016caca9a0000004
      //   doingLink: '2c9029ee6cac9281016caca9a0000004,a36b59bd27ff4b6fe96e1b06390d204h',// 进行中
      //   //决定执行
      //   unLockLink: '2c9029e16c753a19016c755fe1340001',// 已解锁
      //   completeMainLink: '0,1,2',
      //   doingMainLink: "3"
      // }
      this.updateLinkData()
      this.updateGraphData()
      this.drawFlowChart()

    }
  },
  created () {
  },
  mounted () {
    this.mountedInit()
  },
  components: {
        echarts
  }
}
</script>
<style lang="less" scoped>
// @import "../../../css/caseHandle/index.less";
</style>