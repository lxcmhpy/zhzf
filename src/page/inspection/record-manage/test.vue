<template>
  <div class="com_searchAndpageBoxPadding">
    <div>
      <el-select v-model="value1" placeholder="请选择">
        <el-option v-for="item in haha" :key="item.id" :label="item.label" :value="item.id" :disabled="disabledChoose(item)">
        </el-option>
      </el-select>
      <el-select v-model="value2" placeholder="请选择">
        <el-option v-for="item in haha" :key="item.id" :label="item.label" :value="item.id" :disabled="disabledChoose(item)">
        </el-option>
      </el-select>
      <el-select v-model="value3" placeholder="请选择">
        <el-option v-for="item in haha" :key="item.id" :label="item.label" :value="item.id" :disabled="disabledChoose(item)">
        </el-option>
      </el-select>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      value1: '',
      value2: '',
      value3: '',
      haha: [{
        id: 1,
        value: '选项1',
        label: '黄金糕'
      }, {
        id: 2,
        value: '选项2',
        label: '双皮奶',
        disabled: true
      }, {
        id: 3,
        value: '选项3',
        label: '蚵仔煎'
      }, {
        id: 4,
        value: '选项4',
        label: '龙须面'
      }, {
        id: 5,
        value: '选项5',
        label: '北京烤鸭'
      }],
    }
  },

  computed: {
    disabledChoose(item) {
      return function (item) {
        let findItemIndex = [this.value1, this.value2, this.value3].findIndex(item2 => item2 == item.id);
        console.log('findItemIndex', findItemIndex)

        let newArr = [this.value1, this.value2, this.value3].splice(findItemIndex, 1);
        console.log('newArr', newArr)
        return newArr.includes(item.id);
      }
    }
  },
  methods: {
    showToggle(item) {
      item.isSubShow = !item.isSubShow //需要展开内容，显示与隐藏之间切换
    },
    toDetail(item) {
      this.$router.push('/helpDetails/' + item)
    },
  },
  mounted() {
  }
}
</script>
<style lang="scss" src="@/assets/css/card.scss"></style>