<script setup>
import { AppState } from '@/AppState.js';
import { addsService } from '@/services/AddsService.js';
import { postsService } from '@/services/PostsService.js';
import { profilesService } from '@/services/ProfilesService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import PostCard from '@/components/PostCard.vue';
import PageNavigation from '@/components/PageNavigation.vue';
import ProfileCard from '@/components/ProfileCard.vue';


const route = useRoute()
const profile = computed(() => AppState.activeProfile)
const adds = computed(() => AppState.adds)
const posts = computed(() => AppState.posts)
const currentPage = computed(() => AppState.currentPage)
const totalPages = computed(() => AppState.totalPages)

onMounted(() => {
  getProfileById()
  getAds()
  getPostsByCreatorId()
})

async function getProfileById() {
  try {
    const profileId = route.params.profileId
    await profilesService.getProfileById(profileId)
  }
  catch (error) {
    Pop.error(error, 'Could not get profile by id')
    logger.error('COULD NOT GET PROFILE BY ID', error)
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

async function getPostsByCreatorId() {
  try {
    const profileId = route.params.profileId
    await postsService.getPostsByCreatorId(profileId)
  }
  catch (error) {
    Pop.error(error, `Could not get posts by`)
    logger.error('COULD NOT GET POSTS BY CREATOR', error)
  }
}


async function changeProfilePageNewer(pageNumber, id) {
  try {
    await postsService.changeProfilePageNewer(pageNumber, id)
  }
  catch (error) {
    Pop.error(error, 'Could not change page')
    logger.error('COULD NOT CHANGE PAGE', error)
  }
}

async function changeProfilePageOlder(pageNumber, id) {
  try {
    await postsService.changeProfilePageOlder(pageNumber, id)
  }
  catch (error) {
    Pop.error(error, 'Could not change page')
    logger.error('COULD NOT CHANGE PAGE', error)
  }
}

</script>


<template>
  <section class="container">
    <div class="row">
      <div class="col-12">
        <div class="w-100 d-flex justify-content-center mt-3" v-if="adds[0]">
          <img :src="adds[0].banner" alt="">
        </div>
      </div>
      <div v-if="profile" class="col-12">
        <ProfileCard />
      </div>
      <div class="col-12">
        <div class="w-100 d-flex justify-content-center" v-if="adds[1]">
          <img :src="adds[1].banner" alt="">
        </div>
      </div>
      <div v-if="totalPages > 1" class="mt-3 d-flex justify-content-center gap-5">
        <button @click="changeProfilePageNewer(currentPage - 1, profile.id)" class="btn btn-indigo"
          :disabled="currentPage <= 1">Newer</button>
        <div>
          page: {{ currentPage }} of: {{ totalPages }}
        </div>
        <button @click="changeProfilePageOlder(currentPage + 1, profile.id)" class="btn btn-indigo"
          :disabled="currentPage == totalPages">Older</button>
      </div>
      <div class="row justify-content-center">
        <div v-for="post in posts" :key="post.id" class="col-md-7 mb-3">
          <PostCard :postProp="post" />
        </div>
      </div>
      <div v-if="totalPages > 1" class="mt-3 d-flex justify-content-center gap-5 my-4">
        <button @click="changeProfilePageNewer(currentPage - 1, profile.id)" class="btn btn-indigo"
          :disabled="currentPage <= 1">Newer</button>
        <div>
          page: {{ currentPage }} of: {{ totalPages }}
        </div>
        <button @click="changeProfilePageOlder(currentPage + 1, profile.id)" class="btn btn-indigo"
          :disabled="currentPage == totalPages">Older</button>
      </div>
    </div>

  </section>
</template>


<style lang="scss" scoped></style>