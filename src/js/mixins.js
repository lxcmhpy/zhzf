
export const mixinGetApiList={
    data(){
      return{
        getApiListSuccess:false,
      }
    },
    methods:{
        getApiList() {
          this.$store.dispatch("getApiList", {}).then(
              res => {
                    console.log(res);
                    this.getApiListSuccess=true;
              },
              error => {
                console.log("getLog error:", error);
              }
            );
          },
    },
    created(){
      // this.getApiList();
    }
}