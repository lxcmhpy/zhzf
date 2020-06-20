<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="helpPages_main">
      <div class="read" v-for="(item, index) in modleList"  :key="index">
        <div class="header rela" @click="showToggle(item)">
          <h3>{{item.title}}</h3>
          <!-- <i class="down abso fa fa-angle-down" v-if="!item.isopen"></i> -->
        </div>
        {{item.isSubShow}}
        <ul  v-show="item.isSubShow">
          <li class="rela" v-for="(modle, index1) in item.templateList" :key="index1">
            <i class="fl abso"></i>
            <p class="fl">{{modle.name}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      modleList: [{title:'12121',isopen:true,isSubShow:true,templateList:[{name:'name'},{nameType:'naemRype'}]}, {title:'34343',isopen:true,isSubShow:true,templateList:[{name:'name'},{nameType:'naemRype'}]}, {title:'454545'}]

    }
  },
  methods: {
    showToggle(item) {
      item.isSubShow = !item.isSubShow //需要展开内容，显示与隐藏之间切换
    },
    toDetail(item) {
      this.$router.push('/helpDetails/' + item)
    },
  },
  mounted() {
  }
}
</script>
<style lang="scss" src="@/assets/css/card.scss"></style>