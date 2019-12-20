<template>
    <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-row>
                <el-col :span="13">
                    <el-form-item label="机构名称">
                        <el-input v-model="formInline.status" ></el-input>
                    </el-form-item>
                    <el-form-item label="功能名称">
                        <el-input v-model="formInline.type" ></el-input>
                    </el-form-item>
                    <el-form-item label="操作名称">
                        <el-input v-model="formInline.operation" ></el-input>
                    </el-form-item>
                    <el-form-item label="操作人">
                        <el-input v-model="formInline.username" ></el-input>
                    </el-form-item>
                    <el-form-item label="操作日期" required>
                        <el-form-item prop="date1">
                            <el-date-picker type="date" placeholder="选择日期" v-model="formInline.createTime1" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                        <el-form-item prop="date2">
                            <el-time-picker placeholder="选择时间" v-model="formInline.createTime2" style="width: 100%;"></el-time-picker>
                        </el-form-item>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item>
                        <el-button type="warning" size="mini" @click="getUserList">查询</el-button>
                        <el-button type="success" size="mini" @click="Reset('formInline')">重置</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <el-table :data="tableData" style="width: 100%">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="status" label="机构"></el-table-column>
            <el-table-column prop="ip" label="IP地址" ></el-table-column>
            <el-table-column prop="type" label="功能名称"></el-table-column>
            <el-table-column prop="operation" label="操作名称" ></el-table-column>
            <el-table-column prop="username" label="操作人" ></el-table-column>
            <el-table-column prop="createTime" label="时间"></el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          background
          :page-sizes="[10, 20, 30, 40]"
          layout="prev, pager, next,sizes,jumper"
          :total="totalPage"
        ></el-pagination>






    </div>
</template>


<script>
export default {
    data(){
        return{
            currentPage: 1, //当前页
            pageSize: 10, //pagesize
            totalPage: 0, //总页数
            tableData: [],
            formInline: {
               status:'',
                type:'',
                operation:'',
                username:'',
                createTime1:'',
                createTime2:'',
                },
            rules: {
                date1: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                date2: [
                    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ],
            },
        }
    },
    methods: {
      //表单筛选
      getUserList() {
        let data = {
          status:this.formInline.status,
            type: this.formInline.type,
            operation: this.formInline.operation,
            username: this.formInline.username,
            createTime: this.formInline.createTime1,
            createTime: this.formInline.createTime2,
            current: this.currentPage,
            size: this.pageSize,
        };
        console.log(data)
        this.$store.dispatch("getloglist", data).then(res => {
            this.tableData = res.data.records;
            console.log(res);
            })
            err => {
            console.log(err);
            };

      },

      // 日志重置
    Reset(formName) {
        this.$refs[formName].resetFields();
    },

      //更改每页显示的条数
      handleSizeChange(val) {
        console.log("每页显示的条数", val);
        this.pageSize = val;
        this.getUserList();
      },
       //更换页码
       handleCurrentChange(val) {
        console.log("当前页", val);
        this.currentPage = val;
        this.getUserList();
       },
    }
}
</script>