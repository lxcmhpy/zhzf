<template>
<div class="superviseBtns">
    <el-button type="button" class="submitBtn blueBtn">
        <i class="el-icon-plus"></i>
        <div>不予<br>立案</div>
    </el-button>
    <el-button type="button" class="submitBtn greenBtn" @click="goToInforCollect">
        <i class="el-icon-plus"></i>
        <div>转立案</div>
    </el-button>
</div>
</template>
<style scoped lang="scss">
.superviseBtns {
    position: fixed;
    right: 50px;
    bottom: 50px;
    z-index: 100;
    .submitBtn {
        display: block;
        margin: 8px;
        width: 50px;
        height: 73px;
        padding:0px;
        margin:8px 0px;
        line-height: 16px;
        div {
            margin-top: 10px;
            // margin-left: -10px;
        }
    }
    .blueBtn {
        background:rgba(69,115,208,1);
        box-shadow:0px 2px 4px 0px rgba(39,66,122,0.35);
        color:white;
    }
    .greenBtn {
        background:rgba(74,175,167,1);
        box-shadow:0px 2px 4px 0px rgba(39,66,122,0.35);
        color:white;
    }
}
</style>

<script>
import iLocalStroage from "@/common/js/localStroage";
import { mapGetters } from "vuex";
export default {
    methods: {
        goToInforCollect() {

            this.$store.commit('setCaseId', 'f205736182a36d9fd0574fa75eb30a30');
            this.$store.commit('setCaseApproval', false);
            this.$store.commit('setCaseNumber', '吐临〔2020〕第00320号');
            this.$router.push({
                name: 'establish'
            });
            // let someCaseInfo = {"illageAct":"从事水路运输经营的船舶未随船携带船舶营运证件","illageActId":"206e7cbe53ff4a1dad5a7607fdbe9b28","programType":"一般程序","caseType":"标准案件","caseTypeId":"c82372d6b571a5b5691451a477bd58bc","cateId":"1002000300000000","cateName":"水路运政"}
            // iLocalStroage.sets("someCaseInfo", someCaseInfo);
            // this.$router.push({
            //     name: 'inforCollect',
            // });
        }
    },
     computed: {
    },
}
</script>
