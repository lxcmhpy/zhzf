<template>
    <div class="cats-layout-page-content">
        <div class="searchAndpageBox" id="NoticeBox">
            <div class="handlePart">
                <viewNotice ref="viewNoticeRef"></viewNotice>
                <div class="search">
                    <el-form :inline="true" :model="dicSearchForm" class>
                        <el-form-item label="标题">
                            <el-input v-model="dicSearchForm.title" placeholder="输入标题"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" size="cats-common" icon="el-icon-search" @click="getNotices">查询
                            </el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" size="cats-common" icon="el-icon-plus" @click="addNotice">添加公告
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="tablePart">
                <el-table :data="tableData" stripe style="width: 100%" height="100%">
                    <el-table-column prop="title" label="标题" align="center"></el-table-column>
                    <el-table-column prop="noticeType" label="公告类型" align="center"></el-table-column>
                    <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
                    <el-table-column fixed="right" label="操作" align="center">
                        <template slot-scope="scope">
                            <!-- <el-popover title="消息接收人列表" placement="left" trigger="click">
                                <div v-show="unReadNumber>0||readNumber>0"
                                    style="display:flex;height:400px;overflow: auto;">
                                    <div>
                                        <div>{{unReadNumber}}人未读</div>
                                        <el-tree :data="unReadOrganTree" default-expand-all :props="defaultProps">
                                        </el-tree>
                                    </div>
                                    <div>
                                        <div>{{readNumber}}人已读</div>
                                        <el-tree :data="readOrganTree" default-expand-all :props="defaultProps">
                                        </el-tree>
                                    </div>
                                </div>
                                <el-button slot="reference" @click="readDetail(scope.row)" type="text">未读/已读</el-button>
                            </el-popover> -->
                            <el-button @click="viewNotice(scope.row)" type="text">查看</el-button>
                            <el-button @click="editNotice(scope.row)" type="text">编辑</el-button>
                            <el-button type="text" @click="deleteNotice(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="paginationBox">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="currentPage" background :page-sizes="[10, 20, 30, 40]"
                    layout="prev, pager, next,sizes,jumper" :total="totalPage"></el-pagination>
            </div>
            <addNotice @callBackFunc="callBackFunc" ref="addNoticeRef"></addNotice>

        </div>
    </div>
</template>
<script>
    import addNotice from "./addNotice";
    import viewNotice from "./viewNotice";
    import {
        getContentApi,
        deleteNoticeApi,
        getNoticeListApi,
        findUnReadUserByPage,
        findReadUserByPage
    } from "@/api/pykh/appraisalExam.js";
    import _ from "lodash";
    export default {
        data() {
            return {
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                tableData: [], //表格数据
                dicSearchForm: {
                    title: ""
                },
                currentPage: 1, //当前页
                pageSize: 10, //pagesize
                totalPage: 0, //总页数
                readNumber: 0,
                readOrganTree: [],
                unReadNumber: 0,
                unReadOrganTree: [],
            };
        },
        components: {
            addNotice,
            viewNotice
        },
        // inject: ["reload"],
        methods: {
            async readDetail(row) {
                // 已读列表、未读列表
                let readList = (await findReadUserByPage(row.id)).data;
                this.readNumber = readList.length;
                this.readOrganTree = this.getTree(readList);

                let unReadList = (await findUnReadUserByPage(row.id)).data;
                this.unReadNumber = unReadList.length;
                this.unReadOrganTree = this.getTree(unReadList);
            },
            getTree(list) {
                let tempList = [],
                    tree = [];
                list.forEach((v, i) => {
                    tempList.push(v.organName);
                });

                new Set(tempList).forEach((v, i) => {
                    let children = list.filter((item) => {
                        item.label = item.nickName;
                        return item.organName === v;
                    })
                    tree.push({
                        label: v,
                        children: children
                    })
                })
                return tree;
            },
            //查看公告信息
            viewNotice(row) {
                if (row.noticeType === "附件") {
                    let routerData = {
                        storageId: row.storageId
                    };
                    // this.$router.push({ name: "case_handle_viewPDF", params: routerData });
                    this.$refs.viewNoticeRef.showPDF(row);
                } else {
                    let _that = this
                    getContentApi(row.id).then(
                        res => {
                            _that.$refs.viewNoticeRef.showModal(res.data, row);
                        },
                        err => {
                            console.log(err);
                        })
                }
            },
            //编辑公告信息
            editNotice(row) {
                if (row.noticeType === "普通") {
                    let _that = this
                    getContentApi(row.id).then(
                        res => {
                            console.log(res.data);
                            row.content = res.data.content;
                            _that.$refs.addNoticeRef.showModal(2, row);
                        },
                        err => {
                            console.log(err);
                        }
                    );
                } else {
                    this.$refs.addNoticeRef.showModal(2, row);
                }
            },
            callBackFunc(){
                this.getNotices();
            },
            //删除公告信息
            deleteNotice(id) {
                this.$confirm("确定删除吗？", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }).then(() => {
                        deleteNoticeApi(id).then(
                            res => {
                                if (res.data === true) {
                                    this.catsMessage({
                                        type: "success",
                                        message: "删除成功!"
                                    });
                                    this.getNotices();
                                } else {
                                    this.catsMessage({
                                        type: "warning",
                                        message: "删除失败!"
                                    });
                                }
                            },
                            err => {
                                console.log(err);
                            }
                        );
                    })
                    .catch(() => {});
            },
            //更改每页显示的条数
            handleSizeChange(val) {
                this.pageSize = val;
                this.currentPage = 1;
                this.getNotices();
            },
            //更换页码
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getNotices();
            },
            //获取公告信息
            getNotices() {
                let data = {
                    current: this.currentPage,
                    size: this.pageSize,
                    title: this.dicSearchForm.title
                };
                let _this = this;
                getNoticeListApi(data).then(
                    res => {
                        console.log("公告信息列表", res);
                        _this.tableData = res.data.records;
                        _this.totalPage = res.data.total;
                    },
                    err => {
                        console.log(err);
                    }
                );
            },
            //添加公告信息
            addNotice() {
                this.$refs.addNoticeRef.showModal(0, "");
            }
        },
        created() {
            this.getNotices();
        }
    };

</script>

<style lang="scss" src="@/assets/scss/systemManage.scss">
    /* @import "@/assets/scss/systemManage.scss"; */

</style>
