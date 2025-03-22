<script setup>
import { AppState } from '@/AppState.js';
import Login from '@/components/Login.vue';
import PageNavigation from '@/components/PageNavigation.vue';
import PostCard from '@/components/PostCard.vue';
import { addsService } from '@/services/AddsService.js';
import { postsService } from '@/services/PostsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted, ref } from 'vue';

const editablePostData = ref({
  body: '',
  imgUrl: '',
})

const posts = computed(() => AppState.posts)
const adds = computed(() => AppState.adds)
const account = computed(() => AppState.account)

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

async function createPost() {
  try {
    await postsService.createPost(editablePostData.value)
  }
  catch (error) {
    Pop.error(error, 'Could not create post')
    logger.log('COULD NOT CREATE POST', error)
  }
}

</script>

<template>
  <section class="container">
    <div class="row mb-5">
      <div class="col-12">
        <div class="row justify-content-center">
          <div class="col-md-12">
            <div class="d-flex justify-content-center py-3">
              <h1>The Network Home Page</h1>
            </div>
            <div v-if="account" class="col-md-4">
              <h2>Submit Post</h2>
              <form @submit.prevent="createPost()">
                <label for="body">Text</label>
                <textarea v-model="editablePostData.body" name="body" id="body" required maxlength="5000"
                  minlength="1"></textarea>
                <label for="imgUrl">Image</label>
                <input v-model="editablePostData.imgUrl" type="url" name="imgUrl" id="imgUrl" maxlength="500">
                <button type="submit" title="submit post" class="btn btn-success mt-3">submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div v-if="adds[0]" class="col-md-3">
        <div class="sticky-top pt-3">
          <img class="w-100" :src="adds[0].tall" alt="">
        </div>
      </div>
      <div class="col-md-6">
        <div class="mt-3 d-flex justify-content-center gap-5">
          <PageNavigation />
        </div>
        <div class="row justify-content-center">
          <div v-for="post in posts" :key="post.id" class="col-md-10">
            <PostCard :postProp="post" />
          </div>
        </div>
        <div class="mt-3 d-flex justify-content-center gap-5">
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

<style scoped lang="scss">
label {
  display: block;
}

input,
textarea {
  width: 100%;
}
</style>
