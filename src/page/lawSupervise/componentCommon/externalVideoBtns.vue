<template>
  <div>
    <div class="btns">
      <span class="phoneBtn" @click="call('1')"><i class="el-icon-phone blueC3"  ></i></span>
      <span  class="phoneBtn"  @click="call('2')"><i class="iconfont law-shipin greenC3" id="btnPhone2" ></i></span>
      <span  class="phoneBtn" ><i class="iconfont law-jiankong"></i></span>
      <span  class="phoneBtn" ><i class="iconfont law-msg-box"></i></span>
      <span  class="phoneBtn" ><i class="iconfont law-xianlu"></i></span>
    </div>
  </div>
</template>
<script>
export default {
  props:['doing', 'curWindow'],
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
        // window.PhoneCallModule.sipUnRegister();
        // window.PhoneCallModule.sipRegister();
        this.$emit('updateMakePhoneStatus', this.doing);
    },
    callIE(){
      window.location.href ="alert:E:/HlVoIPSDKSetup/demo.htm"
    },
    call(code) {
        if (this.doing == code) {
            this.doing = null;
            this.handUp();
            return
        }
        if (!window.PhoneCallModule.getRegistered()) {
            let displayName = 'ecds04';
            let privateIdentity ='100006';
            let password = '1234';
            window.PhoneCallModule.sipRegister(displayName,privateIdentity,password);
        }
        // let zhArray = this.curWindow.other.description.split('&');
        // debugger;
        if (code == '1') {
            // 语音呼叫
            // setTimeout(function(){
            //     // window.PhoneCallModule.sipAudioCall("100006","ecds04");
                window.PhoneCallModule.sipAudioCall("100013","ecds05");
            //     // window.PhoneCallModule.sipAudioCall("100001","app01");
            //     // window.PhoneCallModule.sipAudioCall("100013","app02");
            //     // window.PhoneCallModule.sipAudioCall("100009","pad02");

            // },3000)
                // window.PhoneCallModule.sipAudioCall(zhArray[1],zhArray[0]);
        } else if(code == '2') {
            // 视频呼叫
            // window.PhoneCallModule.sipRegister();
            // setTimeout(function(){
            //     // window.PhoneCallModule.sipVideoCall("100006","ecds04");
                window.PhoneCallModule.sipVideoCall("100013","ecds05");
            //     // window.PhoneCallModule.sipVideoCall("100001","app01");
            //     // window.PhoneCallModule.sipVideoCall("100013","app02");
            //     // window.PhoneCallModule.sipVideoCall("100009","pad02");
            // },3000)
                // window.PhoneCallModule.sipVideoCall(zhArray[1],zhArray[0]);
        }
        this.$emit('updateMakePhoneStatus', code)
    }
  },
  mounted(){
  }
}
</script>>
<style lang="scss" scope>
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
