<template>
  	<div class="login">

	  	<transition name="form-fade" mode="in-out">

	  	</transition>
  	</div>
</template>

<script>

export default {
  data() {
    return {
      formLayout: "vertical",
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        nickName: [
          {
            required: true,
            message: '',
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: '',
            trigger: "blur"
          }
        ]
      },
      hasUserError: false,
      haspasswordError: false,
      showLogin: false
    };
  },
  components: {
    // lang
  },

  methods: {

  },
  mounted() {
    this.showLogin = true;
  }
};
</script>

<style lang="scss" src="@/assets/css/login.scss">
/* @import "@/assets/css/login.scss"; */
</style>


