<template>
    <div class="com_searchAndpageBoxPadding">

        <el-table
        :data="tableData"
        border
        :span-method="objectSpanMethod"
        style="width: 100%;">
        <!--  -->
            <el-table-column
                prop="name"
                label="姓名">
            </el-table-column>
            <el-table-column
                prop="id"
                label="ID"
                width="180">
            </el-table-column>
            <el-table-column
                prop="amount1"
                label="数值 1（元）">
            </el-table-column>
            <el-table-column
                prop="amount2"
                label="数值 2（元）">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.amount2" placeholder="请输入数值"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                prop="amount3"
                label="数值 3（元）">
            </el-table-column>
                <el-table-column
                label="操作">
                <template>
                    <el-button>添加</el-button>
                    <el-button>修改</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- {{JSON.stringfy(tableData)}} -->
    </div>
</template>
<script>
export default {
    data () {
        return {
            tableData: [{
                id: '12987122',
                    name: '王小虎',
                    amount1: '234',
                    amount2: '3.2',
                    amount3: 10
                }, {
                id: '12987122',
                    name: '王小虎',
                    amount1: '165',
                    amount2: '4.43',
                    amount3: 12
                }, {
                    id: '12987124',
                    name: '王小虎',
                    amount1: '324',
                    amount2: '1.9',
                    amount3: 9
                }, {
                    id: '12987125',
                    name: '王小虎',
                    amount1: '621',
                    amount2: '2.2',
                    amount3: 17
                }, {
                    id: '12987126',
                    name: '王小虎',
                    amount1: '539',
                    amount2: '4.1',
                    amount3: 15
                }]
        }
    },
    methods: {
        // (row，column,第行数，第列数)
       objectSpanMethod({ row, column, rowIndex, columnIndex }) {
           // 第一列合并规则
            if (columnIndex === 0) {
                // 当前行数 % 需要合并的行数
                if (rowIndex % 5 === 0) {
                    return {
                        rowspan: 5,
                        colspan: 1
                    };
                } else {
                    return {
                        rowspan: 0,
                        colspan: 0
                    };
                }
            }
            if (columnIndex === 1) {
                if (rowIndex % 2 === 0) {
                    return {
                        rowspan: 2,
                        colspan: 1
                    };
                } else {
                    return {
                        rowspan: 0,
                        colspan: 0
                    };
                }
            }
      }
    }
}
</script>
