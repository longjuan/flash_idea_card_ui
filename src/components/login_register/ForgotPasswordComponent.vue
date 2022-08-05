<template>
  <div>
    <el-form label-width="90px" style="min-width: 400px;">
      <el-form-item label="邮&nbsp;&nbsp;&nbsp;&nbsp;箱：">
        <el-input name="username" v-model="resetData.username" size="large"></el-input>
      </el-form-item>
      <el-form-item label="请验证：">
        <recaptcha :callback="recaptchaCallback"></recaptcha>
      </el-form-item>
      <el-form-item label="邮件验证：">
        <div style="display: flex;">
          <el-input v-model="resetData.verifyCode" size="large" maxlength="6"></el-input>
          <el-button size="large" type="success" @click="fetchVerifyCode">获取验证码</el-button>
        </div>
      </el-form-item>
      <el-form-item label="新密码：">
        <el-input name="password" type="password" v-model="resetData.password" size="large"></el-input>
      </el-form-item>
      <el-form-item label="确认密码：">
        <el-input name="ensure_password" type="password" v-model="resetData.ensure_password"
                  size="large"></el-input>
      </el-form-item>
      <el-button type="primary" style="width: 100%" @click="resetPassword" size="large">重置密码</el-button>
    </el-form>
  </div>
</template>

<script>
import Recaptcha from "@/components/recaptcha";
import {reactive} from "vue";
import {ElMessage} from "element-plus";
import {getVerifyCode} from "@/network/mail";
import {resetPasswordReq} from "@/network/login_register";
export default {
  name: "ForgotPasswordComponent",
  components: {
    Recaptcha
  },
  setup(){
    const resetData = reactive({
      username: "",
      password: "",
      ensure_password: "",
      verifyCode: ""
    })

    let captcha = "";

    const recaptchaCallback = (token) => {
      captcha = token;
    }

    const email_regex = /^([a-zA-Z0-9]+[_|_|\-|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$/;

    const fetchVerifyCode = ()=>{
      if (!email_regex.test(resetData.username)) {
        ElMessage({
          message: "邮箱错误",
          type: 'error'
        })
        return;
      }
      if (captcha === undefined || captcha.length === 0) {
        ElMessage({
          message: "请先验证",
          type: 'error'
        })
        return;
      }
      getVerifyCode({email: resetData.username, captcha: captcha, registered: true}).then(() => {
        ElMessage({
          message: "验证码已发送",
          type: 'success'
        })
      })
    }
    
    const resetPassword = () => {
      if (!email_regex.test(resetData.username)) {
        ElMessage({
          message: "邮箱错误",
          type: 'error'
        })
        return;
      }
      if (resetData.password !== resetData.ensure_password) {
        ElMessage({
          message: "两次输入密码不一致",
          type: 'error'
        })
        return;
      }
      if (resetData.password.length < 6 || resetData.username.length > 50) {
        ElMessage({
          message: "密码长度应在6-50",
          type: 'error'
        })
        return;
      }

      resetPasswordReq({
        username: resetData.username, password: resetData.password, captcha: captcha, verifyCode: resetData.verifyCode
      }).then(() => {
        ElMessage({
          message: "重置密码成功",
          type: 'success'
        })
      })
    }

    return {
      resetData,
      recaptchaCallback,
      fetchVerifyCode,
      resetPassword
    }
  }
}
</script>

<style scoped>

</style>