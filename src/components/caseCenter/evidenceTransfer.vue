<template>
  <div class="table-style">
    <div class="shadow-box bg-white">
      <div class="info-box">
        <div class="title-box">
          <span class="title-blue">&nbsp;</span>
          <span class="title-text">转办证据</span>
        </div>
        <div class="evidence-img">
          <ul>
              <li v-for="(item, index) in imgList" :key="item.id" :class="(index+1)%4==0?'margin-right0':''">
                  <div class="img-url">
                  <img :src="item.url" alt=""/>
                  </div>
                  <div class="img-title">
                  {{item.name}}
                  </div>
              </li>
              <!-- <li>
                  <div class="img-url-upload">
                  <img src="@/../static/images/img/cluesReview/icon_weizhi.png" alt=""/>
                  </div>
                  <div class="img-title">
                  点击上传
                  </div>
              </li> -->
          </ul>
        </div>
      </div>

    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      imgList: [{
          id:'1',  
          url:'@/../static/images/img/cluesReview/pic1.jpg',
          name:'称重数据',
      },{
          id:'2',  
          url:'@/../static/images/img/cluesReview/pic2.jpg',
          name:'现场照片',
      },{
          id:'3',  
          url:'@/../static/images/img/cluesReview/pic3.jpg',
          name:'证据材料',
      },{
          id:'4',  
          url:'@/../static/images/img/cluesReview/pic4.jpg',
          name:'相关说明',
      }
      ],
    }
  }
}
</script>
<style lang="scss">
@import "@/assets/css/dialogStyle.scss";
</style>
