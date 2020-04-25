<template>
  <!-- 头部一级菜单 -->
  <div>
    <el-menu
      :default-active="headActiveNav"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect">
      <el-menu-item v-for="(item) in headMenuList" :index="`${item.name}-menu-${item.path}`" :keyPath="'dd'" :key="item.id">{{item.title}}</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import { mapGetters } from "vuex";
  export default {
    name: "",
    data() {
      return {
        headMenuList: null,
        reg: /(-menu-)/gi,
      };
    },
    computed: {
        ...mapGetters(["headActiveNav", 'menu', 'activeIndexSto'])
    },
    methods: {
      handleSelect(key, keyPath) {
        let keyStr = key.split(this.reg);
        this.$store.commit("SET_ACTIVE_INDEX_STO", key);
        this.$store.commit("set_Head_Active_Nav", key);
        //将当前选中的一级菜单名传到父组件
        this.$emit("selectHeadMenu",  keyStr[0]);
        //删除之前的tab页签
        if (keyStr[2] && keyStr[2] !== 'null') {
            // debugger;
            this.$router.push({ name: keyStr[2] });
        } else {

        }
      }
    },
    watch: {
    },
    created () {
    },
    mounted () {
        this.headMenuList = this.menu;
        this.$store.commit("set_Head_Active_Nav", this.headActiveNav);
    },
    watch:{
      //监听menu
      menu(val){
        this.headMenuList = this.menu;
        this.$store.commit("set_Head_Active_Nav", this.headActiveNav);
      }
    }
  };
</script>
