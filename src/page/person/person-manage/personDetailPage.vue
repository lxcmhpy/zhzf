<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox" id="logBox" style="height:1500px;">
      <div class="handlePart" style="margin-left:15%;">
        <div class="search">
          <template>
            <personInfoPage/>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import personInfoPage from "./../../../components/personComponents/personInfo"
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
