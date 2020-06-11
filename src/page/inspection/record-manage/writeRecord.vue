<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox modle-set">
      <div style="text-align:center;margin-bottom:18px">
        <span style="font-size:18px;font-weight: bold;">
          {{formData.title}}
        </span>
        <span v-if="isWrite">
          <el-popover placement="bottom" width="700" trigger="click">
            <writeRecord ref="writeRecordRef" style="width:710px;height:400px;overflow:auto"></writeRecord>
            <span slot="reference" @click="upAndDown=!upAndDown">
              <span class="change_title_icon" @click="changeModle">切换模板
                <i class="el-icon-arrow-down" v-if="!upAndDown"></i>
                <i class="el-icon-arrow-up" v-if="upAndDown"></i>
              </span>
            </span>
          </el-popover>
          <span class="change_title_icon">二维码<i class="iconfont law-erweima" style="font-size:14px;margin-left:4px"></i></span>
        </span>
      </div>
      <form-create v-model="$data.$f" :rule="rule" @on-submit="onSubmit" :option="options">
      </form-create>
      <div style="text-align:center">
        <!-- <el-button type="primary" @click="onSubmit">提交</el-button> -->
        <!-- <el-button aligen="center" @click="reset">重置</el-button> -->

      </div>
      <!-- 悬浮按钮 -->
      <div class="float-btns btn-height63">
        <el-button type="primary" @click="save()">
          <i class="iconfont law-icon_baocun1"></i>
          <br />保存
        </el-button>
        <el-button type="success" @click="onSave()">
          <i class="iconfont law-icon_zancun1"></i>
          <br />暂存
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
import writeRecord from "./writeRecordHome";

import formCreate, { maker } from '@form-create/element-ui'
import Vue from 'vue'
import { saveOrUpdateRecordApi, findRecordModleByIdApi, findRecordlModleFieldByIdeApi, findRecordByIdApi } from "@/api/Record";
import iLocalStroage from "@/common/js/localStroage";
export default {
  props: ['psMsg'],
  watch: {
    psMsg(val, oldVal) {
      // this.show = val;
      console.log('监听', this.psMsg, 'val', val)
      if (this.psMsg) {
        this.defaultRuleData = this.psMsg
        this.formData.title = this.psMsg.title
        this.dealFormData()
      }
    }
  },
  data() {
    return {
      defaultRuleData: [],
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
      options: {
        submitBtn: false,
        onSubmit: (formData) => {
          alert(JSON.stringify(formData));
        },
        global: {
          '*': {
            props: {
              disabled: false,
            },
          },
        }
      },
    }
  },
  components: {
    writeRecord,
    formCreate: formCreate.$form(),

  },
  methods: {
    // 查找模板
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
    // 查找已有记录
    findRecordDataByld() {
      let _this = this
      findRecordByIdApi(this.recordId).then(
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
        },
        error => {
        })
    },
    //用户的id去拿他名字
    setLawPersonCurrentP() {
      this.formData.createUser = iLocalStroage.gets("userInfo").username;

    },
    save() {
      this.formData.status = '保存';
      // this.onSubmit()
      this.$data.$f.submit((formData, $f) => {
        // alert(JSON.stringify(formData));
        console.log("formData", formData)
        let submitData = JSON.parse(JSON.stringify(this.baseData))
        let submitList = []
        submitData.forEach(element => {
          element.fieldList.forEach(item => {
            let textName = item.field
            // console.log('变量', item.field, ':', formData['' + textName + ''])
            item.text = formData['' + textName + '']
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
        console.log('formdata', this.formData)
        saveOrUpdateRecordApi(this.formData).then(
          res => {
            // console.log(res)
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: res.msg
              });
              this.$router.push({
                name: 'inspection_writeRecord',
                // params: item
              });
            } else {
              this.$message.error(res.msg);
            }
          },
          error => {
          })
      })

    },
    onSave() {
      console.log('rule', this.rule)
      this.rule.forEach(element => {
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
            let textName = item.field
            // console.log('变量', item.field, ':', formData['' + textName + ''])
            item.text = formData['' + textName + '']
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
        console.log('formdata', this.formData)
        saveOrUpdateRecordApi(this.formData).then(
          res => {
            // console.log(res)
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: res.msg
              });
              this.$router.push({
                name: 'inspection_writeRecord',
                // params: item
              });
            } else {
              this.$message.error(res.msg);
            }
          },
          error => {
          })
      })

    },
    onSubmit(formData) {

      console.log("formData", formData)

      //TODO 提交表单
      this.$data.$f.submit((formData, $f) => {
        // alert(JSON.stringify(formData));
        let submitData = JSON.parse(JSON.stringify(this.baseData))
        let submitList = []
        submitData.forEach(element => {
          element.fieldList.forEach(item => {
            let textName = item.field
            // console.log('变量', item.field, ':', formData['' + textName + ''])
            item.text = formData['' + textName + '']
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
        console.log('formdata', this.formData)
        saveOrUpdateRecordApi(this.formData).then(
          res => {
            // console.log(res)
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: res.msg
              });
              this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
              this.$router.push({
                name: 'inspection_writeRecord',
                // params: item
              });
            } else {
              this.$message.error(res.msg);
            }
          },
          error => {
          })
      })

    },
    change() {
      // 修改值
      this.$data.$f.setValue("field", '1212')
    },
    // 修改模板
    changeModle() {
      // this.visiblePopover = true
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      this.$router.push({
        name: 'inspection_writeRecord',
        // params: item
      });
    },
    dealFormData() {
      this.rule = []
      let data = JSON.parse(JSON.stringify(this.defaultRuleData.templateFieldList))
      // console.log('ruleData', data)
      let ruleData = []
      let _this = this
      data.forEach(element => {
        // console.log(element)
        if (element.classs) {
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
        }

        element.fieldList.forEach(item => {
          // console.log(item)
          if (item.type == '文本型' || item.type == '地址型' || item.type == '引用型') {
            item.type = 'input';
            this.rule.push({
              type: 'input',
              field: item.field,
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
                trigger: 'blur'
              }]
            })
          } else if (item.type == '抽屉型') {
            item.options.forEach(option => {
              option.label = option.value
            });
            this.rule.push({
              type: "select",
              field: item.field,
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
            this.rule.push({
              type: "radio",
              field: item.field,
              title: item.title,
              options: item.options,
              value: item.text,
              validate: [{
                required: item.required == 'true' ? true : false,
                message: '请输入' + item.title,
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
              field: item.field,
              title: item.title,
              options: item.options,
              value: item.text ? item.text.split(',') : [],
              validate: [{
                required: item.required == 'true' ? true : false,
                message: '请输入' + item.title,
                trigger: 'blur'
              }]
            })
          } else if (item.type == '日期型') {
            if (item.options[0].value == 'HH:mm') {
              this.rule.push({
                type: "TimePicker",
                field: item.field,
                title: item.title,
                value: item.text || [new Date()],
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
              this.rule.push({
                type: "DatePicker",
                field: item.field,
                title: item.title,
                value: item.text || [new Date()],
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
              type: "InputNumber",
              field: item.field,
              title: item.title,
              value: item.text || 1,
              props: {
                precision: 2
              },
              validate: [{
                required: item.required == 'true' ? true : false,
                message: '请输入' + item.title,
                trigger: 'blur'
              }]
            })
          }
        });
      });
    },
    viewRecord() {
      this.options = {
        // submitBtn: false,
        onSubmit: (formData) => {
          alert(JSON.stringify(formData));
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
    }
  },
  mounted() {
    if (this.$route.params) {
      console.log('this.$route.params', this.$route.params)
      if (this.$route.params.addOrEiditFlag == 'add') {
        this.modleId = this.$route.params.id
        this.findDataByld()
      } else
        if (this.$route.params.addOrEiditFlag == 'edit') {
          this.recordId = this.$route.params.id;
          this.findRecordDataByld()
        } else if (this.$route.params.addOrEiditFlag == 'view') {
          this.recordId = this.$route.params.id;
          this.viewRecord()
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
