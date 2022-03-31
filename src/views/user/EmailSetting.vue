<template>
  <div>
    <el-form label-width="120px">
      <el-form-item label="新邮箱：">
        <el-input style="max-width: 300px;" v-model="emailData.email"/>
      </el-form-item>
      <el-form-item label="确认新邮箱：">
        <el-input style="max-width: 300px;" v-model="emailData.ensure_email"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="doSubmit">更改邮箱</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {updateEmail} from "@/network/user";
import {ElMessage} from "element-plus";
import {reactive} from "vue";
import router from "@/router";

export default {
  name: "EmailSetting",
  setup() {
    const emailData = reactive({email: "", ensure_email: ""})
    const email_regex = /^([a-zA-Z0-9]+[_|_|\-|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$/;
    const doSubmit = () => {
      if (emailData.email !== emailData.ensure_email) {
        ElMessage({
          message: "两次输入的邮箱不符",
          type: 'error'
        })
        return;
      }
      if (!email_regex.test(emailData.email)) {
        ElMessage({
          message: "邮箱格式错误",
          type: 'error'
        })
        return;
      }
      updateEmail({email: emailData.email}).then(() => {
        ElMessage({
          message: "修改成功",
          type: 'success'
        })
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        router.push({path:"/"})
      })
    }
    return {
      emailData,
      doSubmit
    }
  }
}
</script>

<style scoped>

</style>