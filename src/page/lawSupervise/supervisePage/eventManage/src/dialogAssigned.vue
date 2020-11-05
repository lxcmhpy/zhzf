<template>
  <el-dialog class="eventManage-dialogAssigned" title="选择指派人员" :visible.sync="dialogAssignedVisible" @open="handleOpen">
    <el-form :model="form" :rules="rules" ref="dialogForm">
      <el-form-item label="机构" label-width="60px" prop="disposeOrgan">
        <ElSelectTree ref="elSelectTree" @getValue="getValue" :options="treeOptions" :props="treeProps" :value="form.disposeOrgan" />
      </el-form-item>
      <el-form-item label="人员" label-width="60px" prop="disposePerson">
        <el-select v-model="form.disposePerson" filterable multiple placeholder="请选择">
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
import store from "../store.js";
export default {
  inject: ['page'],
  mixins: [store],
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
      rules:{
          disposeOrgan:[{required: true, message: "请选择机构", trigger: "blur"}],
          disposePerson:[{required: true, message: "请选择人员", trigger: "blur"}]
      }
    }
  },
  computed: {
    // 机构数据
    treeOptions() {
      return this.config && this.config.treeOptions
    },
    // 人员数据
    peopleOptions() {
      return this.config && this.config.peopleOptions
    }
  },
  methods: {
    /**
     * 打开弹窗时的回调
     */
    handleOpen() {
      this.$emit('handleOpen')
    },

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
      this.$refs.elSelectTree.$children[0].handleClose();
      this.form.disposeOrgan = val
      this.$set(this.form,'disposePerson','')
      this.getPerson(val)
    },

    /**
     * 提交表单
     */
    handleSubmit() {
      this.$refs['dialogForm'].validate(valid => {
        if (valid) {
          this.form.disposePerson = JSON.stringify(this.form.disposePerson)
          assigned(this.form).then(res => {
            if(res.code === 200) {
            this.dialogAssignedVisible = false
            this.$message({
              message: res.msg,
              type: "success"
            })
            // this.page.initPage()
            this.$emit('successDialogAssigned')
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
  },
}
</script>

<style lang="scss">
.eventManage-dialogAssigned {
  overflow: hidden;

}
</style>
