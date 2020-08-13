<template>
  <el-dialog class="eventManage-dialog" :title="title" :visible.sync="dialogFormVisible" top="0">
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <el-form :model="form" :disabled="disabled">
      <el-form-item label="事件名称" :label-width="formLabelWidth">
        <el-input v-model="form.eventName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="事件描述" :label-width="formLabelWidth">
        <el-input v-model="form.eventDescribe" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="事件时间" :label-width="formLabelWidth">
        <el-input v-model="form.eventDate" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="是否重点事件" :label-width="formLabelWidth">
        <el-radio v-model="form.isemphasis" :label='1'>是</el-radio>
        <el-radio v-model="form.isemphasis" :label='0'>否</el-radio>
      </el-form-item>
      <el-form-item label="是否需要协调" :label-width="formLabelWidth">
        <el-radio v-model="form.iscoordinator" :label='1'>是</el-radio>
        <el-radio v-model="form.iscoordinator" :label='0'>否</el-radio>
      </el-form-item>
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
      <el-form-item label="事件附件" :label-width="formLabelWidth">
        <el-upload
          action="#"
          list-type="picture-card"
          :auto-upload="false">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url" alt=""
              >
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
                >
                  <i class="el-icon-download"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="处理结果附件" :label-width="formLabelWidth">
        <el-upload
          action="#"
          list-type="picture-card"
          :auto-upload="false">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url" alt=""
              >
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
                >
                  <i class="el-icon-download"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button v-if="disabled" type="primary" @click="dialogFormVisible = false">关 闭</el-button>
      <el-button v-if="!disabled" @click="dialogFormVisible = false">取 消</el-button>
      <el-button v-if="!disabled" type="primary" @click="handleSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>addUpdate
import ElSelectTree from "@/components/elSelectTree/elSelectTree.vue";
import { addUpdate } from "@/api/eventManage";
export default {
  inject: ['page'],
  props: {
    title: {
      type: String,
      default: ""
    },
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
  components: {
    ElSelectTree
  },
  data() {
    return {
      treeProps: {
        value: "id", // ID字段名
        label: "label", // 显示名称
        children: "children", // 子级字段名
      },
      disabled: false,
      formLabelWidth: '120px',
      dialogFormVisible: false,
      form: {
        eventName: '',
        eventDescribe: '',
        eventDate: '',
        isemphasis: 1,
        iscoordinator: 1,
        disposeOrgan: '', // 选择的机构 id
        disposePerson: '', // 选择的人员 id
      },
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false
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
      addUpdate(this.form).then(res => {
        if(res.code === 200) {
          this.dialogFormVisible = false
          this.$message({
            message: res.msg,
            type: "success"
          })
          this.page.initPage()
        } else {
          this.$message.error(res.msg)
        }
      })
    },

    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    }
  }
}
</script>

<style lang="scss">
.eventManage-dialog {
  overflow: hidden;
}
</style>
