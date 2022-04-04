<template>
  <div style="height: 100vh;">
    <el-container class="h100">
      <el-header height="50px"><header-bar/></el-header>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </div>
</template>

<script>

import HeaderBar from "../components/common/HeaderBar";
export default {
  name: 'Home',
  components: {HeaderBar}
}
</script>
<style lang="scss">

.el-container{
  height: 100%;
}
.el-main{
  padding: 0 0 0 !important;
}
</style>
