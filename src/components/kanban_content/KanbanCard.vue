<template>
  <div class="card-box">
  <el-card class="card-el">{{card.content}}</el-card>

  </div>
</template>

<script>
export default {
  name: "KanbanCard",
  props:{
    card: Object
  }
}
</script>

<style scoped>
.card-box{
  width: 100%;
}
.card-el{
  width: 260px;
  margin-bottom: 20px;
}
.card-el:hover{
  background-color: #e8e8e8;
  cursor: pointer;
}
</style>