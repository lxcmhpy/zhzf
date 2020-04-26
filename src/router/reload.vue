<template>
    <div>
    </div>
</template>
<script type="text/javascript">
    import {mapGetters} from 'vuex'
    export default {
        computed: {
            // ...mapGetters([
            // ])
        },
        beforeCreate () {
        },
        destroyed () {
        },
        mounted () {
            this.$router.push({
                name: this.$route.params.menuUrl,
                params: this.$route.params.params
            })
        }
    }
</script>
