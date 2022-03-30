<template>
  <div class="kanban-column" @mouseover="activeId=-1">
    <div style="height: 30px;display: flex;justify-content: left;width: 100%;">
      <div v-if="!isUpdating">
        <span>{{ column.columnTitle }}</span>
        <span style="font-size: 14px;color: #888">({{ column.cards.length }})</span>
      </div>
      <div v-else>
        <el-input size="small" @focusout="updateTitle" @keydown.enter="updateTitle" v-model="newTitle"></el-input>
      </div>
      <div style="flex: 1;display: flex;flex-direction: row-reverse">
        <el-dropdown>
          <el-button type="text"><span
              class="iconfont icon-gengduo-shuxiang" style="font-size: 20px;margin-top: -5px;"></span></el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <el-popover placement="right" :width="180" trigger="hover">
                  <template #reference>
                    <span>移动本列</span>
                  </template>
                  <div class="move-dig" v-loading="loading">
                    <el-button size="small" @click="move(-1)" type="primary">←向左移动</el-button>
                    <el-button size="small" @click="move(1)" type="primary">向右移动→</el-button>
                  </div>
                </el-popover>
              </el-dropdown-item>
              <el-dropdown-item @click="isUpdating=true">重命名</el-dropdown-item>
              <el-dropdown-item @click="deleteColumn">删除本列</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

      </div>
    </div>
    <el-scrollbar style="width: 100%;height: 100%;">
      <kanban-card v-for="item in column.cards" v-bind:key="item.cardId" v-bind:card="item" @transform="transform"
                   @mouseover.stop="activeId=item.cardId" v-bind:active-id="activeId" @refresh="refresh"/>
      <add-card @refresh="refresh" v-bind:kid="column.kanbanId" v-bind:cid="column.columnId"/>
    </el-scrollbar>

    <el-dialog v-model="dialogTableVisible" title="卡片流转" append-to-body width="28%">
      <span>流转目标列：</span>
      <el-select class="m-2" placeholder="Select" v-model="transformTarget">
        <el-option
            v-for="item in columnlist"
            :key="item.columnId"
            :label="item.columnTitle"
            :value="item.columnId"
        />
      </el-select>
      <el-button type="primary" style="margin-left: 20px;" @click="dotransform">流转</el-button>
    </el-dialog>

  </div>
</template>

<script>
import KanbanCard from "@/components/kanban_content/KanbanCard";
import {deleteColumnReq, moveReq, updateColumn} from "@/network/column";
import {ElMessage, ElMessageBox} from "element-plus";
import {ref} from "vue";
import AddCard from "@/components/kanban_content/AddCard";
import {cardTransfer} from "@/network/card";

export default {
  name: "KanbanColumn",
  components: {AddCard, KanbanCard},
  props: {
    column: Object,
    columnlist: Array
  },
  setup(prop, {emit}) {

    const newTitle = ref(prop.column.columnTitle)

    const deleteColumn = () => {

      ElMessageBox.confirm(
          '删除该列会将该列下的所有卡片删除，删除后不可恢复',
          'Warning',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
          }
      ).then(() => {
        return deleteColumnReq(prop.column.columnId)
      }).then(() => {
        emit("refresh")
      })
    }

    const loading = ref(false)
    const move = (v) => {
      loading.value = true
      moveReq({move: v, columnId: prop.column.columnId}).then(() => {
        return emit("refresh")
      }).then(() => {
        loading.value = false
      })

    }
    const updateTitle = () => {
      if (newTitle.value.length > 0 && newTitle.value.length < 30) {
        updateColumn({columnId: prop.column.columnId, columnTitle: newTitle.value}).then(() => {
          emit("refresh")
          isUpdating.value = false
        })
      } else {
        ElMessage.error('标题长度需在1-30之间')
      }

    }

    const isUpdating = ref(false)
    const refresh = () => {
      return emit("refresh")

    }

    const dialogTableVisible = ref(null)

    const transform = (cardId) => {
      transformTarget.value = prop.column.columnId
      dialogTableVisible.value = cardId
    }

    const transformTarget = ref(0)

    const activeId = ref(-1)
    
    const dotransform = () => {
      cardTransfer({cardId:dialogTableVisible.value,columnId:transformTarget.value}).then(()=>{
        emit("refresh")
        dialogTableVisible.value = false
      })
    }
    return {
      deleteColumn,
      move,
      updateTitle,
      isUpdating,
      newTitle,
      refresh,
      activeId,
      loading,
      transform,
      dialogTableVisible,
      transformTarget,
      dotransform
    }
  }
}
</script>

<style scoped>
.kanban-column {
  width: 270px;
  padding-left: 15px;
  padding-right: 10px;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  word-break: break-all;
  height: 100%;
  max-height: 100%;
  background-color: #f9f9f9;
}

.kanban-column:hover {
  background-color: #f0f0f0;
}

.move-dig {
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: center;
  align-items: center;
}
</style>