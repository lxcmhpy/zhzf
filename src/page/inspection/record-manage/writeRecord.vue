<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox modle-set">
      <div style="text-align:center;margin-bottom:18px">
        <span style="font-size:18px;font-weight: bold;">
          {{formData.title}}
        </span>
        <el-popover placement="bottom" width="700" trigger="click" v-model='isChangeModle' :show='clickPover' v-if="addOrEiditFlag=='add'">
          <writeRecordHome ref="writeRecordRef" @changeModleId="updateMole" style="width:710px;height:400px;overflow:auto"></writeRecordHome>
          <span slot="reference" @click="upAndDown=!upAndDown">
            <span class="change_title_icon" @click="changeModle">切换模板
              <i class="el-icon-arrow-down" v-if="!upAndDown"></i>
              <i class="el-icon-arrow-up" v-if="upAndDown"></i>
            </span>
          </span>
        </el-popover>
        <span class="change_title_icon">二维码<i class="iconfont law-erweima" style="font-size:14px;margin-left:4px"></i></span>

      </div>
      <!-- 动态生成表单 -->
      <form-create :class="isCopyStyle?'copy-style-text':''" v-model="$data.$f" :rule="rule" @on-submit="onSubmit" :option="options" class="form-create-sty" test-on-change="onChange">
      </form-create>
      <uploadTmp ref="uploadRef" :recordMsg='recordMsg' :defautImgList='defautImgList' :defautFileList='defautFileList' :addOrEiditFlag='addOrEiditFlag'></uploadTmp>
      <chooseLawPerson ref="chooseLawPersonRef" @setLawPer="setLawPerson" @userList="getAllUserList"></chooseLawPerson>
      <chooseLawPerson ref="chooseLawPersonIdRef" @setLawPer="setLawPersonId" @userList="getAllUserListId"></chooseLawPerson>
      <mapDiag id="mapDiagRef" ref="mapDiagRef" @getLngLat="getLngLat"></mapDiag>
      <!-- 悬浮按钮-操作 -->
      <div class="float-btns btn-height63">
        <el-button type="success" @click="editRecord()" v-if="addOrEiditFlag=='view'">
          <i class="iconfont law-icon_zancun1"></i>
          <br />修改
        </el-button>
        <el-button type="success" @click="onSaveRecord()" v-if="addOrEiditFlag=='add'||addOrEiditFlag=='temporary'">
          <i class="iconfont law-icon_zancun1"></i>
          <br />暂存
        </el-button>
        <el-button type="primary" @click="saveRecord()" v-if="addOrEiditFlag=='add'||addOrEiditFlag=='temporary'">
          <i class="iconfont law-icon_baocun1"></i>
          <br />保存
        </el-button>
        <el-button type="primary" @click="copySave()" v-if="addOrEiditFlag=='view'">
          <i class="iconfont law-icon_zancun1"></i>
          <br />复制<br />添加
        </el-button>
      </div>
      <!-- 悬浮按钮-拓展 -->
      <floatBtns :formOrDocData="formOrDocData" @submitFileData="submitFileData" @saveEileData="saveFileData"></floatBtns>
      <documentSideMenu ref="documentSideMenuRef"></documentSideMenu>

    </div>
  </div>
</template>
<script>
import writeRecordHome from "./modleList.vue";
import mapDiag from "@/page/caseHandle/case/form/inforCollectionPage/diag/mapDiag.vue";
import chooseLawPerson from "./chooseModlePerson.vue";
import chooseLawPersonId from "./chooseModlePerson.vue";
// import chooseLawPerson from "@/page/caseHandle/unRecordCase/chooseLawPerson.vue";

import uploadTmp from './upload/uploadModleFile.vue'
import floatBtns from './writeRecordCompoments/floatBtn.vue'
import documentSideMenu from './writeRecordCompoments/documentSideMenu.vue'
import formCreate, { maker } from '@form-create/element-ui'
import Vue from 'vue'
import {  saveOrUpdateRecordApi, findRecordModleByIdApi, findRecordlModleFieldByIdeApi,
  findMyRecordByIdApi, findRecordModleTimeByIdApi} from "@/api/Record";
import iLocalStroage from "@/common/js/localStroage";
export default {
  props: ['psMsg'],
  watch: {
    psMsg(val, oldVal) {
      console.log('监听', this.psMsg, 'val', val)
      if (this.psMsg) {
        this.defaultRuleData = this.psMsg
        this.formData.title = this.psMsg.title
        this.personPartyFlag = false
        this.dealFormData(true)
      }
    },
  },
  data() {
    return {
      defaultRuleData: [],
      addOrEiditFlag: '',
      visiblePopover: false,
      upAndDown: false,
      isWrite: true,
      modleId: '',
      recordId: '',
      baseData: [],
      creatFormData: [],
      ruleForm: {
        value1: '',
        value2: '',
      },
      formData: {},
      //表单实例对象
      $f: {},
      rule: [],
      isChangeModle: false,
      options: {
        submitBtn: false,
        form: {
          labelWidth: '240px',
          disabled: false,
        }
      },
      recordMsg: '',
      defautImgList: [],//已上传图片
      defautFileList: [],//已上传附件
      adressName: '',
      // 执企业组织信息员
      allUserList: [],
      LawName: '',//存储执法人员字段名
      alreadyChooseLawPerson: [],
      alreadyChooseLawPersonId: [],
      allUserListId: [],
      LawOfficerCard: '',//存储执法人员带id的字段名
      // lawPersonListId: "",
      // 当事人信息和企业组织信息组合
      personPartyFlag: false,
      personFieldList: [],
      partyFieldList: [],
      personName: 'f28b429f7d8b4191a8623f49033f24b1',//当事人信息id
      partyName: '3bd508078f284ae799fd891fa526b463',//企业组织信息
      isCopyStyle: false,//
      formOrDocData: {
        showBtn: [false, false, false], //文书填报、相关记录、操作记录
        pageDomId: '',
      },
      // 是否转立案字段名
      isTransferName: '',
      viewFlag: false,
      globalId: '563',
    }
  },
  components: {
    writeRecordHome: writeRecordHome,
    formCreate: formCreate.$form(),
    uploadTmp,
    mapDiag,
    chooseLawPerson,
    chooseLawPersonId,
    floatBtns,
    documentSideMenu,//文书列表
  },
  methods: {
    // 查找模板-添加
    findDataByld() {
      let _this = this
      findRecordlModleFieldByIdeApi(this.modleId).then(
        res => {
          let list = JSON.parse(JSON.stringify(res.data))

          _this.baseData = JSON.parse(JSON.stringify(res.data))
          let sort = 0
          list.forEach(element => {
            element.sort = sort;
            sort++;
            element.fieldList.forEach(item => {
              if (item.options) {
                item.options = JSON.parse(item.options)
              }
            });
          });

          findRecordModleByIdApi(this.modleId).then(
            res => {
              if (res.code == 200) {

                _this.formData = JSON.parse(JSON.stringify(res.data));
                _this.defaultRuleData = JSON.parse(JSON.stringify(res.data))
                _this.$set(_this.defaultRuleData, 'templateFieldList', list);
                _this.formData.templateId = _this.formData.id
                _this.formData.id = '';
                this.setLawPersonCurrentP()
                _this.dealFormData()
              }
            },
            error => {

            })
        },
        error => {

        })

    },
    // 查找已有记录-修改
    findRecordDataByld() {
      let _this = this
      findMyRecordByIdApi(this.recordId).then(
        res => {
          _this.baseData = JSON.parse(res.data.layout)
          let list = JSON.parse(res.data.layout)
          // console.log('res', res.data)
          let sort = 0
          list.forEach(element => {
            element.sort = sort;
            sort++;
            element.fieldList.forEach(item => {
              if (item.options) {
                item.options = JSON.parse(item.options)
              }
            });
          });
          _this.formData = res.data;
          _this.defaultRuleData = JSON.parse(JSON.stringify(res.data))
          _this.$set(_this.defaultRuleData, 'templateFieldList', list);
          _this.dealFormData()
          // 回显文件
          console.log('huixian', res.data.pictureList, res.data.attachedList)
          _this.defautImgList = res.data.pictureList
          _this.defautFileList = res.data.attachedList

        },
        error => {
        })
    },
    //当前登录账号名
    setLawPersonCurrentP() {
      this.formData.createUser = iLocalStroage.gets("userInfo").nickName;
    },
    // 修改
    editRecord() {
      console.log(this.formData)
      if (this.formData.createUser != iLocalStroage.gets("userInfo").nickName) {
        this.$message.error('无修改权限');
        return
      }
      this.editMethod()
    },
    editMethod() {
      // 判断模板是否已修改
      findRecordModleTimeByIdApi(this.formData.templateId).then(
        res => {
          if (res.code == 200) {
            console.log('row.createTime <= res.data', this.formData.createTime, res.data)
            if (res.data != null || this.formData.createTime > res.data) {
              // 可修改
              this.$data.$f.resetFields()
              this.rule.forEach(element => {
                console.log(element)
                this.$data.$f.updateRule(element.field, {
                  props: { disabled: false }
                }, true);
              });
              this.addOrEiditFlag = 'add'
            } else {
              this.$message.error('当前模板已修改或不存在，该记录不可修改');
            }
          } else {
            this.$message.error(res.msg);
          }
        },
        error => {

        })

    },
    // 保存
    saveRecord() {
      this.formData.status = '保存';
      this.$data.$f.validate((valid, object) => {
        if (valid) {
          // alert(JSON.stringify(formData));
          this.submitMethod()
        } else {
          // 验证不通过，定位
          setTimeout(() => {
            var isError = document.getElementsByClassName("is-error");
            console.log('isError', isError)
            if (isError[0].querySelector('textarea')) {
              isError[0].querySelector('textarea').focus();

            } else if (isError[0].querySelector('input')) {
              isError[0].querySelector('input').focus();
            }
            for (const i in object) {
              let dom = this.$refs[i]
              // 这里是针对遍历的情况（多个输入框），取值为数组
              if (Object.prototype.toString.call(dom) !== '[object Object]') {
                dom = dom[0]
              }
              dom.$el.scrollIntoView({ // 滚动到指定节点
                // 值有start,center,end，nearest，当前显示在视图区域中间
                block: 'center',
                // 值有auto、instant,smooth，缓动动画（当前是慢速的）
                behavior: 'smooth'
              })
              break // 因为我们只需要检测一项,所以就可以跳出循环了
            }
          }, 1)
          return false;
        }
      })
    },
    // 提交方法
    submitMethod() {
      console.log("formData", this.formData)
      let submitData = JSON.parse(JSON.stringify(this.baseData))
      let submitList = []
      submitData.forEach(element => {
        element.fieldList.forEach(item => {
          console.log('item.id', item.id)
          let textName = item.id
          // item.text = this.formData['' + textName + '']
          item.text = this.$data.$f.getValue(textName)
          if (item.text && typeof (item.text) != 'string' && typeof (item.text) != 'number') {
            item.text = item.text.join(',')
          }
          console.log('item.', item)
        });

      });
      submitData = JSON.stringify(submitData)
      console.log('submitData', submitData)
      this.formData.layout = submitData
      this.formData.templateFieldList = '';
      this.formData.createTime = '';
      this.formData.updateTime = '';
      this.formData.type = '记录';
      this.formData.organId = iLocalStroage.gets("userInfo").organId;
      this.formData.userId = iLocalStroage.gets("userInfo").id;

      //文书带入值信息
      this.formData.party='111' 
      // 当事人信息和企业信息选项的值
      this.formData.objectType = this.$data.$f.getValue('personOrParty')
      delete (this.formData["pictureList"]);
      delete (this.formData["attachedList"]);
      console.log('formdata', this.formData)
      saveOrUpdateRecordApi(this.formData).then(
        res => {
          // console.log(res)
          if (res.code == 200) {
            this.addOrEiditFlag = 'view'
            this.recordMsg = this.formData.id ? this.formData.id : res.data;//根据返回id上传文件
            this.$message({
              type: "success",
              message: res.msg
            });
            this.rule.forEach(element => {
              console.log(element)
              this.$data.$f.updateRule(element.field, {
                props: { disabled: true }
              }, true);
            });
            this.formOrDocData.pageDomId = res.data

          } else {
            this.$message.error(res.msg);
          }
        },
        error => {
        })
      this.isCopyStyle = false;//变颜色
    },
    // 暂存
    onSaveRecord(noRouter) {
      // console.log('rule', this.rule)
      this.rule.forEach(element => {
        // 去掉验证
        if (element.validate[0]) {
          element.validate[0].required = false
        }
      });
      this.formData.status = '暂存';
      // this.onSubmit()
      this.$data.$f.submit((formData) => {
        console.log("formData", formData)
        let submitData = JSON.parse(JSON.stringify(this.baseData))
        let submitList = []
        submitData.forEach(element => {
          element.fieldList.forEach(item => {
            let textName = item.id
            // console.log('变量', item.field, ':', formData['' + textName + ''])
            // item.text = formData['' + textName + '']
            item.text = this.$data.$f.getValue(textName)
            // console.log('tyupe',typeof (item.text))
            if (item.text && typeof (item.text) != 'string' && typeof (item.text) != 'number') {
              item.text = item.text.join(',')
            }
          });

        });
        submitData = JSON.stringify(submitData)
        this.formData.layout = submitData
        this.formData.templateFieldList = '';
        this.formData.createTime = '';
        this.formData.updateTime = '';
        this.formData.type = '记录';
        this.formData.organId = iLocalStroage.gets("userInfo").organId
        this.formData.userId = iLocalStroage.gets("userInfo").id
        // 当事人信息和企业信息选项的值
        this.formData.objectType = this.$data.$f.getValue('personOrParty')
        delete (this.formData["pictureList"]);
        delete (this.formData["attachedList"]);
        console.log('formdata', this.formData)
        saveOrUpdateRecordApi(this.formData).then(
          res => {
            // console.log(res)
            if (res.code == 200) {
              // this.recordMsg = res.data;//根据返回id上传文件
              this.recordMsg = this.formData.id ? this.formData.id : res.data;//根据返回id上传文件
              this.$refs.uploadRef.temporySaveMethod(this.recordMsg)
              this.$message({
                type: "success",
                message: res.msg
              });
              // this.rule.forEach(element => {
              //   console.log(element)
              //   this.$data.$f.updateRule(element.field, {
              //     props: { disabled: true }
              //   }, true);
              // });
              this.recordId = res.data;
              if (!noRouter) {
                // this.addOrEiditFlag = 'view';
                this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
                this.$router.push({
                  name: 'inspection_recordList',
                  // params: item
                });
              } else {
                this.findRecordDataByld()
              }

            } else {
              this.$message.error(res.msg);
            }
          },
          error => {
          })
      })

    },
    // 复制添加-可修改-创建人换成登录账号-附件删除，id清空
    copySave() {
      this.$confirm('复制当前记录表单内容，重新创建表单？', "复制当前记录表单", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.isCopyStyle = true;//变颜色
        debugger
        this.addOrEiditFlag = 'add'
        this.formData.id = ''
        this.formData.createTime = ''
        this.formData.updateTime = ''
        this.defautFileList = []
        this.defautImgList = []
        // 设置当前账号名
        this.setLawPersonCurrentP()
        this.onSaveRecord(true)//暂存一份
        // 更新数据

        this.editMethod()//可修改

      })

    },
    onSubmit(formData) {
      console.log("formData", formData)
    },
    clickPover() {
      this.isChangeModle = true
    },
    change() {
      // 修改值
      this.$data.$f.setValue("field", '1212')
    },
    // 修改模板
    changeModle() {
      this.visiblePopover = true
    },
    isEdit() {
      console.log('rule', this.rule)
      this.$data.$f.resetFields()
      if (this.$route.query.id) {
        if (this.$route.query.addOrEiditFlag == 'edit' && !this.isCopyStyle) {
          this.rule.forEach(element => {
            // console.log(element)
            this.$data.$f.updateRule(element.field, {
              props: { disabled: true }
            }, true);
          });
        } else if (this.$route.query.addOrEiditFlag == 'view' && !this.isCopyStyle) {
          this.rule.forEach(element => {
            // console.log(element)
            this.$data.$f.updateRule(element.field, {
              props: { disabled: true }
            }, true);
          });
        }
      }
      console.log(this.rule)
    },
    viewRecord() {
      this.options = {
        // submitBtn: false,
        onSubmit: (formData) => {
          // alert(JSON.stringify(formData));
        },
        global: {
          '*': {
            props: {
              disabled: true,
            },
          },
        }
      }
      this.findRecordDataByld()
    },
    updateMole(data) {
      console.log(data)
      this.modleId = data.id
      this.findDataByld()
      this.isChangeModle = false
      this.personPartyFlag = false
    },
    // 匹配数据格式
    dealFormData(viewFlag) {
      // 左侧操作按钮
      this.formOrDocData.showBtn = [this.formData.documentFill == '是' ? true : false, this.formData.releventRecords ? true : false, this.formData.operateRecords == '是' ? true : false], //文书填报、相关记录、操作记录
        // this.formOrDocData.showBtn =[true,true,true]

        this.rule = []
      let data = JSON.parse(JSON.stringify(this.defaultRuleData.templateFieldList))
      // console.log('ruleData', data)
      let ruleData = []
      let _this = this
      // 处理当事人信息和企业组织信息
      let personFlag = false
      let partyFlag = false
      data.forEach(element => {
        if (element.classId == this.personName) {
          personFlag = element;
          console.log('personFlag', personFlag)
          // 存储字段名和type
          console.log(element.fieldList)
          element.fieldList.forEach(item => {
            this.personFieldList.push(item)
          });
          console.log('this.personFieldList', this.personFieldList)
          // 回显选中的当事人企业
          if (_this.formData.objectType == '1') {
            this.defultParty()
          } else {
            // 显示当事人信息
            this.defultPerson()
          }
        }
        if (element.classId == this.partyName) {
          partyFlag = element;
          console.log('partyFlag', partyFlag)
          element.fieldList.forEach(item => {
            this.partyFieldList.push(item)
          });
        }
      });
      if (partyFlag && personFlag) {
        this.personPartyFlag = true;
        console.log(this.personPartyFlag)
      }
      // 处理数据格式
      // 当事人信息和企业组织信息放前面
      if (this.personPartyFlag) {
        // 组
        this.rule.push({
          type: 'p',
          name: 'btn',
          props: {
            type: 'primary',
            field: 'btn',
            loading: true
          },
          className: 'border-title',
          children: ['检查对象'],
        }, {
          type: "radio",
          field: 'personOrParty',
          title: '当事人类型',
          options: [{ value: "0", label: "当事人信息" },
          { value: "1", label: "企业组织信息" },],
          value: this.formData.objectType || '0',
          // validate: [{
          //   required: item.required == 'true' ? true : false,
          //   message: '请选择' + (item.title || ''),
          //   trigger: 'blur'
          // }],
          props: {
            disable: true
          },
          inject: true,
          on: {
            'change': this.changePersonParty
          },
        })
        // 当事人信息和企业组织信息字段放前面
        data.forEach(element => {

          if (element.classId == this.partyName || element.classId == this.personName) {
            // 字段
            this.dealFieldData(element)
          }
        });
        // 其他字段
        data.forEach(element => {
          if (element.classId == this.partyName || element.classId == this.personName) {
          } else {
            if (element.classs) {
              // 组
              this.rule.push(
                {
                  type: 'p',
                  name: 'btn',
                  field: element.classId,
                  props: {
                    type: 'primary',
                    field: 'btn',
                    loading: true
                  },
                  className: 'border-title',
                  children: [element.classs],
                }
              )
            } else {
              if (this.rule.length != 0) {
                // 分割线
                this.rule.push(
                  {
                    type: 'div',
                    name: 'btn',
                    field: element.classId,
                    props: {
                      type: 'primary',
                      field: 'btn',
                      loading: true
                    },
                    className: 'line',
                  }
                )
              }

            }
            this.dealFieldData(element)
          }
        });
        console.log('this.rule', this.rule)
      } else {
        data.forEach(element => {
          if (element.classs) {
            // 组
            this.rule.push(
              {
                type: 'p',
                name: 'btn',
                field: element.classId,
                props: {
                  type: 'primary',
                  field: 'btn',
                  loading: true
                },
                className: 'border-title',
                children: [element.classs],
              }
            )
          } else {
            if (this.rule.length != 0) {
              // 分割线
              this.rule.push(
                {
                  type: 'div',
                  name: 'btn',
                  field: element.classId,
                  props: {
                    type: 'primary',
                    field: 'btn',
                    loading: true
                  },
                  className: 'line',
                }
              )
            }
          }

          this.dealFieldData(element, viewFlag)
        })
      }
    },
    dealFieldData(element, viewFlag) {
      console.log('viewFlag', viewFlag)
      // 字段
      element.fieldList.forEach(item => {

        // 用于预览，避免重复
        if (viewFlag) {
          item.id = this.globalId.toString()
          this.globalId++
          console.log('id', item.id)
          // debugger
        }
        console.log('item', item, typeof (item.title))
        if (typeof (item.title) == 'object') {
          if (item.title) {
            item.title = item.title.title
          }
          // debugger
        }
        // debugger
        if (item.type == '文本型') {
          item.type = 'input';
          this.rule.push({
            type: 'input',
            field: item.id || item.field,//id用于传值，field用于预览
            title: item.title,
            props: {
              type: 'textarea',
              placeholder: item.remark,
              disable: true,
              autosize: { minRows: 1 }
            },
            value: item.text,
            validate: [{
              required: item.required == 'true' ? true : false,
              message: '请输入' + item.title,
              trigger: 'blur'
            }]
          })
        } else if (item.type == '抽屉型') {
          item.options.forEach(option => {
            option.label = option.value
          });
          this.rule.push({
            type: "select",
            field: item.id || item.field,
            title: item.title,
            options: item.options,
            validate: [{
              required: item.required == 'true' ? true : false,
              message: '请输入' + item.title,
              trigger: 'blur'
            }],
            props: {
              disable: true
            },
          })
        } else if (item.type == '单选型') {
          item.options.forEach(option => {
            option.label = option.value
          });
          // 是否转立案
          if (item.field == 'isTransfer') {
            // 存储是否转立案字段名
            this.isTransferName = item.id
          }
          this.rule.push({
            type: "radio",
            field: item.id || item.field,
            title: item.title,
            options: item.options,
            value: item.text,
            validate: [{
              required: item.required == 'true' ? true : false,
              message: '请选择' + (item.title || ''),
              trigger: 'blur'
            }],
            props: {
              disable: true
            },
          })
        } else if (item.type == '复选型') {
          item.options.forEach(option => {
            option.label = option.value
          });
          this.rule.push({
            type: "checkbox",
            field: item.id || item.field,
            title: item.title,
            options: item.options,
            value: item.text ? item.text.split(',') : [],
            validate: [{
              required: item.required == 'true' ? true : false,
              message: '请选择' + item.title,
              trigger: 'blur'
            }]
          })
        } else if (item.type == '日期型') {
          // 通用字段默认带入时间
          let timeValue = item.status === 0 ? item.text || [new Date()] : item.text || []
          if (item.options[0].value == 'HH:mm') {
            this.rule.push({
              type: "TimePicker",
              field: item.id || item.field,
              title: item.title,
              value: timeValue,
              props: {
                format: item.options[0].value,
                placeholder: item.remark
              },
              validate: [{
                required: item.required == 'true' ? true : false,
                message: '请输入' + item.title,
                trigger: 'blur'
              }]
            })
          } else {
            console.log('data', item.text)
            // 通用字段默认带入时间
            let timeValue = item.status === 0 ? item.text || [new Date()] : item.text || []
            this.rule.push({
              type: "DatePicker",
              field: item.id || item.field,
              title: item.title,
              value: timeValue,
              props: {
                format: item.options[0].value,
                placeholder: item.remark,
                type: 'datetime'
              },
              validate: [{
                required: item.required == 'true' ? true : false,
                message: '请输入' + item.title,
                trigger: 'blur'
              }]
            })
          }
        } else if (item.type == '数字型') {
          this.rule.push({
            //  type: "InputNumber",
            type: "input",
            field: item.id || item.field,
            title: item.title,
            value: item.text,
            controls: false,
            className: 'modle-number-box',
            props: {
              type: 'textarea',
              autosize: { minRows: 1 }
              // precision: 2
            },
            validate: [{
              required: item.required == 'true' ? true : false,
              pattern: '^(\\-|\\+)?\\d+(\\.\\d+)?$',//正则校验数字
              message: '必须输入数字',
              trigger: 'blur'
            }]
          })
        } else if (item.type == '地址型') {
          item.type = 'input';
          this.rule.push({
            type: 'input',
            field: item.id || item.field,//id用于传值，field用于预览
            // title: item.title,
            title: item.title,
            props: {
              type: 'text',
              placeholder: item.remark,
              disable: true
            },
            value: item.text,
            validate: [{
              required: item.required == 'true' ? true : false,
              message: '请输入' + item.title,
              trigger: 'chang'
            }],
            children: [
              {
                type: 'i',
                class: 'iconfont law-weizhi',
                slot: 'suffix',

              }
            ],
            inject: true,
            on: {
              'focus': this.changeAdress
            },
          })
        } else if (item.type == '引用型') {
          item.type = 'input';
          this.rule.push({
            type: 'input',
            field: item.id || item.field,//id用于传值，field用于预览
            title: item.title,
            props: {
              type: 'text',
              placeholder: item.remark,
              disable: true
            },
            value: item.text,
            validate: [{
              required: item.required == 'true' ? true : false,
              message: '请输入' + item.title,
              trigger: 'chang'
            }],
            children: [
              {
                type: 'i',
                class: 'iconfont law-people',
                slot: 'suffix',

              }
            ],
            inject: true,
            on: {
              'focus': item.field == 'staff' ? this.changeLaw : this.changeLawId
            },
          })
          if (item.field == 'staff') {
            this.LawName = item.id;// 执企业组织信息员字段名
          } else if (item.field == 'certificateId') {//执企业组织信息员账号字段名
            this.LawOfficerCard = item.id;
          }
        }
      });
      this.$nextTick(() => {
        this.isEdit()
        if (this.personPartyFlag) {
          console.log('this.personFieldList', this.personFieldList)
          this.defaultPersonFieldList = JSON.parse(JSON.stringify(this.personFieldList))
          // 默认展示当事人信息和企业组织信息
          // this.personFieldList = JSON.parse(JSON.stringify(this.defaultPersonFieldList))
          if (this.formData.objectType && this.formData.objectType == '1') {
            this.defultParty()
          } else {
            this.defultPerson()
          }
        }
      });
    },
    //查询执企业组织信息员
    getAllUserList(list) {
      this.allUserList = list;
    },
    setLawPerson(userlist) {
      this.alreadyChooseLawPerson = userlist;
      let staffArr = [];
      this.alreadyChooseLawPerson.forEach(item => {
        //   //给表单数据赋值
        // staffArr.push(item.lawOfficerName);//执企业组织信息员
        staffArr.push(item.lawOfficerName);//执企业组织信息员

      });

      this.$data.$f.setValue(this.LawName, staffArr.join(','));

    },
    //查询执企业组织信息员 带id
    getAllUserListId(list) {
      this.allUserListId = list;
    },
    setLawPersonId(userlist) {
      this.alreadyChooseLawPersonId = userlist;
      let certificateIdArr = [];
      this.alreadyChooseLawPersonId.forEach(item => {
        //   //给表单数据赋值
        // certificateIdArr.push(item.selectLawOfficerCard);//执法账号
        certificateIdArr.push(item.lawOfficerName + '(' + item.selectLawOfficerCard + ')');//执企业组织信息员
      });
      this.$data.$f.setValue(this.LawOfficerCard, certificateIdArr.join(','));

    },
    //获取坐标
    getLngLat(lngLatStr) {
      console.log(`lngLatStr:`, lngLatStr);
      this.$data.$f.setValue(this.adressName, lngLatStr);
      // this.inforForm.latitudeAndLongitude = lngLatStr;   
      // this.hasLatitudeAndLongitude = true;
    },
    // 获取地址
    changeAdress(inject) {
      console.log(`blur: ${inject.self.title}`);
      console.log(`blur: ${inject.self.field}`);
      this.$refs.mapDiagRef.showModal();
      this.adressName = inject.self.field;// 地址字段名
    },
    // 获取执企业组织信息员和账号
    changeLaw(inject) {
      console.log(`blur: ${inject.self.title}`);
      console.log(`blur: ${inject.self.field}`);

      //选择执企业组织信息员
      this.$refs.chooseLawPersonRef.showModal(this.alreadyChooseLawPerson);
    },
    // 获取执企业组织信息员和账号-带id
    changeLawId(inject) {
      console.log(`blur: ${inject.self.title}`);
      console.log(`blur: ${inject.self.field}`);
      //选择执企业组织信息员
      this.$refs.chooseLawPersonIdRef.showModal(this.alreadyChooseLawPersonId);
    },
    // 选择当事人类型
    changePersonParty(inject) {
      this.personFieldList = JSON.parse(JSON.stringify(this.defaultPersonFieldList))
      if (inject.self.value == '1') {
        this.defultParty()
      }
      // 显示当事人信息
      if (inject.self.value == '0') {
        this.defultPerson()
      }
    },
    // 默认隐藏企业组织信息
    defultPerson() {
      console.log('personFieldList2', this.personFieldList)
      this.personFieldList.forEach(element => {
        // console.log('elmen5', element.id)
        // 避免undefine导致全部隐藏
        if (element.id || element.field) {
          this.$data.$f.hidden(false, element.id || element.field)
        }
        this.$data.$f.updateRule(element.id, {
          validate: [
            { required: element.required === "true" ? true : false, message: element.title + '必填', trigger: 'change' },
          ]
        })
      });
      //  隐藏显示企业组织信息，去掉验证
      this.partyFieldList.forEach(element => {
        // console.log('elmen6', element)
        if (element.id || element.field) {
          this.$data.$f.hidden(true, element.id || element.field)
        }
        this.$data.$f.updateRule(element.id, {
          validate: [
            { required: false, message: element.title + '必填', trigger: 'change' },
          ]
        })
      });
    },
    // 隐藏个人组织信息
    defultParty() {
      // 隐藏当事人信息
      this.personFieldList.forEach(element => {
        // console.log('elmen1', element)
        // 避免undefine导致全部隐藏
        if (element.id || element.field) {
          this.$data.$f.hidden(true, element.id || element.field)
        }
        this.$data.$f.updateRule(element.id, {
          validate: [
            { required: false, message: element.title + '必填', trigger: 'change' },
          ]
        })
      });
      // 显示企业组织信息
      this.partyFieldList.forEach(element => {
        // console.log('elmen2', element)
        if (element.id || element.field) {
          this.$data.$f.hidden(false, element.id || element.field)
        }
        this.$data.$f.updateRule(element.id, {
          validate: [
            { required: element.required === "true" ? true : false, message: element.title + '必填', trigger: 'change' },
          ]
        })
      });
    },
    // 随机生成id 用于预览
    random() {
      let a = Math.random().toString(16)
      return a.substring(a.length - 10)
    },
    saveFileData() {

    },
    submitFileData() {

    },
  },
  mounted() {
    console.log('id', this.$route.query.id)
    this.addOrEiditFlag = this.$route.query.addOrEiditFlag
    if (this.$route.query.id) {
      if (this.$route.query.addOrEiditFlag == 'add') {
        this.modleId = this.$route.query.id
        this.findDataByld()
      } else
        if (this.$route.query.addOrEiditFlag == 'edit') {
          this.recordId = this.$route.query.id;
          this.findRecordDataByld()
        } else if (this.$route.query.addOrEiditFlag == 'view') {
          this.recordId = this.$route.query.id;
          this.viewRecord()
        } else if (this.$route.query.addOrEiditFlag == 'temporary') {
          this.recordId = this.$route.query.id;
          this.findRecordDataByld()
        }
    }
    if (this.psMsg) {
      this.defaultRuleData = this.psMsg
      this.formData.title = this.psMsg.title
      this.dealFormData()
    }
  }
}
</script>
<style lang="scss" src="@/assets/css/card.scss"></style>
<style lang="scss" src="@/assets/css/documentForm.scss"></style>
<style lang="scss" src="@/assets/css/caseHandle/index.scss"></style>
<style lang="scss" src="@/assets/css/documentForm.scss"></style>
<style lang="scss">
.copy-style-text {
  .el-textarea__inner {
    color: #f56c6c;
  }
}
</style>
