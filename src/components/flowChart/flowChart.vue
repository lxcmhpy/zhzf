<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox" >
      <div class="handlePart">
        <!-- <el-button type="primary" size="medium" icon="el-icon-plus">添加</el-button> -->
      </div>
      <div >
        <!-- <div id="aa"><?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg class="icon" width="200px" height="200.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#d81e06" d="M999.041908 264.483956a65.537436 65.537436 0 0 0-28.728739-30.524286L542.524285 7.720849a65.986323 65.986323 0 0 0-61.946344 0L53.237945 232.613011a64.639663 64.639663 0 0 0-17.506576 15.711029 58.804138 58.804138 0 0 0-11.222163 14.36437A65.08855 65.08855 0 0 0 17.327021 291.866035v439.459934a68.230756 68.230756 0 0 0 36.808697 59.253025l426.89111 224.443275a72.270735 72.270735 0 0 0 30.524285 8.528844h4.937753a63.74189 63.74189 0 0 0 26.035419-6.733298l427.339997-224.443275a67.781869 67.781869 0 0 0 35.013151-59.253025V291.866035a65.986323 65.986323 0 0 0-5.835525-27.382079zM511.102227 505.98492v427.339997L103.962125 718.308259V282.888304l407.588988 224.443276h4.937753z"  /></svg></div> -->
          <div id="flowChart" style="width: 1000px;height:550px;margin:0 auto"></div>
      </div>
    </div>
    <!--快速入口 -->
    <caseSlideMenu :activeIndex="'flowChart'" ></caseSlideMenu>

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
            text: '办案流程图',
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
      // 初始顔色狀態
      mainLinkDataTemp.forEach((v,i)=> {
        v.textStyle.backgroundColor = this.stateColor.lock
        v.textStyle.shadowColor = this.stateColor.lock
        v.textStyle.shadowBlur = this.stateColor.lock
        if (i == 3) {
          v.textStyle.backgroundColor = mainLinkDataTemp[2].textStyle.backgroundColor
          v.textStyle.color = mainLinkDataTemp[2].textStyle.backgroundColor
        }
      })
      graphDataTemp.nodes.forEach((v,i)=> {
        v.itemStyleColor = this.stateColor.lock
        v.curLinkState = 'lock'
      })

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
      graphDataTemp.links = []
      for (let i = 0;i<graphDataTemp.nodes.length;i++){
        let nodes = graphDataTemp.nodes[i]
        if (_this.stateLinkArray.indexOf(nodes.curLinkState) == -1){
          nodes.itemStyleColor = '#b2b2b2'
          nodes.curLinkState = 'lock'
        }
        graphDataTemp.links.push({
          id: nodes.id,
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
      // 默认一个节点，最多只有两个前节点横向一个，纵向一个，
      // 从后往前遍历节点，查找路径，修改节点状态
      for (let k = graphDataTemp.nodes.length - 1;k>=0;k--){
        // 记录当前节点
        let curNode = graphDataTemp.nodes[k]
        if (curNode.curLinkState === 'lock') {
          // 如果当前节点=='lock'说明其未解锁，不操作，
        } else {
          this.recursionTempLinkArray (graphDataTemp, curNode, unPassArray)
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
    findAdjacentIndexLinkArray (allArray, source) {
      let array = new Array()
      allArray.filter((v, i)=>{
        if(source == v.target) {
          array.push(i)
          return true
        }
        return false
      })
      // debugger
      return array
    },
    // 找到当前节点的所有前节点并返回array ,source为当前节点
    findAdjacentLinkArray (allArray, source) {
      let array = new Array()
      allArray.filter((v, i)=>{
        if(source == v.target) {
          array.push(v)
          return true
        }
        return false
      })
      // debugger
      return array
    },
    recursionTempLinkArray (graphDataTemp, curNode, unPassArray) {
         // let filterPreSourceLinkArray = new Array()
          // let filterPreTargetLinkArray = new Array()
          // 寻找当前节点的前一节点
          // debugger
          let filterPreSourceLinkArray = this.findAdjacentLinkArray(graphDataTemp.links, curNode.source)
          // 寻找所有 -> 指向当前节点的target 的所有节点
          let filterPreTargetLinkArray = this.findAdjacentLinkArray(graphDataTemp.links, curNode.target)
          let checkNumber = {
            hasSiblingsNumber: null,
            parent: null,
            tempList: []
          }
          // 如果数组集合元素为1，说明当前元素只有一个前节点，则前一节点的颜色，必然和当前节点颜色一致
          if (filterPreSourceLinkArray.length == 1) {
            filterPreSourceLinkArray[0].lineStyle = this.lineStyle[curNode.curLinkState]
            filterPreSourceLinkArray[0].curLinkState = curNode.curLinkState
            if (filterPreSourceLinkArray[0].source.indexOf('temp') > -1) {
              this.recursionTempLinkArray(graphDataTemp, filterPreSourceLinkArray[0], unPassArray)
            }
          } else if (filterPreSourceLinkArray.length > 1) {
            // 如果有多个前节点，则找到前节点是否包含temp节点
            // 如果不包含temp 节点，再遍历前节点，同一列节点优先选中，分支横向节点不选中
            // let filterPresourcePassArray = new Array()
            for (let f = 0;f <filterPreSourceLinkArray.length;f++) {
              // 正则表达式删选，除去最后一位的，节点111
              let curFilterPreSourceLink = filterPreSourceLinkArray[f]
              let str = curFilterPreSourceLink.source.substring(0, curFilterPreSourceLink.source.length - 1)
              if(curFilterPreSourceLink.curLinkState == 'lock') {
                // 过滤的节点curlinkstate为lock说明未解锁(也可能为temp节点)，此时，放入temp节点
                if (curFilterPreSourceLink.source.indexOf('temp') > -1) {
                  checkNumber.tempList.push(curFilterPreSourceLink)
                }
              } else {
                if (str !== '' && curNode.source.indexOf(str) > -1) {
                  // str不为空，并且source有相同部分，说明是相邻节点（状态不是“未解锁”） ，记录
                  checkNumber.hasSiblingsNumber = f
                } else {
                  // 非相邻节点，记录
                  checkNumber.parent = f
                }
              }
            }

            if (typeof checkNumber.hasSiblingsNumber == 'number') {
              // 有兄弟节点并且有颜色状态
              filterPreSourceLinkArray[checkNumber.hasSiblingsNumber].lineStyle = this.lineStyle[curNode.curLinkState]
              filterPreSourceLinkArray[checkNumber.hasSiblingsNumber].curLinkState = curNode.curLinkState
              // this.recursionTempLinkArray(graphDataTemp, filterPreSourceLinkArray[checkNumber.hasSiblingsNumber])
            } else if (typeof checkNumber.parent == 'number') {
              // 有父节点，无兄弟节点，并且父级节点有颜色状态
              filterPreSourceLinkArray[checkNumber.parent].lineStyle = this.lineStyle[curNode.curLinkState]
              filterPreSourceLinkArray[checkNumber.parent].curLinkState = curNode.curLinkState
              // this.recursionTempLinkArray(graphDataTemp, filterPreSourceLinkArray[checkNumber.other])
            } else if (checkNumber.tempList.length > 0) {

              if (checkNumber.tempList.length == 1) {
                // 临时节点有一个
                checkNumber.tempList[0].lineStyle = this.lineStyle[curNode.curLinkState]
                checkNumber.tempList[0].curLinkState = curNode.curLinkState

                this.recursionTempLinkArray(graphDataTemp, checkNumber.tempList[0], unPassArray)
              } else {
              // 有多个temp节点(待开发)
                let that = this
                for (let m = 0; m < checkNumber.tempList.length;m++) {

                  let source = checkNumber.tempList[m].source
                  if (source == 'temp7_2_1') {
                    // debugger
                  }
                  let boo = false
                  graphDataTemp.links.forEach((v, i)=>{
                  // for (let i = graphDataTemp.links.length -1; i >= 0; i--) {
                  //     let v = graphDataTemp.links[i]
                      if(v.target === source) {
                        let tempIndexObj= {}
                        tempIndexObj[i] = {}
                        tempIndexObj[i].node = v
                        let other = false
                        that.findTempIndexArray(graphDataTemp.links, tempIndexObj, i, other)
                        console.log(tempIndexObj)
                        let tempStr = JSON.stringify(tempIndexObj)
                        if (tempStr.indexOf('"curLinkState":"complete"')  > -1 ||
                        tempStr.indexOf('"curLinkState":"doing"')  > -1 ||
                        tempStr.indexOf('"curLinkState":"unLock"')  > -1) {
                              v.lineStyle = this.lineStyle.complete
                              v.curLinkState = "complete"
                              boo = true
                        }
                      }
                  })
                  if (boo) {
                    checkNumber.tempList[m].lineStyle = this.lineStyle.complete
                    checkNumber.tempList[m].curLinkState = "complete"
                  }


                  // graphDataTemp.links.forEach((v, i)=>{
                  //   if(v.target === source) {
                  //     let tempIndexObj= {}
                  //     let checkIndex = null
                  //     tempIndexObj[i] = {}
                  //     tempIndexObj[i].node = v
                  //     that.findTempIndexArray(graphDataTemp.links, tempIndexObj, i, checkIndex)
                  //     console.log(tempIndexObj)
                  //     debugger
                  //     let str = JSON.stringify(tempIndexObj[i])
                  //     if (str.indexOf('"curLinkState":"complete"')  > -1 ||
                  //         str.indexOf('"curLinkState":"doing"')  > -1 ||
                  //         str.indexOf('"curLinkState":"unLock"')  > -1) {
                  //           v.lineStyle = {
                  //                           normal: {
                  //                             color: '#f2a010',
                  //                             width: 2
                  //                           }
                  //                         }
                  //           v.curLinkState = "doing"
                  //     }
                  //   }
                  // })
                }
              }
            }

          }
    },
    findTempIndexArray(links, tempIndexObj, m, other) {

      let tempObj = tempIndexObj[m]
      let source = tempIndexObj[m].node.source
      let id = tempIndexObj[m].node.id
      let boo = false
      let current = null
      if (source.indexOf('temp') > -1 || other) {
        let that = this
        for (let i = links.length -1; i>=0 ; i--) {
          let v = links[i]
          if(v.target === source) {
            let checkIndex = null
              tempObj[i] = {}
              tempObj[i].node = v
              that.findTempIndexArray(links, tempObj, i, false)
            let str = JSON.stringify(tempIndexObj[m])

            if (str.indexOf('"curLinkState":"complete"')  > -1 ||
                str.indexOf('"curLinkState":"doing"')  > -1 ||
                str.indexOf('"curLinkState":"unLock"')  > -1) {
                  v.lineStyle = this.lineStyle.complete
                  v.curLinkState = "complete"
                  boo = true
                  current = v
            }
          }
        }

        // if (boo && current.source.indexOf('temp') === -1) {
        //   debugger
        //     let s = v.source
        //     let index = _.findIndex(links,(chr)=>{
        //       return chr.target = s
        //     })
        //     links[index].lineStyle = {
        //                                 normal: {
        //                                   color: '#f2a010',
        //                                   width: 2
        //                                 }
        //                               }
        //     links[index].curLinkState = "doing"
        //   }
      }
    },
    async mountedInit() {
      this.getFlowStatusByCaseId(this.caseId);
      // this.data = {
      //   // completeLink: '2c90293b6c178b55016c17c255a4000d,2c90293b6c178b55016c17c93326000f,2c9029ee6cac9281016caca7f38e0002,2c9029ee6cac9281016caca9a0000004,a36b59bd27ff4b6fe96e1b06390d204h,2c9029e16c753a19016c755fe1340001,2c9029ee6cac9281016cacaadf990006',//已完成
      //   // completeLink: '2c90293b6c178b55016c17c255a4000d,2c90293b6c178b55016c17c93326000f,2c9029ee6cac9281016caca7f38e0002,a36b59bd27ff4b6fe96e1b06390d204f,2c9029ee6cac9281016cacaadf990006',//已完成
      //   // completeLink: '2c90293b6c178b55016c17c255a4000d,2c90293b6c178b55016c17c93326000f,2c9029ee6cac9281016caca7f38e0002,a36b59bd27ff4b6fe96e1b06390d204g,2c9029ee6cac9281016cacaadf990006',//已完成
      //   completeLink: '2c90293b6c178b55016c17c255a4000d,2c90293b6c178b55016c17c7ae92000e,2c90293b6c178b55016c17c93326000f,2c9029ee6cac9281016caca7f38e0002,2c9029ee6cac9281016caca8ea500003,2c9029ac6c26fd72016c27247b290003,2c9029d56c8f7b66016c8f8043c90001,2c9029e16c753a19016c755fe1340001,2c9029ee6cac9281016cacaadf990006',//已完成
      //   //责令改正2c9029ee6cac9281016caca9a0000004
      //   doingLink: '',// 进行中
      //   //决定执行
      //   unLockLink: '',// 已解锁
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
        echarts,
        caseSlideMenu
  }
}
</script>
<style lang="less" scoped>
// @import "../../../css/caseHandle/index.less";
// @import "../../css/caseHandle/index.less";
@import "../../css/documentForm.less";
</style>
