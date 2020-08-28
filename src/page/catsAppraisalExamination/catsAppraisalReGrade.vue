<template>
    <div class="cats-layout-page-content">
        <div class="searchAndpageBox toggleBox">
            <div class="handlePart" style="margin-left: 0px;" v-if="organId === '1'">
                <div class="search">
                    <el-form :inline="true">
                        <el-form-item label="机构名称">
                            <el-select v-model="search.orgId" placeholder="全部" @change="onChange">
                                <el-option v-for="item in orgList" :key="item.id" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="tablePart">
                <!-- @row-click="handleNodeClick" -->
                <el-table :data="dataList" stripe resizable border style="width: 100%;height:100%;" row-key="id">
                    <el-table-column prop="orgName" label="机构名称" align="center"></el-table-column>
                    <el-table-column prop="caseNo" label="案卷编号" align="center"></el-table-column>
                    <el-table-column prop="businessArea" label="执法门类" align="center"></el-table-column>
                    <el-table-column prop="caseType" label="案卷类型" align="center"></el-table-column>
                    <el-table-column prop="oneScoreSum" label="初评分数" align="center"></el-table-column>
                    <el-table-column prop="twoScoreSum" label="复评分数" align="center"></el-table-column>
                    <el-table-column prop="pfStatus" label="状态" :formatter="format" align="center"></el-table-column>
                    <el-table-column label="操作" align="center" width="120">
                        <template slot-scope="scope">
                            <el-button type="text" @click="openDialog(scope.row)">评分</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<script>
    import {
        getCaseInfoByOrgId
    } from "@/api/pykh/appraisalExam.js";
    import {
        findAllDepartment
    } from "@/api/pykh/catsAppraisalExamPersonUpload.js";
    import iLocalStroage from "@/common/js/localStroage";
    export default {
        data() {
            return {
                search: {},
                dataList: [],
                orgList: [],
                organId: ""
            };
        },
        methods: {
            fetchData() {
                let data = {
                    orgId: this.search.orgId,
                    assessType: "案卷评查",
                    pfStatus: "1"
                };
                let _this = this;
                getCaseInfoByOrgId(data).then(res => {
                    if (res.code == 200) {
                        _this.dataList = res.data;
                    }
                });
            },
            onChange(val) {
                this.search.orgId = val;
                this.fetchData();
            },
            openDialog(row) {
                row.url = this.$route.name;
                this.$router.push({
                    name: "catsAppraisalReGradeAdd",
                    params: row
                });
            },
            format(row, column) {
                if (row.pfStatus === "0") {
                    return "未评分";
                } else if (row.pfStatus === "1") {
                    return "已初评";
                } else {
                    return "已复评";
                }
            },
            findAllOrg() {
                let _this = this;
                findAllDepartment(this.organId).then(res => {
                    if (res.code == 200) {
                        _this.orgList = res.data;
                    }
                });
            }
        },
        mounted() {
            let userInfo = iLocalStroage.gets("userInfo");
            this.organId = userInfo.organId;
            if (this.organId === "1") {
                this.findAllOrg();
                if (this.$route.params.orgId !== undefined) {
                    this.search.orgId = this.$route.params.orgId;
                    this.fetchData();
                }
            } else {
                this.search.orgId = this.organId;
                this.fetchData();
            }
        }
    };

</script>
