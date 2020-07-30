

//行政检查公共方法
export const mixinInspection = {
    //通用数据
    data() {
        return {
            currentPage: 1, //当前页
            pageSize: 10,   //pagesize
            totalPage: 0,   //总页数
            tableData: [],  //列表数据
            dialogFormVisible: false,
            dialogStatus: '',
        }
    },
    methods: {
        //--------------------------双随机-开始
        // 查询
        searchTableData() {
            this.currentPage = 1;
            this.getTableData()
        },
        //更改每页显示的条数
        handleSizeChange(val) {
            this.pageSize = val;
            this.currentPage = 1;
            this.getTableData();
        },
        //更换页码
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getTableData();
        },
        // 重置
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        // 添加-弹窗
        addMethod() {
            this.dialogStatus = '新增'
            this.dialogFormVisible = true
        },
        // 修改
        editMethod(row) {
            this.addForm = JSON.parse(JSON.stringify(row))
            this.dialogStatus = '修改'
            this.dialogFormVisible = true
        },
        // 导出
        exportMethod() { },
        // 导入
        importModle() { },
        // 下载模板
        downloadModle() { },
        //根据id删除
        deleteById(methodName, id) {
            this.$confirm("确定要删除吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                iconClass: 'el-icon-question',
                customClass: 'custom-confirm'
            }).then(() => {
                this.$store.dispatch(methodName, id).then(res => {
                    if (res.code === 200) {
                        this.$message({ type: "success", message: "删除成功!" });
                        this.currentPage = 1;
                        this.getTableData()
                    }
                },
                    err => { console.log(err); }
                );
            }).catch(() => { });
        },
        //页面列表查询
        getPageList(methodName, data) {
            this.tableLoading = true
            this.$store.dispatch(methodName, data).then(res => {
                if (res.code === 200) {
                    this.tableData = res.data.records;
                    this.totalPage = res.data.total;
                }
                this.tableLoading = false;
            }, err => {
                this.$message({ type: "error", message: err.msg || '' });
                this.tableLoading = false;
            });
        },
        //人员信息列表打开
        openPersonTag(methodName, data, param) {
            this.$store.commit(methodName, data, param);
            this.$router.push({
                name: 'personDetailPage',
                params: {
                    personInfo: data,
                    pageStatus: param
                }
            });
        },
        //--------------------------双随机-结束
    }
}