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
        label="name"
      >
        <el-input
          v-model="state.name"
          clearable
        />
      </el-form-item>
      <el-form-item
        prop="year"
        label="year"
      >
        <el-input
          v-model="state.year"
          clearable
        />
      </el-form-item>
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
    <el-table
      border
      :data="mediaSource.list"
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
              <teamplate v-slot="scope">
                <el-button @click="play(scope.row)" />
              </teamplate>
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
        prop="actors"
        width="300"
        label="actors"
      />
      <el-table-column
        prop="year"
        label="year"
        width="120"
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
        width="400"
        prop="introduction"
        label="introduction"
      />
    </el-table>
  </el-card>
</template>
<script setup>
import { watch, computed, reactive, onMounted, defineProps, ref, nextTick } from 'vue'

import { getMediaByParams } from '@/api/media'
const mediaSource = reactive({
  list: []
})
const state = reactive({
  name: '' || '速度与激情',
  year: ''
})
const loading = ref(false)
watch(() => loading.value,
  val => {
    console.log('---watch loaing--', val)
  })
const getMedias = async (query) => {
  loading.value = true
  const params = {
    name: query.name,
    year: query.year,
    actors: '',
    producer: '', // 导演
    page: 1
  }
  const resp = await getMediaByParams(params)
  console.log('medias', resp)
  callback(resp)
}
const play = (row) => {

}

const callback = (resp) => {
  loading.value = false
  if (Array.isArray(resp)) {
    mediaSource.list = resp
  }
}
const handleClick = () => {
  getMedias(state)
}

</script>
<style scoped>
.formClass {
    text-align: left;
}
</style>
