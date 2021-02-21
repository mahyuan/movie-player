<template>
  <div>
    <p>{{ query.name }}</p>
    <Player
      cover="https://mahuapic.com/upload/vod/2019-09-27/15695856240.jpg"
      :url="query.url"
    />
  </div>
</template>

<script setup>
import Player from '@/components/Player.vue'
import { useRoute } from 'vue-router'

import { defineProps, reactive } from 'vue'

const props = defineProps({
})
const route = useRoute()
const query = reactive({
  url: route.query.url,
  name: route.query.name
})
</script>
