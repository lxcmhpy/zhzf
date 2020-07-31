<!--
    附件上传及列表
    作者：程方元
-->
<!-- 视图  -->
<template>
    <section class="file-upload-grid">
        <el-card class="box-card u-my-card" shadow="naver">
            <div slot="header" class="clearfix">
                <!-- <span>附件信息</span>
                <el-tooltip content="添加">
                    <el-button size="mini" @click="onShowAddDialog" icon="el-icon-ex-add" style="float:right;"></el-button>
                </el-tooltip> -->
                <span>{{title}}</span>
                <div v-if="inputShow && !isDetail" class="u-file-button" style="float:right;">
                    <el-button type="primary" size="small" class="u-button-mini">添加</el-button>
                    <input type="file" multiple
                           v-bind:accept="acceptType"
                           v-on:change="onFileChange"/>
                </div>
            </div>
            <!-- <el-table :data="table.data" border style="width:100%;border:0px;" show-summary :summary-method="summaryMethod">
                <el-table-column type="index" label="#" width="60" align="center"></el-table-column>
                <el-table-column prop="fkzhmc" label="转出账户"></el-table-column>
                <el-table-column prop="skzhmc" label="转入账户"></el-table-column>
                <el-table-column prop="zzje" label="划转金额"></el-table-column>
                <el-table-column prop="bz" label="备注" show-overflow-tooltip></el-table-column>
                <el-table-column prop="op" label="操作" align="center" width="100">
                    <template slot-scope="scope">
                        <el-tooltip :enterable="false" content="删除">
                            <el-button @click="onDelete(scope.$index)" size="mini" icon="el-icon-ex-close" class="u-button-mini"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table> -->
            <el-table :data="files" stripe style="width: 100%" highlight-current-row  height="100%">
                <el-table-column type="index" width="55"> </el-table-column>
                <el-table-column prop="accName" label="附件名称" align="center"></el-table-column>
                <el-table-column prop="accType" label="类型" align="center"></el-table-column>
                <el-table-column prop="accUpTime" label="上传日期" align="center"></el-table-column>
                <el-table-column prop="accPersonName" label="上传人" align="center"></el-table-column>
                <el-table-column prop="op" label="操作" align="center" width="120">
                    <template slot-scope="scope">
                        <el-tooltip content="预览" placement="top" v-if="scope.row.accType === '图片'">
                            <el-button type="text" @click="previewFile(scope.row)">预览</el-button>
                        </el-tooltip>
                        <el-tooltip content="删除" placement="top">
                            <el-button type="text" @click="removeFile(scope.row,scope.$index)">删除</el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <el-dialog :visible.sync="dialogPreviewVisible" width="80%">
            <img v-if="dialogPreviewType === '图片' " width="100%" :src="dialogPreviewUrl" alt="">
            <video v-if="dialogPreviewType === '音视频' " width="100%" controls>
                <source :src="dialogPreviewUrl" type="video/mp4" />
            </video>
            <!-- <object v-if="dialogPreviewType === '其他附件' ">
              <embed class="print_info" style="padding:0px;width: 900px;margin:0 auto;height:1000px" name="plugin" id="plugin" :src="dialogPreviewUrl" type="application/pdf" internalinstanceid="29">
            </object> -->
        </el-dialog>
        <!-- <el-dialog
          :visible.sync="dialogPDFVisible"
          width="1000px"
          height="1000px"
          append-to-body
          >
          <object>
              <embed class="print_info" style="padding:0px;width: 900px;margin:0 auto;height:1000px" name="plugin" id="plugin" :src="dialogPDFUrl" type="application/pdf" internalinstanceid="29">
          </object>
        </el-dialog> -->

    </section>
</template>
<!-- 模型  -->
<script>
import iLocalStroage from "@/common/js/localStroage";
import {upload,findFileByIdApi,deleteFileByIdApi} from "@/api/upload";
export default {
    props:{
        title: {
            required: true
        },
        files: {
            required: true
        },
        isDetail: {
            type: Boolean,
            default: false
        },
        acceptType:{
            type: String,
            default: ""
        }
        
    },
    data:function () {
        return {
            inputShow: true,
            storageIds:[],
            dialogPreviewType:"",
            dialogPreviewUrl:false,
            dialogPreviewVisible:false
        };
    },
    computed: {

    },
    watch: {

    },
    mounted: function () {
        
    },
    methods: {
        onFileChange (e) {
            var input = e.target;
            var files = input.files;
            let nickname = iLocalStroage.gets("userInfo").nickName;
            let userId = iLocalStroage.gets("userInfo").id;
            debugger;
            var fs = [];
            for (var i = 0; i < files.length; i++) {
                var file = files[i];

                fs.push({
                    id: i,
                    accName: file.name,
                    accType: this.getType(file),
                    accPersonName:nickname,
                    accPersonId:userId,
                    accUpTime: (new Date()).format("yyyy-MM-dd HH:mm:ss"),
                    file: file
                });
            }

            for (var i = 0; i < fs.length; i++) {
                this.files.push(fs[i]);
            }
            this.saveFiles(fs);

            this.inputShow = false;
            var that = this;
            setTimeout(function () {
                that.inputShow = true;
            }, 50);
        },
        getType (file){
            let fileType= this.$util.getFileType(file.name);
            console.log('给附件类型赋值',fileType);
            let fType = "";
            if(fileType == 'image'){ //图片
                fType = '图片'
            }else if(fileType == 'video' || fileType == 'radio'){
                fType = '音视频'
            }else{
                fType = '其他附件'
            }
            return fType;
        },
        saveFiles(fs){
            for (var i = 0; i < fs.length; i++) {
                var param = fs[i];
                
                this.saveFile(param)
            }
        },
        saveFile (param) {
            var fd = new FormData()
            fd.append("file", param.file);
            fd.append("category", '涉案财物管理');
            fd.append("fileName", param.file.name);
            fd.append('status', param.accType)//传记录id
            fd.append('caseId', param.file.name+new Date().getTime())//传记录id
            fd.append('docId', param.file.name+new Date().getTime())//传记录id
            let _this = this
            upload(fd).then(
                res => {
                    _this.storageIds.push({
                        url:iLocalStroage.gets('CURRENT_BASE_URL').PDF_HOST+'/'+res.data[0].storageId,
                        storageId:res.data[0].storageId,
                        name:res.data[0].fileName
                    });
                    let file = _this.files.find(item => item.id === param.id);
                    file.accUrl = res.data[0].storageId;
                    // file.url = iLocalStroage.gets('CURRENT_BASE_URL').PDF_HOST+'/'+res.data[0].storageId;
                },
                error => {
                    console.log(error)
                }
            );
        },

        removeFile (file,i) {
            if(file.accUrl){
                this.deleteFile(file);
            }
            this.files.splice(i, 1);
        },
        //删除附件
        deleteFile(file){
            let _this = this
            deleteFileByIdApi(file.accUrl).then(res=>{
                 _this.$message({
                    type: "success",
                    message:"操作成功!"
                  });
                // _this.storageIds.splice(_this.storageIds.findIndex(item => item.storageId === file.accUrl), 1)
            },err=>{
                console.log(err)
            })
        },

        previewFile(file) {
            this.dialogPreviewType = file.accType;
            this.dialogPreviewUrl = iLocalStroage.gets('CURRENT_BASE_URL').PDF_HOST+'/'+file.accUrl;
            this.dialogPreviewVisible = true;
        },

        // getFiles () {
        //     return $util.clone(this.storageIds, true);
        // },

    }
}
</script>
<style lang="scss" scoped src="@/assets/css/propertyManage.scss"></style>
