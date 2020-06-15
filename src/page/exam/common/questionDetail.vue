<template>
<div>
    <div>
        <el-table
            style="margin-left:25px; width:97%;margin-bottom:35px;"
            :data="tableData"
            resizable
            stripe>
            <el-table-column type="index" width="100PX" label="序号"></el-table-column>
            <el-table-column prop="topLevel" label="大纲类型"></el-table-column>
            <el-table-column prop="outlineName" label="大纲名称"></el-table-column>
            <el-table-column prop="easilyCount" label="简单"></el-table-column>
            <el-table-column prop="commonCount" label="一般"></el-table-column>
            <el-table-column prop="difficultCount" label="困难"></el-table-column>
        </el-table>
    </div>
</div>
</template>
<script>
import {mixinPerson} from '@/common/js/personComm';
export default {
    name: "addplayDetail",//审核详情
    mixins:[mixinPerson],
    data(){
        return {
            tableData:[],
        }
    },
    computed: {
        pageId() {
        return this.$route.params.pageId;
        }
  },
    methods:{
        getPageDetailInfo(){
                    let _this = this;
            let data = {
                pageId: this.pageId
            };
            _this.$store.dispatch("pageVerifyListByPageId", data).then(
                res => {
                if (res.code === 200) {
                    _this.tableData = res.data;
                }
                },
                err => {
                loading.close();
                _this.$message({ type: "error", message: err.msg || "" });
                }
            );
            }
    },
    created(){
        let _this = this 
        _this.getPageDetailInfo();
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/personManage.scss";
</style>
