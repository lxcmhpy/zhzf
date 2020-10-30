<template>
  <el-dialog
    class="add-temp-dialog"
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="64%"
  >
    <div>
      <el-form ref="tempForm" :model="addTempleteForm" :rules="rules" label-width="80px">
        <el-row>
          <el-form-item label="模板名称" prop="templeteName">
            <el-input v-model="addTempleteForm.templeteName" style="width: 300px;"></el-input>
          </el-form-item>
        </el-row>
      </el-form>

      <!-- 添加节段 -->
      <div class="segment-list">
        <el-row :gutter="20" v-for="(item, index) in tableData" :key="item.code">
          <el-form :ref="`segment${index}`" :model="item" label-width="80px">
            <el-col :span="4" class="segment-item">
              <el-form-item label="序号">
                <el-input v-model="item.code" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" class="segment-item">
              <el-form-item
                label="节段题型"
                prop="paragraphType"
                :rules="{ required: true, message: '节段题型不能为空', trigger: 'change' }"
              >
                <el-select v-model="item.paragraphType" placeholder="节段题型" remote>
                  <el-option
                    v-for="value in questionTypeList"
                    :key="value.id"
                    :label="value.name"
                    :value="value.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" class="segment-item">
              <el-form-item
                label="节段总分"
                prop="paragraphSum"
                :rules="{ required: true, message: '节段总分不能为空', trigger: 'blur' }"
              >
                <el-input v-model="item.paragraphSum" @input="setNumVal(item, 'paragraphSum')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" class="segment-item">
              <el-form-item
                label="试题数量"
                prop="paragraphNum"
                :rules="{ required: true, message: '试题数量不能为空', trigger: 'blur' }"
              >
                <el-input v-model="item.paragraphNum" @input="setNumVal(item, 'paragraphNum')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2" class="segment-item" style="text-align: center;">
              <el-button type="text" @click="deleteRow1(index)">删除</el-button>
            </el-col>
          </el-form>
        </el-row>
      </div>
      <div class="add-segment">
        <el-button class="add-room" icon="el-icon-plus" @click="add">添加节段</el-button>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="verificationForm()">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      tableData: [],
      oldTableData: [],
      addTempleteForm: {
        code: "",
        templeteName: "",
        paragraphNum: "",
        paragraphSum: "",
        paragraphType: "",
        paragraphId: "" //节段ID
      },
      deleteDate: [], //删除的节段
      dataSources: [],
      questionTypeList: [],
      rules: {
        templeteName: [
          { required: true, message: "模板名称不能为空", trigger: "blur" }
        ]
      },
      dialogTitle: "", //弹出框title
      handelType: 0, //添加 1  修改2  查看3
      validateParagraphType: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("节段题型不能为空"));
        } else {
          callback();
        }
      },
      selectParagraphType: []
    };
  },
  created() {
    this.getDictInfo("考试-试题类型", "questionTypeList");
  },
  methods: {
    // 点击下拉框的时查询试卷类型
    getDictInfo(name, codeName) {
      this.$store.dispatch("findAllDrawerByName", name).then(res => {
        if (res.code === 200) {
          if (codeName === "questionTypeList") {
            this.questionTypeList = res.data;
          }
        } else {
          console.info("没有查询到数据");
        }
      });
    },
    // 选择节段题型
    typeChange(val, item){
      const typeIndex = this.selectParagraphType.indexOf(val);
      if(typeIndex === -1){
        this.selectParagraphType.push(val);
      }else{
        this.$message({ type: 'warning', message: '节段题型不能重复' });
      }
    },
    // 添加节段
    add() {
      this.tableData.push({ code: this.tableData.length + 1, paragraphId: "" });
    },
    // 添加节段设置数字类型值
    setNumVal(item, attr) {
      if (item[attr] !== undefined && item[attr].length) {
        item[attr] = item[attr].replace(/[^\d]/g, "");
      }
    },
    // 删除节段
    deleteRow1(index) {
      this.deleteDate.push(this.tableData[index]);
      this.tableData.splice(index, 1);
      this.tableData.forEach((item, index) => {
        item.code = index + 1;
      });
    },
    // 表单校验
    verificationForm() {
      const validatePromise = [];
      for (const key in this.$refs) {
        if(this.$refs[key].length === 0){
          break
        }
        const validate = new Promise((resolve, reject) => {
          if (key === "tempForm") {
            this.$refs.tempForm.validate(valid => {
              let val = valid;
              if (val && this.tableData.length === 0) {
                this.$message({ type: "warning", message: "请添加节段" });
                val = false;
              }
              resolve(val);
            });
          } else if (this.$refs[key][0]) {
            this.$refs[key][0].validate(valid => {
              resolve(valid);
            });
          }
        });
        validatePromise.push(validate);
      }
      Promise.all(validatePromise).then(values => {
        if (values.indexOf(false) < 0) {
          const types = [];
          this.tableData.map(item => {
            if(types.indexOf(item.paragraphType) === -1){
              types.push(item.paragraphType);
            }
          });
          if(types.length < this.tableData.length){
            this.$message({ type: 'warning', message: '节段题型不能重复' });
          }else{
            this.submit();
          }
        }
      });
    },
    //提交
    submit() {
      let _this = this;
      const loading = this.$loading({
        lock: true,
        text: "正在保存",
        spinner: "car-loading",
        customClass: "loading-box",
        background: "rgba(234,237,244, 0.8)"
      });
      if (_this.handelType == 1) {
        let data1 = {
          templeteName: this.addTempleteForm.templeteName,
          paragraphList: this.tableData
        };
        let data = {
          templete: JSON.stringify(data1)
        };
        _this.$store.dispatch("addPageTemplete", data).then(
          res => {
            loading.close();
            if (res.code == 200) {
              _this.$emit("getTempleteComp");
              _this.$message({
                type: "success",
                message: "添加成功!"
              });
              _this.closeDialog();
            }
          },
          err => {
            loading.close();
          }
        );
      } else if (_this.handelType == 2) {
        //修改
        _this.oldTableData.forEach(oldItem => {
          _this.tableData.forEach(item => {
            if (item.paragraphId == oldItem.paragraphId) {
              //修改
              if (
                oldItem.paragraphType == item.paragraphType &&
                oldItem.paragraphSum == item.paragraphSum &&
                oldItem.paragraphNum == item.paragraphNum
              ) {
                item["isUpdate"] = "0";
              } else {
                item["isUpdate"] = "1";
              }
            } else if (item.paragraphId == "") {
              //新增
              item["isUpdate"] = "3";
            }
          });
        });
        let tableDataSub = _this.tableData;
        tableDataSub = JSON.parse(JSON.stringify(tableDataSub));
        _this.deleteDate.forEach(item => {
          item["isUpdate"] = "2";
          tableDataSub.push(item);
        });
        let data1 = {
          templeteName: _this.addTempleteForm.templeteName,
          templeteId: _this.addTempleteForm.templeteId,
          paragraphList: tableDataSub
        };
        let data = {
          templete: JSON.stringify(data1)
        };
        _this.$store.dispatch("updatePageTemplete", data).then(
          res => {
            loading.close();
            _this.$emit("getTempleteComp");
            _this.$message({
              type: "success",
              message: "修改成功!"
            });
            _this.closeDialog();
          },
          err => {
            loading.close();
          }
        );
      }
    },
    showModal(row, type) {
      this.visible = true;
      this.handelType = type;
      this.addTempleteForm.templeteName = "";
      this.addTempleteForm.templeteId = "";
      this.deleteDate.splice(0, this.deleteDate.length);
      if (type == 1) {
        //新增
        this.dialogTitle = "新增模板";
      } else if (type == 2) {
        //修改,查看
        this.dialogTitle = "修改模板";
        this.addTempleteForm.templeteName = row.templeteName;
        this.addTempleteForm.templeteId = row.templeteId;
        this.getTempletMsg(row);
      }
    },
    //查询模板节段信息
    getTempletMsg(row) {
      let _this = this;
      let data = {
        id: row.templeteId
      };
      _this.$store.dispatch("pageTemplete", data).then(
        res => {
          if (res.code == "200") {
            _this.tableData = res.data.paragraphList;
            _this.oldTableData = JSON.parse(
              JSON.stringify(res.data.paragraphList)
            );
            _this.tableData.forEach((item, index) => {
              item.code = index + 1;
              _this.selectParagraphType.push(item.paragraphType);
            });
          } else {
            _this.$message({
              type: "error",
              message: "查询异常"
            });
          }
        },
        err => {
          _this.$message({ type: "error", message: err.msg || "" });
        }
      );
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      if (this.tableData.length) {
        this.tableData.forEach((item, index) => {
          delete this.$refs[`segment${index}`]
        })
      }
      this.tableData.splice(0, this.tableData.length);
      this.dataSources = [];
      this.addTempleteForm.templeteName = "";
      this.addTempleteForm.templeteId = "";
      this.$refs["tempForm"].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
.align-center {
  margin: 0 auto; /* 居中 这个是必须的，，其它的属性非必须 */
  width: 30%; /* 给个宽度 顶到浏览器的两边就看不出居中效果了 */

  text-align: center; /* 文字等内容居中 */
}
.add-temp-dialog {
  .add-segment {
    margin-bottom: 30px;
    text-align: center;
    .add-room {
      padding: 14px 120px;
      color: #4573d0;
    }
  }
  .segment-list {
    margin-top: 20px;
  }
}
</style> 