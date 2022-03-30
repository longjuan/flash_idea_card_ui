<template>
  <div>
    <el-button round size="large" style="width: 250px;margin-left: -8px;" @click="isUpdating=true" v-if="!isUpdating">
      <span class="iconfont icon-zengjia"/><span>添加卡片</span></el-button>
    <div v-else>
      <el-input type="textarea" style="width: 250px;margin-left: -8px;" @keydown.enter="doAdd" placeholder="请输入卡片内容"
                v-model="newContent" :rows="4"></el-input>
      <el-button type="primary" style="margin-top: 5px;" @click="doAdd">确定</el-button>
      <el-button style="margin-top: 5px;" @click="isUpdating=false">取消</el-button>
    </div>
  </div>

</template>

<script>
import {ref} from "vue";
import {addCardReq} from "@/network/card";
import {ElMessage} from "element-plus";

export default {
  name: "AddCard",
  props: {
    cid: Number,
    kid: Number,
  },
  setup(prop,{emit}) {
    const doAdd = () => {
      if (newContent.value.length > 0 && newContent.value.length < 251){
        addCardReq({columnId: prop.cid, kanbanId: prop.kid, content: newContent.value}).then(()=>{
          newContent.value = ""
          isUpdating.value = false
          emit("refresh")
        })
      }else {
        ElMessage.error("卡片内容长度限制为1-250")
      }
    }

    const newContent = ref("")

    const isUpdating = ref(false)
    return {
      doAdd,
      isUpdating,
      newContent
    }
  }
}
</script>

<style scoped>
</style>