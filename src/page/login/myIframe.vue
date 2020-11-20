<template>
    <div class="com_searchAndpageBoxPadding">
        <div class="searchAndpageBox" id="myIframeEleBox">
         <iframe ref="myIframeEle" frameborder="0" width="100%" height="500px" :src='mySrc' ></iframe>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            // mySrc:'https://www.baidu.com/'
            mySrc:'http://119.136.32.73:5022/api/evidence/opendems?name='+encodeURIComponent("36085069")+'&pwd='+encodeURIComponent("$2a$10$84R5ErUtsHxIrBCUljxSx.VFu34GlYMfcQr80Z9RcKwUMpb6fHTyK")
        }
    },
    methods:{
        setIframeHei(){
            console.log('this.$resf.myIframeEle',this.$refs.myIframeEle)
            console.log('this.$resf.myIframeEle',this.$refs.myIframeEle.height)

            // console.log('this.$resf.myIframeEleBox',this.$refs.myIframeEleBox.height)
            // this.$refs.myIframeEle.height = this.$refs.myIframeEleBox.height
            // console.log(document.getElementById('myIframeEleBox').style.height)
            // console.log(document.getElementById('myIframeEleBox').style.client)
        },
        mySubmit(){

        }
    },
    mounted(){
        this.setIframeHei();
    },
    created:{

    }
}
</script>