# 这是一个对话框嵌套表格的组件，表格用的 jky-baseTable 组件

### Attributes

参数     | 说明 | 类型 | 可选值 | 默认值 | 是否必传
-------- | ----- |:-----:|:-----:|:-----:|----
title  | 对话框标题 | String | / | / | 否
dialogVisible | 是否显示对话框 | Boolean | / | false | 是
width | 组件宽度 | String | / | 70% | 否

### Events

事件名称 | 说明 | 回调参数
-------- | ----- |:-----:|
handleSubmit  | 点击确定的回调 | - |
open  | Dialog 打开的回调 | - |
opened  | Dialog 打开动画结束时的回调 | - |
close  | Dialog 关闭的回调 | - |
closed  | Dialog 关闭动画结束时的回调 | - |

### 其他属性详见 jky-baseTable/readme.md

### 本组件用法示例

```html
<template>
  <div class="qsfTest">
    <el-button type="primary" @click="handleOpen">打开对话框</el-button>
    <JkyDialogTable
      @handleClick="handleClick"
      @handleChange="handleChange"
      @handleSubmit="handleSubmit"
      @handleClose="handleClose"
      :buttons="buttons"
      :inputList="inputList"
      :columns="columns"
      :url="url"
      :isRadio="true"
      :isNumber="true"
      :dialogVisible="dialogVisible"
      title="事件列表" />
  </div>
</template>

<script>
import JkyDialogTable from "@/components/jky-dialogTable";
export default {
  components: {
    JkyDialogTable
  },
  data() {
    return {
      dialogVisible: false,
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
        width: '150',
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

    /**
     * 点击确定
     */
    handleSubmit() {
      this.dialogVisible = false
      console.log('确定')
    },

    /**
     * 点击取消
     */
    handleClose() {
      this.dialogVisible = false
      console.log('取消')
    },

    /**
     * 打开对话框
     */
    handleOpen() {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss">
.qsfTest {
  box-sizing: border-box;
  padding: 20px;
}
</style>
```
