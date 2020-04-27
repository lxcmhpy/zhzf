<template>
  <keep-alive>
    <div class="com_searchAndpageBoxPadding">
      <div class="com_searchPage_top">
        <!-- <ul class="com_searchPage_tab">
            <li v-for="(item, index) in processStatus" :class="{'active': index === tabActiveIndex}"  :key="index" @click="activeAndSearch(item,index)">{{item.value}}</li>
        </ul> -->
        <!-- @tab-click="activeAndSearch" -->
        <el-tabs v-model="tabActiveValue" :stretch="true" @tab-click="search">
          <el-tab-pane v-for="(item,index) in processStatus" :key="item.value" :name="item.value">
            <span slot="label">
              <!-- <el-badge :value="index==0?null:index"> -->
              <el-badge :value="index+1">
                {{item.value}}
              </el-badge>
            </span>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="searchAndpageBox toggleBox">
        <div class="handlePart caseHandleSearchPart" :class="{'autoHeight':isShow}">
          <el-form :inline="true" :model="form" label-width="80px" ref="form">
            <el-form-item label="车牌号">
              <el-select v-model="form.vehicleColor"  placeholder="请选择">
                <el-option v-for="item in vehicleColorList" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label=" " label-width="0px">
              <el-input v-model="form.vehicleNumber" placeholder="回车可直接查询" @keyup.enter.native="search()"></el-input>
            </el-form-item>
            <el-form-item label="任务时间">
              <el-date-picker size="small" v-model="timeList" type="daterange" range-separator="—" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd" :default-time="['00:00:00', '23:59:59']" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-collapse-transition>
              <div :class="{'ransition-box':true}">
                <el-form-item label="检测站点">
                  <el-input v-model="form.siteName" placeholder="回车可直接查询" @keyup.enter.native="search()"></el-input>
                </el-form-item>
                <el-form-item label="处理状态">
                  <el-select v-model="form.status" prop="type">
                    <el-option v-for="item in processStatus" :key="item.value" :label="item.value" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-collapse-transition>
          </el-form>
          <div class="search-btns">
              <el-button size="medium" class="commonBtn searchBtn" title="搜索" icon="iconfont law-sousuo" @click="search(1)"></el-button>
              <el-button size="medium" class="commonBtn searchBtn" title="重置" icon="iconfont law-zhongzhi" @click="reset"></el-button>
              <el-button size="medium" class="commonBtn toogleBtn" :title="isShow? '点击收缩':'点击展开'" :icon="isShow? 'iconfont law-top': 'iconfont law-down'" @click="isShow = !isShow">
              </el-button>
          </div>
        </div>
        <!-- <div class="handlePart" style="margin-left: 0px;">
          <el-button type="primary" size="medium">
            <i class="iconfont law-submit-o f12"></i> 预警推送
          </el-button>
          <el-button type="primary" size="medium">
            <i class="iconfont law-submit-o f12"></i> 转办
          </el-button>
        </div> -->
        <div class="tablePart">
          <el-table :data="tableData" stripe resizable border style="width: 100%;height:100%;"
             @row-click="routerDetail">
            <el-table-column label="序号" width="70px">
              <template slot-scope="scope">
                {{scope.$index+1}}
              </template>
            </el-table-column>
            <el-table-column prop="checkTime" label="任务时间" align="center" width="100"></el-table-column>
            <el-table-column label="车牌号码" align="center" width="120">
              <template slot-scope="scope">
                <div :class="vehicleColorObj[scope.row.vehicleColor]">
                  <div class="border">
                    {{scope.row.vehicleNumber}}
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="lane" label="相关说明" align="center"></el-table-column>
            <el-table-column prop="status" label="处理状态" align="center"></el-table-column>
            <el-table-column prop="totalWeight" label="处置机构/人员" align="center"></el-table-column>
            <!-- <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <a href="javascript:void(0)" @click="routerDetail(scope.row)">
                  详情
                </a>
              </template>
            </el-table-column> -->
          </el-table>
        </div>
        <div class="paginationBox">
          <div v-if="total > 10">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="form.current" background :page-sizes="[10, 20, 30, 40]" layout="prev, pager, next,sizes,jumper" :total="form.size"></el-pagination>
          </div>
          <div class="noMore" v-else>没有更多了</div>
        </div>
      </div>
    </div>
  </keep-alive>
</template>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
<style src="@/assets/css/basicStyles/error.scss" lang="scss"></style>
<style lang="scss" scoped>
.vehicle-black {
  width: 100%;
  height: 100%;
  background: #101010;
  line-height: 30px;
  color: white;
  padding: 7px;
  box-sizing: border-box;
  .border {
    border: 1px solid white;
  }
}
.vehicle-white {
  width: 100%;
  height: 100%;
  background: white;
  line-height: 30px;
  color: #0a030b;
  padding: 7px;
  box-sizing: border-box;
  .border {
    border: 1px solid #e2e2e2;
  }
}
.vehicle-yellow {
  width: 100%;
  height: 100%;
  background: #ebbb1f;
  line-height: 30px;
  color: #0a030b;
  padding: 7px;
  box-sizing: border-box;
  .border {
    border: 1px solid #090008;
  }
}
.vehicle-blue {
  width: 100%;
  height: 100%;
  background: #1029aa;
  line-height: 30px;
  color: white;
  padding: 7px;
  box-sizing: border-box;
  .border {
    border: 1px solid #ffffff;
  }
}
.vehicle-green {
  width: 100%;
  height: 100%;
  background: #26914d;
  line-height: 30px;
  color: white;
  padding: 7px;
  box-sizing: border-box;
  .border {
    border: 1px solid white;
  }
}
.vehicle-gray {
  width: 100%;
  height: 100%;
  background: #868585;
  line-height: 30px;
  color: white;
  padding: 7px;
  box-sizing: border-box;
  .border {
    border: 1px solid white;
  }
}
.vehicle-gradient-green {
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(255, 255, 253, 1) 0%, #ebbb1f 100%);
  line-height: 30px;
  color: #0a030b;
  padding: 7px;
  box-sizing: border-box;
  .border {
    border: 1px solid #14150a;
  }
}
.vehicle-yelloe-green {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #ebd57f 36%, #73d999 36%);
  line-height: 30px;
  color: #0a030b;
  padding: 7px;
  box-sizing: border-box;
  .border {
    border: 1px solid #14150a;
  }
}
</style>
<script>
import iLocalStroage from "@/common/js/localStroage";
import { queryListPage, findAllDrawerById, overWeightCaseList } from '@/api/lawSupervise.js';
import { BASIC_DATA_SYS } from "@/common/js/BASIC_DATA.js";
import { mapGetters } from "vuex";
export default {
  inject: ["reload"],
  data() {
    return {
      tabActiveIndex: '0',
      vehicleColorList: null,
      cxlList: null,
      pageSize: 10, //pagesize
      form: {
        siteName: '',
        vehicleColor: '',
        vehicleNumber: '',
        overload: '',
        status: '',
        current: 1, //当前页
        size: 0, //总页数
        // checkEndTime: '',
        // checkStartTime: ''
      },
      total: 0, // 总条数
      tabActiveValue: '待办',
      timeList: ['', ''],
      processStatus: [{
        value: '待办'
      }, {
        value: '在办'
      }, {
        value: '已回退'
      }, {
        value: '办结'
      }, {
        value: '机构待办'
      }],
      isShow: false,
      tableData: [{
        area: "北京市东城区和平东街",
        axleNumber: 5,
        axleType: "D型",
        blackList: 0,
        checkEquipment: "EQ001",
        checkLocation: "路段",
        checkOrgan: "东城交通支队",
        checkTime: "2020-03-18 00:00:00",
        direction: "上行",
        etc: null,
        etcVehicleNumber: null,
        height: 3,
        id: "4",
        invalidInfo: null,
        key: "是",
        lane: "4",
        length: 6,
        load: 50,
        lscc: 2,
        organId: "4",
        organName: "东城交通支队",
        overload: 5,
        overweight: 40,
        position: "116.423187,39.955247",
        push: null,
        pushInfo: null,
        remarks: null,
        siteId: "3",
        siteName: "东城交通支队北区执法站",
        speed: 120,
        // status: "无效信息",
        totalWeight: 66,
        transfer: null,
        transferInfo: null,
        vehicleColor: "黄色",
        vehicleNumber: "京A66666",
        vehicleType: "中型货车",
        width: 3,
      }],
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
    // activeAndSearch(item, index) {
    //   this.tabActiveValue = index;
    // },
    search() {
      this.form.checkStartTime = this.timeList[0];
      this.form.checkEndTime = this.timeList[1];
      this.form.status = this.tabActiveValue;
      let _this = this
      // new Promise((resolve, reject) => {
      //   overWeightCaseList(_this.form).then(
      //     res => {
      //       resolve(res)
      //       _this.tableData = res.data.records
      //     },
      //     error => {
      //       //  _this.errorMsg(error.toString(), 'error')
      //       return
      //     }
      //   )
      // })
    },
    findAllDrawerById(data, obj) {
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
    reset() {
      this.form.siteName= '';
      this.form.vehicleColor= '';
      this.form.vehicleNumber= '';
      this.form.overload= '';
      this.form.status= '';
      this.timeList=['', ''];
    },
    routerDetail(row) {
      console.log(this.tabActiveValue)
    //   this.$store.commit('setOffSiteManageId', row.id);
    //   let data = {
    //     id: '',
    //     path: this.$route.path,
    //     value: this.tabActiveValue
    //   }
    //   iLocalStroage.sets('caseCenterDentails', data);
    // debugger;
    // debugger;
      this.$router.push({
        name: 'dentails-index',
        params: {
            tabTitle: this.tabActiveValue,
            path: this.$route.path,
            value: this.tabActiveValue
        }
      })
    //   let setCaseNumber = '超限案件详情';
    //   this.$store.commit("setCaseNumber", setCaseNumber);
      // let changeTabData = {
      //         tabIndex: '',
      //         title: '超限案件详情'
      //       };
      // this.$store.commit("changeOneTabName", changeTabData);
    },
    routerEvidenceDetail() {
      this.$router.push({
        name: 'evidenceDetail'
      })
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getLogList(1);
    },
    //更换页码
    handleCurrentChange(val) {
      this.getLogList(val);
    },
    routerInvalidCue(item) {
      this.$router.push({
        name: 'invalidCueDetail'
      })
    }
  },
  created() {
    this.search();
  },
  mounted() {

  }
}
</script>
<style lang="scss" src="@/assets/css/cluesReview.scss" scoped></style>
