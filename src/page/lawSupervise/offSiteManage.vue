<template>
<div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox toggleBox">
        <div class="handlePart caseHandleSearchPart">
            <div>
                <el-button type="primary" size="medium">
                    <i class="iconfont law-submit-o f12"></i> 预警推送
                </el-button><br><br>
                <a href="javascript:void(0)" @click="routerDetail">
                详情
                </a>
                <a href="javascript:void(0)" @click="routerEvidenceDetail">
                证据
                </a>

            </div>
            <el-form :inline="true" :model="form" label-width="80px"  ref="form">
                <el-form-item label="检测站点">
                    <el-input v-model="form.siteName" placeholder="回车可直接查询" @keyup.enter.native="search()"></el-input>
                </el-form-item>
                <el-form-item label="车牌号">
                    <el-select v-model="form.vehicleColor" class="w-80"></el-select>
                </el-form-item>
                <el-form-item label=" " label-width="0px">
                    <el-input v-model="form.vehicleNumber" placeholder="回车可直接查询" @keyup.enter.native="search()"></el-input>
                </el-form-item>
                <el-form-item label=" " label-width="13px">
                    <el-button size="medium" class="commonBtn searchBtn" title="搜索" icon="iconfont law-sousuo" @click="search(1)"></el-button>
                    <el-button size="medium" class="commonBtn searchBtn" title="重置" icon="iconfont law-zhongzhi" @click="reset"></el-button>
                    <el-button size="medium" class="commonBtn toogleBtn" :title="isShow? '点击收缩':'点击展开'" :icon="isShow? 'iconfont law-top': 'iconfont law-down'" @click="isShow = !isShow" >
                    </el-button>
                </el-form-item>
                <el-collapse-transition>
                    <div v-show="isShow" :class="{'ransition-box':true}">
                        <el-form-item label="超限率">
                            <el-input v-model="form.overload" placeholder="回车可直接查询" @keyup.enter.native="search(1)"></el-input>
                        </el-form-item>
                        <el-form-item label="过检时间">
                             <el-date-picker
                                v-model="form.gjsj"
                                type="daterange"
                                range-separator="—"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                format="yyyy-MM-dd"
                                :default-time="['00:00:00', '23:59:59']"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="处理状态">
                            <el-select v-model="form.status" prop="type">
                                <el-option
                                v-for="item in statusStatus"
                                :key="item.value"
                                :label="item.value"
                                :value="item.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </el-collapse-transition>
            </el-form>
        </div>
         <div class="tablePart">
            <el-table :data="tableData" stripe resizable border style="width: 100%;height:100%;" >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="organ" label="过检时间" align="center"></el-table-column>
                <el-table-column prop="ip" label="执法点" align="center"></el-table-column>
                <el-table-column prop="type" label="车道" align="center"></el-table-column>
                <el-table-column prop="operation" label="车牌号" align="center"></el-table-column>
                <el-table-column prop="username" label="车货总质量（t）" align="center"></el-table-column>
                <el-table-column prop="createTime" label="限重（t）" align="center"></el-table-column>
                <el-table-column prop="createTime" label="超重（kg）" align="center"></el-table-column>
                <el-table-column prop="createTime" label="超限率（kg）" align="center"></el-table-column>
                <el-table-column prop="createTime" label="重点监管" align="center"></el-table-column>
                <el-table-column prop="createTime" label="处理状态" align="center"></el-table-column>
            </el-table>
        </div>
        <div class="paginationBox" v-show="form.size">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="form.current"
                background
                :page-sizes="[10, 20, 30, 40]"
                layout="prev, pager, next,sizes,jumper"
                :total="form.size"
            ></el-pagination>
        </div>
    </div>

</div>
</template>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
<script>
import {queryListPage} from '@/api/lawSupervise.js';
export default {
  data() {
    return {
        pageSize: 10, //pagesize
        form: {
            siteName: '',
            vehicleColor: '',
            vehicleNumber: '',
            overload: '',
            gjsj: ['', ''],
            status: '',
            current: 1, //当前页
            size: 0, //总页数
            checkEndTime: '',
            checkStartTime: ''
        },
        statusStatus: [{
            value: '未审核'
        }, {
            value: '转办'
        }, {
            value: '误解'
        }],
        isShow: false,
        tableData: []
    }
  },
  methods: {
    search () {
        this.form.checkStartTime = this.form.gjsj[0];
        this.form.checkEndTime = this.form.gjsj[1];
        let _this = this
        new Promise((resolve, reject) => {
            queryListPage(_this.form).then(
                res => {
                    resolve(res)
                    debugger
                    // obj.list = res.data
                },
                error => {
                    //  _this.errorMsg(error.toString(), 'error')
                        return
                }
            )
        })
    },
    reset () {

    },
    routerDetail () {
        this.$router.push({
            name: 'offSiteDetail'
        })
    },
    routerEvidenceDetail () {
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
    }
  }
}
</script>
