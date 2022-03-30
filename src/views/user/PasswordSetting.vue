<template>
  <div>
    <el-form label-width="120px">
      <el-form-item label="旧密码：">
        <el-input style="max-width: 300px;" type="password" v-model="passwordData.oldpw"/>
      </el-form-item>
      <el-form-item label="新密码：">
        <el-input style="max-width: 300px;" type="password" v-model="passwordData.newpw"/>
      </el-form-item>
      <el-form-item label="确认密码：">
        <el-input style="max-width: 300px;" type="password" v-model="passwordData.ensurepw"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="doSubmit">更改密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {reactive} from "vue";
import {ElMessage} from "element-plus";
import {updatePassword} from "@/network/user";

export default {
  name: "PasswordSetting",
  setup() {
    const passwordData = reactive({oldpw: "", newpw: "", ensurepw: ""})
    const doSubmit = () => {
      if (passwordData.newpw !== passwordData.ensurepw) {
        ElMessage({
          message: "新密码与确认密码不符",
          type: 'error'
        })
        return;
      }
      if (ensureLength(passwordData.oldpw) || ensureLength(passwordData.newpw) || ensureLength(passwordData)) {
        ElMessage({
          message: "旧密码或新密码长度小于6位",
          type: 'error'
        })
        return;
      }
      updatePassword({oldpw: passwordData.oldpw, newpd: passwordData.newpw}).then(() => {
          ElMessage({
            message: "修改成功",
            type: 'success'
          })
      })
    }
    const ensureLength = (str) => {
      return str.length < 6
    }
    return {
      passwordData,
      doSubmit
    }
  }
}
</script>

<style scoped>

</style>