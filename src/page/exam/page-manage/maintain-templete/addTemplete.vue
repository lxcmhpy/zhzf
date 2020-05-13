<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="50%"
  >
    <div>
      <el-form :inline="true" ref="userForm" :model="addTempleteForm.addTempleteForm" label-width="70px">
        <el-row>
          <el-form-item label="模板名称" >
            <el-input v-model="templeteName"></el-input>
          </el-form-item>
        </el-row>
      </el-form>
      <el-table :data="tableData">
        <el-table-column prop="addTempleteForm.code" label="序号">
          <template slot-scope="scope">
            <el-input v-model="tableData[scope.$index].code" disabled="disabled"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="addTempleteForm.paragraphType" label="节段题型">
          <template slot-scope="scope">
            <el-select v-model="tableData[scope.$index].paragraphType" placeholder="节段题型" remote>
              <el-option value="单选题">单选题</el-option>
              <el-option value="多选题">多选题</el-option>
              <el-option value="判断题">判断题</el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="addTempleteForm.paragraphSum" label="节段总分">
          <template slot-scope="scope">
            <el-input v-model="tableData[scope.$index].paragraphSum" onkeyup="value=value.replace(/[^\d]/g,'')"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="paragraphNum" label="试题数量">
          <template slot-scope="scope">
            <el-input v-model="tableData[scope.$index].paragraphNum" onkeyup="value=value.replace(/[^\d]/g,'')"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="age" label>
          <template slot-scope="scope">
            <el-button @click="deleteRow1(scope.$index)" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="align-center">
        <el-button @click="add">+添加节段</el-button>
      </div>
      <div class="item" style="text-align:right;margin-top:10px;">
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submit()" icon="el-icon-check">确 定</el-button>
          <el-button @click="visible = false" icon="el-icon-close">取 消</el-button>
        </span>
      </div>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      isDisabled: true,
      visible: false,
      tableData: [],
      templeteName:"",
      addTempleteForm: {
        code:"",
        templeteName: "",
        paragraphNum:"",
        paragraphSum:"",
        paragraphType:"",
      },
      dataSources:[],
      rules: {
        //outlineName: [{ required: true, message: "大纲名称不能为空", trigger: "blur" }],
      },
      dialogTitle: "", //弹出框title
      errorName: false, //添加name时的验证
      handelType: 0 //添加 1  修改2  查看3
    };
  },
  methods: {
    add() {
      this.tableData.push({ code: this.tableData.length+1 });
    },
    deleteRow1(index) {
      this.tableData.splice(index, 1);
      let number = 1;
       this.tableData.forEach(item=>{
         item.code = number;
         number ++;
       })
    },
    //提交
    submit() {
      this.dataSources.push({"templeteName":this.addTempleteForm.templeteName,"data":this.tableData});
      console.info(JSON.stringify(this.dataSources));
      let _this = this;
      if (_this.handelType == 1) {
        _this.$store.dispatch("addPageTemplete", _this.addTempleteForm) .then(res => {
          if(res.code == '200'){
            _this.$emit("getTempleteComp");
            _this.$message({
              type: "success",
              message: "添加成功!"
            });
           this.closeDialog();
          }else{
            _this.$message({
              type: "error",
              message: "添加失败!"
            });
          }
          });
        err => {
              
          console.log(err);
        };
      } else if (_this.handelType == 2) {
        _this.$store
          .dispatch("updatePageTemplete", _this.addTempleteForm)
          .then(res => {
            _this.$emit("getTempleteComp");
            _this.$message({
              type: "success",
              message: "修改成功!"
            });
            this.closeDialog();
          });
        err => {
          
              this.tableData.splice(0, this.tableData.length);
              this.dataSources=[];
          console.log(err);
        };
      }
       this.tableData.splice(0, this.tableData.length);
       this.dataSources=[];
    },
    showModal(row, type) {
      let _this = this;
      _this.visible = true;
      _this.handelType = type;
      if (type == 1) {
        //新增
        _this.dialogTitle = "模板选择";
        _this.isDisabled = false;
      } else if (type == 2) {
        //修改,查看
        let number = 1;
        _this.dialogTitle = "修改";
        _this.isDisabled = false;
        this.tableData = row.data;
        this.templeteName = row.templeteName;
        this.tableData.forEach(item=>{
          item.code = number;
          number ++;
        })
      }
    },
    addRow() {},
    deleteRow(row) {},
    //聚焦清除错误信息
    focusName() {
      this.errorName = false;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.tableData = [];
      this.dataSources=[];
      this.number = 1;
      //this.$refs["addTempleteFormRef"].resetFields();
      this.errorName = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.el-input__inner {
  width: 320px;
}
.align-center {
  margin: 0 auto; /* 居中 这个是必须的，，其它的属性非必须 */
  width: 30%; /* 给个宽度 顶到浏览器的两边就看不出居中效果了 */

  text-align: center; /* 文字等内容居中 */
}
</style> 