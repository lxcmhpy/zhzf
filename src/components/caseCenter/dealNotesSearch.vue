<template>
  <div class="table-style">
    <div class="shadow-box bg-white">
      <div class="info-box">
        <div class="title-box">
          <span class="title-blue"></span>
          <span class="title-text">处置说明</span>
           <!-- <el-button type="primary" style="float:right;margin-bottom:5px" @click="goConfirmCase">查看</el-button> -->
        </div>
        <table style="position:relative;">
          <tr>
            <td class="table-bg">车牌号</td>
            <td>12121</td>
            <td class="table-bg">车牌颜色</td>
            <td class="search-tr">
              <span class="search-text">黄色</span>

               <!-- <el-button type="button" class="submitBtn blueBtn" @click="search"  style="position:absolute;right:-100px;top: 130px;">
                    <div>查 看</div>
                </el-button> -->
            </td>
          </tr>

          <tr>
            <td class="table-bg">转办机构</td>
            <td></td>
            <td class="table-bg">转办说明</td>
            <td></td>
          </tr>
          <tr>
            <td class="table-bg">处置机构</td>
            <td></td>
            <td class="table-bg">处置人员</td>
            <td></td>
          </tr>
          <tr>
            <td class="table-bg">处置说明</td>
            <td></td>
            <td class="table-bg"></td>
            <td></td>
          </tr>
        </table>
      </div>

    </div>
    <!-- <vehicleCheckDialog ref="vehicleCheckDialogRef"></vehicleCheckDialog> -->
    <el-drawer class="el-drawer-title-noborder" title="车辆查验" direction="rtl" size="876px" :visible.sync="checkVisible" :show-close="false">
      <div class="vehicle-dialog table-style">
        <el-form>
          <div class="check-vehicle">
            <div class="top">
              <el-input ref="TOORGANID" class="focusHide" v-model="checkSearchForm.number" placeholder="请输入车牌号">
                <el-select v-model="checkSearchForm.color" slot="prepend">
                  <el-option label="全部" value="1"></el-option>
                  <el-option label="选项2" value="2"></el-option>
                  <el-option label="选项3" value="3"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" style="width:90px;"></el-button>
              </el-input>
            </div>
            <div class="banner">
              <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane name="道路运输证">
                  <span slot="label"><i class="iconfont law-zhengjian"></i>道路运输证</span>
                </el-tab-pane>
                <el-tab-pane name="所属企业">
                  <span slot="label"><i class="iconfont law-qiye"></i>所属企业</span>
                </el-tab-pane>
                <el-tab-pane name="大件运输许可">
                  <span slot="label"><i class="iconfont law-hezizanwushuju"></i>大件运输许可</span>
                </el-tab-pane>
                <el-tab-pane name="行驶轨迹">
                  <span slot="label"><i class="iconfont law-guiji"></i>行驶轨迹</span>
                </el-tab-pane>
                <el-tab-pane name="违法记录">
                  <span slot="label"><i class="iconfont law-zhuyi"></i>违法记录</span>
                </el-tab-pane>
              </el-tabs>
            </div>
            <!-- 道路运输证 -->
            <div class="table-padding" v-if="activeName=='道路运输证'">
              <div class="table">
                <table>
                  <tr>
                    <td class="table-bg">车牌号</td>
                    <td></td>
                    <td class="table-bg">车牌颜色</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td class="table-bg">车辆类型</td>
                    <td></td>
                    <td class="table-bg"></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td class="table-bg">车辆营运状态</td>
                    <td></td>
                    <td class="table-bg"></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td class="table-bg">道路运输证号</td>
                    <td></td>
                    <td class="table-bg">发证机构</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td class="table-bg">有效期起</td>
                    <td></td>
                    <td class="table-bg">有效期止</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td class="table-bg">经营范围</td>
                    <td colspan="3"></td>
                  </tr>
                </table>
              </div>
            </div>
            <!-- 所属企业 -->
            <div class="table-padding" v-if="activeName=='所属企业'">
              <div class="table">
                <table>
                  <tr>
                    <td class="table-bg">经营业户名称</td>
                    <td></td>
                    <td class="table-bg">企业组织机构代码</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td class="table-bg">经营业户所在地行政区划代码</td>
                    <td></td>
                    <td class="table-bg">负责人姓名</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td class="table-bg">经营许可证号</td>
                    <td></td>
                    <td class="table-bg">发证机关</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td class="table-bg">经济类型</td>
                    <td></td>
                    <td class="table-bg">经营范围</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td class="table-bg">有效期起</td>
                    <td></td>
                    <td class="table-bg">有效期止</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td class="table-bg">经营状态</td>
                    <td></td>
                    <td class="table-bg"></td>
                    <td></td>
                  </tr>
                </table>
              </div>
            </div>
            <!-- 大件运输许可 -->
            <div class="table-padding" v-if="activeName=='大件运输许可'">
              <div class="table" v-if="activeName=='大件运输许可'">
                <table>
                  <tr>
                    <td class="table-bg">有效范围</td>
                    <td></td>
                    <td class="table-bg">通行日期</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td class="table-bg">承运单位</td>
                    <td></td>
                    <td class="table-bg"></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td class="table-bg">车牌号</td>
                    <td></td>
                    <td class="table-bg">厂牌型号</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td class="table-bg">自重（T）</td>
                    <td></td>
                    <td class="table-bg">载重（T）</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td class="table-bg">货物名称</td>
                    <td></td>
                    <td class="table-bg">货物总量</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td class="table-bg">车货总重（T）</td>
                    <td></td>
                    <td class="table-bg"></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td class="table-bg">载后总尺寸</td>
                    <td></td>
                    <td class="table-bg"></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td class="table-bg">轴荷分布</td>
                    <td></td>
                    <td class="table-bg"></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td class="table-bg">通行线路</td>
                    <td></td>
                    <td class="table-bg"></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td class="table-bg">发证单位</td>
                    <td></td>
                    <td class="table-bg"></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td class="table-bg">经办人</td>
                    <td></td>
                    <td class="table-bg">发证日期</td>
                    <td></td>
                  </tr>
                </table>
              </div>
            </div>
            <!-- 行驶轨迹 -->
            <div class="map" v-if="activeName=='行驶轨迹'">

              <div class="map-top">
                <span class="map-top-title">轨迹信息</span>
                <span class="map-top-icon"><i class="el-icon-search"></i>搜索</span>
                <span class="map-top-icon"><i class="iconfont law-chizi"></i>测距</span>
              </div>
              <div class="map-btm">
                <div class="map-search">
                  <ul>
                    <li>车牌号：京N·65920</li>
                    <li>开始时间：
                      <el-date-picker v-model="formInline.startTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd" :clearable='false' style="width:320px;"></el-date-picker>
                    </li>
                    <li>选择时间：
                      <el-date-picker v-model="formInline.selectTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd" :clearable='false' style="width:320px;"></el-date-picker>

                    </li>
                  </ul>
                  <ul>
                    <li>车牌颜色：黑色</li>
                    <li>结束时间：
                      <el-date-picker v-model="formInline.endTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd" :clearable='false' style="width:320px;"></el-date-picker>
                    </li>
                    <li>当前进度：<el-progress :percentage="percentage" color="#2DE1D3"></el-progress>
                    </li>
                  </ul>
                </div>
                <div class="map-box">
                  <el-amap vid="lawSupervise" mapStyle="amap://styles/whitesmoke" :center="center" :plugin="plugin" :amap-manager="amapManager" :zoom="zoom" :events="events">
                    <!-- <el-amap-marker v-for="(marker,index) in markers" :key="index" :position="marker.position" :events="marker.events" :template="marker.template"></el-amap-marker> -->
                  </el-amap>
                </div>
              </div>

            </div>
            <!-- 违法记录 -->
            <div class="list" v-if="activeName=='违法记录'">
              <div class="list-search">
                <div class="el-form demo-form-inline el-form--inline search-box">
                  <el-form-item label="立案时间">
                    <el-select v-model="formInline.applyTime" suffix-icon="el-icon-sort">
                        <el-option label="默认排序" value="1"></el-option>
                        <el-option label="正序" value="2"></el-option>
                        <el-option label="倒序" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="处置状态">
                    <el-select v-model="formInline.status">
                      <el-option label="全部" value="1"></el-option>
                      <el-option label="选项二" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                   <el-form-item label="">
                        <el-input
                            placeholder="默认排序"
                            suffix-icon="el-icon-caret-bottom"
                            value="默认排序">
                        </el-input>
                    </el-form-item>
                </div>
              </div>
              <ul class="list-info">
                <li>
                  <p>京（XX）路政赔〔2020〕第00008号</p>
                  <div class="left main-info">
                    <tr>
                      <td class="width198">立案时间：2019-12-14</td>
                      <td>当事人姓名/公司：百度在线网络技术（北京）有限公司</td>
                    </tr>
                    <tr>
                      <td>处置状态：已结案</td>
                      <td>立案机构：北京市交通大队</td>
                    </tr>
                  </div>
                  <div class="right">
                    <el-button type="success" size="medium" class="btnstyle" style="background-color: #4AAFA7 !important; width:100px;border-color: #4AAFA7 !important;">
                      查看详情
                    </el-button>
                  </div>
                </li>
                <li>
                  <p>京（XX）路政赔〔2020〕第00008号</p>
                  <div class="left main-info">
                    <tr>
                      <td class="width198">立案时间：2019-12-14</td>
                      <td>当事人姓名/公司：百度在线网络技术（北京）有限公司</td>
                    </tr>
                    <tr>
                      <td>处置状态：已结案</td>
                      <td>立案机构：北京市交通大队</td>
                    </tr>
                  </div>
                  <div class="right">
                    <el-button type="success" size="medium" class="btnstyle" style="background-color: #4AAFA7 !important; width:100px;border-color: #4AAFA7 !important;">
                      查看详情
                    </el-button>
                  </div>
                </li>
                <li>
                  <p>京（XX）路政赔〔2020〕第00008号</p>
                  <div class="left main-info">
                    <tr>
                      <td class="width198">立案时间：2019-12-14</td>
                      <td>当事人姓名/公司：百度在线网络技术（北京）有限公司</td>
                    </tr>
                    <tr>
                      <td>处置状态：已结案</td>
                      <td>立案机构：北京市交通大队</td>
                    </tr>
                  </div>
                  <div class="right">
                    <el-button type="success" size="medium" class="btnstyle" style="background-color: #4AAFA7 !important; width:100px;border-color: #4AAFA7 !important;">
                      查看详情
                    </el-button>
                  </div>
                </li>
                <li>
                  <p>京（XX）路政赔〔2020〕第00008号</p>
                  <div class="left main-info">
                    <tr>
                      <td class="width198">立案时间：2019-12-14</td>
                      <td>当事人姓名/公司：百度在线网络技术（北京）有限公司</td>
                    </tr>
                    <tr>
                      <td>处置状态：已结案</td>
                      <td>立案机构：北京市交通大队</td>
                    </tr>
                  </div>
                  <div class="right">
                    <el-button type="success" size="medium" class="btnstyle" style="background-color: #4AAFA7 !important; width:100px;border-color: #4AAFA7 !important;">
                      查看详情
                    </el-button>
                  </div>
                </li>
                <li>
                  <p>京（XX）路政赔〔2020〕第00008号</p>
                  <div class="left main-info">
                    <tr>
                      <td class="width198">立案时间：2019-12-14</td>
                      <td>当事人姓名/公司：百度在线网络技术（北京）有限公司</td>
                    </tr>
                    <tr>
                      <td>处置状态：已结案</td>
                      <td>立案机构：北京市交通大队</td>
                    </tr>
                  </div>
                  <div class="right">
                    <el-button type="success" size="medium" class="btnstyle" style="background-color: #4AAFA7 !important; width:100px;border-color: #4AAFA7 !important;">
                      查看详情
                    </el-button>
                  </div>
                </li>
                <li>
                  <p>京（XX）路政赔〔2020〕第00008号</p>
                  <div class="left main-info">
                    <tr>
                      <td class="width198">立案时间：2019-12-14</td>
                      <td>当事人姓名/公司：百度在线网络技术（北京）有限公司</td>
                    </tr>
                    <tr>
                      <td>处置状态：已结案</td>
                      <td>立案机构：北京市交通大队</td>
                    </tr>
                  </div>
                  <div class="right">
                    <el-button type="success" size="medium" class="btnstyle" style="background-color: #4AAFA7 !important; width:100px;border-color: #4AAFA7 !important;">
                      查看详情
                    </el-button>
                  </div>
                </li>
                <li>
                  <p>京（XX）路政赔〔2020〕第00008号</p>
                  <div class="left main-info">
                    <tr>
                      <td class="width198">立案时间：2019-12-14</td>
                      <td>当事人姓名/公司：百度在线网络技术（北京）有限公司</td>
                    </tr>
                    <tr>
                      <td>处置状态：已结案</td>
                      <td>立案机构：北京市交通大队</td>
                    </tr>
                  </div>
                  <div class="right">
                    <el-button type="success" size="medium" class="btnstyle" style="background-color: #4AAFA7 !important; width:100px;border-color: #4AAFA7 !important;">
                      查看详情
                    </el-button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-form>
      </div>
      <!-- </el-dialog> -->
    </el-drawer>
    <confirmCaseDialog ref="confirmCaseDialogRef" @getNewData="goConfirmCaseData"></confirmCaseDialog>
  </div>
</template>
<script>
import vehicleCheckDialog from '@/components/cluesReview/vehicleCheckDialog.vue';
import confirmCaseDialog from '@/components/cluesReview/confirmCase.vue'
export default {
  components: {
    vehicleCheckDialog,
    confirmCaseDialog
  },
  data() {
    let self = this;
    return {
      visible: false,
      checkSearchForm: {
        number: '',
        color: ''
      },
      formInline: {
        user: '',
        region: '',
        startTime: '',
        endTime: '',
        selectTime: '',
        status: '1',
        applyTime: '1',
      },
      checkVisible: false,
      activeName: '道路运输证',
    }
  },
  methods: {
    search() {
      // this.$refs.vehicleCheckDialogRef.showModal();
      this.checkVisible = true
    },
    handleClick(tab, event) {
    },
    goConfirmCaseData(){},
    getNewData(){},
    goConfirmCase(){
      console.log('跳转案件')
      let data={
        title:'查看案件详情',
        message:'是否进入案件办理系统，查看当前案件详情'
      }
         this.$refs.confirmCaseDialogRef.showModal(data);
    }
  },


}
</script>
<style lang="scss" src="@/assets/css/cluesReview.scss" scoped></style>
<style lang='css'>

.el-drawer-title-noborder /deep/ span:focus {
    outline: 0
}
</style>
