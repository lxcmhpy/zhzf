<template>
    <div class="cats-layout-page-content">
        <div class="searchAndpageBox toggleBox">
            <div class="tablePart">
                <el-table :data="dataList" stripe resizable border style="width: 100%;height:100%;" row-key="id">
                    <el-table-column prop="organName" label="机构名称" align="center"></el-table-column>
                    <el-table-column prop="selfCount" label="自查报告上传情况" align="center">
                        <template slot-scope="scope">
                            <el-tag type="success" @click="clickColumn(scope.row, 'selfCount')"
                                v-show="scope.row.selfCount > 0">自查自评</el-tag>
                            <el-tag type="info" v-show="scope.row.selfCount == 0">自查自评</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="personUploadCount" label="执法人员信息上传情况" align="center">
                        <template slot-scope="scope">
                            <el-tag type="success" @click="
                                    clickColumn(scope.row, 'personUploadCount')
                                " v-show="scope.row.personUploadCount > 0">已上传{{ scope.row.personUploadCount }}
                            </el-tag>
                            <el-tag type="info" v-show="scope.row.personUploadCount == 0">未上传</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="personExtractCount" label="执法人员信息抽取情况" align="center">
                        <template slot-scope="scope">
                            <el-tag type="success" @click="
                                    clickColumn(scope.row, 'personExtractCount')
                                " v-show="scope.row.personExtractCount > 0">已抽取{{
                                    scope.row.personExtractCount
                                }}</el-tag>
                            <el-tag type="info" v-show="scope.row.personExtractCount == 0">未抽取</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="caseUploadCount" label="案卷信息上传情况" align="center">
                        <template slot-scope="scope">
                            <el-tag type="success" @click="
                                    clickColumn(scope.row, 'caseUploadCount')
                                " v-show="scope.row.caseUploadCount > 0">已上传{{ scope.row.caseUploadCount }}</el-tag>
                            <el-tag type="info" v-show="scope.row.caseUploadCount == 0">未上传</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="caseExtractCount" label="案卷信息抽取情况" align="center">
                        <template slot-scope="scope">
                            <el-tag type="success" @click="
                                    clickColumn(scope.row, 'caseExtractCount')
                                " v-show="scope.row.caseExtractCount > 0">已抽取{{ scope.row.caseExtractCount }}</el-tag>
                            <el-tag type="info" v-show="scope.row.caseExtractCount == 0">未抽取</el-tag>
                        </template>
                    </el-table-column>
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
                    <!-- <template slot-scope="scope">
                        {{ scope.row.leaderShip === "0" ? "是" : "否" }}
                    </template> -->
                </el-table-column>
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
        getWorkProgress,
        downLoadZipFile
    } from "@/api/pykh/appraisalExam.js";
    import iLocalStroage from "@/common/js/localStroage";
    import {
        findPykhStaffByPage
    } from "@/api/pykh/catsAppraisalExamPersonUpload.js";
    import {
        findPykhCaseByPage
    } from "@/api/pykh/catsAppraisalExamCaseUpload.js";
    import {
        downLoadFile
    } from "@/api/pykh/joinExam.js";
    export default {
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
            async fetchData() {
                let fileObj = await getWorkProgress();
                this.dataList = fileObj.data;
            },
            clickColumn(row, type) {
                console.log(row, type);
                if ("personUploadCount" === type) {
                    let params = {};
                    params.oId = row.organId;
                    this.fetchStaffData(params);
                } else if ("personExtractCount" === type) {
                    let params = {};
                    params.oId = row.organId;
                    params.staffStatus = "1";
                    this.fetchStaffData(params);
                } else if ("caseUploadCount" === type) {
                    let params = {};
                    params.oId = row.organId;
                    this.fetchCaseData(params);
                } else if ("caseExtractCount" === type) {
                    let params = {};
                    params.oId = row.organId;
                    params.caseStatus = "1";
                    this.fetchCaseData(params);
                } else if ("selfCount" === type) {
                    let a = document.createElement("a");
                    a.href =
                        iLocalStroage.gets("CURRENT_BASE_URL").CAPTCHA_HOST +
                        "/pykh/file/downLoadZip/" +
                        row.batchId +
                        "/" +
                        row.organId;
                    a.click();
                }
            },
            downLoadAttachment(row) {
                let a = document.createElement("a");
                a.href =
                    iLocalStroage.gets("CURRENT_BASE_URL").CAPTCHA_HOST +
                    "/pykh/file/download/" +
                    row.storageId;
                a.click();
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
<style lang="scss" scope src="@/assets/scss/page/catsAppraisalExamination.scss"></style>
