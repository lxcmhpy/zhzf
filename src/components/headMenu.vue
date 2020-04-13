<template>
  <!-- 头部一级菜单 -->
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect">
      <el-menu-item v-for="(item) in headMenuList" :index="`${item.name}-menu-${item.path}`" :key="item.id">{{item.title}}</el-menu-item>
    </el-menu>
    {{activeIndex}}
  </div>
</template>
<script>
  import iLocalStroage from "@/common/js/localStroage";

  export default {
    name: "",
    data() {
      return {
        headMenuList: iLocalStroage.gets("menu")
      };
    },
    computed: {
      //刷新设置选中当前头 slide
      activeIndex: function () {
          debugger;
        var key = iLocalStroage.get("headActiveNav");
        if (key) {
          this.$emit("selectHeadMenu", key);
          return key;
        }
        return "case_handle_home_index";
      },
      headActiveNav() {
        return this.$store.state.app.headActiveNav;
      }
    },
    methods: {
      handleSelect(key, keyPath) {
          debugger;
        let reg = /(-menu-)/gi;
        let keyStr = key.split(reg);
        //将当前选中的一级菜单名传到父组件
        this.$emit("selectHeadMenu", keyStr[0]);
        iLocalStroage.set("headActiveNav", key);
        this.$store.commit("setHeadActiveNav", key);
        //删除之前的tab页签
        // this.$store.dispatch("deleteAllTabs");
        if (keyStr[2] && keyStr[2] !== 'null') {
            this.$router.push({ name: keyStr[2] });
        }
        //  else {
        //     this.$router.push({ name: "home_index" });
        // }
      }
    },
    mounted () {
    }
  };
</script>
