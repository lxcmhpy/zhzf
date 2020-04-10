<template>
  <div>
    <div class="btns">
      <i class="iconfont law-mobile" :class="{'greenC2':mobileDoing}" @click="makeMobileCall()"></i>
      <i class="iconfont law-shipin" :class="{'greenC2':videoDoing}" @click="makeVideoCall()"></i>
      <i class="iconfont law-jiankong"></i>
      <i class="iconfont law-msg-box"></i>
      <i class="iconfont law-xianlu"></i>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mobileDoing: false,
      videoDoing: false
    }
  },
  methods: {
    makeVideoCall() {
        this.videoDoing = !this.videoDoing;
        if (this.videoDoing) {
            window.PhoneCallModule.sipRegister();
            let _this=this;
            setTimeout(function() {
                _this.videoCall();
            },2000)
        } else {
            this.handUp();
        }
    },
    handUp () {
        window.PhoneCallModule.sipHangUp();
    },
    videoCall() {
      window.PhoneCallModule.sipVideoCall("10000","test1");
      document.getElementById('closePhone').click();
    },
    makeMobileCall() {
        this.mobileDoing = !this.mobileDoing;
        if (this.mobileDoing) {
            window.PhoneCallModule.sipRegister();
            let _this=this;
            setTimeout(function() {
                _this.Call();
            },2000)
        } else {
            this.handUp();
        }
    },
    Call() {
      window.PhoneCallModule.sipAudioCall("10000","test1");
    }
  },
  mounted(){
    //   window.PhoneCallModule.sipRegister();
  }
}
</script>>
<style lang="scss" >
.videoBox {
    width: 500px;
    height: 200px;
    position:absolute;
    top:200px;
    left: -50px;
    z-index: 3000;
    // border:3px solid black;
    background:white;
}
</style>
