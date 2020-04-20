import { mapGetters } from "vuex";
import { htmlExportPDF } from '@/common/js/htmlExportPDF';
import iLocalStroage from "@/common/js/localStroage";
import {
  findCaseAllBindPropertyApi, updatePartCaseBasicInfoApi, getDocDetailByIdApi
} from "@/api/caseHandle";
export const mixinGetCaseApiList = {
  data() {
    return {
      isSaveLink: false, //是否点击了环节保存，未保存不可以操作文书
    }
  },
  computed: { ...mapGetters(['caseId']) },
  inject: ['reload'],
  methods: {
    //获取列表中的数据  未立案 审批中  待办理
    getCaseList(params) {
      let data = params;
      this.$store.dispatch("queryCaseBasicInfoListPage", data).then(
        res => {
          this.tableData = res.data.records;
          this.tableData.forEach(item => {
            item.name = item.party ? item.party : item.partyName;

            // 处理时间
            let nd = 1000 * 24 * 60 * 60;
            let endTime
            if(item.closeDate){
              endTime = new Date(item.closeDate)
            }
            else{
              endTime = new Date()
            }

            let day = (endTime - new Date(item.acceptTime)) / nd;
            day = Math.ceil(day)
            item.caseDealTime = day+'天';
            // console.log(item.closeDate,'item.closeDate',day, '天', endTime, item.acceptTime, item.caseDealTime)
          })
          this.total = res.data.total;
        },
        err => {
          console.log(err);
        }
      );
    },
    //进入环节表单查看是否保存过 保存过就直接带入信息，未保存择获取案件信息
    com_getFormDataByCaseIdAndFormId(caseId, caseLinktypeId, refreshDataForPdf) {
      let data = {
        casebasicInfoId: caseId,
        caseLinktypeId: caseLinktypeId
      };
      this.$store.dispatch("getFormDataByCaseIdAndFormId", data).then(
        res => {
          console.log("获取表单详情", res.data);
          //如果为空，则加载案件信息
          if (res.data == "") {
            this.com_getCaseBasicInfo(caseId, caseLinktypeId);
          } else {
            console.log(res.data);
            this.caseLinkDataForm.id = res.data.id;
            //利用属性给this.formData赋值
            let formData = JSON.parse(res.data.formData);
            for (var key in formData) {
              this.formData[key] = formData[key]
            }
            //对环节或文书中的一些字段做处理
            if (this.needDealData) {
              this.getDataAfter();
            }
            console.log('this.formData', this.formData)
            this.setSomeData(this.formData);
            this.isSaveLink = true;
            if (refreshDataForPdf) {
              // 提交pdf页
              setTimeout(() => {
                this.printContent();
              }, 1500)
              // this.printContent();
            }

          }
        },
        err => {
          console.log(err);
        }
      );
    },
    // 获取案件信息
    com_getCaseBasicInfo(caseId, formOrDocId) {
      let data = {
        caseBasicInfoId: caseId,
        typeId: formOrDocId
      };
      console.log('data', data);
      findCaseAllBindPropertyApi(data).then(
        res => {
          console.log('获取案件信息', res)
          let caseData = JSON.parse(res.data.propertyData);
          console.log('获取案件表单信息', caseData);
          if (this.formData) {
            for (var key in caseData) {
              this.formData[key] = caseData[key]
            }
            this.setSomeData(this.formData);
          } else {
            for (var key in caseData) {
              this.docData[key] = caseData[key]
            }
            this.setSomeData(this.docData);
          }
          if (this.needDealData) {
            this.getDataAfter();
          }
        },
        error => {
          console.log(error)
        }
      );
    },
    //提交文书表单信息，跳转到pdf文书
    com_submitCaseForm(handleType, docForm, hasNextBtn) {
      console.log(this.formData);
      this.caseLinkDataForm.formData = JSON.stringify(this.formData);
      // this.caseLinkDataForm.caseBasicinfoId = caseId;
      //0暂存 1提交
      this.caseLinkDataForm.status = handleType;
      if (handleType) {
        this.$refs[docForm].validate((valid, noPass) => {
          if (valid) {
            this.$store.dispatch("addFormData", this.caseLinkDataForm).then(
              res => {
                console.log("保存表单", res);
                this.$message({
                  type: "success",
                  message: "保存成功"
                });
                //立案登记表提交之后调用更新案件信息的接口
                if (this.caseLinkDataForm.caseLinktypeId == '2c90293b6c178b55016c17c255a4000d') {
                  let data = {
                    caseName: this.formData.caseName,
                    caseInfo: this.formData.caseSituation,
                    id: this.caseLinkDataForm.caseBasicinfoId,
                  }
                  console.log('更新案件基本信息', data)
                  this.com_updatePartCaseBasicInfo(data)
                }

                if (handleType == 1) {
                  //保存成功
                  if (hasNextBtn) {    //有下一环节按钮
                    //提交pdf 显示pdf页
                    this.printContent();
                    this.isSaveLink = true;
                  } else {   //表单下无文书 无下一环节按钮  直接跳转流程图
                    this.reload();
                  }
                } else if (handleType == 2) {
                  //归档
                  return true
                }
              },
              err => {
                console.log(err);
              }
            );
          } else {
            let a = Object.values(noPass)[0];
            console.log(a);
            this.$message({
              showClose: true,
              message: a[0].message,
              type: 'error',
              offset: 100,
              customClass: 'validateErrorTip'
            });
            return false;
          }
        })
      } else {
        this.$store.dispatch("addFormData", this.caseLinkDataForm).then(
          res => {
            console.log("暂存表单", res);
            this.$message({
              type: "success",
              message: "暂存成功"
            });
            this.reload();

          },
          err => {
            console.log(err);
          })
      }
    },
    //点击下一环节和提交按钮都跳转流程图
    com_goToNextLinkTu(caseBasicinfoId, caseLinktypeId) {
      let data = {
        caseId: caseBasicinfoId,
        caseLinktypeId: caseLinktypeId
      };
      console.log(data);
      this.$store.dispatch("submitPdf", data).then(
        res => {
          console.log("更改流程图中的状态", res);
          this.$store.dispatch("deleteTabs", this.$route.name);
          this.$router.push({
            name: 'flowChart'
          });
        },
        err => {
          console.log(err);
        }
      );
    },
    //根据环节ID转路由name 跳转
    com_getCaseRouteName(caseLinkId) {
      let data = {
        nextLink: '',
        docId: ''
      }
      switch (caseLinkId) {
        case "2c90293b6c178b55016c17c255a4000d":   //立案登记
          data.nextLink = "case_handle_establish";
          data.docId = "2c9029ae654210eb0165421564970001";
          break;
        case "2c90293b6c178b55016c17c93326000f":   //调查类文书
          data.nextLink = "case_handle_caseDoc";
          break;
        case "2c90293b6c178b55016c17c7ae92000e":   //行政强制措施
          data.nextLink = "case_handle_adminCoerciveMeasure";
          data.docId = "4028e4ef63683cd00163684359a10001";
          break;
        case "2c9029ee6cac9281016caca7f38e0002":   //调查报告
          data.nextLink = "case_handle_caseInvestig";
          data.docId = "2c9029ca5b711f61015b71391c9e2420";
          break;
        case "a36b59bd27ff4b6fe96e1b06390d204e":   //案件审核
          data.nextLink = "";
          break;
        case "2c9029ee6cac9281016caca8ea500003":   //违法行为通知
          data.nextLink = "case_handle_illegalActionForm";
          data.docId = "2c9029ca5b71686d015b719fe0900026";
          break;
        case "2c9029ee6cac9281016caca9a0000004":   //责令改正
          data.nextLink = "case_handle_forceCorrect";
          data.docId = "2c9029cc6a901fbe016a911e2dae000b";
          break;
        case "a36b59bd27ff4b6fe96e1b06390d204f":   //移交移送
          data.nextLink = "";
          break;
        case "a36b59bd27ff4b6fe96e1b06390d204g":   //不予处罚
          data.nextLink = "case_handle_noPenalty";
          break;
        case "2c9029ac6c26fd72016c27247b290003":   //当事人权利
          data.nextLink = "case_handle_partyRights";
          break;
        case "2c9029d56c8f7b66016c8f8043c90001":   //处罚决定
          data.nextLink = "case_handle_punishDecisionDoc";
          data.docId = "2c9029ca5b71686d015b71c8a0c10042";
          break;
        case "2c9029e16c753a19016c755fe1340001":   //决定执行
          data.nextLink = "case_handle_penaltyExecution";
          break;
        case "a36b59bd27ff4b6fe96e1b06390d204h":   //强制执行
          data.nextLink = "case_handle_forceExecute";
          break;
        case "2c9029ee6cac9281016cacaadf990006":   //结案登记
          data.nextLink = "case_handle_finishCaseReport";
          data.docId = "2c9029d2695c03fd01695c278e7a0001";
          break;
        case "2c9029ee6cac9281016cacab478e0007":   //归档
          data.nextLink = "";
          break;
      }
      return data;
    },
    //根据案件ID和文书Id获取数据   文书数据
    com_getDocDataByCaseIdAndDocId(params) {
      let data = {
        caseId: params.caseId,
        docId: params.docId
      };
      this.$store.dispatch("getDocDataByCaseIdAndDocId", data).then(
        res => {
          console.log("获取文书详情", res);
          //如果为空，则加载案件信息
          if (res.data.length == 0) {
            this.com_getCaseBasicInfo(params.caseId, params.docId);
          } else {
            console.log(res.data[0]);
            this.caseDocDataForm.id = res.data[0].id;
            this.docData = JSON.parse(res.data[0].docData);
            //设置禁用
            if (this.needSetDisabled) {
              this.setDisabledData();
            }
          }
          //判断当事人类型
          // console.log("docData",this.docData)
          if (this.docData.party) {
            this.isParty = true;
          } else {
            this.isParty = false;
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    // 提交文书表单
    com_addDocData(handleType, docForm) {
      this.caseDocDataForm.docData = JSON.stringify(this.docData);
      this.caseDocDataForm.status = handleType;
      console.log('caseDocDataForm', this.caseDocDataForm);
      if (handleType) {
        this.$refs[docForm].validate((valid, noPass) => {

          if (valid) {
            this.$store.dispatch("addDocData", this.caseDocDataForm).then(
              res => {
                console.log("保存文书", res);
                this.$message({
                  type: "success",
                  message: "提交成功"
                });
                //为多份文书赋值id，提交多份文书的pdf时需要用到
                if (this.caseDocDataForm.docDataId != undefined) {
                  this.caseDocDataForm.docDataId = res.data.id;
                }

                console.log('this.caseDocDataForm.docDataId', this.caseDocDataForm.docDataId)
                this.$store.dispatch("deleteTabs", this.$route.name);//关闭当前页签
                //提交成功后提交pdf到服务器，后打开pdf
                this.printContent();
              },
              err => {
                console.log(err);
              }
            );
          } else {
            // noPass[Object.keys(v)[0]]
            let a = Object.values(noPass)[0];
            console.log(a);
            this.$message({
              showClose: true,
              message: a[0].message,
              type: 'error',
              offset: 100,
              customClass: 'validateErrorTip'
            });
            return false;
          }

        });
      } else {
        this.$store.dispatch("addDocData", this.caseDocDataForm).then(
          res => {
            console.log("暂存文书", res);
            this.$message({
              type: "success",
              message: "暂存成功"
            });
            //多份文书查询信息需要用到id，先把id保存起来
            iLocalStroage.set("currentDocDataId", res.data.id);
            this.reload();
          },
          err => {
            console.log(err);
          }
        );
      }
    },
    //通过案件id和表单类型Id查询已绑定文书
    com_getDocListByCaseIdAndFormId(params) {
      let data = {
        casebasicInfoId: this.caseId,
        linkTypeId: params.linkTypeId
      };
      this.$store.dispatch("getDocListByCaseIdAndFormId", data).then(
        res => {
          this.docTableDatas = res.data;
          this.docTableDatasCopy = this.docTableDatasCopy ? JSON.parse(JSON.stringify(this.docTableDatas)) : '';
          console.log('文书列表', this.docTableDatas);
          if (params.linkTypeId == '2c90293b6c178b55016c17c93326000f' || params.linkTypeId == '2c9029e16c753a19016c755fe1340001' || params.linkTypeId == 'a36b59bd27ff4b6fe96e1b06390d204h') { //调查类文书和分期延期缴纳、强制执行
            this.setMoreDocTableTitle();
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    //查看或新增环节下的文书
    com_viewDoc(row, addMoreData = {}) {
      console.log(row);
      if (this.isSaveLink) {
        this.$store.dispatch("deleteTabs", this.$route.name);//关闭当前页签
        console.log('row:', row)
        this.$router.push({
          name: row.url,
          params: {
            id: row.id,
            docId: row.docId,
            url: this.$route.name,
            addMoreData: JSON.stringify(addMoreData),
            docDataId: row.docDataId
          }
        });
      } else {
        this.$message('请先保存该环节表单');
      }
    },

    //立案登记表提交之后调用  更新案由等信息到案件基本信息中
    com_updatePartCaseBasicInfo(formData) {
      let data = {
        caseName: formData.caseName,
        caseInfo: formData.caseInfo,
        id: formData.id,
      }
      updatePartCaseBasicInfoApi(data).then(
        res => {
          console.log('修改案件信息', res);
        },
        err => {
          console.log(err);
        }
      );
    },
    async printContent() {
      this.replaceTextArea();
      htmlExportPDF(this.formOrDocData.pageDomId, this.uploadFile)
    },
    uploadFile(file, name) {
      var f = new File([file.output("blob")], name, { type: 'application/pdf' })
      var fd = new FormData()
      fd.append("file", f)
      fd.append('caseId', this.caseId);
      fd.append('category', '文书');

      let docId = '';  //文书 id

      if (this.caseDocDataForm != undefined) {
        // 只是文书
        docId = this.caseDocDataForm.caseDoctypeId;
        //涉及到多份文书时，需要多加一个docDataId
        if (this.caseDocDataForm.docDataId != undefined && this.caseDocDataForm.docDataId) {
          fd.append('docDataId', this.caseDocDataForm.docDataId);
        }
      } else {
        //即是环节也是文书
        docId = this.huanjieAndDocId;
      }
      fd.append('docId', docId);


      //已经上传过了，
      if (iLocalStroage.gets("currrentPdfData")) {
        fd.append('id', iLocalStroage.gets("currrentPdfData").id);
        fd.append('storageId', iLocalStroage.gets("currrentPdfData").storageId);
      }
      let caseLinktypeId = ""; //环节id
      if (this.caseLinkDataForm) {
        caseLinktypeId = this.caseLinkDataForm.caseLinktypeId
      }

      console.log('fd', fd.get('docId'));
      console.log('currrentPdfId', fd.get('id'));
      console.log('currrentPdfstorageId', fd.get('storageId'));
      console.log('docDataId', fd.get('docDataId'));


      this.$store.dispatch("uploadFile", fd).then(
        res => {
          console.log('上传', res);
          //上传pdf之后显示pdf
          let routerData = {
            hasApprovalBtn: docId == '2c9029ae654210eb0165421564970001' || docId == '2c9029ca5b711f61015b71391c9e2420' || docId == '2c9029d2695c03fd01695c278e7a0001' ? true : false,
            docId: docId,
            approvalOver: this.approvalOver ? true : false,
            caseLinktypeId: caseLinktypeId, //环节id 立案登记、调查报告 结案报告 提交审批时需要
            docDataId: (this.caseDocDataForm && this.caseDocDataForm.docDataId != undefined && this.caseDocDataForm.docDataId) ? this.caseDocDataForm.docDataId : ''
          }
          this.$store.dispatch("deleteTabs", this.$route.name);
          this.$router.push({ name: 'case_handle_myPDF', params: routerData })
        },
        err => {
          console.log(err);
        }
      );
    },
    uploadFileGD(file, name) {
      var f = new File([file.output("blob")], name, { type: 'application/pdf' })
      var fd = new FormData()
      fd.append("file", f)
      fd.append('caseId', this.caseId);
      fd.append('category', '文书');

      let docId = '';  //文书 id

      if (this.caseDocDataForm != undefined) {
        // 只是文书
        docId = this.caseDocDataForm.caseDoctypeId;
      } else {
        //即是环节也是文书
        docId = this.huanjieAndDocId;
      }
      fd.append('docId', docId);
      //已经上传过了，
      if (iLocalStroage.gets("currrentPdfData")) {
        fd.append('id', iLocalStroage.gets("currrentPdfData").id);
        fd.append('storageId', iLocalStroage.gets("currrentPdfData").storageId);
      }
      let caseLinktypeId = ""; //环节id
      if (this.caseLinkDataForm) {
        caseLinktypeId = this.caseLinkDataForm.caseLinktypeId
      }

      console.log('fd', fd.get('docId'));
      console.log('currrentPdfId', fd.get('id'));
      console.log('currrentPdfstorageId', fd.get('storageId'));


      this.$store.dispatch("uploadFile", fd).then(
        res => {
          console.log('上传', res);
          //上传pdf之后显示pdf
          let routerData = {
            hasApprovalBtn: docId == '2c9029ae654210eb0165421564970001' || docId == '2c9029ca5b711f61015b71391c9e2420' || docId == '2c9029d2695c03fd01695c278e7a0001' ? true : false,
            docId: docId,
            approvalOver: this.approvalOver ? true : false,
            caseLinktypeId: caseLinktypeId, //环节id 立案登记、调查报告 结案报告 提交审批时需要
          }
          this.$store.dispatch("deleteTabs", this.$route.name);
          //   this.$router.push({ name: 'myPDF', params: routerData })
        },
        err => {
          console.log(err);
        }
      );
    },
    //通过文书id获取该文书pdf的id
    getFileIdByDocId(docId, approvalLink) {
      console.log(docId, approvalLink)
      this.$store.dispatch("getFile", {
        docId: docId,
        caseId: this.caseId,
      }).then(
        res => {
          console.log('文书pdf ID', res);
          let currrentPdfData = {
            id: res[0].id,
            storageId: res[0].storageId
          }
          iLocalStroage.sets("currrentPdfData", currrentPdfData);
          this.$router.push({
            name: approvalLink,
            params: {
              isApproval: true
            }
          })
        },
        err => {
          console.log(err);
        }
      );
    },
    //为form设置数据，
    setSomeData(formData) {
      //带入数据禁止编辑
      if (this.originalData != undefined) {
        this.originalData = JSON.parse(JSON.stringify(formData));
      }
      //判断当事人类型
      if (formData.party) {
        this.isParty = true;
      } else {
        this.isParty = false;
      }
    },
    //环节已完成时只显示返回按钮（在流程图跳环节时）
    isCompete() {
      if (this.$route.params.isComplete && this.formOrDocData) {
        this.formOrDocData.showBtn = [false, false, false, false, false, false, false, false, false, true]
      }
    },
    //判断流程图跳转pdf文书还是表单 前先获取一下案件基本信息，为了获取是否有环节正在审批中
    flowShowPdfOrFormBefore(data, flowChartData){
      let casedata = {
        id: this.caseId
      };
      this.$store.dispatch("getCaseBasicInfo", casedata).then(
        res => {
          console.log('判断流程图跳转获取案件信息', res);
          let caseIsApprovaling = false;
          if(res.data.caseStatus == "待审批" || res.data.caseStatus == "审批中"){
            caseIsApprovaling = true;
          }
          this.flowShowPdfOrForm(data, flowChartData,caseIsApprovaling)
        },
        err => {
          console.log(err);
        }
      );
    },
    //判断流程图跳转pdf文书还是表单
    flowShowPdfOrForm(data, flowChartData,caseIsApprovaling) {
      console.log(data);
      console.log('flowChartData', flowChartData);
      let completeLinkArr = flowChartData.completeLink.split(',');

      //既是环节也是文书的
      let isHuanjieDoc = false;
      if (data.linkID == "2c90293b6c178b55016c17c93326000f" || data.linkID == "2c9029ac6c26fd72016c27247b290003" || data.linkID == "2c9029e16c753a19016c755fe1340001" || data.linkID == "a36b59bd27ff4b6fe96e1b06390d204g" || data.linkID == "a36b59bd27ff4b6fe96e1b06390d204h") {
        isHuanjieDoc = true;
      }
      this.$store.dispatch('deleteTabs', 'flowChart');
      let data2 = this.com_getCaseRouteName(data.linkID);
      this.$store.commit('setDocId', data.docId);
      if (data.curLinkState == "complete" ) {    //已完成文书显示pdf  审核中也显示pdf
        if (!isHuanjieDoc) {
          this.$router.push({ name: 'case_handle_myPDF', params: { docId: data2.docId, isComplete: true } })
        } else {
          this.$router.push({ name: data2.nextLink, params: { isComplete: true } })
        }
      } else if(data.curLinkState == 'unLock'){
        //行政强制措施即将到期,从零点开始提示
        console.log('this.measureDateEndTime',new Date(this.measureDateEndTime).format('yyyy-MM-dd hh:mm:ss'))
        let  measureDateEndTimeStart= new Date(new Date(new Date(this.measureDateEndTime).toLocaleDateString()).getTime());
        if(this.showREBtn && Date.parse(new Date()) >= Date.parse(measureDateEndTimeStart)){
          this.$refs.pleaseRemoveMDiaRef.showModal();
          return;
        }
        // 行政强制措施即将到期，请前往解除行政强制措施
        if (data.linkID != 'a36b59bd27ff4b6fe96e1b06390d204h' && data.linkID != '2c9029ee6cac9281016cacaadf990006') {
          this.$router.push({ name: data2.nextLink })
        } else {
          if (completeLinkArr.indexOf('2c90293b6c178b55016c17c7ae92000e') >= 0 && completeLinkArr.indexOf('2c9029ee6cac9281016cacaa28760005') == -1) {
            this.$refs.pleaseRemoveMDiaRef.showModal();
          } else {
            this.$router.push({ name: data2.nextLink })
          }
        }
      }else if(data.curLinkState == 'doing'){  //进行中的环节
        //行政强制措施即将到期,从零点开始提示
        console.log('this.measureDateEndTime',new Date(this.measureDateEndTime).format('yyyy-MM-dd hh:mm:ss'))
        let  measureDateEndTimeStart= new Date(new Date(new Date(this.measureDateEndTime).toLocaleDateString()).getTime());
        if(this.showREBtn && Date.parse(new Date()) >= Date.parse(measureDateEndTimeStart)){
          this.$refs.pleaseRemoveMDiaRef.showModal();
          return;
        }
        if(caseIsApprovaling && (data.linkID == '2c90293b6c178b55016c17c255a4000d' || data.linkID == '2c9029ee6cac9281016caca7f38e0002' || data.linkID == '2c9029ee6cac9281016cacaadf990006')){    
          this.$router.push({ name: 'case_handle_myPDF', params: { docId: data2.docId, isComplete: true } })
        }else{
          this.searchHuanjiePdf(data2,data.linkID);
          // this.$router.push({ name: data2.nextLink })
        }
      }
    },
    //根据id获取文书信息(使用场景:询问笔录查看详情）
    getDocDetailById(id) {
      console.log('id', id);
      getDocDetailByIdApi(id).then(res => {
        console.log(res);
        this.caseDocDataForm.id = res.data.id;
        this.caseDocDataForm.note = res.data.note;
        this.docData = JSON.parse(res.data.docData);
      }, err => {
        console.log(err)
      })
    },
    //隐藏textarea 显示span
    replaceTextArea(){
      //打印时去掉下拉框的图标
      let selectObjIcon = document.getElementsByClassName('el-select__caret');
      for(let i=0;i<selectObjIcon.length;i++){
        selectObjIcon[i].style.display = 'none';
      }

      let obj = document.getElementsByTagName('textarea');
      console.log(obj);
      console.log(obj[0]);


      for(let i=0;i<obj.length;i++){
        //获取textarea的值
        let textAreaValue = obj[i].value;
        //获取textarea 父元素的classname
        let textAreaBoxClass = obj[i].parentNode.className;
        let objParent = obj[i].parentNode.parentNode;
        //追加span元素
        let newSpan = document.createElement("span");
        newSpan.innerHTML = textAreaValue;
        newSpan.setAttribute("class", textAreaBoxClass);
        obj[i].parentNode.style.display='none'
        objParent.appendChild(newSpan);
      }

      // setTimeout(() => {
      //     htmlExportPDF('test_print',function(){})
      // }, 1000)

  },
  //查询环节是否生成了pdf
  searchHuanjiePdf(data,linkID){
    this.$store.dispatch("getFile", {
      docId: data.docId,
      caseId: this.caseId,
    }).then(res=>{
      console.log('查询环节是否生成了pdf',res);
      if(res && res.length >0){
        this.$router.push({ name: 'case_handle_myPDF', params: { docId: data.docId, caseLinktypeId: linkID } })
      }else{
        this.$router.push({ name: data.nextLink })
      }
    })
    .catch(err=>{console.log(err)})
  }




  },
  created() {
    // this.getApiList();
    this.isCompete();
  }
}
