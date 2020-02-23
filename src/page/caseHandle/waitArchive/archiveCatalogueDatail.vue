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
            <template>
                <span @click="showDialog" class="iconfont law-add blueBg"></span>
            </template>
        </el-table-column>
        </el-table>
    </div>
    <el-dialog
        :title="dialogTitle"
        custom-class="leftDialog"
        :visible.sync="visible"
        top="0"
        width="45%"
        @close="closeDialog"
        :close-on-click-modal="false"
    >
        <div>
            <el-button @click="bindEvidence">绑定已有证据材料</el-button>
            <el-button>新增证据材料附件</el-button>
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
            caseList: this.$route.params.caseList
        }
    },
    methods: {
        //点击卷宗目录后 显示卷宗目录
        showArchiveCatalogue(){
            this.$refs.archiveCatalogueRef.showModal();
        },
        // 绑定已有证据材料
        bindEvidence () {

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
@import "@/assets/css/basicStyle/colorStylesSet.scss";
</style>
<style src="@/css/searchPage.scss" lang="scss" scoped></style>

