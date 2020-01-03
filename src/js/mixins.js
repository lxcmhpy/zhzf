
export const mixinGetCaseApiList = {
  data() {
    return {
    }
  },
  methods: {
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
    //进入文书先是否保存过 保存过就直接带入信息，未保存择获取案件信息
    com_getFormDataByCaseIdAndFormId(caseId, caseLinktypeId, tableOrForm) {
      // console.log(this.caseId)
      let data = {
        casebasicInfoId: caseId,
        caseLinktypeId: caseLinktypeId
      };
      this.$store.dispatch("getFormDataByCaseIdAndFormId", data).then(
        res => {
          console.log("获取表单详情", res);
          //如果为空，则加载案件信息
          if (res.data == "") {
            this.com_getCaseBasicInfo(caseId);
          } else {
            console.log(res.data);
            if (tableOrForm == 'form') {  //文书表单
              this.caseLinkDataForm.id = res.data.id;
              this.formData = JSON.parse(res.data.formData);
            } else if (tableOrForm == 'table') {
              this.tableData = JSON.parse(res.data.formData);
            }

          }
        },
        err => {
          console.log(err);
        }
      );
    },
    // 获取案件信息
    com_getCaseBasicInfo(caseId) {
      // console.log("this.$route.params.id", this.$route.params.id);
      // 获取案件信息
      let data = {
        id: caseId
      };
      this.$store.dispatch("getCaseBasicInfo", data).then(
        res => {
          this.formData = res.data;
        },
        err => {
          console.log(err);
        }
      );
    },
    //提交文书表单信息，跳转到pdf文书
    com_submitCaseForm(handleType,docForm, nextRoute) {
      this.caseLinkDataForm.formData = JSON.stringify(this.formData);
     // this.caseLinkDataForm.caseBasicinfoId = caseId;
      //0暂存 1提交
      this.caseLinkDataForm.status = handleType;
      this.$refs[docForm].validate(valid => {
        if (valid) {
          // console.log(this.caseLinkDataForm);
          this.$store.dispatch("addFormData", this.caseLinkDataForm).then(
            res => {
              console.log("保存表单", res);
              this.$message({
                type: "success",
                message: "保存成功"
              });
              if (handleType == 1) {
                //保存成功 跳转 pdf
                if(nextRoute){
                  this.$router.replace({
                    name: nextRoute,
                    params: {
                      id: caseId
                    }
                  });
                }else{   //跳转下一环节
                  // console.log('跳转下一环节')
                }
                
              }
            },
            err => {
              console.log(err);
            }
          );
        }
      });
    },
    //判断要进入的下一环节
    com_whatIsNext(caseId) {
      this.$store.dispatch("getNextLink", caseId).then(
        res => {
          console.log(res);
          this.nextLink = res.data;
          if (this.nextLink.length > 1) {  //有分支  弹窗显示分支
            this.$refs.nextLinkDialogRef.showModal(this.nextLink);
          } else {   //无分支
            let routeName = this.com_getCaseRouteName("2c9029ee6cac9281016caca7f38e0002");
            this.$router.push({name:routeName})
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    //根据环节ID转路由name 跳转
    com_getCaseRouteName(caseLinkId) {
      let nextLink = "";
      switch (caseLinkId) {
        case "2c90293b6c178b55016c17c255a4000d":   //立案登记
          nextLink = "filingApproval";
          break;
        case "2c90293b6c178b55016c17c93326000f":   //调查类文书
          nextLink = "caseDoc";
          break;
        case "2c90293b6c178b55016c17c7ae92000e":   //行政强制措施
          nextLink = "";
          break;
        case "2c9029ee6cac9281016caca7f38e0002":   //调查报告
          nextLink = "caseInvestig";
          break;
        case "a36b59bd27ff4b6fe96e1b06390d204e":   //案件审核
          nextLink = "";
          break;
        case "2c9029ee6cac9281016caca8ea500003":   //违法行为通知
          nextLink = "";
          break;
        case "2c9029ee6cac9281016caca9a0000004":   //责令改正
          nextLink = "order";
          break;
        case "a36b59bd27ff4b6fe96e1b06390d204f":   //移交移送
          nextLink = "";
          break;
        case "a36b59bd27ff4b6fe96e1b06390d204g":   //不予处罚
          nextLink = "";
          break;
        case "2c9029ac6c26fd72016c27247b290003":   //当事人权利
          nextLink = "partyRights";
          break;
        case "2c9029d56c8f7b66016c8f8043c90001":   //处罚决定
          nextLink = "";
          break;
        case "2c9029e16c753a19016c755fe1340001":   //决定执行
          nextLink = "adminPunishe";
          break;
        case "a36b59bd27ff4b6fe96e1b06390d204h":   //强制执行
          nextLink = "";
          break;
        case "2c9029ee6cac9281016cacaadf990006":   //结案登记
          nextLink = "";
          break;
        case "2c9029ee6cac9281016cacab478e0007":   //归档
          nextLink = "";
          break;
      }
      return nextLink;
    }
  },
  created() {
    // this.getApiList();
  }
}