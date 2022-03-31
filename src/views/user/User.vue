<template>
  <div style="height: 100%;">
    <el-container>

      <el-aside width="183px">
        <el-menu
            :router="true"
            :default-active="$route.path"
        >
          <el-menu-item index="/user" v-if="this.$store.state.roles.includes('registered')" style="font-size: 16px;">
            &nbsp;&nbsp;
            <span class="iconfont icon-yonghuxinxi-"></span>
            <span>&nbsp;展示信息</span>
          </el-menu-item>
          <el-menu-item index="/user/password" v-if="this.$store.state.roles.includes('registered')" style="font-size: 16px;">
            &nbsp;&nbsp;
            <span class="iconfont icon-genggaimima"></span>
            <span>&nbsp;更改密码</span>
          </el-menu-item>
          <el-menu-item index="3" v-if="this.$store.state.roles.includes('evaluation')" style="font-size: 16px;">
            &nbsp;&nbsp;
            <span class="iconfont icon-zhuceyonghu"></span>
            <span>&nbsp;注册正式用户</span>
          </el-menu-item>
          <el-menu-item index="/user/email" v-if="this.$store.state.roles.includes('registered')" style="font-size: 16px;">
            &nbsp;&nbsp;
            <span class="iconfont icon-youxiang"></span>
            <span>&nbsp;邮箱设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "User"
}
</script>

<style scoped>
.el-menu {
  height: 100%;
}
</style>