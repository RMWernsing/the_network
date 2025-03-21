<script setup>
import { AppState } from '@/AppState.js';
import { profilesService } from '@/services/ProfilesService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute()
const profile = computed(() => AppState.activeProfile)

onMounted(() => {
  getProfileById()
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

</script>


<template>
  <section class="container">
    <div class="row">
      <div v-if="profile" class="col-12">
        <div class="d-flex justify-content-center bg-img my-3 rounded-4"
          :style="{ backgroundImage: `url(${profile.coverImg})` }">
          <div class="d-flex flex-column text-light text-shadow">
            <h2 class="text-center mt-2 fs-1">
              {{ profile.name }}
            </h2>
            <div class="d-flex justify-content-center">
              <img class="rounded-img my-3" :src="profile.picture" alt="">
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
              {{ profile.class }}
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
    </div>

  </section>
</template>


<style lang="scss" scoped>
img {
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