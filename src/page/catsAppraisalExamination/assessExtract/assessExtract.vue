<template>
<div class="com_searchAndpageBoxPadding extractPage">
<!-- 考核抽取 by:jingli  -->
    <div class="com_searchPage_top com_extract_top" >
        <el-tabs v-model="tabActiveValue" >
            <el-tab-pane v-for="(item, index) in tabList" :key="index" :name="`${index}`" >
                <span slot="label">
                        {{item.name}}
                </span>
                <div class="extractOrgan shadow">
                    机构名称 &nbsp;
                    <el-select v-model="organName" style="width: 200px">
                        <el-option label="全部" value="1"></el-option>
                        <el-option label="选项2" value="2"></el-option>
                        <el-option label="选项3" value="3"></el-option>
                    </el-select>
                </div>
                <component v-bind:is="item.component" ></component>
            </el-tab-pane>
        </el-tabs>
    </div>

</div>
</template>
<script>
import caseExtract from './caseExtract.vue';
import personExtract from './personExtract.vue';

export default {
    data () {
        return {
            activeName: '',
            tabActiveValue: '1',
            tabList: [{
                name: '抽取人员',
                component: 'personExtract'
            }, {
                name: '抽取案件',
                component: 'caseExtract'
            }]
        }
    },
    methods: {
        handleClick () {

        }
    },
    components: {
        personExtract, caseExtract
    }
}
</script>
<style lang="scss" src="@/assets/css/catsAppraisalExamination.scss"></style>
