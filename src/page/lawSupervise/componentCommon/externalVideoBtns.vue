<template>
  <div>
    <div class="btns">
      <i class="iconfont law-mobile" :class="{'greenC2': doing == 1}" @click="call(1)"></i>
      <i class="iconfont law-shipin" :class="{'greenC2': doing == 2}" @click="call(2)"></i>
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
         audioPosition: {
            dtmfTone: './static/assets/sounds/dtmf.wav',
            ringbacktone: './static/sounds/ringbacktone.wav',
            ringtone: './static/sounds/ringtone.wav'
        },
      doing: null
    }
  },
  methods: {
    handUp () {
        window.PhoneCallModule.sipHangUp();
        this.$emit('updateMakePhoneStatus', this.doing);
    },
    call(code) {
        if (this.doing == code) {
            this.doing = null;
            this.handUp();
            return
        }
        this.doing = code;
        if (code == 1) {
            // 语音呼叫
            window.PhoneCallModule.sipRegister();
            setTimeout(function(){
                window.PhoneCallModule.sipAudioCall("10000","test1");

            },4000)
        } else if(code == 2) {
            // 视频呼叫
            window.PhoneCallModule.sipRegister();
            setTimeout(function(){
            window.PhoneCallModule.sipVideoCall("10000","test1");
            },4000)
        }
        this.$emit('updateMakePhoneStatus', code)
    }
  },
  mounted(){
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
