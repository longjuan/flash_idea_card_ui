<template>
  <div>
    <el-card class="card-el" :style="{'background-color': info.color+'90'}">
      <div class="kanban-title">{{ info.title }}</div>
      <div class="middle">
        <div>
          <div class="div-margin">
            <el-tag size="small" class="tag-margin" v-if="$store.state.userInfo.userid === info.ownerId">我创建的</el-tag>
            <el-tag size="small" class="tag-margin" type="danger" v-if="info.member.length > 1">
              {{ info.member.length }}人共享
            </el-tag>
          </div>
          <div class="kanban-createtime div-margin" v-if="$store.state.userInfo.userid === info.ownerId">创建于
            {{ info.createTime.split(' ')[0] }}
          </div>
          <div class="kanban-createtime div-margin" v-else>加入于 {{ info.joinTime.split(' ')[0] }}</div>
        </div>
        <div style="flex:1;">
          <div style="float: right;margin-top: 8px;" @click.stop="more">
            <el-dropdown>
              <span class="iconfont icon-gengduo-shuxiang more-icon"></span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="update">修改看板信息</el-dropdown-item>
                  <el-dropdown-item @click="deleteKanban">删除该看板</el-dropdown-item>
                  <el-dropdown-item divided @click="invite">邀请协作</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </div>
      <div class="icon-bar div-margin">
        <div class="avatar">
          <el-avatar size="small" v-for="item in info.member" v-bind:key="item.userid"
                     :src="item.avatar" style="margin-right: 5px;"
          ><span style="font-size: 5px !important;">{{ item.nickname.substring(0, 2) }}</span></el-avatar>
        </div>
        <span class="iconfont icon-shoucang-shoucang hm" v-if="info.collected"
              style="font-size: 18px;margin-top: 3px;" @click.stop="shoucang(false)"></span>
        <span class="iconfont icon-shoucang hm" v-else style="font-size: 18px;margin-top: 3px;"
              @click.stop="shoucang(true)"></span>
      </div>
    </el-card>


    <el-dialog
        v-model="kanbaninfoVisible"
        title="修改看板信息"
        width="30%"
        :append-to-body="true"
    >
      <el-form>
        <el-form-item label="看板标题">
          <el-input v-model="thisInfo.title" autocomplete="off" maxlength="60"/>
        </el-form-item>
        <el-form-item label="主题颜色">
          <el-color-picker v-model="thisInfo.color" size="large"/>
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
import {ref} from "vue";
import {collectReq, deleteKanbanReq, updateKanban} from "@/network/kanban";
import {ElMessage, ElMessageBox} from "element-plus";
import {inviteReq} from "@/network/invitation";

export default {
  name: "KanbanInfo",
  props: {
    info: Object
  },
  setup(props, {emit}) {
    const shoucang = (b) => {
      collectReq({kanbanId: props.info.kanbanId, isCollected: b}).then(() => {
        emit('refresh');
      })
    }


    const kanbaninfoVisible = ref(false);

    const updateInfo = ref({title: ""})

    const update = () => {
      kanbaninfoVisible.value = true
      updateInfo.value = JSON.parse(JSON.stringify(props.info));
    }

    const commit = () => {
      updateKanban(updateInfo.value).then(() => {
        kanbaninfoVisible.value = false
        emit('refresh');
      })
    }

    const deleteKanban = () => {
      deleteKanbanReq(props.info.kanbanId).then(() => {
        emit('refresh');
      })
    }

    const invite = () => {
      ElMessageBox.prompt('请输入被邀请人的邮箱', 'Tip', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern:
            /^([a-zA-Z0-9]+[_|_|\-|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$/,
        inputErrorMessage: '邮箱格式错误',
      }).then(({value}) => {
        return inviteReq({kanbanId:props.info.kanbanId,invitedUser:value})
      }).then(()=>{
        ElMessage.success("邀请成功")
      })
    }


    return {
      shoucang,
      kanbaninfoVisible,
      thisInfo: updateInfo,
      update,
      commit,
      deleteKanban,
      invite
    }
  }
}
</script>

<style scoped>
.div-margin {
  margin-top: 8px;
}

.card-el {
  cursor: pointer;
  -webkit-user-select: none;
  width: 260px;
  height: 150px;
}

.card-el:hover {
  background-color: #8c939d;
}

.kanban-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.kanban-createtime {
  font-size: 10px;
}

.avatar {
  display: flex;
  width: 90%;
}

.icon-bar {
  display: flex;
}

.hm {
  color: #6D0A0A;
}

.hm:hover, .more-icon:hover {
  color: #a3d7ff;
  transition: background-color .3s ease;
}

.tag-margin {
  margin-right: 3px;
}

.middle {
  display: flex;

}

.more-icon {
  font-size: 22px;
  color: black;
}

</style>