<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="50%"
  >
    <el-form :model="addOrUpdateSectionForm" :rules="rules" ref="addOrUpdateSectionForm" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="管理机构名称:">
            <el-select style="width: 180px" v-model="addOrUpdateSectionForm.organId" placeholder="请选择">
              <el-option v-for="item in organList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所属路线:" >
            <el-input style="width: 180px" v-model="addOrUpdateSectionForm.routeName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="路段名称:">
            <el-input style="width: 180px" v-model="addOrUpdateSectionForm.sectionName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="车道数量:">
            <el-input style="width: 180px" v-model="addOrUpdateSectionForm.lanesNumber"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="起始地点:">
            <el-input style="width: 180px" v-model="addOrUpdateSectionForm.startingPoint"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结束地点:">
            <el-input style="width: 180px" v-model="addOrUpdateSectionForm.enddingPoint"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="起始桩号:">
            <el-col class="line" :span="1">k</el-col>
            <el-col  :span="4">
              <el-form-item prop="startingPileK" label-width="0">
                <el-input v-model="addOrUpdateSectionForm.startingPileK" v-on:input="value=onlyNum(addOrUpdateSectionForm.startingPileK,1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">+</el-col>
            <el-col :span="4">
              <el-form-item prop="startingPileM" label-width="0">
              <el-input v-model="addOrUpdateSectionForm.startingPileM" v-on:input="value=onlyNum(addOrUpdateSectionForm.startingPileM,2)"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="1">m</el-col>
          </el-form-item>
        </el-col>
       <el-col :span="12">
          <el-form-item label="结束桩号:">
            <el-col class="line" :span="1">k</el-col>
            <el-col :span="4">
              <el-form-item prop="enddingPileK" label-width="0">
                <el-input v-model="addOrUpdateSectionForm.enddingPileK" v-on:input="value=onlyNum(addOrUpdateSectionForm.enddingPileK,3)"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">+</el-col>
            <el-col :span="4">
              <el-form-item prop="enddingPileM" label-width="0">
                <el-input v-model="addOrUpdateSectionForm.enddingPileM" v-on:input="value=onlyNum(addOrUpdateSectionForm.enddingPileM,4)"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="1">m</el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="公路等级:">
            <el-select style="width: 180px" v-model="addOrUpdateSectionForm.routeGrade" placeholder="请选择">
              <el-option v-for="item in gradeList" :key="item.name" :label="item.name" :value="item.name"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="备注说明:">
            <el-input style="width: 540px" v-model="addOrUpdateSectionForm.sectionNote"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="addOrUpdateSection('addOrUpdateSectionForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
  import iLocalStroage from "@/common/js/localStroage";
  import {getDictListDetailByNameApi, }from "@/api/system";
    export default {
        data() {
            return {
                visible: false,
                addOrUpdateSectionForm: {
                    routeName: "",
                    organId: "",
                    sectionName:"",
                    lanesNumber: "",
                    startingPoint: "",
                    enddingPoint: "",
                    routeGrade: "",
                    startingPileK: "",
                    startingPileM: "",
                    enddingPileK: "",
                    enddingPileM: "",
                    sectionNote: "",
                    routeId: "",
                   // organId2: "",
                },
                rules: {
                    startingPileK: [{ required: true, message: "请输入起始桩号K", trigger: "blur" }],
                    startingPileM : [{ required: true, message: "请输入起始桩号M", trigger: "blur" }],
                    enddingPileK : [{ required: true, message: "请输入结束桩号K", trigger: "blur" }],
                    enddingPileM : [{ required: true, message: "请输入结束桩号M", trigger: "blur" }],
                },
                dialogTitle: "", //弹出框title
                handelType: 0, //添加 0  修改2
                editSectionId:'',
                organList:[], //机构列表
                gradeList:[],//公路等级列表
            };
        },
        inject: ["reload"],
        methods: {
            onlyNum(value,index){
                if(index == "1"){
                    this.addOrUpdateSectionForm.startingPileK = value.replace(/\D/g,'');
                }else if(index == "2"){
                    this.addOrUpdateSectionForm.startingPileM = value.replace(/\D/g,'');
                }else if(index == "3"){
                    this.addOrUpdateSectionForm.enddingPileK = value.replace(/\D/g,'');
                }else if(index == "4"){
                    this.addOrUpdateSectionForm.enddingPileM = value.replace(/\D/g,'');
                }
            },
            showModal(type, data) {
                getDictListDetailByNameApi("公路等级").then(res=>{
                    console.log(res)
                    _this.gradeList = res.data;
                })
                let organId = iLocalStroage.gets('userInfo').organId;
                let _this = this;
                this.$store.dispatch("getCurrentAndNextOrgan",organId).then(
                    res => {
                        console.log(res);
                        _this.organList = res.data;
                    },
                    err => {
                        console.log(err);
                    }
                );
                this.visible = true;
                this.handelType = type;
                if (type == 0) {
                    _this.dialogTitle = "添加路段信息";
                    _this.addOrUpdateSectionForm.organId = "";
                    _this.addOrUpdateSectionForm.routeName = data.routeName;
                    _this.addOrUpdateSectionForm.routeId = data.id;
                    _this.addOrUpdateSectionForm.sectionName = "";
                    _this.addOrUpdateSectionForm.lanesNumber = "";
                    _this.addOrUpdateSectionForm.startingPoint = "";
                    _this.addOrUpdateSectionForm.enddingPoint = "";
                    _this.addOrUpdateSectionForm.startingPileK = "";
                    _this.addOrUpdateSectionForm.startingPileM = "";
                    _this.addOrUpdateSectionForm.enddingPileK = "";
                    _this.addOrUpdateSectionForm.enddingPileM = "";
                    _this.addOrUpdateSectionForm.sectionNote = "";
                    _this.addOrUpdateSectionForm.routeGrade = "";
                    _this.editSectionId = "";
                    _this.$refs["addOrUpdateSectionForm"].resetFields();
                    this.$nextTick(()=>{
                        this.$refs["addOrUpdateSectionForm"].resetFields();
                        console.log('sadsdsf',this.$refs["addOrUpdateSectionForm"].resetFields())
                    })
                } else if (type == 2) {
                    console.log(data);
                    _this.dialogTitle = "路段信息维护";
                    _this.addOrUpdateSectionForm.routeName = data.routeName;
                    _this.addOrUpdateSectionForm.routeId = data.routeId;
                    _this.addOrUpdateSectionForm.organId = data.organId;
                    _this.addOrUpdateSectionForm.sectionName = data.sectionName;
                    _this.addOrUpdateSectionForm.lanesNumber = data.lanesNumber;
                    _this.addOrUpdateSectionForm.startingPoint = data.startingPoint;
                    _this.addOrUpdateSectionForm.enddingPoint = data.enddingPoint;
                    _this.addOrUpdateSectionForm.startingPileK = data.startingPileK;
                    _this.addOrUpdateSectionForm.startingPileM = data.startingPileM;
                    _this.addOrUpdateSectionForm.enddingPileK = data.enddingPileK;
                    _this.addOrUpdateSectionForm.enddingPileM = data.enddingPileM;
                    _this.addOrUpdateSectionForm.sectionNote = data.sectionNote;
                    _this.addOrUpdateSectionForm.routeGrade = data.routeGrade;
                    _this.editSectionId = data.id;
                }
            },
            //关闭弹窗的时候清除数据
            closeDialog() {

                this.$refs["addOrUpdateSectionForm"].resetFields();
                console.log('111',this.$refs["addOrUpdateSectionForm"].resetFields());
                this.visible = false;
                //this.errorOrganName = false;
            },
            //新增案件类型 修改案件类型
            addOrUpdateSection(formName) {
                let _this = this
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        if (_this.handelType) {
                            //修改
                            _this.addOrUpdateSectionForm.id= _this.editSectionId;
                            // if(_this.addOrUpdateSectionForm.organId2!==""){
                            //     _this.addOrUpdateSectionForm.organId= _this.addOrUpdateSectionForm.organId2;
                            // }
                            console.log("要修改的路段信息",_this.addOrUpdateSectionForm);
                            _this.$store.dispatch("addOrUpdateSection", _this.addOrUpdateSectionForm).then(
                                res => {
                                    console.log("修改后的路段信息", res);
                                    _this.$message({
                                        type: "success",
                                        message: "修改成功"
                                    });
                                    _this.visible = false;
                                    _this.reload();
                                },
                                err => {
                                    console.log(err);
                                }
                            );
                        } else {
                            _this.$store.dispatch("addOrUpdateSection", _this.addOrUpdateSectionForm).then(
                                res => {
                                    console.log("路段信息", res);
                                    _this.$message({
                                        type: "success",
                                        message:"添加成功!"
                                    });
                                    _this.visible = false;
                                    _this.reload();
                                },
                                err => {
                                    console.log(err);
                                }
                            );
                        }
                    }
                });
            },
        },
        mounted(){
            this.$nextTick(()=>{
                this.$refs["addOrUpdateSectionForm"].resetFields();
                console.log('sadsdsfthis.$refs["addOrUpdateSectionForm"]',this.$refs["addOrUpdateSectionForm"])
                console.log('sadsdsf',this.$refs["addOrUpdateSectionForm"].resetFields())
            })
        }
    };

</script>
