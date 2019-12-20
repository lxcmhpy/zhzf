<template>
  <el-dialog
    :title="titleMap[dialogStatus]"
    custom-class="leftDialog"
    :visible.sync="visible"
    top="0"
    width="40%"
  >
    <el-form
      :model="addUserForm"
      :rules="rules"
      ref="addUserForm"
      label-width="100px"
      class="addOrganClass"
      @close="closeDialog"
      :close-on-click-modal="false"
    >
      <div class="item">
        <el-form-item label="登录用户名" prop='username'>
          <el-input ref='username' :disabled="dialogStatus === 'editEquipment'" v-model="addUserForm.username"></el-input>
        </el-form-item>
      </div>
      <div class="item" v-if="dialogStatus === 'addEquipment'">
        <el-form-item label="初始密码" prop="password">
          <el-input ref="password" v-model="addUserForm.password"></el-input>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="真实姓名">
          <el-input v-model="addUserForm.nickName"></el-input>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="身份证号码" prop="IDnumber">
          <el-input ref="IDnumber" v-model="addUserForm.IDnumber"></el-input>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="联系方式" prop="mobile">
          <el-input ref="mobile" v-model="addUserForm.mobile"></el-input>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="执法门类">
          <el-input v-model="addUserForm.category"></el-input>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="执法机构">
          <el-input v-model="addUserForm.organTitle"></el-input>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="所属部门">
           <el-select v-model="addUserForm.departmentTitle" placeholder="请选择">
            <el-option
              v-for="item in depss"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
      </div>

      <div class="item">
        <el-form-item label="省级证件号">
          <el-input v-model="addUserForm.Provincial"></el-input>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="部级证件号">
          <el-input v-model="addUserForm.Ministerial"></el-input>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="海事证件号">
          <el-input v-model="addUserForm.Maritime"></el-input>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="其他证件号">
          <el-input v-model="addUserForm.Other"></el-input>
        </el-form-item>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="resetForm">取 消</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
     // 身份证校验
	let IDnumberValidity = (rule, code, callback) => {
      var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
      var tip = ""
      var pass = true
 
      if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
        tip = "身份证号格式错误"
        pass = false;
      } else if (!city[code.substr(0, 2)]) {
        tip = "地址编码错误"
        pass = false
      } else {
        // 18位身份证需要验证最后一位校验位
        if (code.length === 18) {
          code = code.split('')
          // ∑(ai×Wi)(mod 11)
          // 加权因子
          var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
          // 校验位
          var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
          var sum = 0
          var ai = 0
          var wi = 0
          for (var i = 0; i < 17; i++) {
            ai = code[i]
            wi = factor[i]
            sum += ai * wi
          }
          var last = parity[sum % 11];
          if (parity[sum % 11] != code[17]) {
            tip = "校验位错误"
            pass = false
          }
        }
      }
      if (!pass) {
        callback(new Error(tip))
      } else {
        callback()
      }
    }
     // 手机号校验
     var checkmobile = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        } else {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          console.log(reg.test(value));
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error('请输入正确的手机号'));
          }
        }
      };

    return {
      depss:[],    //数据部门数据
      visible: false,
      //新增or编辑弹框标题(根据点击的新增or编辑按钮显示不同的标题)
      titleMap: {
        addEquipment: "新增用户",
        editEquipment: "编辑用户"
      },
      //新增和编辑弹框标题
      dialogStatus: "",
      addUserForm: {
        id:'',
        username: "",
        password: "",
        mobile: "",
        nickName: "",
        IDnumber:"",
        category:"",
        organId:"",
        organTitle:'',
        departmentId:"",
        departmentTitle:"",
        Provincial:"",
        Ministerial:"",
        Maritime:"",
        Other:"",
      },
      rules: {
        username: [{ required: true, message: "请输入登录用户名", trigger: "blur" },  { min: 6, message: '长度大于6个字符', trigger: 'blur' }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" },  { min: 6, message: '长度大于6个字符', trigger: 'blur' }],
        mobile: [{validator: checkmobile, trigger: 'blur'}],
        IDnumber: [
          {
            pattern: /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/,
            message: '请输入正确的证件号'
          },
          { validator: IDnumberValidity, trigger: 'blur' }],
      },
     
    };
  },
  mounted(){
     
  },

  methods: {
    //所属部门 输入
    getDep(){
        let that = this
        let data = {
            organId : this.addUserForm.organId
        }
       this.$store.dispatch("getUserall",data).then(res => {
          if(res.code === 200){
               this.depss=res.data;
               console.log(this.depss);
               console.log(11111111111111111111111)
          }else{
            console.log(1);
          }
        }).catch((e)=>{
            console.log(e)
        })
    },
    //检查手机号
	isCellmobile(val) {
	      if (!/^1(3|4|5|6|7|8)\d{9}$/.test(val)) {
	        return false;
	      } else {
	        return true;
	      }
	    },
    //新增
    addEquipment() {
      //显示弹框
      this.visible = true;
      this.dialogStatus = "addEquipment";
      //新增弹框标题
      this.$nextTick(()=>{
        this.$refs['addUserForm'].resetFields();
      })
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.$nextTick(()=>{
        this.$refs['addUserForm'].resetFields();
      })
    },
    //编辑
    handelEdit() {
      //显示弹框
      this.visible = true;
      //编辑弹框标题
      this.dialogStatus = "editEquipment";
    },
    
    // 弹框保存
    save() {
      if (this.dialogStatus === "addEquipment") {
        this.$store.dispatch("saveOrUpdateUserInfo",this.addUserForm).then(res => {
            if (res.code === 200) {
              this.$message({
                showClose: true,
                message: "新增用户成功",
                type: "success"
              });
              this.visible = false;
              this.$emit('uploadaaa','1');
            } else {
              this.$message.error("服务器错误，新增失败");
            }
          })
          .catch(err => {
            this.$message({
              showClose: true,
              message: err,
              type: "error"
            });
          });
      } else if (this.dialogStatus === "editEquipment") {
        console.log(this.addUserForm)
         this.$store.dispatch("saveOrUpdateUserInfo",this.addUserForm).then(res => {
           
              this.$message({
                showClose: true,
                message: "修改用户成功",
                type: "success"
              });
              this.$emit('uploadaaa');
              this.visible = false;
           
          })
          .catch(err => {
            this.$message({
              showClose: true,
              message: err,
              type: "error"
            });
          });
      }
    },
    // 弹框取消按钮
    resetForm() {
      this.visible = false;
     this.$nextTick(()=>{
        this.$refs['addUserForm'].resetFields();
      })
    }
  },
  watch:{
    'visible'(val) {
      if(val === false){
        this.addUserForm={
        id:'',
        username: "",
        password: "",
        mobile: "",
        nickName: "",
        IDnumber:"",
        category:"",
        organId:"",
        organTitle:"",
        departmentId:"",
        departmentTitle:"",
        Provincial:"",
        Ministerial:"",
        Maritime:"",
        Other:"",
      }
      }
    },
    'addUserForm.organId'(val){
        this. getDep()
    }

  }
};
</script>