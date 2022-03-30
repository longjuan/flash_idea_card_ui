<template>
  <el-scrollbar>
    <div class="home-container" v-loading="loading">
      <div v-if="collected.length !== 0">
        <h3>收藏</h3>
        <el-divider/>
        <div class="collected-kanban">
          <div class="other-kanban">
            <kanban-info v-for="(item) in collected" v-bind:key="item.kanbanId" v-bind:info="item" class="kanban-info"
                         @click="$router.push({path:'/kanban/'+item.kanbanId})" @refresh="refresh"/>
          </div>
        </div>
      </div>
      <div>
        <h3>所有</h3>
        <el-divider/>
        <div class="other-kanban">
          <kanban-info v-for="(item) in other" v-bind:key="item.kanbanId" v-bind:info="item" class="kanban-info"
                       @click="$router.push({path:'/kanban/'+item.kanbanId})" @refresh="refresh"/>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script>
import KanbanInfo from "@/components/kanban_info/KanbanInfo";
import {onMounted, ref} from "vue";
import {allKanban} from "@/network/kanban";

export default {
  name: "KanbanHome",
  components: {KanbanInfo},
  setup() {
    const collected = ref([]);
    const other = ref([]);

    onMounted(() => {
      refresh()
    })
    const refresh = () => {
      allKanban().then(response => {
        console.log(response);
        collected.value = response.data.filter(a => a.collected);
        other.value = response.data.filter(a => !a.collected);
        loading.value = false
      })
    }

    const loading = ref(true)
    return {
      collected,
      other,
      refresh,
      loading
    }
  }
}
</script>

<style scoped>
.home-container {
  text-align: left;
  padding: 5px 20px 5px 20px;
}

.collected-kanban {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.other-kanban {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.kanban-info {
  margin-right: 20px;
  margin-bottom: 20px;
}

.kanban-info:hover {
  transform: translateY(-6px);
  transition: transform 0.2s;
}
</style>