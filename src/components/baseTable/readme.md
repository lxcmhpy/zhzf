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
height  | 表格高度 | String | / | 299 | 否
columns  | 表头 | Array | / | / | 是
tableData  | table数据 | Array | / | / ｜ 是
buttons  | 表格中的操作按钮 | Array | / | / ｜ 否
pageData | 分页条相关参数 | Object | / | / ｜ 是

### PageData Attributes

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
      :inputList="inputList"
      :columns="columns"
      :tableData="tableData"
      :buttons="buttons"
      :pageData="pageData" />
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
          label: "序号",
          type: "index",
          align: "center",
          width: "100"
        },
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
      buttons: {
        label: '操作',
        align: "center",
        list: [
          { type: 'text', name: '编辑' },
          { type: 'text', name: '删除' },
        ]
      },
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
      pageData: {
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
