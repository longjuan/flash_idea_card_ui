<template>
  <div class="content-container" v-loading="loading">
    <div class="kanban-info" :style="{'background-color':contentInfo.baseInfo.color+'90'}">
      <div style="margin-left: 30px;font-size: 18px;font-weight: bold;">{{ contentInfo.baseInfo.title }}</div>
      <div style="margin-left: 20px;margin-right: 20px;"><span
          :class="{'iconfont':true,'icon-shoucang-shoucang':contentInfo.baseInfo.collected,'icon-shoucang':!contentInfo.baseInfo.collected}"
          style="color: brown">
      </span></div>
      <el-avatar size="small" v-for="item in contentInfo.baseInfo.member" v-bind:key="item.userid"
                 :src="item.avatar" style="margin-left: 10px;"
      ><span style="font-size: 5px !important;">{{ item.nickname.substring(0, 2) }}</span></el-avatar>
    </div>
    <el-scrollbar always native>
      <div class="kanban-content">
        <kanban-column class="scrollbar-demo-item" v-for="item in contentInfo.columns" v-bind:key="item.columnId"
                       v-bind:column="item" @refresh="refresh" v-bind:columnlist="contentInfo.columns"/>
        <add-column v-bind:kanban-id="contentInfo.baseInfo.kanbanId" @refresh="refresh"/>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import KanbanColumn from "@/components/kanban_content/KanbanColumn";
import {onBeforeUnmount, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import router from "@/router";
import {kanbanContent} from "@/network/kanban";
import AddColumn from "@/components/kanban_content/AddColumn";

export default {
  name: "KanbanContent",
  components: {AddColumn, KanbanColumn},
  setup() {
    const route = useRoute()

    const contentInfo = ref({
      baseInfo: {title: "", member: [], color: "#000"},
      columns: []
    })

    onMounted(() => {
      loading.value = true
      if (route.params.kanbanId) {
        refresh().then(()=>{
          loading.value = false
        })
      } else {
        router.push({path: "/home"})
      }
    })

    onBeforeUnmount(()=>{
      if (interval !== null){
        clearInterval(interval)
        millisecondNum = -1
        console.log('beforeDestroy clear interval:' + interval)
      }
    })

    let interval = null;
    let millisecondNum = -1;

    const COOPERATING = 5000;
    const OUT_OF_COOPERATION = 30000;

    const refresh = () => {
      return kanbanContent(route.params.kanbanId).then(response => {
        contentInfo.value = response.data
        if (response.data.cooperating){
          if (millisecondNum !== COOPERATING){
            if (interval !== null){
              console.log('stop interval:' + interval)
              clearInterval(interval)
              interval = null
            }
            interval = setInterval(refresh, COOPERATING)
            millisecondNum = COOPERATING
            console.log(`start interval:${interval}, millisecondNum:${millisecondNum}`)
          }
        }else{
          if (millisecondNum !== OUT_OF_COOPERATION){
            if (interval !== null){
              console.log('stop interval:' + interval)
              clearInterval(interval)
              interval = null
            }
            interval = setInterval(refresh, OUT_OF_COOPERATION)
            millisecondNum = OUT_OF_COOPERATION
            console.log(`start interval:${interval}, millisecondNum:${millisecondNum}`)
          }
        }
      })
    }

    const loading = ref(false)

    return {
      contentInfo,
      refresh,
      loading
    }
  }
}
</script>

<style scoped>
.kanban-content {
  display: flex;
  height: 98%;
}

.content-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}


.kanban-info {
  width: 100%;
  height: 35px;
  background-color: #fa8771;
  display: flex;
  flex-direction: row;
  align-items: center;

}


</style>

<style>
.scrollbar-demo-item {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  border-radius: 10px;
}

.el-scrollbar__view {
  height: 100%;
}
</style>