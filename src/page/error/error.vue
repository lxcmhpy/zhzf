<template>
        <!-- <div> -->
            <div class="error">
                <div class="text" >{{firstCode}} <span :class="minCode==0?'text1':''" id="centerCode">{{minCode}}</span>{{lastCode}}</div>
                <p class="errorTip">sadsadmsd</p>
                <router-link to="/"><a-button type="primary" class="errorBack">返回</a-button></router-link>
            </div>

        <!-- </div> -->

</template>
<script>
export default {
  data() {
    return {
      errorCode: "404",
      firstCode: "",
      minCode: "",
      lastCode: ""
    };
  },
  created() {
    this.errorCode = this.$route.query.code ? this.$route.query.code : this.errorCode;
    this.firstCode = this.errorCode.substring(0, 1);
    this.minCode = this.errorCode.substring(1, 2);
    this.lastCode = this.errorCode.substring(2, this.errorCode.length);
  }
};
</script>

<style lang="scss" >
 @import '@/assets/css/basicStyles/variables.scss'; 

.error {
  width: 434px;
  height: 420px;
  margin: 0 auto;
  margin-top: 173px;
  //background: url(../../assets/image/error.png) no-repeat;
  position: relative;
  .text {
    font-family: "HYShuYuanHeiJ";
    color: $cats-main-color;
    font-size: 220px;
    display: flex;
    margin-top: 140px;
    margin-left:33px;
    // position: absolute;
    // bottom: 50px;
  }
  .text1 {
    color: transparent;
  }
  .errorBack{
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      margin: 0 auto;
  }
  .errorTip{
      position: absolute;
      bottom: 60px;
      left: 0;
      right: 0;
      text-align: center;
      font-weight: 800;
  }
  #centerCode{
      margin: 0 20px;
  }
}
</style>


