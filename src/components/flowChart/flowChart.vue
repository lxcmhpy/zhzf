<template>
  <div class="com_searchAndpageBoxPadding chartBg">
    <div class="searchAndpageBox " style="padding:0px;padding-top: 20px">
      <div class="handlePart" style="text-align:right;margin-right:50px">
        <el-button type="primary" size="medium" v-if="showAdminCoerciveMeasureBtn" @click="goToAdminCoerciveMeasure">行政强制措施</el-button>
        <!-- <div> -->
        <el-tooltip class="item" effect="dark" v-if="showREBtn && !alReadyFinishCoerciveM" placement="top-start">
          <div slot="content">措施起止期限：<br />{{measureDate}}</div>
          <el-button type="primary" size="medium" @click="showRemoveOrExtend">解除（延长）强制措施</el-button>
        </el-tooltip>
        <!-- </div> -->
        <el-button type="primary" size="medium" v-if="alReadyFinishCoerciveM">已解除强制措施</el-button>
      </div>
      <div style="overflow-y:auto;">
        <!-- <div id="aa"><?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg class="icon" width="200px" height="200.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#d81e06" d="M999.041908 264.483956a65.537436 65.537436 0 0 0-28.728739-30.524286L542.524285 7.720849a65.986323 65.986323 0 0 0-61.946344 0L53.237945 232.613011a64.639663 64.639663 0 0 0-17.506576 15.711029 58.804138 58.804138 0 0 0-11.222163 14.36437A65.08855 65.08855 0 0 0 17.327021 291.866035v439.459934a68.230756 68.230756 0 0 0 36.808697 59.253025l426.89111 224.443275a72.270735 72.270735 0 0 0 30.524285 8.528844h4.937753a63.74189 63.74189 0 0 0 26.035419-6.733298l427.339997-224.443275a67.781869 67.781869 0 0 0 35.013151-59.253025V291.866035a65.986323 65.986323 0 0 0-5.835525-27.382079zM511.102227 505.98492v427.339997L103.962125 718.308259V282.888304l407.588988 224.443276h4.937753z"  /></svg></div> -->
        <div id="flowChart" style="margin:0 auto;width: 1180px;height: 680px"></div>
      </div>
      <div>
        <template v-for="(item,index) in legend">
          <span :key="index">
            <span style="display:inline-block;width:12px;height:12px;border-radius:50%;margin:0 5px;" :style="'background:'+item.textStyle.color"></span>
            <span style="display:inline-block;font-size: 12px;margin-right: 20px" :style="'color:'+item.textStyle.color">{{item.name}}</span>
          </span>
        </template>
      </div>
    </div>
    <!--快速入口 -->
    <caseSlideMenu :activeIndex="'flowChart'"></caseSlideMenu>
    <pleaseRemoveMDia ref="pleaseRemoveMDiaRef"></pleaseRemoveMDia>
  </div>
</template>
<script>
import caseSlideMenu from '@/page/caseHandle/components/caseSlideMenu';
import echarts from 'echarts';
// import 'echarts/lib/chart/graph'
import _ from 'lodash'
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import { svgData, imgList, linePosition, stateColor, lineStyle, graphData, mainLinkData, layoutCharts, legend } from './json/flowChart'
import pleaseRemoveMDia from '@/page/caseHandle/components/pleaseRemoveMDia'
import {
  queryFlowBycaseIdApi,
} from "@/api/caseHandle";
export default {
  data() {
    return {
      stateColor: stateColor,
      lineStyle: lineStyle,
      legend: legend,
      layoutCharts: layoutCharts,
      graphData: '',
      svgData: svgData,
      imgList: imgList,
      // 立案 0 调查 1 决定 2 执行 3 结案
      mainLinkData: mainLinkData,
      data: {},
      stateLinkArray: ['complete', 'doing', 'unLock'],
      showREBtn: false,
      measureDate: "",
      alReadyFinishCoerciveM: false, //解除（延长）强制措施已完成
      measureDateEndTime: '', //解除（延长）强制措施截止时间
      showAdminCoerciveMeasureBtn:false,
      currentFlow:'',
    }
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(['caseId','province']) },
  methods: {
    async getFlowStatusByCaseId(id) {
      //   console.log(id)
      let _this = this;
      // let currentFlow = '';
      try{
        this.currentFlow = await queryFlowBycaseIdApi(this.caseId);
      }catch(err){
        this.$message('获取案件流程失败！')
      }
      if(this.currentFlow.data.flowName == '处罚流程'){
         _this.graphData = graphData.commonGraphData;
      }else if(this.currentFlow.data.flowName == '赔补偿流程'){
         _this.graphData = graphData.compensationGraphData;
      }else if(this.currentFlow.data.flowName == '江西流程'){
         _this.graphData = graphData.commonGraphData_JX;
      }
      // if(this.province == 'BZ'){  //标准版
      //   if(_this.caseFlowData.flowName == "赔补偿流程"){
      //     _this.graphData = graphData.compensationGraphData;
      //   }else{
      //     _this.graphData = graphData.commonGraphData;
      //   }
      // }else if(this.province == 'JX'){  //江西
      //     _this.graphData = graphData.commonGraphData_JX;
      // }
      // console.log('_this.province',_this.province);
      // console.log('_this.graphData',_this.graphData);
      
      this.$store.dispatch("getFlowStatusByCaseId", id).then(
        res => {
          console.log('流程图', res)
         
          _this.data = res.data;
          _this.updateLinkData()
          _this.updateGraphData()
          _this.drawFlowChart()
          //是否显示解除（延长）强制措施按钮
          _this.showRemoveOrExtendBtn(res.data.completeLink);
          //是否显示行政强制措施按钮
          if(this.currentFlow.data.flowName == '江西流程'){
            _this.showAdminCoerciveMeasureBtnByFlow(res.data);
          }
          //显示强制时间
          _this.getMeasuerTime();

        },
        err => {
          //   console.log(err);
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
          textStyle: {
            fontSize: 26
          },
          left: '40%'
        },
        legend: [{    //图例组件
          //   data: graphTemp.nodes,
          // data: [{
          //     name: '已解锁',
          //     itemStyleColor: 'unLock',
          //     // 强制设置图形为圆。
          //     icon: 'circle',
          //     // 设置文本为红色
          //     textStyle: {
          //         color: '#0074F5'
          //     }
          // }, {
          //     name: '进行中',
          //     // 强制设置图形为圆。
          //     itemStyleColor: 'doing',
          //     icon: 'circle',
          //     // 设置文本为红色
          //     textStyle: {
          //         color: '#F0AE11'
          //     }
          // }, {
          //     name: '已完成',
          //     // 强制设置图形为圆。
          //     itemStyleColor: 'complete',
          //     icon: 'circle',
          //     // 设置文本为红色
          //     textStyle: {
          //         color: '#00B93B'
          //     }
          // }, {
          //     name: '未解锁',
          //     // 强制设置图形为圆。
          //     itemStyleColor: 'lock',
          //     icon: 'circle',
          //     // 设置文本为红色
          //     textStyle: {
          //         color: '#B2B2B2'
          //     }
          // }].map(function (a) {
          //     return a.itemStyleColor;
          // }),
          // zlevel: 110,
          // show: true,
          // type: 'plain',
          // top: 'auto',
          // left: 'auto'
        }],
        calculable: true,
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        grid: {
          left: '0%',
          top: '2%',
          right: '0%',
          bottom: '40',
          containLabel: true,
        },
        xAxis: [
          {
            //     position:'top',
            type: 'category',
            axisLine: {
              lineStyle: {
                type: 'none',
                color: 'white'
              }
            }
          },
          // {
          //     position:'top',
          //     nameLocation: 'start',
          //     type : 'category',
          //     axisLine: {
          //         lineStyle: {
          //             type: 'dashed',
          //             color:'#f8f8fc',
          //             shadowColor:'#f8f8fc'
          //         }
          //     },
          //     // data: mainLinkDataTemp
          // }
          // {
          //     position:'top',
          //     type : 'value',
          //     min: 0,
          //     max: layoutCharts.splitNumber,
          //     axisLine: {
          //         lineStyle: {
          //             type: 'dashed',
          //             color:'#ccc',
          //             shadowOffsetX: 10,
          //             shadowColor:'#ccc',
          //         }
          //     },
          //     splitLine: {
          //         lineStyle: {
          //             type: 'dashed',
          //             shadowOffsetX: 10,
          //             shadowColor:'#ccc',
          //             color:'#ccc',
          //         },
          //     },
          //     axisLabel: {
          //         show: false
          //     },
          //     splitNumber: layoutCharts.splitNumber,
          //     interval: 1,
          // }
          // ,{
          //     position:'top',
          //     nameLocation: 'start',
          //     type : 'category',
          //     axisLine: {
          //         lineStyle: {
          //             type: 'dashed',
          //             color:'#ccc',
          //             shadowColor:'#ccc'
          //         }
          //     },
          //     data: mainLinkDataTemp
          // }
        ],
        yAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              type: 'none',
              color: 'white'
            }
          }
        },
        series: [
          {
            type: 'graph',
            // symbol:'rect',
            edgeSymbolSize: [2, 7],
            top: 120,
            // itemStyle: {
            //     borderColor: 'orange',
            //     borderWidth: 2,
            //     backgroundColor: 'white',
            //     color: 'white'
            // },
            data: graphTemp.nodes, 
            links: graphTemp.links,
            draggable: false,   //注意这里设置为false,不然拖拽鼠标和节点有偏移
          }
        ]

      };
      flowChart.setOption(option)
      let that = this;
      flowChart.off('click');
      flowChart.on('click', function (params) {
        if (params.name) {
          // complete: '#0174f5',//已完成  doing: '#f2a010',// 进行中  unLock: '#52c2b6',// 已解锁  lock: '#b2b2b2' //未解锁
          if (that.stateLinkArray.indexOf(params.data.curLinkState) > -1) {
            //跳转
            that.flowShowPdfOrFormBefore(params.data, that.data);
          }
        }

      })
    },
    updateGraphData() {
      //   let svgDataTemp = this.svgData
      let imgListTemp = this.imgList
      let stateColorTemp = this.stateColor
      let layoutCharts = this.layoutCharts
      this.graphData.nodes.forEach(function (node) {
        node.x = parseInt(node.position.y * layoutCharts.xMargin);
        node.y = parseInt(node.position.x * layoutCharts.yMargin);
        if (node.attributes.modularity_class !== 'hide') {

          //   node.itemStyle = {
          //     normal:{
          //         color: node.itemStyleColor == '' ? stateColorTemp.lock : node.itemStyleColor
          //     }
          //   }
          node.label = {
            // symbolSize: [20,50],
            normal: {
              show: true,
              fontSize: 14,
              fontWeight: 800,
              position: 'inside',
              offset: [0, 20],
              color: node.itemStyleColor ? stateColorTemp[node.itemStyleColor] : stateColorTemp.lock
            },
          };
          let curState = node.itemStyleColor ? node.itemStyleColor : 'lock';
          let url = 'image://./static/images/chart/' + imgListTemp[node.attributes.modularity_class] + '_' + curState + '.png';
          node.symbolSize = [98, 114];
          node.symbol = url;
          //   node.symbol = 'image://http://localhsot:8075/static/images/chart/'+imgListTemp[node.attributes.modularity_class] + '_lock.png'
          //   node.symbol = svgDataTemp[node.attributes.modularity_class];
          // node.symbol = 'path://M999.041908 264.483956a65.537436 65.537436 0 0 0-28.728739-30.524286L542.524285 7.720849a65.986323 65.986323 0 0 0-61.946344 0L53.237945 232.613011a64.639663 64.639663 0 0 0-17.506576 15.711029 58.804138 58.804138 0 0 0-11.222163 14.36437A65.08855 65.08855 0 0 0 17.327021 291.866035v439.459934a68.230756 68.230756 0 0 0 36.808697 59.253025l426.89111 224.443275a72.270735 72.270735 0 0 0 30.524285 8.528844h4.937753a63.74189 63.74189 0 0 0 26.035419-6.733298l427.339997-224.443275a67.781869 67.781869 0 0 0 35.013151-59.253025V291.866035a65.986323 65.986323 0 0 0-5.835525-27.382079zM511.102227 505.98492v427.339997L103.962125 718.308259V282.888304l407.588988 224.443276h4.937753z'
        } else {
          node.symbolSize = [0, 0];
          node.sizeFlag = [0, 0];
        }

      })
    },
    updateLinkData() {
      let mainLinkDataTemp = this.mainLinkData
      let graphDataTemp = this.graphData
      let _this = this
      //   let unPassArray = []
      // 初始顔色狀態
      mainLinkDataTemp.forEach((v, i) => {
        v.textStyle.backgroundColor = this.stateColor.lock
        v.textStyle.shadowColor = this.stateColor.lock
        v.textStyle.shadowBlur = this.stateColor.lock
        // if (i == 3) {
        //   v.textStyle.backgroundColor = mainLinkDataTemp[2].textStyle.backgroundColor
        //   v.textStyle.color = mainLinkDataTemp[2].textStyle.backgroundColor
        // }
      })
      graphDataTemp.nodes.forEach((v, i) => {
        // v.itemStyleColor = this.stateColor.lock
        v.itemStyleColor = 'lock'
        v.curLinkState = 'lock'
      })

      // 更新节点状态
      for (let key in this.data) {
        if (key.indexOf('Main') > -1) {
          // 更新大环节节点状态
          let array = this.data[key].split(',')
          let curColor = this.stateColor[key.split('Main')[0]]
          array.forEach((v, i) => {
            let j = _.findIndex(mainLinkDataTemp, function (chr) {
              return chr.name === v
            })
            if (j > -1) {
              mainLinkDataTemp[j].textStyle.backgroundColor = curColor
              mainLinkDataTemp[j].textStyle.shadowColor = curColor
              mainLinkDataTemp[j].textStyle.shadowBlur = curColor
            }
          })
          //   mainLinkDataTemp[3].textStyle.backgroundColor = mainLinkDataTemp[2].textStyle.backgroundColor
          //   mainLinkDataTemp[3].textStyle.color = mainLinkDataTemp[2].textStyle.backgroundColor
        } else {
          // 更新小环节节点状态
          let array = this.data[key].split(',')
          let curLinkState = key.split('Link')[0]
          //   let curColor = this.stateColor[curLinkState]
          array.forEach((v, i) => {
            let j = _.findIndex(graphDataTemp.nodes, function (chr) {
              return chr.linkID === v
            })
            if (j > -1) {
              graphDataTemp.nodes[j].itemStyleColor = curLinkState
              graphDataTemp.nodes[j].curLinkState = curLinkState
            }
          })
        }
      }

      //循环 graphData生成link,初始化连线颜色为灰色,初始化临时节点的箭头样式
      graphDataTemp.links = []
      for (let i = 0; i < graphDataTemp.nodes.length; i++) {
        let nodes = graphDataTemp.nodes[i]
        if (_this.stateLinkArray.indexOf(nodes.curLinkState) == -1) {
          //   nodes.itemStyleColor = '#b2b2b2'
          nodes.itemStyleColor = 'lock'
          nodes.curLinkState = 'lock'
        }
        graphDataTemp.links.push({
          id: nodes.id,
          source: nodes.source,
          sourceName: nodes.name,
          linkID: nodes.linkID,
          curLinkState: nodes.curLinkState,
          target: nodes.target,
          lineStyle: {
            normal: {
              color: '#b2b2b2',
              width: 1,
              type: 'dotted'
            }
          },
          symbol: nodes.target.indexOf('temp') > -1 ? ['none', 'circle'] : ['none', 'arrow'],
          symbolSize: nodes.target.indexOf('temp') > -1 ? [1, 1] : [2, 7]
        })
      }
      // 默认一个节点，最多只有两个前节点横向一个，纵向一个，
      // 从后往前遍历节点，查找路径，修改节点状态
      for (let k = graphDataTemp.nodes.length - 1; k >= 0; k--) {
        // 记录当前节点
        let curNode = graphDataTemp.nodes[k]
        this.recursionTempLinkArray(graphDataTemp, curNode)
      }
    },
    // 找到当前节点的所有前节点并返回array ,source为当前节点
    findAdjacentLinkArray(allArray, source) {
      let array = new Array()
      if (source) {
        allArray.filter((v, i) => {
          if (source == v.target) {
            array.push(v)
            return true
          }
          return false
        })
      }
      // debugger
      return array
    },
    // 找到当前节点的所有后节点并返回array ,source为当前节点
    findNextLinkArray(allArray, source) {
      let array = new Array()
      if (source) {
        allArray.filter((v, i) => {
          if (source == v.source) {
            array.push(v)
            return true
          }
          return false
        })
      }
      // debugger
      return array
    },
    recursionTempLinkArray(graphDataTemp, curNode) {
      // 寻找当前节点的前一节点
      // debugger
      let filterPreSourceLinkArray = this.findAdjacentLinkArray(graphDataTemp.links, curNode.source)
      // 寻找所有 -> 指向当前节点的target 的所有节点
      // let filterPreTargetLinkArray = this.findAdjacentLinkArray(graphDataTemp.links, curNode.target)
      if (curNode.curLinkState === 'lock') {
        // 如果当前节点=='lock'说明其未解锁，不操作，
        return
      }
      let checkNumber = {
        hasSiblingsNumber: null,
        parent: null,
        tempList: []
      }
      if (filterPreSourceLinkArray.length == 1) {
        // 如果数组集合元素为1，说明当前元素只有一个前节点，则前一节点的颜色，必然和当前节点颜色一致
        filterPreSourceLinkArray[0].lineStyle = this.lineStyle[curNode.curLinkState]
        filterPreSourceLinkArray[0].curLinkState = curNode.curLinkState
        if (filterPreSourceLinkArray[0].source.indexOf('temp') > -1) {
          // 前一节点不是临时节点，则默认选中
          this.recursionTempLinkArray(graphDataTemp, filterPreSourceLinkArray[0])
        }
      } else if (filterPreSourceLinkArray.length > 1) {
        // 如果有多个前节点，则找到前节点是否包含temp节点
        // 如果不包含temp 节点，再遍历前节点，同一列节点优先选中，分支横向节点不选中
        // let filterPresourcePassArray = new Array()
        for (let f = 0; f < filterPreSourceLinkArray.length; f++) {
          // 正则表达式删选，除去最后一位的，节点111
          let curFilterPreSourceLink = filterPreSourceLinkArray[f]
          if (curNode.curLinkState === 'unLock' && curFilterPreSourceLink.curLinkState.indexOf('lock') === -1) {
            curFilterPreSourceLink.lineStyle = this.lineStyle[curNode.curLinkState]
            curFilterPreSourceLink.curLinkState = curNode.curLinkState
          }
          let str = curFilterPreSourceLink.source.substring(0, curFilterPreSourceLink.source.length - 1)
          if (curFilterPreSourceLink.curLinkState == 'lock') {
            // 过滤的节点curlinkstate为lock说明未解锁(也可能为temp节点)
            if (curFilterPreSourceLink.source.indexOf('temp') > -1) {
              // 如果是temp节点
              checkNumber.tempList.push(curFilterPreSourceLink)
            }
            // 前一节点为temp临时节点,并且当前状态是已解锁，则修改状态为已解锁
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

            this.recursionTempLinkArray(graphDataTemp, checkNumber.tempList[0])
          } else {
            checkNumber.tempList.forEach((v, i) => {
              this.updateTempLinkByNotTempArray(graphDataTemp, v.source, curNode)
            })
          }
        }
      }
    },
    updateTempLinkByNotTempArray(graphDataTemp, source, curNode) {
      let firstNodes = this.findAdjacentLinkArray(graphDataTemp.links, source)
      // let isTrue = firstNodes.length === 1
      firstNodes.forEach((v1, i1) => {
        // if (v1.target === v.source) {
        if (v1.source.indexOf('temp') > -1) {
          if (v1.curLinkState !== 'lock') {
            if (firstNodes.length == 1) {
              v1.curLinkState = curNode.curLinkState
              v1.lineStyle = this.lineStyle[curNode.curLinkState]
              // this.updateTempLinkByNotTempArray(graphDataTemp,v1.source, curNode)
            }
          }
          if (v1.id == '7_1') {
            // alert(1)
            // debugger
          }
          this.updateTempLinkByNotTempArray(graphDataTemp, v1.source, curNode)

        } else {
          // 不是临时节点，判断节点状态
          if (v1.curLinkState === 'lock') {
            // 节点未解锁，暂不管
            // let result = this.updateTempLinkByNotTempArray(graphDataTemp,v1,curNode)
            // 判断当前节点id是否为temp，如果是temp，找到id=source的状态
            if (v1.id !== v1.source) {
              let _index = _.findIndex(graphDataTemp.links, (chr) => {
                return chr.id === v1.source
              })
              if (_index > -1 && graphDataTemp.links[_index].curLinkState !== 'lock') {
                // debugger
                let searchNodes = this.findNextLinkArray(graphDataTemp.links, graphDataTemp.links[_index].source)
                // debugger
                searchNodes.forEach((v, i) => {
                  if (v.curLinkState !== 'lock') {
                    let _index1 = _.findIndex(graphDataTemp.links, (chr) => {
                      return chr.id === v.target
                    })
                    if (_index1 > -1 && graphDataTemp.links[_index1].curLinkState !== 'lock') {

                    } else {
                      v1.curLinkState = curNode.curLinkState
                      v1.lineStyle = this.lineStyle[curNode.curLinkState]
                      this.updateNextLinkByNotTempArray(graphDataTemp, v1, curNode)
                    }

                  }
                })
              }
            }
          } else {
            v1.curLinkState = curNode.curLinkState
            v1.lineStyle = this.lineStyle[curNode.curLinkState]
            this.updateNextLinkByNotTempArray(graphDataTemp, v1, curNode)
          }
        }
        // }
        // }
      })
    },
    updateNextLinkByNotTempArray(graphDataTemp, v, curNode) {
      let firstNodes = this.findNextLinkArray(graphDataTemp.links, v.target)
      if (firstNodes.length == 1) {
        firstNodes[0].lineStyle = this.lineStyle[curNode.curLinkState]
        firstNodes[0].curLinkState = curNode.curLinkState
        this.updateNextLinkByNotTempArray(graphDataTemp, firstNodes[0], curNode)
      }
    },
    async mountedInit() {
      this.getFlowStatusByCaseId(this.caseId);
    },
    //解除或延长强制措施跳转
    showRemoveOrExtend() {
      if(this.currentFlow.data.flowName == '处罚流程'){
        this.$router.push({ name: 'case_handle_removeOrPrelong' }) 
      }else if(this.currentFlow.data.flowName == '江西流程'){
        this.$router.push({ name: 'case_handle_coerciveMeasureDoc_JX' }) 
      }
    },
    //显示解除或延长强制措施按钮
    showRemoveOrExtendBtn(link) {
      let linkArr = link.split(',');
      //行政强制措施数组
      // let adminCoerciveMeasure_caseLinktypeIdArr = [this.BASIC_DATA_SYS.adminCoerciveMeasure_caseLinktypeId,this.BASIC_DATA_JX.adminCoerciveMeasure_JX_caseLinktypeId]
      let adminCoerciveMeasure_caseLinktypeIdArr = this.BASIC_DATA_JX.getAdminCoerciveMeasure_caseLinktypeIdArr();
      
      //解除行政强制措施数组
      // let removeOrPrelong_caseLinktypeIdArr = [this.BASIC_DATA_SYS.removeOrPrelong_caseLinktypeId,this.BASIC_DATA_JX.removeOrPrelong_JX_caseLinktypeId]
      let removeOrPrelong_caseLinktypeIdArr = this.BASIC_DATA_JX.getRemoveOrPrelong_caseLinktypeIdArr();
      //是否显示解除行政强制措施按钮
      console.log('adminCoerciveMeasure_caseLinktypeIdArr',adminCoerciveMeasure_caseLinktypeIdArr)
      console.log('linkArr',linkArr)
      
      for(let item of adminCoerciveMeasure_caseLinktypeIdArr){
        if(linkArr.includes(item)){
          this.showREBtn = true;
          break;
        }
        // if(index == adminCoerciveMeasure_caseLinktypeIdArr.length-1 && !linkArr.includes(item)){
        //   this.showREBtn = false;
        // }
      }
      // adminCoerciveMeasure_caseLinktypeIdArr.forEach((item,index)=>{
      //   console.log('linkArr.includes(item)',linkArr.includes(item))
      //   if(linkArr.includes(item)){
      //     this.showREBtn = true;
      //     return;
      //   }
      //   if(index == adminCoerciveMeasure_caseLinktypeIdArr.length-1 && !linkArr.includes(item)){
      //     this.showREBtn = false;
      //   }
      // })
      //是否显示已解除按钮
      for(let item of removeOrPrelong_caseLinktypeIdArr){
        if(linkArr.includes(item)){
          this.alReadyFinishCoerciveM = true;
          break;
        }
      }
      // removeOrPrelong_caseLinktypeIdArr.forEach(item=>{
      //   if(linkArr.includes(item)){
      //     this.alReadyFinishCoerciveM = true;
      //     return
      //   }
      // })

    },
    //显示行政强制措施按钮
    showAdminCoerciveMeasureBtnByFlow(link){
      //已完成中有未立案  没有结案登记
      let completeLink = link.completeLink.split(',');
      let doingLink = link.doingLink.split(',');
      
      let adminCoerciveMeasure_caseLinktypeIdArr = this.BASIC_DATA_JX.getAdminCoerciveMeasure_caseLinktypeIdArr();
      let adminCoerciveMeasureCompleteFlag = false;
      
      console.log('adminCoerciveMeasure_caseLinktypeIdArr',adminCoerciveMeasure_caseLinktypeIdArr)
      
      for(let item of adminCoerciveMeasure_caseLinktypeIdArr){
        if(completeLink.includes(item)){
          this.showAdminCoerciveMeasureBtn = true;
          break;
        }
      }

      // adminCoerciveMeasure_caseLinktypeIdArr.forEach(item=>{
      //   if(completeLink.includes(item)){
      //     adminCoerciveMeasureCompleteFlag = true;
      //     return
      //   }
      // })
      //如果行政强制已完成 则 显示
      // if(adminCoerciveMeasureCompleteFlag){
      //   this.showAdminCoerciveMeasureBtn = true;
      //   return;
      // } 

      //立案登记数组
      // let establish_caseLinktypeIdArr = [this.BASIC_DATA_SYS.establish_caseLinktypeId,this.BASIC_DATA_JX.establish_JX_caseLinktypeId];
      let establish_caseLinktypeIdArr = this.BASIC_DATA_JX.getEstablish_caseLinktypeIdArr();
      //结案报告数组
      // let finishCaseReport_caseLinktypeIdArr = [this.BASIC_DATA_SYS.finishCaseReport_caseLinktypeId,this.BASIC_DATA_JX.finishCaseReport_JX_caseLinktypeId];
      let finishCaseReport_caseLinktypeIdArr = this.BASIC_DATA_JX.getFinishCaseReport_caseLinktypeIdArr();
      
      let hasEstablish,hasFinishCaseReport= false;
      for(let item of establish_caseLinktypeIdArr){
        if(completeLink.includes(item)){
          hasEstablish = true;
          break;
        }
      }
      for(let item of finishCaseReport_caseLinktypeIdArr){
        if(completeLink.includes(item) || doingLink.includes(item)){
          hasFinishCaseReport = true;
          break;
        }
      }
      // establish_caseLinktypeIdArr.forEach(item=>{
      //   if(completeLink.includes(item)){
      //     hasEstablish = true;
      //     return
      //   }
      // })
      // finishCaseReport_caseLinktypeIdArr.forEach(item=>{
      //   if(completeLink.includes(item) || doingLink.includes(item)){
      //     hasFinishCaseReport = true;
      //     return
      //   }
      // })

      if(hasEstablish && !hasFinishCaseReport) this.showAdminCoerciveMeasureBtn = true;
    },
    //获取强制措施时间
    getMeasuerTime() {
      if (!this.showREBtn) return
      let data = {
        casebasicInfoId: this.caseId,
        caseLinktypeId: this.BASIC_DATA_SYS.removeOrPrelong_caseLinktypeId
      }
      this.$store.dispatch("getFormDataByCaseIdAndFormId", data).then(
        res => {
          console.log('获取强制措施时间1', res);
          if (res.data) {
            let formData = JSON.parse(res.data.formData);

            let measureStartDate = new Date(formData.measureStartDate);
            let Y = measureStartDate.getFullYear() + '-';
            let M = measureStartDate.getMonth() + 1 < 10 ? '0' + (measureStartDate.getMonth() + 1) + '-' : measureStartDate.getMonth() + 1 + '-';
            let D = measureStartDate.getDate() < 10 ? '0' + measureStartDate.getDate() + ' ' : measureStartDate.getDate() + ' ';
            let startData = Y + M + D;

            let measureEndDate = new Date(formData.measureEndDate);
            this.measureDateEndTime = formData.measureEndDate;
            let y = measureEndDate.getFullYear() + '-';
            let m = measureEndDate.getMonth() + 1 < 10 ? '0' + (measureEndDate.getMonth() + 1) + '-' : measureEndDate.getMonth() + 1 + '-';
            let d = measureEndDate.getDate() < 10 ? '0' + measureEndDate.getDate() + ' ' : measureEndDate.getDate() + ' ';
            let endDate = y + m + d;
            this.measureDate = startData + " 至 " + endDate;
            console.log(this.measureDate)
           
            return
          } else {
            let data = {
              casebasicInfoId: this.caseId,
              caseLinktypeId: this.BASIC_DATA_SYS.adminCoerciveMeasure_caseLinktypeId
            }
            this.$store.dispatch("getFormDataByCaseIdAndFormId", data).then(
              res => {
                console.log('获取强制措施时间2', formData);
                let formData = JSON.parse(res.data.formData);
                console.log('formData', formData);

                let measureStartDate = new Date(formData.measureStartDate);
                let Y = measureStartDate.getFullYear() + '-';
                let M = measureStartDate.getMonth() + 1 < 10 ? '0' + (measureStartDate.getMonth() + 1) + '-' : measureStartDate.getMonth() + 1 + '-';
                let D = measureStartDate.getDate() < 10 ? '0' + measureStartDate.getDate() + ' ' : measureStartDate.getDate() + ' ';
                let startData = Y + M + D;

                let measureEndDate = new Date(formData.measureEndDate);
                this.measureDateEndTime = formData.measureEndDate;
                let y = measureEndDate.getFullYear() + '-';
                let m = measureEndDate.getMonth() + 1 < 10 ? '0' + (measureEndDate.getMonth() + 1) + '-' : measureEndDate.getMonth() + 1 + '-';
                let d = measureEndDate.getDate() < 10 ? '0' + measureEndDate.getDate() + ' ' : measureEndDate.getDate() + ' ';
                let endDate = y + m + d;
                this.measureDate = startData + " 至 " + endDate;
                console.log(this.measureDate)

              }, err => {

              }
            )
          }




        }, err => {

        }
      )

    },
    //跳转行政强制措施
    goToAdminCoerciveMeasure(){
      this.$router.push({name:'case_handle_adminCoerciveMeasure_JX',params:{isComplete:this.showREBtn}})
    }
  },
  created() {
  },
  mounted() {
    console.log('this.province',this.province);
    this.mountedInit()
  },
  components: {
    echarts,
    caseSlideMenu,
    pleaseRemoveMDia,
  }
}
</script>
<style lang="scss" src="@/assets/css/documentForm.scss" scoped >
// @import "@/assets/css/caseHandle/index.scss";
</style>
<style lang="scss" scoped>
.chartBg {
  background-color: white;
  background-image: url("../../../static/images/chart/cross-line.png");
  background-repeat: repeat;
  background-size: 14px 14px;
  .searchAndpageBox {
    background: none;
    overflow-y: auto;
    padding: 30px;
  }
}
</style>
