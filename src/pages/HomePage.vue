<script setup>
import { AppState } from '@/AppState.js';
import PostCard from '@/components/PostCard.vue';
import { postsService } from '@/services/PostsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';

const posts = computed(() => AppState.posts)

onMounted(() => {
  getPosts()
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

</script>

<template>
  <section class="container">
    <div class="row mb-5">
      <div class="col-md-3">

      </div>
      <div class="col-md-6">
        <div class="row justify-content-center">
          <div v-for="post in posts" :key="post.id" class="col-md-10">
            <PostCard :postProp="post" />
          </div>
        </div>
      </div>
      <div class="col-md-3">

      </div>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
