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
      <form-create v-model="$data.$f" :rule="rule" @on-submit="onSubmit" :option="options">
      </form-create>

      <p class="border-title">图片</p>
      <p class="border-title">附件</p>
      <!-- 悬浮按钮 -->
      <div class="float-btns btn-height63">
        <el-button type="success" @click="edit()" v-if="addOrEiditFlag=='view'">
          <i class="iconfont law-icon_zancun1"></i>
          <br />修改
        </el-button>
        <el-button type="success" @click="onSave()" v-if="addOrEiditFlag=='add'||addOrEiditFlag=='temporary'">
          <i class="iconfont law-icon_zancun1"></i>
          <br />暂存
        </el-button>
        <el-button type="primary" @click="save()" v-if="addOrEiditFlag=='add'||addOrEiditFlag=='temporary'">
          <i class="iconfont law-icon_baocun1"></i>
          <br />保存
        </el-button>
        <el-button type="primary" @click="copySave()" v-if="addOrEiditFlag=='view'">
          <i class="iconfont law-icon_zancun1"></i>
          <br />复制<br />添加
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
import writeRecordHome from "./modleList.vue";

import formCreate, { maker } from '@form-create/element-ui'
import Vue from 'vue'
import { saveOrUpdateRecordApi, findRecordModleByIdApi, findRecordlModleFieldByIdeApi, findRecordByIdApi } from "@/api/Record";
import iLocalStroage from "@/common/js/localStroage";
export default {
  props: ['psMsg'],
  watch: {
    psMsg(val, oldVal) {
      console.log('监听', this.psMsg, 'val', val)
      if (this.psMsg) {
        this.defaultRuleData = this.psMsg
        this.formData.title = this.psMsg.title
        this.dealFormData()
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
      },
    }
  },
  components: {
    writeRecordHome:writeRecordHome,
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
    // 修改
    edit() {
      // console.log('rule', this.rule)
      this.$data.$f.resetFields()
      this.rule.forEach(element => {
        console.log(element)
        this.$data.$f.updateRule(element.field, {
          props: { disabled: false }
        }, true);
      });
      this.addOrEiditFlag = 'add'
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
              this.addOrEiditFlag = 'view'
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
            } else {
              this.$message.error(res.msg);
            }
          },
          error => {
          })
      })

    },
    onSave() {
      // console.log('rule', this.rule)
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
                name: 'inspection_recordList',
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
    // 复制添加
    copySave() {
      this.addOrEiditFlag = 'add'
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
    updateMole(data) {
      console.log(data)
      this.modleId = data.id
      this.findDataByld()
      this.isChangeModle = false
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
              field: item.field,
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
        this.$nextTick(() => {
          this.isEdit()
        });

      });
    },
    isEdit() {
      console.log('rule', this.rule)
      this.$data.$f.resetFields()
      if (this.$route.query.id) {
        if (this.$route.query.addOrEiditFlag == 'edit') {
          this.rule.forEach(element => {
            // console.log(element)
            this.$data.$f.updateRule(element.field, {
              props: { disabled: true }
            }, true);
          });
        } else if (this.$route.query.addOrEiditFlag == 'view') {
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
