<template>
    <div>
        <el-dialog :visible.sync="visible" @close="closeDialog" :close-on-click-modal="false" width="1000px"
            height="1000px" append-to-body>
            <template slot="title">
                <div class="ql-title">
                    {{title}}
                </div>
            </template>
            <!-- <el-row>
          <el-col :span="24">
          <el-card :body-style="{ padding: '0px' }"> -->
            <div class="ql-container ql-snow">
                <div class="ql-editor">
                    <div v-html="content"></div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer" v-show="showBtn">
                <el-button type="primary" @click="read">
                    <i class="el-icon-position"></i> 已阅，发送回执
                </el-button>
            </div>
            <!-- </el-card>
          </el-col>
      </el-row> -->
        </el-dialog>

        <el-dialog :visible.sync="visible1" @close="closeDialog" :close-on-click-modal="false" width="1000px"
            height="1000px" append-to-body>
            <template slot="title">
                <div class="ql-title">
                    {{title}}
                </div>
            </template>
            <iframe class="print_info" style="padding:0px;width: 960px;margin:0 auto;height:500px" title="dd"
                :src="'/static/pdf/web/viewer.html?file='+encodeURIComponent(storagePath)"
                ></iframe>
            <div slot="footer" class="dialog-footer" v-show="showBtn">
                <el-button type="primary" @click="read">
                    <i class="el-icon-position"></i> 已阅，发送回执
                </el-button>
            </div>
            <!-- <object v-if="storagePath">
              <embed class="print_info" style="padding:0px;width: 900px;margin:0 auto;height:1000px" name="plugin" id="plugin" :src="storagePath" type="application/pdf" internalinstanceid="29">
          </object> -->
        </el-dialog>
    </div>
</template>
<script>
    import iLocalStroage from "@/common/js/localStroage";
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import {
        clickNotice
    } from '@/api/pykh/appraisalExam.js';
    import {
        getFileStreamByStorageId
    } from '@/api/pykh/catsAppraisalExamCaseUpload.js'
    export default {
        data() {
            return {
                content: ``,
                visible: false,
                visible1: false,
                storagePath: null,
                title: '',
                noticeId: '',
                showBtn: false
            }
        },
        inject: ["reload"],
        methods: {
            async read() {
                let data = await clickNotice(this.noticeId);
                this.showBtn = data.data;
                this.$alert('发送成功！');
                this.closeDialog();
                this.reload();
            },
            showPDF(row) {
                this.showBtn = row.isRead === 'N' ? true : false;
                this.noticeId = row.id;
                this.title = row.title;
                this.$util.com_getFileStream(row.storageId).then((res) => {
                    this.storagePath = res;
                  });
                    console.log(this.storagePath)
                this.visible1 = true;
            },
            showNewPDF(row) {
                this.showBtn = row.isRead;
                this.noticeId = row.id;
                this.title = row.title;
                getFileStreamByStorageId(row.storageId).then(res => {
                    const blob = new Blob([res], {
                        type: 'application/pdf;charset-UTF-8'
                    });
                    let objectUrl = window.URL.createObjectURL(blob);
                    this.storagePath=objectUrl;
                })
                this.visible1 = true;
            },
            showModal(data, row) {
                this.noticeId = row.id;
                this.visible = true;
                this.title = row.title;
                this.content = data.content;
                let status = parseInt(data.status);
                this.showBtn = status == 0 ? true : false;
            },
            closeDialog() {
                this.visible = false;
            }
        }
    }

</script>
<style type="scss">
    .ql-container *{
    line-height: 1.7em;
    font-family: '宋体';
    }
    .ql-title {
    text-align: center;
    font-family: '宋体';
    font-size:22px;
    font-weight:bolder;
    margin: 30px 20px 10px 30px;
    }
    .ql-container.ql-snow {
    min-height: 550px;
    border:0px;
}
</style>
