<template>
    <!-- 头部一级菜单 -->
    <div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item  v-for="item in headMenuList" :index="item.name" :key="item.id">{{item.title}}</el-menu-item>
           
        </el-menu>
        {{activeIndex}}
    </div>
</template>
<script>
import iLocalStroage from "@/js/localStroage";
export default {
  name: "",
  data() {
    return {
        headActiveNav:iLocalStroage.get('headActiveNav'),
       // activeIndex:this.headActiveNav ? this.headActiveNav :'xboot',
        headMenuList:iLocalStroage.gets('menu'),
    }
  },
  computed:{
    //刷新设置选中当前头 slide
    activeIndex :function(){
      var key = iLocalStroage.get('headActiveNav');
      if(key){
        this.$emit("selectHeadMenu",key); 
        return iLocalStroage.get('headActiveNav')
      }
      return 'xboot'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
        console.log(key);
        //将当前选中的一级菜单名传到父组件
        this.$emit("selectHeadMenu",key); 
        iLocalStroage.set('headActiveNav',key);
        //删除之前的tab页签
        this.$store.dispatch('deleteAllTabs');
        console.log(this.$route.name);
        if(this.$route.name != 'home_index'){
          this.$router.push({ name: "home_index" });
        }else{
          this.$router.push({ path: "/" });
        }
        
    }
  }
}
</script>  