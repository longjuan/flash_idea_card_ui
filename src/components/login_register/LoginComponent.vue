<template>
  <div>
    <el-form label-width="90px" style="min-width: 400px;">
      <el-form-item label="邮&nbsp;&nbsp;&nbsp;&nbsp;箱：">
        <el-input name="username" v-model="loginData.username" size="large"></el-input>
      </el-form-item>
      <el-form-item label="密&nbsp;&nbsp;&nbsp;&nbsp;码：">
        <el-input name="password" type="password" v-model="loginData.password" size="large"></el-input>
      </el-form-item>
      <el-form-item label="请验证：">
        <recaptcha :callback="recaptchaCallback"></recaptcha>
      </el-form-item>
      <el-button type="primary" style="width: 100%; margin-top: 5px;" @click="login" size="large">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import {reactive} from "vue";
import {ElMessage} from "element-plus";
import {loginReq} from "@/network/login_register";
import router from "@/router";
import Recaptcha from "@/components/recaptcha";

export default {
  name: "LoginComponent",
  components: {
    Recaptcha
  },
  setup(){
    const loginData = reactive({
      username: "",
      password: ""
    })

    const email_regex = /^([a-zA-Z0-9]+[_|_|\-|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$/;

    let captcha = "";

    const recaptchaCallback = (token) => {
      captcha = token;
    }

    const login = () => {
      if (!email_regex.test(loginData.username)) {
        ElMessage({
          message: "邮箱错误",
          type: 'error'
        })
        return;
      }
      if (loginData.password.length < 6 || loginData.username.length > 50) {
        ElMessage({
          message: "密码长度应在6-50",
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

      return loginReq({
        username: loginData.username, password: loginData.password,
        captcha: captcha
      }).then(response => {
        localStorage.setItem("access_token", response.data.access_token)
        localStorage.setItem("refresh_token", response.data.refresh_token)
        router.push({path: "/home"})
      })
    }

    return {
      loginData,
      login,
      recaptchaCallback
    }
  }
}
</script>

<style scoped>

</style>