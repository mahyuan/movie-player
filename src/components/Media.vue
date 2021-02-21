<template>
  <el-card class="box-card">
    <el-form
      class="formClass"
      inline
      label-width="80px"
      :model="state"
    >
      <el-form-item
        prop="name"
        label="电影"
      >
        <el-input
          v-model="state.name"
          placeholder=""
          clearable
        />
      </el-form-item>
      <!-- <el-form-item
        prop="year"
        label="年份"
      >
        <el-input
          v-model="state.year"
          placeholder="年份"
          clearable
        />
      </el-form-item> -->
      <el-form-item
        prop="actors"
        label="演员"
      >
        <el-input
          v-model="state.actors"
          placeholder=""
          clearable
        />
      </el-form-item>
      <!-- <el-form-item
        prop="producer"
        label="导演"
      >
        <el-input
          v-model="state.producer"
          placeholder="导演"
          clearable
        />
      </el-form-item> -->
      <el-form-item>
        <el-button
          type="primary"
          :loading="loading"
          @click="handleClick"
        >
          搜索
        </el-button>
      </el-form-item>
    </el-form>
    <div class="result">
      <el-table
        border
        :data="mediaSource.list"
        height="calc(100vh - 200px)"
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="id"
          fixed
          width="100"
        />
        <el-table-column
          fixed
          prop="name"
          label="name"
          width="150"
        >
          <template #default="props">
            <div class="lang-text">
              {{ props.row.name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="cover"
          width="150"
          header-align="left"
          align="center"
          label="cover"
        >
          <template #default="props">
            <el-image
              style="width: 100px; height: 100px"
              :src="props.row.cover"
              :preview-src-list="[props.row.cover]"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="type_name"
          label="type_name"
          width="100"
        />
        <el-table-column
          prop="region"
          label="region"
          width="100"
        />
        <el-table-column
          prop="country"
          label="country"
          width="100"
        />
        <el-table-column
          prop="lang"
          label="lang"
          width="100"
        />
        <el-table-column
          prop="source"
          label="source"
          width="100"
        />

        <el-table-column
          prop="year"
          label="year"
          width="120"
        />
        <el-table-column
          prop="actors"
          min-width="300"
          label="actors"
        >
          <template #default="props">
            <div class="lang-text">
              {{ props.row.actors }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          min-width="400"
          prop="introduction"
          label="desc"
        >
          <template #default="props">
            <div class="lang-text">
              {{ props.row.introduction }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="播放"
          width="220"
          fixed="right"
        >
          <template #default="props">
            <el-space
              spacer="|"
              class="space-custom"
              wrap
            >
              <el-button
                v-for="(item, index) in (props.row.data || [])"
                :key="item.url + item.name"
                type="text"
                size="small"
                :class="{'play-btn': true, playing: item.playing}"
                @click="playItem(item, props.row, index)"
              >
                {{ item.name }}
              </el-button>
            </el-space>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- v-show="total > 0" -->
    <div
      class="page-wrap"
    >
      <el-pagination
        :current-page="state.page"
        layout="total, prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-card>
</template>
<script setup>
import { getCurrentInstance, watch, computed, reactive, onMounted, defineProps, ref, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { getMediaByParams } from '@/api/media'
const router = useRouter()
const route = useRoute()
const vm = getCurrentInstance()

const mediaSource = reactive({
  list: []
})
const state = reactive({
  name: '' || '速度与激情',
  year: '',
  actors: '',
  producer: '',
  page: 1
})
const loading = ref(false)
const total = ref(0)
const el = ref(null)

watch(() => loading.value,
  val => {
    console.log('---watch loaing--', val)
  })

const getMedias = (query) => {
  if (loading.value) {
    return
  }

  loading.value = true
  const params = {
    name: query.name,
    year: query.year,
    actors: query.actors,
    producer: query.producer,
    page: query.page
  }

  getMediaByParams(params)
    .then(resp => {
      loading.value = false
      if (resp) {
        callback(resp)
      }
    }).catch(e => {
      console.error('loading error:', e)
      loading.value = false
    })
}
const playItem = (scope, props) => {
  scope.playing = true
  vm.emit('play', { url: scope.url, name: props.name, innnerName: scope.name })
  scrollToTop()
}

const callback = (resp) => {
  if (Array.isArray(resp)) {
    mediaSource.list = resp
    localStorage.setItem('_movie_', JSON.stringify(resp))
  }
  total.value = resp.length || 0
}
const handleClick = () => {
  state.page = 1
  getMedias(state)
}

const cubic = (value) => Math.pow(value, 3)
const easeInOutCubic = (value) => value < 0.5
  ? cubic(value * 2) / 2
  : 1 - cubic((1 - value) * 2) / 2

const scrollToTop = () => {
  console.log('el--', el)
  const beginValue = el.value.scrollTop
  const beginTime = Date.now()
  const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16))
  const frameFunc = () => {
    const progress = (Date.now() - beginTime) / 500
    if (progress < 1) {
      el.value.scrollTop = beginValue * (1 - easeInOutCubic(progress))
      rAF(frameFunc)
    } else {
      el.value.scrollTop = 0
    }
  }
  rAF(frameFunc)
}

const handleCurrentChange = (val) => {
  state.page = val
  getMedias(state)
}
onMounted(() => {
  el.value = document.documentElement
  const localData = localStorage.getItem('_movie_')
  if (localData) {
    mediaSource.list = JSON.parse(localData) || []
    total.value = mediaSource.list.length || 0
  } else {
    handleClick()
  }
})
</script>
<style>
.formClass {
  text-align: left;
}
.page-wrap {
  margin-top: 10px;
}
.lang-text {
  display: -webkit-box;
  margin-bottom: 4px;
  -webkit-line-clamp: 2;
  line-height: 1.3rem;
  max-height: 2.4rem;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  white-space: normal;
}
.space-custom > span {
  display: inline-block;
  width: 10px!important;
  text-align: center;
}
.playing {
  color: #67C23A;
}
</style>
