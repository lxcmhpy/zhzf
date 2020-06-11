<template>
  <el-dialog
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="80%"
  >
  <el-row>
    <el-col :span="24">
      <el-card :body-style="{ padding: '0px' }">
        <p :v-html="content" />
    </el-card>
      </el-col>
</el-row>
  </el-dialog>
</template>
<script>
  export default {
    components: {
    },
    data() {
      return {
        content : "",
        visible : false
    }
  },
  methods: {
      showModal(content) {
        this.visible = true;
        this.content = content;
      },
      closeDialog() {
        this.visible = false;
      },
    },
    computed: {
    }
  }

</script>
