<template>
  <keep-alive>
    <div class="com_searchAndpageBoxPadding">
      <div class="searchAndpageBox toggleBox">
        <div class="handlePart caseHandleSearchPart">
          <el-form :inline="true" :model="form" label-width="80px" ref="form">
            <el-form-item label="检测站点">
              <el-input v-model="form.siteName" placeholder="回车可直接查询" @keyup.enter.native="search()"></el-input>
            </el-form-item>

            <el-form-item label="开始时间">
              <el-date-picker v-model="checkStartTime" type="date" format="yyyy-MM-dd" placeholder="开始日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker v-model="checkEndTime" type="date" format="yyyy-MM-dd" placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="时间段">
              <el-date-picker v-model="timeList" type="daterange" range-separator="—" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd" :default-time="['00:00:00', '23:59:59']" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label=" " label-width="13px">
              <el-button size="medium" class="commonBtn searchBtn" title="搜索" icon="iconfont law-sousuo" @click="search(1)"></el-button>
              <el-button size="medium" class="commonBtn searchBtn" title="重置" icon="iconfont law-zhongzhi" @click="reset"></el-button>
              <el-button size="medium" class="commonBtn toogleBtn" :title="isShow? '点击收缩':'点击展开'" :icon="isShow? 'iconfont law-top': 'iconfont law-down'" @click="isShow = !isShow">
              </el-button>
            </el-form-item>
            <el-collapse-transition>
              <div v-show="isShow" :class="{'ransition-box':true}">
                <el-form-item label="车牌号">
                  <el-select v-model="form.vehicleColor" class="w-80" placeholder="请选择">
                    <el-option v-for="item in vehicleColorList" :key="item.id" :label="item.name" :value="item.name"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label=" " label-width="0px">
                  <el-input v-model="form.vehicleNumber" placeholder="回车可直接查询" @keyup.enter.native="search()"></el-input>
                </el-form-item>
                <el-form-item label="超限率">
                  <el-input v-model="form.siteName" placeholder="回车可直接查询" @keyup.enter.native="search()"></el-input>
                </el-form-item>
                <el-form-item label="黑名单">
                  <el-select v-model="form.status" prop="type">
                    <el-option v-for="item in processStatus" :key="item.value" :label="item.value" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-collapse-transition>
          </el-form>
        </div>
        <div class="handlePart" style="margin-left: 0px;">
          <el-button type="primary" size="medium">
            <!-- <i class="iconfont law-submit-o f12"></i>  -->
            导出
          </el-button>
          <el-button type="primary" size="medium">
            <!-- <i class="iconfont law-submit-o f12"></i>  -->
            统计图
          </el-button>
        </div>
        <div class="tablePart">
          <el-table :data="tableData" stripe resizable border style="width: 100%;height:100%;">
            <el-table-column label="序号" width="70px">
              <template slot-scope="scope">
                {{scope.$index+1}}
              </template>
            </el-table-column>
            <el-table-column prop="checkTime" label="过检时间" align="center" width="100"></el-table-column>
            <el-table-column prop="lane" label="检测站点" align="center"></el-table-column>

            <el-table-column label="车牌号码" align="center" width="120">
              <template slot-scope="scope">
                <div :class="vehicleColorObj[scope.row.vehicleColor]">
                  <div class="border">
                    {{scope.row.vehicleNumber}}
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="totalWeight" label="车货总质量" align="center"></el-table-column>
            <el-table-column prop="overWeight" label="超重" align="center"></el-table-column>
            <el-table-column prop="overWeight" label="超限率" align="center"></el-table-column>
            <el-table-column prop="totalWeight" label="重点监管" align="center"></el-table-column>
          </el-table>
        </div>
        <div class="paginationBox" v-show="form.size">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="form.current" background :page-sizes="[10, 20, 30, 40]" layout="prev, pager, next,sizes,jumper" :total="form.size"></el-pagination>
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
import { queryListPage, findAllDrawerById } from '@/api/lawSupervise.js';
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
        checkEndTime: '',
        checkStartTime: ''
      },
      timeList: ['', ''],
      processStatus: [{
        value: '待办'
      }, {
        value: '已回退'
      }, {
        value: '在办'
      }, {
        value: '办结'
      }, {
        value: '机构待办'
      }],
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
    activeAndSearch(item, index) {
      this.tabActiveIndex = index;
    },
    search() {
      this.form.checkStartTime = this.timeList[0];
      this.form.checkEndTime = this.timeList[1];
      let _this = this
      new Promise((resolve, reject) => {
        queryListPage(_this.form).then(
          res => {
            resolve(res)
            _this.tableData = res.data.records
          },
          error => {
            //  _this.errorMsg(error.toString(), 'error')
            return
          }
        )
      })
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

    },
    routerDetail(row) {
      this.$store.commit('setOffSiteManageId', row.id);
      this.$router.push({
        name: 'offSiteDetail'
      })
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
        name: 'invalidCue'
      })
    }
  },
  created() {
    // this.search();
    // this.findAllDrawerById(BASIC_DATA_SYS.cxl, 'cxlList');
    // this.findAllDrawerById(BASIC_DATA_SYS.vehicleColor, 'vehicleColorList');
  },
  mounted() {

  }
}
</script>
