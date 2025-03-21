<script setup>
import { AppState } from '@/AppState.js';
import PageNavigation from '@/components/PageNavigation.vue';
import PostCard from '@/components/PostCard.vue';
import { addsService } from '@/services/AddsService.js';
import { postsService } from '@/services/PostsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';

const posts = computed(() => AppState.posts)
const adds = computed(() => AppState.adds)

onMounted(() => {
  getPosts()
  getAds()
})

async function getPosts() {
  try {
    await postsService.getPosts()
  }
  catch (error) {
    Pop.error(error, 'Could not get posts')
    logger.error('COULD NOT GET POSTS', error)
  }
}

async function getAds() {
  try {
    await addsService.getAds()
  }
  catch (error) {
    Pop.error(error, 'Could not get ads')
    logger.error('COULD NOT GET ADS', error)
  }
}


</script>

<template>
  <section class="container">
    <div class="row mb-5">
      <div v-if="adds[0]" class="col-md-3">
        <div class="sticky-top pt-3">
          <img class="w-100" :src="adds[0].tall" alt="">
        </div>
      </div>
      <div class="col-md-6">
        <div class="mt-3 d-flex justify-content-evenly gap-5">
          <PageNavigation />
        </div>
        <div class="row justify-content-center">
          <div v-for="post in posts" :key="post.id" class="col-md-10">
            <PostCard :postProp="post" />
          </div>
        </div>
        <div class="mt-3 d-flex justify-content-evenly gap-5">
          <PageNavigation />
        </div>
      </div>
      <div v-if="adds[1]" class="col-md-3 sticky-top">
        <div class="sticky-top pt-3">
          <img class="w-100" :src="adds[1].tall" alt="">
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
