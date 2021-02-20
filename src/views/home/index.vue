<template>
  <h1>{{ msg }}</h1>
  <Media />
</template>

<script setup>
import Media from '@/components/Media.vue'
import { defineProps, reactive } from 'vue'

defineProps({
  msg: String
})

const state = reactive({ count: 0 })
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
