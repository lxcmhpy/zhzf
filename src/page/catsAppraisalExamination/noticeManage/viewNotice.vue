<template>
  <el-dialog
    :visible.sync="visible11"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="80%"
    append-to-body
  >
  <el-row>
    <el-col :span="24">
      <el-card :body-style="{ padding: '0px' }">
        <p v-html="content" />
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
        content : ``,
        visible11 : false
    }
  },
  methods: {
      showModal(content) {
        this.visible11 = true;
        this.content = content;
      },
      closeDialog() {
        this.visible11 = false;
      },
    },
    computed: {
    }
  }

</script>
