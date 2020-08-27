<template>
    <div>
        <el-upload class="upload-demo" drag :show-file-list="false" :disabled="disType" :auto-upload="false" :on-change="uploadFile"
            action="https://jsonplaceholder.typicode.com/posts/">
            <!-- :http-request="uploadFile" -->
            <!-- :limit="1" -->
            <!-- :on-remove="handleRemoveFile"
        :on-exceed="handleExceed" -->
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
                <em>点击上传附件</em>
            </div>
        </el-upload>
    </div>
</template>
<script>
    import {
        uploadFuncO
    } from '@/api/upload';
    export default {
        props: {
            uploadData: Object, //上传基础数据
            uploadFuncName: String, //上传调用方法名称
            disType:Boolean
        },
        data() {
            return {}
        },
        methods: {
            async uploadFile(params) {
                let fd = new FormData();
                fd.append("file", params.raw);
                for (var key in this.uploadData) {
                    fd.append(key, this.uploadData[key])
                }
                let returnData = await uploadFuncO[this.uploadFuncName](fd);
                // 回调函数
                this.$emit('callBackFunc', returnData.data);
            }
        },
        mounted() {

        }
    }

</script>
<style>
.el-upload-dragger{
    height: 150px;
}
.uploadList .upload-demo .el-upload-dragger .el-icon-upload{
        line-height: 0;
    }
</style>
