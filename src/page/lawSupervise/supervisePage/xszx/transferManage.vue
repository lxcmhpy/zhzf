<template>
<!-- 非现场治超列表 -->
<keep-alive>
<div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox toggleBox">
        <div class="handlePart caseHandleSearchPart">
            <el-form :inline="true" :model="form" label-width="80px"  ref="form">
                <el-form-item label="检测站点">
                    <el-input v-model="form.siteName" placeholder="回车可直接查询" @keyup.enter.native="search()"></el-input>
                </el-form-item>
                <el-form-item label="车牌号">
                    <el-select v-model="form.vehicleColor" placeholder="请选择">
                        <el-option
                        v-for="item in vehicleColorList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label=" " label-width="0px">
                    <el-input v-model="form.vehicleNumber" placeholder="回车可直接查询" @keyup.enter.native="search()"></el-input>
                </el-form-item>
                <el-form-item label=" " label-width="13px">
                    <el-button size="medium" class="commonBtn searchBtn" title="搜索" icon="iconfont law-sousuo" @click="search(1)"></el-button>
                    <el-button size="medium" class="commonBtn searchBtn" title="重置" icon="iconfont law-zhongzhi" @click="reset"></el-button>
                    <el-button size="medium" class="commonBtn toogleBtn" :title="isShow? '点击收缩':'点击展开'" :icon="isShow? 'iconfont law-top': 'iconfont law-down'" @click="isShow = !isShow" >
                    </el-button>
                    <!-- <a href="javascript:void(0)" @click="routerDetail">
                        详情
                    </a>
                    <a href="javascript:void(0)" @click="routerEvidenceDetail">
                        证据
                    </a> -->
                </el-form-item>
                <el-collapse-transition>
                    <div v-show="isShow" :class="{'ransition-box':true}">
                        <el-form-item label="超限率">
                            <!-- <el-input v-model="form.overload" placeholder="回车可直接查询" @keyup.enter.native="search(1)"></el-input> -->
                            <el-select v-model="form.overload" class="w-80" placeholder="请选择">
                                <el-option
                                v-for="item in cxlList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.name"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="过检时间" >
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
                        <!-- <el-form-item label="处理状态">
                            <el-select v-model="form.status" prop="type">
                                <el-option
                                v-for="item in processStatus"
                                :key="item.value"
                                :label="item.value"
                                :value="item.value"
                                ></el-option>
                            </el-select>
                        </el-form-item> -->
                    </div>
                </el-collapse-transition>
            </el-form>
        </div>
        <div class="handlePart" style="margin-left: 0px;">
            <el-button type="primary" size="medium" >
                <i class="iconfont law-submit-o f12"></i> 批量转办
            </el-button>
             <el-button type="primary" size="medium">
                <i class="iconfont law-submit-o f12"></i> 转办
            </el-button>
        </div>
         <div class="tablePart">
            <el-table :data="tableData" stripe resizable border style="width: 100%;height:100%;" >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="checkTime" label="过检时间" align="center" width="100"></el-table-column>
                <el-table-column prop="organName" label="执法点" align="center"></el-table-column>
                <el-table-column prop="lane" label="车道" align="center"></el-table-column>
                <el-table-column label="车牌号" align="center"  width="120">
                    <template slot-scope="scope">
                        <div :class="vehicleColorObj[scope.row.vehicleColor]">
                            <div class="border">
                                {{scope.row.vehicleNumber}}
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="totalWeight" label="车货总质量（t）" align="center"></el-table-column>
                <el-table-column prop="load" label="限重（t）" align="center"></el-table-column>
                <el-table-column prop="overweight" label="超重（kg）" align="center"></el-table-column>
                <el-table-column prop="overload" label="超限率（kg）" align="center"></el-table-column>
                <el-table-column prop="key" label="重点监管" align="center"></el-table-column>
                <el-table-column prop="status" label="状态" align="center"></el-table-column>
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
            size: 10, //每页显示条数
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
  }
}
</script>
