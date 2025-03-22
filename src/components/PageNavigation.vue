<script setup>
import { AppState } from '@/AppState.js'
import { postsService } from '@/services/PostsService.js'
import { logger } from '@/utils/Logger.js'
import { Pop } from '@/utils/Pop.js'
import { computed } from 'vue'


const currentPage = computed(() => AppState.currentPage)
const totalPages = computed(() => AppState.totalPages)

async function changePage(pageNumber) {
  try {
    await postsService.changePage(pageNumber)
  }
  catch (error) {
    Pop.error(error, 'Could not change page')
    logger.log('COULD NOT CHANGE PAGE', error)
  }
}

</script>


<template>
  <button @click="changePage(currentPage - 1)" class="btn btn-indigo" :disabled="currentPage <= 1">Newer</button>
  <div>
    page: {{ currentPage }} of: {{ totalPages }}
  </div>
  <button @click="changePage(currentPage + 1)" class="btn btn-indigo"
    :disabled="currentPage == totalPages">Older</button>
</template>


<style lang="scss" scoped></style>