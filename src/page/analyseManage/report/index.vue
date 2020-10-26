<template>
  <div style="width: 100%; height: 100%; position: relative">
    <div
      role="dialog"
      aria-modal="true"
      aria-label="报告下载"
      class="el-dialog"
      style="margin-top: 15vh; width: 30%"
    >
      <div class="el-dialog__header">
        <span class="el-dialog__title">报告下载</span
        ><!---->
      </div>
      <div class="el-dialog__body">
        <span data-v-5ed4c0e5="" class="download-con"
          ><img
            data-v-5ed4c0e5=""
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB30lEQVRYR+2Xu07DQBBF79gJCCjpgIoSWgookNLxB1Q8FCctBeLRxikRLwnRoWwIfAipgIKCJnwBNJQgHFCwB01ioyUSthF20mQLW/Lae4/u7nhmCP7Iq48ZA24ewByAXPA84XsdwJ0Hs1q1hh9kbZKLVXmziaiUsFjockxkq/xImdZqzmTWxWMvxQOtlokpKijnCMBmPwAAHAvANYCFPgHcCAD3SbwtOwAIdYCZy4bnSey2B5vmVdR2/fWbSABVGLNFtHj2mosL8JdvBgADB/7nAFEDzLN6ZEgU9OYQEjU8NpYNuDU/hXdCtScAvrjkdEu9TxO8cwCLyQP4OfvHf0ATD6y3Km8TIEMReClZB7oBMplTsT2oZvS9X6u9jGfdTIWZ71M7A6459KyLSyUViAnM6gWPZVvOTnIAmgNSM+riBeXsAtjTLReInM2Zuk2fcX/fscNQt9uqOBtEOPlOUtrJ19+Lkz/CATQHgoULqlkE+Kw7K3Y7kYoDRdVcYfDlbym5G+L/DjCXv8UMg4m5nZrDhkDo81Hl/qAkEwekzEqrFYvasboA7APYjnozpfkD8pvSRkoCoct6MGc7zWm1WYpzwpOEDEK2DSDDb1K3AMyn2KrdALhtmTi8WB99Et0vNPjNACijb+oAAAAASUVORK5CYII="
            alt=""
          />案件人员专题报告
          <!-- <a
            data-v-5ed4c0e5=""
            :href="downloadhttp"
            target="_blank"
            download="专题报告"
            title="下载"
            class="download"
            >下载</a -->
          <router-link to="reportView">查看并下载</router-link>
        </span>
      </div>
      <div class="el-dialog__footer">
        <span data-v-5ed4c0e5="" class="dialog-footer"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { createPDF } from "@/api/analysis/analysisManage.js";
export default {
  name: "index",
  data() {
    return {
      downloadhttp:
        localStorage.getItem("baseURL") +
        "/sjfx/export/word/" +
        JSON.parse(localStorage.getItem("userInfo")).organId,
      dialogVisible: true,
    };
  },
  mounted() {
    // this.createPDF();
  },
  methods: {
    async createPDF() {
      let id = JSON.parse(localStorage.getItem("userInfo")).organId;
      await createPDF(id);
    },
  },
};
</script>

<style scoped>
.download-con img {
  width: 20px;
  margin-right: 7px;
  vertical-align: text-top;
  margin-left: 10px;
}

.download-con .download {
  text-decoration: underline;
}
</style>
