
<template>
  <div class="video">
    <video
      id="videoDOM"
      ref="videoRef"
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
  url: {
    type: String,
    default: 'https://cdn-leshi-com.diudie.com/series/607566/index.m3u8'
  }
})
watch(() => props.url,
  val => {
    console.log('watch url change', val)
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
  const player = videojs(videoDOM, options)
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
  justify-content: center;
}
</style>
