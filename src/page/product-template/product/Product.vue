<template>
  <div>
    <el-form :inline="true" :model="inquestNotesForm">
        
     <el-form-item label="案由：" ><el-input style="width:500px;" v-model="inquestNotesForm.caseName"></el-input></el-form-item><br>
     <el-form-item label="勘验时间："><el-date-picker v-model="inquestNotesForm.inquestStartTime"></el-date-picker></el-form-item>
     <el-form-item label="至"><el-time-picker v-model="inquestNotesForm.inquestEndTime"></el-time-picker></el-form-item><br>
     <el-form-item label="勘验场所："><el-input v-model="inquestNotesForm.inquestAddress"></el-input></el-form-item>
     <el-form-item label="天气情况："><el-select v-model="inquestNotesForm.weather"></el-select></el-form-item><br>
     <el-form-item label="勘验人员1："><el-input v-model="inquestNotesForm.weather"></el-input></el-form-item>
     <el-form-item label="单位及职务："><el-input></el-input></el-form-item>
     <el-form-item label="执法证号："><el-input></el-input></el-form-item><br>
     <el-form-item label="勘验人员2："><el-select></el-select></el-form-item>
     <el-form-item label="单位及职务："><el-input></el-input></el-form-item>
     <el-form-item label="执法证号："><el-input></el-input></el-form-item><br>
     <el-form-item label="现场人员基本情况："></el-form-item><br>
     <el-form-item label="当事人（代理人）姓名："><el-input></el-input></el-form-item>
     <el-form-item label="身份证号："><el-input></el-input></el-form-item><br>
     <el-form-item label="性别："><el-select></el-select></el-form-item>
     <el-form-item label="年龄："><el-input></el-input></el-form-item>
     <el-form-item label="单位及职务："><el-input></el-input></el-form-item><br>
     <el-form-item label="住址："><el-input></el-input></el-form-item>
     <el-form-item label="联系电话："><el-input></el-input></el-form-item><br>
     <el-form-item label="被邀请人："><el-input></el-input></el-form-item>
     <el-form-item label="单位及职务："><el-input></el-input></el-form-item><br>
     <el-form-item label="记录人："><el-input></el-input></el-form-item>
     <el-form-item label="单位及职务："><el-input></el-input></el-form-item><br>
     <el-form-item label="记录人："><el-input></el-input></el-form-item>
     <el-form-item label="单位及职务："><el-input></el-input></el-form-item><br>
     <el-form-item label="勘验情况及结果："><textarea style="width:500px;height:300px;"></textarea></el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
    data(){
        return{
            inquestNotesForm:{
                caseName:'',
                inquestStartTime:'',
                inquestEndTime:'',
                inquestAddress:'',
                weather:'',

            }
        }
    }
}

</script>