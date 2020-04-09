<template>
    <div style="width:100%;float:left;margin-top:30px;margin-bottom:30px;">
        <div style="margin-top:20px;margin-bottom:20px;margin-left:25px;margin-bottom:30px;">
            <font style="font-size:25px;"><span class="titleflag"></span>身份证</font>
        </div>
        <div ref="idNoXX" class="block" style="margin-left:20px;float:left">
            <el-upload
                action="#"
                multiple
                list-type="picture-card"
                :limit="2"
                :auto-upload="false"
                :on-exceed="handleExceed"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-change="handleChange"
                :file-list="idNoFiles">
                <div size="small" type="button" >点击上传</div>
                <div slot="tip" class="el-upload__tip" style="margin-left:160px;margin-top:25px;width:100%">
                    只能上传jpg/png文件，且不超过500kb
                </div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </div>
    </div>
</template>
<script>
export default {
    name:'materialIdNo',//身份证证明材料
    data(){
        return {
            imageUrl: '',
            idNoFiles: [],
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false
        }
    },
    methods:{
        handleChange(file,fileList){
            let _this=this
            if(fileList.length>0){//已经上传了文件
                _this.$refs.idNoXX.children[0].children[1].style="margin-top:270px;"
            }else{
                _this.$refs.idNoXX.children[0].children[1].style="margin-top:-10px;"
            }
            if(fileList.length>1){//文件上传了多个时
                for(var i=0;i<fileList.length-1;i++){
                    _this.$refs.idNoXX.children[0].children[0].children[i].style="margin-right:60px;"
                }
            }
        },
        handleRemove(file,fileList) {
            let _this=this
            if(fileList.length>0){//已经上传了文件
                _this.$refs.idNoXX.children[0].children[1].style="margin-top:270px;"
            }else{
                _this.$refs.idNoXX.children[0].children[1].style="margin-top:-10px;"
            }
        },
        handlePreview(file) {
//            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.error(`当前限制选择 2 个文件，本次选择了 ${fileList.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },

    }
}
</script>
<style lang="scss">
@import "@/assets/css/personManage.scss";
.el-upload el-upload--picture-card{
    float:left;
    margin-top:160px;
}
.el-upload--picture-card {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 120px;
    height: 45px;
    line-height: 45px;
    vertical-align: top;
    float:left;
    margin-top:-10px;
    margin-left:20px;
}
.el-upload-list--picture-card .el-upload-list__item {
    overflow: hidden;
    background-color: #fff;
    border: 1px solid    #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 390px;
    height: 250px;
    margin: 0 8px 8px 0;
    display: inline-block;
    margin-left: 120px;
}
.el-upload-list--picture-card .el-upload-list__item-actions span + span {
    margin-left: 35px;
    margin-top: 110px;
}
</style>
