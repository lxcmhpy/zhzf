<template>
    <!-- 头部一级菜单 -->
    <div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item  v-for="item in headMenuList" :index="item.name" :key="item.id">{{item.title}}</el-menu-item>
           
        </el-menu>
    </div>
</template>
<script>
import iLocalStroage from "@/js/localStroage";
export default {
  name: "",
  data() {
    return {
        activeIndex:'caseHandle',
        headMenuList:iLocalStroage.gets('menu'),
    }
  },
  methods: {
    handleSelect(key, keyPath) {
        console.log(key);
        //将当前选中的一级菜单名传到父组件
        this.$emit("selectHeadMenu",key); 
        //删除之前的tab页签
        this.$store.dispatch('deleteAllTabs');
    }
  }
}
</script>  