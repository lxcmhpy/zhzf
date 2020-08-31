<template>
    <div class="cats-layout-page-content">
        <div class="searchAndpageBox toggleBox">
            <el-collapse v-model="activeName" accordion>
                <el-collapse-item title="执法人员考试成绩" name="1" class="active">
                    <template slot="title">
                        执法人员考试成绩
                        <span :class="
                                activeName === '1'
                                    ? 'scoreActive'
                                    : 'scoreUnActive'
                            ">{{ ryScoreAvg }}分</span>
                    </template>
                    <el-table :data="ryScoreList" stripe resizable style="width: 96%;height:100%;margin:2%;"
                        row-key="id">
                        <el-table-column prop="staffName" label="执法人员姓名" align="center"></el-table-column>
                        <el-table-column prop="currentUnit" label="所在单位" align="center"></el-table-column>
                        <el-table-column prop="staffFraction" label="考试成绩" align="center"></el-table-column>
                    </el-table>
                </el-collapse-item>
                <el-collapse-item title="案卷评查得分" name="2">
                    <template slot="title">
                        案卷评查得分
                        <span :class="
                                activeName === '2'
                                    ? 'scoreActive'
                                    : 'scoreUnActive'
                            ">{{ ajScoreAvg }}分</span>
                    </template>
                    <el-table :data="caseScoreList" stripe resizable border style="width: 96%;height:100%;margin:2%;"
                        row-key="id">
                        <el-table-column prop="caseNo" label="案卷号" align="center"></el-table-column>
                        <el-table-column prop="caseAgency" label="办案机构/执法机构" align="center"></el-table-column>
                        <el-table-column prop="twoScoreSum" label="评分" align="center"></el-table-column>
                        <!--
                        <el-table-column prop="staffFraction" label="评分详情" align="center">
                            <template slot-scope="scope">
                                <el-popover placement="left" width="600" trigger="click">
                                    <el-table :data="caseDetails">
                                        <el-table-column width="200" property="nrxm" label="评分细则"></el-table-column>
                                        <el-table-column width="100" property="twoSore" label="得分"></el-table-column>
                                        <el-table-column width="300" property="season" label="扣分原因"></el-table-column>
                                    </el-table>
                                    <el-button slot="reference" type="text" @click="showDetails(scope.row)">查看</el-button>
                                </el-popover>
                            </template>
                        </el-table-column>
                        -->
                    </el-table>
                </el-collapse-item>
            </el-collapse>
            <div class="el-collapse-item__header">
                <span>网上检查得分</span>
                <span v-if="onlineScoreList.length > 0" class="scoreUnActive">{{ onlineScoreList[0].twosore }}分</span>
                <span v-else class="scoreUnActive">0分</span>
            </div>
        </div>
    </div>
</template>
<script>
    import {
        getCheckResult,
        getCaseDetailsResult
    } from "@/api/pykh/appraisalExam.js";
    export default {
        data() {
            return {
                ryScoreList: [],
                caseScoreList: [],
                onlineScoreList: [],
                caseDetails: [],
                activeName: "1"
            };
        },
        methods: {
            fetchData() {
                let _this = this;
                getCheckResult().then(res => {
                    if (res.data.stafflist) {
                        _this.ryScoreList = res.data.stafflist;
                    }
                    if (res.data.caselist) {
                        _this.caseScoreList = res.data.caselist;
                    }
                    if (res.data.wplist) {
                        _this.onlineScoreList = res.data.wplist;
                    }
                });
            },
            showDetails(row) {
                let _this = this;
                let data = {
                    batchId: row.batchId,
                    caseId: row.caseId
                };
                getCaseDetailsResult(data).then(res => {
                    if (res.data) {
                        _this.caseDetails = res.data;
                    }
                });
            }
        },
        mounted() {
            this.fetchData();
        },
        computed: {
            ryScoreAvg: function () {
                let sum = 0;
                this.ryScoreList.forEach(item => {
                    sum += item.staffFraction;
                });
                let average =
                    this.ryScoreList.length < 1 ?
                    sum :
                    sum / this.ryScoreList.length;
                return average.toFixed(2);
            },
            ajScoreAvg: function () {
                let sum = 0;
                this.caseScoreList.forEach(item => {
                    sum += item.twoScoreSum;
                });
                let average =
                    this.caseScoreList.length < 1 ?
                    sum :
                    sum / this.caseScoreList.length;
                return average.toFixed(2);
            }
        }
    };

</script>
<style>
    .searchAndpageBox .is-active {
        background-color: #4573d0 !important;
        color: #ffffff !important;
    }

    .searchAndpageBox .el-collapse-item__header {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        height: 60px;
        line-height: 48px;
        background-color: #f6f6f6;
        color: #20232c;
        cursor: pointer;
        border: 1px solid #e1e1e1;
        font-size: 18px;
        font-weight: 500;
        -webkit-transition: border-bottom-color 0.3s;
        transition: border-bottom-color 0.3s;
        outline: 0;
        padding: 20px;
    }

    .searchAndpageBox .el-collapse-item__wrap {
        will-change: height;
        background-color: #fff;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border: 1px solid #e1e1e1;
    }

    .scoreUnActive {
        color: #f19004;
        margin-left: 40px;
    }

    .scoreActive {
        color: #ffffff;
        margin-left: 40px;
    }

</style>
