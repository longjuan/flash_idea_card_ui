<template>
  <div>
    <el-table :data="invitationData" style="width: 100%">
      <el-table-column prop="invitationTime" label="邀请时间" width="180"/>
      <el-table-column prop="name" label="邀请人">
        <template #default="scope">
          <div style="display: flex;">
            <el-avatar
                :src="scope.row.sendUser.avatar"
            >{{ scope.row.sendUser.nickname.substring(0, 6) }}
            </el-avatar>
            <div style="margin-left: 10px;display: flex;align-items: center;">{{ scope.row.sendUser.nickname }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="kanbanId.title" label="看板名称" />
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button type="primary" v-if="scope.row.state === 1" @click="accept(scope.row.invitationId)">同意</el-button>
          <span style="color: #888" v-else-if="scope.row.state === 2">已同意</span>
          <span style="color: #888" v-else-if="scope.row.state === 3">已拒绝</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import {acceptInvitation, getInvitationReq} from "@/network/invitation";

export default {
  name: "Invitation",
  setup() {
    const invitationData = ref([])
    onMounted(() => {
      getInvitationReq().then(response => {
        invitationData.value = response.data
      })
    })
    const accept = id=>{
      acceptInvitation({invitationId:id}).then(()=>{
        getInvitationReq().then(response => {
          invitationData.value = response.data
        })
      })
    }
    return {
      invitationData,
      accept
    }
  }
}
</script>

<style scoped>

</style>