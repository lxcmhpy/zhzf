<template>
<!-- 检测数据核对  -->
<!--审核中、待审核、可编辑-->
<div class="main_box">
    <xszxDetailEdit :obj="obj" v-if="type =='doing'"></xszxDetailEdit>
    <xszxDetailFirstView :obj="obj" v-else></xszxDetailFirstView>
    <!-- <div class="shadow">""
        <div class="box w-2">
            <div class="box_title">
                <span class="titleflag">
                </span>
                <span class="title">相关说明</span>
            </div>
            <div>
                <el-input
                        type="textarea"
                        :rows="4"
                        placeholder="请输入内容"
                        v-model="obj.remarks">
                </el-input>
            </div>
        </div>
    </div> -->
</div>
</template>

<script>
import btns from '@/page/lawSupervise/supervisePage/xszx/componentChild/btns.vue';
import { mapGetters } from "vuex";
import xszxDetailEdit from '../xszxDetailEdit.vue';
import xszxDetailFirstView from '../xszxDetailFirstView.vue';

export default {
    props: ['obj','type'],
    data () {
        return {
            processStatus: [{
                value: '检测数据核对'
            }, {
                value: '违法超限复核'
            }, {
                value: '生成证据包'
            }],
            tabActiveValue: '检测数据核对',
        }
    },
    methods: {
    },
    mounted () {
        // alert(this.offSiteManageId);
    },
    computed: {
        // ...mapGetters(["offSiteManageId"])
    },
    components: {
        btns, xszxDetailEdit, xszxDetailFirstView
    }
}
</script>
