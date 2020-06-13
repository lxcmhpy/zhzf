<template>
    <div >
    <!-- 案件抽取 -->
        <div >
            <el-transfer width="100%" :titles="['案件列表', '已抽取案件']" v-model="value" :data="data">
                <span slot-scope="{ option }" >
                    <ul class="transfer-list" >
                        <li><span>案件编号{{ option.key }} - {{ option.label }}</span></li>
                        <li><span>案件类型{{ option.key }} - {{ option.label }}</span></li>
                        <li><span>业务领域{{ option.key }} - {{ option.label }}</span></li>
                    </ul>
                </span>
                <el-button class="transfer-footer" slot="left-header" size="small">操作</el-button>
                <el-button class="transfer-footer" slot="right-header" size="small">操作</el-button>

            </el-transfer>
        </div>
    </div>
</template>
<script>
  export default {
    data() {
      const generateData = _ => {
        const data = [];
        for (let i = 1; i <= 15; i++) {
          data.push({
            key: i,
            label: `备选项 ${ i }`,
            disabled: i % 4 === 0
          });
        }
        return data;
      };
      return {
        data: generateData(),
        value: [1, 4]
      };
    }
  };
</script>
