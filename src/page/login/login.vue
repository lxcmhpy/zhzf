<template>
  <div style="height:100%">
    <!-- 甘肃 -->
    <loginGS v-if="province == 'GS'" :key="1"></loginGS>
    <!-- 江西 -->
    <loginJX v-if="province == 'JX'" :key="2"></loginJX>
    <!-- 标准 -->
    <loginBZ v-else :key="3"></loginBZ>
  </div>
  
</template>

<script>
//甘肃登录页
import loginGS from './loginGS.vue';
import loginBZ from './loginBZ.vue';
import loginJX from './loginJX.vue';

import {
  getDictListDetailByNameApi
} from "@/api/system";
import {
  getHost
} from "@/api/login";

export default {
  data() {
    return {
      province:'',
    };
  },
  // computed: { ...mapGetters(['systemTitle']) },
  components:{
    loginGS,
    loginBZ,
    loginJX
  },
  methods: {
    async whichProvince(){
      let res = await getDictListDetailByNameApi("系统标题");
      if(res.data[2]){
        this.province = res.data[2].name;
      }else{
        alert('未设置省份！')
      }
    }
  },
  async created(){
    this.$store.dispatch("setLoadingState", { flag: true, type: 'loadFull' });
    await getHost();
    await this.whichProvince()
  }
}
</script>


