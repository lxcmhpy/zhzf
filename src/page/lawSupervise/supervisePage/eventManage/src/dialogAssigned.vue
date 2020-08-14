<template>
  <el-dialog class="eventManage-dialogAssigned" title="选择指派人员" :visible.sync="dialogAssignedVisible">
    <el-form :model="form">
      <el-form-item label="机构" label-width="60px">
        <ElSelectTree @getValue="getValue" :options="treeOptions" :props="treeProps" :value="form.disposeOrgan" />
      </el-form-item>
      <el-form-item label="人员" label-width="60px">
        <el-select @change="handlePeopleChange" v-model="form.disposePerson" placeholder="请选择">
          <el-option
            v-for="item in peopleOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogAssignedVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import ElSelectTree from "@/components/elSelectTree/elSelectTree.vue";
import { assigned } from "@/api/eventManage";
export default {
  inject: ['page'],
  components: {
    ElSelectTree
  },
  props: {
    config: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    // 机构数据
    treeOptions() {
      return this.config.treeOptions
    },
    // 人员数据
    peopleOptions() {
      return this.config.peopleOptions
    }
  },
  data() {
    return {
      dialogAssignedVisible: false,
      form: {
        id: '', // 当前行 id
        state: '', // 状态
        disposeOrgan: '', // 选择的机构 id
        disposePerson: '', // 选择的人员 id
      },
      treeProps: {
        value: "id", // ID字段名
        label: "label", // 显示名称
        children: "children", // 子级字段名
      },
    }
  },
  methods: {
    /**
     * 获取选择到的人员
     */
    handlePeopleChange(val) {
      console.log(val)
    },

    /**
     * 获取选择到的机构
     */
    getValue(val) {
      this.form.disposeOrgan = val
      console.log(val)
    },

    /**
     * 提交表单
     */
    handleSubmit() {
      this.dialogAssignedVisible = false
      assigned(this.form).then(res => {
        if(res.code === 200) {
          this.$message({
            message: res.msg,
            type: "success"
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    },

    /**
     * 清空表单
     */
    resetForm() {
      Object.keys(this.form).map(key => {
        this.form[key] = ''
      })
    }
  },
}
</script>

<style lang="scss">
.eventManage-dialogAssigned {
  overflow: hidden;

}
</style>
