<template>
    <el-form :inline="true" :model="addPersonForm" label-position="right"  label-width="140px" ref="addPersonForm">
        <el-row style="height:1px;">
            <el-form-item label="id" prop="personId" v-show="false">
                <el-input v-model="addPersonForm.personId"></el-input>
            </el-form-item>
        </el-row>
        <el-row style="height:36px;">
            <el-form-item label="姓名:" prop="personName">
                <el-input v-model="addPersonForm.personName" style="width:260px;"></el-input>
            </el-form-item>
            <el-form-item label="学历:" prop="degreeName">
                <el-select v-model="addPersonForm.degreeName" clearable  placeholder="选择学历" 
                    remote  style="width:260px;"
                    @focus="getDegreeInfo('0a9499dd0612b0b2950acacedf47b97a','degrees')"
                    visible-change
                    @change="selectDegree">
                    <el-option
                        v-for="(value,index) in degrees" :key="index" :label="value.name" :value="value.id">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-row>
        <el-row style="height:36px;">
            <el-form-item label="民族:" prop="nationName">
                <!--<el-input v-model="addPersonForm.nation" style="width:260px;"></el-input>-->
                <el-select v-model="addPersonForm.nationName" clearable placeholder="选择民族" 
                    remote  style="width:260px;"
                    @focus="getDegreeInfo('0a9499dd0612b0b2950acacedf47b97a','nations')"
                    visible-change
                    @change="selectNation">
                    <el-option
                        v-for="(value,index) in nations" :key="index" :label="value.name" :value="value.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="性别:" prop="sexName">
                <el-input v-model="addPersonForm.sex" style="width:260px;" :disabled="true"></el-input>
            </el-form-item>
        </el-row>
        <el-row style="height:36px;">
            <el-form-item label="身份证号:" prop="idNo"
                :rules="[
                    {required:true,message:'请输入身份证号',trigger:'blur'},
                    {validator:this.vailidIdNo,message:'请输入正确的身份证号',trigger:['blur']}
                ]"
            >
                <el-input v-model="addPersonForm.idNo" style="width:260px;"></el-input>
            </el-form-item>
            <el-form-item label="出生日期:" prop="birthDate">
                <el-input v-model="addPersonForm.birthDate" style="width:260px;" :disabled="true"></el-input>
            </el-form-item>
        </el-row>
        <el-row style="height:36px;">
            <el-form-item label="所属机构:" prop="oName">
                <!--<el-input v-model="addPersonForm.oid" style="width:260px;"></el-input>-->
                <el-select v-model="addPersonForm.oName" clearable placeholder="选择所属机构" 
                    remote  style="width:260px;"
                    @focus="getDegreeInfo('0a9499dd0612b0b2950acacedf47b97a','oids')"
                    visible-change
                    @change="selectOid">
                    <el-option
                        v-for="(value,index) in oids" :key="index" :label="value.name" :value="value.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="执法门类:" prop="branchIdName">
                <!--<el-input v-model="addPersonForm.branchId" style="width:260px;"></el-input>-->
                <el-select v-model="addPersonForm.branchIdName" clearable placeholder="选择执法门类" 
                    remote  style="width:260px;"
                    @focus="getDegreeInfo('0a9499dd0612b0b2950acacedf47b97a','branchIds')"
                    visible-change
                    @change="selectBranchId">
                    <el-option
                        v-for="(value,index) in branchIds" :key="index" :label="value.name" :value="value.id">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-row>
        <el-row style="height:36px;">
            <el-form-item label="毕业学校:" prop="school">
                <el-input v-model="addPersonForm.school" style="width:260px;"></el-input>
            </el-form-item>
            <el-form-item label="毕业专业:" prop="majorName">
                <!--<el-input v-model="addPersonForm.major" style="width:260px;"></el-input>-->
                <el-select v-model="addPersonForm.majorName" clearable placeholder="选择毕业专业" 
                    remote  style="width:260px;"
                    @focus="getDegreeInfo('0a9499dd0612b0b2950acacedf47b97a','majors')"
                    visible-change
                    @change="selectMajor">
                    <el-option
                        v-for="(value,index) in majors" :key="index" :label="value.name" :value="value.id">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-row>
        <el-row style="height:36px;">
            <el-form-item label="政治面貌:" prop="politicalStatusName">
                <!--<el-input v-model="addPersonForm.politicalStatus" style="width:260px;"></el-input>-->
                <el-select v-model="addPersonForm.politicalStatusName" clearable placeholder="选择所政治面貌" 
                    remote  style="width:260px;"
                    @focus="getDegreeInfo('0a9499dd0612b0b2950acacedf47b97a','politicalStatuss')"
                    visible-change
                    @change="selectPoliticalStatus">
                    <el-option
                        v-for="(value,index) in politicalStatuss" :key="index" :label="value.name" :value="value.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="入党日期:" prop="admissionDate">
                <!--<el-input v-model="addPersonForm.admissionDate" style="width:260px;"></el-input>-->
                <el-date-picker v-model="addPersonForm.admissionDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                    style="width: 260px;" placeholder="请选择入党日期" :disabled='isDisabled' clearable >
                </el-date-picker>
            </el-form-item>
        </el-row>
        <el-row style="height:36px;">
            <el-form-item label="执法证号:" prop="certNo">
                <el-input v-model="addPersonForm.certNo" style="width:260px;"></el-input>
            </el-form-item>
            <el-form-item label="人员编制:" prop="staffingName">
                <!--<el-input v-model="addPersonForm.staffing" style="width:260px;"></el-input>-->
                <el-select v-model="addPersonForm.staffingName" clearable placeholder="选择人员编制" 
                    remote  style="width:260px;"
                    @focus="getDegreeInfo('0a9499dd0612b0b2950acacedf47b97a','staffings')"
                    visible-change
                    @change="selectStaffing">
                    <el-option
                        v-for="(value,index) in staffings" :key="index" :label="value.name" :value="value.id">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-row>
        <el-row style="height:36px;">
            <el-form-item label="职务名称:" prop="postName">
                <!--<el-input v-model="addPersonForm.post" style="width:260px;"></el-input>-->
                <el-select v-model="addPersonForm.postName" clearable placeholder="选择职务名称" 
                    remote  style="width:260px;"
                    @focus="getDegreeInfo('0a9499dd0612b0b2950acacedf47b97a','posts')"
                    visible-change
                    @change="selectPost">
                    <el-option
                        v-for="(value,index) in posts" :key="index" :label="value.name" :value="value.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="执法区域:" prop="area">
                <el-input v-model="addPersonForm.area" style="width:260px;"></el-input>
            </el-form-item>
        </el-row>
        <!--<el-row style="height:36px;">
            <el-form-item label="证件状态:" prop="certStatus">
                <el-input v-model="addPersonForm.certStatus" style="width:260px;"></el-input>
            </el-form-item>
            <el-form-item label="人员状态:" prop="personStatus">
                <el-input v-model="addPersonForm.personStatus" style="width:260px;"></el-input>
            </el-form-item>
        </el-row>-->
        <el-row style="height:36px;">
            <el-form-item label="分配渠道:" prop="disChannelName">
                <!--<el-input v-model="addPersonForm.disChannel" style="width:260px;"></el-input>-->
                <el-select v-model="addPersonForm.disChannelName" clearable placeholder="选择分配渠道" 
                    remote  style="width:260px;"
                    @focus="getDegreeInfo('0a9499dd0612b0b2950acacedf47b97a','disChannels')"
                    visible-change
                    @change="selectDisChannel">
                    <el-option
                        v-for="(value,index) in disChannels" :key="index" :label="value.name" :value="value.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="毕业证书编号:" prop="graduationNo">
                <el-input v-model="addPersonForm.graduationNo" style="width:260px;"></el-input>
            </el-form-item>
        </el-row>
        <el-row style="height:36px;">
            <el-form-item label="参加工作日期:" prop="workDate">
                <!--<el-input v-model="addPersonForm.workDate" style="width:260px;"></el-input>-->
                <el-date-picker v-model="addPersonForm.workDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                    style="width: 260px;" placeholder="请选择参加工作日期" :disabled='isDisabled' clearable >
                </el-date-picker>
            </el-form-item>
            <el-form-item label="从事执法日期:" prop="enfoceDate">
                <!--<el-input v-model="addPersonForm.enfoceDate" style="width:260px;"></el-input>-->
                <el-date-picker v-model="addPersonForm.enfoceDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                    style="width: 260px;" placeholder="请选择从事执法日期" :disabled='isDisabled' clearable >
                </el-date-picker>
            </el-form-item>
        </el-row>
        <el-row style="height:36px;">
            <el-form-item label="海事执法证号:" prop="maritimeNo">
                <el-input v-model="addPersonForm.maritimeNo" style="width:260px;"></el-input>
            </el-form-item>
            <el-form-item label="资格证书编号:" prop="qualificationNo">
                <el-input v-model="addPersonForm.qualificationNo" style="width:260px;"></el-input>
            </el-form-item>
        </el-row>
        <el-row style="height:40px;">
            <el-form-item label="省内执法证号:" prop="provinceNo">
                <el-input v-model="addPersonForm.provinceNo" style="width:260px;"></el-input>
            </el-form-item>
            <el-form-item label="原持部级执法证号:" prop="ministerialNo">
                <el-input v-model="addPersonForm.ministerialNo" style="width:260px;"></el-input>
            </el-form-item>
        </el-row>
        <el-row style="height:150px;">
            <el-form-item label="照片:" prop="photoUrl">
                <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="备注:" prop="note">
                <el-input type="textarea" style="width:260px;" :rows="5" v-model="addPersonForm.note"></el-input>
            </el-form-item>
        </el-row>
        <el-row style="height:36px;">
            <el-form-item label="附件类型:" prop="attached">
                <el-select v-model="addPersonForm.attached" style="width: 260px;" placeholder="附件类型">
                    <el-option label="身份证"   value="0"></el-option>
                    <el-option label="学历证明" value="1"></el-option>
                    <el-option label="编制证明" value="2"></el-option>
                    <el-option label="其他文件" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="附件:" prop="attachedUrl">
                <el-input v-model="addPersonForm.attachedUrl" style="width:260px;"></el-input>
            </el-form-item>
        </el-row>
        <div class="item" style="text-align:center;margin-top:10px;">
            <span slot="footer" class="dialog-footer">
                <el-button type="danger"  @click="visible = false" icon="el-icon-close">取 消</el-button>
                <el-button type="success" @click="submitPerson('addPersonForm')" icon="el-icon-check">提 交</el-button>
            </span>
        </div>
    </el-form>
</template>
<script>
export default {
    name:'addPerson',//名称
    data(){
        return {
            disChannels:[],//存放分配渠道
            posts:[],//存放职务名称
            staffings:[],//存放人员编制
            politicalStatuss:[],//存放政治面貌
            majors:[],//存放毕业专业
            branchIds:[],//存放执法门类
            oids:[],//存放所属机构
            nations:[],//存放民族
            degrees:[],//存放学历下拉列表数据
            imageUrl: "",
            visible: false,
            isDisabled:false,
            addPersonForm: {
                personsId:"",//id
                idNo: "",     //身份证号
                personName:"",//执法人名
                birthDate:"",//出生日期
                nation:"",//民族
                nationName:"",//民族
                degree:"",//学历
                degreeName:"",//学历
                politicalStatus:"",//政治面貌
                politicalStatusName:"",//政治面貌
                admissionDate:"",//入党日期
                school:"",//毕业学校
                major:"",//专业
                majorName:"",//专业
                graduationNo:"",//毕业证书编号
                oid:"",//所属机构
                oName:"",//所属机构
                post:"",//职务
                postName:"",//职务
                area:"",//执法区域
                disChannel:"",//分配渠道
                disChannelName:"",//分配渠道
                staffing:"",//人员编制
                staffingName:"",//人员编制
                workDate:"",//参加工作时间
                photo:"",//照片
                branchId:"",//执法门类
                branchIdName:"",//执法门类
                enfoceDate:"",//从事执法日期
                certNo:"",//执法证号
                qualificationNo:"",//资格证书编号
                provinceNo:"",//现持省内执法证号
                ministerialNo:"",//现持部级执法证号
                maritimeNo:"",//现持海事执法证号
                note:"",//备注
                certStatus:"",//证件状态
                certStatusName:"",//证件状态
                personStatus:"",//人员状态
                personStatusName:"",//人员状态
                attachedUrl:"",//附件路径
                attached:"",//附件
                photoUrl:"",//照片路径
                personType:"",//人员类型
                personTypeName:"",//人员类型
                sex:'',
                sexName:'',
            },
            dialogTitle: "", //弹出框title
            errorName: false, //添加name时的验证
            handelType: 0, //添加 0  修改2
        }
    },
    methods:{
        selectDegree(val){
            let obj={};
            debugger;
            obj=this.degrees.find((item)=>{
                return item.id=val;
            })
            this.addPersonForm.degree=val;    
        },
        selectNation(val){
            let obj={};
            obj=this.nations.find((item)=>{
                return item.id=val;
            })
            this.addPersonForm.nation=val;    
        },
        selectOid(val){
            let obj={};
            obj=this.oids.find((item)=>{
                return item.id=val;
            })
            this.addPersonForm.oid=val;    
        },
        selectBranchId(val){
            let obj={};
            obj=this.branchIds.find((item)=>{
                return item.id=val;
            })
            this.addPersonForm.branchId=val;    
        },
        selectMajor(val){
            let obj={};
            obj=this.majors.find((item)=>{
                return item.id=val;
            })
            this.addPersonForm.major=val;    
        },
        selectPoliticalStatus(val){
            let obj={};
            obj=this.politicalStatuss.find((item)=>{
                return item.id=val;
            })
            this.addPersonForm.politicalStatus=val;    
        },
        selectStaffing(val){
            let obj={};
            obj=this.staffings.find((item)=>{
                return item.id=val;
            })
            this.addPersonForm.staffing=val;    
        },
        selectPost(val){
            let obj={};
            obj=this.posts.find((item)=>{
                return item.id=val;
            })
            this.addPersonForm.post=val;    
        },
        selectDisChannel(val){
            let obj={};
            obj=this.disChannels.find((item)=>{
                return item.id=val;
            })
            this.addPersonForm.disChannel=val;    
        },
        getDegreeInfo(pid,codeName){
             if(codeName==='degrees'){
                if(this.degrees.length===0){
                    this.$store.dispatch("getDictInfoByCode",pid).then(    //根据pid查询字典数据
                        res=>{
                            if(res.code===200){
                                this.degrees = res.data;
                            }else{  
                                console.info("没有查询到数据");
                            }
                        },
                        err => {
                            console.log(err);
                        }
                    ).catch(()=>{});
                }
            }
            if(codeName==='nations'){
                if(this.nations.length===0){
                    this.$store.dispatch("getDictInfoByCode",pid).then(    //根据pid查询字典数据
                        res=>{
                            if(res.code===200){
                                this.nations = res.data;
                            }else{  
                                console.info("没有查询到数据");
                            }
                        },
                        err => {
                            console.log(err);
                        }
                    ).catch(()=>{});
                }
            }
            if(codeName==='oids'){
                if(this.oids.length===0){
                    this.$store.dispatch("getDictInfoByCode",pid).then(    //根据pid查询字典数据
                        res=>{
                            if(res.code===200){
                                this.oids = res.data;
                            }else{  
                                console.info("没有查询到数据");
                            }
                        },
                        err => {
                            console.log(err);
                        }
                    ).catch(()=>{});
                }
            }
            if(codeName==='branchIds'){
                if(this.branchIds.length===0){
                    this.$store.dispatch("getDictInfoByCode",pid).then(    //根据pid查询字典数据
                        res=>{
                            if(res.code===200){
                                this.branchIds = res.data;
                            }else{  
                                console.info("没有查询到数据");
                            }
                        },
                        err => {
                            console.log(err);
                        }
                    ).catch(()=>{});
                }
            }
            if(codeName==='majors'){
                if(this.majors.length===0){
                    this.$store.dispatch("getDictInfoByCode",pid).then(    //根据pid查询字典数据
                        res=>{
                            if(res.code===200){
                                this.majors = res.data;
                            }else{  
                                console.info("没有查询到数据");
                            }
                        },
                        err => {
                            console.log(err);
                        }
                    ).catch(()=>{});
                }
            }
            if(codeName==='politicalStatuss'){
                if(this.politicalStatuss.length===0){
                    this.$store.dispatch("getDictInfoByCode",pid).then(    //根据pid查询字典数据
                        res=>{
                            if(res.code===200){
                                this.politicalStatuss = res.data;
                            }else{  
                                console.info("没有查询到数据");
                            }
                        },
                        err => {
                            console.log(err);
                        }
                    ).catch(()=>{});
                }
            }
            if(codeName==='staffings'){
                if(this.staffings.length===0){
                   this.$store.dispatch("getDictInfoByCode",pid).then(    //根据pid查询字典数据
                        res=>{
                            if(res.code===200){
                                this.staffings = res.data;
                            }else{  
                                console.info("没有查询到数据");
                            }
                        },
                        err => {
                            console.log(err);
                        }
                    ).catch(()=>{});
                }
            }
            if(codeName==='posts'){
                if(this.posts.length===0){
                    this.$store.dispatch("getDictInfoByCode",pid).then(    //根据pid查询字典数据
                        res=>{
                            if(res.code===200){
                                this.posts = res.data;
                            }else{  
                                console.info("没有查询到数据");
                            }
                        },
                        err => {
                            console.log(err);
                        }
                    ).catch(()=>{});
                }
            }
            if(codeName==='disChannels'){
                if(this.disChannels.length===0){
                    this.$store.dispatch("getDictInfoByCode",pid).then(    //根据pid查询字典数据
                        res=>{
                            if(res.code===200){
                                this.disChannels = res.data;
                            }else{  
                                console.info("没有查询到数据");
                            }
                        },
                        err => {
                            console.log(err);
                        }
                    ).catch(()=>{});
                }
            }
            
        },
        //身份证号码校验
        async vailidIdNo(rule,value,callback){
             // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X 
             let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
             if(reg.test(value)){
                await this.getValidIdNo(value.length);
             }else{
                 this.$message({message:'身份证格式错误',type: 'warning'});
                 this.addPersonForm.idNo='';
             }
        },
        getValidIdNo(val){
            let iden=this.addPersonForm.idNo;
            let myDate = new Date();
            let month = myDate.getMonth() + 1;
            let day = myDate.getDate();
            let age = 0;
            let sex = '';
            let birth = '';
            if(val===18){
                age = myDate.getFullYear() - iden.substring(6, 10) - 1;
                sex = iden.substring(16,17);
                birth = iden.substring(6,10)+"-"+iden.substring(10,12)+"-"+iden.substring(12,14);
                if (iden.substring(10, 12) < month || iden.substring(10, 12) == month && iden.substring(12, 14) <= day) 
                    age++;
            }
            if(val===15){
                age = myDate.getFullYear() - iden.substring(6, 8) - 1901;
                sex = iden.substring(13,14);
                birth = "19"+iden.substring(6,8)+"-"+iden.substring(8,10)+"-"+iden.substring(10,12);
                if (iden.substring(8, 10) < month || iden.substring(8, 10) == month && iden.substring(10, 12) <= day) age++;
            }
            if(sex%2 === 0){
                sex = '0';
                this.addPersonForm.sexName='女';
            } else{
                sex = '1';
                this.addPersonForm.sexName='男';
            }
            this.addPersonForm.sex=sex;
            this.addPersonForm.birthDate=birth;  
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        //提交怎么
        submitPerson() {
            if(this.handelType==1){
                this.$store.dispatch("addPersonInfo", this.addPersonForm).then(res => {
                    this.$emit("getAllPersons");
                        this.$message({
                            type: "success",
                            message:  "添加成功!",
                        });
                        this.$refs["addPersonForm"].resetFields();
                        this.visible = false;
                    });
                    err => {
                        console.log(err);
                };
            }else if(this.handelType==2){
                this.$store.dispatch("updatePersonInfo", this.addPersonForm).then(res => {
                    this.$emit("getAllPersons");
                        this.$message({
                            type: "success",
                            message:  "修改成功!",
                        });
                        this.$refs["addPersonForm"].resetFields();
                        this.visible = false;
                    });
                    err => {
                        console.log(err);
                };
            }

        },
        showModal(type,row) {
            this.visible = true;
            this.handelType = type;
            if(type==1){//新增
                this.dialogTitle = "新增";
            }else if(type==2){//修改
                this.dialogTitle = "修改";
                this.addPersonForm.personId=row.personId;
                this.addPersonForm.idNo=row.idNo;
                this.addPersonForm.personName=row.personName;
                this.addPersonForm.sex=row.sex;
                this.addPersonForm.sexName=row.sexName;
                this.addPersonForm.degree=row.degree;
                this.addPersonForm.degreeName=row.degreeName;
                this.addPersonForm.nation=row.nation;
                this.addPersonForm.nationName=row.nationName;
                this.addPersonForm.birthDate=row.birthDate;
                this.addPersonForm.oid=row.oid;
                this.addPersonForm.oName=row.oName;
                this.addPersonForm.branchId=row.branchId;
                this.addPersonForm.branchIdName=row.branchIdName;
                this.addPersonForm.school=row.school;
                this.addPersonForm.major=row.major;
                this.addPersonForm.majorName=row.majorName;
                this.addPersonForm.politicalStatus=row.politicalStatus;
                this.addPersonForm.politicalStatusName=row.politicalStatusName;
                this.addPersonForm.admissionDate=row.admissionDate;
                this.addPersonForm.staffing=row.staffing;
                this.addPersonForm.staffingName=row.staffingName;
                this.addPersonForm.post=row.post;
                this.addPersonForm.postName=row.postName;
                this.addPersonForm.area=row.area;
                this.addPersonForm.disChannel=row.disChannel;
                this.addPersonForm.disChannelName=row.disChannelName;
                this.addPersonForm.graduationNo=row.graduationNo;
                this.addPersonForm.workDate=row.workDate;
                this.addPersonForm.enfoceDate=row.enfoceDate;
                this.addPersonForm.maritimeNo=row.maritimeNo;
                this.addPersonForm.qualificationNo=row.qualificationNo;
                this.addPersonForm.attachedUrl=row.attachedUrl;
                this.addPersonForm.attached=row.attached;
                this.addPersonForm.photoUrl=row.photoUrl;
                this.addPersonForm.ministerialNo=row.ministerialNo;
                this.addPersonForm.provinceNo=row.provinceNo;
                this.addPersonForm.certNo=row.certNo;
            }

         },
         //聚焦清除错误信息
        focusName() {
            this.errorName = false;
        },
        //关闭弹窗的时候清除数据
        closeDialog() {
            this.visible = false;
            this.$refs["addPersonForm"].resetFields();
            this.errorName = false;
        },
    },
}
</script>
<style lang="scss" src="@/assets/css/personManage.scss"></style>
<style lang="scss">
  /* @import "@/assets/css/personManage.scss"; */

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 260px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 260px;
    height: 150px;
    display: block;
  }
</style>
