<template>
<div class="main_box">
   <div class="shadow">
        <div class="box w-2">
            <div class="box_title">
                <span class="titleflag">
                </span>
                <span class="title">历史称重记录</span>
            </div>
            <div>
               <el-table :data="tableData" stripe resizable border style="width: 100%;height:100%;" >
                <el-table-column type="selection" width="35px" align="center"></el-table-column>
                <el-table-column prop="checkTime" width="55px" label="序号" align="center"></el-table-column>
                <el-table-column prop="organName" label="检测时间" align="center"></el-table-column>
                <el-table-column prop="lane" label="检测站点" align="center"></el-table-column>
                <el-table-column label="ETC" align="center"  width="55px">
                    <template slot-scope="scope">
                        <div>{{scope.row}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="totalWeight" width="160px" label="最大允许总质量" align="center"></el-table-column>
                <el-table-column prop="load"  label="车货总质量" align="center"></el-table-column>
                <el-table-column prop="overweight" width="55px" label="超限" align="center"></el-table-column>
                <el-table-column prop="overload" label="处理状态" align="center"></el-table-column>
            </el-table>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: ['obj'],
    data () {
        return {
            tableData: []
        }
    }
}
</script>
