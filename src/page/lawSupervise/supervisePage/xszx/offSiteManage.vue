<template>
<!-- 非现场治超列表 -->
<keep-alive>
<div class="com_searchAndpageBoxPadding">
    <div class="com_searchPage_top">
        <!-- <ul class="com_searchPage_tab">
            <li v-for="(item, index) in processStatus" :class="{'active': index === tabActiveValue}"  :key="index" @click="activeAndSearch(item,index)">{{item.value}}</li>
        </ul> -->
        <!-- @tab-click="activeAndSearch" -->
        <el-tabs v-model="tabActiveValue" :stretch="true" @tab-click="search">
            <el-tab-pane v-for="(item, index) in processStatus" :key="item.value"  :name="item.value" >
                <span slot="label">
                    <el-badge :value="index==0?null:index" >
                        {{item.value}}
                    </el-badge>
                </span>
            </el-tab-pane>
        </el-tabs>
    </div>
    <div class="searchAndpageBox toggleBox">
        <div class="handlePart caseHandleSearchPart" :class="{'autoHeight':isShow}">
            <el-form :inline="true" :model="form" label-width="80px"  ref="offsiteManageform">
                <el-form-item label="检测站点" prop="siteName">
                    <el-input v-model="form.siteName" placeholder="回车可直接查询" @keyup.enter.native="search()"></el-input>
                </el-form-item>
                <el-form-item label="车牌号" prop="vehicleColor">
                    <el-select v-model="form.vehicleColor" placeholder="请选择">
                        <el-option
                        v-for="item in vehicleColorList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label=" " label-width="0px" prop="vehicleNumber">
                    <el-input v-model="form.vehicleNumber" placeholder="回车可直接查询" @keyup.enter.native="search()"></el-input>
                </el-form-item>
                <el-form-item label="超限率" prop="overload">
                            <!-- <el-input v-model="form.overload" placeholder="回车可直接查询" @keyup.enter.native="search(1)"></el-input> -->
                    <el-select v-model="form.overload" placeholder="请选择">
                        <el-option
                        v-for="item in cxlList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-collapse-transition>
                    <div :class="{'ransition-box':true}">
                        <el-form-item label="时间段">
                            <el-date-picker style='width:240px'
                                :picker-options="pickerOptions"
                                v-model="timeList" type="daterange" range-separator="—" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd" start-placeholder="开始日期" end-placeholder="结束日期"
                                :default-time="['00:00:00', '23:59:59']">

                            </el-date-picker>
                        </el-form-item>
                    </div>
                </el-collapse-transition>
            </el-form>
            <div class="search-btns">
                 <el-button size="medium" class="commonBtn searchBtn" title="搜索" icon="iconfont law-sousuo" @click="search(1)"></el-button>
                    <el-button size="medium" class="commonBtn searchBtn" title="重置" icon="iconfont law-zhongzhi" @click="reset('offsiteManageform')"></el-button>
                    <el-button size="medium" class="commonBtn toogleBtn" :title="isShow? '点击收缩':'点击展开'" :icon="isShow? 'iconfont law-top': 'iconfont law-down'" @click="isShow = !isShow" >
                    </el-button>
            </div>
        </div>
        <div class="handlePart" style="margin-left: 0px;">
            <el-button type="primary" size="medium" @click="getAllOrganDialog()">
                <i class="iconfont law-submit-o f12"></i> 预警推送
            </el-button>
             <el-button v-if="tabActiveValue == '已审核'" type="primary" size="medium" @click="routerTransferManage">
                <i class="iconfont law-submit-o f12"></i> 转办
            </el-button>
            <!-- <iframe src='https://view.officeapps.live.com/op/view.aspx?src="http://124.192.215.10:9332/13,0dac31ecdbc0.xls"' width='100%' height='100%' frameborder='1'>
            </iframe> -->
            <!-- <a href="https://view.officeapps.live.com/op/view.aspx?src='http://124.192.215.10:9332/13,0dac31ecdbc0.xls'" target="_blank">下载</a> -->
            <el-dialog class="mini-dialog-title" title="预警推送" :visible.sync="yjVisible" :show-close="false"
                :close-on-click-modal="false" width="800px" >
                <el-form :model="form" ref="form" class="checkSearchForm" label-width="120px">
                    <div class="invalidinfo main_box">
                        <p>推送信息</p>
                        <table class="table_style" >
                            <tr>
                                <td class="color_ff w-1"  width="160px">
                                    执法机构
                                </td>
                                <td>
                                     <el-popover
                                        placement="bottom"
                                          trigger="click"
                                       >
                                       <div class="departOrUserTree" style="width:426px">
                                            <div class="treeBox">
                                                <el-tree
                                                class="filter-tree"
                                                :data="organData"
                                                :props="defaultProps"
                                                node-key="id"
                                                :filter-node-method="filterNode"
                                                :default-expanded-keys="defaultExpandedKeys"
                                                @node-expand="nodeExpand"
                                                ref="tree"
                                                @node-click="handleNodeClick1"
                                                >
                                                <span class="custom-tree-node" slot-scope="{ node,data }">
                                                    <span>
                                                    <i
                                                        :class="data.children && data.children.length>0 ? 'iconfont law-icon_shou_bag' : ''"
                                                    ></i>
                                                    <span :class="data.children ? '' : 'hasMarginLeft'">{{ node.label }}</span>
                                                    </span>
                                                </span>
                                                </el-tree>
                                            </div>
                                        </div>
                                        <el-input v-model="form.lane" style="width:100%" slot="reference" placeholder="请选择执法机构"></el-input>
                                    </el-popover>
                                </td>
                            </tr>
                            <tr>
                                <td class="color_ff w-1">
                                    相关说明
                                </td>
                                <td width="260px">
                                    <el-input
                                            type="textarea"
                                            :rows="2"
                                            placeholder="请输入内容"
                                            v-model="form.load">
                                    </el-input>
                                </td>
                            </tr>
                        </table>

                        <p>预警信息(4条)</p>
                    </div>
                    <div class="tablePart">
                        <el-table :data="tableData" stripe resizable border style="width: 100%;height:100%;" >
                            <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                            <el-table-column prop="checkTime" label="检测时间" align="center" width="100"></el-table-column>
                            <el-table-column prop="organName" label="执法点" align="center"></el-table-column>
                            <el-table-column prop="lane" label="车牌号" align="center"></el-table-column>
                            <el-table-column prop="vehicleNumber" label="车货总质量" align="center"  width="120">
                                                </el-table-column>
                            <el-table-column prop="totalWeight" label="超重" align="center"></el-table-column>
                            <el-table-column prop="load" label="超限率" align="center"></el-table-column>
                        </el-table>
                    </div>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="yjVisible=false">确认</el-button>
                    <el-button @click="yjVisible = false">取消</el-button>
                </span>
            </el-dialog>
        </div>
         <div class="tablePart">
            <el-table :data="tableData" stripe resizable border style="width: 100%;height:100%;" @row-click="handleNodeClick">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="checkTime" label="过检时间" align="center" width="100"></el-table-column>
                <el-table-column prop="organName" label="执法点" align="center"></el-table-column>
                <el-table-column prop="lane" label="车道"  width="50"  align="center"></el-table-column>
                <el-table-column label="车牌号" align="center"  width="120">
                    <template slot-scope="scope">
                        <div class="otherColor" :class="vehicleColorObj[scope.row.vehicleColor]">
                            <div class="border">
                                {{scope.row.vehicleNumber}}
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="totalWeight" label="车货总质量（t）" width="140" align="center"></el-table-column>
                <el-table-column prop="load" label="限重（t）" align="center"></el-table-column>
                <el-table-column prop="overweight" label="超重（kg）"  width="120"  align="center"></el-table-column>
                <el-table-column prop="overload" label="超限率（kg）"  width="120"  align="center"></el-table-column>
                <el-table-column prop="key" label="重点监管" align="center"></el-table-column>
                <!-- <el-table-column prop="status" label="处理状态" align="center"></el-table-column> -->
                <!-- <el-table-column label="操作" width="300px" align="center">
                    <template slot-scope="scope">
                         <a href="javascript:void(0)" @click="routerInvalidCueDetail(scope.row)">
                            无效信息
                        </a>&nbsp;&nbsp;
                        <a href="javascript:void(0)" @click="routerExamineDetail(scope.row)">
                            已审核
                        </a>&nbsp;&nbsp;
                        <a href="javascript:void(0)" @click="routerExamineDoingDetail(scope.row)">
                            待审核
                        </a>&nbsp;&nbsp;
                        <a href="javascript:void(0)" @click="routerTransferDetail(scope.row)">
                            已转办
                        </a>
                        <a href="javascript:void(0)" @click="routerDetail(scope.row)">
                            详情
                        </a>&nbsp;&nbsp;
                        <a href="javascript:void(0)" @click="routerEvidenceDetail(scope.row)">
                            证据
                        </a>
                    </template>
                </el-table-column> -->
            </el-table>
        </div>
        <div class="paginationBox" >
            <div v-if="total > 10">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="form.current"
                    background
                    :page-sizes="[10, 20, 30, 40]"
                    layout="prev, pager, next,sizes,jumper"
                    :total="total"
                ></el-pagination>
            </div>
            <div class="noMore" v-else>没有更多了</div>
        </div>
    </div>
</div>
</keep-alive>
</template>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
<style src="@/assets/css/basicStyles/error.scss" lang="scss"></style>
<style lang="scss" src="@/assets/css/cluesReview.scss" scoped></style>
<style lang="scss" scoped>
.ransition-box {
    // float:left;
    display:inline;
}
div.el-form-item{
    float:left;
}
.otherColor {
    width:100%;
    height: 100%;
    border: 1px solid #101010;
    line-height: 30px;
    padding: 7px;
    box-sizing: border-box;
}
.vehicle-black {
    width:100%;
    height: 100%;
    background: #101010;
    line-height: 30px;
    color:white;
    padding: 7px;
    box-sizing: border-box;
    .border {
        border: 1px solid white;
    }
}
.vehicle-white {
    width:100%;
    height: 100%;
    background: white;
    line-height: 30px;
    color: #0A030B;
    padding: 7px;
    box-sizing: border-box;
    .border {
        border: 1px solid #E2E2E2;
    }
}
.vehicle-yellow {
    width:100%;
    height: 100%;
    background: #EBBB1F;
    line-height: 30px;
    color:#0A030B;
    padding: 7px;
    box-sizing: border-box;
    .border {
        border: 1px solid #090008;
    }
}
.vehicle-blue {
    width:100%;
    height: 100%;
    background: #1029AA;
    line-height: 30px;
    color:white;
    padding: 7px;
    box-sizing: border-box;
    .border {
        border: 1px solid #FFFFFF;
    }
}
.vehicle-green {
    width:100%;
    height: 100%;
    background: #26914D;
    line-height: 30px;
    color:white;
    padding: 7px;
    box-sizing: border-box;
    .border {
        border: 1px solid white;
    }
}
.vehicle-gray {
    width:100%;
    height: 100%;
    background: #868585;
    line-height: 30px;
    color:white;
    padding: 7px;
    box-sizing: border-box;
    .border {
        border: 1px solid white;
    }
}
.vehicle-gradient-green {
    width:100%;
    height: 100%;
    background: linear-gradient(180deg,rgba(255,255,253,1) 0%, #EBBB1F 100%);
    line-height: 30px;
    color:#0A030B;
    padding: 7px;
    box-sizing: border-box;
    .border {
        border: 1px solid #14150A;
    }
}
.vehicle-yelloe-green{
    width:100%;
    height: 100%;
    background: linear-gradient(90deg, #EBD57F 36%, #73D999 36%);
    line-height: 30px;
    color:#0A030B;
    padding: 7px;
    box-sizing: border-box;
    .border {
        border: 1px solid #14150A;
    }
}
</style>
<script>
import {queryListPage, findAllDrawerById} from '@/api/lawSupervise.js';
import { BASIC_DATA_SYS } from "@/common/js/BASIC_DATA.js";
import { mapGetters } from "vuex";
export default {
  inject: ["reload"],
  data() {
    let _this =this;
    return {
        selectCurrentTreeName: "",
        defaultExpandedKeys: [],
        organData: [],
        defaultProps: {
            children: "children",
            label: "label"
        },
        pickerOptions:  {
            onPick:  ({  maxDate,  minDate  })  =>  {
                if (minDate) {
                    _this.$set(_this.timeList,0,minDate);
                }
                let max = new Date(maxDate ? maxDate :minDate);
                max.setHours(23);
                max.setMinutes(59);
                max.setSeconds(59);
                _this.$set(_this.timeList,1,max);
            }
        },
        yjVisible: false,
        vehicleColorList: null,
        cxlList: null,
        // pageSize: 10, //pagesize
        form: {
            siteName: '',
            vehicleColor: '',
            vehicleNumber: '',
            overload: '',
            status: '',
            current: 1, //当前页
            size: 10, //每页显示条数
            lane: ''
            // checkEndTime: '',
            // checkStartTime: ''
        },
        total: 0, // 总条数
        timeList: ['',''],
        processStatus: [{
            value: '待审核'
        }, {
            value: '审核中'
        }, {
            value: '已审核'
        }, {
            value: '已转办'
        }, {
            value: '无效信息'
        }],
        tabActiveValue: '待审核',
        isShow: false,
        tableData: [],
        vehicleColorObj: {
            '黑色': 'vehicle-black',
            '白色': 'vehicle-white',
            '黄色': 'vehicle-yellow',
            '蓝色': 'vehicle-blue',
            '绿色': 'vehicle-green',
            '灰色': 'vehicle-gray',
            '渐变绿': 'vehicle-gradient-green',
            '黄绿色': 'vehicle-yelloe-green',
        }
    }
  },
  methods: {
    handleNodeClick1(data) {
        debugger;
      console.log(data);
    //   this.selectCurrentTreeName = data.label;
    //   this.currentOrganId = data.id;
      this.form.lane = data.label;
    //   this.getSelectOrgan(this.currentOrganId);
    },
    getAllOrgan(organId) {
      let _this = this
      this.$store.dispatch("getAllOrgan").then(
        res => {
          _this.defaultExpandedKeys.push(res.data[0].id);
          _this.selectCurrentTreeName = _this.selectCurrentTreeName
            ? _this.selectCurrentTreeName
            : res.data[0].label;
          if (res.data[0].children && res.data[0].children.length > 0) {
            res.data[0].children.forEach(item => {
              _this.defaultExpandedKeys.push(item.id);
            });
          }
          _this.organData = res.data;
          console.log(_this.defaultExpandedKeys);
          console.log(_this.organData);
          if (organId == "root") {
            _this.currentOrganId = res.data[0].id;
          } else {
            _this.currentOrganId = organId;
          }
          _this.getSelectOrgan();
        },
        err => {
          console.log(err);
        }
      );
    },
    getAllOrganDialog () {
        this.getAllOrgan('root');
        this.yjVisible=true;
    },
    nodeExpand(data, node, jq) {
      console.log(data);
      console.log(node);
      console.log(jq);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    search () {
        this.form.checkStartTime = typeof this.timeList[0] == 'object' ? this.timeList[0].format('yyyy-MM-dd HH:mm:ss'): this.timeList[0];
        this.form.checkEndTime = typeof this.timeList[1] == 'object' ?this.timeList[1].format('yyyy-MM-dd HH:mm:ss'): this.timeList[1];
        this.form.status = this.tabActiveValue;
        let _this = this;
        new Promise((resolve, reject) => {
            queryListPage(_this.form).then(
                res => {
                    resolve(res)
                    _this.tableData = res.data.records;
                    _this.total = res.data.total;
                },
                error => {
                    //  _this.errorMsg(error.toString(), 'error')
                        return
                }
            )
        })
    },
    findAllDrawerById (data, obj) {
        let _this = this
        new Promise((resolve, reject) => {
            findAllDrawerById(data).then(
                res => {
                    // resolve(res)
                    _this[obj] = res.data
                },
                error => {
                    //  _this.errorMsg(error.toString(), 'error')
                        return
                }
            )
        })
    },
    reset (formName) {
        this.$refs[formName].resetFields();
    },
    routerDetail (row) {
        this.$store.commit('setOffSiteManageId', row.id);
        this.$router.push({
            name: 'offSiteDetail'
        })
    },
    routerEvidenceDetail (row) {
        this.$store.commit('setOffSiteManageId', row.id);
        this.$router.push({
            name: 'evidenceDetail'
        })
    },
      //更改每页显示的条数
    handleSizeChange(val) {
        this.form.pageSize = val;
        this.getLogList(1);
    },
    //更换页码
    handleCurrentChange(val) {
      this.getLogList(val);
    },
    routerInvalidCueDetail (item) {
        this.$store.commit('setOffSiteManageId', item.id);
        this.$router.push({
            name: 'invalidCueDetail'
        })
    },
    routerExamineDetail (item,status, tabTitle) {
        this.$store.commit('setOffSiteManageId', item.id);
        this.$router.push({
            name: 'examineDoingDetail',
            params: {
                status: status,
                tabTitle: tabTitle
            }
        })
    },
    routerExamineDoingDetail (item,status, tabTitle) {
        this.$store.commit('setOffSiteManageId', item.id);
        this.$router.push({
            name: 'examineDoingDetail',
            params: {
                status: status,
                tabTitle: tabTitle
            }
        })
    },
    routerTransferDetail (item) {
        this.$store.commit('setOffSiteManageId',  item.id);
        this.$router.push({
            name: 'transferDetail',
            // params: {
            //     status: '0'
            // }
        })
    },
    routerTransferManage () {
        this.$router.push({
            name: 'transferManage',
        })
    },
    handleNodeClick(data) {
    //    if(this.tabActiveValue == )
        switch (data.status) {
            case '待审核': this.routerExamineDoingDetail(data, '0', '待审核'); break;
            case '无效信息': this.routerInvalidCueDetail(data); break;
            case '审核中': this.routerExamineDoingDetail(data, '1', '审核中'); break;
            case '已转办': this.routerTransferDetail(data); break;
            case '已审核': this.routerExamineDetail(data, '3', '已完成'); break;
        }
    },
  },
  created () {
    this.search();
    this.findAllDrawerById(BASIC_DATA_SYS.cxl, 'cxlList');
    this.findAllDrawerById(BASIC_DATA_SYS.vehicleColor, 'vehicleColorList');

  },
  mounted () {

  }
}
</script>
