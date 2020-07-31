<!-------长软------->
<template>
    <div class="com_searchAndpageBoxPadding hasBigMarginRight">
        <div class="searchAndpageBox searchAndpageBox2">
        <el-form ref="form" :model="form.propertyInvolvedForm" :rules="rules" size="small" label-width="150px">
            <el-card class="box-card" shadow="never">
                <div slot="header" class="clearfix">
                    <span>基本信息</span>
                </div>
                <div>
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="财务名称" prop="propertyName">
                                <el-input v-model="form.propertyInvolvedForm.propertyName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-col :span="18">
                                <el-form-item label="财务数量" prop="propertyNum">
                                    <el-input v-model="form.propertyInvolvedForm.propertyNum" placeholder="请输入" ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label-width="0" prop="propertyNumUnit">
                                    <el-select v-model="form.propertyInvolvedForm.propertyNumUnit" placeholder="单位" 
                                    @focus="getUnits('涉案财物-单位','unitOptions')"
                                    >
                                        <el-option
                                        v-for="value in unitOptions"
                                        :key="value.id"
                                        :label="value.name"
                                        :value="value.name"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="财物归属人/单位" prop="propertyBelonger">
                                <el-input v-model="form.propertyInvolvedForm.propertyBelonger"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="财物状态">
                                <el-input v-model="form.propertyInvolvedForm.propertyState"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="保管单位" prop="saveUnit">
                                <el-input v-model="form.propertyInvolvedForm.saveUnit"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="保管人员">
                                <el-input v-model="form.propertyInvolvedForm.savePerson"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="保存地点">
                                <el-input v-model="form.propertyInvolvedForm.savePlace"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="保管方式">
                                <el-input v-model="form.propertyInvolvedForm.saveWay"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="登记时间">
                                <el-input v-model="form.propertyInvolvedForm.registrationTime"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="登记人">
                                <el-input v-model="form.propertyInvolvedForm.registrant"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="保管期限">
                                <el-select v-model="form.propertyInvolvedForm.storagePeriod" placeholder="请选择" style="width: 100%">
                                    <el-option
                                    v-for="(item,index) in syqxList"
                                    :key="index"
                                    :label="item + '天'"
                                    :value="item"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="财物描述">
                                <el-input type="textarea" v-model="form.propertyInvolvedForm.propertyDescribe"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="备注">
                                <el-input type="textarea" v-model="form.propertyInvolvedForm.remarks"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-card>

            <!-- <el-card class="box-card" shadow="never" style="margin-top:15px;">
                <div slot="header" class="clearfix">
                    <span>附件信息</span>
                    <el-button style="float: right; padding: 3px 0" size="small">添加</el-button>
                </div>
                <div>
                    <el-table :data="files" stripe style="width: 100%" highlight-current-row  height="100%">
                        <el-table-column type="index" width="55"> </el-table-column>
                        <el-table-column prop="caseNumber" label="附件名称" align="center" width="200"></el-table-column>
                        <el-table-column prop="name" label="类型" align="center" width="150"></el-table-column>
                        <el-table-column prop="caseCauseName" label="上传日期" align="center"></el-table-column>
                        <el-table-column prop="caseType" label="上传人" align="center" width="100"></el-table-column>
                        <el-table-column prop="op" label="操作" align="center">
                            <template slot-scope="scope">
                                <el-tooltip content="预览" placement="top">
                                    <el-button icon="el-icon-search" @click="previewFile(scope.row)" circle></el-button>
                                </el-tooltip>
                                <el-tooltip content="删除" placement="top">
                                    <el-button icon="el-icon-delete" @click="deleteFile(scope.row)" circle></el-button>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-card> -->
            <div class="deliver"></div>
            <fileUploadGrid ref="files" :files="form.accs" title="附件信息"></fileUploadGrid>
            <div class="deliver"></div>
            <caseBindGrid ref="cases" :datas="cases" title="案件信息"></caseBindGrid>
            <div class="deliver"></div>
            <el-card class="box-card" shadow="never">
                <div slot="header" class="clearfix">
                    <span>处理方式</span>
                </div>
                <div>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="处理方式">
                                <el-radio-group v-model="form.dispose.disposeWay">
                                    <el-radio 
                                    v-for="(item,index) in handleWayList"
                                    :key="index"
                                    :label="item">
                                        {{item}}
                                    </el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="其他">
                                <el-input type="textarea" v-model="form.dispose.disposeRemark"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
                
            <div style="margin:15px;text-align:center;">
                <el-button size="medium" type="primary" @click="submitForm()">保存</el-button>
            </div>
        </el-form>
        </div>
    </div>
</template>

<script>
import iLocalStroage from "@/common/js/localStroage";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import caseListSearch from "@/components/caseListSearch/caseListSearch";
import fileUploadGrid from "./fileUploadGrid.vue";
import caseBindGrid from "./caseBindGrid.vue";
import {findPropertyById,savePropertyInvolved} from "@/api/propertyManage";

export default {
    components:{
        fileUploadGrid,
        caseBindGrid
    },
    data() {
        return {
            form:{
                propertyInvolvedForm: {
                    propertyNumUnit:"",
                    propertyName:"",
                    propertyState:"",
                    registrationTime:"",
                    propertyNum:"",
                    saveUnit:"",
                    registrant:"",
                    propertyBelonger:"",
                    savePerson:"",
                    storagePeriod:"",
                    propertyNo:"",
                    saveWay:"",
                    savePlace:"",
                    remarks:"",
                    propertyDescribe:"",
                },
                caseIds:[],
                accs:[],
                dispose:{
                    disposeWay:"",
                    disposeRemark:"",
                    disposePersonId: iLocalStroage.gets("userInfo").id,
                    disposePersonName: iLocalStroage.gets("userInfo").nickName,
                }
            },
            rules:{
                propertyName: [{required: true,message: "请输入财务名称",trigger: "blur"}],
                propertyNum: [{required: true, message: "请输入财务数量", trigger: "blur"}],
                propertyNumUnit: [{required: true, message: "请选择单位", trigger: "change"}],
                propertyBelonger: [{required: true, message: "请输入财物归属人/单位", trigger: "blur"}],
                saveUnit: [{required: true, message: "请输入保管单位", trigger: "blur"}]
            },
            unitOptions:[],
            handleWayList:["封存","扣押","退回当事人","移交法院","销毁","其他"],
            syqxList:[30,90,180,360],
            // files:[],
            cases:[],
            // storageIds:[]
        };
    },
    methods: {
        
        // saveFiles(){
        //     for (var i = 0; i < this.files.length; i++) {
        //         var file = this.files[i];
        //         let fileType= this.$util.getFileType(param.file.name);
        //         console.log('给附件类型赋值',fileType);
        //         let fType = "";
        //         if(fileType == 'image'){ //图片
        //             fType = '图片'
        //         }else if(fileType == 'video' || fileType == 'radio'){
        //             fType = '音视频'
        //         }else{
        //             fType = '其他附件'
        //         }
        //         this.saveFile(file,fType)
        //     }
        // },
        // saveFile (param,type) {
        //     var fd = new FormData()
        //     fd.append("file", param.file);
        //     fd.append("category", '涉案财物管理');
        //     fd.append("fileName", param.file.name);
        //     fd.append('status', type)//传记录id
        //     fd.append('caseId', param.file.name+new Date().getTime())//传记录id
        //     fd.append('docId', param.file.name+new Date().getTime())//传记录id
        //     let _this = this
        //     upload(fd).then(
        //         res => {
        //             _this.storageIds.push({
        //                 url:iLocalStroage.gets('CURRENT_BASE_URL').PDF_HOST+'/'+res.data[0].storageId,
        //                 storageId:res.data[0].storageId,
        //                 name:res.data[0].fileName
        //             });
        //         },
        //         error => {
        //             console.log(error)
        //         }
        //     );
        // },
        // setFiles () {
        //     for (var i = 0; i < this.files.length; i++) {
        //         var file = this.files[i];
        //         this.form.accs.push(file);
        //         // this.saveFile(param)
        //     }
        // },
        setCaseIds (){
            let cases = this.$refs.cases.getCaseData();
            for (var i = 0; i < cases.length; i++) {
                this.form.caseIds.push(cases[i].id);
            }
        },
        submitForm(){
            let _this = this
            this.$refs['form'].validate(valid => {
                if (valid) {
                    savePropertyInvolved(_this.form).then(
                        res => {
                            _this.$message({type: "success",message:"保存成功!"});
                            _this.$router.push(({ name: 'case_handle_viewProperty',params: {id:res.data}}));
                        },
                        err => {
                            console.log(err);
                        }
                    );
                }
            });

        },

        //点击下拉框的时候后头获取下拉框数据
        getUnits(name, codeName) {
            if (this.unitOptions.length === 0) {
                this.$store.dispatch("findAllDrawerByName", name).then(
                //查询单位
                res => {
                    if (res.code === 200) {
                        this.unitOptions = res.data;
                    } else {
                        console.info("没有查询到数据");
                    }
                }
                );
            }
        },

        //获取已归档的数据
        async getData(id) {
            let res = await findPropertyById(id);
            this.form = res.data;
        },
        
    },
    mounted(){
        if(this.$route.params.id !== "add"){
            this.getData(this.$route.params.id);
        }
    },
    created() {
        
    }
};
</script>
<style scope>
.deliver{
    height: 15px
}
</style>