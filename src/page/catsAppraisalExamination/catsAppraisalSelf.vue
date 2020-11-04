<template>
    <div class="cats-layout-page-content">
        <div class="searchAndpageBox toggleBox">
            <p class="p1">1.对照《2020年交通运输综合行政执法检查评价指标》内容，全面开展自查。
                围绕各项工作推进情况，存在突出问题，相关整改措施形成自查报告。</p>
            <div class="uploadList">
                <uploadDrag v-if="userInfo" :disType="false" :uploadData="uploadData" :uploadFuncName="uploadFuncName"
                    @callBackFunc="callBackFunc"></uploadDrag>
                <ul>
                    <li v-for="(item,index) in fileListTwo" :key="index">
                        <div>
                            <i class="el-icon-document"></i> {{item.fileName}}
                        </div>
                        <div> &nbsp;&nbsp;
                            <a class="download" :href="item.storagePath" target="_blank">下载</a>
                            &nbsp;&nbsp;
                            <a class="delete" href="javascript:void(0)" @click="deleteFile(item,index)">删除</a>
                        </div>
                    </li>
                </ul>
                <el-button type="primary" size="cats-common" @click="confirmUpload">确认上传</el-button>
            </div>
            <div class="uploadList">
                <ul>
                    <li v-for="(item,index) in fileList" :key="index">
                        <div>
                            <i class="el-icon-document"></i> {{item.fileName}}
                        </div>
                        <div> &nbsp;&nbsp;
                            <a class="download" :href="item.storagePath" target="_blank">下载</a>
                        </div>
                    </li>
                </ul>
            </div>
            <p class="p1">2.上传推优集体及个人材料。</p>
            <div class="uploadList">
                <uploadDrag v-if="userInfo" :disType="false" :uploadData="uploadDataOne" :uploadFuncName="uploadFuncName"
                    @callBackFunc="callBackFuncOne"></uploadDrag>
                <ul>
                    <li v-for="(item,index) in fileListFour" :key="index">
                        <div>
                            <i class="el-icon-document"></i> {{item.fileName}}
                        </div>
                        <div> &nbsp;&nbsp;
                            <a class="download" :href="item.storagePath" target="_blank">
                                下载
                            </a>
                            &nbsp;&nbsp;
                            <a class="delete" href="javascript:void(0)"
                                @click="deleteFileOne(item,index)">删除</a>
                        </div>
                    </li>
                </ul>
                <el-button type="primary" size="cats-common" @click="confirmUploadOne">确认上传</el-button>
            </div>
            <div class="uploadList">
                <ul>
                    <li v-for="(item,index) in fileList2" :key="index">
                        <div>
                            <i class="el-icon-document"></i> {{item.fileName}}
                        </div>
                        <div> &nbsp;&nbsp;
                            <a class="download" :href="item.storagePath" target="_blank">
                                下载
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scope src="@/assets/scss/page/catsAppraisalExamination.scss"></style>
<script>
    import {
        getPykhOrgInfo,
        updateScore,
        updateScoreState,
        findStaffOrCaseFile,
        deleteFile,
        confirmUpload
    } from "@/api/pykh/appraisalExam.js";
    import uploadDrag from '@/components/upload/upload-drag';
    import iLocalStroage from '@/common/js/localStroage';
    import _ from "lodash";
    export default {
        data() {
            return {
                uploadData: null,
                uploadDataOne:null,
                uploadFuncName: 'uploadPykh',
                uploadReturnData: {},
                fileList: [],
                fileList2: [],
                userInfo: null,
                status: 0,
                fileListOne:[],
                fileListOneId:[],
                fileListThreeId:[],
                fileListTwo:[],
                fileListThree:[],
                fileListFour:[]
            }
        },
        methods: {
            async findStaffOrCaseFile() {
                let fileObj = await findStaffOrCaseFile();
                let list = fileObj.data.fileList;
                this.fileList=[];
                this.fileListOne=[];
                this.fileListTwo=[];
                this.fileListOneId=[];
                for (let i = 0; i < list.length; i++) {
                    if (list[i].businessTypeId == 2) {
                        this.fileListOne.push(list[i]);
                        if(list[i].organStatus==1){
                            this.fileList.push(list[i]);
                        }else{
                            this.fileListTwo.push(list[i]);
                            this.fileListOneId.push(list[i].storageId);
                        }
                    }
                }
            },
            async findStaffOrCaseFile1() {
                let fileObj = await findStaffOrCaseFile();
                let list = fileObj.data.fileList;
                this.fileList2=[];
                this.fileListFour=[];
                this.fileListThree=[];
                this.fileListThreeId=[];
                for (let i = 0; i < list.length; i++) {
                    if (list[i].businessTypeId == 5) {
                        this.fileListThree.push(list[i]);
                        if(list[i].organStatus==1){
                            this.fileList2.push(list[i]);
                        }else{
                            this.fileListFour.push(list[i]);
                            this.fileListThreeId.push(list[i].storageId);
                        }
                    }
                }
                
            },
            async findStaffOrCaseFileOne() {
                let fileObj = await findStaffOrCaseFile();
                let list = fileObj.data.fileList;
                this.fileListOne=[];
                this.fileListTwo=[];
                for (let i = 0; i < list.length; i++) {
                    if (list[i].businessTypeId == 2) {
                        this.fileListOne.push(list[i]);
                    }
                }
                for (let i = 0; i < this.fileListOne.length; i++) {
                    for (let j = 0; j < this.fileListOneId.length; j++) {
                        if (this.fileListOne[i].storageId === this.fileListOneId[j]) {
                            this.fileListTwo.push(this.fileListOne[i]);
                        }
                    }
                }
            },
            async findStaffOrCaseFileTwo() {
                let fileObj = await findStaffOrCaseFile();
                let list = fileObj.data.fileList;
                this.fileListThree=[];
                this.fileListFour=[];
                for (let i = 0; i < list.length; i++) {
                    if (list[i].businessTypeId == 5) {
                        this.fileListThree.push(list[i]);
                    }
                }
                for (let i = 0; i < this.fileListThree.length; i++) {
                    for (let j = 0; j < this.fileListThreeId.length; j++) {
                        if (this.fileListThree[i].storageId === this.fileListThreeId[j]) {
                            this.fileListFour.push(this.fileListThree[i]);
                        }
                    }
                }
            },
            callBackFunc(data) {
                this.fileListOneId.push(data);
                this.findStaffOrCaseFileOne();
            },
            callBackFuncOne(data){
                this.fileListThreeId.push(data);
                this.findStaffOrCaseFileTwo();
            },
            download(item) {
                //   storagePath
            },
            async deleteFile(item, index) {
                await deleteFile(item.storageId);
                for(let i=0;i<this.fileListOneId.length;i++){
                    if(this.fileListOneId[i]==item.storageId){
                        this.fileListOneId.splice(i, 1);
                        break;
                    }
                }
                for(let i=0;i<this.fileListTwo.length;i++){
                    if(this.fileListTwo[i].storageId==item.storageId){
                        this.fileListTwo.splice(i, 1);
                        break;
                    }
                }
            },
            async deleteFileOne(item, index) {
                await deleteFile(item.storageId);
                for(let i=0;i<this.fileListThreeId.length;i++){
                    if(this.fileListThreeId[i]==item.storageId){
                        this.fileListThreeId.splice(i, 1);
                        break;
                    }
                }
                for(let i=0;i<this.fileListFour.length;i++){
                    if(this.fileListFour[i].storageId==item.storageId){
                        this.fileListFour.splice(i, 1);
                        break;
                    }
                }
            },
            async confirmUpload() {
                let form=[];
                if (this.fileListTwo.length > 0) {
                    for(let i=0;i<this.fileListTwo.length;i++){
                        let obj={};
                        obj.organId=this.userInfo.organId;
                        obj.batchId=this.fileListTwo[i].batchId;
                        obj.fileId=this.fileListTwo[i].id;
                        form.push(obj);
                    }
                    console.log(form)
                    await confirmUpload(form);
                    this.status = 1;
                    this.findStaffOrCaseFile();
                } else {
                    this.$message.error('请上传文件');
                }
            },
            async confirmUploadOne(){
                let form1=[];
                if (this.fileListFour.length > 0) {
                    for(let i=0;i<this.fileListFour.length;i++){
                        let obj={};
                        obj.organId=this.userInfo.organId;
                        obj.batchId=this.fileListFour[i].batchId;
                        obj.fileId=this.fileListFour[i].id;
                        form1.push(obj);
                    }
                    await confirmUpload(form1);
                    this.status = 1;
                    this.findStaffOrCaseFile1();
                } else {
                    this.$message.error('请上传文件');
                }
            }
        },
        created() {
            this.userInfo = iLocalStroage.gets('userInfo');
            this.uploadData = {
                businessId: this.userInfo.organId, //业务id
                businessTypeId: '2' //业务类型id
            }
            this.uploadDataOne={
                businessId: this.userInfo.organId, //业务id
                businessTypeId: '5' //业务类型id
            }
        },
        mounted() {
            this.findStaffOrCaseFile();
            this.findStaffOrCaseFile1();
        },
        updated() {},
        components: {
            uploadDrag
        }
    }

</script>
