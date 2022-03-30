<template>
  <div class="add-column">
    <div @click="addVisible=true" v-if="!addVisible">
      <el-button type="text"><span class="iconfont icon-zengjia"/>添加列表</el-button>
    </div>
    <div v-if="addVisible">
      <el-input type="textarea" style="width: 100%" placeholder="请输入列表名称" v-model="ctitle"></el-input>
      <el-button type="primary" @click="addColumn">添加</el-button>
      <el-button @click="addVisible=false">取消</el-button>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import {addColumnReq} from "@/network/column";

export default {
  name: "AddColumn",
  props: {
    kanbanId: Number
  },
  setup(prop, {emit}) {
    const addColumn = () => {
      addColumnReq({columnTitle: ctitle.value, kanbanId: prop.kanbanId}).then(() => {
        emit("refresh")
        addVisible.value = false
        ctitle.value = ""
      })
    }

    const addVisible = ref(false)
    const ctitle = ref("")
    return {
      addColumn,
      addVisible,
      ctitle
    }
  }
}
</script>

<style scoped>
.add-column {
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
  min-width: 270px;
  text-align: left;
}

.add-column:hover {
  background-color: #f5f5f5;
}
</style>