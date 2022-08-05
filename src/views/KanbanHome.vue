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
          <el-card style="width: 260px; margin-bottom: 20px;cursor:pointer;" shadow="hover" @click="newKanbanShow=true">
            <div style="width: 100%;text-align: center;color: #888888;display: flex;flex-direction: column;">
              <div style="height: 15px;"></div>
              <span class="iconfont icon-zengjia" style="font-size: 40px;"></span>
              <div style="height: 5px;"></div>
              <span style="font-size: 18px;">新建看板</span>
            </div>
          </el-card>
        </div>
      </div>
    </div>

    <el-dialog
        v-model="newKanbanShow"
        title="新建看板"
        width="30%"
        :append-to-body="true"
    >
      <el-form>
        <el-form-item label="看板标题">
          <el-input v-model="newkanban.title" autocomplete="off" maxlength="60"/>
        </el-form-item>
        <el-form-item label="主题颜色">
          <el-color-picker v-model="newkanban.color" size="large"/>
        </el-form-item>
        <el-form-item label="看板类型">
          <el-select v-model="newkanban.type" placeholder="Select">
            <el-option label="默认类型" :value="1"/>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="commit">确定</el-button>
      </span>
      </template>
    </el-dialog>

  </el-scrollbar>
</template>

<script>
import KanbanInfo from "@/components/kanban_info/KanbanInfo";
import {onMounted, ref} from "vue";
import {addKanban, allKanban} from "@/network/kanban";
import router from "@/router";

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
        other.value = response.data;
        loading.value = false
      })
    }

    const loading = ref(true)

    const newKanbanShow = ref(false)

    const newkanban = ref({title: "", color: '#' + Math.random().toString(16).substr(-6), type: 1})

    const commit = () => {
      addKanban(newkanban.value).then(() => {
        newKanbanShow.value = false
        router.push({path: "/home"}).then(() => {
          router.replace({path: "/refresh"})
        })
      })
    }

    return {
      collected,
      other,
      refresh,
      loading,
      newKanbanShow,
      newkanban,
      commit
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