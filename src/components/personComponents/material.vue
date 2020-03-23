<template>
    <div>
        <template>
            <materialIdNo></materialIdNo>
        </template>
        <template>
            <materialDegree></materialDegree>
        </template>
        <template>
            <materialStaff></materialStaff>
        </template>
        <template>
            <materialOther></materialOther>
        </template>
    </div>
</template>
<script>
import materialDegree from './materialDegree';
import materialIdNo from './materialIdNo';
import materialOther from './materialOther';
import materialStaff from './materialStaff';
export default {
    name:'material',//证明材料
    data(){
        return {
            
        }
    },
    components:{
        materialDegree,
        materialIdNo,
        materialOther,
        materialStaff
    },
    methods:{
        
        
    }
}
</script>
<style lang="scss" scoped>

</style>