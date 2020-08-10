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
                <!-- <el-table-column type="selection" width="35px" align="center"></el-table-column> -->
                <el-table-column type="index" width="55px" label="序号" align="center"></el-table-column>
                <el-table-column prop="checkTime" label="检测时间" width="105" align="center"></el-table-column>
                <el-table-column prop="siteName" label="检测站点" align="center"></el-table-column>
                <el-table-column label="ETC" align="center"  width="55px">
                    <template slot-scope="scope">
                        {{scope.row.etc=='是'?scope.row.etc:'否'}}
                    </template>
                </el-table-column>
                <el-table-column prop="approvedLoad" width="160px" label="OBU最大允许总质量" align="center"></el-table-column>
                <el-table-column prop="totalWeight"  label="车货总质量" align="center"></el-table-column>
                <el-table-column prop="overweight" width="80px" label="超限(t)" align="center">
                    <template slot-scope="scope">
                        {{scope.row.overweight/1000}}
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="处理状态" align="center"></el-table-column>
            </el-table>
            </div>
            <el-dialog class="mini-dialog-title" title="超限复核" :visible.sync="cxVisible" :show-close="false"
                 :close-on-click-modal="false" width="420px" >
                    <div class="success-message">
                        <i class="el-icon-success" ></i>
                        <p>经数据比对，{{obj.vehicleNumber}}通过违法超限复核</p>
                    </div>
                    <p>复核规则：<br>
                        <i class="circle"></i>历史12小时内，同一次超限行为<br>
                        <i class="circle"></i>本次为最小检测记录
                    </p>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="cxVisible = false">查看</el-button>
                    </span>
            </el-dialog>
        </div>
    </div>
</div>
</template>

<script>
import {findWeighingRecord} from '@/api/lawSupervise.js';
export default {
    props: ['obj'],
    data () {
        return {
            tableData: [],
            cxVisible: false
        }
    },
    methods: {
        findWeighingRecord (vehicleNumber) {
            let _this = this;
            new Promise((resolve, reject) => {
                findWeighingRecord(vehicleNumber).then(
                    res => {
                        // resolve(res);
                        _this.tableData = res.data;
                        // obj.list = res.data
                    },
                    error => {
                        //  _this.errorMsg(error.toString(), 'error')
                            return
                    }
                )
            })
        }
    },
    mounted () {
        this.cxVisible = true;
        // '新J35718'
        let aa = this.obj;
        this.findWeighingRecord(this.obj.vehicleNumber);
    }

}
</script>
