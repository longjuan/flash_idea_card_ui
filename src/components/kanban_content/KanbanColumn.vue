<template>
  <div class="kanban-column">
    <div style="height: 30px;display: flex;justify-content: left;width: 100%;">
      <div>
        <span>{{ column.columnTitle }}</span>
        <span style="font-size: 14px;color: #888">({{ column.cards.length }})</span>
      </div>
      <div style="flex: 1;display: flex;flex-direction: row-reverse">
        <el-dropdown trigger="click">
          <el-button type="text"><span
              class="iconfont icon-gengduo-shuxiang" style="font-size: 20px;margin-top: -5px;"></span></el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>修改标题</el-dropdown-item>
              <el-dropdown-item @click="deleteColumn">删除该列</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

      </div>
    </div>
    <el-scrollbar style="width: 100%;height: 100%;">
      <kanban-card v-for="item in column.cards" v-bind:key="item.cardId" v-bind:card="item"/>
    </el-scrollbar>
  </div>
</template>

<script>
import KanbanCard from "@/components/kanban_content/KanbanCard";
import {deleteColumnReq} from "@/network/column";
import {ElMessageBox} from "element-plus";

export default {
  name: "KanbanColumn",
  components: {KanbanCard},
  props: {
    column: Object
  },
  setup(prop, {emit}) {
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

    return {
      deleteColumn
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
</style>