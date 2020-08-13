<template>
  <el-dialog class="eventManage-dialogAssigned" title="选择指派人员" :visible.sync="dialogAssignedVisible">
    <el-form :model="form">
      <el-form-item label="机构" label-width="60px">
        <ElSelectTree @getValue="getValue" :options="treeOptions" :props="treeProps" />
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
import { organTreeByCurrUser, getOrganTree } from "@/api/lawSupervise.js";
import { assigned } from "@/api/eventManage";
export default {
  components: {
    ElSelectTree
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
      treeOptions: [], // 机构数据
      treeProps: {
        value: "id", // ID字段名
        label: "label", // 显示名称
        children: "children", // 子级字段名
      }, // 机构配置
      peopleOptions: [], // 人员数据
    }
  },
  methods: {
    /**
     * 给获取到的每个节点的 children 添加 执法人员、执法车辆、执法船舶子节点
     */
    addNode(arr) {
      let myNode = [
        { label: '执法人员', type: 0, children: [] },
        { label: '执法车辆', type: 2, children: [] },
        { label: '执法船舶', type: 3, children: [] },
      ]
      arr.map(item => {
        if(item.hasOwnProperty('children') && item.type!=0 && item.type!=2 && item.type!=3) {
          myNode.map(myNodeItem => {
            // 给自定义节点添加 pid 属性， 值为父节点的 id
            myNodeItem.pid = item.id
          })
          // 在 children 里添加自定义节点
          item.children = myNode.concat(item.children)
          // 递归调用
          this.addNode(item.children)
        }
      })
      return arr
    },

    /**
     * 获取数据
     */
    getTree() {
      organTreeByCurrUser().then(res => {
        if(res.code === 200) {
          return res.data
        } else {
          throw new Error("organTreeByCurrUser() in jiangXiMap.vue::::::数据错误")
        }
      }).then(data => {
        this.treeOptions = data
        // this.treeOptions = this.addNode(data)

        /**
         * 单独获取执法人员的数据
         */
        let param = {
          organId: data[0].id,
          type: 0
        }
        getOrganTree(param).then(res => {
          if(res.code === 200) {
            return res.data
          } else {
            throw new Error("getOrganTree()::::::接口数据错误")
          }
        }).then(data => {
          this.peopleOptions = data.map(item => {
            item.label = item.nickName
            item.value = item.id
            return item
          })
        })
      })
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
          tis.$message.error(res.msg)
        }
      })
    }
  },
  created() {
    this.getTree()
  }
}
</script>

<style lang="scss">
.eventManage-dialogAssigned {
  overflow: hidden;

}
</style>
