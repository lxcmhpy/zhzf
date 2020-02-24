<template>
<div class="containerBox box searchPage">
    <div class="back"><i class="el-icon-arrow-left"></i>返回</div>
    <div class="tablePart">
        <el-table
            :data="caseList"
            border
            stripe
            highlight-current-row
            style="width: 100%">
            <el-table-column width="50" type="index" label="序号" align="center"></el-table-column>
            <el-table-column prop="docName" label="文书名称" align="center"></el-table-column>
            <el-table-column label="起止页数" align="center"></el-table-column>
            <el-table-column label="顺序调整" align="center">
                <template></template>
            </el-table-column>
            <el-table-column label="附件关联" align="center">
                <template slot-scope="scope">
                    <span @click="showDialog(scope.row)" class="iconfont law-add blueC"></span>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog
        title="附件关联"
        :visible.sync="operateVisible"
        custom-class="dialog1"
        @close="closeDialog"
        :close-on-click-modal="false">
        <div class="alignCenter">
            <el-button :class="{'btn-1':true, 'blueBg': relationFileVisible}" @click="bindEvidence">绑定已有证据材料</el-button>
            <br><br><br>
            <el-button :class="{'btn-1':true}">新增证据材料附件</el-button>
        </div>
    </el-dialog>
    <el-dialog
        title="附件关联"
        :visible.sync="relationFileVisible"
        @close="closeDialog1"
        custom-class="dialog1 searchPage"
        :close-on-click-modal="false"
         append-to-body>
         <div>
        <div class="tablePart">
            <el-table
                :data="evidenceList"
                border
                stripe
                highlight-current-row
                style="width: 100%">
                <el-table-column width="50" type="index" label="序号" align="center"></el-table-column>
                <el-table-column prop="evName" label="证据名称" align="center"></el-table-column>
                <el-table-column prop="evType" label="证据类型" align="center"></el-table-column>
                <el-table-column prop="status" label="状态" align="center">
                </el-table-column>
                <el-table-column label="详情" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.evPath}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="备注" align="center">
                </el-table-column>
            </el-table>
        </div>
         </div>
    </el-dialog>
    <!--快速入口 -->
    <caseSlideMenu :activeIndex="'archiveCatalogue'" @showArchiveCatalogue="showArchiveCatalogue"></caseSlideMenu>
    <!-- 卷宗目录 -->
    <archiveCatalogue ref="archiveCatalogueRef" :caseInfo="caseInfo"></archiveCatalogue>
</div>
</template>
<script>
import archiveCatalogue from "./archiveCatalogue";
import caseSlideMenu from "@/page/caseHandle/components/caseSlideMenu";
export default {
    data () {
        return {
            caseInfo: this.$route.params.caseInfo,
            caseList: this.$route.params.caseList,
            operateVisible: false,
            relationFileVisible: false,
            evidenceList: [],
            currentDocObj: []
            // isTrue: false
        }
    },
    methods: {
        //点击卷宗目录后 显示卷宗目录
        showArchiveCatalogue(){
            this.$refs.archiveCatalogueRef.showModal();
        },
        // 绑定已有证据材料
        bindEvidence (row) {
            this.relationFileVisible = !this.relationFileVisible
            this.$store.dispatch('getByCondition', {
                caseId: this.currentDocObj.caseId
            }).then(
                res=>{
                    this.evidenceList = res.data.records
                },
                err=>{
                console.log(err)
                }
            )
        },
        showDialog (row) {
            this.operateVisible = true
            this.currentDocObj = row
        },
        closeDialog () {
            this.operateVisible = false
        },
        closeDialog1 () {
            this.relationFileVisible = false
        }
    },
    mounted () {
        console.log(this.caseList)
    },
    components: {
        caseSlideMenu, archiveCatalogue
    }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/documentForm.scss";
@import "@/assets/css/basicStyles/common.scss";
</style>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
