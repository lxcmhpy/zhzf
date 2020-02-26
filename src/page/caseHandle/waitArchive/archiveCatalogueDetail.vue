<template>
<div class="containerBox box searchPage">
    <div class="back"><i class="el-icon-arrow-left"></i>返回</div>
    <div class="tablePart">
        <el-table
            :data="caseList"
            border
            stripe
            highlight-current-row
            style="width: 100%">
            <el-table-column width="50" type="index" label="序号" align="center"></el-table-column>
            <el-table-column prop="name" label="文书名称" align="center"></el-table-column>
            <el-table-column prop="page" label="起止页数" align="center"></el-table-column>
            <el-table-column label="顺序调整" align="center">
                <template>
                    <div>
                        <span class="iconfont law-desc blueC"></span>
                        <span class="iconfont law-asc blueC"></span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="附件关联" align="center">
                <template slot-scope="scope">
                    <span @click="showDialog(scope.row)" class="iconfont law-add blueC"></span>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog
        title="附件关联"
        :visible.sync="operateVisible"
        custom-class="dialog1"
        @close="closeDialog"
        append-to-body
        :close-on-click-modal="false">
        <div class="alignCenter">
            <el-button :class="{'btn-1':true, 'blueBg': relationFileVisible}" @click="bindEvidence">绑定已有证据材料</el-button>
            <br><br><br>
            <el-button :class="{'btn-1':true}" @click="showAddEvidence">新增证据材料附件</el-button>
        </div>
    </el-dialog>
    <el-dialog
        title="上传证据"
        :visible.sync="addEvidenceVisible"
        custom-class="dialog1"
        @close="closeDialog"
        append-to-body
        width="740px"
        :close-on-click-modal="false"
        >
        <div>
            <div style="float: left;width: 370px">
                <el-upload
                        class="upload-demo"
                        drag
                        :http-request="uploadFile"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text"><em>点击上传附件</em></div>
                    <div class="el-upload__tip" slot="tip" style="text-align: center">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </div>
            <div style="float:left;width:300px">
                <el-form ref="evidenceForm" :model="uploadForm" :rules="addrules" label-width="100px">
                    <el-form-item label="证据类型" prop="evType" >
                        <el-select v-model="uploadForm.evType" >
                            <el-option
                            v-for="item in evTypeOptions"
                            :key="item"
                            :label="item"
                            :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="证据名称" prop="evName" >
                        <el-input v-model="uploadForm.evName" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="记 录 人" prop="recordName" >
                        <el-input v-model="uploadForm.recordName" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="记录时间" prop="createTime" >
                        <el-date-picker
                            v-model="uploadForm.createTime"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            format="yyyy-MM-dd HH:mm:ss"
                            range-separator="—"
                            placeholder="选择日期时间" >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="取证地点" prop="evPlace">
                        <el-input v-model="uploadForm.evPlace" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="状  态" prop="status">
                        <el-radio-group v-model="uploadForm.status">
                            <el-radio label="0">有效</el-radio>
                            <el-radio label="1">无效</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="备  注" prop="remark" >
                        <el-input
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 4}"
                            placeholder="请输入"
                            v-model="uploadForm.remark">
                        </el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div style="clear:both;text-align:center">
                <el-button size="medium" type="primary" @click="submitForm('evidenceForm')">提  交</el-button>
                <el-button size="medium" @click="addEvidenceVisible=false">取  消</el-button>
            </div>
        </div>
    </el-dialog>
    <el-dialog
        title="附件关联"
        :visible.sync="relationFileVisible"
        @close="closeDialog1"
        custom-class="dialog1 fullscreen"
        :close-on-click-modal="false"
        width="1000px"
         append-to-body>
         <div style="position:relative;">
            <div class="">
                <el-table
                    :data="evidenceList"
                    border
                    stripe
                    highlight-current-row
                    @selection-change="handleSelectionChange"
                    style="width: 100%">
                    <el-table-column width="55" type="selection" label="选择" align="center"></el-table-column>
                    <el-table-column width="50" type="index" label="序号" align="center"></el-table-column>
                    <el-table-column prop="evName" label="证据名称" align="center"></el-table-column>
                    <el-table-column prop="evType" label="证据类型" align="center"></el-table-column>
                    <el-table-column prop="status" label="状态" align="center">
                    </el-table-column>
                    <el-table-column label="详情" align="center">
                        <template slot-scope="scope">
                            <span>{{scope.row.evPath}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="备注" align="center">
                    </el-table-column>
                </el-table>
            </div>
            <div style="text-align:right;margin-top:17px">
                <el-button size="medium" type="primary" @click="submitForm('evidenceForm')">继续添加</el-button>
                <el-button size="medium" class="greenBg2" @click="next">确认</el-button>
            </div>
         </div>
    </el-dialog>
    <!-- :direction="direction" -->
    <!-- :before-close="handleClose" -->
    <el-drawer
    title="附件关联"
    :visible.sync="enclosureVisible"
    >
        <span>附件列表</span>
    </el-drawer>
    <!--快速入口 -->
    <caseSlideMenu :activeIndex="'archiveCatalogue'" @showArchiveCatalogue="showArchiveCatalogue"></caseSlideMenu>
    <!-- 卷宗目录 -->
    <archiveCatalogue ref="archiveCatalogueRef" :caseInfo="caseInfo"></archiveCatalogue>
</div>
</template>
<script>
import archiveCatalogue from "./archiveCatalogue";
import caseSlideMenu from "@/page/caseHandle/components/caseSlideMenu";
import {
 uploadEvApi,
 findFileByIdApi,
 uploadEvdence
} from "@/api/upload";
import iLocalStroage from "@/common/js/localStroage";
import {validateRequire} from '@/common/js/validator'
export default {
    data () {
        return {
            caseInfo: this.$route.params.caseInfo,
            caseList: this.$route.params.caseList,
            operateVisible: false,
            relationFileVisible: false,
            evidenceList: [],
            currentDocObj: [],
            addEvidenceVisible: false,
            uploadForm: {
                id: '',
                caseId: '',
                evName: '',
                evType: '',
                status: '',
                fileId: '',
                status: '',
                remark: ''
            },
            addrules: {
                evType: [
                    { required: true, message: '证据类型不能为空', trigger: 'blur' , validator: validateRequire },
                    { required: true, message: '证据类型不能为空', trigger: 'change' , validator: validateRequire }
                ],
                evName: [
                    { required: true, message: '证据名称不能为空', trigger: 'blur' },
                ],
                recordName: [
                    { required: true, message: '记录人不能为空', trigger: 'blur' },
                ],
                createTime: [
                    { required: true, message: '记录时间不能为空', trigger: 'blur' },
                ],
                evPlace: [
                    { required: true, message: '取证地点不能为空', trigger: 'blur' },
                ],
                status: [
                    { required: true, message: '状态不能为空', trigger: 'blur' },
                ]
            },
            evTypeOptions: ['证据'], //'文书',
            enclosureVisible: false,
            multipleSelection: null
            // isTrue: false
        }
    },
    methods: {
        handleSelectionChange (val) {
            debugger
            this.multipleSelection = val;
        },
        showAddEvidence () {
            this.addEvidenceVisible = !this.addEvidenceVisible
        },
        next () {
            this.enclosureVisible = true
            this.addEvidenceVisible = false
            this.operateVisible = false
        },
        uploadFile(param){
            console.log(param);
            var fd = new FormData()
            fd.append("file", param.file);
            fd.append('data', {
                caseId: this.currentDocObj.caseId,
                docId:  this.currentDocObj.docId,
                category: '证据',
                userId: iLocalStroage.get('userInfo').id
            })
            // fd.append('caseId',this.currentDocObj.caseId)
            // fd.append('docId', this.currentDocObj.docId);
            // let category = '证据'
            // fd.append('category', category);
            // fd.append('userId', iLocalStroage.get('userInfo').id)
            uploadEvdence(fd).then(
                res => {
                    debugger
                    // this.addEvidence(res.data, param, category, 0)
                // this.formData.payEvidence = res.data;
                // this.formData.payEvidence.push(res.data);
                },
                error => {
                console.log(error)
                }
            );
        },
        submitForm(formName){
            let _that = this
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    _that.addEvidence(_that.uploadForm);
                }
            });
        },
        // 添加证据
        addEvidence(data) {
            this.$store.dispatch('saveOrUpdateEvidence', data).then(
                res => {
                    debugger;
                },
                error => {
                    console.log(error)
                }
            )
        },
        //点击卷宗目录后 显示卷宗目录
        showArchiveCatalogue(){
            this.$refs.archiveCatalogueRef.showModal();
        },
        // 绑定已有证据材料
        bindEvidence (row) {
            this.relationFileVisible = true
            this.$store.dispatch('getByCondition', {
                caseId: this.currentDocObj.caseId
            }).then(
                res=>{
                    this.evidenceList = res.data.records
                },
                err=>{
                console.log(err)
                }
            )
        },
        showDialog (row) {
            this.operateVisible = true
            this.currentDocObj = row
        },
        closeDialog () {
            this.operateVisible = false
        },
        closeDialog1 () {
            this.relationFileVisible = false
        }
    },
    mounted () {
        console.log(this.caseList)
    },
    components: {
        caseSlideMenu, archiveCatalogue
    }
}
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
<style lang="scss" scoped>
@import "@/assets/css/documentForm.scss";
@import "@/assets/css/basicStyles/common.scss";
</style>
