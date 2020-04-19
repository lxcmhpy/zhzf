<template>
  <div>
    <div class="btns">
      <i class="iconfont law-mobile"  :class="{'greenC2': doing == '1'}" @click="call('1')"></i>
      <i class="iconfont law-shipin" id="btnPhone2" :class="{'greenC2': doing == '2'}" @click="call('2')"></i>
      <i class="iconfont law-jiankong"></i>
      <i class="iconfont law-msg-box"></i>
      <i class="iconfont law-xianlu"></i>
    </div>
  </div>
</template>
<script>
export default {
  props:['doing'],
  data() {
    return {
         audioPosition: {
            dtmfTone: './static/assets/sounds/dtmf.wav',
            ringbacktone: './static/sounds/ringbacktone.wav',
            ringtone: './static/sounds/ringtone.wav'
        },
    }
  },
  methods: {
    handUp () {
        window.PhoneCallModule.sipHangUp();
        window.PhoneCallModule.sipUnRegister();
        window.PhoneCallModule.sipRegister();
        this.$emit('updateMakePhoneStatus', this.doing);
    },
    call(code) {
        if (this.doing == code) {
            this.doing = null;
            this.handUp();
            return
        }
        if (code == '1') {
            // 语音呼叫
            setTimeout(function(){
                window.PhoneCallModule.sipAudioCall("100006","ecds04");

            },1500)
        } else if(code == '2') {
            // 视频呼叫
            // window.PhoneCallModule.sipRegister();
            setTimeout(function(){
                window.PhoneCallModule.sipVideoCall("100006","ecds04");
            },1500)
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
