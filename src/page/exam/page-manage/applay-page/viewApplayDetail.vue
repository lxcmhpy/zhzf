<template>
<div class="com_searchAndpageBoxPadding">
        <div class="searchPage toggleBox">
            <div class="handlePart">
                <el-tabs type="border-card" style="height:800px;">
                    <el-tab-pane label="试卷信息">
                        <pageDetail></pageDetail>
                    </el-tab-pane>
                    <el-tab-pane label="题目分布">
                        <questionDetail></questionDetail>
                    </el-tab-pane>
                    <el-tab-pane label="审核记录">
                        <applayDetail></applayDetail>
                    </el-tab-pane>
                </el-tabs>
            </div>
    </div>
</div>
</template>
<script>
import applayDetail from './../../common/applayDetail';
import pageDetail from './../../common/pageDetail';
import questionDetail from './../../common/questionDetail';
export default {
    data(){
        return{

        }
    },
    components:{
        pageDetail,applayDetail,questionDetail
    }
}
</script>
<style lang="scss" scoped>

</style>