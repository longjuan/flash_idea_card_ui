<template>
  <div>
    <el-form label-width="90px" style="min-width: 400px;">
      <el-form-item label="邮&nbsp;&nbsp;&nbsp;&nbsp;箱：">
        <el-input name="username" v-model="registerData.username" size="large"></el-input>
      </el-form-item>
      <el-form-item label="请验证：">
        <recaptcha :callback="recaptchaCallback"></recaptcha>
      </el-form-item>
      <el-form-item label="邮件验证：">
        <div style="display: flex;">
          <el-input v-model="registerData.verifyCode" size="large" maxlength="6"></el-input>
          <el-button size="large" type="success" @click="fetchVerifyCode">获取验证码</el-button>
        </div>
      </el-form-item>
      <el-form-item label="密&nbsp;&nbsp;&nbsp;&nbsp;码：">
        <el-input name="password" type="password" v-model="registerData.password" size="large"></el-input>
      </el-form-item>
      <el-form-item label="确认密码：">
        <el-input name="ensure_password" type="password" v-model="registerData.ensure_password"
                  size="large"></el-input>
      </el-form-item>
      <el-button type="primary" style="width: 100%" @click="register" size="large">注册</el-button>
    </el-form>
  </div>
</template>

<script>
import Recaptcha from "@/components/recaptcha";
import {reactive} from "vue";
import {ElMessage} from "element-plus";
import {getVerifyCode} from "@/network/mail";
import {registerReq} from "@/network/login_register";
export default {
  name: "RegisterComponent",
  components: {
    Recaptcha
  },
  props: {
    transform: Function
  },
  setup(props){

    let captcha = "";

    const recaptchaCallback = (token) => {
      captcha = token;
    }

    const registerData = reactive({
      username: "",
      password: "",
      ensure_password: "",
      verifyCode: ""
    })

    const email_regex = /^([a-zA-Z0-9]+[_|_|\-|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$/;

    const fetchVerifyCode = ()=>{
      if (!email_regex.test(registerData.username)) {
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
      getVerifyCode({email: registerData.username, captcha: captcha, registered: false}).then(() => {
        ElMessage({
          message: "验证码已发送",
          type: 'success'
        })
      })
    }

    const register = () => {
      if (!email_regex.test(registerData.username)) {
        ElMessage({
          message: "邮箱错误",
          type: 'error'
        })
        return;
      }
      if (registerData.password !== registerData.ensure_password) {
        ElMessage({
          message: "两次输入密码不一致",
          type: 'error'
        })
        return;
      }
      if (registerData.password.length < 6 || registerData.username.length > 50) {
        ElMessage({
          message: "密码长度应在6-50",
          type: 'error'
        })
        return;
      }

      registerReq({
        username: registerData.username, password: registerData.password, captcha: captcha, verifyCode: registerData.verifyCode
      }).then(() => {
        // loginData.username = registerData.username
        // loginData.password = registerData.password
        ElMessage({
          message: "注册成功",
          type: 'success'
        })
        props.transform(1);
      })
    }


    return {
      recaptchaCallback,
      registerData,
      fetchVerifyCode,
      register
    }
  }
}
</script>

<style scoped>

</style>