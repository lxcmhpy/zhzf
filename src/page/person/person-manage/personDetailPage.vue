<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox" id="logBox" style="height:1200px;">
          <template>
            <personInfoPage/>
          </template>
    </div>
  </div>
</template>
<script>
import personInfoPage from "@/components/personComponents/personInfo"
export default {
    name:'personDetailPage',
    data(){
        return{

        }
    },
    components:{
      personInfoPage
    },
}

</script>
<style lang="scss" scoped>
@import "@/assets/css/personManage.scss";
</style>
