import { mapGetters } from "vuex";
import iLocalStroage from "@/common/js/localStroage";
import {
  updatePartCaseBasicInfoApi, getDocDetailByIdApi, findBindPropertyRuleApi, queryFlowBycaseIdApi, findDocDataByIdApi,
  updateLinkInfoByCaseIdAndLinkTypeIdApi, findApprovingDocApi, getLinkTypeInfoByIdApi,getCaseBasicInfoApi,
} from "@/api/caseHandle";
import { getFile } from "@/api/upload";
import { BASIC_DATA_SYS } from '@/common/js/BASIC_DATA.js';
import { BASIC_DATA_JX } from '@/common/js/BASIC_DATA_JX.js';
import {
  getDictListDetailByNameApi
} from "@/api/system";
export const mixinGetCaseApiList = {
  data() {
    return {
      isSaveLink: false, //是否点击了环节保存，未保存不可以操作文书
      canGoNextLink: false,
      submitApproval: false,
      caseFlowData: '', //案件流程数据（哪个信息采集页、哪个流程图）
      //立案登记表环节id数组
      establish_caseLinktypeIdArr: [this.BASIC_DATA_SYS.establish_caseLinktypeId, this.BASIC_DATA_JX.establish_JX_caseLinktypeId],
    }
  },
  computed: {
    ...mapGetters(['caseId', 'province']),
    // 是否禁用
    fieldDisabled(fieldProperty) {
      return function (fieldProperty) {
        return fieldProperty && fieldProperty.editable == false
      }
    },
    // 是否必填
    fieldRules(field, fieldProperty, validateType = '', partyOrCom = '') {
      return function (field, fieldProperty, validateType = '', partyOrCom = '') {
        let validateOther = "";
        if (validateType) {
          validateOther = { validator: validateType, trigger: 'blur' }
        } else {
          validateOther = { required: false }
        }
        if (partyOrCom !== '') {
          return partyOrCom && fieldProperty && fieldProperty.required ? this.rules.field : [validateOther]
        } else {
          return fieldProperty && fieldProperty.required ? this.rules.field : [validateOther]
        }
      }
    }
  },
  inject: ['reload'],
  methods: {
    //获取列表中的数据  未立案 审批中  待办理
    getCaseList(params) {
      let data = params;
      this.$store.dispatch("queryCaseBasicInfoListPage", data).then(
        res => {
          this.tableData = res.data.records || [];
          this.tableData.forEach(item => {
            item.name = item.party ? item.party : item.partyName;

            // 处理时间
            let nd = 1000 * 24 * 60 * 60;
            let endTime
            if (item.closeDate) {
              endTime = new Date(item.closeDate)
            }
            else {
              endTime = new Date()
            }

            if (item.acceptTime) {
              let day = (endTime - new Date(item.acceptTime)) / nd;
              day = Math.ceil(day)
              item.caseDealTime = day + '天';
            } else {
              item.caseDealTime = '0天';
            }
            // console.log(item.closeDate,'item.closeDate',day, '天', endTime, item.acceptTime, item.caseDealTime)
            // 处理预警标签
            item.warContent = JSON.parse(item.warContent)

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
          this.$store.commit("setCaseLinktypeId", caseLinktypeId);

          //如果为空，则加载案件信息
          if (res.data == "") {
            this.com_getCaseBasicInfo(caseId, caseLinktypeId);
          } else {
            console.log(res.data);
            this.caseLinkDataForm.status = res.data.status;
            console.log('this.propertyFeatures', this.propertyFeatures);
            if (this.propertyFeatures != undefined) {
              let data = {
                caseBasicInfoId: caseId,
                typeId: caseLinktypeId
              };
              this.searchPropertyFeatures(data, res.data, refreshDataForPdf);
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
      this.searchPropertyFeatures(data);


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
            console.log('通过')
            this.$store.dispatch("addFormData", this.caseLinkDataForm).then(
              res => {
                console.log("保存表单", res);
                this.$message({
                  type: "success",
                  message: "保存成功"
                });
                //立案登记表提交之后调用更新案件信息的接口
                if (this.establish_caseLinktypeIdArr.includes(this.caseLinkDataForm.caseLinktypeId)) {
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
                  if (hasNextBtn) {    //直接跳转pdf
                    //提交pdf 显示pdf页
                    this.printContent();
                    this.isSaveLink = true;
                  } else {   //刷新数据
                    console.log('刷新数据')
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
            console.log('不通过')

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
          // this.$store.dispatch("deleteTabs", this.$route.name);
          this.$router.push({
            name: 'case_handle_flowChart'
          });
        },
        err => {
          console.log(err);
        }
      );
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
            if (this.propertyFeatures != undefined) {
              let data = {
                caseBasicInfoId: params.caseId,
                typeId: params.docId
              };
              this.searchPropertyFeatures(data, res.data[0]);
            } else {
              console.log(res.data[0]);
              this.caseDocDataForm.id = res.data[0].id;
              this.caseDocDataForm.status = res.data[0].status;
              this.docData = JSON.parse(res.data[0].docData);
              //设置禁用
              if (this.needSetDisabled) {
                this.setDisabledData();
              }
              if (this.docData.party) {
                this.isParty = true;
              } else {
                this.isParty = false;
              }
            }
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
            console.log('通过')
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
                //保存后提交审批需要id
                this.$store.commit("setDocDataId", res.data.id);
                //提交成功后提交pdf到服务器，后打开pdf
                this.printContent(res.data.id);
              },
              err => {
                console.log(err);
              }
            );
          } else {
            let a = Object.values(noPass)[0];
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
          //多文书列表
          let moreDoc = [this.BASIC_DATA_SYS.compensationCaseDoc_caseLinktypeId, this.BASIC_DATA_SYS.caseDoc_caseLinktypeId, this.BASIC_DATA_JX.caseDoc_JX_caseLinktypeId, this.BASIC_DATA_SYS.penaltyExecution_caseLinktypeId, this.BASIC_DATA_SYS.forceExecute_caseLinktypeId, this.BASIC_DATA_JX.punishExecute_JX_caseLinktypeId, this.BASIC_DATA_JX.forceExecute_JX_caseLinktypeId];
          if (moreDoc.includes(params.linkTypeId)) { //调查类文书和分期延期缴纳、强制执行
            this.setMoreDocTableTitle();
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    //查看或新增环节下的文书
    async com_viewDoc(row, caseLinkTypeId, addMoreData = {}) {
      // 文书修改
      row.url = this.$route.name;
      row.caseBasicinfoId = this.caseBasicinfoId
      this.$store.commit("setCurrentFileData", row);//保存文书信息

      console.log('addMoreData minis', addMoreData)
      console.log("新增文书", row);
      console.log('this.isSaveLink', this.isSaveLink)
      if (this.isSaveLink) {
        this.$store.dispatch("deleteTabs", this.$route.name);//关闭当前页签
        console.log('row:', row)
        //查询是否在审批中
        let searchApprovalData = {
          caseBasicInfoId: this.caseId,
          caseLinktypeId: caseLinkTypeId
        }
        let caseIsApprovalingResult = await findApprovingDocApi(searchApprovalData);
        console.log('caseIsApprovalingResult', caseIsApprovalingResult);
        if (caseIsApprovalingResult.data) {  //审批中
          this.$message('有正在审批中的文书,请审批通过后再试！');
        } else {
          this.$router.push({
            name: row.path,
            params: {
              id: row.id,
              docId: row.docId,
              url: this.$route.name,
              caseLinkTypeId: caseLinkTypeId,
              addMoreData: JSON.stringify(addMoreData),
              docDataId: row.docDataId
            }
          });
        }


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
    async printContent(docDataId = '') {
      console.log('printContent docDataId', docDataId)
      this.uploadFile('', '', docDataId)
    },
    async uploadFile(file, name, docDataId) {
      let docId = '';  //文书 id
      if (this.caseDocDataForm != undefined) {
        // 只是文书
        docId = this.caseDocDataForm.caseDoctypeId;
        //涉及到多份文书时，需要多加一个docDataId
        if (this.caseDocDataForm.docDataId != undefined && this.caseDocDataForm.docDataId) {
          // fd.append('docDataId', this.caseDocDataForm.docDataId);
        }
      } else {
        //即是环节也是文书
        docId = this.huanjieAndDocId;
      }
      let caseLinktypeId = ""; //环节id
      if (this.caseLinkDataForm) {
        caseLinktypeId = this.caseLinkDataForm.caseLinktypeId
      }

      //上传pdf之后显示pdf
      console.log('upload docDataId', docDataId);
      //查询是否需要审批
      let nowCaseDocdata = '';
      try {
        nowCaseDocdata = await findDocDataByIdApi(docId);
      } catch (err) {
        this.$message('查询是否需要审批失败!')
      }

      console.log('nowCaseDocdata', nowCaseDocdata);

      if (nowCaseDocdata.data.isApproval === '0') { //需要审批
        this.$store.commit('setApprovalState', 'approvalBefore')
        console.log('需要审批');
      } else {  //不需要审批
        this.$store.commit('setApprovalState', '')
        console.log('不需要审批');
      }
      let routerData = {
        docId: docId,
        caseLinktypeId: caseLinktypeId, //环节id 立案登记、调查报告 结案报告 提交审批时需要
        docDataId: this.caseDocDataForm ? docDataId : ''

      }
      this.$store.dispatch("deleteTabs", this.$route.name);
      this.$router.push({ name: 'case_handle_myPDF', params: routerData })
    },

    //通过文书id获取该文书pdf的id
    getFileIdByDocId(docId, approvalLink) {
      console.log('min-caseId', this.caseId)
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
      console.log('设置当事人类型', this.isParty)
    },
    //环节已完成时只显示返回按钮（在流程图跳环节时）
    isCompete() {
      if (this.$route.params.isComplete && this.formOrDocData) {
        this.formOrDocData.showBtn = [false, false, false, false, false, false, false, false, false, true]
      }
    },
    //判断流程图跳转pdf文书还是表单 前先获取一下案件基本信息，为了获取是否有环节正在审批中
    flowShowPdfOrFormBefore(data, flowChartData) {
      console.log(data, flowChartData)
      let currentFileData = data;
      currentFileData.url = this.$route.name;
      currentFileData.path = data.linkName
      this.$store.commit("setCurrentFileData", currentFileData);//保存文书信息
      let casedata = {
        id: this.caseId
      };
      this.$store.dispatch("getCaseBasicInfo", casedata).then(
        res => {
          console.log('判断流程图跳转获取案件信息', res);
          let caseIsApprovaling = false;
          if (res.data.caseStatus == "待审批" || res.data.caseStatus == "审批中") {
            caseIsApprovaling = true;
            this.submitApproval = true;
          }
          this.flowShowPdfOrForm(data, flowChartData, caseIsApprovaling)
        },
        err => {
          console.log(err);
        }
      );
    },
    //判断流程图跳转pdf文书还是表单
    async flowShowPdfOrForm(data, flowChartData, caseIsApprovaling) {
      console.log(data);
      console.log('flowChartData', flowChartData);
      let completeLinkArr = flowChartData.completeLink.split(',');
      let data2 = {
        nextLink: data.linkName || '',
        docId: data.docId || ''
      }
      this.$store.commit('setDocId', data.docId);
      this.$store.commit("setCaseLinktypeId", data.linkID);
      this.$store.commit("setCaseLinkName", data.linkName);

      if (data.curLinkState == "complete") {    //已完成文书显示pdf  审核中也显示pdf
        //只是环节文书
        let isHuanjieDoc = false;
        //可以通过判断是否生成了pdf判断是单文书表单还是单纯的表单
        let fielRes = await getFile({ docId: data.docId, caseId: this.caseId, });
        //判断是单文书环节还是文书
        let huanjieData = await getLinkTypeInfoByIdApi(data.linkID);

        console.log('查询环节是否生成了pdf', huanjieData);
        if (huanjieData.data.isPdf == 0) isHuanjieDoc = true;
        //跳转pdf或表单
        if (isHuanjieDoc) this.$router.push({ name: 'case_handle_myPDF', params: { docId: data2.docId, isComplete: true } })
        else this.$router.push({ name: data2.nextLink, params: { isComplete: true } })
      } else if (data.curLinkState == 'unLock') {
        let updataLinkData = {
          caseId: this.caseId,
          linkTypeId: data.linkID
        }



        //行政强制措施即将到期,从零点开始提示
        console.log('this.measureDateEndTime', new Date(this.measureDateEndTime).format('yyyy-MM-dd hh:mm:ss'))
        let measureDateEndTimeStart = new Date(new Date(new Date(this.measureDateEndTime).toLocaleDateString()).getTime());
        
        if (this.showREBtn && Date.parse(new Date()) >= Date.parse(measureDateEndTimeStart) && !this.alReadyFinishCoerciveM) {
          this.$refs.pleaseRemoveMDiaRef.showModal();
          return;
        }
        // 行政强制措施即将到期，请前往解除行政强制措施
        let beforeFinishLink = [this.BASIC_DATA_SYS.forceExecute_caseLinktypeId, this.BASIC_DATA_SYS.finishCaseReport_caseLinktypeId, this.BASIC_DATA_JX.finishCaseReport_JX_caseLinktypeId];


        if (!beforeFinishLink.includes(data.linkID)) {
          this.unLockStateRoute(updataLinkData, data2, data)
        } else {
          if ((completeLinkArr.indexOf(this.BASIC_DATA_SYS.adminCoerciveMeasure_caseLinktypeId) >= 0 && completeLinkArr.indexOf(this.BASIC_DATA_SYS.removeOrPrelong_caseLinktypeId) == -1)
            || (completeLinkArr.indexOf(this.BASIC_DATA_JX.adminCoerciveMeasure_JX_caseLinktypeId) >= 0 && completeLinkArr.indexOf(this.BASIC_DATA_JX.removeOrPrelong_JX_caseLinktypeId) == -1)
          ) {
            this.$refs.pleaseRemoveMDiaRef.showModal();
          } else {
            this.unLockStateRoute(updataLinkData, data2, data)
          }
        }
      } else if (data.curLinkState == 'doing') {  //进行中的环节
        //行政强制措施即将到期,从零点开始提示
        console.log('this.measureDateEndTime', new Date(this.measureDateEndTime).format('yyyy-MM-dd hh:mm:ss'))
        let measureDateEndTimeStart = new Date(new Date(new Date(this.measureDateEndTime).toLocaleDateString()).getTime());
        if (this.showREBtn && !this.alReadyFinishCoerciveM && Date.parse(new Date()) >= Date.parse(measureDateEndTimeStart)) {
          this.$refs.pleaseRemoveMDiaRef.showModal();
          return;
        }
        this.searchHuanjiePdf(data2, data.linkID);

      }
    },
    //已解锁状态时的跳转
    async unLockStateRoute(updataLinkData, data2, data) {
      //更改流程图状态
      try {
        await updateLinkInfoByCaseIdAndLinkTypeIdApi(updataLinkData);
      } catch (err) {
        this.$message('更改流程图状态失败！')
      }
      let fileres = '';
      try {
        fileres = await getFile({ docId: data2.docId, caseId: this.caseId, });
      } catch (err) {
        this.$message('查询环节是否生成了pdf失败!')
      }
      console.log('查询环节是否生成了pdf', fileres);
      if (fileres.data.length > 0) {
        this.$store.commit("setDoingLinkId", data.linkID);//保存正在进行的环节ID
        this.$router.push({ name: 'case_handle_myPDF', params: { docId: data2.docId, caseLinktypeId: data.linkID } })
      } else {
        this.$router.push({ name: data2.nextLink })
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
        if (this.docData.party) {
          this.isParty = true;
        } else {
          this.isParty = false;
        }
        console.log('this.docData', this.docData)
        this.getDocDetailByIdAfter()
      }, err => {
        console.log(err)
      })
    },
    //多文书情况下去获取是否可编辑等属性信息
    getDocDetailByIdAfter() {
      let caseBasicInfoIdAndtypeId = {
        caseBasicInfoId: this.caseId,
        typeId: this.$route.params.docId
      };
      findBindPropertyRuleApi(caseBasicInfoIdAndtypeId).then(res => {
        let resdata = JSON.parse(res.data.propertyData);
        console.log("1111111111", resdata.party.val);
        this.propertyFeatures = resdata;
      })
      if (this.needClick) {
        this.click()
      }
    },
    //查询环节是否生成了pdf
    async searchHuanjiePdf(data, linkID) {

      let res = '';
      try {
        res = await getFile({ docId: data.docId, caseId: this.caseId, });
      } catch (err) {
        this.$message('查询环节是否生成了pdf失败!')
      }
      console.log('查询环节是否生成了pdf', res);

      if (res.data.length > 0) {
        
        let nowCaseDocdata = '';
        try {
          nowCaseDocdata = await findDocDataByIdApi(data.docId);
        } catch (err) {
          this.$message('查询是否需要审批失败!')
        }
        console.log('nowCaseDocdata', nowCaseDocdata);
        if (nowCaseDocdata.data.isApproval === '0') { //需要审批
          this.$store.commit('setApprovalState', 'approvalBefore')
          console.log('需要审批');
          //查询是否在审批中
          let searchApprovalData = {
            caseBasicInfoId: this.caseId,
            caseLinktypeId: linkID
          }
          let caseIsApprovalingResult = await findApprovingDocApi(searchApprovalData);
          console.log('caseIsApprovalingResult', caseIsApprovalingResult);
          if (caseIsApprovalingResult.data) {  //审批中
            this.$store.commit('setApprovalState', 'submitApproval')
          } else {
            //判断是否为已驳回状态
            let caseBasicInfoRes= await  getCaseBasicInfoApi({id: this.caseId});
            if(caseBasicInfoRes.data.caseStatus == '已驳回'){
              let finishCaseReport_caseLinktypeIdArr = this.BASIC_DATA_JX.getFinishCaseReport_caseLinktypeIdArr();
              if(finishCaseReport_caseLinktypeIdArr.includes(caseBasicInfoRes.data.currentLinkId)) this.$store.commit('setApprovalState', 'approvalFinishCaseReportNoPass');
              else this.$store.commit('setApprovalState', 'approvalNoPass');
            }else{
              this.$store.commit('setApprovalState', 'approvalBefore')
            }
          }
        } else {  //不需要审批
          this.$store.commit('setApprovalState', '')
          console.log('不需要审批');
        }
        this.$router.push({ name: 'case_handle_myPDF', params: { docId: data.docId, caseLinktypeId: linkID } })
      } else {
        this.$router.push({ name: data.nextLink })
      }

    },
    //查询文书或表单是否禁用及必填等
    searchPropertyFeatures(caseBasicInfoIdAndtypeId, savedData = '', refreshDataForPdf = false) {
      console.log('caseBasicInfoIdAndtypeId', caseBasicInfoIdAndtypeId)
      findBindPropertyRuleApi(caseBasicInfoIdAndtypeId).then(res => {
        console.log('通过案件Id级文书类型Id查询案件基本信息及规则', res);
        let data = JSON.parse(res.data.propertyData);
        console.log(data);
        this.propertyFeatures = data;
        console.log('savedData', savedData);
        if (this.formData) {
          if (savedData) {
            this.caseLinkDataForm.id = savedData.id;
            this.formData = JSON.parse(savedData.formData);
            this.isSaveLink = true;
            this.canGoNextLink = savedData.status == '1' ? true : false
            if (refreshDataForPdf) {
              // 提交pdf页
              setTimeout(() => {
                this.printContent();
              }, 1500)
            }
          } else {
            // alert('this.canGoNextLink',this.canGoNextLink)
            this.canGoNextLink = false;
            for (var key in data) {
              this.formData[key] = data[key].val ? data[key].val : this.formData[key];
            }
            console.log('this.formData', this.formData);
          }

        } else {
          if (savedData) {
            this.caseDocDataForm.id = savedData.id;
            this.caseDocDataForm.status = savedData.status;
            this.docData = JSON.parse(savedData.docData);
          } else {
            for (var key in data) {
              this.docData[key] = data[key].val ? data[key].val : this.docData[key];
            }
            console.log('this.docData', this.docData);
          }
        }
        if (this.needDealData) {
          this.getDataAfter();
        }
        if ((this.formData && this.formData.party) || (this.docData && this.docData.party)) {
          this.isParty = true;
        } else {
          this.isParty = false;
        }
      }).catch(err => {
        console.log(err);
      })

    },
    //获取案件流程类型
    async queryFlowBycaseId() {
      await queryFlowBycaseIdApi(this.caseId)
        .then(res => {
          console.log("res", res);
          this.caseFlowData = res.data;
          // callBack();
        })
        .catch(err => {
          console.log(err);
        });
    },

    //获取要跳转的路由
    async getCaseNextRoute(name) {
      let currentFlow, flowUrl, routeName = '';
      try {
        currentFlow = await queryFlowBycaseIdApi(this.caseId);
      } catch (err) {
        this.$message('获取案件流程失败！')
      }

      flowUrl = currentFlow.data.flowUrl;
      // if(flowUrl == '处罚流程' || flowUrl == '赔补偿流程' || flowUrl == '青海赔补偿流程' || flowUrl == '青海处罚流程'){
      if (['commonGraphData', 'compensationGraphData', 'compensationGraphData_QH', 'commonGraphData_QH',].indexOf(flowUrl) != -1) {
        if (name == '立案登记') {
          routeName = 'case_handle_establish'
        }
      } else if (flowUrl == 'commonGraphData_JX') {  //江西流程
        if (name == '立案登记') {
          routeName = 'case_handle_establish_JX'
        }
      }
      console.log('routeName', routeName)
      return routeName;

    },
    //查看pdf
    async com_viewDocPdf(row, caseLinktypeId,hasMoreDoc=0) { //hasMoreDoc为1是代表该环节下有多份文书（比如询问笔录）
      if(hasMoreDoc){
        row.url=this.$route.name;
        row.caseBasicinfoId= this.caseBasicinfoId
        this.$store.commit("setCurrentFileData", row);//保存文书信息
      }
      let routerData = {
        hasApprovalBtn: false,
        docId: row.docId,
        approvalOver: false,
        hasBack: true,
        docDataId: row.docDataId,
        status: row.status //status状态 0 暂存 1保存未提交  2 保存并提交
      };
      console.log("routerData,routerData", routerData);
      this.$store.dispatch("deleteTabs", this.$route.name);
      console.log('row', row);
      if (row.docProcessStatus == "待审批") {
        this.$store.commit("setApprovalState", "approvalBefore");
        this.$store.commit(
          "setCaseLinktypeId",
          caseLinktypeId
        );
        this.$store.commit("setDocDataId", row.docDataId);
        this.$store.commit("setDocId", row.docId);
      } else if (row.docProcessStatus == "审批中") {
        this.$store.commit("setApprovalState", "submitApproval");
      } else {
         //判断是否为已驳回状态
         let caseBasicInfoRes= await  getCaseBasicInfoApi({id: this.caseId});
         if(caseBasicInfoRes.data.caseStatus == '已驳回') this.$store.commit('setApprovalState', 'approvalNoPass');
         else  this.$store.commit('setApprovalState', '');
      }
      this.$router.push({ name: "case_handle_myPDF", params: routerData });
    },
    //获取基本抽屉表数据
    async initBaseDrawData(keysArr) {
      if (keysArr.includes('allRelationWithCase')) {
        let data2 = await getDictListDetailByNameApi('与案件关系');
        this.allRelationWithCase = data2.data;
      }
      if (keysArr.includes('allVehicleShipType')) {
        let data2 = await getDictListDetailByNameApi('车辆类型');
        this.allVehicleShipType = data2.data;
      }
    }
  },
  created() {
    // this.getApiList();
    this.isCompete();
  },
  watch: {
    // '$route'(to, from) {
    //   this.init()
    // }
  }
}
