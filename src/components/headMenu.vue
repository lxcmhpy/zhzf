<template>
  <!-- 头部一级菜单 -->
  <div>
    <el-menu
      :default-active="`menu-${headActiveNav}`"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect">
      <el-menu-item v-for="(item) in headMenuList" :index="`menu-${item.path}`" :key="item.id">{{item.title}}</el-menu-item>
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
        reg: /(menu-)/gi,
      };
    },
    computed: {
        ...mapGetters(["headActiveNav", 'menu', 'activeIndexSto'])
    },
    methods: {
      handleSelect(key, keyPath) {
          debugger;
        let keyStr = key.split(this.reg);
        this.$store.commit("SET_ACTIVE_INDEX_STO", keyStr[2]);
        this.$store.commit("setHeadActiveNav", keyStr[2]);
        //将当前选中的一级菜单名传到父组件
        this.$emit("selectHeadMenu", keyStr[2]);
        //删除之前的tab页签
        // this.$store.dispatch("deleteAllTabs");
        if (keyStr[2] && keyStr[2] !== 'null') {
            // debugger;
            this.$router.push({ name: keyStr[2] });
        }
      }
    },
    watch: {
    },
    created () {
        },
    mounted () {
        this.headMenuList = this.menu;
        // this.$store.commit("setHeadActiveNav", this.headActiveNav);
    },
  };
</script>
