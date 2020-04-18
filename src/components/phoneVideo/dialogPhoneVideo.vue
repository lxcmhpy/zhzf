<template>
    <div>
        <transition name="el-fade-in" >
            <div v-show="show" >
                <!--  -->
                <div class="makePhoneBox" id="phoneBox" >
                    <div >
                        <div class="echarts-box">
                            <i class="el-icon-close right" id="closePhone" @click="ringOff"></i>
                            <i class="el-icon-rank right" @mousedown="event=>start(event,'phoneBox')"></i>
                                 <!-- style="position:absolute;z-index:3500;top:200px;left: 200px;border:1px solid #ccc;"  -->
                            <div class="videoBox" :class="{'noHeight': !videoDoing}">
                                <video class="video" width="200px" height="200px" id="video_local" autoplay="autoplay" muted></video>
                                <video class="video" width="200px" height="200px" id="video_remote" autoplay="autoplay" muted></Video>
                            </div>
                        </div>
                        <div class="phoneBtns">
                            <span @click="ringOff">
                            <img :src="'./static/images/img/lawSupervise/ring_off.png'" >
                            <br> <span style="color:white;line-height: 40px;">取消</span>
                            </span>
                            <!-- <img :src="'./static/images/img/lawSupervise/ring_off.png'" v-if="doing" @click="ringOff"> -->
                        </div>
                    </div>
                </div>
            </div>
        </transition>
         <div id="btnPhone1" @click="answer(0)"></div>
        <div id="btnPhone2" @click="answer(1)"></div>
    </div>
</template>
<style lang="scss" src="@/assets/css/lawSupervise/phone.scss"></style>
<style>
.noHeight {
    height: 0px;
}
</style>
<script>
import { mapGetters } from "vuex";
export default {
    data () {
        return {
            show:false,
            videoDoing: false
        }
    },
    methods: {
        answer (code) {
            this.show = true;
            this.$store.commit('setMakePhoneStatus', true);
            window.PhoneCallModule.sipAnswer();

        },
        ringOff () {
            // this.doing = null;
            window.PhoneCallModule.sipHangUp();
            // this.makePhoneStatus = false;
            this.$store.commit('setMakePhoneStatus', false);
            window.PhoneCallModule.sipUnRegister();
        },
        start (e, id) {
            let odiv = e.target;        //获取目标元素
            //算出鼠标相对元素的位置
            document.onmousemove = (e)=>{       //鼠标按下并移动的事件
            // "phoneBox"
                let obj = document.getElementById(id).style;
                obj.left = e.clientX < 325 ? '0px' : (e.clientX -350 )+ 'px';
                obj.top = e.clientY < 90 ? '0px' : (e.clientY -110) + 'px';
                if (e.clientY >= (document.body.clientHeight - 60)) {
                     obj.top = (document.body.clientHeight - 210) +'px';
                }
                if (e.clientX >= (document.body.clientWidth-400)) {
                    obj.left = (document.body.clientWidth-400) + 'px';
                }
            };
            document.onmouseup = (e) => {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        }
    },
    watch: {
        makePhoneStatus (val, oldVal) {
            this.show = val;
        },
        doing (val, oldVal) {
            this.videoDoing = val === '2';
        },
    },
    computed: {
        ...mapGetters(["makePhoneStatus", "doing"])
    },
}
</script>
