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
            // alert(111)
            let iframeBox = document.querySelector('#myIframeEleBox')

            let oldIframes = document.getElementsByTagName("iframe");
            for (let i = 0; i < oldIframes.length; i++) {
                iframeBox.removeChild(oldIframes[i]);
            }

            let iframe = document.createElement('iframe')
            iframe.style.width="100%";
            iframe.style.height="500px";
            
            iframe.onload = () => {
                let menuItem = '';
                // alert(this.$route.name);
                if(this.$route.name == 'originalEvidence'){
                    menuItem = "0"
                }else if(this.$route.name == 'archivingEvidence'){
                    menuItem = "1"
                }
                
                let jsonData={"userName":'36085069',"password":'$2a$10$84R5ErUtsHxIrBCUljxSx.VFu34GlYMfcQr80Z9RcKwUMpb6fHTyK',"menuItem":menuItem};
                
                let loginInfo=JSON.stringify(jsonData);	
                iframe.contentWindow.postMessage (loginInfo, '*');
            }
            iframe.src = 'http://119.136.32.73:5022/#/evidence/catsic'
            iframeBox.appendChild(iframe)
            }
    },
    mounted(){
        this.sendMsg();
    },
    watch:{
        '$route'(to,form){
            console.log(to,form)
            this.sendMsg();
        }  
    }
}
</script>