<template>
    <div class="com_searchAndpageBoxPadding">
        <div class="searchAndpageBox" id="logBox">
            <div class="handlePart">
                <div class="search">
                    <el-form :inline="true" :model="listEducationForm"  ref="listEducationForm">
			            <el-form-item label="学历" prop="degree">
			                <el-select v-model="listEducationForm.degree" placeholder="学历">
			                    <el-option label="demo0" value="0"></el-option>
			                    <el-option label="demo1" value="1"></el-option>
			                </el-select>
			            </el-form-item>
			            <el-form-item label="毕业专业" prop="major">
			                <el-select v-model="listEducationForm.major" placeholder="毕业专业">
			                    <el-option label="demo0" value="0"></el-option>
			                    <el-option label="demo1" value="1"></el-option>
			                </el-select>
			            </el-form-item>
			          <el-form-item label="毕业日期" prop="graduationDate">
			            <el-date-picker v-model="listEducationForm.graduationDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
			              :style="{width: '100%'}" placeholder="请选择毕业日期" clearable></el-date-picker>
			          </el-form-item>
                        <el-form-item>
                            <el-button type="primary" icon="el-icon-plus" size="medium" @click="addEducationComPage">新增</el-button>
                            <el-button type="warning" size="medium" @click="editEducation(scope.row)">修改</el-button>
                            <el-button type="info" icon="el-icon-search" size="medium" @click="getEducation">查询</el-button>
                            <el-button type="primary" size="medium" @click="resetLog">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="tablePart" style="margin-top:-35px">
                <el-table :data="tableData"
                     stripe
                     style="width: 100%;height:100%;"
                     @selection-change="selectUser">
                <el-table-column type="selection" align="center"></el-table-column>
				<el-table-column prop="educationId" v-if="show" label="" align="center"></el-table-column>
                <el-table-column prop="degree" label="学历" align="center"></el-table-column>
                <el-table-column prop="school" label="毕业院校" align="center"></el-table-column>
                <el-table-column prop="major" label="毕业专业" align="center"></el-table-column>
                <el-table-column prop="graduationDate" label="毕业日期" align="center"></el-table-column>
                <el-table-column prop="note" label="备注" align="center"></el-table-column>
                <el-table-column prop="createId" label="创建人" align="center"></el-table-column>
                <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
                <el-table-column prop="modifyId" label="操作人" align="center"></el-table-column>
                <el-table-column prop="modifyTime" label="操作日期" align="center"></el-table-column>
                <el-table-column prop="isDel" label="是否删除" align="center"></el-table-column>
                <el-table-column prop="opt" label="操作项" align="center">
                    <template slot-scope="scope">
                        <el-button  @click="editEducation(scope.row)" type="text">修改</el-button>
                        <el-button type="text"  @click="deleteEducationById(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
                </el-table>
           </div>
           <div class="paginationBox">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    background
                    :page-sizes="[10, 20, 30, 40, 50]"
                    layout="prev, pager, next,sizes,jumper"
                    :total="totalPage"
                ></el-pagination>
            </div>
        </div>
        <addEducationComp ref="addEducationCompRef" @getEducationList="getEducation"></addEducationComp>
    </div>
</template>
<script>
import addEducationComp from "./AddEducation";
export default {
    data(){
        return{
            currentPage: 1, //当前页
            pageSize: 10,   //pagesize
            totalPage: 0,   //总页数
            tableData: [],
            listEducationForm: {
                educationId: "",
                personId: "",
                degree: "",
                school: "",
                major: "",
                graduationDate: "",
                note: "",
                createId: "",
                createTime: "",
                modifyId: "",
                modifyTime: "",
                isDel: "",
            },
            selectDataIdList:[],//选中执法人员id
        }
    },
    components:{//新增组件
        addEducationComp,
    },
    methods:{
        //修改人员信息
        editEducation(row) {
            this.$refs.addEducationCompRef.showModal(2, row);
        },
        //根据id删除单个人员信息
        deleteEducationById(row){
            let _this = this
            _this.$confirm("确定要删除该人员吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                iconClass: 'el-icon-question',
                customClass: 'custom-confirm'
            }).then(() => {
                _this.$store.dispatch("deleteEducationByIdMoudle", row.educationId).then(
                    res => {
                        _this.$message({
                            type: "success",
                            message: "删除成功!"
                        });
                        //重新加载页面数据
                        _this.getEducation();
                    },
                    err => {
                    console.log(err);
                    }
                );
            }).catch(() => {});
        },
        //删除所选择的用户信息
        deleteEducation(){
            debugger;
            let _this = this
            this.$confirm("确定要删除所选的人员吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                iconClass: 'el-icon-question',
                customClass: 'custom-confirm'
            }).then(() => {
                _this.$store.dispatch("deleteEducationByIdMoudle", _this.selectDataIdList).then(
                    res => {
                        _this.$message({
                            type: "success",
                            message: "删除成功!"
                        });
                        //重新加载页面数据
                        _this.getEducation();
                    },
                    err => {
                    console.log(err);
                    }
                );
                })
                .catch(() => {});
        },
        addEducationComPage(){
            this.$refs.addEducationCompRef.showModal(1,"");
        },
        //条件查询
        getEducation() {
            let _this = this 
            let data = {
                degree:_this.listEducationForm.degree,
                major:_this.listEducationForm.major,
                graduationDate:_this.listEducationForm.graduationDate,
				current: _this.currentPage,
                size: _this.pageSize
            };
            _this.$store.dispatch("getEducationListMoudle", data).then(res => {
                _this.tableData = res.data.records;
                _this.totalPage = res.data.total;
            });
            err => {
                console.log(err);
            };
        },
        // 重置
        resetLog() {
            this.$refs["listEducationForm"].resetFields();
        },
        //更改每页显示的条数
        handleSizeChange(val) {
            this.pageSize = val;
            this.getEducation();
        },
        //更换页码
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getEducation();
        },
         //获取选中的user
        selectUser(val) {
            this.selectDataIdList = [];
            val.forEach((item,index) => {
                this.selectDataIdList.push(item.educationId);
            });
        }
    },
    created() {
        this.getEducation();
    }
}
</script>
<style lang="scss">
  @import "@/assets/css/personManage.scss";
</style>
