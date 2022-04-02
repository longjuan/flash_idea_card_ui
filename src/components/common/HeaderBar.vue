<template>
  <div class="header-bar-main">
    <div class="header-bar-left">
      <el-tooltip content="返回主面板" effect="light">
        <el-image style="height: 100%;cursor: pointer;margin-top: -3px;" :src="logoImg" fit="scale-down"
                  @click="$router.push({path:'/home'})"/>
      </el-tooltip>
      <el-divider direction="vertical" style="height: 100%;margin-left: 15px;margin-right: 15px;"/>
      <div class="mt-4">
        <el-autocomplete
            v-model="searchInput"
            placeholder="搜索功能可能不开放，服务器内存不够"
            style="min-width: 320px;"
            :fetch-suggestions="querySearch"
        >
          <template #append>
            <el-button>
              <span class="iconfont icon-search"></span>
            </el-button>
          </template>

          <template #default="{ item }">
            <div @click="$router.push({path:'/kanban/'+item.kanbanId})">
              <div>
                <el-tag v-if="item.type === 'kanban'">看板</el-tag>
                <el-tag type="success" v-else-if="item.type === 'column'">列</el-tag>
                <el-tag type="info" v-else-if="item.type === 'card'">卡片</el-tag>
                <el-tag type="warning" v-else-if="item.type === 'tag'">Tag</el-tag>
                <el-tag type="info" effect="dark" style="margin-left: 10px;">点击前往</el-tag>
              </div>
              <div class="value">{{ item.content }}</div>
            </div>
          </template>
        </el-autocomplete>
      </div>
    </div>
    <div class="header-bar-right">
      <el-dropdown trigger="hover">
        <el-avatar
            :src="$store.state.userInfo.avatar"
        >{{ $store.state.userInfo.nickname.substring(0, 6) }}
        </el-avatar>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="$router.push({path:'/user'})">个人设置</el-dropdown-item>
            <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-tooltip content="协作邀请" effect="light">
        <el-button style="margin-left: 10px;margin-right: 30px;color: #222" @click="$router.push({path:'/home/invitation'})" type="text">
          <el-badge :value="invitationNum" type="primary" :hidden="invitationNum<=0">
            <span class="iconfont icon-yaoqing" style="font-size: 25px;"></span>
          </el-badge>
        </el-button>
      </el-tooltip>
      <el-tooltip content="创建新看板" effect="light">
        <el-button style="margin-left: 10px;margin-right: 30px;color: #fa8771" @click="newKanbanShow=true">
          <span class="iconfont icon-zengjia" style="font-size: 25px;"></span>
        </el-button>
      </el-tooltip>
    </div>

    <el-dialog
        v-model="newKanbanShow"
        title="新建看板"
        width="30%"
        :append-to-body="true"
    >
      <el-form>
        <el-form-item label="看板标题">
          <el-input v-model="newkanban.title" autocomplete="off" maxlength="60"/>
        </el-form-item>
        <el-form-item label="主题颜色">
          <el-color-picker v-model="newkanban.color" size="large"/>
        </el-form-item>
        <el-form-item label="看板类型">
          <el-select v-model="newkanban.type" placeholder="Select">
            <el-option label="默认类型" :value="1"/>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="commit">确定</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import logoImg from '../../assets/logo.png'
import {onMounted, ref} from "vue";
import router from "@/router";
import {userInfoReq} from "@/network/user";
import store from "@/store";
import {testToken} from "@/network/global";
import {addKanban} from "@/network/kanban";
import {getInvitationReq} from "@/network/invitation";
import {searchReq} from "@/network/search";

export default {
  name: "HeaderBar",
  setup() {
    onMounted(() => {
      testToken();
      userInfoReq().then(response => {
        store.dispatch('modifyUserInfo', response.data)
      })
      getInvitationReq().then(response=>{
        invitationNum.value = response.data.filter(item => item.state === 1).length
      })
    })
    
    const invitationNum = ref(0)
    const searchInput = ref("");

    const logout = () => {
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")
      router.push({path: "/"})
    }

    const newKanbanShow = ref(false)

    const newkanban = ref({title: "", color: '#' + Math.random().toString(16).substr(-6), type: 1})

    const commit = () => {
      addKanban(newkanban.value).then(() => {
        newKanbanShow.value = false
        router.push({path: "/home"}).then(() => {
          router.replace({path: "/refresh"})
        })
      })
    }

    const querySearch = (queryString, cb)=>{
      searchReq(queryString).then(result=>{
        cb(result.data)
      })
    }

    return {
      logoImg,
      searchInput,
      logout,
      newKanbanShow,
      newkanban,
      commit,
      invitationNum,
      querySearch
    }
  }
}
</script>

<style scoped>
.header-bar-main {
  display: flex;
  flex-direction: row;
  height: 100%;
}

.header-bar-left {
  flex: 1;
  display: flex;
  flex-direction: row;
  height: 35px;
  margin-top: 10px;
}

.header-bar-right {
  flex: 1;
  display: flex;
  flex-direction: row-reverse;
  height: 35px;
  margin-top: 10px;
  align-items: center;
}
.value{
  max-width: 800px;
  overflow: hidden;
  white-space: normal;
  word-break: break-all;
  line-height: 160%;
}
</style>