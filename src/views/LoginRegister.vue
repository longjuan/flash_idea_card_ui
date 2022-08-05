<template>
  <div class="info-form">
    <div v-if="mode === 1">
      <login-component/>
      <el-button type="text" style="margin-top: 8px; float: left;" @click="switch_mode(3)">忘记密码</el-button>
      <el-button type="text" style="margin-top: 8px; float: right;" @click="switch_mode(2)">去注册</el-button>
    </div>
    <div v-if="mode === 2">
      <register-component :transform="switch_mode"/>
      <el-button type="text" style="margin-top: 8px; float: left;" @click="switch_mode(3)">忘记密码</el-button>
      <el-button type="text" style="margin-top: 8px; float: right;" @click="switch_mode(1)">去登录</el-button>
    </div>
    <div v-if="mode === 3">
      <forgot-password-component/>
      <el-button type="text" style="margin-top: 8px; float: left;" @click="switch_mode(2)">去注册</el-button>
      <el-button type="text" style="margin-top: 8px; float: right;" @click="switch_mode(1)">去登录</el-button>
    </div>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import {testToken} from "@/network/global";
import router from "@/router";
import LoginComponent from "@/components/login_register/LoginComponent";
import RegisterComponent from "@/components/login_register/RegisterComponent";
import ForgotPasswordComponent from "@/components/login_register/ForgotPasswordComponent";

export default {
  name: "LoginRegister",
  components: {
    ForgotPasswordComponent,
    RegisterComponent,
    LoginComponent
  },
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

    return {
      mode,
      switch_mode
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