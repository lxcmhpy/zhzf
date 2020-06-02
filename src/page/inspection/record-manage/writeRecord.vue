<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox">
      写记录-标题{{formData.title}}
      <el-button @click="change()">点击</el-button>
      <div v-for="item in creatFormData" :key="item.id">
        <form-create v-model="$data.$f" :rule="rule" @on-submit="onSubmit">
          
        </form-create>
      </div>
    </div>
  </div>
</template>
<script>
import formCreate, { maker } from '@form-create/element-ui'
import Vue from 'vue'
export default {
  components: {
    formCreate: formCreate.$form()
  },
  props: ['psMsg'],
  data() {
    return {
      creatFormData:[{},{}],
      ruleForm: {
        value1: '',
        value2: '',
      },
      $f: {},
      formData: {
        title: '5月21日检查记录',
        formList: [{
          formTitle: '',
          type: 'input',
          label: '姓名',
          prop: 'name',
          value: '1'
        }, {
          formTitle: '',
          type: 'input',
          label: '电话',
          prop: 'name',
          value: '2'
        },]

      },
      //表单实例对象
      $f: {},
      rule: [
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
    onSubmit(formData) {
      //TODO 提交表单
      console.log(formData)
    },
    change() {
      // 修改值
      this.$data.$f.setValue("field", '1212')
    }
  },
  mounted() {
    console.log('psMsg', this.psMsg)
    this.rule = this.psMsg.templateFieldList
    // this.rule.forEach(element => {
    //   console.log(element)
    //   // element.filedList.forEach(item => {
    //   //   console.log(item)
    //   //   if(item.type=='文本型'){
    //   //     item.type='input'
    //   //   }
    //   // });
    //   element = {
    //     type: 'input',//必要-字段类型，不可改
    //     field: 'field',//必要-字段英文名
    //     title: '姓名',//必要-字段中文名
    //     col: { span: 16, labelWidth: '50%' },//不必要
    //     className: 'total-gross-wt',//不必要-样式名
    //     required: {      //不必要-配置
    //       type: 'text',
    //       clearable: true, // 是否显示清空按钮
    //       placeholder: '请输入'
    //     },
    //     validate: [{  //不必要-验证规则
    //       // pattern: /^(0|[1-9]\d*)(\s|$|\.\d{1,3}\b)/, // /^[0-9]+([.]{1}[0-9]{1,3})?$/,
    //       message: '请正确输入',
    //       required: true,
    //       trigger: 'blur'
    //     }]      }
    // });
    this.rule = [
      // 文本框
      {
        type: 'input',//必要-字段类型，不可改
        field: 'field',//必要-字段英文名
        title: '姓名',//必要-字段中文名
        col: { span: 16, labelWidth: '50%' },//不必要
        className: 'total-gross-wt',//不必要-样式名
        required: {      //不必要-配置
          type: 'text',
          clearable: true, // 是否显示清空按钮
          placeholder: '请输入'
        },
        validate: [{  //不必要-验证规则
          // pattern: /^(0|[1-9]\d*)(\s|$|\.\d{1,3}\b)/, // /^[0-9]+([.]{1}[0-9]{1,3})?$/,
          message: '请正确输入',
          required: true,
          trigger: 'blur'
        }
        ]
      },]
  }
}
</script>