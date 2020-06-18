<template>
  <!-- 头部一级菜单 -->
  <div>
    <el-menu
      :default-active="headActiveNav"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect">
      <!-- v-show="false" -->
      <el-menu-item v-for="(item) in headMenuList" :index="`${item.name}`" :key="item.id" >
          {{item.title}}</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import { mapGetters } from "vuex";
import _ from "lodash";
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
      handleSelect(key, indexPath) {
          debugger;
        let keyStr = key.split(this.reg);
        console.log('key',key)
        this.$store.commit("SET_ACTIVE_INDEX_STO", key);
        this.$store.commit("set_Head_Active_Nav", key);
        // alert(this.headActiveNav);
        //将当前选中的一级菜单名传到父组件
        console.log('handleSelect',key)
        this.$emit("selectHeadMenu",  key);

        let index = _.findIndex(this.headMenuList,(chr)=>{
            return chr.name === key
        })
        if (index >-1 &&this.headMenuList[index].path&& this.headMenuList[index].path !== 'null') {
            this.$router.push({ name: this.headMenuList[index].path });
        }
      }
    },
    created () {
    },
    mounted () {
        this.headMenuList = this.menu;
        // debugger;
        this.$store.commit("set_Head_Active_Nav", this.headActiveNav);
        //  this.$store.commit("SET_ACTIVE_INDEX_STO", this.headActiveNav);
        // this.$store.commit("SET_ACTIVE_INDEX_STO",  this.activeIndexSto);
        this.$emit("selectHeadMenu",  this.headActiveNav);
    },
    watch:{
      //监听menu
      menu(val){
        this.headMenuList = this.menu;
        this.$store.commit("set_Head_Active_Nav", this.headActiveNav);
        this.$emit("selectHeadMenu",  this.headActiveNav);
      }
    }
  };
</script>
