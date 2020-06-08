<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox modle-set">
      <div style="font-size: 16px;font-weight: bold;text-align:center;margin-bottom:18px">

        <!-- {{psMsg.title}} -->
      </div>
      <form-create v-model="$data.$f" :rule="rule" @on-submit="onSubmit">
      </form-create>
      <!-- </div>-->
      <el-button @click="submitRecord()">提交</el-button>
    </div>
  </div>
</template>
<script>
import formCreate, { maker } from '@form-create/element-ui'
import Vue from 'vue'
import { saveOrUpdateRecordApi, findRecordModleByIdApi, findRecordlModleFieldByIdeApi } from "@/api/Record";
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
      baseData: [],
      creatFormData: [],
      ruleForm: {
        value1: '',
        value2: '',
      },
      editData: { key0: '张三' },
      $f: {},
      formData: {},
      //表单实例对象
      $f: {},
      rule: [
        // {
        //   type: 'template',
        //   name: 'btn',
        //   template: '<p class="border-title">正在加载中</p>',
        // },
        // // 文本框
        // {
        //   type: 'input',//必要-字段类型，不可改
        //   field: 'field',//必要-字段英文名
        //   title: '姓名',//必要-字段中文名
        //   col: { span: 16, labelWidth: '50%' },//不必要
        //   className: 'total-gross-wt',//不必要-样式名
        //   required: {      //不必要-配置
        //     type: 'text',
        //     clearable: true, // 是否显示清空按钮
        //     placeholder: '请输入'
        //   },
        //   validate: [{  //不必要-验证规则
        //     // pattern: /^(0|[1-9]\d*)(\s|$|\.\d{1,3}\b)/, // /^[0-9]+([.]{1}[0-9]{1,3})?$/,
        //     message: '请正确输入',
        //     required: true,
        //     trigger: 'blur'
        //   }
        //   ]
        // },
        // // 单选框
        // {
        //   type: "radio",//必要-字段类型，不可改
        //   title: "是否包邮",//必要-字段中文名
        //   field: "is_postage",//必要-字段英文名
        //   value: "0",//不必要-默认值
        //   options: [//必要-选项，至少一个
        //     { value: "0", label: "不包邮", disabled: false },
        //     { value: "1", label: "包邮", disabled: true },
        //   ],
        // },
        // // 多选框
        // {
        //   type: "checkbox",//必要-字段类型，不可改
        //   title: "标签",//必要-字段英文名
        //   field: "label",//必要-字段中文名
        //   // value: ["1", "2", "3"],//不必要-默认值
        //   options: [//必要-选项，至少一个
        //     { value: "好用", },
        //     { value: "方便", },
        //     { value: "实用", },
        //     { value: "有效", },
        //   ]
        // },
        // // 下拉选择框
        // {
        //   type: "select",//必要-字段类型，不可改
        //   field: "cate_select",//必要-字段英文名
        //   title: "产品分类",//必要-字段中文名
        //   value: ["104"],//不必要-默认值
        //   options: [//必要-选项，至少一个
        //     { "value": "104", "label": "生态蔬菜", "disabled": false },
        //     { "value": "105", "label": "新鲜水果", "disabled": false },
        //   ],
        //   required: {
        //     multiple: true
        //   },
        // },
        // // 日期选择器
        // {
        //   type: "DatePicker",//必要-字段类型，不可改
        //   field: "section_day",//必要-字段英文名
        //   title: "活动日期",//必要-字段中文名
        //   value: ['2018-02-20', new Date()],//不必要-默认值
        //   required: {
        //     "type": "date",//必要-配置用，写死，可能的值：year/month/date/dates/ week/datetime/datetimerange/daterange
        //     "format": "yyyy-MM-dd HH:mm:ss",//必要-配置格式用-写死
        //     "placeholder": "请选择活动日期",
        //   }
        // },
        // // 时间选择器
        // {
        //   type: "TimePicker",
        //   field: "section_time",
        //   title: "活动时间",
        //   value: [],
        //   required: {
        //     isRange: true,//时间范围时必填，其他情况不必填
        //   },
        // },


      ]


    }
  },
  methods: {
    submitRecord() {

    },
    findDataByld() {
      let _this = this
      findRecordlModleFieldByIdeApi(this.modleId).then(
        res => {

          let list = JSON.parse(JSON.stringify(res.data))
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
          _this.baseData = list
          findRecordModleByIdApi(this.modleId).then(
            res => {
              if (res.code == 200) {

                _this.formData = res.data;
                _this.psMsg = JSON.parse(JSON.stringify(res.data))
                _this.$set(_this.psMsg, 'templateFieldList', list);
                _this.formData.createTime ='';
                _this.formData.updateTime ='';

                this.setLawPersonCurrentP()
              }
            },
            error => {

            })
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
      console.log("baseData", this.baseData)
      let submitData = JSON.parse(JSON.stringify(this.baseData))
      let submitList = []
      submitData.forEach(element => {
        console.log(element)
        element.fieldList.forEach(item => {
          let textName = item.field
          console.log('变量', formData['' + textName + ''])
          item.text = formData['' + textName + '']
        });

      });
      console.log('submitData', submitData)
      submitData = JSON.stringify(submitData)
      console.log(submitData)
      this.formData.layout = submitData
      this.formData.templateFieldList = ''
      this.formData.id = '';
      console.log('formdata', this.formData)
      saveOrUpdateRecordApi(this.formData).then(
        res => {
          console.log(res)
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
      console.log('ruleData', data)
      let ruleData = []
      let _this = this
      data.forEach(element => {
        console.log(element)
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
          console.log(item)
          if (item.type == '文本型') {
            item.type = 'input';
            // let editField=item.field
            // console.log('基础数据回显',_this.editData.getAttribute("editField"))
            this.rule.push({
              type: 'input',
              field: item.field,
              title: item.title,
              // value:this.editData.editField,
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
                field: "section_time",
                title: item.title,
                value: [new Date()],
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
                field: "section_day",
                title: item.title,
                value: [new Date()],
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
              field: "price121",
              title: item.title,
              value: 1,
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
      this.modleId = this.$route.params.id
      this.findDataByld()
    }
    if (this.psMsg) {
      this.dealFormData()
      // let a = [{ name: "key1", value: 1 }, { name: "key2", value: 2 }]
      // let b = [{ key1: 1212 }, { key2: 2334 }]
    }
    // this.dealFormData()
  }
}
</script>
<style lang="scss" src="@/assets/css/card.scss"></style>
