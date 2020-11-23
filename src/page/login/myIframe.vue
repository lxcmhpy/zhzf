<template>
    <div class="com_searchAndpageBoxPadding">
        <div class="searchAndpageBox" id="myIframeEleBox">
         <!-- <iframe ref="myIframeEle" frameborder="0" width="100%" height="500px"   ></iframe> -->
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
           
        }
    },
    methods:{
        setIframeHei(){
            console.log('this.$resf.myIframeEle',this.$refs.myIframeEle)
            console.log('this.$resf.myIframeEle',this.$refs.myIframeEle.height)
        },
        sendMsg () {
            let iframeBox = document.querySelector('#myIframeEleBox')
            let iframe = document.createElement('iframe')
            iframe.style.width="100%";
            iframe.style.height="500px";
            
            iframe.onload = () => {
                let jsonData={"userName":'36085069',"password":'$2a$10$84R5ErUtsHxIrBCUljxSx.VFu34GlYMfcQr80Z9RcKwUMpb6fHTyK'};
                let loginInfo=JSON.stringify(jsonData);	
                iframe.contentWindow.postMessage (loginInfo, '*');
            }
            iframe.src = 'http://119.136.32.73:5022'
            iframeBox.appendChild(iframe)
            }
    },
    mounted(){
        this.sendMsg();
    },
    created:{

    }
}
</script>