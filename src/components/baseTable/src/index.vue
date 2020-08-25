<template>
  <div class="BaseTable">
    <!-- 表单 -->
    <el-form :inline="true" :model="form" class="BaseTable-form">
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
      class="BaseTable-table"
      empty-text
      :height="tableAttr.height"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        v-if="tableAttr.isSelection"
        align="center"
        type="selection"
        width="60">
      </el-table-column>
      <el-table-column v-if="tableAttr.isRadio" align="center" label="单选" width="60">
        <template slot-scope="scope">
          <el-radio v-model="radio" :label="scope.$index" @change="change(scope.row)"></el-radio>
        </template>
      </el-table-column>
      <el-table-column v-if="tableAttr.isNumber" align="center" label="序号" type="index" width="100">
      </el-table-column>
      <el-table-column
        v-for="item of columns"
        :type="item.type"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :align="item.align"
        :width="item.width">
      </el-table-column>
      <el-table-column v-if="buttons" :label="buttons.label" :align="buttons.align">
        <template slot-scope="scope">
          <el-button
            v-for="item of buttons.list"
            :key="item.name"
            :type="item.type"
            size="mini"
            @click="handleClick(scope.$index, scope.row, item.name)">{{item.name}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="BaseTable-pagination">
      <div class="selectBtns">
        <el-button size="small" type="primary" @click="handleSubSelect">确定</el-button>
        <el-button size="small" type="primary" @click="handleCloseSelect">取消</el-button>
      </div>
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
    tableData: {
      type: Array,
      default() {
        return []
      }
    },
    buttons: {
      type: Object,
      default: null
    },
    pageAttr: {
      type: Object,
      default() {
        return {
          current: 1,
          size: 5,
          total: 100
        }
      }
    },
    tableAttr: {
      type: Object,
      default() {
        return {
          height: '299',
        }
      }
    }
  },
  computed: {
    current() {
      return this.pageAttr.current
    },
    size() {
      return this.pageAttr.size
    },
    total() {
      return this.pageAttr.total
    }
  },
  data() {
    return {
      radioRow: '', // 单选时选中的行数据
      multipleSelection: [], // 复选框选中的数据
      radio: '',
      form: {}
    }
  },
  methods: {
    /**
     * 初始化 form
     */
    init() {
      const form = {}
      this.inputList.map(item => {
        form[item.prop] = ''
      })
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
      this.$emit('handleSubmit', this.form)
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
      this.$emit('handleSizeChange', val)
    },

    /**
     * 切换页
     */
    handleCurrentChange(val) {
      this.$emit('handleCurrentChange', val)
    },

    /**
     * 点击单选框
     */
    change(row) {
      this.radioRow = row
    },

    /**
     * 点击复选框
     */
    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    /**
     * 点击确定
     */
    handleSubSelect() {
      if(this.tableAttr.isRadio) {
        this.$emit('handleSubSelect', this.radioRow)
      } else if (this.tableAttr.isSelection) {
        this.$emit('handleSubSelect', this.multipleSelection)
      }
    },

    /**
     * 点击取消
     */
    handleCloseSelect() {
      if(this.tableAttr.isRadio) {
        this.radio = ''
        this.radioRow = ''
      } else if (this.tableAttr.isSelection) {
        this.$refs.multipleTable.clearSelection()
      }
      this.$emit('handleCloseSelect')
    }
  },
  created() {
    this.init()
  }
}
</script>

<style lang="scss">
.BaseTable {
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
  }
  &-pagination {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    .selectBtns {
      display: flex;
      justify-content: flex-start;
      .el-button {
        border-radius: 4px;
      }
    }
    .el-pagination__jump {
      .el-input__inner {
        border-radius: 4px;
      }
    }
  }
}
</style>
