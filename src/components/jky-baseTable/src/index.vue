<template>
  <div class="jky-baseTable">
    <!-- 表单 -->
    <el-form v-if="inputList.length !== 0" :inline="true" :model="form" class="jky-baseTable-form">
      <el-form-item
        v-for="(item, index) in inputList"
        :key="index"
        :label="item.label">
        <!-- type 为 'select' 时显示选择框 -->
        <el-select
          size="small"
          v-if="item.type === 'select'"
          v-model="form[item.prop]"
          :placeholder="item.placeholder"
          :clearable="item.clearable"
          :disabled="item.disabled">
          <el-option
            v-for="selectItem in item.options"
            :key="selectItem.value"
            :label="selectItem.label"
            :value="selectItem.value">
          </el-option>
        </el-select>
        <!-- 根据 type 类型显示不同的时间选择框 -->
        <el-date-picker
          size="small"
          v-else-if="item.type === 'year' || item.type === 'month' || item.type === 'date' || item.type === 'dates' || item.type === 'week' || item.type === 'datetime' || item.type === 'datetimerange' || item.type === 'daterange' || item.type === 'monthrange'"
          v-model="form[item.prop]"
          :clearable="item.clearable"
          :value-format="item.valueFormat"
          :type="item.type"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <!-- 默认显示输入框 -->
        <el-input
          v-else
          size="small"
          v-model="form[item.prop]"
          :clearable="item.clearable"
          :disabled="item.disabled"
          :placeholder="item.placeholder"></el-input>
      </el-form-item>
      <el-form-item class="basetableBtnList">
        <el-button class="basetableButton" size="small" type="primary" icon="el-icon-search" @click="onSubmit">搜索</el-button>
        <el-button class="basetableButton" size="small" type="primary" icon="el-icon-refresh-left" @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- table 表格 -->
    <el-table
      ref="multipleTable"
      class="jky-baseTable-table"
      empty-text
      :height="height"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        v-if="isSelection"
        align="center"
        type="selection">
      </el-table-column>
      <el-table-column v-if="isRadio" align="center" label="单选">
        <template slot-scope="scope">
          <el-radio v-model="radio" :label="scope.$index" @change="change(scope.row)"></el-radio>
        </template>
      </el-table-column>
      <el-table-column v-if="isNumber" align="center" label="序号" type="index">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        v-for="item of columns"
        :type="item.type"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :align="item.align"
        :width="item.width">
      </el-table-column>
      <el-table-column v-if="buttons" :label="buttons.label" :align="buttons.align" :width="buttons.width">
        <template slot-scope="scope">
          <span v-for="item of buttons.list" :key="item.name" class="tableBtns">
            <i v-if="item.type === 'icon'" :class="item.class" />
            <el-button
              v-else
              :type="item.type"
              size="mini"
              @click="handleClick(scope.$index, scope.row, item.name)">{{item.name}}</el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="jky-baseTable-pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { findData } from "../store.js";
export default {
  props: {
    inputList: {
      type: Array,
      default() {
        return []
      }
    },
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    buttons: {
      type: Object,
      default: null
    },
    height: {
      type: String,
      default: '299'
    },
    isSelection: {
      type: Boolean,
      default: false
    },
    isRadio: {
      type: Boolean,
      default: false
    },
    isNumber: {
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      default: ''
    },
    baseUrlType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      radio: '',
      form: {},
      tableData: [],
      current: 1,
      size: 5,
      total: 5 // 默认 5 条
    }
  },
  methods: {
    /**
     * 获取数据，带 baseUrlType
     */
    findTableData(param, baseUrlType, url) {
      findData(param, baseUrlType, url).then(res => {
        if(res.code === 200) {
          return res.data
        } else {
          throw new Error("findData()::::::接口错误")
        }
      }).then(data => {
        this.total = data.total
        this.tableData = data.records
      })
    },

    /**
     * 初始化 form , 获取数据
     */
    init() {
      let form = {}
      this.inputList.map(item => {
        form[item.prop] = ''
      })
      this.form = form

      const param = {
        current: 1,
        size: 5,
      }
      this.findTableData(param, this.baseUrlType, this.url)
    },

    /**
     * 重置，清空表单
     */
    handleReset() {
      Object.keys(this.form).map(key => {
        this.form[key] = ''
      })
    },

    /**
     * 查询
     */
    onSubmit() {
      let param = {
        current: 1,
        size: this.size
      }
      Object.keys(this.form).map(key => {
        // 如果当前值为时间选择框的值，则将其拆为 startDate endDate 两个属性
        if(this.form[key] instanceof Array) {
          param.startDate = this.form[key][0]
          param.endDate = this.form[key][1]
        } else {
          param[key] = this.form[key]
        }
      })
      this.findTableData(param, this.baseUrlType, this.url)
    },

    /**
     * 点击表格按钮
     */
    handleClick(index, row, name) {
      this.$emit('handleClick', index, row, name)
    },

    /**
     * 切换每页显示的条数
     */
    handleSizeChange(val) {
      this.size = val
      this.current = 1

      let param = {
        current: 1,
        size: val
      }
      Object.keys(this.form).map(key => {
        // 如果当前值为时间选择框的值，则将其拆为 startDate endDate 两个属性
        if(this.form[key] instanceof Array) {
          param.startDate = this.form[key][0]
          param.endDate = this.form[key][1]
        } else {
          param[key] = this.form[key]
        }
      })

      this.findTableData(param, this.baseUrlType, this.url)
      console.log(`每页 ${val} 条`);
    },

    /**
     * 切换页
     */
    handleCurrentChange(val) {
      this.current = val
      let param = {
        current: val,
        size: this.size
      }

      Object.keys(this.form).map(key => {
        // 如果当前值为时间选择框的值，则将其拆为 startDate endDate 两个属性
        if(this.form[key] instanceof Array) {
          param.startDate = this.form[key][0]
          param.endDate = this.form[key][1]
        } else {
          param[key] = this.form[key]
        }
      })

      this.findTableData(param, this.baseUrlType, this.url)
      console.log(`当前页: ${val}`);
    },

    /**
     * 点击单选框
     */
    change(row) {
      this.$emit('handleChange', row)
    },

    /**
     * 点击复选框
     */
    handleSelectionChange(val) {
      this.$emit('handleChange', val)
    },
  },
  created() {
    this.init()
  }
}
</script>

<style lang="scss">
.jky-baseTable {
  &-form {
    .el-form-item__content {
      .el-input__inner {
        border-radius: 4px;
      }
    }
    .el-input {
      .el-input__inner {
        border-radius: 4px;
      }
    }
    .basetableBtnList {
      .el-form-item__content {
        .basetableButton.el-button {
          border-radius: 4px;
        }
      }
    }
  }
  &-table {
    .el-radio {
      .el-radio__label {
        display: none;
      }
    }
    .tableBtns {
      margin-right: 5px;
      .el-button {
        border-radius: 4px;
      }
    }
  }
  &-pagination {
    text-align: right;
    margin-top: 10px;
    .el-pagination__jump {
      .el-input__inner {
        border-radius: 4px;
      }
    }
  }
}
</style>
