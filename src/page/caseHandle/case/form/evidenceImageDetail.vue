<template>
<div>
<el-dialog title="附件详情" :modal="false" :visible.sync="visible"
    :show-close="false" width="30%" class= "detailDialog" :append-to-body="true">
      <div>
        <div style="float: left;width: 45%">
        <el-form ref="form" :model="form">
         
          <!-- <img v-if="form.storageId" :src="host+form.storageId"  width="430px" height="400" align="center"/> -->
          <img v-if="form.evType =='照片'" :src="form.myFileUrl"  width="430px" height="400" align="center"/>
          <video v-if="form.evType =='音视频'" :src="form.videoStreamSrc" controls="controls" width="400px" height="380">your browser does not support the video tag</video>
        </el-form>
        </div>
      </div>
    </el-dialog> 
   
</div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
export default {
    data(){        
        return{
            visible: false,
            form:{}
        }
    },
    methods:{
        showModal(data) {
            console.log("详情",data);
            this.visible = true;
            this.form = {
                id: data.id,
                caseId: data.caseId,
                evName: data.evName,
                evPath: data.evPath,
                evType: data.evType,
                userName: data.userName,
                storageId: data.storageId,
                createTime: data.createTime,
                recordPlace: data.recordPlace,
                status: data.status,
                note: data.note,
                myFileUrl:data.myFileUrl,
                videoStreamSrc:data.videoStreamSrc
            };
        },
    },
    mounted(){
    }
}
</script>
<style lang="scss" src="@/assets/css/systemManage.scss"></style>
<style lang="scss">
/* @import "@/assets/css/systemManage.scss"; */
.detailDialog{
    .el-dialog__body {
        height  :400px;
    }
}
</style>