<template>
  <div>
    <el-form label-width="120px">
      <el-form-item label="昵称：">
        <el-input v-model="userInfo.nickname" :disabled="!canedit" placeholder="Please input"
                  style="max-width: 300px;" maxlength="30"/>
        <span style="width: 10px;"></span>
        <el-button @click="canedit = true" v-if="!canedit">修改</el-button>
        <el-button type="primary" @click="updateNn" v-if="canedit">确定</el-button>
      </el-form-item>
      <el-form-item label="头像：">
        <div class="avatar-upload">
          <el-upload
              class="avatar-uploader"
              :show-file-list="false"
              action="/api/user/info/avatar"
              :headers="{'Authorization':'Bearer '+access_token}"
              name="avatar" accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.PNG,.GIF"
              :on-success="uploadAfter">
            <el-image v-if="userInfo.avatar" :src="userInfo.avatar" class="avatar"/>
            <el-icon v-else class="avatar-uploader-icon">+</el-icon>
          </el-upload>
          <span>点击上传</span>
          <span>请上传小于500KB的头像，仅支持 jpg jpeg png gif 格式</span>
        </div>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import {updateNickname, userInfoReq} from "@/network/user";
import store from "@/store";
import {ElMessage} from "element-plus";

export default {
  name: "UserInfoSetting",
  setup() {
    const userInfo = ref({nickname: ""});
    const canedit = ref(false);
    let access_token = ref(localStorage.getItem('access_token'))

    const currentInfo = () => {
      userInfoReq().then(response => {
        userInfo.value = response.data;
        store.dispatch("modifyUserInfo", JSON.parse(JSON.stringify(response.data)));
      })
    }

    onMounted(() => {
      currentInfo();
      access_token.value = localStorage.getItem('access_token');
    })

    const updateNn = () => {
      updateNickname({nickname: userInfo.value.nickname}).then(() => {
        currentInfo();
        canedit.value = false;
      })
    }

    const uploadAfter = (response) => {
      // 这里没用拦截器 判断一下
      if (response.code !== "000") {
        ElMessage({
          message: response.msg,
          type: 'error'
        })
      }
      currentInfo();
    }

    return {
      currentInfo,
      userInfo,
      updateNn,
      canedit,
      access_token,
      uploadAfter
    }
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-upload {
  display: flex;
  flex-direction: column;
  font-size: 10px;
  color: #fa8771;
  line-height: 20px;
}
</style>