<template>
<div>
    正在登陆
</div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
export default {
    mounted() {
        iLocalStroage.set('TokenKey_expired',this.$route.params.TokenKey_expired);
        iLocalStroage.set('TokenKey',this.$route.params.TokenKey);
        this.$router.push({
            name: 'login'
        })
    }
}
</script>
