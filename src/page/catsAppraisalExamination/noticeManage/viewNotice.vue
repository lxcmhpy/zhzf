<template>
<div>
  <el-dialog
        :visible.sync="visible"
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

    <el-dialog
        :visible.sync="visible1"
        @close="closeDialog"
        :close-on-click-modal="false"
        width="1000px"
        height="1000px"
        append-to-body
        >
        <object v-if="storagePath">
            <embed class="print_info" style="padding:0px;width: 900px;margin:0 auto;height:1000px" name="plugin" id="plugin" :src="storagePath" type="application/pdf" internalinstanceid="29">
        </object>
  </el-dialog>
  </div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
  export default {
    components: {
    },
    data() {
      return {
        content : ``,
        visible : false,
        visible1: false,
        storagePath: null
    }
  },
  methods: {
      showPDF (id) {
          this.storagePath = iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST +id;
          this.visible1 = true;
      },
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
