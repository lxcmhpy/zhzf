<template>
  <JkyDialogTable
    url="/zfjg/event/manage/list"
    :isSelection="true"
    :dialogVisible="dialogVisible"
    :inputList="inputList"
    :columns="columns"
    :buttons="buttons"
    @handleClick="handleClick"
    @handleChange="handleChange"
    @handleSubmit="handleSubmit"
    @handleClose="handleClose" />
</template>

<script>
import JkyDialogTable from "@/components/jky-dialogTable"
import { findData, assignedMore } from "@/api/eventManage";
export default {
  name: "EventDialogList",
  props: {
    personId: {
      type: String,
      default: ""
    },
    organId: {
      type: String,
      default: ""
    }
  },
  components: {
    JkyDialogTable
  },
  data() {
    return {
      dialogVisible: false,
      inputList: [
        {
          label: '事件名称',
          prop: 'eventName',
          placeholder: '请输入事件名称',
          disabled: false
        },
        {
          label: '事件状态',
          prop: 'state',
          placeholder: '请选择',
          type: 'select',
          options: [
            { value: '2,3,4,5', label: '全部' },
            { value: 2, label: '待指派' },
            { value: 3, label: '已指派待处理' },
            { value: 4, label: '处理中' },
            { value: 5, label: '处理完毕' },
          ],
          clearable: true,
          disabled: false
        },
        {
          label: '事件时间',
          prop: 'eventDate',
          type: 'datetimerange',
          valueFormat: 'yyyy-MM-dd HH:mm:ss',
          disabled: false
        },
      ],
      columns: [
        {
          label: "事件名称",
          align: "center",
          prop: 'eventName',
        },
        {
          label: "事件描述",
          align: "center",
          prop: 'eventDescribe',
        },
        {
          label: "事件时间",
          align: "center",
          prop: 'eventDate',
        },
        {
          label: "是否重点事件",
          align: "center",
          prop: 'isemphasis',
          render: (h, params) => {
            return h('span', { class: { 'order_status_color_orang': true }},
                      params.row.isemphasis ? '是' : '否')
          }
        },
        {
          label: "事件状态",
          align: "center",
          prop: 'state',
          render: (h, params) => {
            return h('span', { class: { 'order_status_color_orang': true }},
              params.row.state === 1 ? '待上报'
                : params.row.state === 2 ? '待指派'
                  : params.row.state === 3 ? '已指派待处理'
                    : params.row.state === 4 ? '处理中'
                      : params.row.state === 5 ? '处理完毕' : null
            )
          }
        },
      ],
      buttons: {
        label: '操作',
        align: "center",
        // width: '100',
        list: [
          { type: 'text', name: '详情' },
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
    handleSubmit(data) {
      let ids = data.map(item => {
        return item.id
      })
      let params = {
        ids: ids,
        disposePerson: this.personId,
        disposeOrgan: this.organId
      }
      assignedMore(params).then(res => {
        if(res.code === 200) {
          this.dialogVisible = false
        } else {
          this.$message.error('绑定失败')
        }
      })
    },

    /**
     * 点击取消
     */
    handleClose() {
      this.dialogVisible = false
      console.log('取消')
    },
  }
}
</script>
