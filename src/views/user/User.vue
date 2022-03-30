<template>
  <div>
    <el-container>

      <el-aside width="168px">
        <el-menu
            :router="true"
            :default-active="$route.path"
        >
          <el-menu-item index="/user" v-if="this.$store.state.roles.includes('registered')">
            <span class="iconfont icon-yonghuxinxi-"></span>
            &nbsp;
            <span>展示信息</span>
          </el-menu-item>
          <el-menu-item index="/user/password" v-if="this.$store.state.roles.includes('registered')">
            <span class="iconfont icon-genggaimima"></span>
            &nbsp;
            <span>更改密码</span>
          </el-menu-item>
          <el-menu-item index="3" v-if="this.$store.state.roles.includes('evaluation')">
            <span class="iconfont icon-zhuceyonghu"></span>
            &nbsp;
            <span>注册正式用户</span>
          </el-menu-item>
          <el-menu-item index="4" v-if="this.$store.state.roles.includes('registered')" disabled>
            <span class="iconfont icon-youxiang"></span>
            &nbsp;
            <span>邮箱设置</span>
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