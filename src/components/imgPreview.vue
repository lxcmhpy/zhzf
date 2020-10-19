<template>
  <img  alt="" :width="imgWidthNew" :height="imgHeightNew" ref="myImg">
</template>
<script>
export default {
    props:['imgBoxWidth','imgBoxHeight','imgSrc'],
    data(){
        return{
            imgWidthNew:'',
            imgHeightNew:'',
        }
    },
  methods: {
    //计算图像缩放比
    getScaling(imgWidth, imgHeight) {
      let maxWidth = this.imgBoxWidth ;
      let maxHeight = this.imgBoxHeight;
      //宽高比
      let rate = (imgWidth / imgHeight).toFixed(2);
      let scaling;
      if (rate >= 1) {
        scaling= (imgWidth / maxWidth).toFixed(1);
      } else {
        scaling = (imgHeight / maxHeight).toFixed(1);
      }
      console.log('scaling',scaling)
      return scaling;
      
    },
    changeImgWidHei(){
        //设置临时图片
      let temImg = new Image();
      let _this = this;
    //   if(storageId){
    //     temImg.src = await this.$util.com_getFileStream(storageId);
    //   }
     temImg.src = _this.imgSrc
      
        temImg.onload = function (e) {
            // let scaling = _this.getScaling(temImg.width, temImg.height);
            // _this.imgWidthNew = (temImg.width / scaling).toFixed(1);
            // _this.imgHeightNew = (temImg.height / scaling).toFixed(1);
            // if(_this.imgWidthNew > _this.imgHeightNew){

            // }
            //  console.log('_this.$refs.myImg',_this.$refs.myImg)
            //框宽高比
            let scalBox = (_this.imgBoxWidth / _this.imgBoxHeight).toFixed(1);
            //图片宽高比
            let scalImg = (temImg.width / temImg.height).toFixed(1);
            if(scalBox > scalImg){  //高度100%
              _this.imgHeightNew = "99%"
            }else{
              _this.imgWidthNew = "99%"
            }
            _this.$refs.myImg.src= _this.imgSrc;
           
        }
        console.log('_this.imgWidthNew',_this.imgWidthNew)

    }
    
  },
//   created(){
//         this.changeImgWidHei();
//     },
    watch:{
        imgSrc(){
            this.changeImgWidHei();
        }
    }
};
</script>