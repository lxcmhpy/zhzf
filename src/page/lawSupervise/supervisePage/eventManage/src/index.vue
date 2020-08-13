<template>
  <div class="eventManage">

    <!-- 表单 -->
    <el-form :inline="true" :model="form" class="eventManage-form">
      <el-form-item label="事件名称" prop="eventName">
        <el-input v-model="form.eventName" placeholder="输入法规名称"></el-input>
      </el-form-item>
      <el-form-item label="是否重点事件" prop="isemphasis">
        <el-select @change="handleIsemphasis" v-model="form.isemphasis" clearable placeholder="请选择">
          <el-option label="是" :value="1"></el-option>
          <el-option label="否" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="事件时间" prop="eventDate">
        <el-date-picker
          @change="handleEventDate"
          :editable="false"
          value-format="yyyy-MM-dd HH:mm:ss"
          v-model="form.eventDate"
          size="small"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
    </el-form>

    <!-- 按钮 -->
    <div class="eventManage-buttonList">
      <el-button @click="handleFind" type="primary" icon="el-icon-search" size="small">查询</el-button>
      <el-button type="primary" size="small">重置</el-button>
      <el-button @click="addEvent" type="primary" size="small">新增事件</el-button>
    </div>

    <!-- 表格 -->
    <div class="eventManage-table">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          align="center"
          prop="eventName"
          label="事件名称">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          align="center"
          prop="eventDescribe"
          label="事件描述">
        </el-table-column>
        <el-table-column
          align="center"
          prop="eventDate"
          label="事件时间">
        </el-table-column>
        <el-table-column
          align="center"
          label="是否重点事件">
          <template slot-scope="scope">
            <span>{{ scope.row.isemphasis ? '是' : '不是' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="事件状态">
          <template slot-scope="scope">
            <span>{{ scope.row.state===1?'待处理':scope.row.state===2?'处理中':scope.row.state===3?'处理完毕':null }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="eventDate"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleAssigned(scope.$index, scope.row)">指派</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleDetails(scope.$index, scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 详情和新增弹窗 -->
    <Dialog ref="dialog" :title="title" />

    <!-- 指派弹窗 -->
    <DialogAssigned ref="dialogAssigned" />
  </div>
</template>

<script>
import Dialog from "./dialog.vue";
import DialogAssigned from "./dialogAssigned.vue";
import store from "../store.js";
export default {
  mixins: [store],
  components: {
    Dialog,
    DialogAssigned
  },
  data() {
    return {
      title: "", // 弹出框标题
      form: {
        eventName: '',
        isemphasis: '',
        eventDate: '',
      },
      tableData: []
    }
  },
  methods: {
    /**
     * 页面初始化
     */
    initPage() {
      let params = { current:1, size:5 }
      this.getData(params)
    },

    /**
     * 选择是否重点
     */
    handleIsemphasis(val) {
      console.log(val)
    },

    /**
     * 选择时间
     */
    handleEventDate(val) {
      console.log(val)
    },

    /**
     * 查询
     */
    handleFind() {
      let params = {
        current: 1,
        size: 5,
        eventName: this.form.eventName,
        isemphasis: this.form.isemphasis,
        startDate: this.form.eventDate[0],
        endDate: this.form.eventDate[0],
      }
      this.getData(params)
    },

    /**
     * 指派
     */
    handleAssigned(index, row) {
      // 打开指派弹窗
      this.$refs.dialogAssigned.dialogAssignedVisible = true
      this.$refs.dialogAssigned.form.state = row.state
      this.$refs.dialogAssigned.form.id = row.id
      console.log(index, row)
    },

    /**
     * 新增事件
     */
    addEvent() {
      this.title = "新增事件"
      // 打开弹窗
      this.$refs.dialog.dialogFormVisible = true
      // 启用表单
      this.$refs.dialog.disabled = false
    },

    /**
     * 详情
     */
    handleDetails() {
      this.title = "事件详情"
      // 打开弹窗
      this.$refs.dialog.dialogFormVisible = true
      // 禁用表单
      this.$refs.dialog.disabled = true
    },
  },
  created() {
    this.initPage()
  }
}
</script>

<style lang="scss">
.eventManage {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 15px;
  background: #FFFFFF;
  &-buttonList {
    display: flex;
    justify-content: flex-start;
  }
  &-table {
    margin-top: 30px;
  }
}
</style>
