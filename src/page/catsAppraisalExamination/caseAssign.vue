<template>
    <div class="cats-layout-page-content">
        <div class="searchAndpageBox toggleBox">
            <!-- <div class="handlePart" style="margin-left: 0px;"> -->
            <div>
                <div class="search">
                    <el-form :label-position="labelPosition" :model="search" ref="form" label-width="160px"
                        :inline="true">
                        <el-form-item label="评查专家">
                            <el-select v-model="search.expertName" filterable placeholder="请选择" @change="fetchData">
                                <el-option v-for="(item, index) in expertList" :key="index"
                                    :label="item.organName + '-' + item.name" :value="item"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item v-show="!isSubmit">
                            <el-button type="primary" size="cats-common" icon="el-icon-plus" @click="randomAssign">
                                随机分配案卷
                            </el-button>
                            <el-button type="primary" v-show="data.length > 0" size="cats-common" icon="el-icon-plus"
                                @click="submitAssign">确认分配案卷</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="extractPage">
                    <div class="com_extract_top">
                        <el-transfer width="100%" :titles="['待分配案卷', '已分配案卷']" v-model="value" :button-texts="['', '']"
                            :data="data" @change="handleChange">
                            <span slot-scope="{ option }">
                                <ul class="transfer-list">
                                    <li>
                                        <span>{{ option.caseNo }}</span>
                                    </li>
                                    <li>
                                        <span>{{ option.caseType }}</span>
                                    </li>
                                    <li>
                                        <span>{{ option.businessArea }}</span>
                                    </li>
                                    <li>
                                        <span>{{ option.organName }}</span>
                                    </li>
                                </ul>
                            </span>
                            <ul class="transfer-list transfer-list-header" slot="left-footer">
                                <li><span>案卷编号</span></li>
                                <li><span>案卷类型</span></li>
                                <li><span>执法门类</span></li>
                                <li><span>机构名称</span></li>
                            </ul>
                            <ul class="transfer-list transfer-list-header" slot="right-footer">
                                <li><span>案卷编号</span></li>
                                <li><span>案卷类型</span></li>
                                <li><span>执法门类</span></li>
                                <li><span>机构名称</span></li>
                            </ul>
                        </el-transfer>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {
        getExpertList,
        findCaseByExpert,
        submitAssign,
        randomAssign,
        saveAssign,
    } from "@/api/pykh/appraisalExam.js";
    import iLocalStroage from "@/common/js/localStroage";
    import qs from "qs";
    export default {
        data() {
            return {
                data: [],
                value: [],
                search: {
                    expertId: "",
                    expertName: "",
                    batchId: "",
                    organId: "",
                },
                organId: "",
                labelPosition: "right",
                expertList: [],
                isSubmit: false,
            };
        },
        methods: {
            fetchData(item) {
                this.search.expertId = item.id;
                this.search.organId = item.organId;
                this.search.expertName = item.organName + "-" + item.name;
                this.findCaseByExpert();
            },
            findCaseByExpert() {
                findCaseByExpert(this.search.expertId, this.search.batchId).then(
                    (res) => {
                        if (res.code == 200) {
                            var caseList = [];
                            this.value = [];
                            for (var i = 0; i < res.data.length; i++) {
                                if (res.data[i].assignStatus != 0) {
                                    this.value.push(i);
                                }
                                caseList.push({
                                    key: i,
                                    label: res.data[i].caseNo,
                                    caseNo: res.data[i].caseNo,
                                    caseId: res.data[i].caseId,
                                    caseType: res.data[i].caseType,
                                    businessArea: res.data[i].businessArea,
                                    caseCause: res.data[i].caseCause,
                                    organName: res.data[i].organName,
                                    disabled: this.isSubmit ||
                                        res.data[i].oid == this.search.organId,
                                });
                            }
                            this.data = caseList;
                        }
                    }
                );
            },
            submitAssign() {
                this.$confirm("所有案卷是否完成分配，请确认?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    iconClass: "el-icon-question",
                    customClass: "custom-confirm",
                }).then(() => {
                    let _this = this;
                    submitAssign(this.search.batchId).then(
                        (res) => {
                            if (res.code === 200) {
                                _this.data.forEach((item) => {
                                    item.disabled = true;
                                });
                                _this.isSubmit = true;
                                _this.catsMessage({
                                    type: "success",
                                    message: "确认成功",
                                });
                            }
                        },
                        (err) => {
                            _this.catsMessage({
                                type: "error",
                                message: err.msg,
                            });
                        }
                    );
                });
            },
            handleChange(value, direction, movedKeys) {
                console.log(value, direction, movedKeys);
                var submitCaseData = {};
                submitCaseData.expertId = this.search.expertId;
                submitCaseData.batchId = this.search.batchId;
                if (direction == "left") {
                    submitCaseData.type = "0";
                } else {
                    submitCaseData.type = "1";
                }
                var ids = [];
                for (var j = 0; j < movedKeys.length; j++) {
                    ids.push(this.data[movedKeys[j]].caseId);
                }
                submitCaseData.idList = ids;
                saveAssign(submitCaseData);
            },
            randomAssign() {
                this.$confirm(
                        "随机分配会把所有案卷重新分配，是否进行随机分配?",
                        "提示", {
                            confirmButtonText: "确定",
                            cancelButtonText: "取消",
                            iconClass: "el-icon-question",
                            customClass: "custom-confirm",
                        }
                    )
                    .then(() => {
                        let _this = this;
                        randomAssign(this.search.batchId).then((res) => {
                            if (res.code === 200) {
                                _this.catsMessage({
                                    type: "success",
                                    message: "分配成功",
                                });
                                if (_this.search.expertId != "") {
                                    this.findCaseByExpert();
                                }
                            }
                        });
                    })
                    .catch(() => {});
            },
            async getExpertList() {
                let fileObj = await getExpertList();
                this.expertList = fileObj.data.list;
                this.search.batchId = fileObj.data.batchId;
                this.isSubmit = fileObj.data.isSubmit;
            },
        },
        mounted() {
            let userInfo = iLocalStroage.gets("userInfo");
            this.organId = userInfo.organId;
            this.getExpertList();
        },
    };

</script>
<style lang="scss" scope src="@/assets/scss/page/catsAppraisalExamination.scss"></style>
