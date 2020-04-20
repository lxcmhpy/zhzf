<template>
  <div class="table-style">
    <div class="shadow-box bg-white">
      <div class="info-box">
        <div class="title-box">
          <span class="title-blue">&nbsp;</span>
          <span class="title-text">其他附件</span>
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
          name:'上传文件的名称',
      }
      ],
    }
  }
}
</script>
<style lang="scss" src="@/assets/css/cluesReview.scss"></style>
