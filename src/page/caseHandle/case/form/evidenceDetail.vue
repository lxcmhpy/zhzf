<template>
<div>
<el-dialog title="证据详情" :modal="false" :visible.sync="visible"
    :show-close="false" width="60%" class= "detailDialog" :append-to-body="true">
      <div>
        <div style="float: left;width: 45%">
         
        <el-form ref="form" :model="form">
          <img v-if="form.evType =='照片'" :src="myFileUrl"  width="350px" height="400" align="center"/>
          <video v-if="form.evType =='音视频'" :src="myFileUrl" controls="controls" width="350px" height="400">your browser does not support the video tag</video>
          <div v-if="form.evType=='其他附件'" style="text-align: center;margin-top:100px;">
              <div><i class="el-icon-document" style="font-size:45px;"></i></div>
              <div style="margin: 15px;line-height: 35px">{{form.evName}}</div>
          </div>
        </el-form>
        </div>
        <div style="float: right;width: 55%">
          <el-form ref="form" :model="form">
            <el-form-item label="证据类型" prop="evType" label-width="113px">
              <!-- <el-select v-model="form.evType" style="width: 100%">
                <el-option
                  v-for="item in evTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select> -->
              <el-input v-model="form.evType" placeholder="请输入" disabled></el-input>
            </el-form-item>
            <el-form-item label="证据名称" prop="evName" label-width="113px">
              <el-input v-model="form.evName" placeholder="请输入" disabled></el-input>
            </el-form-item>
            <el-form-item label="记 录 人" prop="userName" label-width="113px">
              <el-input v-model="form.userName" placeholder="请输入" disabled></el-input>
            </el-form-item>
            <el-form-item label="记录时间" prop="createTime" label-width="113px" >
              <el-date-picker
                v-model="form.createTime"
                type="datetime"
                placeholder="选择日期时间" style="width: 100%" disabled>
              </el-date-picker>
            </el-form-item>
            <el-form-item label="取证地点" prop="recordPlace" label-width="113px">
              <el-input v-model="form.recordPlace" placeholder="请输入" disabled></el-input>
            </el-form-item>
            <el-form-item label="状  态" prop="status" label-width="113px">
              <el-radio-group v-model="form.status">
                <el-radio :label="0" disabled >有效</el-radio>
                <el-radio :label="1" disabled >无效</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="备  注" prop="note" label-width="113px">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入"
                v-model="form.note" disabled>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-dialog> 
    <!-- <evidenceCatalogue @showEvidenceDetail="showEvidenceDetail"></evidenceCatalogue> -->
</div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";

export default {
    data(){        
        return{
            visible: false,
            form:{
              evName:'',
              evPath:'',
              evType:'',
              userName:'',
              createTime:'',
              recordPlace:'',
              note:'',
              status:''
            },
            myFileUrl:''
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
                createTime: data.createTime,
                recordPlace: data.recordPlace,
                status: data.status,
                note: data.note
            };
            this.$util.com_getFileStream(data.evPath).then(res=>{
             this.myFileUrl = res
            });
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