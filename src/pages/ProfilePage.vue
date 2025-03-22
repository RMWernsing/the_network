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
    logger.log('COULD NOT GET PROFILE BY ID', error)
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
    logger.log('COULD NOT CHANGE PAGE', error)
  }
}

async function changeProfilePageOlder(pageNumber, id) {
  try {
    await postsService.changeProfilePageOlder(pageNumber, id)
  }
  catch (error) {
    Pop.error(error, 'Could not change page')
    logger.log('COULD NOT CHANGE PAGE', error)
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
        <div class="d-flex justify-content-center bg-img my-3 rounded-4"
          :style="{ backgroundImage: `url(${profile.coverImg})` }">
          <div class="d-flex flex-column text-light text-shadow">
            <h2 class="text-center mt-2 fs-1">
              {{ profile.name }}
            </h2>
            <div class="d-flex justify-content-center">
              <img class="rounded-img my-3 profile-img" :src="profile.picture" alt="">
            </div>
            <span class="text-center fs-1">
              <a v-if="profile.linkedin" :title="`link to ${profile.name}'s linkedin`" target="_blank"
                :href="profile.linkedin">
                <span class="mdi mdi-linkedin text-light"></span>
              </a>
              <a v-if="profile.github" :title="`link to ${profile.name}'s github`" target="_blank"
                :href="profile.github">
                <span class="mdi mdi-github text-light"></span>
              </a>
              <a v-if="profile.resume" :title="`link to ${profile.name}'s resume`" target="_blank"
                :href="profile.resume">
                <span class="mdi mdi-file-account text-light"></span>
              </a>
            </span>
            <p class="text-center fs-5">
              {{ profile.class }} <span v-if="profile.graduated" class="mdi mdi-school"></span>
            </p>
            <div class="text-center fs-4">
              <b>
                {{ profile.bio }}
              </b>
            </div>
          </div>
        </div>
        <div>
        </div>
      </div>
      <div class="col-12">
        <div class="w-100 d-flex justify-content-center" v-if="adds[1]">
          <img :src="adds[1].banner" alt="">
        </div>
      </div>
      <div class="mt-3 d-flex justify-content-evenly gap-5">
        <button @click="changeProfilePageNewer(currentPage - 1, profile.id)" class="btn btn-indigo"
          :disabled="currentPage <= 1">Newer</button>
        <button @click="changeProfilePageOlder(currentPage + 1, profile.id)" class="btn btn-indigo"
          :disabled="currentPage == totalPages">Older</button>
      </div>
      <div class="row justify-content-center">
        <div v-for="post in posts" :key="post.id" class="col-md-7">
          <PostCard :postProp="post" />
        </div>
      </div>
    </div>

  </section>
</template>


<style lang="scss" scoped>
.profile-img {
  aspect-ratio: 1/1;
  border-radius: 50%;
  object-fit: cover;
  height: 30dvh;
  width: 30dvh;

}

.bg-img {
  background-position: center;
  background-size: cover;
  min-height: 70dvh;
}

.text-shadow {
  text-shadow: 1px 1px 5px rgb(255, 109, 221);
}
</style>