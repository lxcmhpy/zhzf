<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox" id="logBox" style="height:1350px;">
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
    data(){
        return{
            personIn:'人员调入',
        }
    },
    components:{
      personInfoPage
    }
}

</script>
<style lang="less" scoped>
@import "../../../css/personManage.less";
</style>
