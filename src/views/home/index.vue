<template>
  <div class="root">
    <Player
      :url="current.url"
      :name="current.name + ' __ ' + current.innnerName"
    />
    <div class="list">
      <p />
      <Media @play="playCallback" />
    </div>
    <el-backtop /><el-backtop />
  </div>
</template>

<script setup>
import Player from '@/components/Player.vue'
import Media from '@/components/Media.vue'
import { defineProps, reactive } from 'vue'

defineProps({
  msg: String
})
const state = reactive({ count: 0 })
const current = reactive({
  url: '',
  name: '',
  innnerName: ''
})
const playCallback = (obj) => {
  const { url, name, innnerName } = obj
  current.url = url
  current.name = name
  current.innnerName = innnerName
}
</script>

<style scoped>
a {
  color: #42b983;
}
.list {
  position: -webkit-sticky;
  position: sticky;
  display: block;
  height: 100vh;
  top: 0;
}
</style>
