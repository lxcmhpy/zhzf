<template>
  <el-dialog title="新增机构" custom-class="leftDialog" :visible.sync="visible" top="0" width="40%">
    <el-form :model="addOrganForm" :rules="rules" ref="addOrganForm" label-width="80px" class="addOrganClass">
      <div class="item">
        <el-form-item label="机构名称" prop="name">
            <el-input v-model="addOrganForm.name"></el-input>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="上级机构" prop="parentName">
            <el-input v-model="addOrganForm.name"></el-input>
        </el-form-item>
      </div>
      
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="visible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      addOrganForm: {
          name:'',
          parentName:'',
      },
      rules: {
          name: [
            { required: true, message: '请输入机构名称', trigger: 'blur' }
          ]
      }
    };
  },

  methods: {
    showModal() {
      this.visible = true;
    }
  }
};
</script>