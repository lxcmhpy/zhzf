<!--
    附件上传及列表
    作者：程方元
-->
<!-- 视图  -->
<template>
    <section class="file-upload-grid">
        <el-card class="box-card u-my-card" shadow="naver">
            <div slot="header" class="clearfix">
                <!-- <span>附件信息</span>
                <el-tooltip content="添加">
                    <el-button size="mini" @click="onShowAddDialog" icon="el-icon-ex-add" style="float:right;"></el-button>
                </el-tooltip> -->
                <span>{{title}}</span>
                <div v-if="inputShow" class="u-file-button" style="float:right;">
                    <el-button type="primary" size="small" class="u-button-mini">添加</el-button>
                    <input type="file" multiple
                           v-bind:accept="acceptType"
                           v-on:change="onFileChange"/>
                </div>
            </div>
            <!-- <el-table :data="table.data" border style="width:100%;border:0px;" show-summary :summary-method="summaryMethod">
                <el-table-column type="index" label="#" width="60" align="center"></el-table-column>
                <el-table-column prop="fkzhmc" label="转出账户"></el-table-column>
                <el-table-column prop="skzhmc" label="转入账户"></el-table-column>
                <el-table-column prop="zzje" label="划转金额"></el-table-column>
                <el-table-column prop="bz" label="备注" show-overflow-tooltip></el-table-column>
                <el-table-column prop="op" label="操作" align="center" width="100">
                    <template slot-scope="scope">
                        <el-tooltip :enterable="false" content="删除">
                            <el-button @click="onDelete(scope.$index)" size="mini" icon="el-icon-ex-close" class="u-button-mini"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table> -->
            <el-table :data="files" stripe style="width: 100%" highlight-current-row  height="100%">
                <el-table-column type="index" width="55"> </el-table-column>
                <el-table-column prop="evName" label="附件名称" align="center"></el-table-column>
                <el-table-column prop="evType" label="类型" align="center"></el-table-column>
                <!-- <el-table-column prop="caseCauseName" label="上传日期" align="center"></el-table-column> -->
                <el-table-column prop="username" label="上传人" align="center"></el-table-column>
                <el-table-column prop="op" label="操作" align="center" width="100">
                    <template slot-scope="scope">
                        <!-- <el-tooltip content="预览" placement="top">
                            <el-button icon="el-icon-search" @click="previewFile(scope.row)" circle></el-button>
                        </el-tooltip> -->
                        <el-tooltip content="删除" placement="top">
                            <el-button type="text" @click="removeFile(scope.$index)">删除</el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

    </section>
</template>
<!-- 模型  -->
<script>
import iLocalStroage from "@/common/js/localStroage";
import util from "@/common/js/util.js";
export default {
    props:{
        title: {
            required: true
        },
        files: {
            required: true
        },
        acceptType:{
            type: String,
            default: ""
        }
    },
    data:function () {
        return {
            inputShow: true
        };
    },
    computed: {

    },
    watch: {

    },
    mounted: function () {
        
    },
    methods: {
        onFileChange (e) {
            var input = e.target;
            var files = input.files;
            let nickname = iLocalStroage.gets("userInfo").nickName;
            var fs = [];
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                fs.push({
                    id: "",
                    evName: file.name,
                    evType: file.type,
                    username:nickname,
                    // time: util.getFormatDate1(new Date()),
                    file: file
                });
            }

            for (var i = 0; i < fs.length; i++) {
                this.files.push(fs[i]);
            }

            this.inputShow = false;
            var that = this;
            setTimeout(function () {
                that.inputShow = true;
            }, 50);
        },

        removeFile (i) {
            this.files.splice(i, 1);
        },

    }
}
</script>
<style lang="scss" scoped src="@/assets/css/propertyManage.scss"></style>
