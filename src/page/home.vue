<template>
    <div >
        <div v-if="currentHome == 'xboot'">
            系统管理首页
        </div>
        <div v-if="currentHome == 'caseHandle'">
            案件办理首页
        </div>
        {{currentHome}}
    </div>
</template>
<script>
import iLocalStroage from "@/js/localStroage";
export default {
    data() {
        return{
            nav:iLocalStroage.get('headActiveNav')
        }
    },
    computed:{
        currentHome :function(){
            console.log(iLocalStroage.get('headActiveNav'))
            return iLocalStroage.get('headActiveNav')
        }
    },
    methods:{

    },
    watch:{
        nav(to,from) {
            console.log(to);
        }
    }

}
</script>