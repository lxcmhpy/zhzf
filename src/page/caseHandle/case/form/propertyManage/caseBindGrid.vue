<!--
    案件绑定解绑
    作者：程方元
-->
<!-- 视图  -->
<template>
    <section class="c-gh-flow-zjhz-hzmx">
        <el-card class="box-card u-my-card" shadow="naver">
            <div slot="header" class="clearfix">
                <span>{{title}}</span>
                <el-button type="primary" size="mini"  @click="handleDialog" style="float:right;">关联案件</el-button>
            </div>
            <el-table :data="caseData" stripe style="width: 100%" highlight-current-row  height="100%" @selection-change="handleSelectionChange">
                <el-table-column type="index" width="55"> </el-table-column>
                <el-table-column prop="caseNumber" label="案号" align="center" width="200"></el-table-column>
                <el-table-column prop="name" label="当事人/单位" align="center" width="150"></el-table-column>
                <el-table-column prop="caseCauseName" label="违法行为" align="center">
                    <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" placement="top-start">
                        <div slot="content" style="max-width:200px">{{scope.row.caseCauseName}}</div>
                        <span>{{scope.row.caseCauseName}}</span>
                    </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="op" label="操作" align="center" width="150">
                    <template slot-scope="scope">
                        <el-button type="text" @click="onDetail(scope.row.caseId)" size="mini">详情</el-button>&nbsp;
                        <el-button type="text" @click="onDelete(scope.$index)" size="mini">解绑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <el-table :data="table.data" border style="width:100%;border:0px;" show-summary :summary-method="summaryMethod">
                
                <el-table-column prop="op" label="操作" align="center" width="100">
                    <template slot-scope="scope">
                        <el-tooltip :enterable="false" content="删除">
                            <el-button @click="onDelete(scope.$index)" size="mini" icon="el-icon-ex-close" class="u-button-mini"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table> -->
        </el-card>

        

        <propertyDialog ref="dialog" @handle-case-data="handleCaseData"></propertyDialog>
    </section>
</template>
<script>
import propertyDialog from "./propertyDialog.vue";

export default {
    components: {
        propertyDialog
    },
    props:{
        title: {
            required: true
        },
        datas : {
            type: Array,
            default: function () { return [] }
        },
    },
    data:function () {
        return {
            caseData:[]
        };
    },
    computed: {

    },
    watch: {

    },
    mounted: function () {
        
    },
    methods: {
        handleDialog(type) {
            this.$refs.dialog.showModal(
            "case",
            {},
            "",
            ""
            );
        },
        handleCaseData(data){
            console.log("绑定案件信息:"+data);
            this.caseData = data;
        },
        onDetail (i) {
            // this.files.splice(i, 1);
        },

        onDelete (i) {
            this.caseData.splice(i, 1);
        },

        getCaseData () {
            return $util.clone(this.caseData, true);
        },

    }
}
</script>