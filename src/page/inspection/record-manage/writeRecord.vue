<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox modle-set">
      <div style="font-size: 16px;font-weight: bold;text-align:center;margin-bottom:18px">

        <!-- {{psMsg.title}} -->
      </div>
      <form-create v-model="$data.$f" :rule="rule" @on-submit="onSubmit">
      </form-create>
    </div>
  </div>
</template>
<script>
import formCreate, { maker } from '@form-create/element-ui'
import Vue from 'vue'
import { saveOrUpdateRecordApi, findRecordModleByIdApi, findRecordlModleFieldByIdeApi, findRecordByIdApi } from "@/api/Record";
import iLocalStroage from "@/common/js/localStroage";
export default {
  components: {
    formCreate: formCreate.$form()
  },
  props: ['psMsg'],
  watch: {
    psMsg(val, oldVal) {
      // this.show = val;
      console.log('监听', this.psMsg, 'val', val)
      if (this.psMsg) {
        this.dealFormData()
      }
    }
  },
  data() {
    return {
      modleId: '',
      recordId: '',
      baseData: [],
      creatFormData: [],
      ruleForm: {
        value1: '',
        value2: '',
      },
      $f: {},
      formData: {},
      //表单实例对象
      $f: {},
      rule: [],
    }
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

                _this.formData = res.data;
                _this.psMsg = JSON.parse(JSON.stringify(res.data))
                _this.$set(_this.psMsg, 'templateFieldList', list);
                _this.formData.templateId = _this.formData.id
                _this.formData.id = '';
                this.setLawPersonCurrentP()
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
          _this.psMsg = JSON.parse(JSON.stringify(res.data))
          _this.$set(_this.psMsg, 'templateFieldList', list);
        },
        error => {
        })
    },
    //用户的id去拿他名字
    setLawPersonCurrentP() {
      this.formData.createUser = iLocalStroage.gets("userInfo").username;

    },
    onSubmit(formData) {
      //TODO 提交表单
      console.log("formData", formData)
      let submitData = JSON.parse(JSON.stringify(this.baseData))
      let submitList = []
      submitData.forEach(element => {
        element.fieldList.forEach(item => {
          let textName = item.field
          // console.log('变量', item.field, ':', formData['' + textName + ''])
          item.text = formData['' + textName + '']
          if (typeof (item.text) != 'string') {
            item.text =item.text.join(',')
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
          } else {
            this.$message.error(res.msg);
          }
        },
        error => {
        })
    },
    change() {
      // 修改值
      this.$data.$f.setValue("field", '1212')
    },
    dealFormData() {
      this.rule = []
      let data = JSON.parse(JSON.stringify(this.psMsg.templateFieldList))
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
          if (item.type == '文本型') {
            item.type = 'input';
            this.rule.push({
              type: 'input',
              field: item.field,
              title: item.title,
              props: {
                type: 'text',
                placeholder: item.remark
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
              }]
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
              }]
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
              value: item.text.split(','),
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
        }

    }
    if (this.psMsg) {
      this.dealFormData()
    }

  }
}
</script>
<style lang="scss" src="@/assets/css/card.scss"></style>
