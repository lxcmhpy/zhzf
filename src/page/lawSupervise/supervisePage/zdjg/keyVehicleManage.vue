<template>
<!-- 非现场治超列表 -->
<keep-alive>
<div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox toggleBox">
        <div class="handlePart caseHandleSearchPart">
            <el-form :inline="true" :model="form" label-width="80px"  ref="form">
                <el-form-item label="车牌号">
                    <el-input v-model="form.vehicleColor" placeholder="请输入车牌号" @keyup.enter.native="getVehicleList(1)"></el-input>
                    <!-- <el-select v-model="form.vehicleColor" placeholder="请选择">
                        <el-option
                        v-for="item in vehicleColorList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name"
                        ></el-option>
                    </el-select> -->
                </el-form-item>
                 <el-form-item label="时间" >
                        <el-date-picker
                        v-model="timeList"
                        type="daterange"
                        range-separator="—"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        format="yyyy-MM-dd"
                        :default-time="['00:00:00', '23:59:59']"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div class="search-btns">
                <el-button size="medium" class="commonBtn searchBtn" title="搜索" icon="iconfont law-sousuo" @click="getVehicleList(1)"></el-button>
                <el-button size="medium" class="commonBtn searchBtn" title="重置" icon="iconfont law-zhongzhi" @click="reset('form')"></el-button>
            </div>
        </div>
        <div class="handlePart" style="margin-left: 0px;">
            <el-button type="primary" size="medium" >
                <i class="iconfont law-submit-o f12"></i> 新增
            </el-button>
             <el-button type="primary" size="medium">
                <i class="iconfont law-submit-o f12"></i> 删除
            </el-button>
             <el-button type="primary" size="medium">
                <i class="iconfont law-submit-o f12"></i> 抽取
            </el-button>
        </div>
         <div class="tablePart">
            <el-table :data="tableData" stripe resizable border style="width: 100%;height:100%;" @row-click="handleNodeClick">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column label="车牌号" align="center"  width="120">
                    <template slot-scope="scope">
                        <div :class="vehicleColorObj[scope.row.vehicleColor]">
                            <div class="border">
                                {{scope.row.vehicleNumber}}
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="area" label="车属地" align="center"></el-table-column>
                <el-table-column prop="lscc" label="历史查处次数" align="center"></el-table-column>
                <el-table-column prop="status" label="监控状态" align="center"></el-table-column>
                <el-table-column prop="warningTime" label="预警时间" align="center"></el-table-column>
                <el-table-column prop="reason" label="详情" align="center"></el-table-column>
                <!-- <el-table-column prop="status" label="状态" align="center"></el-table-column> -->
                <!-- <el-table-column label="操作" width="300px" align="center">
                    <template slot-scope="scope">
                         <a href="javascript:void(0)" @click="routerInvalidCueDetail(scope.row)">
                            无效信息
                        </a>&nbsp;&nbsp;
                    </template>
                </el-table-column> -->
            </el-table>
        </div>
        <div class="paginationBox" >
            <div v-if="total/form.size > 1">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="form.current"
                    background
                    :page-sizes="[5, 10, 20, 30, 40]"
                    :page-size="form.size"
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
<script>
import {queryListPage, findAllDrawerById, getVehicleList} from '@/api/lawSupervise.js';
import { BASIC_DATA_SYS } from "@/common/js/BASIC_DATA.js";
import { mapGetters } from "vuex";
export default {
  inject: ["reload"],
  data() {
    return {
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
            size: 5, //每页显示条数
            warningStartTime: '',
            warningEndTime: ''
            // checkEndTime: '',
            // checkStartTime: ''
        },
        total: 0, // 总条数
        timeList: ['',''],
        processStatus: [{
            value: '无效信息'
        }, {
            value: '待审核'
        }, {
            value: '审核中'
        }, {
            value: '已转办'
        }, {
            value: '已审核'
        }],
        tabActiveValue: '无效信息',
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
    getVehicleList (val) {
        this.form.current = val;
        this.form.warningStartTime = this.timeList[0];
        this.form.warningEndTime = this.timeList[1];

        let _this = this
        new Promise((resolve, reject) => {
            getVehicleList(_this.form).then(
                res => {
                    // resolve(res)
                    // _this[obj] = res.data
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
    handleNodeClick (row) {
        this.$router.push({
            name: 'law_supervise_keyVehicleDentails',
            params: {
                id: row.id
            }
        })
    },
      //更改每页显示的条数
    handleSizeChange(val) {
        this.form.size = val;
        this.getVehicleList(1);
    },
    //更换页码
    handleCurrentChange(val) {
      this.getVehicleList(val);
    },
    reset (formName) {
        this.$refs[formName].resetFields();
    }
  },
  mounted () {
      this.getVehicleList()
  }
}
</script>
