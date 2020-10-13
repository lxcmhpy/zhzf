<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="50%"
  >
    <el-form :model="addOrUpdateRouteForm" :rules="rules" ref="addOrUpdateRouteForm" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="路线编号:">
            <el-input style="width: 160px" v-model="addOrUpdateRouteForm.routeName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="里程:" >
            <el-input style="width: 160px" v-model="addOrUpdateRouteForm.routeMileage"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="公路行政级别:">
            <el-select style="width:160px"  v-model="addOrUpdateRouteForm.routeLevel" placeholder="请选择">
              <el-option v-for="item in levelList" :key="item.name" :label="item.name" :value="item.name"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="公路等级:">
            <el-select style="width:160px" v-model="addOrUpdateRouteForm.routeGrade" placeholder="请选择">
              <el-option v-for="item in gradeList" :key="item.name" :label="item.name" :value="item.name"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="起始地点:">
            <el-input style="width: 160px" v-model="addOrUpdateRouteForm.startingPoint"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结束地点:">
            <el-input style="width: 160px" v-model="addOrUpdateRouteForm.enddingPoint"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="起始桩号:">
            <el-col class="line" :span="1">k</el-col>
            <el-col :span="4">
              <el-form-item prop="startingPileNumberK" label-width="0">
                <el-input v-model="addOrUpdateRouteForm.startingPileNumberK" v-on:input="value=onlyNum(addOrUpdateRouteForm.startingPileNumberK,1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">+</el-col>
            <el-col :span="4">
              <el-form-item prop="startingPileNumberM" label-width="0">
              <el-input v-model="addOrUpdateRouteForm.startingPileNumberM" v-on:input="value=onlyNum(addOrUpdateRouteForm.startingPileNumberM,2)"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="1">m</el-col>
          </el-form-item>
        </el-col>
       <el-col :span="12">
          <el-form-item label="结束桩号:">
            <el-col class="line" :span="1">k </el-col>
            <el-col :span="4">
              <el-form-item prop="enddingPileNumberK" label-width="0">
                <el-input v-model="addOrUpdateRouteForm.enddingPileNumberK" v-on:input="value=onlyNum(addOrUpdateRouteForm.enddingPileNumberK,3)"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">+ </el-col>
            <el-col :span="4">
              <el-form-item prop="enddingPileNumberM" label-width="0">
                <el-input v-model="addOrUpdateRouteForm.enddingPileNumberM" v-on:input="value=onlyNum(addOrUpdateRouteForm.enddingPileNumberM,4)"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="1">m</el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注(路线名称):">
            <el-input style="width: 521px" v-model="addOrUpdateRouteForm.routeNote"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="addOrUpdateRoute('addOrUpdateRouteForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
  import {getDictListDetailByNameApi, }from "@/api/system";
    export default {
        data() {
            return {
                visible: false,
                addOrUpdateRouteForm: {
                    routeName: "",
                    routeMileage: "",
                    routeLevel:"",
                    routeGrade: "",
                    startingPoint: "",
                    enddingPoint: "",
                    startingPileNumberK: "",
                    startingPileNumberM: "",
                    enddingPileNumberK: "",
                    enddingPileNumberM: "",
                    routeNote: ""
                },
                rules: {
                    startingPileNumberK: [{ required: true, message: "请输入起始桩号K", trigger: "blur" }],
                    startingPileNumberM : [{ required: true, message: "请输入起始桩号M", trigger: "blur" }],
                    enddingPileNumberK : [{ required: true, message: "请输入结束桩号K", trigger: "blur" }],
                    enddingPileNumberM : [{ required: true, message: "请输入结束桩号M", trigger: "blur" }],
                },
                dialogTitle: "", //弹出框title
                handelType: 0, //添加 0  修改2
                editRouteId:'',
                levelList:[], //公路行政级别列表
                gradeList:[],//公路等级列表
            };
        },
        inject: ["reload"],
        methods: {
            onlyNum(value,index){
                if(index == "1"){
                    this.addOrUpdateRouteForm.startingPileNumberK = value.replace(/\D/g,'');
                }else if(index == "2"){
                    this.addOrUpdateRouteForm.startingPileNumberM = value.replace(/\D/g,'');
                }else if(index == "3"){
                    this.addOrUpdateRouteForm.enddingPileNumberK = value.replace(/\D/g,'');
                }else if(index == "4"){
                    this.addOrUpdateRouteForm.enddingPileNumberM = value.replace(/\D/g,'');
                }
            },
            showModal(type, data) {
                getDictListDetailByNameApi("公路等级").then(res=>{
                    console.log(res)
                    _this.gradeList = res.data;
                })
                let _this = this;
                getDictListDetailByNameApi("公路行政级别").then(res=>{
                    console.log(res)
                    _this.levelList = res.data;
                })

                this.visible = true;
                this.handelType = type;
                if (type == 0) {
                    this.dialogTitle = "添加路线信息";
                    this.$refs["addOrUpdateRouteForm"].resetFields();
                    this.addOrUpdateRouteForm.routeName = "";
                    this.addOrUpdateRouteForm.routeMileage = "";
                    this.addOrUpdateRouteForm.routeLevel = "";
                    this.addOrUpdateRouteForm.routeGrade = "";
                    this.addOrUpdateRouteForm.startingPoint = "";
                    this.addOrUpdateRouteForm.enddingPoint = "";
                    this.addOrUpdateRouteForm.startingPileNumberK = "";
                    this.addOrUpdateRouteForm.startingPileNumberM = "";
                    this.addOrUpdateRouteForm.enddingPileNumberK = "";
                    this.addOrUpdateRouteForm.enddingPileNumberM = "";
                    this.addOrUpdateRouteForm.routeNote = "";
                    this.editRouteId = "";
                    this.$nextTick(()=>{
                        this.$refs["addOrUpdateRouteForm"].resetFields();
                        console.log('sadsdsf',this.$refs["addOrUpdateRouteForm"].resetFields())
                    })
                } else if (type == 2) {
                    console.log(data);
                    this.dialogTitle = "路线信息维护";
                    this.addOrUpdateRouteForm.routeName = data.routeName;
                    this.addOrUpdateRouteForm.routeMileage = data.routeMileage;
                    this.addOrUpdateRouteForm.routeLevel = data.routeLevel;
                    this.addOrUpdateRouteForm.routeGrade = data.routeGrade;
                    this.addOrUpdateRouteForm.startingPoint = data.startingPoint;
                    this.addOrUpdateRouteForm.enddingPoint = data.enddingPoint;
                    this.addOrUpdateRouteForm.startingPileNumberK = data.startingPileNumberK;
                    this.addOrUpdateRouteForm.startingPileNumberM = data.startingPileNumberM;
                    this.addOrUpdateRouteForm.enddingPileNumberK = data.enddingPileNumberK;
                    this.addOrUpdateRouteForm.enddingPileNumberM = data.enddingPileNumberM;
                    this.addOrUpdateRouteForm.routeNote = data.routeNote;
                    this.editRouteId = data.id;
                }
            },
            //关闭弹窗的时候清除数据
            closeDialog() {

                this.$refs["addOrUpdateRouteForm"].resetFields();
                console.log('111',this.$refs["addOrUpdateRouteForm"].resetFields());
                this.visible = false;
                //this.errorOrganName = false;
            },
            //新增案件类型 修改案件类型
            addOrUpdateRoute(formName) {
                // debugger
                let _this = this
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        if (_this.handelType === 2) {
                            //修改
                            _this.addOrUpdateRouteForm.id= this.editRouteId;
                            console.log("要修改的路线信息",_this.addOrUpdateRouteForm);
                            _this.$store.dispatch("addOrUpdateRoute", _this.addOrUpdateRouteForm).then(
                                res => {
                                    console.log("修改后的路线信息", res);
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
                            // _this.$refs["addOrUpdateRouteForm"].resetFields();
                            _this.$store.dispatch("addOrUpdateRoute", _this.addOrUpdateRouteForm).then(
                                res => {
                                    console.log("路线信息", res);
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
                this.$refs["addOrUpdateRouteForm"].resetFields();
                console.log('sadsdsfthis.$refs["addOrUpdateRouteForm"]',this.$refs["addOrUpdateRouteForm"])
                console.log('sadsdsf',this.$refs["addOrUpdateRouteForm"].resetFields())
            })
        }
    };

</script>
