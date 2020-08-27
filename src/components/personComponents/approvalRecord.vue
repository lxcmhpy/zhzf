<template>
    <div>
        <div>
            <div class="card-title">
                <font class="font" style="font-size:25px;"><span class="titleflag"></span>审批记录</font>
                &nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            <el-table style="margin-left:25px;width:97%;margin-bottom:35px;" :data="tableData" resizable stripe
                align="center">
                <el-table-column prop="oid" label="审批单位"></el-table-column>
                <el-table-column prop="approveStatus" label="审批状态"></el-table-column>
                <el-table-column prop="userId" label="审批人"></el-table-column>
                <el-table-column prop="approveInfo" label="审批信息"></el-table-column>
                <el-table-column prop="operationDate" label="操作审批时间"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import {
        mixinPerson
    } from '@/common/js/personComm';
    export default {
        name: "approvalRecord", //审批记录
        mixins: [mixinPerson],
        data() {
            return {
                personId: this.$route.params.personInfo.personId,
            }
        },
        methods: {
            getApprovalRecordInfo() {
                let _this = this
                let paramsData = {
                    current: _this.currentPage,
                    size: _this.pageSize,
                    personId: _this.$route.params.personInfo.personId,
                }
                if (_this.$route.params.pageStatus == '0') {
                    _this.getPageList("getApproveListMoudle", paramsData);
                }
            }
        },
        created() {
            this.getApprovalRecordInfo();
        }
    }

</script>

<style lang="scss" scoped>
    @import "@/assets/scss/page/personManage.scss";

</style>
