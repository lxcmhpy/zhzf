<!-- 网上检查 -->
<template>
    <div class="cats-layout-page-content" style="height: calc(100% - 44px);box-sizing: border-box">
        <div class="searchAndpageBox toggleBox" style="overflow-y:auto;min-height: auto;">
            <div class="departOrUserTree">
                <div class="treeBox">
                    <el-tree style="font-size:14px" class="filter-tree" :data="organData" :props="defaultProps"
                        node-key="id" :filter-node-method="filterNode" :default-expanded-keys="defaultExpandedKeys"
                        ref="tree" @node-click="handleNodeClick">
                        <span class="custom-tree-node" slot-scope="{ node, data }">
                            <span>
                                <i :class="
                                data.children &&
                                data.children.length > 0
                                    ? 'iconfont law-icon_shou_bag'
                                    : ''
                            "></i>
                                <span :class="
                                data.children ? '' : 'hasMarginLeft'
                            ">{{ node.label }}</span>
                            </span>
                        </span>
                    </el-tree>
                </div>
            </div>
            <div class="departTable" v-if="dialogVisible">
                <el-form ref="form" :model="form" :rules="rules" label-width="90px" size="small">
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="检查名称：" :style="style">
                                {{ form.batchName }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="9">
                            <el-form-item label="机构名称：" :style="style">
                                {{ selectCurrentTreeName }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="总分：" :style="style">
                                {{ form.twosore }}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-table :data="form.pykhScoreDetailsVos" border style="width: 100%;">
                        <el-table-column prop="nrxm" label="评分细则"></el-table-column>
                        <el-table-column prop="score" label="分值"></el-table-column>
                        <el-table-column prop="twoSore" label="得分">
                            <template slot-scope="scope">
                                <el-form-item label-width="0" v-if="form.pfStatus === '0'" :prop="
                                            'pykhScoreDetailsVos.' +
                                                scope.$index +
                                                '.twoSore'
                                        " :rules="rules.twoSore">
                                    <el-input v-model="scope.row.twoSore" @blur="
                                                blurValidate(
                                                    scope.row,
                                                    'twoSore'
                                                )
                                            " @focus="
                                                getOldValue(
                                                    scope.row.twoSore
                                                )
                                            "></el-input>
                                </el-form-item>
                                <span v-else>{{
                                        scope.row.twoSore
                                    }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="season" label="扣分原因">
                            <template slot-scope="scope">
                                <el-form-item label-width="0" v-if="form.pfStatus === '0'" :prop="
                                            'pykhScoreDetailsVos.' +
                                                scope.$index +
                                                '.season'
                                        " :rules="rules.season">
                                    <el-input v-model="scope.row.season"></el-input>
                                </el-form-item>
                                <span v-else>{{
                                        scope.row.season
                                    }}</span>
                            </template>
                        </el-table-column>
                    </el-table>

                    <div v-if="form.pfStatus === '0'" style="margin:20px;text-align:center">
                        <el-button @click="saveRecord">保存</el-button>
                        <el-button @click="commitData" type="primary">提交</el-button>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scope src="@/assets/scss/page/catsAppraisalExamination.scss"></style>
<style lang="scss" scope src="@/assets/scss/systemManage.scss"></style>

<script>
    import {
        mapGetters
    } from "vuex";
    import {
        getOrgInfoAndDetails,
        updateScoreBatch,
        updateScoreState
    } from "@/api/pykh/appraisalExam.js";
    import iLocalStroage from "@/common/js/localStroage";
    export default {
        data() {
            return {
                userInfo: null,
                organData: [], //所属机构下拉列表值***
                defaultProps: {
                    children: "children",
                    label: "label"
                },
                dialogVisible: false,
                selectCurrentTreeName: "",
                defaultExpandedKeys: [], //默认展开的key
                currentOrganId: "", //当前organ的id
                form: {
                    pykhScoreDetailsVos: []
                },
                rules: {
                    twoSore: [{
                        required: true,
                        message: "请输入得分",
                        trigger: "blur"
                    }],
                    season: [{
                        required: true,
                        message: "请输入扣分原因",
                        trigger: "blur"
                    }]
                },
                style: "line-height:32px",
                oldValue: ""
            };
        },
        methods: {
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            //点击树事件
            handleNodeClick(data) {
                if (data.id != "root" && data.id != "1") {
                    this.selectCurrentTreeName = data.label;
                    this.currentOrganId = data.id;
                    this.getSelectOrgan();
                    this.dialogVisible = true;
                } else {
                    this.dialogVisible = false;
                }
            },

            //获取机构
            getAllOrgan(organId) {
                let _this = this;
                this.$store.dispatch("getAllOrgan").then(
                    res => {
                        _this.defaultExpandedKeys.push(res.data[0].id);
                        if (
                            res.data[0].children &&
                            res.data[0].children.length > 0
                        ) {
                            res.data[0].children.forEach(item => {
                                _this.defaultExpandedKeys.push(item.id);
                            });
                        }
                        _this.organData = res.data;
                    },
                    err => {
                        console.log(err);
                    }
                );
            },
            getSelectOrgan() {
                let data = {
                    orgId: this.currentOrganId,
                    assessType: "网上评查"
                };
                let _this = this;
                getOrgInfoAndDetails(data).then(res => {
                    if (res.code == 200) {
                        _this.form = res.data;
                    }
                });
            },
            saveRecord() {
                let _this = this;
                updateScoreBatch(this.form.pykhScoreDetailsVos).then(
                    res => {
                        _this.catsMessage({
                            type: "success",
                            message: "保存成功!"
                        });
                    },
                    err => {
                        console.log(err);
                    }
                );
            },
            commitData() {
                var re = /^[0-9]([0-9])*$/;
                let validata = this.form.pykhScoreDetailsVos.find(
                    value => value.twoSore === null || !re.test(value.twoSore)
                );
                if (validata) {
                    this.catsMessage({
                        type: "warning",
                        message: "全部评分之后才能提交"
                    });
                    return;
                }
                const data = {
                    id: this.form.id,
                    assessType: "网上评查",
                    pfstatus: this.form.pfStatus
                };
                let _this = this;
                updateScoreState(data).then(
                    res => {
                        _this.catsMessage({
                            type: "success",
                            message: "提交成功!"
                        });
                        // _this.dialogVisible = false;
                        this.form.pfStatus = "2";
                    },
                    err => {
                        console.log(err);
                    }
                );
            },
            blurValidate(row, key) {
                if (this.oldValue !== row[key]) {
                    if (key === "twoSore" || key === "oneSore") {
                        var re = /^[0-9]([0-9])*$/;
                        if (!re.test(row[key])) {
                            row[key] = "";
                            this.catsMessage({
                                type: "error",
                                message: "请输入整数"
                            });
                            return;
                        }
                        if (parseInt(row[key]) > row.score) {
                            row[key] = "";
                            this.catsMessage({
                                type: "error",
                                message: "得分不能高于单项分值"
                            });
                            return;
                        }
                    }
                }
                let sum = 0;
                this.form.pykhScoreDetailsVos.forEach(function (item) {
                    sum += parseInt(item.twoSore === null ? "0" : item.twoSore);
                });
                this.form.twosore = sum;
            },
            getOldValue(val) {
                this.oldValue = val;
            },
            handleCommand() {
                // this.$store.dispatch('deleteAllTabs');
                this.$router.push({
                    name: "login"
                });
            }
        },
        mounted() {
            // this.fetchData()
            this.userInfo = iLocalStroage.gets("userInfo");
        },
        computed: {
            ...mapGetters(["systemTitle"])
        },
        created() {
            this.getAllOrgan("root");
        }
    };

</script>
