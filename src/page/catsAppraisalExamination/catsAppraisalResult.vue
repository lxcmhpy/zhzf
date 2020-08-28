<template>
    <div class="cats-layout-page-content">
        <div class="searchAndpageBox toggleBox">
            <div class="handlePart" style="margin-left: 0px;">
                <viewNotice ref="viewNoticeRef"></viewNotice>
                <div class="search">
                    <el-form :inline="true">
                        <el-form-item>
                            <el-button type="primary" size="cats-common" icon="el-icon-search" @click="onPublic">发布
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="tablePart">
                <!-- @row-click="handleNodeClick" -->
                <el-table :data="dataList" stripe resizable border style="width: 100%;height:100%;" row-key="id">
                    <el-table-column prop="orgName" label="机构名称" align="center"></el-table-column>
                    <el-table-column prop="batchName" label="考核名称" align="center"></el-table-column>
                    <el-table-column prop="selfSore" label="自查自评" align="center">
                        <template slot-scope="scope">
                            <el-tag type="success" @click="clickColumn(scope.row, 'selfSore')"
                                v-show="scope.row.selfSore != '0'">自查自评</el-tag>
                            <el-tag type="info" v-show="scope.row.selfSore == '0'">自查自评</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="psnSore" label="执法人员考试" align="center">
                        <template slot-scope="scope">
                            <el-tag type="success" @click="clickColumn(scope.row, 'psnSore')"
                                v-show="scope.row.psnSore">
                                {{ scope.row.psnSore }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="caseSore" label="案卷评查" align="center">
                        <template slot-scope="scope">
                            <el-tag type="success" @click="clickColumn(scope.row, 'caseSore')"
                                v-show="scope.row.caseSore">{{ scope.row.caseSore }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="onLineSore" label="网上检查" align="center"></el-table-column>
                    <!-- <el-table-column prop="offLineSore" label="现场检查" align="center"></el-table-column> -->
                </el-table>
            </div>
        </div>
        <el-dialog title="执法人员信息" :visible.sync="personVisible" @close="closePersonDialog" :close-on-click-modal="false"
            width="90%">
            <el-table :data="personList" stripe resizable border style="width: 100%;height:100%;" row-key="id">
                <el-table-column label="序号" width="70px">
                    <template slot-scope="scope">
                        {{ scope.$index + 1 }}
                    </template>
                </el-table-column>
                <el-table-column prop="staffName" label="姓名" align="center"></el-table-column>
                <el-table-column prop="idCard" label="身份证号" align="center"></el-table-column>
                <el-table-column prop="provinceNo" label="现持省内执法证号" align="center"></el-table-column>
                <el-table-column prop="ministerialNo" label="现持部级执法证号" align="center"></el-table-column>
                <el-table-column prop="maritimeNo" label="现持海事执法证号" align="center"></el-table-column>
                <el-table-column prop="currentUnit" label="所在单位" align="center"></el-table-column>
                <el-table-column prop="provinceDivision" label="省级行政区划" align="center"></el-table-column>
                <el-table-column prop="cityDivision" label="地市行政区划" align="center"></el-table-column>
                <el-table-column prop="jobTitle" label="职务" align="center"></el-table-column>
                <el-table-column prop="leaderShip" label="是否为执法机构领导班子成员" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.leaderShip === "0" ? "是" : "否" }}
                    </template>
                </el-table-column>
                <el-table-column prop="staffFraction" label="考试成绩" align="center"></el-table-column>
            </el-table>
        </el-dialog>
        <el-dialog title="案卷信息" :visible.sync="caseVisible" @close="closeCaseDialog" :close-on-click-modal="false"
            width="90%">
            <el-table :data="caseList" stripe resizable border style="width: 100%;height:100%;" row-key="id">
                <el-table-column label="序号" width="70px">
                    <template slot-scope="scope">
                        {{ scope.$index + 1 }}
                    </template>
                </el-table-column>
                <el-table-column prop="caseNo" label="案卷编号" align="center"></el-table-column>
                <el-table-column prop="caseType" label="案卷类型" align="center"></el-table-column>
                <el-table-column prop="businessArea" label="执法门类" align="center"></el-table-column>
                <el-table-column prop="caseCause" label="案由" align="center"></el-table-column>
                <el-table-column prop="caseParty" label="当事人" align="center"></el-table-column>
                <el-table-column prop="enforcementOfficials1" label="执法人员" align="center"></el-table-column>
                <el-table-column prop="casesMajor" label="是否是重大案卷" align="center"></el-table-column>
                <el-table-column prop="caseAgency" label="办案机构/执法机构" align="center"></el-table-column>
                <el-table-column prop="provinceDivision" label="省级行政区划" align="center"></el-table-column>
                <el-table-column prop="cityDivision" label="市级行政区划" align="center"></el-table-column>
                <el-table-column prop="caseClosedTime" label="结案时间" align="center"></el-table-column>
                <el-table-column prop="twoScoreSum" label="分数" align="center"></el-table-column>
                <el-table-column label="操作" align="center" width="120">
                    <template slot-scope="scope">
                        <el-button type="text" @click="downLoadAttachment(scope.row)"
                            v-show="scope.row.storageId != null">下载附件</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>
<script>
    import {
        getAppraisalResult,
        publicResult
    } from "@/api/pykh/appraisalExam.js";
    import {
        findPykhStaffByPage
    } from "@/api/pykh/catsAppraisalExamPersonUpload.js";
    import {
        findPykhCaseByPage
    } from "@/api/pykh/catsAppraisalExamCaseUpload.js";
    import iLocalStroage from "@/common/js/localStroage";
    import viewNotice from './noticeManage/viewNotice'
    export default {
        components: {
            viewNotice
        },
        data() {
            return {
                dataList: [],
                personVisible: false,
                caseVisible: false,
                personList: [],
                caseList: []
            };
        },
        methods: {
            downLoadAttachment(row) {
                let routerData = {
                    storageId: row.storageId
                }
                this.$refs.viewNoticeRef.showPDF(row)
            },
            fetchData() {
                let _this = this;
                getAppraisalResult().then(res => {
                    if (res.code == 200) {
                        _this.dataList = res.data;
                    }
                });
            },
            onPublic() {
                const data = this.dataList.find(
                    item =>
                    item.caseSore === null ||
                    item.selfSore === null ||
                    item.onLineSore === null ||
                    item.psnSore === null
                );
                // item.offLineSore === null ||
                if (data) {
                    this.catsMessage({
                        type: "warning",
                        message: "全部完成评分后才能发布"
                    });
                    return;
                }
                publicResult().then(res => {
                    if (res.code == 200) {
                        this.catsMessage({
                            type: "success",
                            message: "发布成功!"
                        });
                        this.fetchData();
                    }
                });
            },
            clickColumn(row, type) {
                if ("selfSore" == type) {
                    let a = document.createElement("a");
                    a.href =
                        iLocalStroage.gets("CURRENT_BASE_URL").CAPTCHA_HOST +
                        "/pykh/file/downLoadZip/" +
                        row.batchId +
                        "/" +
                        row.orgId;
                    a.click();
                } else if ("caseSore" == type) {
                    let params = {};
                    params.oId = row.orgId;
                    params.caseStatus = "1";
                    params.pfStatus = "2";
                    this.fetchCaseData(params);
                } else {
                    let params = {};
                    params.oId = row.orgId;
                    params.staffStatus = "1";
                    params.fjStatus = "1";
                    this.fetchStaffData(params);
                }
            },
            async fetchCaseData(params) {
                params.current = 1;
                params.size = 1000;
                let obj = await findPykhCaseByPage(params);
                this.caseList = obj.data.records;
                this.caseVisible = true;
            },
            async fetchStaffData(params) {
                params.current = 1;
                params.size = 1000;
                let obj = await findPykhStaffByPage(params);
                this.personList = obj.data.records;
                this.personVisible = true;
            },
            closePersonDialog() {
                this.personVisible = false;
            },
            closeCaseDialog() {
                this.caseVisible = false;
            }
        },
        mounted() {
            this.fetchData();
        }
    };

</script>
