
# 这是一个表格组件，集合连表单和分页栏，组件预览图见 index.png

## Form Attributes

参数     | 说明 | 类型 | 可选值 | 默认值
-------- | ----- | ----- |:-----:|:-----:
inputList  | 表单项 | Array | / | /

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

### Form Events

事件名称 | 说明 | 回调参数
-------- | ----- | ----- |
handleSubmit  | 点击搜索触发 | form (表单对象)

## Table Attributes

参数     | 说明 | 类型 | 可选值 | 默认值 | 是否必传
-------- | ----- |:-----:|:-----:|:-----:|----
tableAttr  | 表格属性 | Object | / | / | 否
columns  | 表头 | Array | / | / | 是
tableData  | table数据 | Array | / | / | 是
buttons  | 表格中的操作按钮 | Array | / | /|否
pageAttr | 分页条相关参数 | Object | / | / |是

### PageAttr Attributes

参数     | 说明 | 类型 | 可选值 | 默认值
-------- | ----- |:-----:|:-----:|:-----:
height  | 表格高度 | String | / | 299
isRadio  | 表格行可单选 | Boolean |  | false
isSelection  | 表格行可多选 | Boolean | / | false
isNumber | 显示序号列 ｜ Boolean ｜ / ｜ false

>- 注意： isRadio 和 isSelection 不能同时为 true， 否则会出错。

### PageAttr Attributes

参数     | 说明 | 类型 | 可选值 | 默认值
-------- | ----- |:-----:|:-----:|:-----:
current  | 当前页码 | Number | / | 1
size  | 每页显示条数 | Number | 5, 10, 20, 30 | 5
total  | 总条数 | Number | / | 100

### Table Events

事件名称 | 说明 | 回调参数
-------- | ----- | ----- |
handleClick  | 点击操作列按钮触发 | index,row,name |
handleSizeChange | 切换每页显示的条数 | val (每页显示条数) |
handleCurrentChange | 切换当前页 | val (当前页码) |

> 组件使用示例：

```html
<template>
  <div class="qsfTest">
    <BaseTable
      @handleSubmit="handleSubmit"
      @handleClick="handleClick"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      @handleSubSelect="handleSubSelect"
      @handleCloseSelect="handleCloseSelect"
      :buttons="buttons"
      :inputList="inputList"
      :columns="columns"
      :tableData="tableData"
      :pageAttr="pageAttr"
      :tableAttr="tableAttr" />
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
      tableAttr: {
        height: '299',
        isRadio: true, // 显示单选框
        isSelection: false, // 显示多选框
        isNumber: true, // 显示序号列
      },
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
          label: "日期",
          prop: 'date',
        },
        {
          label: "姓名",
          prop: 'name',
        },{
          label: "地址",
          align: "center",
          prop: 'address',
          width: "230"
        },
      ],
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
      ],
      buttons: {
        label: '操作',
        align: "center",
        list: [
          { type: 'text', name: '编辑' },
          { type: 'text', name: '删除' },
        ]
      },
      pageAttr: {
        current: 1,
        size: 5,
        total: 100
      }
    }
  },
  methods: {
    /**
     * 提交表单
     */
    handleSubmit(data) {
      console.log(data)
    },

    /**
     * 点击表格按钮
     */
    handleClick(index, row, name) {
      console.log(index, row, name)
    },

    /**
     * 切换每页显示的条数
     */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },

    /**
     * 切换页
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },

    /**
     * 单选或复选后点击确定
     */
    handleSubSelect(row) {
      console.log(row)
    },

    /**
     * 点击取消按钮
     */
    handleCloseSelect() {
      console.log('取消')
    }
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
