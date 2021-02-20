
<template>
  <div class="video">
    <video
      id="videoDOM"
      ref="videoRef"
      class="video-js vjs-default-skin"
      width="620"
      height="450"
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
  url: String
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
