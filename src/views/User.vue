<template>
  <div style="display: flex;flex-direction: row;justify-content: center;">
    <el-collapse style="width: 50%;min-width: 600px;" v-model="activeNames" >
      <el-collapse-item title="展示信息" name="1">
        <el-card>
          <user-info-setting/>
        </el-card>
      </el-collapse-item>
      <el-collapse-item title="邮箱设置" name="2">
        <el-card>
          <email-setting/>
        </el-card>
      </el-collapse-item>
      <el-collapse-item title="密码设置" name="3">
        <el-card>
          <password-setting/>
        </el-card>
      </el-collapse-item>
      <el-collapse-item title="邀请邮件提醒设置" name="4">
        <el-card>
          默认开启
        </el-card>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import {ref} from "vue";
import PasswordSetting from "@/components/setting/PasswordSetting";
import EmailSetting from "@/components/setting/EmailSetting";
import UserInfoSetting from "@/components/setting/UserInfoSetting";
export default {
  name: "User",
  components: {PasswordSetting, EmailSetting, UserInfoSetting},
  setup() {
    const activeNames = ref(['1','2','3','4']);
    return {
      activeNames
    }
  }
}
</script>

<style scoped>
.el-menu {
  height: 100%;
}
</style>