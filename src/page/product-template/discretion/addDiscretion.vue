<template>
      <el-dialog :title="dialogTitle" 
      :visible.sync="visible" 
      @close="closeTitle" 
      :close-on-click-modal="false"
       width="30%">

        <el-form :model="addDiscretionForm" :rules="rules" ref="addDiscretionForm" label-width="80px">
          <el-form-item label="违法行为" prop="causeId">
            <el-input v-model="addDiscretionForm.causeId"></el-input>
          </el-form-item>
          <el-form-item label="发布文号" prop="strNumber">
            <el-input v-model="addDiscretionForm.strNumber"></el-input>
          </el-form-item>
          <el-form-item label="发布机关" prop="strOrgan">
            <el-input v-model="addDiscretionForm.strOrgan"></el-input>
          </el-form-item>
          <el-form-item label="法规效力" prop="drawerName">
            <el-select v-model="addDiscretionForm.drawerId" placeholder="请选择">
              <el-option v-for="item in lawLimitList" 
              :key="item.id" 
              :label="item.name" 
              :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="网站链接" prop="webLink">
            <el-input v-model="addDiscretionForm.webLink"></el-input>
          </el-form-item>
          <el-form-item label="行业类型" prop="industryType">
            <el-select v-model="addDiscretionForm.industryTypeId" placeholder="请选择">
              <el-option v-for="item in lawCateList" 
              :key="item.cateId" 
              :label="item.cateName" 
              :value="item.cateId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布时间" prop="dtmDate">
            <el-date-picker v-model="addDiscretionForm.dtmDate" type="date" placeholder="选择发布时间" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="实施时间" prop="shiDate">
            <el-date-picker v-model="addDiscretionForm.shiDate" type="date" placeholder="选择发布时间" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="时效性" prop="status">
            <el-select v-model="addDiscretionForm.status" placeholder="请选择">
              <el-option label="有效" :value="0"></el-option>
              <el-option label="无效" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="题注" prop="strNote">
            <el-input  type="textarea" :rows="2" v-model="addDiscretionForm.strNote"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="addEditbtnlaw">确 定</el-button>
        </span>
      </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import {addDiscretionApi} from "@/api/system";
export default {
  data() {
      return {
        addDiscretionForm:{

        },
        rules: {
          strName: [{ required: true, message: "法规标题必须填写", trigger: "blur" }],
          strNumber: [{ required: true, message: "发布文号必须填写", trigger: "blur" }],
          strOrgan: [{ required: true, message: "发布机关必须填写", trigger: "blur" }],
          drawerName: [{ required: true, message: "法规效力必须填写", trigger: "blur" }],
        }
      }
    },
  }
</script>


<style lang="scss" src="@/assets/css/systemManage.scss"></style>
