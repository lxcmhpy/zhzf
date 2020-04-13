<template>
  <div>
    <div class="btns">
      <i class="iconfont law-mobile" :class="{'greenC2':mobileDoing}" @click="makeMobileCall()"></i>
      <i class="iconfont law-shipin" :class="{'greenC2':videoDoing}" @click="makeVideoCall()"></i>
      <i class="iconfont law-jiankong"></i>
      <i class="iconfont law-msg-box"></i>
      <i class="iconfont law-xianlu"></i>
    </div>
     <!-- <audio id="audio_remote" ref="audio_remote" autoplay="autoplay"></audio>
    <audio id="ringtone" loop ref="ringtone"  >
        <source :src="'./static/sounds/ringtone.wav'" type="audio/mpeg" />
    </audio>
    <audio id="ringbacktone" ref="ringbacktone"  loop :src="'./static/sounds/ringbacktone.wav'"> </audio>
    <audio id="dtmfTone" ref="dtmfTone" :src="'./static/assets/sounds/dtmf.wav'"> </audio> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
         audioPosition: {
            dtmfTone: './static/assets/sounds/dtmf.wav',
            ringbacktone: './static/sounds/ringbacktone.wav',
            ringtone: './static/sounds/ringtone.wav'
        },
      mobileDoing: false,
      videoDoing: false
    }
  },
  methods: {
    makeVideoCall() {
        this.videoDoing = !this.videoDoing;
        if (this.videoDoing) {

            // let _this=this;
            // this.$nextTick(() => {
            //     _this.$refs.audio_remote.load();
            //     _this.$refs.dtmfTone.load();
            //     _this.$refs.ringbacktone.load();
            //     _this.$refs.ringtone.load();
            // })
                this.videoCall();
            // setTimeout(function() {
            // },2000)
        } else {
            this.handUp();
        }
    },
    handUp () {
        window.PhoneCallModule.sipHangUp();
    },
    videoCall() {
    //   window.PhoneCallModule.sipVideoCall("10000","test1");
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
    //   setTimeout(()=>{
    //       window.PhoneCallModule.sipRegister();
    //   }, 100)
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
