
# 这是一个表格组件，集合连表单和分页栏，组件预览图见 index.png

## Form Attributes

参数     | 说明 | 类型 | 可选值 | 默认值  | 是否必传
-------- | ----- | ----- |:-----:|:-----:|----
url  | 请求地址 | String | / | / | 是
baseUrlType | 请求地址类型 | String | / | / | 否
inputList  | 表单项 | Array | / | / | 否

### InputList Attributes

参数     | 说明 | 类型 | 可选值 | 默认值
-------- | ----- |:-----:|:-----:|:-----:
label  | 表单项名称 | String | / | /
prop  | 表单项属性 | String | / | /
placeholder  | 占位符 | / | / | /
disabled  | 是否禁用 | Boolean | true/false | false
clearable | 是否可清空 | Boolean | true/false | /
type | 表单项类型 | String | / | 输入框
valueFormat | value格式(表单项为时间选择器时启用) | String | / | /

```javascript
// type 的可选值
'year'、'month'、'date'、'dates'、'week'、'datetime'、'datetimerange'、'daterange'、'monthrange'"
```

## Table Attributes

参数     | 说明 | 类型 | 可选值 | 默认值 | 是否必传
-------- | ----- |:-----:|:-----:|:-----:|----
height  | 表格高度 | String | / | 299 | 否
isRadio | 表格是否可单选 | Boolean | / | false | 否
isSelection | 表格是否可多选 | Boolean | / | false | 否
isNumber | 是否显示序号列 | Boolean | / | false | 否
columns  | 表头 | Array | / | / | 是
tableData  | table数据 | Array | / | / | 是
buttons  | 表格中的操作按钮 | Array | / | /|否

>- 注意： isRadio 和 isSelection 不能同时为 true， 否则会出错。

buttons 属性示例：

```javascript
buttons: {
  label: '操作',
  align: "center",
  // width: '100',
  list: [
    { type: 'text', name: '编辑' },
    { type: 'primary', name: '指派' },
    { type: 'icon', class: 'el-icon-delete' },
  ]
},
```

### Table Events

事件名称 | 说明 | 回调参数
-------- | ----- |:-----:|
handleClick  | 点击操作列按钮触发 | index,row,name |
handleChange | 选择行时触发  |   当前选择的数据 |

> 组件使用示例：

```html
<template>
  <div class="qsfTest">
    <BaseTable
      @handleClick="handleClick"
      @handleChange="handleChange"
      :buttons="buttons"
      :inputList="inputList"
      :columns="columns"
      :url="url"
      :isRadio="true"
      :isNumber="true" />
  </div>
</template>

<script>
import BaseTable from "@/components/baseTable"
export default {
  components: {
    BaseTable
  },
  data() {
    return {
      url: "/case/road/roadLcDeploy/list",
      inputList: [
        {
          label: '姓名',
          prop: 'name',
          placeholder: '请输入姓名',
          disabled: false
        },
        {
          label: '部门',
          prop: 'event',
          placeholder: '请选择',
          type: 'select',
          options: [
            { value: 'cgw', label: '城管委' },
            { value: 'jtb', label: '交通部' },
            { value: 'hbj', label: '环保局' },
          ],
          clearable: true,
          disabled: false
        },
        {
          label: '日期时间',
          prop: 'dateTime',
          type: 'datetimerange',
          valueFormat: 'yyyy-MM-dd HH:mm:ss',
          disabled: false
        },
      ],
      columns: [
        {
          label: "事件名称",
          align: "center",
          prop: 'roadLcName',
        },
        {
          label: "是否标准",
          align: "center",
          prop: 'roadLcBz',
        },{
          label: "事件类型",
          align: "center",
          prop: 'roadLcType',
        },{
          label: "长度",
          align: "center",
          prop: 'roadLcPrice',
        },{
          label: "时间",
          align: "center",
          prop: 'createTime',
        },
      ],
      // 表格中的操作列，不传此参数则不显示操作列
      buttons: {
        label: '操作',
        align: "center",
        // width: '100',
        list: [
          { type: 'text', name: '编辑' },
          { type: 'primary', name: '指派' },
          { type: 'icon', class: 'el-icon-delete' },
        ]
      },
    }
  },
  methods: {
    /**
     * 点击表格按钮
     */
    handleClick(index, row, name) {
      console.log(index, row, name)
    },

    /**
     * 点击单选或者复选框
     */
    handleChange(data) {
      console.log(data)
    },
  }
}
</script>

<style lang="scss">
.qsfTest {
  box-sizing: border-box;
  padding: 20px;
  background: #FFFFFF;
}
</style>

```
