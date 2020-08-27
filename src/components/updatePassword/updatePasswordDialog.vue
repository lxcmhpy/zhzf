<template>
  <el-dialog title="密码重置申请" width="400px" :visible.sync="dialogVisible" append-to-body>
    <div class="form_box">
      <div class="formC1">
        <el-form :model="resetForm" :rules="rules" ref="resetForm" class="demo-ruleForm">
          <el-form-item prop="username">
            <el-input placeholder="请输入用户名" disabled v-model="resetForm.username">
              <i slot="prefix">
                <svg t="1582619936338" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1150" width="16" height="16">
                  <path d="M652.3 562.7C741.6 513.3 802 418.2 802 309c0-160.2-129.8-290-290-290-160.2 0-290 129.8-290 290 0 109.2 60.4 204.3 149.7 253.7C184 622.2 48 797.7 48 1005l58 0c0-224.2 181.8-406 406-406 224.2 0 406 181.8 406 406l58 0C976 797.7 840 622.2 652.3 562.7zM280 309c0-128.1 103.9-232 232-232 128.1 0 232 103.9 232 232 0 128.1-103.9 232-232 232C383.9 541 280 437.1 280 309z" p-id="1151" fill="#9FA3AF"></path>
                </svg>
              </i>
            </el-input>
          </el-form-item>
          <el-form-item prop="oldPassword">
            <el-input placeholder="请输入原始密码" v-model="resetForm.oldPassword" type="password">
              <i slot="prefix">
                <svg t="1582620094865" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2310" width="16" height="16">
                  <path d="M788.081778 435.2c41.585778 0 75.292444 34.389333 75.292444 76.8v358.4c0 42.410667-33.706667 76.8-75.292444 76.8H235.918222c-41.585778 0-75.292444-34.389333-75.292444-76.8V512c0-42.410667 33.706667-76.8 75.292444-76.8h552.163556z m0-76.8H235.918222C152.746667 358.4 85.333333 427.178667 85.333333 512v358.4C85.333333 955.221333 152.746667 1024 235.918222 1024h552.163556C871.253333 1024 938.666667 955.221333 938.666667 870.4V512c0-84.821333-67.413333-153.6-150.584889-153.6zM512 76.8c97.024 0 175.672889 80.213333 175.672889 179.2v102.4H336.327111V256c0-98.986667 78.648889-179.2 175.672889-179.2zM512 0c-138.609778 0-250.993778 114.631111-250.993778 256v179.2h501.987556V256c0-141.368889-112.355556-256-250.993778-256z m0 806.4c-20.792889 0-37.660444-17.180444-37.660444-38.4v-153.6c0-21.219556 16.867556-38.4 37.660444-38.4 20.792889 0 37.660444 17.180444 37.660444 38.4V768c0 21.219556-16.867556 38.4-37.660444 38.4z" fill="#9FA3AF" p-id="2311"></path>
                </svg>
              </i>
            </el-input>
          </el-form-item>
          <el-form-item prop="newPassword">
            <el-input placeholder="请输入新密码" v-model="resetForm.newPassword" type="password">
              <i slot="prefix">
                <svg t="1582620094865" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2310" width="16" height="16">
                  <path d="M788.081778 435.2c41.585778 0 75.292444 34.389333 75.292444 76.8v358.4c0 42.410667-33.706667 76.8-75.292444 76.8H235.918222c-41.585778 0-75.292444-34.389333-75.292444-76.8V512c0-42.410667 33.706667-76.8 75.292444-76.8h552.163556z m0-76.8H235.918222C152.746667 358.4 85.333333 427.178667 85.333333 512v358.4C85.333333 955.221333 152.746667 1024 235.918222 1024h552.163556C871.253333 1024 938.666667 955.221333 938.666667 870.4V512c0-84.821333-67.413333-153.6-150.584889-153.6zM512 76.8c97.024 0 175.672889 80.213333 175.672889 179.2v102.4H336.327111V256c0-98.986667 78.648889-179.2 175.672889-179.2zM512 0c-138.609778 0-250.993778 114.631111-250.993778 256v179.2h501.987556V256c0-141.368889-112.355556-256-250.993778-256z m0 806.4c-20.792889 0-37.660444-17.180444-37.660444-38.4v-153.6c0-21.219556 16.867556-38.4 37.660444-38.4 20.792889 0 37.660444 17.180444 37.660444 38.4V768c0 21.219556-16.867556 38.4-37.660444 38.4z" fill="#9FA3AF" p-id="2311"></path>
                </svg>
              </i>
            </el-input>
          </el-form-item>
          <div class="cats-t-center">
            <el-button type="primary" @click="resetPwd('resetForm')">确认修改密码
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { validatePwd } from '@/common/js/validator.js'
export default {
  data() {
    return {
      dialogVisible: false,
      resetForm: {
        username: '',
        oldPassword: '',
        newPassword: '',
        id: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: '必填',
            trigger: 'blur'
          }
        ],
        oldPassword: [
          {
            required: true,
            message: '必填',
            trigger: 'blur'
          }
        ],
        newPassword: [
          {
            required: true,
            message: '必填',
            trigger: 'blur'
          },
          {
            validator: validatePwd,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  props: ['userInfo'],
  methods: {
    updatePwdDialog(data) {
      this.dialogVisible = data
    },
    resetPwd(formName) {
      let _this = this
      // this.$store.commit(types.SET_AUTHTOKEN, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsaWNlbnNlIjoiTWFkZSBCeSBDQVRTSUMiLCJ1c2VyX25hbWUiOiJ7XCJhdmF0YXJcIjpcImh0dHBzOi8vaS5sb2xpLm5ldC8yMDE5LzA0LzI4LzVjYzVhNzFhNmUzYjYucG5nXCIsXCJkZXBhcnRtZW50SWRcIjpcIjJcIixcImlkXCI6XCI2ODIyNjU2MzM4ODYyMDhcIixcIm1vYmlsZVwiOlwiMTg3ODIwNTkwMzhcIixcIm5pY2tOYW1lXCI6XCJnZmhkZ2huZmdqXCIsXCJvcmdhbklkXCI6XCIxXCIsXCJwYXNzd29yZFwiOlwiJDJhJDEwJHNzR0YuT0dQMTJDcldGMlJUVWNOZGUwZzUxSGgwckc2eTlHZTVGejZDd25rRWhreHV6Um95XCIsXCJwYXNzd29yZFN0YXR1c1wiOjAsXCJzZXhcIjpcIueUt1wiLFwic3RhdHVzXCI6MCxcInR5cGVcIjoxLFwidXNlcm5hbWVcIjpcImFkbWluXCJ9Iiwic2NvcGUiOlsic2VydmVyIl0sImV4cCI6MTU4MzkzMzIyMCwiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdLCJqdGkiOiIwNjQzOWRkOC0yZWQ3LTQzNzUtODgzZC04ZTI3ODJhNjBmNWIiLCJjbGllbnRfaWQiOiJjYXRzaWMifQ.Btlg5kx2xQY7xCbHuODly-hNICluoD-SbrA0S7lHBEE'); //token
      // _this.getMenu();
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 验证码]
          updatePassword(_this.resetForm).then(res => {
            _this
              .$alert('修改成功，点击确认，重新登录', '提示', {
                confirmButtonText: '确定',
                customClass: 'custom-confirm'
              })
              .then(() => {
                _this.$router.push({
                  name: 'login'
                })
              })
          })
        }
      })
    }
  },
  mounted() {
    this.resetForm.username = this.userInfo.username
    this.resetForm.id = this.userInfo.id
  }
}
</script>
