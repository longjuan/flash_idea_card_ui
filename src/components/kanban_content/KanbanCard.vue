<template>
  <div class="card-box">

    <el-card class="card-el" @click="opendialog">
      <div class="more-ops" v-if="activeId===card.cardId">
        <el-dropdown>
          <span class="iconfont icon-gengduo-shuxiang" @click.stop/>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <el-popover placement="right" :width="60" trigger="hover">
                  <template #reference>
                    <span>调整顺序</span>
                  </template>
                  <div class="move-dig" v-loading="loading">
                    <el-button size="small" @click="move(-1)" type="primary">向上移动↑</el-button>
                    <el-button size="small" @click="move(1)" type="primary" style="margin-top: 10px;margin-left: 0;">
                      向下移动↓
                    </el-button>
                  </div>
                </el-popover>
              </el-dropdown-item>
              <el-dropdown-item @click="transform">卡片流转</el-dropdown-item>
              <el-dropdown-item @click="deleteCard">删除卡片</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <span style="display: block;white-space: pre-wrap;text-align: left;">{{ card.content }}</span>
      <div style="margin-top: 10px;" v-if="card.tags.length !== 0">
        <el-tag v-for="item in card.tags" v-bind:key="item.tagId" :color="item.color" effect="plain">
          {{ item.content }}
        </el-tag>
      </div>

    </el-card>

    <el-dialog v-model="dialogTableVisible" title="卡片详情" append-to-body>
      <el-input
          v-model="newContent"
          autosize
          type="textarea"
          size="large"
          style="font-size: 18px;"
          @focusout="docommit"
      />
      <div style="margin-top: 10px;">
        <el-tag closable v-for="item in card.tags" v-bind:key="item.tagId" :color="item.color" effect="plain"
                @close="doclose(item.tagId)" class="tags">
          {{ item.content }}
        </el-tag>
        <br/> <br/>
        <el-button size="small" class="tags" @click="newtag=true" v-if="!newtag">+New Tag
        </el-button>
        <el-input size="small" style="width: 150px;" v-if="newtag" placeholder="tag内容，右边选择颜色"
                  maxlength="10" v-model="newtaginfo.content"/>
        <el-color-picker v-model="newtaginfo.color" size="small" class="tags" v-if="newtag"/>
        <el-button size="small" class="tags" @click="addTag" v-if="newtag">确定</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import {addTagReq, deleteCardReq, deleteTagReq, moveCardReq, updateCardReq} from "@/network/card";
import {ref} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";

export default {
  name: "KanbanCard",
  props: {
    card: Object,
    activeId: Number
  },
  setup(prop, {emit}) {

    const loading = ref(false)

    const move = (v) => {
      loading.value = true
      moveCardReq({move: v, cardId: prop.card.cardId}).then(() => {
        return emit("refresh")
      }).then(() => {
        loading.value = false
      })
    }

    const dialogTableVisible = ref(false)

    const newContent = ref(prop.card.content)

    const opendialog = () => {
      newContent.value = prop.card.content
      dialogTableVisible.value = true
    }

    const doclose = (id) => {
      deleteTagReq(id).then(() => {
        emit("refresh")
      })
    }

    const deleteCard = () => {
      ElMessageBox.confirm(
          '确定删除卡片？',
          'Warning',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
          }
      ).then(() => {
        return deleteCardReq(prop.card.cardId)
      }).then(() => {
        emit("refresh")
      })
    }

    const newtag = ref(false)

    const newtaginfo = ref({color: '#' + Math.random().toString(16).substr(-6), content: ""})

    const addTag = () => {
      addTagReq({
        cardId: prop.card.cardId,
        color: newtaginfo.value.color,
        content: newtaginfo.value.content,
        kanbanId: prop.card.kanbanId
      }).then(() => {
        return emit("refresh")
      }).then(() => {
        newtaginfo.value.content = ""
        newtaginfo.value.color = '#' + Math.random().toString(16).substr(-6)
        newtag.value = false
      })
    }

    const docommit = () => {
      if (newContent.value.length > 0 && newContent.value.length < 251) {
        updateCardReq({cardId: prop.card.cardId, content: newContent.value}).then(() => {
          emit("refresh")
        })
      } else {
        ElMessage.error("内容长度需在1-250之间")
      }
    }

    const transform = () => {
      emit("transform", prop.card.cardId)
    }

    return {
      move,
      loading,
      dialogTableVisible,
      newContent,
      opendialog,
      doclose,
      deleteCard,
      newtag,
      newtaginfo,
      addTag,
      docommit,
      transform
    }
  }
}
</script>

<style scoped>
.card-box {
  width: 100%;
}

.card-el {
  width: 260px;
  margin-bottom: 20px;
}

.tags {
  margin-right: 5px;
}

.card-el:hover {
  cursor: pointer;
}

.more-ops {
  float: right;
  margin-top: -12px;
  margin-right: -15px;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  box-shadow: 2px 2px 8px #ccc;
}

.move-dig {
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
}
</style>
<style lang="scss">
.el-textarea__inner {
  resize: none;
  box-shadow: none;
}
</style>