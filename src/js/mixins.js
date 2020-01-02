
export const mixinGetCaseApiList = {
  data() {
    return {
      // getApiListSuccess: false,
      
    }
  },
  methods: {
    // getApiList() {
    //   this.$store.dispatch("getApiList", {}).then(
    //     res => {
    //       console.log(res);
    //       this.getApiListSuccess = true;
    //     },
    //     error => {
    //       console.log("getLog error:", error);
    //     }
    //   );
    // },
    //获取列表中的数据  未立案 审批中  待办理
    getCaseList(params) {
      let data = {
        flag: params.flag,
        userId: params.userId,
        current: params.current,
        size: params.size,
      };
      console.log(data);
      this.$store.dispatch("queryCaseBasicInfoListPage", data).then(
        res => {
          console.log(res);
          this.tableData = res.data.records;
          this.tableData.forEach(item => {
            item.name = item.party ? item.party : item.partyName;
          })
          this.total = res.data.total;
        },
        err => {
          console.log(err);
        }
      );
    },
    //
  },
  created() {
    // this.getApiList();
  }
}