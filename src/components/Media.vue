<template>
  <el-card class="box-card">
    <el-form
      ref="form"
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
          search
        </el-button>
      </el-form-item>
    </el-form>
    <div class="result">
      <el-table
        border
        default-expand-all
        :data="mediaSource.list"
        height="calc(100vh - 200px)"
        style="width: 100%"
      >
        <el-table-column
          width="100"
          align="center"
          fixed
          label="expand"
          type="expand"
        >
          <template #default="props">
            <el-table
              border
              style="width: 100%"
              :data="props.row.data"
            >
              <el-table-column
                width="200"
                prop="name"
                label="name"
              />
              <el-table-column
                prop="url"
                min-width="400"
                label="url"
              />
              <el-table-column label="play">
                <template #default="scope">
                  <el-button
                    type="text"
                    icon="el-icon-video-play"
                    @click="playItem(scope.row, props.row)"
                  />
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
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
        />
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
        />
        <el-table-column
          min-width="400"
          prop="introduction"
          label="introduction"
        />
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

watch(() => loading.value,
  val => {
    console.log('---watch loaing--', val)
  })
const getMedias = async (query) => {
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
  try {
    const resp = await getMediaByParams(params)
    console.log('medias', resp)
    loading.value = false
    if (resp) {
      callback(resp)
    }
  } catch (error) {
    loading.value = false
  }
}
const playItem = (scope, props) => {
  vm.emit('play', { url: scope.url, name: props.name, innnerName: scope.name })
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

const handleCurrentChange = (val) => {
  state.page = val
  getMedias(state)
}
onMounted(() => {
  console.log('mouted')
  const localData = localStorage.getItem('_movie_')
  if (localData) {
    mediaSource.list = JSON.parse(localData) || []
    total.value = mediaSource.list.length || 0
  } else {
    handleClick()
  }
})
</script>
<style scoped>
.formClass {
    text-align: left;
}
.page-wrap {
  margin-top: 10px;
}
</style>
