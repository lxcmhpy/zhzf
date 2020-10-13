<template>
  <div>
    <!-- 甘肃 -->
    <loginGS v-if="province == 'GS'"></loginGS>
    <!-- 标准 -->
    <loginBZ v-else></loginBZ>
  </div>
  
</template>

<script>
//甘肃登录页
import loginGS from './loginGS.vue';
import loginBZ from './loginBZ.vue';
import {
  getDictListDetailByNameApi
} from "@/api/system";

export default {
  data() {
    return {
      province:'',
    };
  },
  // computed: { ...mapGetters(['systemTitle']) },
  components:{
    loginGS,
    loginBZ
  },
  methods: {
    async whichProvince(){
      let res = await getDictListDetailByNameApi("系统标题");
      if(res.data[2]){
        this.province = res.data[2].name
      }else{
        alert('未设置省份！')
      }
    }
  },
  created(){
    this.whichProvince()
  }
}
</script>


