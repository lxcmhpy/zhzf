
<template>
  <el-dialog title="请输入会商组名称" :visible.sync="visibles" :append-to-body="true" :show-close="false" class="addGroup_alert"   :close-on-click-modal="false" :close-on-press-escape="false">
    <button type="button" aria-label="Close" class="el-dialog__headerbtn" @click.stop="cancelModal"><i class="el-dialog__close el-icon el-icon-close"></i></button>
    <template>
      <basic-container class="">
        <template>
        <div class="addGroup">
            <div>
                <el-form ref="form" :model="form" >
                    <el-form-item label="会商组名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="contro">
                <div>
                    <el-button type="primary" @click="save">确认</el-button>
                </div>
                <div>
                    <el-button type="primary" @click="cancle">取消</el-button>
                </div>
            </div>
         </div>
        </template>
      </basic-container>
    </template>
  </el-dialog>
</template>
<script>
export default {
  name: '',
  components: {
  },
  filters: {},
  props:['visibles'],
  data() {
    return {
        form:{
            name:''
        }
    }
  },
  created() { 
  },
  methods: {
    cancelModal(){
      this.$emit('update:visibles', false);
    },
    cancle(){
        this.$emit('update:visibles', false);
    },
    save(){
        this.$emit('update:visibles', false);
    },
  }
}
</script>

<style>
.addGroup .contro{
    display: flex;
    justify-content:space-around;
    margin-top: 40px;
}
.addGroup  .contro .el-button{
    height: 35px;
    width: 100px;
}
.addGroup{
    width: 97%;
    margin: 0 auto;
}
.addGroup_alert{
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}
.addGroup_alert .el-dialog{
    margin: 0 auto !important;
    height:35% !important;
    overflow: hidden;
    width: 30% !important;
}
.addGroup_alert .el-dialog__body{
    height: 35% !important;
}
.addGroup .el-input{
    width: 70%;
}
</style>
