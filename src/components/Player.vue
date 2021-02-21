
<template>
  <div class="video">
    <p
      v-if="name.length"
      class="title"
    >
      {{ name }}
    </p>
    <video
      id="videoDOM"
      class="video-js vjs-default-skin"
      :width="props.width"
      :height="props.height"
      mute
      controls
      preload
      autoplay
    />
  </div>
</template>
<script setup>
// import '@/assets/style/video.scss'
import videojs from 'video.js'
import 'video.js/dist/video-js.min.css'
import { /* defineComponent, */ watch, computed, reactive, onMounted, defineProps, ref, nextTick } from 'vue'

const props = defineProps({
  // cover: String,
  width: {
    type: String,
    default: '900'
  },
  height: {
    type: String,
    default: '600'
  },
  name: String,
  url: {
    type: String,
    default: 'https://cdn-leshi-com.diudie.com/series/607566/index.m3u8'
  }
})
let player = null
watch(() => props.url,
  val => {
    if (player) {
      player.src({ src: val })
      player.play()
    }
  }
)
const urlStr = computed(() => {
  return props.url
})
// console.log('props.cover', props.cover)

// const state = reactive({ count: 0 })
// const poster = reactive(props.cover)

onMounted(() => {
  const url = urlStr.value
  const videoDOM = document.getElementById('videoDOM')
  const options = {}
  player = videojs(videoDOM, options)
  player.src({ src: url, type: 'application/vnd.apple.mpegurl' })
  player.ready(() => {
    videojs.log('Your player is ready!')
    player.play()
  })
  player.on('ended', function () {
    videojs.log('Awww...over so soon?!')
  })
})

</script>
<style scoped>
.video {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
</style>
