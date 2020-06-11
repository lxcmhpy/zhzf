<template>
    <div>
        页面样式
    </div>
</template>
<script>
export default {
    name: "examPage",//考试试卷详情
    data(){
        return {
            pageQuestionForm:{
                pqId:'',
                pageId:'',
                questionId:'',
                paragraphId:'',
                questionType:'',
                questionLevel:'',
                questionName:'',
                questionPicture:'',
                score:'',
                orderNo:'',
                outlineId:'',
                listPo:[],//选项数组
            }
        }
    },
    methods:{
        //1.个人基本信息从上一个页面带入
        //2.考题序号从上一个页面带入
        //3.点击下一道题
        getNextQuestion(){
            let data={
                orderNo:'',//题目序号需要处理
                examPerId:'',//参考人员id
                examId:'',//考试id
            }
            this.$store.dispatch("getpersonExamQuestionNext",data).then(
                res=>{
                    if(res.code===200){
                        this.pageQuestionForm=res.data;
                    }
                },error={

                }).catch(()=>{});
        },
        //4.我要交卷
        submitAll(){
            let data={

            }
            this.$store.dispatch("getexamResultSubmit",data).then(
                res=>{
                    
                },error=>{

                }).catch(()=>{}); 
        }
    }
}
</script>
<style lang="scss">

</style>