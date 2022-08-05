<template>
  <div>
    <el-container>
      <el-header>
        <div class="header-login">
          <el-image style="height: 100%" :src="logoImg" fit="scale-down" />
        </div>
      </el-header>
      <el-main class="login-el-main">
        <div class="login-main">
          <div class="login-amin-left">
            <el-image style="height: 100%;z-index: -999" :src="cooperationImg" fit="scale-down" />
            <h1>高效管理你的想法、工作、生活</h1>
          </div>
          <div class="login-amin-right">
            <el-card>
              <el-image :src="userImg" fit="scale-down" />
              <LoginRegister></LoginRegister>
            </el-card>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import logoImg from '../assets/logo.png'
import cooperationImg from '../assets/cooperation.svg'
import userImg from '../assets/user.svg'
import LoginRegister from "@/views/LoginRegister";
export default {
  name: "Index",
  components: {
    LoginRegister
  },
  setup(){
    return {
      logoImg,
      cooperationImg,
      userImg
    }
  }
}
</script>

<style lang="scss">
.header-login{
  display: flex;
  flex-direction: row;
  height: 100%;
  padding: 10px;
}
.login-el-main{
  display: block;
  flex-direction: column;
  height: 100%;
}
.el-container {
  height: 100vh !important;
}
.login-main{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
}
.login-amin-left{
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.login-amin-right{
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 120px;
}
</style>