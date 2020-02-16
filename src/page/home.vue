<template>
    <div >
        <div v-if="headActiveNav == 'xboot'">
            系统管理首页
        </div>
        <div v-if="headActiveNav == 'caseHandle'">
            案件办理首页
        </div>
        {{headActiveNav}}
    </div>
</template>
<script>
import iLocalStroage from "@/js/localStroage";
export default {
    data() {
        return{
        }
    },
    computed:{
        headActiveNav() {
            return this.$store.state.headActiveNav;
        },
    },
    methods:{

    }

}
</script>