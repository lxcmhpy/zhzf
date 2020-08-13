<template>
  <div class="start_draw">

    <a href="http://218.84.108.27:8888/zhzfxj/jsp/main/index.jsp" target="_blank">121212</a>
    <!-- {{randomContent}}
    <ul>
      <li v-for='item in taskList' :key="item.name">{{item.name}}</li>
    </ul>
    <el-button @click="start">点击开始</el-button>
    <el-button @click="end">点击结束</el-button> -->
  </div>
</template>
<script>

export default {
  data() {
    return {
      randomContent: '',
      animate: false,
      taskList: [
        { name: "马云" },
        { name: "雷军" },
        { name: "王勤" }
      ],
      timer:''
    }
  },
  created() {
  },
  methods: {
    start() {
      this.timer= setInterval(this.scroll, 100)
    },
    end() {
      clearInterval(this.timer);
      this.timer = null;
    },
    scroll() {
      this.animate = true;    // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
     setTimeout(() => {      //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
        this.randomContent = this.taskList[0]
        this.taskList.push(this.taskList[0]);  // 将数组的第一个元素添加到数组的
        this.taskList.shift();               //删除数组的第一个元素
        this.animate = false;  // margin-top 为0 的时候取消过渡动画，实现无缝滚动
      }, 500)
    }
  }
}
</script>


<style scoped>
* {
  margin: 0;
  padding: 0;
}
#box {
  width: 300px;
  height: 32px;
  overflow: hidden;
  padding-left: 30px;
  border: 1px solid black;
}
.anim {
  transition: all 0.5s;
  margin-top: -30px;
}
#con1 li {
  list-style: none;
  line-height: 30px;
  height: 30px;
}
</style>
