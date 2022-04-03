<template>
  <div class="info-form">
    <div v-if="mode === 1">
      <el-form label-width="90px">
        <el-form-item label="邮&nbsp;&nbsp;&nbsp;&nbsp;箱：">
          <el-input name="username" v-model="loginData.username"></el-input>
        </el-form-item>
        <el-form-item label="密&nbsp;&nbsp;&nbsp;&nbsp;码：">
          <el-input name="password" type="password" v-model="loginData.password" @keydown.enter="login"></el-input>
        </el-form-item>
        <el-button type="primary" style="width: 100%; margin-top: 5px;" @click="login">登录</el-button>
      </el-form>
      <el-button type="success" style="width: 100%; margin-top: 13px;" @click="message">免登陆试用</el-button>
      <el-button type="text" style="margin-top: 8px; float: right;" @click="switch_mode(2)">去注册</el-button>
    </div>
    <div v-if="mode === 2">
      <el-form label-width="90px">
        <el-form-item label="邮&nbsp;&nbsp;&nbsp;&nbsp;箱：">
          <el-input name="username" v-model="registerData.username"></el-input>
        </el-form-item>
        <el-form-item label="密&nbsp;&nbsp;&nbsp;&nbsp;码：">
          <el-input name="password" type="password" v-model="registerData.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：">
          <el-input name="ensure_password" type="password" v-model="registerData.ensure_password"></el-input>
        </el-form-item>
        <el-button type="primary" style="width: 100%" @click="register">注册</el-button>
      </el-form>
      <el-button type="text" style="margin-top: 8px; float: right;" @click="switch_mode(1)">去登录</el-button>
    </div>
  </div>
</template>

<script>
import {onMounted, reactive, ref} from "vue";
import {ElMessage} from "element-plus";
import {loginReq, registerReq} from "@/network/login_register";
import {testToken} from "@/network/global";
import router from "@/router";

export default {
  name: "LoginRegister",
  setup() {
    onMounted(() => {
      if (localStorage.getItem("access_token")) {
        testToken().then(() => {
            router.push({path: "/home"})
        })
      }
    })

    const mode = ref(1);

    const switch_mode = (a) => {
      mode.value = a;
    }

    const loginData = reactive({
      username: "",
      password: ""
    })

    const registerData = reactive({
      username: "",
      password: "",
      ensure_password: ""
    })

    const email_regex = /^([a-zA-Z0-9]+[_|_|\-|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$/;

    const register = () => {
      if ( !email_regex.test(registerData.username) ) {
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

      registerReq({username: registerData.username, password: registerData.password}).then(() => {
        loginData.username = registerData.username
        loginData.password = registerData.password
        login()
      })
    }

    const login = () => {
      if (loginData.username.length < 5 || loginData.username.length > 30) {
        ElMessage({
          message: "用户名长度应在5-30",
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
      loginReq({username: loginData.username, password: loginData.password}).then(response => {
        localStorage.setItem("access_token", response.data.access_token)
        localStorage.setItem("refresh_token", response.data.refresh_token)
        router.push({path: "/home"})
      })
    }

    const message = ()=>{
      ElMessage.error("暂不开放免注册试用，请前往注册后使用")
    }

    return {
      mode,
      switch_mode,
      loginData,
      registerData,
      register,
      login,
      message
    }
  }
}
</script>

<style scoped lang="scss">
.info-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>